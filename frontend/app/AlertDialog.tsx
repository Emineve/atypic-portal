'use client';

import { markAlertPlaces } from '../lib/alertPlaces';
import { markAlertCreated } from '../lib/intent';
import { useEffect, useState } from 'react';
import { X, Check, MapPin } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import { readVisitor, saveVisitor } from '../lib/visitor';
import FilterPanel from './FilterPanel';
import { Filters, EMPTY_FILTERS, featureLabel } from './filters';
import { formatPhone } from '../lib/phone';

// L'envoi des e-mails d'alerte est en place (domaine validé, service d'envoi branché)
const ALERT_EMAILS_LIVE = true;

// Agence présente sur le site, avec les villes où elle a des biens en ligne
export interface AlertAgency {
  name: string;
  cities: string[];
  count: number;
}

// Nombre maximum d'agences auxquelles une même recherche peut être transmise
const MAX_AGENCIES = 5;

export interface AlertInitial {
  filters?: Filters;
  location?: string; // lieu saisi dans la recherche, repris comme premier lieu de l'alerte
  // anciens champs, gardés pour rester compatible avec l'ancienne page d'accueil
  category?: string;
  priceMax?: string;
  surfaceMin?: string;
}

interface Place {
  label: string; // ce qu'on affiche : « 92200 Neuilly-sur-Seine »
  value: string; // ce qu'on enregistre : « Neuilly-sur-Seine »
}

function arrondissement(n: number): string {
  return n === 1 ? 'Paris 1er' : `Paris ${n}e`;
}

function normalizeLocation(raw: string): string {
  const s = raw.trim().replace(/\s+/g, ' ');
  if (!s) return '';
  // « Paris 16e Arrondissement » (API adresse) et « Paris 16e » sont le même lieu
  const paris = s.match(/^paris\s*0?(\d{1,2})\s*(?:e|er|ème|eme|è)?(?:\s+arrondissement)?$/i);
  const bare = s.match(/^0?(\d{1,2})\s*(?:e|er|ème|eme)$/i);
  const m = paris || bare;
  if (m) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 20) return arrondissement(n);
  }
  if (/^paris$/i.test(s)) return 'Paris';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function plain(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function toNum(v: string): number | null {
  const n = Number(v.replace(/\s/g, ''));
  return v.trim() !== '' && Number.isFinite(n) && n >= 0 ? n : null;
}

function formatEuro(n: number) {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €';
}

function Step({
  n,
  title,
  hint,
  children,
}: {
  n?: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {n && <span className="font-sans text-2xl font-light leading-none text-stone-300">{n}</span>}
        <h3 className="text-[17px] font-semibold text-stone-900">{title}</h3>
        {hint && <span className="text-xs text-stone-500">{hint}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function AlertDialog({
  open,
  onClose,
  source,
  suggestions,
  initial,
  countMatches,
  onShowMatches,
  types,
  agencies,
  shareWith,
}: {
  // Page agence : la recherche est partagée avec cette agence, et l'alerte Loftissime est créée du même geste
  shareWith?: string;
  // Accueil uniquement : agences auxquelles l'acheteur peut transmettre sa recherche
  agencies?: AlertAgency[];
  open: boolean;
  onClose: () => void;
  source: string;
  suggestions: string[];
  initial?: AlertInitial;
  // Accueil uniquement : biens déjà en ligne qui répondent à l'alerte, et affichage de ces biens
  countMatches?: (filters: Filters, locations: string[]) => number;
  onShowMatches?: (filters: Filters, locations: string[]) => void;
  types?: string[]; // types de bien proposés (accueil : ceux qui ont des biens en ligne)
}) {
  const [locations, setLocations] = useState<string[]>([]);
  const [locInput, setLocInput] = useState('');
  const [remote, setRemote] = useState<Place[]>([]);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [email, setEmail] = useState('');
  const [wantWhatsapp, setWantWhatsapp] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [website, setWebsite] = useState(''); // champ piège anti-spam
  const [share, setShare] = useState(false); // transmettre aussi la recherche à des agences
  const [agencySel, setAgencySel] = useState<string[]>([]);
  const [shareName, setShareName] = useState('');
  const [sharePhone, setSharePhone] = useState('');
  const [shared, setShared] = useState<string[]>([]); // agences qui ont bien reçu la recherche
  const [alertCreated, setAlertCreated] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [limit, setLimit] = useState(false); // dix alertes actives déjà enregistrées pour cet e-mail
  const [geo, setGeo] = useState<'idle' | 'loading' | 'denied' | 'error'>('idle');

  // À chaque ouverture : on repart des critères de la recherche en cours
  useEffect(() => {
    if (!open) return;
    setLocations(initial?.location ? [normalizeLocation(initial.location)] : []);
    setLocInput('');
    setRemote([]);
    setFilters(
      initial?.filters
        ? { ...initial.filters, nice: [] }
        : {
            ...EMPTY_FILTERS,
            types: initial?.category ? [initial.category] : [],
            priceMax: initial?.priceMax || '',
            surfaceMin: initial?.surfaceMin || '',
          }
    );
    setStatus('idle');
    setGeo('idle');
    setShare(!!shareWith);
    setAlertCreated(false);
    const known = readVisitor();
    if (known.email) setEmail((cur) => cur || known.email || '');
    if (known.name) setShareName((cur) => cur || known.name || '');
    if (known.phone) setSharePhone((cur) => cur || known.phone || '');
    setAgencySel(shareWith ? [shareWith] : []);
    setShared([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Défilement bloqué derrière la fenêtre, Échap la ferme
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Autocomplétion des communes : API adresse de l'État, après une courte pause de frappe
  useEffect(() => {
    const q = locInput.trim();
    if (!open || q.length < 2) {
      setRemote([]);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&type=municipality&autocomplete=1&limit=6`
        );
        const json = await res.json();
        const found: Place[] = ((json && json.features) || [])
          .map((f: { properties?: { city?: string; name?: string; postcode?: string } }) => {
            const p = f.properties || {};
            const city = String(p.city || p.name || '');
            const pc = String(p.postcode || '');
            const value = normalizeLocation(city);
            return value ? { label: `${pc ? pc + ' ' : ''}${value}`, value } : null;
          })
          .filter(Boolean) as Place[];
        if (!cancelled) setRemote(found);
      } catch {
        if (!cancelled) setRemote([]);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [locInput, open]);

  if (!open) return null;

  function addLocation(raw: string) {
    const loc = normalizeLocation(raw);
    if (!loc) return;
    if (locations.length >= 10) return;
    if (locations.some((l) => plain(l) === plain(loc))) return;
    setLocations([...locations, loc]);
    setLocInput('');
    setRemote([]);
  }

  // Propositions : arrondissements de Paris + villes déjà présentes sur le site + résultats de l'API
  const typed = plain(locInput.trim());
  const proposals: Place[] = [];
  if (typed !== '') {
    const pcode = typed.match(/^75(\d{3})$/);
    for (let n = 1; n <= 20; n++) {
      const name = arrondissement(n);
      const code = `750${String(n).padStart(2, '0')}`;
      const hit =
        (pcode && `75${pcode[1]}` === code) ||
        (/^(paris|\d{1,2})/.test(typed) && (plain(name).includes(typed) || plain(name).replace(/\D/g, '') === typed.replace(/\D/g, '')));
      if (hit) proposals.push({ label: `${code} ${name}`, value: name });
    }
    suggestions
      .filter((s) => plain(s).includes(typed))
      .forEach((s) => proposals.push({ label: s, value: s }));
    remote.forEach((p) => proposals.push(p));
  }
  const seen = new Set<string>();
  const dropdown = proposals
    .filter((p) => !locations.some((l) => plain(l) === plain(p.value)))
    .filter((p) => {
      const k = plain(p.value);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 6);

  // « Autour de moi » : position du navigateur, convertie en ville par l'API adresse de l'État
  function locate() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeo('error');
      return;
    }
    setGeo('loading');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://api-adresse.data.gouv.fr/reverse/?lon=${pos.coords.longitude}&lat=${pos.coords.latitude}`
          );
          const json = await res.json();
          const p = json && json.features && json.features[0] ? json.features[0].properties : null;
          if (!p || !p.city) throw new Error('introuvable');
          const pc = String(p.postcode || '');
          const arr = /^75(\d{3})$/.test(pc) ? Number(pc.slice(3)) : 0;
          const loc = normalizeLocation(String(p.city).toLowerCase() === 'paris' && arr >= 1 && arr <= 20 ? `Paris ${arr}` : String(p.city));
          if (!loc) throw new Error('introuvable');
          setLocations((prev) =>
            prev.length >= 10 || prev.some((l) => plain(l) === plain(loc)) ? prev : [...prev, loc]
          );
          setGeo('idle');
        } catch {
          setGeo('error');
        }
      },
      (err) => setGeo(err && err.code === 1 ? 'denied' : 'error'),
      { timeout: 10000, maximumAge: 600000 }
    );
  }

  // Agences suggérées : d'abord celles qui ont des biens dans les lieux recherchés
  const inZone = (a: AlertAgency) =>
    locations.some((l) =>
      a.cities.some((c) => plain(c) === plain(l) || (plain(l) === 'paris' && /^paris(\s|$)/i.test(c)))
    );
  const agencyList = (agencies || [])
    .map((a) => ({ ...a, zone: inZone(a) }))
    .sort((a, b) => Number(b.zone) - Number(a.zone) || b.count - a.count);

  function toggleShare(on: boolean) {
    setShare(on);
    if (on && agencySel.length === 0) {
      const zone = agencyList.filter((a) => a.zone);
      setAgencySel((zone.length > 0 ? zone : agencyList).slice(0, MAX_AGENCIES).map((a) => a.name));
      if (!sharePhone && whatsapp) setSharePhone(whatsapp);
    }
  }

  function toggleAgency(name: string) {
    setAgencySel((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : prev.length >= MAX_AGENCIES ? prev : [...prev, name]
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) {
      setStatus('done');
      return;
    }
    // Un lieu saisi mais pas encore validé est pris en compte
    const pending = normalizeLocation(locInput);
    const finalLocations =
      pending && !locations.some((l) => plain(l) === plain(pending)) ? [...locations, pending] : locations;
    setLocations(finalLocations);
    setLocInput('');
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_alert', {
        p_kind: 'alert',
        p_email: email,
        p_query: null,
        p_category: null,
        p_price_min: toNum(filters.priceMin),
        p_price_max: toNum(filters.priceMax),
        p_surface_min: toNum(filters.surfaceMin),
        p_rooms_min: null,
        p_consent: true, // l'envoi vaut accord, la phrase sous le formulaire le précise
        p_locations: finalLocations.length ? finalLocations : null,
        p_surface_max: toNum(filters.surfaceMax),
        p_bedrooms_min: filters.bedrooms,
        p_must_top_floor: false,
        p_must_view: false,
        p_must_outdoor: false,
        p_source: source,
        p_categories: filters.types.length ? filters.types : null,
        p_must: filters.must.length ? filters.must : null,
        p_nice: filters.nice.length ? filters.nice : null,
      });
      const ok = !error && data === true;
      setLimit(Boolean(error && error.message.includes('alert_limit')));
      // Numéro WhatsApp facultatif : rattaché à l'alerte qui vient d'être créée
      if (ok && wantWhatsapp && whatsapp.trim()) {
        try {
          await getSupabase().rpc('set_alert_whatsapp', { p_email: email, p_phone: whatsapp, p_consent: true });
        } catch {
          /* l'alerte par e-mail est enregistrée même si le numéro ne l'est pas */
        }
      }
      setAlertCreated(ok);
      if (ok) { markAlertPlaces(finalLocations); markAlertCreated(); }
      // Recherche transmise aux agences cochées (cinq au maximum). Page agence : le partage part même si l'alerte n'a pas pu être créée.
      let sharedOk = false;
      if ((ok || shareWith) && share && agencySel.length > 0) {
        const sent: string[] = [];
        for (const a of agencySel.slice(0, MAX_AGENCIES)) {
          try {
            const res = await getSupabase().rpc('submit_agency_search', {
              p_agency: a,
              p_name: shareName,
              p_email: email,
              p_phone: sharePhone || null,
              p_location: finalLocations.join(', ') || null,
              p_budget_max: toNum(filters.priceMax),
              p_surface_min: toNum(filters.surfaceMin),
              p_message: `${shareWith ? 'Recherche partagée depuis la page de l’agence sur Loftissime' : 'Recherche issue d’une alerte Loftissime'} : ${recapLine}.`,
            });
            if (!res.error && res.data === true) sent.push(a);
          } catch {
            /* l'alerte est créée même si une agence n'a pas reçu la recherche */
          }
        }
        setShared(sent);
        sharedOk = sent.length > 0;
      }
      if (ok || sharedOk) saveVisitor({ email, name: shareName, phone: sharePhone || whatsapp, locations: finalLocations, budget: filters.priceMax });
      setStatus((shareWith ? sharedOk : ok) ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field =
    'rounded-[10px] w-full border border-stone-300 bg-white px-4 h-12 text-base text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition';

  const recap: string[] = [];
  if (filters.types.length) recap.push(filters.types.join(' / '));
  if (locations.length) recap.push(locations.join(', '));
  const sMin = toNum(filters.surfaceMin);
  const sMax = toNum(filters.surfaceMax);
  if (sMin !== null && sMax !== null) recap.push(`${sMin} à ${sMax} m²`);
  else if (sMin !== null) recap.push(`à partir de ${sMin} m²`);
  else if (sMax !== null) recap.push(`jusqu'à ${sMax} m²`);
  if (filters.bedrooms) recap.push(`${filters.bedrooms} ${filters.bedrooms > 1 ? 'chambres' : 'chambre'} et +`);
  const pMin = toNum(filters.priceMin);
  const pMax = toNum(filters.priceMax);
  if (pMin !== null && pMax !== null) recap.push(`${formatEuro(pMin)} à ${formatEuro(pMax)}`);
  else if (pMin !== null) recap.push(`à partir de ${formatEuro(pMin)}`);
  else if (pMax !== null) recap.push(`jusqu'à ${formatEuro(pMax)}`);
  filters.must.forEach((k) => recap.push(featureLabel(k).toLowerCase()));
  filters.nice.forEach((k) => recap.push(`+ ${featureLabel(k).toLowerCase()}`));

  // Une fois l'alerte créée : combien de biens déjà en ligne y répondent ?
  const matches = status === 'done' && countMatches && onShowMatches ? countMatches(filters, locations) : 0;

  const recapLine = recap.length ? recap.join(' · ') : 'Tous les nouveaux biens atypiques, partout en France';

  return (
    <div className="fixed inset-0 z-[70] flex" role="dialog" aria-modal="true" aria-label={shareWith ? `Partager ma recherche avec ${shareWith}` : 'Créer une alerte'}>
      <div className="absolute inset-0 bg-stone-900/60" onClick={onClose} />
      <div className="relative w-full h-[100dvh] flex justify-center bg-[#FDFBF7] md:bg-stone-100">
      <div className="relative w-full md:max-w-2xl h-full flex flex-col bg-[#FDFBF7] md:shadow-[0_0_0_1px_#e7e5e4] overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className={`absolute top-3 right-3 z-20 h-10 w-10 rounded-full flex items-center justify-center transition ${
            status === 'done' ? 'text-stone-500 hover:text-stone-900' : 'text-stone-600 hover:bg-stone-200 hover:text-stone-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'done' ? (
          <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-14 text-center overflow-y-auto">
            <span className="mx-auto h-16 w-16 rounded-full bg-stone-900 text-white flex items-center justify-center">
              <Check className="w-8 h-8" />
            </span>
            <h2 className="mt-7 font-serif text-3xl md:text-4xl text-stone-900 leading-tight">
              {shareWith ? 'Recherche partagée.' : "C'est noté, on veille pour vous."}
            </h2>
            {shareWith ? (
              <>
                <p className="mt-4 text-stone-600 leading-relaxed max-w-md mx-auto">
                  <span className="text-stone-900">{shareWith}</span> a bien reçu votre recherche et vous recontacte dès qu&apos;un bien correspond, y compris avant sa mise en ligne.
                </p>
                {alertCreated && (
                  <p className="mt-3 text-stone-600 leading-relaxed max-w-md mx-auto">
                    Votre alerte Loftissime est créée elle aussi : vous recevrez par e-mail les nouveaux biens de toutes les agences qui correspondent à ces critères.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-4 text-stone-600 leading-relaxed max-w-md mx-auto">
                Dès qu'un bien correspond à votre recherche, vous serez parmi les premiers à le savoir. En attendant, bonne exploration.
              </p>
            )}
            {!shareWith && shared.length > 0 && (
              <p className="mt-3 text-stone-600 leading-relaxed max-w-md mx-auto">
                Votre recherche a aussi été transmise à{' '}
                <span className="text-stone-900">
                  {shared.length > 1 ? `${shared.slice(0, -1).join(', ')} et ${shared[shared.length - 1]}` : shared[0]}
                </span>
                .
              </p>
            )}
            {recap.length > 0 && (
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {recap.map((r) => (
                  <span key={r} className="text-xs rounded-full border border-stone-300 bg-white text-stone-700 px-3 py-1.5">
                    {r}
                  </span>
                ))}
              </div>
            )}
            {!ALERT_EMAILS_LIVE && (
              <p className="mt-7 text-xs text-stone-400">Version de démonstration : aucun email n'est encore envoyé.</p>
            )}
            <button
              type="button"
              onClick={() => {
                if (matches > 0 && onShowMatches) onShowMatches(filters, locations);
                onClose();
              }}
              className="mt-9 bg-stone-900 text-white text-[15px] font-medium px-9 py-4 hover:bg-stone-800 transition rounded-full"
            >
              {matches > 1
                ? `Voir les ${matches} biens correspondants`
                : matches === 1
                ? 'Voir le bien correspondant'
                : "Poursuivre l'exploration"}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1">
                        <div
              className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="px-6 md:px-12 pt-8 md:pt-10">
                <h2 className="pr-10 font-serif text-[1.7rem] md:text-4xl leading-[1.1] text-stone-900">
                  {shareWith ? `Partagez votre recherche avec ${shareWith}.` : 'Dites-nous ce que vous cherchez.'}
                </h2>
                <p className="mt-2 text-sm md:text-base text-stone-600 max-w-md leading-relaxed">
                  {shareWith ? (
                    <>L&apos;agence vous recontacte dès qu&apos;un bien correspond. Loftissime crée aussi votre alerte e-mail avec ces critères.</>
                  ) : (
                    <>
                      On vous prévient par e-mail dès qu'un bien correspond
                      <span className="hidden md:inline">, sans que vous ayez à revenir le chercher</span>.
                    </>
                  )}
                </p>
              </div>
              <div className="px-6 md:px-12 pt-7 pb-7">
                <Step title="Où ?" hint="Plusieurs lieux possibles. Sans lieu : toute la France.">
                  {locations.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {locations.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLocations(locations.filter((x) => x !== l))}
                          className="inline-flex items-center gap-2 rounded-full bg-[#F6CF4E] pl-4 pr-3 py-2 text-sm font-medium text-stone-900 hover:bg-[#EFC234] transition"
                          aria-label={`Retirer ${l}`}
                        >
                          {l} <X className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="relative">
                    <input
                      id="alert-loc"
                      type="text"
                      value={locInput}
                      onChange={(e) => setLocInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          if (dropdown.length > 0) addLocation(dropdown[0].value);
                          else addLocation(locInput);
                        }
                      }}
                      placeholder="Ville, code postal ou arrondissement"
                      aria-label="Ville, code postal ou arrondissement"
                      maxLength={80}
                      autoComplete="off"
                      className={field}
                    />
                    {dropdown.length > 0 && (
                      <ul className="absolute left-0 right-0 top-full z-10 rounded-b-[10px] overflow-hidden border border-t-0 border-stone-300 bg-white shadow-lg">
                        {dropdown.map((p) => (
                          <li key={p.label}>
                            <button
                              type="button"
                              onClick={() => addLocation(p.value)}
                              className="w-full text-left px-4 py-3 text-sm text-stone-800 hover:bg-stone-100 transition"
                            >
                              {p.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={locate}
                    disabled={geo === 'loading'}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-stone-800 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition disabled:opacity-50"
                  >
                    <MapPin className="w-4 h-4" />
                    {geo === 'loading' ? 'Localisation en cours…' : 'Autour de moi'}
                  </button>
                  {geo === 'denied' && (
                    <p className="mt-2 text-xs text-stone-500">Localisation refusée. Autorisez-la dans votre navigateur, ou saisissez une ville.</p>
                  )}
                  {geo === 'error' && (
                    <p className="mt-2 text-xs text-stone-500">Impossible de vous localiser. Saisissez une ville ou un arrondissement.</p>
                  )}
                </Step>

              </div>

              <FilterPanel value={filters} onChange={setFilters} mode="alert" padX="px-6 md:px-12" types={types} />

              <div className="border-t border-stone-200 px-6 md:px-12 py-7">
                <div>
                  <Step title={shareWith ? 'Vos coordonnées' : 'En option'}>
                    {shareWith && (
                      <>
                        <input
                          type="text"
                          required
                          minLength={2}
                          maxLength={120}
                          autoComplete="name"
                          aria-label="Votre nom"
                          value={shareName}
                          onChange={(e) => setShareName(e.target.value)}
                          placeholder="Nom"
                          className={`${field} mb-2`}
                        />
                        <input
                          type="tel"
                          minLength={9}
                          maxLength={20}
                          autoComplete="tel"
                          aria-label="Votre téléphone"
                          value={formatPhone(sharePhone)}
                          onChange={(e) => setSharePhone(formatPhone(e.target.value))}
                          placeholder="Téléphone"
                          className={`${field} mb-2`}
                        />
                      </>
                    )}
                    <div className="hidden" aria-hidden="true">
                      <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                    {shareWith && (
                      <p className="mt-4 text-xs text-stone-600 leading-relaxed">
                        Votre nom, votre téléphone, votre e-mail et votre recherche sont transmis uniquement à {shareWith}. En partageant, vous créez aussi votre alerte Loftissime : vous acceptez de recevoir par e-mail les nouveaux biens correspondant à ces critères. Arrêt possible à tout moment.
                      </p>
                    )}
                    {!shareWith && (<>
                    <div className="rounded-[14px] border border-stone-200 bg-white p-4">
                      <button type="button" aria-expanded={wantWhatsapp} onClick={() => setWantWhatsapp(!wantWhatsapp)} className="group flex w-full items-start justify-between gap-3 text-left text-sm text-stone-900 leading-relaxed">
                        <span>
                          <span className="font-medium underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900">Recevoir aussi mes alertes sur WhatsApp</span>
                          <span className="mt-1 block text-xs text-stone-500">
                            Bientôt disponible : laissez votre numéro pour être parmi les premiers. En attendant, vos alertes arrivent par e-mail.
                          </span>
                        </span>
                        <span className={`flex-none text-2xl leading-none text-stone-400 transition-transform ${wantWhatsapp ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                      </button>
                      {wantWhatsapp && (
                        <>
                          <input
                            id="alert-whatsapp"
                            type="tel"
                            required
                            minLength={9}
                            maxLength={20}
                            autoComplete="tel"
                            aria-label="Votre numéro de portable"
                            value={formatPhone(whatsapp)}
                            onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                            placeholder="Votre numéro de portable"
                            className={`${field} mt-3`}
                          />
                          <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                            En indiquant votre numéro, vous acceptez de recevoir vos alertes sur WhatsApp quand le service sera ouvert. Il ne sert à rien d&apos;autre.
                          </p>
                        </>
                      )}
                    </div>
                    </>)}
                    {!shareWith && agencyList.length > 0 && (
                      <div className="mt-4 rounded-[14px] border border-stone-200 bg-white p-4">
                        <button type="button" aria-expanded={share} onClick={() => toggleShare(!share)} className="group flex w-full items-start justify-between gap-3 text-left text-sm text-stone-900 leading-relaxed">
                          <span>
                            <span className="font-medium underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900">Transmettre aussi ma recherche aux agences</span>
                            <span className="mt-1 block text-xs text-stone-500">
                              Elles vous recontactent, y compris pour des biens qui ne sont pas encore en ligne. {MAX_AGENCIES} agences au maximum.
                            </span>
                          </span>
                          <span className={`flex-none text-2xl leading-none text-stone-400 transition-transform ${share ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                        </button>
                        {share && (
                          <>
                            <ul className="mt-3 border border-stone-200 divide-y divide-stone-200 max-h-56 overflow-y-auto">
                              {agencyList.map((a) => {
                                const on = agencySel.includes(a.name);
                                const full = !on && agencySel.length >= MAX_AGENCIES;
                                return (
                                  <li key={a.name}>
                                    <button
                                      type="button"
                                      onClick={() => toggleAgency(a.name)}
                                      aria-pressed={on}
                                      disabled={full}
                                      className="w-full min-h-[44px] flex items-center gap-3 px-3 py-2 text-left disabled:opacity-40"
                                    >
                                      <span className={`h-5 w-5 flex-none border flex items-center justify-center ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-400'}`}>
                                        {on && <Check className="w-3.5 h-3.5" />}
                                      </span>
                                      <span className="flex-1 text-sm text-stone-900">{a.name}</span>
                                      {a.zone && <span className="flex-none text-xs text-stone-500">Dans votre secteur</span>}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                            <p className="mt-2 text-xs text-stone-500">
                              {agencySel.length} / {MAX_AGENCIES} {agencySel.length > 1 ? 'agences choisies' : 'agence choisie'}
                            </p>
                            <input
                              type="text"
                              required
                              minLength={2}
                              maxLength={120}
                              autoComplete="name"
                              aria-label="Votre nom"
                              value={shareName}
                              onChange={(e) => setShareName(e.target.value)}
                              placeholder="Nom"
                              className={`${field} mt-3`}
                            />
                            <input
                              type="tel"
                              minLength={9}
                              maxLength={20}
                              autoComplete="tel"
                              aria-label="Votre téléphone"
                              value={formatPhone(sharePhone)}
                              onChange={(e) => setSharePhone(formatPhone(e.target.value))}
                              placeholder="Téléphone"
                              className={`${field} mt-2`}
                            />
                            <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                              Votre nom, votre téléphone, votre email et votre recherche sont transmis uniquement aux agences cochées.
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </Step>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-stone-200 bg-white px-6 md:px-12 pt-3 pb-4">
              <p className="text-sm text-stone-600 line-clamp-1 md:line-clamp-2" title={recapLine}>
                <span className="font-medium text-stone-900">{shareWith ? 'Votre recherche : ' : 'Votre alerte : '}</span>
                {recapLine}
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  id="alert-email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  aria-label="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className={`${field} sm:flex-1`}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="h-12 flex-none px-7 bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition disabled:opacity-50 flex items-center justify-center rounded-full"
                >
                  {status === 'sending' ? (shareWith ? 'Envoi…' : 'Enregistrement…') : shareWith ? 'Partager ma recherche' : 'Créer mon alerte'}
                </button>
              </div>
              {status === 'error' && (
                <p className="mt-2 text-xs text-red-700">
                  {limit ? (
                    <>Vous avez déjà dix alertes actives avec cet e-mail. Arrêtez-en une depuis <a href="/alerte" className="underline underline-offset-2">Mes alertes</a> pour en créer une nouvelle.</>
                  ) : shareWith ? (
                    'L’envoi a échoué. Vérifiez vos coordonnées et réessayez.'
                  ) : (
                    'L’enregistrement a échoué. Vérifiez votre e-mail et réessayez.'
                  )}
                </p>
              )}
              <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                {shareWith
                  ? 'Gratuit et sans engagement. '
                  : 'Gratuit. En créant votre alerte, vous acceptez de recevoir par e-mail les nouveaux biens correspondant à cette recherche. Arrêt possible à tout moment. '}
                <a href="/confidentialite" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-stone-900">
                  Vos données et vos droits
                </a>
                .
              </p>
            </div>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}

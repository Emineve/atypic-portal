'use client';

import { useEffect, useState } from 'react';
import { Bell, X, Check, MapPin } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

// Passer à true quand l'envoi d'emails sera en place (domaine + service d'envoi)
const ALERT_EMAILS_LIVE = false;

export interface AlertInitial {
  category?: string;
  priceMax?: string;
  surfaceMin?: string;
}

// Types de bien proposés (ceux qui existent dans la base aujourd'hui)
const TYPES = ['Loft & Atelier', "Atelier d'artiste", 'Péniche', 'Rooftop & Vue', 'Biens de caractère'];

// Critères : même liste pour « Indispensable » et « Petits plus »
const FEATURES: [string, string][] = [
  ['terrasse', 'Balcon / terrasse'],
  ['jardin', 'Jardin / cour'],
  ['piscine', 'Piscine'],
  ['dernier-etage', 'Dernier étage'],
  ['plain-pied', 'Plain-pied'],
  ['vue', 'Vue dégagée'],
  ['ascenseur', 'Ascenseur'],
  ['gardien', 'Gardien'],
  ['parking', 'Parking / garage'],
  ['cave', 'Cave'],
];

const BEDROOMS = [1, 2, 3, 4, 5];

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
  const paris = s.match(/^paris\s*0?(\d{1,2})\s*(?:e|er|ème|eme|è)?$/i);
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
        {n && <span className="font-serif text-3xl leading-none text-stone-300">{n}</span>}
        <h3 className="font-serif text-xl text-stone-900">{title}</h3>
        {hint && <span className="text-xs text-stone-400">{hint}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Chip({
  on,
  disabled,
  onClick,
  children,
}: {
  on: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={disabled}
      onClick={onClick}
      className={`h-10 px-4 text-sm border transition ${
        on
          ? 'bg-stone-900 border-stone-900 text-white'
          : disabled
          ? 'bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed'
          : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900'
      }`}
    >
      {children}
    </button>
  );
}

export default function AlertDialog({
  open,
  onClose,
  source,
  suggestions,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  source: string;
  suggestions: string[];
  initial?: AlertInitial;
}) {
  const [locations, setLocations] = useState<string[]>([]);
  const [locInput, setLocInput] = useState('');
  const [remote, setRemote] = useState<Place[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [surfaceMin, setSurfaceMin] = useState('');
  const [surfaceMax, setSurfaceMax] = useState('');
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [budgetMax, setBudgetMax] = useState('');
  const [must, setMust] = useState<string[]>([]);
  const [nice, setNice] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [geo, setGeo] = useState<'idle' | 'loading' | 'denied' | 'error'>('idle');

  // À chaque ouverture : on repart des critères de la recherche en cours
  useEffect(() => {
    if (!open) return;
    setLocations([]);
    setLocInput('');
    setRemote([]);
    setTypes(initial?.category && TYPES.includes(initial.category) ? [initial.category] : []);
    setSurfaceMin(initial?.surfaceMin || '');
    setSurfaceMax('');
    setBedrooms(null);
    setBudgetMax(initial?.priceMax || '');
    setMust([]);
    setNice([]);
    setStatus('idle');
    setGeo('idle');
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
            return city ? { label: `${pc ? pc + ' ' : ''}${city}`, value: city } : null;
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

  function toggleType(t: string) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function toggleMust(k: string) {
    setMust((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  }

  function toggleNice(k: string) {
    setNice((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) {
      setStatus('done');
      return;
    }
    // Un lieu saisi mais pas encore validé est pris en compte
    const finalLocations = locInput.trim() ? [...locations, normalizeLocation(locInput)] : locations;
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_alert', {
        p_kind: 'alert',
        p_email: email,
        p_query: null,
        p_category: null,
        p_price_min: null,
        p_price_max: toNum(budgetMax),
        p_surface_min: toNum(surfaceMin),
        p_rooms_min: null,
        p_consent: consent,
        p_locations: finalLocations.length ? finalLocations : null,
        p_surface_max: toNum(surfaceMax),
        p_bedrooms_min: bedrooms,
        p_must_top_floor: false,
        p_must_view: false,
        p_must_outdoor: false,
        p_source: source,
        p_categories: types.length ? types : null,
        p_must: must.length ? must : null,
        p_nice: nice.length ? nice : null,
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field =
    'w-full border border-stone-300 bg-white px-4 h-12 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition';

  const label = (k: string) => (FEATURES.find((f) => f[0] === k) || [k, k])[1];

  const recap: string[] = [];
  if (types.length) recap.push(types.join(' / '));
  if (locations.length) recap.push(locations.join(', '));
  const sMin = toNum(surfaceMin);
  const sMax = toNum(surfaceMax);
  if (sMin !== null && sMax !== null) recap.push(`${sMin} à ${sMax} m²`);
  else if (sMin !== null) recap.push(`à partir de ${sMin} m²`);
  else if (sMax !== null) recap.push(`jusqu'à ${sMax} m²`);
  if (bedrooms) recap.push(bedrooms >= 5 ? '5+ chambres' : `${bedrooms}+ chambres`);
  if (toNum(budgetMax) !== null) recap.push(`jusqu'à ${formatEuro(toNum(budgetMax) as number)}`);
  must.forEach((k) => recap.push(label(k).toLowerCase()));

  const recapLine = recap.length ? recap.join(' · ') : 'Tous les nouveaux biens, partout en France';

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-6" role="dialog" aria-modal="true" aria-label="Créer une alerte">
      <div className="absolute inset-0 bg-stone-900/60" onClick={onClose} />
      <div className="relative w-full md:max-w-2xl max-h-[94vh] flex flex-col bg-[#FDFBF7] shadow-2xl overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className={`absolute top-2 right-2 z-20 h-9 w-9 flex items-center justify-center transition ${
            status === 'done'
              ? 'text-stone-500 hover:text-stone-900'
              : 'bg-stone-900 text-white border border-stone-600 hover:bg-stone-700'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'done' ? (
          <div className="px-6 md:px-12 py-14 text-center overflow-y-auto">
            <span className="mx-auto h-16 w-16 rounded-full bg-stone-900 text-white flex items-center justify-center">
              <Check className="w-8 h-8" />
            </span>
            <h2 className="mt-7 font-serif text-3xl md:text-4xl text-stone-900 leading-tight">C'est noté, on veille pour vous.</h2>
            <p className="mt-4 text-stone-600 leading-relaxed max-w-md mx-auto">
              Dès qu'un lieu correspond à votre recherche, vous serez parmi les premiers à le savoir. En attendant, bonne exploration.
            </p>
            {recap.length > 0 && (
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {recap.map((r) => (
                  <span key={r} className="text-xs border border-stone-300 bg-white text-stone-700 px-3 py-1.5">
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
              onClick={onClose}
              className="mt-9 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-9 py-4 hover:bg-stone-800 transition"
            >
              Voir les lieux
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col min-h-0 flex-1">
            <div className="flex-1 overflow-y-auto">
              <div className="bg-stone-900 text-white px-6 md:px-12 pt-8 pb-7 md:pt-10 md:pb-9">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-stone-300">
                  <Bell className="w-4 h-4" /> Mon alerte
                </span>
                <h2 className="mt-3 md:mt-4 font-serif text-3xl md:text-4xl leading-[1.1]">Dites-nous ce que vous cherchez.</h2>
                <p className="mt-3 text-sm md:text-base text-stone-300 max-w-md leading-relaxed">
                  Quelques touches suffisent. On vous prévient dès qu'un lieu correspond, sans que vous ayez à revenir le chercher.
                </p>
              </div>
              <div className="px-6 md:px-12 py-8 md:py-10 space-y-10">
                <Step n="1" title="Où ?" hint="Plusieurs possibles. Vide = toute la France.">
                  {locations.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {locations.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLocations(locations.filter((x) => x !== l))}
                          className="inline-flex items-center gap-2 text-sm bg-stone-900 text-white pl-4 pr-3 py-2 hover:bg-stone-700 transition"
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
                      <ul className="absolute left-0 right-0 top-full z-10 border border-t-0 border-stone-300 bg-white shadow-lg">
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

                <Step n="2" title="Quel type de bien ?" hint="Plusieurs possibles. Aucun = tous.">
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                      <Chip key={t} on={types.includes(t)} onClick={() => toggleType(t)}>
                        {t}
                      </Chip>
                    ))}
                  </div>
                </Step>

                <Step n="3" title="Quelle surface ?">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        placeholder="Minimum"
                        aria-label="Surface minimum en mètres carrés"
                        value={surfaceMin}
                        onChange={(e) => setSurfaceMin(e.target.value)}
                        className={`${field} pr-12`}
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">m²</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        placeholder="Maximum"
                        aria-label="Surface maximum en mètres carrés"
                        value={surfaceMax}
                        onChange={(e) => setSurfaceMax(e.target.value)}
                        className={`${field} pr-12`}
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">m²</span>
                    </div>
                  </div>
                </Step>

                <Step n="4" title="Combien de chambres ?" hint="Minimum.">
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Nombre de chambres minimum">
                    {BEDROOMS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-pressed={bedrooms === n}
                        onClick={() => setBedrooms(bedrooms === n ? null : n)}
                        className={`h-12 w-12 text-base border transition ${
                          bedrooms === n
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900'
                        }`}
                      >
                        {n === 5 ? '5+' : n}
                      </button>
                    ))}
                  </div>
                </Step>

                <Step n="5" title="Quel budget maximum ?">
                  <div className="relative">
                    <input
                      id="alert-budget"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="50000"
                      placeholder="ex. 1 200 000"
                      aria-label="Budget maximum en euros"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      className={`${field} pr-12`}
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">€</span>
                  </div>
                </Step>

                <Step title="Indispensable" hint="Le bien doit l'avoir, sinon pas d'alerte.">
                  <div className="flex flex-wrap gap-2">
                    {FEATURES.map(([k, text]) => (
                      <Chip
                        key={k}
                        on={must.includes(k)}
                        disabled={nice.includes(k)}
                        onClick={() => toggleMust(k)}
                      >
                        {text}
                      </Chip>
                    ))}
                  </div>
                </Step>

                <Step title="Petits plus" hint="Un bonus si le bien les a, sans être éliminatoire.">
                  <div className="flex flex-wrap gap-2">
                    {FEATURES.map(([k, text]) => (
                      <Chip
                        key={k}
                        on={nice.includes(k)}
                        disabled={must.includes(k)}
                        onClick={() => toggleNice(k)}
                      >
                        {text}
                      </Chip>
                    ))}
                  </div>
                </Step>

                <div className="border-t border-stone-200 pt-9">
                  <Step title="Où vous prévenir ?">
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
                      className={field}
                    />
                    <div className="hidden" aria-hidden="true">
                      <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    </div>
                    <label className="mt-4 flex items-start gap-3 text-xs text-stone-600 leading-relaxed cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 accent-stone-900"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                      />
                      J'accepte de recevoir par email les nouveaux biens correspondant à cette recherche. Désinscription possible à tout moment.
                    </label>
                    {status === 'error' && (
                      <p className="mt-4 text-xs text-red-700">
                        L'enregistrement a échoué. Vérifiez l'email et réessayez (dix alertes actives au maximum par adresse).
                      </p>
                    )}
                  </Step>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-stone-200 bg-white px-6 md:px-12 py-4">
              <p className="hidden md:block text-[11px] uppercase tracking-widest text-stone-400">Votre alerte</p>
              <p className="md:mt-0.5 text-sm text-stone-800 truncate md:whitespace-normal md:line-clamp-2" title={recapLine}>{recapLine}</p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-3 w-full h-12 md:h-14 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50"
              >
                {status === 'sending' ? 'Enregistrement…' : 'Créer mon alerte'}
              </button>
              <p className="mt-2 text-[11px] text-stone-400 text-center">Gratuit et sans engagement.</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

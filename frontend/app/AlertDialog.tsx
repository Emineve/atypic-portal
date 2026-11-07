'use client';

import { useEffect, useState } from 'react';
import { Bell, X, Check, MapPin, Building2, Eye, Sun } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

// Passer à true quand l'envoi d'emails sera en place (domaine + service d'envoi)
const ALERT_EMAILS_LIVE = false;

export interface AlertInitial {
  category?: string;
  priceMax?: string;
  surfaceMin?: string;
}

const BEDROOMS: [number | null, string][] = [
  [null, 'Peu importe'],
  [1, '1+'],
  [2, '2+'],
  [3, '3+'],
  [4, '4+'],
];

function normalizeLocation(raw: string): string {
  const s = raw.trim().replace(/\s+/g, ' ');
  if (!s) return '';
  const paris = s.match(/^paris\s*0?(\d{1,2})\s*(?:e|er|ème|eme|è)?$/i);
  const bare = s.match(/^0?(\d{1,2})\s*(?:e|er|ème|eme)$/i);
  const m = paris || bare;
  if (m) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 20) return n === 1 ? 'Paris 1er' : `Paris ${n}e`;
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
  const [surfaceMin, setSurfaceMin] = useState('');
  const [surfaceMax, setSurfaceMax] = useState('');
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [budgetMax, setBudgetMax] = useState('');
  const [topFloor, setTopFloor] = useState(false);
  const [view, setView] = useState(false);
  const [outdoor, setOutdoor] = useState(false);
  const [category, setCategory] = useState('');
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
    setSurfaceMin(initial?.surfaceMin || '');
    setSurfaceMax('');
    setBedrooms(null);
    setBudgetMax(initial?.priceMax || '');
    setTopFloor(false);
    setView(false);
    setOutdoor(false);
    setCategory(initial?.category || '');
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

  if (!open) return null;

  function addLocation(raw: string) {
    const loc = normalizeLocation(raw);
    if (!loc) return;
    if (locations.length >= 10) return;
    if (locations.some((l) => plain(l) === plain(loc))) return;
    setLocations([...locations, loc]);
    setLocInput('');
  }

  const typed = plain(locInput.trim());
  const quick = suggestions
    .filter((s) => !locations.some((l) => plain(l) === plain(s)))
    .filter((s) => typed !== '' && plain(s).includes(typed))
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
        p_category: category || null,
        p_price_min: null,
        p_price_max: toNum(budgetMax),
        p_surface_min: toNum(surfaceMin),
        p_rooms_min: null,
        p_consent: consent,
        p_locations: finalLocations.length ? finalLocations : null,
        p_surface_max: toNum(surfaceMax),
        p_bedrooms_min: bedrooms,
        p_must_top_floor: topFloor,
        p_must_view: view,
        p_must_outdoor: outdoor,
        p_source: source,
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field =
    'w-full border border-stone-300 bg-white px-4 h-12 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition';

  const perks: [boolean, () => void, string, React.ReactNode][] = [
    [topFloor, () => setTopFloor((v) => !v), 'Dernier étage', <Building2 key="a" className="w-5 h-5" />],
    [view, () => setView((v) => !v), 'Vue dégagée', <Eye key="b" className="w-5 h-5" />],
    [outdoor, () => setOutdoor((v) => !v), 'Espace extérieur', <Sun key="c" className="w-5 h-5" />],
  ];

  const recap: string[] = [];
  if (category) recap.push(category);
  if (locations.length) recap.push(locations.join(', '));
  const sMin = toNum(surfaceMin);
  const sMax = toNum(surfaceMax);
  if (sMin !== null && sMax !== null) recap.push(`${sMin} à ${sMax} m²`);
  else if (sMin !== null) recap.push(`à partir de ${sMin} m²`);
  else if (sMax !== null) recap.push(`jusqu'à ${sMax} m²`);
  if (bedrooms) recap.push(`${bedrooms}+ chambres`);
  if (toNum(budgetMax) !== null) recap.push(`jusqu'à ${formatEuro(toNum(budgetMax) as number)}`);
  if (topFloor) recap.push('dernier étage');
  if (view) recap.push('vue dégagée');
  if (outdoor) recap.push('espace extérieur');

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
                Quatre critères suffisent. On vous prévient dès qu'un lieu correspond, sans que vous ayez à revenir le chercher.
              </p>
              {category && (
                <button
                  type="button"
                  onClick={() => setCategory('')}
                  className="mt-5 inline-flex items-center gap-2 text-xs border border-stone-500 text-white px-3 py-1.5 hover:bg-white hover:text-stone-900 transition"
                  aria-label={`Retirer le type ${category}`}
                >
                  Type : {category} <X className="w-3.5 h-3.5" />
                </button>
              )}
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
                <div className="flex gap-2">
                  <input
                    id="alert-loc"
                    type="text"
                    value={locInput}
                    onChange={(e) => setLocInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        addLocation(locInput);
                      }
                    }}
                    placeholder="Ville ou arrondissement"
                    aria-label="Ville ou arrondissement"
                    maxLength={80}
                    autoComplete="off"
                    className={field}
                  />
                  <button
                    type="button"
                    onClick={() => addLocation(locInput)}
                    className="shrink-0 h-12 px-5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-700 transition"
                  >
                    Ajouter
                  </button>
                </div>
                {quick.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {quick.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => addLocation(s)}
                        className="text-sm border border-stone-300 bg-white text-stone-700 px-3 py-1.5 hover:border-stone-900 hover:text-stone-900 transition"
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                )}
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

              <Step n="2" title="Quelle surface ?">
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

              <Step n="3" title="Combien de chambres ?">
                <div className="flex border border-stone-300 bg-white divide-x divide-stone-300" role="group" aria-label="Nombre de chambres">
                  {BEDROOMS.map(([value, text]) => (
                    <button
                      key={text}
                      type="button"
                      aria-pressed={bedrooms === value}
                      onClick={() => setBedrooms(value)}
                      className={`h-12 flex-1 px-2 text-sm transition ${
                        bedrooms === value ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </Step>

              <Step n="4" title="Quel budget maximum ?">
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

              <Step title="Les petits plus" hint="Touchez ceux qui sont indispensables.">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {perks.map(([on, toggle, text, icon]) => (
                    <button
                      key={text}
                      type="button"
                      aria-pressed={on}
                      onClick={toggle}
                      className={`flex sm:flex-col items-center sm:items-start gap-3 sm:gap-4 border px-4 py-4 text-left transition ${
                        on
                          ? 'bg-stone-900 border-stone-900 text-white'
                          : 'bg-white border-stone-300 text-stone-800 hover:border-stone-900'
                      }`}
                    >
                      <span className={on ? 'text-white' : 'text-stone-500'}>{icon}</span>
                      <span className="flex-1 sm:flex-none">
                        <span className="block text-sm font-medium">{text}</span>
                        <span className={`block text-[11px] uppercase tracking-wider mt-0.5 ${on ? 'text-stone-300' : 'text-stone-400'}`}>
                          {on ? 'Indispensable' : 'Si possible'}
                        </span>
                      </span>
                      <span
                        className={`sm:hidden h-5 w-5 rounded-full border flex items-center justify-center ${
                          on ? 'bg-white border-white text-stone-900' : 'border-stone-300'
                        }`}
                      >
                        {on && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </button>
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

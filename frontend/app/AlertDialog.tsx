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
    'w-full border border-stone-300 bg-white px-3 h-12 text-base focus:outline-none focus:border-stone-900';
  const label = 'block text-[10px] uppercase tracking-widest text-stone-500';
  const chip = (on: boolean) =>
    `h-11 px-4 text-sm border transition ${
      on ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-300 hover:border-stone-900'
    }`;

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

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-label="Créer une alerte">
      <div className="absolute inset-0 bg-stone-900/50" onClick={onClose} />
      <div className="relative w-full md:max-w-xl max-h-[94vh] overflow-y-auto bg-[#FDFBF7] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 h-14 bg-[#FDFBF7] border-b border-stone-200">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-stone-500">
            <Bell className="w-4 h-4" /> Mon alerte
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="h-11 w-11 -mr-3 flex items-center justify-center text-stone-600 hover:text-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === 'done' ? (
          <div className="px-6 py-10 text-center">
            <span className="mx-auto h-14 w-14 rounded-full bg-stone-900 text-white flex items-center justify-center">
              <Check className="w-7 h-7" />
            </span>
            <h2 className="mt-6 font-serif text-3xl text-stone-900 leading-tight">C'est noté, on veille pour vous.</h2>
            <p className="mt-3 text-stone-600 leading-relaxed">
              Dès qu'un lieu correspond à votre recherche, vous serez parmi les premiers à le savoir. En attendant, bonne exploration.
            </p>
            {recap.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {recap.map((r) => (
                  <span key={r} className="text-xs border border-stone-300 bg-white text-stone-700 px-3 py-1.5">
                    {r}
                  </span>
                ))}
              </div>
            )}
            {!ALERT_EMAILS_LIVE && (
              <p className="mt-6 text-xs text-stone-400">Version de démonstration : aucun email n'est encore envoyé.</p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-8 py-3.5 hover:bg-stone-800 transition"
            >
              Voir les lieux
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="px-6 py-8 space-y-8">
            <div>
              <h2 className="font-serif text-3xl text-stone-900 leading-tight">Dites-nous ce que vous cherchez.</h2>
              <p className="mt-2 text-sm text-stone-600">
                Quatre critères suffisent. On vous prévient dès qu'un lieu correspond, sans que vous ayez à revenir le chercher.
              </p>
              {category && (
                <button
                  type="button"
                  onClick={() => setCategory('')}
                  className="mt-4 inline-flex items-center gap-2 text-xs border border-stone-900 text-stone-900 px-3 py-1.5 hover:bg-stone-900 hover:text-white transition"
                  aria-label={`Retirer le type ${category}`}
                >
                  Type : {category} <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div>
              <label htmlFor="alert-loc" className={label}>1 · Où ? <span className="normal-case tracking-normal text-stone-400">(plusieurs possibles, vide = toute la France)</span></label>
              {locations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLocations(locations.filter((x) => x !== l))}
                      className="inline-flex items-center gap-2 text-sm bg-stone-900 text-white px-3 py-1.5"
                      aria-label={`Retirer ${l}`}
                    >
                      {l} <X className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-2 flex gap-2">
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
                  maxLength={80}
                  autoComplete="off"
                  className={field}
                />
                <button
                  type="button"
                  onClick={() => addLocation(locInput)}
                  className="shrink-0 h-12 px-4 border border-stone-900 text-xs uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition"
                >
                  Ajouter
                </button>
              </div>
              <button
                type="button"
                onClick={locate}
                disabled={geo === 'loading'}
                className="mt-2 inline-flex items-center gap-2 text-sm border border-stone-300 bg-white text-stone-800 px-4 h-11 hover:border-stone-900 transition disabled:opacity-50"
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
              {quick.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {quick.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addLocation(s)}
                      className="text-xs border border-stone-300 bg-white text-stone-600 px-3 py-1.5 hover:border-stone-900 hover:text-stone-900 transition"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className={label}>2 · Quelle surface ? (m²)</span>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  placeholder="Minimum"
                  aria-label="Surface minimum en mètres carrés"
                  value={surfaceMin}
                  onChange={(e) => setSurfaceMin(e.target.value)}
                  className={field}
                />
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  placeholder="Maximum"
                  aria-label="Surface maximum en mètres carrés"
                  value={surfaceMax}
                  onChange={(e) => setSurfaceMax(e.target.value)}
                  className={field}
                />
              </div>
            </div>

            <div>
              <span className={label}>3 · Combien de chambres ?</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {BEDROOMS.map(([value, text]) => (
                  <button
                    key={text}
                    type="button"
                    aria-pressed={bedrooms === value}
                    onClick={() => setBedrooms(value)}
                    className={chip(bedrooms === value)}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="alert-budget" className={label}>4 · Budget maximum (€)</label>
              <input
                id="alert-budget"
                type="number"
                inputMode="numeric"
                min="0"
                step="50000"
                placeholder="ex. 1 200 000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                className={`${field} mt-2`}
              />
            </div>

            <div>
              <span className={label}>Les petits plus <span className="normal-case tracking-normal text-stone-400">(touchez ceux qui sont indispensables)</span></span>
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" aria-pressed={topFloor} onClick={() => setTopFloor((v) => !v)} className={chip(topFloor)}>
                  Dernier étage
                </button>
                <button type="button" aria-pressed={view} onClick={() => setView((v) => !v)} className={chip(view)}>
                  Vue dégagée
                </button>
                <button type="button" aria-pressed={outdoor} onClick={() => setOutdoor((v) => !v)} className={chip(outdoor)}>
                  Espace extérieur
                </button>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-8 space-y-4">
              <div>
                <label htmlFor="alert-email" className={label}>Où vous prévenir ?</label>
                <input
                  id="alert-email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className={`${field} mt-2`}
                />
              </div>
              <div className="hidden" aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <label className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />
                J'accepte de recevoir par email les nouveaux biens correspondant à cette recherche. Désinscription possible à tout moment.
              </label>
              {status === 'error' && (
                <p className="text-xs text-red-700">
                  L'enregistrement a échoué. Vérifiez l'email et réessayez (dix alertes actives au maximum par adresse).
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full h-14 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50"
              >
                {status === 'sending' ? 'Enregistrement…' : 'Créer mon alerte'}
              </button>
              <p className="text-[11px] text-stone-400 text-center">Gratuit et sans engagement.</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { X, Check, Send } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

// L'acheteur décrit sa recherche et la confie à une ou plusieurs agences présentes sur le site
export default function AgencySearch({
  agencies,
  preselected,
  variant = 'button',
  initial,
}: {
  agencies: string[]; // toutes les agences proposées
  preselected?: string[]; // agences cochées à l'ouverture (toutes par défaut)
  variant?: 'button' | 'link';
  initial?: { location?: string; budget?: string; surface?: string };
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(0);
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [surface, setSurface] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function toNum(v: string): number | null {
    const n = Number(v.replace(/[^\d]/g, ''));
    return v.trim() !== '' && Number.isFinite(n) && n > 0 ? n : null;
  }

  const single = preselected && preselected.length === 1 && agencies.length <= 1 ? preselected[0] : null;
  const label = preselected && preselected.length === 1 ? `Confier ma recherche à ${preselected[0]}` : 'Confier ma recherche aux agences';
  const target = selected.length === 1 ? selected[0] : `${selected.length} agences`;

  function openDialog() {
    setSelected(preselected && preselected.length > 0 ? preselected : agencies);
    if (initial?.location && !location) setLocation(initial.location);
    if (initial?.budget && !budget) setBudget(initial.budget);
    if (initial?.surface && !surface) setSurface(initial.surface);
    setStatus('idle');
    setOpen(true);
  }

  function toggle(a: string) {
    setSelected((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setSent(selected.length); setStatus('done'); return; }
    if (selected.length === 0) return;
    setStatus('sending');
    let ok = 0;
    for (const a of selected) {
      try {
        const { data, error } = await getSupabase().rpc('submit_agency_search', {
          p_agency: a,
          p_name: name,
          p_email: email,
          p_phone: tel || null,
          p_location: location || null,
          p_budget_max: toNum(budget),
          p_surface_min: toNum(surface),
          p_message: [message.trim() || null, selected.length > 1 ? `Recherche envoyée à ${selected.length} agences.` : null].filter(Boolean).join(' ') || null,
        });
        if (!error && data === true) ok += 1;
      } catch {
        /* on continue avec les agences suivantes */
      }
    }
    setSent(ok);
    setStatus(ok > 0 ? 'done' : 'error');
  }

  const field = 'w-full h-12 border border-stone-300 bg-white px-3 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-900';

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={
          variant === 'link'
            ? 'inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4'
            : 'mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 border border-stone-900 bg-white px-6 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition'
        }
      >
        <Send className={variant === 'link' ? 'w-3.5 h-3.5 flex-none' : 'w-4 h-4 flex-none'} />
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center text-left" role="dialog" aria-modal="true" aria-label={label}>
          <div className="absolute inset-0 bg-stone-900/40" onClick={() => setOpen(false)} />
          <div className="relative w-full md:max-w-lg max-h-[92vh] bg-white flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200 shrink-0">
              <h2 className="font-serif text-xl text-stone-900">Ma recherche</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="h-11 w-11 -mr-3 flex items-center justify-center text-stone-600 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {status === 'done' ? (
              <div className="px-6 py-10 text-center">
                <span className="mx-auto h-12 w-12 rounded-full bg-stone-900 text-white flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </span>
                <p className="mt-4 font-serif text-2xl text-stone-900">C&apos;est envoyé.</p>
                <p className="mt-2 text-sm text-stone-600">
                  {sent > 1
                    ? `Votre recherche a été transmise à ${sent} agences, qui reviennent vers vous directement.`
                    : `Votre recherche a été transmise à ${selected[0] || 'l’agence'}, qui revient vers vous directement.`}
                </p>
                <button type="button" onClick={() => setOpen(false)} className="mt-6 h-12 px-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition">
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-2">
                  <p className="pb-2 text-sm text-stone-600">
                    Décrivez ce que vous cherchez : {single ? `${single} vous recontacte` : 'les agences choisies vous recontactent'}, y compris pour des biens qui ne sont pas encore en ligne.
                  </p>
                  {!single && (
                    <ul className="mb-3 border border-stone-200 divide-y divide-stone-200 max-h-52 overflow-y-auto">
                      {agencies.map((a) => {
                        const on = selected.includes(a);
                        return (
                          <li key={a}>
                            <button type="button" onClick={() => toggle(a)} aria-pressed={on} className="w-full min-h-[44px] flex items-center gap-3 px-3 py-2 text-left">
                              <span className={`h-5 w-5 flex-none border flex items-center justify-center ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-400'}`}>
                                {on && <Check className="w-3.5 h-3.5" />}
                              </span>
                              <span className="text-sm text-stone-900">{a}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <label className="sr-only" htmlFor="as-loc">Secteur recherché</label>
                  <input id="as-loc" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Secteur recherché (ville, arrondissement, quartier)" className={field} />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="sr-only" htmlFor="as-budget">Budget maximum</label>
                      <input id="as-budget" inputMode="numeric" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget max (€)" className={field} />
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="as-surface">Surface minimum</label>
                      <input id="as-surface" inputMode="numeric" value={surface} onChange={(e) => setSurface(e.target.value)} placeholder="Surface min (m²)" className={field} />
                    </div>
                  </div>
                  <label className="sr-only" htmlFor="as-msg">Précisions</label>
                  <textarea id="as-msg" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ce qui compte pour vous : verrière, terrasse, dernier étage…" className="w-full border border-stone-300 bg-white px-3 py-2.5 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-900" />
                  <div className="pt-3 space-y-2">
                    <label className="sr-only" htmlFor="as-name">Nom</label>
                    <input id="as-name" required minLength={2} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" className={field} />
                    <label className="sr-only" htmlFor="as-tel">Téléphone</label>
                    <input id="as-tel" type="tel" required autoComplete="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Téléphone" className={field} />
                    <label className="sr-only" htmlFor="as-email">E-mail</label>
                    <input id="as-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className={field} />
                    <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" aria-hidden="true" />
                  </div>
                  {status === 'error' && <p className="text-sm text-red-700">L&apos;envoi n&apos;a pas abouti. Vérifiez vos coordonnées et réessayez.</p>}
                </div>
                <div className="border-t border-stone-200 p-4 shrink-0">
                  <button type="submit" disabled={status === 'sending' || selected.length === 0} className="w-full h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50">
                    {status === 'sending' ? 'Envoi en cours…' : selected.length > 1 ? `Envoyer à ${selected.length} agences` : 'Envoyer ma recherche'}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-stone-500">
                    Vos coordonnées sont transmises uniquement {selected.length === 1 ? `à ${target}` : 'aux agences cochées'}.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

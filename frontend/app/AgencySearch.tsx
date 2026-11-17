'use client';

import { useEffect, useState } from 'react';
import { X, Check, Send } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

// Page agence : l'acheteur décrit sa recherche et la confie à l'agence
export default function AgencySearch({ agency }: { agency: string }) {
  const [open, setOpen] = useState(false);
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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setStatus('done'); return; }
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_agency_search', {
        p_agency: agency,
        p_name: name,
        p_email: email,
        p_phone: tel || null,
        p_location: location || null,
        p_budget_max: toNum(budget),
        p_surface_min: toNum(surface),
        p_message: message || null,
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full h-12 border border-stone-300 bg-white px-3 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-900';

  return (
    <>
      <button
        type="button"
        onClick={() => { setStatus('idle'); setOpen(true); }}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 border border-stone-900 bg-white px-6 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition"
      >
        <Send className="w-4 h-4" />
        Confier ma recherche à {agency}
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center text-left" role="dialog" aria-modal="true" aria-label={`Confier ma recherche à ${agency}`}>
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
                  Votre recherche a été transmise à {agency}, qui revient vers vous directement.
                </p>
                <button type="button" onClick={() => setOpen(false)} className="mt-6 h-12 px-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition">
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-2">
                  <p className="pb-2 text-sm text-stone-600">
                    Décrivez ce que vous cherchez : {agency} vous recontacte, y compris pour des biens qui ne sont pas encore en ligne.
                  </p>
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
                  <button type="submit" disabled={status === 'sending'} className="w-full h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50">
                    {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma recherche'}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-stone-500">
                    Vos coordonnées sont transmises uniquement à {agency}.
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

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, X, ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { readVisitor, saveVisitor } from '../../../lib/visitor';

// « Télécharger le plan » : le plan du bien s'affiche après que le visiteur a laissé ses coordonnées,
// transmises à l'agence comme une demande sur ce bien.
export default function PlanDownload({
  listingId,
  plans,
  title,
  variant = 'button',
}: {
  listingId: string;
  plans: string[];
  title?: string | null;
  variant?: 'button' | 'link'; // « link » : lien discret, placé sous le prix sur mobile
}) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const key = `loftissime:plan:${listingId}`;

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

  function openDialog() {
    const v = readVisitor();
    if (!name && v.name) setName(v.name);
    if (!email && v.email) setEmail(v.email);
    if (!tel && v.phone) setTel(v.phone);
    try {
      if (sessionStorage.getItem(key) === '1') setUnlocked(true); // déjà demandé pendant cette visite
    } catch {
      /* stockage indisponible */
    }
    setStatus('idle');
    setOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setUnlocked(true); return; }
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_lead', {
        p_listing: listingId,
        p_name: name.trim().length >= 2 ? name : 'Nom non précisé',
        p_email: email,
        p_phone: tel || null,
        p_message: 'A téléchargé le plan du bien.',
        p_consent: true, // l'envoi vaut accord, la phrase sous le bouton le précise
      });
      if (!error && data === true) {
        saveVisitor({ email });
        try {
          sessionStorage.setItem(key, '1');
        } catch {
          /* stockage indisponible */
        }
        setUnlocked(true);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (plans.length === 0) return null;
  const field = 'w-full h-12 border border-stone-300 bg-white px-3 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-900';

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={
          variant === 'link'
            ? 'inline-flex items-center gap-2 py-2 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-400 hover:decoration-stone-900'
            : 'w-full h-12 inline-flex items-center justify-center gap-2 border border-stone-900 bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-900 hover:text-white transition'
        }
      >
        <Download className="w-4 h-4 flex-none" strokeWidth={variant === 'link' ? 1.5 : 2} />
        Télécharger le plan
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-label="Télécharger le plan">
          <div className="absolute inset-0 bg-stone-900/50" onClick={() => setOpen(false)} />
          <div className={`relative w-full ${unlocked ? 'md:max-w-3xl' : 'md:max-w-md'} max-h-[92vh] bg-white flex flex-col shadow-xl`}>
            <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200 shrink-0">
              <h2 className="font-serif text-xl text-stone-900">{unlocked ? 'Le plan du bien' : 'Télécharger le plan'}</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="h-11 w-11 -mr-3 flex items-center justify-center text-stone-600 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {unlocked ? (
              <div className="overflow-y-auto px-6 py-5 space-y-5">
                {plans.map((src, i) => (
                  <div key={src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Plan ${i + 1} : ${title || 'bien'}`} className="w-full h-auto border border-stone-200" />
                    <a
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-stone-900 underline underline-offset-4"
                    >
                      Ouvrir en grand
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-2">
                  <p className="pb-2 text-sm text-stone-600">Saisissez votre adresse e-mail pour consulter le plan.</p>
                  <label className="sr-only" htmlFor="pl-email">E-mail</label>
                  <input id="pl-email" type="email" required autoFocus autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className={field} />
                  <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" aria-hidden="true" />
                  {status === 'error' && <p className="text-sm text-red-700">L&apos;envoi n&apos;a pas abouti. Vérifiez vos coordonnées et réessayez.</p>}
                </div>
                <div className="border-t border-stone-200 p-4 shrink-0">
                  <button type="submit" disabled={status === 'sending'} className="w-full h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50 flex items-center justify-center sm:w-auto sm:min-w-[16rem] sm:px-10 sm:mx-auto rounded-full">
                    {status === 'sending' ? 'Un instant…' : 'Voir le plan'}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-stone-500">
                    Vos coordonnées sont transmises uniquement à l&apos;agence en charge du bien.
                    {' '}
                    <a href="/confidentialite" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-stone-900">
                      Vos données et vos droits
                    </a>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '../../lib/supabase';
import { formatPhone } from '../../lib/phone';

type Props = { price: number; down: number; years: number; monthly: number };

// Mise en relation avec un courtier : la demande arrive à Loftissime, qui la transmet au courtier, avec le bien et la simulation en cours.
export default function BrokerRequest({ price, down, years, monthly }: Props) {
  const [open, setOpen] = useState(false);
  const [listing, setListing] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('bien') || '';
    if (/^[0-9a-f-]{36}$/i.test(id)) setListing(id);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_financing_request', {
        p_name: name,
        p_phone: phone,
        p_email: email || null,
        p_listing: listing,
        p_price: price > 0 ? Math.round(price) : null,
        p_down: price > 0 ? Math.round(down) : null,
        p_years: years,
        p_monthly: monthly > 0 ? Math.round(monthly) : null,
        p_consent: true, // l'envoi de la demande vaut accord, la phrase sous le bouton le précise
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'placeholder:text-stone-300 mt-1 w-full border-0 border-b border-stone-300 bg-transparent px-0 pb-2 pt-1 font-sans text-lg text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-0';
  const label = 'block text-xs uppercase tracking-widest text-stone-500';
  const btn = 'inline-flex h-12 items-center px-8 bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition rounded-full disabled:opacity-60';

  return (
    <section aria-live="polite" className={`mt-6 rounded-[14px] border bg-white p-6 md:p-8 ${status === 'done' ? 'border-stone-900' : 'border-stone-200'}`}>
      <div className="flex items-start justify-between gap-6">
        <div className="max-w-xl">
          {status === 'done' ? (
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-stone-900 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-stone-900">Votre demande est bien envoyée.</h2>
                <p className="mt-2 text-stone-600 leading-relaxed">Un courtier vous rappelle très vite pour étudier votre projet.</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-stone-900">
                {listing ? 'Un courtier pour financer ce bien ?' : 'Un courtier pour financer votre projet ?'}
              </h2>
              <p className="mt-3 text-stone-600 leading-relaxed">
                Il met les banques en concurrence et défend votre dossier. Laissez vos coordonnées, il vous rappelle.
              </p>
            </>
          )}
        </div>
        <svg viewBox="0 0 72 72" className={`h-20 w-20 flex-none ${status === 'done' ? 'hidden' : 'hidden sm:block'}`} fill="none" stroke="#1c1917" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Un dossier de prêt, tamponné */}
          <path d="M14 10 h30 l10 10 v40 a3 3 0 0 1 -3 3 h-37 a3 3 0 0 1 -3 -3 v-47 a3 3 0 0 1 3 -3 z" fill="#fff" />
          <path d="M44 10 v10 h10" />
          <path d="M20 26 h20 M20 33 h26 M20 40 h14" />
          <circle cx="45" cy="50" r="10" fill="#F4E7B5" />
          <path d="M40.5 50 l3.2 3.2 l6 -6.4" strokeWidth="2" />
        </svg>
      </div>

      {status !== 'done' && !open && (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={() => setOpen(true)} className={btn}>Être contacté(e)</button>
          <span className="text-sm text-stone-500">Gratuit · Sans engagement</span>
        </div>
      )}

      {status !== 'done' && open && (
        <form onSubmit={onSubmit} className="mt-8">
          <div className="grid sm:grid-cols-3 gap-x-8 gap-y-6">
            <label className={label}>
              Prénom et nom
              <input required minLength={2} maxLength={120} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} autoFocus />
            </label>
            <label className={label}>
              Téléphone
              <input required type="tel" inputMode="tel" autoComplete="tel" maxLength={40} value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} className={field} placeholder="06 12 34 56 78" />
            </label>
            <label className={label}>
              E-mail (facultatif)
              <input type="email" autoComplete="email" maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
            </label>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="submit" disabled={status === 'sending'} className={btn}>
              {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
            </button>
            <span className="text-sm text-stone-500">Gratuit · Sans engagement</span>
          </div>
          {status === 'error' && <p className="mt-4 text-sm text-red-700">L&apos;envoi n&apos;a pas fonctionné. Vérifiez votre téléphone et réessayez.</p>}
          <p className="mt-4 text-xs text-stone-500 leading-relaxed">
            En envoyant, vous acceptez que vos coordonnées{price > 0 ? ' et votre simulation' : ''} soient transmises à un courtier, qui vous rappelle au sujet de votre financement.{' '}
            <a href="/confidentialite" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-stone-900">Confidentialité</a>
          </p>
        </form>
      )}
    </section>
  );
}

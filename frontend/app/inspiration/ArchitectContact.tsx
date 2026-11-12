'use client';

import { useState } from 'react';
import { Check, Mail, X } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';

// Lien « Contacter [architecte] » : ouvre un formulaire simple, puis une fenêtre de confirmation.
// L'adresse de l'architecte n'est jamais affichée : la demande passe par Loftissime.
export default function ArchitectContact({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  function close() {
    setOpen(false);
    if (status === 'done') {
      setStatus('idle');
      setMessage('');
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setStatus('done'); return; } // un robot a rempli le champ piège
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_architect_request', {
        p_slug: slug,
        p_name: fullName,
        p_email: email,
        p_phone: phone || null,
        p_message: message,
        p_consent: consent,
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full border border-stone-300 bg-white px-3 py-3 text-base focus:outline-none focus:border-stone-900';
  const label = 'block text-xs uppercase tracking-wider text-stone-500 mb-1';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          'inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4'
        }
      >
        Contacter {name}
        <Mail className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={`Contacter ${name}`}>
          <div className="absolute inset-0 bg-stone-900/60" onClick={close} />
          {status === 'done' ? (
            <div className="relative w-full max-w-md bg-[#FDFBF7] shadow-2xl px-8 py-12 text-center">
              <span className="mx-auto h-16 w-16 rounded-full bg-stone-900 text-white flex items-center justify-center">
                <Check className="w-8 h-8" />
              </span>
              <h2 className="mt-7 font-serif text-3xl text-stone-900 leading-tight">C&apos;est envoyé.</h2>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Votre message est bien enregistré. Loftissime le transmet à {name}.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-9 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-9 py-4 hover:bg-stone-800 transition"
              >
                Poursuivre ma visite
              </button>
            </div>
          ) : (
            <div className="relative w-full max-w-md max-h-full overflow-y-auto bg-[#FDFBF7] shadow-2xl p-6 sm:p-8 text-left">
              <button type="button" onClick={close} aria-label="Fermer" className="absolute top-4 right-4 text-stone-500 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
              <h2 className="pr-8 font-serif text-2xl text-stone-900 leading-tight">Contacter {name}</h2>
              <p className="mt-2 text-sm text-stone-600">Laissez vos coordonnées et votre message : Loftissime le lui transmet.</p>
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="ac-name" className={label}>Votre nom</label>
                  <input id="ac-name" className={field} required minLength={2} maxLength={120} autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="ac-email" className={label}>E-mail</label>
                  <input id="ac-email" type="email" className={field} required maxLength={200} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="ac-phone" className={label}>Téléphone (facultatif)</label>
                  <input id="ac-phone" type="tel" className={field} maxLength={40} autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="ac-msg" className={label}>Votre message</label>
                  <textarea id="ac-msg" rows={4} className={field} required minLength={2} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className="hidden" aria-hidden="true">
                  <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <label className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                  <input type="checkbox" className="mt-0.5" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  J&apos;accepte que ces informations soient enregistrées et transmises à {name} pour traiter ma demande.
                </label>
                {status === 'error' && <p className="text-xs text-red-700">L&apos;envoi a échoué. Vérifiez les champs et réessayez.</p>}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50"
                >
                  {status === 'sending' ? 'Envoi…' : 'Envoyer'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}

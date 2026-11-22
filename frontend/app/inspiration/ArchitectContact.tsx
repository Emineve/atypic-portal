'use client';

import { useState } from 'react';
import { Check, Mail, X } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { formatPhone } from '../../lib/phone';
import { FIELD, LABEL } from '../../lib/form';

// Lien « Contacter [architecte] » : ouvre un formulaire simple, puis une fenêtre de confirmation.
// L'adresse de l'architecte n'est jamais affichée : la demande passe par Loftissime.
export default function ArchitectContact({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
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
        p_consent: true, // l'envoi vaut accord, la phrase du formulaire le précise
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = FIELD;
  const label = LABEL;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          'inline-flex items-center gap-1.5 text-[15px] font-medium text-stone-900 underline underline-offset-4'
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
                className="mt-9 bg-stone-900 text-white text-[15px] font-medium px-9 py-4 hover:bg-stone-800 transition rounded-full"
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
                  <label htmlFor="ac-name" className={label}>Votre nom *</label>
                  <input id="ac-name" className={field} required minLength={2} maxLength={120} autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="ac-email" className={label}>E-mail *</label>
                  <input id="ac-email" type="email" className={field} required maxLength={200} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="ac-phone" className={label}>Téléphone</label>
                  <input id="ac-phone" type="tel" className={field} maxLength={40} autoComplete="tel" value={formatPhone(phone)} onChange={(e) => setPhone(formatPhone(e.target.value))} />
                </div>
                <div>
                  <label htmlFor="ac-msg" className={label}>Votre message *</label>
                  <textarea id="ac-msg" rows={4} className={field} required minLength={2} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div className="hidden" aria-hidden="true">
                  <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  En envoyant, vous acceptez que ces informations soient enregistrées et transmises à {name} pour traiter votre demande.
                </p>
                {status === 'error' && <p className="text-xs text-red-700">L&apos;envoi a échoué. Vérifiez les champs et réessayez.</p>}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full h-12 bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition disabled:opacity-50 flex items-center justify-center sm:w-auto sm:min-w-[16rem] sm:px-10 sm:mx-auto rounded-full"
                >
                  {status === 'sending' ? 'Envoi…' : 'Envoyer'}
                </button>
                <p className="text-center text-xs text-stone-500">
                  <a href="/confidentialite" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-stone-900">
                    Vos données et vos droits
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}

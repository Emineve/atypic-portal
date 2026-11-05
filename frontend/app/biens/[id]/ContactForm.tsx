'use client';

import { useState } from 'react';
import { getSupabase } from '../../../lib/supabase';

export default function ContactForm({ listingId, agency }: { listingId: string; agency: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setStatus('done'); return; } // un robot a rempli le champ piège
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_lead', {
        p_listing: listingId,
        p_name: name,
        p_email: email,
        p_phone: phone || null,
        p_message: message || null,
        p_consent: consent,
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="border border-stone-200 bg-white p-6">
        <p className="font-serif text-lg text-stone-900">Merci, votre demande est enregistrée.</p>
        <p className="mt-2 text-xs text-stone-500 leading-relaxed">
          Version de démonstration : votre message n'est pas transmis à {agency} pour le moment.
        </p>
      </div>
    );
  }

  const field = 'w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900';

  return (
    <form onSubmit={onSubmit} className="border border-stone-200 bg-white p-6 space-y-4">
      <h2 className="font-serif text-xl text-stone-900">Contacter l'agence</h2>
      <p className="text-xs text-stone-500 leading-relaxed bg-stone-50 border border-stone-200 p-3">
        Version de démonstration : votre message est enregistré mais n'est pas transmis à {agency}.
      </p>

      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1" htmlFor="c-name">Nom</label>
        <input id="c-name" className={field} required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1" htmlFor="c-email">Email</label>
        <input id="c-email" type="email" className={field} required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1" htmlFor="c-phone">Téléphone (facultatif)</label>
        <input id="c-phone" type="tel" className={field} maxLength={40} value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1" htmlFor="c-msg">Message (facultatif)</label>
        <textarea id="c-msg" rows={4} className={field} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      {/* Champ piège : invisible pour les humains */}
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <label className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
        <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        J'accepte que mes coordonnées soient enregistrées pour traiter ma demande.
      </label>

      {status === 'error' && (
        <p className="text-xs text-red-700">L'envoi a échoué. Vérifiez les champs et réessayez.</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-4 py-3 hover:bg-stone-800 transition disabled:opacity-50"
      >
        {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
      </button>
    </form>
  );
}

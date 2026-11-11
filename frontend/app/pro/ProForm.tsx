'use client';

import { useState } from 'react';
import { getSupabase } from '../../lib/supabase';

export default function ProForm() {
  const [agency, setAgency] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setStatus('done'); return; }
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_agency_request', {
        p_agency: agency,
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
      <div className="border border-stone-200 bg-white p-8 text-center">
        <h3 className="font-serif text-2xl text-stone-900">Merci, votre demande est enregistrée.</h3>
        <p className="mt-3 text-sm text-stone-600">Nous revenons vers vous très vite pour échanger sur votre catalogue.</p>
      </div>
    );
  }

  const field = 'w-full border border-stone-300 bg-white px-3 py-3 text-base focus:outline-none focus:border-stone-900';
  const label = 'block text-xs uppercase tracking-wider text-stone-500 mb-1';

  return (
    <form onSubmit={onSubmit} className="border border-stone-200 bg-white p-6 md:p-8 space-y-4 text-left">
      <div>
        <label htmlFor="p-agency" className={label}>Agence</label>
        <input id="p-agency" className={field} required minLength={2} maxLength={160} value={agency} onChange={(e) => setAgency(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="p-name" className={label}>Votre nom</label>
          <input id="p-name" className={field} required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="p-phone" className={label}>Téléphone (facultatif)</label>
          <input id="p-phone" type="tel" className={field} maxLength={40} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div>
        <label htmlFor="p-email" className={label}>Email professionnel</label>
        <input id="p-email" type="email" className={field} required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="p-msg" className={label}>Message (facultatif)</label>
        <textarea id="p-msg" rows={4} className={field} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Parlez-nous de votre catalogue de biens atypiques." />
      </div>
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <label className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
        <input type="checkbox" className="mt-0.5" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        J&apos;accepte que ces informations soient enregistrées pour traiter ma demande.
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
  );
}

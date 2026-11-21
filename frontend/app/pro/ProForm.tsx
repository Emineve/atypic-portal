'use client';

import Done from '../Done';
import { useState } from 'react';
import { getSupabase } from '../../lib/supabase';
import { formatPhone } from '../../lib/phone';

export default function ProForm() {
  const [agency, setAgency] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
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
        p_consent: true, // l'envoi vaut accord, la phrase sous le bouton le précise
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const h2 = 'font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900';

  if (status === 'done') {
    return (
      <Done title="Votre demande est bien envoyée." className="rounded-[14px] border border-stone-900 bg-white p-6 md:p-8">
        Nous revenons vers vous dans les meilleurs délais pour échanger sur votre catalogue.
      </Done>
    );
  }

  const field = 'placeholder:text-stone-300 mt-1 w-full border-0 border-b border-stone-300 bg-transparent px-0 pb-2 pt-1 font-sans text-lg text-stone-900 rounded-none focus:outline-none focus:border-stone-900 focus:ring-0';
  const label = 'block text-xs uppercase tracking-wider text-stone-500 mb-1';

  return (
    <>
    <h2 className={h2}>
      Diffusez vos biens atypiques. <span className="italic text-stone-500">Dès maintenant.</span>
    </h2>
    <p className="mt-4 text-lg font-light text-stone-600">Laissez-nous vos coordonnées : nous vous recontactons rapidement pour mettre vos annonces en ligne.</p>
    <form onSubmit={onSubmit} className="mt-8 max-w-2xl rounded-[14px] border border-stone-200 bg-white p-6 md:p-8 space-y-6 text-left">
      <div>
        <label htmlFor="p-agency" className={label}>Agence *</label>
        <input id="p-agency" className={field} required minLength={2} maxLength={160} value={agency} onChange={(e) => setAgency(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="p-name" className={label}>Votre nom *</label>
          <input id="p-name" className={field} required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="p-phone" className={label}>Téléphone</label>
          <input id="p-phone" type="tel" className={field} maxLength={40} value={formatPhone(phone)} onChange={(e) => setPhone(formatPhone(e.target.value))} />
        </div>
      </div>
      <div>
        <label htmlFor="p-email" className={label}>Email professionnel *</label>
        <input id="p-email" type="email" className={field} required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="p-msg" className={label}>Message</label>
        <textarea id="p-msg" rows={3} className={field} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {status === 'error' && <p className="text-xs text-red-700">L&apos;envoi a échoué. Vérifiez les champs et réessayez.</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto sm:min-w-[16rem] sm:px-10 h-12 rounded-full bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition disabled:opacity-50"
      >
        {status === 'sending' ? 'Envoi…' : 'Envoyer'}
      </button>
      <p className="text-xs text-stone-500 leading-relaxed">En envoyant, vous acceptez que ces informations soient enregistrées pour traiter votre demande.</p>
    </form>
    </>
  );
}

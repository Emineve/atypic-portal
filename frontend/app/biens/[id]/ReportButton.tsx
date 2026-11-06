'use client';

import { useState } from 'react';
import { getSupabase } from '../../../lib/supabase';

const REASONS: [string, string][] = [
  ['inexact', 'Information inexacte (prix, surface…)'],
  ['vendu', 'Bien vendu ou plus disponible'],
  ['photos', 'Photos ou description trompeuses'],
  ['illicite', 'Contenu illicite ou droits non respectés'],
  ['autre', 'Autre'],
];

export default function ReportButton({ listingId }: { listingId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('inexact');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // champ piège anti-spam
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setStatus('done'); return; }
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_report', {
        p_listing: listingId,
        p_reason: reason,
        p_message: message || null,
        p_email: email || null,
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return <p className="text-xs text-stone-500 text-center">Merci, votre signalement est enregistré.</p>;
  }

  const field = 'w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900';

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full text-center text-xs text-stone-400 underline underline-offset-4 hover:text-stone-900 transition"
      >
        Signaler cette annonce
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-stone-200 bg-white p-4 space-y-3">
      <h2 className="font-serif text-base text-stone-900">Signaler cette annonce</h2>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1" htmlFor="r-reason">Motif</label>
        <select id="r-reason" className={field} value={reason} onChange={(e) => setReason(e.target.value)}>
          {REASONS.map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1" htmlFor="r-msg">Précisions (facultatif)</label>
        <textarea id="r-msg" rows={3} maxLength={1000} className={field} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1" htmlFor="r-email">Votre email (facultatif)</label>
        <input id="r-email" type="email" maxLength={200} className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {status === 'error' && <p className="text-xs text-red-700">L'envoi a échoué. Réessayez.</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex-1 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 hover:bg-stone-800 transition disabled:opacity-50"
        >
          {status === 'sending' ? 'Envoi…' : 'Envoyer'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-stone-500 hover:text-stone-900 px-3">
          Annuler
        </button>
      </div>
    </form>
  );
}

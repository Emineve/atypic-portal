'use client';

import { useState } from 'react';
import { getSupabase } from '../lib/supabase';

export interface AlertCriteria {
  query: string;
  category: string;
  priceMin: string;
  priceMax: string;
  surfaceMin: string;
  roomsMin: string;
}

function toNum(v: string) {
  return v ? Number(v) : null;
}

export default function AlertBox({
  kind,
  criteria,
}: {
  kind: 'alert' | 'newsletter';
  criteria?: AlertCriteria;
}) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setStatus('done'); return; }
    setStatus('sending');
    try {
      const c = criteria;
      const { data, error } = await getSupabase().rpc('submit_alert', {
        p_kind: kind,
        p_email: email,
        p_query: kind === 'alert' && c?.query ? c.query : null,
        p_category: kind === 'alert' && c && c.category !== 'Tous les biens' ? c.category : null,
        p_price_min: kind === 'alert' && c ? toNum(c.priceMin) : null,
        p_price_max: kind === 'alert' && c ? toNum(c.priceMax) : null,
        p_surface_min: kind === 'alert' && c ? toNum(c.surfaceMin) : null,
        p_rooms_min: kind === 'alert' && c ? toNum(c.roomsMin) : null,
        p_consent: consent,
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const isAlert = kind === 'alert';

  if (status === 'done') {
    return (
      <p className="text-sm text-stone-700">
        {isAlert ? 'Alerte enregistrée.' : 'Inscription enregistrée.'}{' '}
        <span className="text-xs text-stone-400">
          Version de démonstration : aucun email n'est encore envoyé.
        </span>
      </p>
    );
  }

  const field = 'border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900';

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          maxLength={200}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          aria-label="Votre email"
          className={`${field} flex-1`}
        />
        <div className="hidden" aria-hidden="true">
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 hover:bg-stone-800 transition disabled:opacity-50"
        >
          {status === 'sending' ? 'Envoi…' : isAlert ? 'Créer mon alerte' : "Je m'inscris"}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
        <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        {isAlert
          ? "J'accepte de recevoir par email les nouveaux biens correspondant à cette recherche. Désinscription possible à tout moment."
          : "J'accepte de recevoir la lettre SINGULIER. Désinscription possible à tout moment."}
      </label>
      {status === 'error' && (
        <p className="text-xs text-red-700">L'enregistrement a échoué. Vérifiez l'email et réessayez.</p>
      )}
    </form>
  );
}

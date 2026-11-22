'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import { readVisitor, saveVisitor } from '../lib/visitor';

// Favoris sans compte : le visiteur se les envoie par e-mail, avec un lien qui les retrouve sur un autre appareil.
export default function FavoritesByMail({ ids }: { ids: string[] }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  function show() {
    const v = readVisitor();
    if (v.email) setEmail((cur) => cur || v.email || '');
    setOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('send_favorites', { p_email: email, p_listings: ids.slice(0, 20) });
      if (!error && data === true) saveVisitor({ email });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (ids.length === 0) return null;
  if (status === 'done') {
    return <p className="text-sm text-stone-700">C’est envoyé : le lien de vos favoris est dans votre boîte e-mail.</p>;
  }
  if (!open) {
    return (
      <button type="button" onClick={show} className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 transition">
        Recevoir mes favoris par e-mail
      </button>
    );
  }
  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <label htmlFor="fav-mail" className="sr-only">Votre e-mail</label>
      <div className="flex h-12 items-center rounded-full border border-stone-300 bg-white pl-5 pr-1.5 focus-within:border-stone-900">
        <input
          id="fav-mail"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre e-mail *"
          className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-0"
        />
        <button type="submit" disabled={status === 'sending'} aria-label="Recevoir mes favoris par e-mail" className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-800 disabled:opacity-60">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-500">Pour les retrouver sur un autre appareil. Aucun compte à créer.</p>
      {status === 'error' && <p className="mt-2 text-xs text-red-700">L’envoi n’a pas abouti. Vérifiez l’adresse et réessayez.</p>}
    </form>
  );
}

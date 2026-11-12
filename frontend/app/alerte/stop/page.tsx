'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Logo from '../../Logo';
import { getSupabase } from '../../../lib/supabase';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Page ouverte depuis le lien « Arrêter cette alerte » des mails d'alerte.
export default function StopAlertPage() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('t') || '';
    setToken(UUID.test(t) ? t : '');
  }, []);

  async function stop() {
    if (!token) return;
    setStatus('sending');
    try {
      const { error } = await getSupabase().rpc('unsubscribe_alert', { p_token: token });
      setStatus(error ? 'error' : 'done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Logo />
        </div>
      </nav>
      <main className="max-w-md mx-auto px-6 py-20 text-center">
        {status === 'done' ? (
          <>
            <span className="mx-auto h-16 w-16 rounded-full bg-stone-900 text-white flex items-center justify-center">
              <Check className="w-8 h-8" />
            </span>
            <h1 className="mt-7 font-serif text-3xl text-stone-900 leading-tight">Votre alerte est arrêtée.</h1>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Vous ne recevrez plus de mail pour cette alerte. Vous pouvez en créer une nouvelle à tout moment depuis l&apos;accueil.
            </p>
            <Link
              href="/"
              className="mt-9 inline-block bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-9 py-4 hover:bg-stone-800 transition"
            >
              Voir les biens
            </Link>
          </>
        ) : token === '' ? (
          <>
            <h1 className="font-serif text-3xl text-stone-900 leading-tight">Ce lien n&apos;est pas valide.</h1>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Ouvrez le lien « Arrêter cette alerte » depuis le dernier mail que vous avez reçu.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-serif text-3xl text-stone-900 leading-tight">Arrêter cette alerte ?</h1>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Vous ne recevrez plus les nouveaux biens qui correspondent à ces critères.
            </p>
            <button
              type="button"
              onClick={stop}
              disabled={!token || status === 'sending'}
              className="mt-9 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-9 py-4 hover:bg-stone-800 transition disabled:opacity-50"
            >
              {status === 'sending' ? 'Un instant…' : 'Arrêter cette alerte'}
            </button>
            {status === 'error' && (
              <p className="mt-4 text-sm text-red-700">L&apos;arrêt n&apos;a pas fonctionné. Réessayez dans un instant.</p>
            )}
            <p className="mt-6 text-sm">
              <Link href="/" className="text-stone-600 underline underline-offset-4 hover:text-stone-900">
                Non, je la garde
              </Link>
            </p>
          </>
        )}
      </main>
    </div>
  );
}

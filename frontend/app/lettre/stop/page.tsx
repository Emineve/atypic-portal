'use client';

import { useEffect, useState } from 'react';
import Logo from '../../Logo';
import Done from '../../Done';
import { getSupabase } from '../../../lib/supabase';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Désinscription de la lettre, depuis le lien présent dans chaque envoi. Un clic de confirmation, pour qu'un logiciel
// de messagerie qui ouvre les liens ne désinscrive personne par erreur.
export default function LetterStopPage() {
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
      <main className="max-w-md mx-auto px-6 py-20">
        {status === 'done' ? (
          <Done title="Vous êtes désinscrit de la lettre.">Vous ne recevrez plus de numéro. Vous pouvez vous réinscrire à tout moment depuis l’accueil.</Done>
        ) : token === '' ? (
          <>
            <h1 className="font-serif text-3xl text-stone-900 leading-tight">Ce lien n’est pas valide.</h1>
            <p className="mt-4 text-stone-600 leading-relaxed">Ouvrez le lien « Se désinscrire » depuis le dernier numéro reçu.</p>
          </>
        ) : (
          <>
            <h1 className="font-serif text-3xl text-stone-900 leading-tight">Ne plus recevoir la lettre ?</h1>
            <p className="mt-4 text-stone-600 leading-relaxed">Un clic suffit. Votre adresse ne sera plus utilisée.</p>
            <button onClick={stop} disabled={status === 'sending' || token === null} className="mt-8 h-12 rounded-full bg-stone-900 px-7 text-sm font-medium text-[#FBF5E9] disabled:opacity-50">
              {status === 'sending' ? 'Désinscription…' : 'Me désinscrire'}
            </button>
            {status === 'error' && <p role="alert" className="mt-4 text-sm text-red-700">La désinscription n’a pas abouti. Réessayez dans un instant.</p>}
          </>
        )}
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../../Logo';
import Done from '../../Done';
import { getSupabase } from '../../../lib/supabase';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CHOICES: Record<string, string> = {
  loft: 'un loft',
  atelier: 'un atelier d’artiste',
  terrasse: 'un dernier étage avec terrasse',
  maison: 'une maison en ville',
  peniche: 'une péniche',
  surprise: 'la surprise',
};

// Page ouverte depuis le mail de bienvenue : le clic sur « votre atypique idéal » est enregistré ici, dans le navigateur
// (et non à la simple ouverture du lien par un logiciel de messagerie).
export default function LetterAnswerPage() {
  const [status, setStatus] = useState<'wait' | 'done' | 'error'>('wait');
  const [choice, setChoice] = useState('');

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get('t') || '';
    const c = q.get('c') || '';
    if (!UUID.test(t) || !CHOICES[c]) {
      setStatus('error');
      return;
    }
    setChoice(c);
    getSupabase()
      .rpc('letter_answer', { p_token: t, p_choice: c })
      .then(({ data, error }) => setStatus(!error && data === true ? 'done' : 'error'));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Logo />
        </div>
      </nav>
      <main className="max-w-md mx-auto px-6 py-20">
        {status === 'done' && <Done title="C’est noté.">Vous rêvez plutôt de {CHOICES[choice]} : la lettre en tiendra compte.</Done>}
        {status === 'error' && (
          <>
            <h1 className="font-serif text-3xl text-stone-900 leading-tight">Ce lien n’est pas valide.</h1>
            <p className="mt-4 text-stone-600 leading-relaxed">Ouvrez-le depuis le mail de bienvenue de la lettre.</p>
          </>
        )}
        {status !== 'wait' && (
          <p className="mt-9">
            <Link href="/lettre" className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-[#A56C68] decoration-2">Voir la lettre</Link>
          </p>
        )}
      </main>
    </div>
  );
}

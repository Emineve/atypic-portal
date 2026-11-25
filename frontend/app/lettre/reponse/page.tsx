'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../../Logo';
import Done from '../../Done';
import { getSupabase } from '../../../lib/supabase';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CHOICES: Record<string, string> = {
  loft: 'Vous aimez les lofts : nous leur ferons de la place dans les prochains numéros.',
  atelier: 'Vous aimez les ateliers d’artistes : nous leur ferons de la place dans les prochains numéros.',
  terrasse: 'Vous aimez les derniers étages : nous leur ferons de la place dans les prochains numéros.',
  maison: 'Vous aimez les maisons en ville : nous leur ferons de la place dans les prochains numéros.',
  peniche: 'Vous aimez les péniches : nous leur ferons de la place dans les prochains numéros.',
  surprise: 'Vous aimez être surpris : comptez sur nous.',
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
        {status === 'done' && <Done title="Merci, c’est noté.">{CHOICES[choice]}</Done>}
        {status === 'error' && (
          <>
            <h1 className="font-serif text-3xl text-stone-900 leading-tight">Ce lien n’est pas valide.</h1>
            <p className="mt-4 text-stone-600 leading-relaxed">Ouvrez-le depuis le mail de bienvenue ou depuis un numéro de la newsletter.</p>
          </>
        )}
        {status !== 'wait' && (
          <p className="mt-9">
            <Link href="/guide" className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Lire nos articles en attendant</Link>
          </p>
        )}
      </main>
    </div>
  );
}

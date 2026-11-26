'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../../Logo';
import { getSupabase } from '../../../lib/supabase';
import { MOIS, NEWSLETTERS } from '../../../lib/newsletters';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Chaque réponse renvoie au thème de l'année qui lui est consacré : on annonce son mois, sur sa matière
const CHOICES: Record<string, { gout: string; theme: string }> = {
  loft: { gout: 'Vous aimez les lofts.', theme: 'brique' },
  atelier: { gout: 'Vous aimez les ateliers d’artistes.', theme: 'verriere' },
  terrasse: { gout: 'Vous aimez les derniers étages.', theme: 'zinc' },
  maison: { gout: 'Vous aimez les maisons en ville.', theme: 'cour-pavee' },
  peniche: { gout: 'Vous aimez les péniches.', theme: 'a-flot' },
  surprise: { gout: 'Vous aimez être surpris.', theme: 'beton-cire' },
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

  const theme = NEWSLETTERS.find((n) => n.slug === CHOICES[choice]?.theme);
  const mois = theme ? MOIS[theme.mois - 1] : '';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90">
        <div className="max-w-6xl mx-auto px-6 h-[68px] md:h-20 flex items-center">
          <Logo className="text-[1.9rem] md:text-[2.25rem]" />
        </div>
      </nav>
      {status === 'done' && theme && (
        <main>
          {/* la matière du thème, et la réponse posée dessus */}
          <div className="px-6 py-12 md:py-24" style={theme.matiere}>
            <div className="mx-auto max-w-xl rounded-[14px] border-2 border-stone-900 bg-[#FDFBF7] p-7 shadow-[6px_6px_0_#211C15] md:p-12">
              <p className="text-[15px] font-medium text-stone-600">Merci, c’est noté.</p>
              <h1 className="mt-3 font-serif text-3xl leading-[1.1] text-stone-900 md:text-4xl">
                {CHOICES[choice].gout} <span className="italic text-stone-500">Rendez-vous en {mois}.</span>
              </h1>
              <p className="mt-8 text-[15px] text-stone-600">Le numéro de {mois}</p>
              <p className="mt-1 font-serif text-6xl italic leading-none text-stone-900 md:text-7xl">{theme.nom}</p>
              <p className="mt-4 text-lg leading-relaxed text-stone-700">{theme.sujet}</p>
              <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-medium text-stone-900">
                <Link href={`/theme/${theme.slug}`} className="underline underline-offset-4 decoration-stone-400">Découvrir ce numéro</Link>
                <Link href="/#nl-annee" className="underline underline-offset-4 decoration-stone-400">Voir le calendrier</Link>
              </p>
            </div>
          </div>
        </main>
      )}
      {status === 'error' && (
        <main className="max-w-md mx-auto px-6 py-20">
          <h1 className="font-serif text-3xl text-stone-900 leading-tight">Ce lien n’est pas valide.</h1>
          <p className="mt-4 text-stone-600 leading-relaxed">Ouvrez-le depuis le mail de bienvenue ou depuis un numéro de la newsletter.</p>
          <p className="mt-9">
            <Link href="/guide" className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Lire nos ressources en attendant</Link>
          </p>
        </main>
      )}
    </div>
  );
}

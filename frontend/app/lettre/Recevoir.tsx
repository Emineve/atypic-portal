'use client';

import { useRef, useState } from 'react';
import { useFocusRecevoir } from '../../lib/useFocusRecevoir';
import { ArrowRight } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { FIELD, LABEL } from '../../lib/form';

// La carte d'inscription, la même que sur l'accueil : une phrase, un e-mail, un bouton.
// `cadre` : faux quand la carte est déjà fournie par la page (la grande carte d'un thème).
export default function Recevoir({ titre, texte, source, cadre = true }: { titre: React.ReactNode; texte?: string; source: string; cadre?: boolean }) {
  const [email, setEmail] = useState('');
  const [etat, setEtat] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const champ = useRef<HTMLInputElement>(null);
  useFocusRecevoir(champ);

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEtat('busy');
    try {
      const { data, error } = await getSupabase().rpc('subscribe_letters', { p_email: email, p_consent: true, p_letters: [], p_source: source });
      setEtat(!error && data === true ? 'done' : 'error');
    } catch {
      setEtat('error');
    }
  }

  return (
    <div id="recevoir" className={`scroll-mt-28 ${cadre ? 'rounded-[18px] border-2 border-stone-900 bg-white p-6 shadow-[6px_6px_0_#211C15] md:p-8' : ''}`}>
      {etat === 'done' ? (
        <div role="status">
          <p className="font-serif text-4xl italic leading-none text-stone-900 md:text-5xl">Bienvenue à bord !</p>
          <p className="mt-4 font-serif text-2xl leading-snug text-stone-900">Vous êtes des nôtres. Ce numéro arrivera dans votre boîte mail.</p>
          <p className="mt-5 leading-relaxed text-stone-700">
            En attendant, voici votre cadeau :{' '}
            <a href="/dix-questions" className="font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">dix questions à poser avant d’acheter un bien atypique</a>.
          </p>
        </div>
      ) : (
        <form onSubmit={envoyer}>
          <p className="font-serif text-2xl leading-tight text-stone-900 md:text-[1.7rem]">{titre}</p>
          {texte && <p className="mt-3 leading-relaxed text-stone-700">{texte}</p>}
          <label className={`${LABEL} mt-5`}>
            Votre e-mail <span aria-hidden="true">*</span>
            <input type="email" required autoComplete="email" inputMode="email" placeholder="vous@exemple.fr" value={email} ref={champ} onChange={(e) => setEmail(e.target.value)} className={`${FIELD} !h-14`} />
          </label>
          <button type="submit" disabled={etat === 'busy'} className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-stone-900 bg-[#F6CF4E] px-6 text-[15px] font-semibold text-stone-900 transition [@media(hover:hover)]:hover:bg-[#EFC22F] active:bg-[#EFC22F] disabled:opacity-50 sm:w-auto">
            {etat === 'busy' ? 'Inscription…' : 'Je m’abonne'}
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          </button>
          <p className="mt-4 text-sm leading-relaxed text-stone-500">
            <a href="/confidentialite" className="underline underline-offset-2">Votre adresse reste privée</a>. Pas de spam, désinscription en un clic.
          </p>
          {etat === 'error' && <p role="alert" className="mt-3 text-sm text-red-700">L’inscription n’a pas abouti. Vérifiez votre adresse et réessayez.</p>}
        </form>
      )}
    </div>
  );
}

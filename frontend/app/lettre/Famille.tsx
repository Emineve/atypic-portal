'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { FIELD, LABEL } from '../../lib/form';
import { NEWSLETTERS } from '../../lib/newsletters';

// Les newsletters de Loftissime, sur l'accueil : on coche celles qu'on veut, on laisse son e-mail, une seule fois.
// « Béton ciré » est ouverte et cochée d'office ; les autres sont annoncées, et les cases cochées diront laquelle ouvrir ensuite.
// `extrait` : le cadre vidéo du dernier numéro de Béton ciré, affiché dans sa carte.

export default function Famille({ extrait }: { extrait?: React.ReactNode }) {
  const [choix, setChoix] = useState<string[]>(['beton-cire']);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [fini, setFini] = useState(false);

  const bascule = (slug: string) => setChoix((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]));

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (!choix.length) {
      setError('Cochez au moins une newsletter.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { data, error: err } = await getSupabase().rpc('subscribe_letters', { p_email: email, p_consent: true, p_letters: choix, p_source: 'lettre-accueil' });
      if (err || data !== true) throw new Error('refus');
      setFini(true);
    } catch {
      setError('L’inscription n’a pas abouti. Vérifiez votre adresse et réessayez.');
    }
    setBusy(false);
  }

  const [premiere, ...autres] = NEWSLETTERS;
  const aVenir = choix.filter((s) => s !== 'beton-cire').map((s) => NEWSLETTERS.find((n) => n.slug === s)?.nom).filter(Boolean);

  const carte = (n: (typeof NEWSLETTERS)[number], grande = false) => {
    const on = choix.includes(n.slug);
    return (
      <label
        key={n.slug}
        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[14px] bg-white transition-shadow focus-within:ring-2 focus-within:ring-stone-900 focus-within:ring-offset-2 ${on ? 'shadow-[0_0_0_2px_#211C15]' : 'shadow-[0_0_0_1px_#e7e0d3] hover:shadow-[0_0_0_1px_#211C15]'} ${grande ? 'sm:col-span-2 lg:row-span-2' : ''}`}
      >
        <input type="checkbox" className="sr-only" checked={on} disabled={fini} onChange={() => bascule(n.slug)} />
        <span aria-hidden className={`block w-full ${grande ? 'h-28 lg:h-36' : 'h-20'}`} style={n.matiere} />
        <span aria-hidden className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900/40 bg-white/85 text-transparent'}`}>
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </span>
        <span className="flex flex-1 flex-col p-5">
          <span className="text-xs text-stone-500">{n.ouverte ? 'Premier numéro bientôt' : 'À venir'}</span>
          <span className={`mt-1 font-serif italic leading-none text-stone-900 ${grande ? 'text-5xl' : 'text-[1.7rem]'}`}>{n.nom}</span>
          <span className={`mt-2.5 text-stone-900 ${grande ? 'text-lg' : 'text-[15px] leading-snug'}`}>{n.sujet}</span>
          <span className={`mt-1.5 text-stone-500 ${grande ? 'text-[15px]' : 'text-[13px] leading-snug'}`}>L’addition : {n.addition.charAt(0).toLowerCase() + n.addition.slice(1)}</span>
          {grande && extrait && <span className="mt-5 block">{extrait}</span>}
        </span>
      </label>
    );
  };

  return (
    <form id="recevoir" onSubmit={envoyer} className="scroll-mt-24">
      <div role="group" aria-label="Les newsletters à recevoir" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {carte(premiere, true)}
        {autres.map((n) => carte(n))}

      {/* la boîte d'inscription occupe les deux dernières cases de la grille */}
      <div className="flex flex-col justify-center rounded-[14px] bg-[#211C15] p-6 text-[#FBF5E9] sm:col-span-2 md:p-7">
        {fini ? (
          <p role="status" className="font-serif text-2xl leading-snug">
            C’est noté. {choix.includes('beton-cire') && <>Vous recevrez le prochain numéro de <em>Béton ciré</em>. </>}
            {aVenir.length > 0 && <span className="italic text-stone-400">Nous vous écrirons à l’ouverture de {aVenir.join(', ')}.</span>}
          </p>
        ) : (
          <div className="grid gap-y-5">
            <div>
              <p className="font-serif text-2xl leading-tight">
                {choix.length === 0 ? 'Cochez vos newsletters,' : choix.length === 1 ? 'Une newsletter choisie,' : `${choix.length} newsletters choisies,`} <span className="italic text-stone-400">un seul e-mail à laisser.</span>
              </p>
            </div>
            <div>
              <label className={`${LABEL} !text-[#FBF5E9]`}>
                Votre e-mail <span aria-hidden="true">*</span>
                <span className="relative mt-1.5 block">
                  <input type="email" required autoComplete="email" inputMode="email" placeholder="vous@exemple.fr" value={email} onChange={(e) => setEmail(e.target.value)} className={`${FIELD} !mt-0 !pr-14`} />
                  <button type="submit" disabled={busy} aria-label="Recevoir les newsletters cochées" className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-700 disabled:opacity-50">
                    <ArrowRight aria-hidden="true" className={`h-5 w-5 ${busy ? 'animate-pulse' : ''}`} strokeWidth={2} />
                  </button>
                </span>
              </label>
              {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
              <p className="mt-3 text-xs leading-relaxed text-stone-400">
                C’est gratuit. En vous inscrivant, vous acceptez de recevoir les newsletters cochées. Désinscription en un clic dans chaque numéro.{' '}
                <a href="/confidentialite" className="underline underline-offset-2">Confidentialité</a>
              </p>
            </div>
          </div>
        )}
      </div>
      </div>
    </form>
  );
}

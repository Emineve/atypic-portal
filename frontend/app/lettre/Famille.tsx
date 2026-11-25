'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, Check, Plus, X } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { FIELD, LABEL } from '../../lib/form';
import { NEWSLETTERS, type Newsletter } from '../../lib/newsletters';

// Les newsletters de Loftissime, sur l'accueil. Le parcours tient en deux temps :
// 1. on laisse son e-mail, une fois, pour « Béton ciré » (ou pour celles qu'on a choisies dans les cartes) ;
// 2. une fois inscrit, chaque autre carte propose « Ajouter » : un geste, sans rien ressaisir.
// `extrait` : le cadre vidéo du dernier numéro de Béton ciré, affiché dans sa carte.

const nomDe = (slug: string) => NEWSLETTERS.find((n) => n.slug === slug)?.nom || slug;
const liste = (noms: string[]) => (noms.length <= 1 ? noms.join('') : `${noms.slice(0, -1).join(', ')} et ${noms[noms.length - 1]}`);

export default function Famille({ extrait }: { extrait?: React.ReactNode }) {
  const [choix, setChoix] = useState<string[]>(['beton-cire']); // avant l'inscription
  const [touche, setTouche] = useState(false); // l'abonné a-t-il choisi lui-même dans les cartes ?
  const [abonne, setAbonne] = useState<string[] | null>(null); // après l'inscription : ce qui est enregistré
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const boite = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLInputElement>(null);
  const [boiteVisible, setBoiteVisible] = useState(true);

  // le rappel fixe n'a de sens que lorsque la boîte d'inscription est sortie de l'écran
  useEffect(() => {
    const el = boite.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setBoiteVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const inscrire = async (slugs: string[]) => {
    const { data, error: err } = await getSupabase().rpc('subscribe_letters', { p_email: email, p_consent: true, p_letters: slugs, p_source: 'lettre-accueil' });
    if (err || data !== true) throw new Error('refus');
  };

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    if (!choix.length) {
      setError('Choisissez au moins une newsletter.');
      return;
    }
    setBusy('form');
    setError('');
    try {
      await inscrire(choix);
      setAbonne(choix);
    } catch {
      setError('L’inscription n’a pas abouti. Vérifiez votre adresse et réessayez.');
    }
    setBusy(null);
  }

  // Sur une carte : avant l'inscription on compose son choix, après on ajoute d'un geste
  async function surCarte(slug: string) {
    if (!abonne) {
      setTouche(true);
      setChoix((c) => (c.includes(slug) ? c.filter((x) => x !== slug) : [...c, slug]));
      return;
    }
    if (abonne.includes(slug) || busy) return;
    setBusy(slug);
    setError('');
    try {
      await inscrire([slug]);
      setAbonne((a) => [...(a || []), slug]);
    } catch {
      setError(`${nomDe(slug)} n’a pas pu être ajoutée. Réessayez dans un instant.`);
    }
    setBusy(null);
  }

  const versLaBoite = () => {
    boite.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => champ.current?.focus({ preventScroll: true }), 450);
  };

  const [premiere, ...autres] = NEWSLETTERS;
  const restantes = abonne ? NEWSLETTERS.filter((n) => !abonne.includes(n.slug)).length : 0;

  const bouton = (n: Newsletter) => {
    const on = abonne ? abonne.includes(n.slug) : choix.includes(n.slug);
    const texte = abonne ? (on ? (n.ouverte ? 'Abonné' : 'Vous serez prévenu') : busy === n.slug ? 'Ajout…' : 'Ajouter') : on ? 'Choisie' : 'Choisir';
    return (
      <button
        type="button"
        onClick={() => surCarte(n.slug)}
        aria-pressed={on}
        aria-label={`${texte} : ${n.nom}`}
        disabled={!!abonne && on}
        className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900 bg-white text-stone-900 hover:bg-stone-900 hover:text-white'}`}
      >
        {on ? <Check aria-hidden className="h-4 w-4" strokeWidth={2.5} /> : <Plus aria-hidden className="h-4 w-4" strokeWidth={2.5} />}
        {texte}
      </button>
    );
  };

  const cadre = (on: boolean) => `overflow-hidden rounded-[14px] bg-white ${on ? 'shadow-[0_0_0_2px_#211C15]' : 'shadow-[0_0_0_1px_#e7e0d3]'}`;
  const estOn = (slug: string) => (abonne ? abonne.includes(slug) : choix.includes(slug));

  return (
    <div>
      {/* 1. L'inscription : une seule adresse à laisser, en haut de page */}
      <div ref={boite} id="recevoir" className="scroll-mt-28 rounded-[14px] bg-[#211C15] p-6 text-[#FBF5E9] md:p-8">
        {abonne ? (
          <div role="status">
            <p className="font-serif text-2xl leading-snug md:text-3xl">
              C’est noté. {abonne.includes('beton-cire') && <>Vous recevrez le prochain numéro de <em>Béton ciré</em>.</>}
            </p>
            {abonne.filter((s) => s !== 'beton-cire').length > 0 && (
              <p className="mt-2 text-stone-300">Nous vous écrirons à l’ouverture de {liste(abonne.filter((s) => s !== 'beton-cire').map(nomDe))}.</p>
            )}
            {restantes > 0 && <p className="mt-4 font-serif text-xl italic text-stone-400">D’autres vous tentent ? Ajoutez-les d’un geste, juste en dessous.</p>}
          </div>
        ) : (
          <form onSubmit={envoyer} className="grid items-end gap-x-12 gap-y-5 lg:grid-cols-[1fr_minmax(0,26rem)]">
            <div>
              <p className="font-serif text-2xl leading-tight md:text-3xl">
                {choix.length === 0 ? 'Choisissez vos newsletters,' : `Recevez ${liste(choix.map(nomDe))},`} <span className="italic text-stone-400">{choix.length > 1 ? 'un seul e-mail à laisser.' : 'laissez votre e-mail.'}</span>
              </p>
              {choix.length > 1 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {choix.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => surCarte(s)} aria-label={`Retirer ${nomDe(s)}`} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-stone-500 pl-3 pr-2 text-sm text-[#FBF5E9] hover:border-[#FBF5E9]">
                        <span className="font-serif italic">{nomDe(s)}</span>
                        <X aria-hidden className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-sm leading-relaxed text-stone-400">Vous pourrez en ajouter d’autres juste après, d’un geste.</p>
            </div>
            <div>
              <label className={`${LABEL} !text-[#FBF5E9]`}>
                Votre e-mail <span aria-hidden="true">*</span>
                <span className="relative mt-1.5 block">
                  <input ref={champ} type="email" required autoComplete="email" inputMode="email" placeholder="vous@exemple.fr" value={email} onChange={(e) => setEmail(e.target.value)} className={`${FIELD} !mt-0 !pr-14`} />
                  <button type="submit" disabled={busy === 'form'} aria-label="Recevoir les newsletters choisies" className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-700 disabled:opacity-50">
                    <ArrowRight aria-hidden="true" className={`h-5 w-5 ${busy === 'form' ? 'animate-pulse' : ''}`} strokeWidth={2} />
                  </button>
                </span>
              </label>
              <p className="mt-3 text-xs leading-relaxed text-stone-400">
                C’est gratuit. En vous inscrivant, vous acceptez de recevoir les newsletters choisies. Désinscription en un clic dans chaque numéro.{' '}
                <a href="/confidentialite" className="underline underline-offset-2">Confidentialité</a>
              </p>
            </div>
          </form>
        )}
        {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
      </div>

      {/* 2. Les newsletters : la première en grand, les autres à ajouter */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className={`${cadre(estOn(premiere.slug))} flex flex-col sm:col-span-2 lg:row-span-2`}>
          <span aria-hidden className="block h-24 w-full lg:h-32" style={premiere.matiere} />
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <p className="text-xs text-stone-500">Premier numéro bientôt</p>
            <h2 className="mt-1 font-serif text-5xl italic leading-none text-stone-900"><a href="/lettre">{premiere.nom}</a></h2>
            <p className="mt-3 text-lg text-stone-900">{premiere.sujet}</p>
            <p className="mt-1.5 text-[15px] text-stone-500">L’addition : {premiere.addition.charAt(0).toLowerCase() + premiere.addition.slice(1)}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              {bouton(premiere)}
              <a href="/lettre" className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Découvrir Béton ciré</a>
            </div>
            {extrait && <a href="/lettre" aria-label="Découvrir Béton ciré" className="mt-5 block">{extrait}</a>}
          </div>
        </article>

        {autres.map((n) => (
          <article key={n.slug} className={`${cadre(estOn(n.slug))} flex sm:flex-col`}>
            {/* sur téléphone la matière est une bande à gauche : la liste reste courte */}
            <span aria-hidden className="block w-20 shrink-0 self-stretch sm:h-20 sm:w-full sm:self-auto" style={n.matiere} />
            <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
              <p className="text-xs text-stone-500">À venir</p>
              <h2 className="mt-0.5 font-serif text-[1.6rem] italic leading-none text-stone-900">{n.nom}</h2>
              <p className="mt-2 text-[15px] leading-snug text-stone-900">{n.sujet}</p>
              <p className="mt-1.5 hidden text-[13px] leading-snug text-stone-500 sm:block">L’addition : {n.addition.charAt(0).toLowerCase() + n.addition.slice(1)}</p>
              <div className="mt-3 sm:mt-auto sm:pt-4">{bouton(n)}</div>
            </div>
          </article>
        ))}

        {/* les deux dernières cases, sur grand écran : ce que toutes les newsletters ont en commun */}
        <div className="hidden rounded-[14px] border border-dashed border-stone-400 p-6 lg:col-span-2 lg:flex lg:flex-col lg:justify-center">
          <p className="font-serif text-2xl leading-tight text-stone-900">Dans chaque numéro, <span className="italic text-stone-500">les mêmes cinq temps.</span></p>
          <ol className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[15px] text-stone-700">
            {['Un bien à la une, en vidéo', 'L’addition, sans rien oublier', 'Avant la promesse, un point de vigilance', 'Trois autres biens repérés', 'La question posée aux abonnés'].map((t, i) => (
              <li key={t} className="flex gap-2">
                <span className="font-serif italic text-stone-500">{i + 1}.</span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Avant l'inscription, quand on a choisi dans les cartes : un rappel fixe ramène à l'e-mail */}
      {!abonne && touche && !boiteVisible && choix.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <button type="button" onClick={versLaBoite} className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full bg-stone-900 px-5 text-sm font-medium text-white shadow-lg ring-1 ring-white/20">
            <ArrowUp aria-hidden className="h-4 w-4" />
            {choix.length === 1 ? `Recevoir ${nomDe(choix[0])}` : `Recevoir mes ${choix.length} newsletters`}
          </button>
        </div>
      )}
    </div>
  );
}

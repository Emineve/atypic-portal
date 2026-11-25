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

// `intro` : le titre et la phrase de mission, écrits côté serveur, placés à gauche de la carte d'inscription.
export default function Famille({ extrait, intro }: { extrait?: React.ReactNode; intro?: React.ReactNode }) {
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
        className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900 bg-white text-stone-900 [@media(hover:hover)]:hover:bg-stone-900 [@media(hover:hover)]:hover:text-white active:bg-stone-100'}`}
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
      {/* 1. La promesse à gauche, la carte d'inscription à droite : une seule action dès l'ouverture */}
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[1.25fr_1fr]">
        <div>{intro}</div>
        <div ref={boite} id="recevoir" className="scroll-mt-28 rounded-[18px] border-2 border-stone-900 bg-white p-6 shadow-[6px_6px_0_#211C15] md:p-8">
          {abonne ? (
            <div role="status">
              <p className="font-serif text-2xl leading-snug text-stone-900">
                C’est noté. {abonne.includes('beton-cire') && <>Vous recevrez le prochain numéro de <em>Béton ciré</em>.</>}
              </p>
              {abonne.filter((s) => s !== 'beton-cire').length > 0 && (
                <p className="mt-2 text-stone-700">Nous vous écrirons à l’ouverture de {liste(abonne.filter((s) => s !== 'beton-cire').map(nomDe))}.</p>
              )}
              <p className="mt-4">
                <a href="/dix-questions" className="font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Votre guide : dix questions à poser avant d’acheter un bien atypique</a>
              </p>
              {restantes > 0 && <p className="mt-4 text-sm text-stone-500">D’autres newsletters vous tentent ? Ajoutez-les d’un geste, plus bas.</p>}
            </div>
          ) : (
            <form onSubmit={envoyer}>
              <p className="font-serif text-2xl leading-tight text-stone-900 md:text-[1.7rem]">Vous êtes à un e-mail de votre premier bien atypique, gratuitement.</p>
              <p className="mt-3 leading-relaxed text-stone-700">
                Une newsletter par type d’acheteur. <em>Béton ciré</em> ouvre la série. En prime, notre guide : dix questions à poser avant d’acheter un bien atypique.
              </p>
              <label className={`${LABEL} mt-5`}>
                {choix.length === 0 ? 'Choisissez une newsletter plus bas, puis votre e-mail' : choix.length === 1 && choix[0] === 'beton-cire' ? 'Votre e-mail' : `Votre e-mail, pour ${liste(choix.map(nomDe))}`} <span aria-hidden="true">*</span>
                <input ref={champ} type="email" required autoComplete="email" inputMode="email" placeholder="vous@exemple.fr" value={email} onChange={(e) => setEmail(e.target.value)} className={`${FIELD} !h-14`} />
              </label>
              {choix.length > 1 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {choix.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => surCarte(s)} aria-label={`Retirer ${nomDe(s)}`} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-stone-300 bg-white pl-3 pr-2 text-sm text-stone-900">
                        <span className="font-serif italic">{nomDe(s)}</span>
                        <X aria-hidden className="h-3.5 w-3.5 text-stone-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button type="submit" disabled={busy === 'form'} className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-6 text-[15px] font-medium text-white transition hover:bg-stone-700 disabled:opacity-50 sm:w-auto">
                {busy === 'form' ? 'Inscription…' : 'S’abonner gratuitement'}
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </button>
              <p className="mt-4 text-sm leading-relaxed text-stone-500">
                <a href="/confidentialite" className="underline underline-offset-2">Votre adresse reste privée</a>. Nous ne la vendrons jamais. Désinscription en un clic.
              </p>
            </form>
          )}
          {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
        </div>
      </div>

      {/* Ce que contient chaque numéro, en trois mots. Pas de chiffre d'audience tant qu'il n'y en a pas. */}
      <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 bg-[#211C15] text-[#FBF5E9] md:mt-20">
        <ul className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-x-10 gap-y-2 px-6 py-7 text-center font-serif text-2xl md:flex-row md:py-9 md:text-3xl">
          <li>Le bien</li>
          <li aria-hidden className="hidden text-[#F6CF4E] md:block">✦</li>
          <li>Le projet</li>
          <li aria-hidden className="hidden text-[#F6CF4E] md:block">✦</li>
          <li>L’addition</li>
        </ul>
      </div>

      {/* 2. La première newsletter, seule sur sa ligne */}
      <section className="mt-14 md:mt-20" aria-labelledby="nl-premiere">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-stone-900 pt-4">
          <h2 className="font-serif text-3xl leading-tight text-stone-900 md:text-4xl">Nos newsletters</h2>
          <p className="text-sm text-stone-500">La première, premier numéro bientôt</p>
        </div>
        <article className={`${cadre(estOn(premiere.slug))} mt-6 grid md:grid-cols-2`}>
          <div className="flex flex-col justify-center p-7 md:p-12">
            <h2 id="nl-premiere" className="font-serif text-6xl italic leading-none text-stone-900 md:text-7xl"><a href="/lettre">{premiere.nom}</a></h2>
            <p className="mt-5 text-xl text-stone-900">{premiere.sujet}</p>
            <p className="mt-2 text-lg leading-relaxed text-stone-600">Dans chaque numéro, un bien visité avec un architecte, un entrepreneur et un courtier : ce qu’on peut en faire, puis l’addition complète.</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              {bouton(premiere)}
              <a href="/lettre" className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Découvrir Béton ciré</a>
            </div>
          </div>
          <a href="/lettre" aria-label="Découvrir Béton ciré" className="flex flex-col justify-center p-7 md:p-12" style={premiere.matiere}>
            {extrait}
          </a>
        </article>
      </section>

      {/* 3. Les suivantes : à choisir, elles s'ouvriront dans l'ordre des choix */}
      <section className="mt-16 md:mt-24" aria-labelledby="nl-suivantes">
        <div className="grid gap-x-12 gap-y-3 border-t border-stone-900 pt-4 md:grid-cols-[1fr_1.4fr]">
          <h2 id="nl-suivantes" className="font-serif text-3xl leading-[1.1] text-stone-900 md:text-4xl">
            Les suivantes, <span className="italic text-stone-500">à vous de choisir.</span>
          </h2>
          <p className="text-lg leading-relaxed text-stone-700">Elles ne sont pas encore ouvertes. Choisissez celles qui vous ressemblent : elles s’ouvriront une par une, les plus demandées d’abord, et vous serez prévenu.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {autres.map((n) => (
            <article key={n.slug} className={`${cadre(estOn(n.slug))} flex sm:flex-col`}>
              {/* sur téléphone la matière est une bande à gauche : la liste reste courte */}
              <span aria-hidden className="block w-20 shrink-0 self-stretch sm:h-28 sm:w-full sm:self-auto" style={n.matiere} />
              <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
                <h3 className="font-serif text-[1.75rem] italic leading-none text-stone-900">{n.nom}</h3>
                <p className="mt-2.5 text-[15px] leading-snug text-stone-700">{n.sujet}</p>
                <div className="mt-3 sm:mt-auto sm:pt-6">{bouton(n)}</div>
              </div>
            </article>
          ))}

          {/* la dernière case, sur grand écran : ce que toutes les newsletters ont en commun */}
          <div className="hidden rounded-[14px] border border-dashed border-stone-400 p-6 lg:flex lg:flex-col lg:justify-center">
            <p className="font-serif text-2xl leading-tight text-stone-900">Dans chaque numéro, <span className="italic text-stone-500">les mêmes cinq temps.</span></p>
            <ol className="mt-4 grid gap-y-1.5 text-[15px] text-stone-700">
              {['Un bien à la une, en vidéo', 'L’addition, sans rien oublier', 'Avant la promesse, un point de vigilance', 'Trois autres biens sélectionnés pour vous', 'La question posée aux abonnés'].map((t, i) => (
                <li key={t} className="flex gap-2">
                  <span className="font-serif italic text-stone-500">{i + 1}.</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

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

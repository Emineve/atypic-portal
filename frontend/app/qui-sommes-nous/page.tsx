import SmartAlert from '../SmartAlert';
import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import { typo } from '../../lib/typo';
import Link from 'next/link';
import EyeO from '../EyeO';

export const metadata = {
  title: 'Pourquoi Loftissime',
  description:
    'Pour ceux qui ne veulent pas habiter comme tout le monde : pourquoi Loftissime réunit les biens atypiques à vendre et accompagne ceux qui les cherchent.',
  alternates: { canonical: '/qui-sommes-nous' },
};

// Le manifeste : une conviction par article, quelques lignes pour la tenir, un lien pour agir.
// Dans chaque titre, un mot sort du rang (« mark », surligné et penché) ou se fait rayer (« strike »).
const ARTICLES: { title: string; mark?: string; strike?: string; text: string; href: string; link: string }[] = [
  {
    title: 'On ne choisit pas un bien pour son nombre de pièces.',
    strike: 'nombre de pièces',
    text: 'On le choisit pour une verrière, quatre mètres sous plafond, une lumière à cinq heures du soir. C’est cela que nous montrons en premier.',
    href: '/',
    link: 'Voir tous les biens',
  },
  {
    title: 'Le bien que vous cherchez existe. Il n’est pas visible.',
    mark: 'existe',
    text: 'Un loft chez une agence, un atelier d’artiste chez une autre, un dernier étage noyé parmi dix mille annonces. Nous les réunissons au même endroit.',
    href: '/mode-d-emploi',
    link: 'Lire le mode d’emploi',
  },
  {
    title: 'Les biens rares partent vite. Soyez le premier informé.',
    mark: 'le premier',
    text: 'Dites-nous ce que vous cherchez. Le jour où il arrive, vous le savez. Pas trois semaines après, quand il est vendu.',
    href: '/?alerte=1',
    link: 'Créer mon alerte',
  },
  {
    title: 'Le coup de cœur, oui. Les yeux fermés, non.',
    mark: 'oui',
    text: 'Un souplex, une péniche, un ancien atelier ne s’achètent pas comme un appartement classique. État des lieux répond aux questions que personne ne vous pose avant de signer.',
    href: '/guide',
    link: 'Lire la rubrique',
  },
  {
    title: 'Ici, le banal n’a pas sa place.',
    strike: 'banal',
    text: 'Ni prix minimum, ni surface minimum. Une seule condition : avoir ce que les autres n’ont pas. Une autre vie avant, un volume, un dehors, une situation rare, une signature, une histoire.',
    href: '/charte',
    link: 'Ce que nous publions, et ce que nous ne publions pas',
  },
  {
    title: 'Nous ne vendons rien. Nous mettons en relation.',
    mark: 'rien',
    text: 'Loftissime n’est pas une agence. Vous parlez directement au professionnel qui connaît le bien. Vos coordonnées ne vont qu’à lui, et seulement quand vous le demandez.',
    href: '/charte#donnees',
    link: 'Ce que deviennent vos coordonnées',
  },
];

// Ce qu'une annonce ordinaire met en avant, et ce que l'on regarde ici
const BANAL = ['3 pièces', '2e étage', 'proche commerces', 'double vitrage', 'faibles charges'];
const RARE = ['Une verrière', 'quatre mètres sous plafond', 'un escalier qui ne mène nulle part', 'la lumière de cinq heures'];

const STRIKE = 'line-through decoration-[#F6CF4E] decoration-[0.1em]';
const TILTS = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3'];

function Title({ a, i }: { a: (typeof ARTICLES)[number]; i: number }) {
  const word = a.mark || a.strike;
  if (!word || !a.title.includes(word)) return <>{typo(a.title)}</>;
  const [before, rest] = a.title.split(word);
  // La ponctuation qui suit le mot reste collée à lui
  const glued = /^[.,]/.test(rest) ? rest[0] : '';
  const after = rest.slice(glued.length);
  return (
    <>
      {typo(before)}
      <span className="whitespace-nowrap">
        {a.mark ? (
          <span className={`inline-block italic ${TILTS[i % TILTS.length]} px-[0.1em] bg-[linear-gradient(transparent_58%,#F6CF4E_58%)]`}>{typo(word)}</span>
        ) : (
          <span className={STRIKE}>{typo(word)}</span>
        )}
        {glued}
      </span>
      {typo(after)}
    </>
  );
}

export default function ManifestoPage() {
  const link = 'text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900 transition';
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      {/* L'ouverture : la phrase du site, en grand, sous le regard du logo */}
      <header className="bg-[#211C15] text-white">
        <div className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-14 md:pb-20">
          <Crumbs items={[{ label: 'Pourquoi Loftissime' }]} dark />
          <div className="mt-10 md:mt-14 flex flex-col gap-8 md:flex-row md:items-end md:gap-14">
            <div className="flex-none"><EyeO size={132} ink="#F6CF4E" iris="#211C15" /></div>
            <h1 className="font-serif text-[2.6rem] md:text-7xl tracking-tight leading-[1.02] [text-wrap:balance]">
              Pour ceux qui ne veulent pas habiter{' '}
              <span className="inline-block italic text-[#F6CF4E] -rotate-2">comme tout le monde.</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Ce que l'on raye, ce que l'on regarde */}
        <section className="py-14 md:py-20 border-b border-stone-200" aria-label="Ce que nous regardons">
          <p className="font-serif text-2xl md:text-4xl leading-snug text-stone-400">
            {BANAL.map((w) => (
              <span key={w} className={`mr-5 inline-block ${STRIKE}`}>{typo(w)}</span>
            ))}
          </p>
          <p className="mt-6 font-serif text-3xl md:text-5xl leading-[1.15] text-stone-900">
            {RARE.map((w, k) => (
              <span key={w}>
                <span className={k === 1 ? 'italic' : ''}>{typo(w)}</span>
                {k < RARE.length - 1 ? ', ' : '.'}
              </span>
            ))}
          </p>
          <p className="mt-6 max-w-xl text-stone-600 text-base md:text-lg font-light leading-relaxed">
            Voilà ce que nous cherchons dans une annonce. Le reste, vous le trouverez partout.
          </p>
        </section>

        {/* Les six convictions : en grand, une par une, en quinconce */}
        <ol className="pb-10">
          {ARTICLES.map((a, i) => (
            <li key={a.title} className="border-b border-stone-200 last:border-b-0">
              <Link href={a.href} className={`group block py-12 md:py-16 md:max-w-3xl ${i % 2 === 1 ? 'md:ml-auto' : ''}`}>
                <span className="block font-serif italic text-5xl md:text-7xl leading-none text-[#F6CF4E]" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900 [text-wrap:balance]">
                  <Title a={a} i={i} />
                </h2>
                <p className="mt-5 max-w-xl text-base md:text-lg font-light leading-relaxed text-stone-600">
                  {/* Le nom de la rubrique est en italique, pour qu'on comprenne que c'est un titre */}
                  {typo(a.text)
                    .split('État des lieux')
                    .flatMap((part, k) => (k === 0 ? [part] : [<em key={k} className="font-normal text-stone-900">État des lieux</em>, part]))}
                </p>
                <span className={`mt-6 inline-block ${link}`}>{typo(a.link)} →</span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="pb-24">
          <SmartAlert />
        </div>
      </main>
    </div>
  );
}

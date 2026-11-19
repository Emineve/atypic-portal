import SiteHeader from '../SiteHeader';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Pourquoi Loftissime',
  description:
    'Pour ceux qui ne veulent pas habiter comme tout le monde : pourquoi Loftissime réunit les biens atypiques à vendre et accompagne ceux qui les cherchent.',
  alternates: { canonical: '/qui-sommes-nous' },
};

// Le manifeste : une conviction par article, quelques lignes pour la tenir, parfois un lien pour agir.
const ARTICLES: { title: string; text: string; href?: string; link?: string }[] = [
  {
    title: 'On ne tombe pas amoureux d’un nombre de pièces.',
    text: 'On tombe amoureux d’une verrière, de quatre mètres sous plafond, d’une lumière à cinq heures du soir. C’est cela que nous montrons en premier.',
    href: '/',
    link: 'Voir tous les biens',
  },
  {
    title: 'Le bien que vous cherchez existe. Il n’est pas visible.',
    text: 'Un loft chez une agence, un atelier d’artiste chez une autre, un dernier étage noyé parmi dix mille annonces. Nous les réunissons au même endroit.',
    href: '/mode-d-emploi',
    link: 'Lire le mode d’emploi',
  },
  {
    title: 'Les biens rares partent vite. Soyez le premier informé.',
    text: 'Dites-nous ce que vous cherchez. Le jour où il arrive, vous le savez. Pas trois semaines après, quand il est vendu.',
    href: '/?alerte=1',
    link: 'Créer mon alerte',
  },
  {
    title: 'Le coup de cœur, oui. Les yeux fermés, non.',
    text: 'Un souplex, une péniche, un ancien atelier ne s’achètent pas comme un appartement classique. État des lieux répond aux questions que personne ne vous pose avant de signer.',
    href: '/guide',
    link: 'Lire la rubrique',
  },
  {
    title: 'On choisit mieux ce qu’on sait imaginer.',
    text: 'Un grand volume brut intimide autant qu’il attire. Inspiration montre ce que des architectes en ont fait. Pour nourrir votre projet, ou simplement pour rêver.',
    href: '/inspiration',
    link: 'Découvrir Inspiration',
  },
  {
    title: 'Ici, le banal n’a pas sa place.',
    text: 'Ni prix minimum, ni surface minimum. Une seule condition : avoir ce que les autres n’ont pas. Une autre vie avant, un volume, un dehors, une situation rare, une signature, une histoire.',
    href: '/charte',
    link: 'Ce que nous publions, et ce que nous ne publions pas',
  },
  {
    title: 'Nous ne vendons rien. Nous mettons en relation.',
    text: 'Loftissime n’est pas une agence. Vous parlez directement au professionnel qui connaît le bien. Vos coordonnées ne vont qu’à lui, et seulement quand vous le demandez.',
    href: '/charte#donnees',
    link: 'Ce que deviennent vos coordonnées',
  },
];

export default function ManifestoPage() {
  const link =
    'inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-4xl mx-auto px-6 pt-16 md:pt-28 pb-14 md:pb-24">
        <p className="text-xs uppercase tracking-widest text-stone-500">Pourquoi Loftissime</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Pour ceux qui ne veulent pas habiter <span className="italic text-stone-500">comme tout le monde.</span>
        </h1>
        <p className="mt-10 md:mt-12 max-w-2xl text-xl font-light leading-relaxed text-stone-700">
          Tous les biens atypiques à vendre, sur un seul site. Partout en France, toutes agences réunies, sans préférence. Et vous, accompagné jusqu&apos;à la visite, pour ne pas passer à côté du bien qui vous ressemble.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24">
        <ol>
          {ARTICLES.map((a, i) => (
            <li key={a.title} className="grid md:grid-cols-[5rem_1fr] gap-x-6 border-t border-stone-900 py-10 md:py-14">
              <span className="font-serif text-xl text-stone-400 md:pt-2" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="mt-2 md:mt-0 font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900">{a.title}</h2>
                <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-stone-600">{a.text}</p>
                {a.href && a.link && (
                  <p className="mt-5">
                    <Link href={a.href} className={link}>
                      {a.link}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <section className="border-t border-stone-900 pt-14 md:pt-24">
          <p className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05] text-stone-900">
            Un bien qui a du caractère en donne à ceux qui l&apos;habitent.{' '}
            <span className="italic text-stone-500">Trouvons le vôtre.</span>
          </p>
          <div data-alert-cta className="mt-10">
            <Link
              href="/?alerte=1"
              className="inline-flex h-12 items-center px-8 rounded-[10px] bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              Créer mon alerte
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

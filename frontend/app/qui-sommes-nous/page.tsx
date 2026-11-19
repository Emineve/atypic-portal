import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Logo from '../Logo';

export const metadata = {
  title: 'Pourquoi Loftissime',
  description:
    'Pour ceux qui ne veulent pas habiter comme tout le monde : pourquoi Loftissime réunit les biens atypiques à vendre et accompagne ceux qui les cherchent.',
  alternates: { canonical: '/qui-sommes-nous' },
};

// Le manifeste : une conviction par article, quelques lignes pour la tenir, parfois un lien pour agir.
const ARTICLES: { title: string; text: string; href?: string; link?: string }[] = [
  {
    title: 'Un lieu n’est pas un nombre de pièces.',
    text: 'Personne ne tombe amoureux d’un « trois-pièces, 72 m², deuxième étage ». On tombe amoureux d’une verrière, d’une hauteur sous plafond, d’une lumière à cinq heures du soir. C’est cela que nous montrons.',
  },
  {
    title: 'Le lieu que vous cherchez existe.',
    text: 'Il est seulement mal rangé. Un loft chez une agence, un atelier d’artiste chez une autre, un dernier étage perdu au milieu d’un site généraliste. Nous les réunissons au même endroit, toutes agences confondues.',
    href: '/',
    link: 'Voir tous les biens',
  },
  {
    title: 'Les lieux rares n’attendent pas.',
    text: 'Alors nous veillons à votre place. Dites-nous ce que vous cherchez : vous êtes prévenu le jour où il arrive, pas trois semaines après.',
    href: '/?alerte=1',
    link: 'Créer mon alerte',
  },
  {
    title: 'Un coup de cœur n’empêche pas d’y voir clair.',
    text: 'Un souplex, une péniche, un ancien atelier ne s’achètent pas comme un appartement classique. Nous avons créé la rubrique État des lieux pour répondre aux questions que personne ne vous pose avant de signer.',
    href: '/guide',
    link: 'Lire la rubrique',
  },
  {
    title: 'Il faut pouvoir imaginer avant de choisir.',
    text: 'Un grand volume brut intimide autant qu’il attire. Nous avons créé Inspiration pour montrer ce que des architectes en font, et vous donner des idées pour le vôtre. Sans projet, on peut aussi venir simplement rêver.',
    href: '/inspiration',
    link: 'Découvrir Inspiration',
  },
  {
    title: 'Une seule exigence : la singularité.',
    text: 'Ni limite de prix, ni surface minimale. Un bien entre ici s’il a quelque chose que les autres n’ont pas : une autre vie avant, un volume, un dehors, une situation rare, une signature, une histoire.',
    href: '/charte',
    link: 'Ce que nous publions, et ce que nous ne publions pas',
  },
  {
    title: 'Nous ne vendons rien.',
    text: 'Loftissime n’est pas une agence. Chaque annonce vous met en relation avec le professionnel qui connaît le bien. Vos coordonnées ne vont qu’à lui, et seulement quand vous le demandez.',
  },
];

export default function ManifestoPage() {
  const link =
    'inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les biens
          </Link>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto px-6 pt-16 md:pt-28 pb-14 md:pb-24">
        <p className="text-xs uppercase tracking-widest text-stone-500">Pourquoi Loftissime</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Pour ceux qui ne veulent pas habiter <span className="italic text-stone-500">comme tout le monde.</span>
        </h1>
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
            Un lieu qui a du caractère en donne à ceux qui l&apos;habitent.{' '}
            <span className="italic text-stone-500">Trouvons le vôtre.</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center px-8 rounded-[10px] bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              Voir tous les biens
            </Link>
            <Link href="/?alerte=1" className={link}>
              Créer mon alerte
            </Link>
          </div>
          <p className="mt-14 text-sm text-stone-500">
            Vous êtes une agence ?{' '}
            <Link href="/pro" className="underline underline-offset-4 decoration-stone-300 hover:text-stone-900">
              Diffusez vos biens sur Loftissime
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}

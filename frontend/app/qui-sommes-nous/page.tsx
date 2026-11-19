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
    title: 'Personne ne rêve d’un trois-pièces.',
    text: 'On rêve d’une verrière, de quatre mètres sous plafond, d’une lumière à cinq heures du soir. Les autres sites comptent les pièces. Nous montrons ce qui fait qu’on s’arrête.',
  },
  {
    title: 'Votre lieu existe. Il est mal rangé.',
    text: 'Un loft chez une agence, un atelier d’artiste chez une autre, un dernier étage noyé parmi dix mille annonces. Nous les réunissons au même endroit.',
    href: '/',
    link: 'Voir tous les biens',
  },
  {
    title: 'Les lieux rares partent vite. Soyez là avant.',
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
    title: 'Ici, le banal n’entre pas.',
    text: 'Ni prix minimum, ni surface minimum. Une seule condition : avoir ce que les autres n’ont pas. Une autre vie avant, un volume, un dehors, une situation rare, une signature, une histoire.',
    href: '/charte',
    link: 'Ce que nous publions, et ce que nous ne publions pas',
  },
  {
    title: 'Nous ne vendons rien.',
    text: 'Loftissime n’est pas une agence. Vous parlez directement au professionnel qui connaît le bien. Vos coordonnées ne vont qu’à lui, et seulement quand vous le demandez.',
  },
];

// Le mode d'emploi : les réflexes de l'acheteur qui ne veut pas laisser filer un bien.
const TIPS: { title: string; text: string }[] = [
  {
    title: 'Cherchez large.',
    text: 'Un atelier peut être un loft, une maison se cacher au fond d’une cour. Commencez par le lieu et le budget, affinez ensuite : trop de critères, et le bon bien ne s’affiche jamais.',
  },
  {
    title: 'Créez votre alerte.',
    text: 'C’est le geste le plus utile du site. Quelques secondes, et les nouveaux biens viennent à vous au lieu de vous attendre.',
  },
  {
    title: 'Gardez vos coups de cœur.',
    text: 'Le cœur sur chaque photo range le bien dans vos favoris. Vous les comparez à tête reposée, et vous demandez à être rappelé pour plusieurs biens d’un seul geste.',
  },
  {
    title: 'Regardez ce que le bien coûte vraiment.',
    text: 'Sur la fiche, « Le prix en détail » et « Vivre ici, au quotidien » réunissent ce que l’annonce indique : le prix, les frais, les charges. Mieux vaut le savoir avant la visite qu’après.',
  },
  {
    title: 'Faites-vous rappeler sans attendre.',
    text: 'Un lieu rare se visite dans les premiers jours. Un bien vous plaît ? Laissez votre numéro depuis sa fiche, l’agence vous rappelle.',
  },
  {
    title: 'Confiez votre recherche à une agence.',
    text: 'Une agence connaît parfois un bien avant qu’il soit en ligne. Depuis sa page, partagez vos critères avec elle : c’est vous qui décidez à qui vous les confiez.',
  },
  {
    title: 'Préparez la visite.',
    text: 'État des lieux vous donne les questions à poser devant un souplex, un loft ou une péniche. Envoyez la liste vers vos notes et gardez-la sous la main le jour J.',
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

        <section id="mode-d-emploi" className="border-t border-stone-900 pt-14 md:pt-24 pb-16 md:pb-24 scroll-mt-20">
          <p className="text-xs uppercase tracking-widest text-stone-500">Mode d&apos;emploi</p>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl tracking-tight leading-[1.05] text-stone-900">
            Sept réflexes pour ne pas passer <span className="italic text-stone-500">à côté du vôtre.</span>
          </h2>
          <ol className="mt-12 grid md:grid-cols-2 gap-x-12">
            {TIPS.map((t, i) => (
              <li key={t.title} className="border-t border-stone-200 py-7">
                <p className="font-serif text-2xl text-stone-900">
                  <span className="mr-3 text-stone-400" aria-hidden="true">{i + 1}</span>
                  {t.title}
                </p>
                <p className="mt-3 text-base font-light leading-relaxed text-stone-600">{t.text}</p>
              </li>
            ))}
          </ol>
        </section>

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

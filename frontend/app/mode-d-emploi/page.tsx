import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Mode d’emploi · Loftissime',
  description:
    'Sept réflexes pour ne pas passer à côté du bien atypique que vous cherchez : chercher large, créer son alerte, garder ses favoris, préparer la visite.',
  alternates: { canonical: '/mode-d-emploi' },
};

// Les réflexes de l'acheteur qui ne veut pas laisser filer un bien : un conseil, puis le lien pour le faire.
const TIPS: { title: string; text: string; href: string; link: string }[] = [
  {
    title: 'Cherchez large.',
    text: 'Un atelier peut être un loft, une maison se cacher au fond d’une cour. Commencez par le lieu et le budget, affinez ensuite : trop de critères, et le bon bien ne s’affiche jamais.',
    href: '/',
    link: 'Lancer ma recherche',
  },
  {
    title: 'Créez votre alerte.',
    text: 'C’est le geste le plus utile du site. Quelques secondes, et les nouveaux biens viennent à vous au lieu de vous attendre.',
    href: '/?alerte=1',
    link: 'Créer mon alerte',
  },
  {
    title: 'Gardez vos coups de cœur.',
    text: 'Un clic sur le cœur range le bien dans vos favoris. Vous les comparez à tête reposée, et vous demandez à être rappelé pour plusieurs biens d’un seul geste.',
    href: '/',
    link: 'Choisir mes favoris',
  },
  {
    title: 'Regardez ce que le bien coûte vraiment.',
    text: 'Sur la fiche, « Le prix en détail » et « Vivre ici, au quotidien » réunissent ce que l’annonce indique : le prix, les frais, les charges. Reste la mensualité, à estimer avant la visite plutôt qu’après.',
    href: '/financement',
    link: 'Estimer ma mensualité',
  },
  {
    title: 'Faites-vous rappeler sans attendre.',
    text: 'Un lieu rare se visite dans les premiers jours. Un bien vous plaît ? Laissez votre numéro depuis sa fiche, l’agence vous rappelle.',
    href: '/',
    link: 'Trouver un bien à visiter',
  },
  {
    title: 'Confiez votre recherche à une agence.',
    text: 'Une agence connaît parfois un bien avant qu’il soit en ligne. Depuis la fiche d’un bien, ouvrez la page de son agence et partagez vos critères avec elle : c’est vous qui décidez à qui vous les confiez.',
    href: '/',
    link: 'Parcourir les biens',
  },
  {
    title: 'Préparez la visite.',
    text: 'État des lieux vous donne les questions à poser devant un souplex, un loft ou une péniche. Envoyez la liste vers vos notes et gardez-la sous la main le jour J.',
    href: '/guide/questions-a-poser-visite-bien-atypique',
    link: 'Lire les questions à poser',
  },
];

export default function ModeEmploiPage() {
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

      <header className="max-w-4xl mx-auto px-6 pt-16 md:pt-28 pb-14 md:pb-20">
        <p className="text-xs uppercase tracking-widest text-stone-500">Mode d&apos;emploi</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Sept réflexes pour ne pas passer <span className="italic text-stone-500">à côté du vôtre.</span>
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24">
        <ol>
          {TIPS.map((t, i) => (
            <li key={t.title} className="grid md:grid-cols-[5rem_1fr] gap-x-6 border-t border-stone-900 py-9 md:py-12">
              <span className="font-serif text-xl text-stone-400 md:pt-1" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="mt-2 md:mt-0 font-serif text-3xl md:text-4xl tracking-tight leading-[1.1] text-stone-900">{t.title}</h2>
                <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-stone-600">{t.text}</p>
                <p className="mt-5">
                  <Link href={t.href} className={link}>
                    {t.link}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="border-t border-stone-900 pt-10 text-sm text-stone-500">
          Envie de savoir pourquoi ce site existe ?{' '}
          <Link href="/qui-sommes-nous" className="underline underline-offset-4 decoration-stone-300 hover:text-stone-900">
            Pourquoi Loftissime
          </Link>
          .
        </p>
      </main>
    </div>
  );
}

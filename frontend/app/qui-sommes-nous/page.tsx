import SmartAlert from '../SmartAlert';
import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import { typo } from '../../lib/typo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Pourquoi Loftissime',
  description:
    'Pour ceux qui ne veulent pas habiter comme tout le monde : pourquoi Loftissime réunit les biens atypiques à vendre et accompagne ceux qui les cherchent.',
  alternates: { canonical: '/qui-sommes-nous' },
};

// Le manifeste : une conviction par article, quelques lignes pour la tenir, parfois un lien pour agir.
const ARTICLES: { title: string; text: string; href?: string; link?: string }[] = [
  {
    title: 'On ne choisit pas un bien pour son nombre de pièces.',
    text: 'On le choisit pour une verrière, quatre mètres sous plafond, une lumière à cinq heures du soir. C’est cela que nous montrons en premier.',
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
  const link = 'text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900 transition';
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-10 md:pt-14 pb-8 md:pb-10">
        <Crumbs items={[{ label: 'Pourquoi Loftissime' }]} />
        <h1 className="mt-5 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Pour ceux qui ne veulent pas habiter <span className="italic text-stone-500">comme tout le monde.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-stone-600 text-base md:text-lg font-light leading-relaxed">
          Tous les biens atypiques à vendre, toutes agences réunies, sur un seul site.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="pb-24">
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {ARTICLES.map((a, i) => (
            <li key={a.title} className="flex">
              <Link
                href={a.href || '/'}
                className="group flex w-full flex-col rounded-[20px] border border-stone-200 bg-white p-6 md:p-8 transition hover:border-stone-300 hover:shadow-[0_14px_36px_-16px_rgba(28,25,23,0.28)]"
              >
                <span className="block font-sans text-xs font-semibold tracking-widest text-stone-400" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 font-serif text-2xl md:text-[1.75rem] tracking-tight leading-[1.15] text-stone-900 [text-wrap:balance]">{typo(a.title)}</h2>
                <p className="mt-3 flex-1 text-base font-light leading-relaxed text-stone-600">
                  {/* Le nom de la rubrique est en italique, pour qu'on comprenne que c'est un titre */}
                  {typo(a.text)
                    .split('État des lieux')
                    .flatMap((part, k) => (k === 0 ? [part] : [<em key={k} className="font-normal text-stone-900">État des lieux</em>, part]))}
                </p>
                {a.link && (
                  <span className={`mt-5 self-start ${link}`}>
                    {typo(a.link)}
                    <ArrowRight className="ml-1.5 inline-block w-4 h-4 align-[-3px]" />
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ol>

        <SmartAlert className="mt-10 md:mt-14" />
      </div>
      </main>
    </div>
  );
}

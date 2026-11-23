import SmartAlert from '../SmartAlert';
import SiteHeader from '../SiteHeader';
import { typo } from '../../lib/typo';
import Link from 'next/link';
import GuideArt from '../guide/GuideArt';

export const metadata = {
  title: 'Pourquoi Loftissime',
  description:
    'Pourquoi Loftissime réunit les biens atypiques à vendre, toutes agences confondues, et accompagne ceux qui les cherchent.',
  alternates: { canonical: '/qui-sommes-nous' },
};

// Le manifeste : une conviction par ligne, quelques mots pour la tenir, un lien pour agir.
const ARTICLES: { title: string; text: string; href: string; link: string }[] = [
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
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-8 md:pb-10">
        <h1 className="max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Pourquoi Loftissime, <span className="italic text-stone-500">en six convictions.</span>
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* Ce que l'on regarde : un dessin, une phrase */}
        <div className="grid md:grid-cols-2 rounded-[14px] overflow-hidden bg-white border border-stone-200">
          <div className="overflow-hidden border-b md:border-b-0 md:border-r border-stone-900 bg-[#F6CF4E] flex items-center">
            <GuideArt art="atypique" fit="meet" className="block w-full aspect-[12/5]" />
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-stone-500">Ce que nous regardons</p>
            <p className="mt-3 font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">
              Une verrière, quatre mètres sous plafond, <span className="italic text-stone-500">la lumière de cinq heures.</span>
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">Voilà ce que nous cherchons dans une annonce. Le reste, vous le trouverez partout.</p>
          </div>
        </div>

        {/* Les six convictions : un sommaire, une ligne chacune */}
        <section className="mt-12 md:mt-16" aria-label="Nos convictions">
          <p className="text-xs uppercase tracking-widest text-stone-500">Nos convictions</p>
          <ol className="mt-4 border-t border-stone-900">
            {ARTICLES.map((a, i) => (
              <li key={a.title} className="border-b border-stone-200">
                <Link href={a.href} className="group grid gap-x-10 gap-y-3 py-7 md:grid-cols-[3rem_1fr_1fr] md:py-9 focus:outline-none">
                  <span className="font-sans text-sm tabular-nums text-stone-500" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="font-serif text-2xl md:text-3xl leading-[1.15] tracking-tight text-stone-900 [text-wrap:balance]">
                    <span className="bg-[linear-gradient(#F6CF4E,#F6CF4E)] bg-[position:0_100%] pb-[3px] bg-no-repeat transition-[background-size] duration-300 bg-[length:0%_2px] group-hover:bg-[length:100%_2px] group-focus-visible:bg-[length:100%_2px]">{typo(a.title)}</span>
                  </h2>
                  <div>
                    <p className="text-base leading-relaxed text-stone-600">
                      {/* Le nom de la rubrique est en italique, pour qu'on comprenne que c'est un titre */}
                      {typo(a.text)
                        .split('État des lieux')
                        .flatMap((part, k) => (k === 0 ? [part] : [<em key={k} className="text-stone-900">État des lieux</em>, part]))}
                    </p>
                    <span className="mt-4 inline-block text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900 transition">{typo(a.link)} →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <SmartAlert className="mt-14 md:mt-20" />
      </main>
    </div>
  );
}

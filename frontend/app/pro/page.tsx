import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import Link from 'next/link';
import BuyerFigure, { type BuyerKind } from './BuyerFigure';
import ProForm from './ProForm';
import ProSteps, { type Promise5 } from './ProSteps';
import logiciels from './logiciels.png';
export const metadata = {
  title: 'Agences : présentez vos biens atypiques · Loftissime',
  description:
    'Diffusez vos biens atypiques auprès d’acheteurs qui ne cherchent que cela. Contacts directs, mise à jour automatique, gratuit pendant le lancement.',
  alternates: { canonical: '/pro' },
};

// Cinq promesses faites aux agences, dans le même ton que « Pourquoi Loftissime ».
const PROMISES: Promise5[] = [
  {
    title: 'Des acheteurs qualifiés.',
    text: 'Sur Loftissime, on ne cherche que de l’atypique. Vos biens ne sont plus noyés entre deux trois-pièces : ils sont vus par des acheteurs qui veulent exactement cela. Ceux qui ont créé une alerte sont prévenus dès la mise en ligne.',
  },
  {
    title: 'Des contacts directs.',
    text: 'Votre agence, votre négociateur et son téléphone sur chaque annonce. L’acheteur vous appelle, vous écrit ou demande à être rappelé : la demande arrive chez vous, sans intermédiaire.',
  },
  {
    title: 'Une vitrine qui valorise vos mandats.',
    text: 'Seuls les biens atypiques sont publiés. Vos mandats les plus rares ont enfin leur vitrine, et vous avez un argument de plus face à un vendeur.',
    points: [
      ['Une autre vie avant', 'loft, atelier d’artiste, ancienne usine, péniche'],
      ['Un volume', 'grande hauteur, mezzanine, verrière, duplex'],
      ['Un dehors en ville', 'terrasse, toit-terrasse, jardin, patio'],
      ['Une situation rare', 'dernier étage, vue, bord de l’eau, voie privée'],
      ['Une signature', 'maison d’architecte, immeuble remarquable'],
      ['Une histoire', 'hôtel particulier, bien ancien resté dans son jus'],
    ],
    note: 'Un appartement classique, même très beau ou très cher, n’est pas publié. Le prix et l’adresse ne comptent pas.',
  },
  {
    title: 'Zéro saisie.',
    text: 'Une passerelle avec votre logiciel de diffusion : vos annonces se publient et se mettent à jour seules. Un bien vendu est retiré. Vous ne changez rien à vos habitudes.',
    software: true,
  },
  {
    title: 'Gratuit pendant le lancement.',
    text: 'Aucun frais, aucun engagement pendant toute la phase de lancement. Toute évolution des conditions vous sera annoncée à l’avance : vous restez libre d’arrêter.',
  },
];

// Qui sont les acheteurs du site : trois portraits, sans chiffres.
const VISITORS: { title: string; text: string; kind: BuyerKind }[] = [
  {
    kind: 'decide',
    title: 'L’acheteur décidé',
    text: 'Projet, budget, calendrier : il est prêt. Il veut voir d’un coup tous les biens atypiques du marché, crée son alerte et demande à être rappelé dès qu’un bien lui plaît. C’est votre contact le plus sérieux.',
  },
  {
    kind: 'reveur',
    title: 'Le rêveur',
    text: 'Il n’achète pas encore. Il regarde, met en favori, revient. C’est votre acquéreur de demain, et le jour où il se décide, il connaît déjà votre agence.',
  },
  {
    kind: 'architecture',
    title: 'L’amoureux d’architecture',
    text: 'Architecture, design, décoration : il sait ce qu’est une verrière d’atelier ou une belle hauteur sous plafond. Il ne visite pas par hasard, et vous ne perdez pas votre temps.',
  },
];

// La mise en route, en trois temps
const HOW: [string, string][] = [
  ['Vous nous écrivez.', 'Le nom de votre agence et un e-mail suffisent. Nous vous rappelons pour faire le point sur vos biens atypiques.'],
  ['Nous branchons vos annonces.', 'Une passerelle avec votre logiciel de diffusion, mise en place par nos soins. Vous n’avez rien à installer.'],
  ['Les contacts arrivent chez vous.', 'Vos biens sont en ligne, les acheteurs en alerte sont prévenus, et chaque demande vous parvient directement.'],
];

export default function ProPage() {
  const btn =
    'inline-flex h-12 items-center px-8 rounded-full bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition';
  const link = 'text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
  const h2 = 'font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900';
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader alert={false}>
        <a href="#rejoindre" className={`hidden sm:inline ${link}`}>Diffuser mes annonces</a>
      </SiteHeader>

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-4xl">
        <Crumbs items={[{ label: 'Espace pro' }]} />
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Vendez vos biens atypiques <span className="italic text-stone-500">à ceux qui les cherchent.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          Loftissime réunit les acheteurs de lofts, d&apos;ateliers d&apos;artistes et de toits-terrasses. Vos annonces y trouvent leur public, et chaque contact vous revient directement.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#rejoindre" className={btn}>Diffuser mes annonces</a>
          <span className="text-sm text-stone-500">Gratuit pendant le lancement · Sans engagement</span>
        </div>
      </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl pb-24">
        <div className="mb-14 md:mb-24">
          <ProSteps promises={PROMISES} softwareSrc={logiciels.src} />
        </div>

        <section className="border-t border-stone-200 py-12 md:py-16">
          <h2 className={h2}>
            Vos futurs acquéreurs <span className="italic text-stone-500">sont ici.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
            Ils ne cherchent pas un nombre de pièces : ils cherchent un volume, une lumière, une histoire. Trois profils, trois façons d&apos;arriver jusqu&apos;à vous.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-x-10 gap-y-8">
            {VISITORS.map((v) => (
              <div key={v.title} className="border-t border-stone-200 pt-5">
                <BuyerFigure kind={v.kind} className="h-24 w-24 -ml-3" />
                <h3 className="mt-4 font-serif text-2xl text-stone-900">{v.title}</h3>
                <p className="mt-3 text-base font-light leading-relaxed text-stone-600">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 py-12 md:py-16">
          <h2 className={h2}>
            Comment ça marche. <span className="italic text-stone-500">Nous nous occupons de tout.</span>
          </h2>
          <ol className="mt-10 grid md:grid-cols-3 gap-x-10 gap-y-8">
            {HOW.map(([t, d], i) => (
              <li key={t} className="border-t-2 border-stone-900 pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4E7B5] text-sm font-medium text-stone-900">{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl text-stone-900">{t}</h3>
                <p className="mt-3 text-base font-light leading-relaxed text-stone-600">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="rejoindre" className="border-t border-stone-200 pt-12 md:pt-16 scroll-mt-20">
          <ProForm />
          <p className="mt-8">
            <Link href="/charte" className={link}>Toutes les questions fréquentes</Link>
          </p>
        </section>
      </div>
      </main>
    </div>
  );
}

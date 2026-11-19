import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Logo from '../Logo';
import GuideArt from '../guide/GuideArt';

export const metadata = {
  title: 'Qui sommes-nous · Loftissime',
  description:
    'Loftissime réunit sur un seul site les biens qui ne ressemblent à aucun autre : lofts, ateliers d’artistes, derniers étages, maisons d’architecte, toutes agences confondues.',
  alternates: { canonical: '/qui-sommes-nous' },
};

const PROMISES = [
  {
    n: '01',
    title: 'Tout voir au même endroit',
    text: 'Les biens atypiques sont éparpillés : un loft chez une agence, un atelier chez une autre, un dernier étage perdu sur un site généraliste. Loftissime les réunit, toutes agences confondues. Vous ne passez plus vos soirées d’un site à l’autre.',
    href: '/',
    link: 'Voir tous les biens',
  },
  {
    n: '02',
    title: 'Être prévenu avant les autres',
    text: 'Un bien rare ne reste pas longtemps en ligne. Dites-nous ce que vous cherchez : vous recevez un e-mail dès qu’un nouveau bien correspond. Vous n’avez plus à revenir vérifier.',
    href: '/?alerte=1',
    link: 'Créer mon alerte',
  },
  {
    n: '03',
    title: 'Acheter en connaissance de cause',
    text: 'Un souplex, un loft ou une péniche ne s’achètent pas comme un appartement classique. Les fiches détaillent le coût réel du projet, frais de notaire compris, et nos articles expliquent ce qu’il faut vérifier avant de signer.',
    href: '/guide',
    link: 'Lire l’état des lieux',
  },
];

const CRITERIA = ['Une autre vie avant', 'Un volume', 'Un dehors', 'Une situation rare', 'Une signature', 'Une histoire'];

export default function AboutPage() {
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

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Qui sommes-nous</p>
        <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Le lieu qui ne ressemble à aucun autre <span className="italic text-stone-500">existe. Trouvons-le.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-stone-600 text-lg font-light leading-relaxed">
          Une ancienne imprimerie devenue loft. Un atelier d&apos;artiste sous sa verrière. Un dernier étage avec le ciel pour
          voisin. Loftissime réunit sur un seul site les biens atypiques à vendre, pour que vous ne passiez pas à côté du vôtre.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center px-8 rounded-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
          >
            Voir tous les biens
          </Link>
          <Link href="/?alerte=1" className={link}>
            Créer mon alerte
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6">
        <div className="overflow-hidden border border-stone-900 shadow-[6px_6px_0_0_#1c1917]">
          <GuideArt art="loft" className="block w-full aspect-[16/9] md:aspect-[12/4]" />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <section className="mt-16 md:mt-24">
          <h2 className="max-w-3xl font-serif text-3xl md:text-4xl leading-tight text-stone-900">Ce que Loftissime change pour vous</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {PROMISES.map((p) => (
              <li key={p.n} className="flex flex-col border border-stone-300 bg-white p-6 md:p-7">
                <span className="font-serif text-4xl leading-none text-stone-300">{p.n}</span>
                <h3 className="mt-5 font-serif text-2xl leading-snug text-stone-900">{p.title}</h3>
                <p className="mt-3 flex-1 text-stone-600 leading-relaxed">{p.text}</p>
                <p className="mt-5">
                  <Link href={p.href} className={link}>
                    {p.link}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 md:mt-24 border-y border-stone-900 py-12 md:py-16">
          <p className="max-w-4xl font-serif text-3xl md:text-5xl tracking-tight leading-[1.12] text-stone-900">
            On ne vit pas de la même façon sous une verrière d&apos;atelier.{' '}
            <span className="italic text-stone-500">Un lieu qui a du caractère en donne à ceux qui l&apos;habitent.</span>
          </p>
          <p className="mt-6 max-w-2xl text-stone-600 text-lg font-light leading-relaxed">
            Nous sommes des passionnés d&apos;architecture et de design, convaincus qu&apos;un lieu singulier rend la vie plus
            belle. Loftissime est le site que nous aurions aimé avoir pour chercher le nôtre.
          </p>
        </section>

        <section className="mt-16 md:mt-24 grid gap-x-16 gap-y-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-stone-900">Une seule exigence : la singularité</h2>
          </div>
          <div>
            <p className="text-stone-600 text-lg font-light leading-relaxed">
              Pas de limite de prix, ni de surface. Pour entrer sur Loftissime, un bien doit avoir quelque chose que les autres
              n&apos;ont pas.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {CRITERIA.map((c) => (
                <li key={c} className="inline-flex items-center h-9 px-4 rounded-full bg-[#F4E7B5] text-sm text-stone-900">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/charte" className={link}>
                Ce que nous publions, et ce que nous ne publions pas
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </section>

        <section className="mt-16 md:mt-24 grid gap-4 md:grid-cols-2">
          <div className="border border-stone-300 bg-white p-6 md:p-8">
            <h2 className="font-serif text-2xl leading-snug text-stone-900">Vous n&apos;avez pas de projet ? Venez rêver.</h2>
            <p className="mt-3 text-stone-600 leading-relaxed">
              On peut venir ici pour flâner, se projeter, nourrir son imagination. Des lieux transformés par des architectes,
              d&apos;autres aménagés avec goût et liberté par leurs propriétaires : autant de façons d&apos;habiter autrement.
            </p>
            <p className="mt-5">
              <Link href="/inspiration" className={link}>
                Découvrir l&apos;architecte à la une
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
          <div className="border border-stone-300 bg-white p-6 md:p-8">
            <h2 className="font-serif text-2xl leading-snug text-stone-900">Loftissime n&apos;est pas une agence.</h2>
            <p className="mt-3 text-stone-600 leading-relaxed">
              Nous ne vendons aucun bien et n&apos;intervenons dans aucune transaction. Chaque annonce vous met en relation
              avec l&apos;agence ou le négociateur qui connaît le bien. Vos coordonnées ne sont transmises qu&apos;à lui, et
              seulement quand vous le demandez.
            </p>
            <p className="mt-5">
              <Link href="/pro" className={link}>
                Vous êtes une agence ? Diffusez vos biens
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </p>
          </div>
        </section>

        <section className="mt-16 md:mt-24 text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl md:text-4xl leading-tight text-stone-900">
            Votre prochain lieu de vie est peut-être déjà en ligne.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center px-8 rounded-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              Voir tous les biens
            </Link>
            <Link href="/?alerte=1" className={link}>
              Créer mon alerte
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

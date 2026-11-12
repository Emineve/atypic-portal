import Link from 'next/link';
import { ArrowLeft, Bell, FileText, Megaphone, Search } from 'lucide-react';
import Logo from '../Logo';

export const metadata = {
  title: 'Qui sommes-nous · Loftissime',
  description:
    'Loftissime, le premier hub d’annonces immobilières atypiques : un point d’entrée unique qui centralise les biens atypiques à vendre, toutes agences confondues.',
  alternates: { canonical: '/qui-sommes-nous' },
};

export default function AboutPage() {
  const h2 = 'font-serif text-2xl text-stone-900';
  const p = 'mt-3 text-stone-600 leading-relaxed';
  const cta = 'inline-flex items-center gap-2 text-sm text-stone-900 underline underline-offset-4';
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

      <header className="max-w-3xl mx-auto px-6 pt-16 md:pt-20 pb-10 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Qui sommes-nous</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">
          Loftissime, le premier hub d&apos;annonces immobilières{' '}
          <span className="italic text-stone-600">atypiques</span>.
        </h1>
        <p className="mt-6 text-stone-600 text-lg font-light leading-relaxed">
          Loftissime est né d&apos;un constat simple : les biens atypiques sont partout, mais jamais au même endroit. Un loft
          chez une agence, un atelier d&apos;artiste chez une autre, un dernier étage avec terrasse perdu au milieu d&apos;un
          site généraliste. Nous avons donc créé un hub : un point d&apos;entrée unique, qui centralise les annonces de biens
          atypiques à vendre, toutes agences confondues.
        </p>
      </header>

      <main className="max-w-2xl mx-auto px-6 pb-20 space-y-12">
        <section>
          <h2 className={h2}>Pour ceux qui cherchent</h2>
          <p className={p}>
            Vous avez un projet et pas de temps à perdre. Loftissime vous donne en quelques minutes une vue d&apos;ensemble
            des biens atypiques disponibles au moment où vous cherchez. Le bénéfice : vous ne passez plus des heures à
            éplucher les sites généralistes et les sites d&apos;agences. Et surtout, vous ne passez plus à côté de votre
            futur lieu de vie idéal. Créez une alerte, et vous êtes parmi les premiers prévenus dès qu&apos;un bien
            correspond à vos critères.
          </p>
          <p className="mt-3">
            <Link href="/" className={cta}>
              <Search className="w-4 h-4" />
              Voir toutes les annonces
            </Link>
          </p>
        </section>

        <section>
          <h2 className={h2}>Pour ceux qui aiment rêver</h2>
          <p className={p}>
            On peut aussi venir ici sans projet précis. Pour flâner, se projeter, nourrir son imagination. Des lieux
            transformés par des architectes, d&apos;autres aménagés avec goût et liberté par leurs propriétaires : autant de
            façons d&apos;habiter autrement, à découvrir sur Loftissime.
          </p>
          <p className="mt-3">
            <Link href="/" className={cta}>
              <Bell className="w-4 h-4" />
              Créer mon alerte
            </Link>
          </p>
        </section>

        <section>
          <h2 className={h2}>Pour les agences</h2>
          <p className={p}>
            Loftissime n&apos;est pas une agence immobilière. Nous ne vendons aucun bien et nous n&apos;intervenons dans
            aucune transaction. Notre position est neutre, et notre objectif tient en une ligne : faciliter la mise en
            relation entre les acheteurs et les négociateurs en charge des biens référencés. Chaque annonce renvoie
            vers l&apos;agence ou l&apos;agent qui la commercialise.
          </p>
          <p className="mt-3">
            <Link href="/pro" className={cta}>
              <Megaphone className="w-4 h-4" />
              Diffuser mes annonces
            </Link>
          </p>
        </section>

        <section>
          <h2 className={h2}>Notre sélection</h2>
          <p className={p}>
            Pas de limite de prix. Une seule exigence : que le bien ait quelque chose de
            singulier. Chaque annonce diffusée répond à la charte Loftissime, qui dit clairement ce que nous publions et ce
            que nous ne publions pas.
          </p>
          <p className="mt-3">
            <Link href="/charte" className={cta}>
              <FileText className="w-4 h-4" />
                            Voir les questions fréquentes
            </Link>
          </p>
        </section>

        <section>
          <h2 className={h2}>Qui sommes-nous ?</h2>
          <p className={p}>
            Des passionnés d&apos;architecture et de design, convaincus qu&apos;un lieu singulier rend la vie plus belle. On
            ne vit pas de la même façon sous une verrière d&apos;atelier, dans une ancienne imprimerie ou au dernier étage
            avec le ciel pour voisin. Un lieu qui a du caractère en donne à ceux qui l&apos;habitent. Nous avons créé le
            site que nous aimerions utiliser pour trouver notre futur lieu de vie idéal.
          </p>
        </section>

        <div className="pt-4 text-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center px-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
          >
            Tous les biens à vendre
          </Link>
        </div>
      </main>
    </div>
  );
}

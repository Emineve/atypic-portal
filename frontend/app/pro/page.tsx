import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProForm from './ProForm';
import GuideArt from '../guide/GuideArt';
import logiciels from './logiciels.png';
export const metadata = {
  title: 'Agences : présentez vos biens atypiques · Loftissime',
  description:
    'Loftissime, le premier hub d’annonces immobilières atypiques. Présentez vos biens à des acheteurs qui cherchent précisément cela. Gratuit pendant le lancement.',
  alternates: { canonical: '/pro' },
};

const pillars = [
  {
    title: 'Visibilité',
    highlight: false,
    items: [
      'Un site entièrement dédié aux biens atypiques',
      'Une page agence qui rassemble tous vos biens',
      'Vos biens classés par catégorie et par ville',
    ],
  },
  {
    title: 'Contacts directs',
    highlight: true,
    items: [
      'Chaque annonce affiche votre agence en bonne place',
      'Un lien direct vers votre annonce d’origine',
      'Les acheteurs vous contactent, sans intermédiaire',
    ],
  },
  {
    title: 'Sélection exigeante',
    highlight: false,
    items: [
      'Six caractéristiques précises',
      'Un bien en présente au moins une, ou n’est pas diffusé',
      'Un cadre qui valorise vos mandats les plus rares',
    ],
  },
];

const steps = [
  { n: '1', text: 'Création d’une passerelle avec votre logiciel de diffusion, ou dépôt d’annonce sur votre espace Pro.' },
  { n: '2', text: 'Envoi de vos annonces par notification aux utilisateurs, en temps réel.' },
  { n: '3', text: 'Gestion de tous vos contacts sur votre compte Loftissime Pro, et envoi direct des leads acquéreurs par email ou SMS.' },
];

const faq: { q: string; a: string; points?: string[] }[] = [
  {
    q: 'Que fait Loftissime pour mon agence ?',
    a: 'Loftissime référence vos biens atypiques selon des critères précis et met les acheteurs en contact direct avec vos négociateurs :',
    points: [
      'Chaque annonce affiche votre agence, le négociateur et son téléphone.',
      'Chaque annonce renvoie vers celle de votre site.',
      'Un bien est retiré dès qu’il est vendu.',
    ],
  },
  {
    q: 'Combien cela coûte-t-il ?',
    a: 'La participation est gratuite pendant la phase de lancement. Toute évolution des conditions vous sera communiquée à l’avance, sans engagement de votre part.',
  },
  {
    q: 'Comment vous transmettre mes annonces ?',
    a: 'Automatiquement, via votre logiciel de diffusion ou par un lien XML.',
    points: ['Passerelle en direct avec votre logiciel', 'Publication et mise à jour en temps réel', 'Support technique dédié'],
  },
  {
    q: 'Comment diffuser mes annonces sur Loftissime ?',
    a: 'Remplissez le formulaire ci-dessous : nous revenons vers vous rapidement.',
  },
];

export default function ProPage() {
  const btn =
    'inline-flex h-12 items-center px-8 rounded-[10px] bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition';
  const link = 'text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
  const h2 = 'font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900';
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              Tous les biens
            </Link>
            <a href="#rejoindre" className={link}>Diffuser mes annonces</a>
          </div>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto px-6 pt-16 md:pt-28 pb-14 md:pb-24">
        <p className="text-xs uppercase tracking-widest text-stone-500">Espace agences</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Vos biens atypiques, devant ceux <span className="italic text-stone-500">qui ne cherchent que cela.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          Lofts, ateliers d&apos;artistes, rooftops et bien d&apos;autres lieux singuliers : Loftissime est le premier hub d&apos;annonces immobilières atypiques.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="#rejoindre" className={btn}>Diffuser mes annonces</a>
          <span className="text-sm text-stone-500">Gratuit pendant le lancement, sans engagement.</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24">
        {/* La preuve par l'image : l'annonce telle que l'acheteur la voit, l'agence en bonne place */}
        <section className="pb-14 md:pb-20" aria-label="Exemple d'annonce sur Loftissime">
          <div className="rounded-[10px] border border-stone-200 bg-white p-4 md:p-5 grid md:grid-cols-[1.3fr_1fr] gap-5 md:gap-7">
            <GuideArt art="loft" className="w-full h-56 md:h-full md:min-h-[20rem] rounded-[6px]" />
            <div className="flex flex-col py-1 md:py-3 md:pr-2">
              <p>
                <span className="inline-flex items-center h-7 px-3 rounded-full bg-[#F4E7B5] text-xs text-stone-900">Loft</span>
              </p>
              <p className="mt-3 font-serif text-2xl md:text-3xl leading-tight text-stone-900">Ancien atelier sous verrière</p>
              <p className="mt-1 text-sm text-stone-500">Paris 11e · 142 m² · 1 890 000 €</p>
              <div className="mt-5 border-t border-stone-200 pt-5">
                <p className="text-xs uppercase tracking-widest text-stone-500">Votre agence</p>
                <p className="mt-2 font-serif text-xl text-stone-900">Votre négociateur</p>
                <p className="mt-2 text-sm text-stone-900">
                  <span className="underline underline-offset-4 decoration-stone-300">Appeler</span>
                  <span className="mx-2 text-stone-300">·</span>
                  <span className="underline underline-offset-4 decoration-stone-300">WhatsApp</span>
                </p>
                <p className="mt-5 flex h-12 items-center justify-center rounded-[10px] bg-stone-900 text-xs font-semibold uppercase tracking-wider text-white">
                  Être rappelé
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-stone-500">
            Exemple d&apos;annonce. Sur chacune : votre agence, votre négociateur, vos coordonnées. L&apos;acheteur vous contacte directement.
          </p>
        </section>

        <section className="border-t border-stone-900 py-12 md:py-16">
          <h2 className={h2}>Ce que Loftissime vous apporte</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-x-10 gap-y-10">
            {pillars.map((p) => (
              <div key={p.title}>
                <h3 className="font-serif text-2xl text-stone-900">{p.title}</h3>
                <ul className="mt-4 space-y-3 text-base font-light leading-relaxed text-stone-600">
                  {p.items.map((it) => (
                    <li key={it} className="border-t border-stone-200 pt-3">{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-900 py-12 md:py-16">
          <h2 className={h2}>Comment ça marche</h2>
          <p className="mt-4 text-lg font-light text-stone-600">Vous n&apos;avez rien à faire, nous nous occupons de tout.</p>
          <ol className="mt-8">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-x-4 border-t border-stone-200 py-6">
                <span className="font-serif text-xl text-stone-400" aria-hidden="true">0{s.n}</span>
                <p className="max-w-2xl text-lg font-light leading-relaxed text-stone-700">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-xs uppercase tracking-widest text-stone-500">
            Passerelles prévues avec les principaux logiciels
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logiciels.src} alt="Hektor, AC3, Ubiflow, Netty, Apimo" className="mt-6 w-full max-w-xl" />
        </section>

        <section className="border-t border-stone-900 py-12 md:py-16">
          <h2 className={h2}>Questions fréquentes</h2>
          <div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
            {faq.map((it) => (
              <details key={it.q} className="group py-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-xl text-stone-900">
                  {it.q}
                  <span className="text-stone-400 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-base font-light text-stone-600 leading-relaxed">{it.a}</p>
                {it.points && (
                  <ul className="mt-3 max-w-2xl space-y-2 text-base font-light text-stone-600 leading-relaxed">
                    {it.points.map((pt) => (
                      <li key={pt} className="flex gap-2"><span aria-hidden="true">·</span><span>{pt}</span></li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/charte" className={link}>Toutes les questions fréquentes</Link>
          </p>
        </section>

        <section id="rejoindre" className="border-t border-stone-900 pt-12 md:pt-16 scroll-mt-20">
          <h2 className={h2}>
            Diffuser mes annonces <span className="italic text-stone-500">sur Loftissime.</span>
          </h2>
          <p className="mt-4 text-lg font-light text-stone-600">Dites-nous qui vous êtes, nous revenons vers vous rapidement.</p>
          <div className="mt-8 max-w-2xl">
            <ProForm />
          </div>
        </section>
      </main>
    </div>
  );
}

import Link from 'next/link';
import { ArrowLeft, Eye, MousePointerClick, Sparkles } from 'lucide-react';
import ProForm from './ProForm';

export const metadata = {
  title: 'Agences : présentez vos biens atypiques · SINGULIER',
  description:
    'SINGULIER réunit les biens atypiques haut de gamme. Présentez votre catalogue à des acheteurs qui cherchent précisément cela. Gratuit pendant le lancement.',
  alternates: { canonical: '/pro' },
};

const pillars = [
  {
    icon: Eye,
    title: 'Visibilité',
    items: [
      'Une vitrine éditoriale dédiée aux lieux singuliers',
      'Une page agence qui rassemble tous vos biens',
      'Vos biens classés par catégorie et par ville',
    ],
  },
  {
    icon: MousePointerClick,
    title: 'Contacts directs',
    items: [
      'Chaque fiche affiche votre agence en bonne place',
      'Un lien direct vers votre annonce d’origine',
      'Les acheteurs vous contactent, sans intermédiaire',
    ],
  },
  {
    icon: Sparkles,
    title: 'Sélection exigeante',
    items: [
      'Seuls les biens au caractère marqué sont publiés',
      'Des règles de sélection publiques et transparentes',
      'Un cadre qui valorise vos mandats les plus rares',
    ],
  },
];

const steps = [
  { n: '1', title: 'Vous nous écrivez', text: 'Présentez votre agence et le type de biens atypiques que vous représentez.' },
  { n: '2', title: 'Nous choisissons ensemble', text: 'Nous sélectionnons les biens qui correspondent à l’univers SINGULIER.' },
  { n: '3', title: 'Vos biens sont publiés', text: 'Chaque fiche porte votre nom et renvoie vers votre annonce d’origine.' },
];

const faq = [
  { q: 'Combien cela coûte-t-il ?', a: 'La participation est gratuite pendant la phase de lancement. Toute évolution des conditions vous sera communiquée à l’avance, sans engagement de votre part.' },
  { q: 'Comment vous transmettre mes annonces ?', a: 'Au démarrage, nous reprenons ensemble les biens que vous souhaitez présenter. Nous étudions ensuite la meilleure façon de les tenir à jour.' },
  { q: 'Que devient mon annonce d’origine ?', a: 'Elle reste la référence pour le prix et la disponibilité. Chaque fiche SINGULIER renvoie vers votre annonce.' },
  { q: 'Tous mes biens seront-ils publiés ?', a: 'Non, uniquement ceux qui répondent à nos règles de sélection. Elles sont détaillées sur la page « Nos règles de sélection ».' },
];

export default function ProPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-widest uppercase">SINGULIER</Link>
          <div className="flex items-center gap-5">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              Le site
            </Link>
            <a href="#rejoindre" className="h-10 px-5 inline-flex items-center bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider">
              Rejoindre
            </a>
          </div>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-14 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Espace agences</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.12]">
          Vos biens d&apos;exception, devant ceux qui cherchent l&apos;exception.
        </h1>
        <p className="mt-6 text-stone-500 font-light text-lg max-w-2xl mx-auto">
          SINGULIER réunit les biens atypiques haut de gamme : lofts, ateliers d&apos;artistes, péniches, rooftops et biens de caractère. Présentez votre catalogue à une audience qui cherche précisément cela.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#rejoindre" className="h-12 px-8 inline-flex items-center bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition">
            Rejoindre SINGULIER
          </a>
          <span className="text-sm text-stone-500">Gratuit pendant le lancement · sans engagement</span>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl text-stone-900 text-center">Ce que SINGULIER vous apporte</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="border border-stone-200 bg-white p-8">
              <p.icon className="w-6 h-6 text-stone-900" />
              <h3 className="mt-4 font-serif text-xl text-stone-900">{p.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-stone-600 leading-relaxed">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2"><span aria-hidden="true">·</span><span>{it}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="font-serif text-3xl text-stone-900 text-center">Comment ça marche</h2>
          <p className="mt-3 text-center text-stone-500">Simple, et sans engagement.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full border border-stone-900 flex items-center justify-center font-serif text-xl">{s.n}</div>
                <h3 className="mt-5 font-serif text-xl text-stone-900">{s.title}</h3>
                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-stone-900 text-center">Questions fréquentes</h2>
        <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
          {faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-lg text-stone-900">
                {f.q}
                <span className="text-stone-400 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm text-stone-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="rejoindre" className="max-w-2xl mx-auto px-6 pb-24 scroll-mt-20">
        <h2 className="font-serif text-3xl text-stone-900 text-center">Rejoindre SINGULIER</h2>
        <p className="mt-3 text-center text-stone-500">Dites-nous qui vous êtes, nous revenons vers vous rapidement.</p>
        <div className="mt-8">
          <ProForm />
        </div>
        <p className="mt-6 text-center text-xs text-stone-400">
          <Link href="/classement" className="underline underline-offset-4 hover:text-stone-900">Nos règles de sélection</Link>
        </p>
      </section>
    </div>
  );
}

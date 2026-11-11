import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft, Eye, Megaphone, MousePointerClick, Sparkles } from 'lucide-react';
import ProForm from './ProForm';
import logiciels from './logiciels.png';
export const metadata = {
  title: 'Agences : présentez vos biens atypiques · Loftissime',
  description:
    'Loftissime, le premier hub d’annonces immobilières atypiques. Présentez vos biens à des acheteurs qui cherchent précisément cela. Gratuit pendant le lancement.',
  alternates: { canonical: '/pro' },
};

const pillars = [
  {
    icon: Eye,
    title: 'Visibilité',
    highlight: false,
    items: [
      'Un site entièrement dédié aux biens atypiques',
      'Une page agence qui rassemble tous vos biens',
      'Vos biens classés par catégorie et par ville',
    ],
  },
  {
    icon: MousePointerClick,
    title: 'Contacts directs',
    highlight: true,
    items: [
      'Chaque annonce affiche votre agence en bonne place',
      'Un lien direct vers votre annonce d’origine',
      'Les acheteurs vous contactent, sans intermédiaire',
    ],
  },
  {
    icon: Sparkles,
    title: 'Sélection exigeante',
    highlight: false,
    items: [
      'Une charte de sélection précise et publique',
      'Un bien répond à la charte, ou n’y répond pas',
      'Un cadre qui valorise vos mandats les plus rares',
    ],
  },
];

const steps = [
  { n: '1', text: 'Création d’une passerelle avec votre logiciel de diffusion, ou dépôt d’annonce sur votre espace Pro.' },
  { n: '2', text: 'Envoi de vos annonces par notification aux utilisateurs, en temps réel.' },
  { n: '3', text: 'Gestion de tous vos contacts sur votre compte Loftissime Pro, et envoi direct des leads acquéreurs par email ou SMS.' },
];

export default function ProPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-5">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              Accueil
            </Link>
            <a href="#rejoindre" className="h-10 px-5 inline-flex items-center gap-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider">
              <Megaphone className="w-4 h-4" />
              Diffuser mes annonces
            </a>
          </div>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-14 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Espace agences</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.12]">
          Le premier hub d&apos;annonces immobilières atypiques.
        </h1>
        <p className="mt-6 text-stone-500 font-light text-lg max-w-2xl mx-auto">
          Lofts, ateliers d&apos;artistes, rooftops, et bien d&apos;autres lieux singuliers. Présentez vos biens à une audience qui cherche précisément cela.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#rejoindre" className="h-12 px-8 inline-flex items-center gap-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition">
            <Megaphone className="w-4 h-4" />
            Diffuser mes annonces
          </a>
          <span className="text-sm text-stone-500">Gratuit pendant le lancement · sans engagement</span>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-stone-900 text-center">Ce que Loftissime vous apporte</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className={`border p-8 ${p.highlight ? 'border-stone-900 bg-stone-900' : 'border-stone-200 bg-white'}`}>
              <p.icon className={`w-6 h-6 ${p.highlight ? 'text-white' : 'text-stone-900'}`} />
              <h3 className={`mt-4 font-serif text-xl ${p.highlight ? 'text-white' : 'text-stone-900'}`}>{p.title}</h3>
              <ul className={`mt-4 space-y-2 text-sm leading-relaxed ${p.highlight ? 'text-stone-200' : 'text-stone-600'}`}>
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2"><span aria-hidden="true">·</span><span>{it}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="font-serif text-3xl text-stone-900 text-center">Comment ça marche ?</h2>
          <p className="mt-3 text-center text-stone-500">Vous n&apos;avez rien à faire, nous nous occupons de tout.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full border border-stone-900 flex items-center justify-center font-serif text-xl">{s.n}</div>
                <p className="mt-5 text-sm text-stone-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-16 text-center text-[10px] uppercase tracking-widest text-stone-400">
            Passerelles prévues avec les principaux logiciels
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logiciels.src} alt="Hektor, AC3, Ubiflow, Netty, Apimo" className="mx-auto mt-6 w-full max-w-xl" />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-3xl text-stone-900">Une question ?</h2>
        <p className="mt-3 text-stone-500">
                   La sélection des biens, le fonctionnement du site, le coût, la transmission de vos annonces : tout est dans
          nos questions fréquentes.
        </p>
        <p className="mt-5">
          <Link href="/charte" className="text-sm text-stone-900 underline underline-offset-4">Charte et questions fréquentes</Link>
        </p>
      </section>

      <section id="rejoindre" className="max-w-2xl mx-auto px-6 pb-24 scroll-mt-20">
        <h2 className="font-serif text-3xl text-stone-900 text-center">Diffuser mes annonces sur Loftissime</h2>
        <p className="mt-3 text-center text-stone-500">Dites-nous qui vous êtes, nous revenons vers vous rapidement.</p>
        <div className="mt-8">
          <ProForm />
        </div>
      </section>
    </div>
  );
}

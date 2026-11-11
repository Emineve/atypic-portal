import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft, Eye, MousePointerClick, Sparkles } from 'lucide-react';
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

const weDo = [
  'Nous référençons vos biens atypiques, sélectionnés selon la charte Loftissime.',
  'Chaque annonce affiche le nom de votre agence, celui du négociateur en charge du bien et son numéro de téléphone.',
  'Les acheteurs contactent directement le négociateur ou lui demandent d’être rappelés.',
  'Chaque annonce renvoie vers celle de votre site, qui reste la référence.',
  'Nous retirons un bien dès qu’il est vendu, ou sur simple demande de votre part.',
];

const weDont = [
  'Nous ne sommes pas une agence : nous ne prenons aucun mandat et n’intervenons dans aucune transaction.',
  'Nous ne contactons jamais les vendeurs ni les acheteurs.',
  'Nous ne communiquons jamais l’adresse d’un bien (que nous ne connaissons d’ailleurs pas).',
];

const doors = [
  {
    n: '1',
    title: 'Une origine singulière',
    text: 'Le lieu a eu une autre vie avant d’être habité : loft, atelier d’artiste, ancienne usine, entrepôt, imprimerie, chapelle, presbytère, moulin, grange, chai, écurie, bergerie, péniche, maison troglodyte.',
  },
  {
    n: '2',
    title: 'Une signature',
    text: 'Le lieu a été conçu ou transformé avec un parti pris fort : maison ou villa d’architecte, appartement repensé par un architecte, construction marquante de son époque. La signature peut aussi être celle d’un propriétaire qui a aménagé son lieu avec une vraie personnalité.',
  },
  {
    n: '3',
    title: 'Un caractère rare',
    text: 'Le lieu se distingue par son volume (grande hauteur sous plafond, verrière, duplex, triplex, souplex), par sa situation (dernier étage, toit-terrasse, terrasse, vue dégagée, jardin en ville, bord de l’eau) ou par son histoire (hôtel particulier, château, manoir, maison de maître, bastide, mas, longère, chaumière, et tout bien ancien qui a su garder son caractère).',
  },
];

const faq: { q: string; a: string; points?: string[] }[] = [
  { q: 'Combien cela coûte-t-il ?', a: 'La participation est gratuite pendant la phase de lancement. Toute évolution des conditions vous sera communiquée à l’avance, sans engagement de votre part.' },
  {
    q: 'Comment vous transmettre mes annonces ?',
    a: 'Automatiquement, via votre logiciel de diffusion ou par un lien XML.',
    points: ['Passerelle en direct avec votre logiciel', 'Publication et mise à jour en temps réel', 'Support technique dédié'],
  },
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
              Le site
            </Link>
            <a href="#rejoindre" className="h-10 px-5 inline-flex items-center bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider">
              Diffuser mes annonces
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
          Loftissime est le premier hub d&apos;annonces immobilières atypiques : lofts, ateliers d&apos;artistes, rooftops, et bien d&apos;autres lieux singuliers. Présentez vos biens à une audience qui cherche précisément cela.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#rejoindre" className="h-12 px-8 inline-flex items-center bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition">
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

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-stone-900 text-center">Notre fonctionnement</h2>
        <p className="mt-3 text-center text-stone-500 max-w-2xl mx-auto">
          Une position neutre, et un seul objectif : faciliter la mise en relation entre les acheteurs et vos négociateurs.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-stone-200 bg-white p-8">
            <h3 className="font-serif text-xl text-stone-900">Ce que nous faisons</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 leading-relaxed">
              {weDo.map((it) => (
                <li key={it} className="flex gap-2"><span aria-hidden="true">·</span><span>{it}</span></li>
              ))}
            </ul>
          </div>
          <div className="border border-stone-200 bg-white p-8">
            <h3 className="font-serif text-xl text-stone-900">Ce que nous ne faisons pas</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 leading-relaxed">
              {weDont.map((it) => (
                <li key={it} className="flex gap-2"><span aria-hidden="true">·</span><span>{it}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="charte" className="bg-white border-y border-stone-200 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 text-center">On diffuse, ou on ne diffuse pas</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-900 text-center">La charte Loftissime</h2>
          <div className="mt-10 space-y-8">
            {doors.map((d) => (
              <div key={d.n} className="flex gap-5">
                <div className="shrink-0 h-10 w-10 rounded-full border border-stone-900 flex items-center justify-center font-serif text-lg">{d.n}</div>
                <div>
                  <h3 className="font-serif text-xl text-stone-900">{d.title}</h3>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 space-y-8 border-t border-stone-200 pt-10">
            <div>
              <h3 className="font-serif text-xl text-stone-900">Le prix n&apos;est pas un critère</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Le prix d&apos;un bien n&apos;entre pas en compte dans la sélection. Seul son caractère atypique compte.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-stone-900">Ce que nous ne diffusons pas</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Tous les logements qui n&apos;entrent pas dans la charte des biens atypiques.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-stone-900">Des biens réellement à vendre</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Tous les biens proposés sont en cours de commercialisation.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-stone-900">Notre engagement</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                La charte s&apos;applique de la même façon à toutes les agences. Un bien qui n&apos;y répond pas n&apos;est pas diffusé.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-stone-200">
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
              {f.points && (
                <ul className="mt-2 space-y-1 text-sm text-stone-600 leading-relaxed">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex gap-2"><span aria-hidden="true">·</span><span>{pt}</span></li>
                  ))}
                </ul>
              )}
            </details>
          ))}
        </div>
      </section>

      <section id="rejoindre" className="max-w-2xl mx-auto px-6 pb-24 scroll-mt-20">
        <h2 className="font-serif text-3xl text-stone-900 text-center">Diffuser mes annonces sur Loftissime</h2>
        <p className="mt-3 text-center text-stone-500">Dites-nous qui vous êtes, nous revenons vers vous rapidement.</p>
        <div className="mt-8">
          <ProForm />
        </div>
        <p className="mt-6 text-center text-xs text-stone-400">
          <Link href="/classement" className="underline underline-offset-4 hover:text-stone-900">Référencement et classement</Link>
        </p>
      </section>
    </div>
  );
}

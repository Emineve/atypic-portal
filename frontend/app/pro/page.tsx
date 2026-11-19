import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProForm from './ProForm';
import logiciels from './logiciels.png';
export const metadata = {
  title: 'Agences : présentez vos biens atypiques · Loftissime',
  description:
    'Loftissime, le premier hub d’annonces immobilières atypiques. Présentez vos biens à des acheteurs qui cherchent précisément cela. Gratuit pendant le lancement.',
  alternates: { canonical: '/pro' },
};

// Cinq promesses faites aux agences, dans le même ton que « Pourquoi Loftissime ».
const PROMISES: { title: string; text: string; href?: string; link?: string; software?: boolean }[] = [
  {
    title: 'Vos acheteurs sont déjà là.',
    text: 'Ici, on ne vient que pour l’atypique : lofts, ateliers d’artistes, rooftops, péniches. Vos biens ne sont plus noyés parmi les annonces classiques, et les acheteurs qui ont créé une alerte sont prévenus dès qu’ils arrivent.',
  },
  {
    title: 'Le contact est pour vous.',
    text: 'Votre agence, votre négociateur et son téléphone figurent sur chaque annonce. L’acheteur vous appelle, vous écrit ou demande à être rappelé. Sans intermédiaire.',
  },
  {
    title: 'Seuls les biens singuliers entrent.',
    text: 'Six caractéristiques précises : un bien en présente au moins une, ou il n’est pas diffusé. Un cadre qui valorise vos mandats les plus rares.',
    href: '/charte',
    link: 'Ce que nous publions, et ce que nous ne publions pas',
  },
  {
    title: 'Vous n’avez rien à faire.',
    text: 'Une passerelle avec votre logiciel de diffusion, et vos annonces se publient et se mettent à jour seules. Un bien vendu est retiré.',
    software: true,
  },
  {
    title: 'C’est gratuit.',
    text: 'Pendant toute la phase de lancement, sans engagement. Toute évolution des conditions vous sera annoncée à l’avance.',
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
        <ol>
          {PROMISES.map((p, i) => (
            <li key={p.title} className="grid md:grid-cols-[5rem_1fr] gap-x-6 border-t border-stone-900 py-10 md:py-14">
              <span className="font-serif text-xl text-stone-400 md:pt-2" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="mt-2 md:mt-0 font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900">{p.title}</h2>
                <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-stone-600">{p.text}</p>
                {p.href && p.link && (
                  <p className="mt-5">
                    <Link href={p.href} className={link}>{p.link}</Link>
                  </p>
                )}
                {p.software && (
                  <>
                    <p className="mt-8 text-xs uppercase tracking-widest text-stone-500">Passerelles prévues avec les principaux logiciels</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logiciels.src} alt="Hektor, AC3, Ubiflow, Netty, Apimo" className="mt-5 w-full max-w-xl" />
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>

        <section id="rejoindre" className="border-t border-stone-900 pt-12 md:pt-16 scroll-mt-20">
          <h2 className={h2}>
            Diffuser mes annonces <span className="italic text-stone-500">sur Loftissime.</span>
          </h2>
          <p className="mt-4 text-lg font-light text-stone-600">Dites-nous qui vous êtes, nous revenons vers vous rapidement.</p>
          <div className="mt-8 max-w-2xl">
            <ProForm />
          </div>
          <p className="mt-8">
            <Link href="/charte" className={link}>Toutes les questions fréquentes</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

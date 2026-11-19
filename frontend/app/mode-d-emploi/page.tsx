import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Mode d’emploi · Loftissime',
  description:
    'Du premier clic à la visite : comment chercher, repérer et visiter un bien atypique sans passer à côté du vôtre.',
  alternates: { canonical: '/mode-d-emploi' },
};

// Trois moments de la recherche ; chaque ligne est une action, pas un conseil à lire.
const STAGES: { title: string; steps: [string, string][] }[] = [
  {
    title: 'Je cherche',
    steps: [
      ['Lancer ma recherche, large d’abord', '/'],
      ['Créer mon alerte', '/?alerte=1'],
      ['Confier ma recherche à plusieurs agences', '/agence'],
    ],
  },
  {
    title: 'J’ai repéré un bien',
    steps: [
      ['Le garder dans mes favoris', '/'],
      ['Me faire rappeler par l’agence', '/'],
      ['Estimer ma mensualité', '/financement'],
    ],
  },
  {
    title: 'Je visite',
    steps: [
      ['Lire les questions à poser', '/guide/questions-a-poser-visite-bien-atypique'],
      ['Savoir ce que j’achète : souplex, loft, péniche', '/guide'],
      ['Repérer les travaux non déclarés', '/guide/travaux-non-declares'],
      ['Imaginer ce que je pourrais en faire', '/inspiration'],
    ],
  },
];

export default function ModeEmploiPage() {
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

      <header className="max-w-3xl mx-auto px-6 pt-14 md:pt-24 pb-10 md:pb-14">
        <p className="text-xs uppercase tracking-widest text-stone-500">Mode d&apos;emploi</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Du premier clic <span className="italic text-stone-500">à la visite.</span>
        </h1>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-24 space-y-12 md:space-y-16">
        {STAGES.map((s, i) => (
          <section key={s.title}>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-stone-900">
              <span className="mr-3 text-stone-400" aria-hidden="true">{i + 1}</span>
              {s.title}
            </h2>
            <ul className="mt-5 divide-y divide-stone-200 border-t border-stone-200">
              {s.steps.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="group flex items-center justify-between gap-4 py-4 text-lg text-stone-900">
                    <span className="underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900 transition">{label}</span>
                    <ArrowRight className="w-4 h-4 flex-none text-stone-400 group-hover:text-stone-900 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="text-sm text-stone-500">
          Envie de savoir pourquoi ce site existe ?{' '}
          <Link href="/qui-sommes-nous" className="underline underline-offset-4 decoration-stone-300 hover:text-stone-900">
            Pourquoi Loftissime
          </Link>
          .
        </p>
      </main>
    </div>
  );
}

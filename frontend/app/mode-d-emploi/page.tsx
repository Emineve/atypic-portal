import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ModeEmploiSteps from './ModeEmploiSteps';

export const metadata = {
  title: 'Mode d’emploi · Loftissime',
  description:
    'Du premier clic à la visite : comment chercher, repérer et visiter un bien atypique sans passer à côté du vôtre.',
  alternates: { canonical: '/mode-d-emploi' },
};

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
        <ModeEmploiSteps />
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

import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import TeeCard from './TeeCard';

export const metadata = {
  title: 'Le dressing · Loftissime',
  description: 'Les phrases de Loftissime, bientôt à porter : deux tee-shirts en préparation pour ceux qui ne veulent pas habiter comme tout le monde.',
  alternates: { canonical: '/dressing' },
};

export default function DressingPage() {
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

      <header className="max-w-4xl mx-auto px-6 pt-14 md:pt-24 pb-10 md:pb-14">
        <p className="text-xs uppercase tracking-widest text-stone-500">Le dressing</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Dans tout bien qui se respecte, <span className="italic text-stone-500">il y a un dressing.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          Voici le nôtre. Deux tee-shirts, pour ceux qui ne veulent pas s&apos;habiller comme tout le monde non plus. Ils ne sont pas encore en vente : dites-nous lequel vous fait envie.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-6 md:gap-8">
        <TeeCard
          dark
          name="Le banal"
          lines={['Ici, le banal', 'n’a pas sa place.']}
          pitch="Noir, phrase blanche. À porter chez soi, surtout si le chez-soi a une verrière."
        />
        <TeeCard
          name="Le singulier"
          lines={['Première personne', 'du singulier.']}
          pitch="Blanc, phrase noire. Une leçon de grammaire, et une façon d’habiter."
        />
      </main>
    </div>
  );
}

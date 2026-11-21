import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import TeeCard from './TeeCard';

export const metadata = {
  title: 'Le dressing · Loftissime',
  description: 'Les phrases de Loftissime, bientôt à porter : trois tee-shirts en préparation pour ceux qui ne veulent pas habiter comme tout le monde.',
  alternates: { canonical: '/dressing' },
};

export default function DressingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-4xl">
        <Crumbs items={[{ label: 'Le dressing' }]} />
        <h1 className="mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Dans tout bien qui se respecte, <span className="italic text-stone-500">il y a un dressing.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-600">
          Trois tee-shirts, pas encore en vente. Dites-nous lequel vous fait envie.
        </p>
      </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <TeeCard
          name="Le superlatif"
          words={['loftisssssime.']}
          pitch="Le nom, sur une ligne, en noir. -issime : le plus haut degré, à étirer autant qu’on veut."
        />
        <TeeCard
          first="Blanc"
          name="Le singulier"
          words={['singulièrement', 'vôtre.']}
          pitch="Deux mots, en noir. Une formule de politesse, et une façon d’habiter."
        />
        <TeeCard
          first="Rouge"
          name="Le regard"
          words={['l.']}
          mark
          pitch="Le « l. » de Loftissime, dont le point vous regarde. Pour ceux qui ont l’œil."
        />
      </div>
      </main>
    </div>
  );
}

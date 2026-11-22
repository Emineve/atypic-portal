import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import TeeCard from './TeeCard';

export const metadata = {
  title: 'Le dressing · Loftissime',
  description: 'Le tee-shirt Loftissime, bientôt à porter : blanc, avec le mot « atypiques » souligné de jaune.',
  alternates: { canonical: '/dressing' },
};

export default function DressingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-10 md:pb-14">
        <div className="max-w-4xl">
        <Crumbs items={[{ label: 'Le dressing' }]} />
        <h1 className="mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Dans tout bien qui se respecte, <span className="italic text-stone-500">il y a un dressing.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-600">
          Un tee-shirt, blanc, pas encore en vente. Dites-nous s’il vous fait envie.
        </p>
      </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="pb-24 max-w-4xl">
        <TeeCard
          name="L’atypique"
          pitch="Blanc, avec un seul mot : atypiques, qui penche sur son trait jaune. Celui du titre du site."
        />
      </div>
      </main>
    </div>
  );
}

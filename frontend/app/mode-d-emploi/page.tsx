import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import Link from 'next/link';
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
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-4xl">
        <Crumbs items={[{ label: 'Mode d’emploi' }]} />
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Du premier clic à la visite. <span className="italic text-stone-500">Nous vous accompagnons.</span>
        </h1>
      </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="max-w-5xl pb-24">
        <ModeEmploiSteps />
        <p className="mt-12 md:mt-16 text-sm text-stone-500">
          Envie de savoir pourquoi ce site existe ?{' '}
          <Link href="/qui-sommes-nous" className="underline underline-offset-4 decoration-stone-300 hover:text-stone-900">
            Pourquoi Loftissime
          </Link>
          .
        </p>
      </div>
      </main>
    </div>
  );
}

import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import MyAlerts from './MyAlerts';

export const metadata = {
  title: 'Mes alertes · Loftissime',
  description: 'Retrouvez vos alertes Loftissime : consultez-les, arrêtez-en une ou créez-en une nouvelle.',
  alternates: { canonical: '/alerte' },
  robots: { index: false, follow: true },
};

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader alert={false} />
      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-10 md:pb-14">
        <div className="max-w-3xl">
        <Crumbs items={[{ label: 'Mes alertes' }]} />
        <h1 className="mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Toutes vos alertes, <span className="italic text-stone-500">au même endroit.</span>
        </h1>
      </div>
      </header>
      <main className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl pb-24">
        <MyAlerts />
      </div>
      </main>
    </div>
  );
}

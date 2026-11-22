import SiteHeader from './SiteHeader';
import Crumbs from './Crumbs';
import { LEGAL_READY, UPDATED } from '../lib/legal';

export default function LegalPage({ title, children, hideBanner }: { title: string; children: React.ReactNode; hideBanner?: boolean }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl pt-8 md:pt-12 pb-24">
        <Crumbs items={[{ label: title }]} className="mb-8" />
        {!LEGAL_READY && !hideBanner && (
          <p className="mb-8 rounded-[10px] border border-stone-300 bg-stone-50 text-xs text-stone-600 p-3 leading-relaxed">
            Version provisoire : certaines informations de l'éditeur seront complétées avant le lancement officiel du site.
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.05] text-stone-900">{title}</h1>
        <p className="mt-4 text-sm text-stone-500">Dernière mise à jour : {UPDATED}</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-stone-700 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-stone-900 [&_h2]:pt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </div>
      </main>
    </div>
  );
}

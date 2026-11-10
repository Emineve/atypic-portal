import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LEGAL_READY, UPDATED } from '../lib/legal';

export default function LegalPage({ title, children, hideBanner }: { title: string; children: React.ReactNode; hideBanner?: boolean }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-widest uppercase">Loftissime</Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Accueil
          </Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12">
        {!LEGAL_READY && !hideBanner && (
          <p className="mb-8 border border-stone-300 bg-stone-50 text-xs text-stone-600 p-3 leading-relaxed">
            Version provisoire : certaines informations de l'éditeur seront complétées avant le lancement officiel du site.
          </p>
        )}
        <h1 className="font-serif text-3xl md:text-4xl text-stone-900">{title}</h1>
        <p className="mt-2 text-xs text-stone-400">Dernière mise à jour : {UPDATED}</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-stone-700 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-stone-900 [&_h2]:pt-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </main>
    </div>
  );
}

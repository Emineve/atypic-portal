import Logo from './Logo';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SITE_URL } from '../lib/site';
import Tracker from './Tracker';
import CollectionAlert from './CollectionAlert';

export interface CollectionItem {
  id: string;
  title: string;
  short_description: string | null;
  price: number;
  surface_sqm: number | null;
  city: string;
  source_agency: string;
  atypic_category: string;
  cover_image_url: string;
}

export default function CollectionPage({
  title,
  intro,
  items,
  alert,
}: {
  title: string;
  intro: string;
  items: CollectionItem[];
  alert?: { category?: string; location?: string }; // réglages de l'alerte proposée sur la page
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/biens/${it.id}`,
      name: it.title,
    })),
  };
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Tracker />
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les biens 
          </Link>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">{title}</h1>
        <p className="mt-4 text-stone-500 font-light">{intro}</p>
        <p className="mt-6 font-serif text-lg text-stone-700">
                    {items.length} {items.length > 1 ? 'lieux atypiques' : 'lieu atypique'}
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {items.length === 0 ? (
          <CollectionAlert empty category={alert?.category} location={alert?.location} />
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <article key={item.id} className="group flex flex-col bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href={`/biens/${item.id}`} className="relative block aspect-[4/3] bg-stone-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1">{item.atypic_category}</span>
                  <span className="absolute bottom-3 left-3 bg-white/95 text-stone-900 text-[10px] uppercase tracking-widest px-2 py-0.5 font-mono">Annonce {item.source_agency}</span>
                </Link>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between text-xs text-stone-400 uppercase tracking-wider mb-2">
                      <span>{item.city}</span>
                      {item.surface_sqm && <span>{Math.round(item.surface_sqm)} m²</span>}
                    </div>
                    <h2 className="font-serif text-lg leading-snug text-stone-900">{item.title}</h2>
                    {item.short_description && (
                      <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">{item.short_description}</p>
                    )}
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xl font-medium tracking-tight font-serif">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(item.price)}
                    </span>
                    <Link href={`/biens/${item.id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white px-4 py-2.5 hover:bg-stone-800 transition">
                      Voir le bien
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {alert && <CollectionAlert empty={false} category={alert.category} location={alert.location} />}
          </>
        )}
      </main>
    </div>
  );
}

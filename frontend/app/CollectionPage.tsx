import Crumbs from './Crumbs';
import SiteHeader from './SiteHeader';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SITE_URL } from '../lib/site';
import Tracker from './Tracker';
import CollectionAlert from './CollectionAlert';
import AgencySearch from './AgencySearch';

export interface CollectionItem {
  id: string;
  title: string;
  short_description: string | null;
  price: number;
  surface_sqm: number | null;
  city: string;
  source_agency: string;
  source_id?: string | null;
  atypic_category: string;
  atypic_tags?: string[] | null;
  cover_image_url: string;
}

export default function CollectionPage({
  title,
  intro,
  items,
  alert,
  hideAgency = false,
}: {
  hideAgency?: boolean;
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
      <SiteHeader wide />

      <header className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <Crumbs items={hideAgency ? [{ label: 'Agences', href: '/agence' }, { label: title }] : [{ label: alert?.location || alert?.category || title }]} />
        <h1 className="mt-6 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-stone-600">{intro}</p>
        {!hideAgency && (
          <p className="mt-5 font-serif text-lg text-stone-700">
            {items.length} {items.length > 1 ? 'biens' : 'bien'}<span className="hidden sm:inline"> à découvrir</span>
          </p>
        )}
        {hideAgency && <AgencySearch agency={title} />}
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {items.length === 0 ? (
          <CollectionAlert empty category={alert?.category} location={alert?.location} />
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <article key={item.id} className="group flex flex-col rounded-[14px] bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href={`/biens/${item.id}`} className="relative block aspect-[4/3] bg-stone-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <span className="absolute inset-x-0 top-0 px-4 pt-3.5 pb-10 bg-gradient-to-b from-black/50 to-transparent text-white text-xs font-semibold uppercase tracking-widest [text-shadow:0_1px_2px_rgba(0,0,0,.6)]">{item.atypic_category}</span>
                </Link>
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">{item.city}{item.surface_sqm ? ` · ${Math.round(item.surface_sqm)} m²` : ''}</p>
                    <h2 className="font-serif text-2xl leading-tight text-stone-900 line-clamp-3">{item.title}</h2>
                    {item.atypic_tags && item.atypic_tags.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Atouts du bien">
                        {item.atypic_tags.slice(0, 3).map((tag) => (
                          <li key={tag} className="rounded-full bg-[#F4E7B5] px-2.5 py-0.5 text-xs text-stone-800">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {(!hideAgency || item.source_id) && (
                    <p className="mt-4 text-xs text-stone-400">
                      {[hideAgency ? null : `Annonce ${item.source_agency}`, item.source_id ? `Réf. ${item.source_id}` : null].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <div className={`${hideAgency && !item.source_id ? 'mt-6' : 'mt-3'} pt-4 border-t border-stone-100 flex items-center justify-between`}>
                    <span className="text-xl font-medium tracking-tight font-serif">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(item.price)}
                    </span>
                    <Link href={`/biens/${item.id}`} className="inline-flex items-center gap-1 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4 hover:text-stone-600 transition">
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

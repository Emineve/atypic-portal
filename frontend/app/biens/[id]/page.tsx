import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import ContactForm from './ContactForm';
import MortgageEstimate from './MortgageEstimate';
import Tracker from '../../Tracker';
// Page rendue à la demande : toujours à jour avec la base
export const dynamic = 'force-dynamic';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getListing(id: string) {
  if (!UUID.test(id)) return null;
  const { data } = await getSupabase()
    .from('listings')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const item = await getListing(params.id);
  if (!item) return { title: 'Bien introuvable · SINGULIER', robots: { index: false } };
  const title = `${item.title} · ${item.city || 'France'}`;
  const description = (item.short_description || '').slice(0, 160);
  const url = `/biens/${item.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: item.cover_image_url ? [{ url: item.cover_image_url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: item.cover_image_url ? [item.cover_image_url] : [],
    },
  };
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const item = await getListing(params.id);
  if (!item) notFound();

  const price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(item.price);

  const facts: [string, string][] = [];
  if (item.property_type) facts.push(['Type', item.property_type]);
  if (item.surface_sqm) facts.push(['Surface', `${item.surface_sqm} m²`]);
  if (item.rooms) facts.push(['Pièces', String(item.rooms)]);
  if (item.bedrooms) facts.push(['Chambres', String(item.bedrooms)]);
  if (item.floor !== null && item.floor !== undefined) facts.push(['Étage', String(item.floor)]);
  if (item.charges_yearly) facts.push(['Charges', `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(item.charges_yearly)} €/an`]);
  if (item.city) facts.push(['Localisation', [item.city, item.postal_code].filter(Boolean).join(' ')]);

  const gallery: string[] = Array.isArray(item.images) ? item.images.slice(1, 7) : [];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.title,
    description: item.short_description,
    image: Array.isArray(item.images) && item.images.length ? item.images.slice(0, 6) : [item.cover_image_url],
    category: item.atypic_category,
    offers: {
      '@type': 'Offer',
      price: item.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://atypic-portal.vercel.app/biens/${item.id}`,
    },
  };
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-widest uppercase">SINGULIER</Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Toute la collection
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
              {item.atypic_category}
            </div>
          </div>

          {gallery.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {gallery.map((src: string, idx: number) => (
                <div key={idx} className="aspect-[4/3] bg-stone-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${item.title} - photo ${idx + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8">
            <p className="text-xs uppercase tracking-wider text-stone-400">
              {item.city}{item.district ? ` · ${item.district}` : ''}
            </p>
            <h1 className="mt-2 font-serif text-3xl md:text-4xl leading-tight text-stone-900">{item.title}</h1>
            <p className="mt-4 font-serif text-3xl text-stone-900">{price}</p>
            {item.fees_text && <p className="mt-1 text-xs text-stone-500">{item.fees_text}</p>}

            {facts.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-stone-200 py-5">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[10px] uppercase tracking-widest text-stone-400">{label}</dt>
                    <dd className="mt-1 text-sm text-stone-900">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <p className="mt-6 text-stone-700 leading-relaxed">{item.short_description}</p>

            {item.atypic_tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-6">
                {item.atypic_tags.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-stone-50 border border-stone-200 text-stone-600 text-[11px] px-2.5 py-1">{tag}</span>
                ))}
              </div>
            )}

            {item.features?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-[10px] uppercase tracking-widest text-stone-400">Caractéristiques</h2>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-700">
                  {item.features.map((f: string, idx: number) => (
                    <li key={idx}>· {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {(item.dpe_class || item.ges_class) && (
              <div className="mt-6 flex gap-6 text-sm text-stone-700">
                {item.dpe_class && <span>Énergie (DPE) : <strong>{item.dpe_class}</strong></span>}
                {item.ges_class && <span>Climat (GES) : <strong>{item.ges_class}</strong></span>}
              </div>
            )}

            <p className="mt-8 text-xs text-stone-400">
              Annonce {item.source_agency}{item.source_id ? ` · Réf. ${item.source_id}` : ''}
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <ContactForm listingId={item.id} agency={item.source_agency} />
                    <MortgageEstimate price={Number(item.price)} />
                    <Tracker listingId={item.id} />
          <a
            href={`/go/${item.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 border border-stone-900 text-stone-900 text-xs font-semibold uppercase tracking-wider px-4 py-3 hover:bg-stone-900 hover:text-white transition"
          >
            Voir l'annonce d'origine
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </aside>
      </main>
    </div>
  );
}

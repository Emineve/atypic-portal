import Logo from '../../Logo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { SITE_URL } from '../../../lib/site';
import { slugify, cityHub } from '../../../lib/catalog';
import ContactForm from './ContactForm';
import MortgageEstimate from './MortgageEstimate';
import ReportButton from './ReportButton';
import Gallery from './Gallery';
import StickyContact from './StickyContact';
import ShareButtons from './ShareButtons';
import Tracker from '../../Tracker';
import { DpeScale } from '../../DpeBadge';

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

async function getRelated(item: { id: string; city: string | null }) {
  if (!item.city) return [];
  const hub = cityHub(item.city);
  const { data } = await getSupabase()
    .from('listings')
    .select('id,title,price,city,surface_sqm,cover_image_url,curation_score')
    .eq('is_active', true)
    .neq('id', item.id)
    .order('curation_score', { ascending: false, nullsFirst: false })
    .limit(60);
  return (data || []).filter((r) => r.city && cityHub(r.city) === hub).slice(0, 3);
}

// Empêche une valeur de la base de refermer la balise <script>
function safeJson(o: unknown) {
  return JSON.stringify(o).replace(/</g, '\\u003c');
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const item = await getListing(params.id);
  if (!item) return { title: 'Bien introuvable · Loftissime', robots: { index: false } };
  const title = `${item.title} · ${item.city || 'France'}`;
  const description = (item.short_description || '').slice(0, 160);
  // Titre des aperçus de partage (WhatsApp, SMS…) : titre, ville, surface, prix
  const shareTitle = [
    item.title,
    item.city,
    item.surface_sqm ? `${Math.round(Number(item.surface_sqm))} m²` : '',
    item.price ? `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(item.price).replace(/[\u202f\u00a0]/g, ' ')} €` : '',
  ].filter(Boolean).join(' - ');
  const url = `/biens/${item.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: shareTitle,
      description,
      images: item.cover_image_url ? [{ url: item.cover_image_url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
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

  const rawImages: string[] = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
  const allImages: string[] = Array.from(new Set([item.cover_image_url, ...rawImages].filter(Boolean))).slice(0, 30);
    const related = await getRelated(item);
  const { count: agencyTotal } = await getSupabase()
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('source_agency', item.source_agency);
  const agencyCount = agencyTotal || 1;
  const hubName = item.city ? cityHub(item.city) : null;
  const hubUrl = hubName ? `/ville/${slugify(hubName)}` : null;
  const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

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
      url: `${SITE_URL}/biens/${item.id}`,
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      ...(hubName && hubUrl ? [{ '@type': 'ListItem', position: 2, name: hubName, item: `${SITE_URL}${hubUrl}` }] : []),
      { '@type': 'ListItem', position: hubName ? 3 : 2, name: item.title },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans pb-20 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumb) }} />
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les biens
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <Gallery images={allImages} title={item.title} category={item.atypic_category} />

          <div className="mt-8">
            <nav aria-label="Fil d'Ariane" className="mb-3 text-xs text-stone-400">
              <Link href="/" className="hover:text-stone-900">Accueil</Link>
              {hubName && hubUrl && (
                <>
                  {' › '}
                  <Link href={hubUrl} className="hover:text-stone-900">{hubName}</Link>
                </>
              )}
            </nav>
            <p className="text-xs uppercase tracking-wider text-stone-400">
              {item.city}{item.district ? ` · ${item.district}` : ''}
            </p>
            <h1 className="mt-2 font-serif text-3xl md:text-4xl leading-tight text-stone-900">{item.title}</h1>
            <p className="mt-4 font-serif text-3xl text-stone-900">{price}</p>
            <ShareButtons
              url={`${SITE_URL}/biens/${item.id}`}
              title={item.title}
              detail={[item.city, item.surface_sqm ? `${Math.round(Number(item.surface_sqm))} m²` : '', price].filter(Boolean).join(' · ')}
            />

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

            <div className="mt-6">
              <h2 className="text-[10px] uppercase tracking-widest text-stone-400">Performance énergétique</h2>
              <div className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                <DpeScale title="Énergie (DPE)" value={item.dpe_class} kind="dpe" />
                <DpeScale title="Climat (GES)" value={item.ges_class} kind="ges" />
              </div>
            </div>

            <p className="mt-8 text-xs text-stone-400">
              Annonce {item.source_agency}{item.source_id ? ` · Réf. ${item.source_id}` : ''}
              {item.fees_text ? <span className="block mt-1">{item.fees_text}</span> : null}
            </p>
          </div>
        </div>

        <aside className="space-y-4">
                    <div className="border border-stone-200 bg-white p-6">
            <p className="text-[10px] uppercase tracking-widest text-stone-400">Proposé par</p>
            <p className="mt-1 font-serif text-2xl text-stone-900">{item.source_agency}</p>
            <p className="mt-1 text-xs text-stone-500">
              {agencyCount} {agencyCount > 1 ? 'biens présentés' : 'bien présenté'} sur Loftissime
            </p>
            <Link
              href={`/agence/${slugify(item.source_agency)}`}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4"
            >
              Voir tous les biens de l'agence
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
                    <div id="contact" className="scroll-mt-20">
                              <ContactForm listingId={item.id} agency={item.source_agency} phone={item.contact_phone} contactName={item.contact_name} />
          </div>
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
          <ReportButton listingId={item.id} />
        </aside>
      </main>

            <StickyContact price={price} phone={item.contact_phone} listingId={item.id} />

      {related.length > 0 && hubName && hubUrl && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="font-serif text-2xl text-stone-900">Autres lieux singuliers à {hubName}</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} href={`/biens/${r.id}`} className="group block bg-white border border-stone-200 hover:shadow-lg transition">
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.cover_image_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400">{r.city}{r.surface_sqm ? ` · ${r.surface_sqm} m²` : ''}</p>
                  <p className="mt-1 font-serif text-stone-900 leading-snug">{r.title}</p>
                  <p className="mt-2 font-serif text-lg text-stone-900">{fmt(Number(r.price))}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link href={hubUrl} className="text-stone-700 underline underline-offset-4 hover:text-stone-900">Voir tous les biens à {hubName}</Link>
          </p>
        </section>
      )}
    </div>
  );
}

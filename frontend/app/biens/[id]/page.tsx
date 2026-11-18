import Logo from '../../Logo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BedDouble, Home, Layers, LayoutGrid, MapPin, Ruler, ChevronRight, Plus, Bath } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { SITE_URL } from '../../../lib/site';
import { slugify, cityHub } from '../../../lib/catalog';
import ContactForm from './ContactForm';
import ReportButton from './ReportButton';
import PhotoMosaic from './PhotoMosaic';
import Description from './Description';
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
  // Vignette de partage : la photo du bien, telle quelle. Une image légère est indispensable
  // pour que WhatsApp affiche l'aperçu (il ignore les images trop lourdes).
  const image = item.cover_image_url || `${SITE_URL}/opengraph-image`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: shareTitle,
      description,
      images: [{ url: image, alt: item.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [image],
    },
  };
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const item = await getListing(params.id);
  if (!item) notFound();

  const price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(item.price);

  // Chiffres clés : libellé, valeur, icône
  const facts: [string, string, typeof Ruler][] = [];
  if (item.surface_sqm) facts.push(['Surface', `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(Number(item.surface_sqm))} m²`, Ruler]);
  if (item.rooms) facts.push(['Pièces', String(item.rooms), LayoutGrid]);
  if (item.bedrooms) facts.push(['Chambres', String(item.bedrooms), BedDouble]);
  if (item.floor !== null && item.floor !== undefined) facts.push(['Étage', item.floor === 0 ? 'Rez-de-chaussée' : String(item.floor), Layers]);
  if (item.property_type) facts.push(['Type', item.property_type, Home]);
  if (item.bathrooms) facts.push([Number(item.bathrooms) > 1 ? 'Salles d’eau' : 'Salle d’eau', String(item.bathrooms), Bath]);
  // Localisation : uniquement le niveau le plus précis de l'annonce (le quartier s'il existe, sinon la ville).
  // Le code postal est omis quand la ville porte déjà l'arrondissement (« Paris 16e »).
  if (item.city || item.district) {
    const city: string = item.city || '';
    const cityLine = /\d+\s?(er|e|ème)$/i.test(city) ? city : [city, item.postal_code].filter(Boolean).join(' ');
    facts.push(['Localisation', item.district || cityLine, MapPin]);
  }
  // Dépenses d'énergie estimées par an (fourchette du diagnostic), mises en avant quand l'annonce les donne
  const eMin = Number(item.energy_cost_min) || 0;
  const eMax = Number(item.energy_cost_max) || 0;
  const eur0 = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €';
  const energyCost = eMin > 0 && eMax > 0 && eMax !== eMin ? `${eur0(eMin)} à ${eur0(eMax)}` : eMin > 0 || eMax > 0 ? eur0(eMax || eMin) : '';
  // Budget annuel : énergie, charges, taxe foncière, et leur équivalent mensuel
  const budget: [string, string][] = [];
  if (energyCost) budget.push(['Énergie', energyCost]);
  if (Number(item.charges_yearly) > 0) budget.push(['Charges de copropriété', eur0(Number(item.charges_yearly))]);
  if (Number(item.property_tax) > 0) budget.push(['Taxe foncière', eur0(Number(item.property_tax))]);
  const energyMid = eMin > 0 && eMax > 0 ? (eMin + eMax) / 2 : eMax || eMin;
  const monthly = budget.length > 1
    ? Math.round((energyMid + (Number(item.charges_yearly) || 0) + (Number(item.property_tax) || 0)) / 12 / 10) * 10
    : 0;
  const row = 'flex items-center gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden';
  // Réponses courtes des mentions obligatoires, lisibles sans ouvrir le détail
  const feesShort = /acqu[ée]reur/i.test(item.fees_text || '')
    ? 'À la charge de l’acquéreur'
    : /vendeur/i.test(item.fees_text || '')
      ? 'À la charge du vendeur'
      : 'Inclus dans le prix affiché';
  const coproShort = [
    item.copro_lots ? `${item.copro_lots} lots` : '',
    item.copro_procedure ? item.copro_procedure : '',
    !item.copro_lots && !item.copro_procedure && Number(item.charges_yearly) > 0 ? `${eur0(Number(item.charges_yearly))} de charges par an` : '',
  ]
    .filter(Boolean)
    .join(' · ');

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

      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <nav aria-label="Fil d'Ariane" className="text-xs text-stone-400">
          <Link href="/" className="hover:text-stone-900">Accueil</Link>
          {hubName && hubUrl && (
            <>
              {' › '}
              <Link href={hubUrl} className="hover:text-stone-900">{hubName}</Link>
            </>
          )}
        </nav>
        <ShareButtons
          url={`${SITE_URL}/biens/${item.id}`}
          title={item.title}
          detail={[item.city, item.surface_sqm ? `${Math.round(Number(item.surface_sqm))} m²` : '', price].filter(Boolean).join(' · ')}
        />
      </div>

      <PhotoMosaic images={allImages} title={item.title} favoriteId={item.id} />

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 min-w-0">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl leading-[1.1] text-stone-900">{item.title}</h1>
            <p className="mt-4 flex items-center gap-2 font-serif text-lg text-stone-800">
              <MapPin className="w-5 h-5 flex-none text-stone-500" strokeWidth={1.5} aria-hidden="true" />
              {item.district ? `${item.district}, ` : ''}{item.city}
            </p>

            {item.atypic_tags?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Atouts du bien">
                {item.atypic_tags.map((tag: string, idx: number) => (
                  <li key={idx} className="rounded-full bg-[#F4E7B5] text-stone-900 text-[13px] px-3.5 py-1.5">{tag}</li>
                ))}
              </ul>
            )}

            <p className="mt-5 font-serif text-3xl text-stone-900 lg:hidden">{price}</p>

            {facts.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-6 border-y border-stone-200 py-6">
                {facts.map(([label, value, Icon]) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-1 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} aria-hidden="true" />
                    <div className="min-w-0">
                      <dt className="text-[10px] uppercase tracking-widest text-stone-400">{label}</dt>
                      <dd className="mt-0.5 font-serif text-xl leading-snug text-stone-900">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            )}

            <Description text={item.short_description || ''} />

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

            {budget.length > 0 && (
              <section className="mt-10">
                <h2 className="font-serif text-2xl text-stone-900">Le budget au quotidien</h2>
                <dl className={`mt-5 grid grid-cols-1 ${budget.length === 3 ? 'sm:grid-cols-3' : budget.length === 2 ? 'sm:grid-cols-2' : ''} border-y border-stone-200 divide-y sm:divide-y-0 sm:divide-x divide-stone-200`}>
                  {budget.map(([label, value]) => (
                    <div key={label} className="py-5 sm:px-6 sm:first:pl-0">
                      <dt className="text-[10px] uppercase tracking-widest text-stone-400">{label}</dt>
                      <dd className="mt-1 font-serif text-2xl leading-tight text-stone-900">{value}</dd>
                      <dd className="text-sm text-stone-500">par an</dd>
                    </div>
                  ))}
                </dl>
                {monthly > 0 && (
                  <p className="mt-4 text-stone-700">
                    Soit environ <span className="font-serif text-xl text-stone-900">{eur0(monthly)}</span> par mois, hors crédit.
                  </p>
                )}
                {energyCost && (
                  <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                    Énergie : montant moyen estimé pour un usage standard, abonnement compris{item.energy_cost_ref ? `, sur la base des prix des années ${item.energy_cost_ref}` : ''}.
                  </p>
                )}
              </section>
            )}

            <section className="mt-10">
              <h2 className="font-serif text-2xl text-stone-900">L&apos;essentiel à savoir</h2>
              <div className="mt-4 border-y border-stone-200 divide-y divide-stone-200">
                {(item.dpe_class || item.ges_class) && (
                  <details className="group" open>
                    <summary className={row}>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-stone-500">Performance énergétique</span>
                        <span className="block font-serif text-lg text-stone-900">
                          {[item.dpe_class ? `DPE ${item.dpe_class}` : '', item.ges_class ? `GES ${item.ges_class}` : ''].filter(Boolean).join(' · ')}
                        </span>
                      </span>
                      <Plus className="w-5 h-5 flex-none text-stone-400 transition-transform group-open:rotate-45" />
                    </summary>
                    <div className="pb-6 flex flex-wrap gap-x-10 gap-y-4">
                      <DpeScale title="Énergie (DPE)" value={item.dpe_class} kind="dpe" />
                      <DpeScale title="Climat (GES)" value={item.ges_class} kind="ges" />
                    </div>
                  </details>
                )}
                <details className="group">
                  <summary className={row}>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm text-stone-500">Honoraires d&apos;agence</span>
                      <span className="block font-serif text-lg text-stone-900">{feesShort}</span>
                    </span>
                    <Plus className="w-5 h-5 flex-none text-stone-400 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 text-sm text-stone-600 leading-relaxed">
                    {item.fees_text
                      ? item.fees_text
                      : 'Le prix affiché comprend les honoraires d’agence. Leur répartition entre vendeur et acquéreur est précisée sur l’annonce de l’agence.'}
                  </p>
                </details>
                {coproShort && (
                  <details className="group">
                    <summary className={row}>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-stone-500">Copropriété</span>
                        <span className="block font-serif text-lg text-stone-900">{coproShort}</span>
                      </span>
                      <Plus className="w-5 h-5 flex-none text-stone-400 transition-transform group-open:rotate-45" />
                    </summary>
                    <ul className="pb-5 text-sm text-stone-600 leading-relaxed space-y-1">
                      {item.copro_lots ? <li>Bien soumis au statut de la copropriété : {item.copro_lots} lots.</li> : null}
                      {Number(item.charges_yearly) > 0 ? <li>Charges annuelles : {eur0(Number(item.charges_yearly))}.</li> : null}
                      {item.copro_procedure ? <li>{item.copro_procedure}.</li> : null}
                    </ul>
                  </details>
                )}
                <details className="group">
                  <summary className={row}>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm text-stone-500">Risques naturels et technologiques</span>
                      <span className="block font-serif text-lg text-stone-900">À consulter sur Géorisques</span>
                    </span>
                    <Plus className="w-5 h-5 flex-none text-stone-400 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 text-sm text-stone-600 leading-relaxed">
                    Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques :{' '}
                    <a href="https://www.georisques.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-stone-900 underline underline-offset-4">
                      www.georisques.gouv.fr
                    </a>
                    .
                  </p>
                </details>
              </div>
              <p className="mt-4 text-xs text-stone-400">
                Annonce {item.source_agency}{item.source_id ? ` · Réf. ${item.source_id}` : ''}
              </p>
            </section>
          </div>
        </div>

        <aside className="space-y-4 min-w-0">
          <div className="hidden lg:block border border-stone-200 bg-white p-6">
            <p className="font-serif text-4xl text-stone-900">{price}</p>
            <Link
              href={`/financement?prix=${Math.round(Number(item.price))}`}
              className="mt-2 inline-block text-sm italic text-stone-500 underline underline-offset-4 decoration-stone-300 hover:text-stone-900"
            >
              Estimer ma mensualité
            </Link>
          </div>
                    <div id="contact" className="scroll-mt-20">
                              <ContactForm listingId={item.id} agency={item.source_agency} phone={item.contact_phone} contactName={item.contact_name} title={item.title} reference={item.source_id} city={item.city} price={Number(item.price)} />
          </div>
          <Tracker listingId={item.id} />
          <div className="border-t border-stone-200 divide-y divide-stone-200 border-b">
            <Link href={`/agence/${slugify(item.source_agency)}`} className="group flex items-center gap-4 py-4">
              <span className="flex-1 min-w-0">
                <span className="block text-[11px] uppercase tracking-widest text-stone-400">Proposé par</span>
                <span className="block mt-1 font-serif text-lg text-stone-900 truncate">{item.source_agency}</span>
                <span className="block text-sm text-stone-500">
                  {agencyCount > 1 ? `Voir ses ${agencyCount} biens sur Loftissime` : 'Voir sa page sur Loftissime'}
                </span>
              </span>
              <ChevronRight className="w-5 h-5 flex-none text-stone-400 group-hover:text-stone-900 transition" />
            </Link>
            <a href={`/go/${item.id}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4">
              <span className="flex-1 text-sm text-stone-900">Voir l&apos;annonce sur le site de l&apos;agence</span>
              <ArrowUpRight className="w-5 h-5 flex-none text-stone-400 group-hover:text-stone-900 transition" />
            </a>
          </div>
          <ReportButton listingId={item.id} />
        </aside>
      </main>

            <StickyContact phone={item.contact_phone} listingId={item.id} contactName={item.contact_name} title={item.title} reference={item.source_id} />

      {related.length > 0 && hubName && hubUrl && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
                   <h2 className="font-serif text-2xl text-stone-900">Autres biens à découvrir à {hubName}</h2>
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

      <footer className="border-t border-stone-200 bg-white">
        <div className="max-w-xl mx-auto px-6 pt-8 pb-28 lg:pb-8 text-center">
          <Link href={`/financement?prix=${Math.round(Number(item.price))}`} className="text-sm text-stone-700 underline underline-offset-4 decoration-stone-300 hover:text-stone-900 hover:decoration-stone-900">
            Estimer ma mensualité pour ce bien
          </Link>
        </div>
      </footer>
    </div>
  );
}

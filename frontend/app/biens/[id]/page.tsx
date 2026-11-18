import Logo from '../../Logo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BedDouble, Home, Layers, LayoutGrid, MapPin, Ruler, ChevronRight, Bath, Check, Building2, Coins, Gavel } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { SITE_URL } from '../../../lib/site';
import { slugify, cityHub } from '../../../lib/catalog';
import ContactForm from './ContactForm';
import ReportButton from './ReportButton';
import PhotoMosaic from './PhotoMosaic';
import Description from './Description';
import PlanDownload from './PlanDownload';
import StickyContact from './StickyContact';
import ShareButtons from './ShareButtons';
import Tracker from '../../Tracker';
import { EnergyPill } from '../../DpeBadge';

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
  const hasClasses = Boolean(item.dpe_class || item.ges_class);
  if (energyCost || hasClasses) budget.push(['Énergie', energyCost]);
  if (Number(item.charges_yearly) > 0) budget.push(['Charges de copropriété', eur0(Number(item.charges_yearly))]);
  if (Number(item.property_tax) > 0) budget.push(['Taxe foncière', eur0(Number(item.property_tax))]);
  const energyMid = eMin > 0 && eMax > 0 ? (eMin + eMax) / 2 : eMax || eMin;
  const monthly = [energyMid > 0, Number(item.charges_yearly) > 0, Number(item.property_tax) > 0].filter(Boolean).length > 1
    ? Math.round((energyMid + (Number(item.charges_yearly) || 0) + (Number(item.property_tax) || 0)) / 12 / 10) * 10
    : 0;
  // Honoraires : la phrase de l'annonce si elle le dit, sinon le réglage de l'agence (back-office)
  const { data: agencyPayer } = await getSupabase().rpc('agency_fees_payer', { p_source: item.source_agency });
  const feesPayer: 'vendeur' | 'acquereur' | null = /acqu[ée]reur/i.test(item.fees_text || '')
    ? 'acquereur'
    : /vendeur/i.test(item.fees_text || '')
      ? 'vendeur'
      : agencyPayer === 'vendeur' || agencyPayer === 'acquereur'
        ? agencyPayer
        : null;
  const feesLabel = feesPayer === 'vendeur'
    ? 'Honoraires à la charge du vendeur'
    : feesPayer === 'acquereur'
      ? 'Honoraires à la charge de l’acquéreur, inclus dans le prix'
      : 'Honoraires d’agence inclus dans le prix';
  // Frais de notaire : estimation courante pour un bien ancien, environ 8 % du prix
  const NOTARY_RATE = 0.08;
  const priceNum = Number(item.price) || 0;
  const notary = Math.round((priceNum * NOTARY_RATE) / 100) * 100;
  const hasCopro = Boolean(item.copro_lots || Number(item.charges_yearly) > 0 || item.copro_procedure);

  const rawImages: string[] = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
  // Les plans ne figurent pas parmi les photos : ils se téléchargent à part, contre des coordonnées
  const plans: string[] = Array.isArray(item.plan_images) ? item.plan_images.filter(Boolean) : [];
  const allImages: string[] = Array.from(new Set([item.cover_image_url, ...rawImages].filter(Boolean)))
    .filter((u) => !plans.includes(u as string))
    .slice(0, 30) as string[];
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

            {priceNum > 0 && (
              <section className="mt-10">
                <h2 className="font-serif text-2xl text-stone-900">Le prix en détail</h2>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F4E7B5] text-stone-900 text-sm pl-2 pr-4 py-1.5">
                  <span className="h-5 w-5 flex-none rounded-full bg-stone-900 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                  {feesLabel}
                </p>
                <div className={`mt-5 grid gap-x-12 gap-y-8 ${hasCopro ? 'md:grid-cols-2' : ''}`}>
                  <div>
                    <dl className="border-t border-stone-200 divide-y divide-stone-200 text-stone-700">
                      <div className="flex items-baseline justify-between gap-4 py-3">
                        <dt>Prix du bien</dt>
                        <dd className="font-serif text-lg text-stone-900 whitespace-nowrap">{eur0(priceNum)}</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 py-3">
                        <dt>Frais de notaire estimés <span className="text-stone-400 whitespace-nowrap">(≈ 8 %)</span></dt>
                        <dd className="font-serif text-lg text-stone-900 whitespace-nowrap">{eur0(notary)}</dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 py-3 border-b border-stone-200">
                        <dt className="text-stone-900">Montant estimé du projet</dt>
                        <dd className="font-serif text-2xl text-stone-900 whitespace-nowrap">{eur0(priceNum + notary)}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-xs text-stone-400 leading-relaxed">
                      Estimation indicative pour un bien ancien. Le montant exact des frais est calculé par le notaire.
                    </p>
                    <Link
                      href={`/financement?prix=${Math.round(priceNum)}`}
                      className="mt-3 inline-block text-sm text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900"
                    >
                      Estimer ma mensualité
                    </Link>
                  </div>
                  {hasCopro && (
                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest text-stone-400">La copropriété</h3>
                      <ul className="mt-3 space-y-4">
                        {item.copro_lots ? (
                          <li className="flex items-start gap-3">
                            <Building2 className="mt-0.5 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} aria-hidden="true" />
                            <span>
                              <span className="block text-sm text-stone-500">Nombre de lots</span>
                              <span className="block font-serif text-lg leading-snug text-stone-900">{item.copro_lots}</span>
                            </span>
                          </li>
                        ) : null}
                        {Number(item.charges_yearly) > 0 ? (
                          <li className="flex items-start gap-3">
                            <Coins className="mt-0.5 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} aria-hidden="true" />
                            <span>
                              <span className="block text-sm text-stone-500">Charges de copropriété</span>
                              <span className="block font-serif text-lg leading-snug text-stone-900">{eur0(Number(item.charges_yearly))} par an</span>
                            </span>
                          </li>
                        ) : null}
                        {item.copro_procedure ? (
                          <li className="flex items-start gap-3">
                            <Gavel className="mt-0.5 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} aria-hidden="true" />
                            <span>
                              <span className="block text-sm text-stone-500">Procédures</span>
                              <span className="block font-serif text-lg leading-snug text-stone-900">{item.copro_procedure}</span>
                            </span>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {budget.length > 0 && (
              <section className="mt-10">
                <h2 className="font-serif text-2xl text-stone-900">Le budget au quotidien</h2>
                <dl className={`mt-5 grid grid-cols-1 ${budget.length === 3 ? 'sm:grid-cols-3' : budget.length === 2 ? 'sm:grid-cols-2' : ''} border-y border-stone-200 divide-y sm:divide-y-0 sm:divide-x divide-stone-200`}>
                  {budget.map(([label, value]) => (
                    <div key={label} className="py-5 sm:px-6 sm:first:pl-0">
                      <dt className="text-[10px] uppercase tracking-widest text-stone-400">{label}</dt>
                      {value && <dd className="mt-1 font-serif text-2xl leading-tight text-stone-900">{value}</dd>}
                      {value && <dd className="text-sm text-stone-500">par an</dd>}
                      {label === 'Énergie' && hasClasses && (
                        <dd className={`${value ? 'mt-3' : 'mt-2'} flex flex-wrap gap-x-4 gap-y-2`}>
                          <EnergyPill kind="dpe" value={item.dpe_class} />
                          <EnergyPill kind="ges" value={item.ges_class} />
                        </dd>
                      )}
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

            <p className="mt-10 text-xs text-stone-400 leading-relaxed">
              {item.fees_text ? <span className="block">{item.fees_text}</span> : null}
              Les informations sur les risques auxquels ce bien est exposé sont disponibles sur le site Géorisques :{' '}
              <a href="https://www.georisques.gouv.fr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-stone-900">
                www.georisques.gouv.fr
              </a>
              .
              <span className="block mt-2">
                Annonce {item.source_agency}{item.source_id ? ` · Réf. ${item.source_id}` : ''}
              </span>
            </p>
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
                    <PlanDownload listingId={item.id} plans={plans} title={item.title} />
          <div id="contact" className="scroll-mt-20">
                              <ContactForm listingId={item.id} agency={item.source_agency} phone={item.contact_phone} contactName={item.contact_name} title={item.title} reference={item.source_id} city={item.city} price={Number(item.price)} hasPlan={plans.length > 0} />
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

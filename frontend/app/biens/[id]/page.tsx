import SiteHeader from '../../SiteHeader';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BedDouble, Home, Layers, LayoutGrid, MapPin, Ruler, ChevronRight, Bath, Zap, Leaf, Calculator } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { SITE_URL } from '../../../lib/site';
import { slugify, cityHub } from '../../../lib/catalog';
import ContactForm from './ContactForm';
import ReportButton from './ReportButton';
import PhotoMosaic from './PhotoMosaic';
import Description from './Description';
import PlanDownload from './PlanDownload';
import { FavoriteAlertToast } from './AlertInvite';
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

// Les trois biens proposés sous l'annonce : d'abord ceux du même arrondissement ou de la même commune,
// puis les plus proches. L'ordre ne dépend que de la distance (à défaut, de la date de mise en ligne).
type Near = { id: string; title: string; price: number; city: string | null; surface_sqm: number | null; cover_image_url: string | null; latitude: number | null; longitude: number | null };

function km(a: { latitude: number | null; longitude: number | null }, b: { latitude: number | null; longitude: number | null }): number | null {
  if (a.latitude == null || a.longitude == null || b.latitude == null || b.longitude == null) return null;
  const rad = Math.PI / 180;
  const dLat = (Number(b.latitude) - Number(a.latitude)) * rad;
  const dLon = (Number(b.longitude) - Number(a.longitude)) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(Number(a.latitude) * rad) * Math.cos(Number(b.latitude) * rad) * Math.sin(dLon / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

async function getRelated(item: { id: string; city: string | null; latitude?: number | null; longitude?: number | null }): Promise<{ list: Near[]; sameCity: boolean }> {
  if (!item.city) return { list: [], sameCity: false };
  const { data } = await getSupabase()
    .from('listings')
    .select('id,title,price,city,surface_sqm,cover_image_url,latitude,longitude')
    .eq('is_active', true)
    .neq('id', item.id)
    .order('first_seen_at', { ascending: false })
    .limit(300);
  const here = { latitude: item.latitude ?? null, longitude: item.longitude ?? null };
  const city = item.city.trim().toLowerCase();
  const hub = cityHub(item.city);
  const rows = ((data || []) as Near[]).map((r, i) => {
    const same = (r.city || '').trim().toLowerCase() === city;
    const d = km(here, r);
    // rang : même arrondissement ou commune, puis le reste ; sans coordonnées, la même ville passe avant les autres
    const fallback = r.city && cityHub(r.city) === hub ? 50 : 5000;
    return { r, same, d: d ?? fallback, i };
  });
  rows.sort((x, y) => Number(y.same) - Number(x.same) || x.d - y.d || x.i - y.i);
  // on ne propose pas un bien à l'autre bout du pays
  const kept = rows.filter((x) => x.same || x.d <= 60).slice(0, 3);
  return { list: kept.map((x) => x.r), sameCity: kept.length > 0 && kept.every((x) => x.same) };
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
  const image = item.cover_image_url || `${SITE_URL}/opengraph-image.png`;
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
  // Pas de case « Localisation » : le quartier et la ville sont déjà affichés sous le titre.
  // Dépenses d'énergie estimées par an (fourchette du diagnostic), mises en avant quand l'annonce les donne
  const eMin = Number(item.energy_cost_min) || 0;
  const eMax = Number(item.energy_cost_max) || 0;
  const eur0 = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €';
  const energyCost = eMin > 0 && eMax > 0 && eMax !== eMin ? `${eur0(eMin)} à ${eur0(eMax)}` : eMin > 0 || eMax > 0 ? eur0(eMax || eMin) : '';
  // Budget annuel : énergie, charges, taxe foncière, et leur équivalent mensuel
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
    ? 'Honoraires d’agence inclus, à la charge du vendeur'
    : feesPayer === 'acquereur'
      ? 'Honoraires d’agence inclus, à la charge de l’acquéreur'
      : 'Honoraires d’agence inclus';
  // Frais de notaire : estimation courante pour un bien ancien, environ 8 % du prix
  const NOTARY_RATE = 0.08;
  const priceNum = Number(item.price) || 0;
  // Chiffres arrondis au millier : c'est un ordre de grandeur, pas un décompte
  const notary = Math.round((priceNum * NOTARY_RATE) / 1000) * 1000;
  const projectTotal = Math.round((priceNum + notary) / 1000) * 1000;
  // Postes du budget annuel, du plus lourd au plus léger (pour la barre de répartition)
  // Montant ramené au m² : le seul moyen de comparer deux biens de tailles différentes
  const sqm = Number(item.surface_sqm) || 0;
  const perSqm = (amount: number) => (sqm > 0 && amount > 0 ? `soit ${Math.round(amount / sqm)} € par m²` : '');
  // Charges situées par rapport au repère parisien (FNAIM du Grand Paris, comptes 2023 : 43 € par m² de surface assurée).
  // Notre calcul divise par la surface du logement, plus petite : d'où trois niveaux volontairement larges, et Paris seulement.
  const chargesSqm = sqm > 0 ? (Number(item.charges_yearly) || 0) / sqm : 0;
  const chargesLevel = /^75/.test(String(item.postal_code || '')) && chargesSqm > 0
    ? chargesSqm < 35 ? 'Charges plutôt basses pour Paris' : chargesSqm <= 60 ? 'Charges dans la moyenne parisienne' : 'Charges plutôt élevées pour Paris'
    : '';
  const chargesHigh = chargesSqm > 60;
  const costParts = [
    { label: 'Charges de copropriété', amount: Number(item.charges_yearly) || 0, value: eur0(Number(item.charges_yearly) || 0), sub: perSqm(Number(item.charges_yearly) || 0) },
    { label: 'Taxe foncière', amount: Number(item.property_tax) || 0, value: eur0(Number(item.property_tax) || 0), sub: perSqm(Number(item.property_tax) || 0) },
    { label: 'Énergie', amount: energyMid || 0, value: energyCost, sub: perSqm(energyMid || 0) },
  ]
    .filter((c) => c.amount > 0)
    .sort((x, y) => y.amount - x.amount);
  const costTotal = costParts.reduce((sum, c) => sum + c.amount, 0) || 1;
  const COST_BAR = ['bg-stone-900', 'bg-stone-400', 'bg-[#F4E7B5] border border-stone-900'];
  const COST_DOT = ['bg-stone-900', 'bg-stone-400', 'bg-[#F4E7B5] border border-stone-900'];
  const hasCopro = Boolean(item.copro_lots || Number(item.charges_yearly) > 0 || item.copro_procedure);

  const rawImages: string[] = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
  // Les plans ne figurent pas parmi les photos : ils se téléchargent à part, contre des coordonnées
  const plans: string[] = Array.isArray(item.plan_images) ? item.plan_images.filter(Boolean) : [];
  const allImages: string[] = Array.from(new Set([item.cover_image_url, ...rawImages].filter(Boolean)))
    .filter((u) => !plans.includes(u as string))
    .slice(0, 30) as string[];
    const { list: related, sameCity } = await getRelated(item);
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

  const agencyBlock = (
          <div className="border-t border-stone-200 border-b">
            <Link href={`/agence/${slugify(item.source_agency)}`} className="group flex items-center gap-4 py-4">
              <span className="flex-1 min-w-0">
                <span className="block text-xs uppercase tracking-widest text-stone-500">Proposé par</span>
                <span className="block mt-1 font-serif text-lg text-stone-900 truncate">{item.source_agency}</span>
                <span className="block text-sm text-stone-500">
                  {agencyCount > 1 ? `Voir ses ${agencyCount} biens sur Loftissime` : 'Voir sa page sur Loftissime'}
                </span>
              </span>
              <ChevronRight className="w-5 h-5 flex-none text-stone-400 group-hover:text-stone-900 transition" />
            </Link>
          </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans pb-20 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumb) }} />
      <SiteHeader alert={false} />

      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <nav aria-label="Fil d'Ariane" className="text-xs text-stone-500">
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
          city={item.city || undefined}
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
            {plans.length > 0 && (
              <div className="lg:hidden mt-1">
                <PlanDownload listingId={item.id} plans={plans} title={item.title} variant="link" />
              </div>
            )}

            {facts.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-6 border-y border-stone-200 py-6">
                {facts.map(([label, value, Icon]) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="mt-1 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} aria-hidden="true" />
                    <div className="min-w-0">
                      <dt className="text-xs uppercase tracking-widest text-stone-500">{label}</dt>
                      <dd className="mt-0.5 font-serif text-xl leading-snug text-stone-900">{value}</dd>
                    </div>
                  </div>
                ))}
                {item.dpe_class && (
                  <div className="flex items-start gap-3">
                    <Zap className="mt-1 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} aria-hidden="true" />
                    <div className="min-w-0">
                      <dt className="text-xs uppercase tracking-widest text-stone-500">Énergie (DPE)</dt>
                      <dd className="mt-1.5"><EnergyPill kind="dpe" value={item.dpe_class} bare /></dd>
                    </div>
                  </div>
                )}
                {item.ges_class && (
                  <div className="flex items-start gap-3">
                    <Leaf className="mt-1 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} aria-hidden="true" />
                    <div className="min-w-0">
                      <dt className="text-xs uppercase tracking-widest text-stone-500">Climat (GES)</dt>
                      <dd className="mt-1.5"><EnergyPill kind="ges" value={item.ges_class} bare /></dd>
                    </div>
                  </div>
                )}
              </dl>
            )}

            <Description text={item.short_description || ''} />

            {item.features?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs uppercase tracking-widest text-stone-500">Caractéristiques</h2>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-700">
                  {item.features.map((f: string, idx: number) => (
                    <li key={idx}>· {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mobile : contact juste après la présentation, avant le prix et la copropriété */}
            <div id="contact" className="lg:hidden mt-10 space-y-4 scroll-mt-20">
              <ContactForm listingId={item.id} agency={item.source_agency} phone={item.contact_phone} contactName={item.contact_name} title={item.title} reference={item.source_id} city={item.city} price={Number(item.price)} hasPlan={plans.length > 0} />
            </div>

            {priceNum > 0 && (
              <section id="prix" className="mt-10 rounded-[14px] border border-stone-300 bg-white p-6 scroll-mt-24">
                <h2 className="font-serif text-2xl text-stone-900">Le prix en détail</h2>

                <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-serif text-4xl md:text-5xl leading-none text-stone-900 whitespace-nowrap">{eur0(projectTotal)}</span>
                  <span className="text-sm text-stone-500">montant estimé du projet, hors travaux</span>
                </p>

                {/* Part du prix et des frais de notaire dans le projet */}
                <div className="mt-5 flex h-2.5 w-full overflow-hidden" aria-hidden="true">
                  <span className="bg-stone-900" style={{ width: `${(priceNum / (priceNum + notary)) * 100}%` }} />
                  <span className="bg-[#F4E7B5] border border-stone-900" style={{ width: `${(notary / (priceNum + notary)) * 100}%` }} />
                </div>

                <dl className="mt-2 divide-y divide-stone-200 text-stone-700">
                  <div className="flex items-start justify-between gap-4 py-3.5">
                    <dt className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2.5 w-2.5 flex-none bg-stone-900" aria-hidden="true" />
                      <span>
                        Prix du bien
                        <span className="block text-sm text-stone-500">{feesLabel}</span>
                      </span>
                    </dt>
                    <dd className="font-serif text-lg text-stone-900 whitespace-nowrap">{eur0(priceNum)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-3.5">
                    <dt className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 flex-none bg-[#F4E7B5] border border-stone-900" aria-hidden="true" />
                      <span>Frais de notaire estimés <span className="text-stone-400 whitespace-nowrap">(≈ 8 %)</span></span>
                    </dt>
                    <dd className="font-serif text-lg text-stone-900 whitespace-nowrap">{eur0(notary)}</dd>
                  </div>
                </dl>

                <div className="mt-1 pt-3 border-t border-stone-200">
                  <Link
                    href={`/financement?prix=${Math.round(priceNum)}&bien=${item.id}`}
                    className="inline-flex items-center gap-2 min-h-[2.75rem] text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition"
                  >
                    <Calculator className="w-4 h-4" />
                    Estimer ma mensualité
                  </Link>
                </div>

                <p className="mt-5 text-sm text-stone-600 leading-relaxed">
                  Estimation indicative pour un bien ancien. Le montant exact des frais est calculé par le notaire.
                </p>
              </section>
            )}

            {(costParts.length > 0 || hasCopro) && (
              <section className={`${priceNum > 0 ? 'mt-4' : 'mt-10'} rounded-[14px] border border-stone-300 bg-white p-6`}>
                <h2 className="font-serif text-2xl text-stone-900">Vivre ici, au quotidien</h2>

                {monthly > 0 && (
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-serif text-4xl md:text-5xl leading-none text-stone-900 whitespace-nowrap">
                      <span className="font-sans text-3xl text-stone-400" aria-label="environ">≈</span> {eur0(monthly)}
                    </span>
                    <span className="text-sm text-stone-500">par mois, hors crédit</span>
                  </p>
                )}

                {/* Part de chaque poste dans le budget annuel */}
                {costParts.length > 1 && (
                  <div className="mt-5 flex h-2.5 w-full overflow-hidden" aria-hidden="true">
                    {costParts.map((c, i) => (
                      <span key={c.label} className={COST_BAR[i]} style={{ width: `${(c.amount / costTotal) * 100}%` }} />
                    ))}
                  </div>
                )}

                {costParts.length > 0 && (
                  <dl className={`divide-y divide-stone-200 text-stone-700 ${costParts.length > 1 ? 'mt-2' : 'mt-4 border-t border-stone-200'}`}>
                    {costParts.map((c, i) => (
                      <div key={c.label} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3.5">
                        <dt className="flex items-center gap-2.5">
                          {costParts.length > 1 && <span className={`h-2.5 w-2.5 flex-none ${COST_DOT[i]}`} aria-hidden="true" />}
                          {c.label}
                        </dt>
                        <dd className="text-right font-serif text-lg text-stone-900 whitespace-nowrap">
                          {c.value} <span className="font-sans text-sm text-stone-500">par an</span>
                          {c.sub && <span className="block font-sans text-sm text-stone-500">{c.sub}</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {(item.copro_lots || item.copro_procedure || chargesLevel) && (
                  <div className={costParts.length > 0 ? 'mt-1 pt-5 border-t border-stone-200' : 'mt-4'}>
                    <p className="text-xs uppercase tracking-widest text-stone-500">La copropriété</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.copro_lots ? (
                        <span className="inline-flex items-center h-9 px-4 rounded-full bg-[#F4E7B5] text-sm text-stone-900">
                          {item.copro_lots} {Number(item.copro_lots) > 1 ? 'lots' : 'lot'}
                        </span>
                      ) : null}
                      {chargesLevel ? (
                        <span className="inline-flex items-center min-h-[2.25rem] px-4 py-1.5 rounded-full bg-[#F4E7B5] text-sm text-stone-900">
                          {chargesLevel}
                        </span>
                      ) : null}
                      {item.copro_procedure ? (
                        <span className="inline-flex items-center min-h-[2.25rem] px-4 py-1.5 rounded-full bg-[#F4E7B5] text-sm text-stone-900">
                          {/^aucune/i.test(String(item.copro_procedure)) ? 'Aucune procédure en cours' : item.copro_procedure}
                        </span>
                      ) : null}
                    </div>
                  </div>
                )}

                {chargesLevel && (
                  <p className="mt-5 text-xs text-stone-500 leading-relaxed">
                    Charges : à Paris, elles sont en moyenne de 43 € par m² et par an (FNAIM du Grand Paris, comptes 2023).
                    {chargesHigh ? ' Des charges élevées sont souvent le signe d’un gardien, d’un ascenseur ou d’un chauffage collectif compris : à demander à l’agence.' : ''}
                  </p>
                )}
                {energyCost && (
                  <p className={`${chargesLevel ? 'mt-2' : 'mt-5'} text-sm text-stone-600 leading-relaxed`}>
                    Énergie : montant moyen estimé pour un usage standard, abonnement compris{item.energy_cost_ref ? `, sur la base des prix des années ${item.energy_cost_ref}` : ''}.
                  </p>
                )}
              </section>
            )}

            <div className="hidden lg:block mt-10 space-y-4">
              {agencyBlock}
              <ReportButton listingId={item.id} />
            </div>

            <p className="mt-10 text-sm text-stone-600 leading-relaxed">
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

        <aside className="min-w-0">
          <div className="space-y-4 lg:[@media(min-height:760px)]:sticky lg:[@media(min-height:760px)]:top-20">
          <div className="hidden lg:block rounded-[14px] border border-stone-200 bg-white p-6">
            <p className="font-serif text-5xl leading-none tracking-tight text-stone-900 whitespace-nowrap">
              {new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(priceNum)}
              <span className="ml-2 text-3xl text-stone-400">€</span>
            </p>
          </div>
          {/* Sur mobile, le contact est placé juste après la présentation (voir plus haut) */}
          <div className="hidden lg:block space-y-4">
            <PlanDownload listingId={item.id} plans={plans} title={item.title} />
            <ContactForm listingId={item.id} agency={item.source_agency} phone={item.contact_phone} contactName={item.contact_name} title={item.title} reference={item.source_id} city={item.city} price={Number(item.price)} hasPlan={plans.length > 0} />
          </div>
          <Tracker listingId={item.id} />
          <div className="lg:hidden space-y-4">
            {agencyBlock}
            <ReportButton listingId={item.id} />
          </div>
          </div>
        </aside>
      </main>

            <StickyContact />
      <FavoriteAlertToast city={item.city} price={Number(item.price)} />

      {related.length > 0 && hubName && hubUrl && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
                   <h2 className="font-serif text-2xl text-stone-900">{sameCity ? `Autres biens à découvrir à ${item.city}` : 'Autres biens à proximité'}</h2>
          {/* Sur téléphone : une vignette, le titre et le prix sur une ligne. À partir de la tablette : trois cartes. */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {related.map((r) => (
              <Link key={r.id} href={`/biens/${r.id}`} className="group flex items-center gap-4 sm:block sm:border sm:border-stone-300 sm:hover:shadow-lg sm:transition">
                <div className="w-28 flex-none aspect-[4/3] bg-stone-100 overflow-hidden sm:w-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.cover_image_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="min-w-0 sm:p-4">
                  <p className="text-xs uppercase tracking-widest text-stone-500">{r.city}{r.surface_sqm ? ` · ${r.surface_sqm} m²` : ''}</p>
                  <p className="mt-1 font-serif text-stone-900 leading-snug">{r.title}</p>
                  <p className="mt-1 font-serif text-lg text-stone-900 sm:mt-2">{fmt(Number(r.price))}</p>
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

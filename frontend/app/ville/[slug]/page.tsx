import { notFound } from 'next/navigation';
import { getSupabase } from '../../../lib/supabase';
import { slugify, cityHub } from '../../../lib/catalog';
import CollectionPage from '../../CollectionPage';

export const dynamic = 'force-dynamic';

// Page "hub" (ex. Paris = tous les arrondissements) ou page d'une ville / d'un arrondissement
async function getCityListings(slug: string) {
  const { data } = await getSupabase()
    .from('listings')
    .select('id,title,short_description,price,surface_sqm,city,source_agency,atypic_category,cover_image_url,curation_score,first_seen_at')
    .eq('is_active', true)
    .order('curation_score', { ascending: false, nullsFirst: false })
    .order('first_seen_at', { ascending: false });
  const all = (data || []).filter((i) => i.city);

  const hubItems = all.filter((i) => slugify(cityHub(i.city)) === slug);
  if (hubItems.length > 0) {
    return { items: hubItems, cityName: cityHub(hubItems[0].city), canonicalSlug: slug };
  }
  // Page d'un arrondissement : conservée, mais la page "Paris" fait référence
  const exact = all.filter((i) => slugify(i.city) === slug);
  if (exact.length > 0) {
    return { items: exact, cityName: exact[0].city as string, canonicalSlug: slugify(cityHub(exact[0].city)) };
  }
  return { items: [], cityName: undefined, canonicalSlug: slug };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { cityName, canonicalSlug } = await getCityListings(params.slug);
  if (!cityName) return { title: 'Ville introuvable · SINGULIER', robots: { index: false } };
  const title = `Biens atypiques à vendre à ${cityName}`;
  const description = `Lofts, ateliers, rooftops et biens de caractère à vendre à ${cityName}, sélectionnés parmi des annonces d'agences.`;
  return {
    title: `${title} · SINGULIER`,
    description,
    alternates: { canonical: `/ville/${canonicalSlug}` },
    openGraph: { type: 'website', url: `/ville/${canonicalSlug}`, title, description, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  };
}

export default async function CityPage({ params }: { params: { slug: string } }) {
  const { items, cityName } = await getCityListings(params.slug);
  if (!cityName) notFound();
  return (
    <CollectionPage
      title={`Biens atypiques à vendre à ${cityName}`}
      intro={`Une sélection de lieux singuliers à ${cityName}, issus d'annonces d'agences.`}
      items={items}
    />
  );
}

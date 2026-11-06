import { notFound } from 'next/navigation';
import { getSupabase } from '../../../lib/supabase';
import { slugify } from '../../../lib/catalog';
import CollectionPage from '../../CollectionPage';

export const dynamic = 'force-dynamic';

async function getCityListings(slug: string) {
  const { data } = await getSupabase()
    .from('listings')
    .select('id,title,short_description,price,surface_sqm,city,source_agency,atypic_category,cover_image_url,curation_score,first_seen_at')
    .eq('is_active', true)
    .order('curation_score', { ascending: false, nullsFirst: false })
    .order('first_seen_at', { ascending: false });
  const items = (data || []).filter((i) => i.city && slugify(i.city) === slug);
  return { items, cityName: items[0]?.city as string | undefined };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { cityName } = await getCityListings(params.slug);
  if (!cityName) return { title: 'Ville introuvable · SINGULIER' };
  return {
    title: `Biens atypiques à vendre à ${cityName} · SINGULIER`,
    description: `Lofts, ateliers, rooftops et biens de caractère à vendre à ${cityName}, sélectionnés parmi des annonces d'agences.`,
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

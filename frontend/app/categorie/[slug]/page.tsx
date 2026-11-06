import { notFound } from 'next/navigation';
import { getSupabase } from '../../../lib/supabase';
import { CATEGORY_LIST, slugify } from '../../../lib/catalog';
import CollectionPage from '../../CollectionPage';

export const dynamic = 'force-dynamic';

function findCategory(slug: string) {
  return CATEGORY_LIST.find((c) => slugify(c) === slug) || null;
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = findCategory(params.slug);
  if (!cat) return { title: 'Catégorie introuvable · SINGULIER' };
  return {
    title: `${cat} à vendre · SINGULIER`,
    description: `Notre sélection de biens singuliers dans la catégorie « ${cat} », issus d'annonces d'agences.`,
    alternates: { canonical: `/categorie/${params.slug}` },
    openGraph: {
      type: 'website',
      url: `/categorie/${params.slug}`,
      title: `${cat} à vendre`,
      description: `Notre sélection de biens singuliers : ${cat.toLowerCase()}.`,
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = findCategory(params.slug);
  if (!cat) notFound();

  const { data } = await getSupabase()
    .from('listings')
    .select('id,title,short_description,price,surface_sqm,city,source_agency,atypic_category,cover_image_url,curation_score,first_seen_at')
    .eq('is_active', true)
    .eq('atypic_category', cat)
    .order('curation_score', { ascending: false, nullsFirst: false })
    .order('first_seen_at', { ascending: false });

  return (
    <CollectionPage
      title={`${cat} à vendre`}
      intro={`Notre sélection de biens singuliers : ${cat.toLowerCase()}.`}
      items={data || []}
    />
  );
}

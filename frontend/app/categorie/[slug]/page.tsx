import { notFound } from 'next/navigation';
import { getSupabase } from '../../../lib/supabase';
import { CATEGORY_LIST, slugify } from '../../../lib/catalog';
import CollectionPage from '../../CollectionPage';

export const dynamic = 'force-dynamic';

function findCategory(slug: string) {
  return CATEGORY_LIST.find((c) => slugify(c) === slug) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cat = findCategory(params.slug);
  if (!cat) return { title: 'Catégorie introuvable · Loftissime', robots: { index: false } };
  // Une catégorie vide n'est pas indexée (page sans contenu)
  const { count } = await getSupabase()
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('atypic_category', cat);
  const title = `${cat} à vendre`;
  const description = `Notre sélection de biens singuliers dans la catégorie « ${cat} », issus d'annonces d'agences.`;
  return {
    title: `${title} · Loftissime`,
    description,
    alternates: { canonical: `/categorie/${params.slug}` },
    robots: count ? undefined : { index: false, follow: true },
    openGraph: { type: 'website', url: `/categorie/${params.slug}`, title, description, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
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

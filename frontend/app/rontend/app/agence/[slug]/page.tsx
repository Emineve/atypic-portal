import { notFound } from 'next/navigation';
import { getSupabase } from '../../../lib/supabase';
import { slugify } from '../../../lib/catalog';
import CollectionPage from '../../CollectionPage';

export const dynamic = 'force-dynamic';

async function getAgencyListings(slug: string) {
  const { data } = await getSupabase()
    .from('listings')
    .select('id,title,short_description,price,surface_sqm,city,source_agency,atypic_category,cover_image_url,curation_score,first_seen_at')
    .eq('is_active', true)
    .order('curation_score', { ascending: false, nullsFirst: false })
    .order('first_seen_at', { ascending: false });
  const items = (data || []).filter((i) => i.source_agency && slugify(i.source_agency) === slug);
  return { items, agency: items[0]?.source_agency as string | undefined };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { agency } = await getAgencyListings(params.slug);
  if (!agency) return { title: 'Agence introuvable · SINGULIER', robots: { index: false } };
  const title = `${agency} · biens atypiques à vendre`;
  const description = `Les lieux singuliers proposés par ${agency} sur SINGULIER.`;
  return {
    title: `${title} · SINGULIER`,
    description,
    alternates: { canonical: `/agence/${params.slug}` },
    openGraph: { type: 'website', url: `/agence/${params.slug}`, title, description, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  };
}

export default async function AgencyPage({ params }: { params: { slug: string } }) {
  const { items, agency } = await getAgencyListings(params.slug);
  if (!agency) notFound();
  return (
    <CollectionPage
      title={agency}
      intro={`Les lieux singuliers proposés par ${agency}.`}
      items={items}
    />
  );
}

import { getSupabase } from '../lib/supabase';
import { CATEGORY_LIST, slugify, cityHub } from '../lib/catalog';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const { data } = await getSupabase()
    .from('listings')
    .select('id,city')
    .eq('is_active', true);
  const rows = data || [];
  // Une seule entrée par ville (les arrondissements sont regroupés sous "Paris")
  const cities = Array.from(new Set(rows.map((r) => r.city).filter(Boolean).map((c) => cityHub(c as string))));
  return [
    { url: `${SITE_URL}/` },
    ...CATEGORY_LIST.map((c) => ({ url: `${SITE_URL}/categorie/${slugify(c)}` })),
    ...cities.map((c) => ({ url: `${SITE_URL}/ville/${slugify(c)}` })),
    ...rows.map((r) => ({ url: `${SITE_URL}/biens/${r.id}` })),
  ];
}

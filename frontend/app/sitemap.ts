import { getSupabase } from '../lib/supabase';
import { CATEGORY_LIST, slugify, cityHub } from '../lib/catalog';
import { SITE_URL } from '../lib/site';

export const dynamic = 'force-dynamic';

// Plan du site transmis aux moteurs de recherche
export default async function sitemap() {
  const { data } = await getSupabase()
    .from('listings')
    .select('id,city,atypic_category,first_seen_at')
    .eq('is_active', true);
  const rows = data || [];
  // Une seule entrée par ville (les arrondissements sont regroupés sous "Paris")
  const cities = Array.from(new Set(rows.map((r) => r.city).filter(Boolean).map((c) => cityHub(c as string))));
  const usedCategories = new Set(rows.map((r) => r.atypic_category));
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/qui-sommes-nous` },
    { url: `${SITE_URL}/pro` },
    { url: `${SITE_URL}/charte` },
    { url: `${SITE_URL}/inspiration` },
    ...CATEGORY_LIST.filter((c) => usedCategories.has(c)).map((c) => ({ url: `${SITE_URL}/categorie/${slugify(c)}` })),
    ...cities.map((c) => ({ url: `${SITE_URL}/ville/${slugify(c)}` })),
    ...rows.map((r) => ({
      url: `${SITE_URL}/biens/${r.id}`,
      ...(r.first_seen_at ? { lastModified: new Date(r.first_seen_at as string) } : {}),
    })),
  ];
}

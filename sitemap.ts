import { getSupabase } from '../lib/supabase';
import { CATEGORY_LIST, slugify } from '../lib/catalog';

export const dynamic = 'force-dynamic';

const BASE = 'https://atypic-portal.vercel.app';

export default async function sitemap() {
  const { data } = await getSupabase()
    .from('listings')
    .select('id,city')
    .eq('is_active', true);
  const rows = data || [];
  const cities = Array.from(new Set(rows.map((r) => r.city).filter(Boolean) as string[]));
  return [
    { url: `${BASE}/` },
    ...CATEGORY_LIST.map((c) => ({ url: `${BASE}/categorie/${slugify(c)}` })),
    ...cities.map((c) => ({ url: `${BASE}/ville/${slugify(c)}` })),
    ...rows.map((r) => ({ url: `${BASE}/biens/${r.id}` })),
  ];
}

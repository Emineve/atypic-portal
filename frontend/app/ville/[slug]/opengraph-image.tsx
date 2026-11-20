import { getSupabase } from '../../../lib/supabase';
import { slugify, cityHub } from '../../../lib/catalog';
import { shareImage, OG_SIZE, OG_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = 'Loftissime, curateur de biens atypiques. Biens atypiques à vendre.';
export const dynamic = 'force-dynamic';

// Même règle que la page : la ville "hub" d'abord (Paris), sinon l'arrondissement
async function cityName(slug: string): Promise<string | undefined> {
  try {
    const { data } = await getSupabase().from('listings').select('city').eq('is_active', true);
    const cities = (data || []).map((i) => i.city as string).filter(Boolean);
    const hub = cities.find((c) => slugify(cityHub(c)) === slug);
    if (hub) return cityHub(hub);
    return cities.find((c) => slugify(c) === slug);
  } catch {
    return undefined;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const name = await cityName(params.slug);
  return shareImage('Biens atypiques à vendre', name ? `à ${name}.` : '');
}

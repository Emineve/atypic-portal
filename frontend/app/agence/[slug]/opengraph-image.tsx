import { getSupabase } from '../../../lib/supabase';
import { slugify } from '../../../lib/catalog';
import { shareImage, OG_SIZE, OG_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = 'Loftissime, curateur de biens atypiques. Les biens atypiques d’une agence.';
export const dynamic = 'force-dynamic';

async function agencyName(slug: string): Promise<string | undefined> {
  try {
    const { data } = await getSupabase().from('listings').select('source_agency').eq('is_active', true);
    return (data || []).map((i) => i.source_agency as string).find((a) => a && slugify(a) === slug);
  } catch {
    return undefined;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const name = await agencyName(params.slug);
  return name ? shareImage(`${name},`, 'biens atypiques à vendre.') : shareImage('Biens atypiques', 'à vendre.');
}

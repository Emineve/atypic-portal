import { CATEGORY_LIST, slugify } from '../../../lib/catalog';
import { shareImage, OG_SIZE, OG_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = 'Loftissime, curateur de biens atypiques. Biens atypiques à vendre.';

export default function Image({ params }: { params: { slug: string } }) {
  const cat = CATEGORY_LIST.find((c) => slugify(c) === params.slug);
  return cat ? shareImage(cat, 'à vendre.') : shareImage('Biens atypiques', 'à vendre.');
}

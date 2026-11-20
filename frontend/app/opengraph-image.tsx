import { shareImage, OG_SIZE, OG_TYPE } from '../lib/og';

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = 'Loftissime, curateur de biens atypiques. Tous les biens atypiques des meilleures agences, réunis sur un seul site.';

export default function Image() {
  return shareImage('Tous les biens atypiques des meilleures agences,', 'réunis sur un seul site.');
}

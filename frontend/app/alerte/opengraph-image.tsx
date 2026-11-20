import { shareImage, OG_SIZE, OG_TYPE } from '../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = 'Loftissime, curateur de biens atypiques. Toutes vos alertes, au même endroit.';

export default function Image() {
  return shareImage('Toutes vos alertes,', 'au même endroit.');
}

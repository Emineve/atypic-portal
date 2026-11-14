import type { MetadataRoute } from 'next';
import { SITE_NAME } from '../lib/site';

// Fiche lue par Android (Chrome) quand on ajoute le site à l'écran d'accueil :
// nom du raccourci et icône « L. » blanc sur fond noir. Ouverture dans le navigateur, comme un lien.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    start_url: '/',
    display: 'browser',
    background_color: '#18181b',
    theme_color: '#18181b',
    icons: [
      { src: '/icons/loftissime-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/loftissime-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/loftissime-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/loftissime-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

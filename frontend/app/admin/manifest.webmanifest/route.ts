// Fiche lue par Android quand on ajoute le back-office à l'écran d'accueil :
// même « L. » que le site, en noir sur fond jaune, pour le distinguer du site public.
export function GET() {
  const manifest = {
    name: 'Loftissime BO',
    short_name: 'Loftissime BO',
    start_url: '/admin',
    scope: '/admin',
    display: 'browser',
    background_color: '#facc15',
    theme_color: '#facc15',
    icons: [
      { src: '/icons/bo-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/bo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/bo-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/bo-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
}

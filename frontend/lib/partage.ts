// L'aperçu d'une page quand on en partage le lien (WhatsApp, LinkedIn, messageries).
// Une page qui fixe son image doit redonner titre et description : ils ne sont pas hérités.
export function partage(title: string, description: string, image: string) {
  const images = [{ url: image, width: 1200, height: 630, alt: title }];
  return {
    openGraph: { type: 'website' as const, locale: 'fr_FR', siteName: 'Loftissime', title, description, images },
    twitter: { card: 'summary_large_image' as const, title, description, images: [image] },
  };
}

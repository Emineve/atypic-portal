import { getSupabase } from '../lib/supabase';
import { SITE_URL } from '../lib/site';
import HomeClient, { Listing } from './HomeClient';
import { articlesCount, publishedArticles } from '../lib/guide';
import GuideArt, { GuideArtKey } from './guide/GuideArt';
import { StoryCard, EyeCard } from './StoryCards';

// Page rendue côté serveur : les annonces sont dans le HTML (lisible par Google)
export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: '/' },
};

async function getListings(): Promise<Listing[]> {
  try {
    const { data } = await getSupabase().from('listings').select('*').eq('is_active', true);
    return (data as Listing[]) || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const listings = await getListings();

  // Les histoires Insolite qui se glissent dans la liste, et le dessin du haut de page : ils tournent chaque jour
  const day = Math.floor(Date.now() / 86400000);
  const insolite = publishedArticles().filter((a) => a.category === 'Insolite');
  const stories = insolite.length ? Array.from({ length: Math.min(4, insolite.length) }, (_, i) => insolite[(day + i * 7) % insolite.length]) : [];
  const HERO_ARTS: GuideArtKey[] = ['loft', 'atelier', 'verriere', 'mezzanine', 'duplex'];
  const heroArt = HERO_ARTS[day % HERO_ARTS.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: listings.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/biens/${l.id}`,
      name: l.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <HomeClient
        initialListings={listings}
        newArticles={articlesCount()}
        heroArt={<GuideArt art={heroArt} fit="meet" className="w-full h-auto" />}
        stories={stories.map((a) => <StoryCard key={a.slug} slug={a.slug} title={a.title} art={a.art} />)}
        eyeCard={<EyeCard />}
        orderSeed={Math.floor(Math.random() * 2147483647)}
      />
    </>
  );
}

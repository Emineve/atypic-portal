import { getSupabase } from '../lib/supabase';
import { SITE_URL } from '../lib/site';
import HomeClient, { Listing } from './HomeClient';

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient initialListings={listings} />
    </>
  );
}

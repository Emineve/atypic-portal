// Le site a deux visages : 'portail' (les annonces) ou 'lettre' (la lettre et État des lieux, le reste caché).
// Le choix se fait dans le back-office ; il est relu ici au plus une fois par minute.
export type SiteMode = 'portail' | 'lettre';

export async function getSiteMode(): Promise<SiteMode> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/^["']+|["']+$/g, '');
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().replace(/^["']+|["']+$/g, '');
  if (!url || !key) return 'portail';
  try {
    const r = await fetch(`${url}/rest/v1/rpc/site_mode`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: '{}',
      next: { revalidate: 60 },
    });
    if (!r.ok) return 'portail';
    return (await r.json()) === 'lettre' ? 'lettre' : 'portail';
  } catch {
    return 'portail';
  }
}

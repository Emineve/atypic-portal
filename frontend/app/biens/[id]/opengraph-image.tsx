import { ImageResponse } from 'next/og';
import { getSupabase } from '../../../lib/supabase';
import { SITE_NAME } from '../../../lib/site';

export const alt = 'Bien atypique à vendre';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Télécharge la photo et la convertit en data URI ; renvoie null si elle est inaccessible
async function toDataUri(url: string): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'user-agent': 'Mozilla/5.0' } });
    clearTimeout(timer);
    if (!res.ok) return null;
    const type = (res.headers.get('content-type') || '').split(';')[0].trim();
    if (type !== 'image/jpeg' && type !== 'image/png') return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (bytes.length > 3000000) return null;
    let bin = '';
    for (let i = 0; i < bytes.length; i += 8192) {
      bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 8192)) as number[]);
    }
    return `data:${type};base64,${btoa(bin)}`;
  } catch {
    return null;
  }
}

function euro(n: number) {
  return (
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n).replace(/[\u202f\u00a0]/g, ' ') + ' €'
  );
}

export default async function Image({ params }: { params: { id: string } }) {
  let item: {
    title: string | null;
    city: string | null;
    price: number | null;
    surface_sqm: number | null;
    cover_image_url: string | null;
    atypic_category: string | null;
  } | null = null;

  if (UUID.test(params.id)) {
    const { data } = await getSupabase()
      .from('listings')
      .select('title,city,price,surface_sqm,cover_image_url,atypic_category')
      .eq('id', params.id)
      .eq('is_active', true)
      .maybeSingle();
    item = data;
  }

  const photo = item?.cover_image_url ? await toDataUri(item.cover_image_url) : null;
  const title = (item?.title || 'Un lieu singulier').slice(0, 95);
  const meta = [item?.city, item?.surface_sqm ? `${Math.round(Number(item.surface_sqm))} m²` : null]
    .filter(Boolean)
    .join('  ·  ');
  const price = item?.price ? euro(Number(item.price)) : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#292524',
          color: '#ffffff',
        }}
      >
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            width={1200}
            height={630}
            alt=""
            style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, objectFit: 'cover' }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 380,
            display: 'flex',
            backgroundImage: 'linear-gradient(to top, rgba(20,18,17,0.92), rgba(20,18,17,0))',
          }}
        />
        {item?.atypic_category && (
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 48,
              display: 'flex',
              background: 'rgba(255,255,255,0.92)',
              color: '#1c1917',
              fontSize: 22,
              letterSpacing: 4,
              padding: '10px 20px',
              textTransform: 'uppercase',
            }}
          >
            {item.atypic_category}
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            left: 48,
            right: 48,
            bottom: 44,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', color: '#e7e5e4' }}>
            {meta}
          </div>
          <div style={{ display: 'flex', marginTop: 12, fontSize: 56, lineHeight: 1.12, fontWeight: 700 }}>{title}</div>
          <div style={{ display: 'flex', marginTop: 22, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', fontSize: 44 }}>{price}</div>
            <div style={{ display: 'flex', fontSize: 24, letterSpacing: 8, textTransform: 'uppercase', color: '#d6d3d1' }}>
              {SITE_NAME}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '../../../lib/supabase';

// Toujours exécuté à la demande : chaque clic doit être compté
export const dynamic = 'force-dynamic';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const home = new URL('/', req.url);

  if (!UUID.test(params.id)) {
    return NextResponse.redirect(home, 302);
  }

  try {
    // track_click compte le clic, l'enregistre, puis renvoie l'URL de l'annonce d'origine
    const { data, error } = await getSupabase().rpc('track_click', {
      p_listing: params.id,
      p_referrer: req.headers.get('referer'),
    });

    if (!error && typeof data === 'string' && /^https?:\/\//.test(data)) {
      return NextResponse.redirect(data, 302);
    }
  } catch (err) {
    console.error('Erreur de suivi de clic :', err);
  }

  return NextResponse.redirect(home, 302);
}

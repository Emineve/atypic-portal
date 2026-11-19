import { NextResponse } from 'next/server';
import { searchGuide } from '../../../lib/guide-search';
import { getSupabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

// Recherche dans État des lieux. Chaque question posée est enregistrée (sans aucune donnée personnelle)
// pour savoir quels articles manquent.
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const q = (params.get('q') || '').trim().slice(0, 300);
  if (q.length < 3) return NextResponse.json({ hits: [] });
  const hits = searchGuide(q);
  // Pendant la frappe, on répond sans rien enregistrer : seule la question aboutie entre dans le journal
  if (params.get('log') !== '1') return NextResponse.json({ hits });
  try {
    await getSupabase().rpc('log_guide_search', { p_query: q, p_results: hits.length });
  } catch {
    /* le journal ne doit jamais empêcher la réponse */
  }
  return NextResponse.json({ hits });
}

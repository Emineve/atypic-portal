import { NextResponse } from 'next/server';
import { getIssue } from '../../../lib/lettre';
import { SITE, biensDuNumero, liensDuNumero, type NumeroContent } from '../../../lib/numero';

// Les liens du mail passent par ici : on compte le clic par rubrique (sans rien retenir du lecteur), puis on redirige.
// La destination vient toujours du numéro lui-même, jamais de l'adresse appelée : ce n'est pas une redirection ouverte.
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const n = Number(q.get('n')) || 0;
  const k = q.get('k') || '';
  const d = n > 0 ? await getIssue(n) : null;
  if (!d) return NextResponse.redirect(`${SITE}/lettre`, 302);
  const c = d.issue.content as unknown as NumeroContent;
  const { une, autres } = biensDuNumero(c, d.items);
  const cible = k === 'site' ? `${SITE}/lettre/numero-${n}` : liensDuNumero(c, une, autres)[k];
  if (!cible) return NextResponse.redirect(`${SITE}/lettre/numero-${n}`, 302);
  try {
    const { getSupabase } = await import('../../../lib/supabase');
    await getSupabase().rpc('letter_click', { p_numero: n, p_rubrique: k });
  } catch {
    // le compteur ne doit jamais empêcher d'arriver à destination
  }
  return NextResponse.redirect(cible, 302);
}

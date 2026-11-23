import { GUIDE_ARTICLES } from './guide';
import type { LetterArticle, LetterContent } from '../app/lettre/LetterView';

// Les articles cités dans un numéro : on ne garde que ceux qui existent sur le site
export function lettreArticles(content: LetterContent | null | undefined): LetterArticle[] {
  const out: LetterArticle[] = [];
  for (const a of content?.articles || []) {
    const g = GUIDE_ARTICLES.find((x) => x.slug === a.slug);
    if (g) out.push({ slug: g.slug, title: g.title, art: g.art, rubrique: a.rubrique });
  }
  return out;
}

export type IssueRow = { numero: number; date_parution: string | null; titre: string | null; resume: string | null; paru: boolean };

// Tous les numéros, du plus récent au plus ancien (parus ou non : à la page de choisir ce qu'elle montre)
export async function getIssues(): Promise<IssueRow[]> {
  try {
    const { getSupabase } = await import('./supabase');
    const { data } = await getSupabase().rpc('letter_list_public');
    return Array.isArray(data) ? (data as IssueRow[]) : [];
  } catch {
    return [];
  }
}

export async function getIssue(numero: number): Promise<{ issue: import('../app/lettre/LetterView').LetterIssue; items: import('../app/lettre/LetterView').LetterItem[] } | null> {
  try {
    const { getSupabase } = await import('./supabase');
    const { data } = await getSupabase().rpc('letter_public', { p_numero: numero });
    const d = data as { issue: import('../app/lettre/LetterView').LetterIssue | null; items: import('../app/lettre/LetterView').LetterItem[] } | null;
    return d && d.issue ? { issue: d.issue, items: d.items || [] } : null;
  } catch {
    return null;
  }
}

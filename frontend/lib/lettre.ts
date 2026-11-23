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

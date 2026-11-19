// Recherche dans les articles d'État des lieux : l'acheteur pose sa question, on lui montre le passage qui y répond.
// Tout se passe côté serveur, sur les textes déjà publiés : aucune réponse n'est inventée.
import { publishedArticles, type GuideArticle } from './guide';
import { slugify } from './catalog';

// Ancre d'une section ou d'une question dans la page de l'article : le résultat de recherche y mène tout droit
export function passageAnchor(heading: string): string {
  return 'q-' + slugify(heading).slice(0, 60);
}

export type GuideHit = {
  slug: string;
  title: string; // titre de l'article
  category: string;
  heading: string; // question ou intertitre du passage retenu
  excerpt: string; // le passage, raccourci
  kind: 'faq' | 'section' | 'article';
  anchor: string; // vide pour un article entier
};

// Mots que l'acheteur emploie l'un pour l'autre
const SYNONYMS: string[][] = [
  ['credit', 'pret', 'emprunt', 'emprunter', 'banque', 'financement', 'financer', 'apport'],
  ['prix', 'tarif', 'cout', 'coute', 'cher'],
  ['negocier', 'negociation', 'marchander', 'rabais', 'baisser'],
  ['copropriete', 'copro', 'syndic', 'immeuble'],
  ['dpe', 'energie', 'energetique', 'passoire', 'isolation', 'chauffage'],
  ['louer', 'location', 'locataire', 'bail'],
  ['humide', 'humidite', 'infiltration', 'moisissure'],
  ['surface', 'superficie', 'metres', 'carrez', 'm2'],
  ['terrasse', 'balcon', 'jardin', 'exterieur', 'rooftop'],
  ['travaux', 'renovation', 'renover', 'refaire'],
  ['notaire', 'acte', 'compromis', 'promesse'],
  ['bateau', 'peniche'],
  ['architecte', 'signature', 'decennale'],
  ['atelier', 'artiste', 'verriere'],
  ['cheminee', 'feu', 'foyer', 'insert', 'poele', 'ramonage', 'flambee'],
  ['clim', 'climatisation', 'climatiseur', 'climatiser', 'rafraichir'],
];

const STOP = new Set(
  ('a au aux avec ce ces cet cette dans de des du elle en est et il ils je la le les leur lui ma mais me mes mon ne nos notre nous on ou où par pas pour qu que quel quelle quelles quels qui sa se ses son sur ta te tes ton tu un une vos votre vous y ça ca c d j l m n s t ' +
    'comment combien pourquoi quand quoi est-ce faut peut peut-on dois doit puis-je suis sont être etre avoir fait faire ai as ont cela si plus tout tous très tres bien bon dire savoir veux veut puis moi toi mien toute toutes annee acheter achete achat atypique atypiques immobilier logement appartement')
    .split(/\s+/),
);

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/[’'`]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Racine grossière : assez pour rapprocher « négocier », « négociation », « négocie »
function stem(w: string): string {
  if (/^\d+$/.test(w)) return w;
  let x = w.replace(/(ements|ement|ations|ation|ateurs|ateur|euses|euse|ables|able|iques|ique|ees|ee|es|er|ez|ent|s|x|e)$/, '');
  if (x.length < 3) x = w.slice(0, Math.max(3, Math.min(w.length, 4)));
  return x.slice(0, 5);
}

function tokens(s: string): string[] {
  return norm(s)
    .split(' ')
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);
}

type Passage = { article: GuideArticle; heading: string; text: string; kind: GuideHit['kind']; head: Set<string>; body: Map<string, number> };

let cache: { day: string; passages: Passage[] } | null = null;

function count(list: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const t of list) m.set(t, (m.get(t) || 0) + 1);
  return m;
}

function passages(): Passage[] {
  const day = new Date().toISOString().slice(0, 10);
  if (cache && cache.day === day) return cache.passages;
  const out: Passage[] = [];
  for (const article of publishedArticles()) {
    const add = (heading: string, text: string, kind: GuideHit['kind']) =>
      out.push({ article, heading, text, kind, head: new Set(tokens(heading)), body: count(tokens(text)) });
    add(article.title, [article.description, article.intro, ...article.takeaways].join(' '), 'article');
    for (const s of article.sections) add(s.title, [...(s.paragraphs || []), ...(s.list || [])].join(' '), 'section');
    for (const f of article.faq) add(f.q, f.a, 'faq');
  }
  cache = { day, passages: out };
  return out;
}

function shorten(text: string, max = 260): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' : '));
  return stop > 120 ? cut.slice(0, stop + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

const SYN = new Map<string, string[]>();
for (const group of SYNONYMS) {
  const stems = Array.from(new Set(group.map(stem)));
  for (const t of stems) SYN.set(t, stems);
}

export function searchGuide(query: string, limit = 3): GuideHit[] {
  const q = Array.from(new Set(tokens(query)));
  if (q.length === 0) return [];
  const all = passages();
  // Un mot présent partout pèse moins qu'un mot rare
  const df = new Map<string, number>();
  const forms = (t: string) => SYN.get(t) || [t];
  const inHeadOf = (p: Passage, t: string) => forms(t).some((f) => p.head.has(f));
  const inBodyOf = (p: Passage, t: string) => forms(t).reduce((n, f) => n + (p.body.get(f) || 0), 0);
  for (const t of q) df.set(t, all.filter((p) => inHeadOf(p, t) || inBodyOf(p, t) > 0).length);
  // Un ou deux mots : tous doivent se retrouver dans le passage. Au-delà, six sur dix.
  const need = q.length <= 2 ? q.length : Math.ceil(q.length * 0.6);

  const ranked = all
    .map((p) => {
      const titleTokens = new Set(tokens(p.article.title));
      let score = 0;
      let matched = 0;
      for (const t of q) {
        const n = df.get(t) || 0;
        if (n === 0) continue;
        const w = Math.log(1 + all.length / n) ** 2;
        const inHead = inHeadOf(p, t);
        const inBody = inBodyOf(p, t);
        if (inHead || inBody) matched++;
        score += w * ((inHead ? 3 : 0) + Math.min(inBody, 3) + (forms(t).some((f) => titleTokens.has(f)) ? 1 : 0));
      }
      if (p.kind === 'faq') score *= 1.15; // une question fréquente répond plus directement
      return { p, score, matched };
    })
    .filter((x) => x.matched > 0 && x.score > 0)
    .sort((a, b) => b.matched - a.matched || b.score - a.score);
  let scored = ranked.filter((x) => x.matched >= need);
  // Rien d'assez complet : on accepte un passage dont le titre porte au moins un mot rare de la question
  if (scored.length === 0) {
    const rare = q.filter((t) => (df.get(t) || 0) > 0 && (df.get(t) || 0) <= all.length * 0.1);
    scored = ranked.filter((x) => rare.some((t) => inHeadOf(x.p, t)));
  }

  if (scored.length === 0) return [];
  // Un seul passage par article. On préfère le passage précis (question fréquente, section) à la présentation
  // générale de l'article, s'il répond à autant de mots de la question. Les résultats trop éloignés du meilleur sont écartés.
  const best = scored[0];
  const seen = new Set<string>();
  const hits: GuideHit[] = [];
  for (const x of scored) {
    if (seen.has(x.p.article.slug)) continue;
    if (x.matched < best.matched && x.score < best.score * 0.6) continue;
    if (x.score < best.score * 0.55) continue;
    seen.add(x.p.article.slug);
    const precise = x.p.kind === 'article' && q.length > 1 ? scored.find((y) => y.p.article === x.p.article && y.p.kind !== 'article' && y.matched >= x.matched && y.score >= x.score * 0.8) : undefined;
    const p = (precise || x).p;
    hits.push({ slug: p.article.slug, title: p.article.title, category: p.article.category, heading: p.heading, excerpt: p.kind === 'faq' ? p.text : shorten(p.text, 320), kind: p.kind, anchor: p.kind === 'article' ? '' : passageAnchor(p.heading) });
    if (hits.length >= limit) break;
  }
  return hits;
}

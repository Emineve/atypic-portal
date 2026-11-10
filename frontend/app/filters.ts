// Filtres communs à la recherche du site et à la création d'alerte.
// Les clés de critères (« terrasse », « jardin »…) sont les mêmes que dans la base (fonction feature_match).

export interface Filters {
  types: string[];
  surfaceMin: string;
  surfaceMax: string;
  bedrooms: number | null; // minimum ; 5 = « 5 et plus »
  priceMin: string;
  priceMax: string;
  must: string[]; // critères indispensables
  nice: string[]; // petits plus (alerte uniquement)
}

export const EMPTY_FILTERS: Filters = {
  types: [],
  surfaceMin: '',
  surfaceMax: '',
  bedrooms: null,
  priceMin: '',
  priceMax: '',
  must: [],
  nice: [],
};

// Types de bien proposés dans la recherche et l'alerte.
// Un bien peut correspondre à plusieurs types : on le reconnaît à ses mots (titre, description, étiquettes).
// Mêmes règles que la base de données (fonction SQL type_match).
const TYPE_PATTERNS: [string, RegExp][] = [
  ['Loft', /\bloft/],
  ["Atelier d'artiste", /\batelier\b/],
  ['Penthouse', /penthouse|rooftop|toit-terrasse/],
  ['Duplex / Triplex', /duplex|triplex|souplex/],
  ['Haussmannien', /haussmann/],
  ['Hôtel particulier', /hôtel particulier/],
  ["Bien d'architecte", /architecte/],
  ['Maison & villa', /\bmaison\b|\bvilla\b/],
  ['Péniche', /péniche|\bbateau\b/],
  [
    'Lieu transformé',
    /ancien(ne)? (atelier|studio|usine|entrepôt|imprimerie|fabrique|garage|école|chai|écurie|grange|chapelle|couvent)|chapelle|église|\busine\b|entrepôt|\bgrange\b|\bmoulin\b|réhabilit|reconver|transformé/,
  ],
  ['Bien de caractère', /château|manoir|demeure|bastide|\bmas\b|longère|maison de maître|de caractère/],
];

export const TYPES = TYPE_PATTERNS.map(([label]) => label);

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

export interface FeatureGroup {
  id: string;
  title: string;
  open: boolean; // ouvert par défaut
  items: [string, string][];
}

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: 'exterieur',
    title: 'Extérieur',
    open: true,
    items: [
      ['terrasse', 'Balcon / terrasse'],
      ['jardin', 'Jardin / cour'],
      ['piscine', 'Piscine'],
    ],
  },
  {
    id: 'configuration',
    title: 'Configuration',
    open: false,
    items: [
      ['dernier-etage', 'Dernier étage'],
      ['plain-pied', 'Plain-pied'],
      ['rdc', 'Rez-de-chaussée'],
    ],
  },
  {
    id: 'vue',
    title: 'Vue',
    open: false,
    items: [
      ['vue', 'Vue dégagée'],
      ['vue-mer', 'Vue mer'],
    ],
  },
  {
    id: 'accessibilite',
    title: 'Accessibilité',
    open: false,
    items: [
      ['ascenseur', 'Ascenseur'],
      ['pmr', 'Accès PMR'],
    ],
  },
  {
    id: 'annexes',
    title: 'Annexes',
    open: false,
    items: [
      ['parking', 'Stationnement'],
      ['cave', 'Cave'],
      ['gardien', 'Gardien'],
    ],
  },
];

export function featureLabel(key: string): string {
  for (const g of FEATURE_GROUPS) {
    for (const [k, label] of g.items) if (k === key) return label;
  }
  return key;
}

// Mêmes règles que la base de données (fonction SQL feature_match)
const FEATURE_PATTERNS: Record<string, RegExp> = {
  'dernier-etage': /dernier(s)? (étage|niveau)|penthouse|rooftop|toit-terrasse/,
  'plain-pied': /plain-pied|plain pied/,
  rdc: /rez-de-chaussée|rez de chaussée|\brdc\b/,
  duplex: /duplex|triplex/,
  vue: /\b(vue|vues)\b|sans vis-à-vis|panoram/,
  'vue-mer': /vue (sur la )?mer|front de mer|bord de mer/,
  terrasse: /terrasse|balcon|rooftop/,
  jardin: /jardin|\bcour\b|patio/,
  piscine: /piscine/,
  ascenseur: /ascenseur/,
  pmr: /\bpmr\b|mobilité réduite|accessible aux personnes/,
  gardien: /gardien|concierge/,
  parking: /parking|garage|\bbox\b|stationnement/,
  cave: /\bcave\b/,
};

export interface Matchable {
  title: string;
  short_description: string;
  atypic_category: string;
  property_type?: string | null;
  atypic_tags: string[] | null;
  features?: string[] | null;
  bedrooms?: number | null;
  price: number;
  surface_sqm: number | null;
}

export function matchFeature(item: Matchable, key: string): boolean {
  const re = FEATURE_PATTERNS[key];
  if (!re) return false;
  const text = [(item.atypic_tags || []).join(' '), (item.features || []).join(' '), item.title, item.short_description]
    .join(' ')
    .toLowerCase();
  return re.test(text);
}

// Un bien correspond-il à ce type ? (ancienne catégorie exacte, ou mots du bien)
export function matchType(item: Matchable, type: string): boolean {
  if (item.atypic_category === type) return true;
  const found = TYPE_PATTERNS.find(([label]) => label === type);
  if (!found) return false;
  const text = [
    item.property_type || '',
    (item.atypic_tags || []).join(' '),
    (item.features || []).join(' '),
    item.title,
    item.short_description,
  ]
    .join(' ')
    .toLowerCase();
  return found[1].test(text);
}

function num(v: string): number | null {
  const n = Number(v.replace(/\s/g, ''));
  return v.trim() !== '' && Number.isFinite(n) && n >= 0 ? n : null;
}

// Un bien passe-t-il les filtres ? (type, surface, chambres, budget, critères indispensables)
export function passesFilters(item: Matchable, f: Filters): boolean {
  if (f.types.length && !f.types.some((t) => matchType(item, t))) return false;
  const price = Number(item.price);
  const pMin = num(f.priceMin);
  const pMax = num(f.priceMax);
  if (pMin !== null && price < pMin) return false;
  if (pMax !== null && price > pMax) return false;
  const sMin = num(f.surfaceMin);
  const sMax = num(f.surfaceMax);
  if (sMin !== null && (item.surface_sqm === null || Number(item.surface_sqm) < sMin)) return false;
  if (sMax !== null && item.surface_sqm !== null && Number(item.surface_sqm) > sMax) return false;
  // Chambre inconnue : on laisse passer (même règle que les alertes)
  if (f.bedrooms !== null && item.bedrooms !== null && item.bedrooms !== undefined && Number(item.bedrooms) < f.bedrooms) return false;
  for (const k of f.must) if (!matchFeature(item, k)) return false;
  return true;
}

// Nombre de familles de filtres actives (pour le badge « Filtres (n) »)
export function countActive(f: Filters): number {
  return (
    (f.types.length ? 1 : 0) +
    (f.surfaceMin || f.surfaceMax ? 1 : 0) +
    (f.bedrooms !== null ? 1 : 0) +
    (f.priceMin || f.priceMax ? 1 : 0) +
    f.must.length +
    f.nice.length
  );
}

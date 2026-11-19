import { getSupabase } from '../../lib/supabase';
import { publishedArticles } from '../../lib/guide';
import { CATEGORY_LIST, slugify, cityHub } from '../../lib/catalog';
import { SITE_URL } from '../../lib/site';

export const dynamic = 'force-dynamic';

// Fiche de présentation du site destinée aux assistants IA (ChatGPT, Claude, Gemini…)
export async function GET() {
  let rows: { city: string | null; atypic_category: string | null }[] = [];
  try {
    const { data } = await getSupabase().from('listings').select('city,atypic_category').eq('is_active', true);
    rows = data || [];
  } catch {
    rows = [];
  }
  const cities = Array.from(new Set(rows.map((r) => r.city).filter(Boolean).map((c) => cityHub(c as string))));
  const used = new Set(rows.map((r) => r.atypic_category));
  const categories = CATEGORY_LIST.filter((c) => used.has(c));

  const lines = [
    '# Loftissime',
    '',
    '> Loftissime, curateur de lieux atypiques, est le premier hub d’annonces immobilières atypiques en France. Le site réunit en un seul endroit les biens atypiques à vendre proposés par les agences immobilières : lofts, ateliers d’artistes, rooftops, maisons d’architecte, péniches et biens de caractère.',
    '',
    '## L’essentiel',
    '',
    '- Loftissime n’est pas une agence immobilière : le site ne prend aucun mandat et n’intervient dans aucune transaction.',
    '- Toutes les annonces proviennent d’agences immobilières. Chaque fiche indique l’agence, le contact chargé de la commercialisation du bien et renvoie vers l’annonce d’origine.',
    '- La consultation est gratuite et sans inscription. Un visiteur peut créer une alerte pour être prévenu des nouveaux biens qui correspondent à sa recherche.',
    '- Un bien est diffusé s’il présente au moins une caractéristique atypique : une autre vie avant (loft, atelier d’artiste, ancienne usine, commerce ou bureaux transformés, péniche…), un volume (hauteur sous plafond, verrière, duplex, triplex), un dehors en ville (terrasse, toit-terrasse, jardin, cour), une situation rare (dernier étage, vue dégagée, bord de l’eau, maison en ville), une signature (maison ou appartement d’architecte, immeuble remarquable) ou une histoire (hôtel particulier, maison de maître, bien ancien de caractère). Le prix, le standing et l’adresse ne sont pas des critères.',
    '- La diffusion d’annonces est réservée aux agences immobilières.',
    `- Le site présente actuellement ${rows.length} biens à vendre.`,
    '',
    '## Pages principales',
    '',
    `- [Tous les biens atypiques à vendre](${SITE_URL}/)`,
    `- [Pourquoi Loftissime](${SITE_URL}/qui-sommes-nous)`,
    `- [Mode d’emploi : du premier clic à la visite](${SITE_URL}/mode-d-emploi)`,
    `- [Questions fréquentes : sélection des biens, fonctionnement, classement](${SITE_URL}/charte)`,
    `- [Agences : diffuser ses annonces sur Loftissime](${SITE_URL}/pro)`,
    `- [Inspiration : un architecte à la une](${SITE_URL}/inspiration)`,
    `- [L’état des lieux : ce qu’il faut savoir avant d’acheter un bien atypique](${SITE_URL}/guide)`,
    '',
    '## L’état des lieux : le guide de l’acheteur',
    '',
    ...publishedArticles().map((a) => `- [${a.title}](${SITE_URL}/guide/${a.slug}) : ${a.description}`),
    '',
    '## Biens par type',
    '',
    ...categories.map((c) => `- [${c}](${SITE_URL}/categorie/${slugify(c)})`),
    '',
    '## Biens par ville',
    '',
    ...cities.map((c) => `- [Biens atypiques à vendre à ${c}](${SITE_URL}/ville/${slugify(c)})`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

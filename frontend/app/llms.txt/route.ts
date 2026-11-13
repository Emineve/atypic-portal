import { getSupabase } from '../../lib/supabase';
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
    '- Un bien est diffusé s’il répond à au moins un critère : une origine singulière (loft, atelier, ancienne usine, péniche…), une signature (maison ou appartement d’architecte) ou un caractère rare (volume, dernier étage, terrasse, vue, histoire). Le prix n’est pas un critère.',
    '- La diffusion d’annonces est réservée aux agences immobilières.',
    `- Le site présente actuellement ${rows.length} biens à vendre.`,
    '',
    '## Pages principales',
    '',
    `- [Tous les biens atypiques à vendre](${SITE_URL}/)`,
    `- [Qui sommes-nous](${SITE_URL}/qui-sommes-nous)`,
    `- [Questions fréquentes : sélection des biens, fonctionnement, classement](${SITE_URL}/charte)`,
    `- [Agences : diffuser ses annonces sur Loftissime](${SITE_URL}/pro)`,
    `- [Inspiration : un architecte à la une](${SITE_URL}/inspiration)`,
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

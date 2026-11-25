import type { LetterItem } from '../app/lettre/LetterView';

// Un numéro de « Béton ciré », la newsletter de Loftissime, dans sa structure actuelle (content.v = 2) :
// le bien à la une (la visite, puis l'addition), avant la promesse, trois autres biens, la question.
// Ce fichier porte les données et les calculs ; la page, l'aperçu du back-office et le mail s'en servent tous les trois.

export const SITE = 'https://loftissime.fr';

export type NumeroContent = {
  v?: number;
  theme?: string; // le thème du numéro (lib/newsletters.ts) ; par défaut celui de janvier
  objet?: string; // l'objet du mail
  une_id?: string; // le bien à la une
  autres_ids?: string[]; // les trois autres biens
  surnom?: string; // « L’atelier »
  surnom_italique?: string; // « du Panthéon »
  chapo?: string; // deux phrases sous le titre
  video_url?: string;
  video_legende?: string;
  dessin_kind?: string; // le dessin « aujourd'hui », s'il diffère de celui du bien
  dessin_valeur?: number | null;
  aujourdhui?: string;
  demain?: string;
  croquis_url?: string; // le croquis de l'architecte
  notaire_pct?: number | null;
  travaux?: number | null;
  travaux_par?: string; // qui signe le chiffre des travaux
  profil_qui?: string;
  profil_metier?: string;
  profil_revenus?: string;
  profil_apport?: string;
  courtier_nom?: string;
  courtier_mots?: string;
  mensualite?: number | null;
  charges?: number | null;
  energie?: number | null;
  taxe?: number | null;
  credit_mentions?: string; // durée, taux et mentions légales, telles que le courtier les fournit
  vigilance_question?: string;
  vigilance_texte?: string;
  vigilance_slug?: string; // l'article du guide qui développe le point
  question_on?: boolean;
  collaborateurs?: string;
};

export const NUMERO_VIDE: NumeroContent = { v: 2, notaire_pct: 8, question_on: true, autres_ids: [] };

// Les réponses possibles à la question, avec le code que comprend la page /lettre/reponse
export const CHOIX: [string, string][] = [
  ['loft', 'Un loft'],
  ['atelier', 'Un atelier d’artiste'],
  ['terrasse', 'Un dernier étage'],
  ['maison', 'Une maison en ville'],
  ['peniche', 'Une péniche'],
  ['surprise', 'Surprenez-moi'],
];

export const eur = (n: number | null | undefined) => (n == null ? '' : Math.round(n).toLocaleString('fr-FR').replace(/[  ]/g, ' ') + ' €');
const num = (v: unknown): number | null => (typeof v === 'number' && isFinite(v) ? v : null);

export const estV2 = (content: unknown): boolean => !!content && typeof content === 'object' && Number((content as NumeroContent).v) === 2;

// Le bien à la une et les autres biens, dans l'ordre choisi
export function biensDuNumero(c: NumeroContent, items: LetterItem[]): { une: LetterItem | null; autres: LetterItem[] } {
  const une = items.find((i) => i.id && i.id === c.une_id) || null;
  const autres = (c.autres_ids || []).map((id) => items.find((i) => i.id === id)).filter((i): i is LetterItem => !!i).slice(0, 3);
  return { une, autres };
}

// L'addition : prix, frais de notaire estimés, travaux, puis ce que l'acheteur paierait chaque mois
export function comptes(c: NumeroContent, une: LetterItem | null) {
  const prix = num(une?.prix);
  const pct = num(c.notaire_pct) ?? 8;
  // même estimation que sur les fiches du site : un pourcentage du prix, arrondi au millier
  const notaire = prix == null ? null : Math.round((prix * pct) / 100 / 1000) * 1000;
  const travaux = num(c.travaux);
  const total = prix != null && notaire != null && travaux != null ? prix + notaire + travaux : null;
  const lignesMois = [num(c.mensualite), num(c.charges), num(c.energie), num(c.taxe)];
  const mois = num(c.mensualite) == null ? null : lignesMois.reduce((s: number, x) => s + (x || 0), 0);
  return { prix, pct, notaire, travaux, total, mois };
}

// La vidéo se regarde sur la page du numéro, pas ailleurs : selon l'adresse fournie, un lecteur YouTube ou Vimeo
// intégré, ou le fichier lui-même. Une autre adresse reste un simple lien.
export function lecteurVideo(url?: string | null): { type: 'cadre' | 'fichier'; src: string } | null {
  const u = (url || '').trim();
  if (!/^https?:\/\//i.test(u)) return null;
  const yt = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (yt) return { type: 'cadre', src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0` };
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { type: 'cadre', src: `https://player.vimeo.com/video/${vm[1]}` };
  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(u)) return { type: 'fichier', src: u };
  return null;
}

// Les liens d'un numéro, par rubrique. Dans le mail ils passent par /lettre/va, qui compte le clic puis redirige.
export function liensDuNumero(c: NumeroContent, une: LetterItem | null, autres: LetterItem[]): Record<string, string> {
  const out: Record<string, string> = {};
  const http = (u?: string | null) => (u && /^https?:\/\//i.test(u.trim()) ? u.trim() : '');
  if (http(c.video_url)) out.video = http(c.video_url);
  if (http(une?.agency_url)) out.une = http(une?.agency_url);
  if (c.vigilance_slug && /^[a-z0-9-]+$/.test(c.vigilance_slug)) out.vigilance = `${SITE}/guide/${c.vigilance_slug}`;
  autres.forEach((a, i) => {
    if (http(a.agency_url)) out[`autre${i + 1}`] = http(a.agency_url);
  });
  return out;
}

// Ce qui manque encore avant d'envoyer : la liste s'affiche dans le back-office
export function manques(c: NumeroContent, une: LetterItem | null, autres: LetterItem[]): string[] {
  const m: string[] = [];
  const vide = (s?: string | null) => !s || !s.trim();
  if (vide(c.objet)) m.push('l’objet du mail');
  if (!une) m.push('le bien à la une');
  if (vide(c.surnom)) m.push('le surnom du bien');
  if (vide(c.chapo)) m.push('la présentation du bien');
  if (vide(c.video_url)) m.push('le lien de la vidéo');
  if (une && vide(une.agency_url)) m.push('le lien de l’annonce du bien à la une');
  if (vide(c.demain)) m.push('ce que devient le lieu (« demain »)');
  if (c.travaux == null) m.push('le chiffre des travaux');
  else if (vide(c.travaux_par)) m.push('le nom de celui qui signe les travaux');
  if (vide(c.profil_qui)) m.push('le profil de l’acheteur');
  if (vide(c.courtier_mots)) m.push('les mots du courtier');
  if (c.mensualite == null) m.push('la mensualité');
  else if (vide(c.credit_mentions)) m.push('les mentions du crédit (durée, taux, mentions légales)');
  if (vide(c.vigilance_question)) m.push('le point de vigilance');
  autres.forEach((a) => {
    if (vide(a.agency_url)) m.push(`le lien de l’annonce de ${a.lieu || 'un des autres biens'}`);
  });
  return m;
}

import type { LetterItem } from '../app/lettre/LetterView';
import { CHOIX, SITE, comptes, eur, liensDuNumero, type NumeroContent } from './numero';
import { MOIS, NEWSLETTERS, themeDe } from './newsletters';

// Le mail d'un numéro de la newsletter de Loftissime : même contenu que la page, en tableaux et styles en ligne pour les messageries.
// {{TOKEN}} est remplacé à l'envoi par le jeton de chaque abonné (désinscription, réponse à la question).
// Une rubrique dont le contenu manque n'apparaît pas : rien n'est jamais envoyé entre crochets.
// Le dessin : papier crème, cartes blanches à bord noir comme la boîte d'inscription du site, le jaune en petites touches.

const INK = '#211C15';
const PAPIER = '#FBF6EC';
const FOND = '#F1E9D8';
const JAUNE = '#F6CF4E';
const GRIS = '#74695A';
const FILET = '#E3D9C6';
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = 'Arial,Helvetica,sans-serif';

const esc = (s: unknown) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const a = (s?: string | null) => !!s && !!s.trim();

export function numeroEmailHtml(numero: number, c: NumeroContent, items: { une: LetterItem | null; autres: LetterItem[] }): string {
  const { une, autres } = items;
  const k = comptes(c, une);
  const liens = liensDuNumero(c, une, autres);
  // dans le mail, chaque lien passe par le site, qui compte le clic par rubrique puis redirige
  const va = (cle: string) => `${SITE}/lettre/va?n=${numero}&k=${cle}`;
  const page = `${SITE}/lettre/numero-${numero}`;
  const nom = [c.surnom, c.surnom_italique].filter(a).join(' ');
  const theme = themeDe(c.theme).nom;

  // Un titre de rubrique : un court trait jaune, puis le titre et sa suite en italique
  const titre = (t: string, i: string) =>
    `<tr><td style="padding:44px 24px 0;"><div style="width:44px;height:6px;background:${JAUNE};font-size:0;line-height:0;">&nbsp;</div><p style="margin:14px 0 0;font-family:${SERIF};font-size:28px;line-height:1.2;color:${INK};">${t} <span style="font-style:italic;color:${GRIS};">${i}</span></p></td></tr>`;
  // Une carte : fond blanc, bord noir plus épais en bas et à droite, comme une ombre portée
  const carte = (inner: string, fond = '#ffffff') =>
    `<tr><td style="padding:18px 24px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${fond};border:2px solid ${INK};border-right-width:6px;border-bottom-width:6px;border-radius:14px;border-collapse:separate;"><tr><td style="padding:24px 22px;">${inner}</td></tr></table></td></tr>`;
  const ligne = (label: string, note: string, montant: string) =>
    `<tr><td style="padding:11px 0;border-bottom:1px solid ${FILET};font-family:${SANS};font-size:16px;color:${INK};">${label}${note ? `<br><span style="font-size:13px;color:${GRIS};">${note}</span>` : ''}</td><td align="right" valign="top" style="padding:11px 0;border-bottom:1px solid ${FILET};font-family:${SERIF};font-size:20px;color:${INK};white-space:nowrap;">${montant}</td></tr>`;
  const total = (label: string, montant: string) =>
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;background:${JAUNE};border-radius:8px;"><tr><td style="padding:14px 16px;font-family:${SERIF};font-size:20px;color:${INK};">${label}</td><td align="right" style="padding:14px 16px;font-family:${SERIF};font-size:30px;color:${INK};white-space:nowrap;">${montant}</td></tr></table>`;
  const lien = (href: string, texte: string, couleur = INK) => `<a href="${esc(href)}" style="color:${couleur};text-decoration:underline;">${texte}</a>`;
  const texte = `font-family:${SANS};font-size:16px;line-height:1.6;color:${INK};`;

  const rows: string[] = [];

  // L'en-tête : le nom du thème en grand, puis la signature
  rows.push(`<tr><td style="padding:36px 24px 0;">
<p style="margin:0;font-family:${SERIF};font-size:56px;line-height:1;font-style:italic;color:${INK};">${esc(theme)}</p>
<p style="margin:12px 0 0;font-family:${SANS};font-size:14px;line-height:1.5;color:${GRIS};"><span style="font-family:${SERIF};font-size:17px;font-style:italic;color:${INK};">n° ${numero}</span> &nbsp;La newsletter de ceux qui aiment les biens atypiques, by <strong style="color:${INK};">loftissime.</strong></p>
</td></tr>`);

  // 1. Le bien à la une
  rows.push(carte(`<p style="margin:0;font-family:${SANS};font-size:14px;color:${GRIS};">Le bien à la une, et ce qu’il coûte vraiment.</p>
<h1 style="margin:10px 0 0;font-family:${SERIF};font-weight:normal;font-size:42px;line-height:1.05;color:${INK};">${esc(c.surnom)}${a(c.surnom_italique) ? ` <span style="font-style:italic;color:${GRIS};">${esc(c.surnom_italique)}</span>` : ''}</h1>
<p style="margin:16px 0 0;${texte}">${esc(c.chapo)}</p>
${k.prix != null ? `<p style="margin:16px 0 0;font-family:${SANS};font-size:14px;color:${GRIS};">Affiché <span style="background:${JAUNE};padding:4px 10px;border-radius:6px;font-family:${SERIF};font-size:24px;color:${INK};white-space:nowrap;">${eur(k.prix)}</span></p>` : ''}
${liens.video ? `<p style="margin:22px 0 0;"><a href="${va('video')}"><img src="${SITE}/lettre/video.png" width="504" alt="Voir la visite en vidéo" style="display:block;width:100%;max-width:504px;height:auto;border:0;border-radius:10px;"></a></p>` : ''}
${a(c.video_legende) ? `<p style="margin:10px 0 0;font-family:${SANS};font-size:14px;color:${GRIS};">${esc(c.video_legende)}</p>` : ''}
${liens.une ? `<p style="margin:16px 0 0;font-family:${SANS};font-size:15px;font-weight:bold;">${lien(va('une'), une?.seller === 'particulier' ? 'Voir l’annonce du propriétaire' : 'Voir l’annonce')}</p>` : ''}`));

  // Aujourd'hui, demain
  if (a(c.aujourdhui) || a(c.demain) || a(c.croquis_url)) {
    rows.push(titre('Aujourd’hui,', 'demain.'));
    rows.push(`<tr><td style="padding:14px 24px 0;${texte}">
${a(c.aujourdhui) ? `<p style="margin:0;"><span style="font-family:${SERIF};font-style:italic;color:${GRIS};">Aujourd’hui.</span> ${esc(c.aujourdhui)}</p>` : ''}
${a(c.croquis_url) ? `<p style="margin:14px 0 0;"><img src="${esc(c.croquis_url)}" width="552" alt="Le croquis de l’architecte" style="display:block;width:100%;max-width:552px;height:auto;border:2px solid ${INK};border-radius:10px;background:#ffffff;"></p>` : ''}
${a(c.demain) ? `<p style="margin:12px 0 0;"><span style="font-family:${SERIF};font-style:italic;color:${GRIS};">Demain.</span> ${esc(c.demain)}</p>` : ''}
</td></tr>`);
  }

  // L'addition
  rows.push(titre('L’addition,', 'sans rien oublier.'));
  rows.push(carte(`<p style="margin:0;font-family:${SERIF};font-size:24px;color:${INK};">${esc(nom || 'Le bien à la une')}</p>
<p style="margin:4px 0 8px;font-family:${SANS};font-size:14px;color:${GRIS};">Ce que coûte ce bien une fois habitable.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${k.prix != null ? ligne('Prix de vente affiché', une?.seller === 'particulier' ? 'Vendu en direct par son propriétaire' : 'Honoraires d’agence inclus', eur(k.prix)) : ''}
${k.notaire != null ? ligne('Frais de notaire', `Estimés, environ ${String(k.pct).replace('.', ',')} % dans l’ancien`, eur(k.notaire)) : ''}
${k.travaux != null ? ligne('Travaux', a(c.travaux_par) ? `Ordre de grandeur donné par ${esc(c.travaux_par)}` : 'Ordre de grandeur', eur(k.travaux)) : ''}
</table>
${k.total != null ? total('Le vrai prix', eur(k.total)) : ''}`));

  const profil: [string, string | undefined][] = [['Qui', c.profil_qui], ['Métier', c.profil_metier], ['Revenus', c.profil_revenus], ['Apport', c.profil_apport]];
  if (profil.some(([, v]) => a(v))) {
    const cell = ([l, v]: [string, string | undefined]) => `<td width="50%" valign="top" style="background:#ffffff;border:1px solid ${FILET};border-radius:10px;padding:12px 14px;"><span style="font-family:${SANS};font-size:12px;color:${GRIS};">${l}</span><br><span style="font-family:${SERIF};font-size:17px;color:${INK};">${esc(v)}</span></td>`;
    rows.push(`<tr><td style="padding:34px 24px 0;font-family:${SERIF};font-size:23px;line-height:1.25;color:${INK};">Qui pourrait l’acheter ? <span style="font-style:italic;color:${GRIS};">On a imaginé quelqu’un.</span></td></tr>
<tr><td style="padding:6px 18px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="6" style="border-collapse:separate;"><tr>${cell(profil[0])}${cell(profil[1])}</tr><tr>${cell(profil[2])}${cell(profil[3])}</tr></table></td></tr>`);
  }
  if (a(c.courtier_mots)) {
    rows.push(`<tr><td style="padding:14px 24px 0;${texte}"><span style="font-family:${SERIF};font-style:italic;color:${GRIS};">Ce que ${a(c.courtier_nom) ? esc(c.courtier_nom) : 'le courtier'} négocierait pour lui :</span> ${esc(c.courtier_mots)}</td></tr>`);
  }
  if (k.mois != null) {
    rows.push(carte(`<p style="margin:0;font-family:${SERIF};font-size:24px;color:${INK};">Par mois, tout compris</p>
<p style="margin:4px 0 8px;font-family:${SANS};font-size:14px;color:${GRIS};">Ce que cet acheteur paierait chaque mois pour y vivre.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${ligne('Mensualité du crédit', 'Travaux compris, calculée par le courtier', eur(c.mensualite))}
${c.charges != null ? ligne('Charges de copropriété', 'Données par l’annonce', eur(c.charges)) : ''}
${c.energie != null ? ligne('Énergie', 'D’après le diagnostic énergétique', eur(c.energie)) : ''}
${c.taxe != null ? ligne('Taxe foncière', 'Ramenée au mois', eur(c.taxe)) : ''}
</table>
${total('Total par mois', eur(k.mois))}
${a(c.credit_mentions) ? `<p style="margin:10px 0 0;font-family:${SANS};font-size:12px;line-height:1.5;color:${GRIS};">${esc(c.credit_mentions)}</p>` : ''}`));
  }

  // 2. Avant la promesse : la carte est teintée, c'est le passage à ne pas sauter
  if (a(c.vigilance_question)) {
    rows.push(titre('Avant la promesse,', 'un point de vigilance.'));
    rows.push(carte(`<p style="margin:0;font-family:${SERIF};font-size:23px;line-height:1.3;color:${INK};">${esc(c.vigilance_question)}</p>
${a(c.vigilance_texte) ? `<p style="margin:12px 0 0;${texte}">${esc(c.vigilance_texte)}</p>` : ''}
${liens.vigilance ? `<p style="margin:14px 0 0;font-family:${SANS};font-size:15px;font-weight:bold;">${lien(va('vigilance'), 'Lire l’article sur ce point')}</p>` : ''}`, '#FCF1C9'));
  }

  // 3. Les autres biens
  if (autres.length) {
    rows.push(titre(autres.length === 3 ? 'Trois autres biens,' : autres.length === 2 ? 'Deux autres biens,' : 'Un autre bien,', autres.length === 1 ? 'sélectionné pour vous.' : 'sélectionnés pour vous.'));
    rows.push(carte(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${autres
      .map(
        (b, i) => `<tr><td style="padding:12px 0;${i < autres.length - 1 ? `border-bottom:1px solid ${FILET};` : ''}font-family:${SANS};font-size:14px;line-height:1.5;color:${INK};"><span style="font-family:${SERIF};font-size:21px;">${esc(b.mesure)}${a(b.mesure_detail) ? ` <span style="font-style:italic;color:${GRIS};">${esc(b.mesure_detail)}</span>` : ''}</span><br>${esc(b.lieu)}${a(b.surface) ? `<span style="color:${GRIS};">, ${esc(b.surface)}</span>` : ''}${liens[`autre${i + 1}`] ? `<br>${lien(va(`autre${i + 1}`), 'Voir l’annonce')}` : ''}</td><td align="right" valign="top" style="padding:12px 0;${i < autres.length - 1 ? `border-bottom:1px solid ${FILET};` : ''}font-family:${SERIF};font-size:19px;color:${INK};white-space:nowrap;">${eur(b.prix)}</td></tr>`,
      )
      .join('')}</table>`));
  }

  // 4. La question : six pastilles à toucher
  if (c.question_on !== false) {
    rows.push(titre('La question,', 'et vous, vous rêvez de quoi ?'));
    const cell = ([code, t]: [string, string]) => `<td width="33%" align="center" style="background:#ffffff;border:2px solid ${INK};border-radius:999px;padding:13px 4px;"><a href="${SITE}/lettre/reponse?t={{TOKEN}}&amp;c=${code}" style="display:block;font-family:${SERIF};font-size:16px;font-style:italic;color:${INK};text-decoration:none;">${t}</a></td>`;
    rows.push(`<tr><td style="padding:10px 16px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="8" style="border-collapse:separate;"><tr>${CHOIX.slice(0, 3).map(cell).join('')}</tr><tr>${CHOIX.slice(3).map(cell).join('')}</tr></table>
<p style="margin:6px 8px 0;font-family:${SANS};font-size:14px;color:${GRIS};">Un clic suffit. Vos réponses décident des prochaines visites.</p></td></tr>`);
  }

  // Le mois prochain : la barre des douze matières, celle du prochain thème mise en avant
  const rang = NEWSLETTERS.findIndex((n) => n.slug === themeDe(c.theme).slug);
  const suivant = NEWSLETTERS[(rang + 1) % NEWSLETTERS.length];
  rows.push(titre('Et le mois prochain,', `en ${MOIS[suivant.mois - 1]}.`));
  rows.push(`<tr><td style="padding:16px 24px 0;">
<img src="${SITE}/lettre/barre-${suivant.slug}.png" width="552" alt="" style="display:block;width:100%;max-width:552px;height:auto;border:0;">
<p style="margin:16px 0 0;font-family:${SERIF};font-size:40px;line-height:1;font-style:italic;color:${INK};">${esc(suivant.nom)}</p>
<p style="margin:10px 0 0;${texte}">${esc(suivant.sujet)}</p></td></tr>`);

  // Le bloc final
  rows.push(`<tr><td style="padding-top:48px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${INK};"><tr><td style="padding:34px 24px;">
<p style="margin:0;font-family:${SANS};font-size:32px;font-weight:bold;letter-spacing:-1px;color:#FBF5E9;">loftissime<span style="color:${JAUNE};">.</span></p>
<p style="margin:10px 0 0;font-family:${SANS};font-size:15px;line-height:1.5;color:#cfc5b4;">La newsletter de ceux qui aiment les biens atypiques. Douze numéros par an, un thème par mois.</p>
${a(c.collaborateurs) ? `<p style="margin:22px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:#a59a88;">Ont collaboré à ce numéro : ${esc(c.collaborateurs)}</p>` : ''}
<p style="margin:18px 0 0;font-family:${SANS};font-size:15px;line-height:1.8;">${lien(`mailto:?subject=${encodeURIComponent(`Loftissime, ${theme} n° ${numero}`)}&body=${encodeURIComponent(page)}`, 'Faire suivre à quelqu’un qui cherche', '#FBF5E9')} &nbsp; ${lien(`${SITE}/lettre/va?n=${numero}&k=site`, 'Lire ce numéro sur le site', '#FBF5E9')}</p>
<p style="margin:24px 0 0;border-top:1px solid #4a4238;padding-top:16px;font-family:${SANS};font-size:12px;line-height:1.6;color:#8c8273;">Chaque bien est vendu en direct par son propriétaire ou par l’intermédiaire d’une agence. Les chiffres de travaux et de financement sont des ordres de grandeur donnés par ceux qui les signent. Loftissime n’est pas une agence et n’intervient pas dans la vente.<br>Vous recevez ce mail parce que vous êtes abonné à la newsletter de Loftissime. ${lien(`${SITE}/lettre/stop?t={{TOKEN}}`, 'Se désinscrire', '#8c8273')}</p>
</td></tr></table></td></tr>`);

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(theme)} n° ${numero}</title></head>
<body style="margin:0;padding:0;background:${FOND};">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${FOND};">${esc(c.chapo)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${FOND};"><tr><td align="center" style="padding:24px 0;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${PAPIER};">
<tr><td style="height:10px;background:${JAUNE};font-size:0;line-height:0;">&nbsp;</td></tr>
${rows.join('\n')}
</table></td></tr></table></body></html>`;
}

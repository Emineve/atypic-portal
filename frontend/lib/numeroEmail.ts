import type { LetterItem } from '../app/lettre/LetterView';
import { CHOIX, SITE, comptes, eur, liensDuNumero, type NumeroContent } from './numero';
import { themeDe } from './newsletters';

// Le mail d'un numéro de la newsletter de Loftissime : même contenu que la page, en tableaux et styles en ligne pour les messageries.
// {{TOKEN}} est remplacé à l'envoi par le jeton de chaque abonné (désinscription, réponse à la question).
// Une rubrique dont le contenu manque n'apparaît pas : rien n'est jamais envoyé entre crochets.

const INK = '#211C15';
const BETON = '#E3DFD8';
const GRIS = '#74695A';
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

  const poutre = `<tr><td style="padding:36px 32px 0;"><div style="height:9px;background:${INK};font-size:0;line-height:0;">&nbsp;</div></td></tr>`;
  const h2 = (t: string, i: string) => `<tr><td style="padding:16px 32px 0;font-family:${SERIF};font-size:26px;line-height:1.2;color:${INK};">${t} <span style="font-style:italic;color:${GRIS};">${i}</span></td></tr>`;
  const ligne = (label: string, note: string, montant: string, fort = false) =>
    `<tr><td style="padding:${fort ? '12px 0 0' : '8px 0'};font-family:${fort ? SERIF : SANS};font-size:${fort ? 20 : 15}px;color:${INK};${fort ? `border-top:1px solid ${INK};` : ''}">${label}${note ? `<br><span style="font-family:${SANS};font-size:12px;color:${GRIS};">${note}</span>` : ''}</td><td align="right" valign="top" style="padding:${fort ? '12px 0 0' : '8px 0'};font-family:${SERIF};font-size:${fort ? 24 : 18}px;color:${INK};white-space:nowrap;${fort ? `border-top:1px solid ${INK};` : ''}">${montant}</td></tr>`;
  const ticket = (inner: string) => `<tr><td style="padding:24px 32px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-top:2px dashed ${INK};"><tr><td style="padding:22px 24px 20px;">${inner}</td></tr></table></td></tr>`;
  const lien = (href: string, texte: string, couleur = INK) => `<a href="${esc(href)}" style="color:${couleur};text-decoration:underline;">${texte}</a>`;

  const rows: string[] = [];

  // 1. Le bien à la une
  rows.push(`<tr><td style="background:${INK};padding:28px 32px 30px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="font-family:${SERIF};font-size:26px;font-style:italic;color:#FBF5E9;">${esc(theme)} <span style="color:#a59a88;">n° ${numero}</span></td>
</tr><tr><td style="padding-top:6px;font-family:${SANS};font-size:12px;color:#a59a88;">La newsletter de ceux qui aiment les biens atypiques, by <strong style="color:#FBF5E9;">loftissime.</strong></td></tr></table>
<p style="margin:34px 0 0;font-family:${SANS};font-size:13px;color:#a59a88;">Le bien à la une, et ce qu’il coûte vraiment.</p>
<h1 style="margin:8px 0 0;font-family:${SERIF};font-weight:normal;font-size:44px;line-height:1.04;color:#FBF5E9;">${esc(c.surnom)}${a(c.surnom_italique) ? ` <span style="font-style:italic;color:#a59a88;">${esc(c.surnom_italique)}</span>` : ''}</h1>
<p style="margin:16px 0 0;font-family:${SANS};font-size:15px;line-height:1.6;color:#cfc5b4;">${esc(c.chapo)}${k.prix != null ? ` Affiché <span style="font-family:${SERIF};font-size:18px;color:#FBF5E9;">${eur(k.prix)}</span>.` : ''}</p>
${liens.video ? `<p style="margin:24px 0 0;"><a href="${va('video')}"><img src="${SITE}/lettre/video.png" width="536" alt="Voir la visite en vidéo" style="display:block;width:100%;max-width:536px;height:auto;border:0;"></a></p>` : ''}
${a(c.video_legende) ? `<p style="margin:12px 0 0;font-family:${SANS};font-size:13px;color:#a59a88;">${esc(c.video_legende)}</p>` : ''}
${liens.une ? `<p style="margin:16px 0 0;font-family:${SANS};font-size:14px;">${lien(va('une'), une?.seller === 'particulier' ? 'Voir l’annonce du propriétaire' : 'Voir l’annonce', '#FBF5E9')}</p>` : ''}
</td></tr>`);

  // Aujourd'hui, demain
  if (a(c.aujourdhui) || a(c.demain) || a(c.croquis_url)) {
    rows.push(h2('Aujourd’hui,', 'demain.').replace('padding:16px 32px 0', 'padding:34px 32px 0'));
    rows.push(`<tr><td style="padding:14px 32px 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};">
${a(c.aujourdhui) ? `<p style="margin:0;"><strong>Aujourd’hui.</strong> ${esc(c.aujourdhui)}</p>` : ''}
${a(c.croquis_url) ? `<p style="margin:14px 0 0;"><img src="${esc(c.croquis_url)}" width="536" alt="Le croquis de l’architecte" style="display:block;width:100%;max-width:536px;height:auto;border:1px solid ${INK};background:#ffffff;"></p>` : ''}
${a(c.demain) ? `<p style="margin:12px 0 0;"><strong>Demain.</strong> ${esc(c.demain)}</p>` : ''}
</td></tr>`);
  }

  // L'addition
  rows.push(poutre, h2('L’addition,', 'sans rien oublier.'));
  rows.push(ticket(`<p style="margin:0;font-family:${SERIF};font-size:22px;color:${INK};">${esc(nom || 'Le bien à la une')}</p>
<p style="margin:2px 0 10px;font-family:${SANS};font-size:13px;color:${GRIS};">Ce que coûte ce bien une fois habitable.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${k.prix != null ? ligne('Prix de vente affiché', une?.seller === 'particulier' ? 'Vendu en direct par son propriétaire' : 'Honoraires d’agence inclus', eur(k.prix)) : ''}
${k.notaire != null ? ligne('Frais de notaire', `Estimés, environ ${String(k.pct).replace('.', ',')} % dans l’ancien`, eur(k.notaire)) : ''}
${k.travaux != null ? ligne('Travaux', a(c.travaux_par) ? `Ordre de grandeur donné par ${esc(c.travaux_par)}` : 'Ordre de grandeur', eur(k.travaux)) : ''}
${k.total != null ? ligne('Le vrai prix', '', eur(k.total), true) : ''}
</table>`));

  const profil: [string, string | undefined][] = [['Qui', c.profil_qui], ['Métier', c.profil_metier], ['Revenus', c.profil_revenus], ['Apport', c.profil_apport]];
  if (profil.some(([, v]) => a(v))) {
    const cell = ([l, v]: [string, string | undefined]) => `<td width="50%" valign="top" style="border:1px solid ${INK};padding:10px 12px;"><span style="font-family:${SANS};font-size:10px;color:${GRIS};">${l}</span><br><span style="font-family:${SERIF};font-size:15px;color:${INK};">${esc(v)}</span></td>`;
    rows.push(`<tr><td style="padding:30px 32px 0;font-family:${SERIF};font-size:22px;line-height:1.25;color:${INK};">Qui pourrait l’acheter ? <span style="font-style:italic;color:${GRIS};">On a imaginé quelqu’un.</span></td></tr>
<tr><td style="padding:12px 32px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr>${cell(profil[0])}${cell(profil[1])}</tr><tr>${cell(profil[2])}${cell(profil[3])}</tr></table></td></tr>`);
  }
  if (a(c.courtier_mots)) {
    rows.push(`<tr><td style="padding:12px 32px 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};"><span style="font-family:${SERIF};font-style:italic;">Ce que ${a(c.courtier_nom) ? esc(c.courtier_nom) : 'le courtier'} négocierait pour lui :</span> ${esc(c.courtier_mots)}</td></tr>`);
  }
  if (k.mois != null) {
    rows.push(ticket(`<p style="margin:0;font-family:${SERIF};font-size:22px;color:${INK};">Par mois, tout compris</p>
<p style="margin:2px 0 10px;font-family:${SANS};font-size:13px;color:${GRIS};">Ce que cet acheteur paierait chaque mois pour y vivre.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${ligne('Mensualité du crédit', 'Travaux compris, calculée par le courtier', eur(c.mensualite))}
${c.charges != null ? ligne('Charges de copropriété', 'Données par l’annonce', eur(c.charges)) : ''}
${c.energie != null ? ligne('Énergie', 'D’après le diagnostic énergétique', eur(c.energie)) : ''}
${c.taxe != null ? ligne('Taxe foncière', 'Ramenée au mois', eur(c.taxe)) : ''}
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;background:#F6CF4E;"><tr><td style="padding:14px 16px;font-family:${SERIF};font-size:20px;color:${INK};">Total par mois</td><td align="right" style="padding:14px 16px;font-family:${SERIF};font-size:30px;color:${INK};white-space:nowrap;">${eur(k.mois)}</td></tr></table>
${a(c.credit_mentions) ? `<p style="margin:8px 0 0;font-family:${SANS};font-size:11px;line-height:1.5;color:${GRIS};">${esc(c.credit_mentions)}</p>` : ''}`));
  }

  // 2. Avant la promesse
  if (a(c.vigilance_question)) {
    rows.push(poutre, h2('Avant la promesse,', 'un point de vigilance.'));
    rows.push(`<tr><td style="padding:16px 32px 0;"><p style="margin:0;border-left:2px solid ${INK};padding-left:16px;font-family:${SERIF};font-size:20px;line-height:1.35;color:${INK};">${esc(c.vigilance_question)}</p>
${a(c.vigilance_texte) ? `<p style="margin:12px 0 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};">${esc(c.vigilance_texte)}</p>` : ''}
${liens.vigilance ? `<p style="margin:8px 0 0;font-family:${SANS};font-size:14px;font-weight:bold;">${lien(va('vigilance'), 'Lire l’article sur ce point')}</p>` : ''}</td></tr>`);
  }

  // 3. Les autres biens
  if (autres.length) {
    rows.push(poutre, h2(autres.length === 3 ? 'Trois autres biens,' : autres.length === 2 ? 'Deux autres biens,' : 'Un autre bien,', autres.length === 1 ? 'sélectionné pour vous.' : 'sélectionnés pour vous.'));
    rows.push(`<tr><td style="padding:16px 32px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${INK};">${autres
      .map(
        (b, i) => `<tr><td style="padding:14px 0;border-bottom:1px solid #bfb8ac;font-family:${SANS};font-size:13px;color:${INK};"><span style="font-family:${SERIF};font-size:21px;">${esc(b.mesure)}${a(b.mesure_detail) ? ` <span style="font-style:italic;color:${GRIS};">${esc(b.mesure_detail)}</span>` : ''}</span><br>${esc(b.lieu)}${a(b.surface) ? `<span style="color:${GRIS};">, ${esc(b.surface)}</span>` : ''}${liens[`autre${i + 1}`] ? `<br>${lien(va(`autre${i + 1}`), 'Voir l’annonce')}` : ''}</td><td align="right" valign="top" style="padding:14px 0;border-bottom:1px solid #bfb8ac;font-family:${SERIF};font-size:18px;color:${INK};white-space:nowrap;">${eur(b.prix)}</td></tr>`,
      )
      .join('')}</table></td></tr>`);
  }

  // 4. La question
  if (c.question_on !== false) {
    rows.push(poutre, h2('La question,', 'et vous, vous rêvez de quoi ?'));
    const cell = ([code, t]: [string, string]) => `<td width="33%" align="center" style="border:1px solid ${INK};background:#f1eee9;padding:16px 6px;"><a href="${SITE}/lettre/reponse?t={{TOKEN}}&amp;c=${code}" style="font-family:${SERIF};font-size:16px;font-style:italic;color:${INK};text-decoration:none;">${t}</a></td>`;
    rows.push(`<tr><td style="padding:16px 32px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr>${CHOIX.slice(0, 3).map(cell).join('')}</tr><tr>${CHOIX.slice(3).map(cell).join('')}</tr></table>
<p style="margin:10px 0 0;font-family:${SANS};font-size:12px;color:${GRIS};">Un clic suffit. Vos réponses décident des prochaines visites.</p></td></tr>`);
  }

  // Le bloc final
  rows.push(`<tr><td style="padding-top:40px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${INK};"><tr><td style="padding:32px;">
<p style="margin:0;font-family:${SANS};font-size:32px;font-weight:bold;letter-spacing:-1px;color:#FBF5E9;">loftissime.</p>
<p style="margin:10px 0 0;font-family:${SANS};font-size:14px;color:#cfc5b4;">La newsletter de ceux qui aiment les biens atypiques. Douze numéros par an, un thème par mois.</p>
${a(c.collaborateurs) ? `<p style="margin:22px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:#a59a88;">Ont collaboré à ce numéro : ${esc(c.collaborateurs)}</p>` : ''}
<p style="margin:16px 0 0;font-family:${SANS};font-size:14px;">${lien(`mailto:?subject=${encodeURIComponent(`Loftissime, ${theme} n° ${numero}`)}&body=${encodeURIComponent(page)}`, 'Faire suivre à quelqu’un qui cherche', '#FBF5E9')} &nbsp; ${lien(`${SITE}/lettre/va?n=${numero}&k=site`, 'Lire ce numéro sur le site', '#FBF5E9')}</p>
<p style="margin:24px 0 0;border-top:1px solid #4a4238;padding-top:16px;font-family:${SANS};font-size:11px;line-height:1.6;color:#8c8273;">Chaque bien est vendu en direct par son propriétaire ou par l’intermédiaire d’une agence. Les chiffres de travaux et de financement sont des ordres de grandeur donnés par ceux qui les signent. Loftissime n’est pas une agence et n’intervient pas dans la vente.<br>Vous recevez ce mail parce que vous êtes abonné à la newsletter de Loftissime. ${lien(`${SITE}/lettre/stop?t={{TOKEN}}`, 'Se désinscrire', '#8c8273')}</p>
</td></tr></table></td></tr>`);

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(theme)} n° ${numero}</title></head>
<body style="margin:0;padding:0;background:#EFE7D6;">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#EFE7D6;">${esc(c.chapo)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EFE7D6;"><tr><td align="center" style="padding:24px 0;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${BETON};">
${rows.join('\n')}
</table></td></tr></table></body></html>`;
}

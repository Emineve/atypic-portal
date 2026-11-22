// Liens « Y dormir » des articles de la rubrique Insolite : ils renvoient vers
// un site de location à la nuit. Tant que le programme d'affiliation n'est pas
// ouvert, ce sont de simples liens sortants.
//
// Le jour où l'affiliation est active :
// 1. renseigner le paramètre de suivi fourni par la plateforme dans STAY_TRACKING ;
// 2. passer STAY_PAID à true : la mention « lien rémunéré » s'affiche alors.
export const STAY_PAID = false;
const STAY_TRACKING = '';

export function stayUrl(href: string): string {
  if (!STAY_TRACKING) return href;
  return href + (href.includes('?') ? '&' : '?') + STAY_TRACKING;
}

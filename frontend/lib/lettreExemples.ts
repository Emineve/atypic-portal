import type { LetterItem } from '../app/lettre/LetterView';

// Numéros d'exemple de « Béton ciré », affichés tant qu'aucun numéro n'est réellement paru, pour que l'accueil et la
// page de la newsletter montrent à quoi elle ressemblera. Ils ne mènent nulle part (aucun clic) et le bandeau du site
// prévient qu'il s'agit d'exemples. Les biens sont de vraies annonces repérées les 23 et 24 novembre 2026.
// À retirer dès le premier vrai numéro : passer EXEMPLES_ACTIFS à false.
export const EXEMPLES_ACTIFS = true;

export type NumeroExemple = { numero: number; titre: string; resume: string };

export const NUMEROS_EXEMPLE: NumeroExemple[] = [
  { numero: 2, titre: 'La verrière du 15e', resume: 'Sept mètres sous verrière au fond d’une cour pavée.' },
  { numero: 1, titre: 'L’atelier du Panthéon', resume: 'Un ancien atelier au pied d’un immeuble de 1880.' },
];
export const PROCHAIN_NUMERO = 3;

const bien = (numero: number, une: boolean, x: Partial<LetterItem> & { mesure: string; kind: string }): { b: LetterItem; numero: number; une: boolean } => ({
  numero,
  une,
  b: {
    id: `ex-${numero}-${x.mesure}-${x.lieu}`,
    rubrique: 'deja_en_ligne',
    mesure_detail: null,
    phrase: null,
    lieu: null,
    surface: null,
    prix: null,
    usage_note: null,
    agency_name: null,
    agency_url: null,
    valeur: null,
    ...x,
  } as LetterItem,
});

export const BIENS_EXEMPLE = [
  bien(2, true, { mesure: '7 m', mesure_detail: 'sous verrière', kind: 'verriere', valeur: 7, lieu: 'Paris 15e', surface: '135 m²', prix: 1350000 }),
  bien(2, false, { mesure: '6 m', mesure_detail: 'sous plafond', kind: 'hauteur', valeur: 6, lieu: 'Paris 16e, Muette', surface: '85,56 m²', prix: 1195000 }),
  bien(2, false, { mesure: '37 m²', mesure_detail: 'de terrasse, plein ouest', kind: 'surface', valeur: 37, lieu: 'Paris 19e, Buttes-Chaumont', surface: '147 m²', prix: 1195000 }),
  bien(2, false, { mesure: '18 fenêtres', mesure_detail: 'sur les toits de Paris', kind: 'vue', valeur: 18, lieu: 'Paris 18e, Montmartre', surface: '78 m²', prix: 1080000 }),
  bien(1, true, { mesure: 'Un ancien atelier', mesure_detail: 'au pied d’un immeuble de 1880', kind: 'fabrique', lieu: 'Paris 5e', surface: '43 m² (55 m² au sol)', prix: 440000 }),
  bien(1, false, { mesure: '5,10 m', mesure_detail: 'sous un volume cathédrale', kind: 'hauteur', valeur: 5.1, lieu: 'Vincennes', surface: '32 m² (47 m² au sol)', prix: 349000 }),
  bien(1, false, { mesure: '16 m²', mesure_detail: 'de terrasse', kind: 'surface', valeur: 16, lieu: 'Pantin', surface: '51 m²', prix: 435000 }),
  bien(1, false, { mesure: 'Une copropriété de lofts', kind: 'fabrique', lieu: 'Romainville', surface: '59 m² (79 m² au sol)', prix: 379000 }),
];

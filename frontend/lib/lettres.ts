// Les numéros de la lettre « Avant-première ». Chaque numéro garde sa page : c'est l'historique de la rubrique.
// « paru: false » = maquette, pas encore envoyée.
export type Lettre = {
  numero: number;
  slug: string;
  date: string; // AAAA-MM-JJ, un jeudi
  titre: string;
  resume: string;
  paru: boolean;
  hauteur: number; // hauteur de la lettre en pixels à 600 de large, pour réserver la place avant le chargement
};

export const LETTRES: Lettre[] = [
  {
    numero: 1,
    slug: 'numero-1',
    date: '2026-11-26',
    titre: 'Quatre hauteurs sous plafond',
    resume: 'De 7 m à 4,5 m, quatre ateliers et lofts parisiens dessinés à la même échelle, et un studio avec terrasse sous 500 000 €.',
    paru: false,
    hauteur: 2900,
  },
];

export function dateLettre(d: string): string {
  return new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// Repères de taux de crédit immobilier affichés sur la page Financement.
// À mettre à jour chaque mois : ce sont des moyennes de marché, hors assurance.
export const RATES = {
  asOf: 'octobre 2026', // période du relevé
  updated: '5 novembre 2026', // date de publication des baromètres consultés
  trend: 'en hausse',
  byYears: [
    { years: 15, rate: 3.32 },
    { years: 20, rate: 3.54 },
    { years: 25, rate: 3.57 },
  ],
  usury: { rate: 5.4, label: 'prêts à taux fixe de 20 ans et plus, jusqu’au 31 décembre 2026' },
};

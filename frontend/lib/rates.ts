// Repères de taux de crédit immobilier affichés sur la page Financement.
// À mettre à jour chaque mois : relevés communiqués par notre courtier partenaire, hors assurance.
export const RATES = {
  // Le tableau « Les taux du mois » ne s'affiche que lorsque le courtier a fourni et validé ses relevés.
  publies: false,
  asOf: 'novembre 2026', // période du relevé
  updated: '20 novembre 2026', // date de mise à jour sur le site
  // Taux repris par défaut dans le simulateur : ceux d'un bon dossier (hypothèse prudente)
  byYears: [
    { years: 15, rate: 3.58 },
    { years: 20, rate: 3.69 },
    { years: 25, rate: 3.85 },
  ],
  // Selon la qualité du dossier, dans l'ordre des durées ci-dessus (15, 20, 25 ans)
  tiers: [
    { label: 'Bon', rates: [3.58, 3.69, 3.85] },
    { label: 'Très bon', rates: [3.45, 3.53, 3.69] },
    { label: 'Excellent', rates: [3.3, 3.45, 3.55] },
  ],
  usury: { rate: 5.4, label: 'prêts à taux fixe de 20 ans et plus, jusqu’au 31 décembre 2026' },
};

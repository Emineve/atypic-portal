// Informations légales du site : UN SEUL endroit à compléter.
// Tant que LEGAL_READY est false, les pages légales affichent un bandeau "version provisoire" et ne sont pas indexées.
export const LEGAL_READY = false;

const todo = (label: string) => `[À COMPLÉTER : ${label}]`;

export const EDITOR = {
  name: todo('dénomination sociale'),
  status: todo('forme juridique et capital social'),
  rcs: todo('numéro SIREN et ville du RCS'),
  vat: todo('numéro de TVA intracommunautaire'),
  address: todo('adresse du siège social'),
  email: todo('email de contact'),
  phone: todo('téléphone'),
  director: todo('directeur de la publication, nom et fonction'),
  // Adresse où écrire pour exercer ses droits sur ses données personnelles
  privacyEmail: todo('email pour les demandes sur les données personnelles'),
  // Adresse réservée aux agences (diffusion, arrêt, facturation)
  proEmail: todo('email dédié aux agences'),
  // Marque Loftissime : numéro et date du dépôt à l'INPI, s'il y en a un
  trademark: todo('dépôt de la marque Loftissime à l’INPI'),
  // Tribunal compétent pour les litiges avec les agences
  court: todo('ville du tribunal de commerce compétent'),
  // Médiateur de la consommation auquel le site adhère
  mediator: todo('médiateur de la consommation, nom et site internet'),
};

export const UPDATED = '19 novembre 2026';

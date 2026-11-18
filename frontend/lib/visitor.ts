// Ce que le visiteur a déjà saisi sur le site (coordonnées, lieux, budget), gardé dans son
// navigateur uniquement, pour ne pas le lui redemander d'un formulaire à l'autre.
const KEY = 'loftissime:visiteur';

export interface Visitor {
  name?: string;
  email?: string;
  phone?: string;
  locations?: string[];
  budget?: string;
}

export function readVisitor(): Visitor {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '{}');
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as Visitor) : {};
  } catch {
    return {};
  }
}

// Seuls les champs renseignés remplacent ce qui était mémorisé
export function saveVisitor(patch: Visitor) {
  try {
    const next: Visitor = { ...readVisitor() };
    if (patch.name && patch.name.trim()) next.name = patch.name.trim();
    if (patch.email && patch.email.trim()) next.email = patch.email.trim();
    if (patch.phone && patch.phone.trim()) next.phone = patch.phone.trim();
    if (patch.locations && patch.locations.length > 0) next.locations = patch.locations.slice(0, 10);
    if (patch.budget && patch.budget.trim()) next.budget = patch.budget.trim();
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* stockage indisponible : rien n'est mémorisé */
  }
}

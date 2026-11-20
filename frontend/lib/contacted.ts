// Biens pour lesquels le visiteur a déjà envoyé une demande de contact, gardés dans son navigateur
// uniquement : on ne lui propose pas d'envoyer deux fois la même demande.
const KEY = 'loftissime:demandes';

export function readContacted(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function markContacted(ids: string[]) {
  try {
    const next = Array.from(new Set([...readContacted(), ...ids])).slice(-200);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* stockage indisponible : rien n'est mémorisé */
  }
}

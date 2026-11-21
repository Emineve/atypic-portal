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
  dropFavorites(ids);
}

// Une demande est partie : le bien quitte les favoris (il reste dans « Vus récemment », avec sa mention).
const FAVORITES_KEY = 'singulier:favorites';
const PURGED_KEY = 'loftissime:favoris-purges';

function dropFavorites(ids: string[]) {
  try {
    const v = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    if (!Array.isArray(v)) return;
    const next = v.filter((x) => !ids.includes(x));
    if (next.length !== v.length) localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  } catch {
    /* ignoré */
  }
}

// Une seule fois par navigateur : les demandes envoyées avant cette règle quittent aussi les favoris.
export function purgeContactedFavorites() {
  try {
    if (localStorage.getItem(PURGED_KEY) === '1') return;
    dropFavorites(readContacted());
    localStorage.setItem(PURGED_KEY, '1');
  } catch {
    /* ignoré */
  }
}

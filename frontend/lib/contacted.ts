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

// À chaque ouverture de la liste : un bien présent dans les favoris est un favori ordinaire, même si une
// demande est déjà partie pour lui (le visiteur l'a remis en favori). Il peut donc être recontacté.
export function purgeContactedFavorites() {
  try {
    const favs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    if (!Array.isArray(favs)) return;
    const contacted = readContacted();
    const next = contacted.filter((x) => !favs.includes(x));
    if (next.length !== contacted.length) localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignoré */
  }
}

// Le visiteur remet en favori un bien déjà contacté : il compte de nouveau comme un favori ordinaire,
// et peut faire l'objet d'une nouvelle demande.
export function unmarkContacted(id: string) {
  try {
    const next = readContacted().filter((x) => x !== id);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignoré */
  }
}

// Biens déjà consultés, gardés dans le navigateur du visiteur uniquement (pas de compte,
// rien n'est envoyé au serveur). Du plus récent au plus ancien.
const KEY = 'loftissime:vus';
const MAX = 60;

export interface Seen {
  id: string;
  at: number;
}

export function readSeen(): Seen[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(v)) return [];
    return v.filter((x) => x && typeof x.id === 'string' && typeof x.at === 'number');
  } catch {
    return [];
  }
}

export function markSeen(id: string) {
  try {
    const next = [{ id, at: Date.now() }, ...readSeen().filter((x) => x.id !== id)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* stockage indisponible : rien n'est mémorisé */
  }
}

export function clearSeen() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignoré */
  }
}

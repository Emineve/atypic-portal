// Lieux pour lesquels le visiteur a déjà créé une alerte, gardés dans son navigateur uniquement :
// on ne lui propose pas de créer deux fois la même.
const KEY = 'loftissime:alertes-lieux';

const plain = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export function readAlertPlaces(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function markAlertPlaces(places: string[]) {
  try {
    const next = Array.from(new Set([...readAlertPlaces(), ...places.map(plain).filter(Boolean)])).slice(-100);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* stockage indisponible : rien n'est mémorisé */
  }
}

export function hasAlertFor(place: string): boolean {
  return Boolean(place) && readAlertPlaces().includes(plain(place));
}

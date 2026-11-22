// Date de la visite précédente, gardée dans le navigateur : sert à dire combien de biens sont arrivés depuis.
// Deux passages à moins d'une demi-heure d'écart comptent pour une seule visite.
const KEY = 'loftissime:visite';
const SAME_VISIT_MS = 30 * 60 * 1000;

export function previousVisit(): number | null {
  try {
    const now = Date.now();
    const v = JSON.parse(localStorage.getItem(KEY) || '{}');
    let prev: number | null = typeof v.prev === 'number' ? v.prev : null;
    const last: number | null = typeof v.last === 'number' ? v.last : null;
    if (last && now - last > SAME_VISIT_MS) prev = last;
    localStorage.setItem(KEY, JSON.stringify({ prev, last: now }));
    return prev;
  } catch {
    return null;
  }
}

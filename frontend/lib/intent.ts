// L'invitation à créer une alerte ne s'affiche pas en permanence : seulement quand le visiteur a montré
// qu'il cherche (un favori, une demande à une agence, plusieurs biens consultés), et jamais s'il a déjà
// une alerte. Tout est lu dans son navigateur, rien n'est envoyé au serveur.
import { readAlertPlaces } from './alertPlaces';
import { readContacted } from './contacted';
import { readSeen } from './seen';

const ALERT_KEY = 'loftissime:alerte';
const FAVORITES_KEY = 'singulier:favorites';
const SEEN_MIN = 3;

export function markAlertCreated() {
  try {
    localStorage.setItem(ALERT_KEY, '1');
  } catch {
    /* stockage indisponible : rien n'est mémorisé */
  }
}

export function hasAlert(): boolean {
  try {
    if (localStorage.getItem(ALERT_KEY) === '1') return true;
  } catch {
    /* ignoré */
  }
  return readAlertPlaces().length > 0;
}

function favoritesCount(): number {
  try {
    const v = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(v) ? v.length : 0;
  } catch {
    return 0;
  }
}

export function isSearching(): boolean {
  return readContacted().length > 0 || favoritesCount() > 0 || readSeen().length >= SEEN_MIN;
}

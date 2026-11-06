import { getSupabase } from './supabase';

function sessionId() {
  try {
    let id = sessionStorage.getItem('singulier:sid');
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('singulier:sid', id);
    }
    return id;
  } catch {
    return null;
  }
}

// Enregistre un événement anonyme (aucun cookie, aucune donnée personnelle). Les erreurs sont ignorées.
export function trackEvent(type: 'view' | 'favorite', listingId?: string) {
  try {
    getSupabase()
      .rpc('track_event', {
        p_type: type,
        p_listing: listingId || null,
        p_path: window.location.pathname,
        p_referrer: document.referrer || null,
        p_session: sessionId(),
      })
      .then(() => undefined, () => undefined);
  } catch {
    /* ignoré */
  }
}

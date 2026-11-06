'use client';

import { useEffect } from 'react';
import { getSupabase } from '../lib/supabase';

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

export default function Tracker({ listingId }: { listingId?: string }) {
  useEffect(() => {
    getSupabase()
      .rpc('track_event', {
        p_type: 'view',
        p_listing: listingId || null,
        p_path: window.location.pathname,
        p_referrer: document.referrer || null,
        p_session: sessionId(),
      })
      .then(() => undefined, () => undefined);
  }, [listingId]);
  return null;
}

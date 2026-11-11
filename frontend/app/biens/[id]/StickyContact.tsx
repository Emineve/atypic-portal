'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';

// Barre fixe en bas d'écran sur mobile : prix, appel direct et demande de rappel.
export default function StickyContact({
  price,
  phone,
  listingId,
}: {
  price: string;
  phone?: string | null;
  listingId?: string;
}) {
  const [hidden, setHidden] = useState(false);

  // On masque la barre quand le formulaire est déjà à l'écran
  useEffect(() => {
    const target = document.getElementById('contact');
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.2 });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  function trackCall() {
    if (!listingId) return;
    let sid: string | null = null;
    try {
      sid = sessionStorage.getItem('singulier:sid');
    } catch {
      sid = null;
    }
    getSupabase()
      .rpc('track_event', {
        p_type: 'phone',
        p_listing: listingId,
        p_path: window.location.pathname,
        p_referrer: document.referrer || null,
        p_session: sid,
      })
      .then(() => undefined, () => undefined);
  }

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-3 transition-transform duration-300 ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <p className="font-serif text-lg text-stone-900 whitespace-nowrap">{price}</p>
      <div className="flex items-center gap-2">
        {phone && (
          <a
            href={`tel:${phone.replace(/[^+\d]/g, '')}`}
            onClick={trackCall}
            className="h-12 px-4 inline-flex items-center gap-2 border border-stone-900 text-stone-900 text-xs font-semibold uppercase tracking-wider"
          >
            <Phone className="w-4 h-4" />
                        Contacter l&apos;agent
          </a>
        )}
        <a
          href="#contact"
          className="h-12 px-4 inline-flex items-center bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
        >
          Rappelez-moi
        </a>
      </div>
    </div>
  );
}

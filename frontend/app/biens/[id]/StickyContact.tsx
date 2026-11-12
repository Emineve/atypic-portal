'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { whatsappLink, WHATSAPP_BUTTON, WHATSAPP_ICON_PATH } from './whatsapp';

// Barre fixe en bas d'écran sur mobile : WhatsApp (ou appel si le numéro n'est pas un portable) et demande de rappel.
export default function StickyContact({
  phone,
  listingId,
  contactName,
  title,
  reference,
}: {
  phone?: string | null;
  listingId?: string;
  contactName?: string | null;
  title?: string | null;
  reference?: string | null;
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

  const btn =
    'min-w-0 h-12 px-2 inline-flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wide whitespace-nowrap transition';
  const wa = listingId ? whatsappLink({ phone, contactName, title, reference, listingId }) : null;

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200 px-4 py-3 flex items-center gap-2 transition-transform duration-300 ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" onClick={trackCall} className={`${btn} flex-[1.5] ${WHATSAPP_BUTTON}`}>
          <svg viewBox="0 0 24 24" className="w-4 h-4 flex-none" fill="currentColor" aria-hidden="true">
            <path d={WHATSAPP_ICON_PATH} />
          </svg>
          Contacter sur WhatsApp
        </a>
      ) : phone ? (
        <a
          href={`tel:${phone.replace(/[^+\d]/g, '')}`}
          onClick={trackCall}
          className={`${btn} flex-[1.5] bg-stone-900 text-white active:bg-stone-700`}
        >
          <Phone className="w-4 h-4 flex-none" />
          Appeler l&apos;agent
        </a>
      ) : null}
      <a href="#contact" className={`${btn} flex-1 border border-stone-900 bg-white text-stone-900 active:bg-stone-100`}>
        Être rappelé(e)
      </a>
    </div>
  );
}

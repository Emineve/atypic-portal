'use client';

import { useEffect, useState } from 'react';
import { Phone, PhoneIncoming } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { whatsappLink, WHATSAPP_BUTTON, WHATSAPP_ICON_PATH } from './whatsapp';

// Boutons flottants en bas d'écran sur mobile, dans le même esprit que « Créer mon alerte » sur l'accueil : WhatsApp (ou appel si le numéro n'est pas un portable) et demande de rappel.
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
    'pointer-events-auto h-12 px-5 inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-wider shadow-lg transition';
  const wa = listingId ? whatsappLink({ phone, contactName, title, reference, listingId }) : null;

  return (
    <div
      className={`lg:hidden fixed inset-x-0 z-40 flex items-center justify-center gap-2 px-4 pointer-events-none transition duration-300 ${hidden ? 'translate-y-[200%] opacity-0' : 'translate-y-0 opacity-100'}`}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" onClick={trackCall} className={`${btn} ${WHATSAPP_BUTTON}`}>
          <svg viewBox="0 0 24 24" className="w-4 h-4 flex-none" fill="currentColor" aria-hidden="true">
            <path d={WHATSAPP_ICON_PATH} />
          </svg>
          WhatsApp
        </a>
      ) : phone ? (
        <a
          href={`tel:${phone.replace(/[^+\d]/g, '')}`}
          onClick={trackCall}
          className={`${btn} bg-white text-stone-900 active:bg-stone-100`}
        >
          <Phone className="w-4 h-4 flex-none" />
          Appeler
        </a>
      ) : null}
      <a href="#contact" className={`${btn} bg-stone-900 text-white active:bg-stone-700`}>
        <PhoneIncoming className="w-4 h-4 flex-none" />
        Être rappelé(e)
      </a>
    </div>
  );
}

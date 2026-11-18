'use client';

import { useEffect, useState } from 'react';
import { PhoneIncoming } from 'lucide-react';

// Bouton flottant en bas d'écran sur mobile, dans le même esprit que « Créer mon alerte » sur l'accueil : demande de rappel uniquement.
export default function StickyContact() {
  const [hidden, setHidden] = useState(false);

  // On masque le bouton quand le formulaire est déjà à l'écran
  useEffect(() => {
    const target = document.getElementById('contact');
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.2 });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 z-40 flex items-center justify-center px-4 pointer-events-none transition duration-300 ${hidden ? 'translate-y-[200%] opacity-0' : 'translate-y-0 opacity-100'}`}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href="#contact"
        className="pointer-events-auto h-12 px-5 inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-wider shadow-lg transition bg-white text-stone-900 border border-stone-900 active:bg-stone-100"
      >
        <PhoneIncoming className="w-4 h-4 flex-none" />
        Être rappelé(e)
      </a>
    </div>
  );
}

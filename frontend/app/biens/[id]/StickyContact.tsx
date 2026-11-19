'use client';

import { useEffect, useState } from 'react';
import { PhoneIncoming } from 'lucide-react';

// Bouton flottant en bas d'écran sur mobile, dans le même esprit que « Créer mon alerte » sur l'accueil : demande de rappel uniquement.
export default function StickyContact() {
  const [hidden, setHidden] = useState(true);

  // Le bouton n'apparaît qu'une fois le formulaire de contact dépassé : en haut de fiche il cacherait le prix,
  // et à côté du formulaire il ferait doublon.
  useEffect(() => {
    const target = document.getElementById('contact');
    if (!target) return;
    const update = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 420;
      setHidden(target.getBoundingClientRect().bottom > 0 || nearEnd);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 z-40 flex items-center justify-center px-4 pointer-events-none transition duration-300 ${hidden ? 'translate-y-[200%] opacity-0' : 'translate-y-0 opacity-100'}`}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href="#contact"
        className="pointer-events-auto h-12 px-6 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-wider shadow-lg transition bg-stone-900 text-white active:bg-stone-700"
      >
        <PhoneIncoming className="w-4 h-4 flex-none" />
        Être rappelé(e)
      </a>
    </div>
  );
}

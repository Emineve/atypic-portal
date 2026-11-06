'use client';

import { useEffect, useState } from 'react';

// Barre fixe en bas d'écran sur mobile : prix + accès direct au formulaire de contact.
export default function StickyContact({ price }: { price: string }) {
  const [hidden, setHidden] = useState(false);

  // On masque la barre quand le formulaire est déjà à l'écran
  useEffect(() => {
    const target = document.getElementById('contact');
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.2 });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-4 transition-transform duration-300 ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <p className="font-serif text-xl text-stone-900">{price}</p>
      <a
        href="#contact"
        className="h-12 px-6 inline-flex items-center bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider"
      >
        Contacter l&apos;agence
      </a>
    </div>
  );
}

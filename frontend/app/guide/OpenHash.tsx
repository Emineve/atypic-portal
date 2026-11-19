'use client';

import { useEffect } from 'react';

// Arrivée depuis la recherche sur une question précise (#q-...) : la question se déplie et vient à l'écran.
export default function OpenHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith('q-')) return;
      const el = document.getElementById(id);
      if (!el) return;
      if (el instanceof HTMLDetailsElement) el.open = true;
      el.scrollIntoView({ block: 'start' });
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []);
  return null;
}

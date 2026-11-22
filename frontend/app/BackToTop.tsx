'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Retour en haut de page : un petit bouton rond, en bas à droite, qui n'apparaît qu'après un long défilement.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    function check() {
      frame = 0;
      setShow(window.scrollY > 1400);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(check);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    check();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function up() {
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={up}
      aria-label="Revenir en haut de la page"
      title="Haut de page"
      tabIndex={show ? 0 : -1}
      className={`fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-900 shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition hover:border-stone-900 md:right-6 ${show ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.75} />
    </button>
  );
}

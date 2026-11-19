'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';

const KEY = 'loftissime:mode-emploi';

// Après un clic depuis le mode d'emploi, un bouton flottant permet d'y revenir d'un geste.
// Il reste le temps de la visite, et se ferme avec la croix.
export default function ModeEmploiReturn() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (pathname === '/mode-d-emploi') {
        sessionStorage.setItem(KEY, '1');
        setShow(false);
      } else {
        setShow(sessionStorage.getItem(KEY) === '1');
      }
    } catch {
      setShow(false);
    }
  }, [pathname]);

  if (!show) return null;
  return (
    <div className="fixed left-4 top-[4.75rem] z-40 flex items-center rounded-full bg-stone-900 text-white shadow-lg">
      <a href="/mode-d-emploi" className="inline-flex h-10 items-center gap-2 pl-4 pr-2 text-xs font-semibold uppercase tracking-wider">
        <ArrowLeft className="h-3.5 w-3.5" />
        Mode d&apos;emploi
      </a>
      <button
        type="button"
        aria-label="Masquer le retour au mode d'emploi"
        onClick={() => {
          try {
            sessionStorage.removeItem(KEY);
          } catch {}
          setShow(false);
        }}
        className="flex h-10 w-9 items-center justify-center text-stone-400 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

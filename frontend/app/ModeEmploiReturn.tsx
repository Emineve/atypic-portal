'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';

const KEY = 'loftissime:mode-emploi';

// Après un clic depuis le mode d'emploi, une ligne discrète en haut de page permet d'y revenir.
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
    <div className="flex items-center justify-center gap-3 border-b border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-700">
      <a href="/mode-d-emploi" className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-stone-400 hover:text-stone-900">
        <ArrowLeft className="h-3.5 w-3.5" />
        Revenir au mode d&apos;emploi
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
        className="text-stone-400 hover:text-stone-900"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

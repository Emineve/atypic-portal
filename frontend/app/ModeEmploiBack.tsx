'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export const MODE_EMPLOI_KEY = 'loftissime:mode-emploi';

// Lien « ← Mode d'emploi » affiché dans l'en-tête quand on vient d'une étape du mode d'emploi :
// on y retourne d'un clic, à l'étape où l'on s'était arrêté. Il ne s'affiche que sur la page ouverte depuis le mode
// d'emploi : dès que l'on va ailleurs, il disparaît pour de bon.
export function useFromModeEmploi(): boolean {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(MODE_EMPLOI_KEY);
      const path = window.location.pathname;
      if (saved === null || path === '/mode-d-emploi') return setShow(false);
      if (saved.split('|')[1] === path) return setShow(true);
      sessionStorage.removeItem(MODE_EMPLOI_KEY);
      setShow(false);
    } catch {
      setShow(false);
    }
  }, []);
  return show;
}

export default function ModeEmploiBack({ className = '' }: { className?: string }) {
  const show = useFromModeEmploi();
  if (!show) return null;
  return (
    <a
      href="/mode-d-emploi"
      className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition whitespace-nowrap ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      Mode d&apos;emploi
    </a>
  );
}

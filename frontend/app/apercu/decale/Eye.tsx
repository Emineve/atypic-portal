'use client';

import { useEffect, useRef, useState } from 'react';

// Le « o » de Loftissime, qui regarde : la pupille suit le curseur (ou le doigt), l'œil cligne quand on le lui demande.
// Page de travail : rien de ceci n'est encore sur le site.
export function EyeO({ size = 64, closed = false, blink = 0, ink = '#3A2E2A', iris = '#ffffff', letter = false }: { size?: number; closed?: boolean; blink?: number; ink?: string; iris?: string; letter?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [p, setP] = useState({ x: 6, y: -4 });
  const [shut, setShut] = useState(false);

  useEffect(() => {
    function move(e: PointerEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 160) * 9;
      setP({ x: (dx / d) * reach, y: (dy / d) * reach });
    }
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    if (!blink) return;
    setShut(true);
    const t = setTimeout(() => setShut(false), 180);
    return () => clearTimeout(t);
  }, [blink]);

  const isShut = closed || shut;
  return (
    <svg
      ref={ref}
      viewBox={letter ? '10 10 44 44' : '0 0 64 64'}
      {...(letter ? { style: { width: '0.6em', height: '0.6em' } } : { width: size, height: size })}
      aria-hidden="true"
      className={letter ? 'inline-block mx-[0.03em] translate-y-[0.02em]' : 'inline-block'}
    >
      <circle cx="32" cy="32" r="22" fill={ink} />
      {isShut ? (
        <path d="M18 34 Q32 44 46 34" fill="none" stroke={iris} strokeWidth="4" strokeLinecap="round" />
      ) : (
        <circle cx={32 + p.x} cy={32 + p.y} r="9.5" fill={iris} style={{ transition: 'cx 80ms linear, cy 80ms linear' }} />
      )}
    </svg>
  );
}

// Démonstration : le logo, un cœur à toucher, la page d'erreur
export default function EyeDemo() {
  const [blink, setBlink] = useState(0);
  const [fav, setFav] = useState(false);
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-[14px] border border-stone-200 bg-white p-8 flex flex-col items-center justify-center gap-4 min-h-[220px]">
        <span className="font-logo font-semibold lowercase tracking-tight leading-none text-stone-900 text-5xl md:text-6xl whitespace-nowrap">
          l<EyeO letter blink={blink} />ftissime.
        </span>
        <p className="text-sm text-stone-600 text-center">Bougez la souris : il vous suit du regard.</p>
      </div>
      <div className="rounded-[14px] border border-stone-200 bg-white p-8 flex flex-col items-center justify-center gap-4 min-h-[220px]">
        <div className="flex items-center gap-5">
          <EyeO size={72} blink={blink} />
          <button
            type="button"
            onClick={() => { setFav((v) => !v); setBlink((n) => n + 1); }}
            aria-pressed={fav}
            className={`h-12 px-5 rounded-full border text-sm font-medium transition ${fav ? 'bg-[#F6CF4E] border-[#F6CF4E] text-stone-900' : 'bg-white border-stone-300 text-stone-900 hover:border-stone-900'}`}
          >
            {fav ? 'Dans mes favoris' : 'Ajouter aux favoris'}
          </button>
        </div>
        <p className="text-sm text-stone-600 text-center">Touchez le bouton : il cligne.</p>
      </div>
      <div className="rounded-[14px] border border-stone-200 bg-white p-8 flex flex-col items-center justify-center gap-3 min-h-[220px]">
        <EyeO size={72} closed />
        <p className="font-serif text-2xl text-stone-900 text-center">Cette page n’existe pas.</p>
        <p className="text-sm text-stone-600 text-center">Sur la page d’erreur, il ferme l’œil.</p>
      </div>
    </div>
  );
}

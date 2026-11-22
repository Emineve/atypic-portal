'use client';

import { useEffect, useRef } from 'react';

// Le « o » de Loftissime, qui regarde : la pupille suit le curseur ou le doigt, et l'œil cligne
// quand la page le lui demande (ajout d'un favori). « letter » : à la taille d'une lettre, dans le logo.
export const BLINK_EVENT = 'loftissime:clin';

export function blink() {
  try {
    window.dispatchEvent(new Event(BLINK_EVENT));
  } catch {
    /* sans importance */
  }
}

export default function EyeO({
  size = 64,
  closed = false,
  letter = false,
  ink = '#211C15',
  iris = '#ffffff',
}: {
  size?: number;
  closed?: boolean;
  letter?: boolean;
  ink?: string;
  iris?: string;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const pupil = useRef<SVGCircleElement>(null);
  const lid = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (closed) return;
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let x = 0;
    let y = 0;

    function place() {
      frame = 0;
      const el = svg.current;
      const p = pupil.current;
      if (!el || !p) return;
      const r = el.getBoundingClientRect();
      const dx = x - (r.left + r.width / 2);
      const dy = y - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 160) * 9;
      p.setAttribute('cx', String(32 + (dx / d) * reach));
      p.setAttribute('cy', String(32 + (dy / d) * reach));
    }
    function move(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(place);
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    function wink() {
      const p = pupil.current;
      const l = lid.current;
      if (!p || !l) return;
      p.style.visibility = 'hidden';
      l.style.visibility = 'visible';
      clearTimeout(timer);
      timer = setTimeout(() => {
        p.style.visibility = 'visible';
        l.style.visibility = 'hidden';
      }, 200);
    }

    if (!calm) window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener(BLINK_EVENT, wink);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener(BLINK_EVENT, wink);
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [closed]);

  return (
    <svg
      ref={svg}
      viewBox={letter ? '10 10 44 44' : '0 0 64 64'}
      {...(letter ? { style: { width: '0.6em', height: '0.6em' } } : { width: size, height: size })}
      aria-hidden="true"
      className={letter ? 'inline-block mx-[0.03em] translate-y-[0.02em]' : 'inline-block'}
    >
      <circle cx="32" cy="32" r="22" fill={ink} />
      <circle ref={pupil} cx="38" cy="28" r="9.5" fill={iris} style={{ visibility: closed ? 'hidden' : 'visible' }} />
      <path ref={lid} d="M18 34 Q32 44 46 34" fill="none" stroke={iris} strokeWidth="4" strokeLinecap="round" style={{ visibility: closed ? 'visible' : 'hidden' }} />
    </svg>
  );
}

// Silhouettes dessinées pour Loftissime : une par profil d'acheteur. Trait fin, sans visage, un seul accessoire.
export type BuyerKind = 'decide' | 'reveur' | 'architecture';

const INK = '#1c1917';
const YELLOW = '#F4E7B5';

// Un manteau long, des épaules aux genoux
function Coat({ x }: { x: number }) {
  return (
    <>
      <path d={`M${x - 6.5} 20 Q${x} 16.5 ${x + 6.5} 20 L${x + 8.5} 47 H${x - 8.5} Z`} fill={YELLOW} />
      <path d={`M${x - 2.6} 18.6 L${x} 24 L${x + 2.6} 18.6`} />
      <path d={`M${x} 24 V47`} strokeWidth="1" />
    </>
  );
}

export default function BuyerFigure({ kind, className = '' }: { kind: BuyerKind; className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'decide' && (
        <>
          {/* Il avance d'un bon pas, la clé déjà en main */}
          <path d="M28 47 L22.5 63.5 M35 47 L41.5 63.5" />
          <path d="M19.5 63.5 h5.5 M39.5 63.5 h5.5" />
          <path d="M25.5 22 L20.5 36" />
          <Coat x={31.5} />
          <circle cx="31.5" cy="10.5" r="4.6" fill="#fff" />
          <path d="M37.5 22 L48.5 30.5" />
          <circle cx="52" cy="32.2" r="3.1" fill={YELLOW} />
          <path d="M55 33 L64.5 35.4 M61 34.5 v3 M63.6 35.2 v2.3" />
        </>
      )}
      {kind === 'reveur' && (
        <>
          {/* Mains dans les poches, la tête levée vers la maison qu'il imagine */}
          <path d="M27 47 V63.5 M34 47 V63.5" />
          <path d="M24 63.5 h5.5 M32 63.5 h5.5" />
          <Coat x={30.5} />
          <path d="M24.5 22 L22.5 35 L26 38.5 M36.5 22 L38.5 35 L35 38.5" />
          <circle cx="32" cy="10" r="4.6" fill="#fff" />
          <path d="M38.5 7 Q44 1.5 50 6.5" strokeDasharray="0.5 3.2" strokeWidth="1.8" />
          <path d="M53 18 V9.5 L60 4.5 L67 9.5 V18 Z" fill={YELLOW} />
          <path d="M58.3 18 v-4.2 h3.4 V18" />
        </>
      )}
      {kind === 'architecture' && (
        <>
          {/* Lunettes rondes, un plan roulé sous le bras */}
          <path d="M28 47 V63.5 M35 47 V63.5" />
          <path d="M25 63.5 h5.5 M33 63.5 h5.5" />
          <path d="M25.5 22 L22 37" />
          <Coat x={31.5} />
          <circle cx="31.5" cy="10.5" r="4.6" fill="#fff" />
          <circle cx="29.7" cy="10.4" r="1.5" strokeWidth="1" />
          <circle cx="33.3" cy="10.4" r="1.5" strokeWidth="1" />
          <g transform="rotate(22 47 36)">
            <rect x="44" y="17" width="6" height="36" rx="3" fill="#fff" />
            <path d="M44 22.5 h6 M44 47.5 h6" strokeWidth="1" />
          </g>
          <path d="M37.5 22 L43.5 33.5" />
        </>
      )}
    </svg>
  );
}

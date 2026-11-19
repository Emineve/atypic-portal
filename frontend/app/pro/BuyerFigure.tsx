// Petits personnages dessinés pour Loftissime : un par profil d'acheteur.
export type BuyerKind = 'decide' | 'reveur' | 'architecture';

const INK = '#1c1917';
const YELLOW = '#F4E7B5';

export default function BuyerFigure({ kind, className = '' }: { kind: BuyerKind; className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'decide' && (
        <>
          {/* Il marche d'un bon pas, les clés déjà en main */}
          <path d="M30 47 L23 63 M38 47 L46 63" />
          <path d="M20 63 h6 M43 63 h6" />
          <rect x="24" y="24" width="20" height="24" rx="7" fill={YELLOW} />
          <circle cx="34" cy="14" r="7.5" fill="#fff" />
          <path d="M31 13.5 h.01 M37 13.5 h.01" strokeWidth="2.4" />
          <path d="M31.5 17 q2.5 2 5 0" />
          <path d="M24 30 L16 38" />
          <path d="M44 30 L53 33" />
          <circle cx="57" cy="34" r="3.2" fill={YELLOW} />
          <path d="M60 35 L67 37 M64 36.2 v3 M66.5 37 v2.4" />
        </>
      )}
      {kind === 'reveur' && (
        <>
          {/* Il lève les yeux et imagine déjà la verrière */}
          <path d="M31 47 V63 M39 47 V63" />
          <path d="M27 63 h6 M37 63 h6" />
          <rect x="25" y="24" width="20" height="24" rx="7" fill={YELLOW} />
          <circle cx="35" cy="14" r="7.5" fill="#fff" />
          <path d="M31 12.5 q1.5 -1.6 3 0 M36.5 12.5 q1.5 -1.6 3 0" />
          <path d="M32.5 17 q2.5 2 5 0" />
          <path d="M25 30 L19 40 M45 30 L51 40" />
          <circle cx="46" cy="8" r="1.3" />
          <circle cx="51" cy="5" r="2" />
          <path d="M56 12 v-7 l6 -4 l6 4 v7 z" fill={YELLOW} />
          <path d="M60.5 12 v-3.5 h3 v3.5" />
        </>
      )}
      {kind === 'architecture' && (
        <>
          {/* Lunettes rondes et plan roulé sous le bras */}
          <path d="M31 47 V63 M39 47 V63" />
          <path d="M27 63 h6 M37 63 h6" />
          <rect x="25" y="24" width="20" height="24" rx="7" fill={YELLOW} />
          <circle cx="35" cy="14" r="7.5" fill="#fff" />
          <circle cx="32" cy="13.5" r="2.4" />
          <circle cx="38" cy="13.5" r="2.4" />
          <path d="M34.4 13.5 h1.2" />
          <path d="M33 18 q2 1.4 4 0" />
          <path d="M25 30 L19 40" />
          <g transform="rotate(24 49 38)">
            <rect x="46" y="22" width="6.5" height="30" rx="3.2" fill="#fff" />
            <path d="M46 27 h6.5" />
          </g>
          <path d="M45 31 L50 39" />
        </>
      )}
    </svg>
  );
}

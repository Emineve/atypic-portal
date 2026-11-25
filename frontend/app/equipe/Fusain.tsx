// Les portraits de l'équipe, façon caricature au fusain. Ce sont des dessins inventés, en attendant les vrais :
// ils ne représentent personne, seul l'accessoire dit le métier.

export type FusainKind = 'visite' | 'architecte' | 'entrepreneur' | 'courtier' | 'notaire' | 'negociateur';

const INK = '#2b2622';
const trait = { fill: 'none', stroke: INK, strokeWidth: 4.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const fin = { ...trait, strokeWidth: 2.5 };
const plein = { fill: INK, stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const };

// Les hachures d'ombre, sous le menton et sur l'épaule
function Ombres() {
  return (
    <g {...fin} opacity={0.45}>
      <path d="M84 150 l14 12 M92 146 l14 14 M100 146 l12 12" />
      <path d="M40 206 l18 -16 M50 210 l18 -16 M60 212 l16 -14" />
    </g>
  );
}

// Le buste commun : grosse tête, petit corps, comme dans une caricature
function Buste({ col }: { col?: React.ReactNode }) {
  return (
    <g>
      <path d="M28 220 c2 -34 28 -48 56 -52 l32 0 c28 4 54 18 56 52" {...trait} />
      <path d="M86 150 l-2 20 M114 150 l2 20" {...trait} />
      {col}
      <path d="M52 92 c-6 -52 18 -74 48 -74 s54 22 48 74 c-4 36 -24 60 -48 60 s-44 -24 -48 -60 z" {...trait} fill="#fbf7ef" />
      <Ombres />
    </g>
  );
}

function Visage({ yeux = 'ronds', bouche = 'sourire' }: { yeux?: 'ronds' | 'plisses'; bouche?: 'sourire' | 'coin' | 'grand' }) {
  return (
    <g>
      {yeux === 'ronds' ? (
        <g {...plein}>
          <circle cx={82} cy={88} r={3.2} />
          <circle cx={118} cy={88} r={3.2} />
        </g>
      ) : (
        <path d="M74 88 q8 -7 16 0 M110 88 q8 -7 16 0" {...trait} />
      )}
      <path d="M72 74 q10 -7 20 -2 M108 72 q10 -5 20 2" {...fin} />
      <path d="M101 92 q-9 16 -3 20 q5 2 9 -1" {...fin} />
      {bouche === 'sourire' && <path d="M82 124 q18 13 36 0" {...trait} />}
      {bouche === 'coin' && <path d="M84 124 q16 6 32 -5" {...trait} />}
      {bouche === 'grand' && <path d="M80 120 q20 22 40 0 z" {...trait} fill="#fbf7ef" />}
    </g>
  );
}

const DESSINS: Record<FusainKind, () => JSX.Element> = {
  // celle qui filme : un carré long, un téléphone tenu devant elle
  visite: () => (
    <g>
      <path d="M46 132 c-14 -60 6 -122 54 -122 s70 60 54 124 c-2 -30 -8 -64 -22 -82 c-22 14 -52 16 -70 6 c-10 18 -14 44 -16 74 z" {...plein} />
      <Buste />
      <path d="M62 60 c22 12 52 8 70 -8" {...trait} />
      <Visage bouche="grand" />
      <rect x={136} y={150} width={34} height={56} rx={6} {...trait} fill="#fbf7ef" />
      <circle cx={153} cy={166} r={6} {...fin} />
      <path d="M128 196 q10 -8 12 -22" {...trait} />
    </g>
  ),
  // l'architecte : lunettes rondes, col roulé, crayon sur l'oreille
  architecte: () => (
    <g>
      <Buste col={<path d="M80 166 q20 14 40 0 l2 12 q-22 14 -44 0 z" {...plein} />} />
      <path d="M54 70 c0 -34 20 -52 46 -52 s46 18 46 52 c-12 -20 -28 -30 -46 -30 s-34 10 -46 30 z" {...plein} />
      <Visage yeux="ronds" bouche="coin" />
      <circle cx={82} cy={88} r={14} {...trait} />
      <circle cx={118} cy={88} r={14} {...trait} />
      <path d="M96 86 q4 -4 8 0 M68 86 l-14 -6 M132 86 l14 -6" {...fin} />
      <path d="M146 52 l22 44" {...trait} />
      <path d="M168 96 l3 9 l-8 -5 z" {...plein} />
    </g>
  ),
  // l'entrepreneur : casque de chantier, moustache
  entrepreneur: () => (
    <g>
      <Buste />
      <Visage yeux="plisses" bouche="sourire" />
      <path d="M78 112 q11 -10 22 -1 q11 -9 22 1 q-11 8 -22 2 q-11 6 -22 -2 z" {...plein} />
      <path d="M46 66 c0 -36 24 -56 54 -56 s54 20 54 56 z" {...trait} fill="#fbf7ef" />
      <path d="M36 66 h128 M100 10 v56 M76 16 q-6 22 -6 50 M124 16 q6 22 6 50" {...trait} />
    </g>
  ),
  // le courtier : raie sur le côté, cravate, une calculette
  courtier: () => (
    <g>
      <Buste col={<path d="M100 170 l-9 12 l9 36 l9 -36 z" {...plein} />} />
      <path d="M52 78 c-4 -42 20 -62 50 -62 c26 0 44 16 46 46 c-18 -18 -48 -24 -78 -12 c-10 6 -16 16 -18 28 z" {...plein} />
      <Visage yeux="ronds" bouche="sourire" />
      <path d="M80 168 l20 14 l20 -14" {...trait} />
      <rect x={26} y={160} width={40} height={52} rx={5} {...trait} fill="#fbf7ef" />
      <path d="M33 170 h26 M35 184 h4 M44 184 h4 M53 184 h4 M35 194 h4 M44 194 h4 M53 194 h4 M35 204 h4 M44 204 h4 M53 204 h4" {...fin} />
    </g>
  ),
  // le notaire : chignon, lunettes en demi-lune, un acte sous le bras
  notaire: () => (
    <g>
      <circle cx={100} cy={12} r={14} {...plein} />
      <Buste />
      <path d="M52 84 c-6 -44 18 -66 48 -66 s54 22 48 66 c-8 -26 -24 -42 -48 -42 s-40 16 -48 42 z" {...plein} />
      <Visage yeux="plisses" bouche="coin" />
      <path d="M68 96 q14 16 28 0 M104 96 q14 16 28 0 M96 97 h8" {...trait} />
      <path d="M132 158 l36 -8 l8 60 l-36 8 z" {...trait} fill="#fbf7ef" />
      <path d="M142 170 l22 -5 M144 182 l22 -5 M146 194 l14 -3" {...fin} />
    </g>
  ),
  // le négociateur : mèche en bataille, col ouvert, un trousseau de clés
  negociateur: () => (
    <g>
      <Buste col={<path d="M82 166 l18 20 l18 -20" {...trait} />} />
      <path d="M50 80 c-8 -30 6 -58 30 -66 l-4 12 c10 -12 26 -16 40 -12 l-6 8 c22 0 38 22 40 58 c-10 -22 -22 -34 -40 -38 c-22 -4 -44 8 -60 38 z" {...plein} />
      <Visage yeux="ronds" bouche="grand" />
      <circle cx={42} cy={168} r={11} {...trait} />
      <path d="M42 179 v34 M42 196 h10 M42 206 h8 M50 174 l12 30 M58 196 l8 -3" {...trait} />
    </g>
  ),
};

export default function Fusain({ kind, className = '' }: { kind: FusainKind; className?: string }) {
  const Dessin = DESSINS[kind];
  const id = `fusain-${kind}`;
  return (
    <svg viewBox="0 0 200 224" className={className} role="img" aria-hidden="true">
      <defs>
        {/* le grain du fusain : le trait tremble, et la matière s'accroche inégalement au papier */}
        <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={kind.length} result="vague" />
          <feDisplacementMap in="SourceGraphic" in2="vague" scale={5} result="tremble" />
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves={2} seed={3} result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.75" result="trous" />
          <feComposite in="tremble" in2="trous" operator="in" />
        </filter>
      </defs>
      <rect width={200} height={224} fill="#fbf7ef" />
      <g filter={`url(#${id})`}>
        <Dessin />
      </g>
    </svg>
  );
}

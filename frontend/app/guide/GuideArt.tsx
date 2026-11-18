// Illustrations de « L'état des lieux » : des coupes d'architecte dessinées pour Loftissime.
// Dessins originaux (aucune photo, aucun droit à demander), aux couleurs du site.

export type GuideArtKey = 'souplex' | 'loft' | 'plans' | 'peniche' | 'mezzanine';

const INK = '#1c1917';
const SUN = '#F4E7B5';
const PAPER = '#ffffff';
const SHADE = '#E9D892';

const line = { fill: 'none', stroke: INK, strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const thin = { ...line, strokeWidth: 2 };
const dash = { ...thin, strokeDasharray: '8 8' };

function Plant({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 14} ${y} h28 l-5 26 h-18 z`} fill={PAPER} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <path d={`M${x} ${y} c-2 -22 -20 -30 -26 -44 M${x} ${y} c0 -26 4 -40 2 -60 M${x} ${y} c4 -20 20 -26 28 -40`} {...thin} />
    </g>
  );
}

function Sofa({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y - 34} width={120} height={34} rx={6} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect x={x - 10} y={y - 50} width={18} height={50} rx={6} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect x={x + 112} y={y - 50} width={18} height={50} rx={6} fill={PAPER} stroke={INK} strokeWidth={2} />
    </g>
  );
}

function Lamp({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y} v54`} {...thin} />
      <path d={`M${x - 22} ${y + 78} h44 l-10 -24 h-24 z`} fill={PAPER} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    </g>
  );
}

function Souplex() {
  return (
    <>
      {/* terre */}
      <rect x={0} y={250} width={1200} height={250} fill={SHADE} />
      <path d="M0 250 H330 M870 250 H1200" {...line} />
      {[60, 140, 220, 950, 1030, 1110].map((x) => (
        <path key={x} d={`M${x} 290 l24 -24 M${x + 30} 380 l24 -24 M${x - 10} 450 l24 -24`} {...thin} />
      ))}
      {/* cour anglaise */}
      <path d="M330 250 V440 H400" {...line} />
      <rect x={333} y={252} width={67} height={186} fill={SUN} />
      <path d="M345 120 L372 250 M385 110 L392 250" {...dash} />
      {/* volume */}
      <rect x={400} y={70} width={470} height={370} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M400 250 H640 M760 250 H870" {...line} />
      {/* fenêtres */}
      <rect x={400} y={110} width={6} height={100} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={400} y={290} width={6} height={110} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* escalier */}
      <path d="M640 250 h24 v32 h24 v32 h24 v32 h24 v32 h24 v32 h24 v28" {...line} />
      <path d="M640 250 v-46 l150 190" {...thin} />
      {/* mobilier */}
      <Sofa x={450} y={250} />
      <Lamp x={820} y={70} />
      <Plant x={835} y={224} />
      <rect x={440} y={398} width={150} height={42} rx={4} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M440 398 v-26 h50 v26" {...thin} />
      <Lamp x={520} y={250} />
      {/* soleil */}
      <circle cx={210} cy={110} r={34} fill={PAPER} stroke={INK} strokeWidth={3} />
    </>
  );
}

function Loft() {
  const bars = [0, 1, 2, 3, 4, 5, 6];
  return (
    <>
      <path d="M0 440 H1200" {...line} />
      {/* immeuble */}
      <rect x={250} y={60} width={700} height={380} fill={PAPER} stroke={INK} strokeWidth={3} />
      {/* enseigne effacée */}
      <rect x={300} y={92} width={600} height={46} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M330 115 H560 M590 115 H700" {...dash} />
      {/* grande vitrine devenue verrière */}
      <rect x={300} y={168} width={430} height={272} fill={SUN} stroke={INK} strokeWidth={3} />
      {bars.map((i) => (
        <path key={i} d={`M${300 + (430 / 7) * (i + 1)} 168 V440`} {...thin} />
      ))}
      <path d="M300 258 H730 M300 348 H730" {...thin} />
      {/* porte */}
      <rect x={770} y={220} width={130} height={220} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={790} y={240} width={90} height={110} fill={SUN} stroke={INK} strokeWidth={2} />
      <circle cx={786} cy={370} r={4} fill={INK} />
      {/* store relevé */}
      <path d="M300 168 l-26 28 M730 168 l26 28 M274 196 H756" {...thin} />
      {/* trottoir */}
      <Plant x={180} y={414} />
      <Plant x={1010} y={414} />
      <path d="M1060 440 v-170 M1040 270 h40" {...line} />
      <circle cx={1060} cy={262} r={14} fill={PAPER} stroke={INK} strokeWidth={3} />
    </>
  );
}

function Plans() {
  return (
    <>
      {/* feuille */}
      <rect x={210} y={50} width={780} height={400} fill={PAPER} stroke={INK} strokeWidth={3} />
      {/* murs */}
      <path d="M270 110 H930 V390 H270 Z" {...line} strokeWidth={6} />
      <path d="M520 110 V230 M520 290 V390 M270 250 H420 M760 110 V200" {...line} strokeWidth={6} />
      {/* cloison abattue */}
      <path d="M760 200 V390" {...dash} strokeWidth={4} />
      {/* portes */}
      <path d="M520 230 a60 60 0 0 1 60 60" {...thin} />
      <path d="M420 250 a50 50 0 0 0 50 -50" {...thin} />
      {/* fenêtres */}
      <path d="M330 110 h110 M600 390 h130 M930 180 v120" stroke={SUN} strokeWidth={8} />
      <path d="M330 110 h110 M600 390 h130 M930 180 v120" {...thin} />
      {/* cotes */}
      <path d="M270 420 H930 M270 412 v16 M930 412 v16" {...thin} />
      {/* zone ajoutée */}
      <rect x={770} y={120} width={150} height={260} fill={SUN} opacity={0.9} />
      <path d="M760 200 V390" {...dash} strokeWidth={4} />
      {/* tampon */}
      <g transform="rotate(-14 845 250)">
        <circle cx={845} cy={250} r={62} fill="none" stroke={INK} strokeWidth={4} />
        <circle cx={845} cy={250} r={50} fill="none" stroke={INK} strokeWidth={2} />
        <text x={845} y={272} textAnchor="middle" fontSize={64} fontFamily="Georgia, serif" fill={INK}>?</text>
      </g>
      {/* crayon */}
      <g transform="rotate(32 1080 330)">
        <rect x={1060} y={180} width={26} height={200} fill={PAPER} stroke={INK} strokeWidth={3} />
        <path d="M1060 380 l13 34 l13 -34 z" fill={INK} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <path d="M1060 210 h26" {...thin} />
      </g>
    </>
  );
}

function Peniche() {
  return (
    <>
      {/* eau */}
      <rect x={0} y={340} width={1200} height={160} fill={SHADE} />
      {[370, 410, 450].map((y, i) => (
        <path key={y} d={`M${40 + i * 30} ${y} q20 -12 40 0 t40 0 t40 0 M${420 + i * 50} ${y} q20 -12 40 0 t40 0 M${820 + i * 20} ${y} q20 -12 40 0 t40 0 t40 0`} {...thin} />
      ))}
      {/* quai */}
      <path d="M0 300 H150 V500" {...line} />
      <rect x={0} y={302} width={148} height={198} fill={PAPER} />
      <path d="M0 300 H150 V500" {...line} />
      <path d="M118 300 v-26 h18 v26" {...line} />
      <path d="M136 282 Q190 330 250 300" {...thin} />
      {/* coque */}
      <path d="M230 290 H1040 Q1080 290 1100 270 L1070 350 Q1060 372 1030 372 H290 Q250 372 240 340 Z" fill={INK} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M250 318 H1078" stroke={SUN} strokeWidth={3} />
      {/* logement */}
      <rect x={330} y={196} width={560} height={94} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[360, 470, 580, 690].map((x) => (
        <rect key={x} x={x} y={220} width={84} height={44} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <rect x={810} y={214} width={50} height={76} fill={PAPER} stroke={INK} strokeWidth={2} />
      {/* timonerie */}
      <rect x={920} y={176} width={110} height={114} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={936} y={194} width={78} height={40} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M905 176 H1045" {...line} />
      {/* terrasse */}
      <Plant x={420} y={170} />
      <Plant x={470} y={170} />
      <path d="M560 196 v-40 h150 v40 M560 172 h150" {...thin} />
      <path d="M760 196 v-58 M740 138 h40" {...line} />
      {/* soleil */}
      <circle cx={1040} cy={90} r={34} fill={PAPER} stroke={INK} strokeWidth={3} />
    </>
  );
}

function Mezzanine() {
  return (
    <>
      <path d="M0 440 H1200" {...line} />
      {/* volume sous toit */}
      <path d="M300 440 V200 L600 50 L900 200 V440 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* fenêtre de toit */}
      <path d="M690 95 L800 150" stroke={SUN} strokeWidth={12} strokeLinecap="round" />
      <path d="M690 95 L800 150" {...thin} />
      {/* zone sous 1,80 m */}
      <path d="M600 250 H900 V200 L800 150 Z" fill={SUN} />
      <path d="M800 150 V250" {...dash} />
      {/* mezzanine */}
      <path d="M600 250 H900" {...line} strokeWidth={6} />
      <path d="M600 250 v-44 h70 M600 228 h70" {...thin} />
      {/* lit */}
      <rect x={720} y={228} width={150} height={22} rx={4} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect x={842} y={214} width={28} height={14} rx={4} fill={PAPER} stroke={INK} strokeWidth={2} />
      {/* escalier */}
      <path d="M600 250 L500 440 M620 250 L520 440" {...line} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${590 - i * 16} ${270 + i * 30} h20`} {...thin} />
      ))}
      {/* cote de hauteur */}
      <path d="M950 250 V150 M940 250 h20 M940 150 h20" {...thin} />
      <text x={972} y={208} fontSize={26} fontFamily="Georgia, serif" fill={INK}>1,80 m</text>
      {/* salon */}
      <Sofa x={680} y={440} />
      <Plant x={850} y={414} />
      <Lamp x={380} y={200} />
      <rect x={300} y={300} width={6} height={110} fill={SUN} stroke={INK} strokeWidth={2} />
    </>
  );
}

const ART: Record<GuideArtKey, () => JSX.Element> = { souplex: Souplex, loft: Loft, plans: Plans, peniche: Peniche, mezzanine: Mezzanine };

export default function GuideArt({ art, className = '' }: { art: GuideArtKey; className?: string }) {
  const Drawing = ART[art];
  return (
    <svg viewBox="0 0 1200 500" className={className} role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width={1200} height={500} fill={SUN} />
      <Drawing />
    </svg>
  );
}

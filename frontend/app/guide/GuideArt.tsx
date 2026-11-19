// Illustrations de « L'état des lieux » : des coupes d'architecte dessinées pour Loftissime.
// Dessins originaux (aucune photo, aucun droit à demander), aux couleurs du site.

export type GuideArtKey = 'souplex' | 'loft' | 'plans' | 'peniche' | 'mezzanine' | 'visite' | 'terrasse' | 'dpe' | 'credit' | 'duplex' | 'charges' | 'marche' | 'negociation' | 'ventes' | 'offre' | 'annonce' | 'horsmarche' | 'temps' | 'revendre' | 'atypique' | 'mur' | 'monument' | 'architecte' | 'clim' | 'verriere' | 'eglise' | 'atelier' | 'meuble' | 'amiante' | 'bureau' | 'cheminee' | 'assurance' | 'conditions' | 'hotel' | 'dernieretage' | 'chauffage' | 'surelever' | 'plateforme';

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

function Visite() {
  const rows = [150, 205, 260, 315, 370];
  return (
    <>
      <path d="M0 440 H1200" {...line} />
      {/* porte entrouverte */}
      <rect x={190} y={90} width={230} height={350} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M210 110 H400 V440 H210 Z" fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M210 110 L330 140 V440 H210 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={312} cy={290} r={6} fill={INK} />
      <path d="M330 440 L470 470 H330 Z" fill={PAPER} opacity={0.7} />
      <Plant x={500} y={414} />
      {/* liste */}
      <g transform="rotate(4 760 260)">
        <rect x={620} y={70} width={290} height={370} rx={6} fill={PAPER} stroke={INK} strokeWidth={3} />
        <rect x={715} y={52} width={100} height={36} rx={6} fill={INK} />
        {rows.map((y, i) => (
          <g key={y}>
            <rect x={650} y={y - 14} width={28} height={28} fill={i < 3 ? SUN : PAPER} stroke={INK} strokeWidth={2} />
            {i < 3 && <path d={`M656 ${y} l7 8 l12 -16`} {...line} />}
            <path d={`M700 ${y} H${i % 2 ? 840 : 880}`} {...thin} />
          </g>
        ))}
      </g>
      {/* clé */}
      <g transform="rotate(-24 1030 330)">
        <circle cx={1010} cy={330} r={30} fill={PAPER} stroke={INK} strokeWidth={3} />
        <circle cx={1010} cy={330} r={10} fill={SUN} stroke={INK} strokeWidth={2} />
        <path d="M1040 330 H1130 M1100 330 v22 M1122 330 v16" {...line} strokeWidth={5} />
      </g>
      <circle cx={1060} cy={110} r={34} fill={PAPER} stroke={INK} strokeWidth={3} />
    </>
  );
}

function Terrasse() {
  return (
    <>
      {/* ciel et soleil */}
      <circle cx={930} cy={110} r={46} fill={PAPER} stroke={INK} strokeWidth={3} />
      {/* immeuble et toit-terrasse */}
      <rect x={300} y={300} width={600} height={200} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M260 300 H940" {...line} />
      {[360, 480, 600, 720].map((x) => (
        <rect key={x} x={x} y={350} width={70} height={90} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      {/* garde-corps */}
      <path d="M300 300 V240 H900 V300" {...thin} />
      {[340, 380, 420, 780, 820, 860].map((x) => (
        <path key={x} d={`M${x} 240 V300`} {...thin} />
      ))}
      {/* parasol, table, plantes */}
      <path d="M600 130 V300" {...thin} />
      <path d="M490 170 Q600 80 710 170 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M545 262 H655 M565 262 V300 M635 262 V300" {...line} />
      <Plant x={470} y={274} />
      <Plant x={735} y={274} />
    </>
  );
}

function Dpe() {
  const rows: [string, number, string][] = [
    ['A', 150, PAPER],
    ['B', 210, PAPER],
    ['C', 270, PAPER],
    ['D', 330, SHADE],
    ['E', 390, PAPER],
    ['F', 450, PAPER],
    ['G', 510, PAPER],
  ];
  return (
    <>
      <rect x={330} y={70} width={540} height={380} fill={PAPER} stroke={INK} strokeWidth={3} />
      {rows.map(([l, w, c], i) => (
        <g key={l}>
          <path d={`M370 ${100 + i * 46} h${w - 20} l20 17 l-20 17 h-${w - 20} z`} fill={c} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <text x={384} y={124 + i * 46} fontSize={22} fontFamily="Georgia, serif" fill={INK}>{l}</text>
        </g>
      ))}
      <path d="M800 255 h-70 M745 240 l-15 15 l15 15" {...line} />
      <Lamp x={200} y={0} />
      <Plant x={1010} y={424} />
      <path d="M120 450 H1080" {...line} />
    </>
  );
}

function Credit() {
  return (
    <>
      <path d="M120 430 H1080" {...line} />
      {/* maison */}
      <path d="M330 430 V250 L470 150 L610 250 V430 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={440} y={330} width={60} height={100} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={370} y={270} width={50} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={520} y={270} width={50} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* piles de pièces qui montent */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {Array.from({ length: i + 2 }).map((_, j) => (
            <ellipse key={j} cx={720 + i * 86} cy={418 - j * 22} rx={34} ry={11} fill={j % 2 ? SHADE : PAPER} stroke={INK} strokeWidth={2} />
          ))}
        </g>
      ))}
      <path d="M700 330 L790 290 L870 262 L990 200" {...dash} />
      <path d="M990 200 l-26 2 M990 200 l-8 24" {...line} />
    </>
  );
}

function Duplex() {
  return (
    <>
      <rect x={340} y={60} width={520} height={390} fill={PAPER} stroke={INK} strokeWidth={3} />
      {/* plancher percé par la trémie */}
      <path d="M340 255 H560 M700 255 H860" {...line} />
      <path d="M560 255 H700" {...dash} />
      {/* escalier */}
      <path d="M700 450 v-39 h-28 v-39 h-28 v-39 h-28 v-39 h-28 v-39 h-28" {...line} />
      <path d="M560 255 V205 M700 255 V205" {...thin} />
      {/* étage du haut : fenêtre et lit */}
      <rect x={380} y={100} width={90} height={100} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={730} y={215} width={100} height={22} rx={4} fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M730 237 V255 M830 237 V255" {...thin} />
      {/* étage du bas */}
      <Sofa x={390} y={450} />
      <Lamp x={790} y={255} />
      <path d="M200 450 H1000" {...line} />
      <Plant x={270} y={424} />
    </>
  );
}

function Charges() {
  return (
    <>
      <path d="M120 440 H1080" {...line} />
      {/* immeuble */}
      <rect x={280} y={110} width={300} height={330} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[150, 230, 310].map((y) =>
        [320, 400, 480].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={50} height={50} fill={SUN} stroke={INK} strokeWidth={2} />),
      )}
      <rect x={405} y={385} width={50} height={55} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* relevé de charges */}
      <g transform="rotate(6 800 260)">
        <rect x={680} y={100} width={250} height={320} fill={PAPER} stroke={INK} strokeWidth={3} />
        <path d="M710 150 H830" {...line} />
        {[200, 240, 280, 320].map((y) => (
          <g key={y}>
            <path d={`M710 ${y} H820`} {...thin} />
            <path d={`M860 ${y} H900`} {...thin} />
          </g>
        ))}
        <path d="M710 368 H900" {...line} />
        <rect x={840} y={378} width={62} height={22} fill={SHADE} stroke={INK} strokeWidth={2} />
      </g>
    </>
  );
}

function Marche() {
  const bars = [150, 190, 220, 240, 250, 246, 236];
  return (
    <>
      <path d="M200 430 H1000" {...line} />
      <path d="M260 90 V430" {...thin} />
      {bars.map((h, i) => (
        <rect key={i} x={310 + i * 90} y={430 - h} width={56} height={h} fill={i >= 5 ? SHADE : PAPER} stroke={INK} strokeWidth={3} />
      ))}
      <path d={`M338 ${250} L428 ${212} L518 ${182} L608 ${162} L698 ${152} L788 ${158} L878 ${172}`} {...dash} />
      {[250, 212, 182, 162, 152, 158, 172].map((y, i) => (
        <circle key={i} cx={338 + i * 90} cy={y} r={7} fill={PAPER} stroke={INK} strokeWidth={2} />
      ))}
      <Plant x={1050} y={404} />
    </>
  );
}

function Negociation() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* table et deux chaises face à face */}
      <path d="M430 330 H770 M470 330 V440 M730 330 V440" {...line} />
      <path d="M300 440 V330 H370 M370 330 V440 M300 330 V250" {...line} />
      <path d="M900 440 V330 H830 M830 330 V440 M900 330 V250" {...line} />
      {/* étiquette de prix, barrée puis réécrite */}
      <g transform="rotate(-8 600 190)">
        <path d="M470 130 H690 L740 190 L690 250 H470 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={700} cy={190} r={9} fill={SUN} stroke={INK} strokeWidth={2} />
        <path d="M500 170 H640" {...line} />
        <path d="M492 182 L648 158" {...thin} />
        <rect x={500} y={200} width={110} height={26} fill={SHADE} stroke={INK} strokeWidth={2} />
      </g>
      {/* dossier sur la table */}
      <rect x={520} y={304} width={160} height={26} fill={PAPER} stroke={INK} strokeWidth={2} />
      <Plant x={1010} y={414} />
    </>
  );
}

function Ventes() {
  const houses = [
    { x: 190, w: 130, h: 190, sold: false },
    { x: 330, w: 150, h: 260, sold: true },
    { x: 490, w: 120, h: 170, sold: false },
    { x: 620, w: 170, h: 300, sold: true },
    { x: 800, w: 130, h: 210, sold: false },
    { x: 940, w: 110, h: 150, sold: true },
  ];
  return (
    <>
      <path d="M140 440 H1080" {...line} />
      {houses.map((b) => (
        <g key={b.x}>
          <rect x={b.x} y={440 - b.h} width={b.w} height={b.h} fill={b.sold ? SHADE : PAPER} stroke={INK} strokeWidth={3} />
          {Array.from({ length: Math.floor((b.h - 50) / 60) }, (_, r) => (
            <g key={r}>
              <rect x={b.x + 20} y={440 - b.h + 24 + r * 60} width={30} height={34} fill={SUN} stroke={INK} strokeWidth={2} />
              <rect x={b.x + b.w - 50} y={440 - b.h + 24 + r * 60} width={30} height={34} fill={SUN} stroke={INK} strokeWidth={2} />
            </g>
          ))}
          {b.sold && (
            <g>
              <path d={`M${b.x + b.w / 2} ${440 - b.h - 18} c-34 -34 -30 -70 0 -70 c30 0 34 36 0 70 z`} fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
              <circle cx={b.x + b.w / 2} cy={440 - b.h - 66} r={8} fill={INK} />
            </g>
          )}
        </g>
      ))}
    </>
  );
}

function Offre() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* la lettre */}
      <g transform="rotate(-4 520 260)">
        <rect x={360} y={80} width={330} height={350} fill={PAPER} stroke={INK} strokeWidth={3} />
        <path d="M400 135 H560" {...line} />
        {[185, 220, 255, 290].map((y) => (
          <path key={y} d={`M400 ${y} H650`} {...thin} />
        ))}
        <rect x={400} y={318} width={120} height={30} fill={SHADE} stroke={INK} strokeWidth={2} />
        <path d="M540 390 c20 -26 34 10 52 -14 c14 -18 26 12 58 -6" {...thin} />
      </g>
      {/* le stylo */}
      <g transform="rotate(38 800 300)">
        <rect x={700} y={288} width={190} height={24} rx={4} fill={PAPER} stroke={INK} strokeWidth={3} />
        <path d="M700 288 L664 300 L700 312 Z" fill={INK} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <rect x={850} y={288} width={40} height={24} rx={4} fill={SHADE} stroke={INK} strokeWidth={2} />
      </g>
      {/* les clés */}
      <circle cx={900} cy={404} r={20} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M920 404 H990 M966 404 V422 M984 404 V418" {...line} />
    </>
  );
}

function Annonce() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* l'annonce : une photo, un titre, des lignes */}
      <rect x={300} y={70} width={420} height={370} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={330} y={100} width={360} height={170} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M330 270 L430 180 L500 236 L570 150 L690 270" {...thin} />
      <circle cx={640} cy={140} r={16} fill={PAPER} stroke={INK} strokeWidth={2} />
      <path d="M330 305 H560" {...line} />
      <path d="M330 340 H660 M330 370 H620" {...thin} />
      <rect x={330} y={392} width={110} height={26} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* la loupe */}
      <circle cx={790} cy={270} r={92} fill={PAPER} fillOpacity={0.6} stroke={INK} strokeWidth={6} />
      <path d="M856 336 L940 420" stroke={INK} strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M740 250 H840 M740 285 H810" {...line} />
    </>
  );
}

function HorsMarche() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* une porte, sa serrure */}
      <rect x={560} y={110} width={200} height={330} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={585} y={135} width={150} height={120} fill={SUN} stroke={INK} strokeWidth={2} />
      <circle cx={720} cy={300} r={16} fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M720 300 v26" {...line} />
      {/* la clé qui s'en approche */}
      <circle cx={330} cy={290} r={42} fill={PAPER} stroke={INK} strokeWidth={3} />
      <circle cx={330} cy={290} r={16} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M372 290 H500 M452 290 V322 M482 290 V314" {...line} />
      <path d="M520 290 h20" {...dash} />
      <Plant x={900} y={414} />
    </>
  );
}

function Temps() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* le sablier */}
      <path d="M300 110 H480 M300 440 H480" {...line} />
      <path d="M320 110 C320 220 390 240 390 275 C390 310 320 330 320 440 H460 C460 330 390 310 390 275 C390 240 460 220 460 110 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M344 440 C350 392 430 392 436 440 Z" fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M390 290 V380" {...dash} />
      {/* le calendrier */}
      <rect x={600} y={130} width={330} height={290} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M600 190 H930 M670 110 V150 M860 110 V150" {...line} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${r}-${c}`} x={626 + c * 58} y={214 + r * 62} width={40} height={40} fill={r === 1 && c > 0 && c < 4 ? SHADE : SUN} stroke={INK} strokeWidth={2} />
        )),
      )}
    </>
  );
}

function Revendre() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* la maison */}
      <path d="M300 250 L460 130 L620 250" {...line} />
      <rect x={330} y={250} width={260} height={190} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={430} y={340} width={60} height={100} fill={SHADE} stroke={INK} strokeWidth={2} />
      <rect x={360} y={285} width={50} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={510} y={285} width={50} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* le panneau */}
      <path d="M800 440 V170" {...line} />
      <path d="M800 190 H900" {...line} />
      <rect x={760} y={210} width={180} height={110} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M782 245 H918" {...line} />
      <rect x={782} y={268} width={90} height={26} fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M800 210 V190 M900 210 V190" {...thin} />
    </>
  );
}

function Atypique() {
  const xs = [180, 330, 720, 870];
  return (
    <>
      <path d="M140 440 H1060" {...line} />
      {/* quatre maisons semblables */}
      {xs.map((x) => (
        <g key={x}>
          <path d={`M${x - 10} 320 L${x + 55} 270 L${x + 120} 320`} {...thin} />
          <rect x={x} y={320} width={110} height={120} fill={PAPER} stroke={INK} strokeWidth={2} />
          <rect x={x + 40} y={380} width={30} height={60} fill={SUN} stroke={INK} strokeWidth={2} />
        </g>
      ))}
      {/* et celle qui ne leur ressemble pas : un atelier sous sheds vitrés */}
      <path d="M480 440 V200 L540 140 V200 L600 140 V200 L660 140 V200 L690 200 V440 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M540 140 V200 M600 140 V200 M660 140 V200" {...thin} />
      <rect x={510} y={250} width={150} height={110} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M560 250 V360 M610 250 V360 M510 305 H660" {...thin} />
      <rect x={560} y={380} width={50} height={60} fill={PAPER} stroke={INK} strokeWidth={2} />
    </>
  );
}

function Mur() {
  return (
    <>
      <path d="M200 440 H1000" {...line} />
      <path d="M260 100 H940 V440 M260 100 V440" {...line} />
      {/* le mur porteur, et l'ouverture projetée */}
      <rect x={570} y={100} width={44} height={340} fill={SHADE} stroke={INK} strokeWidth={3} />
      <rect x={520} y={170} width={144} height={30} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={560} y={200} width={64} height={240} fill={SUN} stroke={INK} strokeWidth={2} strokeDasharray="8 8" />
      <path d="M592 240 V400 M576 384 L592 400 L608 384" {...thin} />
      <Sofa x={330} y={440} />
      <Lamp x={800} y={100} />
      <Plant x={860} y={414} />
    </>
  );
}

function Monument() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M330 440 V410 H870 V440 M360 410 V386 H840 V410" {...line} />
      <path d="M340 190 L600 90 L860 190 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={600} cy={152} r={20} fill={SHADE} stroke={INK} strokeWidth={2} />
      <rect x={360} y={190} width={480} height={26} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[390, 500, 660, 770].map((x) => (
        <rect key={x} x={x} y={216} width={40} height={170} fill={PAPER} stroke={INK} strokeWidth={3} />
      ))}
      <rect x={565} y={266} width={70} height={120} fill={SHADE} stroke={INK} strokeWidth={2} />
      <Plant x={960} y={414} />
    </>
  );
}

function Architecte() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* deux volumes décalés, sur pilotis */}
      <rect x={300} y={250} width={420} height={110} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={480} y={130} width={400} height={120} fill={SHADE} stroke={INK} strokeWidth={3} />
      <rect x={520} y={160} width={320} height={60} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M600 160 V220 M680 160 V220 M760 160 V220" {...thin} />
      <rect x={330} y={280} width={240} height={80} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M410 280 V360 M490 280 V360" {...thin} />
      <path d="M340 360 V440 M680 360 V440 M840 250 V440" {...line} />
      <Plant x={960} y={414} />
      <Plant x={230} y={414} />
    </>
  );
}

function Clim() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <rect x={300} y={90} width={420} height={350} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[130, 250].map((y) =>
        [350, 480, 610].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={60} height={80} fill={SUN} stroke={INK} strokeWidth={2} />),
      )}
      <rect x={480} y={360} width={60} height={80} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* le groupe extérieur, accroché à la façade */}
      <rect x={720} y={250} width={150} height={100} fill={SHADE} stroke={INK} strokeWidth={3} />
      <circle cx={782} cy={300} r={32} fill={PAPER} stroke={INK} strokeWidth={2} />
      <path d="M782 268 V332 M750 300 H814" {...thin} />
      <path d="M836 276 H856 M836 300 H856 M836 324 H856" {...thin} />
      <path d="M900 270 q20 -14 40 0 t40 0 M900 310 q20 -14 40 0 t40 0" {...thin} />
    </>
  );
}

function Verriere() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M240 440 V90 H960 V440" {...line} />
      {/* la grande verrière */}
      <rect x={330} y={130} width={420} height={250} fill={SUN} stroke={INK} strokeWidth={4} />
      {[400, 470, 540, 610, 680].map((x) => (
        <path key={x} d={`M${x} 130 V380`} {...thin} />
      ))}
      <path d="M330 213 H750 M330 296 H750" {...thin} />
      <rect x={470} y={213} width={70} height={83} fill={PAPER} stroke={INK} strokeWidth={2} />
      <Sofa x={790} y={440} />
      <Plant x={290} y={414} />
    </>
  );
}

function Eglise() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* le clocher */}
      <path d="M380 200 L430 90 L480 200" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={380} y={200} width={100} height={240} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M410 300 V250 a20 20 0 0 1 40 0 V300 Z" fill={SUN} stroke={INK} strokeWidth={2} />
      {/* la nef */}
      <path d="M480 270 L650 190 L820 270" {...line} />
      <rect x={480} y={270} width={340} height={170} fill={PAPER} stroke={INK} strokeWidth={3} />
      <circle cx={650} cy={250} r={22} fill={SHADE} stroke={INK} strokeWidth={2} />
      {[520, 610, 700].map((x) => (
        <path key={x} d={`M${x} 400 V330 a25 25 0 0 1 50 0 V400 Z`} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <Plant x={900} y={414} />
    </>
  );
}

function Atelier() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M240 440 V90 H960 V440" {...line} />
      {/* la baie d'atelier, haute et inclinée */}
      <path d="M280 110 H520 L460 330 H280 Z" fill={SUN} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M360 110 V330 M440 110 L412 330 M280 220 H490" {...thin} />
      {/* le chevalet et sa toile */}
      <path d="M690 440 L740 150 L790 440 M740 150 V440" {...line} />
      <rect x={650} y={190} width={180} height={140} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M680 300 q30 -70 60 -30 t60 -20" {...thin} />
      <circle cx={790} cy={225} r={14} fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M640 345 H840" {...line} />
      {/* le tabouret */}
      <path d="M540 380 H610 M550 380 L540 440 M600 380 L610 440" {...line} />
      <Plant x={900} y={414} />
    </>
  );
}

function Meuble() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* la porte de l'immeuble */}
      <rect x={300} y={110} width={220} height={330} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={330} y={140} width={160} height={110} fill={SUN} stroke={INK} strokeWidth={2} />
      <circle cx={490} cy={300} r={9} fill={INK} />
      {/* la valise */}
      <path d="M700 250 V215 a12 12 0 0 1 12 -12 H788 a12 12 0 0 1 12 12 V250" {...line} />
      <rect x={630} y={250} width={240} height={170} rx={14} fill={SHADE} stroke={INK} strokeWidth={3} />
      <path d="M690 250 V420 M810 250 V420" {...thin} />
      <rect x={722} y={300} width={56} height={40} fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={670} cy={430} r={10} fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={830} cy={430} r={10} fill={PAPER} stroke={INK} strokeWidth={2} />
    </>
  );
}

function Amiante() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* l'ancien atelier et sa toiture en sheds */}
      <path d="M260 440 V230 L360 150 V230 L460 150 V230 L560 150 V230 L660 150 V440 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {[285, 310, 335, 385, 410, 435, 485, 510, 535, 585, 610, 635].map((x) => (
        <path key={x} d={`M${x} ${230 - ((x - 260) % 100) * 0.8} V230`} {...thin} />
      ))}
      <rect x={300} y={290} width={120} height={150} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={470} y={290} width={150} height={80} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* le signal d'alerte */}
      <path d="M850 180 L960 370 H740 Z" fill={SHADE} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d="M850 250 V315" stroke={INK} strokeWidth={10} strokeLinecap="round" fill="none" />
      <circle cx={850} cy={342} r={7} fill={INK} />
    </>
  );
}

function Bureau() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M240 440 V100 H960 V440" {...line} />
      <path d="M600 100 V440" {...dash} />
      {/* côté travail */}
      <path d="M290 330 H540 M310 330 V440 M520 330 V440" {...line} />
      <rect x={360} y={230} width={130} height={84} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M425 314 V330 M395 330 H455" {...line} />
      <rect x={380} y={250} width={90} height={14} fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M380 282 H450" {...thin} />
      <Lamp x={320} y={100} />
      {/* côté vie */}
      <Sofa x={700} y={440} />
      <rect x={720} y={160} width={90} height={110} fill={SUN} stroke={INK} strokeWidth={2} />
      <Plant x={900} y={414} />
    </>
  );
}

function Cheminee() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M240 440 V100 H960 V440" {...line} />
      {/* le conduit, le manteau, le foyer */}
      <rect x={530} y={100} width={140} height={150} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={440} y={250} width={320} height={30} fill={SHADE} stroke={INK} strokeWidth={3} />
      <rect x={470} y={280} width={260} height={160} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M520 440 V350 a80 80 0 0 1 160 0 V440 Z" fill={INK} stroke={INK} strokeWidth={3} />
      <path d="M600 432 C560 410 580 380 596 366 C598 386 616 384 610 356 C644 380 644 416 600 432 Z" fill={SHADE} stroke={PAPER} strokeWidth={2} strokeLinejoin="round" />
      <path d="M560 436 H640" stroke={PAPER} strokeWidth={3} strokeLinecap="round" />
      <rect x={560} y={160} width={80} height={60} fill={SUN} stroke={INK} strokeWidth={2} />
      <Sofa x={790} y={440} />
      <Plant x={320} y={414} />
    </>
  );
}

function Assurance() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* le parapluie */}
      <path d="M330 250 C340 110 860 110 870 250 C830 215 790 215 750 250 C710 215 670 215 630 250 C590 215 550 215 510 250 C470 215 430 215 390 250 C370 232 350 232 330 250 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M600 146 V120" {...line} />
      {/* la maison à l'abri */}
      <path d="M490 330 L600 250 L710 330" {...line} />
      <rect x={510} y={330} width={180} height={110} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={580} y={370} width={40} height={70} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* la pluie */}
      <path d="M250 150 l-14 36 M300 230 l-14 36 M930 140 l-14 36 M960 240 l-14 36 M890 320 l-14 36 M280 330 l-14 36" {...thin} />
    </>
  );
}

function Conditions() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* la planchette et sa liste de conditions */}
      <rect x={420} y={90} width={360} height={350} rx={10} fill={SHADE} stroke={INK} strokeWidth={3} />
      <rect x={450} y={125} width={300} height={315} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={540} y={74} width={120} height={44} rx={8} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[180, 250, 320, 390].map((y, i) => (
        <g key={y}>
          <rect x={480} y={y - 16} width={32} height={32} fill={i < 3 ? SUN : PAPER} stroke={INK} strokeWidth={2} />
          {i < 3 && <path d={`M487 ${y} l7 8 l12 -15`} {...thin} />}
          <path d={`M536 ${y} H${i === 3 ? 660 : 716}`} {...line} />
        </g>
      ))}
      <Plant x={900} y={414} />
    </>
  );
}

function Hotel() {
  return (
    <>
      <path d="M140 440 H1060" {...line} />
      {/* le toit à la Mansart et ses lucarnes */}
      <path d="M330 190 L370 110 H830 L870 190 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {[430, 580, 730].map((x) => (
        <rect key={x} x={x} y={132} width={40} height={44} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <rect x={330} y={190} width={540} height={250} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[370, 460, 700, 790].map((x) => (
        <g key={x}>
          <rect x={x} y={220} width={44} height={74} fill={SUN} stroke={INK} strokeWidth={2} />
          <rect x={x} y={330} width={44} height={74} fill={SUN} stroke={INK} strokeWidth={2} />
        </g>
      ))}
      <path d="M560 440 V330 a40 40 0 0 1 80 0 V440 Z" fill={SHADE} stroke={INK} strokeWidth={3} />
      <rect x={578} y={220} width={44} height={60} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* la grille */}
      <path d="M200 440 V330 M250 440 V330 M950 440 V330 M1000 440 V330 M190 330 H260 M940 330 H1010" {...line} />
    </>
  );
}

function DernierEtage() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <circle cx={900} cy={130} r={36} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M380 170 H780 L740 110 H420 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={470} y={76} width={34} height={44} fill={PAPER} stroke={INK} strokeWidth={2} />
      {/* le dernier étage, celui qui compte */}
      <rect x={400} y={170} width={360} height={90} fill={SHADE} stroke={INK} strokeWidth={3} />
      <rect x={430} y={190} width={300} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M505 190 V240 M580 190 V240 M655 190 V240" {...thin} />
      <rect x={400} y={260} width={360} height={180} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[285, 365].map((y) =>
        [440, 555, 670].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={50} height={50} fill={SUN} stroke={INK} strokeWidth={2} />),
      )}
      <path d="M400 350 H760" {...thin} />
      <path d="M300 215 H380 M356 199 L380 215 L356 231" {...line} />
    </>
  );
}

function Chauffage() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M260 440 V70 H940 V440" {...line} />
      {/* le radiateur, tout en bas */}
      {[330, 356, 382, 408, 434, 460].map((x) => (
        <rect key={x} x={x} y={350} width={22} height={74} rx={6} fill={PAPER} stroke={INK} strokeWidth={2} />
      ))}
      <path d="M320 424 H494 M340 424 V440 M472 424 V440" {...line} />
      {/* la chaleur qui monte sous le plafond */}
      <path d="M360 320 q-18 -30 0 -60 t0 -60 t0 -60 M410 320 q-18 -30 0 -60 t0 -60 t0 -60 M460 320 q-18 -30 0 -60 t0 -60 t0 -60" {...thin} />
      <rect x={300} y={84} width={600} height={40} fill={SHADE} stroke={INK} strokeWidth={2} strokeDasharray="8 8" />
      {/* le thermomètre */}
      <rect x={770} y={170} width={28} height={190} rx={14} fill={PAPER} stroke={INK} strokeWidth={3} />
      <circle cx={784} cy={376} r={26} fill={SHADE} stroke={INK} strokeWidth={3} />
      <path d="M784 350 V250" stroke={INK} strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M812 200 H832 M812 240 H832 M812 280 H832 M812 320 H832" {...thin} />
      <Sofa x={560} y={440} />
    </>
  );
}

function Surelever() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* l'étage ajouté, encore en projet */}
      <rect x={380} y={120} width={360} height={100} fill={SHADE} stroke={INK} strokeWidth={3} strokeDasharray="10 8" />
      <rect x={420} y={145} width={60} height={50} fill={SUN} stroke={INK} strokeWidth={2} strokeDasharray="8 8" />
      <rect x={640} y={145} width={60} height={50} fill={SUN} stroke={INK} strokeWidth={2} strokeDasharray="8 8" />
      <rect x={380} y={220} width={360} height={220} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[250, 340].map((y) =>
        [420, 530, 640].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={60} height={56} fill={SUN} stroke={INK} strokeWidth={2} />),
      )}
      {/* la flèche vers le haut */}
      <path d="M850 400 V130 M822 162 L850 130 L878 162" {...line} />
      <path d="M826 400 H874" {...line} />
      <Plant x={270} y={414} />
    </>
  );
}

function Plateforme() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M260 440 V80 H940 V440" {...line} />
      {/* la mezzanine à créer */}
      <rect x={260} y={240} width={380} height={24} fill={SHADE} stroke={INK} strokeWidth={3} strokeDasharray="10 8" />
      <path d="M640 264 V440" {...dash} />
      {/* l'échelle */}
      <path d="M690 440 L730 240 M740 440 L780 240" {...line} />
      <path d="M700 392 H750 M710 344 H760 M720 296 H770" {...thin} />
      {/* les deux hauteurs à mesurer */}
      <path d="M860 100 V230 M846 116 L860 100 L874 116 M846 214 L860 230 L874 214" {...thin} />
      <path d="M860 274 V424 M846 290 L860 274 L874 290 M846 408 L860 424 L874 408" {...thin} />
      <path d="M840 252 H880" {...line} />
      <Sofa x={330} y={440} />
      <Plant x={560} y={414} />
    </>
  );
}

const ART: Record<GuideArtKey, () => JSX.Element> = { souplex: Souplex, loft: Loft, plans: Plans, peniche: Peniche, mezzanine: Mezzanine, visite: Visite, terrasse: Terrasse, dpe: Dpe, credit: Credit, duplex: Duplex, charges: Charges, marche: Marche, negociation: Negociation, ventes: Ventes, offre: Offre, annonce: Annonce, horsmarche: HorsMarche, temps: Temps, revendre: Revendre, atypique: Atypique, mur: Mur, monument: Monument, architecte: Architecte, clim: Clim, verriere: Verriere, eglise: Eglise, atelier: Atelier, meuble: Meuble, amiante: Amiante, bureau: Bureau, cheminee: Cheminee, assurance: Assurance, conditions: Conditions, hotel: Hotel, dernieretage: DernierEtage, chauffage: Chauffage, surelever: Surelever, plateforme: Plateforme };

// fit « meet » : le dessin entier reste visible (article à la une) ; « slice » : il remplit le cadre, quitte à être rogné
export default function GuideArt({ art, className = '', fit = 'slice' }: { art: GuideArtKey; className?: string; fit?: 'slice' | 'meet' }) {
  const Drawing = ART[art];
  return (
    <svg viewBox="0 0 1200 500" className={className} role="img" aria-hidden="true" preserveAspectRatio={`xMidYMid ${fit}`}>
      <rect width={1200} height={500} fill={SUN} />
      <Drawing />
    </svg>
  );
}

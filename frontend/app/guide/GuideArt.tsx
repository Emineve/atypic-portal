// Illustrations de « L'état des lieux » : des coupes d'architecte dessinées pour Loftissime.
// Dessins originaux (aucune photo, aucun droit à demander), aux couleurs du site.

export type GuideArtKey = 'souplex' | 'loft' | 'plans' | 'peniche' | 'mezzanine' | 'visite' | 'terrasse' | 'dpe' | 'credit' | 'duplex' | 'charges' | 'marche' | 'negociation' | 'ventes' | 'offre' | 'annonce' | 'horsmarche' | 'temps' | 'revendre' | 'atypique' | 'mur' | 'monument' | 'architecte' | 'clim' | 'verriere' | 'eglise' | 'atelier' | 'meuble' | 'amiante' | 'bureau' | 'cheminee' | 'assurance' | 'conditions' | 'hotel' | 'dernieretage' | 'chauffage' | 'surelever' | 'plateforme' | 'balance' | 'vue' | 'hauteur' | 'garage' | 'veranda' | 'voieprivee' | 'ascenseur' | 'expertise' | 'rdc' | 'chambres' | 'bruit' | 'division' | 'moulin' | 'loge' | 'spa' | 'plusieurs' | 'cave' | 'avion' | 'souterrain' | 'train' | 'phare' | 'arbre' | 'silo' | 'ile' | 'cabane' | 'paquebot' | 'dome' | 'troglo' | 'chateaudeau' | 'conteneur' | 'yourte' | 'van' | 'bunker' | 'prison' | 'tiny' | 'bulle' | 'wagon' | 'flottant' | 'ecole' | 'hameau' | 'chateau' | 'etroite';

const INK = '#1c1917';
const SUN = '#F6CF4E';
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

function Balance() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M600 440 V130 M520 440 H680" {...line} />
      <circle cx={600} cy={120} r={14} fill={SHADE} stroke={INK} strokeWidth={3} />
      {/* le fléau, légèrement penché du côté du cœur */}
      <path d="M340 190 L860 150" {...line} />
      <path d="M340 190 L280 320 M340 190 L400 320 M860 150 L800 270 M860 150 L920 270" {...thin} />
      <path d="M260 320 H420 C420 372 260 372 260 320 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M780 270 H940 C940 322 780 322 780 270 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* d'un côté le coup de cœur, de l'autre le dossier */}
      <path d="M340 312 C300 286 306 256 326 256 C336 256 340 264 340 270 C340 264 344 256 354 256 C374 256 380 286 340 312 Z" fill={SHADE} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <rect x={826} y={206} width={68} height={58} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M838 224 H882 M838 240 H870" {...thin} />
    </>
  );
}

function Vue() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* la fenêtre et ce que l'on voit */}
      <rect x={250} y={90} width={420} height={300} fill={PAPER} stroke={INK} strokeWidth={4} />
      <path d="M460 90 V390" {...line} />
      <path d="M270 330 H330 V250 H380 V290 H440 V210 M480 300 H520 V230 H570 V270 H650" {...thin} />
      <circle cx={590} cy={150} r={24} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M240 390 H680" {...line} />
      {/* l'immeuble qui pourrait monter devant */}
      <rect x={780} y={300} width={180} height={140} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={780} y={150} width={180} height={150} fill={SHADE} stroke={INK} strokeWidth={3} strokeDasharray="10 8" />
      <path d="M870 280 V180 M848 206 L870 180 L892 206" {...thin} />
      <rect x={810} y={330} width={40} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={890} y={330} width={40} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
    </>
  );
}

function Hauteur() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* une coupe sous les toits, et ses trois hauteurs */}
      <path d="M260 440 V330 L600 90 L940 330 V440" {...line} />
      <path d="M260 330 H940" {...dash} />
      <path d="M430 210 H770" {...dash} />
      <rect x={452} y={210} width={296} height={230} fill={SHADE} fillOpacity={0.5} stroke="none" />
      <path d="M452 210 V440 M748 210 V440" {...thin} />
      {/* la toise */}
      <path d="M600 104 V430 M586 120 L600 104 L614 120 M586 414 L600 430 L614 414" {...thin} />
      <path d="M580 330 H620 M580 210 H620" {...line} />
      <Sofa x={300} y={440} />
      <Plant x={860} y={414} />
    </>
  );
}

function Garage() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* le garage tel qu'il est */}
      <path d="M220 200 H500 V440 M220 200 V440" {...line} />
      <rect x={250} y={250} width={220} height={190} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M250 288 H470 M250 326 H470 M250 364 H470 M250 402 H470" {...thin} />
      {/* la flèche */}
      <path d="M540 320 H640 M612 296 L640 320 L612 344" {...line} />
      {/* le logement qu'il peut devenir */}
      <path d="M700 200 H980 V440 M700 200 V440" {...line} />
      <rect x={730} y={250} width={130} height={190} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M795 250 V440 M730 345 H860" {...thin} />
      <rect x={890} y={320} width={60} height={120} fill={SHADE} stroke={INK} strokeWidth={2} />
      <Plant x={1010} y={414} />
    </>
  );
}

function Veranda() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* la maison */}
      <path d="M260 220 L420 110 L580 220" {...line} />
      <rect x={290} y={220} width={260} height={220} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={330} y={260} width={70} height={80} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={440} y={340} width={60} height={100} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* la véranda accolée */}
      <path d="M550 270 L860 310 V440 H550 Z" fill={SUN} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M630 280 V440 M710 291 V440 M790 301 V440 M550 360 H860" {...thin} />
      <Sofa x={620} y={440} />
      <Plant x={940} y={414} />
    </>
  );
}

function VoiePrivee() {
  return (
    <>
      <path d="M140 440 H1060" {...line} />
      {/* la grille */}
      <rect x={470} y={170} width={36} height={270} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={694} y={170} width={36} height={270} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M506 250 C560 200 640 200 694 250" {...line} />
      {[536, 566, 600, 634, 664].map((x) => (
        <path key={x} d={`M${x} ${x === 600 ? 214 : x === 566 || x === 634 ? 222 : 236} V440`} {...thin} />
      ))}
      <path d="M506 350 H694" {...thin} />
      {/* les maisons de la voie, de part et d'autre */}
      <path d="M200 300 L290 230 L380 300" {...thin} />
      <rect x={215} y={300} width={150} height={140} fill={PAPER} stroke={INK} strokeWidth={2} />
      <rect x={250} y={330} width={80} height={70} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M820 280 L910 200 L1000 280" {...thin} />
      <rect x={835} y={280} width={150} height={160} fill={SHADE} stroke={INK} strokeWidth={2} />
      <rect x={870} y={310} width={80} height={90} fill={SUN} stroke={INK} strokeWidth={2} />
      <Plant x={420} y={414} />
      <Plant x={780} y={414} />
    </>
  );
}

function Ascenseur() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* l'immeuble en coupe : l'escalier d'un côté, la gaine de l'ascenseur de l'autre */}
      <rect x={330} y={80} width={540} height={360} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M330 170 H870 M330 260 H870 M330 350 H870" {...thin} />
      <path d="M360 440 L450 350 L360 350 L450 260 L360 260 L450 170 L360 170 L450 80" {...thin} />
      <rect x={640} y={80} width={110} height={360} fill={SHADE} stroke={INK} strokeWidth={3} strokeDasharray="10 8" />
      <rect x={654} y={270} width={82} height={74} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M695 270 V96" {...thin} />
      <path d="M940 400 V140 M916 168 L940 140 L964 168" {...line} />
    </>
  );
}

function Expertise() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* le plan déroulé */}
      <rect x={300} y={130} width={420} height={270} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M340 170 H560 V360 H340 Z M560 250 H680 V360 H560 M440 170 V250 M340 250 H400" {...thin} />
      <path d="M470 250 a40 40 0 0 1 40 40" {...thin} />
      <rect x={596} y={170} width={84} height={56} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* le mètre */}
      <rect x={260} y={404} width={380} height={30} fill={SUN} stroke={INK} strokeWidth={3} />
      {[290, 320, 350, 380, 410, 440, 470, 500, 530, 560, 590, 620].map((x, i) => (
        <path key={x} d={`M${x} 404 V${i % 2 ? 416 : 422}`} {...thin} />
      ))}
      {/* la loupe */}
      <circle cx={830} cy={240} r={76} fill={PAPER} fillOpacity={0.6} stroke={INK} strokeWidth={6} />
      <path d="M886 296 L960 370" stroke={INK} strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M800 250 l20 22 l40 -50" {...line} />
    </>
  );
}

function Rdc() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* l'immeuble sur cour : le rez-de-chaussée, sa verrière d'atelier */}
      <rect x={280} y={90} width={360} height={350} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[120, 210].map((y) =>
        [320, 430, 540].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={56} height={60} fill={SUN} stroke={INK} strokeWidth={2} />),
      )}
      <rect x={280} y={300} width={360} height={140} fill={SHADE} stroke={INK} strokeWidth={3} />
      <rect x={310} y={325} width={210} height={115} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M380 325 V440 M450 325 V440 M310 382 H520" {...thin} />
      <rect x={550} y={345} width={60} height={95} fill={PAPER} stroke={INK} strokeWidth={2} />
      {/* la cour, son arbre, ses pavés */}
      <path d="M800 440 V300" {...line} />
      <circle cx={800} cy={250} r={62} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M800 300 l-26 -34 M800 284 l24 -30" {...thin} />
      <path d="M690 458 h40 M750 458 h40 M810 458 h40 M870 458 h40 M930 458 h40" {...thin} />
      <Plant x={940} y={414} />
    </>
  );
}

function Chambres() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* le toit, et les chambres alignées dessous */}
      <path d="M240 280 L330 130 H870 L960 280" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={240} y={280} width={720} height={160} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[390, 540, 690, 840].map((x) => (
        <rect key={x} x={x - 30} y={170} width={60} height={64} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      {/* les cloisons qui tombent */}
      <path d="M420 280 V440 M780 280 V440" {...dash} />
      <path d="M600 280 V440" {...line} />
      <path d="M240 400 H960" {...thin} />
      <Sofa x={290} y={400} />
      <Lamp x={690} y={280} />
      <rect x={830} y={366} width={90} height={22} rx={4} fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M830 388 V400 M920 388 V400" {...thin} />
    </>
  );
}

function Bruit() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <path d="M260 440 V80 H940 V440" {...line} />
      {/* le plancher entre deux logements */}
      <rect x={260} y={250} width={680} height={22} fill={SHADE} stroke={INK} strokeWidth={3} />
      {/* en haut : des pas */}
      <path d="M470 250 v-70 M520 250 v-70 M470 180 h50 M495 180 v-50" {...line} />
      <circle cx={495} cy={112} r={18} fill={PAPER} stroke={INK} strokeWidth={3} />
      {/* les ondes qui traversent */}
      <path d="M430 300 q65 44 130 0 M400 330 q95 62 190 0 M370 360 q125 80 250 0" {...thin} />
      <Sofa x={660} y={440} />
      <Lamp x={800} y={272} />
      <Plant x={330} y={224} />
    </>
  );
}

function Division() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* le plan d'un grand plateau, partagé en deux */}
      <rect x={280} y={110} width={640} height={300} fill={PAPER} stroke={INK} strokeWidth={4} />
      <rect x={280} y={110} width={320} height={300} fill={SUN} stroke="none" />
      <rect x={280} y={110} width={640} height={300} fill="none" stroke={INK} strokeWidth={4} />
      <path d="M600 110 V410" stroke={INK} strokeWidth={5} strokeDasharray="14 10" fill="none" />
      {/* deux portes d'entrée */}
      <path d="M420 410 a50 50 0 0 1 50 -50" {...thin} />
      <path d="M420 410 H470" stroke={PAPER} strokeWidth={6} />
      <path d="M720 410 a50 50 0 0 1 50 -50" {...thin} />
      <path d="M720 410 H770" stroke={PAPER} strokeWidth={6} />
      {/* deux pièces d'eau */}
      <rect x={300} y={130} width={90} height={70} fill={SHADE} stroke={INK} strokeWidth={2} />
      <rect x={810} y={130} width={90} height={70} fill={SHADE} stroke={INK} strokeWidth={2} />
      <path d="M440 250 H540 M660 250 H760" {...thin} />
    </>
  );
}

function Moulin() {
  return (
    <>
      {/* l'eau */}
      <path d="M160 440 H1040" {...line} />
      <path d="M200 410 q30 -18 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" {...thin} />
      <path d="M740 414 q30 -18 60 0 t60 0 t60 0 t60 0" {...thin} />
      {/* le moulin */}
      <path d="M470 210 L610 120 L750 210" {...line} />
      <rect x={490} y={210} width={240} height={200} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={530} y={250} width={50} height={60} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={640} y={250} width={50} height={60} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={590} y={340} width={46} height={70} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* la roue */}
      <circle cx={400} cy={340} r={86} fill={PAPER} stroke={INK} strokeWidth={3} />
      <circle cx={400} cy={340} r={56} fill={SUN} stroke={INK} strokeWidth={2} />
      <circle cx={400} cy={340} r={10} fill={INK} />
      <path d="M400 254 V426 M314 340 H486 M339 279 L461 401 M461 279 L339 401" {...thin} />
      <Plant x={900} y={384} />
    </>
  );
}

function Loge() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      <rect x={260} y={90} width={680} height={350} fill={PAPER} stroke={INK} strokeWidth={3} />
      {/* la porte cochère */}
      <path d="M330 440 V230 a90 90 0 0 1 180 0 V440 Z" fill={SHADE} stroke={INK} strokeWidth={3} />
      <path d="M420 140 V440" {...thin} />
      <circle cx={404} cy={320} r={7} fill={INK} />
      {/* la loge : sa porte vitrée, sa fenêtre, sa cloche */}
      <rect x={600} y={250} width={110} height={190} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M655 250 V440 M600 320 H710" {...thin} />
      <rect x={760} y={270} width={120} height={90} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M820 270 V360" {...thin} />
      <rect x={610} y={190} width={260} height={34} fill={PAPER} stroke={INK} strokeWidth={2} />
      <path d="M640 207 H840" {...thin} />
      {[640, 780].map((x) => (
        <rect key={x} x={x} y={110} width={70} height={56} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
    </>
  );
}

function Spa() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* le toit de l'immeuble et sa terrasse */}
      <rect x={260} y={330} width={680} height={110} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[320, 450, 580, 710, 840].map((x) => (
        <rect key={x} x={x} y={364} width={50} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <path d="M260 330 V250 H300 V330 M900 330 V250 H940 V330 M300 290 H900" {...thin} />
      {/* le bassin */}
      <path d="M470 330 V262 H730 V330 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M486 284 q20 -14 40 0 t40 0 t40 0 t40 0 t40 0 t28 0" {...thin} />
      <circle cx={540} cy={230} r={9} fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={600} cy={205} r={12} fill={PAPER} stroke={INK} strokeWidth={2} />
      <circle cx={655} cy={236} r={7} fill={PAPER} stroke={INK} strokeWidth={2} />
      {/* le poids */}
      <path d="M600 344 V404 M580 384 L600 404 L620 384" {...line} />
      <Plant x={350} y={304} />
      <Plant x={840} y={304} />
    </>
  );
}

function Plusieurs() {
  return (
    <>
      <path d="M160 440 H1040" {...line} />
      {/* un grand volume */}
      <path d="M360 230 L600 100 L840 230" {...line} />
      <rect x={390} y={230} width={420} height={210} fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={430} y={270} width={150} height={110} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M505 270 V380 M430 325 H580" {...thin} />
      <rect x={650} y={320} width={70} height={120} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* deux clés pour une même porte */}
      <circle cx={230} cy={250} r={30} fill={PAPER} stroke={INK} strokeWidth={3} />
      <circle cx={230} cy={250} r={11} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M260 250 H340 M312 250 V274 M334 250 V268" {...line} />
      <circle cx={970} cy={250} r={30} fill={SHADE} stroke={INK} strokeWidth={3} />
      <circle cx={970} cy={250} r={11} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M940 250 H860 M888 250 V274 M866 250 V268" {...line} />
    </>
  );
}

function Cave() {
  return (
    <>
      {/* le sol, et ce qu'il y a dessous */}
      <path d="M160 240 H1040" {...line} />
      <rect x={160} y={240} width={880} height={220} fill={SHADE} stroke="none" />
      <path d="M160 240 H1040" {...line} />
      {/* la cave voûtée */}
      <path d="M280 440 V330 a90 70 0 0 1 180 0 V440 Z" fill={PAPER} stroke={INK} strokeWidth={3} />
      <rect x={310} y={380} width={50} height={60} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={372} y={400} width={60} height={40} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* l'escalier qui y descend */}
      <path d="M560 240 V280 H520 V320 H480 V360 H460" {...thin} />
      {/* le parking et sa voiture */}
      <rect x={620} y={290} width={340} height={150} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M680 410 H900 V380 L860 380 L830 344 H740 L710 380 H680 Z" fill={SUN} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={730} cy={412} r={18} fill={PAPER} stroke={INK} strokeWidth={3} />
      <circle cx={850} cy={412} r={18} fill={PAPER} stroke={INK} strokeWidth={3} />
      {/* l'immeuble au-dessus */}
      <rect x={400} y={80} width={400} height={160} fill={PAPER} stroke={INK} strokeWidth={3} />
      {[450, 570, 690].map((x) => (
        <rect key={x} x={x} y={120} width={60} height={70} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
    </>
  );
}

// Rubrique « Insolite » : un avion posé dans les bois
function Avion() {
  const tree = (x: number, h: number) => (
    <g key={x}>
      <path d={`M${x} 420 v-${h * 0.35}`} {...line} />
      <path d={`M${x - 46} ${420 - h * 0.3} L${x} ${420 - h} L${x + 46} ${420 - h * 0.3} Z`} fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
  return (
    <>
      <path d="M0 420 H1200" {...line} />
      {[90, 190, 1010, 1110].map((x, i) => tree(x, i % 2 ? 250 : 320))}
      {/* fuselage sur ses supports */}
      <path d="M300 250 Q300 210 360 206 H820 Q900 206 960 250 Q900 300 820 300 H360 Q300 296 300 250 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M318 222 L250 130 H300 L390 206" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M560 300 L470 372 H540 L690 300" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {[420, 480, 540, 600, 660, 720, 780].map((x) => (
        <rect key={x} x={x} y={232} width={30} height={30} rx={8} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <path d="M870 232 Q905 236 925 252" {...thin} />
      <path d="M400 300 v120 M800 300 v120" {...line} />
      {/* l'escalier qui en fait une maison */}
      <path d="M690 300 L760 420 M716 300 L786 420 M704 324 h26 M718 348 h26 M732 372 h26 M746 396 h26" {...thin} />
      <Plant x={860} y={394} />
    </>
  );
}

// Rubrique « Insolite » : une maison creusée sous le désert
function Souterrain() {
  return (
    <>
      {/* le sol, et le désert au-dessus */}
      <rect x={0} y={170} width={1200} height={330} fill={SHADE} />
      <path d="M0 170 H1200" {...line} />
      <circle cx={1040} cy={84} r={38} fill={PAPER} stroke={INK} strokeWidth={3} />
      <path d="M180 170 q40 -44 90 0 M700 170 q50 -56 110 0" {...line} />
      {/* bouches d'aération */}
      <path d="M430 170 v-44 h26 v44 M930 170 v-34 h26 v34" {...line} />
      {/* l'escalier qui descend */}
      <path d="M110 170 h40 v40 h40 v40 h40 v40 h40 v40 h40" {...line} />
      {/* les pièces creusées */}
      <path d="M310 420 V290 Q310 240 370 240 H560 Q620 240 620 290 V420 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M700 420 V300 Q700 250 760 250 H980 Q1040 250 1040 300 V420 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* le passage entre les deux pièces */}
      <rect x={618} y={340} width={84} height={80} fill={PAPER} />
      <path d="M620 340 H700" {...line} />
      <path d="M270 420 H1080" {...line} />
      <Sofa x={370} y={420} />
      <Lamp x={560} y={240} />
      <rect x={770} y={372} width={170} height={48} rx={6} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={770} y={350} width={50} height={22} rx={6} fill={PAPER} stroke={INK} strokeWidth={2} />
      <Plant x={1000} y={394} />
    </>
  );
}

// Rubrique « Insolite » : habiter le train
function Train() {
  return (
    <>
      {/* voie */}
      <path d="M0 400 H1200 M0 424 H1200" {...line} />
      {[60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140].map((x) => (
        <path key={x} d={`M${x} 400 v24`} {...thin} />
      ))}
      {/* voiture */}
      <path d="M150 150 H960 Q1070 150 1090 260 V350 H150 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M150 300 H1090" stroke={INK} strokeWidth={3} />
      <rect x={150} y={300} width={940} height={14} fill={SUN} stroke={INK} strokeWidth={2} />
      {[220, 400, 580, 760].map((x) => (
        <rect key={x} x={x} y={190} width={130} height={80} rx={10} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <path d="M940 190 H1010 Q1050 200 1060 260 H940 Z" fill={SUN} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      {/* roues */}
      {[260, 360, 880, 980].map((x) => (
        <circle key={x} cx={x} cy={372} r={26} fill={PAPER} stroke={INK} strokeWidth={3} />
      ))}
      {/* une vie dans un sac à dos, derrière une vitre */}
      <path d="M440 270 v-40 q0 -22 26 -22 q26 0 26 22 v40 Z" fill={PAPER} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <path d="M452 208 q14 -18 28 0 M448 244 h36" {...thin} />
    </>
  );
}

// Rubrique « Insolite » : un phare en mer
function Phare() {
  return (
    <>
      <path d="M0 420 H1200" {...line} />
      <path d="M60 452 q30 -16 60 0 t60 0 M860 456 q30 -16 60 0 t60 0 t60 0 M300 470 q30 -16 60 0 t60 0" {...thin} />
      {/* le socle */}
      <path d="M430 420 V372 H770 V420" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M470 372 V330 H730 V372" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* la tour */}
      <path d="M540 330 L562 130 H638 L660 330 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M548 262 H652 M555 196 H645" {...thin} />
      {[230, 296].map((y) => (
        <rect key={y} x={588} y={y - 14} width={24} height={30} rx={12} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <rect x={588} y={152} width={24} height={30} rx={12} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* la lanterne */}
      <path d="M548 130 H652" {...line} />
      <rect x={572} y={84} width={56} height={46} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M600 84 v46" {...thin} />
      <path d="M564 84 Q600 40 636 84 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M600 52 v-18" {...line} />
      {/* le faisceau */}
      <path d="M640 100 L900 60 M640 112 L900 130 M560 100 L300 60 M560 112 L300 130" {...dash} />
      {/* la barque de la relève */}
      <path d="M150 420 q10 22 40 22 h60 q30 0 40 -22 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    </>
  );
}

// Rubrique « Insolite » : une plateforme en haut d'un grand arbre
function Arbre() {
  return (
    <>
      <path d="M0 440 H1200" {...line} />
      {/* le tronc */}
      <path d="M560 440 L576 40 H624 L640 440 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M590 420 V300 M612 260 V120" {...thin} />
      {/* les branches */}
      {[90, 150, 330, 390].map((y, i) => (
        <g key={y}>
          <path d={`M${578 + i} ${y} Q480 ${y - 10} 400 ${y + 26}`} {...line} />
          <path d={`M${622 - i} ${y} Q720 ${y - 10} 800 ${y + 26}`} {...line} />
        </g>
      ))}
      {/* la plateforme et sa bâche */}
      <path d="M470 236 H730" {...line} />
      <path d="M486 236 L560 282 M714 236 L640 282" {...thin} />
      <path d="M480 236 L600 150 L720 236 Z" fill={SUN} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* la corde et le seau de ravitaillement */}
      <path d="M700 236 V392" {...dash} />
      <path d="M684 392 h32 l-5 30 h-22 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* les arbres voisins, plus petits */}
      {[160, 260, 950, 1050].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 440 v-70`} {...line} />
          <path d={`M${x - 40} 380 L${x} ${i % 2 ? 230 : 180} L${x + 40} 380 Z`} fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        </g>
      ))}
    </>
  );
}

// Rubrique « Insolite » : un silo enterré, vu en coupe
function Silo() {
  return (
    <>
      <path d="M0 150 H1200" {...line} />
      <Plant x={220} y={124} />
      {/* la trappe et l'escalier */}
      <path d="M420 150 v-26 h90 v26" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M465 150 V220" {...dash} />
      {/* le centre de contrôle, devenu logement */}
      <path d="M340 220 H600 Q620 220 620 240 V330 H340 Q320 330 320 310 V240 Q320 220 340 220 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <Sofa x={360} y={300} />
      <rect x={470} y={246} width={60} height={36} rx={4} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* le tunnel */}
      <path d="M620 262 H720 M620 306 H720" {...line} />
      {/* le puits du missile */}
      <path d="M720 150 V470 H880 V150" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M720 150 H700 M880 150 H900" {...line} />
      <path d="M720 230 H880 M720 310 H880 M720 390 H880" {...thin} />
      <path d="M800 170 V450" {...dash} />
      {/* cote de profondeur */}
      <path d="M940 150 V470 M928 150 h24 M928 470 h24" {...thin} />
    </>
  );
}

// Rubrique « Insolite » : une île, une maison, une éolienne
function Ile() {
  return (
    <>
      <path d="M0 400 H1200" {...line} />
      <path d="M80 432 q30 -16 60 0 t60 0 M940 436 q30 -16 60 0 t60 0 M480 462 q30 -16 60 0 t60 0 t60 0" {...thin} />
      {/* l'île */}
      <path d="M260 400 Q330 300 520 290 Q760 280 900 340 Q950 366 960 400 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* la ferme */}
      <path d="M470 300 V246 L530 206 L590 246 V298" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={516} y={258} width={28} height={40} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M590 262 H690 V294 L590 298 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M590 262 L610 240 H690 V262" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* l'éolienne */}
      <path d="M800 320 V180" {...line} />
      <path d="M800 180 L800 130 M800 180 L844 204 M800 180 L756 204" {...line} />
      <circle cx={800} cy={180} r={7} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* les moutons */}
      {[360, 410].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={352} rx={18} ry={11} fill={PAPER} stroke={INK} strokeWidth={2} />
          <path d={`M${x - 8} 362 v10 M${x + 8} 362 v10`} {...thin} />
        </g>
      ))}
      {/* le bateau, seul lien avec le continent */}
      <path d="M90 400 q10 22 40 22 h50 q30 0 40 -22 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M150 400 V340 L196 388 H150" fill={SUN} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    </>
  );
}

// Rubrique « Insolite » : une cabane sur les rochers, face à la mer
function Cabane() {
  return (
    <>
      <path d="M0 430 H520" {...line} />
      <path d="M40 458 q30 -16 60 0 t60 0 t60 0 M300 470 q30 -16 60 0 t60 0" {...thin} />
      {/* les rochers */}
      <path d="M460 470 L520 400 L600 380 L680 330 H980 L1060 370 L1140 380 L1200 430 V470 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M600 380 L640 420 M1060 370 L1030 420" {...thin} />
      {/* la cabane */}
      <path d="M720 330 V200 L960 170 V330 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M704 204 L976 168" {...line} />
      {/* la baie coulissante */}
      <rect x={740} y={236} width={120} height={94} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M800 236 v94" {...thin} />
      {/* la mezzanine */}
      <path d="M876 250 H960 M890 250 v80 M890 276 h-14 M890 302 h-14" {...thin} />
      {/* cote : douze mètres carrés */}
      <path d="M720 110 H960 M720 98 v24 M960 98 v24" {...thin} />
      {/* le soleil */}
      <circle cx={220} cy={150} r={44} fill={SUN} stroke={INK} strokeWidth={3} />
    </>
  );
}

// Rubrique « Insolite » : un paquebot
function Paquebot() {
  return (
    <>
      <path d="M0 400 H1200" {...line} />
      <path d="M60 434 q30 -16 60 0 t60 0 M980 438 q30 -16 60 0 t60 0 M500 462 q30 -16 60 0 t60 0 t60 0" {...thin} />
      {/* la coque */}
      <path d="M200 320 H1040 L980 400 H270 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M232 356 H1012" {...thin} />
      {Array.from({ length: 14 }, (_, i) => 300 + i * 48).map((x) => (
        <circle key={x} cx={x} cy={338} r={7} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      {/* les ponts */}
      <path d="M300 320 V270 H940 V320" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M360 270 V226 H860 V270" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {Array.from({ length: 12 }, (_, i) => 330 + i * 50).map((x) => (
        <rect key={x} x={x} y={284} width={26} height={22} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      {Array.from({ length: 9 }, (_, i) => 390 + i * 50).map((x) => (
        <rect key={x} x={x} y={238} width={26} height={20} fill={SHADE} stroke={INK} strokeWidth={2} />
      ))}
      {/* les cheminées */}
      <path d="M520 226 V160 H580 V226 M660 226 V172 H720 V226" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M520 180 H580 M660 192 H720" {...thin} />
      <path d="M550 150 q10 -26 40 -30 M690 162 q10 -26 40 -30" {...dash} />
    </>
  );
}

// Rubrique « Insolite » : un dôme géodésique
function Dome() {
  return (
    <>
      <path d="M0 420 H1200" {...line} />
      {/* la demi-sphère */}
      <path d="M340 420 Q340 160 600 160 Q860 160 860 420 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* les triangles */}
      <path d="M340 420 L420 300 L500 420 L600 300 L700 420 L780 300 L860 420" {...thin} />
      <path d="M420 300 H780 M372 300 L420 300 M780 300 L828 300" {...thin} />
      <path d="M420 300 L500 196 L600 300 L700 196 L780 300" {...thin} />
      <path d="M500 196 H700 M500 196 L600 160 L700 196" {...thin} />
      {/* la baie au sud */}
      <path d="M500 420 L600 300 L700 420 Z" fill={SUN} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* le conduit du poêle */}
      <path d="M740 232 V150 M728 150 h24" {...line} />
      <path d="M740 138 q10 -24 36 -28" {...dash} />
      <Plant x={250} y={394} />
      <Plant x={940} y={394} />
      {/* le soleil */}
      <circle cx={1050} cy={130} r={40} fill={SUN} stroke={INK} strokeWidth={3} />
    </>
  );
}

// Rubrique « Insolite » : une maison creusée dans la falaise
function Troglo() {
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {/* la falaise */}
      <path d="M260 430 V200 Q300 120 420 110 H1200 V430 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M330 150 q40 20 30 60 M700 110 q-10 40 20 70 M1000 110 q20 30 0 60" {...thin} />
      {/* la façade, seule ouverture */}
      <path d="M260 430 V260 H520 V430" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={292} y={330} width={64} height={100} fill={SUN} stroke={INK} strokeWidth={3} />
      <rect x={392} y={300} width={96} height={80} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M440 300 v80 M392 340 h96" {...thin} />
      {/* les pièces dans la roche */}
      <path d="M520 290 H820 Q860 290 860 330 V430 H520" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M690 290 V430" {...dash} />
      <Sofa x={560} y={400} />
      <Plant x={770} y={404} />
      {/* la cheminée qui sort du coteau */}
      <path d="M600 290 V80 M588 80 h24" {...line} />
      <path d="M600 68 q10 -22 36 -26" {...dash} />
      <Plant x={150} y={404} />
    </>
  );
}

// Rubrique « Insolite » : un château d'eau habité
function ChateauDeau() {
  return (
    <>
      <path d="M0 440 H1200" {...line} />
      {/* le fût */}
      <path d="M540 440 V170 H660 V440" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {[230, 290, 350].map((y) => (
        <rect key={y} x={584} y={y} width={32} height={34} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <rect x={582} y={396} width={36} height={44} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* le réservoir, devenu séjour */}
      <path d="M470 170 V84 H730 V170 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={496} y={104} width={208} height={44} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M548 104 v44 M600 104 v44 M652 104 v44" {...thin} />
      {/* la terrasse */}
      <path d="M470 84 V60 H730 V84 M510 60 v24 M560 60 v24 M640 60 v24 M690 60 v24" {...thin} />
      {/* cote de hauteur */}
      <path d="M800 60 V440 M788 60 h24 M788 440 h24" {...thin} />
      {/* le village */}
      {[180, 300, 930, 1050].map((x) => (
        <path key={x} d={`M${x} 440 V380 L${x + 40} 350 L${x + 80} 380 V440`} fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      ))}
    </>
  );
}

// Rubrique « Insolite » : une maison en conteneurs
function Conteneur() {
  const box = (x: number, y: number, w: number, fill: string) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height={110} fill={fill} stroke={INK} strokeWidth={3} />
      {Array.from({ length: Math.floor(w / 24) - 1 }, (_, i) => x + 24 * (i + 1)).map((lx) => (
        <path key={lx} d={`M${lx} ${y + 10} v90`} {...thin} />
      ))}
    </g>
  );
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {box(280, 320, 320, PAPER)}
      {box(600, 320, 320, SHADE)}
      {box(380, 210, 320, SHADE)}
      {/* les ouvertures découpées dans l'acier */}
      <rect x={330} y={346} width={150} height={84} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M405 346 v84" {...thin} />
      <rect x={690} y={350} width={140} height={54} fill={SUN} stroke={INK} strokeWidth={3} />
      <rect x={440} y={236} width={200} height={58} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M540 236 v58" {...thin} />
      {/* la terrasse sur le toit */}
      <path d="M700 320 V290 H920 V320 M760 290 v30 M840 290 v30" {...thin} />
      <Plant x={990} y={404} />
      <Plant x={200} y={404} />
    </>
  );
}

// Rubrique « Insolite » : une yourte
function Yourte() {
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {/* le plancher */}
      <path d="M360 430 V410 H840 V430" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* le mur rond */}
      <path d="M390 410 V300 H810 V410 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M390 336 H810 M390 372 H810" {...thin} />
      {/* le toit et sa couronne */}
      <path d="M370 300 L560 190 H640 L830 300 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M560 190 Q600 166 640 190" fill={SUN} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M470 242 L450 300 M730 242 L750 300 M600 190 V300" {...thin} />
      {/* la porte-fenêtre */}
      <rect x={560} y={320} width={80} height={90} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M600 320 v90" {...thin} />
      {/* le poêle */}
      <path d="M720 250 V160 M708 160 h24" {...line} />
      <path d="M720 148 q10 -22 36 -26" {...dash} />
      <Plant x={260} y={404} />
      <Plant x={930} y={404} />
    </>
  );
}

// Rubrique « Insolite » : un fourgon aménagé
function Van() {
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {/* les montagnes */}
      <path d="M0 430 L180 250 L300 350 L420 220 L600 430" {...thin} />
      <circle cx={1020} cy={140} r={44} fill={SUN} stroke={INK} strokeWidth={3} />
      {/* le fourgon */}
      <path d="M460 390 V230 Q460 210 480 210 H820 Q850 210 870 240 L910 300 Q940 306 940 330 V390 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M790 236 H826 L866 300 H790 Z" fill={SUN} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={500} y={240} width={120} height={56} rx={6} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M650 232 V390 M770 232 V390" {...thin} />
      {/* les panneaux solaires */}
      <path d="M520 210 L540 190 H700 L720 210" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M580 190 l-10 20 M640 190 l-6 20" {...thin} />
      {/* les roues */}
      {[560, 840].map((x) => (
        <g key={x}>
          <circle cx={x} cy={392} r={36} fill={PAPER} stroke={INK} strokeWidth={3} />
          <circle cx={x} cy={392} r={12} fill={SHADE} stroke={INK} strokeWidth={2} />
        </g>
      ))}
      {/* la table dehors */}
      <path d="M300 380 H400 M320 380 v50 M380 380 v50" {...line} />
    </>
  );
}

// Rubrique « Insolite » : un bunker sous un terrain, vu en coupe
function Bunker() {
  return (
    <>
      <path d="M0 190 H1200" {...line} />
      <path d="M60 222 q30 -16 60 0 t60 0" {...thin} />
      <Plant x={330} y={164} />
      <Plant x={900} y={164} />
      {/* l'entrée */}
      <path d="M520 190 V150 H600 V190" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M560 190 V250" {...dash} />
      {/* le béton */}
      <path d="M380 250 H860 V450 H380 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* les pièces, sur deux niveaux */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`a${i}`} x={404 + i * 110} y={270} width={96} height={70} fill={i === 1 ? SUN : PAPER} stroke={INK} strokeWidth={2} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`b${i}`} x={404 + i * 110} y={360} width={96} height={70} fill={i === 2 ? SUN : PAPER} stroke={INK} strokeWidth={2} />
      ))}
      {/* cote de profondeur */}
      <path d="M940 190 V450 M928 190 h24 M928 450 h24" {...thin} />
    </>
  );
}

// Rubrique « Insolite » : une prison devenue logements
function Prison() {
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {/* le bâtiment */}
      <path d="M300 430 V170 H900 V430 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M280 170 H920" {...line} />
      <path d="M300 256 H900 M300 342 H900" {...thin} />
      {/* les fenêtres : à gauche les barreaux, à droite les logements */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4, 5, 6].map((c) => {
          const x = 330 + c * 80;
          const y = 192 + r * 86;
          const barred = c < 3;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width={44} height={44} fill={barred ? SHADE : SUN} stroke={INK} strokeWidth={2} />
              {barred && <path d={`M${x + 15} ${y} v44 M${x + 29} ${y} v44`} {...thin} />}
            </g>
          );
        }),
      )}
      {/* la porte */}
      <path d="M570 430 V370 Q600 340 630 370 V430" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* le mur d'enceinte, ouvert */}
      <path d="M120 430 V320 H240 M960 320 H1080 V430" {...line} />
      <Plant x={200} y={404} />
      <Plant x={1010} y={404} />
    </>
  );
}

// Rubrique « Insolite » : une tiny house sur sa remorque
function Tiny() {
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {/* la remorque */}
      <path d="M380 380 H820 M820 380 H900 M900 372 v16" {...line} />
      {[500, 580].map((x) => (
        <g key={x}>
          <circle cx={x} cy={400} r={30} fill={PAPER} stroke={INK} strokeWidth={3} />
          <circle cx={x} cy={400} r={10} fill={SHADE} stroke={INK} strokeWidth={2} />
        </g>
      ))}
      {/* la maison */}
      <path d="M400 380 V210 L610 130 L800 190 V380 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M384 216 L610 128 L816 194" {...line} />
      <rect x={440} y={250} width={90} height={70} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M485 250 v70" {...thin} />
      <rect x={690} y={260} width={64} height={120} fill={SUN} stroke={INK} strokeWidth={3} />
      <rect x={580} y={176} width={60} height={40} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* les marches */}
      <path d="M690 380 v24 h64 v-24" {...thin} />
      {/* cote : vingt mètres carrés */}
      <path d="M400 90 H800 M400 78 v24 M800 78 v24" {...thin} />
      <Plant x={260} y={404} />
      <Plant x={1000} y={404} />
    </>
  );
}

// Rubrique « Insolite » : une maison bulle à flanc de montagne
function Bulle() {
  return (
    <>
      {/* la montagne */}
      <path d="M0 430 L260 400 L520 420 L900 380 L1200 400" {...line} />
      <path d="M700 250 L860 110 L960 200 L1060 140 L1200 260" {...thin} />
      {/* les bulles */}
      <path d="M360 412 Q340 250 520 240 Q700 250 690 404 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M660 400 Q660 310 740 306 Q820 310 818 388 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M250 402 Q250 336 310 334 Q370 336 372 410 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* les hublots */}
      <ellipse cx={520} cy={330} rx={70} ry={46} fill={SUN} stroke={INK} strokeWidth={3} />
      <path d="M520 284 v92 M450 330 h140" {...thin} />
      <circle cx={740} cy={352} r={24} fill={SUN} stroke={INK} strokeWidth={3} />
      <circle cx={310} cy={372} r={16} fill={SUN} stroke={INK} strokeWidth={2} />
      <circle cx={180} cy={130} r={44} fill={SUN} stroke={INK} strokeWidth={3} />
    </>
  );
}

// Rubrique « Insolite » : un wagon posé sur un bout de voie
function Wagon() {
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {/* la voie */}
      <path d="M200 416 H1000" {...line} />
      {Array.from({ length: 14 }, (_, i) => 220 + i * 58).map((x) => (
        <path key={x} d={`M${x} 416 v14`} {...thin} />
      ))}
      {/* la caisse */}
      <path d="M260 370 V230 Q260 200 300 196 H900 Q940 200 940 230 V370 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M260 330 H940" {...thin} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={330 + i * 80} y={236} width={50} height={64} rx={6} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      <rect x={280} y={236} width={34} height={134} fill={SHADE} stroke={INK} strokeWidth={2} />
      {/* les bogies */}
      {[340, 420, 780, 860].map((x) => (
        <circle key={x} cx={x} cy={392} r={24} fill={PAPER} stroke={INK} strokeWidth={3} />
      ))}
      {/* le poêle */}
      <path d="M820 196 V130 M808 130 h24" {...line} />
      <path d="M820 118 q10 -22 36 -26" {...dash} />
      {/* les marches et la plante : on n'en repart plus */}
      <path d="M280 370 h-40 v22 h-30 v24" {...thin} />
      <Plant x={150} y={404} />
    </>
  );
}

// Rubrique « Insolite » : des maisons sur l'eau, reliées par un ponton
function Flottant() {
  const house = (x: number, h: number, fill: string) => (
    <g key={x}>
      <path d={`M${x} 360 V${360 - h} H${x + 150} V360 Z`} fill={fill} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M${x + 16} ${360 - h} l20 -18 h78 l20 18`} fill={SHADE} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <rect x={x + 22} y={360 - h + 28} width={46} height={40} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={x + 84} y={360 - h + 28} width={46} height={40} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d={`M${x - 12} 360 H${x + 162} l-10 24 H${x - 2} Z`} fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
    </g>
  );
  return (
    <>
      <path d="M0 384 H1200" {...line} />
      {house(170, 150, PAPER)}
      {house(420, 190, PAPER)}
      {house(690, 130, PAPER)}
      {house(920, 170, PAPER)}
      {/* les passerelles */}
      <path d="M332 372 H408 M582 372 H678 M852 372 H908" {...line} />
      <path d="M60 420 q30 -16 60 0 t60 0 M520 440 q30 -16 60 0 t60 0 t60 0 M980 424 q30 -16 60 0 t60 0" {...thin} />
    </>
  );
}

// Rubrique « Insolite » : une ancienne école
function Ecole() {
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      <path d="M300 430 V200 H900 V430 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M280 200 H920" {...line} />
      {/* le fronton et la cloche */}
      <path d="M520 200 L600 130 L680 200 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={600} cy={176} r={12} fill={SUN} stroke={INK} strokeWidth={2} />
      {/* les hautes fenêtres des classes */}
      {[340, 430, 720, 810].map((x) => (
        <g key={x}>
          <rect x={x} y={236} width={54} height={110} fill={SUN} stroke={INK} strokeWidth={3} />
          <path d={`M${x + 27} 236 v110 M${x} 290 h54`} {...thin} />
        </g>
      ))}
      {/* la porte */}
      <path d="M560 430 V320 Q600 280 640 320 V430" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M600 300 v130" {...thin} />
      {/* la cour : marelle et arbre */}
      <path d="M130 430 v-60" {...line} />
      <circle cx={130} cy={340} r={44} fill={SHADE} stroke={INK} strokeWidth={3} />
      <path d="M980 446 h40 v24 h-40 Z M1020 446 h40 v24 h-40 Z M1060 446 h40 v24 h-40 Z" {...thin} />
    </>
  );
}

// Rubrique « Insolite » : un hameau à relever
function Hameau() {
  const maison = (x: number, w: number, h: number, ruin: boolean) => (
    <g key={x}>
      <path d={`M${x} 430 V${430 - h} H${x + w} V430`} fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {ruin ? (
        <path d={`M${x} ${430 - h} L${x + w * 0.3} ${430 - h - 40} L${x + w * 0.45} ${430 - h - 14} M${x + w} ${430 - h} v-22`} {...thin} />
      ) : (
        <path d={`M${x - 12} ${430 - h} L${x + w / 2} ${430 - h - 60} L${x + w + 12} ${430 - h} Z`} fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      )}
      <rect x={x + w / 2 - 14} y={430 - h + 24} width={28} height={30} fill={ruin ? PAPER : SUN} stroke={INK} strokeWidth={2} />
    </g>
  );
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {maison(140, 130, 110, true)}
      {maison(320, 150, 130, false)}
      {maison(520, 120, 100, true)}
      {maison(700, 170, 140, true)}
      {maison(930, 130, 110, true)}
      {/* le puits */}
      <path d="M630 430 v-34 h44 v34 M622 396 h60 M640 396 v-26 h24 v26" {...thin} />
      {/* les ronces */}
      <path d="M60 430 q10 -30 30 -10 q10 -26 30 0 M1090 430 q10 -30 30 -10 q10 -26 30 0" {...thin} />
    </>
  );
}

// Rubrique « Insolite » : un château sans toit, en chantier
function Chateau() {
  return (
    <>
      <path d="M0 430 H1200" {...line} />
      {/* le corps de logis */}
      <path d="M360 430 V210 H840 V430 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* les tours */}
      <path d="M280 430 V170 H380 V430 Z M820 430 V170 H920 V430 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M270 170 L330 90 L390 170 Z" fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* la toiture en cours : la charpente seule */}
      <path d="M820 170 L870 100 L920 170 M845 135 h50" {...thin} />
      <path d="M360 210 L600 120 L840 210 M440 180 V210 M520 150 V210 M600 120 V210 M680 150 V210 M760 180 V210" {...thin} />
      {/* les fenêtres */}
      {[420, 520, 640, 740].map((x) =>
        [250, 340].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width={40} height={56} fill={SUN} stroke={INK} strokeWidth={2} />),
      )}
      {[312, 852].map((x) => (
        <rect key={x} x={x} y={220} width={36} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      ))}
      {/* l'échafaudage */}
      <path d="M960 430 V200 M1040 430 V200 M960 260 H1040 M960 340 H1040 M960 260 L1040 340" {...thin} />
    </>
  );
}

// Rubrique « Insolite » : une maison glissée entre deux immeubles
function Etroite() {
  const immeuble = (x: number, w: number) => (
    <g key={x}>
      <path d={`M${x} 440 V70 H${x + w} V440 Z`} fill={SHADE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {[110, 190, 270, 350].map((y) =>
        [0, 1, 2].map((c) => <rect key={`${y}-${c}`} x={x + 40 + c * ((w - 120) / 2)} y={y} width={40} height={50} fill={PAPER} stroke={INK} strokeWidth={2} />),
      )}
    </g>
  );
  return (
    <>
      <path d="M0 440 H1200" {...line} />
      {immeuble(200, 360)}
      {immeuble(640, 360)}
      {/* la maison, sur pilotis */}
      <path d="M566 330 V150 H634 V330 Z" fill={PAPER} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={582} y={176} width={36} height={60} fill={SUN} stroke={INK} strokeWidth={2} />
      <rect x={582} y={256} width={36} height={50} fill={SUN} stroke={INK} strokeWidth={2} />
      <path d="M574 330 V440 M626 330 V440" {...line} />
      <path d="M588 440 L612 330 M592 420 h12 M596 398 h12 M601 376 h12 M606 354 h10" {...thin} />
      {/* cote de largeur */}
      <path d="M566 110 H634 M566 98 v24 M634 98 v24" {...thin} />
    </>
  );
}

const ART: Record<GuideArtKey, () => JSX.Element> = { souplex: Souplex, loft: Loft, plans: Plans, peniche: Peniche, mezzanine: Mezzanine, visite: Visite, terrasse: Terrasse, dpe: Dpe, credit: Credit, duplex: Duplex, charges: Charges, marche: Marche, negociation: Negociation, ventes: Ventes, offre: Offre, annonce: Annonce, horsmarche: HorsMarche, temps: Temps, revendre: Revendre, atypique: Atypique, mur: Mur, monument: Monument, architecte: Architecte, clim: Clim, verriere: Verriere, eglise: Eglise, atelier: Atelier, meuble: Meuble, amiante: Amiante, bureau: Bureau, cheminee: Cheminee, assurance: Assurance, conditions: Conditions, hotel: Hotel, dernieretage: DernierEtage, chauffage: Chauffage, surelever: Surelever, plateforme: Plateforme, balance: Balance, vue: Vue, hauteur: Hauteur, garage: Garage, veranda: Veranda, voieprivee: VoiePrivee, ascenseur: Ascenseur, expertise: Expertise, rdc: Rdc, chambres: Chambres, bruit: Bruit, division: Division, moulin: Moulin, loge: Loge, spa: Spa, plusieurs: Plusieurs, cave: Cave, avion: Avion, souterrain: Souterrain, train: Train, phare: Phare, arbre: Arbre, silo: Silo, ile: Ile, cabane: Cabane, paquebot: Paquebot, dome: Dome, troglo: Troglo, chateaudeau: ChateauDeau, conteneur: Conteneur, yourte: Yourte, van: Van, bunker: Bunker, prison: Prison, tiny: Tiny, bulle: Bulle, wagon: Wagon, flottant: Flottant, ecole: Ecole, hameau: Hameau, chateau: Chateau, etroite: Etroite };

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

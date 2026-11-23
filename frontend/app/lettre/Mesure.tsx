// Les dessins de la lettre « Avant-première » : un par caractéristique majeure d'un bien.
// Dessins originaux, au trait, avec une silhouette de 1,75 m pour donner l'échelle.

const INK = '#211C15';
const PAPER = '#FBF5E9';
const SUN = '#F6CF4E';
const LINE = '#D9CFBC';

export const KINDS: [string, string][] = [
  ['hauteur', 'Hauteur sous plafond'],
  ['verriere', 'Verrière'],
  ['surface', 'Surface ou terrasse'],
  ['jardin', 'Jardin'],
  ['vue', 'Vue'],
  ['etage', 'Étage'],
  ['fabrique', 'Ancien lieu de travail'],
  ['aucun', 'Sans dessin'],
];

const fr = (n: number) => String(Math.round(n * 100) / 100).replace('.', ',');

// Silhouette debout, pieds en (x, y), haute de 1,75 m à l'échelle k (pixels par mètre)
function Person({ x, y, k }: { x: number; y: number; k: number }) {
  const h = 52.5;
  return (
    <g transform={`translate(${x} ${y}) scale(${k / 30}) translate(${-x} ${-y})`} stroke={INK} strokeWidth={1.6 * (30 / k)} fill="none" strokeLinecap="round">
      <circle cx={x} cy={y - h + 5} r={4.6} fill={PAPER} />
      <path d={`M${x} ${y - h + 10}V${y - 21}M${x} ${y - 21}L${x - 6} ${y}M${x} ${y - 21}L${x + 6} ${y}M${x - 8} ${y - h + 24}L${x} ${y - h + 15}L${x + 8} ${y - h + 24}`} />
    </g>
  );
}

// Cote verticale, avec ses deux traits d'attache
function CoteV({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  return (
    <g>
      <g stroke={INK} strokeWidth={1.2}>
        <path d={`M${x} ${y1}V${y2}M${x - 6} ${y1}h12M${x - 6} ${y2}h12M${x - 4} ${y1 + 4}l8 -8M${x - 4} ${y2 + 4}l8 -8`} />
      </g>
      <text x={x + 12} y={(y1 + y2) / 2 + 5} fontFamily="Georgia, serif" fontSize={15} fill={INK}>{label}</text>
    </g>
  );
}

function CoteH({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <g stroke={INK} strokeWidth={1.2}>
        <path d={`M${x1} ${y}H${x2}M${x1} ${y - 6}v12M${x2} ${y - 6}v12M${x1 - 4} ${y + 4}l8 -8M${x2 - 4} ${y + 4}l8 -8`} />
      </g>
      <text x={(x1 + x2) / 2} y={y + 22} textAnchor="middle" fontFamily="Georgia, serif" fontSize={15} fill={INK}>{label}</text>
    </g>
  );
}

const W = 200;
const H = 190;

function Hauteur({ m, verriere, cote = true }: { m: number; verriere?: boolean; cote?: boolean }) {
  const y0 = H - 22;
  const k = Math.min(30, 150 / m);
  const h = m * k;
  const x1 = 22;
  const x2 = 128;
  const top = y0 - h;
  const eave = y0 - h * 0.7;
  const mid = (x1 + x2) / 2;
  return (
    <>
      {verriere ? (
        <>
          <path d={`M${x1} ${y0}V${eave}L${mid} ${top}L${x2} ${eave}V${y0}Z`} fill="#fff" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
          <g stroke={INK} strokeWidth={1}>
            {[0.25, 0.5, 0.75].map((t) => (
              <path key={t} d={`M${x1 + (mid - x1) * t} ${eave - (eave - top) * t}V${eave}M${x2 - (x2 - mid) * t} ${eave - (eave - top) * t}V${eave}`} />
            ))}
            <path d={`M${x1} ${eave}H${x2}M${mid} ${top}V${eave}`} />
          </g>
        </>
      ) : (
        <rect x={x1} y={top} width={x2 - x1} height={h} fill="#fff" stroke={INK} strokeWidth={1.6} />
      )}
      <rect x={x1} y={y0 - 6} width={x2 - x1} height={6} fill={SUN} stroke={INK} strokeWidth={1.2} />
      <path d={`M6 ${y0}H${W - 40}`} stroke={INK} strokeWidth={1.6} />
      <Person x={58} y={y0 - 6} k={k} />
      {cote && <CoteV x={x2 + 18} y1={top} y2={y0} label={`${fr(m)} m`} />}
    </>
  );
}

function Plan({ m2, jardin, cote = true }: { m2: number; jardin?: boolean; cote?: boolean }) {
  const c = Math.sqrt(m2);
  const k = Math.min(22, 128 / c);
  const s = c * k;
  const x = (W - s) / 2;
  const y = 8;
  const step = c > 9 ? 2 : 1;
  const lines: number[] = [];
  for (let i = step; i < c; i += step) lines.push(i);
  const r = Math.max(6, Math.min(13, s * 0.1));
  return (
    <>
      <rect x={x} y={y} width={s} height={s} fill="#fff" stroke={INK} strokeWidth={1.6} />
      <g stroke={LINE} strokeWidth={1}>
        {lines.map((i) => (
          <path key={i} d={`M${x + i * k} ${y}V${y + s}M${x} ${y + i * k}H${x + s}`} />
        ))}
      </g>
      {jardin ? (
        <g stroke={INK} strokeWidth={1.4}>
          <circle cx={x + s * 0.64} cy={y + s * 0.38} r={r * 1.7} fill={SUN} />
          <circle cx={x + s * 0.64} cy={y + s * 0.38} r={r * 0.5} fill={PAPER} />
          <circle cx={x + s * 0.3} cy={y + s * 0.28} r={r} fill={PAPER} />
        </g>
      ) : (
        <>
          <circle cx={x + s * 0.62} cy={y + s * 0.42} r={r} fill={SUN} stroke={INK} strokeWidth={1.4} />
          <g fill={PAPER} stroke={INK} strokeWidth={1.4}>
            <rect x={x + s * 0.62 - r * 0.45} y={y + s * 0.42 - r * 2.1} width={r * 0.9} height={r * 0.7} />
            <rect x={x + s * 0.62 - r * 0.45} y={y + s * 0.42 + r * 1.4} width={r * 0.9} height={r * 0.7} />
          </g>
        </>
      )}
      {/* silhouette vue de dessus : épaules larges de 50 cm environ */}
      <g stroke={INK} strokeWidth={1.4} fill={PAPER}>
        <ellipse cx={x + s * 0.2} cy={y + s * 0.78} rx={Math.max(3.5, k * 0.28)} ry={Math.max(2, k * 0.15)} />
        <circle cx={x + s * 0.2} cy={y + s * 0.78} r={Math.max(1.8, k * 0.12)} />
      </g>
      {cote && <CoteH x1={x} x2={x + s} y={y + s + 12} label={`${fr(m2)} m²`} />}
    </>
  );
}

function Vue() {
  const x = 30;
  const y = 14;
  const w = 140;
  const h = 150;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill="#fff" stroke={INK} strokeWidth={1.6} />
      <circle cx={x + w * 0.72} cy={y + h * 0.3} r={15} fill={SUN} stroke={INK} strokeWidth={1.4} />
      {/* les toits, un dôme, des cheminées */}
      <path
        d={`M${x} ${y + h * 0.72}h14v-10h10v-12h14v16h8v-8h6v8h10c0 -22 26 -22 26 0h8v-14h12v10h8v-6h6v16h8V${y + h}H${x}Z`}
        fill={PAPER}
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path d={`M${x + 75} ${y + h * 0.72 - 17}v-9`} stroke={INK} strokeWidth={1.4} />
      <g stroke={INK} strokeWidth={1.6}>
        <path d={`M${x + w / 2} ${y}V${y + h}M${x} ${y + h * 0.36}H${x + w}`} />
      </g>
      <path d={`M${x - 8} ${y + h}H${x + w + 8}`} stroke={INK} strokeWidth={2.4} />
    </>
  );
}

function Etage({ n, label = true }: { n: number; label?: boolean }) {
  const floors = Math.max(1, Math.min(14, Math.round(n) + 1)); // rez-de-chaussée compris
  const y0 = H - 22;
  const fh = Math.min(18, 150 / floors);
  const x = 62;
  const w = 76;
  const top = y0 - floors * fh;
  return (
    <>
      <rect x={x} y={top} width={w} height={floors * fh} fill="#fff" stroke={INK} strokeWidth={1.6} />
      <rect x={x} y={top} width={w} height={fh} fill={SUN} stroke={INK} strokeWidth={1.6} />
      <g stroke={INK} strokeWidth={1}>
        {Array.from({ length: floors - 1 }, (_, i) => (
          <path key={i} d={`M${x} ${top + (i + 1) * fh}H${x + w}`} />
        ))}
      </g>
      {/* le garde-corps de la terrasse */}
      <path d={`M${x} ${top - 7}H${x + w}M${x} ${top}v-7M${x + w} ${top}v-7M${x + w / 3} ${top}v-7M${x + (2 * w) / 3} ${top}v-7`} stroke={INK} strokeWidth={1.2} />
      <path d={`M10 ${y0}H${W - 10}`} stroke={INK} strokeWidth={1.6} />
      <Person x={36} y={y0} k={fh / 2.9} />
      {label && <text x={x + w + 12} y={top + fh / 2 + 5} fontFamily="Georgia, serif" fontSize={15} fill={INK}>{Math.round(n)}e</text>}
    </>
  );
}

function Fabrique() {
  const y0 = H - 22;
  return (
    <>
      <rect x={150} y={36} width={16} height={y0 - 36} fill="#fff" stroke={INK} strokeWidth={1.6} />
      <path d={`M146 36h24`} stroke={INK} strokeWidth={1.6} />
      <path d={`M20 ${y0}V96l40 -28v28l40 -28v28l40 -28v${y0 - 68}Z`} fill="#fff" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
      <g stroke={INK} strokeWidth={1}>
        <path d="M30 96l30 -21M70 96l30 -21M110 96l30 -21" />
      </g>
      <rect x={66} y={y0 - 44} width={30} height={44} fill={SUN} stroke={INK} strokeWidth={1.4} />
      <path d={`M6 ${y0}H${W - 6}`} stroke={INK} strokeWidth={1.6} />
      <Person x={42} y={y0} k={20} />
    </>
  );
}

export default function Mesure({ kind, valeur, className }: { kind: string; valeur?: number | null; className?: string }) {
  if (kind === 'aucun') return null;
  const v = typeof valeur === 'number' && valeur > 0 ? valeur : Number(valeur) > 0 ? Number(valeur) : null;
  let inner: React.ReactNode;
  if (kind === 'hauteur') inner = <Hauteur m={v ?? 4} cote={v != null} />;
  else if (kind === 'verriere') inner = <Hauteur m={v ?? 5} verriere cote={v != null} />;
  else if (kind === 'surface') inner = <Plan m2={v ?? 20} cote={v != null} />;
  else if (kind === 'jardin') inner = <Plan m2={v ?? 30} jardin cote={v != null} />;
  else if (kind === 'etage') inner = <Etage n={v ?? 6} label={v != null} />;
  else if (kind === 'fabrique') inner = <Fabrique />;
  else inner = <Vue />;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label="Dessin à l’échelle, avec une silhouette de 1,75 m">
      {inner}
    </svg>
  );
}

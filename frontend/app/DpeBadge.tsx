// Pastilles de performance énergétique (DPE) et climat (GES), classes A à G

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const DPE_COLORS = ['#2e9e44', '#4fb848', '#b7d33a', '#f2e42c', '#f5b82e', '#ee7d2f', '#d7302b'];
const GES_COLORS = ['#e6dcf2', '#cdbbe6', '#b49bd9', '#9879c6', '#7a58ae', '#5b3a90', '#3d2370'];
const DARK_TEXT = [false, false, true, true, true, false, false];

function cleanClass(v: string | null | undefined): string | null {
  const c = (v || '').trim().toUpperCase();
  return LETTERS.includes(c) ? c : null;
}

// Petite pastille pour les vignettes : « DPE D »
export function DpeChip({ value }: { value: string | null | undefined }) {
  const c = cleanClass(value);
  if (!c) return null;
  const i = LETTERS.indexOf(c);
  return (
       <span
      className="inline-flex items-stretch overflow-hidden rounded-full text-xs font-semibold uppercase tracking-wider leading-none"
      title={`Classe énergie (DPE) : ${c}`}
    >
      <span className="bg-white text-stone-600 pl-2 pr-1 py-[3px]">DPE</span>
      <span
        className="pl-1.5 pr-2 py-[3px]"
        style={{ backgroundColor: DPE_COLORS[i], color: DARK_TEXT[i] ? '#1c1917' : '#ffffff' }}
      >
        {c}
      </span>
    </span>
  );
}

// Échelle A à G avec la classe du bien mise en évidence (fiche détaillée)
export function DpeScale({
  title,
  value,
  kind,
}: {
  title: string;
  value: string | null | undefined;
  kind: 'dpe' | 'ges';
}) {
  const c = cleanClass(value);
  const colors = kind === 'dpe' ? DPE_COLORS : GES_COLORS;
  const dark = kind === 'dpe' ? DARK_TEXT : [true, true, true, false, false, false, false];
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-stone-500">{title}</p>
      {c ? (
        <div className="mt-2 flex items-end gap-1" role="img" aria-label={`${title} : classe ${c}`}>
          {LETTERS.map((l, i) => {
            const on = l === c;
            return (
              <span
                key={l}
                className="flex items-center justify-center font-semibold"
                style={{
                  backgroundColor: colors[i],
                  color: dark[i] ? '#1c1917' : '#ffffff',
                  width: on ? 38 : 24,
                  height: on ? 38 : 24,
                  fontSize: on ? 18 : 11,
                  opacity: on ? 1 : 0.45,
                  outline: on ? '2px solid #1c1917' : 'none',
                  outlineOffset: 1,
                  borderRadius: 6,
                }}
              >
                {l}
              </span>
            );
          })}
        </div>
      ) : (
        <p className="mt-2 text-sm text-stone-500">Non communiqué</p>
      )}
    </div>
  );
}

// Pastille compacte pour la fiche : « DPE » suivi de la lettre dans sa couleur
export function EnergyPill({ kind, value, bare = false }: { kind: 'dpe' | 'ges'; value: string | null | undefined; bare?: boolean }) {
  const c = cleanClass(value);
  if (!c) return null;
  const i = LETTERS.indexOf(c);
  const bg = kind === 'dpe' ? DPE_COLORS[i] : GES_COLORS[i];
  const dark = kind === 'dpe' ? DARK_TEXT[i] : i < 3;
  // « bare » : la lettre seule dans son carré de couleur, sans le libellé devant
  if (bare) {
    return (
      <span
        className="h-7 w-7 rounded-full inline-flex items-center justify-center text-sm font-sans font-semibold"
        style={{ backgroundColor: bg, color: dark ? '#1c1917' : '#ffffff' }}
        title={kind === 'dpe' ? `Classe énergie (DPE) : ${c}` : `Classe climat (GES) : ${c}`}
      >
        {c}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500"
      title={kind === 'dpe' ? `Classe énergie (DPE) : ${c}` : `Classe climat (GES) : ${c}`}
    >
      {kind === 'dpe' ? 'DPE' : 'GES'}
      <span
        className="h-7 w-7 rounded-full inline-flex items-center justify-center text-sm font-semibold normal-case"
        style={{ backgroundColor: bg, color: dark ? '#1c1917' : '#ffffff' }}
      >
        {c}
      </span>
    </span>
  );
}

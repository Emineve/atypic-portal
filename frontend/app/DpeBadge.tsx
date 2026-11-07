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
      className="inline-flex items-stretch text-[10px] font-semibold uppercase tracking-wider shadow-sm"
      title={`Classe énergie (DPE) : ${c}`}
    >
      <span className="bg-white/95 text-stone-800 px-1.5 py-1">DPE</span>
      <span
        className="px-2 py-1"
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
      <p className="text-[10px] uppercase tracking-widest text-stone-400">{title}</p>
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

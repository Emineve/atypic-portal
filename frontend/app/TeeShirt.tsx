// Tee-shirt dessiné pour Loftissime, en noir ou en blanc : quelques mots dans la police du logo, ou le « o » à l'œil.
// Simple aperçu, rien n'est encore en vente.
// « mark » : à la place des mots, l'œil de l'icône du site ; « gaze » dit où il regarde.
export type Gaze = 'droite' | 'gauche' | 'haut' | 'bas' | 'clin';

const PUPIL: Record<Exclude<Gaze, 'clin'>, [number, number]> = {
  droite: [106.5, 93],
  gauche: [93.5, 93],
  haut: [100, 88.5],
  bas: [100, 103.5],
};

export default function TeeShirt({ words, color = '#ffffff', className = '', mark = false, gaze = 'droite' }: { words: string[]; color?: string; className?: string; mark?: boolean; gaze?: Gaze }) {
  const dark = color.toLowerCase() !== '#ffffff';
  const ink = dark ? '#ffffff' : '#1c1917';
  // La taille s'ajuste au mot le plus long, pour qu'il tienne entre les coutures
  const size = Math.min(10.5, 124 / Math.max(...words.map((w) => w.length)));
  const top = 104 - ((words.length - 1) * (size + 2.5)) / 2;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={mark ? 'Tee-shirt au « o » qui a un œil, l’icône du site' : `Tee-shirt « ${words.join(' ')} »`}>
      <path
        d="M62 28 L84 20 Q100 36 116 20 L138 28 L178 58 L158 86 L142 74 V182 H58 V74 L42 86 L22 58 Z"
        fill={color}
        stroke="#1c1917"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M84 20 Q100 44 116 20" fill="none" stroke={dark ? '#ffffff' : '#1c1917'} strokeWidth="1.5" />
      {mark && (
        <g>
          <circle cx="100" cy="96" r="19" fill={ink} />
          {gaze === 'clin' ? (
            <path d="M88.5 98 Q100 106.5 111.5 98" fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round" />
          ) : (
            <circle cx={PUPIL[gaze][0]} cy={PUPIL[gaze][1]} r="8" fill={color} />
          )}
        </g>
      )}
      {!mark && words.map((w, i) => (
        <text key={w} x="100" y={top + i * (size + 2.5)} textAnchor="middle" className="font-logo" fontWeight="600" fontSize={size} letterSpacing="-0.3" fill={ink}>
          {w}
        </text>
      ))}
    </svg>
  );
}

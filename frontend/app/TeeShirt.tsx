// Tee-shirt dessiné pour Loftissime : quelques mots dans la police du logo, en noir, sur un tissu de couleur.
// Simple aperçu, rien n'est encore en vente.
// « mark » : à la place des mots, le « l. » de l'icône du site, dont le point est un œil.
export default function TeeShirt({ words, color = '#ffffff', className = '', mark = false }: { words: string[]; color?: string; className?: string; mark?: boolean }) {
  // La taille s'ajuste au mot le plus long, pour qu'il tienne entre les coutures
  const size = Math.min(10.5, 124 / Math.max(...words.map((w) => w.length)));
  const top = 104 - ((words.length - 1) * (size + 2.5)) / 2;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={mark ? 'Tee-shirt au « l. » dont le point est un œil' : `Tee-shirt « ${words.join(' ')} »`}>
      <path
        d="M62 28 L84 20 Q100 36 116 20 L138 28 L178 58 L158 86 L142 74 V182 H58 V74 L42 86 L22 58 Z"
        fill={color}
        stroke="#1c1917"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M84 20 Q100 44 116 20" fill="none" stroke="#1c1917" strokeWidth="1.5" />
      {mark && (
        <g transform="translate(100 102) scale(1.7) translate(-98.5 -99)">
          <rect x="84" y="84" width="7" height="30" fill="#1c1917" />
          <circle cx="105" cy="106.5" r="7.5" fill="#1c1917" />
          <circle cx="107.3" cy="105" r="3.4" fill={color} />
        </g>
      )}
      {!mark && words.map((w, i) => (
        <text key={w} x="100" y={top + i * (size + 2.5)} textAnchor="middle" className="font-logo" fontWeight="600" fontSize={size} letterSpacing="-0.3" fill="#1c1917">
          {w}
        </text>
      ))}
    </svg>
  );
}

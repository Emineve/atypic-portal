// Tee-shirt dessiné pour Loftissime : une phrase du site ou le logo, à porter. Simple aperçu, rien n'est encore en vente.
// Modèle au logo : « loftisssssime. » sur une ligne, en noir, sur un tissu de couleur.
export default function TeeShirt({
  lines = [],
  logo = false,
  color,
  dark = false,
  className = '',
}: {
  lines?: string[];
  logo?: boolean;
  color?: string; // couleur du tissu, pour le modèle au logo
  dark?: boolean;
  className?: string;
}) {
  const cloth = color || (dark ? '#1c1917' : '#ffffff');
  const ink = dark ? '#ffffff' : '#1c1917';
  const top = 100 - ((lines.length - 1) * 13) / 2;
  const label = logo ? 'Tee-shirt « loftisssssime. »' : `Tee-shirt « ${lines.join(' ')} »`;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={label}>
      <path
        d="M62 28 L84 20 Q100 36 116 20 L138 28 L178 58 L158 86 L142 74 V182 H58 V74 L42 86 L22 58 Z"
        fill={cloth}
        stroke="#1c1917"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M84 20 Q100 44 116 20" fill="none" stroke={dark ? '#57534e' : '#1c1917'} strokeWidth="1.5" />
      {logo && (
        <text x="100" y="104" textAnchor="middle" className="font-logo" fontWeight="600" fontSize="10.5" letterSpacing="-0.3" fill="#1c1917">
          loftisssssime.
        </text>
      )}
      {!logo &&
        lines.map((l, i) => (
          <text key={l} x="100" y={top + i * 13} textAnchor="middle" className="font-serif" fontSize="9" fill={ink}>
            {l}
          </text>
        ))}
      {!logo && (
        <text x="100" y="166" textAnchor="middle" className="font-logo" fontSize="8" fontWeight="600" fill={ink}>
          loftissime.
        </text>
      )}
    </svg>
  );
}

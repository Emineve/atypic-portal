// Le tee-shirt Loftissime : blanc, avec le mot « atypiques » qui penche sur son trait jaune,
// comme dans le titre de l'accueil. Simple aperçu, rien n'est encore en vente.
export default function TeeShirt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Tee-shirt blanc, le mot « atypiques » souligné de jaune">
      <path
        d="M62 28 L84 20 Q100 36 116 20 L138 28 L178 58 L158 86 L142 74 V182 H58 V74 L42 86 L22 58 Z"
        fill="#ffffff"
        stroke="#1c1917"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M84 20 Q100 44 116 20" fill="none" stroke="#1c1917" strokeWidth="1.5" />
      <g transform="rotate(-6 100 100)">
        <rect x="70" y="97" width="60" height="8" fill="#F6CF4E" />
        <text x="100" y="103" textAnchor="middle" className="font-serif" fontStyle="italic" fontSize="16" letterSpacing="-0.3" fill="#1c1917">
          atypiques
        </text>
      </g>
    </svg>
  );
}

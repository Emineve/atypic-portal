// Le tee-shirt Loftissime : blanc, avec le logo du site sur la poitrine.
// Simple aperçu, rien n'est encore en vente.
export default function TeeShirt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Tee-shirt blanc, avec le logo Loftissime">
      <path
        d="M62 28 L84 20 Q100 36 116 20 L138 28 L178 58 L158 86 L142 74 V182 H58 V74 L42 86 L22 58 Z"
        fill="#ffffff"
        stroke="#1c1917"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M84 20 Q100 44 116 20" fill="none" stroke="#1c1917" strokeWidth="1.5" />
      <text x="100" y="104" textAnchor="middle" className="font-logo" fontWeight="600" fontSize="11.5" letterSpacing="-0.38" fill="#1c1917">
        loftissime.
      </text>
    </svg>
  );
}

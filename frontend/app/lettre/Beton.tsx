// Le vocabulaire de « Béton ciré », la newsletter de Loftissime : le béton, l'acier, la verrière d'atelier.

export const BETON_BG: React.CSSProperties = {
  backgroundColor: '#E3DFD8',
  backgroundImage: 'radial-gradient(rgba(33,28,21,.07) 1px, transparent 1.2px), radial-gradient(rgba(255,255,255,.5) 1px, transparent 1.2px)',
  backgroundSize: '7px 7px, 11px 11px',
  backgroundPosition: '0 0, 3px 5px',
};

// Une poutre d'acier en tête de rubrique : un trait épais, deux rivets
export function Poutre({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex h-[9px] items-center justify-between bg-[#3A2E2A] px-1.5 ${className}`}>
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3DFD8]" />
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3DFD8]" />
    </div>
  );
}

// La vidéo d'une visite, vue à travers une verrière d'atelier. Tant que la vidéo n'est pas tournée, le cadre l'annonce.
export function Verriere({ label, className = '' }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 640 400" className={`block w-full ${className}`} role="img" aria-label={label}>
      <rect width={640} height={400} fill="#4a4238" />
      <g stroke="#3A2E2A" strokeWidth={8} fill="none">
        <path d="M4 4H636V396H4ZM162 4V396M320 4V396M478 4V396M4 136H636M4 266H636" />
      </g>
      <circle cx={320} cy={200} r={44} fill="#3A2E2A" />
      <circle cx={320} cy={200} r={40} fill="none" stroke="#FCFBF8" strokeWidth={2.5} />
      <path d="M308 181L342 200L308 219Z" fill="#FCFBF8" />
    </svg>
  );
}

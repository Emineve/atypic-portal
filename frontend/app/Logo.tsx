import Link from 'next/link';

// Logo du site : minuscules, police géométrique, point final. La signature ne s'affiche jamais dans un en-tête.
export default function Logo({ className = 'text-2xl', tagline = false }: { className?: string; tagline?: boolean }) {
  return (
    <Link href="/" aria-label="Loftissime, le média de l'immobilier atypique : retour à l'accueil" className="inline-flex flex-col">
      <span className={`font-logo font-semibold lowercase tracking-tight leading-none text-stone-900 whitespace-nowrap ${className}`}>loftissime.</span>
      {tagline && <span className="mt-1 text-xs leading-none text-stone-500 whitespace-nowrap">Curateur de biens atypiques</span>}
    </Link>
  );
}

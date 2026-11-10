import Link from 'next/link';

// Logo du site : minuscules, police géométrique, point final.
export default function Logo({ className = 'text-2xl' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Loftissime, retour à l'accueil"
      className={`font-logo font-semibold lowercase tracking-tight leading-none text-stone-900 ${className}`}
    >
      loftissime.
    </Link>
  );
}

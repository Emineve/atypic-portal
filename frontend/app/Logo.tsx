import Link from 'next/link';

// Logo du site : minuscules, police géométrique, point final, et la signature juste dessous.
export default function Logo({ className = 'text-2xl' }: { className?: string }) {
  return (
    <Link href="/" aria-label="Loftissime, curateur de biens atypiques : retour à l'accueil" className="inline-flex flex-col">
      <span className={`font-logo font-semibold lowercase tracking-tight leading-none text-stone-900 ${className}`}>loftissime.</span>
      <span className="mt-1 text-[11px] leading-none text-stone-500 whitespace-nowrap">Curateur de biens atypiques</span>
    </Link>
  );
}

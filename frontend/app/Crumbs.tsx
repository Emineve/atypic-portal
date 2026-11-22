import Link from 'next/link';

// Fil d'Ariane : « Accueil › Rubrique », le même partout. Le dernier élément est la page en cours, sans lien.
export default function Crumbs({ items, className = '', dark = false }: { items: { label: string; href?: string }[]; className?: string; dark?: boolean }) {
  return (
    <nav aria-label="Fil d'Ariane" className={`text-xs ${dark ? 'text-stone-400' : 'text-stone-500'} ${className}`}>
      <Link href="/" className={dark ? 'hover:text-white' : 'hover:text-stone-900'}>Accueil</Link>
      {items.map((it) => (
        <span key={it.label}>
          {' › '}
          {it.href ? <Link href={it.href} className={dark ? 'hover:text-white' : 'hover:text-stone-900'}>{it.label}</Link> : <span className={dark ? 'text-stone-200' : 'text-stone-700'}>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

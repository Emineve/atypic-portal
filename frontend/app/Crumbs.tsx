import Link from 'next/link';

// Fil d'Ariane : « Accueil › Rubrique », le même partout. Le dernier élément est la page en cours, sans lien.
export default function Crumbs({ items, className = '' }: { items: { label: string; href?: string }[]; className?: string }) {
  return (
    <nav aria-label="Fil d'Ariane" className={`text-xs text-stone-500 ${className}`}>
      <Link href="/" className="hover:text-stone-900">Accueil</Link>
      {items.map((it) => (
        <span key={it.label}>
          {' › '}
          {it.href ? <Link href={it.href} className="hover:text-stone-900">{it.label}</Link> : <span className="text-stone-700">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}

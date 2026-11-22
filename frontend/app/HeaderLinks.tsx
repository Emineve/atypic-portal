import Link from 'next/link';

// Les trois entrées principales, côté acheteur (l'espace pro reste dans le pied de page), visibles dans l'en-tête sur grand écran. Le reste est dans le menu.
const LINKS = [
  { href: '/', label: 'Acheter' },
  { href: '/guide', label: 'État des lieux' },
  { href: '/financement', label: 'Financement' },
];

export default function HeaderLinks() {
  return (
    <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-7">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} className="text-sm font-medium normal-case tracking-normal text-stone-700 transition hover:text-stone-900">
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

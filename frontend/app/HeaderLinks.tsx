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
        <Link key={l.href} href={l.href} className="text-sm font-medium normal-case tracking-normal text-stone-700 hover:text-stone-900 bg-[linear-gradient(#F6CF4E,#F6CF4E)] bg-[position:0_100%] pb-[3px] bg-no-repeat transition-[background-size,color] duration-300 bg-[length:0%_2px] hover:bg-[length:100%_2px] active:bg-[length:100%_2px] focus-visible:bg-[length:100%_2px]">
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

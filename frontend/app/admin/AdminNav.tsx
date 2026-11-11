'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/annonces', label: 'Annonces' },
  { href: '/admin/agences', label: 'Agences' },
];

export default function AdminNav() {
  const path = usePathname() || '';
  return (
    <nav className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between gap-6 overflow-x-auto">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span className="text-[10px] uppercase tracking-widest text-stone-400">Back-office</span>
          {ITEMS.map((it) => {
            const active = it.href === '/admin' ? path === '/admin' : path.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`text-xs uppercase tracking-wider ${active ? 'text-white underline underline-offset-8' : 'text-stone-300 hover:text-white'}`}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-wider text-stone-300 hover:text-white whitespace-nowrap">
          Voir le site
        </a>
      </div>
    </nav>
  );
}

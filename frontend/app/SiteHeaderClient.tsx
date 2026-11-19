'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, BookOpen, Calculator, Compass, Feather, Heart, Home, Info, Lightbulb, Menu, X } from 'lucide-react';
import Logo from './Logo';
import ModeEmploiBack from './ModeEmploiBack';

const FAVORITES_KEY = 'singulier:favorites';

const LINKS = [
  { href: '/guide', label: 'État des lieux', sub: 'Ce qu’il faut savoir avant d’acheter', Icon: BookOpen },
  { href: '/inspiration', label: 'Inspiration', sub: 'Un architecte à la une', Icon: Lightbulb },
  { href: '/financement', label: 'Financement', sub: 'Estimer ma mensualité', Icon: Calculator },
  { href: '/mode-d-emploi', label: 'Mode d’emploi', sub: 'Du premier clic à la visite', Icon: Compass },
  { href: '/qui-sommes-nous', label: 'Pourquoi Loftissime', sub: '', Icon: Feather },
  { href: '/charte', label: 'Questions fréquentes', sub: '', Icon: Info },
];

// En-tête commun aux pages intérieures : logo (retour à l'accueil), lien de retour vers une rubrique s'il y en a un, et le même menu que sur l'accueil,
// pour passer d'une rubrique à l'autre sans revenir à la liste des biens.
export default function SiteHeaderClient({
  backHref,
  backLabel,
  back,
  children,
  alert = true,
  newArticles = 0,
}: {
  backHref?: string;
  backLabel?: string;
  back?: React.ReactNode; // lien de retour sur mesure (ex. retour à l'annonce)
  children?: React.ReactNode; // lien supplémentaire propre à la page
  newArticles?: number; // derniers articles parus dans État des lieux
  alert?: boolean; // bouton « Créer mon alerte » (masqué sur les pages destinées aux agences)
}) {
  const [open, setOpen] = useState(false);
  const [favs, setFavs] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setFavs(Array.isArray(list) ? list.length : 0);
    } catch {
      setFavs(0);
    }
  }, [open]);

  return (
    <>
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-4 sm:gap-6">
            <ModeEmploiBack />
            {back ??
              (backHref && backLabel ? (
                <Link href={backHref} className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition whitespace-nowrap">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {backLabel}
                </Link>
              ) : null)}
            {children}
            {alert && (
              <a
                href="/?alerte=1"
                aria-label="Créer mon alerte"
                className="inline-flex h-10 items-center gap-2 px-3 sm:px-4 rounded-[10px] bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap hover:bg-stone-800 transition"
              >
                <Bell className="w-4 h-4 text-white" strokeWidth={1.5} />
                <span className="hidden sm:inline">Créer mon alerte</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              className="h-11 w-11 -mr-3 flex items-center justify-center text-stone-900 hover:text-stone-500 transition"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-stone-900/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200 shrink-0">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="h-11 w-11 -mr-3 flex items-center justify-center text-stone-600 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-4">
              <a href="/?alerte=1" className="flex items-center gap-3 py-4 border-b border-stone-200 font-serif text-2xl text-stone-900">
                <Bell className="w-5 h-5 text-stone-900" strokeWidth={1.5} />
                Créer mon alerte
              </a>
              <a href="/?favoris=1" className="flex items-center justify-between gap-3 py-4 border-b border-stone-200">
                <span className="flex items-center gap-3 font-serif text-2xl text-stone-900">
                  <Heart className={`w-5 h-5 ${favs > 0 ? 'fill-red-600 text-red-600' : 'text-stone-400'}`} strokeWidth={1.5} />
                  Mes favoris
                </span>
                {favs > 0 && <span className="text-sm text-stone-500">{favs}</span>}
              </a>
              <a href="/" className="flex gap-3 py-4 border-b border-stone-200 font-serif text-2xl text-stone-900">
                <Home className="mt-1.5 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} />
                Accueil
              </a>
              {LINKS.map(({ href, label, sub, Icon }) => (
                <a key={href} href={href} className="flex gap-3 py-4 border-b border-stone-200">
                  <Icon className="mt-1.5 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} />
                  <span>
                    <span className="block font-serif text-2xl text-stone-900">
                      {label}
                      {href === '/guide' && newArticles > 0 && (
                        <span className="ml-3 inline-block align-middle bg-[#F4E7B5] px-1.5 py-0.5 font-sans text-xs font-semibold uppercase tracking-wider text-stone-900">
                          + {newArticles} {newArticles > 1 ? 'articles' : 'article'}
                        </span>
                      )}
                    </span>
                    {sub && <span className="mt-0.5 block text-sm text-stone-500">{sub}</span>}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

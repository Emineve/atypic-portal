'use client';

import { blackButtonOnScreen } from '../lib/blackButton';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, BookOpen, Calculator, Compass, Feather, Heart, Info, Lightbulb, Menu, X } from 'lucide-react';
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
  wide = false,
}: {
  wide?: boolean; // pages de listes d'annonces : même largeur que la grille
  backHref?: string;
  backLabel?: string;
  back?: React.ReactNode; // lien de retour sur mesure (ex. retour à l'annonce)
  children?: React.ReactNode; // lien supplémentaire propre à la page
  newArticles?: number; // derniers articles parus dans État des lieux
  alert?: boolean; // bouton « Créer mon alerte » (masqué sur les pages destinées aux agences)
}) {
  const [open, setOpen] = useState(false);
  const [favs, setFavs] = useState(0);
  const [fab, setFab] = useState(false);

  // « + Nouvelle alerte » : apparaît en bas de l'écran une fois la page entamée, s'efface à l'approche du pied de page
  useEffect(() => {
    if (!alert) return;
    const onScroll = () => {
      const y = window.scrollY;
      const left = document.documentElement.scrollHeight - y - window.innerHeight;
      // Pas deux invitations à la fois : il s'efface dès qu'un bloc « Créer mon alerte » de la page est à l'écran
      setFab(y > 500 && left > 500 && !blackButtonOnScreen());
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [alert]);

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
        <div className={`${wide ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-6 h-16 flex items-center justify-between gap-4`}>
          <Logo />
          <div className="flex items-center gap-4 sm:gap-6">
            <ModeEmploiBack />
            {back ??
              (backHref && backLabel ? (
                <Link href={backHref} className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition whitespace-nowrap">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {backLabel}
                </Link>
              ) : null)}
            {children}
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

      {alert && fab && !open && (
        <div data-fab className="fixed inset-x-0 z-40 flex justify-center px-6 pointer-events-none" style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}>
          <a href="/?alerte=1" className="pointer-events-auto inline-flex h-12 items-center gap-2 pl-5 pr-6 rounded-full bg-stone-900 text-white text-sm font-medium shadow-lg hover:bg-stone-800 transition">
            <Plus className="w-4 h-4" strokeWidth={2} />
            Nouvelle alerte
          </a>
        </div>
      )}

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
                <Plus className="w-5 h-5 text-stone-900" strokeWidth={1.5} />
                Nouvelle alerte
              </a>
              <a href="/?favoris=1" className="flex items-center justify-between gap-3 py-4 border-b border-stone-200">
                <span className="flex items-center gap-3 font-serif text-2xl text-stone-900">
                  <Heart className={`w-5 h-5 ${favs > 0 ? 'fill-red-600 text-red-600' : 'text-stone-400'}`} strokeWidth={1.5} />
                  <span>
                    Mes favoris
                    {favs > 0 && <span className="text-stone-500"> ({favs})</span>}
                  </span>
                </span>
              </a>
              {LINKS.map(({ href, label, sub, Icon }) => (
                <a key={href} href={href} className="flex gap-3 py-4 border-b border-stone-200">
                  <Icon className="mt-1.5 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} />
                  <span>
                    <span className="block font-serif text-2xl text-stone-900">
                      {label}
                      {href === '/guide' && newArticles > 0 && (
                        <span className="ml-3 inline-block align-middle rounded-full bg-[#F4E7B5] px-2.5 py-0.5 font-sans text-xs text-stone-800">
                          {newArticles} articles
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

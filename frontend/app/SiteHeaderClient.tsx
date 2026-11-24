'use client';

import HeaderLinks from './HeaderLinks';
import DemoBand from './DemoBand';
import { blackButtonOnScreen } from '../lib/blackButton';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Menu } from 'lucide-react';
import Logo from './Logo';
import MenuPanel from './MenuPanel';
import ModeEmploiBack from './ModeEmploiBack';
import { useSiteMode } from './SiteMode';

const LETTER_LINKS = [
  { href: '/lettre', label: 'Béton ciré, tous les numéros' },
  { href: '/guide', label: 'Avant de signer' },
];
const LETTER_LINK =
  'text-sm font-medium text-stone-700 hover:text-stone-900 bg-[linear-gradient(#211C15,#211C15)] bg-[position:0_100%] pb-[3px] bg-no-repeat transition-[background-size,color] duration-300 bg-[length:0%_2px] hover:bg-[length:100%_2px] focus-visible:bg-[length:100%_2px]';

const FAVORITES_KEY = 'singulier:favorites';

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
  const [fabOnDark, setFabOnDark] = useState(false); // le bouton passe au-dessus du pied de page sombre

  // « + Nouvelle alerte » : apparaît en bas de l'écran une fois la page entamée, s'efface à l'approche du pied de page
  useEffect(() => {
    if (!alert) return;
    const onScroll = () => {
      const y = window.scrollY;
      const left = document.documentElement.scrollHeight - y - window.innerHeight;
      // Pas deux invitations à la fois : il s'efface dès qu'un bloc « Créer mon alerte » de la page est à l'écran
      setFab(y > 500 && left > 80 && !blackButtonOnScreen());
      // Au-dessus du pied de page sombre, le bouton passe en blanc pour rester lisible
      const dark = document.querySelector('[data-dark-footer]');
      setFabOnDark(Boolean(dark && dark.getBoundingClientRect().top < window.innerHeight - 44));
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

  const mode = useSiteMode();
  // Mode lettre : trois entrées, pas de menu, pas d'alerte
  if (mode === 'lettre')
    return (
      <>
        <DemoBand />
        <nav aria-label="Navigation principale" className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-10">
              <Logo />
              <div className="hidden sm:flex items-center gap-7">
                {LETTER_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className={LETTER_LINK}>{l.label}</Link>
                ))}
              </div>
            </div>
            <a href="/#recevoir" className="text-sm font-medium text-stone-900 whitespace-nowrap bg-[linear-gradient(#211C15,#211C15)] bg-[position:0_100%] bg-no-repeat bg-[length:100%_2px] pb-[3px]">
              Recevoir Béton ciré
            </a>
          </div>
          <div className="sm:hidden border-t border-stone-200 px-6 h-11 flex items-center gap-7">
            {LETTER_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={LETTER_LINK}>{l.label}</Link>
            ))}
          </div>
        </nav>
      </>
    );

  return (
    <>
      <DemoBand />
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className={`${wide ? 'max-w-7xl' : 'max-w-6xl'} mx-auto px-6 h-16 flex items-center justify-between gap-4`}>
          <div className="flex items-center gap-10">
            <Logo />
            <HeaderLinks />
          </div>
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
          <a
            href="/?alerte=1"
            className={`pointer-events-auto inline-flex h-12 items-center gap-2 pl-5 pr-6 rounded-full text-sm font-medium shadow-lg transition ${
              fabOnDark ? 'bg-white text-stone-900 hover:bg-stone-100' : 'bg-stone-900 text-[#FBF5E9] hover:bg-stone-800'
            }`}
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Nouvelle alerte
          </a>
        </div>
      )}

      {open && <MenuPanel onClose={() => setOpen(false)} favs={favs} articles={newArticles} />}
    </>
  );
}

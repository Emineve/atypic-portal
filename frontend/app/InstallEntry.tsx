'use client';

import { useEffect, useState } from 'react';
import { MoreVertical, PlusSquare, Share, Smartphone, X } from 'lucide-react';

// Guide « Loftissime sur mon écran d'accueil » : sur mobile seulement, et seulement tant que le raccourci n'est pas posé.
// Deux entrées discrètes, jamais d'apparition automatique : une ligne après la création d'une alerte, une ligne dans le menu.

const DONE_KEY = 'loftissime:raccourci';

type Platform = 'ios' | 'android';

function detectPlatform(): Platform | null {
  try {
    const ua = navigator.userAgent;
    // Navigateurs intégrés aux applis (Instagram, Facebook…) : pas d'ajout à l'écran d'accueil possible
    if (/FBAN|FBAV|Instagram|LinkedInApp|Line\//i.test(ua)) return null;
    const nav = navigator as Navigator & { standalone?: boolean };
    // Site déjà ouvert depuis son icône
    if (nav.standalone === true || window.matchMedia('(display-mode: standalone)').matches) return null;
    if (localStorage.getItem(DONE_KEY) === '1') return null;
    if (/iPhone|iPod|iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
    if (/Android/.test(ua)) return 'android';
    return null;
  } catch {
    return null;
  }
}

const STEPS: Record<Platform, { Icon: typeof Share; title: React.ReactNode; sub?: string }[]> = {
  ios: [
    {
      Icon: Share,
      title: (
        <>
          Touchez <strong className="font-semibold">Partager</strong> dans la barre de votre navigateur
        </>
      ),
      sub: 'S’il n’apparaît pas, ouvrez d’abord le menu « ••• ».',
    },
    {
      Icon: PlusSquare,
      title: (
        <>
          Choisissez <strong className="font-semibold">Sur l’écran d’accueil</strong>
        </>
      ),
      sub: 'Plus bas dans la liste, faites défiler si besoin.',
    },
    {
      Icon: Smartphone,
      title: (
        <>
          Validez avec <strong className="font-semibold">Ajouter</strong>
        </>
      ),
      sub: 'L’icône Loftissime rejoint vos applications.',
    },
  ],
  android: [
    {
      Icon: MoreVertical,
      title: (
        <>
          Ouvrez le menu <strong className="font-semibold">⋮</strong> en haut à droite de votre navigateur
        </>
      ),
    },
    {
      Icon: PlusSquare,
      title: (
        <>
          Choisissez <strong className="font-semibold">Ajouter à l’écran d’accueil</strong>
        </>
      ),
    },
    {
      Icon: Smartphone,
      title: (
        <>
          Validez avec <strong className="font-semibold">Ajouter</strong>
        </>
      ),
      sub: 'L’icône Loftissime rejoint vos applications.',
    },
  ],
};

export default function InstallEntry({ variant }: { variant: 'menu' | 'line' }) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  if (!platform) return null;

  const done = () => {
    try {
      localStorage.setItem(DONE_KEY, '1');
    } catch {
      /* stockage indisponible : le guide reste simplement proposé */
    }
    setOpen(false);
    setPlatform(null);
  };

  return (
    <>
      {variant === 'menu' ? (
        <button type="button" onClick={() => setOpen(true)} className="w-full flex gap-3 py-4 border-b border-stone-200 text-left">
          <Smartphone className="mt-1.5 w-5 h-5 flex-none text-stone-400" strokeWidth={1.5} />
          <span>
            <span className="block font-serif text-2xl text-stone-900">Sur mon téléphone</span>
            <span className="mt-0.5 block text-sm text-stone-500">Loftissime sur mon écran d’accueil</span>
          </span>
        </button>
      ) : (
        <p className="mt-7 mx-auto max-w-md flex items-start gap-3 border border-stone-300 px-4 py-3 text-left text-sm text-stone-600 leading-relaxed">
          <Smartphone className="mt-0.5 w-4 h-4 flex-none text-stone-500" strokeWidth={1.5} aria-hidden="true" />
          <span>
            Pour revenir en un geste, ajoutez Loftissime à votre écran d’accueil.{' '}
            <button type="button" onClick={() => setOpen(true)} className="font-semibold text-stone-900 underline underline-offset-4">
              Voir comment
            </button>
          </span>
        </p>
      )}

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label="Ajouter Loftissime à l’écran d’accueil">
          <div className="absolute inset-0 bg-stone-900/60" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:max-w-md bg-[#FDFBF7] px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-left">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="absolute top-2 right-2 h-9 w-9 flex items-center justify-center text-stone-500 hover:text-stone-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 pr-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/loftissime-192.png" alt="" width={52} height={52} className="h-[52px] w-[52px] flex-none rounded-[12px]" />
              <h2 className="font-serif text-2xl text-stone-900 leading-tight">Loftissime sur votre écran d’accueil</h2>
            </div>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">Trois gestes, et vos biens atypiques s’ouvrent comme une application.</p>
            <ol className="mt-5 border-t border-stone-200">
              {STEPS[platform].map(({ Icon, title, sub }, i) => (
                <li key={i} className="flex items-start gap-4 py-4 border-b border-stone-200">
                  <span className="mt-0.5 h-7 w-7 flex-none rounded-full bg-stone-900 text-white text-xs font-semibold flex items-center justify-center">{i + 1}</span>
                  <span className="flex-1">
                    <span className="block text-[15px] text-stone-900 leading-snug">{title}</span>
                    {sub && <span className="mt-1 block text-sm text-stone-500">{sub}</span>}
                  </span>
                  <Icon className="mt-0.5 w-5 h-5 flex-none text-stone-900" strokeWidth={1.5} aria-hidden="true" />
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={done}
              className="mt-6 w-full h-12 rounded-[10px] bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              C’est fait
            </button>
          </div>
        </div>
      )}
    </>
  );
}

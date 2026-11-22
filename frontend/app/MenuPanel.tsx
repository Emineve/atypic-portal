'use client';

import { ArrowRight, Bell, BookOpen, Calculator, ChevronRight, Compass, Feather, Heart, Info, Shirt, X } from 'lucide-react';
import Logo from './Logo';

// Le menu du site, identique sur l'accueil et sur les pages intérieures :
// l'alerte en tête (le geste le plus utile), puis trois familles de liens, et l'accès des agences en bas.
type Item = { href: string; label: string; sub?: string; Icon: typeof Heart; badge?: string; onClick?: () => void; red?: boolean };

function Row({ item }: { item: Item }) {
  const inner = (
    <>
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-stone-100">
        <item.Icon className={`h-[18px] w-[18px] ${item.red ? 'fill-red-600 text-red-600' : 'text-stone-700'}`} strokeWidth={1.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[17px] font-medium leading-snug text-stone-900">
          {item.label}
          {item.badge && <span className="rounded-full bg-[#F6CF4E] px-2.5 py-0.5 text-xs font-normal text-stone-800">{item.badge}</span>}
        </span>
        {item.sub && <span className="mt-0.5 block text-sm text-stone-500">{item.sub}</span>}
      </span>
      <ChevronRight className="h-4 w-4 flex-none text-stone-300" strokeWidth={1.5} />
    </>
  );
  const cls = 'flex w-full items-center gap-4 rounded-[10px] px-2 py-2.5 text-left transition hover:bg-stone-50';
  return item.onClick ? (
    <button type="button" onClick={item.onClick} className={cls}>
      {inner}
    </button>
  ) : (
    <a href={item.href} className={cls}>
      {inner}
    </a>
  );
}

export default function MenuPanel({
  onClose,
  onAlert,
  onFavs,
  onLogo,
  favs = 0,
  articles = 0,
}: {
  onClose: () => void;
  onAlert?: () => void; // sur l'accueil : ouvre la fenêtre d'alerte sans changer de page
  onFavs?: () => void; // sur l'accueil : affiche les favoris sans changer de page
  onLogo?: () => void;
  favs?: number;
  articles?: number;
}) {
  const groups: { title: string; items: Item[] }[] = [
    {
      title: 'Ma recherche',
      items: [
        { href: '/?favoris=1', label: 'Mes favoris', sub: favs > 0 ? `${favs} ${favs > 1 ? 'biens gardés' : 'bien gardé'}` : 'Les biens que vous gardez de côté', Icon: Heart, onClick: onFavs, red: favs > 0 },
        { href: '/alerte', label: 'Mes alertes', sub: 'Les voir, les modifier, les arrêter', Icon: Bell },
      ],
    },
    {
      title: 'Bien acheter',
      items: [
        { href: '/guide', label: 'État des lieux', sub: 'Ce qu’il faut savoir avant d’acheter', Icon: BookOpen },
        { href: '/financement', label: 'Financement', sub: 'Estimer ma mensualité', Icon: Calculator },
      ],
    },
    {
      title: 'Loftissime',
      items: [
        { href: '/qui-sommes-nous', label: 'Pourquoi Loftissime', sub: 'Ce que nous défendons', Icon: Feather },
        { href: '/mode-d-emploi', label: 'Mode d’emploi', sub: 'Du premier clic à la visite', Icon: Compass },
        { href: '/charte', label: 'Questions fréquentes', sub: 'Nos réponses, sans détour', Icon: Info },
        { href: '/dressing', label: 'Le dressing', sub: 'Le tee-shirt Loftissime', Icon: Shirt },
      ],
    },
  ];
  const alertCls = 'flex w-full items-center justify-between gap-4 rounded-[14px] bg-[#F6CF4E] px-5 py-4 text-left transition hover:bg-[#EFC234]';
  const alertInner = (
    <>
      <span>
        <span className="block font-serif text-2xl leading-tight text-stone-900">Créer une alerte</span>
        <span className="mt-0.5 block text-sm text-stone-700">Soyez prévenu dès qu’un bien paraît</span>
      </span>
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-stone-900 text-[#FBF5E9]">
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );
  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-stone-900/40" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full sm:max-w-sm flex-col bg-white shadow-xl">
        <div className="flex h-16 shrink-0 items-center justify-between px-6">
          <span onClick={onLogo}>
            <Logo />
          </span>
          <button type="button" onClick={onClose} aria-label="Fermer le menu" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 pb-6 pt-2">
          <div className="px-2">
            {onAlert ? (
              <button type="button" onClick={onAlert} className={alertCls}>
                {alertInner}
              </button>
            ) : (
              <a href="/?alerte=1" className={alertCls}>
                {alertInner}
              </a>
            )}
          </div>
          {groups.map((g) => (
            <div key={g.title} className="mt-6">
              <p className="px-2 pb-1 text-xs uppercase tracking-widest text-stone-500">{g.title}</p>
              {g.items.map((item) => (
                <Row key={item.href} item={item} />
              ))}
            </div>
          ))}
        </nav>
        <div className="shrink-0 bg-stone-900 px-6 py-5">
          <a href="/pro" className="flex items-center justify-between gap-4 text-sm text-stone-300">
            <span>
              <span className="block font-medium text-white">Vous êtes une agence ?</span>
              Diffusez vos biens atypiques
            </span>
            <span className="flex-none font-medium text-[#F6CF4E] underline decoration-[#F6CF4E]/40 underline-offset-4">Espace pro →</span>
          </a>
        </div>
      </div>
    </div>
  );
}

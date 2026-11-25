'use client';

import { createContext, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { SiteMode } from '../lib/siteMode';

const Ctx = createContext<SiteMode>('portail');

// Rubriques cachées en mode lettre : elles restent dans le site, mais renvoient à l'accueil.
// « /alerte/stop » (désinscription) et les pages légales restent ouvertes.
const HIDDEN = ['/biens', '/agence', '/categorie', '/ville', '/charte', '/classement', '/dressing', '/mode-d-emploi', '/partenaires', '/pro', '/contre-visite', '/inspiration', '/architectes'];

export function hiddenInLetterMode(pathname: string): boolean {
  if (pathname === '/alerte') return true;
  return HIDDEN.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

// L'aperçu de la nouvelle page d'accueil se montre toujours en mode lettre, même quand le site est encore en mode portail
const PREVIEW = '/apercu/accueil';

export function SiteModeProvider({ mode, children }: { mode: SiteMode; children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const effective: SiteMode = pathname.startsWith(PREVIEW) ? 'lettre' : mode;
  const blocked = effective === 'lettre' && hiddenInLetterMode(pathname);
  useEffect(() => {
    if (blocked) router.replace('/');
  }, [blocked, router]);
  return <Ctx.Provider value={effective}>{blocked ? null : children}</Ctx.Provider>;
}

export function useSiteMode(): SiteMode {
  return useContext(Ctx);
}

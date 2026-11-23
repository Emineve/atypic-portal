'use client';

import { usePathname } from 'next/navigation';
import { useSiteMode } from './SiteMode';

// Pas de pied de page commun sur l'accueil (qui a le sien), ni dans le back-office et l'espace agence.
export default function FooterGate({ children, lettre }: { children: React.ReactNode; lettre?: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const mode = useSiteMode();
  // En mode lettre : un pied de page réduit, présent aussi sur l'accueil
  if (mode === 'lettre') return pathname.startsWith('/admin') || pathname.startsWith('/espace-agence') ? null : <>{lettre}</>;
  if (pathname === '/' || pathname.startsWith('/admin') || pathname.startsWith('/espace-agence')) return null;
  return <>{children}</>;
}

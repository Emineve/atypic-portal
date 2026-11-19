'use client';

import { usePathname } from 'next/navigation';

// Pas de pied de page commun sur l'accueil (qui a le sien), ni dans le back-office et l'espace agence.
export default function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  if (pathname === '/' || pathname.startsWith('/admin') || pathname.startsWith('/espace-agence')) return null;
  return <>{children}</>;
}

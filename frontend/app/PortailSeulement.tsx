'use client';

import { useSiteMode } from './SiteMode';

// Ce qui renvoie aux annonces n'a pas sa place tant que le site est en mode lettre :
// le contenu ne s'affiche qu'en mode portail, `sinon` le remplace en mode lettre.
export default function PortailSeulement({ children, sinon = null }: { children: React.ReactNode; sinon?: React.ReactNode }) {
  return <>{useSiteMode() === 'portail' ? children : sinon}</>;
}

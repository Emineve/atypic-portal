import { notFound } from 'next/navigation';
import Presentation, { FICHES, type Role } from '../Presentation';
import { partage } from '../../../lib/partage';

// Une présentation par métier : /partenaires/notaire, /partenaires/courtier, /partenaires/entrepreneur.
export function generateStaticParams() {
  return Object.keys(FICHES).map((role) => ({ role }));
}

export function generateMetadata({ params }: { params: { role: string } }) {
  const f = FICHES[params.role as Role];
  return {
    title: f ? `Présentation aux partenaires, ${f.metier} · Loftissime` : 'Présentation aux partenaires · Loftissime',
    description: 'Loftissime, le média de l’immobilier atypique : votre place dans la newsletter.',
    robots: { index: false, follow: false },
    ...(f ? partage(`Loftissime · Présentation aux partenaires, ${f.metier}`, 'Loftissime, le média de l’immobilier atypique : votre place dans la newsletter.', `/og/partenaire-${params.role}.png`) : {}),
  };
}

export default function Page({ params }: { params: { role: string } }) {
  if (!FICHES[params.role as Role]) notFound();
  return <Presentation role={params.role as Role} />;
}

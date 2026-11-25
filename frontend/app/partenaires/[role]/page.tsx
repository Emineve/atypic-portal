import { notFound } from 'next/navigation';
import Presentation, { FICHES, type Role } from '../Presentation';

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
  };
}

export default function Page({ params }: { params: { role: string } }) {
  if (!FICHES[params.role as Role]) notFound();
  return <Presentation role={params.role as Role} />;
}

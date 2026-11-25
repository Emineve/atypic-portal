import { notFound } from 'next/navigation';
import ThemeVue from '../../lettre/ThemeVue';
import { MOIS, NEWSLETTERS } from '../../../lib/newsletters';

// La page d'un thème de l'année, ouverte depuis le calendrier de l'accueil.
export function generateStaticParams() {
  return NEWSLETTERS.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const theme = NEWSLETTERS.find((n) => n.slug === params.slug);
  if (!theme) return {};
  return {
    title: `${theme.nom}, le numéro de ${MOIS[theme.mois - 1]} · Loftissime`,
    description: `${theme.nom}, le thème de ${MOIS[theme.mois - 1]} de la newsletter de Loftissime. ${theme.sujet}`,
    alternates: { canonical: `/theme/${theme.slug}` },
  };
}

export default function ThemePage({ params }: { params: { slug: string } }) {
  const theme = NEWSLETTERS.find((n) => n.slug === params.slug);
  if (!theme) notFound();
  return <ThemeVue theme={theme} source="numeros" />;
}

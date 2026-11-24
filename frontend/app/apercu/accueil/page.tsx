import LetterHome from '../../lettre/LetterHome';

// Aperçu de la page d'accueil du mode lettre, avec le numéro en préparation.
// L'en-tête et le pied de page passent en mode lettre sur cette page, même quand le site est encore en mode portail.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Aperçu de l’accueil · loftissime.',
  robots: { index: false, follow: false },
};

export default function ApercuAccueil() {
  return <LetterHome />;
}

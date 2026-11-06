import LegalPage from '../LegalPage';
import { EDITOR, LEGAL_READY } from '../../lib/legal';

export const metadata = {
  title: "Conditions d'utilisation · SINGULIER",
  alternates: { canonical: '/cgu' },
  robots: LEGAL_READY ? undefined : { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Conditions d'utilisation">
      <h2>Objet</h2>
      <p>
        SINGULIER est un site de présentation de biens immobiliers atypiques à vendre, sélectionnés parmi des annonces d'agences.
        L'utilisation du site implique l'acceptation des présentes conditions.
      </p>

      <h2>Un service d'information</h2>
      <p>
        Les informations affichées (prix, surfaces, descriptions, photographies) proviennent des agences et sont données à titre indicatif.
        Elles peuvent être inexactes ou périmées : seule l'annonce d'origine de l'agence fait foi. SINGULIER n'intervient pas dans la
        transaction et n'est pas partie au contrat entre l'acheteur et le vendeur ou l'agence.
      </p>

      <h2>Estimation de mensualité</h2>
      <p>
        Le simulateur de mensualité fournit une estimation indicative, hors assurance, frais de notaire et frais de dossier. Le taux est un
        exemple modifiable. Elle ne constitue pas une offre de prêt ni un conseil financier.
      </p>

      <h2>Contact avec les agences</h2>
      <p>
        Les messages envoyés via le site sont traités selon la <a href="/confidentialite">politique de confidentialité</a>. Les liens vers
        les annonces d'origine mènent vers des sites tiers dont SINGULIER n'est pas responsable.
      </p>

      <h2>Responsabilité</h2>
      <p>
        SINGULIER s'efforce d'assurer l'exactitude et la disponibilité du site mais ne peut garantir l'absence d'erreur ou d'interruption.
        Sa responsabilité ne saurait être engagée du fait d'une décision prise sur la base des informations du site.
      </p>

      <h2>Droit applicable</h2>
      <p>Les présentes conditions sont soumises au droit français. Pour toute question : {EDITOR.email}.</p>
    </LegalPage>
  );
}

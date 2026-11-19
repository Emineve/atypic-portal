import LegalPage from '../LegalPage';
import { EDITOR, LEGAL_READY } from '../../lib/legal';

export const metadata = {
  title: "Conditions d'utilisation · Loftissime",
  alternates: { canonical: '/cgu' },
  robots: LEGAL_READY ? undefined : { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Conditions d'utilisation">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions fixent les règles d'accès et d'utilisation du site loftissime.fr par ses visiteurs. Consulter le site ou
        utiliser l'un de ses services (alerte, demande de rappel, question, etc.) vaut acceptation de ces conditions. Les agences
        immobilières qui diffusent leurs annonces relèvent, en plus, des <a href="/cgv">conditions de diffusion</a>.
      </p>

      <h2>2. Éditeur</h2>
      <p>
        Le site est édité par {EDITOR.name}. Ses coordonnées complètes figurent dans les <a href="/mentions-legales">mentions légales</a>.
      </p>

      <h2>3. Accès au site</h2>
      <p>
        Le site est gratuit pour les visiteurs et se consulte sans inscription ni compte. Les services qui supposent de laisser ses
        coordonnées sont réservés aux personnes majeures. Les frais de connexion et d'équipement restent à la charge du visiteur.
      </p>

      <h2>4. Ce que propose Loftissime</h2>
      <ul>
        <li>la consultation de biens atypiques à vendre, avec une recherche par lieu, budget, surface et type de bien ;</li>
        <li>une alerte par email pour être prévenu des nouveaux biens qui correspondent à une recherche ;</li>
        <li>des favoris, conservés sur l'appareil du visiteur ;</li>
        <li>la demande de rappel par l'agent chargé d'un bien, et l'envoi d'une recherche à une agence ;</li>
        <li>un guide de l'acheteur, « État des lieux », et la possibilité d'y poser une question ;</li>
        <li>un simulateur de mensualité et une demande de mise en relation avec un courtier en crédit ;</li>
        <li>une rubrique Inspiration consacrée à des architectes, avec la possibilité de leur écrire.</li>
      </ul>
      <p>Loftissime peut faire évoluer, suspendre ou retirer tout ou partie de ces services.</p>

      <h2>5. Origine des annonces et rôle de Loftissime</h2>
      <p>
        Toutes les annonces proviennent d'agences immobilières. Les informations affichées (prix, surfaces, descriptions, photographies,
        diagnostics) sont fournies par ces agences et données à titre indicatif : elles peuvent être inexactes ou ne plus être à jour, et
        seule l'agence chargée du bien peut les confirmer.
      </p>
      <p>
        Loftissime n'est pas une agence immobilière. Le site ne détient aucun mandat, ne visite pas les biens, ne négocie pas, n'intervient
        pas dans la transaction et n'est pas partie au contrat conclu entre l'acheteur, le vendeur et l'agence. Loftissime ne perçoit
        aucune commission sur les ventes.
      </p>

      <h2>6. Alertes</h2>
      <p>
        L'alerte est gratuite. Elle se crée avec une adresse email et des critères de recherche, et s'arrête à tout moment depuis le lien
        présent dans chaque email reçu. Loftissime ne garantit ni le nombre de biens proposés ni que tous les biens du marché
        correspondant à la recherche seront signalés.
      </p>

      <h2>7. Demandes adressées aux professionnels</h2>
      <p>
        Lorsque vous demandez à être rappelé, confiez votre recherche à une agence, sollicitez un courtier ou écrivez à un architecte, vos
        coordonnées et votre message sont transmis au seul professionnel concerné, à votre demande. Ce professionnel vous répond sous sa
        propre responsabilité. Loftissime ne garantit ni le délai ni le contenu de sa réponse.
      </p>
      <p>
        Vos coordonnées ne sont jamais transmises à un tiers à des fins de démarchage sans une demande de votre part. Vous pouvez à tout
        moment demander qu'elles ne soient plus utilisées en écrivant à {EDITOR.privacyEmail}.
      </p>

      <h2>8. Simulateur de financement et courtier</h2>
      <p>
        Le simulateur fournit une estimation indicative de mensualité, hors assurance, frais de notaire et frais de dossier, à partir d'un
        taux donné en exemple et modifiable. Cette estimation n'est ni une offre de prêt ni un conseil financier. Loftissime n'est pas un
        établissement de crédit et ne distribue pas de crédit : la mise en relation avec un courtier se fait à votre demande, et seul le
        courtier étudie votre projet.
      </p>

      <h2>9. Guide « État des lieux »</h2>
      <p>
        Les articles et les réponses aux questions apportent une information générale sur l'achat d'un bien atypique. Ils ne remplacent
        pas un conseil personnalisé : avant de vous engager, faites vérifier votre situation par un professionnel (notaire, avocat,
        architecte, diagnostiqueur, courtier).
      </p>

      <h2>10. Vos engagements</h2>
      <ul>
        <li>utiliser le site pour vos besoins personnels, dans le cadre d'un projet réel ou d'une simple consultation ;</li>
        <li>fournir des informations exactes dans les formulaires et n'utiliser que vos propres coordonnées ;</li>
        <li>ne pas adresser aux professionnels de demandes fantaisistes, abusives ou à caractère publicitaire ;</li>
        <li>ne pas extraire ou copier le contenu du site de façon automatisée ou massive, ni le réutiliser à des fins commerciales ;</li>
        <li>ne rien faire qui perturbe le fonctionnement du site ou porte atteinte à sa sécurité.</li>
      </ul>
      <p>En cas de manquement, Loftissime peut ne pas donner suite à une demande et bloquer l'accès à ses services.</p>

      <h2>11. Propriété intellectuelle</h2>
      <p>
        La marque Loftissime, le logo, la structure du site et les textes rédigés par Loftissime sont protégés. Les photographies et
        descriptions des biens appartiennent aux agences ou à leurs auteurs. Aucun de ces contenus ne peut être reproduit ou réutilisé
        sans autorisation, en dehors d'un usage strictement personnel et du partage d'un lien vers une page du site.
      </p>

      <h2>12. Liens vers d'autres sites</h2>
      <p>
        Le site contient des liens vers des sites tiers (agences, architectes, partenaires). Loftissime n'en maîtrise ni le contenu ni le
        fonctionnement et n'en est pas responsable.
      </p>

      <h2>13. Disponibilité</h2>
      <p>
        Loftissime s'efforce de maintenir le site accessible en permanence, sans pouvoir le garantir. L'accès peut être interrompu pour
        maintenance, mise à jour ou pour une cause extérieure, sans préavis ni indemnité.
      </p>

      <h2>14. Responsabilité</h2>
      <p>
        Vous utilisez le site sous votre responsabilité. Loftissime ne peut être tenu responsable d'une erreur ou d'un retard de mise à
        jour dans une annonce, de l'indisponibilité d'un bien, des échanges entre vous et un professionnel, ni d'une décision prise sur la
        seule base des informations du site. Rien dans ces conditions ne limite les droits que la loi reconnaît aux consommateurs.
      </p>

      <h2>15. Données personnelles et stockage sur votre appareil</h2>
      <p>
        Les données collectées, leur usage, les informations conservées dans votre navigateur et vos droits sont détaillés dans la{' '}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>16. Signaler un contenu</h2>
      <p>
        Pour signaler une annonce inexacte, périmée ou un contenu que vous estimez illicite, écrivez à {EDITOR.email} en indiquant votre
        nom, l'adresse de la page concernée et le motif du signalement. Le contenu est examiné et, s'il y a lieu, retiré dans les meilleurs
        délais.
      </p>

      <h2>17. Évolution des conditions</h2>
      <p>
        Ces conditions peuvent être modifiées pour suivre l'évolution du site ou de la réglementation. La version applicable est celle en
        ligne au moment de votre visite ; sa date de mise à jour figure en haut de cette page.
      </p>

      <h2>18. Droit applicable, réclamations et médiation</h2>
      <p>
        Ces conditions sont soumises au droit français. Pour toute réclamation, écrivez d'abord à {EDITOR.email} : une solution amiable
        sera recherchée. Si vous êtes un consommateur et que le désaccord persiste, vous pouvez saisir gratuitement le médiateur de la
        consommation : {EDITOR.mediator}. À défaut d'accord, les tribunaux français sont compétents.
      </p>
    </LegalPage>
  );
}

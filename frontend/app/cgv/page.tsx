import LegalPage from '../LegalPage';
import { EDITOR, LEGAL_READY } from '../../lib/legal';

export const metadata = {
  title: 'Conditions de diffusion pour les agences · Loftissime',
  alternates: { canonical: '/cgv' },
  robots: LEGAL_READY ? undefined : { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Conditions de diffusion">
      <p>
        Ces conditions s'appliquent aux agences immobilières dont les annonces sont diffusées sur loftissime.fr. Elles ne concernent pas
        les visiteurs du site, qui relèvent des <a href="/cgu">conditions d'utilisation</a>.
      </p>

      <h2>1. Les parties</h2>
      <p>
        Le service est fourni par {EDITOR.name}, {EDITOR.status}, {EDITOR.rcs}, dont le siège est situé {EDITOR.address} (« Loftissime »).
        Il s'adresse à l'agence immobilière qui a accepté la diffusion de ses annonces (« l'Agence »). Les présentes conditions prévalent
        sur les conditions générales d'achat de l'Agence. Si un bon de commande ou un contrat particulier est signé, il l'emporte sur ces
        conditions en cas de contradiction.
      </p>

      <h2>2. Qui peut diffuser</h2>
      <p>
        La diffusion est réservée aux professionnels de l'immobilier titulaires d'une carte professionnelle « Transactions sur immeubles
        et fonds de commerce » en cours de validité, ou agissant sous la responsabilité de son titulaire. Les annonces de particuliers ne
        sont pas acceptées.
      </p>

      <h2>3. Le service</h2>
      <ul>
        <li>reprise des annonces de l'Agence par une passerelle avec son logiciel de diffusion ou par un flux, et mise à jour automatique ;</li>
        <li>publication de l'annonce telle que l'Agence l'a rédigée, avec ses photographies, le nom de l'Agence, celui du négociateur et son téléphone ;</li>
        <li>signalement des nouveaux biens aux visiteurs dont l'alerte correspond ;</li>
        <li>transmission à l'Agence des demandes de rappel, des messages et des recherches que les visiteurs lui adressent ;</li>
        <li>mise à disposition d'un rapport de visibilité (consultations, favoris, demandes reçues).</li>
      </ul>

      <h2>4. Sélection des biens</h2>
      <p>
        Loftissime ne diffuse que des biens atypiques, au sens des critères publiés dans les <a href="/charte">questions fréquentes</a>.
        Loftissime décide seul si un bien entre ou non dans ces critères et peut refuser ou retirer une annonce à tout moment, notamment
        si elle est inexacte, périmée, contraire à la loi ou étrangère à la ligne du site. Le prix du bien n'est pas un critère.
      </p>

      <h2>5. Ce que Loftissime ne fait pas</h2>
      <p>
        Loftissime n'est pas une agence immobilière : il ne prend aucun mandat, ne contacte ni les vendeurs ni les acheteurs pour son
        compte, n'intervient pas dans la négociation et ne perçoit aucune commission sur les ventes. Loftissime ne garantit ni un nombre de
        consultations ou de demandes, ni la conclusion d'une vente.
      </p>

      <h2>6. Conditions financières</h2>
      <p>
        Pendant la phase de lancement, la diffusion est gratuite et sans engagement. Toute évolution vers une offre payante sera annoncée
        à l'Agence par email au moins {'[À COMPLÉTER : délai de prévenance, par exemple 30 jours]'} à l'avance ; l'Agence reste libre de
        mettre fin à la diffusion avant son entrée en vigueur, sans frais.
      </p>
      <p>
        Une fois l'offre payante en place, les prix, exprimés hors taxes, la périodicité de facturation et le moyen de paiement seront
        ceux du bon de commande accepté par l'Agence : {'[À COMPLÉTER : grille tarifaire, facturation, moyen de paiement]'}. Tout retard de
        paiement entraînera des pénalités au taux prévu par la loi et l'indemnité forfaitaire de 40 euros pour frais de recouvrement.
      </p>

      <h2>7. Contenus de l'Agence</h2>
      <p>
        L'Agence autorise Loftissime, sans exclusivité et pour la durée de la diffusion, à reproduire et afficher ses annonces (textes,
        photographies, plans, visites virtuelles), son nom et son logo sur le site, dans les emails d'alerte, dans les aperçus de partage
        et sur les supports de communication de Loftissime, y compris les réseaux sociaux. Cette autorisation prend fin avec le retrait
        de l'annonce, sous réserve des délais techniques de mise à jour.
      </p>

      <h2>8. Garanties de l'Agence</h2>
      <ul>
        <li>elle détient, pour chaque bien, un mandat écrit en cours de validité l'autorisant à en faire la publicité ;</li>
        <li>elle dispose des droits nécessaires sur les photographies, plans et textes transmis ;</li>
        <li>ses annonces sont exactes, à jour et comportent les mentions obligatoires (prix, honoraires, diagnostic de performance énergétique, copropriété, etc.) ;</li>
        <li>elle retire ou fait retirer sans délai un bien vendu, sous compromis ou dont le mandat a pris fin.</li>
      </ul>
      <p>
        L'Agence reste seule responsable du contenu de ses annonces et garantit Loftissime contre toute réclamation d'un tiers à ce sujet.
      </p>

      <h2>9. Demandes des visiteurs et données personnelles</h2>
      <p>
        Les coordonnées transmises par Loftissime le sont à la demande du visiteur, pour une demande précise. L'Agence les traite sous sa
        propre responsabilité, dans le respect du règlement général sur la protection des données, et ne les utilise que pour répondre à
        cette demande et suivre le projet du visiteur. Elle ne les cède à aucun tiers. Les données des interlocuteurs de l'Agence sont
        traitées par Loftissime pour gérer la relation, comme indiqué dans la <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>10. Durée et arrêt de la diffusion</h2>
      <p>
        La diffusion est conclue sans durée minimale. L'Agence peut y mettre fin à tout moment, sans motif ni frais, par email à{' '}
        {EDITOR.proEmail}. Ses annonces sont retirées dans un délai de {'[À COMPLÉTER : délai de retrait, par exemple 48 heures ouvrées]'}.
      </p>

      <h2>11. Suspension par Loftissime</h2>
      <p>
        Loftissime peut suspendre ou arrêter la diffusion, immédiatement et sans indemnité, en cas d'annonce illicite ou trompeuse,
        d'absence de carte professionnelle ou de mandat, d'usage détourné des coordonnées des visiteurs, de défaut de paiement ou de
        tout manquement à ces conditions.
      </p>

      <h2>12. Disponibilité</h2>
      <p>
        Loftissime met en œuvre les moyens raisonnables pour assurer le fonctionnement du site et de la reprise des annonces, sans
        s'engager sur un résultat. Le site peut être interrompu pour maintenance ou pour une cause extérieure. La bonne reprise des
        annonces dépend du format et de la qualité du flux transmis par l'Agence ou son logiciel.
      </p>

      <h2>13. Responsabilité</h2>
      <p>
        Loftissime ne répond pas des dommages indirects (perte de chiffre d'affaires, de clientèle ou d'image), ni des conséquences d'une
        erreur présente dans les annonces ou dans le flux de l'Agence. Sauf faute lourde ou intentionnelle, sa responsabilité est limitée
        au montant des sommes effectivement payées par l'Agence au cours des douze mois précédant le fait générateur.
      </p>

      <h2>14. Propriété intellectuelle</h2>
      <p>
        Le site, la marque Loftissime et l'ensemble de leurs éléments restent la propriété de Loftissime. L'Agence peut indiquer qu'elle
        diffuse ses biens sur Loftissime et faire un lien vers le site.
      </p>

      <h2>15. Confidentialité</h2>
      <p>
        Chaque partie garde confidentielles les informations non publiques échangées à l'occasion de la diffusion, notamment les
        conditions financières et les statistiques de visibilité, pendant la durée de la diffusion et deux ans après.
      </p>

      <h2>16. Évolution des conditions</h2>
      <p>
        Loftissime peut modifier ces conditions. L'Agence en est informée par email au moins trente jours avant leur entrée en vigueur et
        peut mettre fin à la diffusion si elle ne les accepte pas.
      </p>

      <h2>17. Droit applicable et litiges</h2>
      <p>
        Ces conditions sont soumises au droit français. Les parties recherchent d'abord une solution amiable. À défaut d'accord dans un
        délai de trente jours, le litige est porté devant le tribunal de commerce de {EDITOR.court}.
      </p>
    </LegalPage>
  );
}

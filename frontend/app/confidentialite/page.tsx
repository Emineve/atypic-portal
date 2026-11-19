import LegalPage from '../LegalPage';
import { EDITOR, LEGAL_READY } from '../../lib/legal';

export const metadata = {
  title: 'Politique de confidentialité · Loftissime',
  alternates: { canonical: '/confidentialite' },
  robots: LEGAL_READY ? undefined : { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        Cette page explique quelles données personnelles Loftissime collecte, pourquoi, et comment exercer vos droits.
        Responsable du traitement : {EDITOR.name}, {EDITOR.address}. Pour toute question sur vos données : {EDITOR.privacyEmail}.
        Loftissime se consulte sans compte : aucune donnée personnelle n'est demandée pour parcourir les annonces.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>
          <strong>Demande de rappel sur un bien, ou sur plusieurs biens mis en favoris</strong> : nom, email, téléphone, message. Finalité :
          transmettre votre demande à l'agence chargée du bien. Base légale : votre consentement.
        </li>
        <li>
          <strong>Recherche confiée à une agence</strong> : nom, email, téléphone, critères de votre recherche. Finalité : transmettre votre
          recherche à l'agence que vous avez choisie. Base légale : votre consentement.
        </li>
        <li>
          <strong>Alerte</strong> : email, critères de votre recherche et, si vous le demandez, numéro WhatsApp. Finalité : vous écrire dès
          qu'un bien correspondant arrive sur le marché. Base légale : votre consentement, retirable à tout moment.
        </li>
        <li>
          <strong>Demande de courtier</strong> : nom, téléphone, email (facultatif), bien et simulation concernés. Finalité : vous mettre en
          relation avec un courtier en crédit. Base légale : votre consentement.
        </li>
        <li>
          <strong>Message à un architecte</strong> : nom, email, téléphone (facultatif), message. Finalité : transmettre votre message à cet
          architecte. Base légale : votre consentement.
        </li>
        <li>
          <strong>Question posée dans État des lieux</strong> : le texte de votre question et, si vous souhaitez être prévenu de la réponse,
          votre email. Base légale : votre consentement.
        </li>
        <li>
          <strong>Demande d'une agence pour diffuser ses annonces</strong> : nom de l'agence, nom de la personne, email, téléphone,
          message. Finalité : répondre à la demande et gérer la relation avec l'agence. Base légale : mesures précontractuelles prises à
          la demande de l'agence, puis exécution du contrat.
        </li>
        <li>
          <strong>Mesure d'audience</strong> : pages consultées, site d'origine du visiteur, favoris ajoutés, clics vers l'annonce
          d'origine, associés à un identifiant aléatoire propre à l'onglet de navigation. Cet identifiant n'est pas un cookie, ne permet pas
          de vous identifier et disparaît à la fermeture de l'onglet. Finalité : mesurer la fréquentation des annonces et en rendre compte
          aux agences. Base légale : intérêt légitime.
        </li>
      </ul>

      <h2>Stockage sur votre appareil</h2>
      <p>
        Loftissime ne dépose aucun cookie publicitaire ni traceur tiers. Pour fonctionner sans compte, le site conserve quelques
        informations dans le stockage de votre navigateur, sur votre appareil uniquement :
      </p>
      <ul>
        <li>la liste de vos favoris ;</li>
        <li>les coordonnées et critères que vous avez déjà saisis (nom, email, téléphone, lieux, budget), pour ne pas vous les redemander d'un formulaire à l'autre ;</li>
        <li>le fait qu'une alerte a déjà été créée, pour ne pas vous la reproposer ;</li>
        <li>un identifiant aléatoire de visite, effacé à la fermeture de l'onglet, utilisé pour la mesure d'audience.</li>
      </ul>
      <p>Vous pouvez tout effacer à tout moment en supprimant les données du site dans les réglages de votre navigateur.</p>

      <h2>Destinataires</h2>
      <p>
        Loftissime ne vend aucune donnée et ne partage vos coordonnées avec personne sans une demande de votre part. Elles ne sont
        transmises qu'au professionnel concerné par votre demande : l'agence chargée du bien, l'agence à laquelle vous confiez votre
        recherche, le courtier, ou l'architecte auquel vous écrivez. Les données d'une alerte ne sont transmises à personne.
      </p>
      <h2>Prestataires techniques et lieu d'hébergement</h2>
      <ul>
        <li>Supabase (base de données) : données hébergées en Irlande, dans l'Union européenne.</li>
        <li>Vercel (hébergement du site) et Resend (envoi des emails) : sociétés établies aux États-Unis.</li>
      </ul>
      <p>
        Ces prestataires n'agissent que sur instruction de Loftissime. Lorsque des données sont traitées hors de l'Union européenne, le
        transfert est encadré par les garanties prévues par le RGPD (clauses contractuelles types de la Commission européenne ou
        mécanisme équivalent).
      </p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Alertes : jusqu'à ce que vous arrêtiez l'alerte.</li>
        <li>Demandes de rappel, recherches confiées, demandes de courtier, messages aux architectes, questions : 12 mois.</li>
        <li>Échanges avec les agences : pendant la durée de la relation, puis 3 ans.</li>
        <li>Mesure d'audience : 25 mois maximum.</li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation ou l'opposition au traitement, ainsi que
        leur portabilité, et retirer à tout moment un consentement donné, en écrivant à {EDITOR.privacyEmail}. Une réponse vous est
        apportée dans un délai d'un mois. Vous pouvez aussi introduire une réclamation auprès de la CNIL (cnil.fr).
      </p>

      <h2>Sécurité</h2>
      <p>
        Les échanges avec le site sont chiffrés. L'accès aux données est limité aux personnes qui en ont besoin pour traiter votre
        demande, et aux professionnels que vous avez choisi de contacter.
      </p>

      <h2>Mineurs</h2>
      <p>Les services qui supposent de laisser ses coordonnées sont réservés aux personnes majeures.</p>

      <h2>Évolution de cette politique</h2>
      <p>Cette page est mise à jour quand le site ou la réglementation évoluent. La date de la dernière mise à jour figure en haut de page.</p>
    </LegalPage>
  );
}

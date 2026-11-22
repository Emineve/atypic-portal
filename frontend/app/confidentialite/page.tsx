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
        Responsable du traitement : {EDITOR.name} ({EDITOR.email}).
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>
          <strong>Demande de contact sur un bien, ou sur plusieurs biens mis en favoris</strong> : nom, email, téléphone si vous l’indiquez, message. Finalité :
          transmettre votre demande à l'agence chargée du bien. Base légale : votre consentement.
        </li>
        <li>
          <strong>Recherche confiée à une agence</strong> : nom, email, téléphone si vous l’indiquez, critères de votre recherche. Finalité : transmettre votre
          recherche à l'agence que vous avez choisie. Base légale : votre consentement.
        </li>
        <li>
          <strong>Alerte</strong> : email, critères de votre recherche et, si vous le demandez, numéro WhatsApp. Finalité : vous écrire dès
          qu'un bien correspondant arrive sur le marché. Base légale : votre consentement, retirable à tout moment.
        </li>
        <li>
          <strong>Demande de courtier</strong> : nom, email, téléphone si vous l’indiquez, bien et simulation concernés. Finalité : vous mettre en
          relation avec un courtier en crédit. Base légale : votre consentement.
        </li>
        <li>
          <strong>Message à un architecte</strong> : nom, email, téléphone si vous l’indiquez, message. Finalité : transmettre votre message à cet
          architecte. Base légale : votre consentement.
        </li>
        <li>
          <strong>Question posée dans État des lieux</strong> : le texte de votre question et, si vous souhaitez être prévenu de la réponse,
          votre email. Base légale : votre consentement.
        </li>
        <li>
          <strong>Tee-shirt demandé dans le dressing</strong> : email, modèle, couleur et taille. Finalité : vous prévenir quand il est
          en stock. Base légale : votre consentement.
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
        Loftissime ne dépose pas de cookie publicitaire. La liste de vos favoris est conservée sur votre appareil (stockage local du navigateur)
        et n'est pas envoyée à un compte. Vous pouvez l'effacer en vidant les données du site dans votre navigateur.
      </p>

      <h2>Destinataires</h2>
      <p>
        Loftissime ne vend aucune donnée et ne partage vos coordonnées avec personne sans une demande de votre part. Elles ne sont
        transmises qu'au professionnel concerné par votre demande : l'agence chargée du bien, l'agence à laquelle vous confiez votre
        recherche, le courtier, ou l'architecte auquel vous écrivez. Les données d'une alerte ne sont transmises à personne.
      </p>
      <p>Vos données sont par ailleurs traitées par nos prestataires techniques (hébergement Vercel, base de données Supabase, envoi des emails Resend).</p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Alertes : jusqu'à ce que vous arrêtiez l'alerte, puis 30 jours.</li>
        <li>Demandes de contact, recherches confiées, demandes de courtier, messages aux architectes, questions, tee-shirts demandés : 12 mois.</li>
        <li>Mesure d'audience : 25 mois maximum.</li>
      </ul>
      <p>Passé ces délais, les données sont supprimées automatiquement, chaque nuit.</p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation ou l'opposition au traitement, ainsi que
        leur portabilité, en écrivant à {EDITOR.email}. Vous pouvez aussi introduire une réclamation auprès de la CNIL (cnil.fr).
      </p>
    </LegalPage>
  );
}

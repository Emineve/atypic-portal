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
          <strong>Demande de contact sur un bien</strong> : nom, email, téléphone (facultatif), message. Finalité : traiter votre demande.
          Base légale : votre consentement.
        </li>
        <li>
          <strong>Alertes et lettre d'information</strong> : email et, pour une alerte, les critères de votre recherche.
          Finalité : vous envoyer les biens correspondants ou la lettre. Base légale : votre consentement, retirable à tout moment.
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
        Vos données sont traitées par nos prestataires techniques (hébergement Vercel, base de données Supabase). Dans la version actuelle
        du site, les demandes de contact sont enregistrées mais ne sont pas transmises aux agences ; lorsque cette transmission sera activée,
        cette page sera mise à jour et vous en serez informé avant d'envoyer votre demande.
      </p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Demandes de contact : 12 mois.</li>
        <li>Alertes et lettre : jusqu'à votre désinscription.</li>
        <li>Mesure d'audience : 25 mois maximum.</li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation ou l'opposition au traitement, ainsi que
        leur portabilité, en écrivant à {EDITOR.email}. Vous pouvez aussi introduire une réclamation auprès de la CNIL (cnil.fr).
      </p>
    </LegalPage>
  );
}

import LegalPage from '../LegalPage';
import { EDITOR, LEGAL_READY } from '../../lib/legal';

export const metadata = {
  title: 'Politique de confidentialité · Loftissime',
  alternates: { canonical: '/confidentialite' },
  robots: LEGAL_READY ? undefined : { index: false, follow: true },
};

// Ne décrit que ce que le site fait réellement. À chaque nouveau formulaire ou nouveau prestataire, compléter cette page.
export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        Loftissime est un média consacré à l’immobilier atypique. Cette page explique, simplement, quelles données personnelles nous
        collectons, pourquoi, combien de temps nous les gardons et comment exercer vos droits.
      </p>

      <h2>Notre engagement</h2>
      <p>
        Nous traitons vos données dans le respect du règlement général sur la protection des données (RGPD) et de la loi Informatique et
        Libertés. Nous ne collectons que ce qui est utile au service, nous ne vendons aucune donnée et nous ne faisons pas de publicité
        ciblée. Responsable du traitement : {EDITOR.name} ({EDITOR.email}).
      </p>

      <h2>Comment nous collectons vos données</h2>
      <p>
        De deux façons seulement : quand vous remplissez un formulaire du site (l’inscription à la newsletter, par exemple), et quand vous
        naviguez sur le site, sous une forme qui ne permet pas de vous identifier.
      </p>

      <h2>Les données collectées et ce que nous en faisons</h2>
      <ul>
        <li>
          <strong>Inscription à la newsletter</strong> : votre adresse e-mail et, si vous nous les indiquez, les thèmes qui vous intéressent
          le plus. Finalité : vous envoyer la newsletter de Loftissime et le guide offert à l’inscription. Base légale : votre consentement,
          que vous pouvez retirer à tout moment.
        </li>
        <li>
          <strong>Liens de la newsletter</strong> : nous comptons le nombre de clics par rubrique dans chaque numéro. Ce comptage est global :
          il n’est rattaché ni à votre adresse ni à un identifiant. Nous ne mesurons pas l’ouverture des e-mails.
        </li>
        <li>
          <strong>Question posée sur un article</strong> : le texte de votre question et, si vous souhaitez être prévenu de la réponse,
          votre e-mail. Base légale : votre consentement.
        </li>
        <li>
          <strong>Mesure d’audience</strong> : pages consultées et site d’origine du visiteur, associés à un identifiant aléatoire propre à
          l’onglet de navigation. Cet identifiant n’est pas un cookie, ne permet pas de vous identifier et disparaît à la fermeture de
          l’onglet. Finalité : savoir ce qui est lu. Base légale : intérêt légitime.
        </li>
      </ul>
      <p>
        Les rubriques d’annonces du site sont fermées pour le moment. Quand elles sont ouvertes, d’autres formulaires existent : demande de
        contact sur un bien, recherche confiée à une agence, alerte, demande de courtier, message à un architecte, tee-shirt demandé. Chacun
        collecte votre nom, votre e-mail, votre téléphone si vous l’indiquez et le contenu de votre demande, avec votre consentement, pour la
        transmettre au seul professionnel concerné. La mesure d’audience compte alors aussi les favoris et les clics vers les annonces.
      </p>

      <h2>Cookies et stockage sur votre appareil</h2>
      <p>
        Loftissime ne dépose aucun cookie publicitaire ni aucun cookie de mesure d’audience. C’est pourquoi le site n’affiche pas de bandeau
        de consentement : il n’y a rien à accepter ni à refuser. Le site n’utilise aucun outil publicitaire et ne transmet aucune donnée à
        une régie ou à un réseau social.
      </p>
      <p>
        Seul le stockage local de votre navigateur est utilisé, pour le fonctionnement du site (par exemple la liste de vos favoris, qui
        reste sur votre appareil). Vous pouvez l’effacer en vidant les données du site dans votre navigateur.
      </p>

      <h2>Combien de temps nous gardons vos données</h2>
      <ul>
        <li>Newsletter : jusqu’à votre désinscription, puis 30 jours.</li>
        <li>Questions et demandes envoyées par un formulaire : 12 mois.</li>
        <li>Mesure d’audience : 25 mois au plus.</li>
      </ul>
      <p>Passé ces délais, les données sont supprimées automatiquement, chaque nuit.</p>

      <h2>Qui a accès à vos données</h2>
      <p>
        Loftissime ne vend aucune donnée et ne transmet vos coordonnées à personne sans une demande de votre part. L’adresse d’un abonné à
        la newsletter n’est communiquée à aucune agence ni à aucun partenaire.
      </p>
      <p>
        Vos données sont traitées pour notre compte par nos prestataires techniques : Vercel (hébergement du site), Supabase (base de
        données) et Resend (envoi des e-mails). Certains sont établis aux États-Unis : les transferts sont alors encadrés par les garanties
        prévues par le RGPD.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement ou vous y opposer, et
        demander leur portabilité. Vous pouvez aussi retirer votre consentement à tout moment. Si vous estimez que vos droits ne sont pas
        respectés, vous pouvez saisir la CNIL (cnil.fr).
      </p>

      <h2>Se désinscrire de la newsletter</h2>
      <p>Chaque numéro contient un lien de désinscription. Un clic suffit, sans compte ni mot de passe.</p>

      <h2>Nous contacter</h2>
      <p>
        Pour exercer vos droits ou poser une question sur vos données, écrivez à {EDITOR.email}. Nous pouvons vous demander de confirmer
        que la demande vient bien de vous.
      </p>

      <h2>Évolution de cette politique</h2>
      <p>
        Cette page est mise à jour quand le site évolue ou quand la réglementation change. La date de dernière mise à jour figure en haut
        de la page.
      </p>
    </LegalPage>
  );
}

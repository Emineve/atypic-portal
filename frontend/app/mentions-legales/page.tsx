import LegalPage from '../LegalPage';
import { EDITOR, LEGAL_READY } from '../../lib/legal';

export const metadata = {
  title: 'Mentions légales · SINGULIER',
  alternates: { canonical: '/mentions-legales' },
  robots: LEGAL_READY ? undefined : { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        {EDITOR.name}<br />
        {EDITOR.status}<br />
        {EDITOR.address}<br />
        Contact : {EDITOR.email}<br />
        Directeur de la publication : {EDITOR.director}
      </p>

      <h2>Hébergement</h2>
      <ul>
        <li>Site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com).</li>
        <li>Base de données : Supabase Inc. (supabase.com).</li>
      </ul>

      <h2>Nature du site</h2>
      <p>
        SINGULIER présente une sélection de biens immobiliers atypiques issus d'annonces publiées par des agences immobilières.
        SINGULIER n'est pas une agence immobilière et ne perçoit aucune commission sur les ventes. Chaque annonce renvoie vers
        l'annonce d'origine de l'agence, seule responsable de son contenu, de ses prix et de la disponibilité du bien.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        La structure et les textes propres au site sont protégés. Les photographies et descriptions des biens appartiennent aux agences
        qui les ont publiées. Tout titulaire de droits qui souhaiterait le retrait d'un contenu peut écrire à {EDITOR.email} :
        le contenu sera retiré dans les meilleurs délais.
      </p>

      <h2>Signaler un contenu</h2>
      <p>Pour signaler une annonce inexacte, périmée ou un contenu illicite, écrivez à {EDITOR.email} en indiquant l'adresse de la page concernée.</p>

      <h2>Données personnelles</h2>
      <p>Voir la <a href="/confidentialite">politique de confidentialité</a>.</p>
    </LegalPage>
  );
}

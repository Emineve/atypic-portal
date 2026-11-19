import LegalPage from '../LegalPage';
import { EDITOR, LEGAL_READY } from '../../lib/legal';

export const metadata = {
  title: 'Mentions légales · Loftissime',
  alternates: { canonical: '/mentions-legales' },
  robots: LEGAL_READY ? undefined : { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Le site loftissime.fr est édité par :<br />
        {EDITOR.name}<br />
        {EDITOR.status}<br />
        {EDITOR.rcs}<br />
        TVA intracommunautaire : {EDITOR.vat}<br />
        Siège social : {EDITOR.address}<br />
        Email : {EDITOR.email}<br />
        Téléphone : {EDITOR.phone}
      </p>

      <h2>Directeur de la publication</h2>
      <p>{EDITOR.director}</p>

      <h2>Hébergement</h2>
      <ul>
        <li>Site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com).</li>
        <li>Base de données : Supabase Inc. (supabase.com), données hébergées en Irlande, dans l'Union européenne.</li>
        <li>Envoi des emails : Resend (resend.com).</li>
      </ul>

      <h2>Nature du site</h2>
      <p>
        Loftissime réunit sur un seul site des biens immobiliers atypiques à vendre, issus d'annonces publiées par des agences immobilières.
        Loftissime n'est pas une agence immobilière : le site ne détient aucun mandat, n'intervient dans aucune transaction et ne perçoit
        aucune commission sur les ventes. Chaque annonce indique l'agence chargée du bien, seule responsable de son contenu, de son prix
        et de la disponibilité du bien.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le nom Loftissime, son logo, la structure du site et les textes rédigés par Loftissime sont protégés. Marque : {EDITOR.trademark}.
        Toute reproduction ou réutilisation sans accord écrit est interdite.
      </p>
      <p>
        Les photographies et descriptions des biens appartiennent aux agences qui les ont publiées, ou à leurs auteurs. Tout titulaire de
        droits qui souhaite le retrait d'un contenu peut écrire à {EDITOR.email} : le contenu sera retiré dans les meilleurs délais.
      </p>

      <h2>Signaler un contenu</h2>
      <p>
        Pour signaler une annonce inexacte, périmée ou un contenu illicite, écrivez à {EDITOR.email} en indiquant l'adresse de la page
        concernée et le motif du signalement.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le responsable du traitement est l'éditeur du site. Le détail des données collectées, de leur usage et de vos droits figure dans la{' '}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>Conditions</h2>
      <p>
        L'utilisation du site est régie par les <a href="/cgu">conditions d'utilisation</a>. La diffusion d'annonces par les agences est
        régie par les <a href="/cgv">conditions de diffusion</a>.
      </p>
    </LegalPage>
  );
}

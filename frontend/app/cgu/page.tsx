import LegalPage from '../LegalPage';
import { EDITOR, LEGAL_READY } from '../../lib/legal';

export const metadata = {
  title: "Conditions d'utilisation · Loftissime",
  alternates: { canonical: '/cgu' },
  robots: LEGAL_READY ? undefined : { index: false, follow: true },
};

// Les conditions d'un média gratuit : la newsletter, les articles, les biens présentés. Rien sur un service payant tant qu'il n'y en a pas.
export default function Page() {
  return (
    <LegalPage title="Conditions d'utilisation">
      <h2>1. Objet</h2>
      <p>
        Ces conditions s’appliquent au site loftissime.fr, à sa newsletter et à ses articles. En utilisant le site ou en vous abonnant à la
        newsletter, vous les acceptez.
      </p>

      <h2>2. Qui édite Loftissime</h2>
      <p>
        Loftissime est édité par {EDITOR.name}. Les informations complètes sur l’éditeur et l’hébergeur figurent dans les{' '}
        <a href="/mentions-legales">mentions légales</a>.
      </p>

      <h2>3. Les mots employés</h2>
      <ul>
        <li>« Le site » : loftissime.fr et ses pages.</li>
        <li>« La newsletter » : le numéro envoyé par e-mail aux abonnés, une fois par mois.</li>
        <li>« Les contenus » : les articles, les numéros de la newsletter, les dessins, les vidéos et le guide offert à l’inscription.</li>
      </ul>

      <h2>4. À qui s’adresse Loftissime</h2>
      <p>À toute personne majeure qui s’intéresse à l’immobilier atypique, pour son usage personnel.</p>

      <h2>5. Ce que propose Loftissime</h2>
      <p>
        Une newsletter mensuelle, des articles et un guide. Chaque numéro présente un bien atypique : la visite, le projet et ce qu’il
        coûte. Loftissime peut faire évoluer ses rubriques, son rythme de parution et ses formats.
      </p>

      <h2>6. S’abonner à la newsletter</h2>
      <p>
        Il suffit d’indiquer une adresse e-mail valide, la vôtre. Aucun compte ni mot de passe n’est créé. Un e-mail de bienvenue confirme
        l’inscription.
      </p>

      <h2>7. Un service gratuit</h2>
      <p>
        La newsletter, les articles et le guide sont gratuits. Si Loftissime proposait un jour un service payant, il ferait l’objet de
        conditions distinctes, présentées avant toute commande.
      </p>

      <h2>8. Durée et désinscription</h2>
      <p>
        L’abonnement n’a pas de durée et ne vous engage à rien. Vous pouvez vous désinscrire à tout moment, en un clic, depuis le lien
        présent dans chaque numéro. Loftissime peut suspendre ou arrêter la newsletter.
      </p>

      <h2>9. Accès au site et réception des e-mails</h2>
      <p>
        Loftissime s’efforce de garder le site accessible, sans pouvoir garantir l’absence d’interruption. La bonne réception des e-mails
        dépend aussi de votre messagerie : pensez à vérifier vos courriers indésirables.
      </p>

      <h2>10. Une information, pas un conseil</h2>
      <p>
        Les contenus donnent une information générale. Ils ne constituent ni un conseil juridique, ni un conseil financier, ni une offre de
        prêt, et ne remplacent ni l’avis d’un notaire ni celui d’un professionnel du bâtiment sur un bien donné. Les chiffres donnés par un
        architecte, un entrepreneur ou un courtier sont les leurs : ce sont des estimations, à faire confirmer pour votre propre projet. Une
        mensualité indiquée dans un numéro est un exemple.
      </p>

      <h2>11. Les biens présentés</h2>
      <p>
        Loftissime n’est pas une agence immobilière. Chaque bien présenté est vendu par son propriétaire ou par l’intermédiaire d’une
        agence ; Loftissime n’intervient pas dans la vente et n’est pas partie au contrat. Les prix, surfaces et descriptions sont donnés à
        titre indicatif : un bien peut avoir été vendu ou son prix modifié depuis la parution. Seule l’annonce du vendeur ou de l’agence
        fait foi.
      </p>

      <h2>12. Propriété intellectuelle</h2>
      <p>
        Les textes, dessins, vidéos et la présentation du site appartiennent à Loftissime ou à leurs auteurs. Vous pouvez les consulter et
        les partager par un lien pour votre usage personnel. Toute reproduction ou réutilisation, même partielle, demande notre accord écrit.
      </p>

      <h2>13. Données personnelles</h2>
      <p>
        Vos données sont traitées selon la <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>14. Liens vers d’autres sites</h2>
      <p>Le site et la newsletter contiennent des liens vers des sites tiers, dont les annonces d’origine. Loftissime n’est pas responsable de leur contenu.</p>

      <h2>15. Responsabilité</h2>
      <p>
        Loftissime apporte le plus grand soin à ses contenus mais ne peut garantir qu’ils soient exempts d’erreur ou toujours à jour. Sa
        responsabilité ne saurait être engagée du fait d’une décision prise sur la seule base de ces contenus, ni en cas d’événement
        échappant à son contrôle.
      </p>

      <h2>16. Modification des conditions</h2>
      <p>Ces conditions peuvent évoluer. La version en vigueur est celle publiée sur cette page, à la date indiquée en haut.</p>

      <h2>17. Droit applicable et contact</h2>
      <p>
        Ces conditions sont soumises au droit français. Pour toute question ou réclamation, écrivez à {EDITOR.email} : nous cherchons
        d’abord une solution amiable.
      </p>
    </LegalPage>
  );
}

import LegalPage from '../LegalPage';

export const metadata = {
  title: 'Référencement et classement · Loftissime',
  description: 'Comment les biens sont sélectionnés et classés sur Loftissime, et comment signaler une erreur.',
  alternates: { canonical: '/classement' },
};

export default function Page() {
  return (
    <LegalPage title="Référencement et classement" hideBanner>
      <h2>Comment un bien est référencé</h2>
      <p>
        Loftissime diffuse uniquement des biens atypiques à vendre, sélectionnés selon la{' '}
        <a href="/pro#charte">charte Loftissime</a>. Le prix d&apos;un bien n&apos;entre pas en compte dans la sélection.
      </p>

      <h2>Comment les biens sont classés</h2>
      <p>
        L&apos;ordre « Sélection » repose sur notre appréciation du caractère du lieu et de la qualité de l&apos;annonce.
        Vous pouvez à tout moment trier par prix, surface ou date de publication.
      </p>

      <h2>D&apos;où viennent les annonces</h2>
      <p>
        Les biens proviennent d&apos;annonces d&apos;agences. Chaque fiche indique l&apos;agence d&apos;origine et renvoie vers
        son annonce, seule à faire foi pour le prix et la disponibilité.
      </p>

      <h2>Une erreur, un bien vendu ?</h2>
      <p>
        Chaque fiche comporte un lien « Signaler cette annonce ». Nous traitons les signalements pour corriger ou retirer une
        annonce.
      </p>
    </LegalPage>
  );
}

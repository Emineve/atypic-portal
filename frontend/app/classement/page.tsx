import LegalPage from '../LegalPage';

export const metadata = {
  title: 'Nos règles de sélection · Loftissime',
  description:
    "Comment Loftissime sélectionne et classe les biens atypiques : critères, indépendance, mises à jour et signalement d'erreurs.",
  alternates: { canonical: '/classement' },
  openGraph: {
    title: 'Nos règles de sélection · Loftissime',
    description: "Comment Loftissime sélectionne et classe les biens atypiques.",
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
};

export default function Page() {
  return (
    <LegalPage title="Nos règles de sélection" hideBanner>
      <p>
        Loftissime ne montre pas « tout ce qui se vend » : il présente des lieux qui sortent de l&apos;ordinaire. Voici comment
        nous choisissons et comment nous classons.
      </p>

      <h2>Ce que nous cherchons</h2>
      <ul>
        <li>Des lieux au caractère marqué : lofts et ateliers, ateliers d&apos;artistes, péniches, rooftops, biens de caractère.</li>
        <li>Une histoire, une architecture ou un volume qui ne se retrouvent pas dans un appartement standard.</li>
        <li>Des annonces complètes : prix, surface, photographies de qualité et localisation claire.</li>
      </ul>

      <h2>Ce que nous écartons</h2>
      <ul>
        <li>Les biens ordinaires, même présentés avec des mots flatteurs.</li>
        <li>Les annonces sans prix, sans photographie exploitable ou sans localisation précise.</li>
        <li>Les annonces signalées comme vendues ou retirées par l&apos;agence.</li>
      </ul>

      <h2>Comment est établi le classement</h2>
      <p>
        L&apos;ordre « Sélection » repose sur notre appréciation du caractère du lieu et de la qualité de l&apos;annonce.
        Vous pouvez à tout moment trier par prix, surface ou date de publication.
      </p>

      <h2>Les sources</h2>
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

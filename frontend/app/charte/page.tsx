import SiteHeader from '../SiteHeader';

export const metadata = {
  title: 'Questions fréquentes · Loftissime',
  description:
    'Questions fréquentes sur Loftissime : les biens diffusés, le fonctionnement du site et le classement des annonces.',
  alternates: { canonical: '/charte' },
};

type Item = { q: string; a: string; points?: string[] };
type Group = { id: string; title: string; items: Item[] };

const groups: Group[] = [
  {
    id: 'selection',
    title: 'La sélection des biens',
    items: [
      {
        q: 'Quels biens sont diffusés sur Loftissime ?',
        a: 'Uniquement des biens atypiques à vendre : ceux qui ont quelque chose que les autres n’ont pas. Un bien entre dans la sélection s’il présente au moins l’une de ces six caractéristiques :',
        points: [
          'Une autre vie avant. Le bien a servi à autre chose avant d’être habité : loft, atelier d’artiste, ancienne usine ou manufacture, entrepôt, imprimerie, garage, commerce, bureaux, école, chapelle, péniche.',
          'Un volume. Grande hauteur sous plafond, double hauteur, mezzanine, verrière, plateau ouvert, duplex, triplex, souplex.',
          'Un dehors en ville. Terrasse, toit-terrasse, jardin, cour privative, patio, jardin d’hiver.',
          'Une situation rare. Dernier étage, vue dégagée, vue sur un monument ou sur les toits, bord de l’eau, maison en ville, voie privée ou cité d’artistes, fond de cour au calme.',
          'Une signature. Maison ou appartement d’architecte, rénovation signée, immeuble remarquable de son époque (Art déco, années 30, moderniste).',
          'Une histoire. Hôtel particulier, maison de maître, et tout bien ancien qui a gardé son caractère : verrière d’atelier, briques, poutres, structure métallique.',
        ],
      },
      {
        q: 'Comment savoir si un bien a sa place sur Loftissime ?',
        a: 'Un test simple : si l’on peut décrire le bien en commençant par autre chose que son nombre de pièces (« un ancien atelier sous verrière », « un dernier étage avec toit-terrasse »), il a sa place.',
      },
      {
        q: 'Le prix est-il un critère ?',
        a: 'Non. Ni le prix, ni le standing, ni l’adresse ne sont pris en compte dans la sélection. Seul le caractère atypique du bien compte.',
      },
      {
        q: 'Quels biens ne sont pas diffusés ?',
        a: 'Tous les logements qui ne présentent aucune de ces six caractéristiques. Un appartement classique, même très beau ou très cher, n’a pas sa place sur Loftissime : un simple balcon, des prestations haut de gamme ou une adresse prestigieuse ne suffisent pas.',
      },
      {
        q: 'Les biens présentés sont-ils réellement à vendre ?',
        a: 'Oui. Tous les biens présentés sont en cours de commercialisation. Une annonce est retirée dès que nous sommes informés que le bien n’est plus à vendre.',
      },
      {
        q: 'Les critères sont-ils les mêmes pour toutes les agences ?',
        a: 'Oui. Ils s’appliquent de la même façon à toutes les agences. Un bien qui n’y répond pas n’est pas diffusé.',
      },
    ],
  },
  {
    id: 'fonctionnement',
    title: 'Le fonctionnement du site',
    items: [
      {
        q: 'Loftissime est-il une agence immobilière ?',
        a: 'Non. Loftissime ne prend aucun mandat et n’intervient dans aucune transaction. Sa position est neutre : son seul rôle est de mettre en relation les acheteurs et les professionnels en charge des biens.',
      },
      {
        q: 'Le site est-il gratuit ?',
        a: 'Oui. La consultation des annonces est gratuite et sans inscription.',
      },
      {
        q: 'Les prix affichés comprennent-ils les honoraires d’agence ?',
        a: 'Oui. Tous les prix sont affichés honoraires d’agence inclus (HAI) : c’est le prix total du bien, sans supplément. Selon l’agence et le mandat, ces honoraires sont à la charge du vendeur ou de l’acquéreur ; l’annonce de l’agence le précise, avec leur montant lorsqu’ils sont à la charge de l’acquéreur.',
      },
      {
        q: 'Comment contacter la personne en charge d’un bien ?',
        a: 'Chaque annonce affiche l’agence, le nom de votre contact et son téléphone. Vous pouvez l’appeler directement ou demander à être rappelé.',
      },
      {
        q: 'Loftissime contacte-t-il les vendeurs ou les acheteurs ?',
        a: 'Non. Loftissime ne démarche ni les vendeurs ni les acheteurs. Vos demandes sont transmises au contact chargé de la commercialisation du bien, et vous ne recevez de notre part que les alertes que vous avez créées.',
      },
      {
        q: 'Puis-je connaître l’adresse d’un bien ?',
        a: 'Loftissime ne communique jamais l’adresse d’un bien, et ne la connaît d’ailleurs pas. Seul le secteur indiqué par l’agence apparaît sur le site. Pour en savoir plus, adressez-vous au contact chargé de la commercialisation du bien.',
      },
      {
        q: 'D’où viennent les annonces ?',
        a: 'Toutes les annonces proviennent d’agences immobilières. Chacune indique l’agence d’origine et renvoie vers l’annonce publiée sur son site, seule à faire foi pour le prix et la disponibilité.',
      },
            {
        q: 'Un particulier peut-il diffuser une annonce ?',
        a: 'Non. La diffusion d’annonces est exclusivement réservée aux agences immobilières. Loftissime est intimement convaincu que la vente d’un bien atypique doit être accompagnée par l’expertise d’une agence.',
      },
    ],
  },
  {
    id: 'classement',
    title: 'Le classement des annonces',
    items: [
      {
        q: 'Comment les biens sont-ils classés ?',
              a: 'Par défaut, quelques biens choisis par Loftissime apparaissent en tête de liste, suivis des annonces les plus récentes. Vous pouvez à tout moment trier par prix, surface ou date de publication.', 
      },
      {
        q: 'Une agence peut-elle payer pour être mieux classée ?',
        a: 'Non. À ce jour, aucune agence ne paie pour apparaître sur le site ni pour y être mieux classée.',
      },
      {
        q: 'Que faire si une annonce comporte une erreur ou si le bien est vendu ?',
        a: 'Chaque annonce comporte un lien « Signaler cette annonce ». Nous traitons chaque signalement pour corriger ou retirer l’annonce.',
      },
    ],
  },
];

export default function ChartePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-3xl mx-auto px-6 pt-14 md:pt-24 pb-6">
        <p className="text-xs uppercase tracking-widest text-stone-500">Questions fréquentes</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Tout ce que vous voulez savoir, <span className="italic text-stone-500">sans détour.</span>
        </h1>
        <p className="mt-8 text-lg font-light leading-relaxed text-stone-600">
          Tout ce qu&apos;il faut savoir sur les biens que nous diffusons et sur le fonctionnement du site.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-8">
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="pt-12 scroll-mt-20">
            <h2 className="font-serif text-2xl text-stone-900">{g.title}</h2>
            <div className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
              {g.items.map((it) => (
                <details key={it.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-lg text-stone-900">
                    {it.q}
                    <span className="text-stone-400 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">{it.a}</p>
                  {it.points && (
                    <ul className="mt-3 space-y-2 text-sm text-stone-600 leading-relaxed">
                      {it.points.map((pt) => (
                        <li key={pt} className="flex gap-2"><span aria-hidden="true">·</span><span>{pt}</span></li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}
            </div>
          </section>
        ))}
      </main>

                <div className="h-16" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: groups.flatMap((g) => g.items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: [it.a, ...(it.points || [])].join(' ') } }))) }).replace(/</g, '\\u003c') }} />
    </div>
  );
}

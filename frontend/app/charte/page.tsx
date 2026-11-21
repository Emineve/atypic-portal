import Crumbs from '../Crumbs';
import FaqDeck, { type FaqGroup } from './FaqDeck';
import SiteHeader from '../SiteHeader';

export const metadata = {
  title: 'Questions fréquentes · Loftissime',
  description:
    'Questions fréquentes sur Loftissime : les biens diffusés, le fonctionnement du site et le classement des annonces.',
  alternates: { canonical: '/charte' },
};


const groups: FaqGroup[] = [
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
      {
        q: 'Loftissime donne-t-il son avis sur les biens ?',
        a: 'Jamais. Nous ne notons pas les biens et nous ne disons pas lequel est le meilleur. En revanche, nous vous donnons des éléments de comparaison pour vous faire votre propre idée : le prix au mètre carré, le niveau des charges par rapport à la moyenne, le coût de l’énergie, la mensualité correspondante. Ce sont des repères chiffrés, les mêmes pour tous les biens. Le jugement vous appartient.',
      },
      {
        q: 'Loftissime peut-il refuser ou retirer une annonce ?',
        a: 'Oui, dans deux cas seulement : si elle n’est pas conforme à la loi, ou si elle ne respecte pas nos critères de sélection. Ce refus peut intervenir avant la publication ou après, si nous constatons le problème plus tard. Il ne dépend jamais de l’agence qui propose le bien.',
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
        a: 'Non. Loftissime ne démarche ni les vendeurs ni les acheteurs. Vos demandes sont transmises au professionnel que vous avez choisi, et vous ne recevez de notre part que les alertes que vous avez créées.',
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
        q: 'Dans quel ordre les biens apparaissent-ils ?',
        a: 'Du plus récent au plus ancien : le dernier bien arrivé est le premier affiché. C’est le seul ordre que nous décidons.',
      },
      {
        q: 'Puis-je classer les biens autrement ?',
        a: 'Oui, comme bon vous semble : par prix ou par surface, et en filtrant par lieu, budget, type de bien ou caractéristiques. Le tri et les filtres donnent le même résultat pour tous les visiteurs.',
      },
      {
        q: 'Une agence peut-elle payer pour être mieux classée ?',
        a: 'Non. Il n’existe sur Loftissime ni annonce sponsorisée, ni mise en avant, ni option pour faire remonter un bien dans la liste.',
      },
      {
        q: 'Toutes les agences sont-elles traitées de la même façon ?',
        a: 'Oui. Aucune annonce et aucune agence n’est favorisée. Les mêmes critères, le même classement et les mêmes règles s’appliquent à tous nos clients.',
      },
      {
        q: 'Que faire si une annonce comporte une erreur ou si le bien est vendu ?',
        a: 'Chaque annonce comporte un lien « Signaler cette annonce ». Nous traitons chaque signalement pour corriger ou retirer l’annonce.',
      },
    ],
  },
  {
    id: 'donnees',
    title: 'Vos coordonnées',
    items: [
      {
        q: 'Mes coordonnées sont-elles partagées ou vendues ?',
        a: 'Non. Nous ne vendons aucune donnée, et nous ne partageons vos coordonnées avec personne sans une demande de votre part. Elles ne partent que vers le professionnel que vous avez choisi de contacter.',
      },
      {
        q: 'À qui mes coordonnées sont-elles transmises ?',
        a: 'Uniquement au professionnel concerné par votre demande, et seulement quand vous envoyez cette demande.',
        table: {
          lead: 'Vous ',
          head: ['Vous…', 'Vos coordonnées vont à', 'Pour'],
          rows: [
            ['demandez à être rappelé au sujet d’un bien', 'L’agence et le négociateur chargés de ce bien', 'Vous rappeler au sujet de ce bien'],
            ['demandez à être rappelé pour plusieurs favoris', 'L’agence de chacun de ces biens', 'Vous rappeler au sujet de ces biens'],
            ['confiez votre recherche à une agence', 'Cette agence, et elle seule', 'Vous proposer les biens qui correspondent'],
            ['demandez un courtier', 'Le courtier, avec le bien et la simulation', 'Étudier votre financement et vous rappeler'],
            ['écrivez à un architecte depuis Inspiration', 'Cet architecte', 'Répondre à votre message'],
            ['créez une alerte', 'Personne', 'Vous envoyer les nouveaux biens qui correspondent'],
            ['posez une question dans État des lieux', 'Personne', 'Vous prévenir quand la réponse paraît'],
            ['demandez un tee-shirt', 'Personne', 'Vous prévenir quand il est en stock'],
          ],
        },
      },
      {
        q: 'Que faites-vous de mon e-mail quand je crée une alerte ?',
        a: 'Une seule chose : vous écrire dès qu’un bien qui correspond à votre recherche arrive sur le marché. Si plusieurs biens arrivent le même jour, le premier vous est envoyé tout de suite et les suivants sont regroupés dans un seul message. Votre e-mail et vos critères restent chez Loftissime.',
      },
      {
        q: 'Puis-je avoir plusieurs alertes, et les retrouver ?',
        a: 'Oui. Vous pouvez créer autant d’alertes que vous avez de recherches. Chaque e-mail contient un lien « Gérer mes alertes » qui les réunit sur une page : vous pouvez en arrêter une ou en créer une nouvelle. Le lien « Mes alertes », en bas du site, vous renvoie cette page par e-mail.',
      },
      {
        q: 'Une agence peut-elle recevoir mon alerte ?',
        a: 'Seulement si vous le décidez. Vous pouvez transmettre les critères de votre recherche aux agences de votre choix : c’est vous qui faites la démarche sur le site, agence par agence. Nous ne le faisons jamais à votre place.',
      },
      {
        q: 'Combien de temps mes données sont-elles conservées ?',
        a: 'Le temps nécessaire, pas davantage. Passé ces délais, la suppression est automatique, chaque nuit.',
        table: {
          head: ['Donnée', 'Conservée', 'Ensuite'],
          rows: [
            ['Votre alerte', 'Tant qu’elle est active', 'Supprimée trente jours après son arrêt'],
            ['Vos demandes de rappel, de courtier ou de contact', 'Douze mois', 'Supprimées automatiquement'],
            ['Vos questions et vos demandes de tee-shirt', 'Douze mois', 'Supprimées automatiquement'],
            ['Les mesures de fréquentation, qui ne permettent pas de vous identifier', 'Vingt-cinq mois au plus', 'Supprimées automatiquement'],
          ],
        },
      },
      {
        q: 'Comment faire supprimer mes données ?',
        a: 'Sur simple demande, à tout moment, sans avoir à vous justifier. Pour une alerte, le lien présent dans chaque e-mail suffit. Pour le reste, écrivez-nous à l’adresse indiquée dans notre politique de confidentialité.',
      },
    ],
  },
];

export default function ChartePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-10 md:pt-14 pb-7 md:pb-9">
        <Crumbs items={[{ label: 'Questions fréquentes' }]} />
        <h1 className="mt-5 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Tout ce que vous voulez savoir, <span className="italic text-stone-500">sans détour.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-600">
          Nos biens, notre fonctionnement, vos coordonnées.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="pb-8">
          <FaqDeck groups={groups} />
        </div>
      </main>

                <div className="h-16" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: groups.flatMap((g) => g.items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: [it.a, ...(it.points || []), ...(it.table ? it.table.rows.map((r) => `${it.table!.lead || ''}${r[0]} : ${r[1]}. ${r[2]}.`) : [])].join(' ') } }))) }).replace(/</g, '\\u003c') }} />
    </div>
  );
}

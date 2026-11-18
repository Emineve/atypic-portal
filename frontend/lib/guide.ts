// « Le guide » : articles pour l'acheteur d'un bien atypique.
// Un article n'apparaît sur le site qu'à partir de sa date de publication : on peut donc en écrire
// plusieurs à l'avance, ils se mettent en ligne tout seuls, semaine après semaine.

export interface GuideSection {
  title: string; // intertitre, de préférence sous forme de question
  paragraphs?: string[];
  list?: string[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  description: string; // résumé pour Google et les réseaux (150 à 160 caractères)
  category: 'Avant d’acheter' | 'Financer et assurer' | 'Vivre et entretenir' | 'Estimer et revendre';
  published: string; // AAAA-MM-JJ : date de mise en ligne
  updated: string; // AAAA-MM-JJ : dernière vérification des informations
  readMinutes: number;
  intro: string;
  takeaways: string[]; // « À retenir » : la réponse en quelques points
  sections: GuideSection[];
  checklist?: { title: string; items: string[] };
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  listingsLink?: { label: string; href: string }; // vers les annonces du type de bien concerné
}

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'acheter-un-souplex',
    title: 'Acheter un souplex : ce qu’il faut vérifier avant de signer',
    description:
      'Souplex : habitabilité du sous-sol, surface Carrez, copropriété, urbanisme, humidité. Les vérifications à faire avant d’acheter, avec les textes à connaître.',
    category: 'Avant d’acheter',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 7,
    intro:
      'Un souplex réunit un rez-de-chaussée et le niveau situé en dessous, reliés par un escalier intérieur. On y gagne des mètres carrés à un prix inférieur à celui des étages. Mais le niveau bas n’est pas toujours, en droit, une surface où l’on peut vivre. Tout l’enjeu de l’achat est de savoir ce que l’on achète réellement.',
    takeaways: [
      'La première question est juridique : le niveau bas est-il une pièce habitable, ou une cave aménagée ? La réponse se lit dans le règlement de copropriété et l’état descriptif de division.',
      'Les caves et sous-sols figurent parmi les locaux que le Code de la santé publique interdit de mettre à disposition comme habitation lorsqu’ils sont insalubres (article L. 1331-23). Les critères précis relèvent aujourd’hui du règlement sanitaire de chaque département.',
      'La surface du niveau bas n’entre dans la surface Carrez que si la hauteur atteint 1,80 m, et jamais s’il s’agit d’un lot de cave.',
      'Une transformation faite sans accord de la copropriété ni autorisation d’urbanisme se transmet à l’acheteur : c’est lui qui en portera les conséquences.',
    ],
    sections: [
      {
        title: 'Souplex : de quoi parle-t-on exactement ?',
        paragraphs: [
          'Le mot n’a pas de définition légale. Il désigne un logement sur deux niveaux dont le niveau inférieur est en sous-sol, partiel ou total. Deux situations très différentes se cachent derrière la même annonce.',
          'Dans la première, le niveau bas a toujours fait partie du lot d’habitation : il est décrit comme tel dans les documents de la copropriété. Dans la seconde, une cave ou une réserve a été reliée au rez-de-chaussée et aménagée. Le résultat peut être identique à l’œil. En droit, il ne l’est pas.',
        ],
      },
      {
        title: 'Le niveau bas est-il légalement habitable ?',
        paragraphs: [
          'L’article L. 1331-23 du Code de la santé publique interdit de mettre à disposition, comme habitation, des locaux insalubres. Il cite expressément les caves, les sous-sols, les combles, les pièces trop basses et les pièces de vie sans ouverture sur l’extérieur ou sans éclairement naturel suffisant.',
          'Un décret du 29 juillet 2023 avait fixé des critères nationaux, qui permettaient à un sous-sol d’être habitable sous conditions de hauteur, d’ouverture et d’éclairement. Le Conseil d’État a annulé ces dispositions le 29 août 2024, pour un motif de procédure. Depuis, ce sont de nouveau les règlements sanitaires départementaux qui s’appliquent sur ces points, dans l’attente d’un nouveau texte.',
          'Conséquence pratique : la règle dépend du département. Il faut demander à l’agence ou au notaire sur quel fondement le niveau bas est présenté comme habitable, et consulter le règlement sanitaire applicable.',
          'Cette question pèse surtout sur la location : un niveau bas non conforme ne peut pas être loué comme pièce d’habitation. Elle pèse aussi sur la revente, puisque le prochain acheteur posera la même question.',
        ],
      },
      {
        title: 'Quelle surface achetez-vous vraiment ?',
        paragraphs: [
          'En copropriété, le vendeur doit indiquer la superficie de la partie privative, dite surface Carrez. Elle exclut les surfaces dont la hauteur est inférieure à 1,80 m. Elle exclut aussi les caves, quelle que soit leur hauteur.',
          'Une annonce de 90 m² peut donc correspondre à 55 m² de surface Carrez et 35 m² de sous-sol aménagé. Ce n’est pas une tromperie si c’est écrit clairement. C’est une information décisive pour comparer le prix au mètre carré avec celui du quartier.',
          'Demandez le certificat de mesurage et vérifiez, niveau par niveau, ce qui est compté et ce qui ne l’est pas.',
        ],
      },
      {
        title: 'Que disent le règlement de copropriété et l’urbanisme ?',
        paragraphs: [
          'Le règlement de copropriété fixe la destination de chaque lot. Transformer une cave en pièce de vie change l’usage du lot et suppose, selon les cas, une décision de l’assemblée générale. Les travaux qui touchent les parties communes, comme l’ouverture d’une trémie dans un plancher, exigent une autorisation votée à la majorité des voix de tous les copropriétaires (article 25 b de la loi du 10 juillet 1965). Si le projet modifie la destination de l’immeuble, l’unanimité est requise (article 26).',
          'Côté urbanisme, un changement de destination relève d’une déclaration préalable (article R. 421-17 du Code de l’urbanisme), et d’un permis de construire si les travaux modifient la structure porteuse ou la façade (article R. 421-14).',
          'Demandez les procès-verbaux d’assemblée générale qui ont autorisé les travaux et les autorisations d’urbanisme obtenues. S’ils n’existent pas, la situation n’est pas régularisée, et c’est l’acheteur qui en hérite.',
        ],
      },
      {
        title: 'Humidité, ventilation, inondation : que regarder sur place ?',
        list: [
          'L’odeur et les traces : salpêtre, peinture cloquée, plinthes gonflées, déshumidificateur en fonctionnement.',
          'La ventilation : une ventilation mécanique en état de marche, avec des entrées d’air, est indispensable sous le niveau du sol.',
          'La lumière naturelle : nombre et taille des ouvertures, cour anglaise, soupiraux.',
          'L’évacuation des eaux : présence d’une pompe de relevage si une salle d’eau est installée en bas, et son entretien.',
          'Le risque d’inondation : il figure dans l’état des risques remis à l’acheteur et se vérifie sur le site Géorisques.',
          'L’issue de secours : pouvoir sortir du niveau bas autrement que par l’escalier intérieur est un vrai confort de sécurité.',
        ],
      },
      {
        title: 'Quel prix et quelles conséquences pour la revente ?',
        paragraphs: [
          'Un souplex se négocie en dessous d’un bien équivalent en étage, parce qu’une partie de la surface est moins lumineuse et moins bien considérée. L’ampleur de l’écart varie selon la ville, la qualité de l’aménagement et la régularité juridique du niveau bas. Nous ne donnons pas de pourcentage : les chiffres qui circulent ne sont pas sourcés.',
          'À la revente, un souplex en règle et bien éclairé trouve preneur. Un souplex dont le niveau bas est une cave non régularisée se vend plus lentement, et la banque de l’acheteur peut ne financer que la surface Carrez.',
        ],
      },
    ],
    checklist: {
      title: 'Les documents à demander avant de faire une offre',
      items: [
        'Le règlement de copropriété et l’état descriptif de division, pour lire la désignation exacte du lot.',
        'Le certificat de mesurage Carrez, avec le détail par niveau.',
        'Les procès-verbaux d’assemblée générale autorisant les travaux de transformation.',
        'Les autorisations d’urbanisme : déclaration préalable ou permis de construire.',
        'L’état des risques, qui mentionne le risque d’inondation.',
        'Les factures des travaux d’étanchéité, de ventilation et de la pompe de relevage.',
      ],
    },
    faq: [
      {
        q: 'Un souplex est-il légal ?',
        a: 'Oui. Acheter et habiter un souplex est légal. Ce qui doit être vérifié, c’est le statut du niveau inférieur : pièce habitable régulièrement autorisée, ou cave aménagée sans autorisation de la copropriété ni de l’urbanisme.',
      },
      {
        q: 'La surface du sous-sol compte-t-elle dans la loi Carrez ?',
        a: 'Seulement si la hauteur sous plafond atteint 1,80 m et si le niveau fait partie du lot d’habitation. Un lot de cave n’est jamais compté dans la surface Carrez.',
      },
      {
        q: 'Peut-on louer un souplex ?',
        a: 'Oui, à condition que le logement soit décent et que le niveau bas respecte les règles de salubrité applicables dans le département. Un sous-sol qui ne les respecte pas ne peut pas être loué comme pièce d’habitation.',
      },
      {
        q: 'Qui est responsable si la transformation n’a pas été autorisée ?',
        a: 'Après la vente, c’est le nouveau propriétaire qui répond de la situation vis-à-vis de la copropriété et de l’administration. D’où l’importance de demander les autorisations avant de signer.',
      },
    ],
    sources: [
      { label: 'ANIL, « Lutte contre l’habitat indigne : règles sanitaires d’hygiène et de salubrité »', url: 'https://www.anil.org/aj-rsd-habitat-indigne/' },
      { label: 'Conseil d’État, 29 août 2024, n° 488640 (Légifrance)', url: 'https://www.legifrance.gouv.fr/ceta/id/CETATEXT000050150879' },
      { label: 'Actu-Juridique, « Le régime réglementaire de la salubrité et de l’hygiène des locaux d’habitation est retoqué »', url: 'https://www.actu-juridique.fr/civil/logement/le-regime-reglementaire-de-la-salubrite-et-de-lhygiene-des-locaux-dhabitation-est-retoque/' },
      { label: 'Notaires de France, « Comment transformer un local commercial en local d’habitation ? »', url: 'https://www.notaires.fr/fr/article/comment-transformer-un-local-commercial-en-local-dhabitation' },
      { label: 'Géorisques, pour connaître les risques à une adresse', url: 'https://www.georisques.gouv.fr' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
];

// Articles en ligne à la date du jour, du plus récent au plus ancien
export function publishedArticles(now: Date = new Date()): GuideArticle[] {
  const today = now.toISOString().slice(0, 10);
  return GUIDE_ARTICLES.filter((a) => a.published <= today).sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function formatGuideDate(iso: string): string {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

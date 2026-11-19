// « Le guide » : articles pour l'acheteur d'un bien atypique.
// Un article n'apparaît sur le site qu'à partir de sa date de publication : on peut donc en écrire
// plusieurs à l'avance, ils se mettent en ligne tout seuls, semaine après semaine.

// Les rubriques d'État des lieux, dans l'ordre où elles s'affichent
export const GUIDE_RUBRICS = [
  { name: 'Marché', anchor: 'marche', intro: 'Les prix, les taux, les délais : où en est le marché.' },
  { name: 'Visite et négociation', anchor: 'visite', intro: 'Les bonnes questions, au bon moment.' },
  { name: 'Types de biens', anchor: 'types', intro: 'Souplex, loft, péniche, duplex : ce que chacun a de particulier.' },
  { name: 'Surfaces et travaux', anchor: 'technique', intro: 'Ce qui est compté, ce qui a été transformé, ce que le bien consomme.' },
  { name: 'Copropriété', anchor: 'copropriete', intro: 'Les règles de l’immeuble et ce qu’il coûte à vivre.' },
  { name: 'Financement', anchor: 'financement', intro: 'Le crédit, l’assurance, le dossier.' },
] as const;
export type GuideRubric = (typeof GUIDE_RUBRICS)[number]['name'];

export interface GuideSection {
  title: string; // intertitre, de préférence sous forme de question
  paragraphs?: string[];
  list?: string[];
}

export interface GuideArticle {
  slug: string;
  art: 'souplex' | 'loft' | 'plans' | 'peniche' | 'mezzanine' | 'visite' | 'terrasse' | 'dpe' | 'credit' | 'duplex' | 'charges' | 'marche'; // illustration en tête d'article
  title: string;
  description: string; // résumé pour Google et les réseaux (150 à 160 caractères)
  category: GuideRubric;
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
    slug: 'questions-a-poser-visite-bien-atypique',
    art: 'visite',
    title: 'Visite d’un bien atypique : les bonnes questions à poser au négociateur',
    description:
      'Surface, travaux, verrière, copropriété, prix : les questions à poser au négociateur avant et pendant la visite d’un loft, d’un atelier ou d’un dernier étage, et ce que les réponses vous apprennent.',
    category: 'Visite et négociation',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 9,
    intro:
      'Une verrière, six mètres sous plafond, une terrasse sur les toits : dans un bien atypique, le coup de cœur arrive en trente secondes. Le négociateur, lui, connaît le dossier. Il a vu les plans, lu les procès-verbaux, parlé au vendeur. Les bonnes questions font de lui votre meilleure source d’information. Encore faut-il savoir lesquelles poser, et à quel moment.',
    takeaways: [
      'Posez les questions éliminatoires au téléphone, avant de vous déplacer : surface réelle, charges, travaux, disponibilité.',
      'Dans un bien atypique, trois sujets passent avant tout : ce qui est compté dans la surface, ce qui a été transformé et avec quelles autorisations, le confort été comme hiver.',
      'Une bonne question appelle un document. « Les travaux ont-ils été autorisés ? » se termine par « Pouvez-vous m’envoyer le procès-verbal ? ».',
      'Un négociateur qui répond « je ne sais pas, je me renseigne » est un bon signe. Demandez la réponse par écrit.',
    ],
    sections: [
      {
        title: 'Quelles questions poser avant même de visiter ?',
        paragraphs: [
          'Cinq minutes au téléphone suffisent. Vous saurez si le bien vaut le déplacement, et le négociateur saura qu’il a affaire à un acheteur sérieux.',
        ],
        list: [
          'Quelle est la surface Carrez, et quelle est la surface au sol ? D’où vient l’écart ?',
          'À quel étage, avec ou sans ascenseur, et quelle exposition ?',
          'Quel est le montant des charges de copropriété et de la taxe foncière ?',
          'Le bien est-il libre, et à quelle date ?',
          'Y a-t-il des travaux à prévoir, dans le bien ou dans l’immeuble ?',
        ],
      },
      {
        title: 'Sur l’histoire du bien : qu’était-il avant ?',
        paragraphs: [
          'C’est la question qui distingue un bien atypique d’un autre. Un loft a souvent été un atelier, une boutique, un entrepôt. La réponse commande toutes les suivantes.',
        ],
        list: [
          'Qu’était ce bien à l’origine, et quand a-t-il été transformé ?',
          'Est-il officiellement un logement ? Le changement de destination a-t-il été autorisé par la mairie ?',
          'Comment le lot est-il désigné dans le règlement de copropriété : appartement, atelier, local commercial ?',
          'Qui a conçu la transformation : un architecte, le propriétaire lui-même ?',
        ],
      },
      {
        title: 'Sur la surface et les volumes : qu’est-ce qui est compté ?',
        list: [
          'La mezzanine est-elle comprise dans la surface Carrez ? Quelle est la hauteur sous plafond, dessus et dessous ?',
          'Sous les pentes, quelle surface dépasse 1,80 m de hauteur ?',
          'Le niveau bas ou le sous-sol est-il compté ? Est-il considéré comme une pièce habitable ?',
          'La terrasse est-elle une partie privative ou un droit de jouissance ? Que dit le règlement sur son usage et son entretien ?',
          'Qui a réalisé le mesurage, et à quelle date ?',
        ],
      },
      {
        title: 'Sur les travaux : qu’est-ce qui a été modifié ?',
        paragraphs: [
          'Dans un bien atypique, les plans ont presque toujours bougé. Ce n’est pas un problème si tout a été autorisé. Ça le devient si personne ne peut le prouver.',
        ],
        list: [
          'Quels travaux le vendeur a-t-il réalisés, et en quelle année ?',
          'Ont-ils touché un mur porteur, un plancher, la façade ou la toiture ?',
          'L’assemblée générale les a-t-elle autorisés ? Peut-on voir le procès-verbal ?',
          'Y a-t-il eu une déclaration préalable ou un permis de construire ?',
          'Les entreprises étaient-elles assurées ? Les factures sont-elles disponibles ?',
        ],
      },
      {
        title: 'Sur le confort : comment vit-on ici, été comme hiver ?',
        list: [
          'La verrière et les baies sont-elles en simple ou en double vitrage ? Y a-t-il déjà eu des infiltrations ?',
          'Quelle température fait-il l’été ? Y a-t-il des stores, une climatisation ?',
          'Combien le vendeur paie-t-il de chauffage et d’électricité par an ? Peut-on voir les factures ?',
          'Comment nettoie-t-on la verrière ou les grandes baies, et combien cela coûte-t-il ?',
          'D’où vient le bruit : la rue, la cour, les voisins, un commerce en dessous ?',
          'Au rez-de-chaussée ou en niveau bas : y a-t-il déjà eu de l’humidité ou un dégât des eaux ?',
        ],
      },
      {
        title: 'Sur l’immeuble : comment se porte la copropriété ?',
        list: [
          'Quels travaux ont été votés, et lesquels sont à l’étude ? Ravalement, toiture, ascenseur ?',
          'Qui paiera les travaux déjà votés : le vendeur ou l’acheteur ?',
          'Y a-t-il des impayés de charges ou une procédure en cours ?',
          'Y a-t-il un fonds de travaux, et quel est son montant ?',
          'Le règlement autorise-t-il ce que vous projetez : exercer une activité, louer, installer une climatisation, fermer une terrasse ?',
          'Peut-on avoir les procès-verbaux des trois dernières assemblées générales ?',
        ],
      },
      {
        title: 'Sur la vente : où en est-on ?',
        paragraphs: [
          'Ces questions ne sont pas indiscrètes. Un négociateur les entend tous les jours, et ses réponses vous aident à faire une offre juste.',
        ],
        list: [
          'Depuis quand le bien est-il en vente ? Le prix a-t-il déjà été revu ?',
          'Pourquoi les propriétaires vendent-ils ? Ont-ils un calendrier à tenir ?',
          'Y a-t-il eu des offres ? Pourquoi n’ont-elles pas abouti ?',
          'Comment le prix a-t-il été fixé ? À quels biens vendus récemment peut-on le comparer ?',
          'Qu’est-ce qui reste dans le bien : cuisine, luminaires, rangements sur mesure ?',
          'Les honoraires sont-ils à la charge du vendeur ou de l’acquéreur ?',
        ],
      },
      {
        title: 'Et ce que le négociateur ne peut pas dire à votre place ?',
        paragraphs: [
          'Certaines réponses ne s’obtiennent qu’en regardant. Restez silencieux une minute en entrant, pour écouter. Éteignez les lumières, pour juger la lumière naturelle. Ouvrez les fenêtres, les robinets, le tableau électrique. Mesurez les hauteurs. Regardez l’escalier, la façade, le local à vélos.',
          'Puis revenez. Une seconde visite, à une autre heure, accompagné d’un proche ou d’un artisan, et les documents en main : c’est là que l’on décide, pas avant.',
        ],
      },
    ],
    checklist: {
      title: 'Les questions à emporter le jour de la visite',
      items: [
        'Qu’était ce bien avant, et est-il officiellement un logement ?',
        'Surface Carrez et surface au sol : d’où vient l’écart ?',
        'Mezzanine, pentes, niveau bas : qu’est-ce qui est compté ?',
        'Terrasse : privative ou droit de jouissance ?',
        'Quels travaux ont été faits, quand, avec quelles autorisations ?',
        'Verrière et baies : vitrage, infiltrations, nettoyage ?',
        'Températures été et hiver, factures d’énergie ?',
        'Humidité ou dégât des eaux déjà constatés ?',
        'Charges, taxe foncière, fonds de travaux ?',
        'Travaux votés dans l’immeuble : lesquels, payés par qui ?',
        'Impayés ou procédure en cours dans la copropriété ?',
        'Depuis quand en vente, combien d’offres, pourquoi vendent-ils ?',
        'Qu’est-ce qui reste dans le bien ?',
        'Documents à recevoir : Carrez, diagnostics, procès-verbaux des trois dernières assemblées, règlement de copropriété.',
        'Seconde visite possible à une autre heure ?',
      ],
    },
    faq: [
      {
        q: 'Quelles questions poser en priorité lors de la visite d’un bien atypique ?',
        a: 'Trois : ce qui est réellement compté dans la surface, quels travaux ont été faits et avec quelles autorisations, et comment le bien se comporte en été et en hiver.',
      },
      {
        q: 'Peut-on demander pourquoi les propriétaires vendent ?',
        a: 'Oui. C’est une question habituelle, et la réponse renseigne sur le calendrier du vendeur et sur sa marge de discussion.',
      },
      {
        q: 'Quels documents demander au négociateur après la visite ?',
        a: 'Le certificat de surface Carrez, les diagnostics dont le DPE, le détail des charges, la taxe foncière, les procès-verbaux des trois dernières assemblées générales et le règlement de copropriété.',
      },
      {
        q: 'Combien de visites faut-il faire avant de faire une offre ?',
        a: 'Au moins deux, à des heures différentes. La seconde se fait accompagné, avec les documents du bien en main.',
      },
    ],
    sources: [
      { label: 'Crédit Agricole e-immobilier, « Visite pour l’achat d’un appartement : notre check-list complète »', url: 'https://e-immobilier.credit-agricole.fr/conseils/1er-achat/visite-pour-lachat-dun-appartement-notre-check-list-complete' },
      { label: 'SeLoger, « Visiter un appartement : ce qu’il faut vérifier avant d’acheter votre logement »', url: 'https://edito.seloger.com/conseils-d-experts/acheter/visiter-un-appartement-qu-faut-verifier-d-acheter-logement-article-28697.html' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'acheter-un-souplex',
    art: 'souplex',
    title: 'Acheter un souplex : ce qu’il faut vérifier avant de signer',
    description:
      'Souplex : habitabilité du sous-sol, surface Carrez, copropriété, urbanisme, humidité. Les vérifications à faire avant d’acheter, avec les textes à connaître.',
    category: 'Types de biens',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 7,
    intro:
      'Un souplex réunit un rez-de-chaussée et le niveau situé en dessous, reliés par un escalier intérieur. On y gagne des mètres carrés à un prix inférieur à celui des étages. Mais le niveau bas n’est pas toujours, en droit, une surface où l’on peut vivre. Tout l’enjeu de l’achat est de savoir ce que l’on achète réellement.',
    takeaways: [
      'La première question est juridique : le niveau bas est-il une pièce habitable, ou une cave aménagée ? La réponse se lit dans le règlement de copropriété et l’état descriptif de division.',
      'Les caves et sous-sols figurent parmi les locaux que le Code de la santé publique interdit de mettre à disposition comme habitation lorsqu’ils sont insalubres (article L. 1331-23). Les critères précis relèvent aujourd’hui du règlement sanitaire de chaque département.',
      'Le niveau bas entre dans la surface Carrez s’il est réellement aménagé en pièce et que la hauteur sous plafond atteint 1,80 m. Une cave restée cave n’est jamais comptée.',
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
          'En copropriété, le vendeur doit indiquer la superficie de la partie privative, dite surface Carrez. Elle exclut les surfaces dont la hauteur est inférieure à 1,80 m. Elle exclut aussi les caves. Mais les juges mesurent le bien tel qu’il existe au jour de la vente : une cave transformée en pièce, avec les autorisations nécessaires, a été comptée par la Cour de cassation (5 décembre 2007).',
          'Si le niveau bas est trop bas de plafond, ou resté à l’état de cave, une annonce de 90 m² peut correspondre à 55 m² de surface Carrez et 35 m² hors Carrez. Ce n’est pas une tromperie si c’est écrit clairement. C’est une information décisive pour comparer le prix au mètre carré avec celui du quartier.',
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
          'À la revente, un souplex en règle et bien éclairé trouve preneur. Un souplex dont le niveau bas est une cave non régularisée se vend plus lentement, et moins cher.',
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
        a: 'Oui si le niveau est réellement aménagé en pièce et que la hauteur sous plafond atteint 1,80 m. Une cave restée à l’état de cave n’est pas comptée.',
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
      { label: 'ANIL, « Vente / Cave aménagée » (Cour de cassation, 5 décembre 2007)', url: 'https://www.anil.org/documentation-experte/analyses-juridiques-jurisprudence/jurisprudence/jurisprudence-2008/vente-/-cave-amenagee/' },
      { label: 'Géorisques, pour connaître les risques à une adresse', url: 'https://www.georisques.gouv.fr' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'loft-ancien-local-commercial',
    art: 'loft',
    title: 'Loft dans un ancien local commercial : est-ce bien un logement ?',
    description:
      'Ancienne boutique, atelier ou bureau devenu loft : changement de destination, copropriété, impôts. Ce qu’il faut vérifier avant d’acheter, document par document.',
    category: 'Types de biens',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 6,
    intro:
      'Une ancienne imprimerie, une boutique sur cour, un atelier sous verrière : beaucoup de lofts ont eu une autre vie. C’est ce qui fait leur charme. C’est aussi ce qui impose une vérification simple avant d’acheter : le bien est-il devenu un logement sur le papier, ou seulement dans les faits ?',
    takeaways: [
      'Transformer un local commercial ou professionnel en logement est un changement de destination. Il exige une autorisation d’urbanisme : déclaration préalable, ou permis de construire si la façade ou la structure porteuse sont modifiées.',
      'En copropriété, le règlement fixe la destination de l’immeuble et des lots. Si le logement n’y est pas prévu, l’assemblée générale doit avoir donné son accord.',
      'Le changement doit avoir été déclaré aux impôts dans les 90 jours. Il modifie la taxe foncière.',
      'Un loft vendu sans ces documents est un local, pas un logement. Ce n’est pas le même bien, ni le même prix.',
    ],
    sections: [
      {
        title: 'Pourquoi la question se pose-t-elle ?',
        paragraphs: [
          'Chaque bâtiment a une destination au sens du Code de l’urbanisme : habitation, commerce, bureau, artisanat. Habiter un bien ne change pas sa destination. Seule une autorisation délivrée par la mairie le fait.',
          'Un loft peut donc être parfaitement aménagé, avec cuisine et salle de bains, et rester un local commercial pour la mairie, pour la copropriété et pour les impôts. L’annonce ne le dit pas toujours. Les documents, si.',
        ],
      },
      {
        title: 'Quelle autorisation d’urbanisme faut-il retrouver ?',
        paragraphs: [
          'Le passage d’un local professionnel ou commercial à l’habitation est un changement de destination. Selon le site officiel Service-Public, une déclaration préalable suffit quand les travaux ne touchent ni la façade ni la structure porteuse. Un permis de construire est nécessaire dans le cas contraire.',
          'Le projet doit aussi respecter le plan local d’urbanisme. Certaines communes protègent les rez-de-chaussée commerciaux et refusent leur transformation en logements.',
          'Demandez au vendeur la copie de l’autorisation et la déclaration d’achèvement des travaux. En cas de doute, le service urbanisme de la mairie peut confirmer la destination enregistrée pour l’adresse.',
        ],
      },
      {
        title: 'Que dit la copropriété ?',
        paragraphs: [
          'Le règlement de copropriété définit la destination de l’immeuble et l’usage de chaque lot. Un lot décrit comme « local commercial » ou « atelier » ne devient pas un appartement par la seule volonté de son propriétaire.',
          'Si la transformation est contraire à la destination de l’immeuble, Service-Public indique qu’elle doit être votée en assemblée générale, à l’unanimité. Les travaux qui touchent les parties communes ou l’aspect extérieur, comme une vitrine remplacée par une verrière, demandent de leur côté une autorisation de l’assemblée.',
          'Lisez la désignation du lot dans le règlement et dans l’état descriptif de division, puis les procès-verbaux des assemblées qui ont suivi les travaux.',
        ],
      },
      {
        title: 'Et les impôts ?',
        paragraphs: [
          'Le propriétaire doit déclarer le changement au service des impôts fonciers dans les 90 jours qui suivent sa réalisation. La taxe foncière est alors recalculée sur la base d’un logement. Une taxe d’aménagement peut être due pour la transformation.',
          'Demandez le dernier avis de taxe foncière : il indique si le bien est imposé comme un logement ou comme un local professionnel.',
        ],
      },
      {
        title: 'Que regarder sur place ?',
        list: [
          'La lumière et l’aération : un ancien local profond peut avoir peu de fenêtres. Vérifiez que chaque pièce de vie s’ouvre sur l’extérieur.',
          'L’isolation et le chauffage : un atelier n’a pas été construit pour être chauffé comme un logement. Le diagnostic de performance énergétique donne une première idée.',
          'Le bruit et le voisinage : en rez-de-chaussée sur rue ou sur cour, la vie de l’immeuble passe devant vos fenêtres.',
          'Les réseaux : évacuations, compteur électrique et ventilation doivent correspondre à un usage d’habitation.',
          'L’accès : entrée indépendante sur rue, passage par la cour, boîte aux lettres, local à vélos.',
        ],
      },
      {
        title: 'Et si le changement n’a jamais été fait ?',
        paragraphs: [
          'Le bien peut souvent être régularisé, si le plan local d’urbanisme et la copropriété le permettent. Mais c’est une démarche, avec un délai et un résultat incertain.',
          'Deux façons de se protéger : demander au vendeur de régulariser avant la vente, ou faire de l’obtention de l’autorisation une condition suspensive de la promesse. Dans les deux cas, parlez-en au notaire avant de faire une offre.',
        ],
      },
    ],
    checklist: {
      title: 'Les documents à demander avant de faire une offre',
      items: [
        'L’autorisation d’urbanisme du changement de destination : déclaration préalable ou permis de construire.',
        'La déclaration d’achèvement et de conformité des travaux.',
        'Le règlement de copropriété et l’état descriptif de division, pour lire la désignation du lot.',
        'Les procès-verbaux d’assemblée générale qui autorisent la transformation et les travaux.',
        'Le dernier avis de taxe foncière.',
        'Le diagnostic de performance énergétique.',
      ],
    },
    faq: [
      {
        q: 'Peut-on habiter un local commercial ?',
        a: 'Pas sans changement de destination. Il faut une autorisation d’urbanisme et, en copropriété, que le règlement ou l’assemblée générale le permette.',
      },
      {
        q: 'Faut-il un permis de construire pour transformer un local en logement ?',
        a: 'Une déclaration préalable suffit si la façade et la structure porteuse ne sont pas modifiées. Sinon, il faut un permis de construire.',
      },
      {
        q: 'Comment savoir si un loft est officiellement un logement ?',
        a: 'Trois documents le disent : l’autorisation d’urbanisme, la désignation du lot dans le règlement de copropriété et l’avis de taxe foncière.',
      },
      {
        q: 'Un loft resté local commercial peut-il être financé par un crédit immobilier ?',
        a: 'Cela dépend de la banque et du projet. Posez la question à votre banque ou à votre courtier avant de signer, en lui indiquant la destination réelle du bien.',
      },
    ],
    sources: [
      { label: 'Service-Public, « Comment transformer un local professionnel ou commercial en logement ? »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2416' },
      { label: 'Notaires de France, « Comment transformer un local commercial en local d’habitation ? »', url: 'https://www.notaires.fr/fr/article/comment-transformer-un-local-commercial-en-local-dhabitation' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'travaux-non-declares',
    art: 'plans',
    title: 'Travaux non déclarés : ce que risque vraiment l’acheteur',
    description:
      'Mur abattu, mezzanine, véranda ou pièce créée sans autorisation : ce que l’acheteur reprend à son compte, les délais à connaître et comment se protéger avant de signer.',
    category: 'Surfaces et travaux',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 7,
    intro:
      'Dans un bien atypique, les plans ont presque toujours bougé. Une cloison est tombée, une mezzanine est apparue, une terrasse a été fermée. La question n’est pas de savoir si des travaux ont été faits. Elle est de savoir s’ils ont été autorisés, parce que l’irrégularité ne reste pas chez le vendeur : elle suit le bien.',
    takeaways: [
      'Deux autorisations distinctes peuvent manquer : celle de la mairie (urbanisme) et celle de la copropriété. L’une ne remplace jamais l’autre.',
      'Côté urbanisme, la commune peut demander en justice la démolition ou la mise en conformité pendant dix ans après la fin des travaux (article L. 480-14 du Code de l’urbanisme).',
      'Côté copropriété, des travaux sur les parties communes faits sans vote peuvent donner lieu à une demande de remise en état. L’assemblée générale peut aussi les régulariser après coup.',
      'La protection de l’acheteur se joue avant la signature : poser la question par écrit, obtenir les documents, et faire inscrire la situation dans la promesse.',
    ],
    sections: [
      {
        title: 'De quels travaux parle-t-on ?',
        list: [
          'Une surface créée : mezzanine, véranda, comble aménagé, cave transformée en pièce.',
          'Une façade modifiée : fenêtre de toit, verrière, baie agrandie, terrasse fermée.',
          'Un usage changé : commerce ou atelier devenu logement.',
          'En copropriété, tout ce qui touche les parties communes : mur porteur, plancher, canalisations communes, conduit, aspect extérieur.',
        ],
      },
      {
        title: 'Quels sont les risques du côté de la mairie ?',
        paragraphs: [
          'Trois délais coexistent. L’infraction pénale se prescrit par six ans à compter de l’achèvement des travaux. La commune peut, pendant dix ans, saisir le tribunal pour faire ordonner la démolition ou la mise en conformité (article L. 480-14 du Code de l’urbanisme).',
          'Enfin, l’article L. 421-9 prévoit qu’au bout de dix ans, la mairie ne peut plus refuser une nouvelle autorisation au seul motif de l’irrégularité ancienne. Cette règle a des exceptions importantes, notamment quand les travaux ont été faits sans aucun permis alors qu’il en fallait un, ou en secteur protégé.',
          'Passé ces délais, les travaux ne deviennent pas réguliers pour autant. Ils ne peuvent simplement plus être sanctionnés de la même façon. La difficulté peut réapparaître le jour où vous déposerez à votre tour une demande d’autorisation.',
        ],
      },
      {
        title: 'Et du côté de la copropriété ?',
        paragraphs: [
          'Les travaux qui affectent les parties communes ou l’aspect extérieur de l’immeuble doivent être autorisés par l’assemblée générale, à la majorité des voix de tous les copropriétaires (article 25 b de la loi du 10 juillet 1965). Une clause du règlement qui les autoriserait par avance est sans effet.',
          'Sans ce vote, le syndic ou un copropriétaire peut demander en justice la remise en état. Le délai pour agir est en principe de cinq ans. Il est de trente ans lorsque les travaux reviennent à s’approprier une partie commune.',
          'L’assemblée générale peut régulariser des travaux après coup, à condition qu’ils soient conformes à la destination de l’immeuble. C’est souvent la meilleure issue, et elle peut être demandée par le vendeur avant la vente.',
        ],
      },
      {
        title: 'Qu’est-ce que cela change pour l’acheteur ?',
        paragraphs: [
          'En achetant, vous devenez le propriétaire d’un bien qui n’est pas conforme. Les démarches de la mairie ou de la copropriété s’adresseront désormais à vous.',
          'Vous pouvez aussi vous retourner contre le vendeur s’il a caché la situation. Mais un procès est long et incertain. Mieux vaut savoir avant.',
          'Enfin, une surface créée sans autorisation est fragile à la revente : votre futur acheteur posera les mêmes questions que vous.',
        ],
      },
      {
        title: 'Comment se protéger avant de signer ?',
        list: [
          'Comparez le bien avec les plans d’origine, ceux du règlement de copropriété ou du permis.',
          'Posez la question par écrit à l’agence : quels travaux ont été réalisés, quand, et avec quelles autorisations ?',
          'Demandez les autorisations d’urbanisme et la déclaration d’achèvement des travaux.',
          'Demandez les procès-verbaux des assemblées générales qui ont autorisé les travaux.',
          'Si un document manque, demandez au vendeur de régulariser avant la vente, ou faites décrire précisément la situation dans la promesse, avec une condition suspensive.',
          'Parlez-en au notaire dès l’offre, pas la veille de la signature.',
        ],
      },
    ],
    faq: [
      {
        q: 'L’acheteur est-il responsable des travaux faits par l’ancien propriétaire ?',
        a: 'Il n’en est pas l’auteur, mais il devient propriétaire d’un bien irrégulier. C’est à lui que la mairie ou la copropriété demandera la mise en conformité ou la remise en état.',
      },
      {
        q: 'Au bout de combien de temps des travaux non déclarés sont-ils prescrits ?',
        a: 'Il n’y a pas un délai unique. Six ans pour l’infraction pénale, dix ans pour l’action de la commune, et en copropriété cinq ans en principe, trente ans en cas d’appropriation d’une partie commune.',
      },
      {
        q: 'Peut-on régulariser des travaux après coup ?',
        a: 'Oui, si les travaux respectent les règles d’urbanisme en vigueur et, en copropriété, si l’assemblée générale accepte de les ratifier. Ce n’est jamais automatique.',
      },
      {
        q: 'Une mezzanine doit-elle être déclarée ?',
        a: 'Cela dépend de la surface créée et, en copropriété, de sa fixation à la structure de l’immeuble. Renseignez-vous auprès de la mairie et du syndic.',
      },
    ],
    sources: [
      { label: 'Village de la Justice, « Travaux non autorisés sur les parties communes par l’assemblée générale et régularisation »', url: 'https://www.village-justice.com/articles/travaux-non-autorises-sur-les-parties-communes-par-assemblee-generale,54827.html' },
      { label: 'Me Marina Collin, « Projet d’acquisition de bien immobilier : gare aux travaux non déclarés »', url: 'https://consultation.avocat.fr/blog/marina-collin/article-25349-projet-d-acquisition-de-bien-immobilier-gare-aux-travaux-non-declares.html' },
      { label: 'Construires.fr, « Acheter une maison avec travaux non déclarés »', url: 'https://www.construires.fr/regularisation-retroactive-conditions/' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'acheter-une-peniche',
    art: 'peniche',
    title: 'Acheter une péniche : le bateau, l’emplacement et tout le reste',
    description:
      'Péniche-logement : un bien meuble, un emplacement à part, une coque à entretenir. Ce qu’il faut savoir et vérifier avant d’acheter un bateau pour y vivre.',
    category: 'Types de biens',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 6,
    intro:
      'Vivre sur l’eau, au cœur de la ville, avec une terrasse sur le pont. La péniche est sans doute le plus atypique des biens atypiques. Elle obéit aussi à des règles qui n’ont rien à voir avec celles d’un appartement : on achète un bateau, pas un bien immobilier, et l’emplacement ne fait pas partie de la vente.',
    takeaways: [
      'Une péniche est un bien meuble. Le bateau doit être immatriculé, et la vente n’est opposable aux tiers qu’une fois l’immatriculation faite au nom de l’acheteur.',
      'L’emplacement relève d’une autorisation d’occupation du domaine public, souvent appelée COT. Elle est temporaire, payante, et en principe non cessible.',
      'La coque est le point technique central : demandez les rapports d’expertise et la date de la dernière mise en cale sèche.',
      'Le budget ne s’arrête pas au prix : redevance de stationnement, entretien de la coque, assurance.',
    ],
    sections: [
      {
        title: 'Qu’achète-t-on exactement ?',
        paragraphs: [
          'Un bateau. En droit, la péniche est un bien meuble, comme une voiture. L’achat ne suit donc pas le parcours d’une vente immobilière.',
          'Le bateau doit être immatriculé. Le Conseil d’État l’a rappelé en 2021 : tant que l’acheteur n’a pas fait immatriculer le bateau à son nom, la vente n’a pas d’effet à l’égard des tiers, dont le gestionnaire de la voie d’eau. C’est une formalité à faire sans attendre.',
          'Vérifiez que les papiers du bateau sont à jour et au nom du vendeur.',
        ],
      },
      {
        title: 'L’emplacement est-il vendu avec le bateau ?',
        paragraphs: [
          'Non. Le fleuve et ses berges appartiennent au domaine public. Pour y stationner durablement, il faut une autorisation délivrée par le gestionnaire, le plus souvent Voies navigables de France. On parle de convention d’occupation temporaire, ou COT.',
          'Cette convention est accordée pour une durée limitée, généralement cinq ans renouvelables. Elle est attachée à une personne et, en principe, ne se cède pas avec le bateau. En pratique l’emplacement reste souvent associé à la péniche lors d’une vente, mais ce n’est pas un droit : l’acheteur doit obtenir sa propre autorisation.',
          'C’est le point à sécuriser en premier. Avant de vous engager, demandez la convention en cours, sa date d’échéance, et interrogez le gestionnaire sur les conditions de sa reprise.',
        ],
      },
      {
        title: 'Combien coûte l’emplacement ?',
        paragraphs: [
          'L’occupation du domaine public donne lieu à une redevance. La loi prévoit qu’elle tient compte des avantages procurés à l’occupant : elle varie donc selon la taille du bateau et, surtout, selon l’adresse. À Paris, elle peut dépasser 10 000 € par an.',
          'Demandez au vendeur ses derniers avis de redevance. C’est une charge annuelle à intégrer à votre budget, au même titre que des charges de copropriété.',
        ],
      },
      {
        title: 'Comment juger de l’état du bateau ?',
        paragraphs: [
          'Tout se joue sous la ligne de flottaison. La coque doit être sortie de l’eau et contrôlée par un expert à intervalles réguliers. Comptez une mise en cale sèche tous les dix ans environ, pour un coût moyen de l’ordre de 10 000 € hors réparations, et un carénage plus fréquent.',
        ],
        list: [
          'Demandez le dernier rapport d’expertise de la coque et sa date.',
          'Demandez les factures des travaux réalisés à la suite de ce rapport.',
          'Si le contrôle est ancien, faites-en une condition de la vente.',
          'Regardez aussi l’isolation, le chauffage, les raccordements à l’eau et à l’électricité, et l’évacuation des eaux usées.',
        ],
      },
      {
        title: 'Quel budget prévoir au quotidien ?',
        list: [
          'La redevance de stationnement.',
          'L’entretien de la coque, à provisionner chaque année.',
          'L’assurance, en général plus chère que celle d’un logement classique.',
          'Les taxes : la taxe foncière peut être due pour un bateau-logement qui ne navigue pas.',
          'Si le bateau navigue : le carburant, et un permis adapté au-delà de 20 mètres.',
        ],
      },
      {
        title: 'Comment financer une péniche ?',
        paragraphs: [
          'La péniche n’étant pas un bien immobilier, toutes les banques ne la financent pas comme un appartement. Interrogez votre banque ou votre courtier dès le début du projet, avant de faire une offre.',
        ],
      },
    ],
    checklist: {
      title: 'Les documents à demander avant de faire une offre',
      items: [
        'Les papiers du bateau : immatriculation et titre de navigation en cours de validité.',
        'La convention d’occupation temporaire en cours et sa date d’échéance.',
        'Les derniers avis de redevance.',
        'Le dernier rapport d’expertise de la coque et les factures de travaux.',
        'L’attestation d’assurance du bateau.',
        'Les derniers avis de taxes.',
      ],
    },
    faq: [
      {
        q: 'Une péniche est-elle un bien immobilier ?',
        a: 'Non. C’est un bien meuble, qui doit être immatriculé. La vente ne suit pas les règles d’une vente immobilière.',
      },
      {
        q: 'L’emplacement est-il compris dans le prix d’une péniche ?',
        a: 'Non. L’emplacement dépend d’une autorisation d’occupation du domaine public, temporaire et en principe non cessible. L’acheteur doit obtenir la sienne.',
      },
      {
        q: 'Faut-il un permis pour vivre sur une péniche ?',
        a: 'Pas pour y vivre à quai. Un permis est nécessaire pour naviguer, avec une extension spécifique au-delà de 20 mètres.',
      },
      {
        q: 'Quel est le principal risque à l’achat ?',
        a: 'Deux points concentrent les mauvaises surprises : un emplacement que l’on ne peut pas conserver, et une coque dont l’état n’a pas été contrôlé.',
      },
    ],
    sources: [
      { label: 'SeLoger, « Vivre sur une péniche : long fleuve tranquille ou grosse galère ? »', url: 'https://edito.seloger.com/conseils-d-experts/acheter/vivre-une-peniche-plan-grosse-galere-article-17604.html' },
      { label: 'Me Catherine Taurand, « Vente de bateau : attention aux formalités » (Conseil d’État, 13 septembre 2021)', url: 'https://consultation.avocat.fr/blog/catherine-taurand/article-50081-vente-de-bateau-attention-aux-formalites.html' },
      { label: 'Assemblée nationale, réponse ministérielle n° 3237 du 8 avril 2025 sur les redevances d’occupation du domaine public fluvial', url: 'https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE3237.pdf' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'mezzanine-combles-surface-carrez',
    art: 'mezzanine',
    title: 'Mezzanine, sous-pente, combles : quelle surface achetez-vous vraiment ?',
    description:
      'Surface Carrez, surface habitable, surface au sol : ce qui compte et ce qui ne compte pas dans un bien sous les toits ou à mezzanine, et vos recours en cas d’erreur.',
    category: 'Surfaces et travaux',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 6,
    intro:
      'Dans un atelier d’artiste ou sous les toits, la surface annoncée ne dit pas tout. Une mezzanine, une sous-pente, un comble aménagé : selon la hauteur sous plafond, ces mètres carrés comptent ou ne comptent pas. Et c’est sur ce chiffre que se calcule le prix au mètre carré.',
    takeaways: [
      'En copropriété, la surface garantie par le vendeur est la surface Carrez : les planchers des locaux clos et couverts, là où la hauteur sous plafond atteint 1,80 m.',
      'Une mezzanine compte si elle est fixe, intégrée au bâti et haute d’au moins 1,80 m. Une structure légère ou démontable ne compte pas.',
      'Si la surface réelle est inférieure de plus de 5 % à celle de l’acte, l’acheteur peut demander une baisse de prix proportionnelle, dans un délai d’un an.',
      'Demandez toujours deux chiffres : la surface Carrez et la surface au sol. L’écart mesure ce que vous utilisez sans l’avoir dans l’acte.',
    ],
    sections: [
      {
        title: 'Que mesure la surface Carrez ?',
        paragraphs: [
          'La loi Carrez impose au vendeur d’un lot de copropriété d’indiquer sa superficie privative. Elle correspond aux planchers des locaux clos et couverts, après déduction des murs, cloisons, marches, cages d’escalier, gaines et embrasures de portes et de fenêtres.',
          'Deux exclusions pèsent lourd dans un bien atypique. Les parties où la hauteur sous plafond est inférieure à 1,80 m ne sont pas comptées. Les caves, garages, parkings, terrasses et balcons non plus.',
          'La loi Carrez ne s’applique pas aux maisons individuelles hors copropriété.',
        ],
      },
      {
        title: 'Une mezzanine compte-t-elle ?',
        paragraphs: [
          'Oui, à deux conditions. Elle doit offrir au moins 1,80 m sous plafond. Et elle doit faire corps avec le bâti : la Cour de cassation a jugé en 2014 qu’une mezzanine entre dans la surface dès lors qu’elle n’est ni légère ni démontable.',
          'Les juges mesurent le bien tel qu’il existe au jour de la vente. La même décision précise qu’une mezzanine compte même si elle a été construite sans autorisation. Ce qui ne règle pas la question de sa régularité vis-à-vis de la copropriété ou de la mairie.',
          'À l’inverse, la plateforme où l’on dort sous 1,50 m de plafond, fréquente dans les ateliers, n’ajoute aucun mètre carré à l’acte.',
        ],
      },
      {
        title: 'Et sous les toits ?',
        paragraphs: [
          'Dans un comble ou sous une pente, seule la partie où l’on tient debout sous 1,80 m est comptée. Le reste existe, se meuble, se range, mais ne figure pas dans la surface Carrez.',
          'C’est pourquoi les annonces de biens sous les toits indiquent souvent une surface au sol, plus grande que la surface Carrez. Les deux chiffres sont utiles. Seul le second engage le vendeur.',
        ],
      },
      {
        title: 'Surface Carrez ou surface habitable : quelle différence ?',
        paragraphs: [
          'La surface habitable, dite loi Boutin, sert pour les locations. Son calcul n’est pas le même : elle exclut notamment les combles non aménagés, les sous-sols, les vérandas et les remises, que la surface Carrez peut retenir.',
          'Pour un achat en copropriété, c’est la surface Carrez qui figure dans la promesse et dans l’acte. Si vous achetez pour louer, demandez aussi la surface habitable.',
        ],
      },
      {
        title: 'Que faire si la surface est fausse ?',
        paragraphs: [
          'Si la surface réelle est inférieure de plus de 5 % à celle indiquée dans l’acte, l’acheteur peut demander une diminution du prix proportionnelle aux mètres carrés manquants. L’action doit être engagée dans l’année qui suit la signature de l’acte de vente.',
          'Si la promesse ne mentionne aucune surface, l’acheteur peut en demander la nullité, au plus tard un mois après l’acte authentique.',
          'Le vendeur peut mesurer lui-même. Dans un bien aux volumes complexes, un mesurage par un diagnostiqueur, qui engage sa responsabilité, est une sécurité pour tout le monde.',
        ],
      },
      {
        title: 'Comment comparer le prix au mètre carré ?',
        paragraphs: [
          'Divisez le prix par la surface Carrez, pas par la surface au sol. Vous obtenez un chiffre comparable à celui des autres biens du quartier.',
          'Puis regardez ce que vous avez en plus : une mezzanine basse, une sous-pente, un volume sous verrière. Ces mètres-là ne se comptent pas, mais ils se vivent. C’est souvent toute la valeur d’un bien atypique, et ce qui justifie un prix au mètre carré plus élevé.',
        ],
      },
    ],
    checklist: {
      title: 'Les documents à demander avant de faire une offre',
      items: [
        'Le certificat de mesurage Carrez, avec le détail pièce par pièce.',
        'La surface au sol, pour mesurer l’écart avec la surface Carrez.',
        'Les plans, avec les hauteurs sous plafond.',
        'Pour une mezzanine : la date des travaux et l’accord de la copropriété si elle est fixée à la structure.',
      ],
    },
    faq: [
      {
        q: 'Une mezzanine est-elle comptée dans la loi Carrez ?',
        a: 'Oui si elle est fixe, intégrée au bâti et que la hauteur sous plafond y atteint 1,80 m. Une mezzanine légère ou démontable n’est pas comptée.',
      },
      {
        q: 'Quelle hauteur sous plafond faut-il pour qu’une surface compte ?',
        a: 'Au moins 1,80 m. En dessous, la surface n’entre pas dans la superficie Carrez.',
      },
      {
        q: 'Que faire si la surface Carrez de mon acte est fausse ?',
        a: 'Si l’écart dépasse 5 % en votre défaveur, vous pouvez demander une baisse de prix proportionnelle, dans l’année qui suit la signature de l’acte de vente.',
      },
      {
        q: 'La loi Carrez s’applique-t-elle aux maisons ?',
        a: 'Seulement aux maisons situées dans une copropriété. Une maison individuelle n’est pas concernée.',
      },
    ],
    sources: [
      { label: 'FNAIM, « Loi Carrez : explications et mode de calcul de superficie »', url: 'https://www.fnaim.fr/4116-loi-carrez-explications-et-mode-de-calcul.htm' },
      { label: 'MoneyVox, « Créer une mezzanine peut augmenter la surface Carrez » (Cour de cassation, 6 mai 2014)', url: 'https://www.moneyvox.fr/actu/45170/immobilier-creer-une-mezzanine-peut-augmenter-la-surface-carrez' },
      { label: 'ANIL, « Vente / Cave aménagée » (Cour de cassation, 5 décembre 2007)', url: 'https://www.anil.org/documentation-experte/analyses-juridiques-jurisprudence/jurisprudence/jurisprudence-2008/vente-/-cave-amenagee/' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'marche-immobilier-novembre-2026',
    art: 'marche',
    title: 'Marché immobilier : ce que dit le baromètre de novembre 2026, et ce que cela change pour vous',
    description:
      'Première baisse des prix de l’année, taux de crédit en hausse, délais de vente qui s’allongent : la synthèse du baromètre Meilleurs Agents de novembre 2026, et ce qu’un acheteur de bien atypique peut en retenir.',
    category: 'Marché',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Chaque mois, Meilleurs Agents publie un baromètre des prix immobiliers. Celui de novembre 2026, qui porte sur le mois d’octobre, marque un tournant discret : pour la première fois de l’année, les prix reculent au niveau national. Dans le même temps, les taux de crédit remontent. Voici ce qu’il faut en retenir, puis notre lecture pour qui cherche un bien atypique.',
    takeaways: [
      'Les prix ont baissé de 0,1 % en octobre en France : c’est la première baisse de l’année. Sur un an, ils restent stables.',
      'Huit des onze plus grandes villes sont en baisse sur le mois. Toulouse, Lyon et Lille font exception.',
      'Les taux des nouveaux crédits se situent autour de 3,7 à 3,8 % fin octobre, et jusqu’à 4 % dans certaines banques.',
      'Les biens se vendent moins vite : 79 jours à Paris, dix de plus qu’il y a trois mois. Le rapport de force se déplace vers les acheteurs.',
    ],
    sections: [
      {
        title: 'Les prix baissent-ils ?',
        paragraphs: [
          'Très légèrement. L’indice national recule de 0,1 % sur le mois d’octobre. Le mouvement est le même à Paris, dans les dix plus grandes villes et dans les cinquante plus grandes : moins 0,1 % partout.',
          'Les zones rurales résistent, avec une hausse de 0,1 % sur le mois et de 3,7 % sur un an. Mais leur élan ralentit.',
          'Sur douze mois, les prix sont stables au niveau national. On ne parle donc pas d’une chute, mais d’un marché qui cesse de monter.',
        ],
      },
      {
        title: 'Quelles villes montent, quelles villes baissent ?',
        paragraphs: [
          'Sur le mois d’octobre, trois grandes villes progressent encore et huit reculent.',
        ],
        list: [
          'En hausse : Toulouse (+0,6 %), Lyon (+0,2 %), Lille (+0,2 %).',
          'En léger recul : Paris, Bordeaux et Strasbourg (−0,1 %), Marseille et Nantes (−0,2 %).',
          'En baisse plus nette : Montpellier (−0,3 %), Nice (−0,5 %), Rennes (−0,8 %).',
        ],
      },
      {
        title: 'Où en sont les taux de crédit ?',
        paragraphs: [
          'Ils remontent. Le taux auquel l’État français emprunte à dix ans a dépassé 5 % en octobre, un niveau qu’il n’avait pas atteint depuis juillet 2002. Or c’est sur ce taux que les banques calent le coût de leurs crédits.',
          'Fin octobre, les nouveaux crédits immobiliers se négocient autour de 3,7 à 3,8 %, certaines banques allant jusqu’à 4 %. Les banques françaises amortissent une partie de la hausse : les taux sont plus élevés en Belgique (4,3 %) et en Allemagne (4,4 %).',
          'Conséquence directe : à mensualité égale, on emprunte moins.',
        ],
      },
      {
        title: 'Les biens se vendent-ils moins vite ?',
        paragraphs: [
          'Oui. À Paris, il faut désormais 79 jours pour vendre, soit dix de plus qu’il y a trois mois. À Toulouse, 86 jours, soit dix-huit de plus, alors même que les prix y montent encore.',
          'Le baromètre en tire une conclusion nette : les acheteurs retrouvent de la marge pour négocier, surtout dans les villes où les prix reculent, et les vendeurs doivent ajuster leur prix s’ils ne veulent pas attendre.',
        ],
      },
      {
        title: 'Pourquoi ce retournement ?',
        list: [
          'Les taux : la hausse du coût de la dette française se répercute sur le crédit immobilier.',
          'La confiance : le climat économique, social et politique pousse certains acheteurs à reporter leur projet.',
          'Les finances publiques : l’effort budgétaire annoncé pour réduire le déficit inquiète les investisseurs, ce qui tire les taux vers le haut.',
        ],
      },
      {
        title: 'Et pour la suite ?',
        paragraphs: [
          'Le baromètre parle d’une phase d’ajustement qui pourrait durer plusieurs mois, sans trancher la question d’un nouveau cycle de baisse. Si les taux continuent de monter, la capacité d’achat se réduira encore et certains projets deviendront plus difficiles à financer.',
        ],
      },
      {
        title: 'Notre lecture pour un bien atypique',
        paragraphs: [
          'Le baromètre ne mesure pas les biens atypiques à part. Ce qui suit est notre lecture, pas une statistique.',
          'Un loft, un atelier ou un dernier étage avec terrasse se compare mal aux autres biens : il y en a peu, et chacun est différent. Son prix dépend moins de la moyenne du quartier que du nombre d’acheteurs qui le cherchent à ce moment-là. Dans un marché plus lent, vous avez donc plus de temps pour visiter, revenir et vérifier.',
          'C’est aussi le moment où les questions précises pèsent dans la discussion. Une surface qui n’est pas entièrement comptée, des travaux sans autorisation ou une étanchéité à refaire sont des arguments plus solides qu’une baisse de 0,1 % de l’indice.',
          'Enfin, refaites vos comptes avec les taux du jour avant de faire une offre : quelques dixièmes de point changent une mensualité.',
        ],
      },
    ],
    faq: [
      {
        q: 'Les prix de l’immobilier baissent-ils en novembre 2026 ?',
        a: 'Ils ont reculé de 0,1 % en octobre au niveau national selon Meilleurs Agents, première baisse de l’année. Sur un an, ils sont stables.',
      },
      {
        q: 'Quel est le taux d’un crédit immobilier fin octobre 2026 ?',
        a: 'Autour de 3,7 à 3,8 % pour les nouveaux crédits, et jusqu’à 4 % dans certaines banques, selon le même baromètre.',
      },
      {
        q: 'Combien de temps faut-il pour vendre un bien à Paris ?',
        a: '79 jours en moyenne, soit dix de plus qu’il y a trois mois.',
      },
      {
        q: 'Est-ce le bon moment pour négocier ?',
        a: 'Le rapport de force se déplace vers les acheteurs, surtout là où les prix reculent. La meilleure négociation reste celle qui s’appuie sur des faits propres au bien.',
      },
    ],
    sources: [
      { label: 'Meilleurs Agents, baromètre du 2 novembre 2026, « Entre baisse des prix et hausse des taux, un marché immobilier sous pression »', url: 'https://edito.meilleursagents.com/actualites/barometre-meilleurs-agents/entre-baisse-prix-hausse-taux-un-marche-immobilier-pression' },
    ],
    listingsLink: { label: 'Estimer ma mensualité', href: '/financement' },
  },
  {
    slug: 'terrasse-jardin-jouissance-privative',
    art: 'terrasse',
    title: 'Terrasse, toit-terrasse, jardin : en êtes-vous vraiment propriétaire ?',
    description:
      'Dans une copropriété, une terrasse ou un jardin « privatif » est souvent une partie commune dont vous avez seulement l’usage. Ce que cela change pour l’entretien, les travaux et le prix.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'L’annonce dit « terrasse privative de 30 m² ». Sur le papier, c’est parfois autre chose : une partie commune de l’immeuble, dont le lot a seulement la jouissance exclusive. Vous y êtes chez vous au quotidien, mais vous n’en êtes pas propriétaire. La différence ne se voit pas à la visite. Elle se lit dans le règlement de copropriété, et elle compte le jour où il faut refaire l’étanchéité ou poser une pergola.',
    takeaways: [
      'Une terrasse ou un jardin peut être une partie privative du lot, ou une partie commune à jouissance privative. Seul le règlement de copropriété le dit.',
      'Le droit de jouissance n’est pas un droit de propriété. Il est attaché au lot et se transmet avec lui à la vente.',
      'En règle générale, l’entretien courant revient à celui qui profite de la terrasse, et le gros œuvre (étanchéité, structure) à la copropriété. Le règlement peut prévoir autre chose.',
      'Pergola, véranda, jacuzzi, bac lourd : tout aménagement durable demande l’accord de l’assemblée générale.',
    ],
    sections: [
      {
        title: 'Partie privative ou simple droit de jouissance : quelle différence ?',
        paragraphs: [
          'Dans une copropriété, chaque lot comprend des parties privatives, qui vous appartiennent, et une quote-part des parties communes. Une terrasse, un toit-terrasse ou un jardin peut entrer dans l’une ou l’autre catégorie.',
          'Très souvent, le toit de l’immeuble ou le jardin du rez-de-chaussée reste une partie commune, et le règlement en réserve l’usage à un seul lot. La loi du 10 juillet 1965 sur la copropriété le prévoit depuis 2019 dans son article 6-3 : on parle de partie commune à jouissance privative. Le droit de jouissance est l’accessoire du lot. Il ne peut pas être vendu séparément, et il suit le bien à chaque vente.',
          'Concrètement, vous êtes le seul à pouvoir utiliser l’espace. Mais le sol, la dalle et l’étanchéité restent à la copropriété.',
        ],
      },
      {
        title: 'Qui paie l’entretien, qui paie l’étanchéité ?',
        paragraphs: [
          'Le partage habituel est simple. À vous l’entretien courant : nettoyage, plantations, revêtement de surface. À la copropriété ce qui touche à la structure : étanchéité, dalle, garde-corps.',
          'Ce partage n’est qu’une règle par défaut. Le règlement de copropriété peut mettre davantage à la charge du bénéficiaire, parfois jusqu’à la réfection de l’étanchéité. Lisez la clause avant de vous engager : refaire l’étanchéité d’un toit-terrasse coûte cher.',
          'Un point reste acquis quelle que soit la clause. La Cour de cassation l’a rappelé le 17 septembre 2026 : la copropriété répond des dégâts causés aux tiers par un défaut d’entretien d’une partie commune, même si le règlement confie cet entretien à un copropriétaire. Elle peut ensuite se retourner contre lui.',
        ],
      },
      {
        title: 'Que pouvez-vous y installer ?',
        paragraphs: [
          'Du mobilier, des pots, un parasol : sans difficulté. Dès que l’aménagement est durable ou touche à l’immeuble, il faut un vote de l’assemblée générale. C’est le cas d’une pergola, d’une véranda, d’un abri, d’un spa, ou de bacs dont le poids pèse sur la dalle.',
          'Si le vendeur a fait des aménagements, demandez le procès-verbal qui les autorise. Un aménagement posé sans accord peut être contesté, et vous en hériteriez avec le bien.',
        ],
      },
      {
        title: 'La terrasse compte-t-elle dans la surface ?',
        paragraphs: [
          'Non. La surface Carrez ne retient que des locaux clos et couverts. Une terrasse, un balcon ou un jardin n’y entre jamais, qu’il soit privatif ou en simple jouissance. L’annonce doit donc donner deux chiffres distincts : la surface du logement, et celle de l’extérieur.',
          'L’extérieur a bien une valeur, souvent décisive dans le prix. Mais cette valeur se discute : elle n’est pas garantie au mètre carré comme l’est la surface Carrez.',
        ],
      },
      {
        title: 'Et pour un jardin en rez-de-chaussée ?',
        paragraphs: [
          'Les règles sont les mêmes. Le jardin est le plus souvent une partie commune dont le lot a l’usage. Tonte, taille et plantations sont à votre charge. Abattre un arbre, poser une clôture ou construire un abri relève de l’assemblée générale.',
        ],
      },
    ],
    checklist: {
      title: 'À vérifier avant de faire une offre',
      items: [
        'Dans le règlement de copropriété : la terrasse est-elle une partie privative ou une partie commune à jouissance privative ?',
        'La clause qui répartit l’entretien et les réparations, étanchéité comprise.',
        'La date de la dernière réfection de l’étanchéité, et les travaux votés ou envisagés.',
        'Le procès-verbal d’assemblée générale pour chaque aménagement existant.',
        'Les surfaces annoncées : celle du logement d’un côté, celle de l’extérieur de l’autre.',
      ],
    },
    faq: [
      {
        q: 'Une terrasse à jouissance privative m’appartient-elle ?',
        a: 'Non. Elle reste une partie commune de l’immeuble. Vous en avez l’usage exclusif, attaché à votre lot, mais pas la propriété.',
      },
      {
        q: 'Qui paie la réfection de l’étanchéité d’un toit-terrasse ?',
        a: 'En règle générale la copropriété, puisque l’étanchéité protège l’immeuble. Le règlement peut toutefois la mettre à la charge du bénéficiaire : il faut lire la clause.',
      },
      {
        q: 'Puis-je installer une pergola sur ma terrasse ?',
        a: 'Pas sans l’accord de l’assemblée générale, dès lors que l’installation est durable ou visible de l’extérieur.',
      },
      {
        q: 'La terrasse est-elle comptée dans la surface Carrez ?',
        a: 'Non. La surface Carrez ne compte que les locaux clos et couverts.',
      },
    ],
    sources: [
      { label: 'Construires.fr, « Partie commune à jouissance privative : qui paie les travaux ? »', url: 'https://www.construires.fr/une-partie-commune-a-jouissance-privative-terrasse-cour-genere-une-repartition-specifique-gros-entretien-a-charge-du-syn/' },
      { label: 'MySweetImmo, « Copropriété : qui répond des dégâts d’une terrasse commune ? » (Cour de cassation, 17 septembre 2026)', url: 'https://www.mysweetimmo.com/2026/10/14/copropriete-qui-repond-des-degats-dune-terrasse-commune/' },
      { label: 'FNAIM, « Loi Carrez : explications et mode de calcul de superficie »', url: 'https://www.fnaim.fr/4116-loi-carrez-explications-et-mode-de-calcul.htm' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'dpe-loft-atelier-dernier-etage',
    art: 'dpe',
    title: 'DPE d’un loft, d’un atelier, d’un dernier étage : comment lire l’étiquette',
    description:
      'Validité, classes, calendrier des interdictions de louer, audit énergétique : ce que le DPE dit d’un bien atypique, ce qu’il ne dit pas, et ce qu’il change pour l’acheteur.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Grands volumes, verrière, toiture juste au-dessus de la tête : ce qui fait le charme d’un bien atypique est aussi ce qui pèse sur sa facture d’énergie. Le diagnostic de performance énergétique, ou DPE, résume tout cela en une lettre. Elle mérite mieux qu’un coup d’œil : elle engage votre confort, votre budget, et la possibilité de louer le bien un jour.',
    takeaways: [
      'Un DPE réalisé depuis le 1er juillet 2021 est valable dix ans. Ceux réalisés entre 2018 et juin 2021 ne sont plus valables depuis le 1er janvier 2025.',
      'Le DPE se calcule d’après les caractéristiques du logement, pas d’après les factures de l’occupant.',
      'Les logements classés G ne peuvent plus être mis en location depuis le 1er janvier 2025. Suivront les F en 2028 et les E en 2034.',
      'Depuis le 1er janvier 2026, le calcul est plus favorable aux logements chauffés à l’électricité : un DPE antérieur peut mériter d’être mis à jour.',
    ],
    sections: [
      {
        title: 'Que contient un DPE ?',
        paragraphs: [
          'Deux étiquettes, de A à G : l’une pour la consommation d’énergie, l’autre pour les émissions de gaz à effet de serre. Le logement est classé selon la moins bonne des deux.',
        ],
        list: [
          'La consommation annuelle estimée et la dépense correspondante, donnée sous forme de fourchette.',
          'La description de l’isolation, du chauffage, de l’eau chaude et de la ventilation.',
          'Une appréciation du confort en été, à regarder de près sous une verrière ou sous les toits.',
          'Des recommandations de travaux, avec un coût estimé. Elles sont indicatives.',
        ],
      },
      {
        title: 'Le DPE est-il encore valable ?',
        paragraphs: [
          'Regardez sa date. Un DPE établi depuis le 1er juillet 2021 vaut dix ans. Un DPE établi entre le 1er janvier 2018 et le 30 juin 2021 n’est plus valable depuis le 1er janvier 2025 : le vendeur doit le refaire.',
          'Le DPE vous est remis au plus tard à la signature de la promesse de vente. Demandez-le dès la visite : la lettre figure sur l’annonce, mais c’est le rapport complet qui vous renseigne.',
        ],
      },
      {
        title: 'Pourquoi un bien atypique est-il souvent moins bien classé ?',
        paragraphs: [
          'Le DPE ne regarde pas vos habitudes. Il calcule ce que consommerait le logement pour un usage standard, à partir de ses murs, de ses vitrages, de sa toiture et de ses équipements.',
          'Un ancien atelier ou un loft cumule souvent ce que ce calcul pénalise : de grandes surfaces vitrées, de la hauteur à chauffer, une toiture ou un sol en contact direct avec l’extérieur. Un dernier étage perd par le toit, un rez-de-chaussée par le sol.',
          'Une lettre moyenne n’est donc pas forcément le signe d’un bien mal entretenu. Elle indique où se trouvent les travaux utiles : le rapport le détaille poste par poste.',
        ],
      },
      {
        title: 'Qu’est-ce que la lettre change pour l’acheteur ?',
        paragraphs: [
          'Si vous comptez habiter le bien, elle pèse sur votre budget et sur le prix à négocier. Si vous comptez le louer, même plus tard, elle peut l’interdire.',
        ],
        list: [
          'Logements classés G : mise en location interdite depuis le 1er janvier 2025.',
          'Logements classés F : à partir du 1er janvier 2028.',
          'Logements classés E : à partir du 1er janvier 2034.',
          'Pour un bien classé F ou G, l’annonce et l’acte de vente doivent mentionner l’obligation de rénovation.',
        ],
      },
      {
        title: 'Dans quels cas un audit énergétique est-il obligatoire ?',
        paragraphs: [
          'Pour la vente d’une maison individuelle ou d’un immeuble appartenant à un seul propriétaire. L’audit est obligatoire pour les classes F et G depuis le 1er avril 2023, et pour la classe E depuis le 1er janvier 2025. Il va plus loin que le DPE : il chiffre un parcours de travaux.',
          'Un appartement en copropriété n’est pas concerné par cet audit.',
        ],
      },
      {
        title: 'Qu’est-ce qui a changé récemment ?',
        list: [
          'Depuis le 1er juillet 2024, les seuils sont adaptés pour les logements de 40 m² ou moins, jusque-là pénalisés.',
          'Depuis le 1er janvier 2026, le coefficient appliqué à l’électricité est passé de 2,3 à 1,9. Un logement chauffé à l’électricité peut gagner une classe sans travaux.',
          'De nouveaux changements sont annoncés pour le 1er janvier 2027.',
        ],
      },
    ],
    checklist: {
      title: 'À demander et à regarder',
      items: [
        'Le rapport de DPE complet, et sa date.',
        'La fourchette de dépense annuelle d’énergie, à comparer aux factures réelles du vendeur.',
        'L’appréciation du confort d’été, surtout sous verrière ou sous les toits.',
        'Les travaux recommandés et leur coût estimé.',
        'L’audit énergétique, si le bien est une maison ou un immeuble entier classé E, F ou G.',
        'En copropriété : les travaux d’isolation votés ou à l’étude dans l’immeuble.',
      ],
    },
    faq: [
      {
        q: 'Combien de temps un DPE est-il valable ?',
        a: 'Dix ans s’il a été réalisé depuis le 1er juillet 2021. Les DPE réalisés entre 2018 et juin 2021 ne sont plus valables depuis le 1er janvier 2025.',
      },
      {
        q: 'Peut-on acheter un logement classé G ?',
        a: 'Oui. La vente reste possible. C’est la mise en location qui est interdite depuis le 1er janvier 2025, tant que des travaux n’ont pas amélioré le classement.',
      },
      {
        q: 'Le DPE dépend-il des factures du vendeur ?',
        a: 'Non. Il est calculé à partir des caractéristiques du logement, pour un usage standard. Les factures du vendeur sont un complément utile à demander.',
      },
      {
        q: 'Faut-il refaire un DPE datant de 2025 ?',
        a: 'Il reste valable. Mais si le logement est chauffé à l’électricité, le calcul en vigueur depuis le 1er janvier 2026 peut lui être plus favorable.',
      },
    ],
    sources: [
      { label: 'Service-Public.fr, « Diagnostic de performance énergétique (DPE) »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F16096' },
      { label: 'Notaires de France, « Quelles sont les conséquences du DPE sur les ventes et locations immobilières ? »', url: 'https://notaires.fr/fr/article/quelles-sont-les-consequences-du-dpe-sur-les-ventes-et-locations-immobilieres' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'financer-un-bien-atypique',
    art: 'credit',
    title: 'Financer un bien atypique : ce que la banque regarde',
    description:
      'Taux d’endettement, durée, travaux, assurance : les règles du crédit immobilier en 2026 et les points que la banque examine de plus près quand le bien sort de l’ordinaire.',
    category: 'Financement',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Une banque finance un emprunteur, mais elle prend le bien en garantie. Devant un loft issu d’un ancien local, un souplex ou une péniche, elle se pose une question de plus : que vaudrait ce bien s’il fallait le revendre ? Mieux vaut le savoir avant de faire une offre, et préparer les réponses.',
    takeaways: [
      'Les règles sont les mêmes pour tous : mensualités limitées à 35 % des revenus, assurance comprise, sur 25 ans au plus.',
      'La durée peut aller jusqu’à 27 ans quand les travaux représentent au moins un quart du coût de l’opération.',
      'Pour un bien atypique, la banque regarde de près ce qui pèse sur la revente : la destination du bien, la surface réellement comptée, les travaux à prévoir.',
      'Un dossier complet dès le premier rendez-vous fait gagner des semaines. Dans un marché de biens rares, cela compte.',
    ],
    sections: [
      {
        title: 'Quelles sont les règles du crédit immobilier ?',
        paragraphs: [
          'Elles sont fixées par le Haut Conseil de stabilité financière et s’imposent aux banques.',
        ],
        list: [
          'Les mensualités de tous vos crédits, assurance comprise, ne doivent pas dépasser 35 % de vos revenus.',
          'La durée du prêt est limitée à 25 ans.',
          'Elle peut atteindre 27 ans pour un achat dans l’ancien avec des travaux représentant au moins 25 % du coût total de l’opération, ou pour un achat sur plan.',
          'Les banques disposent d’une marge : jusqu’à 20 % des prêts qu’elles accordent peuvent s’écarter de ces règles, en priorité pour l’achat d’une résidence principale.',
        ],
      },
      {
        title: 'Pourquoi un bien atypique est-il regardé de plus près ?',
        paragraphs: [
          'Parce que la banque raisonne aussi en valeur de revente. Un bien singulier séduit moins d’acheteurs qu’un appartement classique, mais ceux qu’il séduit le cherchent précisément. Ce qui inquiète une banque, ce n’est pas l’originalité : c’est l’incertitude.',
        ],
        list: [
          'La destination : un ancien local commercial est-il devenu officiellement un logement ?',
          'La surface : quelle part est réellement comptée, quelle part est en sous-sol, sous pente ou en mezzanine ?',
          'Les travaux : ont-ils été autorisés, et que reste-t-il à faire ?',
          'La nature du bien : une péniche n’est pas un bien immobilier, et toutes les banques ne la financent pas comme un logement.',
        ],
      },
      {
        title: 'Comment financer les travaux ?',
        paragraphs: [
          'Ils peuvent être intégrés au prêt. La banque demande alors des devis. C’est souvent la meilleure solution : un seul prêt, un seul taux, une seule mensualité.',
          'Si les travaux pèsent au moins un quart de l’opération, la durée peut être portée à 27 ans, ce qui allège la mensualité pendant le chantier.',
          'Pensez aussi aux travaux qui ne dépendent pas de vous : ceux que la copropriété a votés ou s’apprête à voter.',
        ],
      },
      {
        title: 'Combien coûte l’assurance du prêt ?',
        paragraphs: [
          'Elle dépend surtout de votre âge et de votre santé. À titre indicatif, les moyennes relevées en 2026 par un courtier vont d’environ 0,10 % du capital emprunté par an à 25 ans à 0,47 % à 55 ans, pour un non-fumeur.',
          'Vous n’êtes pas tenu de prendre l’assurance de la banque : vous pouvez en choisir une autre, à garanties équivalentes.',
        ],
      },
      {
        title: 'Comment préparer son dossier ?',
        paragraphs: [
          'Présentez le bien comme vous présentez vos revenus : avec des pièces. Plus le bien est singulier, plus les documents rassurent.',
          'Rencontrez votre banque ou un courtier avant de visiter. Vous connaîtrez votre budget réel, et vous pourrez vous décider vite le jour où le bon bien se présente.',
        ],
      },
    ],
    checklist: {
      title: 'Les pièces qui rassurent une banque',
      items: [
        'Le mesurage Carrez, avec le détail des surfaces non comptées.',
        'Pour un ancien local : la preuve du changement de destination.',
        'Les autorisations des travaux réalisés : urbanisme et assemblée générale.',
        'Les trois derniers procès-verbaux d’assemblée générale et le montant des charges.',
        'Le DPE, et des devis pour les travaux que vous prévoyez.',
        'Une estimation de votre mensualité, assurance comprise.',
      ],
    },
    faq: [
      {
        q: 'Quel est le taux d’endettement maximal ?',
        a: '35 % des revenus, assurance comprise. Les banques peuvent y déroger pour une part limitée de leurs prêts.',
      },
      {
        q: 'Peut-on emprunter sur plus de 25 ans ?',
        a: 'Oui, jusqu’à 27 ans, notamment pour un achat dans l’ancien avec des travaux représentant au moins 25 % du coût total de l’opération.',
      },
      {
        q: 'Une banque peut-elle refuser de financer un bien atypique ?',
        a: 'Oui, si elle juge la garantie insuffisante ou la situation du bien incertaine. Un dossier documenté lève la plupart des réticences, et une autre banque peut apprécier le bien différemment.',
      },
      {
        q: 'Les travaux peuvent-ils être inclus dans le prêt ?',
        a: 'Oui, sur présentation de devis.',
      },
    ],
    sources: [
      { label: 'Pretto, « Haut Conseil de stabilité financière (HCSF) : définition et normes en 2026 »', url: 'https://www.pretto.fr/pret-immobilier/hcsf/assouplissements-credit-immobilier-hcsf' },
      { label: 'Meilleurtaux, « Comparez les taux d’assurance de prêt immobilier »', url: 'https://www.meilleurtaux.com/assurance-de-pret/taux.html' },
    ],
    listingsLink: { label: 'Estimer ma mensualité', href: '/financement' },
  },
  {
    slug: 'duplex-reunion-de-lots',
    art: 'duplex',
    title: 'Duplex né de deux appartements réunis : ce qu’il faut vérifier',
    description:
      'Escalier percé dans le plancher, palier annexé, deux lots devenus un seul logement : les autorisations à demander au vendeur et les risques quand elles manquent.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Deux appartements superposés reliés par un escalier, un studio réuni à son voisin, un bout de palier devenu entrée : beaucoup de duplex et de grands plateaux sont nés ainsi. Le résultat est souvent superbe. Il repose sur des travaux qui touchent à l’immeuble, et donc sur des autorisations. Avant d’acheter, il faut s’assurer qu’elles existent.',
    takeaways: [
      'Percer un plancher pour créer un escalier touche une partie commune : il faut l’accord de l’assemblée générale.',
      'Annexer un morceau de palier ou de couloir suppose de l’acheter à la copropriété, par un vote puis un acte notarié.',
      'Des travaux faits sans accord peuvent être contestés pendant cinq ans à compter du jour où ils ont été connus.',
      'Vous achetez peut-être deux lots : vérifiez que l’acte, la surface et les charges correspondent au logement que vous visitez.',
    ],
    sections: [
      {
        title: 'Pourquoi un duplex réuni demande-t-il des autorisations ?',
        paragraphs: [
          'Dans une copropriété, vous êtes libre chez vous. Mais les planchers, les murs porteurs et les paliers ne sont pas chez vous : ce sont des parties communes. Relier deux étages suppose d’ouvrir le plancher. Cette ouverture s’appelle une trémie.',
          'Le copropriétaire doit donc demander l’accord de l’assemblée générale avant les travaux. Le vote se fait à la majorité des voix de tous les copropriétaires. La demande est accompagnée d’un dossier technique, et l’assemblée peut exiger le suivi du chantier par un architecte ou un ingénieur.',
        ],
      },
      {
        title: 'Et si le vendeur a annexé un palier ou un couloir ?',
        paragraphs: [
          'Réunir deux appartements voisins conduit souvent à fermer le bout de couloir qui les sépare. Ce morceau de palier appartient à tous. Pour l’intégrer au logement, il faut l’acheter à la copropriété.',
        ],
        list: [
          'La vente est votée à la double majorité : la majorité des copropriétaires, représentant au moins les deux tiers des voix.',
          'Un géomètre mesure la surface, et le règlement de copropriété est modifié.',
          'La vente est signée chez un notaire et publiée.',
          'Les charges du lot augmentent, puisqu’il représente une part plus grande de l’immeuble.',
        ],
      },
      {
        title: 'Que risque-t-on si l’autorisation manque ?',
        paragraphs: [
          'La copropriété, ou un seul copropriétaire, peut demander en justice la remise en état des lieux. Le délai pour agir est de cinq ans à compter du jour où les travaux ont été connus ou auraient dû l’être.',
          'Une régularisation reste possible : l’assemblée générale peut approuver les travaux après coup. Mais elle n’y est pas obligée, et tant qu’elle ne l’a pas fait, le risque pèse sur le propriétaire du moment. Après la vente, ce serait vous.',
        ],
      },
      {
        title: 'Achetez-vous un lot ou deux ?',
        paragraphs: [
          'La réunion physique de deux appartements ne les fusionne pas sur le papier. Très souvent, le logement reste composé de deux lots, chacun avec son numéro, sa quote-part et ses charges.',
          'Ce n’est pas un problème, à condition que tout concorde. L’acte doit porter sur tous les lots qui composent le logement. La surface Carrez doit correspondre à l’ensemble. Et les charges annoncées doivent additionner celles de chaque lot.',
        ],
      },
      {
        title: 'Peut-on séparer de nouveau les deux appartements ?',
        paragraphs: [
          'C’est parfois un atout à la revente. Si les deux lots existent toujours, refermer la trémie reste un chantier, mais pas un casse-tête juridique. Vérifiez tout de même le règlement de copropriété : certains encadrent la division des logements.',
        ],
      },
    ],
    checklist: {
      title: 'Les documents à demander au vendeur',
      items: [
        'Le procès-verbal d’assemblée générale qui autorise l’ouverture du plancher ou du mur.',
        'Le dossier technique des travaux et, si possible, l’attestation de l’architecte ou du bureau d’études.',
        'Pour un palier annexé : l’acte d’achat de la partie commune et le règlement de copropriété modifié.',
        'La liste des lots vendus, avec leurs quotes-parts.',
        'Le mesurage Carrez de l’ensemble.',
        'Le montant des charges de chaque lot.',
      ],
    },
    faq: [
      {
        q: 'Faut-il une autorisation pour relier deux appartements par un escalier ?',
        a: 'Oui. Le plancher est une partie commune : l’assemblée générale doit autoriser l’ouverture, à la majorité des voix de tous les copropriétaires.',
      },
      {
        q: 'Pendant combien de temps des travaux non autorisés peuvent-ils être contestés ?',
        a: 'Cinq ans, à compter du jour où celui qui agit a connu les travaux ou aurait dû les connaître.',
      },
      {
        q: 'Peut-on régulariser après coup ?',
        a: 'Oui, si l’assemblée générale accepte de voter l’autorisation a posteriori. Elle n’y est pas tenue.',
      },
      {
        q: 'Un bout de palier peut-il faire partie de l’appartement ?',
        a: 'Seulement s’il a été acheté à la copropriété, par un vote à la double majorité puis un acte notarié.',
      },
    ],
    sources: [
      { label: 'ARC, « Les modalités juridiques de travaux privatifs affectant les parties communes »', url: 'https://arc-copro.fr/sites/default/files/pieces-jointes/2025/09/Les%20modalit%C3%A9s%20juridiques%20de%20travaux%20privatifs%20affectant%20les%20parties%20communes.pdf' },
      { label: 'FNAIM, « Achat d’une partie commune en copropriété : que faut-il savoir ? »', url: 'https://www.fnaim.fr/3386-achat-d-une-partie-commune-en-copropriete-que-faut-il-savoir-.htm' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'charges-de-copropriete-avant-d-acheter',
    art: 'charges',
    title: 'Charges de copropriété : comment les lire avant d’acheter',
    description:
      'Combien paie-t-on en moyenne, ce que les charges comprennent, pourquoi elles varient d’un immeuble à l’autre, et les documents à demander avant de s’engager.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Le prix d’un bien se paie une fois. Les charges, elles, reviennent chaque trimestre. Deux appartements au même prix peuvent coûter du simple au double à vivre. Avant d’acheter, il faut donc savoir ce que ce chiffre recouvre, et ce qu’il ne dit pas encore.',
    takeaways: [
      'À Paris, les charges de copropriété étaient en moyenne de 43 € par m² et par an selon les comptes 2023 des syndics de la FNAIM du Grand Paris.',
      'Un montant élevé s’explique souvent : gardien, ascenseur, chauffage collectif compris.',
      'Le montant des charges courantes ne dit rien des travaux à venir. Ce sont les procès-verbaux d’assemblée générale qui les annoncent.',
      'Ramenez toujours les charges au mètre carré pour comparer deux biens.',
    ],
    sections: [
      {
        title: 'Combien paie-t-on en moyenne ?',
        paragraphs: [
          'Deux repères récents. À Paris, l’observatoire de la FNAIM du Grand Paris relève une moyenne de 43 € par m² et par an sur les comptes 2023, en hausse de près de 11 % sur un an. Au niveau national, l’observatoire de Foncia donne 1 488 € par lot en 2025, et 2 251 € à Paris.',
          'Ces moyennes sont des ordres de grandeur. Elles mêlent des immeubles très différents, et ne sont pas calculées sur la même base que la surface de votre logement.',
        ],
      },
      {
        title: 'Que comprennent les charges ?',
        paragraphs: [
          'La loi distingue deux familles. Les charges générales couvrent l’entretien et l’administration de l’immeuble : ménage, assurance, syndic, petites réparations. Chacun y contribue selon la quote-part de son lot.',
          'Les charges spéciales couvrent les services et équipements collectifs : ascenseur, chauffage, eau chaude, gardien. Elles sont réparties selon l’utilité que chaque lot en retire. C’est pourquoi un rez-de-chaussée ne paie en général pas l’ascenseur.',
        ],
      },
      {
        title: 'Pourquoi un tel écart d’un immeuble à l’autre ?',
        list: [
          'Le chauffage collectif : quand il est compris, les charges montent, mais votre facture d’énergie baisse d’autant.',
          'Le gardien : un service apprécié, qui pèse lourd dans un petit immeuble.',
          'L’ascenseur, son contrat d’entretien et ses mises aux normes.',
          'La taille de l’immeuble : les frais fixes se répartissent sur plus ou moins de lots.',
          'L’âge et l’état du bâtiment.',
        ],
      },
      {
        title: 'Et pour un bien atypique ?',
        paragraphs: [
          'Un ancien atelier en fond de cour, un loft dans une petite copropriété sans ascenseur ni gardien : les charges y sont souvent faibles. C’est un vrai avantage au quotidien.',
          'La contrepartie existe. Peu de lots, cela veut dire peu de copropriétaires pour partager une toiture ou un ravalement. Regardez l’état de l’immeuble avec d’autant plus d’attention que les charges sont basses.',
        ],
      },
      {
        title: 'Qu’est-ce que le montant des charges ne dit pas ?',
        paragraphs: [
          'Il ne dit rien des travaux exceptionnels. Un ravalement, une toiture ou un ascenseur à remplacer se votent en assemblée générale et se paient en plus des charges courantes.',
          'La copropriété constitue aussi un fonds de travaux, alimenté chaque année par les copropriétaires. Les sommes versées restent attachées au lot : le vendeur ne les récupère pas, et vous en bénéficiez.',
          'Enfin, le compromis précise qui, du vendeur ou de l’acheteur, paie les travaux déjà votés. Lisez cette clause.',
        ],
      },
    ],
    checklist: {
      title: 'Les documents à demander',
      items: [
        'Le montant annuel des charges courantes du lot, et ce qu’elles comprennent.',
        'Les trois derniers procès-verbaux d’assemblée générale.',
        'Les travaux votés et non encore payés, et ceux qui sont à l’étude.',
        'Le montant du fonds de travaux attaché au lot.',
        'Le carnet d’entretien de l’immeuble.',
        'Le nombre de lots, et l’existence éventuelle d’une procédure en cours dans la copropriété.',
      ],
    },
    faq: [
      {
        q: 'Quel est le montant moyen des charges de copropriété à Paris ?',
        a: 'Environ 43 € par m² et par an selon l’observatoire de la FNAIM du Grand Paris, sur les comptes 2023. C’est un ordre de grandeur.',
      },
      {
        q: 'Des charges élevées sont-elles mauvais signe ?',
        a: 'Pas forcément. Elles s’expliquent souvent par un gardien, un ascenseur ou un chauffage collectif compris. Demandez ce qu’elles couvrent.',
      },
      {
        q: 'Qui paie les travaux votés avant la vente ?',
        a: 'Le compromis le précise. Vérifiez la clause, ainsi que les travaux votés dans les derniers procès-verbaux.',
      },
      {
        q: 'Le vendeur récupère-t-il sa part du fonds de travaux ?',
        a: 'Non. Les sommes versées restent attachées au lot et profitent à l’acheteur.',
      },
    ],
    sources: [
      { label: 'FNAIM du Grand Paris, 12e Observatoire des charges de copropriété', url: 'https://www.galivel.com/media/files/fnaim_gp___12e_obs_des_charges_2024___04022025_vok.pdf' },
      { label: 'MySweetImmo, « Observatoire des charges de copropriété 2026 : Foncia annonce une baisse des charges »', url: 'https://www.mysweetimmo.com/2026/04/07/charges-de-copropriete-ce-qui-a-baisse-et-ce-qui-a-augmente-en-2025/' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
];

// Articles en ligne à la date du jour, du plus récent au plus ancien
export function publishedArticles(now: Date = new Date()): GuideArticle[] {
  const today = now.toISOString().slice(0, 10);
  return GUIDE_ARTICLES.filter((a) => a.published <= today).sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));
}

// Nombre d'articles parus à la date de publication la plus récente (étiquette « + N articles » de l'en-tête)
export function latestArticlesCount(now: Date = new Date()): number {
  const list = publishedArticles(now);
  return list.length === 0 ? 0 : list.filter((a) => a.published === list[0].published).length;
}

export function formatGuideDate(iso: string): string {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

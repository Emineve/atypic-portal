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
  art: 'souplex' | 'loft' | 'plans' | 'peniche' | 'mezzanine'; // illustration en tête d'article
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
    art: 'souplex',
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
    category: 'Avant d’acheter',
    published: '2026-11-18',
    updated: '2026-11-18',
    readMinutes: 6,
    intro:
      'Une ancienne imprimerie, une boutique sur cour, un atelier sous verrière : beaucoup de lofts ont eu une autre vie. C’est ce qui fait leur charme. C’est aussi ce qui impose une vérification simple avant d’acheter : le lieu est-il devenu un logement sur le papier, ou seulement dans les faits ?',
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
          'Chaque bâtiment a une destination au sens du Code de l’urbanisme : habitation, commerce, bureau, artisanat. Habiter un lieu ne change pas sa destination. Seule une autorisation délivrée par la mairie le fait.',
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
    category: 'Avant d’acheter',
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
    category: 'Avant d’acheter',
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
    category: 'Avant d’acheter',
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
];

// Articles en ligne à la date du jour, du plus récent au plus ancien
export function publishedArticles(now: Date = new Date()): GuideArticle[] {
  const today = now.toISOString().slice(0, 10);
  return GUIDE_ARTICLES.filter((a) => a.published <= today).sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));
}

export function formatGuideDate(iso: string): string {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

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
  art: 'souplex' | 'loft' | 'plans' | 'peniche' | 'mezzanine' | 'visite' | 'terrasse' | 'dpe' | 'credit' | 'duplex' | 'charges' | 'marche' | 'negociation' | 'ventes' | 'offre' | 'annonce'; // illustration en tête d'article
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
    slug: 'verriere-ce-qu-il-faut-verifier',
    art: 'loft',
    title: 'Verrière : la pièce maîtresse, et le premier poste à vérifier',
    description:
      'Elle fait la lumière et le charme d’un atelier ou d’un loft. À qui appartient-elle, qui l’entretient, peut-on la remplacer ? Les questions à poser avant d’acheter.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'C’est souvent elle qui déclenche le coup de cœur. Une verrière donne à un logement une lumière qu’aucune fenêtre n’offre. Elle est aussi la partie la plus exposée du bien : à la pluie, au soleil, au froid. Et son statut n’est pas toujours celui que l’on croit. Avant d’acheter, trois questions : à qui est-elle, dans quel état est-elle, et que pourrez-vous en faire ?',
    takeaways: [
      'Le statut d’une verrière dépend du règlement de copropriété : partie privative, comme une fenêtre, ou partie commune, quand elle fait office de toiture. Cela décide de qui paie.',
      'Même privative, elle participe à l’aspect extérieur de l’immeuble : la remplacer autrement qu’à l’identique demande l’accord de la copropriété et une déclaration préalable en mairie.',
      'Son état se vérifie par temps de pluie et par temps chaud, et se documente : âge, vitrage, dernières interventions.',
      'En secteur protégé, l’architecte des Bâtiments de France peut imposer les matériaux et le dessin.',
    ],
    sections: [
      {
        title: 'De quelle verrière parle-t-on ?',
        list: [
          'La verrière de toit, ou zénithale : elle remplace une partie de la couverture. C’est la plus exposée.',
          'La verrière de façade : un grand vitrage vertical, typique des ateliers d’artistes.',
          'La verrière intérieure : une cloison vitrée entre deux pièces. Elle ne pose aucune des questions qui suivent.',
        ],
      },
      {
        title: 'À qui appartient-elle ?',
        paragraphs: [
          'En maison, la réponse est simple : à vous. En copropriété, elle se trouve dans le règlement. Dans la plupart des immeubles, les fenêtres sont des parties privatives, dont l’entretien et le remplacement reviennent au copropriétaire. Une verrière peut suivre ce régime : un tribunal a ainsi retenu, dans une affaire récente, qu’une verrière était une partie privative de ses propriétaires, et qu’elle était à l’origine des désordres subis par le voisin.',
          'À l’inverse, quand elle fait office de couverture, elle peut relever du clos et du couvert de l’immeuble, donc des parties communes. Lisez la clause exacte, et faites-la confirmer par le syndic. La différence se chiffre vite : une verrière ancienne à refaire coûte cher, et il vaut mieux savoir si la dépense est pour vous seul ou pour tous.',
        ],
      },
      {
        title: 'Peut-on la remplacer ou la modifier ?',
        paragraphs: [
          'Oui, avec deux accords possibles. Côté copropriété : même privative, une verrière visible participe à l’aspect extérieur de l’immeuble. En changer le dessin, le matériau ou la couleur doit être autorisé par l’assemblée générale.',
          'Côté mairie : le Code de l’urbanisme soumet à déclaration préalable les travaux qui modifient l’aspect extérieur d’un bâtiment. Un remplacement strictement à l’identique peut en être dispensé, mais certaines communes l’exigent quand même : dans le doute, déposez-la. En secteur protégé, l’architecte des Bâtiments de France donne son avis.',
        ],
      },
      {
        title: 'Comment juger son état en visite ?',
        list: [
          'Les traces d’eau : auréoles, coulures, joints noircis, peinture qui cloque au pied de la verrière.',
          'La structure : rouille sur l’acier, bois abîmé, mastic qui s’effrite.',
          'Le vitrage : simple ou double, feuilleté ou non. Un vitrage ancien en toiture pose une question de sécurité.',
          'La condensation : de la buée ou des gouttes à l’intérieur signalent une mauvaise isolation ou une ventilation insuffisante.',
          'Les ouvrants : fonctionnent-ils encore ? Ce sont eux qui permettent de rafraîchir.',
        ],
        paragraphs: [
          'Demandez l’âge de la verrière, les factures d’entretien ou de remplacement, et les sinistres déclarés. Pour un achat important, faites venir un professionnel avant l’offre.',
        ],
      },
      {
        title: 'Et le confort, été comme hiver ?',
        paragraphs: [
          'Une grande surface vitrée chauffe l’été et refroidit l’hiver, surtout si elle est ancienne. Le diagnostic de performance énergétique en tient compte. Des solutions existent : vitrage performant, stores, ouvrants. Mais les stores extérieurs et la climatisation modifient l’aspect de l’immeuble et suivent les mêmes règles d’autorisation que la verrière elle-même.',
          'Visitez si possible par une journée chaude. C’est le meilleur test.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, côté verrière',
      items: [
        'Je sais si la verrière est privative ou commune, clause du règlement à l’appui.',
        'Je connais son âge et la date des dernières interventions.',
        'J’ai cherché les traces d’infiltration et de condensation.',
        'Je sais quel vitrage est en place.',
        'J’ai un avis de professionnel, ou un devis de remise en état.',
        'Je sais ce que la copropriété et la mairie exigeraient pour la remplacer.',
      ],
    },
    faq: [
      {
        q: 'Une verrière est-elle une partie commune ?',
        a: 'Cela dépend du règlement de copropriété. Elle peut être privative, comme une fenêtre, ou commune si elle tient lieu de toiture. Vérifiez la clause avant d’acheter.',
      },
      {
        q: 'Faut-il une autorisation pour remplacer une verrière ?',
        a: 'Oui si son aspect change : accord de l’assemblée générale en copropriété et déclaration préalable en mairie. Un remplacement strictement à l’identique peut en être dispensé, selon les communes.',
      },
      {
        q: 'Qui paie les dégâts si la verrière fuit ?',
        a: 'Celui à qui elle appartient. Si elle est privative, son propriétaire répond des dommages causés aux voisins. Si elle est commune, c’est la copropriété.',
      },
    ],
    sources: [
      { label: 'Kohen Avocats, « Fenêtres et ouvertures en copropriété : parties privatives, aspect extérieur et autorisations »', url: 'https://kohenavocats.fr/?p=2138135' },
      { label: 'Kohen Avocats, « Verrières et balcons en copropriété : parties privatives, règlement et assemblée générale »', url: 'https://kohenavocats.fr/2026/09/23/verrieres-balcons-copropriete-parties-privatives-reglement-assemblee-generale/' },
      { label: 'Construires.fr, « Changer ses fenêtres en copropriété : règles et formalités »', url: 'https://www.construires.fr/changer-fenetre-copropriete-autorisation/' },
      { label: 'Doctrine, tribunal judiciaire de Pau, 2026 (verrière, partie privative)', url: 'https://www.doctrine.fr/d/TJ/Pau/2026/TJPF1157573F409B1ABEE7F' },
      { label: 'Agence parisienne du climat (CoachCopro), « Les travaux en copropriété »', url: 'https://www.coachcopro.com/pdfs/90/les-travaux-en-coproprietepdf-6b.pdf' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'acheter-un-bien-classe-monument-historique',
    art: 'plans',
    title: 'Monument historique : acheter un bien classé ou inscrit',
    description:
      'Classé, inscrit, aux abords : trois niveaux de protection, trois régimes de travaux. Ce que le propriétaire doit, ce qu’il peut demander, et ce qu’il faut savoir avant d’acheter.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Acheter un monument historique, ou un appartement dans un immeuble protégé, c’est acheter un bien que l’État a reconnu pour son intérêt historique ou artistique. Cette reconnaissance fait sa valeur. Elle fait aussi de vous le responsable de sa conservation, et elle encadre chaque intervention. Avant d’acheter, il faut savoir exactement ce qui est protégé, et à quel niveau.',
    takeaways: [
      'Il existe deux niveaux de protection : le classement, le plus fort, et l’inscription. La protection peut ne porter que sur une partie de l’immeuble : une façade, un escalier, un décor.',
      'Le propriétaire est responsable de la conservation du monument et maître d’ouvrage des travaux.',
      'Sur un immeuble classé, les travaux qui touchent à la consistance ou à l’aspect du bâtiment demandent une autorisation du préfet de région. Seul l’entretien courant y échappe.',
      'Des subventions du ministère de la Culture existent, y compris pour les particuliers, ainsi qu’un régime fiscal propre. Aucun des deux n’est automatique.',
      'Être simplement « aux abords » d’un monument n’est pas être protégé soi-même, mais les travaux extérieurs sont soumis à l’accord de l’architecte des Bâtiments de France.',
    ],
    sections: [
      {
        title: 'Classé, inscrit, aux abords : quelle différence ?',
        list: [
          'Classé : la protection la plus forte, pour les édifices dont l’intérêt est jugé national.',
          'Inscrit : une protection de second rang, pour un intérêt reconnu à l’échelle régionale.',
          'Aux abords : votre bien n’est pas protégé, mais il se trouve dans le périmètre d’un monument. Ce sont alors vos travaux extérieurs qui sont contrôlés.',
        ],
        paragraphs: [
          'Classement et inscription peuvent ne concerner qu’une partie de l’immeuble. C’est fréquent en ville : seuls la façade sur rue, la cage d’escalier ou un salon sont protégés. Demandez l’arrêté de protection : il dit précisément quoi.',
        ],
      },
      {
        title: 'Comment savoir si un bien est protégé ?',
        paragraphs: [
          'Les immeubles protégés sont recensés dans une base publique du ministère de la Culture, la base Mérimée. Le notaire le vérifie aussi, et l’information figure dans les documents d’urbanisme. En cas de doute, la direction régionale des affaires culturelles (DRAC) répond.',
        ],
      },
      {
        title: 'Quelles sont les obligations du propriétaire ?',
        paragraphs: [
          'Le ministère de la Culture le dit sans détour : le propriétaire a la responsabilité de la conservation du monument qui lui appartient, et il est le maître d’ouvrage des travaux. Pour un immeuble classé, l’État peut mettre en demeure un propriétaire défaillant de réaliser les travaux devenus indispensables à la conservation.',
          'Les travaux autorisés sont réalisés sous le contrôle scientifique et technique des services de l’État. Pour un immeuble classé, la maîtrise d’œuvre doit être confiée à des professionnels dont les catégories sont fixées par décret.',
        ],
      },
      {
        title: 'Quels travaux demandent une autorisation ?',
        paragraphs: [
          'Sur un immeuble classé, d’après Service-Public, les constructions ou travaux qui affectent la consistance ou l’aspect de l’immeuble, ou qui compromettent sa conservation, sont soumis à l’autorisation du préfet de région, ou du ministre de la Culture dans certains cas. Les travaux et réparations d’entretien n’y sont pas soumis.',
          'Sur un immeuble inscrit, les travaux sont eux aussi soumis à une autorisation, instruite avec les services chargés des monuments historiques. Dans les deux cas, le ministère recommande de se rapprocher de la DRAC avant tout projet : c’est gratuit, et cela évite de dessiner un projet qui ne passera pas.',
          'Conséquence pour l’acheteur : comptez des délais plus longs, des matériaux et des artisans spécialisés, et renoncez à l’idée de travaux décidés seul.',
        ],
      },
      {
        title: 'Existe-t-il des aides ?',
        paragraphs: [
          'Oui. Le ministère de la Culture soutient les propriétaires de biens classés ou inscrits par des subventions pour études et travaux, que les particuliers peuvent demander auprès de la DRAC de leur région. Elles sont accordées sous conditions et ne couvrent qu’une partie de la dépense.',
          'Les monuments historiques relèvent aussi d’un régime fiscal particulier, auquel le ministère consacre un guide pour les propriétaires. Ses conditions sont précises : faites-les vérifier par votre notaire ou un conseil fiscal avant de les intégrer à votre budget.',
        ],
      },
      {
        title: 'Que demander avant d’acheter ?',
        list: [
          'L’arrêté de classement ou d’inscription, pour savoir ce qui est protégé.',
          'Les autorisations obtenues pour les travaux déjà réalisés, et leurs factures.',
          'Un état du bâtiment : la DRAC peut dans certains cas réaliser un état sanitaire du monument.',
          'Les subventions déjà perçues et les engagements qui les accompagnent.',
          'En copropriété, les travaux votés sur les parties protégées.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, pour un bien protégé',
      items: [
        'Je sais si le bien est classé, inscrit ou seulement aux abords d’un monument.',
        'J’ai lu l’arrêté de protection et je sais quelles parties sont concernées.',
        'J’ai les autorisations des travaux déjà faits.',
        'J’ai pris contact avec la DRAC au sujet de mon projet.',
        'Mon budget prévoit des délais et des coûts plus élevés qu’ailleurs.',
        'Les aides et avantages fiscaux ont été vérifiés par un professionnel.',
      ],
    },
    faq: [
      {
        q: 'Peut-on faire des travaux dans un monument historique ?',
        a: 'Oui, mais pas librement. Sur un immeuble classé, tout ce qui touche à la consistance ou à l’aspect du bâtiment demande l’autorisation du préfet de région. Seul l’entretien courant en est dispensé.',
      },
      {
        q: 'Quelle différence entre classé et inscrit ?',
        a: 'Le classement est la protection la plus forte, l’inscription une protection de second rang. Les deux encadrent les travaux, avec des procédures différentes.',
      },
      {
        q: 'Un particulier peut-il obtenir une subvention ?',
        a: 'Oui. Tout propriétaire d’un monument classé ou inscrit peut déposer une demande auprès de la DRAC. L’aide est accordée sous conditions et ne couvre qu’une partie des travaux.',
      },
      {
        q: 'Mon appartement est près d’un monument : suis-je concerné ?',
        a: 'Votre logement n’est pas protégé pour autant. Mais les travaux qui modifient l’extérieur de l’immeuble sont soumis à l’accord de l’architecte des Bâtiments de France.',
      },
    ],
    sources: [
      { label: 'Service-Public, « Travaux sur monuments historiques ou ses alentours »', url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F32190' },
      { label: 'Ministère de la Culture, « Intervenir sur un immeuble inscrit »', url: 'https://www.culture.gouv.fr/thematiques/monuments-sites/interventions-demarches/travaux-sur-un-objet-un-immeuble-un-espace/intervenir-sur-un-immeuble-inscrit' },
      { label: 'Ministère de la Culture, « Protéger des immeubles au titre des monuments historiques »', url: 'https://www.culture.gouv.fr/switchToLanguage/25285/fre-FR' },
      { label: 'Ministère de la Culture, subvention « Études et travaux sur monuments historiques »', url: 'https://www.culture.gouv.fr/fr/catalogue-des-demarches-et-subventions/subvention/etudes-et-travaux-sur-monuments-historiques' },
      { label: 'CAPEB, fiche « Les monuments historiques »', url: 'https://patrimoinebati.capeb.fr/wp-content/uploads/2021/03/fiche_patrimoine_monuhisto.pdf' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'lieu-reconverti-eglise-ecole-usine',
    art: 'loft',
    title: 'Église, école, usine : habiter un lieu qui a eu une autre vie',
    description:
      'Chapelle, école, gare, atelier d’usine devenus logements : ces lieux reconvertis font rêver. Destination, conformité, financement, travaux : ce qu’il faut vérifier avant d’acheter.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Une nef devenue salon, une salle de classe devenue cuisine, une halle d’usine devenue loft : les lieux reconvertis sont les plus singuliers de tous. Ils ont été construits pour autre chose qu’y vivre, et tout l’enjeu est là. La transformation a-t-elle été faite dans les règles, et le bâtiment est-il aujourd’hui un vrai logement ? Si elle reste à faire, a-t-elle une chance d’être autorisée ?',
    takeaways: [
      'Un lieu reconverti est un bien dont l’usage d’origine n’était pas l’habitation. Le passage au logement est un changement de destination, que la mairie doit avoir autorisé.',
      'Sans travaux lourds, une déclaration préalable suffit. Dès que la façade ou la structure sont touchées, il faut un permis de construire.',
      'La destination est le premier point que la banque regarde : sans régularisation, le financement se complique.',
      'Deux situations très différentes : acheter un lieu déjà transformé, ou acheter un lieu à transformer. Dans le second cas, faites de l’autorisation une condition de votre achat.',
    ],
    sections: [
      {
        title: 'De quels lieux parle-t-on ?',
        paragraphs: [
          'D’anciens ateliers, usines et entrepôts, les plus nombreux en ville. Mais aussi des écoles, des gares, des granges, des moulins, des commerces, des chapelles et des églises désacralisées. Leur point commun : des volumes que l’on ne trouve dans aucun logement conçu comme tel, et une histoire.',
        ],
      },
      {
        title: 'Le lieu est déjà transformé : que vérifier ?',
        paragraphs: [
          'Que la transformation existe sur le papier, et pas seulement dans les murs. Le Code de l’urbanisme range les bâtiments par destination : habitation, commerce, bureaux, artisanat, équipement public… Passer de l’une à l’autre est un changement de destination, soumis à autorisation.',
        ],
        list: [
          'L’autorisation d’urbanisme : déclaration préalable ou permis de construire, avec la déclaration d’achèvement des travaux.',
          'La déclaration aux impôts : le local doit être imposé comme une habitation.',
          'En copropriété, la désignation du lot dans le règlement.',
          'Les règles d’un logement décent : hauteur sous plafond, lumière naturelle, ventilation.',
          'Les diagnostics : amiante et plomb sont fréquents dans les anciens bâtiments d’activité.',
        ],
      },
      {
        title: 'Déclaration préalable ou permis : quelle différence ?',
        paragraphs: [
          'D’après Service-Public et le site Justice.fr, tout dépend de l’ampleur des travaux. Un changement de destination sans modification de la façade ni de la structure porteuse relève d’une déclaration préalable. S’il s’accompagne d’une modification de la façade ou de la structure, il faut un permis de construire.',
          'Pour l’acheteur d’un lieu déjà transformé, la question est simple : le vendeur a-t-il l’un ou l’autre ? S’il ne retrouve rien, la mairie peut vous dire ce qui a été déposé à cette adresse.',
        ],
      },
      {
        title: 'Le lieu est à transformer : comment se protéger ?',
        paragraphs: [
          'Ne supposez jamais que l’autorisation sera accordée. Le plan local d’urbanisme peut interdire le logement dans certaines zones, ou protéger l’activité. En secteur protégé, l’architecte des Bâtiments de France a son mot à dire. En copropriété, le règlement peut s’y opposer.',
        ],
        list: [
          'Demandez à la mairie un certificat d’urbanisme, qui indique les règles applicables au terrain.',
          'Faites étudier le projet par un architecte avant de signer.',
          'Inscrivez dans la promesse une condition suspensive : pas d’autorisation, pas de vente.',
          'Chiffrez les raccordements : eau, assainissement, électricité, chauffage. Un bâtiment d’activité n’a pas toujours ce qu’il faut.',
        ],
      },
      {
        title: 'Une banque finance-t-elle ce type de bien ?',
        paragraphs: [
          'Oui, mais elle regarde le dossier de plus près. Le Crédit Agricole indique que le financement d’un bien atypique demande parfois une expertise complémentaire et une analyse plus poussée du projet. Un comparateur de crédit le dit plus crûment : la conformité de la destination est le premier filtre, et sans autorisation régularisée la majorité des banques refusent.',
          'Venez donc avec les autorisations, les diagnostics et, s’il y a des travaux, des devis.',
        ],
      },
      {
        title: 'Et pour une église ou une chapelle ?',
        paragraphs: [
          'Une église construite avant 1905 est affectée au culte, et cette affectation ne tombe pas d’elle-même : elle doit avoir été levée par une procédure de désaffectation, prévue par la loi de 1905 et prononcée en général par arrêté du préfet avec l’accord écrit de l’évêque. La « désacralisation », elle, est la démarche religieuse. Certains édifices sont en outre protégés au titre des monuments historiques, ce qui encadre les travaux. Demandez l’arrêté de désaffectation et le niveau de protection avant toute chose.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, pour un lieu reconverti',
      items: [
        'J’ai l’autorisation qui a fait de ce lieu un logement, et la déclaration d’achèvement.',
        'La taxe foncière porte sur une habitation.',
        'J’ai les diagnostics amiante et plomb.',
        'Lieu à transformer : j’ai un certificat d’urbanisme et l’avis d’un architecte.',
        'Lieu à transformer : la promesse contient une condition suspensive d’autorisation.',
        'Ma banque connaît l’histoire du bien.',
      ],
    },
    faq: [
      {
        q: 'Peut-on habiter une ancienne usine ou un ancien commerce ?',
        a: 'Oui, si le changement de destination vers l’habitation a été autorisé par la mairie et que le local répond aux règles d’un logement décent.',
      },
      {
        q: 'Faut-il un permis de construire pour transformer un local en logement ?',
        a: 'Une déclaration préalable suffit si ni la façade ni la structure ne sont modifiées. Dans le cas contraire, il faut un permis de construire.',
      },
      {
        q: 'Que risque-t-on à acheter un lieu transformé sans autorisation ?',
        a: 'Vous devenez propriétaire d’un bien irrégulier : la mairie peut exiger une régularisation, la banque peut refuser le financement et la revente sera plus difficile. Demandez au vendeur de régulariser avant la vente.',
      },
      {
        q: 'Peut-on acheter une église pour y vivre ?',
        a: 'Oui, si elle a été officiellement désaffectée, en général par arrêté préfectoral. Vérifiez aussi sa protection éventuelle au titre des monuments historiques, qui encadre les travaux.',
      },
    ],
    sources: [
      { label: 'Service-Public, « Comment transformer un local professionnel ou commercial en logement ? »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2416' },
      { label: 'Justice.fr, « Transformer un local professionnel ou commercial en logement »', url: 'https://www.justice.fr/fiche/transformer-local-professionnel-commercial-logement' },
      { label: 'Crédit Agricole, « Qu’est-ce qu’un bien immobilier atypique et comment l’acheter ? »', url: 'https://e-immobilier.credit-agricole.fr/conseils/marche/ce-quil-faut-savoir-avant-dacheter-un-bien-immobilier-atypique' },
      { label: 'Bourse des crédits, « Bien immobilier atypique : les vérifications avant d’acheter »', url: 'https://www.boursedescredits.com/guide-immobilier-atypique-verifications-acheter-6182.php' },
      { label: 'SeLoger, « Église désacralisée, ancienne école, phare… Acheter un bien atypique : mode d’emploi »', url: 'https://edito.seloger.com/conseils-d-experts/acheter/acheter-un-bien-atypique-mode-d-emploi-article-16977.html' },
      { label: 'Actu-Juridique, « La désaffectation des édifices cultuels »', url: 'https://www.actu-juridique.fr/divers/colloque/la-desaffectation-des-edifices-cultuels/' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'hotel-particulier-maison-en-ville',
    art: 'visite',
    title: 'Hôtel particulier, maison en ville : seul maître à bord, seul à payer',
    description:
      'Une maison au cœur de la ville, sans voisin au-dessus : le bien le plus rare. Protection du patrimoine, entretien à sa seule charge, usage des lieux : ce qu’il faut vérifier.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Une porte cochère, une cour, parfois un jardin, et personne au-dessus de soi : la maison en ville est ce que l’appartement ne sera jamais. C’est aussi un bien dont on porte seul toute la charge, dans des quartiers où l’on ne fait pas ce que l’on veut de ses murs. Deux réalités à regarder en face avant de se laisser emporter par la visite.',
    takeaways: [
      'Le terme « hôtel particulier » n’a pas de définition légale. Il désigne une grande maison de ville, sur plusieurs niveaux, avec cour ou jardin. Une « maison de ville » en est la version plus modeste.',
      'Ces biens sont très rares : à Paris, un chasseur immobilier n’en compte qu’une à cinq ventes par an sur le marché ouvert.',
      'Dans les quartiers anciens, la plupart sont dans un périmètre protégé : les travaux extérieurs, et parfois intérieurs, passent par l’architecte des Bâtiments de France.',
      'Sans copropriété, toiture, façade et réseaux sont à votre seule charge. Le budget d’entretien se prévoit avant l’achat.',
    ],
    sections: [
      {
        title: 'Hôtel particulier ou maison de ville : quelle différence ?',
        paragraphs: [
          'Aucune au sens du droit : ce sont deux maisons. L’usage réserve le nom d’hôtel particulier aux demeures de grande taille, construites pour une seule famille, avec une cour, un jardin ou les deux. La maison de ville est plus petite et plus simple. Dans une annonce, le mot dit surtout l’ambition du prix.',
          'Ce qui compte pour vous : la surface réelle, le terrain, l’accès (rue, voie privée, cour commune) et le statut de l’ensemble. Certaines maisons sont en pleine propriété, d’autres font partie d’une copropriété ou d’une voie privée avec des charges et des règles communes.',
        ],
      },
      {
        title: 'Pourquoi sont-ils si rares ?',
        paragraphs: [
          'Parce qu’on n’en construit plus et que beaucoup ont été divisés en appartements ou transformés en bureaux. Le chasseur immobilier Home Select estime que Paris compte plusieurs centaines d’hôtels particuliers, pour une à cinq ventes par an sur le marché ouvert, avec des prix allant de quelques millions d’euros pour une maison de ville à rénover à plusieurs dizaines de millions dans le 7e arrondissement ou le Marais. Ce sont des estimations de professionnel, pas une statistique officielle.',
        ],
      },
      {
        title: 'Peut-on y faire les travaux que l’on veut ?',
        paragraphs: [
          'Rarement. Même sans être lui-même classé, un hôtel particulier se trouve le plus souvent aux abords d’un monument historique ou dans un secteur sauvegardé. Les travaux qui modifient l’extérieur demandent alors l’accord de l’architecte des Bâtiments de France.',
          'Dans les secteurs dotés d’un plan de sauvegarde, comme le Marais, la protection peut aller plus loin : le plan indique, immeuble par immeuble, ce qui est protégé, des façades aux cours et, pour certains bâtiments, jusqu’aux intérieurs. Consultez-le avant de rêver d’ouvrir une baie ou de déplacer un escalier.',
        ],
      },
      {
        title: 'Que coûte une maison que l’on entretient seul ?',
        paragraphs: [
          'Dans un immeuble, la toiture et la façade se paient à plusieurs. Dans une maison, tout est pour vous : couverture, ravalement, menuiseries, réseaux, cour, jardin, mur mitoyen. Sur un bâtiment ancien et protégé, ces travaux se font avec des matériaux et des artisans adaptés, donc plus chers.',
        ],
        list: [
          'Demandez les factures des dix dernières années : toiture, façade, chauffage, électricité.',
          'Faites passer un architecte ou un maître d’œuvre avant l’offre, pas après.',
          'Lisez le diagnostic de performance énergétique : chauffer de grands volumes anciens pèse lourd.',
          'Si la maison dépend d’une voie privée ou d’une copropriété, demandez les charges et les derniers procès-verbaux.',
        ],
      },
      {
        title: 'L’usage des lieux est-il bien l’habitation ?',
        paragraphs: [
          'Beaucoup d’hôtels particuliers ont abrité des bureaux, une ambassade, un cabinet. Vérifiez que le bâtiment, ou la partie que vous achetez, est bien à usage d’habitation, et l’inverse si vous comptez y travailler ou y recevoir du public. À Paris, l’usage des locaux est contrôlé, et le changer suppose une autorisation.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, pour une maison en ville',
      items: [
        'Je sais si le bien est en pleine propriété, en copropriété ou sur une voie privée.',
        'Je connais le niveau de protection : monument, abords, secteur sauvegardé.',
        'J’ai les factures de toiture, de façade et de chauffage.',
        'Un professionnel du bâtiment a visité avant mon offre.',
        'L’usage d’habitation est établi par des documents.',
        'J’ai chiffré le budget d’entretien annuel.',
      ],
    },
    faq: [
      {
        q: 'Qu’est-ce qu’un hôtel particulier ?',
        a: 'Une grande maison de ville construite pour une seule famille, sur plusieurs niveaux, avec cour ou jardin. Le terme n’a pas de définition légale : c’est une maison, souvent ancienne et protégée.',
      },
      {
        q: 'Faut-il l’accord de l’architecte des Bâtiments de France pour des travaux ?',
        a: 'Oui dès que le bâtiment est protégé ou situé dans un périmètre protégé et que les travaux modifient son aspect extérieur. Dans un secteur sauvegardé, certains intérieurs sont protégés eux aussi.',
      },
      {
        q: 'Une maison en ville a-t-elle des charges ?',
        a: 'Pas de charges de copropriété si elle est en pleine propriété, mais tout l’entretien du bâtiment est à votre charge. Si elle dépend d’une voie privée ou d’une copropriété, des charges communes s’ajoutent.',
      },
    ],
    sources: [
      { label: 'Kohen Avocats, « Hôtel particulier à vendre à Paris : que vérifier avant d’acheter en 2026 »', url: 'https://kohenavocats.fr/?p=2141096' },
      { label: 'Home Select, « Hôtels particuliers de Paris : rêve accessible ou privilège ? »', url: 'https://homeselect.paris/blog/hotels-particuliers-paris-guide/' },
      { label: 'Home Select, « Acheter dans le Marais, secteur sauvegardé »', url: 'https://homeselect.paris/carnet/acheter-dans-le-marais-secteur-sauvegarde/' },
      { label: 'Capifrance, « Protected buildings in France: responsibilities regarding renovation work »', url: 'https://www.capifrance.fr/en/blog/protected-buildings-in-france-what-are-the-responsibilities-regarding-renovation-work' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'acheter-un-dernier-etage',
    art: 'terrasse',
    title: 'Dernier étage : la vue, la lumière… et le toit juste au-dessus',
    description:
      'Pas de voisin au-dessus, de la lumière, parfois une terrasse : le dernier étage se paie plus cher. Toiture, chaleur d’été, ascenseur, combles : ce qu’il faut vérifier avant d’acheter.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Le dernier étage est le plus demandé de l’immeuble : pas de bruit de pas au-dessus, une vue dégagée, de la lumière, parfois une terrasse. Il a aussi une particularité que les autres étages n’ont pas : il vit directement sous le toit. Quand la toiture vieillit, c’est lui qui le sait le premier. Avant de payer la prime du dernier étage, regardez donc ce qu’il y a au-dessus du plafond.',
    takeaways: [
      'La toiture et son étanchéité sont en principe des parties communes : leur réfection est payée par toute la copropriété, pas par le seul dernier étage. Mais c’est vous qui subirez les fuites en attendant les travaux.',
      'Avoir la jouissance d’une terrasse ne rend pas propriétaire de l’étanchéité qui est dessous. Vous entretenez le revêtement, la copropriété répond de ce qui protège l’immeuble.',
      'L’état du toit ne se voit pas en visite. Il se lit dans le carnet d’entretien et les procès-verbaux d’assemblée générale.',
      'Sous une toiture mal isolée, l’inconfort d’été est réel. Visitez par temps chaud si vous le pouvez.',
      'L’ascenseur se paie selon l’étage : le dernier paie la plus grosse part.',
    ],
    sections: [
      {
        title: 'Pourquoi le dernier étage est-il plus cher ?',
        paragraphs: [
          'Parce qu’il réunit ce que les acheteurs cherchent en ville : le calme, la lumière, une vue, et souvent un extérieur. C’est aussi pour cela qu’il est rare. Cette prime n’a de sens que si le toit, l’isolation et l’accès sont à la hauteur.',
        ],
      },
      {
        title: 'À qui appartient le toit, et qui paie sa réparation ?',
        paragraphs: [
          'Dans un immeuble en copropriété, la toiture relève en principe du gros œuvre commun, sauf si le règlement dit autre chose. Le syndicat des copropriétaires doit l’entretenir, et la dépense se répartit entre tous.',
          'Le cas d’une terrasse à jouissance privative suit la même logique : jouir seul d’une terrasse ne rend pas propriétaire de l’étanchéité qui se trouve dessous. Celui qui en profite entretient le revêtement de sol ; l’étanchéité, qui protège l’immeuble, reste le plus souvent une charge commune.',
          'Vérifiez tout de même votre règlement : il peut prévoir des parties communes spéciales ou une répartition particulière. Et retenez la conséquence pratique : si une réfection est votée après votre achat, vous en paierez votre part. Si elle tarde, c’est chez vous que l’eau arrive.',
        ],
      },
      {
        title: 'Comment connaître l’état de la toiture ?',
        paragraphs: [
          'On ne monte pas sur le toit pendant une visite. Les documents de la copropriété le racontent à sa place.',
        ],
        list: [
          'Le carnet d’entretien de l’immeuble : il recense les travaux faits sur les parties communes, dont la dernière réfection de toiture.',
          'Les procès-verbaux des trois dernières assemblées générales : travaux de toiture ou d’étanchéité votés, reportés ou refusés, avec leur montant et leurs échéances.',
          'Les sinistres déclarés : demandez à l’agence s’il y a eu des infiltrations au dernier étage, et comment elles ont été réglées.',
          'Dans l’appartement : auréoles au plafond, peinture qui cloque, traces autour des fenêtres de toit.',
        ],
      },
      {
        title: 'Fait-il trop chaud l’été ?',
        paragraphs: [
          'C’est le point faible classique. Une toiture est souvent à l’origine de fortes déperditions, et les occupants du dernier étage en ressentent l’inconfort, surtout en été, relève une fiche technique de l’Agence parisienne du climat. Une isolation refaite en même temps que l’étanchéité change la situation.',
          'Demandez de quand date l’isolation du toit, lisez le diagnostic de performance énergétique, et gardez en tête qu’une climatisation ne s’installe pas librement en copropriété.',
        ],
      },
      {
        title: 'Ascenseur et charges : combien coûte la hauteur ?',
        paragraphs: [
          'Les charges d’ascenseur se répartissent selon l’utilité pour chaque lot : le rez-de-chaussée paie peu ou pas, le dernier étage paie le plus. Regardez le montant sur le relevé de charges, et vérifiez qu’aucun remplacement de l’appareil n’est annoncé.',
          'Sans ascenseur, le dernier étage se négocie. Pensez à votre vie dans dix ans, et à la revente.',
        ],
      },
      {
        title: 'Combles et surélévation : y a-t-il quelque chose à gagner ?',
        paragraphs: [
          'Les combles situés au-dessus de l’appartement ne vous appartiennent pas forcément : ils peuvent être des parties communes. Les annexer suppose de les racheter à la copropriété, avec un vote.',
          'Même chose pour le droit de surélever : dans certains immeubles il est attaché au dernier étage, dans d’autres il appartient à la copropriété, qui pourrait un jour construire au-dessus de vous. Le règlement le dit.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, pour un dernier étage',
      items: [
        'Je connais la date de la dernière réfection de la toiture.',
        'J’ai lu les trois derniers procès-verbaux d’assemblée générale, côté toiture et étanchéité.',
        'Je sais s’il y a déjà eu des infiltrations dans l’appartement.',
        'Je sais qui est propriétaire des combles et du droit de surélever.',
        'J’ai le montant des charges d’ascenseur, ou j’ai accepté l’absence d’ascenseur.',
        'J’ai une idée de la température en plein été.',
      ],
    },
    faq: [
      {
        q: 'Le propriétaire du dernier étage paie-t-il seul la toiture ?',
        a: 'Non, en principe. La toiture est une partie commune et sa réfection est répartie entre tous les copropriétaires, sauf clause particulière du règlement de copropriété.',
      },
      {
        q: 'Qui paie l’étanchéité d’une terrasse privative ?',
        a: 'Le plus souvent la copropriété. Le titulaire de la jouissance entretient le revêtement de sol, mais l’étanchéité qui protège l’immeuble reste une charge commune, sauf disposition contraire du règlement.',
      },
      {
        q: 'Peut-on aménager les combles au-dessus de son appartement ?',
        a: 'Seulement s’ils sont à vous. S’ils sont des parties communes, il faut les acheter à la copropriété et obtenir un vote de l’assemblée générale.',
      },
      {
        q: 'Un dernier étage sans ascenseur est-il un mauvais achat ?',
        a: 'Pas forcément, mais il s’adresse à moins d’acheteurs. Le prix doit en tenir compte, à l’achat comme à la revente.',
      },
    ],
    sources: [
      { label: 'Kohen Avocats, « Fuite de toiture en copropriété : qui paie et comment forcer le syndic »', url: 'https://kohenavocats.fr/?p=2123560' },
      { label: 'Kohen Avocats, « Infiltration par la toiture-terrasse en copropriété : qui paie l’étanchéité et les dégâts »', url: 'https://kohenavocats.fr/?p=2134727' },
      { label: 'Agence parisienne du climat (CoachCopro), fiche « Isolation thermique d’une toiture-terrasse »', url: 'https://www.coachcopro.com/pdfs/51/fiche-ami-copro-itoiture-terrassepdf-40.pdf' },
      { label: 'Home Select, « La copropriété à Paris : charges, carnet d’entretien, droit de surélévation »', url: 'https://www.homeselect.paris/blog/copropriete' },
      { label: 'Bourse Inside, « Achat en copropriété : ce que disent les procès-verbaux d’assemblée générale »', url: 'https://bourseinside.fr/?p=12164' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'acheter-une-maison-d-architecte',
    art: 'plans',
    title: 'Maison d’architecte : ce que l’on achète, ce que l’on peut modifier',
    description:
      'Une maison signée se choisit pour son dessin. Avant d’acheter : les droits de l’architecte sur son œuvre, les garanties encore en cours et les documents à réclamer.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Une maison d’architecte a été dessinée pour un terrain et pour des habitants précis. On l’achète pour cela : une lumière, un plan, des matériaux que l’on ne trouve pas ailleurs. Mais une œuvre a un auteur, et cet auteur garde des droits. Et une construction récente ou très singulière demande quelques vérifications de plus qu’une maison ordinaire.',
    takeaways: [
      'L’architecte garde un droit moral sur son œuvre quand elle est originale : ce droit ne se vend pas et ne s’éteint pas. Vous achetez les murs, pas ce droit.',
      'Ce droit ne rend pas la maison intouchable. Le propriétaire peut l’adapter à de nouveaux besoins, à condition que les modifications restent nécessaires et mesurées.',
      'Si la maison ou des travaux ont moins de dix ans, la garantie décennale vous est transmise avec la vente. Réclamez les attestations d’assurance.',
      'Demandez le dossier complet : plans, permis, nom de l’architecte, factures et notices des matériaux et équipements.',
    ],
    sections: [
      {
        title: 'Qu’appelle-t-on une maison d’architecte ?',
        paragraphs: [
          'Le terme n’a pas de définition légale. Il désigne une maison conçue sur mesure par un architecte, par opposition à un modèle de constructeur. Ce qui compte pour l’acheteur, c’est de savoir qui l’a dessinée, quand, et si des documents le prouvent : permis de construire, plans signés, publications.',
          'Une signature reconnue soutient la valeur du bien. Une simple mention « maison d’architecte » dans une annonce, sans nom ni plans, ne prouve rien.',
        ],
      },
      {
        title: 'L’architecte garde-t-il des droits sur la maison ?',
        paragraphs: [
          'Oui, si la maison est une œuvre originale. L’Ordre des architectes le rappelle : l’auteur d’une œuvre architecturale a sur elle, du seul fait de sa création, un droit de propriété incorporelle, avec un droit moral qui comprend le respect de son nom et de son œuvre. Ce droit moral est perpétuel et ne peut pas être cédé : il passe aux héritiers.',
          'Toutes les maisons ne sont pas concernées. L’architecte doit pouvoir établir l’originalité de sa réalisation, c’est-à-dire des choix qui lui sont propres.',
        ],
      },
      {
        title: 'Peut-on quand même faire des travaux ?',
        paragraphs: [
          'Oui. Les tribunaux cherchent un équilibre entre le droit de l’auteur et celui du propriétaire. Le droit moral n’impose pas que l’œuvre reste figée : le propriétaire peut l’adapter à des besoins nouveaux, dans la limite de ce qui est nécessaire et sans la dénaturer.',
          'La loi n’oblige pas à prévenir l’architecte avant des travaux. Mais s’il estime son œuvre dénaturée, lui ou ses héritiers peuvent demander en justice l’arrêt du chantier ou une réparation. Pour une extension, une surélévation ou un changement de façade, le plus sûr est donc de le contacter en amont. C’est souvent aussi le meilleur conseil que vous aurez sur la maison.',
        ],
      },
      {
        title: 'Quelles garanties si la maison est récente ?',
        paragraphs: [
          'Pendant dix ans après la réception des travaux, les constructeurs répondent des dommages graves : ceux qui menacent la solidité de l’ouvrage ou le rendent impropre à son usage. Cette garantie décennale suit la maison : l’acte de vente ne peut pas en priver l’acheteur.',
          'En pratique, le notaire demande au vendeur les attestations d’assurance décennale des entreprises et l’assurance dommages-ouvrage. Si elles manquent, la vente reste possible, mais l’acte le mentionne et le vendeur reste personnellement garant. Sachez-le avant de fixer votre prix.',
        ],
      },
      {
        title: 'Qu’est-ce qui demande plus d’attention qu’ailleurs ?',
        list: [
          'Les grandes baies et les toits plats : étanchéité, isolation, entretien. Demandez les factures des dernières interventions.',
          'Les matériaux peu courants (béton brut, bois, acier, zinc) : leur vieillissement et le coût de leur entretien.',
          'Les équipements sur mesure : menuiseries, chauffage, domotique. Peut-on encore les faire réparer ou remplacer ?',
          'Le confort réel : visitez à plusieurs moments de la journée, et lisez le diagnostic de performance énergétique.',
          'Le terrain et les règles locales : ce que le plan local d’urbanisme permet encore de construire ou d’agrandir.',
        ],
      },
      {
        title: 'Et à la revente ?',
        paragraphs: [
          'Une maison très personnelle plaît beaucoup à peu de gens. Elle peut se vendre vite et bien au bon acheteur, ou attendre longtemps. C’est une raison de plus pour ne pas la dénaturer : ce qui fait sa valeur, c’est la cohérence du dessin d’origine, et le dossier qui le documente.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, pour une maison d’architecte',
      items: [
        'Je connais le nom de l’architecte et l’année de construction, documents à l’appui.',
        'J’ai les plans et le permis de construire, avec la déclaration d’achèvement.',
        'Maison ou travaux de moins de dix ans : j’ai les attestations décennales et la dommages-ouvrage.',
        'J’ai les factures d’entretien de la toiture, des baies et du chauffage.',
        'Je sais ce que je veux modifier, et j’en ai parlé à un architecte.',
      ],
    },
    faq: [
      {
        q: 'L’architecte peut-il m’interdire de modifier ma maison ?',
        a: 'Pas par principe. Vous pouvez l’adapter à vos besoins. Mais si la maison est une œuvre originale et que les travaux la dénaturent, l’architecte ou ses héritiers peuvent saisir le juge. Mieux vaut le consulter avant un projet important.',
      },
      {
        q: 'Dois-je prévenir l’architecte avant de faire des travaux ?',
        a: 'La loi ne l’impose pas. C’est pourtant recommandé pour une extension ou une modification de façade : un accord trouvé en amont évite un litige.',
      },
      {
        q: 'La garantie décennale profite-t-elle à l’acheteur ?',
        a: 'Oui. Elle est attachée à l’ouvrage et se transmet avec la vente, pendant dix ans à compter de la réception des travaux.',
      },
      {
        q: 'Une maison d’architecte se revend-elle bien ?',
        a: 'Cela dépend de sa signature, de son état et de son emplacement. Elle s’adresse à moins d’acheteurs qu’une maison classique, mais ceux-là la cherchent précisément.',
      },
    ],
    sources: [
      { label: 'Ordre des architectes, « Propriété artistique des architectes : le droit moral »', url: 'https://prod.architectes.ows.fr/sites/cnoa/files/2024-11/propriete_artistique_droit_moral_jan_2017.pdf' },
      { label: 'Me Simon Rolin, « Modifier un bâtiment existant : quels risques juridiques avant travaux ? »', url: 'https://consultation.avocat.fr/blog/simon-rolin/article-2983965-architecture-modifier-un-batiment-existant-quels-risques-juridiques-avant-travaux.html' },
      { label: 'Seban Avocats, Le Moniteur, « Le propriétaire d’une œuvre architecturale face à son auteur »', url: 'https://www.seban-associes.avocat.fr/wp-content/uploads/2025/04/Audrey-Lefevre-et-Lucile-Martin-Le-Moniteur-Le-proprietaire-dune-oeuvre-architecturale-face-a-son-auteur.pdf' },
      { label: 'Batiweb, « La garantie des travaux doit être transmise à la vente d’un logement »', url: 'https://www.batiweb.com/actualites/vie-pratique/la-garantie-des-travaux-doit-etre-transmise-a-la-vente-d-un-logement-36481' },
      { label: 'AGN Avocats, « Travaux sans garantie décennale : les risques »', url: 'https://www.agn-avocats.fr/blog/immobilier/garantie-decennale/travaux-sans-garantie-decennale-les-risques-me-sylvain-maury-et-me-chloe-soudan/' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'acheter-un-atelier-d-artiste',
    art: 'loft',
    title: 'Acheter un atelier d’artiste : un lieu de travail, pas toujours un logement',
    description:
      'Verrière, grande hauteur, fond de cour : l’atelier d’artiste fait rêver. Avant d’acheter, vérifiez qu’il est bien un logement aux yeux de la mairie, de la copropriété et de la banque.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Un atelier d’artiste a été construit pour travailler, pas pour habiter : une grande verrière pour la lumière, de la hauteur pour les toiles et les sculptures, souvent au fond d’une cour. C’est ce qui fait son charme. C’est aussi ce qui oblige à poser une question que l’on ne pose jamais pour un appartement : ce lieu est-il officiellement un logement ?',
    takeaways: [
      'Un atelier peut être vendu comme un lieu de vie sans être un logement sur le papier. Trois documents le disent : l’autorisation d’urbanisme, le règlement de copropriété et la déclaration aux impôts.',
      'Transformer un local d’activité en logement est un changement de destination : il faut une déclaration préalable, ou un permis de construire si la façade ou la structure sont modifiées.',
      'En copropriété, habiter un lot décrit comme « atelier » doit être compatible avec le règlement et la destination de l’immeuble.',
      'Si la situation n’est pas régularisée, le financement, l’assurance et la revente se compliquent. Demandez les preuves avant de faire une offre.',
    ],
    sections: [
      {
        title: 'Qu’est-ce qu’un atelier d’artiste ?',
        paragraphs: [
          'C’est un local conçu pour un peintre, un sculpteur ou un photographe. On le reconnaît à sa verrière, souvent tournée vers le nord pour une lumière constante, à sa hauteur sous plafond et à son plan très ouvert. Beaucoup ont été transformés en logements au fil des ventes, parfois avec une mezzanine.',
          'Le mot « atelier » dans une annonce décrit donc un style autant qu’un statut. C’est le statut qu’il faut vérifier.',
        ],
      },
      {
        title: 'Comment savoir si c’est officiellement un logement ?',
        paragraphs: [
          'Trois regards se superposent, et ils ne disent pas toujours la même chose.',
        ],
        list: [
          'La mairie : la destination du local au sens de l’urbanisme. Passer d’un local d’activité à un logement est un changement de destination, qui doit avoir été autorisé.',
          'La copropriété : la désignation du lot dans le règlement et l’état descriptif de division. Un lot peut y figurer comme « atelier » alors qu’il est habité depuis trente ans.',
          'Les impôts : le local doit avoir été déclaré comme habitation. La taxe foncière en donne une première indication.',
        ],
      },
      {
        title: 'Quelle autorisation fallait-il pour le transformer ?',
        paragraphs: [
          'D’après la fiche officielle de Service-Public, transformer un local professionnel en logement suppose une autorisation d’urbanisme : une déclaration préalable quand le changement se fait sans toucher à la façade ni à la structure, un permis de construire dans le cas contraire.',
          'À Paris, la Ville précise qu’elle n’est pas habilitée à se prononcer sur l’usage d’un local : c’est au propriétaire d’en apporter la preuve, par les actes de vente, les baux, le règlement de copropriété, les autorisations d’urbanisme ou les documents fiscaux. Demandez donc au vendeur ce dossier, pas une simple affirmation.',
        ],
      },
      {
        title: 'Et du côté de la copropriété ?',
        paragraphs: [
          'Un copropriétaire peut en principe changer l’affectation de son lot sans vote, à condition de respecter la destination de l’immeuble et les clauses du règlement. Si le changement est contraire à cette destination ou interdit par le règlement, il ne peut être autorisé qu’à l’unanimité, rappelle une réponse ministérielle.',
          'Lisez la désignation exacte du lot. « Atelier », « local », « remise » ou « logement » n’emportent pas les mêmes droits, ni toujours les mêmes charges.',
        ],
      },
      {
        title: 'Que se passe-t-il si rien n’a été régularisé ?',
        list: [
          'La banque peut refuser de financer un bien dont la destination n’est pas l’habitation, ou demander une expertise.',
          'L’assurance habitation suppose un logement : déclarez la situation réelle.',
          'La mairie ou la copropriété peuvent demander une régularisation, qui sera à votre charge une fois propriétaire.',
          'À la revente, votre acheteur posera les mêmes questions que vous.',
        ],
      },
      {
        title: 'Verrière, hauteur, mezzanine : ce qu’il faut regarder en visite',
        list: [
          'La verrière : son âge, son vitrage, son étanchéité. C’est la pièce maîtresse, et le premier poste de dépense.',
          'Le confort : une grande surface vitrée chauffe l’été et refroidit l’hiver. Visitez si possible par temps chaud et par temps froid, et lisez le diagnostic de performance énergétique.',
          'La surface : une mezzanine sous faible hauteur ne compte pas dans la surface officielle. Demandez le mesurage.',
          'La situation : en fond de cour ou en rez-de-chaussée, vérifiez la lumière réelle, l’humidité et le vis-à-vis.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, pour un atelier',
      items: [
        'J’ai l’autorisation d’urbanisme qui a fait de l’atelier un logement, ou la preuve qu’il l’a toujours été.',
        'J’ai lu la désignation du lot dans le règlement de copropriété.',
        'La taxe foncière porte sur un local d’habitation.',
        'Ma banque sait qu’il s’agit d’un ancien atelier.',
        'J’ai fait regarder la verrière par un professionnel.',
        'Je connais la surface officielle, mezzanine exclue.',
      ],
    },
    faq: [
      {
        q: 'Peut-on habiter un atelier d’artiste ?',
        a: 'Oui, s’il a été transformé en logement dans les règles : autorisation d’urbanisme, compatibilité avec le règlement de copropriété et déclaration aux impôts. Sans cela, il reste un local d’activité, même s’il est aménagé.',
      },
      {
        q: 'Faut-il un permis pour transformer un atelier en logement ?',
        a: 'Il faut au moins une déclaration préalable. Un permis de construire est nécessaire si les travaux modifient la façade ou la structure porteuse.',
      },
      {
        q: 'La copropriété peut-elle s’opposer à ce qu’un atelier soit habité ?',
        a: 'Oui, si l’habitation est contraire à la destination de l’immeuble ou interdite par le règlement. Dans ce cas, seul un accord unanime des copropriétaires peut l’autoriser.',
      },
      {
        q: 'Une banque finance-t-elle un atelier d’artiste ?',
        a: 'Oui quand le bien est officiellement un logement. Si sa destination n’a pas été régularisée, le financement devient difficile : faites vérifier ce point avant de déposer votre dossier.',
      },
    ],
    sources: [
      { label: 'Service-Public, « Comment transformer un local professionnel ou commercial en logement ? »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2416' },
      { label: 'Justice.fr, « Transformer un local professionnel ou commercial en logement »', url: 'https://www.justice.fr/fiche/transformer-local-professionnel-commercial-logement' },
      { label: 'Ville de Paris, fiche technique « Comment établir l’usage de mon local ? »', url: 'https://cdn.paris.fr/paris/2025/02/18/1-fiche-technique-paris-fr-comment-etablir-l-usage-de-mon-local-lGtt.pdf' },
      { label: 'Assemblée nationale, réponse ministérielle sur le changement d’affectation d’un lot de copropriété', url: 'https://www.assemblee-nationale.fr/dyn/12/questions/QANR5L12QE35328.pdf' },
      { label: 'Bourse des crédits, « Bien immobilier atypique : les vérifications avant d’acheter »', url: 'https://www.boursedescredits.com/guide-immobilier-atypique-verifications-acheter-6182.php' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'cheminee-a-paris-peut-on-faire-du-feu',
    art: 'charges',
    title: 'Cheminée à Paris : a-t-on encore le droit de faire du feu ?',
    description:
      'Foyer ouvert, insert, feu d’agrément : ce qui est permis à Paris, ce que dit la copropriété, et les vérifications à faire avant d’acheter un bien « avec cheminée ».',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Une cheminée en marbre dans le salon, et l’on s’imagine déjà devant le feu. À Paris, entre ce que montre l’annonce et ce que l’on a le droit d’allumer, il y a trois filtres : la règle sur la qualité de l’air, le règlement de l’immeuble et l’état du conduit. Une cheminée peut être superbe et ne plus jamais servir. Mieux vaut le savoir avant de la compter dans le prix.',
    takeaways: [
      'À Paris, la cheminée à foyer ouvert ne peut pas servir à se chauffer. Seul un feu d’agrément ponctuel, pour le plaisir, peut être toléré, d’après la fiche officielle de Service-Public.',
      'Un insert, un foyer fermé ou un poêle peuvent servir de chauffage, y compris en appoint.',
      'Le règlement de copropriété peut interdire tout feu, même quand la règle générale le permet. C’est le premier document à lire.',
      'Un conduit doit être ramoné au moins une fois par an par un professionnel, qui remet une attestation. Sans elle, l’assurance peut discuter l’indemnisation après un sinistre.',
      'Dans une annonce, « cheminée » ne veut pas dire « cheminée qui fonctionne » : beaucoup de conduits parisiens sont condamnés ou hors d’usage.',
    ],
    sections: [
      {
        title: 'Que dit la règle à Paris ?',
        paragraphs: [
          'Paris et toute l’Île-de-France sont couverts par un plan de protection de l’atmosphère, qui encadre le chauffage au bois. La fiche de Service-Public, vérifiée en mai 2026, le résume ainsi : à Paris et dans de nombreuses communes de la région, l’utilisation des foyers ouverts est interdite, et seuls des feux d’agrément ponctuels peuvent être tolérés.',
          'En clair : on ne chauffe pas son appartement avec une cheminée ouverte. Une flambée occasionnelle, pour le plaisir, reste tolérée. Cette tolérance peut être suspendue lors d’un épisode de pollution, quand la préfecture restreint les feux d’agrément et d’appoint.',
          'Paris ne fait pas partie des communes qui, depuis le 1er novembre 2026, interdisent tout feu en foyer ouvert en permanence. Mais la règle a déjà changé plusieurs fois depuis 2014 : vérifiez-la auprès de la mairie ou de la préfecture au moment de votre achat.',
        ],
      },
      {
        title: 'Foyer ouvert, insert, poêle : quelle différence ?',
        list: [
          'Le foyer ouvert est la cheminée classique, où le bois brûle à l’air libre. Elle chauffe peu et pollue beaucoup : c’est elle que la règle vise.',
          'L’insert ou le foyer fermé est une enceinte vitrée logée dans la cheminée existante. Le rendement est bien meilleur et les émissions plus faibles.',
          'Le poêle, à bois ou à granulés, est un appareil indépendant raccordé à un conduit.',
          'Les cheminées au bioéthanol, électriques ou à vapeur d’eau n’ont pas besoin de conduit et ne relèvent pas de ces règles. Elles décorent plus qu’elles ne chauffent.',
        ],
      },
      {
        title: 'La copropriété peut-elle l’interdire ?',
        paragraphs: [
          'Oui, et c’est fréquent dans les immeubles anciens. Le règlement de copropriété peut interdire l’usage des cheminées, pour limiter le risque d’incendie. Cette interdiction s’impose à vous même si la règle générale tolère le feu d’agrément. La lever suppose de modifier le règlement, ce qui est rarement obtenu.',
          'Les conduits, eux, traversent l’immeuble : ils sont le plus souvent des parties communes, même quand ils ne desservent qu’un seul logement. Tuber un conduit, le rouvrir ou y raccorder un poêle sont donc des travaux à faire autoriser par l’assemblée générale.',
        ],
      },
      {
        title: 'Le conduit fonctionne-t-il encore ?',
        paragraphs: [
          'C’est la vraie question, et l’annonce n’y répond presque jamais. Dans beaucoup d’immeubles parisiens, les conduits ont été bouchés, dévoyés lors de travaux, utilisés pour une chaudière ou une ventilation, ou simplement jamais entretenus depuis des décennies.',
          'Seul un professionnel peut dire si un conduit est utilisable : il vérifie qu’il est libre sur toute sa hauteur et étanche. Si ce n’est pas le cas, la remise en état passe en général par un tubage, à faire autoriser par la copropriété. Demandez un devis avant de vous engager, pas après.',
        ],
      },
      {
        title: 'Ramonage et assurance : quelles obligations ?',
        paragraphs: [
          'Le ramonage est obligatoire au moins une fois par an, et deux fois dans la majorité des départements, dont une pendant la période d’utilisation. Il doit être fait par un ramoneur qualifié, qui remet une attestation à conserver. L’absence de ramonage est punie d’une amende de 450 euros.',
          'L’obligation pèse sur celui qui utilise la cheminée, propriétaire ou locataire. Le syndic se charge des conduits collectifs.',
          'Après un sinistre, l’assureur demande cette attestation. Un feu allumé sans ramonage, ou malgré une interdiction de la copropriété, est une faute qui pèse sur l’indemnisation et sur votre responsabilité envers les voisins.',
        ],
      },
      {
        title: 'Que demander avant d’acheter un bien « avec cheminée » ?',
        list: [
          'La cheminée est-elle utilisée aujourd’hui, et quand a-t-elle servi pour la dernière fois ?',
          'La dernière attestation de ramonage.',
          'Ce que le règlement de copropriété dit des cheminées et des conduits.',
          'Le conduit est-il propre au logement, ou partagé avec d’autres ?',
          'A-t-il été tubé, bouché ou réutilisé pour un autre usage ?',
          'Dans les procès-verbaux d’assemblée générale, toute discussion sur les conduits, un sinistre ou une interdiction des feux.',
        ],
      },
      {
        title: 'Et si elle ne peut plus servir ?',
        paragraphs: [
          'Une cheminée condamnée garde sa valeur décorative : un manteau en marbre ou en pierre structure une pièce et fait partie du caractère du bien. Elle ne justifie simplement pas le même prix qu’une cheminée en état de marche.',
          'Pour retrouver une flamme, deux voies existent. Un insert ou un poêle, si le conduit peut être remis en état et si la copropriété l’autorise. Ou un appareil sans conduit, au bioéthanol ou électrique, qui se pose sans autorisation.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, côté cheminée',
      items: [
        'Je sais si la cheminée fonctionne, ou si elle est seulement décorative.',
        'J’ai lu ce que le règlement de copropriété dit des feux et des conduits.',
        'J’ai la dernière attestation de ramonage, ou je sais qu’il n’y en a pas.',
        'Un professionnel a vérifié le conduit, ou j’ai un devis de remise en état.',
        'Je n’ai pas payé pour une cheminée que je ne pourrai pas allumer.',
      ],
    },
    faq: [
      {
        q: 'Peut-on faire un feu de cheminée à Paris ?',
        a: 'Dans une cheminée ouverte, uniquement un feu d’agrément ponctuel, pour le plaisir : il est toléré, mais la cheminée ne peut pas servir de chauffage. Encore faut-il que le règlement de copropriété ne l’interdise pas et que le conduit soit en état et ramoné.',
      },
      {
        q: 'Un insert est-il autorisé à Paris ?',
        a: 'Oui. Un insert, un foyer fermé ou un poêle peuvent servir de chauffage principal ou d’appoint. En copropriété, le raccordement au conduit doit être autorisé par l’assemblée générale.',
      },
      {
        q: 'La copropriété peut-elle m’interdire d’utiliser ma cheminée ?',
        a: 'Oui, si le règlement de copropriété le prévoit. Cette interdiction est valable et s’applique même à une cheminée située dans votre appartement.',
      },
      {
        q: 'Combien de fois par an faut-il ramoner ?',
        a: 'Au moins une fois par an, et deux fois dans la majorité des départements. Le ramoneur remet une attestation, à garder pour l’assurance.',
      },
      {
        q: 'Une annonce indique « cheminée » : est-elle forcément utilisable ?',
        a: 'Non. Le mot décrit un élément de décor. Demandez par écrit si elle fonctionne, et faites vérifier le conduit par un professionnel avant de vous engager.',
      },
    ],
    sources: [
      { label: 'Service-Public, « À quelles conditions peut-on faire un feu dans une cheminée ou un poêle chez soi ? »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F32437' },
      { label: 'Jechange, « La liste des 657 communes où la cheminée ouverte est interdite cet hiver en France »', url: 'https://www.jechange.fr/energie/gaz/news/cheminee-foyer-ouvert-interdite-carte-657-communes' },
      { label: 'Allianz, « Ramonage obligatoire des conduits de cheminée »', url: 'https://www.allianz.fr/assurance-particulier/habitation-biens/assurance-habitation/conseils-pratiques/ramonage-cheminee-obligatoire.html' },
      { label: 'Tout sur mes finances, « Feux de cheminée : règlementation et interdictions à Paris et en Île-de-France »', url: 'https://www.toutsurmesfinances.com/immobilier/feu-de-cheminee-a-paris-reglementation-et-interdictions-en-ile-de-france.html' },
      { label: 'Kohen Avocats, « Cheminée à foyer ouvert interdite à Paris et à Lille en 2026 »', url: 'https://kohenavocats.com/cheminee-foyer-ouvert-interdit-paris-lille-locataire-proprietaire-que-faire/' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'installer-une-climatisation-sans-autorisation',
    art: 'plans',
    title: 'Peut-on installer une climatisation sans autorisation ?',
    description:
      'Dernier étage, verrière, loft sous les toits : avant de poser une climatisation, deux accords sont presque toujours nécessaires. Ce qu’il faut vérifier avant d’acheter.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 7,
    intro:
      'Un dernier étage, une verrière plein sud, un loft sous les toits : les biens atypiques sont souvent ceux qui chauffent le plus en été. La question de la climatisation arrive donc vite, parfois dès la visite. La réponse tient en une ligne : dès qu’un appareil se voit de l’extérieur ou touche à l’immeuble, il faut des autorisations. Et il vaut mieux savoir avant d’acheter si elles ont une chance d’être accordées.',
    takeaways: [
      'Un climatiseur mobile, sans unité extérieure ni percement, se pose sans rien demander à personne.',
      'Une climatisation avec unité extérieure demande presque toujours deux accords distincts : celui de la copropriété, voté en assemblée générale, et celui de la mairie, par une déclaration préalable de travaux. L’un ne remplace pas l’autre.',
      'Sans autorisation, le risque principal n’est pas l’amende : c’est le démontage de l’appareil et la remise en état de la façade, à vos frais, parfois sous astreinte.',
      'Vous achetez un bien déjà climatisé ? Demandez le vote de l’assemblée générale et la déclaration en mairie. Vous comptez climatiser après l’achat ? Vérifiez la faisabilité avant de faire une offre.',
    ],
    sections: [
      {
        title: 'Tout dépend-il du type d’appareil ?',
        paragraphs: [
          'Oui. Ce qui déclenche les autorisations, ce n’est pas la climatisation elle-même, c’est ce qu’elle change à l’immeuble : un boîtier visible, un mur percé, une fixation sur la façade, le toit ou le garde-corps.',
        ],
        list: [
          'Climatiseur mobile, posé dans la pièce, sans installation fixe : aucune autorisation.',
          'Climatisation « split », avec une unité intérieure et une unité extérieure : c’est le cas qui demande des autorisations, parce que l’unité extérieure se voit et se fixe.',
          'Appareil monobloc sans unité extérieure : plus discret, mais il rejette l’air par deux ouvertures percées dans la façade. Percer un mur extérieur reste un travail soumis à l’accord de la copropriété.',
        ],
      },
      {
        title: 'En copropriété, qui donne l’accord ?',
        paragraphs: [
          'L’assemblée générale, et elle seule. Les travaux qui touchent les parties communes ou l’aspect extérieur de l’immeuble doivent être votés à la majorité des voix de tous les copropriétaires (article 25 b de la loi du 10 juillet 1965). Le syndic ne peut pas autoriser seul : il inscrit votre demande à l’ordre du jour. L’accord oral d’un voisin, du gardien ou d’un membre du conseil syndical ne vaut rien.',
          'La façade, la toiture et le gros œuvre sont des parties communes. Un balcon ou une terrasse, même à usage privatif, se voit de l’extérieur : y poser un boîtier modifie l’aspect de l’immeuble. L’Agence nationale pour l’information sur le logement ne retient qu’une exception : une unité placée sur une partie réellement privative, sans modifier l’aspect extérieur. En pratique, c’est rare.',
          'Lisez aussi le règlement de copropriété : certains interdisent tout appareil en façade ou imposent un emplacement. Et comptez le délai : l’assemblée se réunit en général une fois par an.',
        ],
      },
      {
        title: 'Faut-il aussi une autorisation de la mairie ?',
        paragraphs: [
          'Oui, dès que l’installation modifie l’aspect extérieur du bâtiment. Il s’agit d’une déclaration préalable de travaux (article R. 421-17 du Code de l’urbanisme), gratuite, à déposer avant la pose. La mairie a un mois pour répondre, davantage en secteur protégé.',
          'La règle vaut aussi pour une maison : une unité fixée sur une façade visible se déclare. Le plan local d’urbanisme de la commune, ou le règlement d’un lotissement, peut en plus imposer un emplacement ou un habillage.',
          'Aux abords d’un monument historique ou dans un site patrimonial remarquable, l’architecte des Bâtiments de France donne son avis, et il peut exiger que rien ne soit visible depuis la rue. Une grande partie des centres anciens est concernée.',
        ],
      },
      {
        title: 'Et à Paris ?',
        paragraphs: [
          'La Ville de Paris rappelle la même double règle : accord de la copropriété et autorisation d’urbanisme, avec dans certains cas l’accord de l’architecte des Bâtiments de France. Son plan local d’urbanisme bioclimatique n’interdit pas les climatiseurs, mais il recommande de privilégier les systèmes collectifs.',
          'Dans les faits, une unité visible depuis la rue a peu de chances d’être acceptée sur un immeuble ancien. Les projets qui passent sont ceux qui se cachent : en courette, en toiture derrière un acrotère, dans un local technique.',
        ],
      },
      {
        title: 'Que risque-t-on à installer sans autorisation ?',
        paragraphs: [
          'Du côté de la copropriété, le syndic ou un copropriétaire peut saisir le juge, y compris en urgence. Les tribunaux ordonnent régulièrement la dépose de l’appareil et la remise en état de la façade, aux frais du propriétaire, avec une astreinte par jour de retard : 500 euros par jour dans une décision du tribunal judiciaire de Paris de décembre 2025, 50 euros par jour à Béziers en mars 2026.',
          'Du côté de la mairie, des travaux faits sans déclaration sont une infraction au Code de l’urbanisme, punie d’une amende d’au moins 1 200 euros (article L. 480-4), à laquelle peut s’ajouter l’obligation de remettre les lieux en conformité.',
          'Enfin, le bruit. Une unité extérieure qui gêne les voisins peut être jugée comme un trouble anormal de voisinage, même si elle a été autorisée. Le juge peut alors imposer son déplacement.',
        ],
      },
      {
        title: 'Vous visitez un bien déjà climatisé : que demander ?',
        paragraphs: [
          'Une climatisation en place n’est pas une climatisation autorisée. Si elle a été posée sans vote ni déclaration, l’irrégularité ne reste pas chez le vendeur : c’est à vous que la copropriété ou la mairie s’adressera après la vente. Et l’appareil que vous pensiez acheter avec le bien peut devoir être retiré.',
        ],
        list: [
          'Le procès-verbal de l’assemblée générale qui a autorisé l’installation, avec l’emplacement et le modèle décrits.',
          'La déclaration préalable déposée en mairie et la décision obtenue.',
          'La facture de pose par un professionnel et le contrat d’entretien.',
          'Dans les derniers procès-verbaux, toute plainte d’un voisin sur le bruit ou les écoulements d’eau.',
        ],
      },
      {
        title: 'Vous comptez climatiser après l’achat : que vérifier avant l’offre ?',
        paragraphs: [
          'Ne tenez jamais l’accord pour acquis. Dans un dernier étage ou sous une verrière, la climatisation peut peser sur votre décision d’achat : vérifiez donc sa faisabilité avant de vous engager, pas après.',
        ],
        list: [
          'Le règlement de copropriété : interdit-il les appareils en façade, en toiture ou sur les balcons ?',
          'Les procès-verbaux des trois dernières assemblées : une demande de climatisation a-t-elle déjà été acceptée, ou refusée ?',
          'L’emplacement possible : existe-t-il un endroit invisible depuis la rue et éloigné des fenêtres voisines ?',
          'Le secteur : l’immeuble est-il aux abords d’un monument historique ? La mairie vous le dit.',
          'Le voisinage : d’autres appareils sont-ils déjà installés dans l’immeuble, et l’ont-ils été régulièrement ?',
        ],
      },
      {
        title: 'Et si l’assemblée générale refuse ?',
        paragraphs: [
          'Un refus n’est pas toujours définitif. Vous pouvez représenter un projet amélioré : autre emplacement, appareil plus silencieux, habillage assorti à la façade, engagement de remise en état à votre départ. En dernier recours, la loi permet de demander au tribunal judiciaire d’autoriser des travaux d’amélioration refusés par l’assemblée. C’est long, et l’issue n’est jamais garantie.',
          'Pensez aussi aux solutions qui ne demandent rien à personne, ou presque : stores intérieurs, films solaires posés à l’intérieur, brasseurs d’air, climatiseur mobile pour les semaines les plus chaudes. Les stores extérieurs et les volets, eux, modifient la façade et suivent les mêmes règles qu’une climatisation.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, côté climatisation',
      items: [
        'Bien déjà climatisé : j’ai le vote de l’assemblée générale et la déclaration en mairie.',
        'J’ai lu ce que le règlement de copropriété dit des appareils en façade, en toiture et sur les balcons.',
        'J’ai cherché dans les procès-verbaux les demandes de climatisation acceptées ou refusées.',
        'Je sais si l’immeuble est en secteur protégé.',
        'J’ai repéré un emplacement discret et éloigné des voisins.',
        'Je n’ai pas compté la climatisation comme acquise dans mon budget ni dans ma décision.',
      ],
    },
    faq: [
      {
        q: 'Puis-je installer une clim sans autorisation ?',
        a: 'Seulement un climatiseur mobile, sans unité extérieure ni percement. Dès qu’un boîtier se voit de l’extérieur ou qu’un mur est percé, il faut l’accord de l’assemblée générale en copropriété et, le plus souvent, une déclaration préalable en mairie.',
      },
      {
        q: 'Le syndic peut-il m’autoriser à poser une climatisation ?',
        a: 'Non. Seule l’assemblée générale peut autoriser des travaux qui touchent les parties communes ou l’aspect extérieur de l’immeuble, à la majorité des voix de tous les copropriétaires. Le syndic inscrit la question à l’ordre du jour.',
      },
      {
        q: 'Mon balcon est privatif : puis-je y poser l’unité extérieure ?',
        a: 'Pas sans accord dans la plupart des cas. Un boîtier posé sur un balcon se voit de l’extérieur et modifie l’aspect de l’immeuble : le vote de l’assemblée générale et la déclaration en mairie restent nécessaires.',
      },
      {
        q: 'Le vendeur a posé une clim sans autorisation : est-ce mon problème ?',
        a: 'Oui, une fois que vous êtes propriétaire. La copropriété ou la mairie peut vous demander de la retirer et de remettre la façade en état. Demandez au vendeur de régulariser avant la vente, ou faites décrire la situation dans la promesse.',
      },
      {
        q: 'Un locataire peut-il installer une climatisation ?',
        a: 'Un appareil mobile, oui. Pour une installation fixe, il lui faut l’accord écrit du propriétaire, qui doit lui-même obtenir celui de la copropriété. Sans cela, le bailleur peut exiger la remise en état.',
      },
    ],
    sources: [
      { label: 'ANIL, « Copropriété : je souhaite installer une climatisation, est-ce possible ? »', url: 'https://www.anil.org/parole-expert-logement-copropriete-installation-climatisation/' },
      { label: 'Ville de Paris, « Volets, stores, climatiseurs… Quelles sont les règles à respecter avant toute installation ? »', url: 'https://www.paris.fr/pages/volets-stores-climatiseurs-quelles-sont-les-regles-a-respecter-avant-toute-installation-35881' },
      { label: 'Assemblée nationale, réponse ministérielle sur la climatisation en copropriété', url: 'https://questions.assemblee-nationale.fr/dyn/12/questions/QANR5L12QE47384.pdf' },
      { label: 'Novlaw Avocats, « Autorisation d’urbanisme et installation d’une climatisation »', url: 'https://novlaw.fr/ressource/autorisation-urbanisme-installation-climatisation' },
      { label: 'Kohen Avocats, « Pose de climatisation sans autorisation : mairie, copropriété et recours »', url: 'https://kohenavocats.fr/2026/05/06/pose-climatisation-sans-autorisation-mairie-copropriete-recours-2026/' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'negocier-le-prix-d-un-bien-atypique',
    art: 'negociation',
    title: 'Négocier un bien atypique : sur quoi s’appuyer quand rien ne lui ressemble',
    description:
      'Un loft ou un atelier d’artiste n’a pas de prix au mètre carré de référence. Les arguments qui pèsent vraiment dans une négociation, ceux qui ne pèsent rien, et le bon moment pour parler prix.',
    category: 'Visite et négociation',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 7,
    intro:
      'Pour un trois-pièces classique, la négociation tient en une phrase : « le voisin s’est vendu moins cher ». Pour un atelier sous verrière ou un dernier étage avec terrasse, il n’y a pas de voisin. Le vendeur le sait, et il en joue. On négocie pourtant un bien atypique comme les autres, à condition de changer d’arguments : moins de moyennes, plus de faits.',
    takeaways: [
      'Le prix au mètre carré du quartier est un repère, pas un argument : un bien rare ne se compare pas à la moyenne.',
      'Ce qui pèse : l’ancienneté de l’annonce, les baisses déjà consenties, les travaux chiffrés par un devis, les charges, le DPE, ce qui n’est pas compté dans la surface.',
      'Ce qui ne pèse rien : « c’est cher », « j’ai vu moins cher ailleurs », un rabais demandé sans raison.',
      'Un dossier de financement prêt vaut souvent plus qu’un argument : le vendeur choisit l’acheteur qui ira au bout.',
    ],
    sections: [
      {
        title: 'Pourquoi le prix au mètre carré ne suffit-il pas ?',
        paragraphs: [
          'Parce qu’il mélange tout. La moyenne d’un quartier additionne des rez-de-chaussée sur cour et des derniers étages, des biens refaits et des biens à reprendre. Un atelier d’artiste de cinq mètres sous plafond n’entre dans aucune de ces cases.',
          'Un bien atypique se vend plus cher que la moyenne pour ce qu’il a de rare, et parfois moins cher pour ce qu’il a de compliqué : une surface officielle réduite par des sous-pentes, un DPE médiocre, une copropriété qui n’a pas tout autorisé. La négociation porte sur ce second volet, jamais sur le premier.',
        ],
      },
      {
        title: 'Quels faits pèsent vraiment ?',
        paragraphs: ['Ceux que le vendeur ne peut pas contester, parce qu’ils sont écrits quelque part.'],
        list: [
          'La date de mise en vente. Un bien en ligne depuis plusieurs mois n’a pas trouvé preneur à ce prix : c’est le marché qui parle, pas vous.',
          'Les baisses de prix déjà faites. Elles montrent que le vendeur a commencé à bouger, et dans quelles proportions.',
          'Les ventes réelles autour du bien, publiées par l’administration. Elles donnent un plancher et un plafond, même imparfaits.',
          'Les travaux à prévoir, chiffrés par un devis d’entreprise. Un devis se discute, une impression non.',
          'Les travaux votés ou annoncés dans l’immeuble : ravalement, toiture, ascenseur. Ils figurent dans les procès-verbaux d’assemblée générale.',
          'L’écart entre la surface au sol et la surface officielle. Une mezzanine ou des combles non comptés ne se paient pas au prix du reste.',
          'Le DPE, surtout si le bien est classé F ou G et que vous pourriez vouloir le louer un jour.',
        ],
      },
      {
        title: 'Et ce qui fait le charme du bien, peut-on le négocier ?',
        paragraphs: [
          'Non, et il ne faut pas essayer. La verrière, la hauteur, la terrasse sont précisément ce que le vendeur fait payer. Les critiquer vous fait passer pour un acheteur qui n’aime pas le bien, donc qui n’achètera pas.',
          'En revanche, vous pouvez négocier ce que ce charme coûte. Une verrière ancienne à simple vitrage, c’est un devis de remplacement. Une terrasse dont vous n’avez que la jouissance, c’est un droit moins solide qu’une propriété. Dites ce que vous aimez, puis chiffrez ce qui reste à faire.',
        ],
      },
      {
        title: 'À quel moment parler prix ?',
        paragraphs: [
          'Pas pendant la première visite. Vous n’avez pas encore les documents, et le négociateur n’a rien à transmettre au vendeur. Visitez, posez vos questions, demandez les pièces : procès-verbaux, diagnostics, relevé de charges, plans.',
          'Revenez une seconde fois si le bien vous plaît, avec un artisan ou un architecte si des travaux sont en jeu. C’est après cette seconde visite, pièces en main, que votre prix aura une raison. Il se formule alors par écrit, dans une offre d’achat.',
        ],
      },
      {
        title: 'Quel rôle joue le négociateur de l’agence ?',
        paragraphs: [
          'Il travaille pour le vendeur, mais son intérêt est que la vente se fasse. Il connaît ce que vous ne savez pas : depuis quand le vendeur veut vendre, s’il a déjà refusé une offre, s’il a un autre achat en cours.',
          'Demandez-le-lui simplement. Une offre argumentée, qu’il peut défendre devant son client ligne par ligne, a plus de chances d’aboutir qu’un chiffre lancé au téléphone.',
        ],
      },
      {
        title: 'Jusqu’où peut-on descendre ?',
        paragraphs: [
          'Il n’existe pas de pourcentage magique. Un bien juste, arrivé la semaine dernière, se vend au prix, parfois à plusieurs acheteurs à la fois. Un bien affiché trop haut depuis six mois se négocie nettement.',
          'Fixez-vous deux chiffres avant de discuter : le prix que vous proposez, justifié poste par poste, et celui que vous ne dépasserez pas. Et gardez en tête qu’un bien rare ne revient pas toutes les semaines : perdre un coup de cœur pour une somme que vous auriez pu payer est aussi une mauvaise affaire.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de proposer un prix',
      items: [
        'La date de mise en vente et les baisses de prix déjà faites.',
        'Deux ou trois ventes réelles récentes dans la rue ou le quartier.',
        'La surface officielle, et ce qui n’y est pas compté.',
        'Un devis pour les travaux que vous jugez nécessaires.',
        'Les trois derniers procès-verbaux d’assemblée générale.',
        'Le DPE complet et le montant des charges.',
        'Une simulation de financement ou un accord de principe de votre banque.',
      ],
    },
    faq: [
      {
        q: 'Peut-on négocier un bien qui vient d’être mis en vente ?',
        a: 'Oui, mais avec des faits : travaux chiffrés, surface, charges. Sans argument, un vendeur dont l’annonce a trois jours attendra l’acheteur suivant.',
      },
      {
        q: 'Faut-il annoncer son budget au négociateur ?',
        a: 'Indiquez que votre financement est prêt, pas votre plafond. Le montant que vous pouvez payer n’est pas un argument de prix.',
      },
      {
        q: 'Une offre très basse fait-elle perdre le bien ?',
        a: 'Elle peut. Un vendeur qui se sent mal considéré ne répond plus, même à une seconde offre. Mieux vaut un prix expliqué qu’un prix testé.',
      },
      {
        q: 'Les honoraires d’agence se négocient-ils ?',
        a: 'Ils figurent dans le mandat signé avec le vendeur. C’est le prix global que vous négociez : l’agence et le vendeur s’arrangent ensuite entre eux.',
      },
    ],
    sources: [
      { label: 'Explorateur des ventes immobilières (données DVF, Etalab)', url: 'https://app.dvf.etalab.gouv.fr/' },
      { label: 'Justice.fr, « Offre d’achat d’un bien immobilier »', url: 'https://www.justice.fr/fiche/offre-achat-bien-immobilier' },
    ],
  },
  {
    slug: 'ventes-reelles-du-quartier-dvf',
    art: 'ventes',
    title: 'Combien se sont vendus les biens du quartier ? Lire les ventes réelles, et leurs limites',
    description:
      'L’administration publie le prix de toutes les ventes immobilières des cinq dernières années. Comment consulter cette base, ce qu’elle dit d’un bien atypique et ce qu’elle ne dit pas.',
    category: 'Marché',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Le prix affiché sur une annonce est celui que le vendeur espère. Le prix payé, lui, est connu : chaque vente passe chez le notaire, et l’administration fiscale publie ces montants. Tout le monde peut les consulter, gratuitement, adresse par adresse. Encore faut-il savoir les lire, surtout quand le bien qui vous intéresse ne ressemble à aucun autre.',
    takeaways: [
      'La base « Demandes de valeurs foncières », ou DVF, recense les ventes des cinq dernières années, avec leur prix, leur date et leur adresse.',
      'Elle est mise à jour deux fois par an, en avril et en octobre : les ventes les plus récentes n’y sont pas encore.',
      'Elle ne dit rien de l’étage, de l’état, de la hauteur sous plafond ni de la terrasse. Pour un bien atypique, c’est l’essentiel qui manque.',
      'Elle sert à situer un prix dans une fourchette, pas à fixer la valeur d’un loft.',
    ],
    sections: [
      {
        title: 'D’où viennent ces chiffres ?',
        paragraphs: [
          'Des actes de vente eux-mêmes. La base est produite par la Direction générale des finances publiques à partir des actes notariés et du cadastre, puis publiée en accès libre.',
          'Elle couvre la France entière, à l’exception de l’Alsace, de la Moselle et de Mayotte, dont les ventes sont enregistrées autrement.',
        ],
      },
      {
        title: 'Comment la consulter ?',
        paragraphs: [
          'Le plus simple est l’explorateur en ligne mis à disposition par l’État : une carte, sur laquelle on choisit une commune, puis une parcelle. Chaque vente s’affiche avec sa date, son prix, le type de bien, sa surface et son nombre de pièces.',
          'Le site des impôts propose aussi, depuis votre espace personnel, un service de recherche des transactions immobilières, avec des critères plus fins.',
        ],
      },
      {
        title: 'Que dit la base, exactement ?',
        list: [
          'La date de la vente et le prix net vendeur inscrit dans l’acte.',
          'L’adresse et la parcelle.',
          'Le type de local : maison, appartement, dépendance, local commercial ou industriel.',
          'La surface bâtie et le nombre de pièces principales.',
          'Pour une maison, la surface du terrain.',
        ],
      },
      {
        title: 'Que ne dit-elle pas ?',
        paragraphs: ['Tout ce qui fait le prix d’un bien atypique.'],
        list: [
          'L’étage, l’exposition, la vue, la présence d’un ascenseur.',
          'La hauteur sous plafond, la verrière, la mezzanine.',
          'La terrasse, le balcon, le jardin d’un appartement.',
          'L’état du bien au moment de la vente : refait à neuf ou à reprendre entièrement.',
          'Le classement énergétique.',
        ],
      },
      {
        title: 'Quels pièges pour un bien atypique ?',
        paragraphs: [
          'Le premier tient au type de local. Un ancien atelier ou une ancienne boutique devenu logement peut encore figurer comme local commercial ou industriel. Si vous ne regardez que les appartements, vous ne le verrez pas.',
          'Le deuxième tient aux ventes groupées. Quand un acte porte sur plusieurs lots, un appartement, une cave, un parking, parfois deux logements réunis, la base n’affiche qu’un prix global. Divisé par la surface d’un seul lot, il donne un prix au mètre carré absurde.',
          'Le troisième tient à la surface. Celle de la base est la surface bâtie déclarée. Elle ne correspond pas toujours à la surface Carrez de l’annonce, encore moins quand il y a des sous-pentes ou une mezzanine.',
        ],
      },
      {
        title: 'Comment s’en servir intelligemment ?',
        paragraphs: [
          'Cherchez d’abord dans l’immeuble et dans la rue, sur deux ou trois ans. Regardez ensuite les ventes de biens de surface proche dans le quartier. Écartez les valeurs extrêmes : un prix très bas cache souvent une vente en famille, un bien occupé ou un lot en mauvais état.',
          'Vous obtenez une fourchette, pas une valeur. Elle vous dit si le prix demandé est dans le haut, dans le bas ou très au-dessus de ce qui s’est payé autour. C’est un point de départ pour la discussion, à compléter par ce que la base ignore : l’état, la rareté, les travaux.',
        ],
      },
    ],
    checklist: {
      title: 'Votre recherche, pas à pas',
      items: [
        'Les ventes dans l’immeuble lui-même, sur cinq ans.',
        'Les ventes dans la rue et les rues voisines, sur deux à trois ans.',
        'Les biens de surface comparable, à plus ou moins un quart près.',
        'Les locaux commerciaux ou industriels, si le bien est une ancienne activité.',
        'Les ventes à plusieurs lots, à mettre de côté.',
        'Le prix le plus bas et le plus haut, une fois les extrêmes écartés.',
      ],
    },
    faq: [
      {
        q: 'La consultation est-elle payante ?',
        a: 'Non. La base et l’explorateur en ligne sont gratuits et ouverts à tous, sans inscription.',
      },
      {
        q: 'Pourquoi une vente récente n’apparaît-elle pas ?',
        a: 'La base est mise à jour en avril et en octobre. Une vente signée il y a quelques mois peut ne pas y figurer encore.',
      },
      {
        q: 'Le prix affiché comprend-il les frais de notaire ?',
        a: 'Non. C’est le prix inscrit dans l’acte, hors frais d’acquisition.',
      },
      {
        q: 'Peut-on savoir combien le vendeur a payé son bien ?',
        a: 'Oui, s’il l’a acheté au cours des cinq dernières années : la vente figure à son adresse. Gardez en tête qu’il a pu faire des travaux depuis.',
      },
    ],
    sources: [
      { label: 'data.gouv.fr, « Demandes de valeurs foncières (DVF) »', url: 'https://www.data.gouv.fr/datasets/demandes-de-valeurs-foncieres/' },
      { label: 'Explorateur des ventes immobilières (données DVF, Etalab)', url: 'https://app.dvf.etalab.gouv.fr/' },
    ],
  },
  {
    slug: 'offre-d-achat-ce-qui-vous-engage',
    art: 'offre',
    title: 'Offre d’achat : ce qui vous engage, ce qui vous protège',
    description:
      'Forme, contenu, durée de validité, conditions suspensives : comment rédiger une offre d’achat pour un bien atypique, ce qu’elle vous engage à faire et ce que le vendeur peut répondre.',
    category: 'Visite et négociation',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Vous avez visité deux fois, vous avez les documents, vous avez votre prix. Reste à l’écrire. L’offre d’achat tient en une page, mais elle n’est pas un simple courrier : si le vendeur l’accepte, vous êtes engagé. Pour un bien atypique, où tant de choses restent à vérifier, les conditions que vous y inscrivez comptent autant que le chiffre.',
    takeaways: [
      'Une offre écrite et acceptée engage les deux parties : le vendeur doit vendre, et vous devez aller jusqu’à la promesse de vente.',
      'Elle doit indiquer le bien, le prix proposé, sa date et sa durée de validité, en général une à deux semaines.',
      'Aucune somme ne peut vous être demandée à ce stade : un versement rend l’offre nulle.',
      'Votre droit de rétractation de dix jours ne commence qu’après la signature de la promesse ou du compromis.',
    ],
    sections: [
      {
        title: 'Une offre d’achat, qu’est-ce que c’est ?',
        paragraphs: [
          'Un écrit par lequel vous proposez d’acheter un bien précis à un prix précis. Il est adressé au vendeur ou à l’agence, par courrier recommandé ou par e-mail.',
          'L’offre doit être ferme : vous vous engagez à acheter si le vendeur dit oui. Une formule comme « je serais intéressé autour de tel prix » n’est pas une offre, et n’oblige personne à vous répondre.',
        ],
      },
      {
        title: 'Que doit-elle contenir ?',
        list: [
          'La désignation du bien : adresse, étage, numéro de lot si vous le connaissez, surface.',
          'Le prix que vous proposez, en précisant s’il comprend les honoraires d’agence.',
          'La date de l’offre et sa durée de validité.',
          'Votre mode de financement : apport, montant du prêt, ou achat sans prêt.',
          'Les conditions auxquelles vous achetez.',
        ],
      },
      {
        title: 'Quelles conditions prévoir pour un bien atypique ?',
        paragraphs: [
          'La condition d’obtention du prêt est la plus connue. Pour un bien qui a été transformé, d’autres méritent d’être écrites dès l’offre, afin qu’elles soient reprises dans la promesse de vente.',
        ],
        list: [
          'La remise des autorisations de travaux : accord de la copropriété, déclaration ou permis en mairie.',
          'La confirmation que le bien est bien un logement, s’il s’agit d’un ancien local d’activité.',
          'La confirmation de la surface Carrez par un mesurage récent.',
          'La remise des procès-verbaux d’assemblée générale et du relevé de charges.',
          'Le titre qui fonde l’usage de la terrasse ou du jardin : propriété ou droit de jouissance.',
        ],
      },
      {
        title: 'Combien de temps l’offre est-elle valable ?',
        paragraphs: [
          'Le temps que vous indiquez. Une à deux semaines est l’usage : assez pour que le vendeur réfléchisse, pas assez pour qu’il s’en serve afin de faire monter un autre acheteur.',
          'Passé ce délai sans réponse, l’offre tombe d’elle-même. Si vous n’écrivez aucune durée, c’est un juge qui l’apprécierait en cas de litige : mieux vaut ne pas laisser ce point ouvert.',
        ],
      },
      {
        title: 'Que peut répondre le vendeur ?',
        list: [
          'Accepter, par écrit. Il est alors engagé à vous vendre à ce prix et doit cesser les visites.',
          'Faire une contre-proposition. Votre offre initiale disparaît : libre à vous d’accepter le nouveau prix, d’en proposer un autre ou d’en rester là.',
          'Ne pas répondre. À la fin du délai, vous êtes libre.',
        ],
      },
      {
        title: 'Peut-on revenir sur une offre ?',
        paragraphs: [
          'Tant que le vendeur ne l’a pas reçue, oui. Une fois qu’il l’a acceptée, vous êtes tenu de poursuivre jusqu’à l’avant-contrat.',
          'C’est après la signature de la promesse ou du compromis de vente que la loi vous donne dix jours pour changer d’avis, sans avoir à vous justifier. Le vendeur, lui, n’a pas ce droit.',
        ],
      },
      {
        title: 'Faut-il offrir le prix affiché ?',
        paragraphs: [
          'Une offre au prix de l’annonce, sans condition inhabituelle, place le vendeur dans une situation où il lui est difficile de refuser, surtout si le bien est vendu par une agence mandatée à ce prix. Sur un bien rare et très demandé, c’est souvent ce qui fait la différence.',
          'Une offre en dessous doit être expliquée : joignez-y vos raisons, en quelques lignes, devis et ventes comparables à l’appui.',
        ],
      },
    ],
    checklist: {
      title: 'Votre offre, relue avant envoi',
      items: [
        'Le bien est désigné sans ambiguïté.',
        'Le prix est écrit en chiffres et en lettres, honoraires précisés.',
        'La durée de validité est indiquée, avec une date et une heure de fin.',
        'Le financement est décrit, et la condition de prêt mentionnée si vous empruntez.',
        'Les conditions propres au bien sont listées.',
        'Aucune somme n’est versée.',
        'L’offre est datée, signée et envoyée par un moyen qui laisse une trace.',
      ],
    },
    faq: [
      {
        q: 'Une offre faite à l’oral engage-t-elle ?',
        a: 'Elle est très difficile à prouver. Faites toujours une offre écrite, et demandez une acceptation écrite.',
      },
      {
        q: 'L’agence peut-elle demander un chèque avec l’offre ?',
        a: 'Non. La loi interdit tout versement à ce stade, et un versement rend l’offre nulle. Le dépôt de garantie se verse à la signature de la promesse de vente.',
      },
      {
        q: 'Peut-on faire des offres sur plusieurs biens à la fois ?',
        a: 'C’est risqué : si deux vendeurs acceptent, vous êtes engagé deux fois. Attendez la fin de validité d’une offre avant d’en faire une autre.',
      },
      {
        q: 'Le vendeur peut-il accepter une offre plus élevée après avoir accepté la mienne ?',
        a: 'Non. Une fois son acceptation donnée par écrit, il est engagé envers vous. En cas de refus, vous pouvez demander au juge l’exécution de la vente ou des dommages et intérêts.',
      },
    ],
    sources: [
      { label: 'Justice.fr, « Offre d’achat d’un bien immobilier »', url: 'https://www.justice.fr/fiche/offre-achat-bien-immobilier' },
      {
        label: 'Notaires de France, « La promesse de vente et le compromis de vente »',
        url: 'https://www.notaires.fr/fr/immobilier-fiscalit%C3%A9/achat-et-vente-les-%C3%A9tapes/la-promesse-de-vente-et-le-compromis-de-vente',
      },
    ],
  },
  {
    slug: 'lire-une-annonce-de-bien-atypique',
    art: 'annonce',
    title: 'Lire une annonce avant de visiter : ce que disent les mots, les photos et les chiffres',
    description:
      'Surface, étage, charges, DPE, photos au grand-angle, formules flatteuses : comment lire l’annonce d’un bien atypique, repérer ce qui manque et préparer ses questions avant la visite.',
    category: 'Visite et négociation',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Une annonce est écrite pour donner envie, et celle d’un bien atypique y parvient sans effort : une verrière, une lumière, un volume. Elle contient aussi, pour qui sait lire, presque tout ce qu’il faut pour décider si la visite vaut le déplacement. Ce qui est écrit compte. Ce qui ne l’est pas compte davantage.',
    takeaways: [
      'Une annonce publiée par un professionnel doit indiquer le prix, qui paie les honoraires, le DPE et, en copropriété, le nombre de lots et le montant des charges.',
      'Demandez toujours de quelle surface on parle : surface Carrez, surface au sol ou surface « ressentie ».',
      'Une pièce absente des photos est une question à poser.',
      'Les mots flatteurs ont un sens : « à rafraîchir », « potentiel », « esprit loft » se traduisent.',
    ],
    sections: [
      {
        title: 'Quels chiffres doivent figurer sur l’annonce ?',
        paragraphs: ['Quand le bien est proposé par une agence, la réglementation impose un minimum d’informations. Leur absence est déjà un renseignement.'],
        list: [
          'Le prix, et la mention de qui paie les honoraires. S’ils sont à la charge de l’acheteur, leur pourcentage et le prix hors honoraires.',
          'Les deux étiquettes du DPE et une estimation de la dépense annuelle d’énergie. Pour un bien classé F ou G, la mention « logement à consommation énergétique excessive ».',
          'En copropriété : le nombre de lots de l’immeuble, le montant moyen des charges annuelles, et l’existence d’une procédure si la copropriété est en difficulté.',
          'L’adresse du site public où consulter les risques auxquels le bien est exposé.',
        ],
      },
      {
        title: 'De quelle surface parle-t-on ?',
        paragraphs: [
          'C’est la première question pour un bien atypique. La surface Carrez ne compte que les parties d’au moins 1,80 mètre de hauteur. Une mezzanine basse, des combles, une sous-pente n’y entrent pas.',
          'Certaines annonces affichent la surface au sol, d’autres les deux, d’autres encore une formule comme « 120 m² ressentis ». Seule la surface Carrez figure dans l’acte et sert à comparer les prix. Notez les deux chiffres, et l’origine de l’écart.',
        ],
      },
      {
        title: 'Que regarder sur les photos ?',
        list: [
          'Ce qui manque. Pas de photo de la salle de bains, de la cuisine ou de la chambre : demandez pourquoi.',
          'Les fenêtres. Leur taille, leur nombre, ce qu’on voit au travers. Une pièce photographiée volets fermés ou rideaux tirés cache souvent un vis-à-vis.',
          'L’heure de la prise de vue. Un séjour baigné de soleil ne dit pas son exposition : demandez-la.',
          'Les plafonds et les angles des murs, où se lisent les traces d’humidité.',
          'Le grand-angle. Il agrandit tout : fiez-vous au plan, pas à l’impression de profondeur.',
          'Les radiateurs et les vitrages, qui renseignent sur le chauffage et l’isolation.',
        ],
      },
      {
        title: 'Que veulent dire les formules ?',
        list: [
          '« À rafraîchir » : peintures et sols à refaire, au minimum.',
          '« Beau potentiel », « à personnaliser » : travaux importants à prévoir.',
          '« Esprit loft », « style atelier » : un appartement aménagé dans ce goût, pas un ancien atelier.',
          '« Souplex » : une partie du logement est en sous-sol. Demandez quelle surface y est comptée.',
          '« Au calme sur cour » : pas de vue, et une lumière à vérifier.',
          '« Dernier étage » sans autre précision : demandez s’il y a un ascenseur, et à quel étage il s’arrête.',
          '« Terrasse » : demandez si elle est une propriété ou un droit de jouissance.',
        ],
      },
      {
        title: 'Le plan est-il fourni ?',
        paragraphs: [
          'Demandez-le s’il ne l’est pas. Dans un bien atypique, le plan montre ce que les photos escamotent : la forme réelle des pièces, les hauteurs, l’emplacement des fenêtres, la place de l’escalier, la part de la surface située sous une pente ou en sous-sol.',
          'Un plan coté, avec les hauteurs sous plafond, vous évitera plus d’une visite inutile.',
        ],
      },
      {
        title: 'Que dit la vie de l’annonce ?',
        paragraphs: [
          'Sa date de mise en ligne et ses changements de prix. Un bien présent depuis longtemps, ou retiré puis republié, a une histoire : un prix trop haut, une vente qui a échoué, un défaut que les visiteurs ont vu.',
          'Posez la question au négociateur, sans détour. La réponse vous servira pour la visite comme pour la négociation.',
        ],
      },
    ],
    checklist: {
      title: 'À noter avant d’appeler',
      items: [
        'La surface annoncée, et laquelle.',
        'L’étage, l’ascenseur, l’exposition.',
        'Le montant des charges et de la taxe foncière.',
        'Les deux lettres du DPE.',
        'Les pièces absentes des photos.',
        'La date de mise en vente et les baisses de prix.',
        'Le plan, à demander s’il manque.',
      ],
    },
    faq: [
      {
        q: 'L’adresse exacte doit-elle figurer sur l’annonce ?',
        a: 'Non. Le quartier ou l’arrondissement suffit. L’agence vous communique l’adresse avant la visite.',
      },
      {
        q: 'Une annonce sans DPE est-elle régulière ?',
        a: 'Le DPE doit figurer sur l’annonce d’un logement. S’il est indiqué « en cours », demandez la date prévue : c’est une information dont vous avez besoin avant de faire une offre.',
      },
      {
        q: 'Peut-on se fier à la surface de l’annonce ?',
        a: 'Elle est indicative. La surface qui engage le vendeur est celle de la promesse de vente, mesurée selon la loi Carrez pour un lot de copropriété.',
      },
      {
        q: 'Pourquoi le même bien apparaît-il à des prix différents ?',
        a: 'Il peut être confié à plusieurs agences, avec des honoraires différents, ou avoir changé de prix sans que toutes les annonces soient à jour. Demandez le prix en vigueur.',
      },
    ],
    sources: [
      {
        label: 'UNIS, « Tableau récapitulatif des mentions obligatoires sur les annonces de vente » (février 2026)',
        url: 'https://www.unis-immo.fr/app/uploads/2026/02/tableau-annonces-ventes-mentions-obligatoires-090226-2.pdf',
      },
      {
        label: 'Institut national de la consommation, « Ventes immobilières : le contenu minimal des annonces publiées par un professionnel »',
        url: 'https://www.inc-conso.fr/content/ventes-immobilieres-le-contenu-minimal-des-annonces-publiees-par-un-professionnel',
      },
      { label: 'FNAIM, « Décrypter une annonce immobilière »', url: 'https://www.fnaim.fr/3985-decrypter-une-annonce-immobiliere.htm' },
      { label: 'FNAIM, « Loi Carrez : explications et mode de calcul »', url: 'https://www.fnaim.fr/4116-loi-carrez-explications-et-mode-de-calcul.htm' },
    ],
  },
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

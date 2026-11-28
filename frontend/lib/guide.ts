// « Le guide » : articles pour l'acheteur d'un bien atypique.
// Un article n'apparaît sur le site qu'à partir de sa date de publication : on peut donc en écrire
// plusieurs à l'avance, ils se mettent en ligne tout seuls, semaine après semaine.

// Les rubriques d'État des lieux, dans l'ordre où elles s'affichent
export const GUIDE_RUBRICS = [
  { name: 'Marché', anchor: 'marche', intro: 'Les prix, les taux, les délais : où en est le marché.' },
  { name: 'Actu réseau', anchor: 'reseau', intro: 'Agences et réseaux : ce qui bouge chez les professionnels de l’atypique et du caractère.' },
  { name: 'Visite et négociation', anchor: 'visite', intro: 'Les bonnes questions, au bon moment.' },
  { name: 'Types de biens', anchor: 'types', intro: 'Souplex, loft, péniche, duplex : ce que chacun a de particulier.' },
  { name: 'Surfaces et travaux', anchor: 'technique', intro: 'Ce qui est compté, ce qui a été transformé, ce que le bien consomme.' },
  { name: 'Copropriété', anchor: 'copropriete', intro: 'Les règles de l’immeuble et ce qu’il coûte à vivre.' },
  { name: 'Financement', anchor: 'financement', intro: 'Le crédit, l’assurance, le dossier.' },
  { name: 'Insolite', anchor: 'insolite', intro: 'Avion, phare, château d’eau : ils ont choisi d’habiter ailleurs.' },
  // « Hors norme » : les ventes dont on parle (biens extravagants, biens liés à une personnalité). Synthèses de la presse, sources citées,
  // prix demandé donné comme un fait, sans avis. Pas d'adresse précise pour la résidence actuelle d'une personne vivante.
  { name: 'Hors norme', anchor: 'hors-norme', intro: 'Ateliers de peintres, maisons de célébrités, biens extravagants : les ventes dont on parle.' },
  // « À l’étranger » : ce qui se fait hors de France. Synthèses, sources citées, chiffres dans leur unité et leur monnaie d'origine.
  { name: 'À l’étranger', anchor: 'etranger', intro: 'Reconversions, habitat sur l’eau, ventes publiques : ce qui se fait ailleurs, sources à l’appui.' },
] as const;
export type GuideRubric = (typeof GUIDE_RUBRICS)[number]['name'];

export interface GuideSection {
  title: string; // intertitre, de préférence sous forme de question
  paragraphs?: string[];
  list?: string[];
}

export interface GuideArticle {
  slug: string;
  art: 'souplex' | 'loft' | 'plans' | 'peniche' | 'mezzanine' | 'visite' | 'terrasse' | 'dpe' | 'credit' | 'duplex' | 'charges' | 'marche' | 'negociation' | 'ventes' | 'offre' | 'annonce' | 'horsmarche' | 'temps' | 'revendre' | 'atypique' | 'mur' | 'monument' | 'architecte' | 'clim' | 'verriere' | 'eglise' | 'atelier' | 'meuble' | 'amiante' | 'bureau' | 'cheminee' | 'assurance' | 'conditions' | 'hotel' | 'dernieretage' | 'chauffage' | 'surelever' | 'plateforme' | 'balance' | 'vue' | 'hauteur' | 'garage' | 'veranda' | 'voieprivee' | 'ascenseur' | 'expertise' | 'rdc' | 'chambres' | 'bruit' | 'division' | 'moulin' | 'loge' | 'spa' | 'plusieurs' | 'cave' | 'avion' | 'souterrain' | 'train' | 'phare' | 'arbre' | 'silo' | 'ile' | 'cabane' | 'paquebot' | 'dome' | 'troglo' | 'chateaudeau' | 'conteneur' | 'yourte' | 'van' | 'bunker' | 'prison' | 'tiny' | 'bulle' | 'wagon' | 'flottant' | 'ecole' | 'hameau' | 'chateau' | 'etroite'; // illustration en tête d'article
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
  stayLink?: { label: string; href: string; affiliate?: boolean }; // rubrique Insolite : où passer une nuit dans un lieu du même genre
}

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'qui-vend-les-biens-atypiques-en-france',
    art: 'atypique',
    title: 'Qui vend les biens atypiques en France ? Les spécialistes, ceux qui s’y mettent, et tous les autres',
    description: 'Réseaux spécialisés, enseignes généralistes qui lancent une marque « caractère », agences de quartier : tour d’horizon de ceux qui vendent les biens atypiques.',
    category: 'Actu réseau',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 6,
    intro: 'Un loft, une maison d’architecte ou un ancien atelier peuvent être vendus par trois sortes d’agences : celles qui en ont fait leur métier, les grandes enseignes qui ouvrent une marque dédiée, et l’agence du coin qui en reçoit un de temps en temps. Voici ce que la presse professionnelle en dit. Tous les chiffres sont ceux que les agences déclarent elles-mêmes.',
    takeaways: [
      'Quelques réseaux et agences se consacrent aux biens atypiques ou de caractère, chacun avec sa définition.',
      'Des enseignes généralistes ou de prestige créent des marques et des départements dédiés : c’est le mouvement de 2026.',
      'Sur les agences classiques qui en vendent à l’occasion, la presse ne dit presque rien.',
      'Il n’existe aucune statistique indépendante sur le marché de l’atypique : ni part des ventes, ni délais.',
    ],
    sections: [
      {
        title: 'Qui en a fait sa spécialité ?',
        paragraphs: [
          'Plusieurs acteurs, qui ne visent pas les mêmes biens. Nous les citons par ordre alphabétique, avec les chiffres qu’ils ont communiqués à la presse.',
        ],
        list: [
          'Architecture de Collection, créée en 2007, se consacre à l’architecture remarquable des XXe et XXIe siècles. L’estimation y est confiée à une équipe qui mêle historiens de l’art, photographes et négociateurs formés à l’architecture, expliquait l’agence au site ByBeton en 2022.',
          'Ateliers Lofts & Associés, dont le concept date de 1998, vend lofts, ateliers et maisons contemporaines. L’enseigne s’est ouverte à la franchise et cite Paris, Bordeaux, Arcachon, Biarritz, La Rochelle et Royan, d’après sa fiche sur l’annuaire Toute la Franchise.',
          'De la cour au jardin, réseau de 25 consultants indépendants né il y a 28 ans, travaille l’immobilier de charme : maisons de famille, de campagne, appartements de caractère (MySweetImmo, mai 2026).',
          'Espaces Atypiques, créé en 2008, compte 87 agences dans 64 départements, dont une trentaine en franchise, selon L’Express Franchise. Le réseau déclare 2 100 transactions en 2025 et vise 120 agences en 2030.',
          'Le Groupe Mercure se consacre aux châteaux et aux biens patrimoniaux. Son bilan 2023 faisait état de 260 transactions, dont 40 % de châteaux.',
          'Le Groupe Patrice Besse vend des biens de caractère, dont une trentaine de châteaux en 2025, pour une transaction moyenne d’environ 950 000 euros (MySweetImmo, janvier 2026).',
        ],
      },
      {
        title: 'Quelles enseignes s’y mettent ?',
        paragraphs: [
          'C’est le mouvement le plus visible de 2026. Des réseaux généralistes ou de prestige créent une marque ou un département pour les biens de caractère.',
        ],
        list: [
          'Laforêt a lancé à l’automne 2026 la marque Laforêt Collection, pour les biens de famille et de caractère : mas, maison de maître, loft industriel, duplex haussmannien. Deux agences sont ouvertes, au Touquet et à Paris, et le réseau en vise 20 à 25 en deux ans.',
          'Chez Nestenn, une franchisée de Saint-Malo a ouvert en avril 2026 une agence « Maisons de Famille ». C’est une initiative locale, pas une marque nationale.',
          'Barnes dispose d’un département Propriétés & Châteaux, et Junot d’un département Châteaux & Patrimoine, renforcé d’une dizaine de collaborateurs début 2026.',
        ],
      },
      {
        title: 'Et les agences classiques ?',
        paragraphs: [
          'Elles vendent sans doute une bonne part des biens atypiques, mais nous n’avons trouvé aucun article de presse qui le mesure. Le seul texte lu sur le sujet est un article de conseil publié par Laforêt sur son propre site. Il traite le bien atypique comme un cas d’estimation à part : pas de ventes comparables, une valeur qui ne se résume pas à la surface, et des critères en plus, comme le style, la rareté ou l’histoire du bien.',
        ],
      },
      {
        title: 'En quoi vendre un bien atypique est-il différent ?',
        paragraphs: [
          'Trois points reviennent dans les articles lus.',
        ],
        list: [
          'L’estimation : faute de biens comparables, elle demande d’autres repères que les ventes du quartier.',
          'La présentation : De la cour au jardin met en avant la rédaction de ses annonces et sa ligne éditoriale ; Architecture de Collection, le travail de ses photographes.',
          'Le délai : le Groupe Mercure indiquait pour 2023 dix mois de commercialisation en zone rurale, contre quatre en ville. C’est le seul délai chiffré que nous ayons trouvé, et il concerne des biens patrimoniaux.',
        ],
      },
      {
        title: 'Que sait-on du marché ?',
        paragraphs: [
          'Peu de choses de source indépendante. Ni les notaires ni la statistique publique n’isolent les biens atypiques. Les chiffres qui circulent viennent des réseaux eux-mêmes ou d’études qu’ils ont commandées.',
          'Une enquête OpinionWay réalisée en octobre 2025 pour Espaces Atypiques, auprès de 1 002 Français gagnant plus de 4 000 euros nets par mois, donne une idée de ce que le mot recouvre : une architecture originale pour 58 % d’entre eux, une esthétique exceptionnelle pour 49 %, une histoire ou un patrimoine pour 43 %. Selon la même enquête, 69 % préfèrent un bien sans gros travaux.',
        ],
      },
      {
        title: 'Ce que ce tour d’horizon ne couvre pas',
        paragraphs: [
          'Les agences de péniches, les agences de lofts indépendantes et les agences régionales spécialisées n’apparaissent presque pas dans la presse que nous avons pu lire. Leur absence ici tient aux sources, pas à leur activité. Nous complèterons cet article à mesure que nous trouverons des informations publiées sur elles.',
        ],
      },
    ],
    faq: [
      { q: 'Faut-il passer par un spécialiste pour vendre un bien atypique ?', a: 'Nous ne donnons pas d’avis sur ce point. Les trois types d’agences en vendent ; cet article décrit ce que chacune dit de sa méthode.' },
      { q: 'D’où viennent les chiffres cités ?', a: 'Des agences et des réseaux eux-mêmes, relayés par la presse professionnelle. Aucun n’a été vérifié par une source indépendante.' },
    ],
    sources: [
      { label: 'L’Express Franchise, 23 avril 2026', url: 'https://lexpress-franchise.com/actualites/le-reseau-immobilier-espaces-atypiques-veut-passer-de-87-a-120-agences-dici-2030/' },
      { label: 'MySweetImmo, bilan 2025 d’Espaces Atypiques, 4 février 2026', url: 'https://www.mysweetimmo.com/2026/02/04/reseau-mmobilier-espaces-atypiques-affiche-26-de-chiffre-daffaires-en-2025/' },
      { label: 'MySweetImmo, bilan 2025 du Groupe Patrice Besse, 18 janvier 2026', url: 'https://www.mysweetimmo.com/2026/01/18/immobilier-de-caractere-pourquoi-le-groupe-patrice-besse-voit-le-marche-repartir/' },
      { label: 'MySweetImmo, bilan 2023 du Groupe Mercure, 31 janvier 2024', url: 'https://www.mysweetimmo.com/2024/01/31/immobilier-bilan-groupe-mercure-en-2023-le-marche-des-biens-patrimoniaux-a-bien-resiste/' },
      { label: 'MySweetImmo, De la cour au jardin, 12 mai 2026', url: 'https://www.mysweetimmo.com/2026/05/12/reseau-immobilier-de-la-cour-au-jardin-est-devenu-un-label-isabelle-larochette/' },
      { label: 'Toute la Franchise, fiche Ateliers Lofts & Associés', url: 'https://www.toute-la-franchise.com/franchise/ateliers-lofts-associes' },
      { label: 'ByBeton, entretien avec Architecture de Collection, 18 janvier 2022', url: 'https://bybeton.fr/?p=15234' },
      { label: 'MySweetImmo, lancement de Laforêt Collection, 22 octobre 2026', url: 'https://www.mysweetimmo.com/2026/10/22/immobilier-laforet-lance-une-marque-dediee-aux-biens-de-famille-et-de-caractere/' },
      { label: 'MySweetImmo, objectifs de Laforêt Collection, 29 octobre 2026', url: 'https://www.mysweetimmo.com/2026/10/29/agence-immobiliere-on-vise-20-a-25-implantations-laforet-collection-dici-deux-ans-yann-jehanno/' },
      { label: 'MySweetImmo, Nestenn à Saint-Malo, 18 mars 2026', url: 'https://www.mysweetimmo.com/2026/03/18/reseau-immobilier-nestenn-lance-une-offre-dediee-aux-maisons-de-famille-a-saint-malo/' },
      { label: 'MySweetImmo, Barnes et les châteaux, 25 novembre 2024', url: 'https://www.mysweetimmo.com/2024/11/25/chateaux-forets-vignobles-et-domaines-de-chasse-des-projets-pour-lavenir-qui-seduisent-les-investisseurs/' },
      { label: 'MySweetImmo, Junot, 14 février 2026', url: 'https://www.mysweetimmo.com/2026/02/14/reseau-immobilier-a-paris-la-reprise-profite-a-junot-qui-grimpe-de-56/' },
      { label: 'Laforêt, « Comment estimer un bien atypique »', url: 'https://www.laforet.com/blog/vente/comment-estimer-un-bien-atypique' },
      { label: 'Communiqué de l’étude OpinionWay pour Espaces Atypiques, janvier 2026', url: 'https://www.journaldelagence.com/wp-content/uploads/2026/02/14SEPTEMBRE-ESPACES-ATYPIQUES-14Septembre_ESPACES_ATYPIQUES_Etude_OpinionWay_CP-8rndbtooat46n71a7tefmv6f7c.pdf' },
    ],
  },
  {
    slug: 'instagram-tiktok-ou-portails-d-ou-viennent-les-acheteurs',
    art: 'balance',
    title: 'Instagram et TikTok apportent-ils plus d’acheteurs que les portails ? Ce que disent les chiffres',
    description: 'Les réseaux sociaux ont-ils dépassé les portails d’annonces pour trouver un bien ou un agent ? Les enquêtes françaises et américaines disent plutôt l’inverse.',
    category: 'Actu réseau',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 6,
    intro: 'On entend que les réseaux sociaux seraient en train de remplacer les portails d’annonces. Les enquêtes disponibles ne le montrent pas. En France comme aux États-Unis, les acheteurs commencent très majoritairement par les portails. Ce sont les agents, et eux seuls, qui placent les réseaux en tête.',
    takeaways: [
      'En France, 81 % des particuliers citent les portails parmi leurs premiers réflexes de recherche, contre 8 % qui commencent par les réseaux sociaux.',
      'Aux États-Unis, environ 1 % des acheteurs ont trouvé leur agent par les réseaux sociaux, selon la fédération des agents.',
      'Les agents américains, eux, citent les réseaux bien avant les portails pour la qualité des contacts : 39 % contre 9 % en 2025.',
      'Aucune étude lue ne mesure séparément Instagram ou TikTok, ni ne compte les ventes par canal en France.',
    ],
    sections: [
      {
        title: 'Par où les acheteurs commencent-ils, en France ?',
        paragraphs: [
          'Par les portails. L’Observatoire de l’immobilier digital 2026, présenté à l’automne et rapporté par MySweetImmo, a interrogé 1 174 particuliers ayant cherché un bien dans l’année. 81 % citent les portails parmi leurs premiers réflexes. Aucun autre canal ne dépasse 24 %, et 8 % seulement commencent leur recherche sur les réseaux sociaux.',
          'Pour chercher un professionnel, 9 % iraient sur les réseaux. La part monte à 38 % chez les 18-24 ans. Une précision : cet observatoire est produit par des acteurs du secteur, dont un portail d’annonces.',
        ],
      },
      {
        title: 'Les réseaux ne servent-ils donc à rien ?',
        paragraphs: [
          'Si, mais plus tard dans le parcours. Parmi les particuliers qui utilisent les réseaux pendant leur recherche, 59 % disent avoir déjà eu envie de contacter un professionnel après avoir vu ses contenus, selon le même observatoire. Côté professionnels, les deux canaux sont presque aussi répandus : 86 % diffusent sur les portails et 82 % utilisent les réseaux sociaux.',
        ],
      },
      {
        title: 'Et aux États-Unis ?',
        paragraphs: [
          'Le constat est le même du côté des acheteurs. La fédération américaine des agents immobiliers, la NAR, interroge chaque année plusieurs milliers d’acheteurs récents. Dans son édition 2026, 52 % ont trouvé sur internet le bien qu’ils ont acheté et 27 % par leur agent.',
          'Pour trouver cet agent, 43 % ont suivi la recommandation d’un proche et 15 % ont repris un agent déjà connu. Les réseaux sociaux pèsent environ 1 %, y compris chez les plus jeunes acheteurs. Le portail Zillow, dans sa propre enquête de 2025, arrive à 5 %.',
        ],
      },
      {
        title: 'Pourquoi les agents disent-ils le contraire ?',
        paragraphs: [
          'Parce qu’on ne leur pose pas la même question. Dans l’enquête technologie 2025 de la NAR, 39 % des agents citent les réseaux sociaux comme l’outil qui leur a apporté le plus de contacts de qualité, contre 9 % pour les portails. Trois limites sont à connaître.',
        ],
        list: [
          'C’est un ressenti, pas un décompte de contacts ni de ventes, et le taux de réponse à cette enquête est de 2,5 %.',
          'La question ne porte que sur des outils numériques. Elle laisse de côté les anciens clients et les recommandations, qui représentent environ la moitié de l’activité d’un agent type selon la même fédération.',
          '« Réseaux sociaux » veut d’abord dire Facebook, utilisé par 87 % des agents en 2024, devant Instagram (62 %) et loin devant TikTok (15 %).',
        ],
      },
      {
        title: 'La tendance est-elle à la hausse ?',
        paragraphs: [
          'Pas dans ces enquêtes. La part des agents américains qui citent les réseaux comme meilleure source de contacts est passée de 52 % en 2024 à 39 % en 2025. Celle des portails a reculé aussi, de 14 % à 9 %. Chez Zillow, la part des acheteurs ayant trouvé leur agent par un réseau social est passée de 8 % en 2023 à 5 % en 2025.',
        ],
      },
      {
        title: 'Et TikTok chez les plus jeunes ?',
        paragraphs: [
          'Les chiffres qui circulent mesurent autre chose. Une enquête de 2024 indique qu’environ 38 % des adultes américains de la génération Z reçoivent de l’information sur l’achat immobilier par TikTok. Il s’agit d’information, pas de la découverte d’un bien ni d’une prise de contact avec un agent. Et cette enquête émane d’une société qui met en relation acheteurs et agents.',
        ],
      },
      {
        title: 'Que ne sait-on pas ?',
        paragraphs: [
          'Beaucoup de choses, surtout en France. Aucune des études lues ne dit quelle part des contacts, des mandats ou des ventes vient de chaque canal. Aucune ne distingue Instagram de TikTok. Aucune ne compare sérieusement le coût d’un contact venu d’un réseau et d’un portail. Selon l’observatoire français, 12 % seulement des professionnels suivent leur coût par contact.',
          'Reste un constat commun aux deux pays : la recommandation pèse plus lourd que les deux canaux numériques dans le choix d’un agent.',
        ],
      },
    ],
    faq: [
      { q: 'Les réseaux sociaux apportent-ils plus d’acheteurs que les portails ?', a: 'Les enquêtes lues ne le montrent pas. Les acheteurs commencent très majoritairement par les portails ; les réseaux interviennent plutôt dans le choix d’un professionnel.' },
      { q: 'Ces études sont-elles indépendantes ?', a: 'Pas toutes. L’observatoire français est produit par des acteurs du secteur, dont un portail. Les enquêtes américaines viennent de la fédération des agents et d’un portail. Nous le signalons à chaque fois.' },
    ],
    sources: [
      { label: 'MySweetImmo, Observatoire de l’immobilier digital 2026, 11 novembre 2026', url: 'https://www.mysweetimmo.com/2026/11/11/agents-immobiliers-faut-il-etre-partout-sur-le-web/' },
      { label: 'NAR, tendances par génération des acheteurs et vendeurs, édition 2026', url: 'https://assets.inman.com/wp-content/uploads/2026/04/2026-Generational-Trends-Report-FINAL.pdf' },
      { label: 'NAR, enquête technologie 2025', url: 'https://cms.nar.realtor/sites/default/files/2025-09/2025-realtors-technology-survey-report-09-18-2025.pdf' },
      { label: 'NAR, enquête technologie 2024', url: 'https://cdn.nar.realtor/sites/default/files/documents/2024-technology-survey-report-08-08-2024.pdf' },
      { label: 'NAR, profil des membres 2026', url: 'https://www.nar.realtor/news/economists-outlook/the-feature-sheet-2026-member-profile' },
      { label: 'Zillow, rapport sur les acheteurs 2025', url: 'https://www.zillow.com/research/buyers-housing-trends-report-2025-35688' },
      { label: 'Clever Real Estate, enquête sur la génération Z, 2024', url: 'https://listwithclever.com/research/gen-z-homeownership/' },
    ],
  },
  {
    slug: 'agents-immobiliers-les-plus-suivis-au-monde',
    art: 'plateforme',
    title: 'Qui sont les agents immobiliers les plus suivis au monde sur les réseaux ?',
    description: 'De Dubaï à New York, une poignée d’agents immobiliers comptent plus d’un million d’abonnés. Qui sont-ils, d’où vient leur audience, et ce que ces chiffres valent.',
    category: 'Actu réseau',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 5,
    intro: 'Certains agents immobiliers ont plus d’abonnés qu’un grand quotidien n’a de lecteurs. Nous avons recoupé plusieurs classements et articles de presse pour savoir qui ils sont. Le résultat est un ordre de grandeur, pas un palmarès officiel : il n’en existe pas.',
    takeaways: [
      'Les plus suivis travaillent à Dubaï, New York, Montréal, Mumbai, Stockholm ou Marbella.',
      'L’Américain Ryan Serhant comptait environ 2,5 millions d’abonnés sur Instagram en mai 2025, selon The Real Deal.',
      'En France, le compte de l’agence de la famille Kretz dépasse 521 000 abonnés sur Instagram, selon Luxus Magazine.',
      'Ces chiffres viennent de sources et de dates différentes : ils ne se comparent pas au millier près.',
    ],
    sections: [
      {
        title: 'Qui arrive en tête ?',
        paragraphs: [
          'Le classement le plus large que nous ayons lu est celui du portail Realting, daté de décembre 2025. Nous l’avons complété par la presse professionnelle. Seuls les agents en exercice sont retenus, pas les investisseurs ni les formateurs.',
        ],
        list: [
          'Nick Golev, Dubaï : environ 4,5 millions d’abonnés sur TikTok (Realting, décembre 2025).',
          'Tatiana Londono, Montréal et Floride : plus de 2,6 millions sur TikTok (BAM, mai 2022).',
          'Ryan Serhant, New York : environ 2,5 millions sur Instagram (The Real Deal, mai 2025).',
          'Clara Lindblom, Stockholm : environ 1,6 million sur Instagram (Realting).',
          'Jesse Meester, Marbella : environ 1,3 million sur Instagram (Realting, Euro Weekly News).',
          'Islam Hammad, Dubaï : 1,2 million sur Instagram (Marketing by Magnet, 2026).',
          'Sagar Visawadia, Mumbai : environ 1 million sur Instagram (Realting).',
        ],
      },
      {
        title: 'Et en Europe ?',
        paragraphs: [
          'Derrière ce premier groupe, plusieurs agents européens dépassent les 400 000 abonnés sur Instagram, d’après Realting : Gianluca Torre à Milan (environ 503 000), le compte de la famille Kretz à Paris (475 000 en décembre 2025, plus de 521 000 en avril 2026 selon Luxus Magazine) et Grant J Bates à Londres (environ 406 000).',
        ],
      },
      {
        title: 'D’où vient leur audience ?',
        paragraphs: [
          'Rarement des biens seuls. Chez la plupart, un personnage a précédé l’immobilier ou l’accompagne.',
        ],
        list: [
          'La télévision : Ryan Serhant, la famille Kretz, Gianluca Torre et Jesse Meester étaient connus du petit écran avant de l’être sur les réseaux.',
          'Un autre métier : Nick Golev se présente comme un illusionniste devenu agent, selon le site autrichien Leadersnet.',
          'Le spectacle : Sagar Visawadia se présente aussi comme podcasteur, conférencier et acteur, et mêle humour et visites, selon la revue indienne Realty+.',
          'La vidéo elle-même : Tatiana Londono et Grant J Bates ont construit leur audience par des vidéos courtes et régulières.',
        ],
      },
      {
        title: 'Que valent ces chiffres ?',
        paragraphs: [
          'Ils sont à prendre avec prudence, pour trois raisons. Ils viennent de classements, d’articles et de fiches d’agence publiés à des dates différentes. Une partie est déclarée par les agents eux-mêmes. Et les classements ne couvrent pas tous les pays : d’autres agents très suivis manquent sans doute.',
          'Un nombre d’abonnés ne dit rien, enfin, du nombre de ventes. Les sources lues ne permettent pas de relier l’un à l’autre.',
        ],
      },
      {
        title: 'Une grande audience veut-elle dire beaucoup de ventes ?',
        paragraphs: [
          'Pas nécessairement, et deux exemples invitent à la prudence. Nous les donnons avec leurs limites.',
          'Nick Golev est le plus suivi de notre relevé. Sa fiche sur le portail d’annonces Bayut, consultée le 28 novembre 2026, faisait état de trois ventes et de cinq locations enregistrées. Sa fiche sur le portail Property Finder indique une expérience dans l’immobilier depuis 2024. Ces chiffres ne mesurent que ce que les portails enregistrent : une transaction conclue hors portail, ou par l’agence sous un autre nom, n’y figure pas. Ils ne permettent donc pas de conclure sur son activité réelle.',
          'Clara Lindblom figure dans le classement de Realting comme agente à Stockholm, avec un contenu tourné vers le style de vie autour du métier. Ce classement est notre seule source : nous n’avons trouvé aucun article de presse qui décrive son activité d’agente, et nous n’avons pas pu la vérifier.',
          'Dans les deux cas, l’audience a pu se construire en dehors de l’immobilier. C’est une hypothèse, que les sources lues ne confirment pas.',
        ],
      },
    ],
    faq: [
      { q: 'Existe-t-il un classement officiel ?', a: 'Non. Les classements sont établis par des portails ou des sociétés de marketing, chacun avec sa méthode.' },
      { q: 'Pourquoi ne pas compter les investisseurs et les formateurs ?', a: 'Parce qu’ils ne vendent pas de biens pour le compte de clients. Certains sont pourtant plus suivis que tous les agents cités ici.' },
    ],
    sources: [
      { label: 'Realting, classement international des agents sur TikTok et Instagram, 15 décembre 2025', url: 'https://realting.com/news/top-popular-realtors-on-tik-tok-and-instagram' },
      { label: 'The Real Deal, les agences new-yorkaises les plus suivies sur Instagram, 22 mai 2025', url: 'https://therealdeal.com/data/new-york/2025/these-nyc-brokerages-have-the-most-instagram-followers-in-2025' },
      { label: 'BAM, la méthode TikTok de Tatiana Londono, 30 mai 2022', url: 'https://nowbam.com/the-secret-to-tatiana-longonos-tiktok-success/' },
      { label: 'Luxus Magazine, portrait de la famille Kretz, 8 avril 2026', url: 'https://magazine.luxus-plus.com/en/?p=41556' },
      { label: 'Marketing by Magnet, comptes d’agents de luxe, édition 2026', url: 'https://marketingbymagnet.com/top-20-luxury-real-estate-agent-instagram-accounts-2026' },
      { label: 'Euro Weekly News, entretien avec Jesse Meester, 24 novembre 2023', url: 'https://euroweeklynews.com/2023/11/24/speaking-european-jesse-meester/' },
      { label: 'Leadersnet, les TikTokeurs de l’immobilier, 13 février 2026', url: 'https://www.leadersnet.at/news/97358,die-top-tiktoker-der-immobilienwelt.html' },
      { label: 'Realty+, l’immobilier devient viral, 11 juin 2025', url: 'https://www.rprealtyplus.com/news-views/real-estate-goes-viral-120345.html' },
      { label: 'Bayut, fiche de Nick Golev, consultée le 28 novembre 2026', url: 'https://www.bayut.com/brokers/nick-golev-2658597.html' },
      { label: 'Property Finder, fiche d’agent, consultée le 28 novembre 2026', url: 'https://www.propertyfinder.ae/en/agent/mykyta-goliev-339468' },
    ],
  },
  {
    slug: 'comment-les-agents-stars-filment-une-visite',
    art: 'visite',
    title: 'Trente secondes, une accroche, un parcours : comment les agents stars filment une visite',
    description: 'Durée, accroche, voix off, prix en légende : ce que la presse décrit des vidéos de visite des agents immobiliers les plus suivis, de Milan à Vancouver.',
    category: 'Actu réseau',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 5,
    intro: 'Une visite filmée par un agent très suivi ne ressemble pas à une annonce. La presse italienne, britannique et nord-américaine a décrit en détail la façon de faire de quelques-uns d’entre eux. Voici ce qui revient.',
    takeaways: [
      'Des vidéos courtes : 30 à 45 secondes chez Tatiana Londono, 30 à 90 secondes chez Grant J Bates.',
      'Une accroche fixe et une adresse directe au spectateur, comme pour une visite privée.',
      'Le logement montré dans l’ordre où on le parcourt.',
      'Un chiffre en appui : le prix du bien ou un montant investi.',
    ],
    sections: [
      {
        title: 'Combien de temps dure une vidéo ?',
        paragraphs: [
          'Peu. La courtière Tatiana Londono, installée à Montréal et en Floride, recommande 30 à 45 secondes au plus, avec des plans stables et lumineux et des coupes rapides, rapporte le média professionnel BAM. À Londres, Grant J Bates publie des vidéos de 30 ou 60 secondes selon l’Evening Standard, d’environ 90 secondes selon Estate Agent Today. Il lui arrive d’y ajouter une version longue.',
        ],
      },
      {
        title: 'Comment commence-t-elle ?',
        paragraphs: [
          'Par une accroche, souvent toujours la même. À Milan, Gianluca Torre, agent chez Engel & Völkers, ouvre ses visites par une phrase récurrente qui invite à le suivre. Il se filme d’abord devant l’immeuble, face à la caméra, parfois en marchant à reculons pour ne pas quitter le spectateur des yeux, décrit le quotidien en ligne Il Post. Il tutoie, comme lors d’une visite privée, et emploie un vocabulaire à lui pour désigner les pièces et les types d’appartements.',
        ],
      },
      {
        title: 'Que montre-t-on du bien ?',
        paragraphs: [
          'Tout, et dans l’ordre. Grant J Bates commente la visite en voix off et montre l’ensemble du logement, pour que l’on comprenne comment on y circule. Estate Agent Today y voit un style plus américain que britannique.',
          'À Vancouver, le compte tenu par l’agent Max Hasman fait l’inverse du portrait : il porte le nom de la ville et des maisons, pas celui de l’agent. Ses clips courts montrent intérieurs, extérieurs et vues sur la mer, d’après le site canadien Narcity.',
        ],
      },
      {
        title: 'Donne-t-on le prix ?',
        paragraphs: [
          'Pas toujours, et les sources le documentent mal. Chez Max Hasman, la légende nomme le bien et donne souvent son prix de mise en vente, selon Narcity. Tatiana Londono construit plutôt ses accroches sur des montants investis. Pour les autres agents, aucun des articles lus ne dit si le prix figure dans la vidéo.',
        ],
      },
      {
        title: 'À quel rythme publier ?',
        paragraphs: [
          'Soutenu. La chaîne britannique The Luxury Home Show a publié chaque jour à son lancement et s’est fait connaître en huit mois environ, selon l’Evening Standard. Ses fondateurs ont d’abord filmé leurs propres biens, puis proposé gratuitement des tournages à d’autres agents. À Mumbai, l’agent Sagar Visawadia dit tourner environ 150 jours par an, rapporte la revue Realty+.',
        ],
      },
      {
        title: 'Est-ce que cela vend ?',
        paragraphs: [
          'Quelques chiffres circulent, tous déclarés par les intéressés. Environ 20 % de l’activité de Grant J Bates viendrait des réseaux, selon The Negotiator. Chez Max Hasman, ils apporteraient cinq à six mandats par an à l’agence, d’après Business in Vancouver. La revue d’architecture Domus formule une réserve : à force de spectacle, la compétence peut passer derrière le divertissement.',
        ],
      },
    ],
    faq: [
      { q: 'Ces descriptions viennent-elles des vidéos elles-mêmes ?', a: 'Non. Elles viennent d’articles de presse qui décrivent ces vidéos. Certaines datent de 2022 ou 2023 et les formats ont pu changer.' },
      { q: 'Faut-il se montrer à l’image ?', a: 'Les deux approches existent : Gianluca Torre est au centre de ses vidéos, le compte de Max Hasman met les maisons en avant.' },
    ],
    sources: [
      { label: 'BAM, la méthode TikTok de Tatiana Londono, 30 mai 2022', url: 'https://nowbam.com/the-secret-to-tatiana-longonos-tiktok-success/' },
      { label: 'Inman, portrait de Tatiana Londono, 15 août 2025', url: 'https://www.inman.com/2025/08/15/hgtv-who-tiktok-not-reality-tv-took-this-brokers-business-to-another-level/' },
      { label: 'Evening Standard via Yahoo, acheter une maison sur Instagram, 24 novembre 2022', url: 'https://uk.news.yahoo.com/buy-home-instagram-unstoppable-rise-055800394.html' },
      { label: 'Estate Agent Today, la personnalité dans les annonces', url: 'https://www.estateagenttoday.co.uk/breaking-news/2023/4/hamptons-boss-more-personality-needed-in-property-listings' },
      { label: 'The Negotiator, lancement de l’agence de Grant J Bates, 23 avril 2025', url: 'https://thenegotiator.co.uk/news/agencies-people-news/insta-estate-agent-and-former-hamptons-senior-launches-brokerage/' },
      { label: 'Il Post, le succès des émissions immobilières, 2 novembre 2025', url: 'https://www.ilpost.it/2025/11/02/successo-programmi-immobiliare/' },
      { label: 'Narcity, un compte TikTok de maisons de Vancouver, 12 mai 2022', url: 'https://www.narcity.com/vancouver/this-tiktok-account-shows-off-the-wildest-most-expensive-homes-in-bc-videos' },
      { label: 'Business in Vancouver, les agents et les réseaux sociaux', url: 'https://biv.com/article/2022/11/vancouver-real-estate-agents-are-harnessing-power-social-media' },
      { label: 'Evening Standard via Yahoo, les créateurs immobiliers de Londres, 22 mars 2024', url: 'https://ca.finance.yahoo.com/news/luxury-homes-video-tours-vast-060000136.html' },
      { label: 'Realty+, l’immobilier devient viral, 11 juin 2025', url: 'https://www.rprealtyplus.com/news-views/real-estate-goes-viral-120345.html' },
      { label: 'Domus, les agents immobiliers nouveaux influenceurs, 26 août 2025', url: 'https://www.domusweb.it/it/notizie/2025/08/26/agenti-immobiliari-nuovi-influencer-architettura.html' },
    ],
  },
  {
    slug: 'agents-immobiliers-television-et-reseaux-sociaux',
    art: 'annonce',
    title: 'Kretz, Serhant, Torre : chez les agents stars, la télévision d’abord, les réseaux ensuite',
    description: 'La famille Kretz en France, Ryan Serhant à New York, Gianluca Torre à Milan : leur audience en ligne prolonge une émission. Ce que la presse en dit.',
    category: 'Actu réseau',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 4,
    intro: 'Les agents immobiliers les plus connus des réseaux sociaux n’y sont pas nés. Pour plusieurs d’entre eux, une émission de télévision a fait le personnage, et Instagram ou TikTok l’ont prolongé. Trois exemples, en France, aux États-Unis et en Italie.',
    takeaways: [
      'La famille Kretz doit sa notoriété à la série « L’Agence », diffusée depuis 2020.',
      'Ryan Serhant, à New York, décrit son agence comme une société de médias autant que d’immobilier.',
      'Gianluca Torre, à Milan, dit s’être mis aux réseaux après son arrivée à la télévision.',
      'Certains conseillers de clients très fortunés refusent au contraire toute présence en ligne.',
    ],
    sections: [
      {
        title: 'En France, la famille Kretz',
        paragraphs: [
          'L’agence familiale, fondée à Boulogne-Billancourt, s’est fait connaître par des passages à la télévision, puis par la série « L’Agence », diffusée sur TMC depuis 2020 et reprise sur Netflix. Luxus Magazine évoque 500 000 à 800 000 téléspectateurs par épisode.',
          'Les réseaux ont suivi : plus de 521 000 abonnés pour le compte Instagram de l’agence en avril 2026, selon le même magazine. L’agence se présente comme une marque familiale, avec les codes du luxe. Elle a ouvert sa première agence physique à Paris le 30 janvier 2026, rapporte Paris Zigzag ; sa visibilité reposait jusque-là sur le numérique. En Espagne, l’un des fils filme lui-même les biens au téléphone et estime qu’environ une vente sur dix passe par Instagram, d’après le portail Idealista.',
        ],
      },
      {
        title: 'À New York, Ryan Serhant',
        paragraphs: [
          'Révélé par une émission de téléréalité immobilière, puis par une série Netflix qu’il produit, Ryan Serhant dirige une agence qui dispose de son propre studio. Il oppose un modèle centré sur la personne de l’agent à un modèle centré sur le bien, rapporte le média professionnel Inman.',
          'Ses contenus mêlent éducation et divertissement et visent bien plus large que les acheteurs. Selon Commercial Observer, 93 % de ses vues sur TikTok en janvier 2026 venaient de personnes qui ne le suivaient pas. The Real Deal lui attribuait environ 2,5 millions d’abonnés sur Instagram en mai 2025.',
        ],
      },
      {
        title: 'À Milan, Gianluca Torre',
        paragraphs: [
          'Agent chez Engel & Völkers, Gianluca Torre est l’une des figures de l’émission italienne « Casa a prima vista », lancée en 2023. Il dit s’être mis aux réseaux ensuite, rapporte le site Fanpage. Son audience y a triplé en deux ans : près de 180 000 abonnés sur Instagram en octobre 2023, environ 503 000 en décembre 2025.',
          'Le quotidien en ligne Il Post explique le succès du genre par la place qu’a prise la recherche d’un logement depuis la pandémie, et par la hausse des prix.',
        ],
      },
      {
        title: 'Tout le monde s’y met-il ?',
        paragraphs: [
          'Non. Le magazine britannique Country & Town House rapporte que certains conseillers de clients très fortunés refusent les réseaux, pour des raisons de discrétion et de sécurité. La revue Domus note de son côté que la marque personnelle d’un agent pèse désormais presque autant qu’une vitrine, et s’interroge sur la cadence de production que cela impose.',
        ],
      },
    ],
    faq: [
      { q: 'Faut-il passer à la télévision pour être suivi ?', a: 'Non. D’autres agents ont bâti leur audience par la vidéo courte seule. Mais les plus suivis d’Europe sont, pour beaucoup, passés par une émission.' },
      { q: 'Ces chiffres d’audience sont-ils vérifiés ?', a: 'Ils viennent d’articles de presse et de classements, à des dates différentes. Ce sont des ordres de grandeur.' },
    ],
    sources: [
      { label: 'Luxus Magazine, portrait de la famille Kretz, 8 avril 2026', url: 'https://magazine.luxus-plus.com/en/?p=41556' },
      { label: 'Paris Zigzag, l’agence Kretz rue du Bac', url: 'https://www.pariszigzag.fr/?p=251536' },
      { label: 'Idealista, l’arrivée de Kretz en Espagne', url: 'https://www.idealista.com/en/news/node/819908' },
      { label: 'Inman, entretien avec Ryan Serhant, 31 mars 2026', url: 'https://www.inman.com/2026/03/31/ryan-serhant-on-how-to-win-at-social-and-on-which-brokerages-will-survive-watch/' },
      { label: 'Commercial Observer, l’immobilier et les réseaux sociaux en 2026, 30 mars 2026', url: 'https://commercialobserver.com/2026/03/real-estate-social-media-2026/' },
      { label: 'The Real Deal, les agences new-yorkaises les plus suivies sur Instagram, 22 mai 2025', url: 'https://therealdeal.com/data/new-york/2025/these-nyc-brokerages-have-the-most-instagram-followers-in-2025' },
      { label: 'Fanpage, portrait de Gianluca Torre', url: 'https://www.fanpage.it/spettacolo/programmi-tv/chi-e-gianluca-torre-lagente-immobiliare-degli-appartamenti-di-lusso-di-casa-a-prima-vista-milano/' },
      { label: 'Il Post, le succès des émissions immobilières, 2 novembre 2025', url: 'https://www.ilpost.it/2025/11/02/successo-programmi-immobiliare/' },
      { label: 'Realting, classement international des agents sur TikTok et Instagram, 15 décembre 2025', url: 'https://realting.com/news/top-popular-realtors-on-tik-tok-and-instagram' },
      { label: 'Country & Town House, l’essor des influenceurs immobiliers', url: 'https://www.countryandtownhouse.com/cth-life/properties/rise-of-property-influencers/' },
      { label: 'Domus, les agents immobiliers nouveaux influenceurs, 26 août 2025', url: 'https://www.domusweb.it/it/notizie/2025/08/26/agenti-immobiliari-nuovi-influencer-architettura.html' },
    ],
  },
  {
    slug: 'pays-bas-bureaux-transformes-en-logements-quatrieme-baisse',
    art: 'bureau',
    title: 'Aux Pays-Bas, les bureaux transformés en logements reculent pour la quatrième année',
    description: 'En 2025, environ 6 400 logements sont nés de la transformation de bureaux, commerces ou ateliers aux Pays-Bas, 19 % de moins qu’en 2024. Les chiffres de l’office statistique.',
    category: 'À l’étranger',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 4,
    intro: 'Les Pays-Bas comptent chaque année les logements créés dans des bâtiments qui n’en étaient pas : bureaux, commerces, écoles, ateliers. Le dernier relevé de l’office statistique néerlandais, le CBS, publié le 3 novembre 2026, montre un recul pour la quatrième année de suite.',
    takeaways: [
      'Environ 6 400 logements issus de transformations en 2025, contre 7 900 en 2024 : 19 % de moins.',
      'Les anciens bureaux reculent le plus : 1 690 logements, contre 2 765 un an plus tôt.',
      'Les anciens commerces sont la seule catégorie en hausse.',
      'Première estimation pour le premier semestre 2026 : près de 3 000 logements.',
    ],
    sections: [
      {
        title: 'Que disent les chiffres ?',
        paragraphs: [
          'Selon le CBS, environ 6 400 logements ont été créés en 2025 par transformation de bâtiments existants, contre 7 900 en 2024. Le point haut date de 2019, avec 12 500 logements. Depuis 2022, chaque année est inférieure à la précédente.',
          'Ces transformations représentent 7 % des logements ajoutés au parc néerlandais en 2025, contre 9 % en 2024. La construction neuve, elle, est restée stable, autour de 69 000 logements.',
        ],
        list: [
          '2019 : 12 500 logements issus de transformations.',
          '2022 : 9 600.',
          '2023 : 8 800.',
          '2024 : 7 900.',
          '2025 : 6 400.',
        ],
      },
      {
        title: 'D’où viennent ces logements ?',
        paragraphs: [
          'Le CBS classe les logements selon l’usage d’origine du bâtiment. Les anciens bureaux pèsent un peu plus d’un quart du total en 2025, contre 35 % en 2024.',
        ],
        list: [
          'Bureaux : 1 690 logements en 2025, contre 2 765 en 2024.',
          'Commerces : 1 253, contre 1 155.',
          'Bâtiments à fonction sociale ou institutionnelle : 1 185, contre 1 450.',
          'Bâtiments industriels : 380, contre 510.',
          'Autres usages : 1 900, contre 1 995.',
        ],
      },
      {
        title: 'Qui occupe ces logements ?',
        paragraphs: [
          'Le recul vient surtout du locatif privé : 3 700 logements en 2025, contre 5 700 en 2024. Les logements occupés par leur propriétaire progressent (1 700, contre 1 400), comme ceux des bailleurs sociaux (1 010, contre 635).',
          'Le CBS évoque un lien possible avec la loi néerlandaise sur les loyers abordables, en vigueur depuis juillet 2024. Il le présente comme une hypothèse, pas comme une cause établie.',
        ],
      },
      {
        title: 'Et en 2026 ?',
        paragraphs: [
          'La première estimation du CBS pour le premier semestre 2026 fait état de près de 3 000 logements issus de transformations. Le chiffre est provisoire.',
        ],
      },
    ],
    faq: [
      { q: 'Ces chiffres sont-ils comparables aux chiffres français ?', a: 'Non. Chaque pays compte à sa façon. Le CBS suit les logements créés dans des bâtiments existants qui n’étaient pas des logements ; les statistiques françaises reposent sur d’autres définitions.' },
      { q: 'D’où viennent ces données ?', a: 'De l’office statistique néerlandais, le CBS, dans une publication du 3 novembre 2026. La presse néerlandaise des collectivités les a reprises le même jour.' },
    ],
    sources: [
      { label: 'CBS, office statistique néerlandais, publication du 3 novembre 2026', url: 'https://www.cbs.nl/nl-nl/nieuws/2026/45/opnieuw-minder-woningen-ontstaan-uit-transformatie' },
      { label: 'Binnenlands Bestuur, 3 novembre 2026', url: 'https://www.binnenlandsbestuur.nl/ruimte-en-milieu/opnieuw-minder-panden-getransformeerd-tot-woning' },
    ],
  },
  {
    slug: 'new-york-bureaux-transformes-en-logements-record-et-controles',
    art: 'hauteur',
    title: 'À New York, les bureaux deviennent des logements à un rythme record, sous l’œil des inspecteurs',
    description: 'New York est la première ville américaine pour les logements prévus dans d’anciens bureaux. Après un incident de chantier en juillet 2026, la ville a inspecté 180 sites.',
    category: 'À l’étranger',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 5,
    intro: 'Des tours de bureaux vides, une ville qui manque de logements : New York a changé ses règles pour que les premières deviennent les seconds. Les projets se sont multipliés. Un incident de chantier, à l’été 2026, a conduit la ville à inspecter 180 sites.',
    takeaways: [
      'Début 2026, 16 358 logements étaient en projet dans d’anciens bureaux à New York, selon une étude RentCafe reprise par la presse professionnelle.',
      'Depuis décembre 2024, les immeubles construits avant 1991 peuvent être convertis, dans toute la ville.',
      'Un avantage fiscal est accordé en échange de 25 % de logements à loyer encadré.',
      'Après un effondrement partiel sur un chantier en juillet 2026, 19 chantiers ont été arrêtés, dont un seul de conversion.',
    ],
    sections: [
      {
        title: 'Combien de logements sont en projet ?',
        paragraphs: [
          'D’après une étude RentCafe citée par Multifamily Executive et GlobeSt, 90 300 logements étaient en projet dans d’anciens bureaux aux États-Unis au début de 2026, soit 28 % de plus qu’un an plus tôt. New York arrive en tête avec 16 358 logements, presque le double de l’année précédente, devant Washington (8 479).',
          'Les comptages varient selon les sources, parce qu’ils ne couvrent pas le même périmètre. Le contrôleur de la Ville de New York recensait, sur des données du début de 2025, 44 projets et 17 432 logements.',
        ],
      },
      {
        title: 'Qu’est-ce qui a changé dans les règles ?',
        paragraphs: [
          'Deux choses, d’après le rapport du contrôleur de la Ville et la revue de l’Association américaine d’urbanisme.',
        ],
        list: [
          'Le zonage : la réforme adoptée en décembre 2024 autorise les conversions dans toute la ville et les ouvre aux immeubles construits avant 1991. La limite était auparavant fixée à 1961, ou 1977 selon les secteurs.',
          'La fiscalité : un avantage voté en mai 2024 est accordé si 25 % des logements sont à loyer encadré. Sa durée diminue avec le temps : 30 ans pour les chantiers lancés avant la fin de juin 2026, 25 ans jusqu’en juin 2028, 20 ans jusqu’en juin 2031.',
        ],
      },
      {
        title: 'À quoi ressemblent ces opérations ?',
        paragraphs: [
          'Elles sont de grande taille. Au 25 Water Street, dans le sud de Manhattan, environ 1 300 logements ont été créés et mis en location à partir de janvier 2025. Au 5 Times Square, une tour de 38 étages doit accueillir 1 250 logements locatifs, dont 313 abordables, avec une première phase prévue en 2027.',
          'La revue de l’Association américaine d’urbanisme indique un taux de vacance des bureaux de 22,3 % à Manhattan en 2025.',
        ],
      },
      {
        title: 'Que s’est-il passé à l’été 2026 ?',
        paragraphs: [
          'Le 7 juillet 2026, des poteaux de structure ont cédé sur le chantier de l’ancien siège de Pfizer, à Manhattan, en cours de conversion. Une partie du bâtiment s’est effondrée, des immeubles ont été évacués et des rues fermées, rapporte Construction Dive.',
          'Le service des bâtiments de la ville a ensuite inspecté 180 chantiers liés à l’équipe du projet, dont 24 conversions de bureaux en logements. Résultat annoncé début août : 19 arrêts de chantier, dont un seul sur une conversion. Selon la même source, l’inspection n’a relevé ni danger immédiat pour le public, ni élément montrant que le problème serait propre aux conversions. L’enquête sur le chantier lui-même se poursuivait.',
        ],
      },
      {
        title: 'Combien cela coûte-t-il à la ville ?',
        paragraphs: [
          'Le contrôleur de la Ville estime la dépense fiscale liée à l’avantage à 5,6 milliards de dollars sur 37 ans, en valeur actualisée, pour environ 3 600 logements à loyer encadré. Ce calcul porte sur les projets connus au début de 2025.',
        ],
      },
    ],
    faq: [
      { q: 'Tous les immeubles de bureaux peuvent-ils être convertis ?', a: 'Non. À New York, la règle vise les immeubles construits avant 1991. Chaque opération dépend ensuite de la forme du bâtiment et de son coût.' },
      { q: 'Les conversions sont-elles plus risquées que d’autres chantiers ?', a: 'L’inspection menée par la ville après l’incident de juillet 2026 n’a pas relevé d’élément en ce sens, selon Construction Dive. L’enquête sur le chantier concerné n’était pas terminée.' },
    ],
    sources: [
      { label: 'Contrôleur de la Ville de New York, rapport sur les conversions de bureaux en logements', url: 'https://comptroller.nyc.gov/reports/office-to-residential-conversions/' },
      { label: 'Planning Magazine, Association américaine d’urbanisme, 16 novembre 2026', url: 'https://planning.org/planning/2026/nov/the-city-of-yes-had-great-expectations-was-it-worth-it/' },
      { label: 'Construction Dive, août 2026', url: 'https://constructiondive.com/news/nyc-dob-wraps-safety-sweep-buildings-collapse-office-residential/827062' },
      { label: 'Multifamily Executive, 27 mars 2026', url: 'https://www.multifamilyexecutive.com/data-trends/office-apartment-conversions-surge-pipeline-nears-100000-units' },
      { label: 'GlobeSt, 27 mars 2026', url: 'https://www.globest.com/amp/2026/03/27/office-to-apartment-conversions-hit-record-levels/' },
    ],
  },
  {
    slug: 'calgary-21-immeubles-de-bureaux-convertis-en-logements',
    art: 'division',
    title: 'À Calgary, la Ville paie pour que 21 immeubles de bureaux deviennent des logements',
    description: 'Calgary, au Canada, subventionne la conversion de bureaux du centre-ville : 21 projets, 2 667 logements, jusqu’à 75 dollars par pied carré. Ce que dit la Ville.',
    category: 'À l’étranger',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 4,
    intro: 'Calgary, dans l’ouest du Canada, a un centre-ville riche en tours de bureaux peu occupées. La Ville a choisi de subventionner leur transformation. Son programme, relancé en 2026, soutient aujourd’hui 21 projets.',
    takeaways: [
      '21 projets soutenus, pour 2 667 logements, un hôtel et une auberge de jeunesse, selon la Ville (novembre 2026).',
      'Aide : jusqu’à 75 dollars canadiens par pied carré de bureau converti.',
      'Objectif : retirer 6 millions de pieds carrés de bureaux sous-utilisés d’ici 2031.',
      'Un volet réservé au logement hors marché a versé ses premières subventions en février 2026.',
    ],
    sections: [
      {
        title: 'Comment fonctionne le programme ?',
        paragraphs: [
          'La Ville verse une aide au propriétaire qui transforme un immeuble de bureaux du centre-ville : jusqu’à 75 dollars canadiens par pied carré converti, soit un peu plus de 800 dollars par mètre carré. Elle estime que chaque dollar public s’accompagne d’environ quatre dollars privés.',
          'D’après ses pages mises à jour en novembre 2026, les 21 projets soutenus représentent 2,68 millions de pieds carrés de bureaux, environ 249 000 m². Ils doivent donner 2 667 logements, un hôtel de 226 chambres et une auberge de jeunesse.',
        ],
      },
      {
        title: 'Qu’est-ce qui a changé en 2026 ?',
        paragraphs: [
          'Le programme a été relancé avec de nouvelles règles : un critère d’impact, qui favorise le logement abordable et les grands projets, et une ouverture à d’autres usages, comme les résidences pour personnes âgées, la colocation ou le logement étudiant. La dernière période de candidature s’est tenue de la mi-juin à la fin de juillet 2026. Les décisions étaient attendues pour la fin de l’année.',
        ],
      },
      {
        title: 'Où en sont les chantiers ?',
        paragraphs: [
          'Le 6 mars 2026, la Ville a annoncé la livraison d’un ancien immeuble de bureaux de 1966, devenu 108 logements locatifs, avec 8,3 millions de dollars d’aide municipale. C’était la septième conversion achevée du programme.',
          'En février 2026, un volet distinct, financé par un fonds fédéral, a attribué ses premières subventions : 10,3 millions de dollars pour 128 logements hors marché dans deux immeubles, portés par des organismes à but non lucratif, rapportent LiveWire Calgary et Global News.',
        ],
      },
    ],
    faq: [
      { q: 'L’aide couvre-t-elle tout le coût d’une conversion ?', a: 'Non. Pour les deux projets hors marché de février 2026, Global News rapporte des subventions de 6,2 et 4,1 millions de dollars, pour des coûts d’environ 27,8 et 27,5 millions.' },
      { q: 'Peut-on encore candidater ?', a: 'D’après la page de la Ville consultée fin novembre 2026, le programme est fermé aux nouvelles candidatures.' },
    ],
    sources: [
      { label: 'Ville de Calgary, programmes d’incitation du centre-ville', url: 'https://www.calgary.ca/development/downtown-incentive.html' },
      { label: 'Ville de Calgary, programme de conversion de bureaux', url: 'https://www.calgary.ca/development/downtown-office-conversion-program.html' },
      { label: 'Ville de Calgary, communiqué du 6 mars 2026', url: 'https://newsroom.calgary.ca/the-hat--ninth-brings-creativity-and-culture-home-with-108-new-downtown-homes/' },
      { label: 'LiveWire Calgary, 9 février 2026', url: 'https://livewirecalgary.com/2026/02/09/first-grants-doled-out-for-downtown-non-market-office-conversion-program/' },
      { label: 'Global News, 9 février 2026', url: 'https://globalnews.ca/news/11660113/downtown-calgary-office-towers-conversion-affordable-housing-grant' },
    ],
  },
  {
    slug: 'angleterre-vivre-sur-un-bateau-regle-des-14-jours-reforme',
    art: 'peniche',
    title: 'En Angleterre, vivre sur un bateau sans amarrage fixe : la règle des 14 jours remise à plat',
    description: 'Le gestionnaire des canaux anglais et gallois augmente ses licences et prépare une réforme des règles pour les bateaux habités sans amarrage attitré. Le calendrier.',
    category: 'À l’étranger',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 5,
    intro: 'Sur les canaux d’Angleterre et du pays de Galles, des milliers de personnes vivent sur un bateau sans place attitrée, en se déplaçant sans cesse. Le Canal & River Trust, qui gère ce réseau, a relevé ses tarifs en 2026 et prépare une réforme des règles. Les habitants concernés la contestent.',
    takeaways: [
      'Les licences de bateau ont augmenté de 4,85 % au 1er avril 2026.',
      'La règle actuelle : pas plus de 14 jours au même endroit pour un bateau sans amarrage attitré.',
      'Une commission a rendu 36 recommandations ; le Trust dit en accepter les conclusions.',
      'Une consultation publique est prévue de décembre 2026 à février 2027. Les règles actuelles restent en vigueur d’ici là.',
    ],
    sections: [
      {
        title: 'Quelle est la règle aujourd’hui ?',
        paragraphs: [
          'Un bateau peut obtenir une licence sans disposer d’un amarrage attitré, à condition de naviguer. Le Canal & River Trust interprète la loi de 1995 ainsi : pas plus de 14 jours au même endroit, et un déplacement continu pendant toute la durée de la licence.',
          'Devant la commission, le Trust a indiqué que vivre à bord à Londres sans amarrage attitré coûte moins de la moitié d’un loyer londonien courant. C’est l’une des raisons de la saturation de certains secteurs.',
        ],
      },
      {
        title: 'Que propose la commission ?',
        paragraphs: [
          'Le Trust a confié l’examen des licences à une commission, dont le rapport contient 36 recommandations. Pour les déplacements, elle propose notamment :',
        ],
        list: [
          'de garder le principe des 14 jours ;',
          'de remplacer la notion juridique actuelle de navigation par une règle de déplacement plus claire ;',
          'd’ouvrir un débat sur les zones saturées, avec la possibilité de tarifs différenciés ou d’un nombre limité de licences, ce qui demanderait une nouvelle loi ;',
          'de supprimer en trois ans la remise de 40 % accordée aux bateaux qui ne circulent que sur les rivières, soit un peu plus de 4 000 titulaires.',
        ],
      },
      {
        title: 'Quel est le calendrier ?',
        paragraphs: [
          'Le Trust a annoncé trois phases. La première, immédiate, porte sur l’information, l’aide sociale et le retrait des épaves. La deuxième, jusqu’à la fin de 2027, passe par une consultation sur les obligations de déplacement, la sécurité et l’assurance. La troisième, à partir de 2028, concerne les mesures qui exigent une nouvelle loi.',
          'D’après la page de concertation du Trust, la consultation publique doit durer 14 semaines, de décembre 2026 à février 2027, avec une analyse indépendante au printemps 2027.',
        ],
      },
      {
        title: 'Et les tarifs ?',
        paragraphs: [
          'Les licences ont augmenté de 4,85 % au 1er avril 2026. Le Trust invoque l’inflation et la baisse de ses subventions publiques. Depuis 2024, des suppléments s’appliquent aussi aux bateaux sans amarrage attitré et aux bateaux larges. Le Trust évalue le non-paiement des licences à plus de 5 millions de livres par an.',
        ],
      },
      {
        title: 'Qu’en disent les habitants ?',
        paragraphs: [
          'L’association qui représente les bateliers itinérants, la NBTA, rejette le rapport comme base de réforme. Elle relève que la commission ne comptait aucun représentant des bateaux sans amarrage et que sa présidence a été nommée par le Trust, et elle juge l’approche punitive.',
        ],
      },
    ],
    faq: [
      { q: 'Les règles ont-elles déjà changé ?', a: 'Non. D’après le Trust, les règles actuelles restent en vigueur pendant la concertation.' },
      { q: 'Cela concerne-t-il les bateaux amarrés à l’année ?', a: 'La règle des 14 jours vise les bateaux sans amarrage attitré. La hausse des licences, elle, concerne tous les bateaux.' },
    ],
    sources: [
      { label: 'Canal & River Trust, tarifs des licences 2026-2027', url: 'https://canalrivertrust.org.uk/news-and-views/news/boat-licence-fees-for-2026-27' },
      { label: 'Canal & River Trust, suites données aux recommandations', url: 'https://canalrivertrust.org.uk/news-and-views/news/were-moving-forward-with-commission-recommendations' },
      { label: 'Rapport de la commission, obligations de déplacement et saturation', url: 'https://canalrivertrust.org.uk/boating/boating-news-and-views/boating-news/commission-to-review-future-framework-for-boat-licensing/section-3-movement-requirements-and-congestion' },
      { label: 'Canal & River Trust, page de concertation', url: 'https://canalrivertrust.org.uk/boaterconsultation' },
      { label: 'Towpath Talk, 27 février 2026', url: 'https://www.towpathtalk.co.uk/?p=54451' },
      { label: 'NBTA, réponse au rapport, 2 février 2026', url: 'https://bargee-traveller.org.uk/nbta-publishes-full-response-to-crts-future-of-licensing-report/' },
    ],
  },
  {
    slug: 'etats-unis-phares-donnes-puis-vendus-aux-encheres',
    art: 'phare',
    title: 'Aux États-Unis, l’État donne ses phares, et vend aux enchères ceux dont personne ne veut',
    description: 'Une loi américaine de 2000 organise la cession gratuite des phares à des organismes publics ou associatifs, puis leur vente aux enchères. Deux exemples en 2026.',
    category: 'À l’étranger',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 5,
    intro: 'Les États-Unis n’ont plus besoin de gardiens dans leurs phares, mais les bâtiments sont toujours là. Une loi de 2000 organise leur sort en deux temps : l’État les propose d’abord gratuitement à un organisme qui s’engage à les préserver, puis, faute de candidat, les vend aux enchères. Deux phares ont suivi ce chemin en 2026.',
    takeaways: [
      'La loi américaine de 2000 sur la préservation des phares prévoit une cession gratuite, réservée aux organismes publics, associatifs ou éducatifs.',
      'Sans repreneur, le phare est vendu aux enchères publiques.',
      'À Cleveland, un phare de 1910 a été de nouveau proposé gratuitement en avril 2026, après une enchère restée sans suite en 2023.',
      'Dans le Rhode Island, un phare de 1827 avec maison de gardien a été annoncé aux enchères pour l’été 2026.',
    ],
    sections: [
      {
        title: 'Comment se passe une cession ?',
        paragraphs: [
          'La procédure est décrite par le Service des parcs nationaux. L’administration fédérale des biens, la GSA, publie un avis de disponibilité. Les organismes intéressés ont 60 jours pour se manifester, visitent le site, puis déposent un dossier dans les 90 jours qui suivent la visite. Un comité examine les candidatures et la GSA exécute le transfert.',
          'Peuvent candidater les administrations, les associations à but non lucratif, les établissements d’enseignement et les organismes de développement local, pour un usage éducatif, culturel, de loisirs ou de préservation. S’il n’y a pas de candidat retenu, le phare est vendu au plus offrant.',
        ],
      },
      {
        title: 'Que s’est-il passé à Cleveland ?',
        paragraphs: [
          'Le 16 avril 2026, la GSA a annoncé chercher un repreneur pour le phare de l’entrée ouest du port de Cleveland, sur le lac Érié : une tour de quatre niveaux de 1910, avec une cuisine et d’anciens logements, inscrite au registre national des lieux historiques.',
          'Ce n’était pas la première tentative. En 2023, le phare avait été mis aux enchères avec une mise à prix de 25 000 dollars. Selon la radio publique de l’Ohio, une offre de 425 000 dollars avait été faite, mais la vente n’a jamais été conclue. La même source précise que le phare n’est accessible qu’en bateau, qu’il est cédé en l’état et que les garde-côtes gardent l’accès à leurs équipements. Nous n’avons pas trouvé le résultat de l’appel de 2026.',
        ],
      },
      {
        title: 'Et dans le Rhode Island ?',
        paragraphs: [
          'Le phare de Warwick Neck, construit en 1827, a suivi le chemin inverse. Proposé gratuitement en mai 2023, avec sa maison de gardien de 1932, il n’a pas été transféré. La presse locale a annoncé en juin 2026 une vente aux enchères publiques pour l’été, sans mise à prix connue à cette date.',
          'Le bien comprend une tour d’une quinzaine de mètres, une maison de quatre chambres et un garage, en bord de mer. Le feu reste en service et les garde-côtes continuent de l’exploiter. Nous n’avons pas trouvé le résultat de la vente.',
        ],
      },
      {
        title: 'Comment se déroulent les enchères ?',
        paragraphs: [
          'En ligne. Pour un autre phare, dans le Connecticut, la GSA demandait en 2025 un dépôt de 10 000 dollars pour s’inscrire, avec des paliers de 10 000 dollars et une clôture glissante : toute offre déposée dans les dernières 24 heures prolonge la vente de 24 heures. La visite était réservée aux enchérisseurs inscrits.',
          'Les sommes en jeu restent modestes à l’échelle des ventes de l’État. Un rapport de la Cour des comptes américaine, le GAO, publié en avril 2026, cite un phare vendu récemment moins de 100 000 dollars.',
        ],
      },
    ],
    faq: [
      { q: 'Un particulier peut-il obtenir un phare gratuitement ?', a: 'Non. La cession gratuite est réservée aux organismes publics, associatifs ou éducatifs. Un particulier ne peut acheter qu’au stade des enchères.' },
      { q: 'Le phare cesse-t-il de fonctionner après la vente ?', a: 'Pas forcément. Dans les deux exemples, le feu reste une aide à la navigation et les garde-côtes conservent un accès.' },
    ],
    sources: [
      { label: 'GSA, communiqué du 16 avril 2026 sur le phare de Cleveland', url: 'https://www.gsa.gov/about-gsa/newsroom/news-releases/gsa-seeks-to-transfer-cleveland-harbor-lighthouse-to-eligible-community-organiza-04162026' },
      { label: 'WYSU, radio publique de l’Ohio, 22 avril 2026', url: 'https://wysu.org/ohio-news/2026-04-22/cleveland-waterfront-property-available-spectacular-views-unbeatable-price-but-are-you-worthy' },
      { label: 'GSA, annonce de l’enchère de 2023 à Cleveland', url: 'https://www.gsa.gov/about-gsa/newsroom/former-gsa-regional-news-archive/region-5-newsroom/great-lakes-feature-stories-and-news-releases/gsa-announces-public-sale-of-the-cleveland-pierhead-light-08012023' },
      { label: 'Service des parcs nationaux, procédure de cession des phares', url: 'https://www.nps.gov/orgs/1220/nhlpaprocess.htm' },
      { label: 'GSA, communiqué du 31 mai 2023 sur le phare de Warwick Neck', url: 'https://www.gsa.gov/about-gsa/newsroom/former-gsa-regional-news-archive/region-1-newsroom/press-releases/gsa-seeks-to-transfer-warwick-neck-lighthouse-in-w-05312023' },
      { label: 'What’s Up Newp, 18 juin 2026', url: 'https://whatsupnewp.com/2026/06/historic-warwick-neck-lighthouse-headed-to-public-auction-this-summer/' },
      { label: 'GSA, communiqué du 13 août 2025 sur le phare de Penfield Reef', url: 'https://www.gsa.gov/about-us/gsa-regions/region-1-new-england/region-1-newsroom/press-releases/iconic-lighthouse-up-for-auction-open-to-competitive-bidders-08132025' },
      { label: 'GAO, rapport GAO-26-107760, avril 2026', url: 'https://files.gao.gov/reports/GAO-26-107760/index.html' },
    ],
  },
  {
    slug: 'angleterre-comment-l-eglise-anglicane-vend-ses-eglises-fermees',
    art: 'eglise',
    title: 'En Angleterre, comment l’Église anglicane vend une église fermée',
    description: 'L’Église d’Angleterre ferme 20 à 25 églises par an. Chaque cession passe par une consultation publique. La procédure, et un exemple à Sheffield à l’été 2026.',
    category: 'À l’étranger',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 4,
    intro: 'L’Église d’Angleterre compte plus de 15 800 églises consacrées. Elle en ferme une vingtaine chaque année, et doit leur trouver un nouvel usage. La procédure est publique : chaque projet de cession est soumis à consultation, et chacun peut donner son avis.',
    takeaways: [
      'Environ 20 à 25 églises ferment chaque année, un rythme stable depuis les années 1990 selon l’Église d’Angleterre.',
      'Un texte de 2011 encadre la fermeture et la cession pour un nouvel usage.',
      'Chaque projet fait l’objet d’une consultation publique.',
      'Le logement n’est qu’un des usages possibles, avec le culte d’une autre confession, l’éducation ou la culture.',
    ],
    sections: [
      {
        title: 'Que dit la règle ?',
        paragraphs: [
          'Un texte de 2011, le Mission and Pastoral Measure, permet de fermer une église consacrée qui n’est plus nécessaire au culte régulier, puis de la céder pour un nouvel usage adapté. La décision passe par une consultation locale et nationale. Pour un édifice classé, l’organisme public chargé du patrimoine est consulté.',
          'D’après la page officielle de l’Église d’Angleterre, mise à jour en octobre 2026, les usages les plus courants sont la reprise par une autre confession chrétienne, un usage éducatif ou associatif, la culture et le patrimoine, la conservation comme monument, les bureaux et le logement.',
        ],
      },
      {
        title: 'Comment se déroule la consultation ?',
        paragraphs: [
          'Le projet est publié. Chacun peut écrire aux Church Commissioners, l’organe qui gère les biens de l’Église. Sans objection, le projet suit son cours. En cas d’objection, le dossier passe devant un comité, et les contributions sont rendues publiques.',
          'Fin novembre 2026, le site de l’Église d’Angleterre affichait plusieurs consultations ouvertes sur des églises fermées ou à fermer, dans les diocèses de Hereford, Leeds, Sheffield et Londres.',
        ],
      },
      {
        title: 'Un exemple récent ?',
        paragraphs: [
          'À Sheffield, dans le quartier de Frecheville, une église construite de 1950 à 1952 en béton habillé de brique, non classée, a connu ses derniers offices en juillet 2024. Un avis légal paru le 24 juillet 2026 propose de la vendre, avec son terrain, pour qu’une autre communauté chrétienne y célèbre son culte. Les observations étaient reçues jusqu’au 24 août 2026.',
          'Selon le quotidien local The Star, des offres autour de 300 000 livres étaient attendues. Nous n’avons pas trouvé l’issue de la consultation.',
        ],
      },
      {
        title: 'Une église peut-elle devenir une maison ?',
        paragraphs: [
          'Oui, c’est l’un des usages prévus. En 2024, dans le diocèse de Salisbury, un projet soumis à consultation portait sur la vente d’une église et de son cimetière pour en faire une seule habitation.',
        ],
      },
    ],
    faq: [
      { q: 'Qui décide de la vente ?', a: 'Les Church Commissioners, après consultation. En cas d’objection, un comité examine le dossier.' },
      { q: 'Ces règles valent-elles en France ?', a: 'Non. En France, la plupart des églises construites avant 1905 appartiennent aux communes, et leur vente suit d’autres règles.' },
    ],
    sources: [
      { label: 'Église d’Angleterre, page sur les églises fermées', url: 'https://www.churchofengland.org/resources/parish-reorganisation-and-church-property/closed-churches' },
      { label: 'Église d’Angleterre, consultations en cours', url: 'https://www.churchofengland.org/consultation' },
      { label: 'Public Notice Portal, avis légal du 24 juillet 2026', url: 'https://publicnoticeportal.uk/notice/other/6a62ac39718c4a8db87d5b8d' },
      { label: 'The Star, Sheffield', url: 'https://www.thestar.co.uk/news/sheffields-church-on-sale-8810067' },
      { label: 'Église d’Angleterre, consultation de Holt St James', url: 'https://www.churchofengland.org/consultation/holt-st-james' },
    ],
  },
  {
    slug: 'irlande-jusqu-a-70-000-euros-pour-renover-un-logement-vacant',
    art: 'hameau',
    title: 'En Irlande, jusqu’à 70 000 euros d’aide pour remettre en état un logement vacant',
    description: 'L’Irlande subventionne la remise en état des logements vides depuis 2022 : 3 066 aides versées en 2025, deux fois plus qu’en 2024. Les conditions et le débat.',
    category: 'À l’étranger',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 4,
    intro: 'Plutôt que de vendre des maisons pour un euro, l’Irlande paie une partie des travaux. Depuis juillet 2022, une subvention publique aide à remettre en état les logements vacants ou en ruine. Le nombre d’aides versées a plus que doublé en 2025.',
    takeaways: [
      'Jusqu’à 50 000 euros pour un logement vacant, et 20 000 euros de plus s’il est en ruine.',
      '3 066 subventions versées en 2025, contre 1 349 en 2024, selon le gouvernement irlandais.',
      'L’aide n’est versée qu’une fois les travaux terminés.',
      'Le dispositif est prolongé jusqu’en 2030.',
    ],
    sections: [
      {
        title: 'Quelles sont les conditions ?',
        paragraphs: [
          'D’après la presse irlandaise, le logement doit être vacant depuis au moins deux ans et avoir été construit avant 2008. Le demandeur doit en être propriétaire ou être en train de l’acheter. Après travaux, le logement doit devenir sa résidence principale ou être mis en location.',
          'L’aide atteint 50 000 euros pour un bien vacant, avec un complément pouvant aller jusqu’à 20 000 euros si le bien est en ruine. Elle n’est versée qu’après la fin des travaux, sur justificatifs.',
        ],
      },
      {
        title: 'Combien de logements sont concernés ?',
        paragraphs: [
          'Le ministère irlandais du Logement donne le bilan suivant, de juillet 2022 à décembre 2025 :',
        ],
        list: [
          '16 607 demandes reçues ;',
          '12 096 demandes approuvées ;',
          '4 514 subventions versées après travaux ;',
          'près de 247 millions d’euros payés.',
        ],
      },
      {
        title: 'Et en 2026 ?',
        paragraphs: [
          'Selon le site d’information agricole Agriland, 816 subventions ont été versées au premier trimestre 2026, pour environ 45 millions d’euros. Le gouvernement a prolongé le dispositif jusqu’en 2030. Il a aussi annoncé une aide renforcée, jusqu’à 140 000 euros, pour transformer en logements les étages vides au-dessus des commerces.',
        ],
      },
      {
        title: 'Pourquoi le dispositif fait-il débat ?',
        paragraphs: [
          'Depuis mai 2023, l’aide est ouverte aux biens destinés à la location. D’après The Irish Times, les sommes versées à des bailleurs sont passées de 7,46 millions d’euros en 2024 à près de 25 millions sur les neuf premiers mois de 2025, sans plafond de loyer en contrepartie. L’opposition conteste aussi que ces logements soient comptés parmi les logements abordables.',
        ],
      },
    ],
    faq: [
      { q: 'L’aide est-elle versée avant les travaux ?', a: 'Non. Elle est versée une fois les travaux terminés et justifiés. Il faut donc pouvoir les avancer.' },
      { q: 'Existe-t-il la même aide en France ?', a: 'Non, pas sous cette forme. Les aides françaises à la rénovation suivent d’autres règles.' },
    ],
    sources: [
      { label: 'Gouvernement irlandais, ministère du Logement, bilan 2025', url: 'https://www.gov.ie/en/department-of-housing-local-government-and-heritage/press-releases/over-3000-vacant-or-derelict-homes-brought-back-into-use-in-2025-through-vacant-property-refurbishment-grant' },
      { label: 'The Irish Times, 26 janvier 2026', url: 'https://www.irishtimes.com/ireland/housing-planning/2026/01/26/approval-of-25m-in-vacant-property-grants-for-landlords-shocking/' },
      { label: 'Agriland, bilan du premier trimestre 2026', url: 'https://www.agriland.ie/farming-news/over-e45m-vacant-property-refurbishment-grants-paid-in-q1-2026/' },
    ],
  },
  {
    slug: 'chateau-de-bellefontaine-mis-a-prix-450-000-euros',
    art: 'chateau',
    title: 'Près de Fontainebleau, un château de 3 000 m² mis à prix 450 000 euros, que Paris tente de vendre depuis quinze ans',
    description:
      'Le château de Bellefontaine, 3 117 m² sur neuf hectares en Seine-et-Marne, a été mis aux enchères par la Ville de Paris pour 450 000 euros. Trois ventes ont déjà échoué. Ce que l’on sait.',
    category: 'Hors norme',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 5,
    intro:
      'Un château néo-Louis XIII et neuf hectares près de Fontainebleau, mis à prix 450 000 euros : l’annonce a de quoi arrêter le regard. Elle cache une histoire plus compliquée. Le domaine de Bellefontaine est vide depuis une vingtaine d’années, la Ville de Paris cherche à s’en défaire depuis 2011, et son acquisition, en 1942, fait l’objet de questions.',
    takeaways: [
      'Le château se trouve entre Samois-sur-Seine et Avon, en Seine-et-Marne. Il appartient à la Ville de Paris.',
      'Environ 3 117 m² bâtis sur neuf hectares, reconstruits entre 1902 et 1904, aujourd’hui très dégradés.',
      'Mise à prix : 450 000 euros, aux enchères en ligne, fin novembre 2026.',
      'Les travaux sont estimés à au moins 7 millions d’euros par un élu local.',
    ],
    sections: [
      {
        title: 'De quel bien s’agit-il ?',
        paragraphs: [
          'D’un château de style néo-Louis XIII, entièrement reconstruit entre 1902 et 1904, avec une maison de gardien et des annexes. L’ensemble compte environ 3 117 m² bâtis sur neuf hectares, d’après le site d’information La Clé Publique.',
          'Au XIXe siècle, le domaine a appartenu à des familles de diplomates russes. Plus tard, il a accueilli des colonies de vacances parisiennes jusqu’en 1998, puis des séminaires jusqu’à la fin de 2005. Il est vide depuis.',
        ],
      },
      {
        title: 'Pourquoi n’a-t-il pas trouvé preneur ?',
        paragraphs: [
          'Ce n’est pas faute d’avoir essayé. La Clé Publique recense trois tentatives.',
        ],
        list: [
          '2011 : une vente à 2 millions d’euros est autorisée par le Conseil de Paris.',
          '2013 : après des pillages, le prix est renégocié à 1,5 million d’euros. La vente n’aboutit pas.',
          '2018 : une cession à 600 000 euros à l’intercommunalité est décidée dans son principe. Elle ne se fait pas.',
          '2026 : le domaine est proposé aux enchères en ligne, première offre à 450 000 euros.',
        ],
      },
      {
        title: 'Que peut-on en faire ?',
        paragraphs: [
          'Le plan local d’urbanisme intercommunal, en vigueur depuis janvier 2026, admet une « reconversion mixte », à condition de ne pas augmenter la surface bâtie au sol. Le château n’est pas protégé au titre des monuments historiques : la demande d’inscription, soutenue par les deux communes, n’a pas été retenue en 2024.',
          'Reste le coût. D’après le site local Fontainebleau Drive, le président de l’intercommunalité estime les travaux à 7 millions d’euros au moins, et les deux communes disent ne pas pouvoir les financer. Le même site signale un accès difficile, par une voie où deux voitures ne se croisent pas.',
        ],
      },
      {
        title: 'Que sait-on de son acquisition en 1942 ?',
        paragraphs: [
          'La Ville de Paris est propriétaire du domaine depuis 1942. D’après Fontainebleau Drive, il appartenait alors à une famille juive, et il a été acquis en juillet 1942 auprès d’un administrateur provisoire, par la préfecture de la Seine pour le compte de la Ville. Le site cite un rapport des services régionaux de la culture qui évoque une dépossession sous l’Occupation.',
          'Selon un historien local cité par le même site, la Ville aurait reconnu la spoliation après la Libération, et la famille aurait été dédommagée. Ces points reposent sur une seule source et restent à établir précisément : nous les rapportons comme tels.',
        ],
      },
      {
        title: 'La vente a-t-elle eu lieu ?',
        paragraphs: [
          'L’enchère était annoncée pour le 26 novembre 2026. Son résultat ne figure dans aucun des articles consultés.',
        ],
      },
      {
        title: 'Que retenir, pour un acheteur de biens atypiques ?',
        list: [
          'Une mise à prix n’est pas un budget : ici, les travaux annoncés représentent plus de quinze fois le prix de départ.',
          'Un bien qui ne se vend pas depuis quinze ans a une raison de ne pas se vendre. La trouver avant d’enchérir.',
          'Le plan local d’urbanisme dit ce que l’on pourra faire du bien ; il se lit avant la visite.',
          'L’histoire d’un bien fait partie du dossier, au même titre que son état.',
        ],
      },
    ],
    faq: [
      {
        q: 'Où se trouve le château de Bellefontaine ?',
        a: 'Entre Samois-sur-Seine et Avon, en Seine-et-Marne, près de Fontainebleau.',
      },
      {
        q: 'Combien coûte-t-il ?',
        a: 'La mise à prix était de 450 000 euros. Les travaux sont estimés à au moins 7 millions d’euros par un élu local.',
      },
      {
        q: 'Le château est-il classé monument historique ?',
        a: 'Non. Une demande d’inscription n’a pas été retenue en 2024.',
      },
    ],
    sources: [
      { label: 'La Clé Publique, 8 septembre 2026, « Bellefontaine : Paris tente de vendre le château depuis 15 ans »', url: 'https://laclepublique.fr/seine-et-marne/articles/2026/2026-09-08-bellefontaine-chateau-en-vente/' },
      { label: 'Fontainebleau Drive, 21 novembre 2026, « Château abandonné à vendre : l’histoire longtemps cachée d’un bien spolié à une famille juive »', url: 'https://fontainebleau-drive.fr/2026/11/21/chateau-abandonne-a-vendre-lhistoire-longtemps-cachee-dun-bien-spolie-a-une-famille-juive/' },
      { label: 'Evasion FM, 7 septembre 2026, « Dans le sud de la Seine-et-Marne, la ville de Paris met en vente un domaine »', url: 'https://www.evasionfm.com/dans-le-sud-de-la-seine-et-marne-la-ville-de-paris-met-en-vente-un-domaine' },
    ],
  },
  {
    slug: 'appartement-brigitte-bardot-paris-enchere-desistement',
    art: 'souplex',
    title: 'À Paris, le pied-à-terre de Brigitte Bardot : une enchère, puis un désistement',
    description:
      'Un trois-pièces de 70 m² avec jardin dans le 16e arrondissement, mis aux enchères en juin 2026 pour 1,05 million d’euros. La vente a été abandonnée à l’automne. Ce que la presse en dit.',
    category: 'Hors norme',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 4,
    intro:
      'Soixante-dix mètres carrés, un jardin de la même taille, une chambre en souplex et un décor resté celui des années 1970 : le pied-à-terre parisien de Brigitte Bardot, morte le 28 décembre 2025, a été mis en vente au printemps 2026. L’enchère a eu lieu. La vente, elle, ne s’est pas faite. L’histoire intéresse au-delà du nom, parce qu’elle bute sur un point que connaissent bien les acheteurs de biens atypiques.',
    takeaways: [
      'Un trois-pièces de 70,88 m² dans le quartier de la Muette, à Paris, avec un jardin privatif de 71 m².',
      'Vente notariale en ligne en juin 2026, mise à prix 1 050 000 euros.',
      'Une acheteuse a été retenue, puis s’est désistée avant la signature, à cause de problèmes d’urbanisme à régulariser, d’après Purepeople.',
      'Fin octobre 2026, la vente était abandonnée.',
    ],
    sections: [
      {
        title: 'De quel bien s’agit-il ?',
        paragraphs: [
          'D’un appartement de trois pièces : une entrée, une cuisine séparée, un séjour exposé au sud-est, une chambre avec salle de bains, et une seconde chambre en souplex qui donne sur le jardin. La surface est de 70,88 m², le jardin de 71 m², d’après le site Ecostylia, qui a lu l’annonce.',
          'Le décor n’a pas bougé depuis les années 1970, rapporte Le Tribunal du Net : tons orange et moquette au plafond. Le diagnostic énergétique classe le bien G, et des travaux sont à prévoir.',
        ],
      },
      {
        title: 'Comment a-t-il été mis en vente ?',
        paragraphs: [
          'Par une vente notariale interactive, c’est-à-dire une enchère en ligne organisée par un notaire. L’annonce, parue fin mai 2026, ne nommait pas l’actrice : c’est la presse qui a fait le lien. La mise à prix était de 1 050 000 euros, honoraires compris, et les offres devaient être déposées les 11 et 12 juin.',
        ],
      },
      {
        title: 'Pourquoi la vente ne s’est-elle pas faite ?',
        paragraphs: [
          'D’après un article de Purepeople du 19 octobre 2026, une acheteuse a remporté l’enchère sans que le prix de réserve soit atteint, puis un accord a été trouvé avec le vendeur. Alors que la signature du compromis approchait, des problèmes d’urbanisme à régulariser sont apparus, et elle s’est désistée.',
          'Cet article ne décrit pas le bien et ne précise pas la nature de ces problèmes. Aucune des sources consultées ne dit si l’appartement a été remis en vente.',
        ],
      },
      {
        title: 'Que retenir, pour un acheteur de biens atypiques ?',
        list: [
          'Remporter une enchère n’est pas avoir acheté : entre les deux, il y a les vérifications, et c’est là que cette vente s’est arrêtée.',
          'Dans un bien ancien, demandez les autorisations des travaux réalisés avant d’enchérir, pas après.',
          'Une pièce en souplex et un jardin privatif sont deux éléments dont le statut se vérifie dans le règlement de copropriété.',
          'Un classement G annonce des travaux : ils se chiffrent avant de fixer son prix maximal.',
        ],
      },
    ],
    faq: [
      {
        q: 'Où se trouve l’appartement parisien de Brigitte Bardot ?',
        a: 'Dans le quartier de la Muette, dans le 16e arrondissement de Paris.',
      },
      {
        q: 'À quel prix a-t-il été mis en vente ?',
        a: 'La mise à prix était de 1 050 000 euros, honoraires compris, pour une vente notariale en ligne les 11 et 12 juin 2026.',
      },
      {
        q: 'L’appartement a-t-il été vendu ?',
        a: 'Pas à la date des articles consultés. La vente engagée après l’enchère a été abandonnée à l’automne 2026.',
      },
    ],
    sources: [
      { label: 'Ecostylia, 28 mai 2026, « L’appartement parisien attribué à Brigitte Bardot révèle les zones grises d’une succession encore sous tension »', url: 'https://www.ecostylia.com/fr/bardot-appartement-paris/' },
      { label: 'Le Tribunal du Net, 30 mai 2026, « L’appartement parisien de Brigitte Bardot mis en vente en catimini : mise à prix fixée à 1,05 million d’euros »', url: 'https://www.letribunaldunet.fr/people/appartement-brigitte-bardot-paris-vente-enchere-prix.html' },
      { label: 'Purepeople, 19 octobre 2026, article sur l’annulation de la vente de l’appartement parisien de Brigitte Bardot', url: 'https://www.purepeople.com/article/nous-avons-du-nous-desister-la-vente-de-lappartement-parisien-de-brigitte-bardot-annulee-lacheteuse-qui-nest-pas-une-inconnue-sexplique_a555329/1' },
    ],
  },
  {
    slug: 'acheter-un-bien-vendu-par-l-etat',
    art: 'phare',
    title: 'Phare, maison forestière, ancienne caserne : comment l’État vend ses biens, et à qui',
    description:
      'L’État vend des biens dont il n’a plus l’usage, parfois très atypiques. Enchères en ligne de 48 heures, visite obligatoire, priorité des communes : le déroulé, d’après la presse.',
    category: 'Marché',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 5,
    intro:
      'Une maison de gardien de phare, une maison éclusière, une ancienne gendarmerie, un logement de fonction au bord de l’eau : l’État possède des biens qu’aucune agence n’a en vitrine, et il en vend régulièrement. Ces ventes sont ouvertes aux particuliers. Elles ne ressemblent pas à un achat classique : voici comment elles se déroulent, d’après la presse qui les a décrites en 2026.',
    takeaways: [
      'L’État vend les biens dont il n’a plus l’usage sur un site officiel de cessions et, depuis 2022, par des enchères en ligne confiées à une plateforme privée.',
      'Les communes et les autres collectivités sont servies les premières : un bien n’arrive sur le marché que si elles n’en veulent pas.',
      'Une enchère dure 48 heures, et la visite du bien est obligatoire pour s’inscrire.',
      'Le prix de départ ne dit rien du coût des travaux, souvent lourds sur ces bâtiments.',
    ],
    sections: [
      {
        title: 'Quels biens l’État vend-il ?',
        paragraphs: [
          'Ceux qui ne servent plus au service public. La presse cite d’anciens bureaux et des terrains, mais aussi des biens plus rares.',
        ],
        list: [
          'Des phares automatisés et des maisons de gardiens.',
          'Des maisons éclusières et des maisons forestières.',
          'D’anciennes gares, casernes de gendarmerie et maisons d’arrêt.',
          'Des logements de fonction.',
        ],
      },
      {
        title: 'Qui vend, et où trouver les annonces ?',
        paragraphs: [
          'La direction de l’Immobilier de l’État, et pour les logements les services des finances publiques. Les annonces paraissent sur le site officiel des cessions immobilières de l’État.',
          'Depuis 2022, une partie des ventes passe par une plateforme d’enchères en ligne, Agorastore. D’après le média spécialisé Acteurs Publics, 300 biens avaient été vendus par ce canal début 2026.',
        ],
      },
      {
        title: 'Un particulier peut-il vraiment acheter ?',
        paragraphs: [
          'Oui. Mais il passe après les collectivités : les biens leur sont d’abord proposés, et elles exercent cette priorité assez régulièrement, selon Acteurs Publics. Un bien mis aux enchères est donc un bien que la commune n’a pas pris.',
        ],
      },
      {
        title: 'Comment se déroule une enchère ?',
        list: [
          'L’annonce précise la forme de la vente et ses dates.',
          'La visite est obligatoire avant de pouvoir s’inscrire.',
          'L’enchère est ouverte pendant 48 heures, et les offres sont visibles en temps réel.',
          'L’État fixe un prix de réserve : en dessous, il peut déclarer la vente infructueuse.',
          'La meilleure offre n’est pas seulement la plus haute : le sérieux du projet et la capacité à payer sont aussi regardés.',
        ],
      },
      {
        title: 'À quoi ressemble une vente, concrètement ?',
        paragraphs: [
          'À Bonifacio, en Corse, l’État a mis aux enchères au printemps 2026 un ancien logement de fonction près du port : deux petits bâtiments totalisant 117 m², sur un terrain de 1 370 m², pour une mise à prix de 530 000 euros. D’après le média Corse Net Infos, l’enchère était ouverte du 21 au 23 avril. Le prix final n’a pas été trouvé dans les sources consultées.',
          'À l’autre bout de l’échelle, un article de 2023 citait une maison forestière de 100 m² vendue 98 000 euros à un particulier.',
        ],
      },
      {
        title: 'Quels sont les pièges ?',
        paragraphs: [
          'Ils tiennent au bien plus qu’à la procédure. Ces bâtiments n’ont pas été conçus pour être habités, ou ne le sont plus depuis longtemps.',
        ],
        list: [
          'Les travaux : toiture, isolation, raccordement aux réseaux.',
          'Les protections : un bien classé ou protégé ne se transforme pas librement.',
          'L’usage : un phare ne devient pas un gîte par simple décision de son acheteur.',
          'Le calendrier : une enchère de 48 heures laisse peu de place à l’hésitation, et il faut avoir fait ses comptes avant.',
        ],
      },
      {
        title: 'Qu’est-ce que les articles ne disent pas ?',
        paragraphs: [
          'Le montant de la garantie à verser pour enchérir, les frais à la charge de l’acheteur, et la possibilité ou non d’acheter sous condition d’obtention d’un prêt. Ces points sont à chercher dans les conditions de chaque vente : c’est la première chose à lire, avec votre banque et votre notaire.',
        ],
      },
    ],
    checklist: {
      title: 'Avant d’enchérir sur un bien de l’État',
      items: [
        'J’ai lu les conditions de la vente en entier.',
        'J’ai visité le bien, si possible avec un artisan ou un architecte.',
        'Je sais si le bien est protégé et ce que le plan local d’urbanisme permet d’en faire.',
        'J’ai un chiffrage des travaux, pas seulement la mise à prix.',
        'Mon financement est prêt avant l’ouverture de l’enchère.',
      ],
    },
    faq: [
      {
        q: 'Où voir les biens que l’État met en vente ?',
        a: 'Sur le site officiel des cessions immobilières de l’État, et sur la plateforme d’enchères en ligne Agorastore pour une partie d’entre eux.',
      },
      {
        q: 'Peut-on acheter un phare ?',
        a: 'Oui, quand l’État en vend un. Encore faut-il que les collectivités n’aient pas exercé leur priorité, et que les règles de protection du bien permettent le projet envisagé.',
      },
      {
        q: 'Combien de temps dure une enchère de l’État ?',
        a: 'Quarante-huit heures, d’après la presse spécialisée. La visite du bien, obligatoire, a lieu avant.',
      },
    ],
    sources: [
      { label: 'Acteurs Publics, 19 mai 2026, « Comment l’État tire parti de la vente aux enchères en ligne pour céder ses biens immobiliers »', url: 'https://acteurspublics.fr/articles/comment-letat-tire-parti-de-la-vente-aux-encheres-en-ligne-pour-ceder-ses-biens-immobiliers-non-utilises-comment-letat-digitalise-la-cession-de-ses-biens-immobiliers-via-les-ventes-aux-encheres/' },
      { label: 'Corse Net Infos, 28 mars 2026, « Pourquoi l’État met aux enchères une maison à Bonifacio ? »', url: 'https://www.corsenetinfos.corsica/Pourquoi-l-Etat-met-aux-encheres-une-maison-a-Bonifacio_a89633.html' },
      { label: 'Le Tribunal du Net, 14 novembre 2026, « Adieu le loyer : phares, gares, maisons éclusières… l’État vend ses biens les plus fous »', url: 'https://www.letribunaldunet.fr/argent/biens-insolites-vendus-par-etat-phare-gare-ecluse.html' },
      { label: '24matins, 24 novembre 2023, « L’État cède de nombreux biens immobiliers sur son site à des prix parfois intéressants »', url: 'https://www.24matins.fr/letat-cede-de-nombreux-biens-immobiliers-sur-son-site-a-des-prix-parfois-interessants-1367811' },
    ],
  },
  {
    slug: 'appartement-dora-maar-dessins-picasso-a-vendre',
    art: 'cheminee',
    title: 'À Paris, l’appartement de Dora Maar est à vendre, avec des dessins de Picasso sur le mur du salon',
    description:
      'À Saint-Germain-des-Prés, l’appartement où Dora Maar a vécu de 1946 à 1997 est en vente pour 2,85 millions d’euros. Sur un mur du salon, une quinzaine de dessins attribués à Picasso.',
    category: 'Hors norme',
    published: '2026-11-28',
    updated: '2026-11-28',
    readMinutes: 4,
    intro:
      'Il y a des biens que l’on achète pour leur volume, d’autres pour leur vue. Celui-ci se distingue par un mur. Dans le salon de l’appartement parisien où la photographe et peintre Dora Maar a vécu un demi-siècle, une quinzaine de petits dessins d’insectes sont restés en place, attribués à Picasso. L’appartement est en vente depuis la fin novembre 2026.',
    takeaways: [
      'L’appartement se trouve à Saint-Germain-des-Prés, dans le 6e arrondissement de Paris.',
      'Il mesure 148 m², au premier étage sans ascenseur, avec 3,75 m sous plafond.',
      'Dora Maar y a vécu de 1946 à sa mort, en 1997.',
      'Prix demandé : 2,85 millions d’euros.',
    ],
    sections: [
      {
        title: 'De quel bien s’agit-il ?',
        paragraphs: [
          'D’un appartement de 148 m² derrière une porte cochère, au premier étage d’un immeuble du XVIIe siècle. D’après la presse, l’immeuble aurait été élevé en 1675 sur les restes d’un ancien hôtel particulier, dont subsisteraient des poutres bien plus anciennes, mises au jour pendant des travaux.',
          'Le salon mesure 48 m², avec une cheminée en état de marche. On compte deux chambres et un bureau, un parquet en point de Hongrie et 3,75 m de hauteur sous plafond.',
        ],
      },
      {
        title: 'Que sont ces dessins ?',
        paragraphs: [
          'Une quinzaine de petits dessins faits à la main, à même le mur du salon, près de la cheminée. Ils représentent des insectes : araignées, fourmis, cafards. Ils sont aujourd’hui protégés par des plaques de verre.',
          'D’après les articles consultés, ils ont été reconnus par l’organisme qui gère l’œuvre de Picasso. Aucun de ces articles ne dit s’ils font l’objet d’une protection au titre des monuments historiques.',
        ],
      },
      {
        title: 'Quel est le lien avec Dora Maar et Picasso ?',
        paragraphs: [
          'Dora Maar, photographe et peintre, a rencontré Picasso au milieu des années 1930 et a été sa compagne pendant plusieurs années. Elle s’est installée dans cet appartement en 1946 et y est restée jusqu’à sa mort, en 1997.',
        ],
      },
      {
        title: 'À quel prix est-il vendu ?',
        paragraphs: [
          'Le prix demandé est de 2,85 millions d’euros. La presse indique 5 600 euros de charges annuelles et 2 250 euros de taxe foncière. La vente est confiée à une agence parisienne, Philippe Menager - Nicolas Hug, d’après le site Purepeople.',
          'Un prix demandé n’est pas un prix de vente : celui-ci ne sera connu qu’une fois la vente conclue.',
        ],
      },
      {
        title: 'Qu’achète-t-on quand on achète un mur dessiné ?',
        paragraphs: [
          'Les articles ne le disent pas, et c’est la première chose qu’un acheteur voudrait savoir. Un bien qui porte une œuvre sur ses murs pose des questions qu’un appartement ordinaire ne pose pas.',
        ],
        list: [
          'Les dessins sont-ils compris dans la vente, et l’acte le précise-t-il ?',
          'Le propriétaire a-t-il des obligations de conservation, ou le droit de les déplacer ?',
          'Comment sont-ils assurés, et qui paie leur entretien ?',
          'Quels travaux restent possibles dans la pièce ?',
        ],
      },
      {
        title: 'Et pour un bien atypique plus ordinaire ?',
        paragraphs: [
          'Peu de biens portent une signature pareille, mais beaucoup ont « une histoire » : un atelier d’artiste, une fresque, une verrière d’origine, un décor ancien. Ce qui fait leur charme peut aussi limiter ce que l’on a le droit d’y faire. Mieux vaut le demander au notaire avant de signer.',
        ],
      },
    ],
    faq: [
      {
        q: 'Où se trouve l’appartement de Dora Maar ?',
        a: 'À Saint-Germain-des-Prés, dans le 6e arrondissement de Paris. Elle y a vécu de 1946 à 1997.',
      },
      {
        q: 'Combien coûte-t-il ?',
        a: 'Le prix demandé est de 2,85 millions d’euros, pour 148 m² au premier étage.',
      },
      {
        q: 'Les dessins de Picasso sont-ils vendus avec l’appartement ?',
        a: 'Les articles consultés ne le précisent pas. Ils indiquent seulement que les dessins sont toujours en place sur le mur du salon, sous verre.',
      },
    ],
    sources: [
      { label: 'Purepeople, 23 novembre 2026, « A Saint-Germain-des-Prés, l’appartement de 148m² de Dora Maar, muse de Picasso, mis en vente pour plusieurs millions d’euros »', url: 'https://www.purepeople.com/article/a-saint-germain-des-pres-lappartement-de-148m-de-dora-maar-muse-de-picasso-mise-en-vente-pour-plusieurs-millions-deuros_a556359/1' },
      { label: 'USA Art News, 24 novembre 2026, article sur la mise en vente de l’appartement parisien de Dora Maar', url: 'https://usaartnews.com/art-market/dora-maars-paris-apartment-with-picasso-wall-art-lists-for-285-million/' },
      { label: 'Beloud, 26 novembre 2026, « Un appartement orné de dessins de Picasso proposé à la vente pour près de trois millions d’euros »', url: 'https://www.beloud.com/news/149376639' },
    ],
  },
  {
    slug: 'atelier-pollock-krasner-new-york-a-vendre',
    art: 'atelier',
    title: 'À New York, l’ancien atelier de Jackson Pollock et Lee Krasner est à vendre',
    description:
      'Une ancienne remise à calèches de Greenwich Village, où Jackson Pollock et Lee Krasner ont travaillé vers 1950, est en vente pour près de 8 millions de dollars. Ce que l’on sait du bien.',
    category: 'Hors norme',
    published: '2026-11-27',
    updated: '2026-11-27',
    readMinutes: 4,
    intro:
      'Une impasse fermée derrière Washington Square, dix maisons, et parmi elles une ancienne remise à calèches coiffée d’une verrière. Jackson Pollock et Lee Krasner y ont eu leur atelier au tournant des années 1950. Le bien est en vente depuis l’automne 2026. Il réunit à peu près tout ce qui fait un bien atypique : une autre vie avant, un volume, une voie privée, et un nom.',
    takeaways: [
      'Le bien se trouve au 9 MacDougal Alley, une impasse fermée de Greenwich Village, à Manhattan.',
      'C’est une maison de trois niveaux d’environ 139 m², construite en 1879 comme remise à calèches.',
      'Jackson Pollock et Lee Krasner y ont travaillé en 1949 et 1950, d’après la presse new-yorkaise.',
      'Prix demandé : 7 995 000 dollars.',
    ],
    sections: [
      {
        title: 'De quel bien s’agit-il ?',
        paragraphs: [
          'D’une maison de ville de trois niveaux, l’une des dix maisons privées de MacDougal Alley. La rue date de 1833 ; la maison a été construite en 1879 pour abriter des calèches, d’après le magazine The Spaces. Elle mesure environ 1 500 pieds carrés, soit près de 139 m².',
          'À l’étage, un grand atelier à double hauteur est éclairé par une verrière. On trouve aussi une cheminée à bois, des plafonds à poutres, un balcon au sud, une terrasse sur le toit, un petit jardin et une place de stationnement.',
        ],
      },
      {
        title: 'Quel est son lien avec Pollock et Krasner ?',
        paragraphs: [
          'Le couple de peintres y a travaillé en 1949 et 1950, selon le site new-yorkais 6sqft. D’après un autre média que ce site reprend, la maison leur était prêtée par un ami et mécène de Pollock, Alfonso Ossorio, et ils y ont aussi vécu.',
          'Les articles consultés ne disent pas quelles œuvres ont été faites dans cette maison.',
        ],
      },
      {
        title: 'À quel prix, et par qui est-il vendu ?',
        paragraphs: [
          'Le prix demandé est de 7 995 000 dollars. La vente est confiée à l’agence Sotheby’s International Realty. D’après la presse new-yorkaise, la maison n’a pas changé de propriétaire depuis décembre 1988.',
          'Un prix demandé n’est pas un prix de vente : celui-ci ne sera connu qu’une fois la vente conclue.',
        ],
      },
      {
        title: 'Un autre atelier de Pollock est-il en vente ?',
        paragraphs: [
          'Oui, d’après 6sqft. Un loft d’environ 60 m², au dernier étage d’une maison de 1827 du West Village, a été remis en vente début octobre 2026 pour 1 990 000 dollars. Pollock y aurait logé en 1932 avec son frère.',
        ],
      },
      {
        title: 'Qu’est-ce que ce bien a d’atypique, nom mis à part ?',
        list: [
          'Une autre vie avant : une remise à calèches devenue atelier, puis maison.',
          'Un volume : une pièce à double hauteur sous verrière, ce que l’on cherche dans un atelier d’artiste.',
          'Une situation rare : une impasse fermée, à l’écart de la circulation, en plein centre.',
          'Un dehors en ville : jardin, balcon et toit-terrasse.',
        ],
      },
      {
        title: 'Et en France ?',
        paragraphs: [
          'Les mêmes ingrédients existent à Paris, sans la signature : anciennes remises et écuries au fond des cours, ateliers à verrière des cités d’artistes, maisons sur des voies privées. Les questions à poser sont les mêmes qu’ailleurs : qui entretient la voie, ce que le règlement autorise, et ce que la verrière coûte à chauffer.',
        ],
      },
    ],
    faq: [
      {
        q: 'Où se trouve l’ancien atelier de Pollock à New York ?',
        a: 'Au 9 MacDougal Alley, une impasse fermée de Greenwich Village, derrière Washington Square Park.',
      },
      {
        q: 'Combien coûte-t-il ?',
        a: 'Le prix demandé est de 7 995 000 dollars, pour environ 139 m² sur trois niveaux.',
      },
      {
        q: 'Pollock y a-t-il habité longtemps ?',
        a: 'Non. D’après la presse new-yorkaise, il y a travaillé avec Lee Krasner en 1949 et 1950.',
      },
    ],
    sources: [
      { label: '6sqft, 26 octobre 2026, « Jackson Pollock and Lee Krasner’s former Greenwich Village studio lists for $8M »', url: 'https://www.6sqft.com/jackson-pollock-and-lee-krasners-former-greenwich-village-studio-lists-for-8m/' },
      { label: 'The Spaces, 2 novembre 2026, « Jackson Pollock and Lee Krasner’s former Greenwich Village studio is for sale »', url: 'https://thespaces.com/jackson-pollock-and-lee-krasner-s-former-greenwich-village-studio-is-for-sale/' },
    ],
  },
  {
    slug: 'locaux-transformes-en-logements-les-chiffres',
    art: 'bureau',
    title: 'Bureaux, granges, commerces devenus logements : 22 000 par an, et ce que cela dit du marché',
    description:
      'Une étude publiée par la Banque des Territoires compte les logements nés d’un local transformé : 241 800 entre 2013 et 2023, dont 40 % créés par des particuliers. Les chiffres, et les limites.',
    category: 'Marché',
    published: '2026-11-27',
    updated: '2026-11-27',
    readMinutes: 5,
    intro:
      'Un loft dans d’anciens bureaux, une grange habitée, une boutique devenue maison de ville : ces biens ont longtemps passé pour des curiosités. Une étude publiée en juin 2026 par la Banque des Territoires les compte de 2013 à 2023, à partir des autorisations d’urbanisme. Le résultat surprend par son ampleur, et il éclaire ce qu’un acheteur doit regarder dans un bien transformé.',
    takeaways: [
      'Entre 2013 et 2023, 241 800 logements ont été créés en France par la transformation d’un local d’activité : environ 22 000 par an.',
      'Cela représente 5,4 % des logements produits sur la période.',
      'Les bureaux arrivent en tête (24 %), juste devant les bâtiments agricoles (22 %).',
      'Quatre logements sur dix ont été créés par des particuliers, et l’opération moyenne ne compte que 2,4 logements.',
    ],
    sections: [
      {
        title: 'Que compte l’étude ?',
        paragraphs: [
          'Elle porte sur tous les locaux d’activité qui ont changé de destination pour devenir des logements, entre 2013 et 2023. Elle a été réalisée par une chaire de recherche de deux écoles d’architecture parisiennes, à partir de la base nationale des permis de construire et des déclarations préalables.',
          'Sur la période, elle recense 99 200 opérations et 17,4 millions de mètres carrés transformés. Le rythme annuel est passé d’environ 18 000 à 25 000 logements, soit une hausse moyenne de 3 % par an.',
        ],
      },
      {
        title: 'D’où viennent ces logements ?',
        paragraphs: [
          'Pas seulement des tours de bureaux. La répartition par bâtiment d’origine montre un phénomène très dispersé.',
        ],
        list: [
          'Bureaux : 24 %.',
          'Bâtiments agricoles : 22 %.',
          'Bâtiments de services publics : 14 %.',
          'Commerces : 12 %.',
          'Entrepôts : 10 %.',
          'Hôtels et hébergements : 9 %.',
          'Usines et ateliers d’artisans : une part marginale.',
        ],
      },
      {
        title: 'Qui transforme ?',
        paragraphs: [
          'D’abord des particuliers : ils sont à l’origine de 40 % des logements créés, contre un tiers pour les promoteurs et les investisseurs. Près de la moitié de ces logements (42 %) sont des maisons individuelles.',
          'Ces transformations se trouvent partout, dans les centres des grandes villes comme à la campagne. Les grandes opérations, elles, se concentrent dans les métropoles. Quand on ne regarde que les immeubles tertiaires transformés en plusieurs logements, les promoteurs dominent et l’opération moyenne approche dix logements.',
        ],
      },
      {
        title: 'Un exemple : à quoi ressemble une grande opération ?',
        paragraphs: [
          'À Hayange, en Moselle, les anciens bureaux d’une dynastie de maîtres de forges, construits entre 1892 et 1906 et abandonnés à la fin des années 1970, sont en cours de transformation en 125 logements. Le bâtiment est classé monument historique depuis 2013.',
          'D’après le site spécialisé Batiweb, le chantier a commencé en juillet 2026 pour une livraison annoncée fin 2027. Selon l’opérateur, 120 logements avaient déjà trouvé preneur à cette date.',
        ],
      },
      {
        title: 'Qu’est-ce qui rend une transformation difficile ?',
        paragraphs: [
          'L’étude liste les obstacles que rencontrent ces projets. Ce sont aussi les points à regarder quand on achète un bien déjà transformé.',
        ],
        list: [
          'La profondeur du bâtiment : au-delà de quinze mètres, il devient difficile d’éclairer et de ventiler naturellement le cœur du logement.',
          'La surface perdue : une transformation restitue 70 à 75 % de la surface en surface habitable, contre environ 90 % dans le neuf.',
          'Les grandes baies vitrées, qui peuvent peser sur la performance énergétique.',
          'L’acoustique et la sécurité incendie, plus exigeantes pour un logement que pour un local.',
          'L’urbanisme et la copropriété : le plan local d’urbanisme doit permettre le changement de destination, et le règlement de copropriété peut exiger l’accord des autres copropriétaires.',
        ],
      },
      {
        title: 'Une transformation coûte-t-elle moins cher que du neuf ?',
        paragraphs: [
          'Pas forcément. L’étude rapporte que certains professionnels avancent un surcoût de 15 à 20 % par rapport à une construction neuve. Les économies faites sur la structure sont en partie absorbées par les renforcements, l’isolation acoustique, le désamiantage et les imprévus.',
          'Les auteurs soulignent surtout que les coûts réels sont rarement publiés et varient beaucoup d’un projet à l’autre.',
        ],
      },
      {
        title: 'Quelles sont les limites de ces chiffres ?',
        paragraphs: [
          'Ils comptent des autorisations, pas des logements livrés ni des biens à vendre. Ils ne disent rien de la qualité des logements obtenus. Et les projections de l’étude pour les années à venir prolongent une tendance : ce ne sont pas des observations.',
          'Ils montrent en revanche une chose : le bien « qui a eu une autre vie » n’est plus une exception. Les vérifications à faire avant d’acheter, elles, ne changent pas.',
        ],
      },
    ],
    checklist: {
      title: 'Devant un bien issu d’une transformation',
      items: [
        'J’ai l’autorisation d’urbanisme du changement de destination.',
        'J’ai vérifié ce que dit le règlement de copropriété sur l’usage du lot.',
        'Je sais quelles pièces reçoivent la lumière du jour, et lesquelles sont en second jour.',
        'J’ai comparé la surface annoncée et la surface réellement habitable.',
        'J’ai lu le DPE en regardant la part des vitrages.',
      ],
    },
    faq: [
      {
        q: 'Combien de logements naissent chaque année d’un local transformé ?',
        a: 'Environ 22 000 par an en moyenne entre 2013 et 2023, d’après l’étude publiée par la Banque des Territoires, soit 5,4 % des logements produits.',
      },
      {
        q: 'Les usines transformées en lofts pèsent-elles lourd dans ces chiffres ?',
        a: 'Non. Les bâtiments industriels et artisanaux ne représentent qu’une part marginale des logements créés. Les bureaux et les bâtiments agricoles en fournissent près de la moitié à eux deux.',
      },
      {
        q: 'Un particulier peut-il transformer lui-même un local en logement ?',
        a: 'Oui, et c’est fréquent : 40 % des logements créés l’ont été par des particuliers. Il faut une autorisation d’urbanisme et, en copropriété, respecter le règlement.',
      },
    ],
    sources: [
      { label: 'Banque des Territoires, Éclairages n° 36, juin 2026, « Transformer des bâtiments non résidentiels en logements : un bilan rétrospectif, une analyse du potentiel »', url: 'https://www.banquedesterritoires.fr/sites/default/files/2026-09/Eclairages_36_TRANSFORMER_BATIMENTS_NON_RESIDENTIELS_EN_LOGEMENTS_Juin_26.pdf' },
      { label: 'Batiweb, 16 juillet 2026, « De monument industriel à projet résidentiel, la transformation du domaine de Wendel »', url: 'https://www.batiweb.com/actualites/patrimoine/domaine-wendel-hayange-rehabilitation-125-logements-49099' },
    ],
  },
  {
    slug: 'dpe-et-aides-ce-qui-change-au-1er-janvier-2027',
    art: 'dpe',
    title: 'DPE et aides à la rénovation : ce qui change au 1er janvier 2027 pour un bien à rénover',
    description:
      'Au 1er janvier 2027, l’électricité pèse moins dans le calcul du DPE. Ce que deviennent les diagnostics déjà faits, ce qui a changé pour MaPrimeRénov’, et ce qu’un acheteur doit vérifier.',
    category: 'Surfaces et travaux',
    published: '2026-11-27',
    updated: '2026-11-27',
    readMinutes: 5,
    intro:
      'Un ancien atelier chauffé par des convecteurs, un loft sous verrière, une grange à isoler : quand on achète un bien à rénover, l’étiquette énergie et les aides comptent dans le budget. Or les deux bougent. Le calcul du DPE change au 1er janvier 2027, et les règles de MaPrimeRénov’ ont été resserrées à l’été 2026. Voici ce qui est acté, d’après le ministère et la presse spécialisée, et ce qui ne l’est pas encore.',
    takeaways: [
      'Au 1er janvier 2027, le coefficient appliqué à l’électricité dans le DPE passe de 1,9 à 1,7. Un bien chauffé à l’électricité peut y gagner une classe, sans travaux.',
      'Les DPE déjà réalisés restent valables. À partir du 1er janvier 2027, leur mise à jour est gratuite, en ligne, sans nouvelle visite.',
      'Depuis le 1er septembre 2026, MaPrimeRénov’ ne finance plus plusieurs travaux réalisés seuls, dont l’isolation et la ventilation.',
      'Le barème des aides pour 2027 dépend du budget de l’État, qui n’était pas adopté fin novembre 2026.',
    ],
    sections: [
      {
        title: 'Qu’est-ce qui change dans le calcul du DPE ?',
        paragraphs: [
          'Le DPE convertit l’électricité consommée en « énergie primaire » à l’aide d’un coefficient. Ce coefficient était de 2,3 ; il est passé à 1,9 au 1er janvier 2026 ; il passera à 1,7 au 1er janvier 2027. Le ministère chargé de l’écologie l’a annoncé le 31 août 2026, à la parution de l’arrêté, daté du 19 août.',
          'Plus le coefficient est bas, moins l’électricité pèse dans le résultat. Selon le ministère, aucun logement ne verra son étiquette se dégrader. D’après les diagnostiqueurs, les biens chauffés au gaz, au fioul ou au bois ne sont pas concernés.',
        ],
      },
      {
        title: 'Quels biens atypiques sont concernés ?',
        paragraphs: [
          'Ceux qui sont chauffés à l’électricité. C’est fréquent dans les anciens locaux d’activité transformés en logements, où l’on a posé des convecteurs faute de raccordement au gaz ou au chauffage de l’immeuble.',
          'Le changement ne rend pas le bien plus facile à chauffer. Un grand volume sous verrière consommera autant le 2 janvier que le 31 décembre : seule la façon de compter évolue.',
        ],
      },
      {
        title: 'Que devient un DPE déjà réalisé ?',
        paragraphs: [
          'Il reste valable jusqu’à sa date d’expiration. À partir du 1er janvier 2027, son propriétaire pourra obtenir gratuitement une attestation avec la nouvelle étiquette, sur le site de l’Observatoire DPE-Audit de l’Ademe, sans faire revenir le diagnostiqueur.',
          'Sans cette attestation, c’est l’étiquette d’origine qui continue de s’appliquer. Si vous signez début 2027 pour un bien chauffé à l’électricité, demandez au vendeur l’attestation à jour.',
        ],
      },
      {
        title: 'Qu’est-ce qui a changé pour MaPrimeRénov’ ?',
        paragraphs: [
          'Un décret et deux arrêtés du 25 août 2026 s’appliquent aux demandes déposées depuis le 1er septembre 2026. D’après la Banque des Territoires, plusieurs travaux ne sont plus aidés lorsqu’ils sont réalisés seuls.',
        ],
        list: [
          'L’isolation et la ventilation.',
          'Le chauffage et l’eau chaude au bois.',
          'Les chauffe-eau thermodynamiques et le solaire thermique.',
          'Pour la rénovation complète d’une maison : aucune aide si un chauffage au gaz ou au fioul est installé ou conservé.',
        ],
      },
      {
        title: 'Une meilleure étiquette peut-elle faire perdre une aide ?',
        paragraphs: [
          'C’est le revers du nouveau calcul. La rénovation complète aidée par MaPrimeRénov’ vise les logements classés E, F ou G avant travaux, avec un gain d’au moins deux classes. D’après le comparateur Selectra, un bien qui passerait de E à D par le seul effet du nouveau coefficient sortirait de ce cadre.',
          'Si vous comptez sur cette aide pour un bien chauffé à l’électricité et classé E, posez la question à un conseiller France Rénov’ avant de signer, pas après.',
        ],
      },
      {
        title: 'Qu’est-ce qui n’est pas encore décidé ?',
        paragraphs: [
          'Les montants et les plafonds de 2027. Ils dépendent de la loi de finances, qui n’était pas adoptée fin novembre 2026. Les sites spécialisés évoquent d’autres évolutions, notamment pour les pompes à chaleur, mais aucun texte n’était publié à cette date.',
          'Un devis d’aides établi aujourd’hui vaut donc pour une demande déposée aujourd’hui. Ne bâtissez pas un budget de travaux sur une aide dont le barème n’est pas connu.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer pour un bien à rénover',
      items: [
        'Je connais l’énergie de chauffage du bien et la date de son DPE.',
        'Pour un bien chauffé à l’électricité, j’ai demandé si l’étiquette changera en 2027.',
        'J’ai vérifié auprès de France Rénov’ si le bien et mes travaux ouvrent droit à une aide, à la date où je déposerai la demande.',
        'Mon budget de travaux tient sans les aides ; elles viennent en plus.',
        'Pour un ancien local devenu logement, j’ai demandé si son ancienneté et son statut sont reconnus pour les aides.',
      ],
    },
    faq: [
      {
        q: 'Faut-il refaire son DPE en 2027 ?',
        a: 'Non. Le DPE reste valable, et sa mise à jour avec le nouveau coefficient est gratuite et se fait en ligne à partir du 1er janvier 2027.',
      },
      {
        q: 'Un bien chauffé au gaz change-t-il d’étiquette ?',
        a: 'Non, d’après les diagnostiqueurs : le changement ne porte que sur l’électricité.',
      },
      {
        q: 'L’isolation d’une toiture ou d’une verrière est-elle encore aidée ?',
        a: 'Plus par MaPrimeRénov’ lorsqu’elle est réalisée seule, depuis le 1er septembre 2026. Elle peut l’être dans le cadre d’une rénovation complète, sous conditions. D’autres dispositifs existent : renseignez-vous auprès de France Rénov’.',
      },
    ],
    sources: [
      { label: 'Ministère chargé de l’écologie, communiqué du 31 août 2026 sur l’arrêté abaissant à 1,7 le coefficient de l’électricité au 1er janvier 2027', url: 'https://www.ecologie.gouv.fr/presse/dpe-audits-energetiques-publication-larrete-abaissant-facteur-conversion-lelectricite-17-1er' },
      { label: 'Banque des Territoires, 1er septembre 2026, « Rénovation énergétique : les grands changements du DPE et de MaPrimeRénov’ parus cet été »', url: 'https://www.banquedesterritoires.fr/renovation-energetique-les-grands-changements-du-dpe-et-de-maprimerenov-parus-cet-ete' },
      { label: 'Dimo Diagnostic, 16 septembre 2026, « Nouveau DPE : ce qui change en 2026 et 2027 »', url: 'https://www.dimo-diagnostic.net/actualite-diagnostic-immobilier/nouveau-dpe' },
      { label: 'Selectra, 26 août 2026, « Votre DPE gagne une lettre en 2027, votre MaPrimeRénov’ peut perdre 8 000 € »', url: 'https://selectra.info/energie/actualites/renovation-energetique/dpe-1-7-2027-maprimerenov-ampleur-saut-classes-aide-perdue' },
      { label: 'LogementInfo, mis à jour le 10 novembre 2026, « MaPrimeRénov’ 2027 : montants actuels, projet en discussion »', url: 'https://logementinfo.fr/guides/maprimerenov-2027-guide-complet-proprietaire' },
      { label: 'Clic Travaux, 11 novembre 2026, « Aides à la rénovation 2027 : ce qui change au 1er janvier, et ce qui dépend encore du budget »', url: 'https://www.clictravaux.com/aides-renovation-2027/' },
    ],
  },
  {
    slug: 'laforet-collection-biens-de-caractere',
    art: 'hotel',
    title: 'Laforêt Collection : un grand réseau généraliste s’installe sur les biens de caractère',
    description:
      'Laforêt a lancé en octobre 2026 une enseigne à part pour les maisons de famille et les biens de caractère. Ce qu’elle vise, où elle ouvre, et ce que cela change pour un acheteur.',
    category: 'Actu réseau',
    published: '2026-11-26',
    updated: '2026-11-26',
    readMinutes: 4,
    intro:
      'Le 22 octobre 2026, le réseau Laforêt a présenté à Paris une nouvelle enseigne, Laforêt Collection, consacrée aux maisons de famille et aux biens de caractère. Un réseau généraliste qui crée une marque distincte pour ces biens : c’est un signe de plus que le segment attire. Voici ce que l’on sait, d’après la presse professionnelle.',
    takeaways: [
      'Laforêt Collection est une enseigne séparée, lancée officiellement le 22 octobre 2026, après une agence pilote au Touquet.',
      'Les biens sont choisis pour leur architecture, leur cadre ou leur histoire, pas seulement pour leur prix : mas, manoir, loft industriel, duplex haussmannien.',
      'Le réseau vise 20 à 25 implantations en deux ans, dont plusieurs à Paris.',
    ],
    sections: [
      {
        title: 'De quoi s’agit-il ?',
        paragraphs: [
          'D’une marque à part, avec ses propres agences, qui s’adresse aux vendeurs et aux acheteurs de biens « de famille et de caractère ». Le réseau la situe entre l’immobilier courant et le grand luxe : des biens placés dans le haut de leur marché local, qui sortent de l’ordinaire, sans exiger une adresse prestigieuse ni un prix de plusieurs millions.',
          'Les exemples donnés au lancement parlent d’eux-mêmes : un mas provençal, un manoir, un loft industriel, un duplex haussmannien, un chalet, une villa en bord de mer.',
        ],
      },
      {
        title: 'Où les agences ouvrent-elles ?',
        paragraphs: [
          'Deux adresses existent déjà : Le Touquet, qui a servi de pilote, et la rue de Vaugirard, dans le 6e arrondissement de Paris. Le réseau a annoncé quatre autres ouvertures parisiennes (1er, 4e, 5e et 9e arrondissements), puis Saint-Cloud et Biarritz.',
          'L’objectif affiché est d’une vingtaine d’implantations en deux ans, voire vingt-cinq. Le réseau dit avoir retenu 74 villes en France où l’enseigne aurait sa place.',
        ],
      },
      {
        title: 'Qui peut ouvrir une agence ?',
        paragraphs: [
          'En priorité des agences indépendantes déjà installées dans leur ville, mais aussi des franchisés Laforêt qui veulent se spécialiser. D’après la presse professionnelle, le droit d’entrée est de 14 000 euros hors taxes pour un professionnel déjà en place, et l’aménagement de l’agence coûte de 30 000 à 50 000 euros.',
        ],
      },
      {
        title: 'Notre lecture pour un acheteur',
        paragraphs: [
          'Ce qui suit est notre lecture, pas une information du réseau.',
          'Plus il y a d’enseignes sur les biens de caractère, plus ces biens sont montrés, photographiés et décrits avec soin. C’est une bonne nouvelle pour qui cherche. Mais une belle présentation ne répond pas aux questions qui comptent : la surface réellement comptée, les travaux déclarés ou non, le règlement de copropriété, les charges.',
          'Le mot « caractère » n’a pas de définition légale. Deux agences peuvent l’employer pour des biens très différents. Les vérifications, elles, restent les mêmes quelle que soit l’enseigne.',
        ],
      },
    ],
    faq: [
      {
        q: 'Laforêt Collection remplace-t-elle les agences Laforêt ?',
        a: 'Non. C’est une enseigne distincte, qui s’ajoute au réseau existant.',
      },
      {
        q: 'Faut-il un budget de plusieurs millions pour s’y adresser ?',
        a: 'Non, d’après le réseau : l’enseigne vise des biens situés dans le haut de leur marché local, pas le grand luxe.',
      },
    ],
    sources: [
      { label: 'MySweetImmo, 22 octobre 2026, « Immobilier : Laforêt lance une marque dédiée aux biens de famille et de caractère »', url: 'https://www.mysweetimmo.com/2026/10/22/immobilier-laforet-lance-une-marque-dediee-aux-biens-de-famille-et-de-caractere/' },
      { label: 'MySweetImmo, 29 octobre 2026, entretien avec le président de Laforêt sur les implantations prévues', url: 'https://www.mysweetimmo.com/2026/10/29/agence-immobiliere-on-vise-20-a-25-implantations-laforet-collection-dici-deux-ans-yann-jehanno/' },
    ],
  },
  {
    slug: 'reseau-biens-atypiques-suisse-2027',
    art: 'atypique',
    title: 'Biens atypiques : un réseau de 85 agences prépare son arrivée en Suisse',
    description:
      'Le réseau Espaces Atypiques annonce une première franchise hors de France en 2027, autour de Genève et de Lausanne, et vise 120 agences en 2030. Les chiffres publiés par la presse professionnelle.',
    category: 'Actu réseau',
    published: '2026-11-26',
    updated: '2026-11-26',
    readMinutes: 4,
    intro:
      'Espaces Atypiques, réseau d’agences spécialisé dans les lofts, les maisons d’architecte et les biens hors normes, a présenté à l’automne 2026 ses chiffres de l’année et ses projets. Le plus marquant : une première ouverture hors de France, en Suisse, prévue pour 2027. Tous les chiffres ci-dessous sont ceux que le réseau a communiqués à la presse professionnelle.',
    takeaways: [
      'Une première franchise à l’étranger est annoncée pour 2027, dans le secteur de Genève et de Lausanne.',
      'Le réseau compte 85 agences et en vise 120 en 2030, dans 80 départements.',
      'Pour 2026, il annonce environ 2 200 ventes, à un prix moyen de 520 000 euros, en baisse de 5 %.',
    ],
    sections: [
      {
        title: 'Pourquoi la Suisse ?',
        paragraphs: [
          'Le réseau s’appuie sur la fréquentation de son site : 1,5 million de visites venues de l’étranger en 2026, soit moitié plus qu’il y a deux ans. La première franchise internationale est prévue en 2027, autour de Genève et de Lausanne.',
        ],
      },
      {
        title: 'Que disent les chiffres de 2026 ?',
        paragraphs: [
          'Le réseau, créé en 2008, prévoit pour 2026 un chiffre d’affaires de plus de 48 millions d’euros, en hausse de 2 %, pour environ 2 200 ventes, soit 5 % de plus qu’en 2025.',
        ],
        list: [
          'Prix moyen d’un bien vendu : 520 000 euros, en baisse de 5 %.',
          'Biens à vendre en portefeuille : 6 500, soit 14 % de plus qu’un an plus tôt.',
          'Environ la moitié des acheteurs paient sans crédit.',
        ],
      },
      {
        title: 'Quels objectifs pour 2030 ?',
        paragraphs: [
          'Le réseau vise 120 agences dans 80 départements, 1 000 collaborateurs et 100 millions d’euros de chiffre d’affaires.',
        ],
      },
      {
        title: 'Notre lecture pour un acheteur',
        paragraphs: [
          'Ce qui suit est notre lecture, pas une information du réseau.',
          'Deux chiffres parlent à qui cherche un bien. Le portefeuille grossit plus vite que les ventes : il y a donc davantage de biens atypiques à voir qu’il y a un an. Et le prix moyen recule. Les deux vont dans le même sens que le reste du marché : l’acheteur a plus de choix et plus de temps.',
          'Ces chiffres sont ceux d’un seul réseau. Ils ne décrivent pas tout le marché des biens atypiques, que personne ne mesure à part.',
        ],
      },
    ],
    faq: [
      {
        q: 'Combien d’agences compte ce réseau ?',
        a: '85 à l’automne 2026, d’après la presse professionnelle, avec un objectif de 120 en 2030.',
      },
      {
        q: 'Le prix des biens atypiques baisse-t-il ?',
        a: 'Le prix moyen des biens vendus par ce réseau recule de 5 % en 2026, à 520 000 euros. C’est une moyenne sur un seul réseau, pas un indice du marché.',
      },
    ],
    sources: [
      { label: 'Immo Matin, 15 octobre 2026, « Espaces Atypiques vise plus de 48 M€ de chiffre d’affaires en 2026 »', url: 'https://www.immomatin.com/agences-reseaux/reseaux-franchises/espaces-atypiques-vise-plus-de-48-millions-d-euros-de-chiffre-d-affaires-en-2026.html' },
      { label: 'MySweetImmo, 8 octobre 2026, « Immobilier : Espaces Atypiques vise un chiffre d’affaires de plus de 48 millions d’euros »', url: 'https://www.mysweetimmo.com/2026/10/08/immobilier-espaces-atypiques-vise-un-chiffre-daffaires-de-plus-de-48-millions-deuros/' },
    ],
  },
  {
    slug: 'haut-de-gamme-enseignes-qui-s-etendent-2026',
    art: 'monument',
    title: 'Haut de gamme : trois enseignes qui se sont étendues en 2026',
    description:
      'Engel & Völkers passe à la franchise en France, Kretz ouvre à Bruxelles et à l’île Maurice, Junot rachète une agence en Provence. Le point sur une année d’ouvertures, sources à l’appui.',
    category: 'Actu réseau',
    published: '2026-11-26',
    updated: '2026-11-26',
    readMinutes: 4,
    intro:
      'Les biens de caractère ne sont pas le seul segment où les enseignes se multiplient. Dans le haut de gamme, trois d’entre elles ont annoncé des ouvertures en 2026, chacune à sa manière : la franchise, l’étranger, le rachat. Tour d’horizon, d’après la presse professionnelle.',
    takeaways: [
      'Engel & Völkers se développe désormais en franchise en France : Deauville, Chamonix, Samoëns.',
      'Kretz a lancé sa franchise à l’étranger, avec Bruxelles et l’île Maurice, et vise cinq implantations en 2026.',
      'Junot a racheté une agence des Alpilles et du Luberon et compte trente agences en France et en Belgique.',
    ],
    sections: [
      {
        title: 'Engel & Völkers : la franchise, dans quelques marchés choisis',
        paragraphs: [
          'Le réseau a changé de méthode en France : il s’étend maintenant par la franchise. Trois agences ont été annoncées en février 2026 : Deauville, ouverte fin 2025, puis Chamonix et Samoëns, en Haute-Savoie. Le choix se porte sur des marchés où les biens sont rares et les acheteurs fortunés, français ou étrangers.',
        ],
      },
      {
        title: 'Kretz : d’abord l’étranger',
        paragraphs: [
          'L’agence parisienne a lancé son modèle de franchise hors de France en mars 2026, avec une première adresse à Bruxelles et une deuxième à l’île Maurice. En Belgique, l’objectif est de trois agences en cinq ans, sur des biens à partir de 600 000 euros. Trois autres implantations étaient annoncées pour l’année.',
        ],
      },
      {
        title: 'Junot : le rachat',
        paragraphs: [
          'Junot a ouvert une troisième agence à Bruxelles et racheté une agence des Alpilles et du Luberon, qui lui apporte quatre adresses en Provence. Le réseau annonce trente agences en France et en Belgique.',
          'Il publie aussi un chiffre utile pour mesurer l’humeur du marché : ses ventes se sont conclues en 9,3 semaines en moyenne en 2026, contre 10,3 un an plus tôt.',
        ],
      },
      {
        title: 'Notre lecture pour un acheteur',
        paragraphs: [
          'Ce qui suit est notre lecture, pas une information des réseaux.',
          'Ces enseignes s’installent là où les biens sont rares : stations, littoral, Provence, beaux quartiers. Un bien atypique y croise souvent leur chemin, parce qu’un grand atelier ou une maison d’architecte se vend aussi par ces agences. Pour un acheteur, cela veut dire regarder au-delà des agences spécialisées : le même bien peut être confié à une enseigne de prestige.',
        ],
      },
    ],
    faq: [
      {
        q: 'Une agence de prestige vend-elle des biens atypiques ?',
        a: 'Souvent, oui. Un loft, un hôtel particulier ou une maison d’architecte peuvent être confiés à une enseigne haut de gamme aussi bien qu’à une agence spécialisée.',
      },
    ],
    sources: [
      { label: 'MySweetImmo, 27 février 2026, « Réseau immobilier : Engel & Völkers se lance en franchise en France »', url: 'https://www.mysweetimmo.com/2026/02/27/reseau-immobilier-engel-volkers-se-lance-en-franchise-en-france/' },
      { label: 'MySweetImmo, 16 mars 2026, « Réseau immobilier : Kretz Real Estate lance son modèle de franchise à l’international »', url: 'https://www.mysweetimmo.com/2026/03/16/reseau-immobilier-kretz-real-estate-lance-son-modele-de-franchise-a-linternational/' },
      { label: 'MySweetImmo, 11 juillet 2026, « Immobilier de luxe : le marché repart, Junot ouvre de nouvelles agences »', url: 'https://www.mysweetimmo.com/2026/07/11/immobilier-de-luxe-le-marche-repart-junot-ouvre-de-nouvelles-agences/' },
    ],
  },
  {
    slug: 'taux-credit-fin-novembre-2026',
    art: 'credit',
    title: 'Crédit immobilier : les taux approchent 4 % sur vingt ans fin novembre 2026',
    description:
      'Les taux montent encore en novembre 2026, mais moins vite qu’en octobre : autour de 3,8 % sur vingt ans selon deux courtiers. Les chiffres, les raisons, et ce que cela change pour un achat atypique.',
    category: 'Marché',
    published: '2026-11-26',
    updated: '2026-11-26',
    readMinutes: 4,
    intro:
      'Les taux des crédits immobiliers ont continué de monter en novembre 2026, dans toutes les régions. La hausse ralentit pourtant par rapport à octobre. Voici les relevés de deux courtiers, publiés entre le 18 et le 22 novembre, et ce qu’un acheteur peut en faire. Ce sont des moyennes constatées, pas des offres : le taux d’un dossier dépend de l’emprunteur et de la banque.',
    takeaways: [
      'Sur vingt ans, les moyennes relevées vont de 3,76 % (Pretto) à 3,79 % – 3,95 % selon les régions (Empruntis).',
      'La hausse sur un mois est d’environ 0,1 point, contre 0,15 à 0,28 point en octobre.',
      'Les meilleurs dossiers obtiennent encore autour de 3,20 %, selon Empruntis.',
    ],
    sections: [
      {
        title: 'Où en sont les taux ?',
        paragraphs: [
          'Le courtier Pretto relève en novembre, tous profils confondus, 3,56 % sur quinze ans, 3,76 % sur vingt ans et 3,85 % sur vingt-cinq ans. Au premier trimestre, le taux sur vingt ans était de 3,17 %.',
          'Le courtier Empruntis donne des moyennes par région, sur vingt ans : de 3,79 % en Bourgogne-Franche-Comté à 3,95 % en Île-de-France.',
        ],
      },
      {
        title: 'La hausse ralentit-elle ?',
        paragraphs: [
          'Oui. Selon Empruntis, les taux ont monté dans les treize régions, mais le plus souvent de 0,06 à 0,10 point, contre 0,15 à 0,28 point en octobre. Le meilleur taux relevé reste à 3,20 % dans quatre régions.',
        ],
      },
      {
        title: 'Pourquoi les taux montent-ils ?',
        paragraphs: [
          'Parce que l’argent coûte plus cher aux banques. Le taux auquel l’État français emprunte à dix ans a dépassé 5 % en octobre, un niveau qu’il n’avait pas connu depuis 2002. La Banque centrale européenne a laissé ses taux inchangés le 29 octobre, après deux hausses en juin et en septembre. Les banques répercutent ce surcoût peu à peu.',
        ],
      },
      {
        title: 'Notre lecture pour un bien atypique',
        paragraphs: [
          'Ce qui suit est notre lecture, pas une statistique.',
          'Un bien atypique s’achète rarement en quelques jours : il faut vérifier la surface, les autorisations, parfois chiffrer des travaux. Entre la première visite et l’offre de prêt, plusieurs semaines passent, et le taux peut bouger. Faites vos comptes avec une marge, et demandez à votre banque ou à votre courtier combien de temps sa proposition reste valable.',
          'Si le bien demande des travaux, le budget se joue sur le total, achat et chantier réunis. Quelques dixièmes de point pèsent d’autant plus que la somme empruntée est grande.',
        ],
      },
    ],
    faq: [
      {
        q: 'Quel est le taux moyen sur vingt ans fin novembre 2026 ?',
        a: 'Autour de 3,8 % : 3,76 % selon Pretto, de 3,79 % à 3,95 % selon les régions pour Empruntis. Ce sont des moyennes, pas des offres.',
      },
      {
        q: 'Les taux vont-ils dépasser 4 % ?',
        a: 'Personne ne peut le dire. La hausse a ralenti en novembre, mais les causes qui l’ont provoquée sont toujours là.',
      },
    ],
    sources: [
      { label: 'Empruntis, 18 novembre 2026, relevé des taux par région', url: 'https://www.empruntis.com/financement/actualites/2026/taux-hausse-ralentit-novembre-mais-poursuit-toutes-regions-21435/' },
      { label: 'Pretto, analyse des taux de novembre 2026, mise à jour le 22 novembre', url: 'https://www.pretto.fr/taux-immobilier/historique-taux-immobilier/2026/analyse-taux-immobilier-novembre-2026/' },
    ],
    listingsLink: { label: 'Estimer ma mensualité', href: '/financement' },
  },
  {
    slug: 'faux-rib-notaire-fraude-au-virement',
    art: 'credit',
    title: 'Faux RIB du notaire : la fraude au virement pendant un achat, et comment réagir',
    description:
      'Un courriel imite votre notaire et vous envoie un RIB qui n’est pas le sien. Comment la fraude se déroule, comment vérifier un RIB avant de payer, que faire si le virement est parti.',
    category: 'Financement',
    published: '2026-11-23',
    updated: '2026-11-23',
    readMinutes: 5,
    intro:
      'Un achat immobilier fait circuler de grosses sommes par virement : la somme versée à la promesse, puis le solde le jour de la vente. Il fait aussi circuler beaucoup de courriels, entre l’agence, le notaire, la banque et parfois des artisans. C’est dans cet intervalle que se glisse la fraude au faux RIB. Un seul réflexe suffit presque toujours à l’éviter.',
    takeaways: [
      'Le fraudeur se fait passer par courriel pour le notaire, ou pour un artisan, et envoie un RIB qui n’est pas le leur.',
      'Avant tout virement vers un RIB reçu par courriel, appelez le destinataire à son numéro habituel, jamais à celui qui figure dans le message.',
      'Si le virement est parti, prévenez votre banque immédiatement : c’est elle qui peut tenter de le bloquer ou de rappeler les fonds.',
      'Gardez toutes les preuves et déposez plainte.',
    ],
    sections: [
      {
        title: 'Comment la fraude se déroule-t-elle ?',
        paragraphs: [
          'Le fraudeur commence le plus souvent par pirater une messagerie : la vôtre, ou celle d’un de vos interlocuteurs. Il y repère un paiement à venir. Puis il envoie un courriel qui imite celui du notaire ou de l’artisan, avec un RIB à son profit.',
          'Le message est crédible parce qu’il tombe au bon moment et reprend les vrais détails du dossier : l’adresse du bien, le montant, la date de signature.',
        ],
      },
      {
        title: 'Pourquoi un achat atypique y est-il exposé ?',
        paragraphs: [
          'Ni plus ni moins qu’un autre achat, mais il multiplie souvent les interlocuteurs : architecte, artisans pour des devis, diagnostiqueur, courtier. Chaque nouveau RIB reçu par courriel est une occasion pour un fraudeur. La règle vaut pour tous, pas seulement pour le notaire.',
        ],
      },
      {
        title: 'Comment vérifier un RIB avant de payer ?',
        paragraphs: [
          'Dès qu’un RIB que vous n’avez jamais utilisé arrive par courriel, appelez son expéditeur pour le faire confirmer. Utilisez le numéro que vous connaissez déjà, ou celui que vous trouvez par vous-même, pas celui du message.',
        ],
        list: [
          'Méfiez-vous d’un courriel qui annonce un « changement de coordonnées bancaires » à quelques jours d’une signature.',
          'Relisez l’adresse de l’expéditeur lettre par lettre.',
          'Le plus sûr reste de vous faire remettre le RIB en main propre, à l’étude, lors d’un rendez-vous.',
        ],
      },
      {
        title: 'Que faire si le virement est parti ?',
        paragraphs: [
          'Chaque heure compte. Voici les étapes, dans l’ordre.',
        ],
        list: [
          'Appelez votre banque immédiatement. Demandez-lui de suspendre le virement ou de réclamer le retour des fonds.',
          'Prévenez la personne dont l’identité a été utilisée. Sa messagerie est probablement piratée, et d’autres clients sont exposés.',
          'Vérifiez votre propre messagerie : règles de transfert ou de filtrage que vous n’avez pas créées, connexions inconnues. Faites-en des captures d’écran, supprimez-les, puis changez votre mot de passe.',
          'Conservez les preuves : le courriel reçu, le RIB, votre relevé de compte.',
          'Déposez plainte au commissariat ou à la gendarmerie, ou par courrier au procureur de la République.',
        ],
      },
      {
        title: 'Qui peut vous aider ?',
        paragraphs: [
          'La plateforme publique Cybermalveillance.gouv.fr propose une assistance aux victimes. Prévenez aussi votre notaire : la date de signature devra peut-être être revue.',
        ],
      },
    ],
    checklist: {
      title: 'Avant chaque virement',
      items: [
        'Le RIB vient d’une source que j’ai vérifiée par téléphone, à un numéro que je connaissais déjà.',
        'Le nom du titulaire du compte correspond à celui que j’attends.',
        'Aucun message ne m’a demandé de changer de RIB à la dernière minute.',
        'J’ai le numéro direct de ma banque sous la main, au cas où.',
      ],
    },
    faq: [
      {
        q: 'Un notaire peut-il changer de RIB juste avant la signature ?',
        a: 'C’est très inhabituel. Considérez tout message de ce type comme suspect, et appelez l’étude avant toute chose.',
      },
      {
        q: 'La banque récupère-t-elle toujours les fonds ?',
        a: 'Non. Elle peut tenter de bloquer le virement ou de rappeler les fonds, sans garantie. Plus vous la prévenez tôt, plus elle a de chances d’y parvenir.',
      },
      {
        q: 'Faut-il porter plainte même si la somme est revenue ?',
        a: 'Oui : la plainte signale la fraude, et elle peut vous être demandée par la banque.',
      },
    ],
    sources: [
      { label: 'Institut national de la consommation, avec Cybermalveillance.gouv.fr, « Fraude au virement ou faux RIB : que faire ? »', url: 'https://www.inc-conso.fr/content/fraude-au-virement-ou-faux-rib-que-faire-avec-cybermalveillancegouvfr' },
    ],
  },
  {
    slug: 'confort-d-ete-dpe-verriere-toits',
    art: 'verriere',
    title: 'Confort d’été : ce que le DPE dit d’un bien sous verrière ou sous les toits',
    description:
      'Bon, moyen ou insuffisant : le DPE note aussi le confort d’été, à part de la lettre. Ce que mesure cet indicateur, pourquoi verrières et fenêtres de toit le dégradent, quoi vérifier en visite.',
    category: 'Surfaces et travaux',
    published: '2026-11-23',
    updated: '2026-11-23',
    readMinutes: 5,
    intro:
      'On lit le DPE pour sa lettre. Elle parle d’énergie consommée et d’émissions, pas de la température qu’il fera chez vous en juillet. Pour cela, le rapport contient un autre indicateur, moins regardé : le confort d’été. Sous une verrière, sous un toit ou derrière de grandes baies, c’est lui qu’il faut chercher.',
    takeaways: [
      'Le DPE comporte depuis le 1er juillet 2021 un indicateur de confort d’été, noté bon, moyen ou insuffisant.',
      'Il est présenté à part des deux étiquettes énergie et climat : un bien peut être bien classé et inconfortable l’été.',
      'Il évalue le confort sans climatisation : seuls les brasseurs d’air sont pris en compte parmi les équipements.',
      'Une baie sans protection solaire suffit à le dégrader, et les fenêtres de toit ne bénéficient d’aucune exception.',
    ],
    sections: [
      {
        title: 'Que mesure l’indicateur de confort d’été ?',
        paragraphs: [
          'Il dit si le logement reste vivable par forte chaleur, sans recourir à la climatisation. Le ministère chargé de l’écologie précise que seul le confort « passif » est évalué : les appareils qui consomment de l’énergie pour refroidir ne comptent pas, à l’exception des brasseurs d’air.',
          'Le résultat tient en un mot : bon, moyen ou insuffisant. Le rapport indique aussi ce qui joue en faveur du logement et ce qui permettrait de l’améliorer.',
        ],
      },
      {
        title: 'Pourquoi une bonne étiquette ne garantit-elle rien ?',
        paragraphs: [
          'Les lettres de A à G reposent sur l’énergie consommée et sur les émissions de gaz à effet de serre. Le confort d’été est un indicateur distinct, affiché à côté. Un bien récemment isolé peut donc afficher une bonne lettre et un confort d’été insuffisant.',
          'Une climatisation installée ne change pas cet indicateur. Elle rend le bien vivable, mais le rapport juge le logement sans elle.',
        ],
      },
      {
        title: 'Pourquoi verrières et fenêtres de toit sont-elles pénalisées ?',
        paragraphs: [
          'L’indicateur regarde de près les protections solaires : volets, stores extérieurs, brise-soleil. Selon la notice du ministère, il est dégradé dès qu’une baie en est dépourvue.',
          'Une exception existe pour les petites baies orientées au sud, à l’est ou à l’ouest : moins de 0,7 m², et moins de 10 % de la surface vitrée totale. Elle ne s’applique pas aux fenêtres de toit. Une verrière d’atelier ou une série de fenêtres de toit sans store extérieur pèse donc directement sur le résultat.',
        ],
      },
      {
        title: 'Que regarder pendant la visite ?',
        paragraphs: [
          'Le rapport donne un mot ; la visite donne le reste. Si vous le pouvez, revenez un après-midi de beau temps.',
        ],
        list: [
          'Chaque verrière, baie ou fenêtre de toit a-t-elle une protection, et se trouve-t-elle à l’extérieur du vitrage ?',
          'Peut-on ouvrir des deux côtés du logement pour faire circuler l’air la nuit ?',
          'La toiture ou la verrière a-t-elle été refaite, et avec quel vitrage ?',
          'Comment les occupants vivent-ils l’été : pièces inutilisées, ventilateurs, climatisation ?',
        ],
      },
      {
        title: 'Et si la solution passe par un store ou une climatisation ?',
        paragraphs: [
          'Un store extérieur ou une climatisation modifient l’aspect de l’immeuble. Vérifiez ce que la copropriété autorise avant de faire une offre.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de faire une offre',
      items: [
        'J’ai lu la ligne « confort d’été » du DPE, pas seulement la lettre.',
        'J’ai noté quelles baies n’ont pas de protection solaire.',
        'Je sais si le logement peut être ventilé de part en part.',
        'J’ai demandé comment les occupants passent l’été.',
        'Si je compte poser un store extérieur ou une climatisation, j’ai vérifié ce que la copropriété permet.',
      ],
    },
    faq: [
      {
        q: 'Le confort d’été change-t-il la lettre du DPE ?',
        a: 'Il est présenté comme un indicateur distinct des deux étiquettes énergie et climat.',
      },
      {
        q: 'Une climatisation améliore-t-elle l’indicateur ?',
        a: 'Non. Il évalue le logement sans système de refroidissement, à l’exception des brasseurs d’air.',
      },
      {
        q: 'Depuis quand le DPE note-t-il le confort d’été ?',
        a: 'Depuis le 1er juillet 2021. Les DPE plus anciens ne comportent pas cet indicateur.',
      },
    ],
    sources: [
      { label: 'Ministère chargé de l’écologie, « Diagnostic de performance énergétique - DPE »', url: 'https://www.ecologie.gouv.fr/politiques-publiques/diagnostic-performance-energetique-dpe' },
      { label: 'Ministère chargé de l’écologie, notice explicative de l’arrêté du 8 octobre 2021 relatif au DPE', url: 'https://www.ecologie.gouv.fr/sites/default/files/notice_explicative_DPE_arrete_8_octobre_2021_calcul_etablissement.pdf' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'compromis-ou-promesse-de-vente-quelle-difference',
    art: 'balance',
    title: 'Compromis ou promesse de vente : ce qui change pour l’acheteur',
    description:
      'Promesse unilatérale ou compromis : qui s’engage à quoi, somme versée à la signature, délai de rétractation de dix jours, conditions suspensives. Les différences à connaître avant de signer.',
    category: 'Visite et négociation',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 6,
    intro:
      'Votre offre est acceptée. Avant la vente elle-même, vous allez signer un avant-contrat, et l’on vous parlera de « compromis » ou de « promesse » comme si c’était la même chose. Ce n’est pas le cas. Les deux fixent le prix et les conditions, mais ils n’engagent pas les mêmes personnes de la même façon. Pour un bien atypique, où il reste souvent des pièces à réunir, autant savoir lequel vous signez.',
    takeaways: [
      'Dans une promesse unilatérale, seul le vendeur s’engage à vendre : vous avez une option d’achat pendant un délai fixé.',
      'Dans un compromis, vendeur et acheteur s’engagent tous les deux dès la signature.',
      'Dans les deux cas, vous disposez de dix jours pour vous rétracter, sans avoir à vous justifier.',
      'La somme versée à la signature vous est rendue si une condition suspensive ne se réalise pas.',
    ],
    sections: [
      {
        title: 'Qui s’engage à quoi ?',
        paragraphs: [
          'Dans la promesse unilatérale de vente, le vendeur vous réserve son bien à un prix donné, pendant un délai fixé dans l’acte. Pendant ce délai, il ne peut ni le proposer ni le vendre à quelqu’un d’autre. Vous, vous avez une option : acheter, ou ne pas acheter.',
          'Dans le compromis, appelé aussi promesse synallagmatique, chacun s’engage : le vendeur à vendre, vous à acheter, au prix et aux conditions écrits.',
        ],
      },
      {
        title: 'Quelle somme verse-t-on à la signature ?',
        paragraphs: [
          'Pour une promesse unilatérale, on parle d’indemnité d’immobilisation : c’est le prix de l’exclusivité que le vendeur vous accorde. Elle se situe en pratique entre 5 % et 10 % du prix.',
          'Pour un compromis, on parle de dépôt de garantie, en général 10 % du prix. Dans les deux cas, la somme est confiée au notaire, qui la conserve sur un compte séquestre, et elle vient en déduction du prix le jour de la vente.',
        ],
      },
      {
        title: 'Et si vous changez d’avis ?',
        paragraphs: [
          'La loi vous donne dix jours pour vous rétracter. Le délai court à partir du lendemain de la première présentation de la lettre recommandée qui vous notifie l’acte. Il suffit d’envoyer à votre tour une lettre recommandée avec accusé de réception. La somme versée vous est alors rendue.',
          'Passé ce délai, si vous renoncez sans raison légitime, le vendeur conserve la somme versée. Le vendeur, lui, n’a pas de droit de rétractation.',
        ],
      },
      {
        title: 'À quoi servent les conditions suspensives ?',
        paragraphs: [
          'Elles disent à quelles conditions la vente se fera. Si l’une d’elles ne se réalise pas, par exemple un refus de prêt, l’avant-contrat tombe et la somme versée vous est intégralement rendue.',
          'Pour un bien transformé, c’est dans l’avant-contrat que s’écrivent les conditions propres au bien : autorisations de travaux, statut de logement d’un ancien local, titre de la terrasse. Ce qui n’y figure pas ne vous protège pas.',
        ],
      },
      {
        title: 'Lequel signe-t-on en pratique ?',
        paragraphs: [
          'Cela dépend des usages. Le compromis est souvent signé à l’agence ; la promesse unilatérale, plutôt chez le notaire, ce qui est fréquent à Paris. Une promesse unilatérale signée sans notaire doit être enregistrée auprès de l’administration fiscale dans les dix jours qui suivent son acceptation, faute de quoi elle est nulle.',
          'Dans les deux cas, vous pouvez demander que votre propre notaire relise l’acte avant la signature. Cela ne coûte pas plus cher : les deux notaires se partagent les mêmes émoluments.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer l’avant-contrat',
      items: [
        'Le dossier de diagnostics est annexé, et les diagnostics sont en cours de validité.',
        'Pour un lot de copropriété : règlement, procès-verbaux d’assemblée générale et relevé de charges vous ont été remis.',
        'Le délai pour obtenir votre prêt est réaliste : la loi impose un mois au minimum, comptez-en plutôt deux.',
        'Les conditions propres au bien sont écrites noir sur blanc.',
        'La date prévue pour la vente est indiquée.',
        'Votre notaire a relu le projet.',
      ],
    },
    faq: [
      {
        q: 'Le vendeur peut-il se rétracter ?',
        a: 'Non, sauf si l’acte prévoit une clause qui le lui permet. Son engagement est définitif dès la signature.',
      },
      {
        q: 'Que devient la somme versée si la banque refuse le prêt ?',
        a: 'Elle vous est rendue en totalité, à condition que vous ayez demandé un prêt conforme à ce qui est écrit dans l’avant-contrat : montant, durée, taux maximal.',
      },
      {
        q: 'Peut-on signer à distance ?',
        a: 'Oui, chez le notaire, par acte authentique électronique ou par procuration. Une promesse unilatérale signée électroniquement sans notaire ne peut pas être enregistrée : elle est nulle.',
      },
    ],
    sources: [
      {
        label: 'Service-Public.fr, « Promesse de vente d’un logement existant : promesse unilatérale ou compromis »',
        url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2965',
      },
      {
        label: 'Notaires de France, « La promesse de vente et le compromis de vente »',
        url: 'https://www.notaires.fr/fr/immobilier-fiscalit%C3%A9/achat-et-vente-les-%C3%A9tapes/la-promesse-de-vente-et-le-compromis-de-vente',
      },
    ],
  },
  {
    slug: 'de-l-offre-aux-cles-les-etapes-d-un-achat',
    art: 'temps',
    title: 'De l’offre aux clés : les étapes d’un achat, et ce qui les ralentit',
    description:
      'Offre acceptée, avant-contrat, délai de rétractation, prêt, droit de préemption de la mairie, signature chez le notaire : le calendrier d’un achat immobilier et ce qui l’allonge pour un bien atypique.',
    category: 'Visite et négociation',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 5,
    intro:
      'Entre le jour où le vendeur dit oui et celui où l’on vous remet les clés, il se passe en général trois à quatre mois. Ce délai n’est pas de la lenteur : chaque étape répond à une règle. Les connaître permet de donner congé de son logement au bon moment, et de repérer ce qui, pour un bien atypique, peut faire glisser le calendrier.',
    takeaways: [
      'Comptez deux à quatre semaines entre l’offre acceptée et l’avant-contrat, puis environ trois mois jusqu’à la vente.',
      'Trois délais courent en parallèle après l’avant-contrat : votre rétractation, votre prêt, la réponse de la mairie.',
      'Les clés sont remises le jour de la signature chez le notaire, pas avant.',
      'Pour un bien transformé, ce sont les documents manquants qui allongent le plus le calendrier.',
    ],
    sections: [
      {
        title: 'De l’offre à l’avant-contrat : que se passe-t-il ?',
        paragraphs: [
          'Le notaire ou l’agence réunit les pièces : titre de propriété, diagnostics, documents de la copropriété. C’est le moment où l’on découvre ce qui manque. Deux à quatre semaines sont habituelles.',
          'Pour un atelier, un ancien local ou un bien agrandi, demandez dès l’offre les autorisations de travaux. Un vendeur qui doit les retrouver, ou les régulariser, peut retarder la signature de plusieurs semaines.',
        ],
      },
      {
        title: 'Après la signature : quels délais courent ?',
        list: [
          'Votre délai de rétractation : dix jours à partir du lendemain de la notification de l’acte.',
          'Le délai pour obtenir votre prêt : celui écrit dans l’avant-contrat, un mois au minimum, le plus souvent autour de deux.',
          'La réponse de la mairie : dans les secteurs où elle dispose d’un droit de préemption, elle a deux mois pour dire si elle souhaite acheter à votre place. Elle y renonce dans l’immense majorité des cas, mais le notaire doit attendre sa réponse ou la fin du délai.',
        ],
      },
      {
        title: 'Que fait le notaire pendant ce temps ?',
        paragraphs: [
          'Il vérifie que le vendeur est bien propriétaire et que le bien n’est grevé d’aucune hypothèque qui empêcherait la vente, interroge le syndic sur les sommes dues, demande les documents d’urbanisme. Aucune de ces démarches ne dépend de vous, mais toutes prennent quelques semaines.',
        ],
      },
      {
        title: 'Le jour de la vente : comment cela se passe-t-il ?',
        paragraphs: [
          'Quelques jours avant, le notaire vous indique la somme à virer : le prix, les frais, moins ce que vous avez déjà versé. La banque lui adresse directement le montant du prêt.',
          'Le jour dit, il lit l’acte, chacun signe, et le vendeur vous remet les clés. Revisitez le bien le matin même ou la veille : il doit être dans l’état où vous l’avez vu, vidé de ce qui devait l’être.',
        ],
      },
      {
        title: 'Peut-on aller plus vite ?',
        paragraphs: [
          'Un peu. Un achat sans prêt supprime un délai, et un dossier complet dès l’offre en raccourcit un autre. Mais le délai de la mairie ne se négocie pas : descendre sous deux mois et demi entre l’avant-contrat et la vente reste rare.',
        ],
      },
    ],
    checklist: {
      title: 'Pour tenir le calendrier',
      items: [
        'Déposez votre demande de prêt dans les jours qui suivent l’avant-contrat.',
        'Gardez la preuve de chaque demande : la banque, la date, le montant.',
        'Souscrivez l’assurance du bien pour le jour de la vente : le notaire vous demandera l’attestation.',
        'Ne donnez congé de votre logement qu’une fois le prêt accordé.',
        'Prévenez votre notaire de toute date à ne pas dépasser.',
      ],
    },
    faq: [
      {
        q: 'Peut-on entrer dans les lieux avant la vente ?',
        a: 'C’est possible si le vendeur l’accepte, par une convention écrite, mais c’est risqué pour les deux parties : en cas de sinistre ou d’échec de la vente, la situation est difficile à dénouer. La plupart des notaires le déconseillent.',
      },
      {
        q: 'Que se passe-t-il si le prêt n’est pas accordé à temps ?',
        a: 'Prévenez le notaire avant la date limite. Le vendeur peut accepter de prolonger le délai par un avenant. Sans accord, et si vous prouvez un refus de prêt, la condition suspensive joue et la somme versée vous est rendue.',
      },
      {
        q: 'Quand reçoit-on le titre de propriété ?',
        a: 'Plusieurs mois après la vente, le temps que l’acte soit publié. Le jour de la signature, le notaire vous remet une attestation qui suffit pour toutes vos démarches.',
      },
    ],
    sources: [
      {
        label: 'Service-Public.fr, « Promesse de vente d’un logement existant : promesse unilatérale ou compromis »',
        url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2965',
      },
      {
        label: 'Notaires de France, « La promesse de vente et le compromis de vente »',
        url: 'https://www.notaires.fr/fr/immobilier-fiscalit%C3%A9/achat-et-vente-les-%C3%A9tapes/la-promesse-de-vente-et-le-compromis-de-vente',
      },
    ],
  },
  {
    slug: 'contre-visite-ce-qu-on-regarde-la-deuxieme-fois',
    art: 'visite',
    title: 'La contre-visite : ce qu’on regarde la deuxième fois',
    description:
      'Autre heure, autre lumière, mètre en main : comment préparer la deuxième visite d’un bien atypique, quoi vérifier, qui emmener et quels documents demander avant de faire une offre.',
    category: 'Visite et négociation',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'La première visite sert à savoir si le lieu vous plaît. La seconde sert à savoir si vous pouvez y vivre. Entre les deux, le coup de cœur a eu le temps de retomber un peu, et c’est tant mieux : vous revenez avec des questions. Pour un bien atypique, c’est la visite qui compte.',
    takeaways: [
      'Revenez à une autre heure : la lumière, le bruit et la chaleur changent tout dans un grand volume.',
      'Venez avec un mètre, le plan et vos meubles en tête.',
      'Ouvrez, allumez, faites couler : ce que l’on n’a pas osé toucher la première fois.',
      'Repartez avec les documents, pas seulement avec une impression.',
    ],
    sections: [
      {
        title: 'Pourquoi revenir à une autre heure ?',
        paragraphs: [
          'Une verrière orientée à l’ouest est un bonheur à dix heures et une serre à dix-sept. Un rez-de-chaussée sur cour est calme le samedi et sonore le mardi, quand l’atelier voisin travaille. Si vous avez vu le bien le matin, revenez en fin de journée, et inversement.',
          'Restez un moment sans parler, fenêtres fermées puis ouvertes. On entend alors l’immeuble : l’ascenseur, la chaufferie, les voisins du dessus.',
        ],
      },
      {
        title: 'Que mesurer ?',
        list: [
          'La hauteur sous plafond, partout où elle change : sous la mezzanine, sous les poutres, dans les combles.',
          'La largeur de l’escalier et des portes : un canapé ou un piano doivent pouvoir entrer.',
          'Les pièces dont vous doutez : une chambre annoncée peut ne pas accueillir un lit double et une armoire.',
          'L’emplacement des arrivées d’eau et des évacuations, si vous pensez déplacer la cuisine ou la salle de bains.',
        ],
      },
      {
        title: 'Que faut-il oser toucher ?',
        list: [
          'Les fenêtres et les châssis de verrière : s’ouvrent-ils, ferment-ils, y a-t-il des traces d’eau au pied ?',
          'Les robinets, la chasse d’eau, la pression sous la douche.',
          'Le tableau électrique et quelques prises.',
          'Les radiateurs ou le plancher chauffant, en demandant à les voir fonctionner.',
          'Les placards, la cave, le local à vélos : tout ce qui est vendu avec le bien.',
        ],
      },
      {
        title: 'Qui emmener ?',
        paragraphs: [
          'Quelqu’un qui n’a pas vu le bien, et qui ne cherche pas à vous faire plaisir. Si des travaux sont prévus, un architecte ou un entrepreneur : une heure sur place vaut mieux que dix devis sur photos.',
          'Prévenez l’agence. Un négociateur préfère un acheteur qui vient accompagné à un acheteur qui se rétracte.',
        ],
      },
      {
        title: 'Avec quoi repartir ?',
        paragraphs: [
          'Avec les documents que vous n’aviez pas : diagnostics, procès-verbaux des dernières assemblées générales, relevé de charges, taxe foncière, autorisations des travaux réalisés. Si l’un d’eux tarde, notez-le : c’est une condition à écrire dans votre offre.',
        ],
      },
    ],
    checklist: {
      title: 'Dans votre sac',
      items: [
        'Un mètre, ou un télémètre laser.',
        'Le plan, imprimé, et un crayon.',
        'La liste de vos questions restées sans réponse.',
        'Les dimensions de vos meubles les plus encombrants.',
        'Un téléphone chargé, pour photographier ce que vous voudrez revoir.',
      ],
    },
    faq: [
      {
        q: 'L’agence peut-elle refuser une deuxième visite ?',
        a: 'Rien ne l’y oblige, mais c’est très rare : une contre-visite est le signe d’un acheteur sérieux. Si le bien est très demandé, proposez un créneau rapproché.',
      },
      {
        q: 'Peut-on faire une offre sans contre-visite ?',
        a: 'Oui, et sur un bien rare la rapidité compte. Écrivez alors dans votre offre les conditions qui vous protègent, et faites la contre-visite avant de signer l’avant-contrat.',
      },
      {
        q: 'Combien de temps prévoir ?',
        a: 'Une heure au moins. Si le négociateur est pressé, dites-le en prenant le rendez-vous.',
      },
    ],
    sources: [
      {
        label: 'Service-Public.fr, « Promesse de vente d’un logement existant : promesse unilatérale ou compromis » (documents et diagnostics à fournir par le vendeur)',
        url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2965',
      },
    ],
  },
  {
    slug: 'estimation-en-ligne-d-un-bien-atypique',
    art: 'expertise',
    title: 'Estimation en ligne : pourquoi elle se trompe sur un bien atypique',
    description:
      'Les estimateurs en ligne partent du prix moyen au mètre carré du quartier. Hauteur, verrière, terrasse, surface non comptée : ce qu’ils ne voient pas, et comment se faire une idée plus juste.',
    category: 'Marché',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Vous entrez une adresse, une surface, un nombre de pièces, et un prix s’affiche en quelques secondes. Pour un trois-pièces au troisième étage d’un immeuble comme les autres, l’ordre de grandeur est souvent bon. Pour un atelier sous verrière ou un duplex avec terrasse, il peut être très loin du compte, dans un sens comme dans l’autre. Cela tient à la façon dont ces outils calculent.',
    takeaways: [
      'Un estimateur en ligne part des ventes passées autour de l’adresse et d’un prix moyen au mètre carré.',
      'Il ne voit ni la hauteur, ni la lumière, ni le plan, ni l’état du bien.',
      'Plus un bien est rare, moins il existe de ventes comparables, et moins la moyenne veut dire quelque chose.',
      'Le résultat est un point de départ pour la discussion, pas un prix.',
    ],
    sections: [
      {
        title: 'Comment un estimateur calcule-t-il ?',
        paragraphs: [
          'Il part des ventes enregistrées dans le secteur, que l’administration publie, et en tire un prix au mètre carré. Il l’ajuste ensuite selon ce que vous déclarez : étage, ascenseur, nombre de pièces, parfois l’état général.',
          'C’est une moyenne corrigée. Elle fonctionne quand le bien ressemble à ceux qui se sont vendus autour.',
        ],
      },
      {
        title: 'Qu’est-ce qu’il ne voit pas ?',
        list: [
          'La hauteur sous plafond et le volume : deux biens de même surface peuvent n’avoir rien de commun.',
          'La lumière, la vue, le calme d’une cour.',
          'Une terrasse ou un jardin, surtout quand il s’agit d’un droit de jouissance et non d’une propriété.',
          'Les surfaces qui ne sont pas comptées par la loi Carrez mais que l’on utilise : mezzanine basse, souplex.',
          'La qualité d’une rénovation, ou au contraire l’ampleur des travaux à prévoir.',
        ],
      },
      {
        title: 'Dans quel sens se trompe-t-il ?',
        paragraphs: [
          'Dans les deux. Il sous-estime souvent un bien dont la valeur tient à ce qui ne se mesure pas : un atelier d’artiste, un dernier étage avec terrasse. Il peut surestimer un bien dont une partie de la surface est en sous-sol ou sous faible hauteur, parce qu’il applique à toute la surface le prix des étages.',
        ],
      },
      {
        title: 'Comment se faire une idée plus juste ?',
        list: [
          'Consultez les ventes réelles de la rue et de l’immeuble, en regardant chaque vente et non la moyenne.',
          'Cherchez des biens du même genre, quitte à élargir au quartier voisin : un loft se compare à un loft.',
          'Raisonnez par morceaux : la surface principale, puis ce que valent la terrasse, la hauteur, le sous-sol.',
          'Demandez à l’agence sur quelles ventes elle s’est appuyée pour fixer le prix.',
        ],
      },
      {
        title: 'Et la banque ?',
        paragraphs: [
          'Elle se fait sa propre idée, parfois en envoyant un expert. Si son estimation est inférieure au prix convenu, elle peut prêter moins que prévu. Pour un bien très singulier, c’est une raison de plus de parler du bien à votre banque ou à votre courtier avant de faire une offre.',
        ],
      },
    ],
    faq: [
      {
        q: 'Faut-il montrer une estimation en ligne au vendeur pour négocier ?',
        a: 'Seule, elle pèse peu : le vendeur vous répondra que son bien ne ressemble à aucun autre, et il n’aura pas tort. Des ventes précises et des devis de travaux portent davantage.',
      },
      {
        q: 'Les ventes réelles sont-elles accessibles à tous ?',
        a: 'Oui. L’administration publie les ventes des cinq dernières années, avec l’adresse, la date, le prix et la surface. Elles ne disent rien de l’état du bien ni de ses particularités.',
      },
      {
        q: 'Une agence estime-t-elle mieux ?',
        a: 'Elle a visité le bien, ce qu’aucun outil ne fait. Une agence qui vend régulièrement ce type de biens dispose aussi de ventes comparables que les bases publiques ne permettent pas d’identifier comme telles.',
      },
    ],
    sources: [
      { label: 'Demandes de valeurs foncières : les ventes immobilières publiées par l’administration', url: 'https://app.dvf.etalab.gouv.fr/' },
    ],
  },
  {
    slug: 'frais-de-notaire-ce-qu-ils-contiennent',
    art: 'credit',
    title: 'Frais de notaire : ce qu’ils contiennent vraiment',
    description:
      'Droits de mutation, rémunération du notaire, débours : de quoi sont faits les frais de notaire dans l’ancien, sur quelle base ils sont calculés et ce qui a changé avec la hausse votée par les départements.',
    category: 'Financement',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 5,
    intro:
      'On les appelle frais de notaire, et c’est un faux ami : pour l’essentiel, ce sont des taxes. Dans l’ancien, ils représentent de l’ordre de 7 à 8 % du prix, à payer le jour de la vente et que la banque finance rarement. Mieux vaut savoir de quoi ils sont faits, et sur quelle base ils sont calculés.',
    takeaways: [
      'Dans l’ancien, comptez de l’ordre de 7 à 8 % du prix. La plus grande part revient au département, à la commune et à l’État.',
      'La rémunération du notaire est fixée par un barème national : elle n’est qu’une petite partie du total.',
      'Depuis 2025, les départements peuvent relever leur taxe d’un demi-point. La plupart l’ont fait, dont Paris.',
      'Cette hausse ne s’applique pas à ceux qui achètent leur première résidence principale.',
    ],
    sections: [
      {
        title: 'De quoi sont-ils faits ?',
        list: [
          'Les droits de mutation : une taxe perçue par le département, la commune et l’État. C’est de loin la plus grande part.',
          'La rémunération du notaire, appelée émoluments : elle suit un barème national, proportionnel au prix.',
          'Les débours : ce que le notaire avance pour vous, documents d’urbanisme, état hypothécaire, interrogation du syndic.',
          'La contribution de sécurité immobilière, due à l’État pour la publication de la vente.',
        ],
      },
      {
        title: 'Qu’est-ce qui a changé ?',
        paragraphs: [
          'La part du département était plafonnée à 4,5 % du prix. Depuis le 1er avril 2025, et jusqu’au 30 avril 2028, les départements peuvent la porter à 5 %. Chaque conseil départemental en décide.',
          'Avec la part de la commune et celle de l’État, les droits de mutation passent ainsi d’environ 5,8 % à environ 6,3 % du prix là où la hausse a été votée.',
          'Elle ne vous concerne pas si vous achetez votre résidence principale sans avoir été propriétaire de votre résidence principale au cours des deux années précédentes.',
        ],
      },
      {
        title: 'Sur quel montant sont-ils calculés ?',
        paragraphs: [
          'Sur le prix du bien. Deux éléments peuvent en être retirés. Les honoraires d’agence, quand ils sont à la charge de l’acquéreur : ils ne font pas partie du prix payé au vendeur. Et les meubles vendus avec le bien, cuisine équipée ou électroménager par exemple, à condition qu’ils soient listés et estimés à leur valeur réelle.',
          'L’économie reste modeste, et une valeur de mobilier manifestement gonflée expose à un redressement.',
        ],
      },
      {
        title: 'Quand et comment les paie-t-on ?',
        paragraphs: [
          'Le jour de la vente, par virement au notaire, en même temps que le prix. Le notaire demande une provision un peu supérieure au montant attendu ; il vous restitue le trop-perçu quelques mois plus tard, avec le décompte définitif.',
          'Les banques financent rarement ces frais : c’est en général à votre apport de les couvrir.',
        ],
      },
      {
        title: 'Et pour un bien neuf ?',
        paragraphs: [
          'Les frais sont plus bas, de l’ordre de 2 à 3 % du prix, parce que la vente est soumise à la TVA et non aux mêmes droits de mutation. Attention : un bien ancien entièrement rénové reste, sauf exception, un bien ancien.',
        ],
      },
    ],
    faq: [
      {
        q: 'Peut-on négocier les frais de notaire ?',
        a: 'Les taxes, non. Sur sa rémunération, le notaire peut consentir une remise encadrée par la réglementation, sur la part du prix qui dépasse un certain montant. Il doit alors l’appliquer à tous ses clients.',
      },
      {
        q: 'Prendre deux notaires coûte-t-il plus cher ?',
        a: 'Non. Le notaire du vendeur et le vôtre se partagent la même rémunération.',
      },
      {
        q: 'Comment savoir si mon département applique la hausse ?',
        a: 'Demandez-le à votre notaire : il vous remet de toute façon un décompte détaillé avant la vente.',
      },
    ],
    sources: [
      {
        label: 'Service-Public.fr, « Ventes immobilières : les frais de notaire augmentent dans certains départements »',
        url: 'https://www.service-public.gouv.fr/particuliers/actualites/A18183',
      },
      {
        label: 'Notaires de France, « Vente immobilière et augmentation des droits de mutation à titre onéreux »',
        url: 'https://www.notaires.fr/fr/actualites/vente-immobiliere-et-augmentation-des-droits-de-mutation-titre-onereux',
      },
    ],
  },
  {
    slug: 'pret-relais-acheter-avant-d-avoir-vendu',
    art: 'revendre',
    title: 'Prêt relais : acheter avant d’avoir vendu',
    description:
      'Montant, durée, intérêts, que se passe-t-il si la vente tarde : comment fonctionne un prêt relais, et pourquoi il demande plus de prudence quand le bien à vendre ou à acheter est atypique.',
    category: 'Financement',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 5,
    intro:
      'Le bien que vous cherchiez depuis deux ans vient d’apparaître, et le vôtre n’est pas encore vendu. Le prêt relais existe pour cela : la banque vous avance une partie de la valeur de votre logement actuel, le temps de le vendre. C’est une solution utile et un engagement réel, car l’avance doit être remboursée quoi qu’il arrive.',
    takeaways: [
      'La banque avance en général 50 à 70 % de la valeur du bien à vendre, diminuée du crédit qui reste à rembourser dessus.',
      'Le prêt dure un à deux ans. Il doit être remboursé à l’échéance, même si le bien n’est pas vendu.',
      'Selon la formule, les intérêts se paient chaque mois ou en une fois à la fin.',
      'Tout repose sur l’estimation du bien à vendre : c’est elle qu’il faut faire avec prudence.',
    ],
    sections: [
      {
        title: 'Comment cela fonctionne-t-il ?',
        paragraphs: [
          'La banque estime le bien que vous vendez et vous en avance une partie. Cette somme sert d’apport pour le nouvel achat, complétée le plus souvent par un prêt classique. Le jour où votre bien est vendu, le prix sert à rembourser le relais en une fois.',
          'Si vous avez déjà signé un compromis avec un acheteur, la banque accepte d’avancer une part plus importante : le prix est connu, et le risque plus faible.',
        ],
      },
      {
        title: 'Combien coûte-t-il ?',
        paragraphs: [
          'Deux formules existent. Dans la première, vous payez chaque mois les intérêts et l’assurance, et vous remboursez le capital à la vente. Dans la seconde, vous ne payez chaque mois que l’assurance : les intérêts s’accumulent et sont réglés à la fin, avec le capital.',
          'La seconde allège vos mensualités pendant la période où vous portez deux logements. Elle coûte plus cher, et d’autant plus que la vente tarde.',
        ],
      },
      {
        title: 'Et si le bien ne se vend pas à temps ?',
        paragraphs: [
          'La banque peut exiger le remboursement à l’échéance : aucune prolongation n’est automatique. Au cas par cas, elle peut accorder quelques mois de plus si une vente est en cours, ou transformer le relais en prêt de longue durée si vos revenus le permettent.',
          'Dans les faits, la plupart des vendeurs pressés baissent leur prix. C’est pourquoi le montant du relais doit être calculé sur un prix auquel le bien se vendra à coup sûr, pas sur celui que l’on espère.',
        ],
      },
      {
        title: 'Qu’est-ce qui change quand le bien à vendre est atypique ?',
        paragraphs: [
          'Son prix est plus difficile à estimer, et son délai de vente plus difficile à prévoir : il plaît beaucoup à peu de monde. La banque en tient compte et retient souvent une valeur prudente.',
          'Faites estimer le bien par deux professionnels qui vendent ce type de biens, et demandez-leur combien de temps les ventes comparables ont demandé.',
        ],
      },
      {
        title: 'Y a-t-il d’autres solutions ?',
        list: [
          'Vendre d’abord, en négociant avec votre acheteur une date de vente éloignée, le temps de trouver.',
          'Acheter avec une date de signature lointaine, si le vendeur n’est pas pressé.',
          'Louer quelques mois entre les deux : c’est un déménagement de plus, mais aucune dette à porter.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer un prêt relais',
      items: [
        'Le bien à vendre a été estimé par au moins deux professionnels.',
        'Vous connaissez le coût total si la vente a lieu au bout de six mois, d’un an, de deux ans.',
        'Vous savez ce que prévoit le contrat à l’échéance.',
        'Vos mensualités restent supportables pendant toute la durée du relais.',
        'Votre bien est en vente, au bon prix, dès le premier jour.',
      ],
    },
    faq: [
      {
        q: 'Peut-on rembourser le relais avant l’échéance ?',
        a: 'Oui, et c’est le principe : dès que votre bien est vendu, le relais est remboursé en totalité.',
      },
      {
        q: 'Que devient l’argent si le bien se vend plus cher que prévu ?',
        a: 'Le surplus vous revient. Vous pouvez l’utiliser pour rembourser par anticipation une partie de votre prêt classique.',
      },
      {
        q: 'La banque peut-elle refuser un prêt relais ?',
        a: 'Oui. Elle regarde vos revenus, le crédit qui reste sur le bien à vendre et la facilité avec laquelle ce bien se vendra.',
      },
    ],
    sources: [
      {
        label: 'Les clés de la banque (Fédération bancaire française), « Le prêt relais immobilier »',
        url: 'https://www.lesclesdelabanque.com/particulier/pret-relais-immobilier/',
      },
    ],
  },
  {
    slug: 'acheter-une-ancienne-loge-de-gardien',
    art: 'loge',
    title: 'Ancienne loge de gardien : petit bien, grand dossier',
    description:
      'Vente par la copropriété, vote en assemblée générale, création du lot, charges, lumière et passage : ce qu’il faut vérifier avant d’acheter une ancienne loge de gardien transformée en logement.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Au pied de l’escalier, derrière une porte vitrée, la loge a vu passer tout l’immeuble. Quand le poste de gardien disparaît, la copropriété la vend, et elle devient un studio ou un deux-pièces au charme particulier : une adresse dans un bel immeuble, à un prix qui n’est pas celui des étages. C’est un achat à part, parce que le vendeur n’est pas un particulier. C’est l’immeuble tout entier.',
    takeaways: [
      'Une loge appartient à la copropriété. Sa vente doit avoir été votée en assemblée générale, à la double majorité, parfois à l’unanimité.',
      'Avant d’être vendue, elle doit devenir un lot : avec un numéro, des tantièmes et une désignation dans le règlement de copropriété.',
      'Le prix de la vente revient aux copropriétaires, en proportion de leurs tantièmes.',
      'Rez-de-chaussée, passage, lumière : les vérifications sont celles d’un bien sur cour, en plus exposé.',
    ],
    sections: [
      {
        title: 'Qui vend, et à quelles conditions ?',
        paragraphs: [
          'Tant qu’elle loge le gardien, la loge est une partie commune. Pour la vendre, la copropriété doit d’abord décider de supprimer le poste, puis voter la vente.',
          'Cette vente se décide à la double majorité : la majorité des copropriétaires, représentant au moins les deux tiers des voix. L’unanimité est exigée lorsque la loge est nécessaire au respect de la destination de l’immeuble, par exemple quand le règlement prévoit expressément un service de gardiennage.',
          'Un vote acquis à la mauvaise majorité peut être contesté dans les deux mois par un copropriétaire opposant ou absent. Demandez le procès-verbal, et assurez-vous que ce délai est passé sans recours.',
        ],
      },
      {
        title: 'La loge est-elle devenue un lot ?',
        paragraphs: [
          'On n’achète pas une partie commune, on achète un lot. Il faut donc que le règlement de copropriété ait été modifié pour créer ce lot, lui attribuer des tantièmes et le désigner comme logement, avec l’intervention d’un géomètre et d’un notaire.',
          'Si vous achetez à un particulier une loge déjà vendue par la copropriété, vérifiez que ces étapes ont bien été accomplies : elles figurent dans son titre de propriété.',
        ],
      },
      {
        title: 'Que regarder dans le bien lui-même ?',
        list: [
          'La lumière : une loge donne souvent sur le hall ou sur la cour, parfois par une seule fenêtre.',
          'Le passage : tout l’immeuble passe devant votre porte, et le bruit du hall avec lui.',
          'Les équipements communs qui s’y trouvaient : boîtes aux lettres, tableau électrique, interphone, compteurs. Ont-ils été déplacés, ou la copropriété garde-t-elle un droit d’accès ?',
          'L’humidité et la ventilation, comme pour tout rez-de-chaussée.',
          'La salle d’eau et la cuisine : beaucoup de loges ont été équipées de façon sommaire.',
        ],
      },
      {
        title: 'Quelles charges paierez-vous ?',
        paragraphs: [
          'La loge ne payait pas de charges : elle en était une. Devenue un lot, elle reçoit des tantièmes et contribue aux dépenses de l’immeuble. Vérifiez la grille retenue, en particulier pour l’ascenseur, dont un rez-de-chaussée est en principe dispensé.',
          'Demandez aussi comment l’immeuble s’organise depuis le départ du gardien : entreprise de ménage, sortie des poubelles, réception des colis. Ce sont de nouvelles charges pour tous, et parfois de nouveaux sujets de discorde.',
        ],
      },
      {
        title: 'Peut-on la louer, ou y travailler ?',
        paragraphs: [
          'Pour être louée, elle doit respecter les critères du logement décent : une pièce principale de 9 m² sous 2,20 mètres de plafond ou de 20 m³, éclairée par la lumière du jour.',
          'Pour y exercer une activité, lisez la désignation du lot et ce que le règlement autorise. Une loge vendue comme logement ne devient pas un local professionnel sans l’accord de la copropriété.',
        ],
      },
    ],
    checklist: {
      title: 'À demander avant d’acheter',
      items: [
        'Le procès-verbal de l’assemblée générale qui a voté la vente, et la majorité obtenue.',
        'L’absence de recours contre cette décision.',
        'Le modificatif du règlement de copropriété qui crée le lot.',
        'Les tantièmes et la grille de charges du lot.',
        'Les équipements communs encore présents dans la loge.',
        'Le certificat de mesurage et le DPE.',
      ],
    },
    faq: [
      {
        q: 'Un copropriétaire est-il prioritaire pour acheter la loge ?',
        a: 'Pas de plein droit. L’assemblée choisit l’acquéreur et le prix. En pratique, la loge est souvent proposée d’abord aux copropriétaires, en particulier au voisin qui peut l’agrandir.',
      },
      {
        q: 'Peut-on réunir une loge avec l’appartement voisin ?',
        a: 'Oui, avec l’accord de la copropriété pour les travaux qui touchent les murs communs. C’est souvent ce qui donne le plus de valeur à une loge.',
      },
      {
        q: 'Le prix d’une loge est-il négociable ?',
        a: 'Il a été fixé ou accepté par un vote. La marge existe avant l’assemblée, dans la discussion avec le syndic et le conseil syndical, plus guère après.',
      },
    ],
    sources: [
      { label: 'SeLoger, « Comment se passe la vente des parties communes d’une copropriété ? »', url: 'https://edito.seloger.com/conseils-d-experts/reglementations/se-passe-vente-parties-communes-d-une-copropriete-article-20036' },
      { label: 'Service-Public.fr, « Quelles sont les règles de vote en assemblée générale de copropriété ? »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F32066' },
      { label: 'Caisse d’allocations familiales, « Les critères du logement décent »', url: 'https://www.caf.fr/sites/default/files/medias/101/OFFRE-DE-SERVICE/Logement/logement_decent_criteres.pdf' },
    ],
  },
  {
    slug: 'jacuzzi-bassin-sur-une-terrasse',
    art: 'spa',
    title: 'Jacuzzi, bassin, jardin suspendu : que peut porter une terrasse ?',
    description:
      'Poids, étanchéité, accord de la copropriété, autorisation d’urbanisme : ce qu’il faut vérifier quand une terrasse est vendue avec un spa ou une piscine, et avant d’en installer un.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Un bain chaud sur les toits, face à la ville : c’est l’image qui vend les plus belles terrasses. C’est aussi une tonne d’eau ou davantage, posée sur un toit que vous partagez avec tout l’immeuble. Qu’il soit déjà là ou que vous en rêviez, un bassin sur une terrasse pose toujours les mêmes questions : la structure le supporte-t-elle, l’étanchéité tiendra-t-elle, et qui l’a autorisé ?',
    takeaways: [
      'Le poids décide de tout : un spa rempli pèse plusieurs centaines de kilos par mètre carré. Seule une étude de structure dit si la dalle le supporte.',
      'La dalle et l’étanchéité d’une terrasse sont des parties communes. Un équipement lourd ou fixé exige l’accord de l’assemblée générale.',
      'Un bassin hors-sol de plus de 10 m² installé plus de trois mois par an demande une déclaration préalable. Sous un abri de plus de 1,80 mètre, il faut un permis.',
      'Si vos aménagements causent une fuite, c’est votre responsabilité qui est engagée.',
    ],
    sections: [
      {
        title: 'La terrasse peut-elle porter ce poids ?',
        paragraphs: [
          'Une terrasse d’immeuble est calculée pour une charge donnée : des personnes, du mobilier, de la neige. Un spa ou un bassin la dépasse facilement, puisque l’eau pèse une tonne par mètre cube, sans compter la cuve et les baigneurs.',
          'Seul un bureau d’études de structure peut dire ce que la dalle supporte, et à quel endroit : au-dessus d’un mur porteur ou d’une poutre, jamais au milieu d’une portée. Si un bassin est déjà en place, demandez cette étude. Si elle n’existe pas, c’est un mauvais signe.',
          'La même prudence vaut pour les grands bacs plantés : la terre mouillée est lourde, et le règlement de copropriété fixe souvent un poids maximal.',
        ],
      },
      {
        title: 'Qu’en est-il de l’étanchéité ?',
        paragraphs: [
          'Sous le revêtement de la terrasse se trouve une couche d’étanchéité qui protège les logements du dessous. Elle appartient à la copropriété, qui paie sa réfection.',
          'Vos aménagements ne doivent ni la percer, ni empêcher d’y accéder. Un bassin posé sur l’étanchéité, un ancrage dans la dalle, une évacuation mal raccordée suffisent à provoquer une fuite. Si elle vient de votre installation, vous en répondez.',
          'Demandez la date de la dernière réfection de l’étanchéité : il faudra tout démonter le jour où elle sera refaite.',
        ],
      },
      {
        title: 'Faut-il l’accord de la copropriété ?',
        paragraphs: [
          'Le mobilier léger, les pots et les revêtements démontables se posent en général sans autorisation, dans les limites du règlement. Tout ce qui est fixé à la dalle ou au mur, ou qui modifie l’aspect de l’immeuble, doit être voté en assemblée générale.',
          'Un spa lourd, raccordé à l’eau et à l’électricité, entre dans cette catégorie. Si la terrasse est vendue avec, demandez le procès-verbal qui l’a autorisé. Sans lui, la copropriété peut exiger son retrait.',
          'Vérifiez aussi votre titre : sur une terrasse dont vous n’avez que la jouissance privative, vos droits sont plus étroits que sur une terrasse qui vous appartient.',
        ],
      },
      {
        title: 'Et la mairie ?',
        list: [
          'Un bassin hors-sol de 10 m² ou moins, installé moins de trois mois par an : pas de formalité en général.',
          'Un bassin de plus de 10 m² et jusqu’à 100 m², installé plus de trois mois par an : déclaration préalable.',
          'Un bassin sous un abri de plus de 1,80 mètre de haut : permis de construire.',
          'En secteur protégé, les délais sont plus courts et les règles plus strictes : renseignez-vous avant tout achat.',
          'Dans tous les cas, un dispositif de sécurité contre la noyade est obligatoire pour une piscine, et le bassin doit être déclaré aux impôts.',
        ],
      },
      {
        title: 'Et les voisins ?',
        paragraphs: [
          'Une pompe et un système de filtration font du bruit, de jour comme de nuit. Les baigneurs aussi. Regardez qui se trouve à côté, au-dessus et en dessous.',
          'Un trouble de voisinage répété peut conduire un juge à ordonner des aménagements, voire l’arrêt de l’installation, même si elle a été autorisée.',
        ],
      },
    ],
    checklist: {
      title: 'À demander si un bassin est déjà installé',
      items: [
        'L’étude de structure qui a validé la charge.',
        'Le procès-verbal de l’assemblée générale qui a autorisé l’installation.',
        'L’autorisation d’urbanisme, si elle était nécessaire.',
        'Le titre sur la terrasse : propriété ou jouissance privative.',
        'La date de la dernière réfection de l’étanchéité.',
        'L’attestation d’assurance couvrant l’installation.',
      ],
    },
    faq: [
      {
        q: 'Un spa gonflable est-il concerné ?',
        a: 'Par le poids, oui : rempli, il pèse autant qu’un autre. Posé temporairement, il échappe en général aux formalités d’urbanisme, mais pas au règlement de copropriété.',
      },
      {
        q: 'Mon assurance couvre-t-elle un dégât causé par mon bassin ?',
        a: 'Seulement si vous l’avez déclaré, et s’il a été installé dans les règles. Prévenez votre assureur avant la mise en eau.',
      },
      {
        q: 'Peut-on créer une vraie piscine sur un toit ?',
        a: 'C’est possible dans des immeubles conçus ou renforcés pour cela, avec une étude de structure, un vote de la copropriété et un permis. C’est un chantier lourd, rarement accepté dans un immeuble ancien.',
      },
    ],
    sources: [
      { label: 'Service-Public.fr, « Installation ou construction d’une piscine privative »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F35108/3_1_1?idFicheParent=F31404' },
      { label: 'Crédit Agricole e-immobilier, « Copropriété : aménager sa terrasse dans les règles »', url: 'https://e-immobilier.credit-agricole.fr/index.php/conseils/habiter/copropriete-amenager-sa-terrasse-dans-les-regles' },
    ],
    listingsLink: { label: 'Voir les rooftops et les biens avec terrasse', href: '/categorie/rooftop-vue' },
  },
  {
    slug: 'acheter-a-plusieurs-un-grand-volume',
    art: 'plusieurs',
    title: 'Acheter à plusieurs un grand volume : indivision ou société ?',
    description:
      'Entre amis, en famille ou à deux sans être mariés : comment acheter ensemble un loft ou une grande maison, ce que prévoient l’indivision et la société civile immobilière, et comment en sortir.',
    category: 'Financement',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Un plateau de 250 m², une grande maison, un ancien atelier : certains biens atypiques sont trop grands, ou trop chers, pour un seul acheteur. On les achète alors à deux, entre frères et sœurs, entre amis. L’idée est bonne, à une condition : décider avant l’achat ce qui se passera le jour où l’un voudra partir. Le droit propose deux cadres. Ils ne protègent pas de la même façon.',
    takeaways: [
      'Sans rien prévoir, des acheteurs sont en indivision : chacun possède une part du tout, et les décisions importantes exigent l’accord de tous.',
      'Les parts inscrites dans l’acte doivent refléter ce que chacun apporte et rembourse. C’est la première source de conflit.',
      'Nul n’est tenu de rester dans l’indivision : un seul peut provoquer la vente. Une convention d’indivision permet de l’éviter pendant cinq ans.',
      'Une société civile immobilière permet d’écrire ses propres règles, au prix de formalités et d’une gestion plus lourdes.',
    ],
    sections: [
      {
        title: 'Qu’est-ce que l’indivision ?',
        paragraphs: [
          'C’est le régime qui s’applique de lui-même quand plusieurs personnes achètent ensemble. Personne ne possède une pièce en particulier : chacun est propriétaire d’une fraction de l’ensemble, sa quote-part.',
          'Les actes courants de gestion se décident à la majorité des deux tiers des parts. Les actes graves, comme vendre le bien, demandent l’accord de tous.',
        ],
      },
      {
        title: 'Comment fixer les parts ?',
        paragraphs: [
          'L’acte d’achat indique la part de chacun. Par défaut, elles sont égales. Si l’un apporte davantage ou rembourse une part plus grande du prêt, écrivez-le : c’est la répartition de l’acte qui fera foi le jour de la revente, pas vos souvenirs.',
          'Tenez compte de tout : l’apport, les mensualités, mais aussi les travaux que l’un paiera et l’autre non.',
        ],
      },
      {
        title: 'Que se passe-t-il si l’un veut partir ?',
        paragraphs: [
          'La loi pose un principe : nul ne peut être contraint de rester dans l’indivision. Celui qui veut sortir peut vendre sa part, que les autres ont le droit d’acheter en priorité, ou demander le partage. Si personne ne rachète, le bien est vendu, au besoin sur décision du juge.',
          'Pour l’éviter, les acheteurs peuvent signer une convention d’indivision, devant notaire. Elle organise la gestion, désigne un gérant, et peut interdire de demander le partage pendant une durée déterminée, cinq ans au plus, renouvelable.',
        ],
      },
      {
        title: 'Pourquoi passer par une société ?',
        paragraphs: [
          'Dans une société civile immobilière, c’est la société qui achète. Chacun détient des parts sociales, à hauteur de ce qu’il apporte. Les règles du jeu sont écrites dans les statuts : qui décide, à quelle majorité, à quelles conditions on peut vendre ses parts, à qui.',
          'Ce cadre convient bien à un projet durable à plusieurs, ou à la transmission d’un bien de famille. Il a ses contraintes : rédaction des statuts, immatriculation, comptabilité, assemblée annuelle. Et les banques prêtent plus volontiers à des personnes qu’à une société nouvellement créée.',
        ],
      },
      {
        title: 'Et si l’on veut partager le bien lui-même ?',
        paragraphs: [
          'Quand le volume s’y prête, il existe une troisième voie : diviser le bien en deux lots, et que chacun achète le sien. Chacun est alors pleinement propriétaire de son logement, libre de le vendre.',
          'Cette solution suppose que la division soit autorisée par la copropriété et par la commune. Elle se vérifie avant l’achat.',
        ],
      },
      {
        title: 'Que décider avant de signer ?',
        list: [
          'Les parts de chacun, et la manière dont elles évolueront si les apports changent.',
          'Qui paie quoi : mensualités, charges, taxe foncière, travaux.',
          'Qui occupe le bien, et à quelles conditions.',
          'Ce qui se passe en cas de départ, de séparation ou de décès.',
          'Comment le bien sera évalué le jour où l’un rachètera la part de l’autre.',
        ],
      },
    ],
    checklist: {
      title: 'À préparer avec votre notaire',
      items: [
        'Le tableau des apports et des remboursements de chacun.',
        'Les quotes-parts à inscrire dans l’acte.',
        'Une convention d’indivision, ou des statuts de société.',
        'L’assurance de prêt de chaque emprunteur.',
        'La question du décès : testament, clause dans l’acte, protection du survivant.',
        'La possibilité de diviser le bien, si c’est une option.',
      ],
    },
    faq: [
      {
        q: 'Des concubins sont-ils protégés comme des époux ?',
        a: 'Non. Sans mariage ni pacte civil de solidarité, le survivant n’hérite pas de la part de l’autre, qui revient à ses héritiers. Il faut l’organiser par écrit, avec un notaire.',
      },
      {
        q: 'Peut-on emprunter à plusieurs ?',
        a: 'Oui. Les banques demandent en général que les emprunteurs soient solidaires : chacun peut être tenu de rembourser la totalité si l’autre fait défaut.',
      },
      {
        q: 'Peut-on passer de l’indivision à une société plus tard ?',
        a: 'Oui, en apportant le bien à une société. L’opération a un coût, en droits et en frais d’acte. Mieux vaut choisir le bon cadre dès l’achat.',
      },
    ],
    sources: [
      { label: 'Crédit Agricole e-immobilier, « L’indivision, mode d’emploi »', url: 'https://e-immobilier.credit-agricole.fr/conseils/reglementation/lindivision-mode-demploi' },
    ],
  },
  {
    slug: 'cave-parking-annexes-d-un-bien',
    art: 'cave',
    title: 'Cave, parking, remise : ce que valent les annexes d’un bien',
    description:
      'Lots distincts, surface non comptée, charges, usage autorisé, borne de recharge : ce qu’il faut vérifier sur la cave et le stationnement vendus avec un bien, et ce qu’ils ajoutent à sa valeur.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 4,
    intro:
      'L’annonce les cite en une ligne, après la surface et l’étage : « une cave et un parking complètent ce bien ». Dans une grande ville, ces annexes pèsent pourtant lourd, dans le prix comme dans la vie quotidienne. Pour un bien atypique, elles réservent aussi des surprises : une cave qui n’est pas celle que l’on visite, une remise habitée sans droit, un parking que l’on ne peut pas équiper.',
    takeaways: [
      'La cave et le parking sont des lots distincts, avec leurs propres numéros, leurs tantièmes et leurs charges.',
      'Ils ne comptent pas dans la surface Carrez, pas plus que les lots de moins de 8 m².',
      'Vérifiez que les lots visités sont bien ceux de l’acte : les caves s’échangent et se trompent de porte depuis des décennies.',
      'Une cave ou une remise aménagée en pièce de vie n’est un logement que si la transformation a été autorisée.',
    ],
    sections: [
      {
        title: 'Que dit l’acte ?',
        paragraphs: [
          'Chaque annexe est un lot de copropriété, désigné par un numéro et un emplacement dans le règlement. C’est ce numéro que vous achetez, pas la cave que le vendeur utilise.',
          'Faites vérifier la concordance : le numéro du lot, le plan des caves ou du parking, la porte ou l’emplacement que l’on vous montre. Les erreurs sont fréquentes, et elles se découvrent en général au moment de revendre.',
        ],
      },
      {
        title: 'Comptent-ils dans la surface ?',
        paragraphs: [
          'Non. La surface Carrez exclut les caves, les garages, les emplacements de stationnement, ainsi que les lots de moins de 8 m². Une annonce qui additionne la cave à la surface de l’appartement mélange deux choses qui ne se paient pas au même prix.',
          'Leur valeur s’apprécie à part, selon le quartier. Dans les secteurs où l’on ne se gare pas, un parking vaut cher. Une cave saine et accessible aussi.',
        ],
      },
      {
        title: 'Dans quel état sont-ils ?',
        list: [
          'La cave : sol, humidité, ventilation, porte et serrure, éclairage, accès par l’escalier ou par l’ascenseur.',
          'Le parking : dimensions réelles, hauteur sous plafond, largeur de la rampe et des manœuvres. Un véhicule récent n’entre pas partout.',
          'Les réseaux de l’immeuble qui passent dans votre cave : la copropriété garde le droit d’y accéder.',
        ],
      },
      {
        title: 'Que peut-on en faire ?',
        paragraphs: [
          'Une cave sert à entreposer. La transformer en pièce de vie, en studio de musique ou en buanderie reliée à l’appartement change son usage : il faut l’accord de la copropriété, souvent une autorisation de la mairie, et respecter les règles de salubrité qui interdisent d’habiter certains sous-sols.',
          'Si le bien est vendu avec un niveau bas déjà aménagé, les mêmes preuves sont à demander que pour un souplex : la désignation du lot et les autorisations obtenues.',
          'Pour le parking, la loi vous permet d’installer à vos frais une borne de recharge pour véhicule électrique. La demande est adressée au syndic par lettre recommandée, sans vote de l’assemblée générale. Il ne peut s’y opposer que pour un motif sérieux et légitime, en saisissant le tribunal.',
        ],
      },
      {
        title: 'Peut-on les vendre ou les louer séparément ?',
        paragraphs: [
          'En principe oui, puisque ce sont des lots distincts. Certains règlements l’interdisent ou réservent la vente aux copropriétaires de l’immeuble, pour éviter les allées et venues de personnes extérieures. Lisez la clause.',
          'Une annexe que l’on peut céder à part est une valeur de plus. Une annexe que l’on est obligé de garder est un confort, pas un placement.',
        ],
      },
    ],
    checklist: {
      title: 'À vérifier sur les annexes',
      items: [
        'Les numéros de lots dans l’acte, et le plan qui les situe.',
        'La cave ou l’emplacement réellement visité.',
        'Les tantièmes et les charges de chaque annexe.',
        'L’état : humidité de la cave, dimensions du parking.',
        'Les clauses du règlement sur l’usage, la vente et la location.',
        'Pour une cave aménagée : les autorisations obtenues.',
      ],
    },
    faq: [
      {
        q: 'Une cave augmente-t-elle les charges ?',
        a: 'Un peu. Elle a ses propres tantièmes, généralement faibles, et contribue aux dépenses communes en proportion.',
      },
      {
        q: 'Le vendeur peut-il garder la cave ou le parking ?',
        a: 'Oui, s’ils sont des lots distincts et si le règlement ne l’interdit pas. Vérifiez ce que comprend exactement le prix annoncé.',
      },
      {
        q: 'Un box peut-il devenir un atelier ?',
        a: 'Pour y bricoler, oui. Pour y exercer une activité ou le transformer, il faut regarder le règlement de copropriété et les règles d’urbanisme : un emplacement de stationnement est souvent protégé par le plan local d’urbanisme.',
      },
    ],
    sources: [
      { label: 'FNAIM, « Loi Carrez : explications et mode de calcul »', url: 'https://www.fnaim.fr/4116-loi-carrez-explications-et-mode-de-calcul.htm' },
      { label: 'ANIL, analyse juridique sur le règlement sanitaire et l’habitat indigne', url: 'https://www.anil.org/aj-rsd-habitat-indigne/' },
      { label: 'ANIL, « Copropriété : comment installer une borne de recharge électrique ? »', url: 'https://www.anil.org/parole-expert-logement-copropriete-borne-recharge-electrique-droit-prise/' },
    ],
  },
  {
    slug: 'rez-de-chaussee-sur-cour',
    art: 'rdc',
    title: 'Rez-de-chaussée sur cour : le charme, et les cinq vérifications',
    description:
      'Lumière, humidité, sécurité, intimité, usage de la cour : ce qu’il faut regarder avant d’acheter un rez-de-chaussée ou un ancien atelier en fond de cour, et ce que cela change pour le prix.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Une porte au fond d’une cour pavée, une verrière d’atelier, parfois quelques mètres de jardin : beaucoup de biens atypiques sont des rez-de-chaussée. Ils se vendent moins cher que les étages, et offrent ce que les étages n’ont pas, un accès de plain-pied, un dehors, un volume. Ils ont aussi leurs points faibles, toujours les mêmes. Cinq vérifications suffisent à savoir si le charme tiendra dans la durée.',
    takeaways: [
      'Un rez-de-chaussée se négocie en dessous des étages : c’est ce qui rend accessibles de grands volumes.',
      'La lumière se juge sur place, à plusieurs heures, et pas sur les photos de l’annonce.',
      'L’humidité vient du sol : regardez le bas des murs et demandez ce qu’il y a sous le plancher.',
      'La cour appartient en général à la copropriété. Vérifiez ce que vous avez le droit d’y faire.',
    ],
    sections: [
      {
        title: 'Y a-t-il assez de lumière ?',
        paragraphs: [
          'C’est la première question, et la seule que l’on ne peut pas corriger par des travaux. Une cour étroite entourée d’immeubles hauts ne reçoit le soleil que quelques heures, parfois aucune en hiver.',
          'Visitez une première fois le matin et une seconde en fin d’après-midi, lumières éteintes. Regardez l’orientation de la cour, la hauteur des bâtiments en face, et la présence d’une verrière en toiture, qui change tout dans un ancien atelier.',
        ],
      },
      {
        title: 'Le bien est-il sain ?',
        paragraphs: ['Un rez-de-chaussée est en contact avec le sol. L’eau y remonte par les murs si rien ne l’arrête.'],
        list: [
          'Le bas des murs : peinture qui cloque, salpêtre, plinthes gonflées, odeur de renfermé.',
          'Ce qu’il y a dessous : une cave ventilée protège, un terre-plein beaucoup moins.',
          'La ventilation : des entrées d’air et une extraction en état de marche.',
          'Le risque d’inondation de la parcelle, qui figure dans l’état des risques remis à l’acheteur.',
        ],
      },
      {
        title: 'Est-on chez soi ?',
        paragraphs: [
          'Dans une cour, on passe devant vos fenêtres. Regardez qui passe, et pour aller où : l’entrée d’un autre bâtiment, le local à vélos, les poubelles. Leur emplacement compte autant que l’exposition.',
          'Regardez aussi la sécurité : la porte de l’immeuble et son contrôle d’accès, l’état des fenêtres et de leurs fermetures. Votre assureur peut exiger des protections particulières pour un rez-de-chaussée.',
        ],
      },
      {
        title: 'Que pouvez-vous faire de la cour ?',
        paragraphs: [
          'La cour est presque toujours une partie commune. Y poser une table, des plantes ou un vélo relève de la tolérance, pas d’un droit, sauf si votre lot bénéficie d’un droit de jouissance privative inscrit dans le règlement de copropriété.',
          'Si l’annonce parle de « cour privative » ou de « jardin », demandez le texte du règlement qui le fonde. La différence entre une propriété, une jouissance exclusive et une simple habitude vaut plusieurs dizaines de milliers d’euros.',
        ],
      },
      {
        title: 'Le bien a-t-il toujours été un logement ?',
        paragraphs: [
          'Beaucoup de rez-de-chaussée sur cour sont d’anciens ateliers, des remises ou des boutiques. Vérifiez que le lot est bien désigné comme habitation dans le règlement de copropriété, et que le changement a été autorisé par la mairie.',
          'À l’inverse, un rez-de-chaussée se prête parfois à une activité professionnelle. Si c’est votre projet, lisez ce que le règlement autorise.',
        ],
      },
    ],
    checklist: {
      title: 'À regarder et à demander',
      items: [
        'La lumière, à deux heures différentes de la journée.',
        'Le bas des murs et ce qui se trouve sous le plancher.',
        'Le passage dans la cour, et l’emplacement des poubelles.',
        'Les fermetures et le contrôle d’accès de l’immeuble.',
        'Le règlement de copropriété : désignation du lot, usage de la cour.',
        'L’état des risques, pour le risque d’inondation.',
      ],
    },
    faq: [
      {
        q: 'Un rez-de-chaussée paie-t-il les charges d’ascenseur ?',
        a: 'En général non, ou très peu : les charges d’un équipement se répartissent selon son utilité pour chaque lot. La grille figure dans le règlement de copropriété.',
      },
      {
        q: 'Un rez-de-chaussée se revend-il bien ?',
        a: 'Il se revend à son prix, c’est-à-dire avec la même décote que celle dont vous avez bénéficié. Un rez-de-chaussée lumineux, sain et calme trouve toujours preneur.',
      },
      {
        q: 'Peut-on ouvrir une porte ou une fenêtre sur la cour ?',
        a: 'Pas sans l’accord de la copropriété : la façade est une partie commune. Il faut aussi une autorisation d’urbanisme.',
      },
    ],
    sources: [
      { label: 'Géorisques, pour connaître les risques à une adresse', url: 'https://www.georisques.gouv.fr' },
      { label: 'Caisse d’allocations familiales, « Les critères du logement décent »', url: 'https://www.caf.fr/sites/default/files/medias/101/OFFRE-DE-SERVICE/Logement/logement_decent_criteres.pdf' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'chambres-de-service-reunies-sous-les-toits',
    art: 'chambres',
    title: 'Chambres de service réunies : un appartement sous les toits, à quelles conditions',
    description:
      'Surface réelle sous les pentes, couloir commun à racheter, eau et évacuations, accès par l’escalier de service : ce qu’il faut vérifier avant d’acheter des chambres de bonne réunies, ou de les réunir.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Au dernier étage des immeubles anciens, sous le zinc, s’alignent les anciennes chambres de service. Réunies, elles donnent des appartements très recherchés : la vue sur les toits, la lumière, le calme. Elles donnent aussi des dossiers délicats, parce que ces étages n’ont pas été conçus pour être habités ainsi. Ce qui a été réuni, et la manière dont cela l’a été, décide de tout.',
    takeaways: [
      'Sous les pentes, seule la surface de plus de 1,80 mètre de hauteur compte. L’écart avec la surface au sol est souvent important.',
      'Le couloir qui desservait les chambres est une partie commune. S’il a été intégré à l’appartement, la copropriété doit l’avoir vendu.',
      'Une chambre seule ne peut être louée que si elle atteint 9 m² sous 2,20 mètres de plafond, ou 20 m³.',
      'Eau, évacuations, isolation de la toiture, accès : vérifiez ce qui a réellement été mis aux normes d’un logement.',
    ],
    sections: [
      {
        title: 'Quelle surface achetez-vous ?',
        paragraphs: [
          'Sous un toit en pente, une partie du sol se trouve sous 1,80 mètre de hauteur. Elle sert, pour un lit ou des rangements, mais ne compte pas dans la surface Carrez.',
          'Demandez le certificat de mesurage et comparez-le à la surface au sol. C’est sur la surface Carrez que se compare le prix au mètre carré, et c’est elle que le vendeur garantit.',
        ],
      },
      {
        title: 'Le couloir a-t-il été acheté ?',
        paragraphs: [
          'Réunir plusieurs chambres conduit presque toujours à fermer le bout de couloir qui les desservait. Ce couloir appartient à la copropriété. Pour l’intégrer à un lot, il faut que l’assemblée générale ait voté sa vente, à une majorité renforcée, et que le règlement de copropriété ait été modifié.',
          'Demandez l’acte d’achat de cette partie commune, ou le procès-verbal qui l’a décidé. Sans lui, une partie de l’appartement que vous visitez n’appartient pas au vendeur.',
        ],
      },
      {
        title: 'Les lots ont-ils été réunis dans les règles ?',
        list: [
          'Chaque chambre est un lot. Vérifiez que tous les lots vendus figurent bien dans le titre du vendeur.',
          'Les ouvertures créées dans les cloisons porteuses ou les murs de refend ont dû être autorisées par la copropriété.',
          'Les fenêtres de toit ajoutées modifient l’aspect de l’immeuble : il fallait un vote et une autorisation d’urbanisme.',
        ],
      },
      {
        title: 'L’étage est-il équipé pour un logement ?',
        paragraphs: ['À l’origine, ces étages n’avaient ni salle d’eau ni cuisine. Regardez comment ils ont été raccordés.'],
        list: [
          'L’arrivée d’eau et surtout les évacuations : leur pente et leur raccordement aux colonnes de l’immeuble.',
          'L’isolation de la toiture, qui décide du froid en hiver et de la chaleur en été.',
          'Le chauffage : l’étage est-il relié au chauffage collectif ?',
          'L’accès : par l’escalier principal, par l’ascenseur, ou seulement par l’escalier de service.',
        ],
      },
      {
        title: 'Et si vous achetez pour louer ?',
        paragraphs: [
          'Un logement loué doit comporter au moins une pièce principale de 9 m² avec 2,20 mètres sous plafond, ou d’un volume de 20 m³, éclairée par la lumière du jour. Beaucoup de chambres de service isolées n’y parviennent pas et ne peuvent pas être louées comme logements.',
          'Regardez aussi le DPE : sous les toits, une mauvaise isolation suffit à classer le bien parmi ceux dont la location est interdite ou le sera bientôt.',
        ],
      },
    ],
    checklist: {
      title: 'À demander avant d’acheter',
      items: [
        'Le certificat de mesurage Carrez, et la surface au sol.',
        'La liste des lots réunis, et le titre de propriété de chacun.',
        'L’acte d’achat du couloir ou de la partie commune intégrée.',
        'Les procès-verbaux d’assemblée générale autorisant les travaux.',
        'Le DPE, et la date de l’isolation de la toiture.',
        'Le mode d’accès à l’étage.',
      ],
    },
    faq: [
      {
        q: 'Peut-on encore réunir des chambres de service ?',
        a: 'Oui, si vous en possédez plusieurs qui se touchent. Il faut l’accord de la copropriété pour les travaux qui touchent les parties communes, et acheter le couloir s’il doit être fermé.',
      },
      {
        q: 'Les toilettes sur le palier font-elles partie du lot ?',
        a: 'Non, sauf mention contraire. Ce sont en général des parties communes, à l’usage de tout l’étage.',
      },
      {
        q: 'Les charges sont-elles élevées sous les toits ?',
        a: 'Les chambres de service ont souvent peu de tantièmes, donc des charges modestes. Vérifiez en revanche les travaux de toiture votés ou à prévoir : ils concernent tout l’immeuble, mais c’est vous qui êtes dessous.',
      },
    ],
    sources: [
      { label: 'FNAIM, « Achat d’une partie commune en copropriété : que faut-il savoir ? »', url: 'https://www.fnaim.fr/3386-achat-d-une-partie-commune-en-copropriete-que-faut-il-savoir-.htm' },
      { label: 'Caisse d’allocations familiales, « Les critères du logement décent »', url: 'https://www.caf.fr/sites/default/files/medias/101/OFFRE-DE-SERVICE/Logement/logement_decent_criteres.pdf' },
      { label: 'FNAIM, « Loi Carrez : explications et mode de calcul »', url: 'https://www.fnaim.fr/4116-loi-carrez-explications-et-mode-de-calcul.htm' },
    ],
    listingsLink: { label: 'Voir les derniers étages et rooftops', href: '/categorie/rooftop-vue' },
  },
  {
    slug: 'bruit-dans-un-loft',
    art: 'bruit',
    title: 'Le bruit dans un loft : ce que l’on entend, ce que l’on fait entendre',
    description:
      'Planchers légers, volumes qui résonnent, cour partagée, parquet sans isolant : comment juger l’acoustique d’un loft ou d’un atelier pendant la visite, et ce que dit le règlement de copropriété.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Un grand volume, du béton, du métal, du verre, pas de porte entre la cuisine et la chambre : un loft est beau, et il sonne. Les bâtiments d’activité n’ont pas été construits pour le silence. On y entend ses voisins, on s’y entend soi-même, et l’on se fait entendre. Le bruit ne figure dans aucun diagnostic. Il se juge pendant la visite, à condition de savoir où écouter.',
    takeaways: [
      'Aucun diagnostic obligatoire ne porte sur le bruit entre logements. C’est à vous de l’évaluer.',
      'Les immeubles construits avant 1970 n’étaient soumis à aucune règle d’isolation acoustique.',
      'Le règlement de copropriété peut encadrer les revêtements de sol : remplacer une moquette par un parquet sans isolant engage votre responsabilité.',
      'Dans un volume ouvert, le bruit vient aussi de l’intérieur : il se traite par l’aménagement.',
    ],
    sections: [
      {
        title: 'Pourquoi un loft est-il plus bruyant ?',
        list: [
          'Les planchers : dans un ancien atelier, ils sont souvent en bois ou en métal, plus légers et plus sonores qu’une dalle de béton.',
          'Les surfaces dures : béton ciré, verre et métal renvoient le son au lieu de l’absorber.',
          'Le volume ouvert : sans cloisons ni portes, tout s’entend d’un bout à l’autre.',
          'Le voisinage : une cour partagée, d’autres ateliers, parfois une activité encore en place.',
        ],
      },
      {
        title: 'Comment l’évaluer pendant la visite ?',
        paragraphs: ['Faites silence deux minutes, fenêtres fermées puis ouvertes. Et revenez à une autre heure.'],
        list: [
          'Les bruits de pas au-dessus : demandez qui habite là, et sur quel sol.',
          'Les bruits d’équipement : ascenseur, chaufferie, ventilation, porte de garage.',
          'La cour : passage, voix, livraisons, local à poubelles.',
          'L’écho de la pièce : parlez à voix normale, et écoutez ce que la pièce en fait.',
          'Ce que vous ferez entendre : votre plancher est le plafond de quelqu’un.',
        ],
      },
      {
        title: 'Que dit la réglementation ?',
        paragraphs: [
          'Les exigences d’isolation acoustique ne s’appliquent qu’aux bâtiments construits depuis 1970, et ont été renforcées pour ceux construits depuis 1996. Un immeuble plus ancien, ou un bâtiment d’activité transformé, n’y était pas soumis.',
          'Cela ne veut pas dire que tout est permis. Celui qui dégrade l’isolation existante par ses travaux en répond, et un bruit excessif peut être sanctionné comme un trouble anormal de voisinage, quelle que soit l’époque de l’immeuble.',
        ],
      },
      {
        title: 'Que dit le règlement de copropriété ?',
        paragraphs: [
          'Lisez ce qu’il prévoit sur les revêtements de sol. Certains règlements interdisent de remplacer une moquette par un sol dur, d’autres exigent que l’isolation ne soit pas diminuée, d’autres encore demandent l’accord du syndic ou de l’assemblée.',
          'Si le vendeur a posé un parquet ou du béton ciré, demandez ce qui a été mis dessous. Un voisin qui se plaint peut obtenir la pose d’un isolant, voire la remise en état, aux frais du propriétaire du moment.',
          'Les procès-verbaux d’assemblée générale gardent la trace des conflits de bruit. Lisez-les.',
        ],
      },
      {
        title: 'Peut-on améliorer les choses ?',
        list: [
          'Au sol : une sous-couche isolante sous le parquet, des tapis épais.',
          'Au plafond : un faux plafond acoustique, si la hauteur le permet.',
          'Dans le volume : rideaux lourds, bibliothèques, panneaux absorbants, qui cassent l’écho.',
          'Pour les chambres : une vraie cloison et une porte, plutôt qu’une mezzanine ouverte.',
        ],
      },
    ],
    checklist: {
      title: 'À écouter et à demander',
      items: [
        'Deux minutes de silence, fenêtres fermées puis ouvertes.',
        'Une seconde visite à une autre heure, en semaine si possible.',
        'La nature du plancher, et ce qu’il y a sous le revêtement.',
        'Ce que le règlement de copropriété dit des sols.',
        'Les activités présentes dans l’immeuble et dans la cour.',
        'Les procès-verbaux d’assemblée générale, pour les plaintes de bruit.',
      ],
    },
    faq: [
      {
        q: 'Le vendeur doit-il signaler un problème de bruit ?',
        a: 'Il ne doit pas vous cacher un trouble grave dont il a connaissance, comme un litige en cours avec un voisin. En revanche, aucun diagnostic acoustique n’est exigé pour vendre.',
      },
      {
        q: 'Puis-je poser un parquet dans mon loft ?',
        a: 'Oui si le règlement de copropriété ne l’interdit pas, et à condition de ne pas dégrader l’isolation existante. Prévoyez une sous-couche isolante et gardez la facture.',
      },
      {
        q: 'Une activité voisine peut-elle être contrainte de faire moins de bruit ?',
        a: 'Elle doit respecter la réglementation sur les bruits de voisinage. Mais un atelier installé avant vous, et qui exerce dans les règles, ne sera pas obligé de partir. Renseignez-vous avant d’acheter.',
      },
    ],
    sources: [
      { label: 'PAP, « Comment changer ses revêtements de sol »', url: 'https://www.pap.fr/patrimoine/renover-ameliorer/changer-ses-revetements-de-sol/a8547' },
      { label: 'Centre d’information sur le bruit, « Bruits de pas et de chocs »', url: 'https://www.bruit.fr/images/mediatheque/bonnes-pratiques/Bruits_de_pas_chocs.pdf' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'diviser-un-grand-bien-en-deux-logements',
    art: 'division',
    title: 'Diviser un grand bien en deux logements : ce qui est permis',
    description:
      'Règlement de copropriété, surface minimale des logements créés, autorisation de la commune, nouvelle répartition des charges : les règles à connaître avant d’acheter un grand volume pour le diviser.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Un plateau de 200 m², deux entrées possibles, deux familles ou un logement et un atelier : l’idée de diviser vient vite devant un grand volume. Elle permet d’acheter à plusieurs, de financer une partie des travaux par une revente, ou de garder un pied-à-terre. La loi ne l’interdit pas. Elle l’encadre, à trois niveaux : la copropriété, la commune, et les logements eux-mêmes.',
    takeaways: [
      'En copropriété, diviser un lot est en principe libre, sauf si le règlement l’interdit ou si la division heurte la destination de l’immeuble.',
      'L’assemblée générale doit approuver la nouvelle répartition des charges entre les lots créés.',
      'Chaque logement créé doit faire au moins 14 m² et 33 m³, et disposer de l’eau, d’une évacuation et de l’électricité.',
      'Certaines communes soumettent toute division à une autorisation préalable.',
    ],
    sections: [
      {
        title: 'Que dit la copropriété ?',
        paragraphs: [
          'Un copropriétaire peut diviser son lot, à condition que le règlement de copropriété ne l’interdise pas. Certains règlements le font expressément, d’autres le limitent par la destination de l’immeuble : dans un immeuble de grands appartements, créer des studios peut être refusé.',
          'La division crée de nouveaux lots. Il faut un acte modifiant l’état descriptif de division, établi par un notaire avec un géomètre, et l’assemblée générale doit approuver la répartition des charges entre ces nouveaux lots.',
          'Les travaux qui touchent les parties communes, comme une seconde porte sur le palier ou de nouveaux raccordements aux colonnes de l’immeuble, doivent être autorisés par un vote.',
        ],
      },
      {
        title: 'Quelles conditions pour les logements créés ?',
        paragraphs: ['Le Code de la construction interdit les divisions qui créent des logements trop petits ou mal équipés.'],
        list: [
          'Une surface habitable d’au moins 14 m² et un volume habitable d’au moins 33 m³ pour chaque logement.',
          'Une alimentation en eau potable, une évacuation des eaux usées et un accès à l’électricité.',
          'Des diagnostics amiante et plomb réalisés.',
          'Aucune division dans un immeuble frappé d’une interdiction d’habiter ou déclaré insalubre.',
        ],
      },
      {
        title: 'La commune a-t-elle son mot à dire ?',
        paragraphs: [
          'Oui, de deux façons. D’abord par l’urbanisme : le plan local d’urbanisme peut fixer une taille minimale de logements, exiger des places de stationnement pour chaque logement créé, et une autorisation est nécessaire dès que la division modifie la façade ou change la destination d’une partie du bien.',
          'Ensuite par le « permis de diviser » : dans certains secteurs, la commune soumet à une autorisation préalable tous les travaux qui créent plusieurs logements dans un immeuble existant. La mairie vous dira si le bien est concerné.',
        ],
      },
      {
        title: 'Est-ce techniquement faisable ?',
        list: [
          'Deux entrées indépendantes, sans passer par le logement de l’autre.',
          'Deux pièces d’eau et deux cuisines, proches des colonnes d’évacuation.',
          'Deux compteurs, deux tableaux électriques, deux chauffages.',
          'De la lumière des deux côtés : la division ne doit pas laisser un logement sans fenêtre.',
          'Une séparation qui isole du bruit et du feu.',
        ],
      },
      {
        title: 'Que faire avant d’acheter ?',
        paragraphs: [
          'Ne payez pas un bien au prix de deux logements tant que la division n’est pas acquise. Lisez le règlement de copropriété, interrogez la mairie, et faites venir un architecte pour vérifier la faisabilité.',
          'Si le projet est décisif pour vous, inscrivez dans la promesse de vente une condition liée aux autorisations nécessaires.',
        ],
      },
    ],
    checklist: {
      title: 'Avant d’acheter pour diviser',
      items: [
        'Le règlement de copropriété : la division est-elle interdite ou limitée ?',
        'La destination de l’immeuble.',
        'Les règles du plan local d’urbanisme : taille des logements, stationnement.',
        'L’existence d’une autorisation préalable de division dans le secteur.',
        'L’emplacement des colonnes d’eau et d’évacuation.',
        'L’avis d’un architecte sur les deux entrées et la lumière.',
      ],
    },
    faq: [
      {
        q: 'Puis-je diviser sans rien demander si je ne fais pas de travaux ?',
        a: 'Non. La création de deux lots modifie l’état descriptif de division et la répartition des charges, qui doit être approuvée par l’assemblée générale.',
      },
      {
        q: 'Peut-on diviser une maison ?',
        a: 'Oui, sous réserve des règles d’urbanisme de la commune et, le cas échéant, de l’autorisation préalable de division. Les exigences de surface et d’équipement des logements créés sont les mêmes.',
      },
      {
        q: 'La division augmente-t-elle les impôts ?',
        a: 'Chaque logement créé est évalué séparément pour la taxe foncière. Déclarez le changement au service des impôts après les travaux.',
      },
    ],
    sources: [
      { label: 'Sites & Cités remarquables, textes applicables aux divisions d’immeubles (Code de la construction et de l’habitation)', url: 'https://www.sites-cites.fr/app/uploads/2022/04/textes-divisions-dimmeubles.pdf' },
      { label: 'ANIL, « Les règles de majorité pour décider en assemblée générale de copropriété »', url: 'https://anil.org/majorite-decision-assemblee-generale-copropriete' },
    ],
  },
  {
    slug: 'acheter-un-moulin',
    art: 'moulin',
    title: 'Acheter un moulin : la maison, l’eau et les obligations qui vont avec',
    description:
      'Droit d’eau, règlement d’eau, entretien des vannes et du bief, continuité écologique, risque d’inondation : ce qu’il faut comprendre et demander avant d’acheter un moulin.',
    category: 'Types de biens',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Le bruit de l’eau, une bâtisse en pierre, un bief sous les arbres : peu de biens font autant rêver qu’un moulin. Peu engagent autant leur propriétaire. Avec la maison, vous achetez des ouvrages sur une rivière, un droit d’utiliser son eau, et des obligations d’entretien que l’administration contrôle. Rien de tout cela ne se voit pendant la visite. Tout se lit dans les papiers.',
    takeaways: [
      'Un moulin se vend avec ses ouvrages : seuil, vannes, bief, canaux. Vous en devenez responsable, même lorsqu’ils traversent d’autres terrains.',
      'Le droit d’eau n’est pas automatique. Il repose sur un titre ancien ou sur un arrêté préfectoral, et il peut être perdu.',
      'Le propriétaire doit entretenir les ouvrages, manœuvrer les vannes et laisser passer l’eau, les sédiments et parfois les poissons.',
      'Un moulin est par nature au bord de l’eau : le risque d’inondation fait partie de l’achat.',
    ],
    sections: [
      {
        title: 'Qu’achète-t-on exactement ?',
        paragraphs: [
          'Un bâtiment, et un système hydraulique. Le seuil qui retient l’eau, les vannes qui la règlent, le bief qui l’amène, le canal qui la rend à la rivière font partie du moulin, y compris sur les parcelles voisines qu’ils traversent.',
          'Vérifiez que le titre de propriété couvre bien tous ces ouvrages, et qu’une servitude vous permet d’y accéder pour les entretenir.',
        ],
      },
      {
        title: 'Qu’est-ce que le droit d’eau ?',
        paragraphs: [
          'C’est le droit d’utiliser la force de la rivière. Pour les moulins qui existaient avant la Révolution, il est dit « fondé en titre » : il est attaché à l’ouvrage et n’a pas de durée, tant que celui-ci n’a pas été modifié ni laissé à l’état de ruine. Il se prouve par des documents anciens, un acte ou une carte d’époque.',
          'Pour les autres moulins, ou ceux dont la puissance a été augmentée, le droit résulte d’un arrêté préfectoral. Dans les deux cas, l’administration peut le retirer pour un motif d’intérêt général, comme le risque d’inondation ou la protection du milieu.',
          'Un moulin sans droit d’eau reconnu reste une belle maison. Il ne permet ni de produire de l’électricité, ni toujours de conserver son plan d’eau.',
        ],
      },
      {
        title: 'Qu’est-ce que le règlement d’eau ?',
        paragraphs: [
          'C’est le document qui fixe les conditions de fonctionnement du moulin : la hauteur légale de l’eau, les dimensions des ouvrages, la manœuvre des vannes, le débit à laisser à la rivière en aval.',
          'Demandez-le. S’il n’existe pas ou a été perdu, la direction départementale des territoires peut vous renseigner sur la situation administrative du moulin.',
        ],
      },
      {
        title: 'À quoi le propriétaire est-il tenu ?',
        list: [
          'Maintenir le seuil et les déversoirs en bon état, au niveau légal, dégagés des branches et des débris.',
          'Garder des vannes en état de marche, et les ouvrir régulièrement pour laisser passer les sédiments.',
          'Être présent ou représenté en cas de crue, pour manœuvrer les vannes.',
          'Laisser à la rivière le débit minimal fixé, surtout en période de basses eaux.',
          'Signaler à l’administration les travaux sur les ouvrages.',
        ],
      },
      {
        title: 'Qu’est-ce que la continuité écologique ?',
        paragraphs: [
          'C’est l’obligation de ne pas faire obstacle à la circulation des poissons et des sédiments. Sur les cours d’eau classés, l’administration peut exiger des aménagements : une passe à poissons, une gestion particulière des vannes, voire une modification du seuil.',
          'Ces travaux peuvent être coûteux. Avant d’acheter, demandez où en est le moulin au regard de cette obligation, et si une mise en conformité a été demandée au vendeur.',
        ],
      },
      {
        title: 'Et le risque d’inondation ?',
        paragraphs: [
          'Il est inhérent au lieu. Consultez l’état des risques remis par le vendeur et le plan de prévention des risques d’inondation de la commune : il peut limiter les travaux, les extensions et l’aménagement des niveaux bas.',
          'Demandez au vendeur les crues qu’il a connues, la hauteur atteinte par l’eau, et ce que l’assurance a pris en charge.',
        ],
      },
    ],
    checklist: {
      title: 'À demander avant d’acheter',
      items: [
        'Le titre de propriété, et la liste des ouvrages qu’il couvre.',
        'Le droit d’eau : titre ancien ou arrêté préfectoral.',
        'Le règlement d’eau.',
        'Les servitudes d’accès au bief et aux canaux.',
        'Un état des ouvrages hydrauliques, et les travaux à prévoir.',
        'La situation au regard de la continuité écologique.',
        'L’historique des crues et des sinistres.',
      ],
    },
    faq: [
      {
        q: 'Peut-on produire de l’électricité avec un moulin ?',
        a: 'Oui, si le droit d’eau est reconnu et dans la limite de la puissance qu’il autorise. Tout projet doit être déclaré à l’administration, qui vérifie sa compatibilité avec la rivière.',
      },
      {
        q: 'Qui entretient la rivière ?',
        a: 'Le propriétaire riverain entretient les berges et le lit sur sa propriété. Le propriétaire du moulin entretient en plus ses ouvrages : seuil, vannes, bief et canaux.',
      },
      {
        q: 'À qui s’adresser avant d’acheter ?',
        a: 'À la direction départementale des territoires pour le droit d’eau et les obligations, et au syndicat de rivière du secteur, qui connaît les ouvrages et les travaux attendus.',
      },
    ],
    sources: [
      { label: 'GrandAngoulême, « Guide du propriétaire de moulin »', url: 'https://www.grandangouleme.fr/wp-content/uploads/2022/08/Guide_moulin.pdf' },
      { label: 'Fédération française des associations de sauvegarde des moulins', url: 'https://www.moulinsdefrance.org' },
      { label: 'Géorisques, pour connaître les risques à une adresse', url: 'https://www.georisques.gouv.fr' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
  },
  {
    slug: 'acheter-atypique-est-ce-risque',
    art: 'balance',
    title: 'Acheter un bien atypique, est-ce plus risqué ?',
    description:
      'Statut du bien, surface, travaux, confort, revente : les cinq risques propres à un loft, un atelier ou un souplex, et la vérification qui écarte chacun d’eux avant de signer.',
    category: 'Marché',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Un bien atypique fait peur à ceux qui ne le connaissent pas, et fait rêver ceux qui l’ont visité. Les deux ont raison. Il comporte des risques qu’un appartement classique n’a pas, mais ils sont connus, peu nombreux, et presque tous se vérifient sur pièces avant de signer. Ce qui est dangereux, ce n’est pas l’atypique : c’est l’atypique acheté sans poser de questions.',
    takeaways: [
      'Les risques d’un bien atypique tiennent à son histoire : ce qu’il était avant, et la façon dont il a été transformé.',
      'Cinq points concentrent l’essentiel : le statut du bien, sa surface réelle, les autorisations de travaux, le confort, la revente.',
      'Chacun se vérifie avec un document précis, à demander avant l’offre ou à inscrire comme condition dans la promesse.',
      'Un vendeur et une agence qui fournissent ces pièces sans difficulté sont le meilleur signe.',
    ],
    sections: [
      {
        title: 'D’où viennent les risques ?',
        paragraphs: [
          'D’une seule chose : le bien n’a pas toujours été ce qu’il est. Un atelier, une boutique, un grenier, une cave, deux appartements réunis. À chaque transformation, quelqu’un devait demander des autorisations. Quand elles existent, le bien est aussi sûr qu’un autre. Quand elles manquent, c’est l’acheteur qui en hérite.',
          'L’appartement classique, lui, n’a jamais changé de nature. C’est toute la différence.',
        ],
      },
      {
        title: 'Premier risque : le bien est-il vraiment un logement ?',
        paragraphs: [
          'Un loft peut être resté, sur le papier, un local commercial ou un atelier. Les conséquences sont concrètes : crédit immobilier plus difficile, fiscalité différente, revente compliquée.',
          'La vérification tient en trois documents : l’autorisation d’urbanisme qui a acté le changement de destination, la désignation du lot dans le règlement de copropriété, et la nature du local retenue pour la taxe foncière.',
        ],
      },
      {
        title: 'Deuxième risque : quelle surface achetez-vous ?',
        paragraphs: [
          'Mezzanine, sous-pentes, niveau en sous-sol : dans un bien atypique, la surface au sol et la surface officielle peuvent différer de plusieurs dizaines de mètres carrés. Seule la surface Carrez, qui ne compte que les parties d’au moins 1,80 mètre de hauteur, figure dans l’acte.',
          'Demandez le certificat de mesurage et faites-vous montrer, pièce par pièce, ce qui est compté.',
        ],
      },
      {
        title: 'Troisième risque : les travaux ont-ils été autorisés ?',
        paragraphs: [
          'Un escalier percé dans un plancher, un mur porteur ouvert, une verrière créée en toiture touchent aux parties communes ou à l’aspect de l’immeuble. Il fallait un vote de la copropriété, et souvent une autorisation de la mairie.',
          'Demandez les procès-verbaux d’assemblée générale qui ont autorisé ces travaux, et la déclaration ou le permis correspondant. Sans eux, la copropriété peut exiger une remise en état, et c’est le propriétaire du moment qui répond.',
        ],
      },
      {
        title: 'Quatrième risque : y vit-on bien toute l’année ?',
        paragraphs: [
          'Un grand volume se chauffe plus difficilement, une verrière surchauffe en été, un niveau bas demande une ventilation sérieuse. Ce ne sont pas des défauts cachés : ce sont des caractéristiques, qui se regardent et se chiffrent.',
          'Lisez le DPE en entier, demandez les factures d’énergie du vendeur, et revenez une seconde fois à une autre heure de la journée.',
        ],
      },
      {
        title: 'Cinquième risque : pourrez-vous revendre ?',
        paragraphs: [
          'Un bien singulier séduit moins d’acheteurs qu’un trois-pièces, mais ceux qu’il séduit le veulent vraiment. La revente est plus lente quand le bien est irrégulier, pas quand il est rare.',
          'Autrement dit, les quatre premières vérifications protègent aussi la cinquième : un bien atypique en règle se revend, un bien atypique bancal se brade.',
        ],
      },
    ],
    checklist: {
      title: 'Les cinq pièces qui écartent les cinq risques',
      items: [
        'L’autorisation d’urbanisme du changement de destination, si le bien a eu une autre vie.',
        'Le certificat de mesurage Carrez, détaillé par niveau.',
        'Les procès-verbaux d’assemblée générale autorisant les travaux.',
        'Le DPE complet et les factures d’énergie.',
        'Le règlement de copropriété, pour la désignation exacte du lot.',
      ],
    },
    faq: [
      {
        q: 'Un bien atypique est-il plus difficile à financer ?',
        a: 'Pas quand il est en règle. La banque regarde surtout si le bien est officiellement un logement et s’il se revendrait facilement. Un dossier complet lève la plupart des réticences.',
      },
      {
        q: 'Faut-il renoncer si un document manque ?',
        a: 'Pas forcément. Une situation peut souvent être régularisée, par un vote de la copropriété ou une autorisation d’urbanisme a posteriori. Faites-en une condition de la promesse de vente, et négociez le prix en conséquence.',
      },
      {
        q: 'Qui peut m’aider à vérifier ?',
        a: 'Le notaire pour les titres et les autorisations, un architecte pour l’état du bâti et la faisabilité de vos projets. Le négociateur de l’agence, lui, connaît le dossier : c’est à lui qu’il faut demander les pièces.',
      },
    ],
    sources: [
      { label: 'Notaires de France, « Comment transformer un local commercial en local d’habitation ? »', url: 'https://www.notaires.fr/fr/article/comment-transformer-un-local-commercial-en-local-dhabitation' },
      { label: 'FNAIM, « Loi Carrez : explications et mode de calcul »', url: 'https://www.fnaim.fr/4116-loi-carrez-explications-et-mode-de-calcul.htm' },
      { label: 'Service-Public.fr, « Diagnostic de performance énergétique (DPE) »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F16096' },
    ],
  },
  {
    slug: 'vue-degagee-est-elle-protegee',
    art: 'vue',
    title: 'Une vue dégagée est-elle acquise pour toujours ?',
    description:
      'Vue sur les toits, sur un monument, sur un jardin : ce que la loi protège, ce qu’elle ne protège pas, et les vérifications à faire avant de payer une vue qui peut disparaître.',
    category: 'Visite et négociation',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Une vue se paie. Sur les toits, sur un dôme, sur les arbres d’un jardin voisin : c’est souvent elle qui décide de l’achat, et elle pèse lourd dans le prix. Or la vue est la seule chose que vous achetez sans en devenir propriétaire. Ce qui se trouve devant vos fenêtres appartient à d’autres. Avant de signer, il faut savoir ce qu’ils ont le droit d’en faire.',
    takeaways: [
      'En droit, personne n’a de droit acquis à conserver sa vue. Un voisin peut construire s’il respecte les règles d’urbanisme.',
      'Ce qui vous protège vraiment, c’est le plan local d’urbanisme : hauteurs autorisées, espaces protégés, terrains constructibles.',
      'Les distances du Code civil entre voisins, 1,90 mètre pour une vue droite et 0,60 mètre pour une vue oblique, protègent l’intimité, pas le paysage.',
      'Une servitude écrite, qui interdit de bâtir ou limite la hauteur du terrain voisin, est la seule vraie garantie. Elle figure dans les titres.',
    ],
    sections: [
      {
        title: 'Peut-on perdre sa vue ?',
        paragraphs: [
          'Oui. Le propriétaire du terrain ou de l’immeuble d’en face est libre de construire, de surélever ou de planter, tant qu’il respecte les règles d’urbanisme. Les tribunaux le rappellent régulièrement : il n’existe pas, en principe, de droit à conserver une vue.',
          'Dans des cas exceptionnels, une construction qui prive un logement de lumière ou d’ensoleillement de façon excessive peut être jugée comme un trouble anormal de voisinage, et ouvrir droit à une indemnité. C’est une réparation après coup, incertaine, pas une protection.',
        ],
      },
      {
        title: 'Qu’est-ce qui protège une vue, alors ?',
        paragraphs: ['Les règles qui empêchent de bâtir devant vous. Elles se lisent dans des documents publics, que chacun peut consulter en mairie ou en ligne.'],
        list: [
          'Le plan local d’urbanisme : la hauteur maximale autorisée sur les parcelles voisines, les espaces verts protégés, les zones non constructibles.',
          'Les protections patrimoniales : aux abords d’un monument historique ou dans un site classé, les constructions sont très encadrées.',
          'La nature de ce qui est en face : un jardin public, un fleuve, une voie ferrée ou une avenue large ne se construisent pas du jour au lendemain.',
          'Une servitude inscrite dans les titres, qui interdit de construire ou de dépasser une certaine hauteur sur le terrain voisin.',
        ],
      },
      {
        title: 'Quels sont les signes d’une vue fragile ?',
        list: [
          'Un terrain nu, un parking ou un hangar bas en face : ce sont des terrains à bâtir en puissance.',
          'Un immeuble voisin nettement plus bas que les autres : il peut être surélevé jusqu’à la hauteur autorisée.',
          'Un panneau de permis de construire affiché dans la rue. Lisez-le : il indique la hauteur du projet.',
          'Une parcelle récemment vendue à un promoteur. Le négociateur de l’agence le sait souvent.',
        ],
      },
      {
        title: 'Et les distances entre voisins ?',
        paragraphs: [
          'Le Code civil interdit d’ouvrir une fenêtre, un balcon ou une terrasse à moins de 1,90 mètre de la limite du terrain voisin lorsqu’on y voit droit devant soi, et à moins de 0,60 mètre lorsqu’on y voit de côté. Ces règles ne s’appliquent ni entre lots d’une même copropriété, ni aux ouvertures qui donnent sur la rue.',
          'Elles protègent votre intimité contre un voisin qui ouvrirait une vue chez vous. Elles ne l’empêchent pas de construire un mur aveugle devant vos fenêtres.',
          'Vérifiez aussi vos propres ouvertures : une fenêtre ou une terrasse créée trop près de la limite peut être contestée, sauf si elle existe depuis plus de trente ans.',
        ],
      },
      {
        title: 'Que demander avant d’acheter ?',
        paragraphs: [
          'Demandez au négociateur ce qu’il sait des parcelles voisines, puis vérifiez par vous-même. Le service d’urbanisme de la mairie vous dira si un permis a été déposé ou accordé à proximité, et quelle hauteur le plan local d’urbanisme autorise en face.',
          'Si la vue justifie une part importante du prix, demandez à votre notaire de regarder les servitudes inscrites dans les titres, les vôtres et celles du voisin.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de payer une vue',
      items: [
        'Ce qui se trouve en face, et à qui cela appartient.',
        'La hauteur maximale autorisée par le plan local d’urbanisme sur les parcelles voisines.',
        'Les permis de construire déposés ou accordés dans la rue.',
        'Les protections patrimoniales du secteur.',
        'Les servitudes mentionnées dans le titre de propriété.',
        'La conformité de vos propres fenêtres et terrasses aux distances légales.',
      ],
    },
    faq: [
      {
        q: 'Puis-je m’opposer à un permis de construire qui bouche ma vue ?',
        a: 'Vous pouvez le contester s’il ne respecte pas les règles d’urbanisme, dans un délai de deux mois à compter de son affichage sur le terrain. La seule perte de vue ne suffit pas à le faire annuler.',
      },
      {
        q: 'La vue est-elle mentionnée dans l’acte de vente ?',
        a: 'Non. L’acte décrit le bien, pas ce que l’on voit depuis ses fenêtres. Une annonce qui vante une vue ne garantit pas qu’elle durera.',
      },
      {
        q: 'Un arbre du voisin peut-il me cacher la vue ?',
        a: 'Oui, s’il est planté à la distance légale de la limite du terrain. Les règles de plantation fixent des distances, pas une hauteur à ne pas dépasser au-delà de celles-ci.',
      },
    ],
    sources: [
      { label: 'PAP, « Fenêtres, portes, terrasses : respectez les distances »', url: 'https://www.pap.fr/patrimoine/voisinage/fenetres-portes-terrasses-respectez-les-distances/a1960' },
      { label: 'Actu-Juridique, « Le droit de vue, une hypothèse juridiquement envisageable ? »', url: 'https://www.actu-juridique.fr/civil/immobilier/le-droit-de-vue-une-hypothese-juridiquement-envisageable/' },
    ],
    listingsLink: { label: 'Voir les rooftops et les biens avec vue', href: '/categorie/rooftop-vue' },
  },
  {
    slug: 'hauteur-sous-plafond-les-seuils-a-connaitre',
    art: 'hauteur',
    title: 'Hauteur sous plafond : les seuils qui changent tout',
    description:
      '1,80 mètre pour la surface, 2,20 mètres pour louer : les hauteurs que la loi retient, ce qu’elles changent pour le prix, pour la location et pour vos projets de mezzanine.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Cinq mètres sous plafond dans le séjour, 1,70 mètre sous la mezzanine : dans un bien atypique, la hauteur change d’une pièce à l’autre. Ce n’est pas qu’une affaire de confort. Selon qu’elle passe au-dessus ou au-dessous de certains seuils, une partie du bien compte ou ne compte pas dans la surface, peut ou ne peut pas être louée. Deux chiffres suffisent à s’y retrouver.',
    takeaways: [
      'En dessous de 1,80 mètre de hauteur, une surface n’entre ni dans la surface Carrez, ni dans la surface habitable.',
      'Pour être loué, un logement doit offrir au moins une pièce principale de 9 m² sous 2,20 mètres de plafond, ou d’un volume de 20 m³.',
      'Une grande hauteur ne se compte pas en mètres carrés : elle se paie au prix du bien, pas au mètre.',
      'Avant de créer une mezzanine, mesurez ce qui restera au-dessus et au-dessous.',
    ],
    sections: [
      {
        title: 'Pourquoi 1,80 mètre ?',
        paragraphs: [
          'C’est le seuil retenu pour mesurer un logement. La surface Carrez, obligatoire pour vendre un lot de copropriété, et la surface habitable, utilisée pour la location, ne comptent que les parties dont la hauteur atteint au moins 1,80 mètre.',
          'Sous une pente de toit, sous un escalier, sur une mezzanine basse, les mètres existent mais ne figurent pas dans l’acte. Ils rendent service. Ils ne se paient pas au même prix.',
        ],
      },
      {
        title: 'Pourquoi 2,20 mètres ?',
        paragraphs: [
          'C’est le seuil de la décence, c’est-à-dire du droit de louer. Un logement mis en location doit comporter au moins une pièce principale d’une surface habitable de 9 m² avec une hauteur sous plafond de 2,20 mètres, ou bien d’un volume habitable de 20 m³.',
          'La seconde option aide les biens sous les toits : une pièce un peu basse mais vaste peut atteindre 20 m³. Cette pièce doit aussi recevoir la lumière du jour et s’ouvrir à l’air libre.',
          'Les règlements sanitaires départementaux ajoutent parfois leurs propres exigences. Si vous achetez pour louer, vérifiez celui de votre département.',
        ],
      },
      {
        title: 'Que vaut une grande hauteur ?',
        paragraphs: [
          'Elle ne s’ajoute pas à la surface : un séjour de 40 m² reste un séjour de 40 m², qu’il ait 2,50 ou 5 mètres sous plafond. C’est pourquoi le prix au mètre carré d’un bien très haut paraît élevé. Vous payez un volume, que la mesure ne sait pas dire.',
          'Ce volume a un coût d’usage. Il faut le chauffer, et l’air chaud monte. Regardez le mode de chauffage et lisez le DPE avec attention.',
        ],
      },
      {
        title: 'Peut-on gagner de la surface en hauteur ?',
        paragraphs: [
          'C’est l’idée de la mezzanine. Pour qu’elle compte dans la surface, elle doit être fixe et laisser au moins 1,80 mètre au-dessus de son plancher. Pour que l’espace du dessous reste agréable, il en faut autant en dessous.',
          'Faites le calcul avant d’acheter : avec l’épaisseur du plancher, il faut environ 3,80 à 4 mètres de hauteur totale pour deux niveaux où l’on tient debout. En dessous, la mezzanine sera un couchage ou un rangement, pas une pièce.',
        ],
      },
    ],
    checklist: {
      title: 'À mesurer pendant la visite',
      items: [
        'La hauteur sous plafond de chaque pièce, au point le plus bas.',
        'Sous les pentes : la limite où la hauteur passe sous 1,80 mètre.',
        'Sur et sous la mezzanine : les deux hauteurs.',
        'La surface Carrez du certificat, comparée à la surface au sol.',
        'Si vous comptez louer : la pièce principale atteint-elle 9 m² sous 2,20 mètres, ou 20 m³ ?',
      ],
    },
    faq: [
      {
        q: 'Une pièce de moins de 1,80 mètre de haut peut-elle être une chambre ?',
        a: 'Rien ne vous interdit d’y dormir chez vous. Mais elle ne compte pas dans la surface du logement et ne peut pas être présentée comme une pièce.',
      },
      {
        q: 'Existe-t-il une hauteur minimale pour vendre ?',
        a: 'Non. La vente est libre, à condition que la surface annoncée soit exacte. Les seuils de hauteur concernent la mesure du bien et sa mise en location.',
      },
      {
        q: 'La hauteur sous plafond figure-t-elle dans l’annonce ?',
        a: 'Rarement, sauf quand elle est remarquable. Demandez-la, pièce par pièce, et demandez un plan coté.',
      },
    ],
    sources: [
      { label: 'Caisse d’allocations familiales, « Les critères du logement décent »', url: 'https://www.caf.fr/sites/default/files/medias/101/OFFRE-DE-SERVICE/Logement/logement_decent_criteres.pdf' },
      { label: 'FNAIM, « Loi Carrez : explications et mode de calcul »', url: 'https://www.fnaim.fr/4116-loi-carrez-explications-et-mode-de-calcul.htm' },
    ],
  },
  {
    slug: 'transformer-garage-entrepot-grange-en-logement',
    art: 'garage',
    title: 'Garage, entrepôt, grange : peut-on en faire un logement ?',
    description:
      'Changement de destination, déclaration préalable ou permis de construire, règlement de copropriété, raccordements : les étapes pour transformer un local en habitation, et ce qu’il faut vérifier avant d’acheter.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 6,
    intro:
      'Un garage au fond d’une cour, un entrepôt aux poutres métalliques, une grange en pierre : le volume est là, il ne manque que la vie dedans. C’est ainsi que naissent beaucoup de lofts. Mais on ne décide pas seul qu’un local devient un logement. La commune a son mot à dire, la copropriété aussi, et la réponse doit être connue avant l’achat, pas après.',
    takeaways: [
      'Passer d’un local d’activité à un logement s’appelle un changement de destination. Il exige toujours une autorisation d’urbanisme.',
      'Sans toucher à la structure ni à la façade, une déclaration préalable suffit. Dès qu’on y touche, il faut un permis de construire.',
      'Le plan local d’urbanisme peut interdire l’habitation dans certaines zones. C’est la première chose à vérifier.',
      'En copropriété, le règlement doit autoriser l’habitation dans le lot. Sinon, il faut l’accord des copropriétaires.',
    ],
    sections: [
      {
        title: 'Qu’est-ce qu’un changement de destination ?',
        paragraphs: [
          'Le droit de l’urbanisme range chaque bâtiment dans l’une de cinq destinations : habitation, commerce et activités de service, exploitation agricole et forestière, équipements d’intérêt collectif, autres activités des secteurs secondaire ou tertiaire. Ces cinq destinations se divisent en vingt-trois sous-destinations.',
          'Un garage loué, un entrepôt, un atelier, une grange n’appartiennent pas à la destination « habitation ». Y créer un logement, c’est changer de destination, même sans aucun travail visible de l’extérieur.',
        ],
      },
      {
        title: 'Déclaration préalable ou permis de construire ?',
        list: [
          'Changement de destination sans modification de la structure porteuse ni de la façade : déclaration préalable.',
          'Changement de destination avec modification de la structure porteuse ou de la façade, par exemple l’ouverture de fenêtres : permis de construire.',
          'Au-delà de 150 m² de surface de plancher après travaux, le recours à un architecte est obligatoire pour déposer le permis.',
        ],
      },
      {
        title: 'La commune peut-elle refuser ?',
        paragraphs: [
          'Oui. Le plan local d’urbanisme fixe, zone par zone, les destinations autorisées. Il peut interdire de créer des logements dans une zone d’activités, protéger les commerces en rez-de-chaussée dans certaines rues, ou imposer des places de stationnement que le terrain ne permet pas de créer.',
          'Pour une grange en zone agricole, la règle est plus stricte encore : le changement de destination n’est possible que si le bâtiment a été désigné pour cela dans le plan local d’urbanisme.',
          'Demandez un certificat d’urbanisme avant de vous engager. Il vous dit par écrit ce qui est possible sur la parcelle.',
        ],
      },
      {
        title: 'Et en copropriété ?',
        paragraphs: [
          'Le règlement de copropriété décrit l’usage de chaque lot. Si le vôtre est désigné comme garage, remise ou local commercial, l’habiter suppose que le règlement ne l’interdise pas et que la transformation respecte la destination de l’immeuble.',
          'Les travaux qui touchent les parties communes ou l’aspect extérieur, comme le percement d’une façade, doivent être votés en assemblée générale. Faites inscrire la question à l’ordre du jour avant d’acheter, ou faites de cet accord une condition de la promesse.',
        ],
      },
      {
        title: 'Quels coûts oublie-t-on ?',
        list: [
          'Les raccordements : eau, assainissement, électricité à la puissance d’un logement.',
          'L’isolation et la ventilation : un local d’activité n’a été conçu ni pour l’une ni pour l’autre.',
          'La taxe d’aménagement, qui peut être due lors du changement de destination.',
          'Les diagnostics : amiante et plomb dans les locaux anciens, pollution des sols pour d’anciens ateliers.',
          'La lumière : créer des ouvertures est souvent le poste le plus lourd, et le plus encadré.',
        ],
      },
      {
        title: 'Et si le bien est vendu déjà transformé ?',
        paragraphs: [
          'Demandez la preuve que la transformation a été autorisée : la déclaration préalable ou le permis, et l’attestation d’achèvement des travaux. Un local habité sans autorisation reste, pour l’administration, un local. Sa régularisation n’est jamais garantie.',
        ],
      },
    ],
    checklist: {
      title: 'Avant d’acheter un local à transformer',
      items: [
        'Le zonage du plan local d’urbanisme et les destinations autorisées.',
        'Un certificat d’urbanisme opérationnel pour votre projet.',
        'Le règlement de copropriété et la désignation du lot.',
        'L’accord de principe de la copropriété pour les travaux en façade.',
        'L’état des réseaux : eau, évacuations, électricité.',
        'Les diagnostics amiante, plomb et, s’il y a lieu, pollution des sols.',
        'Une condition suspensive d’obtention de l’autorisation d’urbanisme dans la promesse.',
      ],
    },
    faq: [
      {
        q: 'Puis-je habiter un local en attendant l’autorisation ?',
        a: 'Non. Tant que le changement de destination n’est pas autorisé, le local n’est pas un logement. L’habiter vous expose à des sanctions et à un refus d’assurance.',
      },
      {
        q: 'Combien de temps faut-il pour obtenir l’autorisation ?',
        a: 'Le délai d’instruction de droit commun est d’un mois pour une déclaration préalable et de deux mois pour un permis de construire portant sur une maison, davantage dans les autres cas ou en secteur protégé.',
      },
      {
        q: 'La transformation change-t-elle les impôts ?',
        a: 'Oui. Le local est réévalué comme logement pour la taxe foncière. Déclarez le changement au service des impôts dans les quatre-vingt-dix jours qui suivent la fin des travaux.',
      },
    ],
    sources: [
      { label: 'Notaires de France, « La destination des bâtiments dans le droit de l’urbanisme »', url: 'https://www.notaires.fr/fr/immobilier-fiscalite/urbanisme/la-destination-des-batiments-dans-le-droit-de-lurbanisme' },
      { label: 'Notaires de France, « Comment transformer un local commercial en local d’habitation ? »', url: 'https://www.notaires.fr/fr/article/comment-transformer-un-local-commercial-en-local-dhabitation' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'veranda-jardin-d-hiver-autorisations',
    art: 'veranda',
    title: 'Véranda, jardin d’hiver : ce qu’il faut vérifier, ce qu’il faut demander',
    description:
      'Autorisation d’urbanisme, accord de la copropriété, surface comptée, confort d’été : les vérifications à faire quand un bien possède une véranda, et les règles pour en créer une.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Une pièce de verre posée sur une terrasse ou ouverte sur un jardin : la véranda est souvent ce qui donne son charme à un rez-de-jardin ou à un dernier étage. C’est aussi l’une des constructions les plus souvent réalisées sans autorisation. Quand elle existe déjà, il faut s’assurer qu’elle a le droit d’être là. Quand vous comptez en créer une, il faut savoir à qui le demander.',
    takeaways: [
      'Une véranda est une extension : elle exige une autorisation d’urbanisme, et l’accord de la copropriété s’il y en a une.',
      'Jusqu’à 20 m², une déclaration préalable suffit. Ce seuil passe à 40 m² en zone urbaine d’une commune dotée d’un plan local d’urbanisme. Au-delà, il faut un permis de construire.',
      'Close et couverte, une véranda de plus de 1,80 mètre de hauteur compte dans la surface Carrez.',
      'Sans autorisation, c’est l’acheteur qui hérite du problème.',
    ],
    sections: [
      {
        title: 'La véranda existante a-t-elle été autorisée ?',
        paragraphs: ['Deux accords étaient nécessaires. Demandez les deux.'],
        list: [
          'L’autorisation d’urbanisme : la déclaration préalable ou le permis de construire, délivré par la mairie.',
          'En copropriété, le procès-verbal de l’assemblée générale qui a autorisé la construction. Une véranda modifie l’aspect extérieur de l’immeuble et s’appuie souvent sur une partie commune.',
          'Le titre qui vous donne l’usage de la terrasse ou du jardin sur lequel elle est posée : propriété ou droit de jouissance.',
        ],
      },
      {
        title: 'Que risque-t-on si elle ne l’a pas été ?',
        paragraphs: [
          'La copropriété peut demander sa démolition pendant plusieurs années après sa construction. La commune, de son côté, peut refuser toute nouvelle autorisation sur le bien tant que la situation n’est pas régularisée.',
          'Une régularisation est parfois possible, par un vote de l’assemblée générale et une autorisation déposée après coup. Rien ne l’assure. Faites-en une condition de la promesse de vente.',
        ],
      },
      {
        title: 'Quelle autorisation pour en créer une ?',
        list: [
          'Jusqu’à 20 m² de surface de plancher ou d’emprise au sol : déclaration préalable.',
          'En zone urbaine d’une commune couverte par un plan local d’urbanisme : déclaration préalable jusqu’à 40 m².',
          'Au-delà de ces seuils : permis de construire. Il est aussi requis dès 20 m² si l’extension porte la surface totale du bâtiment à plus de 150 m², avec recours obligatoire à un architecte.',
          'En secteur protégé, aux abords d’un monument historique par exemple, les règles sont plus strictes et l’avis de l’architecte des Bâtiments de France est requis.',
        ],
      },
      {
        title: 'Compte-t-elle dans la surface ?',
        paragraphs: [
          'Oui, si elle est close, couverte et d’une hauteur d’au moins 1,80 mètre : elle entre alors dans la surface Carrez. Une véranda non autorisée pose donc un double problème, puisque des mètres carrés vendus reposent sur une construction contestable.',
          'Vérifiez que le certificat de mesurage précise si la véranda est comptée, et pour combien.',
        ],
      },
      {
        title: 'Y vit-on toute l’année ?',
        paragraphs: [
          'Une véranda ancienne, à simple vitrage et sans protection solaire, est froide en hiver et brûlante en été. Regardez le vitrage, la présence de stores ou de brise-soleil, les ouvertures qui permettent de ventiler, et le chauffage.',
          'Regardez aussi les joints et les raccords avec la façade : c’est là que l’eau entre.',
        ],
      },
    ],
    checklist: {
      title: 'À demander pour une véranda existante',
      items: [
        'La déclaration préalable ou le permis de construire.',
        'Le procès-verbal d’assemblée générale qui l’a autorisée.',
        'Le certificat de mesurage, avec la surface de la véranda.',
        'L’année de construction et les factures.',
        'Le type de vitrage et les protections solaires.',
        'Les traces d’infiltration au raccord avec le bâtiment.',
      ],
    },
    faq: [
      {
        q: 'Une pergola ou un store demandent-ils une autorisation ?',
        a: 'Une pergola fixée au bâtiment modifie l’aspect extérieur : elle demande en général une déclaration préalable, et l’accord de la copropriété. Renseignez-vous en mairie avant de l’installer.',
      },
      {
        q: 'Puis-je fermer mon balcon ou ma loggia ?',
        a: 'C’est une modification de façade et une création de surface. Il faut l’accord de la copropriété et une autorisation d’urbanisme. Beaucoup de règlements l’interdisent pour préserver l’unité de l’immeuble.',
      },
      {
        q: 'La véranda augmente-t-elle la taxe foncière ?',
        a: 'Oui. Elle crée de la surface et doit être déclarée au service des impôts dans les quatre-vingt-dix jours qui suivent son achèvement.',
      },
    ],
    sources: [
      { label: 'Justice.fr, « Quelle autorisation d’urbanisme déposer pour construire une véranda ? »', url: 'https://www.justice.fr/fiche/autorisation-urbanisme-deposer-construire-veranda' },
      { label: 'FNAIM, « Loi Carrez : explications et mode de calcul »', url: 'https://www.fnaim.fr/4116-loi-carrez-explications-et-mode-de-calcul.htm' },
    ],
  },
  {
    slug: 'voie-privee-villa-cite-d-artistes',
    art: 'voieprivee',
    title: 'Voie privée, villa, cité d’artistes : ce que l’on achète avec l’adresse',
    description:
      'Derrière une grille, une impasse pavée et des maisons d’artistes : à qui appartient la voie, qui l’entretient, quelles règles s’y appliquent, et les documents à demander avant d’acheter.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Une grille, une allée pavée, des glycines, pas une voiture : les voies privées, les villas et les cités d’artistes sont parmi les adresses les plus recherchées des grandes villes. Ce calme a une explication simple. La rue n’appartient pas à la commune, mais à ceux qui y habitent. En achetant la maison ou l’atelier, vous achetez aussi une part de la rue, avec ses charges et ses règles.',
    takeaways: [
      'Une voie privée appartient à ses riverains. Ce sont eux qui paient la chaussée, l’éclairage, les réseaux et le portail.',
      'Elle est gérée le plus souvent par une copropriété ou par une association syndicale de propriétaires. L’adhésion est attachée au bien : on ne peut pas s’y soustraire.',
      'Un cahier des charges ou un règlement fixe ce que l’on peut y faire : stationnement, travaux, clôtures, activités.',
      'Les gros travaux de voirie sont rares et coûteux. Demandez s’il y en a de prévus.',
    ],
    sections: [
      {
        title: 'À qui appartient la voie ?',
        paragraphs: [
          'Aux propriétaires des biens qui la bordent. Selon les lieux, la voie est une partie commune d’une copropriété, la propriété d’une association syndicale qui réunit les riverains, ou un bien détenu en indivision.',
          'Le titre de propriété du vendeur le précise. Il indique aussi la part qui revient au bien, et donc sa contribution aux charges.',
        ],
      },
      {
        title: 'Qui paie quoi ?',
        list: [
          'L’entretien courant : nettoyage, espaces plantés, éclairage, portail et interphone.',
          'Les réseaux qui passent sous la voie : eau, assainissement, parfois jusqu’au raccordement à la rue publique.',
          'La réfection de la chaussée et des pavés, peu fréquente mais lourde.',
          'L’assurance de la voie, dont les riverains sont responsables en cas d’accident.',
        ],
      },
      {
        title: 'Quelles règles s’y appliquent ?',
        paragraphs: [
          'Celles que les propriétaires se sont données, parfois depuis plus d’un siècle. Le cahier des charges ou le règlement peut limiter la hauteur des constructions, imposer des matériaux, interdire certaines activités, réglementer le stationnement et l’accès des véhicules.',
          'Ces règles s’ajoutent à celles de la commune. Elles protègent le caractère du lieu, et encadrent vos projets : une surélévation, une clôture ou un changement de fenêtres peut exiger l’accord des autres riverains.',
        ],
      },
      {
        title: 'Comment la voie est-elle gérée ?',
        paragraphs: [
          'Par un syndic si c’est une copropriété, par un président et un bureau élus si c’est une association de propriétaires. Dans les deux cas, une assemblée vote le budget et les travaux.',
          'Dans une association syndicale, l’adhésion est attachée au bien et se transmet à chaque vente : l’acheteur devient membre de plein droit, avec les droits et les dettes qui vont avec. Lisez les statuts, ils fixent les règles de vote et de répartition des dépenses.',
        ],
      },
      {
        title: 'Et pour un atelier d’artiste ?',
        paragraphs: [
          'Dans une cité d’artistes, certains ateliers sont désignés comme locaux de travail et non comme logements. Vérifiez la désignation du lot et, si le bien est vendu comme habitation, l’autorisation qui a permis ce changement.',
        ],
      },
    ],
    checklist: {
      title: 'À demander avant d’acheter',
      items: [
        'Le statut de la voie : copropriété, association syndicale ou indivision.',
        'Les statuts, le cahier des charges ou le règlement.',
        'Les trois derniers procès-verbaux d’assemblée.',
        'Le montant annuel des charges de voie, et la part du bien.',
        'Les travaux votés ou envisagés : chaussée, réseaux, portail.',
        'Les règles de stationnement et d’accès des véhicules.',
      ],
    },
    faq: [
      {
        q: 'Une voie privée est-elle fermée au public ?',
        a: 'Ses propriétaires décident. Certaines sont closes par une grille, d’autres restent ouvertes au passage. Une voie ouverte à la circulation publique reste soumise au Code de la route.',
      },
      {
        q: 'La commune peut-elle reprendre la voie ?',
        a: 'Oui, à la demande des propriétaires ou de sa propre initiative, par une procédure de transfert dans le domaine public. La commune prend alors l’entretien à sa charge, et la voie devient une rue comme les autres.',
      },
      {
        q: 'Puis-je refuser de payer les charges de la voie ?',
        a: 'Non. Elles sont attachées au bien. Les impayés peuvent être réclamés au propriétaire en place, d’où l’intérêt de demander un état des sommes dues avant la vente.',
      },
    ],
    sources: [
      { label: 'Actu-Juridique, « Le syndicat de copropriétaires et l’association syndicale libre : deux régimes juridiques exclusifs l’un de l’autre »', url: 'https://www.actu-juridique.fr/civil/immobilier/copropriete/le-syndicat-de-coproprietaires-et-lassociation-syndicale-libre-deux-regimes-juridiques-exclusifs-lun-de-lautre/' },
      { label: 'Notaires, « Le transfert des voies privées dans le domaine public communal »', url: 'https://www.9-nancy.notaires.fr/wp-content/uploads/2023/10/DP10-Le-transfert-des-voies-privees-dans-le-domaine-public-communal.pdf' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
  },
  {
    slug: 'etage-eleve-sans-ascenseur',
    art: 'ascenseur',
    title: 'Sixième sans ascenseur : peut-on en installer un, et qui paie ?',
    description:
      'Vote en assemblée générale, répartition des frais selon l’étage, faisabilité technique : ce qu’il faut savoir avant d’acheter un étage élevé sans ascenseur, et ce que cela change pour le prix.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Le dernier étage a la lumière, la vue et le calme. Il a parfois aussi cent vingt marches. Un étage élevé sans ascenseur se vend moins cher, et c’est souvent ce qui le rend accessible. La question qui suit est toujours la même : pourra-t-on un jour en installer un ? La réponse dépend de l’immeuble, des voisins, et d’un vote.',
    takeaways: [
      'L’installation d’un ascenseur se vote en assemblée générale, à la majorité des voix de tous les copropriétaires.',
      'Si le projet recueille au moins un tiers des voix sans atteindre cette majorité, un second vote peut avoir lieu à la majorité simple.',
      'Les frais se répartissent selon l’utilité de l’ascenseur pour chaque lot : plus l’étage est élevé, plus la part est lourde.',
      'Avant le vote, il y a la technique : toutes les cages d’escalier ne peuvent pas accueillir une cabine.',
    ],
    sections: [
      {
        title: 'Est-ce techniquement possible ?',
        paragraphs: ['C’est la première question, et elle élimine beaucoup de projets. Trois emplacements sont envisageables.'],
        list: [
          'Dans le vide de la cage d’escalier, s’il est assez large.',
          'Dans la cour, contre la façade, avec une cabine extérieure. Il faut alors une autorisation d’urbanisme.',
          'À la place d’une partie des paliers ou de locaux communs, plus rarement.',
        ],
      },
      {
        title: 'Comment se prend la décision ?',
        paragraphs: [
          'L’installation d’un ascenseur est une amélioration de l’immeuble. Elle se vote à la majorité absolue, c’est-à-dire la majorité des voix de tous les copropriétaires, présents ou non.',
          'Si cette majorité n’est pas atteinte mais que le projet a réuni au moins un tiers des voix, l’assemblée peut procéder aussitôt à un second vote, à la majorité des seuls copropriétaires présents, représentés ou ayant voté par correspondance.',
          'En pratique, le vote se joue entre les étages hauts, qui en ont besoin, et les étages bas, qui n’en veulent pas payer le prix.',
        ],
      },
      {
        title: 'Qui paie ?',
        paragraphs: [
          'La loi sur la copropriété répartit les dépenses d’un équipement commun selon l’utilité qu’il présente pour chaque lot. Pour un ascenseur, cette utilité croît avec l’étage : le propriétaire du sixième paie bien davantage que celui du premier, et le rez-de-chaussée est en général dispensé.',
          'La même logique vaut ensuite pour l’entretien, l’électricité et les réparations, qui s’ajoutent aux charges chaque année.',
          'Si vous achetez au dernier étage en comptant sur un ascenseur, c’est donc vous qui en supporterez la plus grande part.',
        ],
      },
      {
        title: 'Où en est le projet dans cet immeuble ?',
        paragraphs: [
          'Lisez les procès-verbaux des dernières assemblées générales. Vous y verrez si la question a déjà été posée, si une étude a été commandée, et comment les copropriétaires ont voté.',
          'Un projet refusé deux fois ne passera pas parce que vous arrivez. Un projet à l’étude, avec un devis et une majorité qui se dessine, change la valeur du bien.',
        ],
      },
      {
        title: 'Comment en tenir compte dans le prix ?',
        paragraphs: [
          'L’absence d’ascenseur se traduit par une décote, d’autant plus forte que l’étage est élevé. Elle pèse aussi sur la revente : une partie des acheteurs, familles avec de jeunes enfants ou personnes âgées, écartera le bien.',
          'Raisonnez avec ce qui existe, pas avec ce qui est espéré. Si l’ascenseur arrive un jour, vous aurez payé votre part, et le bien aura pris de la valeur. S’il n’arrive pas, vous aurez acheté au juste prix.',
        ],
      },
    ],
    checklist: {
      title: 'À regarder et à demander',
      items: [
        'La largeur du vide de la cage d’escalier.',
        'La cour : y a-t-il la place d’une cabine extérieure ?',
        'Les procès-verbaux des trois dernières assemblées générales.',
        'Une étude ou un devis déjà réalisé.',
        'La grille de répartition des charges prévue pour l’ascenseur.',
        'L’état de l’escalier, que vous monterez tous les jours.',
      ],
    },
    faq: [
      {
        q: 'Puis-je financer seul l’ascenseur ?',
        a: 'Des copropriétaires peuvent demander à l’assemblée l’autorisation de l’installer à leurs frais. Ceux qui n’ont pas participé pourront l’utiliser plus tard en payant leur part.',
      },
      {
        q: 'Un monte-escalier est-il une solution ?',
        a: 'Pour un escalier privatif, oui. Dans une cage d’escalier commune, il faut l’accord de la copropriété et une largeur suffisante pour ne pas gêner le passage.',
      },
      {
        q: 'L’ascenseur fait-il baisser le DPE ou les charges ?',
        a: 'Il n’a pas d’effet sur le DPE du logement. Il augmente en revanche les charges de copropriété, par son entretien et sa consommation.',
      },
    ],
    sources: [
      { label: 'Service-Public.fr, « Quelles sont les règles de vote en assemblée générale de copropriété ? »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F32066' },
      { label: 'ANIL, « Les règles de majorité pour décider en assemblée générale de copropriété »', url: 'https://anil.org/majorite-decision-assemblee-generale-copropriete' },
    ],
    listingsLink: { label: 'Voir les derniers étages et rooftops', href: '/categorie/rooftop-vue' },
  },
  {
    slug: 'visiter-avec-un-architecte',
    art: 'expertise',
    title: 'Visiter avec un architecte : quand, pourquoi, comment',
    description:
      'Mur porteur, humidité, faisabilité d’une mezzanine, budget de travaux : ce qu’un architecte voit en une heure dans un bien atypique, le bon moment pour le faire venir, et ce qu’il faut lui demander.',
    category: 'Visite et négociation',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Dans un appartement classique, on voit à peu près ce que l’on achète. Dans un ancien atelier ou sous une charpente, l’essentiel est ailleurs : dans ce qui porte, dans ce qui peut s’ouvrir, dans ce que coûtera le projet que vous avez en tête. Un architecte lit ces choses en une heure. Sa visite coûte peu au regard du prix du bien, et elle peut vous éviter l’erreur comme vous confirmer le coup de cœur.',
    takeaways: [
      'Faites venir l’architecte à la seconde visite, avant l’offre : c’est là que son avis pèse sur votre décision et sur le prix.',
      'Il répond à trois questions : le bâti est-il sain, votre projet est-il faisable, et pour quel ordre de grandeur de budget.',
      'Son avis ne remplace ni les diagnostics obligatoires, ni le notaire. Il les complète.',
      'Demandez un compte rendu écrit, même bref : il vous servira pour négocier.',
    ],
    sections: [
      {
        title: 'Que voit un architecte que vous ne voyez pas ?',
        list: [
          'La structure : ce qui porte, ce qui peut être ouvert, ce qui ne le peut pas.',
          'Les désordres : fissures, traces d’humidité, affaissements, et leur gravité.',
          'Les réseaux : où passent l’eau et les évacuations, donc où peuvent aller une cuisine ou une salle de bains.',
          'La lumière et les hauteurs : ce qu’une mezzanine ou une cloison changerait vraiment.',
          'Les règles : ce que la copropriété et la mairie devront autoriser.',
        ],
      },
      {
        title: 'À quel moment le faire venir ?',
        paragraphs: [
          'Pas à la première visite : elle sert à savoir si le bien vous plaît. À la seconde, quand vous envisagez sérieusement d’acheter et avant de faire une offre.',
          'Prévenez le négociateur de l’agence. Un vendeur sûr de son bien accepte volontiers. Demandez à cette occasion les plans, le règlement de copropriété et les diagnostics, que l’architecte lira avant de venir.',
        ],
      },
      {
        title: 'Que lui demander, précisément ?',
        paragraphs: ['Arrivez avec votre projet, même vague. Un architecte répond mieux à une question précise qu’à un « qu’en pensez-vous ? ».'],
        list: [
          'Puis-je ouvrir ce mur, créer cette mezzanine, déplacer la cuisine ?',
          'Y a-t-il des travaux indispensables, que je le veuille ou non ?',
          'Quel ordre de grandeur de budget, et quel délai ?',
          'Quelles autorisations faudra-t-il obtenir, et de qui ?',
        ],
      },
      {
        title: 'Combien cela coûte-t-il ?',
        paragraphs: [
          'Une visite de conseil se facture en général au temps passé ou au forfait. Les honoraires sont libres : demandez un prix avant la visite, et précisez si vous attendez un avis oral ou un compte rendu écrit.',
          'Si vous lui confiez ensuite les travaux, certains architectes déduisent cette première visite de leurs honoraires. Posez la question.',
        ],
      },
      {
        title: 'Que fait-on de son avis ?',
        paragraphs: [
          'Trois choses. D’abord décider : un projet infaisable change tout. Ensuite chiffrer : un budget de travaux crédible s’ajoute au prix pour savoir ce que le bien vous coûtera vraiment. Enfin négocier : des travaux indispensables, constatés par un professionnel, sont un argument que le vendeur ne peut pas balayer.',
          'Son avis sert aussi à rédiger la promesse de vente, en y inscrivant les conditions qui protègent votre projet, comme l’obtention d’une autorisation de travaux.',
        ],
      },
    ],
    checklist: {
      title: 'À préparer pour sa visite',
      items: [
        'Les plans du bien, cotés si possible.',
        'Le règlement de copropriété.',
        'Les diagnostics : amiante, plomb, électricité, DPE.',
        'Les derniers procès-verbaux d’assemblée générale.',
        'Votre projet, en quelques lignes.',
        'Un mètre et de quoi prendre des photos.',
      ],
    },
    faq: [
      {
        q: 'Un architecte est-il obligatoire pour les travaux ?',
        a: 'Seulement quand un permis de construire porte la surface de plancher du bâtiment à plus de 150 m². En dessous, il reste utile dès que l’on touche à la structure ou aux parties communes.',
      },
      {
        q: 'Peut-on faire venir un artisan à la place ?',
        a: 'Pour chiffrer un poste précis, oui : une toiture, une verrière, une installation électrique. Pour juger de la faisabilité d’un projet d’ensemble, l’architecte est mieux placé.',
      },
      {
        q: 'Où trouver un architecte ?',
        a: 'L’Ordre des architectes tient un annuaire en ligne de ses membres. Cherchez quelqu’un qui a déjà travaillé sur des biens du même type que le vôtre.',
      },
    ],
    sources: [{ label: 'Ordre des architectes, annuaire et conseils aux particuliers', url: 'https://www.architectes.org' }],
  },
  {
    slug: 'hors-marche-off-market-mythe-et-realite',
    art: 'horsmarche',
    title: 'Hors marché : les meilleurs biens se vendent-ils vraiment sans annonce ?',
    description:
      'Le « off market » fait fantasmer tous les acheteurs. Ce que c’est, ce qu’il pèse réellement, pourquoi personne ne peut le mesurer, et comment accéder aux biens avant les autres.',
    category: 'Marché',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 4,
    intro:
      'On vous l’a sûrement dit : les beaux biens ne passent jamais par les annonces, tout se joue en coulisses. C’est en partie vrai, et largement exagéré. Le hors marché existe, il est légal, et il pèse surtout dans le très haut de gamme. Pour le reste, la quasi-totalité des biens finissent en ligne. Ce qui compte n’est pas d’entrer dans un cercle fermé, c’est d’être prévenu le premier.',
    takeaways: [
      'Le hors marché, ou off market, désigne les ventes réalisées sans annonce publique. Il est parfaitement légal : la vente passe devant notaire comme les autres.',
      'Aucune statistique officielle ne le mesure. Les chiffres qui circulent, de 5 % à 25 % selon les sources, sont des estimations de professionnels.',
      'Il concerne surtout les biens d’exception, où le vendeur cherche la discrétion.',
      'Pour un acheteur, la vraie avance se joue plus simplement : faire connaître sa recherche aux agences et être alerté dès la mise en ligne.',
    ],
    sections: [
      {
        title: 'Qu’est-ce que le hors marché ?',
        paragraphs: [
          'SeLoger le définit comme l’ensemble des transactions effectuées en dehors des canaux de diffusion classiques : pas d’annonce sur les portails, pas de vitrine. L’agent mandaté par le vendeur ne passe pas par une publicité large : il active son réseau et présente le bien à des acheteurs qu’il connaît déjà.',
          'Ce n’est pas un marché parallèle. Les mêmes règles s’appliquent, et la vente est signée devant notaire.',
        ],
      },
      {
        title: 'Pourquoi un vendeur choisit-il de ne pas publier ?',
        list: [
          'La discrétion : une personnalité, un divorce, une succession, un dirigeant qui ne veut pas que l’on sache.',
          'Le refus de voir des photos de son intérieur circuler.',
          'L’envie de tester un prix sans « griller » le bien s’il ne se vend pas.',
          'Parfois, simplement, parce que l’agence a déjà l’acheteur.',
        ],
      },
      {
        title: 'Que pèse-t-il vraiment ?',
        paragraphs: [
          'Personne ne le sait, et c’est logique : un bien jamais publié ne laisse aucune trace dans les bases d’annonces. Un cabinet de gestion de patrimoine le rappelle : ni la FNAIM, ni les notaires, ni l’INSEE ne mesurent la part du hors marché.',
          'Les chiffres disponibles sont donc des estimations, et ils varient du simple au quintuple : 5 à 10 % du marché global pour SeLoger, plus de 10 % en 2023 d’après Boursorama, 15 à 25 % des transactions parisiennes selon un chasseur immobilier, et jusqu’à 60 % dans le haut de gamme d’après un groupe spécialisé. Notez que ceux qui avancent les chiffres les plus élevés sont souvent ceux qui vendent l’accès à ce marché.',
        ],
      },
      {
        title: 'Est-ce une bonne affaire pour l’acheteur ?',
        paragraphs: [
          'Pas forcément. L’avantage est réel : moins de concurrence, parfois un seul acheteur en lice. L’inconvénient l’est aussi : sans mise en concurrence, rien ne vous dit que le prix est le bon, et vous avez peu de points de comparaison. Un bien que personne d’autre n’a vu n’est pas, pour cette seule raison, un bien moins cher.',
          'Les vérifications restent les mêmes : documents, copropriété, diagnostics. La confidentialité n’est pas une raison de les abréger.',
        ],
      },
      {
        title: 'Comment voir les biens avant les autres ?',
        paragraphs: [
          'Sans réseau particulier, trois moyens existent, et ils couvrent l’essentiel.',
        ],
        list: [
          'Dire aux agences ce que vous cherchez. Un agent qui connaît votre recherche vous appelle avant de publier : c’est la forme la plus courante du hors marché.',
          'Créer une alerte précise, pour être prévenu le jour de la mise en ligne. Dans les grandes villes, un bien au juste prix part en moins de quinze jours.',
          'Être prêt : financement validé, critères clairs, disponibilité pour visiter dans les quarante-huit heures.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qu’est-ce qu’un bien off market ?',
        a: 'Un bien vendu sans annonce publique, présenté directement par un professionnel à des acheteurs de son réseau. La vente est légale et se signe devant notaire.',
      },
      {
        q: 'Quelle part des ventes se fait hors marché ?',
        a: 'Aucune statistique officielle n’existe. Les estimations de professionnels vont de 5 à 10 % du marché global à 15 à 25 % à Paris, et davantage dans le très haut de gamme.',
      },
      {
        q: 'Un bien hors marché est-il moins cher ?',
        a: 'Pas nécessairement. Il y a moins de concurrence entre acheteurs, mais aussi moins de repères pour juger le prix.',
      },
      {
        q: 'Comment accéder aux biens avant leur mise en ligne ?',
        a: 'En faisant connaître votre recherche aux agences, qui préviennent leurs acheteurs avant de publier, et en créant une alerte pour être informé dès la mise en ligne.',
      },
    ],
    sources: [
      { label: 'SeLoger, « Tout savoir sur le off market en immobilier »', url: 'https://edito.seloger.com/locaux-pros/points-marche/savoir-market-immobilier-article-19518.html' },
      { label: 'Hagnéré Patrimoine, « Investissement immobilier off-market »', url: 'https://www.hagnere-patrimoine.fr/guides-patrimoine/investissement-immobilier/investissement-immobilier-off-market-2026' },
      { label: 'Boursorama, « Qu’est-ce que le off market ? »', url: 'https://www.boursorama.com/immobilier/actualites/qu-est-ce-que-le-off-market-d951ada7894cea4cb0fb6d4d12d1a162' },
      { label: 'Home Select, « Off-market immobilier à Paris »', url: 'https://homeselect.paris/chasseur-immobilier-paris/off-market/' },
      { label: 'Groupe Estia, communiqué sur le off market dans l’immobilier haut de gamme (décembre 2024)', url: 'https://www.galivel.com/media/files/241210_cpmci_offmarket-1.pdf' },
      { label: 'MySweetImmo, « Vente off-market : comment se déroulent les transactions confidentielles ? »', url: 'https://www.mysweetimmo.com/2026/03/26/vente-off-market-comment-se-deroulent-les-transactions-confidentielles/' },
    ],
  },
  {
    slug: 'conditions-suspensives-bien-atypique',
    art: 'conditions',
    title: 'Conditions suspensives : celles qu’il faut prévoir pour un bien atypique',
    description:
      'La condition de prêt ne suffit pas quand on achète un atelier à transformer ou un loft à régulariser. Les clauses à faire inscrire dans la promesse, et comment les rédiger.',
    category: 'Visite et négociation',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Une promesse de vente contient presque toujours une condition suspensive : l’obtention du prêt. Pour un appartement classique, c’est l’essentiel. Pour un bien atypique, votre achat dépend souvent d’autre chose : une autorisation de la mairie, un vote de la copropriété, un document que le vendeur doit encore obtenir. Si ce n’est pas écrit dans la promesse, ce n’est pas une condition. C’est votre risque.',
    takeaways: [
      'Une condition suspensive est un événement dont dépend la vente : s’il ne se réalise pas, la promesse tombe et vos sommes vous sont rendues.',
      'Elle doit être acceptée par le vendeur et inscrite dans la promesse. Un projet dont vous lui avez parlé à l’oral ne vous protège pas.',
      'Pour un bien atypique, pensez au-delà du prêt : permis ou déclaration préalable, changement d’usage, vote de la copropriété, régularisation de travaux.',
      'Une condition utile est précise : quel projet, quelle autorisation, dans quel délai.',
      'Le délai de rétractation de dix jours s’ajoute aux conditions suspensives. Il ne les remplace pas.',
    ],
    sections: [
      {
        title: 'À quoi sert une condition suspensive ?',
        paragraphs: [
          'À ne pas rester engagé si ce qui rendait l’achat possible ne se produit pas. Le Crédit Agricole la définit ainsi : si l’une de ces conditions ne se réalise pas, l’avant-contrat devient caduc. L’acheteur récupère alors intégralement les sommes versées, sans pénalité.',
          'Deux précisions. Les conditions doivent être le fruit d’un accord entre l’acheteur et le vendeur : elles se négocient avec le prix. Et elles se distinguent du délai de rétractation : pendant dix jours après la signature, l’acheteur particulier peut renoncer sans avoir à se justifier. Passé ce délai, seules les conditions suspensives le protègent.',
        ],
      },
      {
        title: 'Quelles conditions prévoir pour un bien atypique ?',
        list: [
          'Le prêt, comme pour tout achat, en vérifiant que la banque sait qu’il s’agit d’un ancien local ou d’un bien particulier.',
          'L’obtention d’un permis de construire ou d’une déclaration préalable, si vous achetez pour transformer : mezzanine, ouverture, changement de façade.',
          'L’acceptation d’un changement de destination ou d’usage, si le local n’est pas encore un logement, ou si vous comptez y exercer une activité.',
          'Le vote de l’assemblée générale, si votre projet touche les parties communes ou si des travaux anciens doivent être régularisés.',
          'La remise d’un document par le vendeur : autorisation d’urbanisme retrouvée, attestation, mesurage, diagnostic complémentaire.',
        ],
      },
      {
        title: 'Pourquoi faut-il l’écrire noir sur blanc ?',
        paragraphs: [
          'Parce que les juges s’en tiennent au texte. Un site juridique rapporte le cas d’un acheteur qui voulait faire annuler son achat faute d’avoir obtenu le permis nécessaire à sa rénovation. Le vendeur lui a opposé que l’obtention du permis n’avait pas été érigée en condition suspensive dans le compromis.',
          'Le vendeur savait peut-être tout du projet. Cela ne change rien : ce qui n’est pas dans l’acte n’engage personne.',
        ],
      },
      {
        title: 'Comment rédiger une condition utile ?',
        paragraphs: [
          'Une condition vague ne protège pas mieux qu’une absence de condition. Les praticiens recommandent de préciser quatre choses.',
        ],
        list: [
          'La nature exacte du projet : par exemple, la création d’une mezzanine de telle surface.',
          'L’autorisation attendue : déclaration préalable, permis de construire, vote de l’assemblée générale.',
          'Le délai pour l’obtenir. Pour un permis de construire, comptez généralement quatre à six mois ; pour un vote de copropriété, la date de la prochaine assemblée.',
          'Ce qui se passe en cas de refus, et qui doit faire les démarches.',
        ],
      },
      {
        title: 'Le vendeur va-t-il accepter ?',
        paragraphs: [
          'Chaque condition allonge la vente et ajoute une incertitude pour lui. Il peut refuser, ou demander un prix plus élevé. C’est une négociation : plus votre condition est précise et son délai court, plus elle est acceptable.',
          'Vous pouvez aussi réduire l’incertitude avant de signer : un certificat d’urbanisme demandé à la mairie, un avis d’architecte, une question posée au syndic. Ce que vous savez déjà n’a plus besoin d’être une condition.',
          'Parlez-en au notaire dès l’offre acceptée. C’est lui qui rédige, et il a l’habitude de ces clauses.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer la promesse',
      items: [
        'J’ai listé tout ce dont mon achat dépend, au-delà du prêt.',
        'Chaque point est écrit dans la promesse, pas seulement évoqué.',
        'Chaque condition précise le projet, l’autorisation et le délai.',
        'Je sais qui fait les démarches, et à quelle date.',
        'Le notaire a relu les clauses avec moi.',
      ],
    },
    faq: [
      {
        q: 'Peut-on conditionner un achat à l’obtention d’un permis de construire ?',
        a: 'Oui, si le vendeur l’accepte et que la condition est inscrite dans la promesse. En cas de refus du permis dans le délai prévu, la vente est annulée et les sommes versées sont restituées.',
      },
      {
        q: 'Peut-on conditionner un achat à un vote de copropriété ?',
        a: 'Oui. C’est une condition librement négociée entre acheteur et vendeur. Elle doit préciser l’objet du vote et la date limite.',
      },
      {
        q: 'Quelle différence avec le délai de rétractation ?',
        a: 'Le délai de rétractation dure dix jours et permet de renoncer sans motif. Les conditions suspensives jouent ensuite, pendant toute la durée de la promesse, pour des événements précis.',
      },
      {
        q: 'Que se passe-t-il si une condition ne se réalise pas ?',
        a: 'L’avant-contrat devient caduc et l’acheteur récupère intégralement les sommes versées, sans pénalité.',
      },
    ],
    sources: [
      { label: 'Crédit Agricole, « Les conditions suspensives d’un avant-contrat »', url: 'https://e-immobilier.credit-agricole.fr/index.php/guide-immobilier/pret-immobilier/conditions-suspensives' },
      { label: 'SeLoger, « Rétractation d’un compromis de vente : quel délai après la signature ? »', url: 'https://edito.seloger.com/conseils-d-experts/acheter/compromis-de-vente-pouvez-renoncer-a-achat-a-moment-article-39658.html' },
      { label: 'Weblex, « Vente immobilière : rappels utiles sur le compromis de vente »', url: 'https://www.weblex.fr/fiches-conseils/vente-immobiliere-rappels-utiles-sur-le-compromis-de-vente' },
      { label: 'CPIM, « Clauses suspensives du compromis »', url: 'https://www.cpim.fr/clauses-suspensives-compromis-2026/' },
      { label: 'ADIL des Alpes-Maritimes, « Achat d’un logement existant »', url: 'https://www.nicecotedazur.org/wp-content/uploads/2025/06/ADIL06-4volets_achat_logement_existant_imp.pdf' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'assurer-un-bien-atypique',
    art: 'assurance',
    title: 'Assurer un bien atypique : ce qu’il faut déclarer',
    description:
      'Un séjour de 60 m², une mezzanine, une verrière, un atelier où l’on travaille : un loft ne se déclare pas comme un trois-pièces. Les points à ne pas oublier pour être bien couvert.',
    category: 'Financement',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 4,
    intro:
      'L’assurance habitation se souscrit souvent en dix minutes, en cochant un nombre de pièces. Pour un logement classique, cela suffit. Pour un loft, un atelier ou un dernier étage sous verrière, ces dix minutes peuvent coûter cher : un contrat ne couvre que ce qui a été déclaré. Voici ce qu’un bien singulier oblige à dire à son assureur.',
    takeaways: [
      'En copropriété, chaque copropriétaire doit être assuré en responsabilité civile, qu’il occupe ou non son logement.',
      'Un grand volume compte souvent pour plusieurs pièces : beaucoup d’assureurs comptent deux pièces au-delà de 30 m².',
      'Une mezzanine s’ajoute à la surface de la pièce où elle se trouve. L’oublier, c’est risquer de ne pas être indemnisé.',
      'Verrière, activité professionnelle, travaux : tout ce qui sort du logement standard se signale par écrit.',
      'Une péniche ne s’assure pas avec un contrat d’habitation ordinaire.',
    ],
    sections: [
      {
        title: 'L’assurance est-elle obligatoire ?',
        paragraphs: [
          'En copropriété, oui pour la responsabilité civile : la loi impose à chaque copropriétaire de s’assurer contre les risques dont il doit répondre, qu’il soit occupant ou non occupant. L’immeuble est assuré de son côté par le syndic, pour les parties communes.',
          'Pour une maison que l’on occupe soi-même, aucune obligation légale. Mais la banque l’exige pour prêter, et l’on voit mal qui s’en passerait.',
        ],
      },
      {
        title: 'Comment compter les pièces d’un loft ?',
        paragraphs: [
          'C’est le piège classique. Un loft, c’est une seule grande pièce : on est tenté de déclarer « une pièce ». Les assureurs ne comptent pas ainsi.',
        ],
        list: [
          'Toute pièce d’au moins 9 m² compte, hors cuisine et salle de bains.',
          'Une pièce de plus de 30 m² compte pour deux chez de nombreux assureurs, parfois davantage au-delà.',
          'Les surfaces sous moins de 1,80 m de hauteur ne comptent pas.',
          'Une mezzanine s’ajoute à la surface de la pièce dans laquelle elle se trouve.',
        ],
      },
      {
        title: 'Que se passe-t-il si la déclaration est inexacte ?',
        paragraphs: [
          'Un assureur le dit simplement : « oublier » des pièces peut vous empêcher d’être indemnisé en cas de sinistre. À l’inverse, en déclarer trop revient à payer trop cher. Les règles de calcul varient d’une compagnie à l’autre : demandez la vôtre par écrit, et décrivez le logement tel qu’il est.',
        ],
      },
      {
        title: 'Que faut-il signaler en plus ?',
        list: [
          'La verrière et les grandes surfaces vitrées : vérifiez la garantie bris de glace et son plafond.',
          'Une activité professionnelle exercée sur place : le contrat d’habitation ne la couvre pas d’office, ni le matériel qui va avec.',
          'Les annexes : cave, atelier séparé, terrasse aménagée.',
          'Les travaux : une mezzanine créée, un mur ouvert ou une surface ajoutée modifient ce qui est assuré. Déclarez-les.',
          'Les objets de valeur et les œuvres, fréquents dans ce type de lieu.',
        ],
      },
      {
        title: 'Et pour une péniche ?',
        paragraphs: [
          'Un bateau-logement relève de contrats spécifiques, distincts de l’assurance habitation classique, qui tiennent compte de la coque et de la navigation. Renseignez-vous avant l’achat : le gestionnaire de l’emplacement peut exiger une attestation.',
        ],
      },
      {
        title: 'Quand s’en occuper ?',
        paragraphs: [
          'Avant de signer chez le notaire : vous devenez responsable du bien le jour de l’acte. Demandez un devis dès que l’offre est acceptée, en décrivant précisément le logement, sa surface, ses pièces et ses annexes. Si un assureur hésite, mieux vaut le savoir pendant que vous pouvez encore comparer.',
        ],
      },
    ],
    faq: [
      {
        q: 'Combien de pièces déclarer pour un loft ?',
        a: 'Cela dépend de l’assureur, mais un grand séjour compte en général pour plusieurs pièces : souvent deux au-delà de 30 m². Demandez la règle de calcul par écrit.',
      },
      {
        q: 'Une mezzanine doit-elle être déclarée à l’assurance ?',
        a: 'Oui. Sa surface s’ajoute à celle de la pièce où elle se trouve, pour la partie où la hauteur atteint 1,80 m.',
      },
      {
        q: 'Un copropriétaire est-il obligé de s’assurer ?',
        a: 'Oui, au moins en responsabilité civile, qu’il occupe son logement ou non.',
      },
      {
        q: 'Mon assurance habitation couvre-t-elle mon activité professionnelle à domicile ?',
        a: 'Pas automatiquement. Signalez l’activité à votre assureur et vérifiez que votre matériel et votre responsabilité professionnelle sont couverts.',
      },
    ],
    sources: [
      { label: 'La Banque Postale, « Tout savoir sur l’assurance copropriété »', url: 'https://www.labanquepostale.fr/particulier/accompagner/actualites-et-conseils/actus/assurance-copropriete.html' },
      { label: 'Matmut, « Calculer le nombre de pièces pour son assurance habitation »', url: 'https://www.matmut.fr/assurance/habitation/conseils/calculer-nombre-pieces' },
      { label: 'Leocare, « Comment calculer le nombre de pièces pour son assurance habitation ? »', url: 'https://leocare.eu/fr/blog/comment-calculer-nombre-de-pieces-maison-appartement/' },
      { label: 'A comme Assure, « Nombre de pièces et assurance habitation »', url: 'https://www.acommeassure.com/?p=9912' },
      { label: 'Magnolia, « Assurance habitation selon le type de logement »', url: 'https://www.magnolia.fr/assurance-habitation/logement' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'combien-de-temps-dure-une-recherche',
    art: 'temps',
    title: 'Combien de temps dure une recherche immobilière ?',
    description:
      'Trois à six mois en moyenne en France, davantage à Paris, plus encore pour un bien rare. Ce que disent les chiffres disponibles, et comment ne pas rater le bon bien quand il arrive.',
    category: 'Marché',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 4,
    intro:
      'On commence une recherche en pensant trouver en quelques semaines. On la termine souvent bien plus tard, après des dizaines d’annonces et quelques déceptions. C’est normal, et c’est encore plus vrai quand on cherche un bien rare. Les chiffres disponibles donnent un ordre de grandeur. Ils disent surtout une chose : une recherche est longue, mais un bon bien, lui, reste très peu de temps.',
    takeaways: [
      'Il n’existe pas de statistique officielle sur la durée d’une recherche. Les estimations viennent de banques, de portails et de chasseurs immobiliers.',
      'En France, elles convergent : entre deux et six mois pour trouver, et environ six visites.',
      'À Paris, un chasseur immobilier évalue la recherche d’un acheteur seul à environ six mois et plus de quarante visites.',
      'Dans les grandes villes, un bien au juste prix part en moins de quinze jours. D’où l’intérêt d’être prévenu le jour où il arrive.',
    ],
    sections: [
      {
        title: 'Que disent les chiffres en France ?',
        list: [
          'Le Crédit Agricole compte trois à six mois en moyenne pour trouver son logement, et six visites.',
          'Meilleurs Agents donne une fourchette de deux à cinq mois, en précisant que c’est la phase la plus difficile à mesurer.',
          'Entre le début de la recherche et la remise des clés, il faut ajouter le délai entre l’offre acceptée et la signature chez le notaire, soit trois à quatre mois.',
        ],
        paragraphs: [
          'Ce sont des moyennes déclarées par des professionnels, pas une mesure officielle. Elles donnent un repère, pas une promesse.',
        ],
      },
      {
        title: 'Et à Paris ?',
        paragraphs: [
          'Le marché y est plus tendu, et les estimations plus hautes. Le chasseur immobilier Home Select avance environ six mois et plus de quarante appartements visités pour un acheteur qui cherche seul. Un courtier parle de trois à six mois pour un premier achat.',
          'Prenez le premier chiffre avec recul : il vient d’un professionnel dont le métier est précisément de raccourcir la recherche. Il confirme tout de même ce que disent les autres : à Paris, compter en semaines est rarement réaliste.',
        ],
      },
      {
        title: 'Pourquoi est-ce plus long pour un bien atypique ?',
        paragraphs: [
          'Parce qu’il y en a peu. Un atelier d’artiste ou un dernier étage avec terrasse ne se présente pas chaque semaine dans un quartier donné. Le Crédit Agricole note que certains acheteurs, faute de biens disponibles ou parce qu’ils refusent toute concession, cherchent pendant un an ou deux.',
          'Ajoutez que ces biens sont dispersés : un loft chez une agence, une maison d’architecte chez une autre. Faire le tour de tous les sites chaque jour pendant des mois, personne ne le tient.',
        ],
      },
      {
        title: 'Si la recherche est longue, pourquoi faut-il aller vite ?',
        paragraphs: [
          'Parce que les deux durées ne sont pas les mêmes. La vôtre se compte en mois. Celle d’un bon bien sur le marché se compte en jours : d’après Meilleurs Agents, à Paris, Lyon ou Bordeaux, les biens au juste prix partent en moins de quinze jours.',
          'Chercher longtemps ne sert donc à rien si l’on apprend l’existence du bon bien trois semaines après sa mise en vente. La patience et la réactivité vont ensemble.',
        ],
      },
      {
        title: 'Comment tenir dans la durée ?',
        list: [
          'Créez une alerte précise : c’est elle qui cherche tous les jours à votre place.',
          'Préparez votre financement avant de visiter, pour pouvoir faire une offre le jour même.',
          'Fixez vos critères non négociables, trois au plus, et acceptez de bouger sur le reste.',
          'Visitez vite, mais vérifiez : nos articles sur la visite et sur l’offre d’achat listent les questions à poser.',
          'Faites savoir aux agences ce que vous cherchez : elles connaissent des biens avant leur mise en ligne.',
        ],
      },
    ],
    faq: [
      {
        q: 'Combien de temps faut-il pour trouver un logement à acheter ?',
        a: 'Entre deux et six mois en moyenne en France d’après les estimations de banques et de portails, pour environ six visites. Il n’existe pas de statistique officielle.',
      },
      {
        q: 'Combien de temps dure une recherche à Paris ?',
        a: 'Souvent trois à six mois. Un chasseur immobilier parisien évalue à environ six mois et plus de quarante visites la recherche d’un acheteur seul.',
      },
      {
        q: 'Combien de temps un bien reste-t-il en vente ?',
        a: 'Très peu quand il est au juste prix : moins de quinze jours dans les grandes villes, d’après Meilleurs Agents.',
      },
      {
        q: 'Comment ne pas rater un bien rare ?',
        a: 'En étant prévenu dès sa mise en ligne, par une alerte, et en ayant un financement prêt pour faire une offre rapidement.',
      },
    ],
    sources: [
      { label: 'Crédit Agricole, « Quel délai pour un achat immobilier ? »', url: 'https://e-immobilier.credit-agricole.fr/conseils/1er-achat/quel-delai-pour-acquerir-un-logement' },
      { label: 'Meilleurs Agents, « L’immo en chiffres : combien de temps prend l’achat d’un bien immobilier ? »', url: 'https://edito.meilleursagents.com/conseils-d-experts/acheter/l-immo-chiffres-combien-de-temps-prend-l-achat-d-un-bien-immobilier' },
      { label: 'Home Select, « Recherche immobilière à Paris : combien de biens faut-il voir ? »', url: 'https://homeselect.paris/blog/recherche-immobiliere-combien-visites/' },
      { label: 'Helloprêt, « Acheter un appartement à Paris en 2026 »', url: 'https://www.hellopret.fr/achat-immobilier/acheter-appartement-paris-conseils/' },
    ],
  },
  {
    slug: 'revendre-un-bien-atypique',
    art: 'revendre',
    title: 'Un bien atypique se revend-il bien ?',
    description:
      'Moins d’acheteurs, mais plus motivés : la revente d’un bien singulier ne suit pas les règles habituelles. Ce qui la facilite, ce qui la freine, et comment y penser dès l’achat.',
    category: 'Marché',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'C’est la question que l’on se pose une fois le coup de cœur passé : et le jour où je voudrai vendre ? Un bien atypique plaît beaucoup à peu de gens. Selon les cas, cela joue pour vous ou contre vous. La bonne nouvelle : une grande partie de la réponse se décide au moment de l’achat, et tient à des choses que vous pouvez vérifier.',
    takeaways: [
      'Un bien atypique s’adresse à moins d’acheteurs qu’un bien classique, mais à des acheteurs qui le cherchent précisément. Il peut se vendre plus cher, ou attendre plus longtemps.',
      'Son prix est plus difficile à fixer, faute de biens comparables. C’est vrai pour vous à l’achat, et ce le sera pour votre acheteur.',
      'Ce qui se revend bien : une singularité que l’on peut nommer, un dossier en règle, et les qualités que tout le monde cherche, comme la lumière ou un extérieur.',
      'Ce qui se revend mal : une irrégularité jamais réglée, un défaut que l’on a pris pour du caractère, un aménagement trop personnel.',
    ],
    sections: [
      {
        title: 'Moins d’acheteurs, est-ce un problème ?',
        paragraphs: [
          'Pas forcément. Un courtier le résume ainsi : un bien atypique peut valoir 30 % de plus qu’un bien standard comparable pour un acheteur passionné, ou 30 % de moins si la revente prend des mois faute d’acheteur correspondant. Ces chiffres sont une image, pas une statistique, mais l’idée est juste : l’écart possible est plus grand dans les deux sens.',
          'Les motivations des acheteurs vont dans le même sens. Dans la dernière étude détaillée du réseau Espaces Atypiques, le premier motif d’achat était le coup de cœur pour le bien, à égalité avec le besoin d’espace. Un acheteur qui a un coup de cœur négocie moins. Encore faut-il qu’il passe.',
        ],
      },
      {
        title: 'Pourquoi le prix est-il si difficile à fixer ?',
        paragraphs: [
          'Parce qu’il manque des points de comparaison. Un trois-pièces se compare aux trois-pièces vendus dans la rue. Un atelier avec verrière n’a pas d’équivalent à cinq cents mètres. Les professionnels retiennent donc un faisceau de critères : emplacement, état, surface, qualité de l’architecture, potentiel, coût des travaux, performance énergétique et rareté.',
          'Conséquence pratique : méfiez-vous d’un prix au mètre carré appliqué mécaniquement, à l’achat comme à la revente. Notre article sur la négociation d’un bien atypique détaille sur quoi s’appuyer.',
        ],
      },
      {
        title: 'Qu’est-ce qui facilite la revente ?',
        list: [
          'Une singularité claire : une verrière, une terrasse, une hauteur, une signature. Ce que l’on sait nommer, on sait le vendre.',
          'Un dossier complet : autorisations d’urbanisme, votes de la copropriété, plans, diagnostics, factures. C’est ce que demandera le notaire de votre acheteur.',
          'Les qualités universelles : lumière, calme, extérieur, emplacement. Elles élargissent le nombre d’acheteurs.',
          'Un bien financable : destination d’habitation établie, surface officielle cohérente.',
          'Une histoire : qui a construit, transformé, habité. Elle fait partie de ce que l’on achète.',
        ],
      },
      {
        title: 'Qu’est-ce qui la freine ?',
        list: [
          'Une irrégularité : travaux non déclarés, local qui n’est pas officiellement un logement, terrasse sans droit clair.',
          'Un défaut structurel présenté comme du caractère : pas de lumière, humidité, bruit, plan impossible à meubler.',
          'Un diagnostic de performance énergétique très défavorable.',
          'Des aménagements trop personnels, qui obligent l’acheteur à tout refaire.',
          'Des charges ou des travaux de copropriété lourds à venir.',
        ],
      },
      {
        title: 'Comment y penser dès l’achat ?',
        paragraphs: [
          'Posez-vous la question que se posera votre futur acheteur : qu’est-ce qui manque au dossier ? Tout ce que vous obtenez du vendeur aujourd’hui, vous n’aurez pas à le reconstituer dans dix ans. Et tout ce que vous régularisez pendant que vous êtes propriétaire prend de la valeur.',
          'Gardez enfin une trace de vos propres travaux : autorisations, factures, attestations d’assurance des entreprises. C’est le premier document que l’on vous demandera.',
        ],
      },
    ],
    faq: [
      {
        q: 'Un bien atypique est-il plus difficile à revendre ?',
        a: 'Il s’adresse à moins d’acheteurs, donc la vente peut être plus longue. Mais ces acheteurs le cherchent précisément et négocient souvent moins. Un bien en règle, lumineux et bien situé se revend bien.',
      },
      {
        q: 'Un bien atypique prend-il plus de valeur qu’un bien classique ?',
        a: 'Rien ne permet de l’affirmer en général. Sa rareté le protège quand elle correspond à ce que les acheteurs recherchent, comme un extérieur ou un volume. Elle ne compense pas un défaut ou une irrégularité.',
      },
      {
        q: 'Comment estimer un bien atypique ?',
        a: 'En croisant plusieurs critères plutôt qu’un simple prix au mètre carré : emplacement, état, surface, architecture, rareté, travaux, performance énergétique. Faute de biens comparables, l’avis d’un professionnel habitué à ce type de biens est utile.',
      },
    ],
    sources: [
      { label: 'Bourse des crédits, « Bien immobilier atypique : les vérifications avant d’acheter »', url: 'https://www.boursedescredits.com/guide-immobilier-atypique-verifications-acheter-6182.php' },
      { label: 'SeLoger, « Acheter un bien atypique : mode d’emploi »', url: 'https://edito.seloger.com/conseils-d-experts/acheter/acheter-un-bien-atypique-mode-d-emploi-article-16977.html' },
      { label: 'Optimhome, « Vendre un bien atypique : loft, moulin, corps de ferme »', url: 'https://www.optimhome.com/fr/blog/vendre-un-bien-atypique-loft-moulin-corps-de-ferme-etc' },
      { label: 'Laforêt, « Comment estimer un bien atypique ? »', url: 'https://www.laforet.com/blog/vente/comment-estimer-un-bien-atypique' },
      { label: 'PAP, « Logements atypiques : qui les achète ? » (étude Espaces Atypiques, ventes 2017)', url: 'https://www.pap.fr/actualites/logements-atypiques-qui-les-achetent/a20331' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'qu-est-ce-qu-un-bien-atypique',
    art: 'atypique',
    title: 'Qu’est-ce qu’un bien atypique, et qui en achète ?',
    description:
      'Loft, atelier, péniche, maison d’architecte : le mot « atypique » n’a pas de définition légale. Ce qu’il recouvre vraiment, ce qu’il ne garantit pas, et le portrait de ceux qui achètent.',
    category: 'Marché',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Le mot est partout dans les annonces, et il ne veut pas toujours dire grand-chose. Un bien atypique n’est pas un bien cher, ni un bien grand, ni un bien bizarre. C’est un bien qui s’écarte du logement standard par quelque chose de précis, que l’on peut nommer. Savoir quoi, c’est déjà savoir ce qu’il faudra vérifier avant d’acheter.',
    takeaways: [
      'Il n’existe aucune définition légale du bien atypique. Banques, portails et agences s’accordent sur une idée : un logement qui s’écarte des standards par son architecture, son histoire, son usage d’origine ou son emplacement.',
      'L’atypique n’est pas une question de prix : d’après la dernière étude détaillée du réseau Espaces Atypiques, près d’une vente sur quatre se faisait sous 300 000 euros.',
      'Chaque singularité a sa vérification : un ancien local d’activité pose la question de la destination, une terrasse celle de la propriété, une péniche celle de l’emplacement.',
      'Les acheteurs ne sont pas des originaux : le premier motif d’achat est le coup de cœur, à égalité avec le besoin d’espace.',
    ],
    sections: [
      {
        title: 'Existe-t-il une définition ?',
        paragraphs: [
          'Pas dans la loi. Le terme est un usage de la profession. Le Crédit Agricole le définit comme un logement qui s’écarte des standards du marché par son architecture (volumes ouverts, verrières, structures industrielles), par son histoire ou son usage initial (ancien commerce, atelier, usine), par son emplacement inhabituel (péniche, cabane, habitat troglodytique) ou par ses matériaux et caractéristiques remarquables.',
          'Un comparateur de crédit retient une lecture plus étroite, et plus utile pour l’acheteur : un logement dont l’usage initial n’était pas l’habitation, ou dont les caractéristiques sortent des standards résidentiels. C’est cette origine qui explique la plupart des vérifications à faire.',
        ],
      },
      {
        title: 'Comment Loftissime le définit-il ?',
        paragraphs: [
          'Par six caractéristiques précises. Un bien est publié s’il en présente au moins une.',
        ],
        list: [
          'Une autre vie avant : loft, atelier d’artiste, ancienne usine, commerce ou bureaux transformés, péniche.',
          'Un volume : hauteur sous plafond, verrière, duplex, triplex.',
          'Un dehors en ville : terrasse, toit-terrasse, jardin, cour.',
          'Une situation rare : dernier étage, vue dégagée, bord de l’eau, maison en ville.',
          'Une signature : maison ou appartement d’architecte, immeuble remarquable.',
          'Une histoire : hôtel particulier, maison de maître, bien ancien de caractère.',
        ],
      },
      {
        title: 'Atypique veut-il dire cher ?',
        paragraphs: [
          'Non. La dernière étude détaillée publiée par le réseau Espaces Atypiques, sur ses ventes de 2017, donnait un budget moyen de 560 000 euros, mais 24 % des ventes se faisaient en dessous de 300 000 euros, et seulement 3 % de l’offre dépassait deux millions. Les petites surfaces, autour de 50 m², représentaient 30 % des ventes.',
          'Ces chiffres ont plusieurs années et ne concernent qu’un réseau : ils donnent un ordre de grandeur, pas un état du marché d’aujourd’hui.',
        ],
      },
      {
        title: 'Quels biens se vendent le plus ?',
        paragraphs: [
          'Dans cette même étude, la répartition des ventes était la suivante :',
        ],
        list: [
          'Appartements avec belle terrasse ou rénovés de façon contemporaine : 37 %.',
          'Maisons d’architecte : 28 %.',
          'Lofts et anciens locaux industriels : 26 %.',
          'Duplex et triplex : 8 %.',
          'Péniches, anciens couvents et autres : 1 %.',
        ],
      },
      {
        title: 'Qui achète un bien atypique ?',
        paragraphs: [
          'Toujours d’après cette étude : un acheteur de 42 ans en moyenne, le plus souvent entre 30 et 50 ans, marié dans 47 % des cas et célibataire dans 27 %, cadre ou exerçant une profession intellectuelle supérieure.',
          'Ses motivations disent l’essentiel : le coup de cœur pour le bien (25 %), le besoin d’espace (25 %), l’envie d’un nouveau projet (18 %). Les biens vendus étaient en moyenne plus grands de 50 m² que la moyenne française, et 61 % avaient un espace extérieur.',
        ],
      },
      {
        title: 'Ce que le mot ne garantit pas',
        paragraphs: [
          'Dans une annonce, « atypique » peut aussi habiller un défaut : un plan biscornu, un rez-de-chaussée sombre, un local sans statut clair. Demandez toujours ce qui, précisément, rend le bien atypique. Si la réponse tient en une caractéristique nommable, vous savez quoi vérifier. Si elle reste vague, méfiez-vous.',
        ],
      },
    ],
    faq: [
      {
        q: 'Qu’est-ce qu’un bien atypique en immobilier ?',
        a: 'Un logement qui s’écarte des standards du marché par son architecture, son histoire, son usage d’origine ou son emplacement : loft, atelier d’artiste, maison d’architecte, péniche, dernier étage avec terrasse, lieu reconverti. Le terme n’a pas de définition légale.',
      },
      {
        q: 'Un bien atypique est-il forcément cher ?',
        a: 'Non. Le prix n’est pas un critère. Dans la dernière étude détaillée du réseau Espaces Atypiques, près d’une vente sur quatre se faisait sous 300 000 euros.',
      },
      {
        q: 'Un bien atypique est-il plus risqué à acheter ?',
        a: 'Il demande plus de vérifications, parce que sa singularité vient souvent d’une transformation : destination, autorisations, surface réelle, copropriété. Bien vérifié, il n’est pas plus risqué qu’un autre.',
      },
      {
        q: 'Où trouver les biens atypiques à vendre ?',
        a: 'Ils sont dispersés chez de nombreuses agences. Loftissime les réunit sur un seul site et permet de créer une alerte pour être prévenu des nouveaux biens.',
      },
    ],
    sources: [
      { label: 'Crédit Agricole, « Qu’est-ce qu’un bien immobilier atypique et comment l’acheter ? »', url: 'https://e-immobilier.credit-agricole.fr/conseils/marche/ce-quil-faut-savoir-avant-dacheter-un-bien-immobilier-atypique' },
      { label: 'PAP, « Logements atypiques : qui les achète ? » (étude Espaces Atypiques, ventes 2017)', url: 'https://www.pap.fr/actualites/logements-atypiques-qui-les-achetent/a20331' },
      { label: 'Bourse des crédits, « Bien immobilier atypique : les vérifications avant d’acheter »', url: 'https://www.boursedescredits.com/guide-immobilier-atypique-verifications-acheter-6182.php' },
      { label: 'Pretto, « Que faut-il savoir quand on cherche un bien atypique ? »', url: 'https://www.pretto.fr/bien-immobilier/maison-ou-appartement/bien-atypique/' },
      { label: 'Loftissime, « Questions fréquentes : ce que nous publions »', url: 'https://loftissime.fr/charte' },
    ],
    listingsLink: { label: 'Voir tous les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'surelever-ou-racheter-des-combles',
    art: 'surelever',
    title: 'Surélever, racheter des combles : gagner des mètres au-dessus de chez soi',
    description:
      'Au dernier étage, on lève les yeux : et si l’on montait ? À qui appartient le droit de surélever, comment racheter des combles, quels votes sont nécessaires.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Un dernier étage sous des combles vides, un toit plat sur lequel on se verrait bien construire une pièce de plus : le potentiel est souvent l’argument qui fait pencher un achat. Encore faut-il qu’il vous appartienne. En copropriété, ce qui se trouve au-dessus de votre plafond est rarement à vous. Voici comment le savoir, et comment l’obtenir.',
    takeaways: [
      'Le droit de surélever appartient à la copropriété, pas au propriétaire du dernier étage, sauf si le règlement en dispose autrement.',
      'La copropriété peut céder ce droit, à un copropriétaire ou à un tiers, par un vote en assemblée générale et contre un prix réparti entre tous.',
      'Les copropriétaires du dernier étage n’ont plus de droit de veto sur une surélévation, mais un droit de priorité pour acheter.',
      'Des combles qui sont des parties communes s’achètent à la copropriété, là aussi par un vote. S’ils sont déjà privatifs, les relier au logement demande tout de même une autorisation.',
    ],
    sections: [
      {
        title: 'À qui appartient ce qu’il y a au-dessus de chez vous ?',
        paragraphs: [
          'Le règlement de copropriété et l’état descriptif de division le disent. Trois cas se rencontrent.',
        ],
        list: [
          'Les combles sont un lot privatif, ou font partie de votre lot : ils sont à vous.',
          'Les combles sont des parties communes : ils appartiennent à tous, même si vous êtes le seul à pouvoir y accéder.',
          'Le toit et le volume au-dessus : ce sont des parties communes, et le droit d’y construire en est l’accessoire.',
        ],
      },
      {
        title: 'Qui a le droit de surélever l’immeuble ?',
        paragraphs: [
          'Le syndicat des copropriétaires. La Cour de cassation l’a rappelé dans un arrêt du 2 avril 2026 : le droit de surélever n’appartient pas au copropriétaire du dernier étage, mais au syndicat, sauf stipulation contraire du règlement. Le propriétaire du dernier étage n’a aucune prérogative particulière sur le volume situé au-dessus de son plafond.',
          'Certains règlements attribuent expressément ce droit à un lot. C’est rare, précieux, et cela se vérifie mot pour mot. Le silence du règlement ne profite jamais au copropriétaire.',
        ],
      },
      {
        title: 'Comment obtenir le droit de surélever ?',
        paragraphs: [
          'En l’achetant à la copropriété. La décision de céder le droit de surélever se vote en assemblée générale, à une majorité renforcée : la loi prévoit selon les cas la double majorité de l’article 26 ou la majorité de l’article 25. Le prix payé est réparti entre les copropriétaires en proportion de leurs tantièmes. Il sert souvent à financer des travaux dans l’immeuble, ce qui est un bon argument pour convaincre.',
          'Même titulaire du droit, vous devrez obtenir les autorisations d’urbanisme, respecter les hauteurs permises par le plan local d’urbanisme et faire étudier la structure de l’immeuble.',
        ],
      },
      {
        title: 'Et si c’est la copropriété qui veut surélever ?',
        paragraphs: [
          'C’est le risque inverse, à connaître quand on achète un dernier étage. Depuis la loi Alur de 2014, les copropriétaires du dernier étage ne peuvent plus bloquer une surélévation. Ils disposent en échange d’un droit de priorité : avant toute vente des lots créés, le syndic leur notifie le prix et les conditions, et ils peuvent acheter en premier.',
          'Cherchez dans les procès-verbaux d’assemblée générale si un tel projet a déjà été discuté.',
        ],
      },
      {
        title: 'Comment racheter des combles ?',
        paragraphs: [
          'Si les combles sont des parties communes, il faut les acheter à la copropriété : proposition de prix, vote en assemblée générale à la majorité de l’article 26, puis acte notarié et modification du règlement et des tantièmes, à vos frais. Vous n’avez aucune priorité légale du seul fait d’habiter dessous : c’est à vous de convaincre.',
          'Si les combles sont déjà privatifs et vous appartiennent, les relier à votre logement touche le plancher, donc une partie commune : l’assemblée générale doit l’autoriser, à la majorité de l’article 25.',
          'Dans les deux cas, la surface gagnée ne compte que là où la hauteur atteint 1,80 m, et une fenêtre de toit se déclare en mairie.',
        ],
      },
      {
        title: 'Que vérifier avant d’acheter « avec potentiel » ?',
        list: [
          'Le règlement de copropriété : statut des combles, du toit et du droit de surélever.',
          'Les procès-verbaux : une demande a-t-elle déjà été faite, acceptée ou refusée ?',
          'Le plan local d’urbanisme : la hauteur maximale laisse-t-elle de la place ?',
          'La hauteur réelle sous les combles, et l’état de la charpente.',
          'Le prix : un potentiel que vous ne possédez pas ne se paie pas comme une surface acquise.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, si vous achetez pour le potentiel',
      items: [
        'Je sais à qui appartiennent les combles, le toit et le droit de surélever.',
        'J’ai lu les procès-verbaux sur ces sujets.',
        'J’ai vérifié les hauteurs permises par l’urbanisme.',
        'J’ai fait visiter les combles par un architecte.',
        'Je n’ai pas payé un potentiel qui dépend d’un vote.',
      ],
    },
    faq: [
      {
        q: 'Le propriétaire du dernier étage a-t-il le droit de surélever ?',
        a: 'Non, sauf si le règlement de copropriété le lui attribue expressément. Ce droit appartient au syndicat des copropriétaires, qui peut le lui céder par un vote.',
      },
      {
        q: 'Suis-je prioritaire pour acheter les combles au-dessus de chez moi ?',
        a: 'Non. S’ils sont des parties communes, leur vente se décide en assemblée générale et vous devez convaincre les autres copropriétaires. La priorité légale ne concerne que les lots créés par une surélévation.',
      },
      {
        q: 'La copropriété peut-elle construire un étage au-dessus de mon appartement ?',
        a: 'Oui, si l’assemblée générale le vote et que l’urbanisme le permet. Vous ne pouvez plus vous y opposer seul, mais vous avez un droit de priorité pour acheter les lots créés.',
      },
    ],
    sources: [
      { label: 'Kohen Avocats, « Surélévation en copropriété : à qui appartient le droit de surélever »', url: 'https://kohenavocats.fr/?p=2145500' },
      { label: 'Institut national de la consommation, « Copropriété : les conditions pour surélever l’immeuble »', url: 'https://www.inc-conso.fr/content/copropriete-les-conditions-pour-surelever-limmeuble' },
      { label: 'Mon Immeuble, « Surélévation en copropriété »', url: 'https://monimmeuble.com/?p=106844' },
      { label: 'Notaires du Grand Paris, fiche sur les majorités en copropriété', url: 'https://notairesdugrandparis.fr/fr/print/pdf/node/187810' },
      { label: 'Crédit Agricole, « Copropriété : comment faire pour surélever l’immeuble ? »', url: 'https://e-immobilier.credit-agricole.fr/conseils/reglementation/copropriete-comment-faire-pour-surelever-limmeuble' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'meuble-touristique-paris-regles',
    art: 'meuble',
    title: 'Louer en meublé touristique à Paris : ce qui est permis, ce qui ne l’est pas',
    description:
      'Compter sur la location de courte durée pour financer un achat à Paris est risqué. Résidence principale, 90 jours, numéro d’enregistrement, changement d’usage : les règles en 2026.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Un loft bien placé, un atelier avec terrasse : l’idée vient vite de le louer aux touristes quand on n’y est pas, ou d’acheter un pied-à-terre qui se paierait ainsi. À Paris, c’est l’un des régimes les plus stricts de France. Avant d’intégrer ces revenus dans votre plan de financement, voici ce que les règles permettent réellement.',
    takeaways: [
      'Votre résidence principale peut être louée en meublé touristique, dans la limite de 90 jours par an à Paris.',
      'Tout meublé de tourisme doit être déclaré, et son numéro d’enregistrement figurer sur chaque annonce.',
      'Un logement qui n’est pas votre résidence principale ne peut être loué aux touristes qu’avec une autorisation de changement d’usage, assortie d’une compensation. C’est en pratique très difficile à obtenir pour un particulier.',
      'Les amendes vont jusqu’à 100 000 euros pour une location sans autorisation.',
      'Le règlement de copropriété peut, en plus, interdire ce type de location.',
    ],
    sections: [
      {
        title: 'Peut-on louer sa résidence principale ?',
        paragraphs: [
          'Oui, sans autorisation de changement d’usage, mais avec deux conditions. La première : une déclaration préalable, qui donne un numéro d’enregistrement à afficher sur chaque annonce. Depuis le 20 mai 2026, cette déclaration passe par un téléservice national. La seconde : un plafond. À Paris, la Ville indique que la résidence principale peut être louée jusqu’à 90 jours par an au maximum.',
          'La résidence principale, au sens de ces règles, est le logement que vous occupez au moins huit mois par an. Un pied-à-terre n’en est pas une.',
        ],
      },
      {
        title: 'Et un logement qui n’est pas la résidence principale ?',
        paragraphs: [
          'C’est un autre régime. Le louer à des touristes, même une seule nuit, suppose une autorisation de changement d’usage, parce que le logement cesse d’être de l’habitation. À Paris, cette autorisation est subordonnée à une compensation : il faut transformer en logement une surface équivalente qui ne l’était pas, ou en acheter le droit.',
          'Autrement dit, acheter un appartement parisien pour le louer à la nuitée n’est pas un projet réaliste pour la plupart des particuliers. Le meublé de longue durée, lui, où le locataire fait du logement sa résidence principale, ne demande ni changement d’usage, ni compensation, ni numéro d’enregistrement.',
        ],
      },
      {
        title: 'Que risque-t-on ?',
        paragraphs: [
          'Les contrôles sont nombreux et les amendes élevées. D’après un guide professionnel publié en 2026, les sanctions sont les suivantes :',
        ],
        list: [
          'Défaut d’enregistrement : jusqu’à 10 000 euros.',
          'Fausse déclaration ou faux numéro : jusqu’à 20 000 euros.',
          'Dépassement du plafond de 90 jours : jusqu’à 15 000 euros.',
          'Location sans autorisation de changement d’usage : jusqu’à 100 000 euros.',
        ],
      },
      {
        title: 'La copropriété a-t-elle son mot à dire ?',
        paragraphs: [
          'Oui. Indépendamment des règles de la Ville, le règlement de copropriété peut réserver l’immeuble à l’habitation et rendre la location touristique incompatible avec sa destination. Les tribunaux ont longtemps jugé cette activité contraire aux clauses d’habitation bourgeoise ; la jurisprudence évolue, et le règlement de votre immeuble reste la référence.',
          'Lisez-le avant d’acheter, et cherchez dans les procès-verbaux d’assemblée générale toute décision ou tout litige sur ce sujet.',
        ],
      },
      {
        title: 'Ce que cela change pour votre achat',
        list: [
          'Ne comptez pas de revenus de location touristique dans votre plan de financement, sauf pour quelques semaines par an dans votre résidence principale.',
          'Si le vendeur met en avant une rentabilité « Airbnb », demandez le numéro d’enregistrement et, hors résidence principale, l’autorisation de changement d’usage.',
          'Vérifiez le règlement de copropriété.',
          'Ces règles changent souvent : consultez la page de la Ville de Paris au moment de votre achat.',
        ],
      },
    ],
    faq: [
      {
        q: 'Combien de jours par an peut-on louer sa résidence principale à Paris ?',
        a: 'Jusqu’à 90 jours par an, après déclaration et avec un numéro d’enregistrement affiché sur l’annonce.',
      },
      {
        q: 'Peut-on louer une résidence secondaire sur une plateforme à Paris ?',
        a: 'Seulement avec une autorisation de changement d’usage assortie d’une compensation. Sans elle, l’amende peut atteindre 100 000 euros.',
      },
      {
        q: 'Le numéro d’enregistrement est-il obligatoire ?',
        a: 'Oui, pour tout meublé de tourisme, résidence principale comprise. Il doit figurer sur chaque annonce.',
      },
      {
        q: 'La copropriété peut-elle interdire la location touristique ?',
        a: 'Le règlement de copropriété peut la rendre incompatible avec la destination de l’immeuble. Vérifiez sa rédaction avant d’acheter.',
      },
    ],
    sources: [
      { label: 'Kohen Avocats, « Meublé de tourisme à Paris en 2026 : 90 jours, changement d’usage avec compensation et amendes »', url: 'https://kohenavocats.fr/2026/10/04/meuble-tourisme-paris-90-jours-changement-usage-compensation-amende-2026/' },
      { label: 'Kohen Avocats, « Changement d’usage Airbnb à Paris : autorisation, compensation, amende et recours en 2026 »', url: 'https://kohenavocats.fr/2026/06/12/changement-usage-airbnb-paris-autorisation-compensation-amende-recours-2026/' },
      { label: 'Home Select, « Réglementation des locations touristiques à Paris en 2026 »', url: 'https://homeselect.paris/blog/reglementation-locations-touristiques-paris-2026/' },
      { label: 'Coolok, « Déclaration de meublé de tourisme : le numéro d’enregistrement pas à pas »', url: 'https://www.coolok.co/blog/declaration-meuble-de-tourisme' },
      { label: 'Actu-Juridique, « Nature commerciale de l’activité d’Airbnb en copropriété »', url: 'https://www.actu-juridique.fr/civil/immobilier/nature-commerciale-de-lactivite-dairbnb-en-copropriete-un-revirement-de-jurisprudence/' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'travailler-chez-soi-usage-mixte',
    art: 'bureau',
    title: 'Vivre et travailler au même endroit : ce que permet votre logement',
    description:
      'Atelier, cabinet, studio photo chez soi : le loft s’y prête. Règlement de copropriété, clause d’habitation bourgeoise, changement d’usage : ce qu’il faut vérifier avant d’acheter.',
    category: 'Copropriété',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Un grand volume, une belle lumière, une entrée indépendante : beaucoup d’acheteurs de lofts et d’ateliers veulent y travailler autant qu’y vivre. Architecte, photographe, thérapeute, artisan d’art. La loi le permet largement. Mais deux textes peuvent s’y opposer : le règlement de votre copropriété, et dans les grandes villes les règles sur l’usage des logements.',
    takeaways: [
      'On peut exercer une activité chez soi dès lors que ni le règlement de copropriété, ni le bail, ni la loi ne s’y opposent.',
      'Tout se joue dans une clause du règlement : « habitation bourgeoise » simple, qui tolère les professions libérales, ou « exclusivement bourgeoise », qui interdit toute activité.',
      'Dans les grandes villes, travailler chez soi peut constituer un changement d’usage soumis à autorisation. Une tolérance existe en étage quand on ne reçoit ni clients ni marchandises.',
      'Recevoir du public, employer du monde ou poser une plaque change la donne : demandez l’accord de la copropriété avant.',
    ],
    sections: [
      {
        title: 'A-t-on le droit de travailler chez soi ?',
        paragraphs: [
          'Oui, en principe. Service-Public le rappelle : il faut vérifier que le règlement de copropriété, ou le bail si l’on est locataire, autorise l’exercice d’une activité professionnelle. Travailler seul sur un ordinateur, sans visite ni nuisance, ne pose en pratique aucune difficulté.',
          'La question devient sérieuse dès que l’activité se voit : des clients qui montent, des livraisons, du bruit, une plaque sur la porte.',
        ],
      },
      {
        title: 'Que dit le règlement de copropriété ?',
        paragraphs: [
          'Cherchez la clause qui fixe la destination de l’immeuble. Deux formules reviennent.',
        ],
        list: [
          'La clause d’habitation bourgeoise simple : elle interdit les activités commerciales mais permet l’exercice d’une profession libérale.',
          'La clause d’habitation exclusivement bourgeoise : elle interdit toute activité professionnelle, quelle qu’elle soit. Il est possible de demander sa modification, mais c’est un vote difficile à obtenir.',
          'L’immeuble à usage mixte : le règlement admet habitation, bureaux ou ateliers. C’est le cas de nombreux anciens bâtiments d’activité, et c’est un vrai atout si vous comptez y travailler.',
        ],
      },
      {
        title: 'Faut-il une autorisation de la mairie ?',
        paragraphs: [
          'Dans les communes classées en zone tendue, dont Paris, utiliser un logement pour une activité peut être un changement d’usage, soumis à autorisation. L’exercer chez soi n’en constitue pas automatiquement un. Ailleurs, aucune autorisation du maire n’est en principe nécessaire, sauf décision locale.',
          'Service-Public détaille deux tolérances. En étage : aucune autorisation n’est demandée si l’activité s’exerce dans une partie de votre résidence principale, sans recevoir de clientèle ni de marchandises, et sans salarié. Au rez-de-chaussée : vous pouvez recevoir clients et marchandises, à condition que l’activité ne cause ni nuisance ni danger pour le voisinage et ne soit exercée que par les personnes qui habitent le logement. Dès que vous sortez de ces cas, interrogez la mairie avant de vous installer.',
        ],
      },
      {
        title: 'Et pour une plaque, des clients, un salarié ?',
        list: [
          'La plaque professionnelle : attendez l’autorisation de la copropriété avant de la poser à l’entrée de l’immeuble.',
          'L’accueil de clients : vérifiez le règlement, et l’assurance. Votre contrat d’habitation ne couvre pas forcément une activité.',
          'Un salarié ou un associé sur place : la tolérance prévue pour le travail à domicile ne s’applique plus.',
          'Le bruit et les allées et venues : même autorisée, une activité qui gêne les voisins peut être contestée.',
        ],
      },
      {
        title: 'Ce que cela change pour un achat',
        paragraphs: [
          'Si travailler sur place fait partie de votre projet, traitez-le comme un critère d’achat, pas comme un détail à régler ensuite. Un lot désigné « atelier » ou « local professionnel » dans un immeuble mixte vous donnera plus de liberté qu’un bel appartement dans un immeuble strictement bourgeois. À l’inverse, vérifiez qu’un local vendu comme lieu de vie et de travail est bien, aussi, un logement.',
        ],
        list: [
          'Demandez le règlement de copropriété avant l’offre, et lisez la clause de destination.',
          'Posez la question par écrit à l’agence : l’activité envisagée est-elle déjà exercée dans l’immeuble ?',
          'Interrogez la mairie si vous comptez recevoir du public.',
          'Prévenez votre assureur et votre banque de l’usage prévu.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, si vous comptez y travailler',
      items: [
        'J’ai lu la clause de destination du règlement de copropriété.',
        'Je sais si mon activité est libérale, commerciale ou artisanale.',
        'Je sais si je recevrai des clients ou des marchandises.',
        'J’ai interrogé la mairie sur le changement d’usage si nécessaire.',
        'Mon assurance couvre l’activité.',
      ],
    },
    faq: [
      {
        q: 'Peut-on exercer une profession libérale dans son appartement ?',
        a: 'Oui si le règlement de copropriété ne l’interdit pas. Une clause d’habitation bourgeoise simple le permet ; une clause d’habitation exclusivement bourgeoise l’interdit.',
      },
      {
        q: 'Qu’est-ce qu’une clause d’habitation bourgeoise ?',
        a: 'Une clause du règlement de copropriété qui réserve l’immeuble à l’habitation. Dans sa version simple, elle tolère les professions libérales. Dans sa version exclusive, elle interdit toute activité professionnelle.',
      },
      {
        q: 'Faut-il une autorisation pour recevoir des clients chez soi ?',
        a: 'Dans les grandes villes, recevoir de la clientèle dans un logement en étage peut constituer un changement d’usage soumis à autorisation de la mairie. Vérifiez aussi le règlement de copropriété.',
      },
      {
        q: 'Peut-on domicilier son entreprise chez soi ?',
        a: 'La domiciliation, c’est-à-dire l’adresse du siège, est une question distincte de l’exercice de l’activité. Elle est en général plus largement admise, mais le règlement de copropriété ou le bail peuvent l’encadrer.',
      },
    ],
    sources: [
      { label: 'Service-Public, « Exercice d’une activité professionnelle à domicile »', url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F39670' },
      { label: 'Justice.fr, « Peut-on transformer un logement en local professionnel ? »', url: 'https://www.justice.fr/fiche/on-transformer-logement-local-professionnel' },
      { label: 'Congrès des notaires, « Le télétravail dans son logement »', url: 'https://www.rapport-congresdesnotaires.fr/2023-rapport-du-119e-congres/le-teletravail-dans-son-logement' },
      { label: 'Propulse by CA, « Activité professionnelle à domicile : conditions pour exercer »', url: 'https://propulsebyca.fr/local-commercial/activite-domicile/conditions' },
      { label: 'SeLoger, « Qu’est-ce que la clause d’habitation bourgeoise dans une copropriété ? »', url: 'https://edito.seloger.com/conseils-d-experts/copropriete/location-qu-est-ce-que-la-clause-d-habitation-bourgeoise-dans-une-copropriete-article-5032.html' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'amiante-plomb-anciens-ateliers',
    art: 'amiante',
    title: 'Amiante et plomb : ce que cachent parfois les anciens ateliers',
    description:
      'Lofts, ateliers, anciennes usines : des bâtiments où l’amiante et le plomb sont fréquents. Quels diagnostics exiger, comment les lire, et que prévoir avant des travaux.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Les bâtiments d’activité du siècle dernier ont été construits avec les matériaux de leur époque : peintures au plomb, plaques de fibrociment, dalles de sol et isolants contenant de l’amiante. Transformés en logements, ils en gardent parfois des traces. Ce n’est pas une raison de renoncer. C’est une raison de lire deux diagnostics avec attention, surtout si vous comptez faire des travaux.',
    takeaways: [
      'Deux diagnostics sont obligatoires selon l’âge du bien : le constat de risque d’exposition au plomb pour un logement construit avant le 1er janvier 1949, et l’état d’amiante quand le permis de construire date d’avant le 1er juillet 1997.',
      'Ces diagnostics décrivent ce qui est visible et accessible. Ils ne disent pas tout ce qu’un chantier pourra découvrir.',
      'Avant de gros travaux, un repérage d’amiante spécifique est à prévoir : il peut changer le budget et le calendrier.',
      'S’il manque un diagnostic obligatoire, l’acheteur peut demander en justice l’annulation de la vente ou une baisse du prix.',
    ],
    sections: [
      {
        title: 'Quels diagnostics le vendeur doit-il fournir ?',
        paragraphs: [
          'D’après Service-Public, le vendeur d’un logement doit remettre un dossier de diagnostics qui comprend notamment :',
        ],
        list: [
          'Le constat de risque d’exposition au plomb, appelé Crep, si le logement a été construit avant le 1er janvier 1949.',
          'L’état mentionnant la présence ou l’absence d’amiante, si le permis de construire a été délivré avant le 1er juillet 1997.',
          'Le diagnostic de performance énergétique, dans tous les cas, et l’état de l’installation électrique si elle a plus de quinze ans.',
        ],
      },
      {
        title: 'Où trouve-t-on de l’amiante ?',
        paragraphs: [
          'L’amiante est interdit depuis 1997, mais il reste présent dans de nombreux bâtiments : flocages, faux plafonds, dalles de sol, toitures et plaques en fibrociment. Les anciens locaux d’activité en comptent plus souvent que les immeubles d’habitation, parce qu’il servait à isoler et à protéger du feu.',
          'Un matériau amianté en bon état et que l’on ne touche pas ne libère pas de fibres. Le risque apparaît quand il se dégrade, ou quand on le perce, le ponce ou le dépose.',
        ],
      },
      {
        title: 'Et le plomb ?',
        paragraphs: [
          'Le plomb était largement utilisé dans les peintures avant 1949. Le Crep mesure sa concentration dans les revêtements et signale ceux qui sont dégradés. Là encore, une peinture ancienne recouverte et en bon état n’est pas un danger immédiat : le risque vient des écailles et des poussières, notamment pendant des travaux, et il concerne d’abord les jeunes enfants et les femmes enceintes.',
        ],
      },
      {
        title: 'Comment lire les diagnostics ?',
        list: [
          'La date : un état d’amiante établi avant 2013 doit être refait pour une vente. Un Crep qui a relevé du plomb au-delà du seuil n’est valable qu’un an.',
          'Le périmètre : quelles pièces et quels éléments ont été examinés ? Les parties inaccessibles ne sont pas contrôlées.',
          'Les conclusions : présence ou absence, état des matériaux, et recommandations éventuelles de surveillance ou de travaux.',
          'En copropriété : demandez aussi au syndic le repérage d’amiante des parties communes.',
        ],
      },
      {
        title: 'Vous prévoyez des travaux : que change la présence d’amiante ?',
        paragraphs: [
          'Beaucoup. Le diagnostic de vente ne suffit pas pour un chantier : un repérage d’amiante avant travaux, plus poussé, est à faire réaliser. S’il révèle des matériaux amiantés là où vous comptez intervenir, leur retrait doit être confié à une entreprise spécialisée, avec un coût et un délai à part.',
          'Pour un loft à refaire, intégrez donc ce repérage à votre budget dès l’offre, et faites-en si possible une condition de votre engagement. Mieux vaut le découvrir avant de signer qu’au premier coup de masse.',
        ],
      },
      {
        title: 'Et si un diagnostic manque ?',
        paragraphs: [
          'Les diagnostics obligatoires doivent être annexés à la promesse de vente. Si l’un d’eux manque, l’acheteur peut demander au juge l’annulation de la vente ou une diminution du prix. En pratique, le notaire vérifie le dossier : c’est une raison de plus de le lui transmettre tôt.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, côté amiante et plomb',
      items: [
        'J’ai l’année de construction et la date du permis.',
        'J’ai l’état d’amiante et le Crep, et ils sont encore valables.',
        'J’ai lu quelles zones n’ont pas pu être contrôlées.',
        'J’ai demandé le repérage d’amiante des parties communes.',
        'Travaux prévus : j’ai budgété un repérage avant travaux.',
      ],
    },
    faq: [
      {
        q: 'Le diagnostic amiante est-il obligatoire pour vendre un loft ?',
        a: 'Oui si le permis de construire du bâtiment a été délivré avant le 1er juillet 1997. Le vendeur doit fournir un état mentionnant la présence ou l’absence d’amiante.',
      },
      {
        q: 'Quand le diagnostic plomb est-il obligatoire ?',
        a: 'Quand le logement a été construit avant le 1er janvier 1949. Il s’appelle constat de risque d’exposition au plomb, ou Crep.',
      },
      {
        q: 'Peut-on vivre dans un logement qui contient de l’amiante ?',
        a: 'Oui si les matériaux sont en bon état et ne sont pas touchés. Le risque naît de leur dégradation ou de travaux. Le diagnostic précise leur état et ce qu’il faut surveiller.',
      },
      {
        q: 'Le diagnostic de vente suffit-il avant des travaux ?',
        a: 'Non. Un repérage d’amiante avant travaux, plus complet, doit être réalisé sur les zones concernées par le chantier.',
      },
    ],
    sources: [
      { label: 'Service-Public, « Quels sont les diagnostics immobiliers à fournir en cas de vente d’un logement ? »', url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F10798' },
      { label: 'Notaires de France, « Les diagnostics immobiliers : quelles obligations ? »', url: 'https://www.notaires.fr/fr/immobilier-fiscalite/diagnostics-environnement/le-diagnostic-immobilier-quand-comment-qui-paye' },
      { label: 'Construires.fr, « Diagnostics immobiliers obligatoires : liste complète »', url: 'https://www.construires.fr/diagnostics-immobiliers-obligatoires/' },
      { label: 'Orpi, « Diagnostics immobiliers : les obligations du vendeur »', url: 'https://www.orpi.com/patrimoineimmobilier/diagnostics-immobiliers-les-obligations-du-vendeur' },
      { label: 'Crédit Agricole, « Le guide des diagnostics immobiliers »', url: 'https://m.e-immobilier.credit-agricole.fr/system/files/documents/Le%20guide%20des%20diagnostics%20immobiliers.pdf' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'chauffer-un-grand-volume',
    art: 'chauffage',
    title: 'Chauffer un grand volume : pourquoi il fait froid en bas et chaud en haut',
    description:
      'Cinq mètres sous plafond font rêver en visite et réfléchir en janvier. Ce qui se passe dans un grand volume, les solutions qui existent, et les questions à poser avant d’acheter.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 4,
    intro:
      'La hauteur sous plafond est ce que l’on vient chercher dans un loft, un atelier ou une ancienne halle. C’est aussi ce qui change la manière de chauffer. Dans un grand volume, la chaleur ne reste pas là où l’on vit : elle monte. Ce n’est pas une fatalité, mais c’est une donnée à regarder avant d’acheter, factures à l’appui.',
    takeaways: [
      'Dans un local de grande hauteur, l’air chaud, plus léger, s’accumule sous le plafond pendant que l’air froid reste au sol. Les professionnels parlent de stratification.',
      'Résultat : on a froid en bas, et l’on chauffe pour rien le haut du volume.',
      'La parade la plus simple est de brasser l’air pour faire redescendre la chaleur : c’est le rôle d’un brasseur d’air, ou déstratificateur.',
      'Avant d’acheter, demandez les factures d’énergie réelles des deux derniers hivers. Elles en disent plus que n’importe quelle description.',
    ],
    sections: [
      {
        title: 'Que se passe-t-il dans un grand volume ?',
        paragraphs: [
          'L’air chaud est plus léger que l’air froid : il s’élève. Dans une pièce de hauteur courante, l’écart entre le sol et le plafond reste faible. Sous une grande hauteur, il se creuse. Les spécialistes du chauffage des grands bâtiments le décrivent ainsi : une stratification inconfortable, parce que l’on grelotte au sol, et coûteuse, parce que la chaleur se perd sous le toit.',
          'Ces constats viennent du chauffage des locaux professionnels, où le phénomène est étudié à partir de cinq mètres sous plafond. Un loft de quatre mètres n’est pas un hangar, mais la physique est la même, et une mezzanine placée en hauteur en profite quand le séjour, en bas, a froid.',
        ],
      },
      {
        title: 'Quelles solutions existent ?',
        list: [
          'Brasser l’air : un brasseur d’air installé sous le plafond fait redescendre l’air chaud vers le sol et réduit l’écart de température. Certains modèles font un bruit perceptible : écoutez-les avant de choisir.',
          'Chauffer là où l’on vit plutôt que tout le volume : les systèmes qui chauffent par rayonnement, ou par le sol, réchauffent les personnes et les surfaces plus que l’air.',
          'Isoler le haut : c’est sous la toiture ou la verrière que la chaleur s’échappe. Une toiture mal isolée annule tout le reste.',
          'Réguler : un thermostat bien placé, à hauteur de vie et non en hauteur.',
        ],
        paragraphs: [
          'Le bon choix dépend du bâtiment. Faites-le étudier par un professionnel du chauffage avant de vous engager dans des travaux.',
        ],
      },
      {
        title: 'Et en été ?',
        paragraphs: [
          'Le même volume joue alors en votre faveur, si l’air chaud peut s’échapper par le haut : un ouvrant en toiture ou en partie haute de verrière suffit souvent à créer un courant d’air. Sans ouvrant, et sous une toiture peu isolée, la chaleur s’accumule. Regardez donc ce qui s’ouvre, et à quelle hauteur.',
        ],
      },
      {
        title: 'Que demander avant d’acheter ?',
        list: [
          'Les factures d’énergie des deux derniers hivers, et le nombre de personnes qui occupaient le bien.',
          'Le type de chauffage, son âge et son entretien.',
          'L’isolation de la toiture et des vitrages : date et nature des travaux.',
          'Le diagnostic de performance énergétique, en regardant aussi la consommation estimée, pas seulement la lettre.',
          'En copropriété : le chauffage est-il collectif ou individuel, et que permet le règlement ?',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, pour un grand volume',
      items: [
        'J’ai vu les factures d’énergie réelles.',
        'Je sais comment le bien est chauffé, et depuis quand.',
        'Je connais l’état de l’isolation en partie haute.',
        'J’ai repéré les ouvrants hauts pour l’été.',
        'J’ai visité par temps froid, ou j’ai interrogé l’occupant sur l’hiver.',
      ],
    },
    faq: [
      {
        q: 'Pourquoi a-t-on froid dans un loft très haut de plafond ?',
        a: 'Parce que l’air chaud monte et s’accumule sous le plafond, pendant que l’air froid reste au niveau du sol. C’est le phénomène de stratification.',
      },
      {
        q: 'Un ventilateur de plafond sert-il aussi en hiver ?',
        a: 'Oui. En brassant l’air, il fait redescendre la chaleur accumulée en hauteur et réduit l’écart de température entre le sol et le plafond.',
      },
      {
        q: 'Un grand volume coûte-t-il forcément cher à chauffer ?',
        a: 'Pas forcément : tout dépend de l’isolation, du mode de chauffage et du brassage de l’air. Les factures réelles de l’occupant sont le meilleur indicateur.',
      },
    ],
    sources: [
      { label: 'Richardson, fiche technique « Brasseurs d’air, déstratificateurs »', url: 'https://www.richardson.fr/files/richardson/technical_document/d55/377039_23670747.pdf' },
      { label: 'EDF Entreprises, « Pourquoi s’équiper d’un déstratificateur d’air ? »', url: 'https://www.edf.fr/entreprises/le-mag/le-mag-entreprises/conseils-energie-competitivite/pourquoi-s-equiper-d-un-destratificateur-d-air' },
      { label: 'XPair, « Chauffage des locaux de grands volumes : stratification d’air »', url: 'https://conseils.xpair.com/consulter_savoir_faire/chauffage-locaux-grands-volumes/faq-chauffage-stratification-air.htm' },
      { label: 'ATEE, fiche d’économies d’énergie « Déstratificateur ou brasseur d’air »', url: 'https://atee.fr/system/files/2025-06/IND-BA-110%20v69-3%20%C3%A0%20compter%20du%2001-07-2025%20D%C3%A9stratificateur%20ou%20brasseur%20d%E2%80%99air.pdf' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'ouvrir-un-mur-porteur-en-copropriete',
    art: 'mur',
    title: 'Ouvrir les volumes : peut-on toucher à un mur porteur ?',
    description:
      'Faire tomber un mur pour créer un grand séjour est le projet le plus courant, et le plus encadré. Qui autorise, quel dossier présenter, que risque-t-on sans accord ?',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'On visite un appartement cloisonné, et l’on imagine déjà le grand plateau ouvert. Entre l’idée et le résultat, il y a un mot : porteur. Une cloison se retire librement, ou presque. Un mur porteur tient l’immeuble : il ne vous appartient pas, même au milieu de votre salon. Avant d’acheter pour transformer, il faut savoir lequel est lequel, et qui décide.',
    takeaways: [
      'Un mur porteur, même situé dans un appartement, fait partie de la structure de l’immeuble : c’est une partie commune.',
      'Y toucher exige l’autorisation de l’assemblée générale, à la majorité des voix de tous les copropriétaires (article 25 b de la loi du 10 juillet 1965).',
      'Le dossier doit contenir une étude de structure réalisée par un bureau d’études ou un ingénieur, des plans et un devis.',
      'Sans vote, la copropriété peut demander en justice la remise en état, et la vente future du bien peut se bloquer.',
      'Une cloison non porteuse se retire en principe sans autorisation. Encore faut-il être sûr qu’elle ne porte rien.',
    ],
    sections: [
      {
        title: 'Comment savoir si un mur est porteur ?',
        paragraphs: [
          'Ni l’épaisseur ni le son ne suffisent. Dans un immeuble ancien, une cloison a pu devenir porteuse avec le temps, parce que les planchers se sont appuyés dessus. Seul un professionnel peut trancher : architecte, ingénieur structure ou bureau d’études, à partir des plans de l’immeuble et de sondages.',
          'Avant une offre, demandez au moins les plans d’origine et l’avis d’un architecte. C’est une visite de quelques heures qui peut changer tout votre projet.',
        ],
      },
      {
        title: 'Qui autorise l’ouverture d’un mur porteur ?',
        paragraphs: [
          'L’assemblée générale des copropriétaires. Les travaux qui affectent les parties communes doivent être autorisés à la majorité des voix de tous les copropriétaires, présents ou non. Le syndic ne peut pas donner cet accord seul, et l’accord des voisins de palier n’a aucune valeur.',
          'La demande s’adresse au syndic par lettre recommandée, avec le projet de résolution, pour être inscrite à l’ordre du jour. L’assemblée ne se tient en général qu’une fois par an. Il est possible d’en provoquer une à ses frais.',
        ],
      },
      {
        title: 'Que doit contenir le dossier ?',
        list: [
          'Une étude de structure d’un bureau d’études techniques : comment ouvrir, par quoi remplacer le mur, quelles charges reprendre.',
          'Les plans de l’existant et du projet, établis par un architecte.',
          'Le devis de l’entreprise et son attestation d’assurance décennale.',
          'Souvent, à la demande de la copropriété : le suivi du chantier par l’architecte de l’immeuble, à vos frais.',
        ],
        paragraphs: [
          'Une autorisation vague est une source de litige. La résolution votée doit décrire précisément les travaux, avec les documents annexés.',
        ],
      },
      {
        title: 'Et si l’assemblée refuse ?',
        paragraphs: [
          'Un refus doit avoir une raison sérieuse : le risque pour la structure, par exemple. Vous pouvez représenter un dossier complété. Si le refus est injustifié, la loi permet de demander au tribunal judiciaire d’autoriser des travaux d’amélioration. C’est long, et jamais gagné d’avance.',
        ],
      },
      {
        title: 'Que risque-t-on à ouvrir sans autorisation ?',
        paragraphs: [
          'D’abord un risque physique : affaiblir l’immeuble, fissurer les étages voisins. Ensuite un risque juridique : le syndicat des copropriétaires peut agir en justice pour obtenir la remise en état, à vos frais. Enfin un risque à la revente : le notaire et l’acheteur demandent le procès-verbal de l’assemblée et les plans validés. Sans eux, la vente peut se bloquer ou se négocier à la baisse.',
          'Votre assurance, elle aussi, peut refuser de couvrir des dommages nés de travaux non autorisés.',
        ],
      },
      {
        title: 'Vous achetez un bien déjà ouvert : que demander ?',
        list: [
          'Le procès-verbal de l’assemblée générale qui a autorisé l’ouverture.',
          'L’étude de structure et les plans.',
          'La facture de l’entreprise et son attestation décennale : la garantie court dix ans et vous est transmise.',
          'En l’absence de ces documents : l’avis écrit d’un ingénieur structure avant de signer.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, si vous voulez ouvrir les volumes',
      items: [
        'Un professionnel m’a dit quels murs sont porteurs.',
        'J’ai lu le règlement de copropriété sur les travaux privatifs.',
        'Je sais quand se tient la prochaine assemblée générale.',
        'Bien déjà ouvert : j’ai le vote, l’étude et les factures.',
        'Mon budget inclut l’étude de structure et le suivi du chantier.',
      ],
    },
    faq: [
      {
        q: 'Peut-on abattre un mur porteur dans son appartement ?',
        a: 'Oui, avec l’autorisation de l’assemblée générale des copropriétaires et une étude de structure. Le mur porteur est une partie commune, même à l’intérieur d’un logement.',
      },
      {
        q: 'Quelle majorité faut-il en assemblée générale ?',
        a: 'La majorité des voix de tous les copropriétaires, dite majorité de l’article 25.',
      },
      {
        q: 'Faut-il une autorisation pour abattre une simple cloison ?',
        a: 'En principe non, si elle n’est pas porteuse et que le règlement de copropriété ne prévoit rien de particulier. Faites tout de même vérifier qu’elle ne porte rien.',
      },
      {
        q: 'L’ancien propriétaire a ouvert un mur sans autorisation : que faire ?',
        a: 'Demandez-lui de faire régulariser les travaux par l’assemblée générale avant la vente, ou faites vérifier la structure par un ingénieur et décrire la situation dans la promesse.',
      },
    ],
    sources: [
      { label: 'Novlaw Avocats, « Comment procéder à l’ouverture d’un mur porteur en copropriété ? »', url: 'https://novlaw.fr/comment-proceder-a-l-ouverture-d-un-mur-porteur-en-copropriete/' },
      { label: 'Me Simonnet, « Mur porteur et copropriété »', url: 'https://www.simonnetavocat.fr/mur-porteur-et-copropriete/' },
      { label: 'ARC, « Les modalités juridiques de travaux privatifs affectant les parties communes »', url: 'https://arc-copro.fr/sites/default/files/pieces-jointes/2025/09/Les%20modalit%C3%A9s%20juridiques%20de%20travaux%20privatifs%20affectant%20les%20parties%20communes.pdf' },
      { label: 'PAP, « Copropriété : ces travaux que vous ne pouvez pas faire sans autorisation »', url: 'https://www.pap.fr/patrimoine/copropriete/copropriete-ces-travaux-que-vous-ne-pouvez-pas-faire-sans-autorisation/a28132' },
      { label: 'Village de la Justice, « Refus de travaux privatifs en copropriété : les solutions »', url: 'https://www.village-justice.com/articles/refus-travaux-privatifs-copropriete-les-solutions-pour-parvenir-leur,49142.html' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'creer-une-mezzanine-autorisations',
    art: 'plateforme',
    title: 'Créer une mezzanine : quelles autorisations, quelle surface gagnée ?',
    description:
      'Une belle hauteur sous plafond donne envie d’ajouter un niveau. Mairie, copropriété, seuils de surface, hauteur de 1,80 m : les règles à connaître avant d’acheter pour transformer.',
    category: 'Surfaces et travaux',
    published: '2026-11-19',
    updated: '2026-11-19',
    readMinutes: 5,
    intro:
      'Quatre mètres sous plafond, et l’on voit déjà la chambre en mezzanine. C’est souvent ce projet qui justifie le prix d’un loft ou d’un atelier. Mais une mezzanine n’est pas un meuble : c’est de la surface créée. À ce titre, elle se déclare à la mairie, et en copropriété elle se vote. Mieux vaut le savoir avant d’acheter un volume « à aménager ».',
    takeaways: [
      'Côté mairie, tout dépend de la surface de plancher créée : rien à déclarer jusqu’à 5 m², déclaration préalable au-delà, permis de construire à partir de 20 m², ou de 40 m² dans les zones urbaines couvertes par un plan local d’urbanisme.',
      'Seule la partie située sous au moins 1,80 m de hauteur compte comme surface de plancher.',
      'En copropriété, créer une surface nouvelle demande l’accord de l’assemblée générale, surtout si la mezzanine s’ancre dans des murs porteurs, qui sont des parties communes.',
      'Une mezzanine posée sans autorisation suit le bien à la revente : c’est l’acheteur suivant, ou vous, qui en répondez.',
    ],
    sections: [
      {
        title: 'Faut-il une autorisation de la mairie ?',
        paragraphs: [
          'Oui, au-delà d’un petit seuil. D’après la fiche de Service-Public reprise par Justice.fr :',
        ],
        list: [
          'Jusqu’à 5 m² de surface de plancher créée : aucune formalité.',
          'Au-dessus de 5 m² : une déclaration préalable de travaux, à déposer en mairie.',
          'À partir de 20 m², ou de 40 m² dans une zone urbaine couverte par un plan local d’urbanisme : un permis de construire.',
          'Si la surface totale du logement dépasse 150 m² après travaux, le recours à un architecte est obligatoire pour le permis.',
        ],
      },
      {
        title: 'Comment compte-t-on la surface créée ?',
        paragraphs: [
          'On ne compte que la partie de la mezzanine où la hauteur sous plafond atteint au moins 1,80 m. Une mezzanine de 20 m² dont 5 m² sont sous une pente à 1,50 m ne crée que 15 m² de surface de plancher.',
          'Attention au revers : ce qui est trop bas pour être déclaré est aussi trop bas pour être vendu comme de la surface. Une mezzanine où l’on ne tient pas debout est un couchage, pas une pièce.',
          'Autre point à vérifier : la hauteur qui reste dessous. Un niveau ajouté dans 3,50 m laisse peu de place aux deux étages. Faites dessiner la coupe avant de rêver.',
        ],
      },
      {
        title: 'Et la copropriété ?',
        paragraphs: [
          'Deux raisons de passer par l’assemblée générale. La première : le droit de construire appartient à l’ensemble des copropriétaires, et créer de la surface peut conduire à modifier le règlement de copropriété et la répartition des charges. La seconde : une mezzanine qui s’appuie sur des murs porteurs ou sur les planchers touche à la structure de l’immeuble, donc aux parties communes.',
          'En pratique, on présente un dossier : plans, note d’un bureau d’études sur les charges reprises par la structure, devis. Une mezzanine indépendante, posée sur ses propres poteaux et démontable, est plus simple à faire accepter, mais lisez votre règlement avant de vous en dispenser.',
        ],
      },
      {
        title: 'Y a-t-il des taxes ?',
        paragraphs: [
          'Oui. La taxe d’aménagement s’applique dès que l’on crée une surface de plancher close, couverte et d’au moins 1,80 m de hauteur, y compris à l’intérieur d’un volume existant. La surface créée est aussi à déclarer aux impôts, ce qui peut faire évoluer la taxe foncière.',
        ],
      },
      {
        title: 'Vous achetez un bien avec une mezzanine déjà faite : que demander ?',
        list: [
          'L’autorisation d’urbanisme, si la mezzanine crée plus de 5 m² de surface de plancher.',
          'Le procès-verbal de l’assemblée générale qui l’a autorisée.',
          'Le mesurage officiel du bien : la mezzanine y figure-t-elle, et pour quelle surface ?',
          'La note de calcul ou la facture de l’entreprise : une mezzanine supporte du poids, elle doit avoir été dimensionnée.',
        ],
        paragraphs: [
          'S’il manque quelque chose, demandez au vendeur de régulariser avant la vente ou faites décrire la situation dans la promesse. Notre article sur les travaux non déclarés détaille les risques.',
        ],
      },
    ],
    checklist: {
      title: 'Avant de signer, côté mezzanine',
      items: [
        'Mezzanine existante : j’ai l’autorisation de la mairie et le vote de la copropriété.',
        'Je sais quelle surface elle représente dans le mesurage officiel.',
        'Mezzanine à créer : j’ai fait dessiner une coupe avec les hauteurs réelles.',
        'J’ai lu ce que le règlement de copropriété permet.',
        'Je sais sur quoi elle s’appuie, et un professionnel l’a vérifié.',
      ],
    },
    faq: [
      {
        q: 'Faut-il un permis de construire pour une mezzanine ?',
        a: 'Seulement à partir de 20 m² de surface de plancher créée, ou de 40 m² en zone urbaine couverte par un plan local d’urbanisme. Entre 5 m² et ce seuil, une déclaration préalable suffit. Jusqu’à 5 m², aucune formalité.',
      },
      {
        q: 'Une mezzanine compte-t-elle dans la surface du logement ?',
        a: 'Uniquement pour sa partie située sous au moins 1,80 m de hauteur. Le reste n’est pas de la surface de plancher.',
      },
      {
        q: 'Faut-il l’accord de la copropriété ?',
        a: 'Oui dès que la mezzanine crée de la surface ou s’ancre dans la structure de l’immeuble. L’assemblée générale doit l’autoriser.',
      },
      {
        q: 'Que risque-t-on avec une mezzanine non déclarée ?',
        a: 'La mairie peut exiger une mise en conformité et la copropriété une remise en état. À la revente, le notaire et l’acheteur demanderont les autorisations.',
      },
    ],
    sources: [
      { label: 'Justice.fr (Service-Public), « Faut-il une autorisation d’urbanisme pour construire une mezzanine ou un étage supplémentaire ? »', url: 'https://www.justice.fr/fiche/faut-autorisation-urbanisme-construire-mezzanine-etage-supplementaire' },
      { label: 'Construires.fr, « Créer une mezzanine : permis de construire ou déclaration préalable ? »', url: 'https://www.construires.fr/creer-mezzanine-permis-declaration/' },
      { label: 'Juritravail, « Construire une mezzanine dans son appartement »', url: 'https://www.juritravail.com/Actualite/construire-une-mezzanine-dans-son-appartement/Id/377185' },
      { label: 'Village de la Justice, « Refus de travaux privatifs en copropriété : les solutions »', url: 'https://www.village-justice.com/articles/refus-travaux-privatifs-copropriete-les-solutions-pour-parvenir-leur,49142.html' },
      { label: 'SeLoger, « Agrandissement facile : petit guide de la mezzanine »', url: 'https://edito.seloger.com/node/21266' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'verriere-ce-qu-il-faut-verifier',
    art: 'verriere',
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
    art: 'monument',
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
    art: 'eglise',
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
    art: 'hotel',
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
    art: 'dernieretage',
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
    art: 'architecte',
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
    art: 'atelier',
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
    art: 'cheminee',
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
    art: 'clim',
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
        title: 'Les charges ont-elles été revues ?',
        paragraphs: [
          'Les charges d’un lot ont été calculées pour son usage d’origine. Quand un local devient un logement, la copropriété peut revoir leur répartition, par un vote en assemblée générale.',
          'Demandez si cette révision a eu lieu, ou si elle est à l’ordre du jour d’une prochaine assemblée. Dans le second cas, les charges annoncées par le vendeur peuvent changer après votre achat.',
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
      {
        title: 'Et si le DPE se révèle faux après l’achat ?',
        paragraphs: [
          'Depuis le 1er juillet 2021, le DPE est opposable : l’acheteur peut se prévaloir de son contenu, comme pour les autres diagnostics. Seules les recommandations de travaux gardent une valeur indicative.',
          'Si un nouveau diagnostic montre une étiquette nettement moins bonne que celle annoncée, la responsabilité du vendeur ou du diagnostiqueur peut être recherchée. L’issue dépend de chaque dossier.',
          'Conservez l’annonce, le DPE remis à la vente et vos échanges écrits, faites réaliser un nouveau DPE par un autre diagnostiqueur, puis consultez un avocat ou votre notaire avant toute démarche.',
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
        title: 'Et pour un local à transformer ou un bien où l’on travaille ?',
        paragraphs: [
          'Tant que le changement de destination n’est pas obtenu, vous achetez un local d’activité, pas un logement. Certaines banques attendent l’autorisation d’urbanisme, ou au moins son dépôt, avant de s’engager. La promesse de vente peut prévoir l’obtention de cette autorisation comme condition suspensive, en plus de la condition de prêt.',
          'Si vous comptez vivre et travailler dans le bien, dites-le à la banque dès le départ : la part professionnelle peut être financée séparément, et le règlement de copropriété doit admettre les deux usages.',
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
  {
    slug: 'vivre-dans-un-avion-de-ligne',
    art: 'avion',
    title: 'Il a posé un avion de ligne dans les bois, et il y vit',
    description:
      'En Oregon, un ingénieur à la retraite habite un Boeing 727 installé sur son terrain. Ce que la presse en a raconté, ce que cela coûte, et ce que la règle dirait en France.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Quand on veut habiter autrement, il y a le loft, la péniche, l’atelier. Et puis il y a Bruce Campbell, ingénieur électricien à la retraite, qui a choisi un Boeing 727. L’avion est posé au milieu des arbres, près de Portland, dans l’Oregon. Plusieurs médias américains l’ont visité.',
    takeaways: [
      'L’avion a été acheté à une entreprise de récupération pour 100 000 dollars, selon le Smithsonian Magazine.',
      'Son transport et son installation ont coûté environ 120 000 dollars de plus.',
      'À l’intérieur : un futon, un bureau, un lavabo, des toilettes, et un sol transparent qui laisse voir la structure.',
      'En France, poser un fuselage sur un terrain ne dispense d’aucune règle d’urbanisme.',
    ],
    sections: [
      {
        title: 'Comment un avion arrive-t-il dans une forêt ?',
        paragraphs: [
          'Le Smithsonian Magazine raconte que le projet remonte à la fin des années 1990. L’appareil, retiré du service, a été acheté 100 000 dollars à un ferrailleur. Il a fallu ensuite le transporter jusqu’à un terrain boisé d’environ quatre hectares, à Hillsboro : une opération qui a coûté à peu près 120 000 dollars, soit davantage que l’avion lui-même.',
          'Le total approche donc 220 000 dollars, sans compter des années de travaux.',
        ],
      },
      {
        title: 'À quoi ressemble la vie à bord ?',
        paragraphs: [
          'Les sièges des passagers ont été retirés. Le reportage photo de CBS News, publié en 2014, montre un futon, un poste de travail avec un ordinateur, un lavabo et des toilettes en état de marche. Le plancher d’origine a été remplacé par des panneaux transparents, qui laissent voir les entrailles de l’appareil.',
          'Le résultat ne cherche pas à ressembler à une maison. Il reste un avion, habité.',
        ],
      },
      {
        title: 'Pourquoi un avion plutôt qu’une maison ?',
        paragraphs: [
          'Deux raisons reviennent dans les articles : une passion ancienne pour l’aéronautique, et l’idée qu’il est absurde d’envoyer à la casse des appareils encore solides. Leur carlingue ferait, à ses yeux, un abri plus durable qu’on ne le croit, rapporte le Smithsonian Magazine.',
          'Le Smithsonian Magazine rapporte aussi les limites du projet : des retards, un chantier jamais tout à fait terminé, et l’envie d’en lancer un second ailleurs.',
        ],
      },
      {
        title: 'Et en France, pourrait-on le faire ?',
        paragraphs: [
          'Un avion posé sur un terrain pour y habiter est, aux yeux de l’urbanisme, une construction. Il faut donc un terrain où l’habitation est autorisée et une autorisation de la mairie, comme pour une maison. En règle générale, un terrain agricole ou naturel ne s’y prête pas.',
          'Avant tout projet de ce genre, demandez un certificat d’urbanisme : il vous dit par écrit ce qui est possible sur la parcelle. Restent le raccordement à l’eau et à l’électricité, l’assainissement, et l’assurance, qu’il faudra convaincre.',
          'Le plus proche de cet esprit, parmi les biens qui se vendent réellement : les lieux qui ont eu une autre vie avant de devenir des logements.',
        ],
      },
    ],
    faq: [
      { q: 'Combien coûte un avion de ligne réformé ?', a: 'Celui de cette histoire a été acheté 100 000 dollars à un ferrailleur, selon le Smithsonian Magazine. Son transport et son installation ont coûté environ 120 000 dollars de plus.' },
      { q: 'Peut-on habiter un avion en France ?', a: 'Rien ne l’interdit par principe, mais c’est une construction comme une autre : il faut un terrain constructible et une autorisation d’urbanisme. Commencez par demander un certificat d’urbanisme à la mairie.' },
    ],
    sources: [
      { label: 'Smithsonian Magazine, « Looking for a New Place to Live? This Man Chose an Airplane »', url: 'https://www.smithsonianmag.com/arts-culture/looking-new-place-live-man-chose-airplane-180951889/' },
      { label: 'CBS News, « Portland man lives in a Boeing 727 », 10 juin 2014', url: 'https://www.cbsnews.com/pictures/portland-man-lives-in-a-boeing-727' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'coober-pedy-la-ville-ou-l-on-vit-sous-terre',
    art: 'souterrain',
    title: 'Coober Pedy, la ville où l’on habite sous terre',
    description:
      'Dans le désert australien, une ville minière vit en grande partie dans des maisons creusées dans la roche. Pourquoi, comment, à quel prix, et ce qu’il en est des troglodytes en France.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'À Coober Pedy, dans le sud de l’Australie, on ne monte pas chez soi : on y descend. Cette ville d’environ 2 500 habitants, née de la découverte de l’opale en 1915, vit pour une bonne part dans la roche. La presse y retourne régulièrement, à chaque vague de chaleur.',
    takeaways: [
      'Environ 60 % des habitants vivent dans des logements creusés, selon Slate et The Week.',
      'Dehors, l’été dépasse 50 °C. Sous terre, la température reste autour de 23 °C toute l’année.',
      'Les maisons sont enterrées à quatre mètres au moins, pour que le plafond tienne.',
      'En France, l’habitat troglodytique existe, mais un logement doit recevoir la lumière du jour.',
    ],
    sections: [
      {
        title: 'Pourquoi vivre sous terre ?',
        paragraphs: [
          'Pour la température. Slate, qui s’appuie sur un reportage de la BBC, donne les chiffres : jusqu’à 52 °C dehors en été, deux ou trois degrés en hiver, et environ 23 °C sous terre en toute saison. La roche fait ce qu’une climatisation ferait ailleurs, sans rien consommer.',
          'Les premiers mineurs logeaient sur place, dans les galeries. L’habitude est restée.',
        ],
      },
      {
        title: 'Comment creuse-t-on une maison ?',
        paragraphs: [
          'Dans le grès, d’abord à la pioche et à la pelle, raconte The Week. Les logements sont installés à quatre mètres de profondeur au minimum. En surface, il ne reste que des monticules de terre, des tuyaux et des bouches d’aération.',
          'La ville ne s’est pas arrêtée aux logements : on y trouve sous terre une église, un hôtel, une librairie, un bar avec son billard.',
        ],
      },
      {
        title: 'Combien cela coûte-t-il ?',
        paragraphs: [
          'Slate cite un ordre de grandeur : environ 24 000 euros pour une maison de trois chambres, contre 415 000 euros en moyenne à Adélaïde, la grande ville la plus proche, à 850 kilomètres. L’écart dit autant l’isolement que le mode de construction.',
        ],
      },
      {
        title: 'Et en France ?',
        paragraphs: [
          'L’habitat troglodytique n’a rien d’exotique : le val de Loire et le Saumurois en comptent de nombreux, creusés dans le tuffeau, et certains se vendent.',
          'Deux points sont à regarder de près. La lumière et l’air, d’abord : pour être un logement décent, la pièce principale doit être éclairée par la lumière du jour et ventilée. L’humidité ensuite, ennemie de tout ce qui est enterré, et la stabilité de la roche, qu’un professionnel doit avoir examinée.',
          'C’est la même logique que pour un souplex : ce qui est sous le sol peut être un vrai logement, à condition de le vérifier.',
        ],
      },
    ],
    faq: [
      { q: 'Fait-il vraiment frais sous terre ?', a: 'À Coober Pedy, la température souterraine reste autour de 23 °C alors que l’été dépasse 50 °C en surface, selon les chiffres repris par Slate.' },
      { q: 'Peut-on acheter une maison troglodytique en France ?', a: 'Oui, il s’en vend, surtout dans le val de Loire. Vérifiez la lumière naturelle, la ventilation, l’humidité et la stabilité de la roche avant de vous engager.' },
    ],
    sources: [
      { label: 'Slate, « Coober Pedy, le village australien où les habitants vivent sous terre »', url: 'https://www.slate.fr/story/251755/coober-pedy-village-australie-habitants-vivent-sous-terre-mine-opale-maisons-troglodytes-echapper-chaleur' },
      { label: 'The Week, « Coober Pedy: inside the Australian town where people live underground », 22 août 2023', url: 'https://theweek.com/news/world-news/962095/coober-pedy-australian-town-people-live-underground' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'habiter-nulle-part-vivre-dans-les-trains',
    art: 'train',
    title: 'Habiter nulle part : l’étudiante qui vivait dans les trains',
    description:
      'En 2015, une étudiante allemande a rendu son appartement pour vivre avec un abonnement de train illimité. Ce que la presse en a raconté, et ce que cela suppose de ne plus avoir d’adresse.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Ne pas habiter comme tout le monde, cela peut vouloir dire ne plus habiter du tout. En 2015, la presse allemande puis américaine a raconté l’histoire de Leonie Müller, 23 ans, étudiante, qui avait remplacé son loyer par un abonnement de train.',
    takeaways: [
      'Le point de départ : un différend avec son propriétaire, rapporte le Washington Post.',
      'L’abonnement, valable sur tous les trains du pays, lui coûtait environ 380 dollars par mois, contre 450 dollars de loyer.',
      'Toute sa vie tenait dans un sac à dos : des vêtements, une tablette, ses cours, une trousse de toilette.',
      'Sans logement, la question n’est plus le toit, mais l’adresse.',
    ],
    sections: [
      {
        title: 'Comment vit-on dans un train ?',
        paragraphs: [
          'D’après les articles de l’époque, elle travaillait ses cours à bord, se lavait les cheveux dans les toilettes du train, et passait d’une ville à l’autre au gré des amis et de la famille à visiter. Elle tenait un blog, et faisait de cette expérience le sujet de son mémoire.',
          'Le calcul était simple : l’abonnement coûtait un peu moins que le loyer qu’elle venait de quitter.',
        ],
      },
      {
        title: 'Qu’est-ce que cela change vraiment ?',
        paragraphs: [
          'Ce que ces récits montrent, au-delà de l’anecdote, c’est qu’un logement n’est pas seulement un abri. C’est un endroit où poser ses affaires, recevoir son courrier, dormir sans dépendre de quelqu’un. Les récits le relèvent d’ailleurs : elle logeait régulièrement chez des amis ou dans sa famille.',
          'Les articles décrivent une expérience en cours, menée le temps des études, pas un choix arrêté pour la vie.',
        ],
      },
      {
        title: 'Et en France ?',
        paragraphs: [
          'On peut voyager sans cesse, mais on ne peut pas se passer d’adresse : pour une banque, un employeur, les impôts ou l’assurance maladie, il en faut une. Quand on n’a pas de domicile stable, la loi prévoit une domiciliation auprès du centre communal d’action sociale ou d’un organisme agréé.',
          'Pour ceux que le mouvement attire sans vouloir renoncer à un chez-soi, il existe un entre-deux qui s’achète et se revend : la péniche.',
        ],
      },
    ],
    faq: [
      { q: 'Est-ce moins cher que de louer ?', a: 'Dans son cas, oui, de peu : environ 380 dollars par mois pour l’abonnement, contre 450 dollars de loyer, selon le Washington Post. Mais elle dormait souvent chez des proches.' },
      { q: 'Peut-on vivre sans adresse en France ?', a: 'Pas durablement : une adresse est demandée pour presque toutes les démarches. Une domiciliation est possible auprès du centre communal d’action sociale ou d’un organisme agréé.' },
    ],
    sources: [
      { label: 'The Washington Post, repris par le New Zealand Herald, « German student chooses to live on trains rather than pay rent »', url: 'https://nzherald.co.nz/business/german-student-chooses-to-live-on-trains-rather-than-pay-rent/QAHLPRUR7YMCRKWQKO7EAW23ZY' },
      { label: 'Web Urbanist, « Home-Free Living: German Woman Trades in Rent for Train Ticket », 6 septembre 2015', url: 'https://weburbanist.com/2015/09/06/home-free-living-german-woman-trades-in-rent-for-train-ticket/' },
    ],
    listingsLink: { label: 'Voir les péniches à vendre', href: '/categorie/peniche' },
  },
  {
    slug: 'cordouan-le-dernier-phare-habite-de-france',
    art: 'phare',
    title: 'Cordouan, le dernier phare habité de France',
    description:
      'Au large de l’estuaire de la Gironde, des gardiens se relaient encore dans un phare de 1611. Leur quotidien, d’après la presse, et ce qu’il faut savoir avant de rêver d’un phare à soi.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Habiter un phare : l’idée fait rêver à peu près tout le monde. En France, il n’en reste qu’un où des hommes vivent encore, Cordouan, planté en mer devant Le Verdon-sur-Mer. Reporterre et Brut y ont passé du temps.',
    takeaways: [
      'Cordouan a été achevé en 1611 : c’est le plus vieux phare d’Europe encore en service, classé monument historique et inscrit au patrimoine mondial depuis 2021.',
      'Les gardiens s’y relaient par deux, quinze jours sur place, quinze jours à terre.',
      'Ils ne s’occupent plus de la lumière, automatisée, mais du bâtiment et des visiteurs.',
      'En France, les phares en service appartiennent à l’État : on n’en achète pas.',
    ],
    sections: [
      {
        title: 'Qui vit dans le phare, et à quel rythme ?',
        paragraphs: [
          'Reporterre décrit une équipe de quatre à six gardiens, employés par le syndicat qui gère le site. Ils travaillent en binômes, relevés tous les quinze jours, été comme hiver. Brut précise que chacun a sa chambre dans la tour.',
          'La vie n’y suit pas l’horloge mais la marée : on n’accède au phare qu’à marée basse. Le reste du temps, il est coupé de la terre.',
        ],
      },
      {
        title: 'Que fait un gardien quand le feu s’allume tout seul ?',
        paragraphs: [
          'Depuis les années 1990, le signal lumineux, visible à près de quarante kilomètres, est entretenu par une équipe des Phares et Balises. Les gardiens, eux, veillent sur la tour de 67 mètres : ménage, cuivres à astiquer, planchers à cirer, petites réparations.',
          'Ils accueillent aussi le public, environ 24 000 visiteurs par an selon Reporterre, et participent au suivi de la faune et de la flore du plateau rocheux qui entoure le phare.',
        ],
      },
      {
        title: 'Est-ce une vie de solitude ?',
        paragraphs: [
          'Moins qu’on ne l’imagine. L’été, les visiteurs se succèdent. L’hiver, des ouvriers viennent travailler sur le monument. Et les gardiens ne sont jamais seuls dans la tour. Ce que les reportages montrent, c’est plutôt une vie réglée, entre deux marées, dans un bâtiment qui demande des soins constants.',
        ],
      },
      {
        title: 'Et acheter un phare, c’est possible ?',
        paragraphs: [
          'En France, les phares en service appartiennent à l’État. Ce qui se vend parfois, rarement, ce sont d’anciens bâtiments de signalisation : une maison de gardien, un sémaphore désaffecté.',
          'Deux réalités à garder en tête. Le bord de mer est très protégé : on n’y agrandit pas, on n’y construit presque rien. Et un bâtiment de ce genre est souvent classé ou inscrit, ce qui encadre les travaux. C’est un bien de caractère au sens plein, avec les obligations qui vont avec.',
        ],
      },
    ],
    faq: [
      { q: 'Reste-t-il des gardiens de phare en France ?', a: 'Cordouan est le dernier phare habité du pays, selon Reporterre et Brut. Ses gardiens entretiennent le monument et accueillent les visiteurs ; la lumière, elle, est automatisée.' },
      { q: 'Peut-on acheter un phare ?', a: 'Pas un phare en service : ils appartiennent à l’État. D’anciens bâtiments de signalisation sont parfois vendus, avec de fortes contraintes liées au littoral et, souvent, à leur protection au titre des monuments historiques.' },
    ],
    sources: [
      { label: 'Reporterre, « Au rythme de l’océan, la vie des derniers gardiens de phare »', url: 'https://reporterre.net/Au-rythme-de-l-ocean-la-vie-des-derniers-gardiens-de-phare' },
      { label: 'Brut, « Le quotidien des derniers gardiens de phare en France », 2 septembre 2019', url: 'https://www.brut.media/fr/news/le-quotidien-des-derniers-gardiens-de-phare-en-france-6725765e-7271-4921-8c87-d4f56f2c347d' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
    stayLink: { label: 'Dormir dans la maison des gardiens, sur l’île Vierge', href: 'https://www.abers-tourisme.com/phares-de-lile-vierge/la-maison-des-gardiens-de-phare-ecogite-dexception/' },
  },
  {
    slug: 'deux-ans-dans-un-arbre',
    art: 'arbre',
    title: 'Deux ans dans un séquoia, à quarante mètres du sol',
    description:
      'En Californie, un jeune homme a vécu plus de deux ans dans un arbre pour empêcher son abattage. Ce que raconte The Guardian, et ce que vaut une cabane perchée aux yeux de la règle.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Il y a ceux qui construisent une cabane dans un arbre pour y dormir le week-end. Et il y a Nate Madsen, monté dans un séquoia de Californie en octobre 1998, à vingt-cinq ans, pour n’en redescendre que deux ans plus tard. Il a raconté son histoire au Guardian.',
    takeaways: [
      'L’arbre mesurait une soixantaine de mètres de haut. Il s’est installé vers quarante mètres.',
      'Il y est resté un peu plus de deux ans, dont plus de six mois sans toucher le sol.',
      'Il voulait empêcher la coupe d’une forêt ancienne. L’entreprise a fini par renoncer.',
      'En France, une cabane dans un arbre est une construction, soumise aux règles d’urbanisme.',
    ],
    sections: [
      {
        title: 'Pourquoi monter dans un arbre ?',
        paragraphs: [
          'Pour le garder debout. The Guardian rapporte qu’une société forestière s’apprêtait à abattre une forêt ancienne du comté de Humboldt, dont un bosquet de séquoias qu’il connaissait bien. Occuper l’arbre, c’était empêcher qu’on le coupe.',
        ],
      },
      {
        title: 'Comment vit-on là-haut ?',
        paragraphs: [
          'Avec une corde, une plateforme et l’aide des autres. Des proches et des habitants lui apportaient des vivres, hissés au bout d’une ficelle. Il avait un téléphone, et un ordinateur portable pour terminer ses études.',
          'Le récit n’enjolive rien : le froid aux pieds, la pluie, et les tempêtes qui faisaient osciller la cime de plusieurs mètres, au point qu’il a fini par s’installer plus bas, sur une plateforme mieux abritée.',
        ],
      },
      {
        title: 'Comment cela s’est-il terminé ?',
        paragraphs: [
          'L’entreprise a abandonné son projet de coupe, et il est redescendu en octobre 2000. Le Guardian précise que l’arbre est toujours là, et que lui-même a ensuite acheté une parcelle de forêt pour la protéger.',
        ],
      },
      {
        title: 'Et une cabane dans les arbres, en France ?',
        paragraphs: [
          'Une cabane perchée n’échappe pas à l’urbanisme parce qu’elle ne touche pas le sol. C’est une construction : selon sa surface et sa hauteur, il faut une déclaration ou un permis, et le terrain doit s’y prêter.',
          'Y dormir quelques nuits et y habiter à l’année ne sont pas la même chose. Une résidence principale suppose un terrain où l’habitation est autorisée, de l’eau, un assainissement, et un assureur qui accepte le risque.',
          'Ce goût de la hauteur et de la vue se retrouve, de façon plus simple à vivre, dans un dernier étage ou sous une verrière.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on vivre dans une cabane dans les arbres à l’année ?', a: 'Seulement si le terrain autorise l’habitation et si la cabane a été déclarée ou autorisée. Sinon, c’est un abri de loisir, pas un logement.' },
      { q: 'Faut-il une autorisation pour construire une cabane perchée ?', a: 'Oui dans la plupart des cas : une déclaration préalable ou un permis, selon sa surface et sa hauteur. Renseignez-vous en mairie avant de commencer.' },
    ],
    sources: [
      { label: 'The Guardian, repris par Inkl, « Experience: I lived in a tree for two years »', url: 'https://www.inkl.com/news/experience-i-lived-in-a-tree-for-two-years' },
    ],
    listingsLink: { label: 'Voir les derniers étages et rooftops', href: '/categorie/rooftop-vue' },
    stayLink: { label: 'Dormir dans une cabane dans les arbres', href: 'https://www.abracadaroom.com/fr/nuit-insolite-cabane-dans-les-arbres/', affiliate: true },
  },
  {
    slug: 'une-chapelle-en-ruine-devenue-maison',
    art: 'eglise',
    title: 'Une chapelle en ruine achetée 45 000 euros, et trois ans de travaux',
    description:
      'En Dordogne, une chapelle de 1860 réduite à trois murs est devenue une maison. Le budget, les délais et les surprises, d’après The Connexion, et ce qu’il faut vérifier avant d’acheter un édifice religieux.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Les annonces de chapelles à vendre font toujours leur effet : un prix modeste, des pierres, une histoire. The Connexion a suivi l’une de ces aventures jusqu’au bout, à Loubès-Bernac, en Dordogne. Elle dit bien ce que le prix d’achat ne dit pas.',
    takeaways: [
      'Prix d’achat : 45 000 euros, pour trois murs encore debout. Le toit était tombé depuis une quarantaine d’années.',
      'Le chantier, prévu sur dix-huit mois, en a duré trente-six.',
      'Le budget de travaux, fixé à 100 000 euros, a été dépassé : environ 150 000 euros au total, achat compris.',
      'Avant d’acheter un édifice religieux, vérifiez qu’il peut légalement devenir un logement.',
    ],
    sections: [
      {
        title: 'Dans quel état était la chapelle ?',
        paragraphs: [
          'Presque une ruine. Selon The Connexion, il restait trois murs d’une chapelle protestante construite vers 1860. La pluie avait emporté le mortier. Les précédents propriétaires avaient déjà obtenu un permis pour en faire une maison de deux chambres.',
          'L’acheteur a pris une précaution utile : il a fait dépendre la vente de l’obtention du permis pour le projet qu’il voulait, plus grand.',
        ],
      },
      {
        title: 'Qu’est-ce qui a pris trois ans ?',
        paragraphs: [
          'Presque tout. Les murs restants ont dû être démontés puis remontés, à l’exception d’une partie de la façade, après traitement contre l’humidité. Le propriétaire, ingénieur mais pas maçon, a fait venir une équipe. Il a appris le vitrail pour réaliser lui-même les fenêtres.',
          'Le journal raconte aussi un hiver passé sous la tente, sur le chantier, par grand froid. Le chantier s’est achevé en 2014.',
        ],
      },
      {
        title: 'Qu’est-elle devenue ?',
        paragraphs: [
          'Une maison de trois chambres, louée comme gîte. L’ancienne nef sert de salon, ouvert sur une cuisine et une salle à manger, avec de grandes portes vitrées.',
        ],
      },
      {
        title: 'Que vérifier avant d’acheter une chapelle ?',
        list: [
          'Qu’elle n’est plus affectée au culte : une église doit avoir été désaffectée avant d’être vendue.',
          'Que le changement de destination en logement est autorisé par la mairie, et ne pas signer sans cette certitude.',
          'Si elle est classée ou inscrite : les travaux seront encadrés, et parfois aidés.',
          'L’état de la toiture et des maçonneries, avec un professionnel : c’est là que part le budget.',
          'L’eau, l’électricité et l’assainissement, souvent absents.',
        ],
      },
    ],
    faq: [
      { q: 'Une chapelle se vend-elle vraiment si peu cher ?', a: 'À l’achat, parfois. Celle de cette histoire a coûté 45 000 euros, mais environ 150 000 euros au total une fois les travaux faits, selon The Connexion.' },
      { q: 'Peut-on transformer une église en logement ?', a: 'Oui, si elle a été désaffectée et si la mairie autorise le changement de destination. Faites-en une condition de la vente.' },
    ],
    sources: [
      { label: 'The Connexion, « Converting a religious French ruin into a high-end home », 22 août 2023', url: 'https://www.connexionfrance.com/practical/a-once-in-a-lifetime-experience-converting-a-religious-french-ruin-into-a-high-end-home/188452' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
  },
  {
    slug: 'vivre-dans-un-silo-a-missiles',
    art: 'silo',
    title: 'Un architecte s’est installé dans un silo à missiles',
    description:
      'Dans l’État de New York, un architecte australien a acheté un silo de la guerre froide et l’a rendu habitable. Ce qu’en raconte Houzz : le prix, les travaux, et la vie sans fenêtre.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Cinquante-six mètres de profondeur, seize de diamètre, des portes blindées : ce n’est pas le descriptif d’un loft, mais celui d’un silo à missiles construit au début des années 1960 dans le nord de l’État de New York. Un architecte de Sydney, Alexander Michael, l’a acheté en 1996. Houzz l’a visité.',
    takeaways: [
      'Prix d’achat : 160 000 dollars en 1996, puis plus de 300 000 dollars de restauration, selon Houzz.',
      'On vit dans l’ancien centre de contrôle, neuf mètres sous terre. La console de lancement est restée.',
      'Aucune lumière naturelle : des écrans montrent la surface, une vingtaine d’horloges donnent l’heure.',
      'En France, un local sans lumière du jour n’est pas un logement.',
    ],
    sections: [
      {
        title: 'Pourquoi acheter un silo ?',
        paragraphs: [
          'Ces silos ont été bâtis en pleine crise de Cuba et abandonnés vers 1964. Celui-ci dormait depuis trente ans quand il a été vendu. Houzz décrit un chantier de passionné : remettre le lieu dans son état d’origine, tout en y ajoutant une cuisine, des chambres et un séjour.',
        ],
      },
      {
        title: 'Qu’a-t-il fallu réparer ?',
        paragraphs: [
          'L’eau et la rouille avaient tout attaqué. Il a fallu décaper et repeindre quatre portes blindées, refaire la plomberie, retrouver dans une casse les vérins qui les manœuvrent. Personne ne savait plus comment le lieu avait été conçu.',
          'Les murs courbes, en béton, renvoyaient le froid et l’écho. Ils ont été tendus de tissu matelassé, ce qui a réglé les deux problèmes à la fois.',
        ],
      },
      {
        title: 'Comment vit-on sans fenêtre ?',
        paragraphs: [
          'Avec des repères. Houzz mentionne des écrans reliés à la surface et une vingtaine d’horloges pour ne pas perdre la notion du temps. À l’arrivée, la ventilation tourne une heure et demie pour renouveler l’air.',
          'Le propriétaire n’y habite pas à l’année : il partage son temps avec l’Australie. Et il assure ne pas s’y sentir enfermé, tant le volume est grand.',
        ],
      },
      {
        title: 'Et en France ?',
        paragraphs: [
          'D’anciens ouvrages militaires se vendent de temps en temps : un fort, une casemate, un abri. Ils attirent pour les mêmes raisons, l’épaisseur des murs et l’histoire.',
          'Mais un logement doit recevoir la lumière du jour et être ventilé. Un espace enterré sans ouverture peut devenir une cave, un atelier, une salle de musique, pas une pièce de vie. Ajoutez l’humidité, la question du changement de destination, et celle de l’assurance.',
          'C’est le même raisonnement, à une autre échelle, que pour un souplex : ce qui est sous terre doit prouver qu’il est habitable.',
        ],
      },
    ],
    faq: [
      { q: 'Combien coûte un silo à missiles ?', a: 'Celui-ci a été acheté 160 000 dollars en 1996, et sa restauration a coûté plus de 300 000 dollars, selon Houzz.' },
      { q: 'Peut-on habiter un abri enterré en France ?', a: 'Pas s’il n’a ni lumière du jour ni ventilation : ces deux conditions font partie de la définition d’un logement décent.' },
    ],
    sources: [
      { label: 'Houzz, « Australian Architect Makes Himself at Home in a Missile Silo », 8 avril 2015', url: 'https://www.houzz.com.au/magazine/usa-houzz-australian-architect-makes-himself-at-home-in-a-missile-silo-stsetivw-vs~46871268' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'vivre-sur-une-ile-de-l-archipel-de-molene',
    art: 'ile',
    title: 'Vivre sur une île presque déserte, au large du Finistère',
    description:
      'Sur l’île de Quéménès, dans l’archipel de Molène, une famille fait vivre une ferme et des chambres d’hôtes. L’eau, l’énergie, les revenus, d’après Reporterre, et pourquoi ces îles ne s’achètent pas.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Une île pour soi : un kilomètre de long, trois cents mètres de large, la mer d’Iroise tout autour. Quéménès, dans l’archipel de Molène, n’est pas à vendre et ne le sera pas. Mais une famille y vit et y travaille, et Reporterre a raconté comment.',
    takeaways: [
      'L’île, d’environ 26 hectares, appartient au Conservatoire du littoral depuis 2003.',
      'Une famille s’y est installée en 2008 pour tenir la ferme et accueillir des hôtes.',
      'L’électricité vient du vent et du soleil, l’eau d’un puits et de la pluie.',
      'En France, les îles de ce genre sont protégées : on peut y vivre par mission, pas les acheter.',
    ],
    sections: [
      {
        title: 'De quoi vit-on sur une île ?',
        paragraphs: [
          'De plusieurs choses à la fois. Reporterre, en 2013, décrit une ferme qui produit des pommes de terre, élève des moutons d’Ouessant et récolte des algues, et des chambres d’hôtes qui représentent la moitié du chiffre d’affaires. L’ensemble permet de dégager deux salaires.',
          'Environ quatre cents personnes séjournaient alors sur l’île chaque saison.',
        ],
      },
      {
        title: 'Et l’eau, l’électricité ?',
        paragraphs: [
          'Rien ne vient du continent. Une petite éolienne, des panneaux solaires et des batteries fournissent l’électricité. L’eau provient d’un ancien puits et de la pluie, stockée et filtrée. Le journal donne un chiffre parlant : une quarantaine de litres par personne et par jour, contre cent cinquante en moyenne en France.',
          'Les toilettes sont sèches, et les eaux usées sont épurées par des plantes.',
        ],
      },
      {
        title: 'Qu’est-ce qui est difficile ?',
        paragraphs: [
          'La dépendance au bateau, pour les courses comme pour le courrier, dans des eaux où les courants et les récifs ne pardonnent pas. L’école, suivie en partie à distance. Et des soucis très terrestres : les lapins, qui ravagent les cultures.',
          'Sur l’îlot voisin du Ledenez, raconte Bateaux.com, d’anciennes cabanes de goémoniers ont été restaurées en refuge de mer, sans douche ni eau potable, avec des panneaux solaires et un bassin qui recueille la pluie.',
        ],
      },
      {
        title: 'Peut-on acheter une île en France ?',
        paragraphs: [
          'Très rarement. Beaucoup appartiennent au Conservatoire du littoral, dont le rôle est précisément de les soustraire à la vente pour les protéger. Celles qui restent privées sont peu nombreuses, et le littoral y est aussi protégé qu’ailleurs : on n’y construit pas.',
          'L’envie d’eau et d’horizon trouve en ville une réponse plus accessible : un logement au bord de l’eau, ou sur l’eau.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on s’installer sur une île du Conservatoire du littoral ?', a: 'Pas librement. Sur Quéménès, la famille installée depuis 2008 gère la ferme et l’accueil pour le compte du Conservatoire, selon Reporterre.' },
      { q: 'Une île peut-elle être autonome en eau et en énergie ?', a: 'Celle-ci l’est, avec une éolienne, des panneaux solaires, un puits et l’eau de pluie, au prix d’une consommation très réduite.' },
    ],
    sources: [
      { label: 'Reporterre, « Kemenez, l’île bretonne qui cultive », 19 novembre 2013', url: 'https://reporterre.net/Kemenez-l-ile-bretonne-qui-cultive' },
      { label: 'Bateaux.com, « Vivre sur une île déserte, c’est possible dans l’archipel de Molène », 8 septembre 2017', url: 'https://www.bateaux.com/article/26465/vivre-une-ile-deserte-c-possible-l-archipel-de-molene' },
    ],
    listingsLink: { label: 'Voir les péniches à vendre', href: '/categorie/peniche' },
  },
  {
    slug: 'douze-metres-carres-face-a-la-mer',
    art: 'cabane',
    title: 'Douze mètres carrés face à la mer, en sachant qu’elle les reprendra',
    description:
      'Dans le Cotentin, un architecte a rénové une cabane de pêcheur de 12 m² accrochée aux rochers. Ce qu’en dit Tendance Ouest, et ce que le recul du littoral change pour un acheteur.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'À Fermanville, dans la Manche, une cabane de pêcheur des années 1950 tient sur les rochers, le long du sentier des douaniers. Douze mètres carrés. L’architecte Guillaume Aubry l’a entièrement refaite, raconte Tendance Ouest, en acceptant une idée que peu d’acheteurs regardent en face : un jour, la mer la reprendra.',
    takeaways: [
      'Au départ : des parpaings sous une tôle, sans isolation, sans eau ni électricité.',
      'C’est parce que la cabane existait déjà qu’elle a pu être rénovée, dans un secteur très protégé.',
      'Tout tient en 12 m² : cuisine, douche, toilettes, et un couchage en mezzanine.',
      'Avant d’acheter au bord de l’eau, regardez ce que dit l’état des risques sur le recul du littoral.',
    ],
    sections: [
      {
        title: 'Comment loge-t-on tout dans 12 m² ?',
        paragraphs: [
          'En empilant. Tendance Ouest décrit une cuisine compacte enroulée autour d’un bloc qui cache les toilettes, une douche vitrée dans le même volume, et un lit en mezzanine auquel on monte par une échelle. De grandes baies coulissantes ouvrent sur la mer.',
          'Peu de matériaux, peu d’objets, tous utiles.',
        ],
      },
      {
        title: 'Pourquoi a-t-on pu rénover ici ?',
        paragraphs: [
          'Parce qu’il y avait déjà quelque chose. Sur ce littoral, on ne construit pas. Mais un bâtiment existant peut être remis en état : c’est l’existence de la cabane qui a permis d’obtenir les autorisations, rapporte le journal.',
        ],
      },
      {
        title: 'Et la mer ?',
        paragraphs: [
          'Elle est à quelques mètres. La cabane subit les tempêtes et les grandes marées, et le trait de côte bouge. L’architecte le sait et l’accepte : le lieu n’est pas fait pour durer toujours. C’est une façon d’habiter le littoral qui tranche avec l’envie habituelle de bâtir pour des générations.',
        ],
      },
      {
        title: 'Que regarder avant d’acheter au bord de l’eau ?',
        list: [
          'L’état des risques remis par le vendeur : il doit mentionner les risques connus, et dans certaines communes le recul du trait de côte.',
          'Ce que le plan d’urbanisme autorise : sur le littoral, agrandir est le plus souvent impossible.',
          'Les travaux déjà faits : ont-ils été autorisés ?',
          'L’assurance : demandez un devis avant de signer, pas après.',
          'L’accès, l’eau, l’électricité et l’assainissement.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on construire une cabane au bord de la mer ?', a: 'En règle générale, non : le littoral est protégé. Un bâtiment qui existe déjà peut en revanche être rénové, avec autorisation.' },
      { q: 'Comment savoir si un bien est menacé par la mer ?', a: 'Lisez l’état des risques fourni par le vendeur et interrogez la mairie : certaines communes sont répertoriées pour le recul de leur littoral.' },
    ],
    sources: [
      { label: 'Tendance Ouest, « En Normandie, il vit dans une cabane de 12 m² face à la mer en acceptant qu’elle disparaisse sous l’eau un jour », 5 août 2026', url: 'https://www.tendanceouest.com/actualite-441539-insolite-en-normandie-il-vit-dans-une-cabane-de-12m2-face-a-la-mer-en-acceptant-qu-elle-disparaisse-sous-l-eau-un-jour' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'vivre-a-l-annee-sur-un-paquebot',
    art: 'paquebot',
    title: 'Ils ont tout vendu pour vivre sur un paquebot',
    description:
      'Des retraités, mais pas seulement, ont remplacé leur logement par une cabine de croisière à l’année. Les chiffres qu’ils avancent, et ce que l’on garde forcément à terre.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Plus de loyer, plus de ménage, plus de courses : une cabine, et le monde qui défile. Quelques personnes ont fait de la croisière leur adresse. Le site Supercar Blondie en a rassemblé six portraits en 2025. Les montants qu’ils annoncent surprennent ; ils demandent aussi à être lus de près.',
    takeaways: [
      'Une retraitée californienne de 77 ans a tout vendu pour embarquer sur un navire résidentiel.',
      'Une autre passagère annonce environ 1 000 dollars par mois pour une cabine, repas compris.',
      'Un couple dit avoir fait trente-six croisières en huit mois pour moins de 10 000 dollars.',
      'Ces chiffres viennent des intéressés eux-mêmes : ils ne disent pas tout ce que l’on paie encore à terre.',
    ],
    sections: [
      {
        title: 'Qui fait ce choix ?',
        paragraphs: [
          'Des retraités, le plus souvent, et quelques trentenaires. Parmi les portraits rassemblés : une femme de 77 ans installée sur un navire conçu pour des résidents à l’année, un couple du Tennessee qui loue sa maison pour financer ses traversées, et un homme présenté comme vivant à bord depuis plus de vingt ans.',
        ],
      },
      {
        title: 'Est-ce vraiment moins cher qu’un logement ?',
        paragraphs: [
          'Sur le papier, parfois. Les sommes citées vont d’une quarantaine de dollars par jour à un millier par mois, repas et ménage compris. Comparé au loyer d’une grande ville américaine, l’écart existe.',
          'Mais ce sont des déclarations, pas des comptes. Elles ne disent rien des assurances, des soins, des escales, des billets d’avion, ni des tarifs, qui changent d’une saison à l’autre. Et certains ont gardé un bien à terre, qu’ils louent.',
        ],
      },
      {
        title: 'Et vu de France ?',
        paragraphs: [
          'Vivre en mer ne fait pas disparaître la terre. Il faut toujours une adresse pour sa banque, ses impôts et sa couverture santé, et un endroit où revenir.',
          'Il existe une manière plus durable d’habiter sur l’eau sans quitter la ville : la péniche. C’est un bateau, mais avec une adresse, un emplacement et des règles précises.',
        ],
      },
    ],
    faq: [
      { q: 'Combien coûte une année sur un paquebot ?', a: 'Les personnes citées par Supercar Blondie avancent des montants très variables, autour de 1 000 dollars par mois pour l’une d’elles. Ce sont leurs propres chiffres, et ils ne comprennent pas les dépenses à terre.' },
      { q: 'Peut-on vraiment ne plus avoir de logement ?', a: 'On peut ne plus en occuper, mais une adresse reste nécessaire pour presque toutes les démarches.' },
    ],
    sources: [
      { label: 'Supercar Blondie, « 6 former landlubbers who abandoned life on land for cruise ship living », 5 septembre 2025', url: 'https://supercarblondie.com/people-who-abandoned-life-on-land-for-cruise-ship-living' },
    ],
    listingsLink: { label: 'Voir les péniches à vendre', href: '/categorie/peniche' },
  },
  {
    slug: 'vivre-sous-un-dome',
    art: 'dome',
    title: 'Vivre sous un dôme, hiver compris',
    description:
      'Dans le Morbihan, un constructeur de dômes géodésiques habite ce qu’il fabrique. Le coût, le montage, le chauffage, d’après Reporterre, et le point qui fâche : le terrain.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Une demi-sphère faite de triangles, sans un seul poteau au milieu : le dôme géodésique vient de l’architecte américain Buckminster Fuller. En France, quelques-uns en ont fait leur maison. Reporterre a rencontré l’un d’eux à Saint-Dolay, dans le Morbihan, où il vit sous un dôme qu’il a construit.',
    takeaways: [
      'Un dôme démontable coûte environ 10 000 euros et se monte en un ou deux jours, selon le constructeur.',
      'Démonté, il tient dans un camion.',
      'Isolé à la laine de mouton, orienté au sud, il se chauffe avec peu.',
      'La vraie difficulté n’est pas la construction, mais le terrain où on a le droit de le poser.',
    ],
    sections: [
      {
        title: 'Pourquoi une sphère ?',
        paragraphs: [
          'Parce que le triangle ne se déforme pas. Les barres se croisent et répartissent les efforts, si bien que la structure tient sans pilier. L’intérieur est entièrement libre, avec peu de matière pour beaucoup de volume.',
        ],
      },
      {
        title: 'Est-ce habitable en hiver ?',
        paragraphs: [
          'Celui que décrit Reporterre a passé quatre hivers dans des dômes. Une grande baie au sud capte le soleil, la laine de mouton isole, et une lame d’air entre l’isolant et la toile évacue l’humidité. La toile de couverture dure de quinze à vingt-cinq ans.',
          'Le reste suit la même logique : toilettes sèches, eaux usées épurées par des roseaux, un poêle pour le chauffage.',
        ],
      },
      {
        title: 'Où a-t-on le droit de le poser ?',
        paragraphs: [
          'C’est là que tout se joue. Dans un jardin, autour d’une maison, cela ne pose guère de difficulté. Dans un champ, une forêt ou sur un terrain non constructible, les mairies refusent le plus souvent, constate Reporterre.',
          'La loi reconnaît depuis 2014 les résidences démontables comme un habitat permanent possible, mais seulement sur des terrains que le plan d’urbanisme a prévus pour cela. Ils sont rares. Avant d’acheter un terrain pour ce projet, demandez un certificat d’urbanisme.',
        ],
      },
      {
        title: 'Et pour qui veut du volume sans poteau ?',
        paragraphs: [
          'Le plaisir du dôme, un grand espace d’un seul tenant, se retrouve dans des biens qui s’achètent sans bataille administrative : un loft, un ancien atelier, une ancienne usine.',
        ],
      },
    ],
    faq: [
      { q: 'Combien coûte un dôme habitable ?', a: 'Environ 10 000 euros pour un dôme démontable, selon le constructeur interrogé par Reporterre, sans le terrain ni les aménagements.' },
      { q: 'Peut-on installer un dôme sur un terrain non constructible ?', a: 'En règle générale, non. Les résidences démontables ne sont admises que dans des secteurs prévus par le plan d’urbanisme. Renseignez-vous en mairie avant d’acheter.' },
    ],
    sources: [
      { label: 'Reporterre, « Vivre sous un dôme, un habitat alternatif méconnu »', url: 'https://reporterre.net/Vivre-sous-un-dome-un-habitat-alternatif-meconnu' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
    stayLink: { label: 'Dormir dans une bulle', href: 'https://www.abracadaroom.com/fr/nuit-insolite-bulle/', affiliate: true },
  },
  {
    slug: 'vivre-dans-la-roche-les-maisons-troglodytes',
    art: 'troglo',
    title: 'Dix-huit degrés toute l’année : vivre dans la roche',
    description:
      'À La Roche-Guyon comme à Amboise, des habitants vivent dans des maisons creusées dans la falaise. La fraîcheur, l’humidité, les prix, d’après Reporterre et Brut, et ce qu’il faut vérifier avant d’acheter.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Pas besoin d’aller en Australie pour habiter sous terre. À soixante kilomètres de Paris, le village de La Roche-Guyon compte environ 250 cavités creusées dans la craie, dont certaines sont des maisons. Reporterre y est allé un été de canicule. Brut, de son côté, a filmé un couple installé dans la roche à Amboise.',
    takeaways: [
      'La température reste entre 17 et 20 °C toute l’année, sans climatisation.',
      'L’ennemi, c’est l’humidité : il faut ventiler et déshumidifier en permanence.',
      'À Amboise, un couple a acheté moins de 50 000 euros, et dépensé à peu près autant en travaux.',
      'Avant d’acheter, faites vérifier la stabilité de la roche et lisez l’état des risques.',
    ],
    sections: [
      {
        title: 'Fait-il vraiment frais l’été ?',
        paragraphs: [
          'Oui, et c’est ce qui a remis ces maisons à la mode. À La Roche-Guyon, Reporterre relève de 18 à 20 °C à l’intérieur quand il fait 35 °C dehors. Un habitant, retraité, y vit depuis 2006 et n’a presque pas de facture d’énergie.',
          'L’hiver, la roche rend la chaleur accumulée. À Amboise, Brut indique environ 17 °C sans chauffage, et 19 à 20 °C avec un poêle à bois, pour huit stères par hiver.',
        ],
      },
      {
        title: 'Et l’humidité ?',
        paragraphs: [
          'C’est la contrepartie. L’un des habitants rencontrés par Reporterre a installé deux ventilations mécaniques, un déshumidificateur et un brasseur d’air. Un autre retire sept à huit litres d’eau par jour à la belle saison. Sans cela, les tissus, les livres et le cuir s’abîment.',
          'Le couple d’Amboise fait la même remarque : ce logement convient mieux à quelqu’un qui est souvent sur place, parce qu’il faut aérer tous les jours.',
        ],
      },
      {
        title: 'Est-ce sombre ?',
        paragraphs: [
          'Pas forcément. Une maison troglodyte n’a qu’une façade, mais si elle est au sud et largement vitrée, elle est lumineuse. Les acheteurs le savent : selon l’agent immobilier interrogé par Reporterre, ils demandent une entrée plein sud.',
        ],
      },
      {
        title: 'Combien cela coûte-t-il ?',
        paragraphs: [
          'Moins qu’une maison, à l’achat. À Amboise, moins de 50 000 euros, puis un an et demi de travaux faits par les propriétaires pour une somme équivalente. À La Roche-Guyon, un commerçant du village cité par Reporterre parle de cavités passées d’environ 15 000 à 80 000 euros. Les plus belles maisons troglodytes atteignent plusieurs centaines de milliers d’euros.',
          'Les travaux, surtout la ventilation, pèsent lourd. Et tout le monde n’en veut pas : beaucoup d’acheteurs préfèrent une maison ancienne aux murs épais, avec un jardin.',
        ],
      },
      {
        title: 'Que vérifier avant d’acheter ?',
        list: [
          'La stabilité de la voûte et de la falaise, par un spécialiste : des blocs se détachent parfois.',
          'L’état des risques remis par le vendeur, qui signale les cavités souterraines et les mouvements de terrain connus.',
          'Que le bien est bien un logement aux yeux de la mairie, et pas une cave ou une dépendance.',
          'La lumière du jour et la ventilation dans chaque pièce de vie.',
          'L’assurance : demandez un devis avant de signer.',
        ],
      },
    ],
    faq: [
      { q: 'Quelle température fait-il dans une maison troglodyte ?', a: 'Entre 17 et 20 °C toute l’année, selon les habitants rencontrés par Reporterre et Brut, grâce à l’inertie de la roche.' },
      { q: 'Une maison troglodyte est-elle humide ?', a: 'Oui si elle n’est pas ventilée. Les habitants s’équipent de ventilations mécaniques et de déshumidificateurs, et aèrent tous les jours.' },
    ],
    sources: [
      { label: 'Reporterre, « Face à la chaleur, ils vivent dans des grottes »', url: 'https://reporterre.net/Face-a-la-chaleur-ils-vivent-dans-des-grottes' },
      { label: 'Brut, « Mélanie et Florent vivent dans une maison creusée dans la roche », 24 juillet 2020', url: 'https://www.brut.media/fr/nature/melanie-et-florent-vivent-dans-une-maison-creusee-dans-la-roche-82e35536-e9a6-4280-ad72-44804995d683' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
  },
  {
    slug: 'habiter-un-chateau-d-eau',
    art: 'chateaudeau',
    title: 'Habiter un château d’eau : six étages, une pièce par niveau',
    description:
      'En Belgique, deux anciens châteaux d’eau sont devenus des logements. Trente mètres de haut, une pièce par étage, le séjour au sommet : ce qu’en disent New Atlas et la RTBF.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Un château d’eau ne sert plus à rien le jour où le réseau n’a plus besoin de lui. Il reste une tour, souvent bien placée, avec la plus belle vue du village. En Belgique, deux d’entre eux ont été transformés en logements, racontent New Atlas et la RTBF.',
    takeaways: [
      'À Steenokkerzeel, une tour d’environ trente mètres est devenue une maison de six niveaux.',
      'On y vit à l’envers : les chambres en bas, le séjour en haut, la terrasse au sommet.',
      'Près d’Aubel, un autre château d’eau, acheté aux enchères, abrite une chambre d’hôtes dans l’ancien réservoir.',
      'Le plan est imposé par la tour : peu de surface par étage, beaucoup d’escaliers.',
    ],
    sections: [
      {
        title: 'Comment habite-t-on une tour ?',
        paragraphs: [
          'En empilant les pièces. New Atlas décrit la maison de Steenokkerzeel, en Flandre : un garage au sol, puis les locaux techniques, une chambre d’amis et un bureau, une salle de bain, la chambre des propriétaires, et tout en haut le séjour, la cuisine et une terrasse panoramique. Environ 450 m² au total.',
          'La tour, bâtie entre 1938 et 1941, a servi jusque dans les années 1990. Le chantier, confié à un studio de design belge, a commencé en 2008. Il a fallu remplacer des colonnes de béton abîmées et agrandir les fenêtres du dernier étage.',
        ],
      },
      {
        title: 'Que devient le réservoir ?',
        paragraphs: [
          'La meilleure pièce. Près d’Aubel, la RTBF a visité un château d’eau acheté aux enchères en 2017, alors que l’eau s’infiltrait partout. Le réservoir est devenu l’espace de vie, on monte par l’escalier central en béton, vieux de plus d’un siècle, et le sommet porte une terrasse à dix-sept mètres du sol.',
          'Le mobilier a dû être dessiné sur mesure : dans une tour ronde, aucun meuble du commerce ne se plaque contre un mur.',
        ],
      },
      {
        title: 'Et en France ?',
        paragraphs: [
          'Des communes vendent de temps en temps un château d’eau désaffecté, souvent pour une somme modeste. Le prix d’achat dit peu de chose du projet.',
          'Il faut d’abord que la mairie autorise sa transformation en logement. Il faut ensuite percer des fenêtres dans une structure en béton, isoler, créer un escalier aux normes, amener les réseaux. Et accepter de vivre sur de petits plateaux reliés par des marches.',
          'La vue, la hauteur et la lumière sont les mêmes au dernier étage d’un immeuble, avec un ascenseur.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on acheter un château d’eau ?', a: 'Oui, quand une commune ou un syndicat des eaux en vend un qui ne sert plus. Vérifiez avant tout que sa transformation en logement est autorisée.' },
      { q: 'Quelle surface offre un château d’eau ?', a: 'Celui de Steenokkerzeel, haut d’une trentaine de mètres, offre environ 450 m² sur six niveaux, selon New Atlas. Chaque étage reste petit.' },
    ],
    sources: [
      { label: 'New Atlas, « Chateau d’eau », 18 avril 2012', url: 'https://newatlas.com/chateau-deau/22202' },
      { label: 'RTBF, « Envie de prendre de la hauteur ? Découvrez un logement insolite dans Une brique dans le ventre », 25 janvier 2025', url: 'https://www.rtbf.be/article/envie-de-prendre-de-la-hauteur-decouvrez-un-logement-insolite-dans-une-brique-dans-le-ventre-11494444' },
    ],
    listingsLink: { label: 'Voir les derniers étages et rooftops', href: '/categorie/rooftop-vue' },
    stayLink: { label: 'Dormir dans le château d’eau de Montzen', href: 'https://www.lesdomsdalfred.be/fr/akwadom' },
  },
  {
    slug: 'une-maison-en-conteneurs-maritimes',
    art: 'conteneur',
    title: 'Six conteneurs, 145 m² : une maison près de Besançon',
    description:
      'Un couple a construit sa maison avec six conteneurs maritimes. Le budget, le calendrier, le permis et les réticences du village, d’après The Connexion.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'La maison en conteneurs a la réputation d’être rapide et bon marché. The Connexion a suivi un couple qui en a bâti une à Franois, près de Besançon, et donne les chiffres. Ils racontent autre chose : une vraie maison, avec un vrai permis et un vrai budget.',
    takeaways: [
      'Six conteneurs, livrés pour 18 000 euros, pour 145 m² habitables.',
      'Budget : 110 000 euros de terrain et 150 000 euros de construction.',
      'Du terrain à l’emménagement : moins de deux ans, dont neuf mois de chantier.',
      'Le permis de construire est le même que pour une maison en parpaings.',
    ],
    sections: [
      {
        title: 'Combien de temps cela prend-il ?',
        paragraphs: [
          'Le terrain a été acheté en juillet 2019, le permis obtenu en janvier 2020, les conteneurs livrés en juillet 2020, et le couple a emménagé en avril 2021. Il a fait lui-même l’essentiel des travaux, sauf les fondations et l’étanchéité. L’un des deux travaille dans le bâtiment, ce qui compte dans ce calendrier.',
        ],
      },
      {
        title: 'Est-ce vraiment moins cher ?',
        paragraphs: [
          'Les boîtes elles-mêmes ne coûtent presque rien : 18 000 euros sur 150 000. Tout le reste est le prix d’une maison : les fondations, la découpe de l’acier, trois tonnes de métal ont été retirées, l’isolation par l’extérieur, la toiture, le bardage en bois, les réseaux.',
          'L’économie vient surtout du travail fourni par les propriétaires.',
        ],
      },
      {
        title: 'Comment la mairie l’a-t-elle pris ?',
        paragraphs: [
          'Avec méfiance. The Connexion rapporte que le village se montrait sceptique devant des conteneurs et un toit plat, et qu’il a fallu convaincre. La démarche a été la même que pour n’importe quelle construction, sans procédure allégée.',
        ],
      },
      {
        title: 'Que retenir si le projet vous tente ?',
        list: [
          'Un permis de construire est nécessaire, et le plan d’urbanisme peut imposer une forme de toit ou un aspect de façade.',
          'Une étude thermique est indispensable : l’acier conduit le froid comme le chaud.',
          'Le prix des conteneurs est une petite part du budget.',
          'La revente d’une maison très typée prend plus de temps : pensez-y dès la conception.',
        ],
      },
    ],
    faq: [
      { q: 'Combien coûte une maison en conteneurs ?', a: 'Celle de cette histoire a coûté 150 000 euros hors terrain pour 145 m², en grande partie construite par ses propriétaires, selon The Connexion.' },
      { q: 'Faut-il un permis de construire pour une maison en conteneurs ?', a: 'Oui. Les règles sont celles de toute construction neuve.' },
    ],
    sources: [
      { label: 'The Connexion, « Couple build French home out of old shipping containers », 19 juillet 2024', url: 'https://www.connexionfrance.com/news/photos-couple-build-french-home-out-of-old-shipping-containers/654770' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'vivre-dans-une-yourte-avec-le-confort',
    art: 'yourte',
    title: 'Une yourte avec lave-vaisselle et double vitrage',
    description:
      'En Belgique, un couple a quitté son appartement pour une yourte tout équipée. Ce que raconte la RTBF, et la question qui décide de tout en France : le terrain.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'On imagine la yourte comme un retour à la bougie. Celle que la RTBF a visitée dans le Hainaut, en 2015, a l’eau courante, l’électricité, internet, un lave-vaisselle et des portes-fenêtres à double vitrage. Ses occupants avaient quitté un appartement à Bruxelles deux ans plus tôt.',
    takeaways: [
      'Une pièce ronde, avec cuisine, salon, bureau et mezzanine, éclairée par le sommet.',
      'Le couple voulait un logement payé comptant, sans emprunt.',
      'La yourte n’est pas l’habitat léger le moins cher au mètre carré, disent-ils eux-mêmes.',
      'En France, tout dépend du terrain où on l’installe.',
    ],
    sections: [
      {
        title: 'Est-ce confortable en hiver ?',
        paragraphs: [
          'Selon son occupant, qui fabrique lui-même des yourtes, on peut y maintenir 24 °C même quand il gèle. En revanche, la chaleur ne reste pas : la température baisse d’environ un degré par heure une fois le chauffage coupé. Une toile isolée ne garde pas la chaleur comme un mur.',
        ],
      },
      {
        title: 'Pourquoi ce choix ?',
        paragraphs: [
          'Pour ne rien devoir à une banque, et pour pouvoir partir : une yourte se démonte et se remonte ailleurs. La RTBF note aussi un effet inattendu. Le couple entend parfois qu’il n’est pas assez rustique, comme si le confort trahissait l’idée.',
        ],
      },
      {
        title: 'Et en France ?',
        paragraphs: [
          'Une yourte habitée toute l’année est une résidence démontable. La loi l’admet comme logement permanent, mais seulement sur des terrains que le plan d’urbanisme a prévus pour cela, ou sur un terrain constructible, avec une autorisation.',
          'Dans un jardin, à côté d’une maison, une déclaration en mairie suffit le plus souvent pour une petite surface. Dans un pré ou un bois, c’est en général refusé.',
          'Autre conséquence à connaître : une yourte ne se finance pas par un crédit immobilier, et elle ne prend pas de valeur comme un bien bâti. C’est le terrain qui en a.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on vivre dans une yourte toute l’année ?', a: 'Oui, sur un terrain où c’est autorisé. Renseignez-vous en mairie avant d’acheter le terrain ou la yourte.' },
      { q: 'Une yourte tient-elle chaud ?', a: 'Elle se chauffe vite, mais se refroidit vite : environ un degré par heure sans chauffage, selon le fabricant interrogé par la RTBF.' },
    ],
    sources: [
      { label: 'RTBF, « Vivre dans une yourte, oui, mais avec électricité, eau courante et wifi », 15 juillet 2015', url: 'https://www.rtbf.be/article/vivre-dans-une-yourte-oui-mais-avec-electricite-eau-courante-et-wifi-9032727' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
    stayLink: { label: 'Dormir dans une yourte', href: 'https://www.abracadaroom.com/fr/nuit-insolite-yourte/', affiliate: true },
  },
  {
    slug: 'vivre-en-van-l-envers-du-decor',
    art: 'van',
    title: 'Vivre en van : le jardin infini, et le reste',
    description:
      'Des saisonniers, des indépendants, des retraités ont fait d’un fourgon leur logement. Tendance Ouest et le magazine Beside racontent la liberté, et ce que les photos ne montrent pas.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Sur les réseaux, la vie en van ressemble à un lever de soleil permanent. Deux reportages donnent une image plus complète : celui de Tendance Ouest, en 2018, auprès de jeunes Français, et celui du magazine québécois Beside, dans un grand rassemblement de nomades en Arizona.',
    takeaways: [
      'Certains travaillent l’hiver en station pour rouler le reste de l’année ; d’autres travaillent depuis leur fourgon.',
      'L’équipement type : un lit, un coin cuisine, des panneaux solaires, une réserve d’eau.',
      'Les difficultés reviennent partout : le froid, la pluie, les pannes, et trouver où dormir.',
      'Pour beaucoup, aux États-Unis, ce n’est pas un choix mais une solution faute de mieux.',
    ],
    sections: [
      {
        title: 'De quoi vit-on sur la route ?',
        paragraphs: [
          'Tendance Ouest décrit deux manières de faire. Un couple de saisonniers enchaîne les semaines très chargées l’hiver, en station de ski, pour être libre ensuite. Un autre couple a quitté son appartement et un emploi stable pour travailler à distance, avec un gros forfait internet pour seul bureau.',
          'Le logement, lui, tient en quelques mètres carrés : un lit, une table, de quoi cuisiner, parfois une douche, une réserve d’eau de 170 litres dans l’un des fourgons.',
        ],
      },
      {
        title: 'Qu’est-ce qui est dur ?',
        paragraphs: [
          'Les jours de pluie à deux dans un fourgon, les douches froides, les nuits d’hiver, la panne qui immobilise à la fois la voiture et la maison. Et le stationnement : il arrive de chercher pendant des heures un endroit où s’arrêter.',
          'Beside insiste sur le regard des autres. Des occupants de véhicules disent être traités comme des marginaux, réveillés la nuit, verbalisés plutôt qu’aidés.',
        ],
      },
      {
        title: 'Est-ce toujours un choix ?',
        paragraphs: [
          'Non, et c’est l’apport du reportage de Beside. Au rassemblement de Quartzsite, en Arizona, on croise des retraités aux petites pensions, des personnes seules après un deuil ou un divorce, des salariés qui dorment dans leur voiture. Un anthropologue qui étudie le sujet rappelle qu’un véhicule n’est pas gratuit : essence, assurance, immatriculation, amendes.',
          'Le journaliste conclut qu’il ne renoncerait pas à sa maison. Ce mode de vie est enviable quand on peut en sortir.',
        ],
      },
      {
        title: 'Et en France ?',
        paragraphs: [
          'Un véhicule n’est pas un logement. Il faut tout de même une adresse pour ses papiers, ses impôts et sa couverture santé : on peut se faire domicilier, auprès d’un proche ou d’un organisme.',
          'Le stationnement est réglementé par chaque commune, et dormir au même endroit plusieurs nuits de suite est souvent interdit.',
          'Enfin, un fourgon perd de la valeur chaque année, là où un logement en garde. Beaucoup de ceux qui partent conservent un bien, ou comptent en racheter un.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on vivre toute l’année dans un van en France ?', a: 'Rien ne l’interdit, mais il faut une adresse de domiciliation, respecter les règles de stationnement de chaque commune, et prévoir l’hiver.' },
      { q: 'Vivre en van coûte-t-il moins cher qu’un loyer ?', a: 'Il n’y a pas de loyer, mais il reste le carburant, l’assurance, l’entretien, les pannes et la perte de valeur du véhicule.' },
    ],
    sources: [
      { label: 'Tendance Ouest, « Ils vivent en van et leur jardin est infini », 8 novembre 2018', url: 'https://www.tendanceouest.com/actualite-299791-ils-vivent-en-van-et-leur-jardin-est-infini' },
      { label: 'Beside, « The Real Vanlife »', url: 'https://beside.media/stories/the-real-vanlife/' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
  },
  {
    slug: 'un-bunker-de-400-m2-sous-le-terrain',
    art: 'bunker',
    title: 'Ils achètent un terrain, et trouvent dessous un bunker de 400 m²',
    description:
      'Dans le Finistère, un couple a découvert sous son terrain un bunker de 1943 à vingt-quatre pièces, et l’a rendu habitable. Ce que raconte The Connexion, et ce que cela dit de ce qu’on achète avec un terrain.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'À Saint-Pabu, à quelques mètres d’une plage du Finistère, un couple achète en 2017 un terrain pour 35 000 euros. Sous la terre et les ronces, il y avait un bunker allemand de 1943 : environ 400 m² sur deux niveaux, vingt-quatre pièces, dont une partie à douze mètres de profondeur. The Connexion a raconté la suite.',
    takeaways: [
      'Le bunker avait été remblayé et camouflé : ils ne l’ont découvert qu’après l’achat.',
      'Le dégager a demandé huit personnes à temps plein pendant deux mois.',
      'Dix-huit mois de travaux, pour en faire un hébergement loué depuis 2022.',
      'Avec un terrain, on achète aussi ce qu’il y a dessous.',
    ],
    sections: [
      {
        title: 'À quoi servait ce bunker ?',
        paragraphs: [
          'Selon The Connexion, il logeait des officiers de l’armée allemande, qui y prenaient des décisions pour toute la côte nord du Finistère. On y trouvait une salle des cartes, une salle des transmissions, un centre opérationnel, un dortoir.',
        ],
      },
      {
        title: 'Qu’en ont-ils fait ?',
        paragraphs: [
          'Un lieu où l’on dort. L’ancienne salle des cartes est devenue le salon, la salle des transmissions une chambre. Il y a une cuisine et deux salles de bains. Le décor joue la carte de l’époque : téléphones anciens, meubles métalliques, photos.',
          'Le couple n’en était pas à son premier : il avait déjà restauré, dans son jardin, un petit bunker de défense antiaérienne.',
        ],
      },
      {
        title: 'Peut-on y habiter ?',
        paragraphs: [
          'Y dormir une nuit, oui, et c’est ce que propose le lieu. Y vivre est autre chose. Un logement doit recevoir la lumière du jour et être ventilé naturellement dans ses pièces principales. Des pièces enterrées, sans fenêtre, n’en sont pas.',
          'C’est la même limite que pour un sous-sol ou une cave aménagée : l’usage est possible, le statut de logement ne l’est pas toujours.',
        ],
      },
      {
        title: 'Que vérifier quand on achète un terrain ?',
        list: [
          'Ce qu’il y a dessous : cavités, anciens ouvrages, remblais. L’état des risques et la mairie renseignent sur ce qui est connu.',
          'L’histoire du lieu, auprès des voisins et des archives locales.',
          'Ce que le plan d’urbanisme permet d’y faire, par un certificat d’urbanisme.',
          'Sur le littoral, les règles propres au bord de mer, très restrictives.',
        ],
      },
    ],
    faq: [
      { q: 'À qui appartient un bunker situé sous un terrain privé ?', a: 'En règle générale, au propriétaire du terrain : la propriété du sol emporte celle du dessous. Faites-le confirmer par un notaire.' },
      { q: 'Peut-on transformer un bunker en logement ?', a: 'En hébergement de passage, parfois. En logement à l’année, rarement : il faut de la lumière du jour, une ventilation et une autorisation de la mairie.' },
    ],
    sources: [
      { label: 'The Connexion, « See inside: French couple renovates war bunker into accommodation », 2 septembre 2022', url: 'https://www.connexionfrance.com/magazine/see-inside-french-couple-renovates-war-bunker-into-accommodation/105321' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
  },
  {
    slug: 'une-prison-transformee-en-logements',
    art: 'prison',
    title: 'À Grasse, une prison de 1857 transformée en studios',
    description:
      'L’ancienne maison d’arrêt de Grasse, fermée en 1992, devait devenir une résidence étudiante de 77 logements. Le projet, d’après The Connexion, et ce qu’il faut regarder quand on achète dans un bâtiment reconverti.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Habiter une cellule, mais par choix. À Grasse, dans les Alpes-Maritimes, l’ancienne maison d’arrêt, ouverte en 1857 et fermée en 1992, a fait l’objet d’un projet de résidence étudiante. The Connexion l’a présenté en mai 2023 comme une première en France.',
    takeaways: [
      'Le bâtiment, d’environ 1 700 m², était vide depuis trente ans.',
      'Le projet prévoyait 77 studios de 14 à 23 m², dans la prison et dans un bâtiment neuf voisin.',
      'Les portes des cellules et les garde-corps devaient être conservés.',
      'Budget annoncé : 4,5 millions d’euros, sur fonds privés.',
    ],
    sections: [
      {
        title: 'Pourquoi une prison se prête-t-elle au logement ?',
        paragraphs: [
          'Parce qu’elle est déjà découpée en petites pièces, autour de coursives. Transformer des cellules en studios demande moins de bouleversements que de cloisonner une halle. Ce qui manque, c’est la lumière : les fenêtres d’une prison sont faites pour ne pas voir dehors.',
        ],
      },
      {
        title: 'Que disait le projet ?',
        paragraphs: [
          'Selon The Connexion, une société de promotion l’a porté avec la mairie et l’architecte des Bâtiments de France. Les travaux devaient durer de dix-huit à vingt-quatre mois, pour une ouverture annoncée fin 2024, avec des espaces communs pour les étudiants.',
          'Avant cela, le bâtiment avait été acheté en 2017 par un couple qui voulait y créer des jeux d’évasion. Nous n’avons pas vérifié où en est la résidence aujourd’hui.',
        ],
      },
      {
        title: 'Et acheter dans un bâtiment reconverti ?',
        paragraphs: [
          'Prison, couvent, école, usine, hôpital : les reconversions donnent des logements que l’on ne trouve nulle part ailleurs, des hauteurs, des murs épais, une histoire. Elles posent aussi des questions précises.',
        ],
        list: [
          'Le changement de destination a-t-il été autorisé, et le logement est-il bien déclaré comme tel ?',
          'Le bâtiment est-il protégé ? Les travaux à venir en dépendront.',
          'La copropriété est-elle récente ? Regardez le règlement, les charges prévues et les travaux votés.',
          'La lumière, l’isolation et le bruit entre logements : ce sont les points faibles habituels.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on vivre dans une ancienne prison ?', a: 'Oui, quand elle a été reconvertie avec les autorisations nécessaires. À Grasse, le projet présenté en 2023 prévoyait 77 studios pour étudiants.' },
      { q: 'Un bâtiment reconverti est-il un bon achat ?', a: 'Cela dépend de la qualité de la reconversion. Vérifiez les autorisations, la copropriété et les performances du logement avant de vous engager.' },
    ],
    sources: [
      { label: 'The Connexion, « France first as ex-jail set to transform into student accommodation », 19 mai 2023', url: 'https://www.connexionfrance.com/news/france-first-as-ex-jail-set-to-transform-into-student-accommodation/186988' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
  {
    slug: 'vingt-metres-carres-sur-roues-la-tiny-house',
    art: 'tiny',
    title: 'Vingt mètres carrés sur roues : la tiny house à l’épreuve du terrain',
    description:
      'Un jeune couple vit dans une maison de 20 m² posée sur une remorque. Reporterre raconte le quotidien, et le maire qui leur a demandé de partir.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Une vraie maison, en bois, avec une cuisine, une salle d’eau et un lit en mezzanine, mais de vingt mètres carrés et montée sur une remorque. En 2017, Reporterre a rencontré en Normandie un couple de 23 ans qui y vivait depuis un an. Ils en étaient déjà à leur deuxième emplacement.',
    takeaways: [
      'Surface : 20,2 m². Fabrication : environ deux mois chez un constructeur.',
      'Le premier emplacement a dû être quitté : la commune ne prévoyait pas ce type d’habitat.',
      'Le second est une ferme, en échange d’un coup de main au potager.',
      'La maison est mobile, mais il faut un véhicule puissant, et parfois un permis particulier.',
    ],
    sections: [
      {
        title: 'Comment vit-on à deux dans 20 m² ?',
        paragraphs: [
          'En rangeant. Le couple cite la promiscuité et l’obligation de tenir le lieu en ordre comme les vraies contraintes. L’eau et l’électricité viennent de la ferme qui les accueille ; ils voudraient à terme produire leur électricité. Les toilettes sont sèches.',
        ],
      },
      {
        title: 'Où a-t-on le droit de la poser ?',
        paragraphs: [
          'C’est toute la question. Reporterre rapporte qu’un premier maire leur a fait quitter sa commune au bout de quelques mois. La loi reconnaît les habitats légers, mais c’est le plan d’urbanisme de chaque commune qui décide où ils sont admis.',
          'Avant de commander une tiny house, il faut donc avoir trouvé le terrain, et en avoir parlé à la mairie.',
        ],
      },
      {
        title: 'Est-elle vraiment mobile ?',
        paragraphs: [
          'Moins qu’une caravane. Le journal rappelle qu’il faut un véhicule tracteur assez puissant et, au-delà d’un certain poids, un permis adapté. On la déplace pour déménager, pas pour partir en week-end.',
        ],
      },
      {
        title: 'Et pour un acheteur ?',
        paragraphs: [
          'Une tiny house n’est pas un bien immobilier. Elle ne se finance pas comme un logement, ne se revend pas comme un logement, et perd de la valeur avec le temps. Le goût du petit et du bien pensé se retrouve dans un studio ou un atelier bien dessiné, qui reste un patrimoine.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on vivre toute l’année dans une tiny house ?', a: 'Oui, si la commune l’admet sur le terrain choisi. Le plan d’urbanisme fait référence : interrogez la mairie avant tout.' },
      { q: 'Faut-il un permis spécial pour déplacer une tiny house ?', a: 'Selon son poids, oui. Reporterre évoque le seuil de 3,5 tonnes pour la remorque.' },
    ],
    sources: [
      { label: 'Reporterre, « Ils vivent dans une tiny house, et ils sont heureux », 28 juillet 2017', url: 'https://reporterre.net/VIDEO-Ils-vivent-dans-une-tiny-house-et-ils-sont-heureux' },
    ],
    listingsLink: { label: 'Voir les biens atypiques à vendre', href: '/' },
    stayLink: { label: 'Dormir dans une tiny house', href: 'https://www.abracadaroom.com/fr/nuit-insolite-tiny-house/', affiliate: true },
  },
  {
    slug: 'la-maison-bulle-de-chartreuse',
    art: 'bulle',
    title: 'La maison bulle de 1966 qui ne voulait pas être isolée',
    description:
      'En Isère, à 1 200 mètres d’altitude, un couple restaure une maison bulle des années 1960. Ce que raconte The Connexion sur le béton, le froid et les erreurs des précédents propriétaires.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Pas un angle droit. Dans les années 1960, quelques architectes ont construit des maisons en forme de bulles, en projetant du béton sur une armature de fers courbés. L’une d’elles, dessinée par Claude Costy et Pascal Häusermann en 1966, se trouve en Isère, à 1 200 mètres d’altitude, face à la chaîne de Belledonne. The Connexion a suivi sa restauration.',
    takeaways: [
      'Une pièce principale d’environ 50 m², et de petites bulles annexes.',
      'Le bâtiment porte le label « Architecture contemporaine remarquable » depuis 2003.',
      'Les précédents propriétaires l’avaient emballé dans du PVC pour l’isoler, sans succès.',
      'Les propriétaires actuels visent une maison habitable neuf mois par an.',
    ],
    sections: [
      {
        title: 'Comment construit-on une bulle ?',
        paragraphs: [
          'Sans coffrage. On courbe des barres de métal, on les couvre d’un treillis, puis d’une fine couche de béton. La forme est libre, la matière est économe, et la maison épouse le terrain : ici, un balcon et un bassin ont été taillés dans la pente.',
        ],
      },
      {
        title: 'Pourquoi est-ce si difficile à vivre ?',
        paragraphs: [
          'Parce qu’un voile de béton mince n’isole pas. The Connexion y voit l’une des raisons pour lesquelles ce courant s’est éteint. La maison, d’abord pensée comme restaurant puis utilisée pour les loisirs, n’avait pas été conçue pour l’hiver en montagne.',
          'Vernis, peinture, puis une enveloppe complète en PVC : les tentatives passées ont abîmé la structure sans la rendre habitable à l’année.',
        ],
      },
      {
        title: 'Que font les propriétaires actuels ?',
        paragraphs: [
          'Ils l’ont trouvée sur un site d’annonces et y travaillent depuis 2021. Ils ont retiré l’isolation extérieure, choisi des matériaux naturels, et pris conseil auprès de l’architecte d’origine, alors âgée de 92 ans. La première phase, la bulle principale, est terminée.',
          'La maison est louée à la belle saison, et les revenus financent la suite du chantier.',
        ],
      },
      {
        title: 'Et acheter une maison d’architecte ?',
        list: [
          'Un label ou une protection valorise le bien, et encadre ce que l’on peut y changer.',
          'Les techniques expérimentales vieillissent mal : faites examiner la structure et l’étanchéité par un spécialiste.',
          'Le diagnostic énergétique sera souvent mauvais, et les solutions classiques d’isolation ne s’appliquent pas toujours.',
          'Les archives de l’architecte, quand elles existent, sont précieuses pour restaurer sans dénaturer.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on vivre toute l’année dans une maison bulle ?', a: 'Cela dépend de son isolation et de son climat. Celle-ci, en altitude, est restaurée pour être habitable neuf mois par an, selon The Connexion.' },
      { q: 'Que signifie le label « Architecture contemporaine remarquable » ?', a: 'Il signale un bâtiment récent d’intérêt architectural. Les travaux importants doivent être déclarés aux services de l’État.' },
    ],
    sources: [
      { label: 'The Connexion, « US-French couple breathe life into 1960s bubble house », 15 décembre 2023', url: 'https://www.connexionfrance.com/practical/us-french-couple-breathe-life-into-1960s-bubble-house/611356' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
    stayLink: { label: 'Dormir dans la maison bulle', href: 'https://www.chartreuse-tourisme.com/offres/balcon-de-belledonne-sainte-marie-du-mont-fr-5342813/' },
  },
  {
    slug: 'vivre-dans-un-moulin-l-eau-sous-le-plancher',
    art: 'moulin',
    title: 'Vivre dans un moulin, avec la rivière sous le plancher',
    description:
      'Dans le Lot et le Lot-et-Garonne, deux couples habitent d’anciens moulins à eau. Le charme, le chauffage, le niveau de la rivière : ce qu’en rapporte The Connexion.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 4,
    intro:
      'Dans le salon, une vitre au sol laisse voir l’eau qui passe. C’est l’un des deux moulins que The Connexion a visités dans le Sud-Ouest : une ancienne minoterie du Lot-et-Garonne, habitée depuis 2021, et un moulin bâti par des moines en 1247, dans le Lot, acheté en 1991.',
    takeaways: [
      'Un moulin se rénove sur des décennies, souvent par plusieurs propriétaires successifs.',
      'Les murs de pierre et l’eau toute proche rendent le chauffage long à faire effet.',
      'Le niveau de la rivière se surveille en permanence.',
      'L’un des deux produit de l’électricité avec la force de l’eau.',
    ],
    sections: [
      {
        title: 'Combien de temps faut-il pour en faire une maison ?',
        paragraphs: [
          'Longtemps. La minoterie de Cauzac a tourné jusqu’aux années 1970. Un premier propriétaire l’achète en 1997, alors que les sols sont en terre battue, et y travaille une vingtaine d’années sans finir. Un couple prend le relais en 2015. Les occupants actuels arrivent en 2021, dans une maison enfin aboutie.',
          'Dans le Lot, le moulin acheté en 1991 était habitable, mais très sommaire. L’intérieur a été entièrement refait au fil des ans, sans toucher à l’extérieur.',
        ],
      },
      {
        title: 'Qu’est-ce qui reste du moulin ?',
        paragraphs: [
          'Ce qui fait son prix. À Cauzac, la grande salle a gardé une meule, la trémie, des restes de turbines, et deux voûtes sous le plancher. Dans le Lot, la rivière fait encore tourner une installation qui produit du courant.',
        ],
      },
      {
        title: 'Et l’eau, justement ?',
        paragraphs: [
          'Elle est la raison d’être du lieu et son principal souci. À Cauzac, il n’y a pas eu d’inondation depuis 2021, mais la rivière est montée presque jusqu’au bord. La maison est protégée par un déversoir et par sa position, un peu au-dessus des prés.',
          'Dans le Lot, les propriétaires disent surveiller le niveau de près, et constatent que le dérèglement du climat rend cette veille plus lourde.',
          'Autre effet : le froid. Malgré l’isolation et les poêles, la pierre et l’eau sous le bâtiment ralentissent la montée en température.',
        ],
      },
      {
        title: 'Que vérifier avant d’acheter un moulin ?',
        list: [
          'Le risque d’inondation : lisez l’état des risques et demandez l’historique des crues.',
          'Le droit d’eau attaché au moulin, et les obligations d’entretien du cours d’eau et des ouvrages.',
          'L’état des vannes, du bief et du déversoir, avec un professionnel.',
          'L’assurance : faites établir un devis avant de signer.',
          'L’humidité des murs et des planchers bas.',
        ],
      },
    ],
    faq: [
      { q: 'Un moulin est-il toujours en zone inondable ?', a: 'Souvent, puisqu’il est construit sur l’eau. L’état des risques remis par le vendeur l’indique, et la mairie peut préciser l’historique.' },
      { q: 'Peut-on produire de l’électricité avec son moulin ?', a: 'C’est possible quand le moulin dispose d’un droit d’eau qui le permet. L’un des deux moulins visités par The Connexion le fait.' },
    ],
    sources: [
      { label: 'The Connexion, « Unusual French properties: Mill owners can see water below their feet », 20 avril 2023', url: 'https://www.connexionfrance.com/article/Practical/Property/Unusual-French-properties-Mill-owners-can-see-water-below-their-feet' },
      { label: 'The Connexion, « See inside our 13th-Century watermill home in the south of France », 10 septembre 2024', url: 'https://www.connexionfrance.com/practical/photos-see-inside-our-13th-century-watermill-home-in-the-south-of-france/670528' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
    stayLink: { label: 'Dormir au moulin de Latreille', href: 'https://www.moulindelatreille.com/fr/' },
  },
  {
    slug: 'habiter-sur-la-seine',
    art: 'peniche',
    title: 'Habiter le « 21e arrondissement » : la vie sur la Seine',
    description:
      'Environ 250 péniches servent de logement à Paris. Une famille face à la gare d’Austerlitz, une locataire à Neuilly : ce que racontent la Ville de Paris et The Connexion.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Paris compte vingt arrondissements, et un fleuve. La Ville recense environ 250 propriétaires de péniches, et présente l’un de ces foyers sur son site : une famille de quatre, face à la gare d’Austerlitz. The Connexion, de son côté, a publié le récit d’une locataire installée à Neuilly-sur-Seine.',
    takeaways: [
      'Une péniche peut offrir 180 m² et une terrasse en plein Paris.',
      'Ou un studio de 25 m² dans l’ancienne timonerie, loué 950 euros par mois charges comprises.',
      'Depuis les Jeux de 2024, les péniches parisiennes sont raccordées au tout-à-l’égout.',
      'Le froid, les fuites et l’entretien reviennent dans tous les récits.',
    ],
    sections: [
      {
        title: 'À quoi ressemble le quotidien ?',
        paragraphs: [
          'À une vie de village. La page de la Ville décrit des voisins qui se gardent les clés, une terrasse dont on profite une bonne partie de l’année, et des livreurs qui cherchent l’adresse. À Neuilly, la locataire parle des canards qui nichent à bord et des cormorans.',
        ],
      },
      {
        title: 'Qu’est-ce qui est difficile ?',
        paragraphs: [
          'L’hiver. La Ville cite les canalisations qui gèlent, les fuites, la grêle, le bois qui travaille. Dans le studio de Neuilly, la cuisine n’est pas chauffée et les plafonds sont bas. The Connexion ajoute qu’un bateau demande de savoir bricoler, ou d’avoir un propriétaire qui s’en charge.',
        ],
      },
      {
        title: 'Et acheter une péniche ?',
        paragraphs: [
          'Une péniche est un bateau, pas un immeuble. Trois points changent tout par rapport à un appartement.',
        ],
        list: [
          'L’emplacement ne vous appartient pas : il fait l’objet d’une autorisation d’occupation, payante et à durée limitée.',
          'La coque doit être contrôlée régulièrement, en cale sèche, et ces frais sont à votre charge.',
          'Le financement et l’assurance ne sont pas ceux d’un logement classique.',
        ],
      },
    ],
    faq: [
      { q: 'Combien y a-t-il de péniches habitées à Paris ?', a: 'La Ville de Paris évoque environ 250 propriétaires de péniches.' },
      { q: 'Achète-t-on l’emplacement avec la péniche ?', a: 'Non. L’emplacement relève d’une autorisation d’occupation du domaine public, distincte du bateau.' },
    ],
    sources: [
      { label: 'Ville de Paris, « J’habite dans le 21e arrondissement de Paris ! », mis à jour le 3 juin 2025', url: 'https://www.paris.fr/pages/j-habite-dans-le-21e-arrondissement-de-paris-31257' },
      { label: 'The Connexion, « I live in a houseboat in Paris », 16 janvier 2024', url: 'https://www.connexionfrance.com/magazine/i-live-in-a-houseboat-in-paris/677205' },
    ],
    listingsLink: { label: 'Voir les péniches à vendre', href: '/categorie/peniche' },
  },
  {
    slug: 'un-wagon-pour-maison',
    art: 'wagon',
    title: 'Un wagon de 130 ans pour salon',
    description:
      'En Tasmanie, une famille transforme une voiture de chemin de fer en pièce de vie. En Bretagne, un wagon-lit de 1926 accueille des dormeurs dans une ancienne gare. Ce qu’en disent ABC et The Connexion.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Un wagon ne roule plus, mais il reste une pièce toute faite : longue, étroite, pleine de fenêtres. En Tasmanie, une famille en restaure un pour y vivre, raconte la chaîne ABC. Dans le Morbihan, un wagon-lit centenaire a retrouvé des voyageurs, rapporte The Connexion.',
    takeaways: [
      'Le wagon tasmanien a été obtenu contre des travaux de jardinage, pas contre de l’argent.',
      'Pendant son transport par camion, des morceaux sont tombés sur la route.',
      'Il servira de salon, de cuisine et de salle de bain ; les chambres seront dans un conteneur.',
      'En Bretagne, un wagon-lit de 1926 loge jusqu’à onze personnes dans une gare fermée depuis 1967.',
    ],
    sections: [
      {
        title: 'Comment fait-on une maison d’un wagon ?',
        paragraphs: [
          'Par le toit. ABC décrit un chantier mené le soir, après le travail : la toiture déposée, décapée, étanchée, un mur remplacé, deux fenêtres d’origine sauvées, un poêle à bois installé. Le wagon, long de près de treize mètres, était très abîmé.',
          'Le plus dur n’est pas le chantier. La famille cherche encore le terrain où poser l’ensemble, et redoutait que la commune lui demande de déplacer le wagon.',
        ],
      },
      {
        title: 'Et le wagon breton ?',
        paragraphs: [
          'Il dort à Guiscriff, dans une gare qui a vu passer des voyageurs de 1896 à 1967 et qu’une association a rachetée. Il n’en a été construit que quatorze, et il en reste deux. Celui-ci a servi de poste de commandement pendant la guerre, puis de logement pour des cheminots sur les chantiers.',
          'Restauré, isolé et chauffé, il a gardé ses lavabos d’angle, ses lampes de lecture et ses boiseries.',
        ],
      },
      {
        title: 'Et en France, pour y habiter ?',
        paragraphs: [
          'Un wagon posé sur un terrain est une construction comme une autre : il lui faut une autorisation, et un terrain où l’on a le droit de construire. Les deux histoires le montrent : celui qui sert à dormir quelques nuits a trouvé sa place, celui qui doit devenir une maison cherche encore la sienne.',
          'Les gares, maisons de garde-barrière et bâtiments ferroviaires désaffectés, eux, se vendent comme des maisons, avec une histoire en plus.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on installer un wagon dans son jardin ?', a: 'Il faut une autorisation d’urbanisme, comme pour toute construction, et respecter les règles de la commune.' },
      { q: 'Où dormir dans un wagon en France ?', a: 'Entre autres à Guiscriff, dans le Morbihan, où un wagon-lit de 1926 a été restauré dans l’ancienne gare, selon The Connexion.' },
    ],
    sources: [
      { label: 'ABC News, repris par Inkl, « From train to tiny house: Tasmanian family transforming 130yo carriage into a modern home »', url: 'https://www.inkl.com/news/from-train-to-tiny-house-tasmanian-family-transforming-130yo-carriage-into-a-modern-home' },
      { label: 'The Connexion, « Sleep in a 100-year-old railway carriage at a former Brittany station », 20 janvier 2026', url: 'https://www.connexionfrance.com/magazine/sleep-in-a-100-year-old-railway-carriage-at-a-former-brittany-station/756671' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
    stayLink: { label: 'Dormir dans le wagon-lit de Guiscriff', href: 'https://www.lagaredeguiscriff.com/hebergements/train-couchettes/' },
  },
  {
    slug: 'schoonschip-le-quartier-flottant-d-amsterdam',
    art: 'flottant',
    title: 'Trente maisons sur l’eau : le quartier flottant d’Amsterdam',
    description:
      'À Amsterdam, un groupe d’amis a mis plus de dix ans à bâtir un quartier flottant de trente maisons. L’énergie partagée, la vie collective et les limites du modèle, d’après Positive News et Dwell.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Ce ne sont pas des péniches, mais des maisons, posées sur l’eau d’un canal au nord d’Amsterdam et reliées par des passerelles de bois. Le quartier s’appelle Schoonschip. Positive News et Dwell racontent comment une bande d’amis en a fait un petit village de trente foyers.',
    takeaways: [
      'Trente maisons flottantes, environ 120 adultes et 40 enfants.',
      'Plus de dix ans entre l’idée et l’emménagement, début 2019.',
      'Chaque maison produit de l’électricité, et les voisins se partagent le surplus.',
      'Le coût et le temps du projet le rendent difficile à reproduire à prix abordable.',
    ],
    sections: [
      {
        title: 'Comment naît un quartier sur l’eau ?',
        paragraphs: [
          'Lentement. Positive News fait remonter le projet à une productrice de télévision qui tournait une série sur l’habitat durable. Entre amis d’abord, puis avec des urbanistes, des architectes et une levée de fonds, il a fallu plus d’une décennie. Les premières maisons, préfabriquées, ont été mises à l’eau fin 2018.',
        ],
      },
      {
        title: 'Qu’est-ce qu’on y partage ?',
        paragraphs: [
          'L’énergie, d’abord : des panneaux solaires sur chaque toit, et un réseau qui fait circuler l’électricité d’une maison à l’autre. Des voitures électriques et des vélos, ensuite. Et du temps : une maison commune, des jardins flottants entretenus par des volontaires, une baignade hebdomadaire, toute l’année.',
          'Rien n’est obligatoire, précise le journal, mais beaucoup de tâches reposent sur la bonne volonté.',
        ],
      },
      {
        title: 'Quelles sont les limites ?',
        paragraphs: [
          'Le prix et la durée. Les habitants eux-mêmes reconnaissent que le modèle est difficile à rendre abordable en ville. Et vivre sur l’eau avec quarante enfants demande une attention de tous les instants.',
        ],
      },
      {
        title: 'Et en France ?',
        paragraphs: [
          'Les maisons flottantes restent rares. Sur un fleuve ou un canal, on n’est pas propriétaire de l’eau : l’emplacement relève d’une autorisation, payante et limitée dans le temps. C’est la règle qui s’applique déjà aux péniches-logements.',
          'Pour qui veut vivre sur l’eau sans attendre dix ans, la péniche reste la voie la plus simple.',
        ],
      },
    ],
    faq: [
      { q: 'Une maison flottante est-elle une péniche ?', a: 'Non. Elle est conçue comme une maison, sans moteur, posée sur un flotteur. Mais son emplacement obéit aux mêmes règles que celui d’un bateau-logement.' },
      { q: 'Combien de personnes vivent à Schoonschip ?', a: 'Environ 120 adultes et 40 enfants, dans trente maisons, selon Positive News.' },
    ],
    sources: [
      { label: 'Positive News, « Amsterdam’s floating eco-community is a model for modern living », 5 juin 2023', url: 'https://www.positive.news/?p=435886' },
      { label: 'Dwell, « Like-Minded Neighbors Build an Energy-Independent Floating Community in Amsterdam »', url: 'https://www.dwell.com/article/schoonschip-space-and-matter-68a51264' },
    ],
    listingsLink: { label: 'Voir les péniches à vendre', href: '/categorie/peniche' },
    stayLink: { label: 'Dormir dans une cabane sur l’eau', href: 'https://www.abracadaroom.com/fr/nuit-insolite-cabane-sur-leau/', affiliate: true },
  },
  {
    slug: 'habiter-une-ancienne-ecole',
    art: 'ecole',
    title: 'Habiter une école : 600 m² et des fenêtres trop hautes',
    description:
      'En Bretagne, une école de 1892 fermée en 2008 est devenue une maison et des chambres d’hôtes. Ce que raconte The Connexion, et ce qu’une ancienne école a de particulier pour un acheteur.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'À Châtelaudren, dans les Côtes-d’Armor, l’école Sainte-Anne a accueilli jusqu’à 140 élèves, de 1892 à 2008. Un couple venu de Bordeaux s’y est installé en 2020, raconte The Connexion, pour y vivre et y recevoir des hôtes.',
    takeaways: [
      'Un bâtiment de 600 m², avec un grand grenier encore brut.',
      'L’escalier, la rampe et le parquet usé par des générations d’élèves ont été gardés.',
      'Les fenêtres des salles de classe sont placées plus haut que dans une maison.',
      'À moins de 500 mètres d’une chapelle ancienne, tout changement de façade passe par les Bâtiments de France.',
    ],
    sections: [
      {
        title: 'Qu’est-ce qu’une école a de différent ?',
        paragraphs: [
          'Les volumes. Des plafonds hauts, de grandes fenêtres, de larges couloirs : tout ce qu’un acheteur d’atypique recherche. Avec un détail que The Connexion relève : dans les anciennes classes, les fenêtres commencent plus haut, pour que les élèves ne regardent pas dehors. Assis, on voit le ciel, pas la rue.',
        ],
      },
      {
        title: 'Comment l’ont-ils aménagée ?',
        paragraphs: [
          'En jouant le jeu. Les chambres portent des noms de matières, le mobilier a été chiné, et les marques sur le parquet sont restées. Le couple a acheté juste avant la pandémie, emménagé à la fin de l’été 2020 et ouvert au début de 2021. Il a même organisé des retrouvailles d’anciens élèves.',
          'Avant eux, une première personne avait commencé les travaux. Le bâtiment était ensuite resté vide trois ans.',
        ],
      },
      {
        title: 'Que vérifier avant d’acheter une école ?',
        list: [
          'Le changement de destination : une école n’est pas un logement tant que la mairie ne l’a pas autorisé.',
          'La proximité d’un monument protégé, qui soumet les travaux extérieurs à un avis.',
          'Le chauffage : de grands volumes et de grandes vitres coûtent cher à tenir au chaud.',
          'L’amiante et le plomb, fréquents dans les bâtiments publics anciens.',
          'La cour : est-elle vendue avec le bâtiment, et peut-on y construire ?',
        ],
      },
    ],
    faq: [
      { q: 'Les communes vendent-elles leurs anciennes écoles ?', a: 'Oui, quand elles n’en ont plus l’usage. Ce sont des ventes ordinaires, parfois précédées d’un appel à projets.' },
      { q: 'Faut-il une autorisation pour habiter une ancienne école ?', a: 'Oui : le passage d’un équipement public à un logement est un changement de destination, à faire autoriser par la mairie.' },
    ],
    sources: [
      { label: 'The Connexion, « Couple transform old village school into quirky French home », 7 août 2024', url: 'https://www.connexionfrance.com/magazine/photos-couple-transform-old-village-school-into-quirky-french-home/665874' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
    stayLink: { label: 'Dormir dans l’école de Châtelaudren', href: 'https://www.larecreationbretagne.fr/fr' },
  },
  {
    slug: 'un-hameau-entier-pour-26-000-euros',
    art: 'hameau',
    title: 'Un hameau entier pour 26 000 euros',
    description:
      'Dans la Manche, un couple a acheté un hameau abandonné : six maisons, deux granges, un four à pain. Le prix, l’état des lieux et la suite, d’après The Connexion.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Six maisons, deux granges, un atelier, un puits, un pressoir à cidre, un four à pain et deux hectares : le tout pour 26 000 euros. C’est ce qu’un couple de paysagistes britanniques a acheté en 2019 dans la Manche, rapporte The Connexion. Le prix dit vrai, et il ne dit pas tout.',
    takeaways: [
      'Une première maison achetée 12 000 euros, puis le reste du hameau pour 14 000.',
      'Personne n’y vivait depuis une trentaine d’années ; la plupart des bâtiments étaient en ruine.',
      'Le couple dit avoir fait lui-même presque tous les travaux.',
      'Trois ans plus tard, une partie des maisons restait à reprendre, et une cagnotte finançait la suite.',
    ],
    sections: [
      {
        title: 'Pourquoi si peu cher ?',
        paragraphs: [
          'Parce que ce sont des ruines, loin de tout. Dans les campagnes qui se sont vidées, des ensembles entiers se vendent au prix d’une voiture. Ce que l’on paie ensuite, c’est le temps et les matériaux.',
        ],
      },
      {
        title: 'Par où commence-t-on ?',
        paragraphs: [
          'Par dégager. The Connexion décrit des mois passés à couper la végétation et à retirer les ajouts récents pour retrouver les murs d’origine. Le couple a refait une toiture, sans expérience de couvreur, et s’est logé dans un ancien camion aménagé en attendant.',
          'Le projet : un gîte et des hébergements légers pour accueillir des visiteurs.',
        ],
      },
      {
        title: 'Qu’est-ce qui a été dur ?',
        paragraphs: [
          'L’isolement et la longueur de l’hiver, la langue, et l’argent : les économies n’ont pas suffi. Le couple parle aussi d’un sentiment de responsabilité envers des bâtiments qui avaient tenu des siècles.',
        ],
      },
      {
        title: 'Que vérifier avant d’acheter une ruine ?',
        list: [
          'Ce que le plan d’urbanisme permet : une ruine ne se reconstruit pas toujours, surtout hors des zones constructibles.',
          'L’eau, l’électricité et l’assainissement : les amener peut coûter plus que l’achat.',
          'L’accès : chemin privé, servitude, entretien.',
          'Le coût des toitures, premier poste et premier urgent.',
          'Votre temps disponible : un chantier fait soi-même se compte en années.',
        ],
      },
    ],
    faq: [
      { q: 'Peut-on vraiment acheter un hameau pour le prix d’une voiture ?', a: 'Oui, quand il est en ruine et isolé. Celui-ci a coûté 26 000 euros en 2019, selon The Connexion, avant des années de travaux.' },
      { q: 'A-t-on le droit de reconstruire une ruine ?', a: 'Pas toujours. Cela dépend du plan d’urbanisme et de ce qu’il reste des murs. Demandez un certificat d’urbanisme avant d’acheter.' },
    ],
    sources: [
      { label: 'The Connexion, « From a rented caravan in UK to buying entire French hamlet for €26,000 », 2 août 2022', url: 'https://www.connexionfrance.com/practical/from-a-rented-caravan-in-uk-to-buying-entire-french-hamlet-for-26000/149153' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
  },
  {
    slug: 'restaurer-un-chateau-en-ruine',
    art: 'chateau',
    title: 'Ils cherchaient un pied-à-terre, ils ont acheté un château en ruine',
    description:
      'En Ariège, une famille australienne restaure depuis 2013 le château de Gudanes, classé monument historique. Le chantier et son financement, d’après The Connexion.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Le toit était tombé, entraînant par endroits cinq niveaux de planchers. C’est dans cet état qu’une famille australienne a acheté le château de Gudanes, en Ariège, après l’avoir vu sur internet. Elle cherchait un petit pied-à-terre. The Connexion a raconté ce chantier commencé fin 2013 et toujours en cours neuf ans plus tard.',
    takeaways: [
      'Un château du XVIIIe siècle, classé monument historique, sur près de cinq hectares.',
      'Le chantier est mené par des artisans habilités à travailler sur un monument classé.',
      'Il est financé par un salaire, par des séjours payants et par la vente d’un livre.',
      'Depuis 2018, les parties restaurées accueillent des visiteurs.',
    ],
    sections: [
      {
        title: 'Par où commence-t-on ?',
        paragraphs: [
          'Par déblayer. Avant de restaurer, il a fallu sortir les gravats, démolir ce qui ne pouvait pas être sauvé, puis refaire les toitures et les planchers, sur des centaines de mètres carrés. Sur un monument classé, chaque étape est validée, et confiée à des entreprises qui en ont l’habitude.',
          'La famille s’est fait aider par un chef de projet bilingue pour les démarches.',
        ],
      },
      {
        title: 'Comment finance-t-on cela ?',
        paragraphs: [
          'En faisant du chantier une histoire. The Connexion explique qu’un blog, puis les réseaux sociaux, ont réuni plusieurs centaines de milliers d’abonnés. Les séjours de quelques nuits, les ateliers et un livre vendu à plus de dix mille exemplaires paient une partie des travaux. Le reste vient du salaire de l’un des deux, resté travailler en Australie.',
        ],
      },
      {
        title: 'Et acheter un monument historique ?',
        list: [
          'Les travaux sont soumis à autorisation et suivis par les services de l’État.',
          'Des aides et un régime fiscal particulier existent, en contrepartie d’obligations : renseignez-vous avant d’acheter, pas après.',
          'Le prix d’achat est la plus petite ligne du budget.',
          'Un projet d’accueil du public change la nature du lieu : sécurité, accessibilité, assurance.',
        ],
      },
    ],
    faq: [
      { q: 'Un château en ruine coûte-t-il cher ?', a: 'À l’achat, souvent moins qu’un appartement en ville. C’est la restauration qui se compte en années et en centaines de milliers d’euros.' },
      { q: 'Peut-on faire les travaux soi-même dans un monument classé ?', a: 'Les travaux doivent être autorisés et sont contrôlés. Ils sont en pratique confiés à des professionnels qualifiés.' },
    ],
    sources: [
      { label: 'The Connexion, « We wanted a small bolthole but bought a ruined French chateau », 5 août 2022', url: 'https://www.connexionfrance.com/news/photos-we-wanted-a-small-bolthole-but-bought-a-ruined-french-chateau/244599' },
    ],
    listingsLink: { label: 'Voir les biens de caractère à vendre', href: '/categorie/biens-de-caractere' },
  },
  {
    slug: 'la-maison-la-plus-etroite-du-monde',
    art: 'etroite',
    title: 'Soixante-douze centimètres de large : la maison de Varsovie',
    description:
      'À Varsovie, un architecte a glissé une maison dans une fente entre deux immeubles. Ses dimensions, son statut, d’après Dezeen, et ce que la loi française appelle un logement.',
    category: 'Insolite',
    published: '2026-11-22',
    updated: '2026-11-22',
    readMinutes: 3,
    intro:
      'Entre deux immeubles du centre de Varsovie, il restait un vide de moins d’un mètre et demi. L’architecte Jakub Szczesny y a installé une maison, conçue avec l’écrivain Etgar Keret, dont elle porte le nom. Dezeen en a donné les mesures : 72 centimètres au plus étroit, 122 au plus large.',
    takeaways: [
      'Une maison de plan triangulaire, posée sur pilotis, où l’on entre par dessous.',
      'Tout le mobilier a été fait sur mesure.',
      'Elle a été présentée comme une installation artistique, pas comme un logement.',
      'Elle accueille des écrivains de passage, pour de courts séjours.',
    ],
    sections: [
      {
        title: 'Peut-on vraiment y vivre ?',
        paragraphs: [
          'On peut y dormir, y travailler, s’y laver et y cuisiner : selon Dezeen, la maison est complète. Mais elle a été pensée pour une personne seule, pour quelques jours ou quelques semaines, comme un refuge pour écrire.',
        ],
      },
      {
        title: 'Pourquoi une « installation » ?',
        paragraphs: [
          'Parce qu’elle ne respecte pas les règles d’un logement, et que ce statut a permis de la construire. Le projet a été soutenu par la ville et par une fondation d’art, pour une durée d’abord limitée.',
        ],
      },
      {
        title: 'Et en France, où commence un logement ?',
        paragraphs: [
          'La loi fixe un minimum. Pour être loué, un logement doit offrir au moins une pièce principale de 9 m² avec 2,20 mètres sous plafond, ou un volume de 20 m³. Il lui faut la lumière du jour, une ouverture sur l’extérieur, de l’eau, un chauffage.',
          'Ces seuils comptent aussi pour un acheteur. Une chambre de bonne, une loge ou un local trop petit pour être loué ne vaut pas le prix d’un studio, même à la même adresse. Vérifiez la surface et la hauteur, mètre en main.',
        ],
      },
    ],
    faq: [
      { q: 'Quelle est la largeur de la maison la plus étroite ?', a: 'La Keret House de Varsovie mesure 72 centimètres au plus étroit et 122 au plus large, selon Dezeen.' },
      { q: 'Quelle est la surface minimale d’un logement en France ?', a: 'Pour être loué, il doit comporter une pièce principale d’au moins 9 m² avec 2,20 mètres de hauteur, ou un volume habitable de 20 m³.' },
    ],
    sources: [
      { label: 'Dezeen, « World’s narrowest house by Jakub Szczesny », 31 octobre 2012', url: 'https://www.dezeen.com/2012/10/31/worlds-narrowest-house-by-jakub-szczesny/' },
    ],
    listingsLink: { label: 'Voir les lofts et ateliers à vendre', href: '/categorie/loft-atelier' },
  },
];

// Articles en ligne à la date du jour, du plus récent au plus ancien
export function publishedArticles(now: Date = new Date()): GuideArticle[] {
  const today = now.toISOString().slice(0, 10);
  return GUIDE_ARTICLES.filter((a) => a.published <= today).sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));
}

// Nombre d'articles parus à la date de publication la plus récente (étiquette « + N articles » de l'en-tête)
// Nombre d'articles en ligne, affiché à côté d'« État des lieux » dans le menu
export function articlesCount(now: Date = new Date()): number {
  return publishedArticles(now).length;
}

export function latestArticlesCount(now: Date = new Date()): number {
  const list = publishedArticles(now);
  return list.length === 0 ? 0 : list.filter((a) => a.published === list[0].published).length;
}

export function formatGuideDate(iso: string): string {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

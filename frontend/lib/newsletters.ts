// Les newsletters de Loftissime. Même format pour toutes (un bien à la une, l'addition, avant la promesse, trois autres biens,
// la question) ; chacune a son sujet et porte un nom de matière. « Béton ciré » est la première ; les autres sont annoncées
// et s'ouvriront selon les choix des abonnés. Les identifiants sont ceux qu'accepte la fonction subscribe_letters de la base.

export type Newsletter = {
  slug: string;
  nom: string;
  sujet: string; // ce qu'on y trouve, en une ligne
  addition: string; // ce que « L'addition » y compte
  ouverte: boolean;
  matiere: React.CSSProperties; // l'échantillon de matière en tête de carte
};

const joints = (c: string, w: number, h: number) =>
  `repeating-linear-gradient(0deg, transparent 0 ${h}px, ${c} ${h}px ${h + 2}px), repeating-linear-gradient(90deg, transparent 0 ${w}px, ${c} ${w}px ${w + 2}px)`;

export const NEWSLETTERS: Newsletter[] = [
  {
    slug: 'beton-cire',
    nom: 'Béton ciré',
    sujet: 'Les biens atypiques à rénover.',
    addition: 'Le prix, les frais, les travaux, puis ce que ça coûte par mois.',
    ouverte: true,
    matiere: {
      backgroundColor: '#E3DFD8',
      backgroundImage: 'radial-gradient(rgba(33,28,21,.09) 1px, transparent 1.2px), radial-gradient(rgba(255,255,255,.6) 1px, transparent 1.2px)',
      backgroundSize: '7px 7px, 11px 11px',
      backgroundPosition: '0 0, 3px 5px',
    },
  },
  {
    slug: 'laiton',
    nom: 'Laiton',
    sujet: 'Les biens atypiques de luxe.',
    addition: 'Ce que le bien coûte à l’année, une fois acheté.',
    ouverte: false,
    matiere: { backgroundImage: 'linear-gradient(115deg, #a8802c 0%, #e6c873 38%, #c79f45 55%, #f0d98f 72%, #a8802c 100%)' },
  },
  {
    slug: 'verriere',
    nom: 'Verrière',
    sujet: 'Les ateliers d’artistes.',
    addition: 'Le prix du volume, et ce qu’il coûte à chauffer.',
    ouverte: false,
    matiere: { backgroundColor: '#cfe3df', backgroundImage: joints('#211C15', 52, 36) },
  },
  {
    slug: 'brique',
    nom: 'Brique',
    sujet: 'Les lofts.',
    addition: 'Le prix du plateau, puis celui de l’aménagement.',
    ouverte: false,
    matiere: { backgroundColor: '#b0492f', backgroundImage: joints('#ead9c6', 40, 14) },
  },
  {
    slug: 'parpaing',
    nom: 'Parpaing',
    sujet: 'Les biens atypiques à moins de 250 000 €, dans le Grand Paris.',
    addition: 'La mensualité, comparée à un loyer du même quartier.',
    ouverte: false,
    matiere: { backgroundColor: '#c6c4bf', backgroundImage: joints('#9e9b95', 64, 26) },
  },
  {
    slug: 'seconde-vie',
    nom: 'Seconde vie',
    sujet: 'Les biens qui ont eu un autre usage : école, chapelle, garage, boutique.',
    addition: 'Le coût et le délai du changement d’usage.',
    ouverte: false,
    matiere: { backgroundImage: 'repeating-conic-gradient(#211C15 0 25%, #f3ead8 0 50%)', backgroundSize: '30px 30px' },
  },
  {
    slug: 'zinc',
    nom: 'Zinc',
    sujet: 'Les derniers étages, les toits-terrasses, les vues.',
    addition: 'Le prix de la terrasse, étanchéité comprise.',
    ouverte: false,
    matiere: { backgroundImage: 'repeating-linear-gradient(90deg, #93a0aa 0 46px, #6f7c87 46px 49px)' },
  },
  {
    slug: 'a-flot',
    nom: 'À flot',
    sujet: 'Les péniches et les maisons flottantes.',
    addition: 'Ce qu’un bateau coûte par an : emplacement, carénage, assurance.',
    ouverte: false,
    matiere: { backgroundColor: '#2f6278', backgroundImage: 'radial-gradient(circle at 50% -2px, transparent 10px, #8fc0d0 10px 12px, transparent 12px)', backgroundSize: '30px 17px' },
  },
  {
    slug: 'pilotis',
    nom: 'Pilotis',
    sujet: 'Les maisons d’architecte.',
    addition: 'L’entretien d’une architecture signée.',
    ouverte: false,
    matiere: { backgroundColor: '#f6f2e9', backgroundImage: 'linear-gradient(#211C15, #211C15), repeating-linear-gradient(90deg, transparent 0 58px, #211C15 58px 62px)', backgroundSize: '100% 38%, 100% 100%', backgroundRepeat: 'no-repeat, repeat', backgroundPosition: 'top, 0 0' },
  },
  {
    slug: 'cour-pavee',
    nom: 'Cour pavée',
    sujet: 'Les maisons et les ateliers en fond de cour.',
    addition: 'Le prix du calme, comparé à celui de l’étage.',
    ouverte: false,
    matiere: { backgroundColor: '#6b655c', backgroundImage: 'radial-gradient(ellipse at center, #a59e92 0 58%, transparent 60%)', backgroundSize: '24px 19px' },
  },
  {
    slug: 'pierre-seche',
    nom: 'Pierre sèche',
    sujet: 'Les granges, les moulins et les chapelles, loin de Paris.',
    addition: 'Le prix complet d’une vie à deux adresses.',
    ouverte: false,
    matiere: { backgroundColor: '#d9c69c', backgroundImage: joints('#a8946c', 34, 13) },
  },
];

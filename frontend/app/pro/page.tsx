import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft, Eye, MousePointerClick, Sparkles } from 'lucide-react';
import ProForm from './ProForm';

export const metadata = {
  title: 'Agences : présentez vos biens atypiques · Loftissime',
  description:
    'Loftissime, le premier hub d’annonces immobilières atypiques. Présentez vos biens à des acheteurs qui cherchent précisément cela. Gratuit pendant le lancement.',
  alternates: { canonical: '/pro' },
};

const pillars = [
  {
    icon: Eye,
    title: 'Visibilité',
    items: [
      'Un site entièrement dédié aux biens atypiques',
      'Une page agence qui rassemble tous vos biens',
      'Vos biens classés par catégorie et par ville',
    ],
  },
  {
    icon: MousePointerClick,
    title: 'Contacts directs',
    items: [
      'Chaque fiche affiche votre agence en bonne place',
      'Un lien direct vers votre annonce d’origine',
      'Les acheteurs vous contactent, sans intermédiaire',
    ],
  },
  {
    icon: Sparkles,
    title: 'Sélection exigeante',
    items: [
      'Seuls les biens au caractère marqué sont publiés',
      'Une charte de sélection publique et transparente',
      'Un cadre qui valorise vos mandats les plus rares',
    ],
  },
];

const steps = [
  { n: '1', title: 'Vous nous écrivez', text: 'Présentez votre agence et le type de biens atypiques que vous représentez.' },
  { n: '2', title: 'Nous choisissons ensemble', text: 'Nous retenons les biens qui répondent à la charte Loftissime.' },
  { n: '3', title: 'Vos biens sont publiés', text: 'Chaque fiche porte votre nom et renvoie vers votre annonce d’origine.' },
];

const weDo = [
  'Nous référençons vos biens atypiques, sélectionnés selon la charte Loftissime.',
  'Chaque fiche affiche le nom de votre agence, celui du négociateur en charge du bien et son numéro de téléphone.',
  'Les acheteurs appellent directement le négociateur ou lui demandent d’être rappelés.',
  'Chaque fiche renvoie vers votre annonce d’origine, qui reste la référence.',
  'Nous retirons un bien dès qu’il est vendu, ou sur simple demande de votre part.',
];

const weDont = [
  'Nous ne sommes pas une agence : nous ne prenons aucun mandat et n’intervenons dans aucune transaction.',
  'Nous ne nous interposons pas entre l’acheteur et votre négociateur.',
  'Nous ne contactons jamais vos vendeurs.',
  'Nous ne communiquons jamais l’adresse d’un bien, que nous ne connaissons d’ailleurs pas.',
];

const doors = [
  {
    n: '1',
    title: 'Une origine singulière',
    text: 'Le lieu a eu une autre vie avant d’être habité : loft, atelier d’artiste, ancienne usine, entrepôt, imprimerie, chapelle, presbytère, moulin, grange, chai, écurie, bergerie, péniche, maison troglodyte.',
  },
  {
    n: '2',
    title: 'Une signature',
    text: 'Le lieu a été conçu ou transformé avec un parti pris fort : maison ou villa d’architecte, appartement repensé par un architecte ou un architecte d’intérieur, construction marquante de son époque, des années 30 aux années 70. La signature peut aussi être celle d’un propriétaire qui a aménagé son lieu avec une vraie personnalité.',
  },
  {
    n: '3',
    title: 'Un caractère rare',
    text: 'Le lieu se distingue par son volume (grande hauteur sous plafond,

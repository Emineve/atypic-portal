import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft, Eye, Megaphone, MousePointerClick, Sparkles } from 'lucide-react';
import ProForm from './ProForm';
import logiciels from './logiciels.png';
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
    highlight: false,
    items: [
      'Un site entièrement dédié aux biens atypiques',
      'Une page agence qui rassemble tous vos biens',
      'Vos biens classés par catégorie et par ville',
    ],
  },
  {
    icon: MousePointerClick,
    title: 'Contacts directs',
    highlight: true,
    items: [
      'Chaque annonce affiche votre agence en bonne place',
      'Un lien direct vers votre annonce d’origine',
      'Les acheteurs vous contactent, sans intermédiaire',
    ],
  },
  {
    icon: Sparkles,
    title: 'Sélection exigeante',
    highlight: false,
    items: [
      'Une charte de sélection précise et publique',
      'Un bien répond à la charte, ou n’y répond pas',
      'Un cadre qui valorise vos mandats les plus rares',
    ],
  },
];

const steps = [
  { n: '1', text: 'Création d’une passerelle avec votre logiciel de diffusion, ou dépôt d’annonce sur votre espace Pro.' },
  { n: '2', text: 'Envoi de vos annonces par notification aux utilisateurs, en temps réel.' },
  { n: '3', text: 'Gestion de tous vos contacts sur votre compte Loftissime Pro, et envoi direct des leads acquéreurs par email ou SMS.' },
];

const faq: { q: string; a: string; points?: string[] }[] = [
  {
    q: 'Que fait Loftissime pour mon agence ?',
    a: 'Loftissime référence vos biens atypiques selon la charte et met les acheteurs en contact direct avec vos négociateurs :',
    points: [
      'Chaque annonce affiche votre agence, le négociateur et son téléphone.',
      'Chaque annonce renvoie vers celle de votre site.',
      'Un bien est retiré dès qu’il est vendu.',
    ],
  },
  {
    q: 'Combien cela coûte-t-il ?',
    a: 'La participation est gratuite pendant la phase de lancement. Toute évolution des conditions vous sera communiquée à l’avance, sans engagement de votre part.',
  },
  {
    q: 'Comment vous transmettre mes annonces ?',
    a: 'Automatiquement, via votre logiciel de diffusion ou par un lien XML.',
    points: ['Passerelle en direct avec votre logiciel', 'Publication et mise à jour en temps réel', 'Support technique dédié'],
  },
  {
    q: 'Comment diffuser mes annonces sur Loftissime ?',
    a: 'Remplissez le formulaire ci-dessous : nous revenons vers vous rapidement.',
  },
];

export default function ProPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-5">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5

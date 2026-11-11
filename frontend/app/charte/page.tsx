import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '../Logo';

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
        a: 'Uniquement des biens atypiques à vendre. Un bien entre dans la sélection s’il répond à l’un de ces trois critères :',
        points: [
          'Une origine singulière. Le lieu a eu une autre vie avant d’être habité : loft, atelier d’artiste, ancienne usine, entrepôt, imprimerie, chapelle, presbytère, moulin, grange, chai, écurie, bergerie, péniche, maison troglodyte.',
          'Une signature. Le lieu a été conçu ou transformé avec un parti pris fort : maison ou villa d’architecte, appartement repensé par un architecte, construction marquante de son époque, ou lieu aménagé par un propriétaire avec une vraie personnalité.',
          'Un caractère rare. Le lieu se distingue par son volume (grande hauteur sous plafond, verrière, duplex, triplex, souplex), par sa situation (dernier étage, toit-terrasse, terrasse, vue dégagée, jardin en ville, bord de l’eau) ou par son histoire (hôtel particulier, château, manoir, maison de maître, bastide, mas, longère, chaumière, et tout bien ancien qui a su garder son caractère).',
        ],
      },
      {
        q: 'Le prix est-il un critère ?',
        a: 'Non. Le prix d’un bien n’entre pas en compte dans la sélection. Seul son caractère atypique compte.',
      },
      {
        q: 'Quels biens ne sont pas diffusés ?',
        a: 'Tous les logements qui n’entrent pas dans la charte des biens atypiques.',
      },
      {
        q: 'Les biens présentés sont-ils réellement à vendre ?',
        a: 'Oui. Tous les biens proposés sont en cours de commercialisation. Un bien est retiré dès qu’il est vendu.',
      },
      {
        q: 'La charte est-elle la même pour toutes les agences ?',
        a: 'Oui. Elle s’applique de la même façon à toutes les agences. Un bien qui n’y répond pas n’est pas diffusé.',
      },
    ],
  },
  {
    id: 'fonctionnement',
    title: 'Le fonctionnement du site',
    items: [
      {
        q: 'Loftissime est-elle une agence immobilière ?',
        a: 'Non. Loftissime ne prend aucun mandat et n’intervient dans aucune transaction. Sa position est neutre et son seul objectif est de mettre en relation les acheteurs et les négociateurs en charge des biens.',
      },
      {
        q: 'Comment contacter la personne en charge d’un bien ?',
        a: 'Chaque annonce affiche l’agence, le négociateur et son téléphone. Vous pouvez l’appeler directement ou lui demander de vous rappeler au moment

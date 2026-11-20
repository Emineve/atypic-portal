'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AlertDialog from '../AlertDialog';
import StepDeck from '../StepDeck';
import { MODE_EMPLOI_KEY } from '../ModeEmploiBack';
import { typo } from '../../lib/typo';

// Le mode d'emploi, une étape à la fois : un titre, deux phrases, un lien pour le faire tout de suite.
const STEPS: { title: string; text: string; link: string; href: string }[] = [
  {
    title: 'Cherchez large',
    text: 'Un atelier peut être un loft, une maison se cacher au fond d’une cour. Commencez par le lieu et le budget, affinez ensuite : avec trop de critères, le bon bien ne s’affiche jamais.',
    link: 'Lancer ma recherche',
    href: '/?criteres=1',
  },
  {
    title: 'Créez votre alerte',
    text: 'C’est le geste le plus utile du site. Quelques secondes, et les nouveaux biens viennent à vous au lieu de vous attendre.',
    link: 'Créer mon alerte',
    href: 'alerte',
  },
  {
    title: 'Confiez votre recherche à plusieurs agences',
    text: 'Une agence connaît parfois un bien avant qu’il soit en ligne. Ouvrez la page de celles qui vous intéressent et partagez vos critères : rien ne part sans vous.',
    link: 'Voir les agences',
    href: '/agence',
  },
  {
    title: 'Gardez vos coups de cœur',
    text: 'Un clic sur le cœur, et le bien est dans vos favoris. Vous les comparez à tête reposée, sans les rechercher.',
    link: 'Choisir mes favoris',
    href: '/',
  },
  {
    title: 'Faites-vous rappeler',
    text: 'Un bien rare se visite dans les premiers jours. Laissez votre numéro depuis sa fiche, ou demandez à être rappelé pour tous vos favoris d’un seul geste.',
    link: 'Trouver un bien à visiter',
    href: '/',
  },
  {
    title: 'Faites vos comptes',
    text: 'La fiche détaille le prix, les frais et ce que le bien coûte chaque mois. Reste votre mensualité, à estimer avant la visite plutôt qu’après.',
    link: 'Estimer ma mensualité',
    href: '/financement',
  },
  {
    title: 'Préparez la visite',
    text: 'État des lieux vous donne les questions à poser devant un souplex, un loft ou une péniche. Envoyez la liste vers vos notes et gardez-la sous la main le jour J.',
    link: 'Lire les questions à poser',
    href: '/guide/questions-a-poser-visite-bien-atypique',
  },
];

const action =
  'inline-flex items-center gap-1.5 text-base font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';

export default function ModeEmploiSteps() {
  const [step, setStep] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);

  // Retour depuis une autre page : on reprend à l'étape quittée, et le lien de retour s'efface
  useEffect(() => {
    try {
      const saved = Number((sessionStorage.getItem(MODE_EMPLOI_KEY) || '').split('|')[0] || NaN);
      if (Number.isInteger(saved) && saved > 0 && saved < STEPS.length) setStep(saved);
      sessionStorage.removeItem(MODE_EMPLOI_KEY);
    } catch {
      /* ignoré */
    }
  }, []);
  const leave = (index: number, href: string) => {
    try {
      sessionStorage.setItem(MODE_EMPLOI_KEY, `${index}|${href.split(/[?#]/)[0]}`);
    } catch {
      /* ignoré */
    }
  };

  const Action = ({ s }: { s: (typeof STEPS)[number] }) =>
    s.href === 'alerte' ? (
      <button type="button" onClick={() => setAlertOpen(true)} className={action}>
        {s.link}
        <ArrowRight className="w-4 h-4" />
      </button>
    ) : (
      <Link href={s.href} onClick={() => leave(STEPS.indexOf(s), s.href)} className={action}>
        {s.link}
        <ArrowRight className="w-4 h-4" />
      </Link>
    );

  return (
    <>
      <StepDeck
        items={STEPS.map((x) => ({ title: x.title, text: x.text, extra: <p className="mt-5"><Action s={x} /></p> }))}
        step={step}
        onStep={setStep}
        word="Étape"
        listLabel="Étapes"
        format={typo}
      />
      <AlertDialog open={alertOpen} onClose={() => setAlertOpen(false)} source="mode-emploi" suggestions={[]} />
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AlertDialog from '../AlertDialog';
import { MODE_EMPLOI_KEY } from '../ModeEmploiBack';

// Le mode d'emploi, une étape à la fois : un titre, deux phrases, un lien pour le faire tout de suite.
const STEPS: { title: string; text: string; link: string; href: string }[] = [
  {
    title: 'Cherchez large',
    text: 'Un atelier peut être un loft, une maison se cacher au fond d’une cour. Commencez par le lieu et le budget, affinez ensuite : avec trop de critères, le bon bien ne s’affiche jamais.',
    link: 'Lancer ma recherche',
    href: '/',
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
  const [all, setAll] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // Retour depuis une autre page : on reprend à l'étape quittée, et le lien de retour s'efface
  useEffect(() => {
    try {
      const saved = Number(sessionStorage.getItem(MODE_EMPLOI_KEY));
      if (Number.isInteger(saved) && saved > 0 && saved < STEPS.length) setStep(saved);
      sessionStorage.removeItem(MODE_EMPLOI_KEY);
    } catch {
      /* ignoré */
    }
  }, []);
  const leave = (index: number) => {
    try {
      sessionStorage.setItem(MODE_EMPLOI_KEY, String(index));
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
      <Link href={s.href} onClick={() => leave(STEPS.indexOf(s))} className={action}>
        {s.link}
        <ArrowRight className="w-4 h-4" />
      </Link>
    );

  const current = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <>
      <div className="rounded-[14px] border border-stone-200 bg-white p-6 md:p-10">
        {all ? (
          <ol className="divide-y divide-stone-200">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 py-6 first:pt-0 last:pb-0">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#F4E7B5] text-sm font-medium text-stone-900">{i + 1}</span>
                <div>
                  <h2 className="font-serif text-2xl leading-snug text-stone-900">{s.title}</h2>
                  <p className="mt-2 max-w-2xl text-base font-light leading-relaxed text-stone-600">{s.text}</p>
                  <p className="mt-3">
                    <Action s={s} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="min-h-[15rem] md:min-h-[13rem]" aria-live="polite">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight text-stone-900">{current.title}</h2>
            <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-stone-600">{current.text}</p>
            <p className="mt-5">
              <Action s={current} />
            </p>
          </div>
        )}

        {!all && (
          <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Étapes">
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === step}
                aria-label={`Étape ${i + 1} : ${s.title}`}
                onClick={() => setStep(i)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                  i === step ? 'bg-[#F4E7B5] text-stone-900' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition"
          >
            {all ? 'Revenir étape par étape' : 'Voir toutes les étapes'}
          </button>
          {!all && (
            <button
              type="button"
              onClick={() => setStep(last ? 0 : step + 1)}
              className="inline-flex h-12 items-center rounded-[10px] bg-stone-900 px-8 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-stone-800"
            >
              {last ? 'Recommencer' : 'Suivant'}
            </button>
          )}
        </div>
      </div>
      <AlertDialog open={alertOpen} onClose={() => setAlertOpen(false)} source="mode-emploi" suggestions={[]} />
    </>
  );
}

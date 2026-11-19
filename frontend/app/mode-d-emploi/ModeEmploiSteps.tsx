'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AlertDialog from '../AlertDialog';

// Trois moments de la recherche ; chaque ligne est une action, pas un conseil à lire.
const STAGES: { title: string; steps: [string, string][] }[] = [
  {
    title: 'Je cherche',
    steps: [
      ['Lancer ma recherche, large d’abord', '/'],
      ['Créer mon alerte', 'alerte'],
      ['Confier ma recherche à plusieurs agences', '/agence'],
    ],
  },
  {
    title: 'J’ai repéré un bien',
    steps: [
      ['Le garder dans mes favoris', '/'],
      ['Me faire rappeler par l’agence', '/'],
      ['Estimer ma mensualité', '/financement'],
    ],
  },
  {
    title: 'Je visite',
    steps: [
      ['Lire les questions à poser', '/guide/questions-a-poser-visite-bien-atypique'],
      ['Savoir ce que j’achète : souplex, loft, péniche', '/guide'],
      ['Repérer les travaux non déclarés', '/guide/travaux-non-declares'],
      ['Imaginer ce que je pourrais en faire', '/inspiration'],
    ],
  },
];

const row = 'group flex w-full items-center justify-between gap-4 py-4 text-left text-lg text-stone-900';
const label = 'underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900 transition';
const arrow = 'w-4 h-4 flex-none text-stone-400 group-hover:text-stone-900 transition';

// Les étapes du mode d'emploi. L'alerte s'ouvre sur place, pour reprendre la lecture ensuite.
export default function ModeEmploiSteps() {
  const [alertOpen, setAlertOpen] = useState(false);
  return (
    <>
      <div className="space-y-12 md:space-y-16">
      {STAGES.map((s, i) => (
        <section key={s.title}>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-stone-900">
            <span className="mr-3 text-stone-400" aria-hidden="true">{i + 1}</span>
            {s.title}
          </h2>
          <ul className="mt-5 divide-y divide-stone-200 border-t border-stone-200">
            {s.steps.map(([text, href]) => (
              <li key={text}>
                {href === 'alerte' ? (
                  <button type="button" onClick={() => setAlertOpen(true)} className={row}>
                    <span className={label}>{text}</span>
                    <ArrowRight className={arrow} />
                  </button>
                ) : (
                  <Link href={href} className={row}>
                    <span className={label}>{text}</span>
                    <ArrowRight className={arrow} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
      </div>
      <AlertDialog open={alertOpen} onClose={() => setAlertOpen(false)} source="mode-emploi" suggestions={[]} />
    </>
  );
}

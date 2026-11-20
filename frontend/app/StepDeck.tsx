'use client';

import { useState } from 'react';

// Un parcours en étapes, le même pour le mode d'emploi des acheteurs et les engagements pris envers les agences.
// Ordinateur : la liste des étapes à gauche, l'étape ouverte à droite. Téléphone : une étape à la fois, des pastilles pour passer de l'une à l'autre.
export type DeckItem = { title: string; text: string; extra?: React.ReactNode };

const btn = 'inline-flex h-12 items-center rounded-[10px] bg-stone-900 px-8 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-stone-800';
const toggle = 'text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';

export default function StepDeck({
  items,
  step,
  onStep,
  word,
  listLabel,
  allLabel,
  backLabel,
  final,
  format = (t) => t,
}: {
  items: DeckItem[];
  step: number;
  onStep: (i: number) => void;
  word: string; // « Étape », « Engagement »
  listLabel: string;
  allLabel: string;
  backLabel: string;
  final?: React.ReactNode; // ce qui remplace « Suivant » à la dernière étape et dans la vue d'ensemble
  format?: (t: string) => string;
}) {
  const [all, setAll] = useState(false);
  const current = items[step];
  const last = step === items.length - 1;

  const footer = (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <button type="button" onClick={() => setAll((v) => !v)} className={toggle}>
        {all ? backLabel : allLabel}
      </button>
      {all || last ? (
        final || (
          !all && (
            <button type="button" onClick={() => onStep(0)} className={btn}>
              Recommencer
            </button>
          )
        )
      ) : (
        <button type="button" onClick={() => onStep(step + 1)} className={btn}>
          Suivant
        </button>
      )}
    </div>
  );

  if (all) {
    return (
      <div className="rounded-[14px] border border-stone-200 bg-white p-6 md:p-10">
        <ol className="divide-y divide-stone-200">
          {items.map((s, i) => (
            <li key={s.title} className="flex gap-4 py-6 first:pt-0 last:pb-0">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#F4E7B5] text-sm font-medium text-stone-900">{i + 1}</span>
              <div>
                <h2 className="font-serif text-2xl leading-snug text-stone-900">{s.title}</h2>
                <p className="mt-2 max-w-2xl text-base font-light leading-relaxed text-stone-600">{format(s.text)}</p>
                {s.extra}
              </div>
            </li>
          ))}
        </ol>
        {footer}
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-stone-200 bg-white md:grid md:grid-cols-[19rem_1fr]">
      {/* Ordinateur : toutes les étapes d'un coup d'œil */}
      <ol className="hidden md:block border-r border-stone-200 p-4" role="tablist" aria-label={listLabel}>
        {items.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              role="tab"
              aria-selected={i === step}
              onClick={() => onStep(i)}
              className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-3 text-left transition ${i === step ? 'bg-stone-100' : 'hover:bg-stone-50'}`}
            >
              <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-sm font-medium ${i === step ? 'bg-[#F4E7B5] text-stone-900' : 'bg-stone-100 text-stone-500'}`}>{i + 1}</span>
              <span className={`text-[15px] leading-snug ${i === step ? 'font-medium text-stone-900' : 'text-stone-500'}`}>{s.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="flex flex-col p-6 md:p-10">
        <div className="min-h-[15rem] md:min-h-[17rem] flex-1" aria-live="polite">
          <p className="text-xs uppercase tracking-widest text-stone-500">
            {word} {step + 1} sur {items.length}
          </p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight tracking-tight text-stone-900">{current.title}</h2>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-stone-600">{format(current.text)}</p>
          {current.extra}
        </div>

        {/* Téléphone : des pastilles pour passer d'une étape à l'autre */}
        <div className="mt-8 flex flex-wrap gap-2.5 md:hidden" role="tablist" aria-label={listLabel}>
          {items.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === step}
              aria-label={`${word} ${i + 1} : ${s.title}`}
              onClick={() => onStep(i)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                i === step ? 'bg-[#F4E7B5] text-stone-900' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {footer}
      </div>
    </div>
  );
}

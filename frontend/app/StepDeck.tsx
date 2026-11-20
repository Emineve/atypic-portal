'use client';

// Un parcours en étapes, le même pour le mode d'emploi des acheteurs et les engagements pris envers les agences.
// Toutes les étapes sont visibles d'un coup d'œil ; une seule est dépliée à la fois, on en ouvre une autre en la touchant.
export type DeckItem = { title: string; text: string; extra?: React.ReactNode };

export default function StepDeck({
  items,
  step,
  onStep,
  word,
  listLabel,
  final,
  format = (t) => t,
}: {
  items: DeckItem[];
  step: number;
  onStep: (i: number) => void;
  word: string; // « Étape », « Engagement »
  listLabel: string;
  final?: React.ReactNode; // l'action proposée après la dernière étape
  format?: (t: string) => string;
}) {
  return (
    <div className="max-w-3xl">
      <ol className="space-y-2.5" aria-label={listLabel}>
        {items.map((s, i) => {
          const open = i === step;
          return (
            <li
              key={s.title}
              className={`rounded-[14px] border bg-white transition ${
                open ? 'border-stone-200 shadow-[0_14px_36px_-16px_rgba(28,25,23,0.28)]' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`deck-${i}`}
                aria-label={`${word} ${i + 1} : ${s.title}`}
                onClick={() => onStep(i)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6"
              >
                <span
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-full text-sm font-medium transition ${
                    open ? 'bg-[#F4E7B5] text-stone-900' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`flex-1 font-serif text-xl leading-tight tracking-tight md:text-2xl ${open ? 'text-stone-900' : 'text-stone-600'}`}>{s.title}</span>
                {!open && <span className="flex-none text-2xl leading-none text-stone-400" aria-hidden="true">+</span>}
              </button>
              {open && (
                <div id={`deck-${i}`} className="px-5 pb-6 md:pl-[4.75rem] md:pr-8">
                  <p className="max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg md:font-light">{format(s.text)}</p>
                  {s.extra}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {final && <div className="mt-6 flex justify-end">{final}</div>}
    </div>
  );
}

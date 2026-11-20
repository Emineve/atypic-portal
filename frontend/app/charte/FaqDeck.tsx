'use client';

import { useEffect, useState } from 'react';
import { typo } from '../../lib/typo';

// Les questions fréquentes, rangées comme le mode d'emploi : les rubriques à gauche, les questions de la rubrique ouverte à droite.
export type FaqItem = { q: string; a: string; points?: string[]; table?: { lead?: string; head: [string, string, string]; rows: [string, string, string][] } };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export default function FaqDeck({ groups }: { groups: FaqGroup[] }) {
  const [active, setActive] = useState(0);

  // Un lien du type /charte#donnees ouvre directement la bonne rubrique
  useEffect(() => {
    const open = () => {
      const i = groups.findIndex((g) => g.id === window.location.hash.slice(1));
      if (i >= 0) setActive(i);
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, [groups]);

  const g = groups[active];
  return (
    <div className="rounded-[14px] border border-stone-200 bg-white md:grid md:grid-cols-[19rem_1fr]">
      <ol className="hidden md:block border-r border-stone-200 p-4" role="tablist" aria-label="Rubriques">
        {groups.map((x, i) => (
          <li key={x.id}>
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-3 text-left transition ${i === active ? 'bg-stone-100' : 'hover:bg-stone-50'}`}
            >
              <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-sm font-medium ${i === active ? 'bg-[#F4E7B5] text-stone-900' : 'bg-stone-100 text-stone-500'}`}>{i + 1}</span>
              <span className={`text-[15px] leading-snug ${i === active ? 'font-medium text-stone-900' : 'text-stone-500'}`}>{x.title}</span>
              <span className="ml-auto text-xs text-stone-400">{x.items.length}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="p-6 md:p-10" id={g.id}>
        {/* Téléphone : des pastilles pour changer de rubrique */}
        <div className="mb-6 flex flex-wrap gap-1.5 md:hidden" role="tablist" aria-label="Rubriques">
          {groups.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={x.title}
              onClick={() => setActive(i)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition ${i === active ? 'bg-[#F4E7B5] text-stone-900' : 'bg-stone-100 text-stone-500'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p className="text-xs uppercase tracking-widest text-stone-500 md:hidden">
          Rubrique {active + 1} sur {groups.length}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-stone-900 md:sr-only">{g.title}</h2>
        <div key={g.id} className="mt-6 divide-y divide-stone-200 border-y border-stone-200 md:mt-0 md:border-t-0 md:[&>details:first-child]:pt-0">
          {g.items.map((it) => (
                    <details key={it.q} className="group py-5">
                      <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-lg font-medium text-stone-900">
                        {typo(it.q)}
                        <span className="text-stone-400 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
                      </summary>
                      <p className="mt-3 max-w-2xl text-lg font-light leading-relaxed text-stone-600">{typo(it.a)}</p>
                      {it.table && (
                        <>
                          {/* Téléphone : une fiche par cas. Écran large : un vrai tableau. */}
                          <ul className="mt-4 space-y-3 sm:hidden">
                            {it.table.rows.map((r) => (
                              <li key={r[0]} className="rounded-[14px] border border-stone-200 bg-white p-4">
                                <p className="font-medium leading-snug text-stone-900">{typo(`${it.table!.lead || ''}${r[0]}`)}</p>
                                <p className="mt-3 text-[10px] uppercase tracking-widest text-stone-500">{it.table!.head[1]}</p>
                                <p className="mt-0.5 text-stone-900">{typo(r[1])}</p>
                                <p className="mt-3 text-[10px] uppercase tracking-widest text-stone-500">{it.table!.head[2]}</p>
                                <p className="mt-0.5 text-stone-600">{typo(r[2])}</p>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 hidden sm:block overflow-hidden rounded-[14px] border border-stone-200 bg-white">
                            <table className="w-full text-left text-[15px] leading-snug">
                              <thead>
                                <tr className="text-[10px] uppercase tracking-widest text-stone-500">
                                  {it.table.head.map((h) => (
                                    <th key={h} className="px-5 py-3 font-normal">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {it.table.rows.map((r) => (
                                  <tr key={r[0]} className="border-t border-stone-200 align-top">
                                    <td className="px-5 py-3.5 text-stone-900">{typo(r[0])}</td>
                                    <td className="px-5 py-3.5 font-medium text-stone-900">{typo(r[1])}</td>
                                    <td className="px-5 py-3.5 text-stone-600">{typo(r[2])}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                      {it.points && (
                        <ul className="mt-3 max-w-2xl space-y-2 text-lg font-light leading-relaxed text-stone-600">
                          {it.points.map((pt) => (
                            <li key={pt} className="flex gap-2"><span aria-hidden="true">·</span><span>{typo(pt)}</span></li>
                          ))}
                        </ul>
                      )}
                    </details>
          ))}
        </div>
      </div>
    </div>
  );
}

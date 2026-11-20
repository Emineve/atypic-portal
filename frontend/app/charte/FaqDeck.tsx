'use client';

import { useEffect, useMemo, useState } from 'react';
import { typo } from '../../lib/typo';

// Les questions fréquentes : une recherche, des rubriques en pastilles, une seule réponse ouverte à la fois.
export type FaqItem = { q: string; a: string; points?: string[]; table?: { lead?: string; head: [string, string, string]; rows: [string, string, string][] } };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

const plain = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function Answer({ it }: { it: FaqItem }) {
  return (
    <>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">{typo(it.a)}</p>
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
          <ul className="mt-3 max-w-2xl space-y-2 text-base leading-relaxed text-stone-600">
            {it.points.map((pt) => (
              <li key={pt} className="flex gap-2"><span aria-hidden="true">·</span><span>{typo(pt)}</span></li>
            ))}
          </ul>
        )}
    </>
  );
}

export default function FaqDeck({ groups }: { groups: FaqGroup[] }) {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState('');

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

  // Recherche : dans toutes les rubriques à la fois, tous les mots saisis doivent s'y trouver
  const words = plain(query).split(/\s+/).filter((w) => w.length > 1);
  const searching = words.length > 0;
  const found = useMemo(
    () =>
      searching
        ? groups.flatMap((g) =>
            g.items
              .filter((it) => {
                const hay = plain([it.q, it.a, ...(it.points || []), ...(it.table ? it.table.rows.flat() : [])].join(' '));
                return words.every((w) => hay.includes(w));
              })
              .map((it) => ({ it, rubric: g.title }))
          )
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, groups]
  );

  const g = groups[active];
  const list = searching ? found : g.items.map((it) => ({ it, rubric: '' }));

  return (
    <div className="max-w-3xl">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une question"
        aria-label="Rechercher une question"
        className="no-autofill-tint h-12 w-full rounded-full border border-stone-300 bg-white px-5 text-base text-stone-900 placeholder:text-stone-500 focus:border-stone-900 focus:outline-none"
      />

      {!searching && (
        <div className="-mx-6 mt-5 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Rubriques">
          {groups.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`h-10 flex-none whitespace-nowrap rounded-full border px-4 text-sm transition ${
                i === active
                  ? 'border-[#F4E7B5] bg-[#F4E7B5] font-medium text-stone-900'
                  : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {x.title}
            </button>
          ))}
        </div>
      )}

      <h2 className="sr-only">{searching ? 'Résultats de la recherche' : g.title}</h2>
      {searching && (
        <p className="mt-5 text-sm text-stone-500" aria-live="polite">
          {found.length === 0
            ? 'Aucune question ne correspond. Essayez un autre mot.'
            : found.length === 1
            ? '1 question correspond.'
            : `${found.length} questions correspondent.`}
        </p>
      )}

      <div key={searching ? 'recherche' : g.id} id={g.id} className="mt-5 space-y-2.5">
        {list.map(({ it, rubric }) => (
          <details
            key={it.q}
            name="faq"
            className="group rounded-[14px] border border-stone-200 bg-white px-5 transition open:shadow-[0_14px_36px_-16px_rgba(28,25,23,0.28)] hover:border-stone-300 md:px-6"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-900 md:text-[17px] [&::-webkit-details-marker]:hidden">
              <span>
                {rubric && <span className="mb-0.5 block text-xs font-normal text-stone-500">{rubric}</span>}
                {typo(it.q)}
              </span>
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-stone-100 text-xl leading-none text-stone-600 transition-transform group-open:rotate-45 group-open:bg-[#F4E7B5] group-open:text-stone-900" aria-hidden="true">+</span>
            </summary>
            <div className="pb-5">
              <Answer it={it} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

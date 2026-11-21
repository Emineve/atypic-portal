'use client';

import { typo } from '../../lib/typo';

// Les questions fréquentes : un sommaire en liens, puis toutes les rubriques l'une sous l'autre.
export type FaqItem = { q: string; a: string; points?: string[]; table?: { lead?: string; head: [string, string, string]; rows: [string, string, string][] } };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

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
  return (
    <div className="max-w-3xl">
      {/* Sommaire : les rubriques en liens, qui passent à la ligne. Rien à faire défiler de côté. */}
      <nav aria-label="Rubriques">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {groups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 transition">
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Toutes les rubriques l'une sous l'autre, chacune avec ses questions ; une seule réponse ouverte à la fois */}
      {groups.map((g) => (
        <section key={g.id} id={g.id} className="mt-12 scroll-mt-24">
          <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">{g.title}</h2>
          <div className="mt-4 space-y-2.5">
            {g.items.map((it) => (
              <details
                key={it.q}
                name="faq"
                className="group rounded-[14px] border border-stone-200 bg-white px-5 transition open:shadow-[0_14px_36px_-16px_rgba(28,25,23,0.28)] hover:border-stone-300 md:px-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-900 md:text-[17px] [&::-webkit-details-marker]:hidden">
                  <span>{typo(it.q)}</span>
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-stone-100 text-xl leading-none text-stone-600 transition-transform group-open:rotate-45 group-open:bg-[#F6CF4E] group-open:text-stone-900" aria-hidden="true">+</span>
                </summary>
                <div className="pb-5">
                  <Answer it={it} />
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

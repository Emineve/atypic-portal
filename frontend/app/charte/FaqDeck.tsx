'use client';

import { useEffect, useState } from 'react';
import { typo } from '../../lib/typo';
import { KeyRound, Gem, Compass, Heart, ArrowDownUp, Lock } from 'lucide-react';

// Un petit picto par rubrique, devant son lien dans le sommaire
const ICONS: Record<string, typeof KeyRound> = { acheter: KeyRound, selection: Gem, fonctionnement: Compass, demandes: Heart, classement: ArrowDownUp, donnees: Lock };
function Icon({ id, active }: { id: string; active: boolean }) {
  const I = ICONS[id] || Compass;
  // Le picto vit dans un rond : jaune pour la rubrique en cours de lecture
  return (
    <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-full transition-colors ${active ? 'bg-[#F6CF4E] text-stone-900' : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200'}`} aria-hidden="true">
      <I className="h-4 w-4" strokeWidth={1.5} />
    </span>
  );
}

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
                  <p className="mt-3 text-xs uppercase tracking-widest text-stone-500">{it.table!.head[1]}</p>
                  <p className="mt-0.5 text-stone-900">{typo(r[1])}</p>
                  <p className="mt-3 text-xs uppercase tracking-widest text-stone-500">{it.table!.head[2]}</p>
                  <p className="mt-0.5 text-stone-600">{typo(r[2])}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 hidden sm:block overflow-hidden rounded-[14px] border border-stone-200 bg-white">
              <table className="w-full text-left text-[15px] leading-snug">
                <thead>
                  <tr className="text-xs uppercase tracking-widest text-stone-500">
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
  // Rubrique en cours de lecture : celle dont le titre a passé le haut de l'écran en dernier
  const [active, setActive] = useState(groups[0]?.id || '');
  useEffect(() => {
    const update = () => {
      let current = groups[0]?.id || '';
      for (const g of groups) {
        const el = document.getElementById(g.id);
        if (el && el.getBoundingClientRect().top < 180) current = g.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [groups]);

  // Clic sur une rubrique : on y glisse en douceur, sans saut
  function go(e: React.MouseEvent, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  }

  return (
    <div className="lg:grid lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-12 lg:items-start">
      {/* Sommaire : les rubriques en liens. Sur grand écran, il reste affiché à gauche pendant la lecture. */}
      <nav aria-label="Rubriques" className="lg:sticky lg:top-24">
        <ul className="flex flex-col gap-1">
          {groups.map((g) => {
            const on = active === g.id;
            return (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  onClick={(e) => go(e, g.id)}
                  aria-current={on ? 'true' : undefined}
                  className={`group flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-[15px] transition-colors ${on ? 'bg-white font-medium text-stone-900' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  <Icon id={g.id} active={on} />
                  <span className="flex-1">{g.title}</span>
                  <span className={`text-xs tabular-nums ${on ? 'text-stone-900' : 'text-stone-500'}`}>{g.items.length}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="max-w-3xl lg:-mt-12">
      {/* Toutes les rubriques l'une sous l'autre, chacune avec ses questions ; une seule réponse ouverte à la fois */}
      {groups.map((g) => (
        <section key={g.id} id={g.id} className="mt-12 scroll-mt-24 lg:mt-10 lg:border-t lg:border-stone-200 lg:pt-10 lg:first:mt-12 lg:first:border-0 lg:first:pt-0">
          {/* Grand écran : le sommaire de gauche dit déjà la rubrique en cours, le titre n'est gardé que pour les lecteurs d'écran */}
          <h2 className="font-serif text-2xl text-stone-900 md:text-3xl lg:sr-only">{g.title}</h2>
          <div className="mt-4 space-y-2.5 lg:mt-0">
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
    </div>
  );
}

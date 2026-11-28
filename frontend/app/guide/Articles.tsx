'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import GuideArt, { type GuideArtKey } from './GuideArt';
import { typo } from '../../lib/typo';

// La page « Articles » : on choisit une rubrique, on tape un mot, la liste se réduit. Tout se passe sur la page.

export type ArticleCard = { slug: string; art: GuideArtKey; title: string; description: string; category: string; date: string; minutes: number };

const plain = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const PAS = 12;

export default function Articles({ articles, rubriques }: { articles: ArticleCard[]; rubriques: { name: string; anchor: string }[] }) {
  const [rubrique, setRubrique] = useState('');
  const [q, setQ] = useState('');
  const [max, setMax] = useState(PAS);

  // Une rubrique peut arriver par l'adresse : /guide?rubrique=financement
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get('rubrique');
    const hit = rubriques.find((x) => x.anchor === r);
    if (hit) setRubrique(hit.name);
  }, [rubriques]);

  const liste = useMemo(() => {
    const mots = plain(q).split(/\s+/).filter((m) => m.length >= 2);
    return articles.filter((a) => (!rubrique || a.category === rubrique) && mots.every((m) => plain(`${a.title} ${a.description}`).includes(m)));
  }, [articles, rubrique, q]);

  const choisir = (name: string) => {
    setRubrique(name);
    setMax(PAS);
  };
  const pastille = (on: boolean) =>
    `inline-flex h-10 items-center rounded-full border px-4 text-[15px] transition-colors ${on ? 'border-stone-900 bg-[#F6CF4E] font-medium text-stone-900' : 'border-stone-300 bg-white text-stone-900 [@media(hover:hover)]:hover:border-stone-900'}`;

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Rubriques">
        <button type="button" aria-pressed={!rubrique} onClick={() => choisir('')} className={pastille(!rubrique)}>Tous</button>
        {rubriques.map((r) => (
          <button key={r.anchor} type="button" aria-pressed={rubrique === r.name} onClick={() => choisir(r.name)} className={pastille(rubrique === r.name)}>
            {r.name}
          </button>
        ))}
      </div>

      <label className="mt-6 flex h-14 max-w-xl items-center gap-3 rounded-full border border-stone-300 bg-white px-5 focus-within:border-stone-900">
        <Search aria-hidden className="h-5 w-5 shrink-0 text-stone-500" strokeWidth={1.75} />
        <span className="sr-only">Chercher un article</span>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setMax(PAS);
          }}
          placeholder="Chercher un article"
          className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-0"
        />
      </label>

      <p className="mt-10 font-serif text-3xl text-stone-900" aria-live="polite">
        {liste.length === 0 ? 'Aucun article' : liste.length === 1 ? '1 article' : `${liste.length} articles`}
      </p>
      {liste.length === 0 && <p className="mt-3 text-lg text-stone-700">Essayez un autre mot, ou une autre rubrique.</p>}

      <ul className="mt-6 space-y-6">
        {liste.slice(0, max).map((a) => (
          <li key={a.slug}>
            <Link href={`/guide/${a.slug}`} className="group grid overflow-hidden rounded-[14px] border-2 border-stone-900 bg-white shadow-[5px_5px_0_#3A2E2A] sm:grid-cols-[minmax(0,260px)_1fr]">
              <span className="block overflow-hidden border-b-2 border-stone-900 sm:border-b-0 sm:border-r-2">
                <GuideArt art={a.art} className="block h-full w-full aspect-[12/5] sm:aspect-auto sm:min-h-[190px]" />
              </span>
              <span className="flex flex-col p-5 md:p-7">
                <span className="text-sm text-stone-500">{a.category}</span>
                <span className="mt-2 font-serif text-2xl leading-snug text-stone-900 underline-offset-4 group-hover:underline md:text-[1.7rem]">{typo(a.title)}</span>
                <span className="mt-2 text-[17px] leading-relaxed text-stone-700">{typo(a.description)}</span>
                <span className="mt-auto flex items-baseline justify-between gap-4 pt-5 text-sm">
                  <span className="text-stone-500">{a.date}, {a.minutes} min de lecture</span>
                  <span className="font-medium text-stone-900">Lire</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {liste.length > max && (
        <p className="mt-10">
          <button type="button" onClick={() => setMax((m) => m + PAS)} className="text-lg font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">
            Voir les articles suivants
          </button>
        </p>
      )}
    </div>
  );
}

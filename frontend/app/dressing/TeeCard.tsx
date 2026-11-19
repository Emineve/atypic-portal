'use client';

import { useState } from 'react';
import TeeShirt from '../TeeShirt';

const SIZES = ['S', 'M', 'L', 'XL'];

// Fiche d'un tee-shirt, présentée comme dans une boutique. Rien n'est encore en vente :
// le bouton le dit clairement au lieu d'ouvrir un paiement.
const COLORS = [
  { name: 'Bleu', value: '#6C9BD9' },
  { name: 'Rouge', value: '#E2665A' },
  { name: 'Vert', value: '#5FAE86' },
  { name: 'Blanc', value: '#ffffff' },
];

export default function TeeCard({ name, words, pitch, first = 'Bleu' }: { name: string; words: string[]; pitch: string; first?: string }) {
  const [color, setColor] = useState(COLORS.find((c) => c.name === first) || COLORS[0]);
  const [size, setSize] = useState('M');
  const [asked, setAsked] = useState(false);
  return (
    <article className="border border-stone-300 bg-white">
      <div className="flex items-center justify-center bg-[#F4E7B5] py-8">
        <TeeShirt words={words} color={color.value} className="h-64 w-64 md:h-72 md:w-72" />
      </div>
      <div className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-widest text-stone-500">Tee-shirt · Bientôt disponible</p>
        <h2 className="mt-2 font-serif text-3xl leading-tight text-stone-900">{name}</h2>
        <p className="mt-3 text-base font-light leading-relaxed text-stone-600">{pitch}</p>

        <p className="mt-6 text-xs uppercase tracking-widest text-stone-500">Couleur : {color.name}</p>
        <div className="mt-3 flex gap-3">
          {COLORS.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c)}
              aria-label={c.name}
              aria-pressed={color.name === c.name}
              className={`h-9 w-9 rounded-full border border-stone-900 transition ${color.name === c.name ? 'ring-2 ring-stone-900 ring-offset-2' : ''}`}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>

        <p className="mt-6 text-xs uppercase tracking-widest text-stone-500">Taille</p>
        <div className="mt-2 flex gap-5">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`font-serif text-2xl underline-offset-8 transition ${size === s ? 'text-stone-900 underline decoration-stone-900 decoration-2' : 'text-stone-400 hover:text-stone-900'}`}
            >
              {s}
            </button>
          ))}
        </div>

        {asked ? (
          <p className="mt-7 text-base leading-relaxed text-stone-700" role="status">
            Bien vu, la taille {size} vous irait très bien. Seul détail : il n&apos;est pas encore en vente. Nous y travaillons.
          </p>
        ) : (
          <button
            type="button"
            onClick={() => setAsked(true)}
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-stone-900 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-stone-800 sm:w-auto sm:min-w-[16rem] sm:px-10"
          >
            Je le veux
          </button>
        )}
      </div>
    </article>
  );
}

'use client';

import Done from '../Done';
import { useState } from 'react';
import TeeShirt from '../TeeShirt';
import { typo } from '../../lib/typo';
import { getSupabase } from '../../lib/supabase';

const SIZES = ['S', 'M', 'L', 'XL'];

// Fiche d'un tee-shirt, présentée comme dans une boutique. Rien n'est encore en vente :
// le bouton le dit clairement au lieu d'ouvrir un paiement.
const COLORS = [
  { name: 'Bleu', value: '#6C9BD9' },
  { name: 'Rouge', value: '#E2665A' },
  { name: 'Vert', value: '#5FAE86' },
  { name: 'Jaune', value: '#F6CF4E' },
  { name: 'Blanc', value: '#ffffff' },
];

export default function TeeCard({ name, words, pitch, first = 'Bleu', mark = false }: { name: string; words: string[]; pitch: string; first?: string; mark?: boolean }) {
  const [color, setColor] = useState(COLORS.find((c) => c.name === first) || COLORS[0]);
  const [size, setSize] = useState('M');
  const [asked, setAsked] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_tee_request', {
        p_email: email,
        p_model: name,
        p_color: color.name,
        p_size: size,
        p_consent: true, // l'envoi vaut accord, la phrase sous le bouton le précise
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }
  return (
    <article className="flex flex-col rounded-[14px] overflow-hidden border border-stone-300 bg-white">
      <div className="flex items-center justify-center bg-[#F6CF4E] py-8">
        <TeeShirt words={words} color={color.value} mark={mark} className="h-64 w-64 md:h-72 md:w-72" />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="text-xs uppercase tracking-widest text-stone-500">Tee-shirt · Bientôt disponible</p>
        <h2 className="mt-2 font-serif text-3xl leading-tight text-stone-900">{name}</h2>
        <p className="mt-3 flex-1 text-base font-light leading-relaxed text-stone-600">{typo(pitch)}</p>

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
              className={`font-sans text-xl underline-offset-8 transition ${size === s ? 'text-stone-900 underline decoration-stone-900 decoration-2' : 'text-stone-500 hover:text-stone-900'}`}
            >
              {s}
            </button>
          ))}
        </div>

        {status === 'done' ? (
          <Done title="Votre demande est bien envoyée." className="mt-7">
            {name}, {color.name.toLowerCase()}, taille {size}. Nous vous écrivons dès qu&apos;il est en stock.
          </Done>
        ) : asked ? (
          <form onSubmit={send} className="mt-7">
            <p className="text-base leading-relaxed text-stone-700">
              Bien vu, la taille {size} vous irait très bien. Il n&apos;est pas encore en stock : laissez votre e-mail, nous vous prévenons dès qu&apos;il arrive.
            </p>
            <label className="mt-5 block text-xs uppercase tracking-widest text-stone-500">
              Votre e-mail
              <input
                required
                type="email"
                autoComplete="email"
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                className="mt-1 w-full border-0 border-b border-stone-300 bg-transparent px-0 pb-2 pt-1 font-sans text-lg normal-case tracking-normal text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-0"
              />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-stone-900 text-[15px] font-medium text-white transition hover:bg-stone-800 disabled:opacity-60 sm:w-auto sm:min-w-[16rem] sm:px-10"
            >
              {status === 'sending' ? 'Envoi…' : 'Me prévenir'}
            </button>
            {status === 'error' && <p className="mt-3 text-sm text-red-700">L&apos;envoi n&apos;a pas fonctionné. Vérifiez votre e-mail et réessayez.</p>}
            <p className="mt-3 text-xs leading-relaxed text-stone-500">
              En envoyant, vous acceptez que Loftissime vous écrive au sujet de ce tee-shirt.{' '}
              <a href="/confidentialite" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-stone-900">Confidentialité</a>
            </p>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAsked(true)}
            className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-stone-900 text-[15px] font-medium text-white transition hover:bg-stone-800 sm:w-auto sm:min-w-[16rem] sm:px-10"
          >
            Je le veux
          </button>
        )}
      </div>
    </article>
  );
}

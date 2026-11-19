'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import type { GuideHit } from '../../lib/guide-search';

const EXAMPLES = ['La mezzanine compte-t-elle dans la surface ?', 'Comment négocier le prix ?', 'La terrasse est-elle à moi ?'];

const btn = 'inline-flex h-12 items-center px-8 rounded-[10px] bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-60';
const link = 'inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';

// L'acheteur pose sa question : on lui montre le passage de nos articles qui y répond.
// Sans réponse, il peut laisser sa question et son e-mail pour être prévenu quand l'article paraît.
export default function GuideSearch() {
  const [q, setQ] = useState('');
  const [asked, setAsked] = useState('');
  const [hits, setHits] = useState<GuideHit[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function run(question: string) {
    const text = question.trim();
    if (text.length < 3) return;
    setQ(text);
    setLoading(true);
    setAskOpen(false);
    setStatus('idle');
    try {
      const res = await fetch(`/api/guide-search?q=${encodeURIComponent(text)}`);
      const data = await res.json();
      setHits(Array.isArray(data.hits) ? data.hits : []);
    } catch {
      setHits([]);
    }
    setAsked(text);
    setLoading(false);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_guide_question', {
        p_question: asked,
        p_email: email,
        p_consent: true, // l'envoi vaut accord, la phrase sous le bouton le précise
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const empty = hits !== null && hits.length === 0;

  return (
    <section className="mt-10 md:mt-12 max-w-3xl" aria-label="Poser une question">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(q);
        }}
        className="flex flex-wrap items-end gap-x-5 gap-y-4"
      >
        <label className="block min-w-0 flex-1 basis-72 text-xs uppercase tracking-widest text-stone-500">
          Posez votre question
          <span className="mt-1 flex items-center gap-3 border-b border-stone-300 pb-2 focus-within:border-stone-900">
            <Search className="h-5 w-5 flex-none text-stone-400" strokeWidth={1.5} />
            <input
              type="search"
              enterKeyHint="search"
              maxLength={300}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Peut-on louer un bien classé G ?"
              className="w-full min-w-0 border-0 bg-transparent p-0 font-serif text-xl md:text-2xl normal-case tracking-normal text-stone-900 placeholder:text-stone-300 focus:outline-none focus:ring-0"
            />
          </span>
        </label>
        <button type="submit" disabled={loading || q.trim().length < 3} className={btn}>
          {loading ? 'Recherche…' : 'Chercher'}
        </button>
      </form>

      {hits === null && (
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-500">
          <span>Par exemple :</span>
          {EXAMPLES.map((ex) => (
            <button key={ex} type="button" onClick={() => run(ex)} className="text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
              {ex}
            </button>
          ))}
        </p>
      )}

      <div aria-live="polite">
        {hits !== null && hits.length > 0 && (
          <ol className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
            {hits.map((h) => (
              <li key={h.slug} className="py-6">
                <p className="text-xs uppercase tracking-widest text-stone-500">{h.category}</p>
                <h2 className="mt-2 font-serif text-2xl leading-snug text-stone-900">{h.heading}</h2>
                {h.excerpt && <p className="mt-2 text-stone-700 leading-relaxed">{h.excerpt}</p>}
                <p className="mt-3">
                  <Link href={`/guide/${h.slug}`} className={link}>
                    {h.kind === 'article' ? 'Lire l’article' : `Lire l’article : ${h.title}`}
                    <ArrowRight className="h-4 w-4 flex-none" />
                  </Link>
                </p>
              </li>
            ))}
          </ol>
        )}

        {hits !== null && status !== 'done' && (
          <div className={empty ? 'mt-8 rounded-[14px] border border-stone-200 bg-white p-6 md:p-8' : 'mt-6'}>
            {empty && (
              <>
                <h2 className="font-serif text-2xl text-stone-900">Nous n’avons pas encore écrit sur cette question.</h2>
                <p className="mt-2 text-stone-600 leading-relaxed">Laissez-nous votre e-mail : nous vous écrivons dès que la réponse est en ligne.</p>
              </>
            )}
            {!empty && !askOpen && (
              <button type="button" onClick={() => setAskOpen(true)} className={link}>
                Ce n’est pas la réponse que vous cherchiez ? Posez-nous la question
              </button>
            )}
            {(empty || askOpen) && (
              <form onSubmit={send} className="mt-5">
                {!empty && <p className="text-stone-600 leading-relaxed">Laissez-nous votre e-mail : nous vous écrivons dès que la réponse à « {asked} » est en ligne.</p>}
                <div className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-4">
                  <label className="block min-w-0 flex-1 basis-64 text-xs uppercase tracking-widest text-stone-500">
                    Votre e-mail
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      maxLength={200}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full border-0 border-b border-stone-300 bg-transparent px-0 pb-2 pt-1 font-serif text-xl normal-case tracking-normal text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-0"
                    />
                  </label>
                  <button type="submit" disabled={status === 'sending'} className={btn}>
                    {status === 'sending' ? 'Envoi…' : 'Me prévenir'}
                  </button>
                </div>
                {status === 'error' && <p className="mt-3 text-sm text-red-700">L’envoi n’a pas fonctionné. Vérifiez votre e-mail et réessayez.</p>}
                <p className="mt-3 text-xs text-stone-500 leading-relaxed">
                  En envoyant, vous acceptez que Loftissime conserve votre question et vous écrive à ce sujet.{' '}
                  <a href="/confidentialite" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-stone-900">Confidentialité</a>
                </p>
              </form>
            )}
          </div>
        )}

        {status === 'done' && (
          <p className="mt-8 font-serif text-2xl text-stone-900">
            Merci, <span className="italic text-stone-500">c’est noté.</span> Nous vous écrivons dès que la réponse est en ligne.
          </p>
        )}
      </div>
    </section>
  );
}

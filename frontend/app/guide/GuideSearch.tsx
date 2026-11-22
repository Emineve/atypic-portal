'use client';

import Done from '../Done';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import type { GuideHit } from '../../lib/guide-search';
import { typo } from '../../lib/typo';
import { EXAMPLES } from '../../lib/guide-examples';

// Date d'une vraie question, dite simplement : « aujourd'hui », « hier », « le 19 novembre »
function publishedLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const day = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diff = Math.round((day(new Date()) - day(d)) / 86400000);
  if (diff <= 0) return 'publiée aujourd’hui';
  if (diff === 1) return 'publiée hier';
  return `publiée le ${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`;
}

const btn = 'inline-flex h-12 items-center px-8 rounded-full bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition disabled:opacity-60';
const link = 'inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';

const plain = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Surligne dans la réponse les mots de la question (à partir de quatre lettres)
function Marked({ text, query }: { text: string; query: string }) {
  const roots = plain(query)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 4)
    .map((w) => w.slice(0, 5));
  if (roots.length === 0) return <>{text}</>;
  return (
    <>
      {text.split(/(\s+)/).map((part, i) =>
        roots.some((r) => plain(part).replace(/^[^a-z0-9]+/, '').startsWith(r)) ? (
          <mark key={i} className="bg-[#F6CF4E] text-inherit">{part}</mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

// L'acheteur pose sa question : la réponse s'affiche pendant qu'il écrit, tirée de nos articles.
// Sans réponse, il peut laisser sa question et son e-mail pour être prévenu quand l'article paraît.
export default function GuideSearch({ meta = {} }: { meta?: Record<string, string> }) {
  const [q, setQ] = useState('');
  // Les suggestions tournent : un tirage différent à chaque visite
  const [pool, setPool] = useState(EXAMPLES);
  useEffect(() => {
    const a = [...EXAMPLES];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setPool(a);
  }, []);
  // Les vraies questions des visiteurs, validées une à une dans le back-office.
  // À partir de quatre, elles remplacent nos exemples, les plus récentes d'abord.
  const [real, setReal] = useState<string[]>([]);
  const [realDates, setRealDates] = useState<Record<string, string>>({});
  useEffect(() => {
    let off = false;
    (async () => {
      try {
        const { data } = await getSupabase().rpc('featured_guide_questions');
        const rows = Array.isArray(data) ? (data as { question: string; created_at?: string }[]).filter((r) => r.question) : [];
        const list = rows.map((r) => r.question);
        if (!off && list.length >= 4) {
          setReal(list);
          setRealDates(Object.fromEntries(rows.map((r) => [r.question, r.created_at ? publishedLabel(r.created_at) : ''])));
        }
      } catch {
        /* sans réponse, on garde nos exemples */
      }
    })();
    return () => {
      off = true;
    };
  }, []);
  const [asked, setAsked] = useState(''); // la question à laquelle correspondent les résultats affichés
  const [hits, setHits] = useState<GuideHit[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const run = useRef(0);
  const logged = useRef('');
  const input = useRef<HTMLInputElement>(null);

  // Question reçue par l'adresse (/guide?q=...), depuis un article par exemple
  useEffect(() => {
    const first = (new URLSearchParams(window.location.search).get('q') || '').trim().slice(0, 300);
    if (first) setQ(first);
  }, []);

  // La question aboutie entre dans le journal, une seule fois, et dans l'adresse de la page
  function log(text: string) {
    if (text.length < 3 || logged.current === text) return;
    logged.current = text;
    fetch(`/api/guide-search?log=1&q=${encodeURIComponent(text)}`).catch(() => {});
    try {
      window.history.replaceState(null, '', `/guide?q=${encodeURIComponent(text)}`);
    } catch {
      /* ignoré */
    }
  }

  // Réponse pendant la frappe, puis enregistrement quand l'acheteur s'arrête d'écrire
  useEffect(() => {
    const text = q.trim();
    if (text.length < 3) {
      run.current++;
      setHits(null);
      setAsked('');
      setLoading(false);
      return;
    }
    setLoading(true);
    const id = ++run.current;
    const search = setTimeout(async () => {
      let found: GuideHit[] = [];
      try {
        const res = await fetch(`/api/guide-search?q=${encodeURIComponent(text)}`);
        const data = await res.json();
        if (Array.isArray(data.hits)) found = data.hits;
      } catch {
        /* pas de réseau : on affiche l'absence de réponse */
      }
      if (id !== run.current) return;
      setHits(found);
      setAsked(text);
      setLoading(false);
      setAskOpen(false);
      setStatus('idle');
    }, 280);
    const journal = setTimeout(() => log(text), 2500);
    return () => {
      clearTimeout(search);
      clearTimeout(journal);
    };
  }, [q]);

  function clear() {
    setQ('');
    try {
      window.history.replaceState(null, '', '/guide');
    } catch {
      /* ignoré */
    }
    input.current?.focus();
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
  // Suggestions : tant que la question n'est pas lancée, celles qui contiennent ce qui est déjà tapé
  const typed = plain(q.trim());
  const suggestions = q.trim().length >= 3 ? [] : (real.length ? real : pool).filter((ex) => plain(ex).includes(typed)).slice(0, 4);

  return (
    <section className="mt-6 md:mt-8 max-w-3xl" aria-label="Poser une question">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          log(q.trim());
          input.current?.blur();
        }}
      >
        <label htmlFor="question" className="sr-only">Posez-nous une question, un expert vous répond</label>
        {/* Une barre de recherche en pilule, la même que sur l'accueil ; les questions d'exemple sont des pastilles à toucher, dessous */}
        <div>
          <div className="flex h-14 md:h-16 items-center gap-3 rounded-full border border-stone-200 bg-white pl-6 pr-2 shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition focus-within:border-stone-900">
            <Search className="h-5 w-5 flex-none text-stone-500" strokeWidth={1.75} />
            <input
              ref={input}
              id="question"
              type="text"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              maxLength={300}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') clear();
              }}
              placeholder="Posez-nous une question, un expert vous répond"
              className="h-full w-full min-w-0 text-ellipsis border-0 bg-transparent p-0 text-base md:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-0"
            />
            {q !== '' && (
              <button type="button" onClick={clear} aria-label="Effacer la question" className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-900">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            )}
            <button type="submit" aria-label="Chercher" className="flex h-10 w-10 md:h-12 md:w-12 flex-none items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-700">
              <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
          {suggestions.length > 0 && (
            <div className="mt-5">
              {/* Intitulé exact : « dernières questions » seulement quand ce sont celles des visiteurs */}
              <p className="text-xs uppercase tracking-widest text-stone-500">{real.length ? 'Dernières questions posées par les acheteurs' : 'Les questions qui reviennent le plus'}</p>
              <ul className="mt-3 space-y-1.5">
                {suggestions.map((ex) => (
                  <li key={ex}>
                    <button type="button" onClick={() => setQ(ex)} className="py-1 text-left text-[15px] italic leading-snug text-stone-900 underline underline-offset-4 decoration-stone-300 transition hover:decoration-stone-900">
                      {typo(ex)}
                    </button>
                    {(real.length ? realDates[ex] : meta[ex]) && (
                      <span className="ml-2 whitespace-nowrap text-[13px] text-stone-500">({real.length ? realDates[ex] : meta[ex]})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </form>

      <div aria-live="polite" className={loading && hits !== null ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
        {loading && hits === null && <p className="mt-6 text-sm text-stone-500">Nous cherchons dans nos articles…</p>}

        {hits !== null && hits.length > 0 && (
          <>
            <p className="mt-8 text-xs uppercase tracking-widest text-stone-500">
              {hits.length > 1 ? `${hits.length} réponses dans nos articles` : 'La réponse, dans nos articles'}
            </p>
            <ol className="mt-3 space-y-4">
              {hits.map((h, i) => (
                <li key={h.slug} className={`rounded-[20px] border bg-white p-6 md:p-7 ${i === 0 ? 'border-stone-900' : 'border-stone-200'}`}>
                  <p className="text-xs uppercase tracking-widest text-stone-500">{h.category}</p>
                  <h2 className="mt-2 font-serif text-2xl leading-snug text-stone-900">{typo(h.heading)}</h2>
                  {h.excerpt && (
                    <p className="mt-3 text-stone-700 leading-relaxed">
                      <Marked text={typo(h.excerpt)} query={asked} />
                    </p>
                  )}
                  <p className="mt-4">
                    <Link href={`/guide/${h.slug}${h.anchor ? `#${h.anchor}` : ''}`} onClick={() => log(asked)} className={link}>
                      {h.kind === 'article' ? 'Lire l’article' : `Lire la suite : ${h.title}`}
                      <ArrowRight className="h-4 w-4 flex-none" />
                    </Link>
                  </p>
                </li>
              ))}
            </ol>
          </>
        )}

        {hits !== null && status !== 'done' && (
          <div className={empty ? 'mt-8 rounded-[20px] border border-stone-900 bg-white p-6 md:p-8' : 'mt-6'}>
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
              <form onSubmit={send} className={empty ? 'mt-5' : ''}>
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
                      className="mt-1 w-full border-0 border-b border-stone-300 bg-transparent px-0 pb-2 pt-1 font-sans text-lg normal-case tracking-normal text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-0"
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
          <Done title="Votre question est bien envoyée." className="mt-8 rounded-[20px] border border-stone-900 bg-white p-6 md:p-8">
            Nous vous écrivons dès que la réponse est en ligne.
          </Done>
        )}
      </div>
    </section>
  );
}

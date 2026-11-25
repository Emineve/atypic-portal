'use client';

import { useRef, useState } from 'react';
import { useFocusRecevoir } from '../../lib/useFocusRecevoir';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { FIELD, LABEL } from '../../lib/form';
import { MOIS, NEWSLETTERS, type Newsletter } from '../../lib/newsletters';

// L'accueil de la newsletter de Loftissime : une seule newsletter, douze numéros par an, un thème par mois.
// 1. on laisse son e-mail, une fois : on recevra tous les numéros ;
// 2. une fois inscrit, on peut dire d'un geste quels thèmes on préfère (facultatif : cela nous dit quoi creuser).
// `intro` : le titre et la phrase de mission, écrits côté serveur. `extrait` : le cadre vidéo du premier numéro.

const Maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Famille({ extrait, intro, articles }: { extrait?: React.ReactNode; intro?: React.ReactNode; articles?: React.ReactNode }) {
  const [abonne, setAbonne] = useState(false);
  const [prefs, setPrefs] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const champ = useRef<HTMLInputElement>(null);
  useFocusRecevoir(champ);

  const inscrire = async (slugs: string[]) => {
    const { data, error: err } = await getSupabase().rpc('subscribe_letters', { p_email: email, p_consent: true, p_letters: slugs, p_source: 'lettre-accueil' });
    if (err || data !== true) throw new Error('refus');
  };

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setBusy('form');
    setError('');
    try {
      await inscrire([]);
      setAbonne(true);
    } catch {
      setError('L’inscription n’a pas abouti. Vérifiez votre adresse et réessayez.');
    }
    setBusy(null);
  }

  async function preferer(slug: string) {
    if (!abonne || prefs.includes(slug) || busy) return;
    setBusy(slug);
    setError('');
    try {
      await inscrire([slug]);
      setPrefs((p) => [...p, slug]);
    } catch {
      setError('Votre préférence n’a pas pu être enregistrée. Réessayez dans un instant.');
    }
    setBusy(null);
  }

  const premier = NEWSLETTERS[0];

  const tuile = (n: Newsletter) => {
    const on = prefs.includes(n.slug);
    return (
      <article key={n.slug} className={`flex overflow-hidden rounded-[14px] bg-white sm:flex-col ${on ? 'shadow-[0_0_0_2px_#211C15]' : 'shadow-[0_0_0_1px_#e7e0d3]'}`}>
        {/* sur téléphone la matière est une bande à gauche : le calendrier reste court */}
        <span aria-hidden className="block w-20 shrink-0 self-stretch sm:h-28 sm:w-full sm:self-auto" style={n.matiere} />
        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
          <p className="text-sm text-stone-500">{Maj(MOIS[n.mois - 1])}</p>
          <h3 className="mt-1 font-serif text-[1.75rem] italic leading-none text-stone-900">{n.nom}</h3>
          <p className="mt-2.5 text-[15px] leading-snug text-stone-700">{n.sujet}</p>
          {abonne && (
            <div className="mt-3 sm:mt-auto sm:pt-5">
              <button
                type="button"
                onClick={() => preferer(n.slug)}
                aria-pressed={on}
                disabled={on}
                className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900 bg-white text-stone-900 [@media(hover:hover)]:hover:bg-stone-900 [@media(hover:hover)]:hover:text-white active:bg-stone-100'}`}
              >
                {on ? <Check aria-hidden className="h-4 w-4" strokeWidth={2.5} /> : <Plus aria-hidden className="h-4 w-4" strokeWidth={2.5} />}
                {on ? 'C’est noté' : busy === n.slug ? 'Un instant…' : 'Ça m’intéresse'}
              </button>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <div>
      {/* 1. La promesse à gauche, la carte d'inscription à droite : une seule action dès l'ouverture */}
      <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[1.25fr_1fr]">
        <div>{intro}</div>
        <div id="recevoir" className="scroll-mt-28 rounded-[18px] border-2 border-stone-900 bg-white p-6 shadow-[6px_6px_0_#211C15] md:p-8">
          {abonne ? (
            <div role="status">
              <p className="font-serif text-2xl leading-snug text-stone-900">C’est noté. Vous recevrez le prochain numéro.</p>
              <p className="mt-4">
                <a href="/dix-questions" className="font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Votre guide : dix questions à poser avant d’acheter un bien atypique</a>
              </p>
              <p className="mt-4 text-sm text-stone-500">Un thème vous parle plus que les autres ? Dites-le-nous d’un geste, dans le calendrier plus bas.</p>
            </div>
          ) : (
            <form onSubmit={envoyer}>
              <p className="font-serif text-2xl leading-tight text-stone-900 md:text-[1.7rem]">Vous êtes à un e-mail de tout savoir sur l’immobilier atypique, gratuitement.</p>
              <p className="mt-3 leading-relaxed text-stone-700">
                En cadeau de bienvenue, notre guide : dix questions à poser avant d’acheter un bien atypique.
              </p>
              <label className={`${LABEL} mt-5`}>
                Votre e-mail <span aria-hidden="true">*</span>
                <input type="email" required autoComplete="email" inputMode="email" placeholder="vous@exemple.fr" value={email} ref={champ} onChange={(e) => setEmail(e.target.value)} className={`${FIELD} !h-14`} />
              </label>
              <button type="submit" disabled={busy === 'form'} className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-6 text-[15px] font-medium text-white transition hover:bg-stone-700 disabled:opacity-50 sm:w-auto">
                {busy === 'form' ? 'Inscription…' : 'S’abonner gratuitement'}
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </button>
              <p className="mt-4 text-sm leading-relaxed text-stone-500">
                <a href="/confidentialite" className="underline underline-offset-2">Votre adresse reste privée</a>. Pas de spam, désinscription en un clic.
              </p>
            </form>
          )}
          {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
        </div>
      </div>

      {/* Le rythme, en bandeau pleine largeur. Pas de chiffre d'audience tant qu'il n'y en a pas. */}
      <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 bg-[#211C15] text-[#FBF5E9] md:mt-20">
        <ul className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-x-8 gap-y-1 px-6 py-7 text-center font-serif text-2xl md:py-9 lg:flex-row lg:text-3xl">
          <li className="lg:whitespace-nowrap">12 numéros par an</li>
          <li aria-hidden className="hidden text-[#F6CF4E] lg:block">✦</li>
          <li className="lg:whitespace-nowrap">1 thème par mois</li>
          <li aria-hidden className="hidden text-[#F6CF4E] lg:block">✦</li>
          <li className="lg:whitespace-nowrap">Des conseils d’experts</li>
        </ul>
      </div>

      {/* 2. Le premier numéro, seul sur sa ligne */}
      <section className="mt-14 md:mt-20" aria-labelledby="nl-premier">
        <h2 id="nl-premier" className="border-t border-stone-900 pt-4 font-serif text-3xl leading-[1.1] text-stone-900 md:text-4xl">
          Le premier numéro, <span className="italic text-stone-500">en {MOIS[premier.mois - 1]}.</span>
        </h2>
        <article className="mt-6 grid overflow-hidden rounded-[14px] bg-white shadow-[0_0_0_2px_#211C15] md:grid-cols-2">
          <div className="flex flex-col justify-center p-7 md:p-12">
            <h3 className="font-serif text-6xl italic leading-none text-stone-900 md:text-7xl"><a href="/lettre">{premier.nom}</a></h3>
            <p className="mt-5 text-xl text-stone-900">{premier.sujet}</p>
            <p className="mt-2 text-lg leading-relaxed text-stone-600">Pour ceux qui voient un loft là où d’autres voient un chantier, et qui veulent savoir ce que cela coûtera avant de se lancer.</p>
            <p className="mt-7">
              <a href="/lettre" className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Découvrir ce numéro</a>
            </p>
          </div>
          <a href="/lettre" aria-label="Découvrir ce numéro" className="flex flex-col justify-center p-7 md:p-12" style={premier.matiere}>
            {extrait}
          </a>
        </article>
      </section>

      {/* Entre le premier numéro et le calendrier : quatre articles, écrits côté serveur */}
      {articles}

      {/* 3. L'année : douze thèmes, un par mois */}
      <section className="mt-16 md:mt-24" aria-labelledby="nl-annee">
        <div className="grid gap-x-12 gap-y-3 border-t border-stone-900 pt-4 md:grid-cols-[1fr_1.4fr]">
          <h2 id="nl-annee" className="font-serif text-3xl leading-[1.1] text-stone-900 md:text-4xl">
            L’année en douze thèmes, <span className="italic text-stone-500">un par mois.</span>
          </h2>
          <p className="text-lg leading-relaxed text-stone-700">
            Douze mois, douze façons d’habiter autrement.
            {abonne && ' Dites-nous ceux qui vous intéressent le plus.'}
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">{NEWSLETTERS.map(tuile)}</div>
      </section>
    </div>
  );
}

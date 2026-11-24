'use client';

import { useState } from 'react';
import { getSupabase } from '../../lib/supabase';
import { FIELD, LABEL } from '../../lib/form';
import { CATEGORY_LIST } from '../../lib/catalog';
import Done from '../Done';
import { ArrowRight } from 'lucide-react';

// Inscription à la lettre, en deux temps : l'e-mail d'abord, puis ce que la personne cherche.
// Les critères sont enregistrés avec l'inscription ; ils serviront d'alerte le jour où les annonces ouvriront.

// L'étape « Que cherchez-vous ? » est prête mais éteinte pour le lancement : l'inscription s'arrête à l'e-mail.
// Passer à true pour la rallumer.
const ASK_CRITERIA = false;

const ARRONDISSEMENTS = Array.from({ length: 20 }, (_, i) => `Paris ${i + 1}${i === 0 ? 'er' : 'e'}`);
const BUDGETS: [string, string][] = [
  ['', 'Sans plafond'],
  ['500000', '500 000 €'],
  ['750000', '750 000 €'],
  ['1000000', '1 000 000 €'],
  ['1500000', '1 500 000 €'],
  ['2000000', '2 000 000 €'],
  ['3000000', '3 000 000 €'],
];
const SURFACES: [string, string][] = [
  ['', 'Peu importe'],
  ['30', '30 m²'],
  ['50', '50 m²'],
  ['80', '80 m²'],
  ['120', '120 m²'],
  ['200', '200 m²'],
];

const chip = (on: boolean) =>
  `rounded-full border px-3.5 py-2 text-sm transition ${on ? 'border-stone-900 bg-stone-900 text-[#FBF5E9]' : 'border-stone-300 bg-white text-stone-800 hover:border-stone-900'}`;

// `aside` : ce qui s'affiche à droite du formulaire dans la boîte (l'extrait vidéo du dernier numéro, sur l'accueil)
export default function LetterSignup({ variant = 'hero', source = 'accueil', className = '', aside }: { variant?: 'hero' | 'band' | 'footer'; source?: string; className?: string; aside?: React.ReactNode }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'criteres' | 'fini'>('email');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [lieux, setLieux] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [surface, setSurface] = useState('');

  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  async function send(withCriteria: boolean) {
    setBusy(true);
    setError('');
    try {
      const { data, error: e } = await getSupabase().rpc('subscribe_letter', {
        p_email: email,
        p_consent: true, // l'envoi vaut accord, la phrase sous le champ le précise
        p_categories: withCriteria && types.length ? types : null,
        p_locations: withCriteria && lieux.length ? lieux : null,
        p_price_max: withCriteria && budget ? Number(budget) : null,
        p_surface_min: withCriteria && surface ? Number(surface) : null,
        p_source: `lettre-${source}`.slice(0, 40),
      });
      if (e || data !== true) throw new Error('refus');
      setStep(withCriteria || !ASK_CRITERIA ? 'fini' : 'criteres');
    } catch {
      setError('L’inscription n’a pas abouti. Vérifiez votre adresse et réessayez.');
    }
    setBusy(false);
  }

  const band = variant === 'band';

  // La petite boîte du pied de page, sur fond noir : un titre, le champ, la flèche. Pas d'ancre #recevoir ici,
  // elle appartient au formulaire du haut de page.
  if (variant === 'footer') {
    if (step !== 'email')
      return (
        <p role="status" className={`border border-stone-700 p-5 font-serif text-xl leading-snug text-[#FBF5E9] ${className}`}>
          Inscription enregistrée. <span className="italic text-stone-400">Vous recevrez le prochain numéro.</span>
        </p>
      );
    return (
      <form
        className={`border border-stone-700 p-5 ${className}`}
        onSubmit={(e) => {
          e.preventDefault();
          send(false);
        }}
      >
        <p className="font-serif text-2xl italic leading-none text-[#FBF5E9]">Béton ciré</p>
        <p className="mt-2 text-sm text-stone-400">La newsletter de Loftissime.</p>
        <label className="mt-5 block text-sm font-medium text-[#FBF5E9]">
          Votre e-mail <span aria-hidden="true">*</span>
          <span className="relative mt-1.5 block">
            <input type="email" required autoComplete="email" inputMode="email" placeholder="vous@exemple.fr" value={email} onChange={(e) => setEmail(e.target.value)} className={`${FIELD} !mt-0 !pr-14`} />
            <button type="submit" disabled={busy} aria-label="Recevoir Béton ciré" className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-700 disabled:opacity-50">
              <ArrowRight aria-hidden="true" className={`h-5 w-5 ${busy ? 'animate-pulse' : ''}`} strokeWidth={2} />
            </button>
          </span>
        </label>
        {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
        <p className="mt-3 text-xs leading-relaxed text-stone-500">
          C’est gratuit. En vous inscrivant, vous acceptez de recevoir <em>Béton ciré</em>. Désinscription en un clic dans chaque numéro.{' '}
          <a href="/confidentialite" className="underline underline-offset-2">Confidentialité</a>
        </p>
      </form>
    );
  }
  const box = band ? `rounded-[14px] border border-stone-200 bg-white p-6 md:p-8 ${className}` : className;

  if (step === 'fini')
    return (
      <div id="recevoir" className={box}>
        <Done title="Inscription enregistrée.">Vous recevrez le prochain numéro de <em>Béton ciré</em>{email ? `, à ${email}` : ''}.</Done>
      </div>
    );

  if (step === 'criteres')
    return (
      <div id="recevoir" className={box}>
        <Done title="Inscription enregistrée.">Vous recevrez le prochain numéro de <em>Béton ciré</em>, à {email}.</Done>
        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            send(true);
          }}
        >
          <h3 className="font-serif text-2xl text-stone-900">Que cherchez-vous ?</h3>
          <p className="mt-1.5 text-stone-700">Dites-le en quatre gestes, la lettre en tiendra compte.</p>

          <fieldset className="mt-6">
            <legend className={LABEL}>Quel type de bien</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORY_LIST.map((c) => (
                <button key={c} type="button" aria-pressed={types.includes(c)} onClick={() => toggle(types, setTypes, c)} className={chip(types.includes(c))}>
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className={LABEL}>Dans quels arrondissements</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {ARRONDISSEMENTS.map((a) => (
                <button key={a} type="button" aria-pressed={lieux.includes(a)} onClick={() => toggle(lieux, setLieux, a)} className={chip(lieux.includes(a))}>
                  {a.replace('Paris ', '')}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className={LABEL}>
              Budget maximum
              <select className={FIELD} value={budget} onChange={(e) => setBudget(e.target.value)}>
                {BUDGETS.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>
            <label className={LABEL}>
              Surface minimum
              <select className={FIELD} value={surface} onChange={(e) => setSurface(e.target.value)}>
                {SURFACES.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>
          </div>

          {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button type="submit" disabled={busy} className="h-12 rounded-full bg-stone-900 px-6 text-sm font-medium text-[#FBF5E9] disabled:opacity-50">
              {busy ? 'Enregistrement…' : 'Enregistrer ma recherche'}
            </button>
            <button type="button" onClick={() => setStep('fini')} className="text-sm underline underline-offset-4 text-stone-700">
              Passer cette étape
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-stone-600">Votre recherche reste chez nous : elle n’est transmise à une agence que si vous le demandez.</p>
        </form>
      </div>
    );

  return (
    <form
      id="recevoir"
      className={box}
      onSubmit={(e) => {
        e.preventDefault();
        send(false);
      }}
    >
     <div className={aside ? 'grid items-center gap-x-12 gap-y-8 lg:grid-cols-[1.25fr_1fr]' : undefined}>
      <div>
      {band && (
        <>
          <h2 className="font-serif text-2xl md:text-3xl leading-tight text-stone-900">
            Recevez Béton ciré, <span className="italic text-stone-500">la newsletter de Loftissime.</span>
          </h2>
          <p className="mt-2 max-w-2xl text-stone-600">Dans chaque numéro, un bien atypique passé au crible : ce qu’on peut en faire, ce qu’il coûte vraiment et les points de vigilance, avec les conseils de nos experts.</p>
        </>
      )}
      <label className={`${LABEL} ${band ? 'mt-5 max-w-md' : ''}`}>
        Votre e-mail <span aria-hidden="true">*</span>
        <span className="relative mt-1.5 block">
          <input
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="vous@exemple.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${FIELD} !mt-0 !pr-14`}
          />
          <button type="submit" disabled={busy} aria-label="Recevoir Béton ciré" className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-700 disabled:opacity-50">
            <ArrowRight aria-hidden="true" className={`h-5 w-5 ${busy ? 'animate-pulse' : ''}`} strokeWidth={2} />
          </button>
        </span>
      </label>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      <p className={`mt-3 text-xs leading-relaxed ${band ? 'text-stone-500' : 'text-stone-500'}`}>
        C’est gratuit. En vous inscrivant, vous acceptez de recevoir <em>Béton ciré</em>, la newsletter de Loftissime. Désinscription en un clic dans chaque numéro.{' '}
        <a href="/confidentialite" className="underline underline-offset-2">Confidentialité</a>
      </p>
      </div>
      {aside}
     </div>
    </form>
  );
}

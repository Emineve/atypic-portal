'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, Check, Heart, X } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { readVisitor, saveVisitor } from '../../../lib/visitor';

// L'alerte de la fiche ne s'ouvre plus jamais toute seule. Deux entrées discrètes, à l'initiative du visiteur :
// une phrase-lien dans la page, et une ligne fine quand il met le bien en favori.
// (La troisième entrée, après une demande à l'agence, est dans ContactForm.)

const CREATED_KEY = 'loftissime:alerte-creee'; // alerte déjà créée pendant la visite : on ne la repropose pas au favori
export const FAVORITE_ADDED_EVENT = 'loftissime:favori-ajoute';

type Props = { city?: string | null; price?: number | null };

// Alerte calée sur le bien regardé : même ville, budget jusqu'à 20 % au-dessus
function criteria({ city, price }: Props) {
  const budget = price && price > 0 ? Math.ceil((price * 1.2) / 50000) * 50000 : null;
  const budgetLabel = budget ? `jusqu'à ${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(budget)} €` : null;
  return { budget, budgetLabel };
}

function AlertForm({ city, price, dark = false, idPrefix, onDone }: Props & { dark?: boolean; idPrefix: string; onDone: () => void }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [limit, setLimit] = useState(false); // dix alertes actives déjà enregistrées pour cet e-mail
  const { budget } = criteria({ city, price });

  useEffect(() => {
    const v = readVisitor();
    if (v.email) setEmail(v.email);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { onDone(); return; }
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_alert', {
        p_kind: 'alert',
        p_email: email,
        p_price_max: budget,
        p_consent: true, // le bouton « Créer mon alerte » vaut accord, la ligne dessous le précise
        p_locations: city ? [city] : null,
        p_source: 'fiche',
      });
      setLimit(Boolean(error && error.message.includes('alert_limit')));
      if (!error && data === true) {
        saveVisitor({ email });
        try {
          sessionStorage.setItem(CREATED_KEY, '1');
        } catch {
          /* stockage indisponible */
        }
        onDone();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor={`${idPrefix}-email`}>E-mail</label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre e-mail"
          className={`min-w-0 flex-1 h-11 px-3 rounded-[10px] bg-white text-stone-900 text-base placeholder:text-stone-400 focus:outline-none ${dark ? '' : 'border border-stone-300 focus:border-stone-900'}`}
        />
        <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" aria-hidden="true" />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`h-11 px-4 flex-none rounded-full text-[15px] font-medium transition disabled:opacity-60 ${dark ? 'bg-[#F4E7B5] text-stone-900 hover:bg-white' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
        >
          {status === 'sending' ? 'Un instant…' : 'Créer mon alerte'}
        </button>
      </div>
      {status === 'error' && (
        <p className={`mt-2 text-xs ${dark ? 'text-red-300' : 'text-red-700'}`}>{limit ? <>Vous avez déjà dix alertes actives avec cet e-mail. Arrêtez-en une depuis <a href="/alerte" className="underline underline-offset-2">Mes alertes</a> pour en créer une nouvelle.</> : <>L&apos;alerte n&apos;a pas pu être créée. Vérifiez votre e-mail et réessayez.</>}</p>
      )}
      <p className={`mt-2 text-xs ${dark ? 'text-stone-400' : 'text-stone-500'}`}>
        En créant l&apos;alerte, vous acceptez de recevoir ces e-mails. Arrêt possible à tout moment.
      </p>
    </form>
  );
}

// Phrase-lien dans la fiche : le formulaire ne se déplie, sur place, que si le visiteur la touche.
export function AlertLink({ city, price }: Props) {
  const [state, setState] = useState<'closed' | 'open' | 'done'>('closed');
  const { budgetLabel } = criteria({ city, price });

  return (
    <div className="mt-8 border-y border-stone-200 py-4">
      {state === 'done' ? (
        <p className="flex items-center gap-3 text-sm text-stone-900" role="status">
          <span className="h-6 w-6 flex-none rounded-full bg-stone-900 text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </span>
          Alerte créée. Vous serez prévenu(e) par e-mail des prochains biens.
        </p>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setState(state === 'open' ? 'closed' : 'open')}
            aria-expanded={state === 'open'}
            className="group flex w-full items-start gap-3 text-left"
          >
            <Bell className="mt-0.5 w-4 h-4 flex-none text-stone-500" strokeWidth={1.5} aria-hidden="true" />
            <span className="min-w-0">
              <span className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900">
                Créer mon alerte{city ? ` pour ${city}` : ''}
              </span>
              <span className="mt-0.5 block text-xs text-stone-500">
                Par e-mail{budgetLabel ? `, ${budgetLabel}` : ''}.
              </span>
            </span>
          </button>
          {state === 'open' && (
            <div className="mt-3 sm:pl-7">
              <AlertForm city={city} price={price} idPrefix="al" onDone={() => setState('done')} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Ligne fine en bas d'écran quand le bien vient d'être mis en favori. Elle s'efface seule au bout de
// quelques secondes ; le formulaire n'apparaît que si le visiteur touche « Recevoir les biens similaires ».
export function FavoriteAlertToast({ city, price }: Props) {
  const [state, setState] = useState<'hidden' | 'line' | 'form' | 'done'>('hidden');
  const [alreadyCreated, setAlreadyCreated] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { budgetLabel } = criteria({ city, price });
  const label = [city ? `à ${city}` : null, budgetLabel].filter(Boolean).join(', ');

  // Le formulaire ouvert ne se referme jamais tout seul
  function hideLater(ms: number) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState((cur) => (cur === 'form' ? cur : 'hidden')), ms);
  }

  useEffect(() => {
    const onFavorite = () => {
      try {
        setAlreadyCreated(sessionStorage.getItem(CREATED_KEY) === '1');
      } catch {
        /* stockage indisponible */
      }
      // Formulaire déjà ouvert : on ne le remplace pas
      setState((cur) => (cur === 'form' ? cur : 'line'));
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setState((cur) => (cur === 'form' ? cur : 'hidden')), 5000);
    };
    window.addEventListener(FAVORITE_ADDED_EVENT, onFavorite);
    return () => {
      window.removeEventListener(FAVORITE_ADDED_EVENT, onFavorite);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function openForm() {
    if (timer.current) clearTimeout(timer.current);
    setState('form');
  }

  function close() {
    if (timer.current) clearTimeout(timer.current);
    setState('hidden');
  }

  if (state === 'hidden') return null;

  return (
    <div className="fixed inset-x-0 z-30 px-4 pointer-events-none bottom-[5.5rem] lg:bottom-5" role="status">
      <div className="pointer-events-auto relative mx-auto max-w-md bg-stone-900 text-white shadow-xl">
        {state === 'line' && (
          <p className="flex items-center gap-2.5 px-4 py-3 text-sm">
            <Heart className="w-4 h-4 flex-none fill-white" aria-hidden="true" />
            <span className="flex-none">Ajouté aux favoris</span>
            {!alreadyCreated && (
              <>
                <span className="text-stone-500" aria-hidden="true">·</span>
                <button type="button" onClick={openForm} className="min-w-0 truncate underline underline-offset-4 decoration-stone-500 hover:decoration-white">
                  Recevoir les biens similaires
                </button>
              </>
            )}
          </p>
        )}
        {state === 'form' && (
          <div className="px-4 py-4">
            <button type="button" onClick={close} aria-label="Fermer" className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center text-stone-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
            <p className="pr-8 text-sm text-stone-200">
              Recevez par e-mail les nouveaux biens{label ? ` ${label}` : ''}.
            </p>
            <div className="mt-3">
              <AlertForm city={city} price={price} dark idPrefix="af" onDone={() => { setState('done'); hideLater(4000); }} />
            </div>
          </div>
        )}
        {state === 'done' && (
          <p className="flex items-center gap-3 px-4 py-3 text-sm">
            <span className="h-6 w-6 flex-none rounded-full bg-[#F4E7B5] text-stone-900 flex items-center justify-center">
              <Check className="w-3.5 h-3.5" />
            </span>
            Alerte créée. Vous serez prévenu(e) par e-mail.
          </p>
        )}
      </div>
    </div>
  );
}

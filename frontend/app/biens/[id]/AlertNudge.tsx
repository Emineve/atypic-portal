'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { readVisitor, saveVisitor } from '../../../lib/visitor';

const KEY = 'loftissime:alerte-fiche'; // bandeau fermé ou alerte créée : il ne revient plus pendant la visite

// Bandeau discret en bas de la fiche : après un vrai temps de lecture, il propose une alerte
// calée sur le bien regardé (même ville, budget jusqu'à 20 % au-dessus).
export default function AlertNudge({ city, price }: { city?: string | null; price?: number | null }) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  // Une fois fermé (croix ou alerte créée), ni le défilement ni la minuterie ne doivent le rouvrir.
  const dismissed = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const budget = price && price > 0 ? Math.ceil((price * 1.2) / 50000) * 50000 : null;
  const label = [
    city ? `à ${city}` : null,
    budget ? `jusqu'à ${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(budget)} €` : null,
  ]
    .filter(Boolean)
    .join(', ');

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === '1') return;
    } catch {
      /* stockage indisponible : le bandeau s'affiche */
    }
    const v = readVisitor();
    if (v.email) setEmail(v.email);
    // Le visiteur est occupé (fenêtre ouverte, saisie en cours) : on ne l'interrompt pas, on réessaie plus tard
    const busy = () => {
      if (document.querySelector('[role="dialog"]')) return true;
      const el = document.activeElement;
      return !!el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    };
    let wanted = false;
    const show = () => {
      wanted = true;
      if (!dismissed.current && !busy()) setVisible(true);
    };
    // Pas d'interruption en début de lecture : le bandeau attend 45 s sur la fiche, ou que le visiteur
    // ait parcouru l'essentiel de la page (60 %) après au moins 20 s.
    const start = Date.now();
    const readEnough = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 && window.scrollY / max > 0.6 && Date.now() - start > 20000;
    };
    const timer = setTimeout(show, 45000);
    const retry = setInterval(() => {
      if (!wanted && readEnough()) wanted = true;
      if (wanted && !dismissed.current && !busy()) setVisible(true);
    }, 4000);
    const onScroll = () => {
      if (readEnough()) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      clearInterval(retry);
      window.removeEventListener('scroll', onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // Une fenêtre s'ouvre alors que le bandeau est affiché : il s'efface le temps qu'elle soit refermée
  const [covered, setCovered] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const check = () => setCovered(!!document.querySelector('[role="dialog"]'));
    const obs = new MutationObserver(check);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [visible]);

  function remember() {
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* stockage indisponible */
    }
  }

  function close() {
    dismissed.current = true;
    if (hideTimer.current) clearTimeout(hideTimer.current);
    remember();
    setVisible(false);
  }

  // Message de confirmation : il s'efface tout seul au bout de quelques secondes.
  function confirmThenHide() {
    dismissed.current = true;
    remember();
    setStatus('done');
    hideTimer.current = setTimeout(() => setVisible(false), 4000);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { confirmThenHide(); return; }
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
      if (!error && data === true) {
        saveVisitor({ email });
        confirmThenHide();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (!visible || covered) return null;

  return (
    <div
      className="fixed inset-x-0 z-30 px-4 pointer-events-none bottom-[5.5rem] lg:bottom-5"
      role="region"
      aria-label="Créer une alerte"
    >
      {/* Grand écran : calé sous la colonne de texte, pour ne jamais recouvrir la carte de contact */}
      <div className="mx-auto max-w-6xl lg:px-2">
      <div className="pointer-events-auto relative mx-auto lg:mx-0 max-w-2xl bg-stone-900 text-white shadow-2xl px-5 py-4 sm:px-6">
        <button type="button" onClick={close} aria-label="Fermer" className="absolute top-1 right-1 h-10 w-10 flex items-center justify-center text-stone-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
        {status === 'done' ? (
          <p className="flex items-center gap-3 pr-8">
            <span className="h-7 w-7 flex-none rounded-full bg-[#F4E7B5] text-stone-900 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            Alerte créée. Vous serez prévenu(e) par e-mail des prochains biens.
          </p>
        ) : (
          <form onSubmit={onSubmit}>
            <p className="flex items-start gap-3 pr-8 font-serif text-lg leading-snug">
              <Bell className="mt-1 w-4 h-4 flex-none" />
              Ce bien vous plaît ? Soyez prévenu(e) des prochains.
            </p>
            {label && <p className="mt-1 pl-7 text-sm text-stone-300">Recevez par e-mail les nouveaux biens {label}.</p>}
            <div className="mt-3 flex gap-2 sm:pl-7">
              <label className="sr-only" htmlFor="an-email">E-mail</label>
              <input
                id="an-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                className="min-w-0 flex-1 h-11 px-3 bg-white text-stone-900 text-base placeholder:text-stone-400 focus:outline-none"
              />
              <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" aria-hidden="true" />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="h-11 px-4 flex-none bg-[#F4E7B5] text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-white transition disabled:opacity-60"
              >
                {status === 'sending' ? 'Un instant…' : 'Créer mon alerte'}
              </button>
            </div>
            {status === 'error' && <p className="mt-2 sm:pl-7 text-xs text-red-300">L&apos;alerte n&apos;a pas pu être créée. Vérifiez votre e-mail et réessayez.</p>}
            <p className="mt-2 sm:pl-7 text-[11px] text-stone-400">
              En créant l&apos;alerte, vous acceptez de recevoir ces e-mails. Arrêt possible à tout moment.
            </p>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

interface FavItem {
  id: string;
  title: string;
  city: string;
  source_agency: string;
  source_id?: string | null;
}

// Une seule demande, envoyée au contact de chaque bien mis en favori
const MAX_ITEMS = 12;

export default function FavoritesContact({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: FavItem[];
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [wantCall, setWantCall] = useState(true);
  const [wantPlan, setWantPlan] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [sent, setSent] = useState(0);

  const list = items.slice(0, MAX_ITEMS);

  // À chaque ouverture : tous les favoris cochés, et on bloque le défilement de la page derrière
  useEffect(() => {
    if (!open) return;
    setSelected(items.slice(0, MAX_ITEMS).map((i) => i.id));
    setStatus('idle');
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setSent(selected.length); setStatus('done'); return; }
    if (selected.length === 0) return;
    setStatus('sending');
    const message = [
      wantCall ? 'Souhaite être rappelé.' : null,
      wantPlan ? 'Souhaite recevoir le plan du bien.' : null,
      !wantCall && !wantPlan ? 'Demande d’information.' : null,
      selected.length > 1 ? `Demande groupée depuis ses favoris (${selected.length} biens).` : null,
    ]
      .filter(Boolean)
      .join(' ');
    let ok = 0;
    for (const id of selected) {
      try {
        const { data, error } = await getSupabase().rpc('submit_lead', {
          p_listing: id,
          p_name: name,
          p_email: email,
          p_phone: tel || null,
          p_message: message,
          p_consent: true, // l'envoi de la demande vaut accord, la phrase sous le bouton le précise
        });
        if (!error && data === true) ok += 1;
      } catch {
        /* on continue avec les biens suivants */
      }
    }
    setSent(ok);
    setStatus(ok > 0 ? 'done' : 'error');
  }

  const agencies = Array.from(new Set(list.filter((i) => selected.includes(i.id)).map((i) => i.source_agency)));
  const field = 'w-full h-12 border border-stone-300 bg-white px-3 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-900';

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-label="Contacter les agences de mes favoris">
      <div className="absolute inset-0 bg-stone-900/40" onClick={onClose} />
      <div className="relative w-full md:max-w-lg max-h-[92vh] bg-white flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200 shrink-0">
          <h2 className="font-serif text-xl text-stone-900">Contacter les agences</h2>
          <button type="button" onClick={onClose} aria-label="Fermer" className="h-11 w-11 -mr-3 flex items-center justify-center text-stone-600 hover:text-stone-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === 'done' ? (
          <div className="px-6 py-10 text-center">
            <span className="mx-auto h-12 w-12 rounded-full bg-stone-900 text-white flex items-center justify-center">
              <Check className="w-6 h-6" />
            </span>
            <p className="mt-4 font-serif text-2xl text-stone-900">C&apos;est envoyé.</p>
            <p className="mt-2 text-sm text-stone-600">
              Vos coordonnées ont été transmises. Le contact de chaque bien revient vers vous directement.
            </p>
            <button type="button" onClick={onClose} className="mt-6 h-12 px-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition">
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <p className="text-sm text-stone-600">
                Une seule demande, envoyée au contact de chacun des biens cochés.
              </p>
              <ul className="border border-stone-200 divide-y divide-stone-200">
                {list.map((i) => {
                  const on = selected.includes(i.id);
                  return (
                    <li key={i.id}>
                      <button type="button" onClick={() => toggle(i.id)} aria-pressed={on} className="w-full flex items-start gap-3 px-3 py-3 text-left">
                        <span className={`mt-0.5 h-5 w-5 flex-none border flex items-center justify-center ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-400'}`}>
                          {on && <Check className="w-3.5 h-3.5" />}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm text-stone-900 line-clamp-1">{i.title}</span>
                          <span className="block text-xs text-stone-500">
                            {i.city} · {i.source_agency}{i.source_id ? ` · Réf. ${i.source_id}` : ''}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {items.length > MAX_ITEMS && (
                <p className="text-xs text-stone-500">Seuls vos {MAX_ITEMS} premiers favoris sont proposés pour un envoi groupé.</p>
              )}

              <div className="grid grid-cols-2 gap-2">
                {([
                  ['Être rappelé', wantCall, setWantCall],
                  ['Recevoir le plan', wantPlan, setWantPlan],
                ] as const).map(([label, on, set]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => set(!on)}
                    aria-pressed={on}
                    className={`h-11 inline-flex items-center justify-start gap-2 text-sm transition hover:text-stone-900 ${on ? 'text-stone-900' : 'text-stone-700'}`}
                  >
                    <span className={`h-4 w-4 flex-none border flex items-center justify-center ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-400'}`}>
                      {on && <Check className="w-3 h-3" />}
                    </span>
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="sr-only" htmlFor="fc-name">Nom</label>
                <input id="fc-name" required minLength={2} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" className={field} />
                <label className="sr-only" htmlFor="fc-tel">Téléphone</label>
                <input id="fc-tel" type="tel" required={wantCall} autoComplete="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Téléphone" className={field} />
                <label className="sr-only" htmlFor="fc-email">E-mail</label>
                <input id="fc-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className={field} />
                <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" aria-hidden="true" />
              </div>
              {status === 'error' && <p className="text-sm text-red-700">L&apos;envoi n&apos;a pas abouti. Vérifiez vos coordonnées et réessayez.</p>}
            </div>

            <div className="border-t border-stone-200 p-4 shrink-0">
              <button
                type="submit"
                disabled={status === 'sending' || selected.length === 0}
                className="w-full h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50"
              >
                {status === 'sending'
                  ? 'Envoi en cours…'
                  : `Envoyer ma demande pour ${selected.length} ${selected.length > 1 ? 'biens' : 'bien'}`}
              </button>
              <p className="mt-2 text-center text-[11px] text-stone-500">
                Vos coordonnées sont transmises uniquement {agencies.length > 1 ? 'aux agences en charge de ces biens' : 'à l’agence en charge du bien'}.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

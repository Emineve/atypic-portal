'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Alert = {
  token: string;
  created_at: string;
  locations: string[] | null;
  categories: string[] | null;
  price_min: number | null;
  price_max: number | null;
  surface_min: number | null;
  surface_max: number | null;
  bedrooms_min: number | null;
  must_top_floor: boolean;
  must_view: boolean;
  must_outdoor: boolean;
  must_features: string[] | null;
};

const eur = (n: number) => `${Number(n).toLocaleString('fr-FR')} €`;
const btn = 'inline-flex h-12 items-center px-8 rounded-full bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition disabled:opacity-60';
const link = 'text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';

// Les critères d'une alerte, en clair
function criteria(a: Alert): string[] {
  const out: string[] = [];
  if (a.categories?.length) out.push(a.categories.join(', '));
  if (a.price_min && a.price_max) out.push(`De ${eur(a.price_min)} à ${eur(a.price_max)}`);
  else if (a.price_max) out.push(`Jusqu’à ${eur(a.price_max)}`);
  else if (a.price_min) out.push(`À partir de ${eur(a.price_min)}`);
  if (a.surface_min && a.surface_max) out.push(`De ${a.surface_min} à ${a.surface_max} m²`);
  else if (a.surface_min) out.push(`${a.surface_min} m² au moins`);
  else if (a.surface_max) out.push(`${a.surface_max} m² au plus`);
  if (a.bedrooms_min) out.push(`${a.bedrooms_min} ${a.bedrooms_min > 1 ? 'chambres' : 'chambre'} au moins`);
  if (a.must_top_floor) out.push('Dernier étage');
  if (a.must_view) out.push('Vue dégagée');
  if (a.must_outdoor) out.push('Un extérieur');
  if (a.must_features?.length) out.push(a.must_features.join(', '));
  return out;
}

// Page ouverte depuis le lien « Gérer mes alertes » des e-mails. Sans lien, on le redemande par e-mail.
export default function MyAlerts() {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<{ email: string; alerts: Alert[] } | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'invalid' | 'none'>('loading');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [confirm, setConfirm] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('t') || '';
    if (!UUID.test(t)) {
      setState('none');
      return;
    }
    setToken(t);
    (async () => {
      try {
        const res = await getSupabase().rpc('my_alerts', { p_token: t });
        if (res.error || !res.data) setState('invalid');
        else {
          setData(res.data as { email: string; alerts: Alert[] });
          setState('ready');
        }
      } catch {
        setState('invalid');
      }
    })();
  }, []);

  async function stop(t: string) {
    try {
      const { error } = await getSupabase().rpc('unsubscribe_alert', { p_token: t });
      if (!error && data) setData({ ...data, alerts: data.alerts.filter((a) => a.token !== t) });
    } catch {
      /* l'alerte reste affichée : l'acheteur peut réessayer */
    }
    setConfirm(null);
  }

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    setSent('sending');
    try {
      const { data: ok, error } = await getSupabase().rpc('request_alerts_link', { p_email: email });
      setSent(!error && ok === true ? 'done' : 'error');
    } catch {
      setSent('error');
    }
  }

  if (state === 'loading') return <p className="text-stone-500">Un instant…</p>;

  if (state === 'ready' && data) {
    return (
      <>
        <p className="text-lg font-light leading-relaxed text-stone-600">
          {data.alerts.length === 0
            ? 'Vous n’avez plus d’alerte en cours.'
            : `${data.alerts.length > 1 ? `${data.alerts.length} alertes` : 'Une alerte'} pour ${data.email}. Nous vous écrivons dès qu’un bien correspond.`}
        </p>
        <ul className="mt-8 space-y-4">
          {data.alerts.map((a) => (
            <li key={a.token} className="rounded-[14px] border border-stone-200 bg-white p-6 md:p-8">
              <h2 className="font-serif text-2xl md:text-3xl leading-tight text-stone-900">{a.locations?.length ? a.locations.join(', ') : 'Partout en France'}</h2>
              {criteria(a).length > 0 ? (
                <ul className="mt-3 space-y-1 text-stone-600">
                  {criteria(a).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-stone-600">Tous les biens, sans autre critère.</p>
              )}
              <p className="mt-4 text-sm text-stone-500">Créée le {new Date(a.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <div className="mt-5">
                {confirm === a.token ? (
                  <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-700">
                    Arrêter cette alerte ?
                    <button type="button" onClick={() => stop(a.token)} className={link}>Oui, l’arrêter</button>
                    <button type="button" onClick={() => setConfirm(null)} className={link}>Non, la garder</button>
                  </p>
                ) : (
                  <button type="button" onClick={() => setConfirm(a.token)} className={link}>Arrêter cette alerte</button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <a href="/?alerte=1" className="inline-flex h-12 items-center gap-2 pl-5 pr-6 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition">
            <Plus className="w-4 h-4" strokeWidth={2} />
            Nouvelle alerte
          </a>
        </p>
        <p className="mt-8 text-sm text-stone-500 leading-relaxed">Pour changer les critères d’une alerte, arrêtez-la et créez-en une nouvelle.</p>
      </>
    );
  }

  return (
    <>
      <p className="text-lg font-light leading-relaxed text-stone-600">
        {state === 'invalid' && token
          ? 'Ce lien n’est plus valable. Indiquez votre e-mail : nous vous envoyons un nouveau lien vers vos alertes.'
          : 'Indiquez l’e-mail de votre alerte : nous vous envoyons un lien pour retrouver vos alertes, les arrêter ou en créer une nouvelle.'}
      </p>
      {sent === 'done' ? (
        <p className="mt-8 font-serif text-2xl text-stone-900">
          C’est envoyé. <span className="italic text-stone-500">Si une alerte existe à cette adresse, le lien arrive dans votre boîte.</span>
        </p>
      ) : (
        <form onSubmit={ask} className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-4">
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
          <button type="submit" disabled={sent === 'sending'} className={btn}>
            {sent === 'sending' ? 'Envoi…' : 'Recevoir le lien'}
          </button>
          {sent === 'error' && <p className="basis-full text-sm text-red-700">L’envoi n’a pas fonctionné. Vérifiez votre e-mail et réessayez.</p>}
        </form>
      )}
      <p className="mt-10">
        <a href="/?alerte=1" className={link}>Vous n’avez pas encore d’alerte ? Créez-en une</a>
      </p>
    </>
  );
}

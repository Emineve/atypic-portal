'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';

// Même clé que la page d'administration : on se connecte d'abord sur /admin
const KEY = 'singulier:admin-token';

interface Pending {
  id: string;
  source_agency: string;
  title: string;
  city: string;
  price: number;
  atypic_category: string;
  cover_image_url: string | null;
  dpe_class: string | null;
  feed_updated_at: string;
}

const eur = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export default function Validation() {
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<Pending[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setToken(sessionStorage.getItem(KEY) || '');
    } catch {
      setToken('');
    }
  }, []);

  const load = useCallback(async (t: string) => {
    setError('');
    const { data, error: e } = await getSupabase().rpc('admin_pending_listings', { p_token: t });
    if (e) {
      setError('Accès refusé ou erreur. Reconnectez-vous sur la page Administration.');
      setItems(null);
      return;
    }
    setItems(data as Pending[]);
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  async function publish(p: Pending) {
    if (!token) return;
    if (!p.dpe_class && !window.confirm('Ce bien n’a pas de DPE renseigné, or il est obligatoire dans l’annonce. Publier quand même ?')) return;
    const { error: e } = await getSupabase().rpc('admin_set_listing_active', { p_token: token, p_id: p.id, p_active: true });
    if (e) {
      setError('Publication impossible : ' + e.message);
      return;
    }
    load(token);
  }

  if (token === null) return null;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl">Biens à valider</h1>
          <a href="/admin" className="text-sm text-stone-500 underline underline-offset-4 hover:text-stone-900">
            Retour à l&apos;administration
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {!token && (
          <p className="text-sm text-stone-600">
            Connectez-vous d&apos;abord sur la page <a href="/admin" className="underline">Administration</a>, puis revenez ici.
          </p>
        )}
        {error && <p className="mb-4 text-sm text-red-700">{error}</p>}

        {items && (
          <>
            <p className="text-sm text-stone-600">
              Biens reçus des agences et pas encore publiés. Vérifiez qu&apos;ils respectent la charte de l&apos;atypique, puis publiez.
            </p>
            <ul className="mt-5 space-y-3">
              {items.map((p) => (
                <li key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-4 border border-stone-200 bg-white p-4">
                  {p.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover_image_url} alt="" className="h-20 w-28 object-cover bg-stone-200 shrink-0" />
                  ) : (
                    <span className="h-20 w-28 bg-stone-200 shrink-0 flex items-center justify-center text-[11px] text-stone-500">Sans photo</span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-900">{p.title}</p>
                    <p className="text-sm text-stone-600">
                      {p.city} · {eur(Number(p.price))} · {p.atypic_category}
                    </p>
                    <p className="text-xs text-stone-500">
                      {p.source_agency}
                      {!p.dpe_class && <span className="ml-2 text-red-700">DPE manquant</span>}
                      {!p.cover_image_url && <span className="ml-2 text-red-700">photo manquante</span>}
                    </p>
                  </div>
                  <button
                    onClick={() => publish(p)}
                    className="h-11 px-6 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider shrink-0"
                  >
                    Publier
                  </button>
                </li>
              ))}
              {items.length === 0 && (
                <li className="border border-stone-200 bg-white p-8 text-center text-sm text-stone-500">Aucun bien en attente.</li>
              )}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}

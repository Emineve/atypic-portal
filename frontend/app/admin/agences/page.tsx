'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';

// Même clé que la page d'administration : on se connecte d'abord sur /admin
const KEY = 'singulier:admin-token';

interface Agency {
  id: string;
  name: string;
  source_name: string;
  contact_email: string | null;
  access_token: string;
  is_active: boolean;
  listings: number;
}

interface Data {
  agencies: Agency[];
  unlinked_sources: string[];
}

export default function AdminAgences() {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const [form, setForm] = useState({ source: '', name: '', email: '' });
  // Honoraires : à la charge du vendeur ou de l'acquéreur, réglé une fois pour chaque agence
  const [fees, setFees] = useState<{ source: string; fees_payer: string | null; listings: number }[]>([]);

  useEffect(() => {
    try {
      setToken(sessionStorage.getItem(KEY) || '');
    } catch {
      setToken('');
    }
  }, []);

  const load = useCallback(async (t: string) => {
    setError('');
    const { data: d, error: e } = await getSupabase().rpc('admin_agencies', { p_token: t });
    if (e) {
      setError('Accès refusé ou erreur. Reconnectez-vous sur la page Administration.');
      setData(null);
      return;
    }
    setData(d as Data);
    const { data: f } = await getSupabase().rpc('admin_agency_fees', { p_token: t });
    setFees(Array.isArray(f) ? f : []);
  }, []);

  async function setPayer(source: string, payer: string) {
    if (!token) return;
    setFees((list) => list.map((x) => (x.source === source ? { ...x, fees_payer: payer || null } : x)));
    const { error: e } = await getSupabase().rpc('admin_set_agency_fees', { p_token: token, p_source: source, p_payer: payer });
    if (e) {
      setError('Le réglage des honoraires n’a pas pu être enregistré.');
      load(token);
    }
  }

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const linkOf = (a: Agency) => `${origin}/espace-agence/${a.access_token}`;

  async function copy(a: Agency) {
    try {
      await navigator.clipboard.writeText(linkOf(a));
      setCopied(a.id);
      setTimeout(() => setCopied(''), 2000);
    } catch {
      window.prompt('Copiez ce lien :', linkOf(a));
    }
  }

  async function save() {
    if (!token || !form.source.trim()) return;
    const { error: e } = await getSupabase().rpc('admin_save_agency', {
      p_token: token,
      p_source: form.source,
      p_name: form.name,
      p_email: form.email,
    });
    if (e) {
      setError("Enregistrement impossible : " + e.message);
      return;
    }
    setForm({ source: '', name: '', email: '' });
    load(token);
  }

  async function rotate(a: Agency) {
    if (!token) return;
    if (!window.confirm(`Générer un nouveau lien pour ${a.name} ? L'ancien lien cessera de fonctionner.`)) return;
    await getSupabase().rpc('admin_rotate_agency_token', { p_token: token, p_id: a.id });
    load(token);
  }

  async function toggle(a: Agency) {
    if (!token) return;
    await getSupabase().rpc('admin_set_agency_active', { p_token: token, p_id: a.id, p_active: !a.is_active });
    load(token);
  }

  const input =
    'h-11 w-full border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:border-stone-900';

  if (token === null) return null;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl">Agences</h1>
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

        {data && (
          <>
            <p className="text-sm text-stone-600">
              Chaque agence reçoit un lien secret vers son rapport de visibilité. Envoyez-le uniquement à l&apos;agence concernée.
            </p>

            <div className="mt-5 overflow-x-auto border border-stone-200 bg-white">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="bg-stone-100 text-left text-[11px] font-semibold uppercase tracking-wider text-stone-600">
                    <th className="px-4 py-3">Agence</th>
                    <th className="px-3 py-3 text-right">Biens actifs</th>
                    <th className="px-4 py-3 text-right">Lien du rapport</th>
                  </tr>
                </thead>
                <tbody>
                  {data.agencies.map((a) => (
                    <tr key={a.id} className="border-t border-stone-200 align-middle">
                      <td className="px-4 py-3">
                        <span className={a.is_active ? '' : 'text-stone-400 line-through'}>{a.name}</span>
                        {a.contact_email && <span className="block text-xs text-stone-500">{a.contact_email}</span>}
                        {a.name !== a.source_name && (
                          <span className="block text-xs text-stone-400">source : {a.source_name}</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums">{a.listings}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => copy(a)} className="h-9 px-3 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider">
                          {copied === a.id ? 'Copié' : 'Copier le lien'}
                        </button>
                        <a href={linkOf(a)} target="_blank" rel="noreferrer" className="ml-3 text-xs underline underline-offset-4 text-stone-600">
                          Voir
                        </a>
                        <button onClick={() => rotate(a)} className="ml-3 text-xs underline underline-offset-4 text-stone-500">
                          Nouveau lien
                        </button>
                        <button onClick={() => toggle(a)} className="ml-3 text-xs underline underline-offset-4 text-stone-500">
                          {a.is_active ? 'Désactiver' : 'Réactiver'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.agencies.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-stone-500">Aucune agence pour le moment.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <h2 className="mt-10 font-serif text-lg">Ajouter une agence</h2>
            {data.unlinked_sources.length > 0 && (
              <p className="mt-2 text-xs text-stone-500">
                Sources présentes dans vos biens, sans espace agence :{' '}
                {data.unlinked_sources.map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, source: s, name: form.name || s })}
                    className="mr-2 underline underline-offset-4 text-stone-700"
                  >
                    {s}
                  </button>
                ))}
              </p>
            )}
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <input
                className={input}
                placeholder="Nom de la source (identique aux biens)"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
              <input
                className={input}
                placeholder="Nom affiché (facultatif)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className={input}
                type="email"
                placeholder="E-mail de l'agence (facultatif)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <button
              onClick={save}
              disabled={!form.source.trim()}
              className="mt-3 h-11 px-6 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40"
            >
              Enregistrer
            </button>

            <h2 className="mt-12 font-serif text-lg">Honoraires par agence</h2>
            <p className="mt-1 text-sm text-stone-600">
              Indiquez pour chaque agence qui paie les honoraires. Ce réglage s&apos;affiche sur toutes ses annonces, sauf si une annonce porte sa propre mention. Il est enregistré dès que vous le changez.
            </p>
            <ul className="mt-4 border border-stone-200 bg-white divide-y divide-stone-200">
              {fees.map((f) => (
                <li key={f.source} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <span className="text-sm">
                    {f.source} <span className="text-stone-400">· {f.listings} {f.listings > 1 ? 'annonces' : 'annonce'}</span>
                  </span>
                  <select
                    className="h-10 border border-stone-300 bg-white px-2 text-sm focus:outline-none focus:border-stone-900"
                    value={f.fees_payer || ''}
                    onChange={(e) => setPayer(f.source, e.target.value)}
                    aria-label={`Honoraires de ${f.source}`}
                  >
                    <option value="">Non renseigné</option>
                    <option value="vendeur">À la charge du vendeur</option>
                    <option value="acquereur">À la charge de l&apos;acquéreur</option>
                  </select>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}

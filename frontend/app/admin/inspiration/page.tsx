'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';

// Même clé que la page d'administration : on se connecte d'abord sur /admin
const KEY = 'singulier:admin-token';

interface Architect {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  website: string | null;
  is_published: boolean;
  is_demo: boolean;
  is_featured: boolean;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  projects: number;
  messages: number;
}

type Draft = { contact: string; email: string; phone: string };

export default function AdminInspiration() {
  const [token, setToken] = useState<string | null>(null);
  const [rows, setRows] = useState<Architect[] | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [saved, setSaved] = useState('');
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
    const { data, error: e } = await getSupabase().rpc('admin_architects', { p_token: t });
    if (e) {
      setError('Accès refusé ou erreur. Reconnectez-vous sur la page Administration.');
      setRows(null);
      return;
    }
    const list = (data as Architect[]) || [];
    setRows(list);
    const d: Record<string, Draft> = {};
    list.forEach((a) => {
      d[a.id] = { contact: a.contact_name || '', email: a.contact_email || '', phone: a.contact_phone || '' };
    });
    setDrafts(d);
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  function edit(id: string, key: keyof Draft, value: string) {
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [key]: value } }));
  }

  function changed(a: Architect) {
    const d = drafts[a.id];
    if (!d) return false;
    return d.contact !== (a.contact_name || '') || d.email !== (a.contact_email || '') || d.phone !== (a.contact_phone || '');
  }

  async function save(a: Architect) {
    if (!token) return;
    const d = drafts[a.id];
    setError('');
    const { error: e } = await getSupabase().rpc('admin_save_architect_contact', {
      p_token: token,
      p_id: a.id,
      p_contact: d.contact,
      p_email: d.email,
      p_phone: d.phone,
    });
    if (e) {
      setError(e.message.includes('email') ? `Adresse e-mail invalide pour ${a.name}.` : 'Enregistrement impossible : ' + e.message);
      return;
    }
    setSaved(a.id);
    setTimeout(() => setSaved(''), 2000);
    load(token);
  }

  const input = 'h-11 w-full border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:border-stone-900';
  const label = 'block text-[10px] uppercase tracking-widest text-stone-400 mb-1';

  if (token === null) return null;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl">Inspiration</h1>
          <a href="/inspiration" target="_blank" rel="noreferrer" className="text-sm text-stone-500 underline underline-offset-4 hover:text-stone-900">
            Voir la page
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

        {rows && (
          <>
            <p className="text-sm text-stone-600">
              Coordonnées des architectes présentés. Elles restent internes : le site ne les affiche jamais, les messages des visiteurs
              passent par Loftissime.
            </p>

            <div className="mt-6 space-y-4">
              {rows.map((a) => (
                <div key={a.id} className="border border-stone-200 bg-white p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <div>
                      <span className="font-serif text-xl">{a.name}</span>
                      {a.city && <span className="ml-2 text-sm text-stone-500">{a.city}</span>}
                    </div>
                    <div className="text-xs text-stone-500">
                      {a.is_demo ? 'Exemple (non affiché)' : a.is_featured ? 'À la une' : a.is_published ? 'Publié' : 'Non publié'}
                      {' · '}
                      {a.projects} {a.projects > 1 ? 'projets' : 'projet'}
                      {' · '}
                      {a.messages} {a.messages > 1 ? 'messages reçus' : 'message reçu'}
                    </div>
                  </div>
                  {a.website && (
                    <a href={a.website} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-stone-600 underline underline-offset-4">
                      {a.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  )}
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div>
                      <label className={label} htmlFor={`c-${a.id}`}>Interlocuteur</label>
                      <input id={`c-${a.id}`} className={input} maxLength={120} value={drafts[a.id]?.contact || ''} onChange={(e) => edit(a.id, 'contact', e.target.value)} />
                    </div>
                    <div>
                      <label className={label} htmlFor={`e-${a.id}`}>E-mail</label>
                      <input id={`e-${a.id}`} type="email" className={input} maxLength={200} value={drafts[a.id]?.email || ''} onChange={(e) => edit(a.id, 'email', e.target.value)} />
                    </div>
                    <div>
                      <label className={label} htmlFor={`p-${a.id}`}>Téléphone</label>
                      <input id={`p-${a.id}`} type="tel" className={input} maxLength={40} value={drafts[a.id]?.phone || ''} onChange={(e) => edit(a.id, 'phone', e.target.value)} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      onClick={() => save(a)}
                      disabled={!changed(a)}
                      className="h-10 px-5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40"
                    >
                      Enregistrer
                    </button>
                    {saved === a.id && <span className="text-xs text-stone-600">Enregistré.</span>}
                  </div>
                </div>
              ))}
              {rows.length === 0 && <p className="py-8 text-center text-sm text-stone-500">Aucun architecte pour le moment.</p>}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

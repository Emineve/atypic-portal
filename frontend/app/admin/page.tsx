'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '../../lib/supabase';

interface Row {
  id: string; title: string; agency: string; city: string; price: number; category: string; is_active: boolean;
  views: number; visitors: number; favorites: number; clicks: number; leads: number;
}
interface Stats {
  since: string;
  totals: { views: number; visitors: number; favorites: number; clicks: number; leads: number; alerts: number };
  listings: Row[];
  daily: { day: string; views: number; favorites: number }[];
}
interface Lead {
  created_at: string; name: string; email: string; phone: string | null; message: string | null;
  is_demo: boolean; listing_title: string | null; agency: string | null;
}

const KEY = 'singulier:admin-token';

function pct(a: number, b: number) {
  return b > 0 ? `${((a / b) * 100).toFixed(1)} %` : '–';
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [input, setInput] = useState('');
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const t = sessionStorage.getItem(KEY);
      if (t) setToken(t);
    } catch { /* ignoré */ }
  }, []);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const sb = getSupabase();
        const s = await sb.rpc('admin_stats', { p_token: token, p_days: days });
        if (s.error) throw new Error(s.error.message.includes('forbidden') ? 'Jeton invalide.' : s.error.message);
        const l = await sb.rpc('admin_leads', { p_token: token, p_limit: 200 });
        if (cancelled) return;
        setStats(s.data as Stats);
        setLeads((l.data as Lead[]) || []);
        try { sessionStorage.setItem(KEY, token); } catch { /* ignoré */ }
      } catch (e) {
        if (cancelled) return;
        setStats(null);
        setError(e instanceof Error ? e.message : 'Erreur');
        try { sessionStorage.removeItem(KEY); } catch { /* ignoré */ }
        setToken('');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [token, days]);

  const field = 'border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900';

  if (!token) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-6">
        <form
          onSubmit={(e) => { e.preventDefault(); setToken(input.trim()); }}
          className="w-full max-w-sm border border-stone-200 bg-white p-6 space-y-4"
        >
          <h1 className="font-serif text-xl text-stone-900">Administration</h1>
          <input type="password" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Jeton d'accès" className={`${field} w-full`} autoFocus />
          {error && <p className="text-xs text-red-700">{error}</p>}
          <button type="submit" className="w-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-4 py-3">Entrer</button>
        </form>
      </div>
    );
  }

  const t = stats?.totals;
  const tiles: [string, number | string][] = t
    ? [
        ['Vues de pages', t.views],
        ['Visiteurs', t.visitors],
        ['Favoris', t.favorites],
        ['Clics vers l\'annonce', t.clicks],
        ['Demandes de contact', t.leads],
        ['Alertes & lettre', t.alerts],
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl font-bold tracking-widest uppercase">SINGULIER · Admin</span>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider">
            <select value={days} onChange={(e) => setDays(Number(e.target.value))} className={field}>
              <option value={7}>7 jours</option>
              <option value={30}>30 jours</option>
              <option value={90}>90 jours</option>
              <option value={365}>12 mois</option>
            </select>
            <button onClick={() => { try { sessionStorage.removeItem(KEY); } catch { /* ignoré */ } setToken(''); setStats(null); }} className="text-stone-500 hover:text-stone-900">Quitter</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {loading && !stats && <p className="text-stone-400">Chargement…</p>}
        {error && <p className="text-sm text-red-700">{error}</p>}

        {stats && (
          <>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {tiles.map(([label, value]) => (
                <div key={label} className="border border-stone-200 bg-white p-4">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400">{label}</p>
                  <p className="mt-2 font-serif text-3xl">{value}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="font-serif text-xl mb-3">Performance par annonce</h2>
              <div className="overflow-x-auto border border-stone-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="text-[10px] uppercase tracking-widest text-stone-400 text-left">
                    <tr>
                      <th className="p-3">Annonce</th><th className="p-3">Agence</th>
                      <th className="p-3 text-right">Vues</th><th className="p-3 text-right">Visiteurs</th>
                      <th className="p-3 text-right">Favoris</th><th className="p-3 text-right">Clics</th>
                      <th className="p-3 text-right">Contacts</th><th className="p-3 text-right">Clics / vues</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.listings.map((r) => (
                      <tr key={r.id} className="border-t border-stone-100">
                        <td className="p-3 max-w-xs">
                          <a href={`/biens/${r.id}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{r.title}</a>
                          <div className="text-xs text-stone-400">{r.city} · {r.category}{r.is_active ? '' : ' · inactive'}</div>
                        </td>
                        <td className="p-3 text-stone-600">{r.agency}</td>
                        <td className="p-3 text-right">{r.views}</td>
                        <td className="p-3 text-right">{r.visitors}</td>
                        <td className="p-3 text-right">{r.favorites}</td>
                        <td className="p-3 text-right">{r.clicks}</td>
                        <td className="p-3 text-right">{r.leads}</td>
                        <td className="p-3 text-right text-stone-500">{pct(r.clicks, r.views)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl mb-3">Vues par jour</h2>
              {stats.daily.length === 0 ? (
                <p className="text-sm text-stone-400">Pas encore de données.</p>
              ) : (
                <div className="border border-stone-200 bg-white p-4 space-y-1.5">
                  {(() => {
                    const max = Math.max(1, ...stats.daily.map((d) => d.views));
                    return stats.daily.map((d) => (
                      <div key={d.day} className="flex items-center gap-3 text-xs">
                        <span className="w-24 text-stone-500">{d.day}</span>
                        <div className="flex-1 bg-stone-100 h-3"><div className="bg-stone-900 h-3" style={{ width: `${(d.views / max) * 100}%` }} /></div>
                        <span className="w-10 text-right">{d.views}</span>
                      </div>
                    ));
                  })()}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-serif text-xl mb-3">Demandes de contact</h2>
              {leads.length === 0 ? (
                <p className="text-sm text-stone-400">Aucune demande pour le moment.</p>
              ) : (
                <div className="overflow-x-auto border border-stone-200 bg-white">
                  <table className="w-full text-sm">
                    <thead className="text-[10px] uppercase tracking-widest text-stone-400 text-left">
                      <tr><th className="p-3">Date</th><th className="p-3">Nom</th><th className="p-3">Contact</th><th className="p-3">Annonce</th><th className="p-3">Message</th></tr>
                    </thead>
                    <tbody>
                      {leads.map((l, i) => (
                        <tr key={i} className="border-t border-stone-100 align-top">
                          <td className="p-3 whitespace-nowrap text-stone-500">{new Date(l.created_at).toLocaleString('fr-FR')}</td>
                          <td className="p-3">{l.name}{l.is_demo ? <span className="ml-2 text-[10px] uppercase text-stone-400">démo</span> : null}</td>
                          <td className="p-3">{l.email}{l.phone ? <div className="text-xs text-stone-500">{l.phone}</div> : null}</td>
                          <td className="p-3 text-stone-600">{l.listing_title}<div className="text-xs text-stone-400">{l.agency}</div></td>
                          <td className="p-3 text-stone-600 max-w-sm">{l.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

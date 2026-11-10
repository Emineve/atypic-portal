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

interface Report {
  created_at: string; reason: string; message: string | null; email: string | null;
  listing_title: string | null; agency: string | null; listing_id: string;
}

interface AlertRow {
  created_at: string; kind: string; email: string; is_active: boolean; source: string | null;
  query: string | null; category: string | null; locations: string[] | null;
  price_min: number | null; price_max: number | null; surface_min: number | null; surface_max: number | null;
  bedrooms_min: number | null; rooms_min: number | null;
  must_top_floor: boolean; must_view: boolean; must_outdoor: boolean; matches: number;
  categories: string[] | null; must_features: string[] | null; nice_features: string[] | null;
}

interface AgencyReq {
  created_at: string; agency: string; name: string; email: string; phone: string | null; message: string | null;
}

const REASONS: Record<string, string> = {
  inexact: 'Information inexacte',
  vendu: 'Bien vendu ou retiré',
  photos: 'Problème de photos',
  illicite: 'Contenu illicite',
  autre: 'Autre',
};

const KEY = 'singulier:admin-token';

function euro(n: number) {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €';
}

function criteria(a: AlertRow): string {
  const parts: string[] = [];
  if (a.locations && a.locations.length) parts.push(a.locations.join(', '));
  if (a.category) parts.push(a.category);
  if (a.categories && a.categories.length) parts.push(a.categories.join(' / '));
  if (a.query) parts.push(`« ${a.query} »`);
  if (a.surface_min !== null && a.surface_max !== null) parts.push(`${a.surface_min} à ${a.surface_max} m²`);
  else if (a.surface_min !== null) parts.push(`dès ${a.surface_min} m²`);
  else if (a.surface_max !== null) parts.push(`jusqu'à ${a.surface_max} m²`);
  if (a.bedrooms_min) parts.push(`${a.bedrooms_min}+ chambres`);
  if (a.price_max !== null) parts.push(`max ${euro(a.price_max)}`);
  if (a.must_top_floor) parts.push('dernier étage');
  if (a.must_view) parts.push('vue dégagée');
  if (a.must_outdoor) parts.push('extérieur');
  if (a.must_features && a.must_features.length) parts.push(`indispensable : ${a.must_features.join(', ')}`);
  if (a.nice_features && a.nice_features.length) parts.push(`petits plus : ${a.nice_features.join(', ')}`);
  return parts.length ? parts.join(' · ') : 'Tous les nouveaux biens';
}

// Protège contre les formules dans Excel (cellules commençant par = + - @)
function csvCell(v: unknown): string {
  let t = v === null || v === undefined ? '' : String(v);
  if (/^[=+\-@]/.test(t)) t = "'" + t;
  return '"' + t.replace(/"/g, '""') + '"';
}

function exportAlertsCsv(rows: AlertRow[]) {
  const head = ['date', 'email', 'type', 'actif', 'lieux', 'categorie', 'surface_min', 'surface_max', 'chambres_min', 'budget_max', 'dernier_etage', 'vue_degagee', 'exterieur', 'indispensables', 'petits_plus', 'biens_correspondants', 'origine'];
  const lines = rows.map((a) => [
    a.created_at, a.email, a.kind === 'alert' ? 'alerte' : 'lettre', a.is_active ? 'oui' : 'non',
    (a.locations || []).join(' | '), [a.category, ...(a.categories || [])].filter(Boolean).join(' | '), a.surface_min, a.surface_max, a.bedrooms_min, a.price_max,
    a.must_top_floor ? 'oui' : '', a.must_view ? 'oui' : '', a.must_outdoor ? 'oui' : '', (a.must_features || []).join(' | '), (a.nice_features || []).join(' | '), a.matches, a.source,
  ].map(csvCell).join(','));
  const blob = new Blob(['\uFEFF' + [head.map(csvCell).join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `alertes-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function pct(a: number, b: number) {
  return b > 0 ? `${((a / b) * 100).toFixed(1)} %` : '–';
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [input, setInput] = useState('');
  const [days, setDays] = useState(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [agencyReqs, setAgencyReqs] = useState<AgencyReq[]>([]);
  const [alertRows, setAlertRows] = useState<AlertRow[]>([]);
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
        const rp = await sb.rpc('admin_reports', { p_token: token, p_limit: 200 });
        const ar = await sb.rpc('admin_agency_requests', { p_token: token, p_limit: 200 });
        const al = await sb.rpc('admin_alerts', { p_token: token, p_limit: 1000 });
        if (cancelled) return;
        setAlertRows((al.data as AlertRow[]) || []);
        setAgencyReqs((ar.data as AgencyReq[]) || []);
        setStats(s.data as Stats);
        setReports((rp.data as Report[]) || []);
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
          <span className="font-serif text-xl font-bold tracking-widest uppercase">Loftissime · Admin</span>
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

            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-serif text-xl">Alertes acheteurs ({alertRows.filter((a) => a.kind === 'alert').length})</h2>
                {alertRows.length > 0 && (
                  <button
                    type="button"
                    onClick={() => exportAlertsCsv(alertRows)}
                    className="text-xs uppercase tracking-wider border border-stone-900 px-4 py-2 hover:bg-stone-900 hover:text-white transition"
                  >
                    Exporter en CSV
                  </button>
                )}
              </div>
              {alertRows.length === 0 ? (
                <p className="text-sm text-stone-400">Aucune alerte pour le moment.</p>
              ) : (
                <div className="overflow-x-auto border border-stone-200 bg-white">
                  <table className="w-full text-sm">
                    <thead className="text-[10px] uppercase tracking-widest text-stone-400 text-left">
                      <tr><th className="p-3">Date</th><th className="p-3">Email</th><th className="p-3">Recherche</th><th className="p-3">Biens correspondants</th><th className="p-3">Origine</th></tr>
                    </thead>
                    <tbody>
                      {alertRows.map((a, i) => (
                        <tr key={i} className="border-t border-stone-100 align-top">
                          <td className="p-3 whitespace-nowrap text-stone-500">{new Date(a.created_at).toLocaleString('fr-FR')}</td>
                          <td className="p-3">
                            {a.email}
                            {a.kind !== 'alert' ? <span className="ml-2 text-[10px] uppercase text-stone-400">lettre</span> : null}
                            {!a.is_active ? <span className="ml-2 text-[10px] uppercase text-red-700">désinscrit</span> : null}
                          </td>
                          <td className="p-3 text-stone-600 max-w-md">{a.kind === 'alert' ? criteria(a) : '–'}</td>
                          <td className="p-3 text-stone-600">{a.kind === 'alert' ? a.matches : '–'}</td>
                          <td className="p-3 text-stone-400">{a.source || '–'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section>
              <h2 className="font-serif text-xl mb-3">Demandes d&apos;agences</h2>
              {agencyReqs.length === 0 ? (
                <p className="text-sm text-stone-400">Aucune demande pour le moment.</p>
              ) : (
                <div className="overflow-x-auto border border-stone-200 bg-white">
                  <table className="w-full text-sm">
                    <thead className="text-[10px] uppercase tracking-widest text-stone-400 text-left">
                      <tr><th className="p-3">Date</th><th className="p-3">Agence</th><th className="p-3">Contact</th><th className="p-3">Message</th></tr>
                    </thead>
                    <tbody>
                      {agencyReqs.map((r, i) => (
                        <tr key={i} className="border-t border-stone-100 align-top">
                          <td className="p-3 whitespace-nowrap text-stone-500">{new Date(r.created_at).toLocaleString('fr-FR')}</td>
                          <td className="p-3">{r.agency}</td>
                          <td className="p-3">{r.name}<div className="text-xs text-stone-500">{r.email}{r.phone ? ` · ${r.phone}` : ''}</div></td>
                          <td className="p-3 text-stone-600 max-w-sm">{r.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section>
              <h2 className="font-serif text-xl mb-3">Signalements</h2>
              {reports.length === 0 ? (
                <p className="text-sm text-stone-400">Aucun signalement pour le moment.</p>
              ) : (
                <div className="overflow-x-auto border border-stone-200 bg-white">
                  <table className="w-full text-sm">
                    <thead className="text-[10px] uppercase tracking-widest text-stone-400 text-left">
                      <tr><th className="p-3">Date</th><th className="p-3">Motif</th><th className="p-3">Annonce</th><th className="p-3">Message</th><th className="p-3">Email</th></tr>
                    </thead>
                    <tbody>
                      {reports.map((r, i) => (
                        <tr key={i} className="border-t border-stone-100 align-top">
                          <td className="p-3 whitespace-nowrap text-stone-500">{new Date(r.created_at).toLocaleString('fr-FR')}</td>
                          <td className="p-3">{REASONS[r.reason] || r.reason}</td>
                          <td className="p-3 text-stone-600">
                            <a href={`/biens/${r.listing_id}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{r.listing_title}</a>
                            <div className="text-xs text-stone-400">{r.agency}</div>
                          </td>
                          <td className="p-3 text-stone-600 max-w-sm">{r.message}</td>
                          <td className="p-3 text-stone-500">{r.email}</td>
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

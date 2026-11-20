'use client';

import { useEffect, useMemo, useState } from 'react';
import { getSupabase } from '../../lib/supabase';

// Le fichier des contacts : une ligne par personne (regroupée par e-mail), et sous chaque ligne
// tout ce qu'elle a enregistré sur le site, du plus récent au plus ancien.
type Ev = { type: string; at: string; detail: string | null; status: string | null };
type Contact = { email: string; name: string | null; phone: string | null; first_at: string; last_at: string; n: number; has_alert: boolean; events: Ev[] };

const day = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
const when = (d: string) => new Date(d).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const csvCell = (v: string) => `"${v.replace(/"/g, '""')}"`;

export default function Contacts({ token }: { token: string }) {
  const [rows, setRows] = useState<Contact[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    let off = false;
    (async () => {
      const r = await getSupabase().rpc('admin_contacts', { p_token: token });
      if (off) return;
      if (r.error) setFailed(true);
      else setRows((r.data as Contact[]) || []);
    })();
    return () => {
      off = true;
    };
  }, [token]);

  const types = useMemo(() => Array.from(new Set((rows || []).flatMap((c) => c.events.map((e) => e.type)))).sort(), [rows]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (rows || []).filter((c) => {
      if (type && !c.events.some((e) => e.type === type)) return false;
      if (!needle) return true;
      return [c.email, c.name || '', c.phone || '', ...c.events.map((e) => e.detail || '')].join(' ').toLowerCase().includes(needle);
    });
  }, [rows, q, type]);

  function exportCsv() {
    const lines = [['E-mail', 'Nom', 'Téléphone', 'Premier contact', 'Dernière activité', 'Alerte active', 'Nombre d’actions', 'Détail'].map(csvCell).join(';')];
    shown.forEach((c) => {
      const detail = c.events.map((e) => `${when(e.at)} – ${e.type}${e.status ? ` (${e.status})` : ''}${e.detail ? ` : ${e.detail}` : ''}`).join(' | ');
      lines.push([c.email, c.name || '', c.phone || '', day(c.first_at), day(c.last_at), c.has_alert ? 'oui' : 'non', String(c.n), detail].map(csvCell).join(';'));
    });
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `contacts-loftissime-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-serif text-xl">Contacts{rows ? ` (${shown.length}${shown.length !== rows.length ? ` sur ${rows.length}` : ''})` : ''}</h2>
        {rows && rows.length > 0 && (
          <button type="button" onClick={exportCsv} className="text-sm text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
            Exporter en tableur (CSV)
          </button>
        )}
      </div>
      <p className="mb-3 max-w-3xl text-sm text-stone-500">
        Une ligne par personne, regroupée par e-mail. Cliquez sur une ligne pour voir tout ce qu’elle a enregistré : alertes, demandes sur un bien, recherches confiées, courtier, questions, tee-shirts. Les données d’exemple n’y figurent pas.
      </p>
      {failed ? (
        <p className="text-sm text-red-700">Le fichier des contacts n’a pas pu être chargé.</p>
      ) : !rows ? (
        <p className="text-sm text-stone-400">Chargement…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-stone-400">Aucun contact pour le moment.</p>
      ) : (
        <>
          <div className="mb-3 flex flex-wrap gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Chercher un nom, un e-mail, une ville, un bien…" className="h-10 min-w-0 flex-1 rounded-[10px] border border-stone-300 bg-white px-3 text-sm" />
            <select value={type} onChange={(e) => setType(e.target.value)} className="h-10 rounded-[10px] border border-stone-300 bg-white px-3 text-sm">
              <option value="">Toutes les actions</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-stone-200 bg-white">
            <ul className="divide-y divide-stone-200">
              {shown.slice(0, 500).map((c) => {
                const isOpen = open === c.email;
                const counts = c.events.reduce<Record<string, number>>((acc, e) => ({ ...acc, [e.type]: (acc[e.type] || 0) + 1 }), {});
                return (
                  <li key={c.email}>
                    <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : c.email)} className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-left hover:bg-stone-50">
                      <span className="min-w-[14rem] flex-1">
                        <span className="block font-medium text-stone-900">{c.name || c.email}</span>
                        <span className="block text-sm text-stone-500">{[c.name ? c.email : null, c.phone].filter(Boolean).join(' · ')}</span>
                      </span>
                      <span className="flex flex-wrap gap-1.5">
                        {Object.entries(counts).map(([t, n]) => (
                          <span key={t} className="rounded-full bg-[#F4E7B5] px-2.5 py-0.5 text-xs text-stone-800">
                            {t}{n > 1 ? ` × ${n}` : ''}
                          </span>
                        ))}
                      </span>
                      <span className="w-28 flex-none text-right text-sm text-stone-500">{day(c.last_at)}</span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-stone-100 bg-stone-50 px-4 py-4">
                        <p className="text-xs text-stone-500">
                          Premier contact le {day(c.first_at)} · {c.has_alert ? 'une alerte est active' : 'aucune alerte active'} ·{' '}
                          <a href={`mailto:${c.email}`} className="underline underline-offset-2">{c.email}</a>
                          {c.phone && (
                            <>
                              {' · '}
                              <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="underline underline-offset-2">{c.phone}</a>
                            </>
                          )}
                        </p>
                        <ol className="mt-3 space-y-2">
                          {c.events.map((e, i) => (
                            <li key={i} className="grid grid-cols-[7.5rem_1fr] gap-3 text-sm">
                              <span className="text-stone-500">{when(e.at)}</span>
                              <span>
                                <span className="font-medium text-stone-900">{e.type}</span>
                                {e.status && <span className="text-stone-500"> ({e.status})</span>}
                                {e.detail && <span className="text-stone-700"> : {e.detail}</span>}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {shown.length > 500 && <p className="mt-2 text-xs text-stone-500">Les 500 premiers sont affichés. Affinez la recherche, ou exportez le fichier complet.</p>}
        </>
      )}
    </section>
  );
}

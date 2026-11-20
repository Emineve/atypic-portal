'use client';

import { useEffect, useMemo, useState } from 'react';
import { getSupabase } from '../../lib/supabase';

// Le fichier des contacts : à gauche la liste des personnes (une par e-mail), à droite la fiche de
// la personne choisie avec tout ce qu'elle a enregistré sur le site, du plus récent au plus ancien.
type Ev = { type: string; at: string; detail: string | null; status: string | null };
type Contact = { email: string; name: string | null; phone: string | null; first_at: string; last_at: string; n: number; has_alert: boolean; events: Ev[] };

const day = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
const when = (d: string) => new Date(d).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const csvCell = (v: string) => `"${v.replace(/"/g, '""')}"`;
const isTest = (c: Contact) => c.events.every((e) => (e.status || '').includes('test'));

// Les filtres, dans l'ordre où on les lit : ce que la personne a fait sur le site
const FILTERS: { key: string; label: string }[] = [
  { key: '', label: 'Tous' },
  { key: 'alerte', label: 'Alertes' },
  { key: 'demande sur un bien', label: 'Demandes sur un bien' },
  { key: 'recherche confiée', label: 'Recherches confiées' },
  { key: 'courtier', label: 'Courtier' },
  { key: 'question', label: 'Questions' },
  { key: 'tee-shirt', label: 'Tee-shirts' },
  { key: 'architecte', label: 'Architectes' },
  { key: 'agence (espace pro)', label: 'Agences' },
];
const LABEL: Record<string, string> = {
  alerte: 'Alerte',
  'demande sur un bien': 'Demande sur un bien',
  'recherche confiée': 'Recherche confiée à une agence',
  courtier: 'Demande de courtier',
  question: 'Question posée',
  'tee-shirt': 'Tee-shirt demandé',
  architecte: 'Message à un architecte',
  'agence (espace pro)': 'Demande d’agence',
};

export default function Contacts({ token }: { token: string }) {
  const [rows, setRows] = useState<Contact[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [hideTests, setHideTests] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [copied, setCopied] = useState('');

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

  const base = useMemo(() => (rows || []).filter((c) => !hideTests || !isTest(c)), [rows, hideTests]);
  const counts = useMemo(() => {
    const m: Record<string, number> = { '': base.length };
    base.forEach((c) => new Set(c.events.map((e) => e.type)).forEach((t) => (m[t] = (m[t] || 0) + 1)));
    return m;
  }, [base]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return base.filter((c) => {
      if (type && !c.events.some((e) => e.type === type)) return false;
      if (!needle) return true;
      return [c.email, c.name || '', c.phone || '', ...c.events.map((e) => e.detail || '')].join(' ').toLowerCase().includes(needle);
    });
  }, [base, q, type]);
  const current = shown.find((c) => c.email === sel) || null;

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

  async function copy(v: string) {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(v);
      setTimeout(() => setCopied(''), 1500);
    } catch {
      /* ignoré */
    }
  }

  const textLink = 'underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900';

  const Fiche = ({ c }: { c: Contact }) => (
    <div>
      <button type="button" onClick={() => setSel(null)} className={`mb-4 text-sm text-stone-600 lg:hidden ${textLink}`}>
        ← Retour à la liste
      </button>
      <h2 className="font-serif text-3xl leading-tight text-stone-900">{c.name || c.email}</h2>
      <p className="mt-1 text-sm text-stone-500">
        Premier contact le {day(c.first_at)} · {c.has_alert ? 'une alerte active' : 'aucune alerte active'}
        {isTest(c) ? ' · essai' : ''}
      </p>
      <dl className="mt-5 divide-y divide-stone-200 border-y border-stone-200 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <dt className="text-stone-500">E-mail</dt>
          <dd className="flex items-center gap-4">
            <a href={`mailto:${c.email}`} className={`font-medium text-stone-900 ${textLink}`}>{c.email}</a>
            <button type="button" onClick={() => copy(c.email)} className="text-stone-500 hover:text-stone-900">{copied === c.email ? 'Copié' : 'Copier'}</button>
          </dd>
        </div>
        {c.phone && (
          <div className="flex flex-wrap items-center justify-between gap-3 py-3">
            <dt className="text-stone-500">Téléphone</dt>
            <dd className="flex items-center gap-4">
              <a href={`tel:${c.phone.replace(/\s/g, '')}`} className={`font-medium text-stone-900 ${textLink}`}>{c.phone}</a>
              <button type="button" onClick={() => copy(c.phone || '')} className="text-stone-500 hover:text-stone-900">{copied === c.phone ? 'Copié' : 'Copier'}</button>
            </dd>
          </div>
        )}
      </dl>
      <h3 className="mt-8 text-xs uppercase tracking-widest text-stone-500">Ce qu’il a enregistré ({c.events.length})</h3>
      <ol className="mt-3 space-y-3">
        {c.events.map((e, i) => (
          <li key={i} className="rounded-[14px] border border-stone-200 bg-white p-4">
            <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-medium text-stone-900">{LABEL[e.type] || e.type}</span>
              <span className="text-xs text-stone-500">{when(e.at)}</span>
            </p>
            {e.detail && <p className="mt-1.5 text-sm leading-relaxed text-stone-700">{e.detail}</p>}
            {e.status && <p className="mt-1.5 text-xs text-stone-500">{e.status}</p>}
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-serif text-3xl">Contacts{rows ? ` (${shown.length})` : ''}</h1>
        {rows && rows.length > 0 && (
          <button type="button" onClick={exportCsv} className={`text-sm text-stone-900 ${textLink}`}>
            Exporter cette liste (CSV)
          </button>
        )}
      </div>

      {failed ? (
        <p className="mt-6 text-sm text-red-700">Le fichier des contacts n’a pas pu être chargé.</p>
      ) : !rows ? (
        <p className="mt-6 text-sm text-stone-400">Chargement…</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-sm text-stone-400">Aucun contact pour le moment.</p>
      ) : (
        <>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Chercher un nom, un e-mail, un téléphone, une ville, un bien…"
            className="mt-5 h-12 w-full rounded-[10px] border border-stone-300 bg-white px-4 text-base focus:border-stone-900 focus:outline-none"
          />
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {FILTERS.filter((f) => f.key === '' || counts[f.key]).map((f) => (
              <button
                key={f.key}
                type="button"
                aria-pressed={type === f.key}
                onClick={() => { setType(f.key); setSel(null); }}
                className={type === f.key ? 'font-medium text-stone-900 underline underline-offset-8 decoration-2' : 'text-stone-500 hover:text-stone-900'}
              >
                {f.label} <span className="text-stone-400">{counts[f.key] || 0}</span>
              </button>
            ))}
            <button type="button" aria-pressed={hideTests} onClick={() => setHideTests(!hideTests)} className={`ml-auto text-stone-600 ${textLink}`}>
              {hideTests ? 'Afficher mes essais' : 'Masquer mes essais'}
            </button>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,24rem)_1fr]">
            <ul className={`${current ? 'hidden lg:block' : ''} max-h-[70vh] divide-y divide-stone-200 overflow-y-auto rounded-[14px] border border-stone-200 bg-white`}>
              {shown.length === 0 && <li className="p-4 text-sm text-stone-500">Personne ne correspond.</li>}
              {shown.slice(0, 500).map((c) => (
                <li key={c.email}>
                  <button
                    type="button"
                    onClick={() => setSel(c.email)}
                    aria-current={sel === c.email}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left ${sel === c.email ? 'bg-stone-100' : 'hover:bg-stone-50'}`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-stone-900">{c.name || c.email}</span>
                      <span className="block truncate text-sm text-stone-500">
                        {Array.from(new Set(c.events.map((e) => e.type))).join(', ')}
                      </span>
                    </span>
                    <span className="flex-none text-right text-xs text-stone-500">
                      {day(c.last_at)}
                      {c.has_alert && <span className="mt-1 block rounded-full bg-[#F6CF4E] px-2 py-0.5 text-stone-800">alerte</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className={`${current ? '' : 'hidden lg:block'}`}>
              {current ? (
                <Fiche c={current} />
              ) : (
                <p className="rounded-[14px] border border-dashed border-stone-300 p-8 text-sm text-stone-500">
                  Choisissez une personne dans la liste pour voir ses coordonnées et tout ce qu’elle a enregistré.
                </p>
              )}
            </div>
          </div>
          {shown.length > 500 && <p className="mt-2 text-xs text-stone-500">Les 500 premiers sont affichés. Affinez la recherche, ou exportez la liste complète.</p>}
        </>
      )}
    </section>
  );
}

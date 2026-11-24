'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';
import { NEWSLETTERS } from '../../../lib/newsletters';

// Les abonnés de Béton ciré, puis ce que chaque envoi a donné : destinataires, clics par rubrique, désinscriptions.

type Abonne = { email: string; created_at: string; source: string | null; is_active: boolean; unsubscribed_at: string | null; categories: string[] | null; query: string | null; is_demo: boolean; letters: string[] };
type Stats = {
  sends: { numero: number; sent_at: string; recipients: number; test: boolean; subject: string | null }[];
  clicks: { numero: number; rubrique: string; n: number }[];
  actifs: number;
  desinscrits: number;
  inscrits?: number;
};

const RUBRIQUES: [string, string][] = [
  ['video', 'La vidéo'],
  ['une', 'L’annonce du bien à la une'],
  ['vigilance', 'L’article « Avant la promesse »'],
  ['autre1', 'Autre bien 1'],
  ['autre2', 'Autre bien 2'],
  ['autre3', 'Autre bien 3'],
  ['site', 'Lire sur le site'],
];
const jour = (d: string | null) => (d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '');
// d'où vient l'inscription, en clair
const page = (s: string | null) => {
  const k = (s || '').replace(/^lettre-/, '');
  return ({ accueil: 'Accueil', numeros: 'Page Béton ciré', numero: 'Page d’un numéro', pied: 'Pied de page', article: 'Article du guide' } as Record<string, string>)[k] || k || 'Inconnue';
};

export default function Abonnes({ token }: { token: string }) {
  const [list, setList] = useState<Abonne[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const sb = getSupabase();
    sb.rpc('admin_letter_subscribers', { p_token: token }).then(({ data, error: e }) => {
      if (e) setError('Les abonnés n’ont pas pu être chargés. Reconnectez-vous sur la page Administration.');
      setList(Array.isArray(data) ? (data as Abonne[]) : []);
    });
    sb.rpc('admin_letter_stats', { p_token: token }).then(({ data }) => data && setStats(data as Stats));
  }, [token]);

  function exporter() {
    if (!list) return;
    const q = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const lignes = [['E-mail', 'Inscrit le', 'Page', 'État', 'Désinscrit le', 'Rêve de', 'Newsletters'].join(';')].concat(
      list.map((a) => [a.email, jour(a.created_at), page(a.source), a.is_active ? 'Actif' : 'Désinscrit', jour(a.unsubscribed_at), (a.categories || []).join(', ') || a.query || '', (a.letters || []).join(', ')].map(q).join(';')),
    );
    const url = URL.createObjectURL(new Blob(['﻿' + lignes.join('\n')], { type: 'text/csv;charset=utf-8' }));
    const l = document.createElement('a');
    l.href = url;
    l.download = 'abonnes-beton-cire.csv';
    l.click();
    URL.revokeObjectURL(url);
  }

  if (list === null) return <p className="text-sm text-stone-500">Chargement…</p>;
  const envois = (stats?.sends || []).filter((s) => !s.test);
  const essais = (stats?.sends || []).filter((s) => s.test).length;

  return (
    <div className="max-w-4xl">
      {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="text-sm text-stone-700">
          <strong>{stats?.inscrits ?? list.filter((a) => a.is_active).length}</strong> abonné{(stats?.inscrits ?? 0) > 1 ? 's' : ''} actif{(stats?.inscrits ?? 0) > 1 ? 's' : ''}, dont {stats?.actifs ?? 0} à Béton ciré, {stats?.desinscrits ?? 0} désinscrit{(stats?.desinscrits ?? 0) > 1 ? 's' : ''}. Vous recevez un mail à chaque nouvelle inscription.
        </p>
        <button onClick={exporter} disabled={!list.length} className="h-9 px-3 border border-stone-900 text-xs font-semibold uppercase tracking-wider disabled:opacity-40">Exporter la liste</button>
      </div>

      <h2 className="mt-8 font-serif text-lg">Les newsletters choisies</h2>
      <p className="mt-1 text-xs text-stone-500">Parmi les abonnés actifs. Le classement dit laquelle ouvrir après Béton ciré.</p>
      <ul className="mt-3 grid gap-1 text-sm">
        {NEWSLETTERS.map((n) => ({ n, c: list.filter((a) => a.is_active && !a.is_demo && (a.letters || []).includes(n.slug)).length }))
          .sort((x, y) => y.c - x.c)
          .map(({ n, c }) => (
            <li key={n.slug} className="flex items-center gap-3">
              <span className="w-32 shrink-0 font-serif italic">{n.nom}</span>
              <span className="h-2 bg-stone-900" style={{ width: `${Math.min(300, c * 12)}px` }} />
              <span className="tabular-nums text-stone-600">{c}</span>
            </li>
          ))}
      </ul>

      <h2 className="mt-8 font-serif text-lg">Les abonnés</h2>
      <ul className="mt-3 border border-stone-200 bg-white divide-y divide-stone-200">
        {list.map((a) => (
          <li key={a.email + a.created_at} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3 text-sm">
            <span className={a.is_active ? 'font-medium' : 'text-stone-500 line-through'}>{a.email}</span>
            <span className="text-stone-600">
              {jour(a.created_at)}, {page(a.source).toLowerCase()}
              {(a.categories?.length || a.query) && <span className="text-stone-500"> · rêve de : {(a.categories || []).join(', ') || a.query}</span>}
              {!a.is_active && <span> · désinscrit le {jour(a.unsubscribed_at)}</span>}
              {a.is_demo && <span> · adresse de démonstration</span>}
              <span className="block text-stone-500">{(a.letters || []).map((x) => NEWSLETTERS.find((n) => n.slug === x)?.nom || x).join(', ')}</span>
            </span>
          </li>
        ))}
        {list.length === 0 && <li className="px-4 py-8 text-center text-sm text-stone-500">Personne n’est encore abonné.</li>}
      </ul>

      <h2 className="mt-10 font-serif text-lg">Les envois</h2>
      <p className="mt-1 text-xs text-stone-500">
        Les clics sont comptés par rubrique, sans savoir qui a cliqué. Certaines messageries ouvrent les liens toutes seules pour les vérifier : le compte peut être un peu gonflé. Les ouvertures ne sont pas mesurées.
        {essais > 0 && ` ${essais} essai${essais > 1 ? 's' : ''} envoyé${essais > 1 ? 's' : ''} à votre adresse.`}
      </p>
      {envois.length === 0 && <p className="mt-4 border border-stone-200 bg-white px-4 py-8 text-center text-sm text-stone-500">Aucun numéro n’a encore été envoyé aux abonnés.</p>}
      {envois.map((s) => {
        const clics = (stats?.clicks || []).filter((c) => c.numero === s.numero);
        const total = clics.reduce((t, c) => t + c.n, 0);
        return (
          <div key={s.numero + s.sent_at} className="mt-4 border border-stone-200 bg-white p-4">
            <p className="flex flex-wrap items-baseline justify-between gap-4">
              <span className="font-serif text-lg">N° {s.numero} <span className="text-sm text-stone-500">{s.subject}</span></span>
              <span className="text-sm text-stone-600">{jour(s.sent_at)}, {s.recipients} destinataire{s.recipients > 1 ? 's' : ''}, {total} clic{total > 1 ? 's' : ''}</span>
            </p>
            <ul className="mt-3 grid gap-1 text-sm">
              {RUBRIQUES.map(([k, l]) => {
                const n = clics.find((c) => c.rubrique === k)?.n || 0;
                return (
                  <li key={k} className="flex items-center gap-3">
                    <span className="w-56 shrink-0 text-stone-700">{l}</span>
                    <span className="h-2 bg-stone-900" style={{ width: `${total ? Math.round((n / total) * 240) : 0}px` }} />
                    <span className="tabular-nums text-stone-600">{n}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';
import NumeroEditor, { type FullItem } from './NumeroEditor';
import Abonnes from './Abonnes';
import { KINDS } from '../../lettre/Mesure';

// Même clé que la page d'administration : on se connecte d'abord sur /admin
const KEY = 'singulier:admin-token';

type Item = {
  id?: string;
  rubrique: string;
  issue_no: number | null;
  status: string;
  mesure: string | null;
  mesure_detail: string | null;
  phrase: string | null;
  bien: string | null;
  lieu: string | null;
  surface: string | null;
  prix: number | null;
  usage_note: string | null;
  agency_name: string | null;
  agency_url: string | null;
  agency_site: string | null;
  agency_email: string | null;
  agency_phone: string | null;
  contact_name: string | null;
  source: string | null;
  exclusive: boolean | null;
  seen_on: string | null;
  checked_on: string | null;
  contacted_on: string | null;
  answered_on: string | null;
  photos: string;
  online_date: string | null;
  shoot_date: string | null;
  video: string | null;
  video_url: string | null;
  notes: string | null;
  kind: string;
  valeur: number | null;
  ordre: number | null;
  seller: string;
};

const RUBRIQUES: [string, string][] = [
  ['avant_premiere', 'À la une (vidéo)'],
  ['deja_en_ligne', 'Déjà en ligne'],
  ['petit_prix', 'Petit prix'],
];
const STATUTS: [string, string][] = [
  ['repere', 'Repéré'],
  ['retenu', 'Retenu'],
  ['agence_contactee', 'Agence contactée'],
  ['accord', 'Accord reçu'],
  ['refus', 'Refus'],
  ['publie', 'Publié'],
  ['ecarte', 'Écarté'],
  ['vendu', 'Vendu'],
];
const PHOTOS: [string, string][] = [
  ['non_demande', 'Non demandées'],
  ['demande', 'Demandées'],
  ['accorde', 'Accordées'],
  ['refuse', 'Refusées'],
];
const VENDEURS: [string, string][] = [
  ['agence', 'Agence'],
  ['particulier', 'Particulier'],
];
// Tranches de prix, pour classer les biens d'un coup d'œil
const TRANCHES: [string, string, number, number][] = [
  ['p0', 'Moins de 300 000 €', 0, 299999],
  ['p1', '300 000 à 500 000 €', 300000, 500000],
  ['p2', '500 000 à 750 000 €', 500001, 750000],
  ['p3', '750 000 € à 1 M€', 750001, 1000000],
  ['p4', 'Plus de 1 M€', 1000001, Infinity],
];
const VIDEO: [string, string][] = [
  ['', 'Sans objet'],
  ['a_tourner', 'À tourner'],
  ['tournee', 'Tournée'],
  ['montee', 'Montée'],
  ['en_ligne', 'En ligne'],
];

const EMPTY: Item = {
  rubrique: 'deja_en_ligne', issue_no: null, status: 'repere', mesure: '', mesure_detail: '', phrase: '', bien: '', lieu: '',
  surface: '', prix: null, usage_note: '', agency_name: '', agency_url: '', agency_site: '', agency_email: '', agency_phone: '',
  contact_name: '', source: '', exclusive: null, seen_on: null, checked_on: null, contacted_on: null, answered_on: null,
  photos: 'non_demande', online_date: null, shoot_date: null, video: null, video_url: '', notes: '', kind: 'hauteur', valeur: null, ordre: null, seller: 'agence',
};

const label = (list: [string, string][], v: string | null) => list.find((x) => x[0] === (v || ''))?.[1] || '';
const euros = (n: number | null) => (n == null ? '' : n.toLocaleString('fr-FR') + ' €');

export default function AdminAvantPremiere() {
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState('');
  const [edit, setEdit] = useState<Item | null>(null);
  const [filter, setFilter] = useState('tous');
  // Deux tris qui se combinent avec la vue : le vendeur et la tranche de prix
  const [vendeur, setVendeur] = useState('');
  const [tranche, setTranche] = useState('');
  const [parPrix, setParPrix] = useState(false);
  const [saving, setSaving] = useState(false);
  // Deux vues : le numéro tel qu'il paraîtra, ou le suivi des biens et des agences
  const [view, setView] = useState<'numero' | 'biens' | 'abonnes'>('numero');
  // Le visage du site : portail d'annonces ou lettre seule
  const [mode, setMode] = useState<'portail' | 'lettre' | null>(null);

  useEffect(() => {
    getSupabase().rpc('site_mode').then(({ data }) => setMode(data === 'lettre' ? 'lettre' : 'portail'));
  }, []);

  async function switchMode() {
    if (!token || !mode) return;
    const next = mode === 'lettre' ? 'portail' : 'lettre';
    const msg = next === 'lettre'
      ? 'Passer le site en mode lettre ? L’accueil présentera la lettre ; les annonces, les alertes, le financement, l’espace pro et les autres rubriques seront cachés.'
      : 'Revenir au mode portail ? L’accueil montrera de nouveau les annonces et toutes les rubriques reviendront.';
    if (!window.confirm(msg)) return;
    const { data, error: e } = await getSupabase().rpc('admin_set_site_mode', { p_token: token, p_mode: next });
    if (e) {
      setError('Le mode du site n’a pas pu être changé.');
      return;
    }
    setMode(data === 'lettre' ? 'lettre' : 'portail');
  }

  useEffect(() => {
    try {
      setToken(sessionStorage.getItem(KEY) || '');
    } catch {
      setToken('');
    }
  }, []);

  const load = useCallback(async (t: string) => {
    setError('');
    const { data, error: e } = await getSupabase().rpc('admin_letter_items', { p_token: t });
    if (e) {
      setError('Accès refusé ou erreur. Reconnectez-vous sur la page Administration.');
      setItems(null);
      return;
    }
    setItems(Array.isArray(data) ? (data as Item[]) : []);
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const issues = useMemo(() => {
    const s = new Set<number>();
    (items || []).forEach((i) => i.issue_no != null && s.add(i.issue_no));
    return Array.from(s).sort((a, b) => a - b);
  }, [items]);

  const shown = useMemo(() => {
    let list = items || [];
    if (filter === 'reserve') list = list.filter((i) => i.issue_no == null && !['ecarte', 'vendu', 'refus'].includes(i.status));
    else if (filter === 'relance') list = list.filter((i) => i.status === 'agence_contactee' || i.photos === 'demande');
    else if (filter.startsWith('n')) list = list.filter((i) => i.issue_no === Number(filter.slice(1)));
    if (vendeur) list = list.filter((i) => (i.seller || 'agence') === vendeur);
    const t = TRANCHES.find((x) => x[0] === tranche);
    if (t) list = list.filter((i) => i.prix != null && i.prix >= t[2] && i.prix <= t[3]);
    if (parPrix) list = [...list].sort((a, b) => (a.prix ?? Infinity) - (b.prix ?? Infinity));
    return list;
  }, [items, filter, vendeur, tranche, parPrix]);

  async function save() {
    if (!token || !edit) return;
    setSaving(true);
    const clean: Record<string, unknown> = { ...edit };
    // Les champs vides partent en « non renseigné », pas en texte vide
    Object.keys(clean).forEach((k) => {
      if (clean[k] === '') clean[k] = null;
    });
    const { error: e } = await getSupabase().rpc('admin_save_letter_item', { p_token: token, p_item: clean });
    setSaving(false);
    if (e) {
      setError('Enregistrement impossible : ' + e.message);
      return;
    }
    setEdit(null);
    load(token);
  }

  async function remove() {
    if (!token || !edit?.id) return;
    if (!window.confirm('Supprimer ce bien du suivi ? Cette action est définitive.')) return;
    await getSupabase().rpc('admin_delete_letter_item', { p_token: token, p_id: edit.id });
    setEdit(null);
    load(token);
  }

  const input = 'h-10 w-full border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:border-stone-900';
  const lab = 'block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1';
  const set = (k: keyof Item, v: unknown) => setEdit((e) => (e ? { ...e, [k]: v } : e));
  const txt = (k: keyof Item, title: string, type = 'text', ph = '') => (
    <label className="block">
      <span className={lab}>{title}</span>
      <input
        className={input}
        type={type}
        placeholder={ph}
        value={(edit?.[k] as string | number | null) ?? ''}
        onChange={(e) => set(k, type === 'number' ? (e.target.value === '' ? null : Number(e.target.value)) : e.target.value)}
      />
    </label>
  );
  const sel = (k: keyof Item, title: string, list: [string, string][]) => (
    <label className="block">
      <span className={lab}>{title}</span>
      <select className={input} value={(edit?.[k] as string | null) ?? ''} onChange={(e) => set(k, e.target.value || null)}>
        {list.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  );

  if (token === null) return null;

  const chips: [string, string][] = [
    ['tous', 'Tous'],
    ...issues.map((n) => [`n${n}`, `N° ${n}`] as [string, string]),
    ['reserve', 'En réserve'],
    ['relance', 'En attente de réponse'],
  ];

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl">La newsletter</h1>
          {token && items && view === 'biens' && (
            <button onClick={() => setEdit({ ...EMPTY })} className="h-10 px-4 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider">
              Ajouter un bien
            </button>
          )}
        </div>
      </div>

      <div className={`${view === 'numero' ? 'max-w-[1400px]' : 'max-w-6xl'} mx-auto px-6 py-8`}>
        {!token && (
          <p className="text-sm text-stone-600">
            Connectez-vous d&apos;abord sur la page <a href="/admin" className="underline">Administration</a>, puis revenez ici.
          </p>
        )}
        {error && <p className="mb-4 text-sm text-red-700">{error}</p>}

        {items && !edit && mode && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border border-stone-200 bg-white px-4 py-3 text-sm">
            <span>
              Le site est en <strong>{mode === 'lettre' ? 'mode lettre' : 'mode portail'}</strong>.{' '}
              <span className="text-stone-600">{mode === 'lettre' ? 'Les annonces et les autres rubriques sont cachées.' : 'La lettre existe mais n’est pas dans le menu.'} Le changement prend une minute.</span>
            </span>
            <span className="flex items-center gap-5">
              <a href="/apercu/accueil" target="_blank" rel="noreferrer" className="underline underline-offset-4">Voir l’accueil du mode lettre</a>
              <button onClick={switchMode} className="h-9 px-3 border border-stone-900 text-xs font-semibold uppercase tracking-wider">
                {mode === 'lettre' ? 'Revenir au portail' : 'Passer en mode lettre'}
              </button>
            </span>
          </div>
        )}

        {items && !edit && (
          <div className="mb-6 flex gap-2">
            {([['numero', 'Le numéro'], ['biens', 'Les biens et les agences'], ['abonnes', 'Abonnés et résultats']] as const).map(([v, l]) => (
              <button key={v} onClick={() => setView(v)} className={`h-10 px-4 text-sm border ${view === v ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-300 text-stone-700'}`}>
                {l}
              </button>
            ))}
          </div>
        )}

        {items && !edit && view === 'numero' && token && <NumeroEditor token={token} items={items as unknown as FullItem[]} />}
        {items && !edit && view === 'abonnes' && token && <Abonnes token={token} />}

        {items && !edit && view === 'biens' && (
          <>
            <p className="text-sm text-stone-600">
              Le vivier de biens de la newsletter : chaque numéro y choisit son bien à la une et ses trois autres biens. Ici, le lien de l&apos;annonce, le contact avec l&apos;agence ou le propriétaire, la vidéo.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setFilter(v)}
                  className={`h-9 px-3 text-xs border ${filter === v ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-300 text-stone-700'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <select aria-label="Vendeur" value={vendeur} onChange={(e) => setVendeur(e.target.value)} className="h-9 border border-stone-300 bg-white px-2">
                <option value="">Agences et particuliers</option>
                {VENDEURS.map(([v, l]) => (
                  <option key={v} value={v}>{l === 'Agence' ? 'Agences seulement' : 'Particuliers seulement'}</option>
                ))}
              </select>
              <select aria-label="Tranche de prix" value={tranche} onChange={(e) => setTranche(e.target.value)} className="h-9 border border-stone-300 bg-white px-2">
                <option value="">Tous les prix</option>
                {TRANCHES.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
              <label className="flex h-9 items-center gap-2 px-1">
                <input type="checkbox" className="h-4 w-4 accent-stone-900" checked={parPrix} onChange={(e) => setParPrix(e.target.checked)} />
                Du moins cher au plus cher
              </label>
              <span className="text-stone-500">{shown.length} bien{shown.length > 1 ? 's' : ''}</span>
            </div>

            <ul className="mt-5 border border-stone-200 bg-white divide-y divide-stone-200">
              {shown.map((i) => (
                <li key={i.id}>
                  <button onClick={() => setEdit({ ...EMPTY, ...i })} className="w-full text-left px-4 py-3 hover:bg-stone-50">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-serif text-lg">
                        {i.mesure} <span className="italic text-stone-500">{i.mesure_detail}</span>
                      </span>
                      <span className="text-sm tabular-nums">{euros(i.prix)}</span>
                    </span>
                    <span className="mt-1 block text-sm text-stone-600">
                      {[i.lieu, i.surface, i.agency_name].filter(Boolean).join(', ')}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2 py-0.5 bg-stone-900 text-white">{label(STATUTS, i.status)}</span>
                      <span className="px-2 py-0.5 border border-stone-300">{label(RUBRIQUES, i.rubrique)}</span>
                      {i.issue_no != null && <span className="px-2 py-0.5 border border-stone-300">N° {i.issue_no}</span>}
                      <span className="px-2 py-0.5 border border-stone-300">Photos : {label(PHOTOS, i.photos).toLowerCase()}</span>
                      {i.seller === 'particulier' && <span className="px-2 py-0.5 bg-stone-200">Particulier</span>}
                      {!i.agency_url && <span className="px-2 py-0.5 bg-[#F6CF4E]">{i.seller === 'particulier' ? 'Lien de l’annonce manquant' : 'Lien agence manquant'}</span>}
                      {!i.agency_email && i.seller !== 'particulier' && <span className="px-2 py-0.5 bg-[#F6CF4E]">E-mail manquant</span>}
                      {i.usage_note && <span className="px-2 py-0.5 border border-stone-300">{i.usage_note}</span>}
                    </span>
                  </button>
                </li>
              ))}
              {shown.length === 0 && <li className="px-4 py-8 text-center text-sm text-stone-500">Aucun bien dans cette vue.</li>}
            </ul>
          </>
        )}

        {edit && (
          <div className="max-w-3xl">
            <button onClick={() => setEdit(null)} className="text-sm underline underline-offset-4 text-stone-600">Retour à la liste</button>

            <h2 className="mt-6 font-serif text-lg">Dans la lettre</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {sel('rubrique', 'Rubrique', RUBRIQUES)}
              {txt('issue_no', 'Numéro prévu', 'number', 'vide = en réserve')}
              {sel('status', 'Statut', STATUTS)}
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {txt('mesure', 'La caractéristique majeure', 'text', '18 fenêtres')}
              {txt('mesure_detail', 'Ce qu’elle dit du bien', 'text', 'sur les toits de Paris')}
              {sel('kind', 'Dessin', KINDS)}
              {txt('valeur', 'Valeur du dessin (mètres, m² ou étage)', 'number')}
            </div>
            <label className="mt-3 block">
              <span className={lab}>Notre phrase</span>
              <textarea className={`${input} h-20 py-2`} value={edit.phrase ?? ''} onChange={(e) => set('phrase', e.target.value)} />
            </label>

            <h2 className="mt-8 font-serif text-lg">Le bien</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {txt('bien', 'Description en une ligne')}
              {txt('lieu', 'Arrondissement, quartier')}
              {txt('surface', 'Surface')}
              {txt('prix', 'Prix en euros', 'number')}
              {txt('usage_note', 'À signaler au lecteur', 'text', 'usage mixte, à transformer…')}
              {txt('source', 'Repéré sur')}
              {txt('seen_on', 'Repéré le', 'date')}
              {txt('checked_on', 'Disponibilité vérifiée le', 'date')}
            </div>

            <h2 className="mt-8 font-serif text-lg">Le vendeur</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {sel('seller', 'Vendu par', VENDEURS)}
              {txt('agency_name', 'Nom de l’agence (ou « Particulier »)')}
              {txt('contact_name', 'Interlocuteur')}
              {txt('agency_url', 'Lien de l’annonce', 'url')}
              {txt('agency_site', 'Site de l’agence', 'url')}
              {txt('agency_email', 'E-mail', 'email')}
              {txt('agency_phone', 'Téléphone', 'tel')}
              {txt('contacted_on', 'Contactée le', 'date')}
              {txt('answered_on', 'Réponse reçue le', 'date')}
              {sel('photos', 'Photos', PHOTOS)}
              <label className="block">
                <span className={lab}>Exclusivité</span>
                <select
                  className={input}
                  value={edit.exclusive == null ? '' : edit.exclusive ? 'oui' : 'non'}
                  onChange={(e) => set('exclusive', e.target.value === '' ? null : e.target.value === 'oui')}
                >
                  <option value="">Non renseigné</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non, plusieurs agences</option>
                </select>
              </label>
            </div>

            <h2 className="mt-8 font-serif text-lg">La vidéo (bien à la une)</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {sel('video', 'État de la vidéo', VIDEO)}
              {txt('shoot_date', 'Tournage le', 'date')}
              {txt('online_date', 'Mise en ligne par l’agence le', 'date')}
              {txt('video_url', 'Lien de la vidéo', 'url')}
            </div>

            <label className="mt-8 block">
              <span className={lab}>Notes</span>
              <textarea className={`${input} h-24 py-2`} value={edit.notes ?? ''} onChange={(e) => set('notes', e.target.value)} />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button onClick={save} disabled={saving} className="h-11 px-6 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40">
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              {edit.agency_url && (
                <a href={edit.agency_url} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">Voir l’annonce</a>
              )}
              {edit.id && (
                <button onClick={remove} className="text-sm underline underline-offset-4 text-red-700">Supprimer</button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';
import { GUIDE_ARTICLES } from '../../../lib/guide';
import { lettreArticles } from '../../../lib/lettre';
import LetterView, { type LetterContent, type LetterIssue, type LetterItem } from '../../lettre/LetterView';
import { KINDS } from '../../lettre/Mesure';

// Le numéro de la lettre : on le compose à gauche, il se lit à droite tel qu'il paraîtra.

// Un bien du suivi : tous ses champs voyagent, la lettre n'en affiche qu'une partie
export type FullItem = LetterItem & { id?: string; issue_no: number | null; status: string; [k: string]: unknown };

const SHOWN = ['retenu', 'agence_contactee', 'accord', 'publie'];
const RUBRIQUES: [string, string][] = [
  ['deja_en_ligne', 'Déjà en ligne'],
  ['petit_prix', 'Petit prix'],
  ['avant_premiere', 'Avant-première'],
];
const EMPTY_CONTENT: LetterContent = {
  ouverture: { on: true },
  sous_titre: 'Chaque bien est résumé par ce qu’il a de plus singulier. La silhouette fait 1,75 m.',
  articles: [
    { slug: '', rubrique: 'Avant de signer' },
    { slug: '', rubrique: 'Habiter autrement' },
  ],
  carte: { on: false },
  question: { on: true, titre: 'La semaine prochaine,', titre_italique: 'vous aimeriez voir quoi ?', choix: ['Un loft', 'Un atelier', 'Une terrasse', 'Une péniche', 'Surprenez-moi'] },
};

const input = 'h-10 w-full border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:border-stone-900';
const lab = 'block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1';

function Field({ title, value, onChange, type = 'text', area = false, ph = '' }: { title: string; value: string | number | null | undefined; onChange: (v: string) => void; type?: string; area?: boolean; ph?: string }) {
  return (
    <label className="block">
      <span className={lab}>{title}</span>
      {area ? (
        <textarea className={`${input} h-24 py-2`} placeholder={ph} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={input} type={type} placeholder={ph} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function Toggle({ title, on, onChange }: { title: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" className="h-4 w-4 accent-stone-900" checked={on} onChange={(e) => onChange(e.target.checked)} />
      {title}
    </label>
  );
}

export default function IssueEditor({ token, items, reload }: { token: string; items: FullItem[]; reload: () => void }) {
  const [issues, setIssues] = useState<LetterIssue[] | null>(null);
  const [issue, setIssue] = useState<LetterIssue | null>(null);
  const [drafts, setDrafts] = useState<Record<string, FullItem>>({});
  const [state, setState] = useState<'clean' | 'idle' | 'saving' | 'saved' | 'error'>('clean');
  const [message, setMessage] = useState('');

  const loadIssues = useCallback(async () => {
    const { data, error } = await getSupabase().rpc('admin_letter_issues', { p_token: token });
    if (error) {
      setMessage('Les numéros n’ont pas pu être chargés. Reconnectez-vous sur la page Administration.');
      setIssues([]);
      return;
    }
    const list = (Array.isArray(data) ? data : []) as LetterIssue[];
    setIssues(list);
    setIssue((cur) => {
      const keep = cur && list.find((i) => i.numero === cur.numero);
      const pick = keep || [...list].reverse().find((i) => !i.paru) || list[list.length - 1] || null;
      return pick ? { ...pick, content: { ...EMPTY_CONTENT, ...(pick.content || {}) } } : null;
    });
  }, [token]);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  // Les biens du numéro, dans l'ordre choisi, avec les modifications en cours
  const mine = useMemo(() => {
    if (!issue) return [];
    return items
      .map((i) => (i.id && drafts[i.id] ? drafts[i.id] : i))
      .filter((i) => i.issue_no === issue.numero)
      .sort((a, b) => (a.ordre ?? 999) - (b.ordre ?? 999) || (b.prix ?? 0) - (a.prix ?? 0));
  }, [items, drafts, issue]);
  const reserve = useMemo(
    () => items.map((i) => (i.id && drafts[i.id] ? drafts[i.id] : i)).filter((i) => i.issue_no == null && !['ecarte', 'vendu', 'refus'].includes(i.status)),
    [items, drafts],
  );
  const dirty = state === 'idle';

  const setC = (patch: Partial<LetterContent>) => {
    setState('idle');
    setIssue((i) => (i ? { ...i, content: { ...i.content, ...patch } } : i));
  };
  const setI = (patch: Partial<LetterIssue>) => {
    setState('idle');
    setIssue((i) => (i ? { ...i, ...patch } : i));
  };
  const setItem = (it: FullItem, patch: Partial<FullItem>) => {
    if (!it.id) return;
    setState('idle');
    setDrafts((d) => ({ ...d, [it.id as string]: { ...it, ...patch } }));
  };

  function move(idx: number, dir: -1 | 1) {
    const list = [...mine];
    const j = idx + dir;
    if (j < 0 || j >= list.length) return;
    [list[idx], list[j]] = [list[j], list[idx]];
    setState('idle');
    setDrafts((d) => {
      const next = { ...d };
      list.forEach((it, k) => {
        if (it.id) next[it.id] = { ...it, ordre: k + 1 };
      });
      return next;
    });
  }

  function newIssue() {
    const n = Math.max(0, ...(issues || []).map((i) => i.numero)) + 1;
    setState('idle');
    setIssue({ numero: n, date_parution: null, titre: '', resume: '', paru: false, content: { ...EMPTY_CONTENT } });
  }

  async function save() {
    if (!issue) return;
    setState('saving');
    setMessage('');
    const sb = getSupabase();
    const { error } = await sb.rpc('admin_save_letter_issue', { p_token: token, p_issue: issue });
    if (error) {
      setState('error');
      setMessage('Enregistrement impossible : ' + error.message);
      return;
    }
    for (const it of Object.values(drafts)) {
      const clean: Record<string, unknown> = { ...it };
      Object.keys(clean).forEach((k) => {
        if (clean[k] === '') clean[k] = null;
      });
      const { error: e } = await sb.rpc('admin_save_letter_item', { p_token: token, p_item: clean });
      if (e) {
        setState('error');
        setMessage('Un bien n’a pas pu être enregistré : ' + e.message);
        return;
      }
    }
    setDrafts({});
    setState('saved');
    await loadIssues();
    reload();
  }

  if (issues === null) return <p className="text-sm text-stone-500">Chargement…</p>;
  if (!issue)
    return (
      <div>
        {message && <p className="mb-4 text-sm text-red-700">{message}</p>}
        <button onClick={newIssue} className="h-10 px-4 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider">Créer le premier numéro</button>
      </div>
    );

  const c = issue.content;
  const o = c.ouverture || {};
  const preview = mine.filter((i) => SHOWN.includes(i.status));
  const hidden = mine.filter((i) => !SHOWN.includes(i.status));
  const articles = [...GUIDE_ARTICLES].sort((a, b) => a.title.localeCompare(b.title, 'fr'));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_480px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-end gap-3">
          <label className="block">
            <span className={lab}>Numéro</span>
            <select
              className={`${input} w-40`}
              value={issue.numero}
              onChange={(e) => {
                const pick = issues.find((i) => i.numero === Number(e.target.value));
                if (pick) {
                  setDrafts({});
                  setState('clean');
                  setIssue({ ...pick, content: { ...EMPTY_CONTENT, ...(pick.content || {}) } });
                }
              }}
            >
              {!issues.find((i) => i.numero === issue.numero) && <option value={issue.numero}>N° {issue.numero} (nouveau)</option>}
              {issues.map((i) => (
                <option key={i.numero} value={i.numero}>N° {i.numero}{i.paru ? ', paru' : ''}</option>
              ))}
            </select>
          </label>
          <button onClick={newIssue} className="h-10 px-3 border border-stone-300 bg-white text-xs">Nouveau numéro</button>
          <a href={`/lettre/numero-${issue.numero}`} target="_blank" rel="noreferrer" className="h-10 leading-10 text-sm underline underline-offset-4">Voir la page sur le site</a>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <Field title="Date de parution" type="date" value={issue.date_parution} onChange={(v) => setI({ date_parution: v || null })} />
          <Field title="Titre du numéro (dans l’historique)" value={issue.titre} onChange={(v) => setI({ titre: v })} />
        </div>
        <div className="mt-3">
          <Field title="Résumé en une phrase (dans l’historique)" value={issue.resume} onChange={(v) => setI({ resume: v })} />
        </div>
        <div className="mt-3">
          <Toggle title="Numéro paru (les crochets des champs vides disparaissent)" on={issue.paru} onChange={(v) => setI({ paru: v })} />
        </div>

        <h2 className="mt-9 font-serif text-lg">L’ouverture : le bien en avant-première</h2>
        <div className="mt-2">
          <Toggle title="Afficher l’ouverture" on={o.on !== false} onChange={(v) => setC({ ouverture: { ...o, on: v } })} />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Field title="Agence invitée" value={o.agence} onChange={(v) => setC({ ouverture: { ...o, agence: v } })} />
          <Field title="Prix" value={o.prix} ph="1 250 000 €" onChange={(v) => setC({ ouverture: { ...o, prix: v } })} />
          <Field title="La caractéristique majeure" value={o.mesure} ph="6 m" onChange={(v) => setC({ ouverture: { ...o, mesure: v } })} />
          <Field title="Ce qu’elle dit du bien" value={o.detail} ph="sous plafond" onChange={(v) => setC({ ouverture: { ...o, detail: v } })} />
          <Field title="Lien de la vidéo" type="url" value={o.video_url} onChange={(v) => setC({ ouverture: { ...o, video_url: v } })} />
          <Field title="Lien de l’annonce (après mise en ligne)" type="url" value={o.lien} onChange={(v) => setC({ ouverture: { ...o, lien: v } })} />
        </div>
        <div className="mt-3">
          <Field title="Ville, surface, deux lignes, date de mise en ligne" area value={o.texte} onChange={(v) => setC({ ouverture: { ...o, texte: v } })} />
        </div>

        <h2 className="mt-9 font-serif text-lg">Déjà en ligne : les biens du numéro</h2>
        <div className="mt-3">
          <Field title="Phrase sous le titre de la sélection" value={c.sous_titre} onChange={(v) => setC({ sous_titre: v })} />
        </div>
        <ul className="mt-4 space-y-4">
          {mine.map((it, idx) => (
            <li key={it.id} className="border border-stone-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium">
                  {idx + 1}. {it.agency_name || 'Agence à préciser'}
                  {!SHOWN.includes(it.status) && <span className="ml-2 bg-[#F6CF4E] px-1.5 py-0.5 text-[11px] font-normal">statut « {it.status} » : absent de la lettre</span>}
                </span>
                <span className="flex gap-2 text-xs">
                  <button onClick={() => move(idx, -1)} disabled={idx === 0} className="h-8 px-2 border border-stone-300 disabled:opacity-30">Monter</button>
                  <button onClick={() => move(idx, 1)} disabled={idx === mine.length - 1} className="h-8 px-2 border border-stone-300 disabled:opacity-30">Descendre</button>
                  <button onClick={() => setItem(it, { issue_no: null })} className="h-8 px-2 underline underline-offset-4 text-stone-600">Retirer du numéro</button>
                </span>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <Field title="La caractéristique majeure" value={it.mesure} ph="18 fenêtres" onChange={(v) => setItem(it, { mesure: v })} />
                <Field title="Ce qu’elle dit du bien" value={it.mesure_detail} ph="sur les toits de Paris" onChange={(v) => setItem(it, { mesure_detail: v })} />
                <label className="block">
                  <span className={lab}>Dessin</span>
                  <select className={input} value={it.kind} onChange={(e) => setItem(it, { kind: e.target.value })}>
                    {KINDS.map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </label>
                <Field title="Valeur du dessin (mètres, m² ou étage)" type="number" value={it.valeur} onChange={(v) => setItem(it, { valeur: v === '' ? null : Number(v) })} />
                <Field title="Arrondissement, quartier" value={it.lieu} onChange={(v) => setItem(it, { lieu: v })} />
                <Field title="Surface" value={it.surface} onChange={(v) => setItem(it, { surface: v })} />
                <Field title="Prix en euros" type="number" value={it.prix} onChange={(v) => setItem(it, { prix: v === '' ? null : Number(v) })} />
                <label className="block">
                  <span className={lab}>Rubrique</span>
                  <select className={input} value={it.rubrique} onChange={(e) => setItem(it, { rubrique: e.target.value })}>
                    {RUBRIQUES.map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </label>
                <Field title="Nom de l’agence" value={it.agency_name} onChange={(v) => setItem(it, { agency_name: v })} />
                <Field title="Lien de l’annonce chez l’agence" type="url" value={it.agency_url} onChange={(v) => setItem(it, { agency_url: v })} />
              </div>
              <div className="mt-3">
                <Field title="Notre phrase" area value={it.phrase} onChange={(v) => setItem(it, { phrase: v })} />
              </div>
              <div className="mt-3">
                <Field title="À signaler au lecteur" value={it.usage_note} ph="usage mixte, à transformer…" onChange={(v) => setItem(it, { usage_note: v })} />
              </div>
            </li>
          ))}
          {mine.length === 0 && <li className="text-sm text-stone-500">Aucun bien dans ce numéro.</li>}
        </ul>
        {reserve.length > 0 && (
          <label className="mt-4 block max-w-xl">
            <span className={lab}>Ajouter un bien de la réserve</span>
            <select
              className={input}
              value=""
              onChange={(e) => {
                const it = reserve.find((r) => r.id === e.target.value);
                if (it) setItem(it, { issue_no: issue.numero, status: SHOWN.includes(it.status) ? it.status : 'retenu', ordre: mine.length + 1 });
              }}
            >
              <option value="">Choisir…</option>
              {reserve.map((r) => (
                <option key={r.id} value={r.id}>{[r.mesure, r.mesure_detail, r.lieu, r.agency_name].filter(Boolean).join(', ')}</option>
              ))}
            </select>
          </label>
        )}

        <h2 className="mt-9 font-serif text-lg">À lire</h2>
        {(c.articles || []).map((a, k) => (
          <div key={k} className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className={lab}>Article {k + 1}</span>
              <select
                className={input}
                value={a.slug}
                onChange={(e) => setC({ articles: (c.articles || []).map((x, j) => (j === k ? { ...x, slug: e.target.value } : x)) })}
              >
                <option value="">Aucun</option>
                {articles.map((g) => (
                  <option key={g.slug} value={g.slug}>{g.title}</option>
                ))}
              </select>
            </label>
            <Field title="Petit titre au-dessus" value={a.rubrique} onChange={(v) => setC({ articles: (c.articles || []).map((x, j) => (j === k ? { ...x, rubrique: v } : x)) })} />
          </div>
        ))}

        <h2 className="mt-9 font-serif text-lg">L’œil de l’architecte</h2>
        <div className="mt-2">
          <Toggle title="Afficher la rubrique" on={!!c.carte?.on} onChange={(v) => setC({ carte: { ...c.carte, on: v } })} />
        </div>
        {c.carte?.on && (
          <>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <Field title="Nom de l’architecte" value={c.carte.nom} onChange={(v) => setC({ carte: { ...c.carte, nom: v } })} />
              <Field title="Signature (son agence)" value={c.carte.signature} onChange={(v) => setC({ carte: { ...c.carte, signature: v } })} />
            </div>
            <div className="mt-3">
              <Field title="Ce qu’il ou elle ferait du bien sous 500 000 €, avec ses mots" area value={c.carte.texte} onChange={(v) => setC({ carte: { ...c.carte, texte: v } })} />
            </div>
            <div className="mt-3">
              <Field title="Lien vers son site" type="url" value={c.carte.lien} onChange={(v) => setC({ carte: { ...c.carte, lien: v } })} />
            </div>
          </>
        )}

        <h2 className="mt-9 font-serif text-lg">La question à l’abonné</h2>
        <div className="mt-2">
          <Toggle title="Afficher la question" on={c.question?.on !== false} onChange={(v) => setC({ question: { ...c.question, on: v } })} />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Field title="Début de la question" value={c.question?.titre} onChange={(v) => setC({ question: { ...c.question, titre: v } })} />
          <Field title="Fin, en italique" value={c.question?.titre_italique} onChange={(v) => setC({ question: { ...c.question, titre_italique: v } })} />
        </div>
        <div className="mt-3">
          <Field
            title="Réponses proposées, séparées par des virgules"
            value={(c.question?.choix || []).join(', ')}
            onChange={(v) => setC({ question: { ...c.question, choix: v.split(',').map((x) => x.trim()).filter(Boolean) } })}
          />
        </div>

        <div className="sticky bottom-0 mt-8 flex flex-wrap items-center gap-4 border-t border-stone-200 bg-stone-50 py-4">
          <button onClick={save} disabled={state === 'saving'} className="h-11 px-6 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40">
            {state === 'saving' ? 'Enregistrement…' : 'Enregistrer le numéro'}
          </button>
          <span className="text-sm text-stone-600">
            {state === 'saved' ? 'Enregistré. La page du site se met à jour en une minute.' : dirty ? 'L’aperçu montre vos modifications ; elles ne sont pas encore enregistrées.' : ''}
          </span>
          {message && <span className="text-sm text-red-700">{message}</span>}
        </div>
      </div>

      <aside className="min-w-0">
        <div className="lg:sticky lg:top-4">
          <p className={lab}>Aperçu en direct</p>
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border border-stone-300 bg-[#EFE7D6]">
            <div className="lg:w-[600px] lg:[zoom:0.8]">
              <LetterView issue={issue} items={preview} articles={lettreArticles(c)} />
            </div>
          </div>
          {hidden.length > 0 && <p className="mt-2 text-xs text-stone-500">{hidden.length} bien(s) du numéro n’apparaissent pas : leur statut n’est pas « retenu », « agence contactée », « accord » ou « publié ».</p>}
        </div>
      </aside>
    </div>
  );
}

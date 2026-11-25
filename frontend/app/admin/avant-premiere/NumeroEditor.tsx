'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';
import { GUIDE_ARTICLES } from '../../../lib/guide';
import NumeroView from '../../lettre/NumeroView';
import type { LetterItem } from '../../lettre/LetterView';
import { KINDS } from '../../lettre/Mesure';
import { NUMERO_VIDE, biensDuNumero, comptes, estV2, eur, manques, type NumeroContent } from '../../../lib/numero';
import { numeroEmailHtml } from '../../../lib/numeroEmail';
import { MOIS, NEWSLETTERS, themeDe } from '../../../lib/newsletters';

// Un numéro de la newsletter : on le compose à gauche, il se lit à droite tel qu'il paraîtra. En bas, l'envoi.

export type FullItem = LetterItem & { id?: string; issue_no: number | null; status: string; [k: string]: unknown };
type Issue = { numero: number; date_parution: string | null; titre: string | null; resume: string | null; paru: boolean; content: NumeroContent };
type Send = { numero: number; sent_at: string; recipients: number; test: boolean };
type Stats = { sends: Send[]; actifs: number; retenue: boolean; admin: string | null };

const input = 'h-10 w-full border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:border-stone-900';
const lab = 'block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1';

function Field({ title, value, onChange, type = 'text', ph = '', area = false }: { title: string; value: string | number | null | undefined; onChange: (v: string) => void; type?: string; ph?: string; area?: boolean }) {
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

function Bloc({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 border border-stone-200 bg-white p-4">
      <h2 className="font-serif text-lg">{title}</h2>
      {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}

const nombre = (v: string): number | null => (v.trim() === '' || isNaN(Number(v)) ? null : Number(v));

export default function NumeroEditor({ token, items }: { token: string; items: FullItem[] }) {
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [issue, setIssue] = useState<Issue | null>(null);
  const [state, setState] = useState<'clean' | 'idle' | 'saving' | 'saved' | 'error'>('clean');
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [sending, setSending] = useState(false);
  const [sendMsg, setSendMsg] = useState('');

  const ouvrir = (i: Issue): Issue => ({ ...i, content: estV2(i.content) ? { ...NUMERO_VIDE, ...i.content } : { ...NUMERO_VIDE } });

  const loadIssues = useCallback(async () => {
    const sb = getSupabase();
    const { data, error } = await sb.rpc('admin_letter_issues', { p_token: token });
    if (error) {
      setMessage('Les numéros n’ont pas pu être chargés. Reconnectez-vous sur la page Administration.');
      setIssues([]);
      return;
    }
    const list = (Array.isArray(data) ? data : []) as Issue[];
    setIssues(list);
    setIssue((cur) => {
      const keep = cur && list.find((i) => i.numero === cur.numero);
      const pick = keep || [...list].reverse().find((i) => !i.paru) || list[list.length - 1] || null;
      return pick ? ouvrir(pick) : null;
    });
    const s = await sb.rpc('admin_letter_stats', { p_token: token });
    if (!s.error && s.data) setStats(s.data as Stats);
  }, [token]);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const choix = useMemo(() => items.filter((i) => i.id && !['ecarte', 'vendu', 'refus'].includes(i.status)).sort((a, b) => (a.prix ?? 0) - (b.prix ?? 0)), [items]);

  const setC = (patch: Partial<NumeroContent>) => {
    setState('idle');
    setIssue((i) => (i ? { ...i, content: { ...i.content, ...patch } } : i));
  };
  const setI = (patch: Partial<Issue>) => {
    setState('idle');
    setIssue((i) => (i ? { ...i, ...patch } : i));
  };

  function newIssue() {
    const n = Math.max(0, ...(issues || []).map((i) => i.numero)) + 1;
    setState('idle');
    setIssue({ numero: n, date_parution: null, titre: '', resume: '', paru: false, content: { ...NUMERO_VIDE } });
  }

  async function save(): Promise<boolean> {
    if (!issue) return false;
    setState('saving');
    setMessage('');
    // le titre du numéro, dans la liste des numéros, est le surnom du bien à la une
    const titre = [issue.content.surnom, issue.content.surnom_italique].filter((s) => s && s.trim()).join(' ') || issue.titre || '';
    const { error } = await getSupabase().rpc('admin_save_letter_issue', { p_token: token, p_issue: { ...issue, titre, content: { ...issue.content, v: 2 } } });
    if (error) {
      setState('error');
      setMessage('Enregistrement impossible : ' + error.message);
      return false;
    }
    setState('saved');
    await loadIssues();
    return true;
  }

  async function envoyer(test: boolean) {
    if (!issue || !stats) return;
    const c = issue.content;
    const biens = biensDuNumero(c, items);
    if (!c.objet || !c.objet.trim()) {
      setSendMsg('Renseignez d’abord l’objet du mail.');
      return;
    }
    if (!test) {
      const m = manques(c, biens.une, biens.autres);
      const texte =
        `Envoyer le n° ${issue.numero} (${themeDe(c.theme).nom}) à ${stats.actifs} abonné${stats.actifs > 1 ? 's' : ''} ?\n\n` +
        (stats.retenue ? `Le blocage des mails est actif : tout arrivera sur ${stats.admin || 'votre adresse'}, rien ne partira vers les abonnés.\n\n` : 'Les mails partiront vraiment vers les abonnés. Un numéro ne s’envoie qu’une fois.\n\n') +
        (m.length ? `Il manque encore : ${m.join(', ')}. Ces rubriques n’apparaîtront pas dans le mail.\n\n` : '') +
        'Le numéro passera en « paru » et s’affichera sur le site.';
      if (!window.confirm(texte)) return;
    }
    setSending(true);
    setSendMsg('');
    if (!(await save())) {
      setSending(false);
      return;
    }
    const html = numeroEmailHtml(issue.numero, c, biens);
    const { data, error } = await getSupabase().rpc('admin_send_letter', { p_token: token, p_numero: issue.numero, p_subject: c.objet.trim(), p_html: html, p_test: test });
    setSending(false);
    if (error) {
      setSendMsg(error.message.includes('deja envoye') ? 'Ce numéro a déjà été envoyé aux abonnés.' : 'L’envoi n’a pas abouti : ' + error.message);
      return;
    }
    setSendMsg(test ? `Essai envoyé à ${stats.admin || 'votre adresse'}.` : `Envoyé à ${data} abonné${Number(data) > 1 ? 's' : ''}.`);
    await loadIssues();
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
  const biens = biensDuNumero(c, items);
  const k = comptes(c, biens.une);
  const m = manques(c, biens.une, biens.autres);
  const articles = [...GUIDE_ARTICLES].sort((a, b) => a.title.localeCompare(b.title, 'fr'));
  const dejaEnvoye = !!stats?.sends.some((s) => s.numero === issue.numero && !s.test);
  const autres = [0, 1, 2].map((i) => (c.autres_ids || [])[i] || '');
  const setAutre = (i: number, id: string) => {
    const next = [...autres];
    next[i] = id;
    setC({ autres_ids: next.filter(Boolean) });
  };
  const nomBien = (i: FullItem) => `${eur(i.prix)} · ${i.lieu || ''} · ${[i.mesure, i.mesure_detail].filter(Boolean).join(' ')}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_480px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-end gap-3">
          <label className="block">
            <span className={lab}>Numéro</span>
            <select
              className={`${input} w-44`}
              value={issue.numero}
              onChange={(e) => {
                const pick = issues.find((i) => i.numero === Number(e.target.value));
                if (pick) {
                  setState('clean');
                  setIssue(ouvrir(pick));
                }
              }}
            >
              {!issues.some((i) => i.numero === issue.numero) && <option value={issue.numero}>N° {issue.numero} (nouveau)</option>}
              {issues.map((i) => (
                <option key={i.numero} value={i.numero}>N° {i.numero}{i.paru ? ' (paru)' : ''}</option>
              ))}
            </select>
          </label>
          <button onClick={newIssue} className="h-10 px-3 border border-stone-900 text-xs font-semibold uppercase tracking-wider">Nouveau numéro</button>
          <button onClick={() => save()} disabled={state === 'saving' || state === 'clean' || state === 'saved'} className="h-10 px-5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40">
            {state === 'saving' ? 'Enregistrement…' : state === 'saved' ? 'Enregistré' : 'Enregistrer'}
          </button>
          <a href={`/lettre/numero-${issue.numero}`} target="_blank" rel="noreferrer" className="h-10 inline-flex items-center text-sm underline underline-offset-4">Voir la page du numéro</a>
        </div>
        {state === 'idle' && <p className="mt-2 text-xs text-stone-600">Modifications non enregistrées.</p>}
        {message && <p className="mt-2 text-sm text-red-700">{message}</p>}

        <Bloc title="Le thème" hint="Douze thèmes, un par mois. Le nom du thème s’affiche en tête du numéro.">
          <label className="block">
            <span className={lab}>Thème du numéro</span>
            <select className={input} value={c.theme || NEWSLETTERS[0].slug} onChange={(e) => setC({ theme: e.target.value })}>
              {NEWSLETTERS.map((n) => (
                <option key={n.slug} value={n.slug}>{n.nom} ({MOIS[n.mois - 1]}) : {n.sujet}</option>
              ))}
            </select>
          </label>
        </Bloc>

        <Bloc title="Le mail" hint="L’objet est ce que l’abonné lit dans sa boîte avant d’ouvrir. Le résumé s’affiche dans la liste des numéros, sur le site.">
          <Field title="Objet du mail" value={c.objet} onChange={(v) => setC({ objet: v })} ph="L’atelier du Panthéon : 440 000 €, et après ?" />
          <Field title="Résumé en une phrase" value={issue.resume} onChange={(v) => setI({ resume: v })} ph="Un ancien atelier au pied d’un immeuble de 1880." />
        </Bloc>

        <Bloc title="1. Le bien à la une" hint="Le bien se choisit parmi ceux de l’onglet « Les biens et les agences ». Son prix et le lien de son annonce viennent de sa fiche.">
          <label className="block">
            <span className={lab}>Le bien</span>
            <select className={input} value={c.une_id || ''} onChange={(e) => setC({ une_id: e.target.value || undefined })}>
              <option value="">Choisir un bien…</option>
              {choix.map((i) => (
                <option key={i.id} value={i.id}>{nomBien(i)}</option>
              ))}
            </select>
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <Field title="Surnom du bien" value={c.surnom} onChange={(v) => setC({ surnom: v })} ph="L’atelier" />
            <Field title="Suite du surnom, en italique" value={c.surnom_italique} onChange={(v) => setC({ surnom_italique: v })} ph="du Panthéon" />
          </div>
          <Field title="Présentation, en deux phrases (le prix s’ajoute tout seul)" area value={c.chapo} onChange={(v) => setC({ chapo: v })} ph="Paris 5e. Un ancien atelier de 55 m² au sol, au pied d’un immeuble de 1880." />
          <Field title="Lien de la vidéo" type="url" value={c.video_url} onChange={(v) => setC({ video_url: v })} ph="https://…" />
          <Field title="Sous la vidéo : qui fait la visite" value={c.video_legende} onChange={(v) => setC({ video_legende: v })} ph="Deux minutes de visite avec…" />
        </Bloc>

        <Bloc title="Aujourd’hui, demain" hint="À gauche notre dessin du lieu tel qu’il est, à droite le croquis de l’architecte.">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className={lab}>Dessin « aujourd’hui »</span>
              <select className={input} value={c.dessin_kind || ''} onChange={(e) => setC({ dessin_kind: e.target.value || undefined })}>
                <option value="">Celui de la fiche du bien</option>
                {KINDS.filter(([v]) => v !== 'aucun').map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </label>
            <Field title="Valeur du dessin (mètres, m² ou étage)" type="number" value={c.dessin_valeur} onChange={(v) => setC({ dessin_valeur: nombre(v) })} />
          </div>
          <Field title="Aujourd’hui, en une ligne" value={c.aujourdhui} onChange={(v) => setC({ aujourdhui: v })} ph="Une seule pièce de plain-pied." />
          <Field title="Demain, en une ligne" value={c.demain} onChange={(v) => setC({ demain: v })} />
          <Field title="Croquis de l’architecte (adresse de l’image, avec son accord)" type="url" value={c.croquis_url} onChange={(v) => setC({ croquis_url: v })} ph="https://…" />
        </Bloc>

        <Bloc title="L’addition" hint={`Frais de notaire calculés : ${k.notaire != null ? eur(k.notaire) : 'choisissez d’abord le bien'}. Le vrai prix : ${k.total != null ? eur(k.total) : 'il manque les travaux'}.`}>
          <div className="grid gap-3 md:grid-cols-3">
            <Field title="Frais de notaire, en %" type="number" value={c.notaire_pct} onChange={(v) => setC({ notaire_pct: nombre(v) })} ph="8" />
            <Field title="Travaux, en euros" type="number" value={c.travaux} onChange={(v) => setC({ travaux: nombre(v) })} />
            <Field title="Chiffre donné par" value={c.travaux_par} onChange={(v) => setC({ travaux_par: v })} ph="prénom, nom, entreprise" />
          </div>
        </Bloc>

        <Bloc title="Qui pourrait l’acheter ?" hint="L’acheteur que vous imaginez pour ce bien, puis ce que le courtier négocierait pour lui. Ses mots sont les siens.">
          <div className="grid gap-3 md:grid-cols-2">
            <Field title="Qui" value={c.profil_qui} onChange={(v) => setC({ profil_qui: v })} ph="Un prénom, un âge, seul ou à deux" />
            <Field title="Métier" value={c.profil_metier} onChange={(v) => setC({ profil_metier: v })} />
            <Field title="Revenus" value={c.profil_revenus} onChange={(v) => setC({ profil_revenus: v })} ph="par mois, nets" />
            <Field title="Apport" value={c.profil_apport} onChange={(v) => setC({ profil_apport: v })} />
          </div>
          <Field title="Nom du courtier" value={c.courtier_nom} onChange={(v) => setC({ courtier_nom: v })} />
          <Field title="Ce qu’il négocierait pour lui" area value={c.courtier_mots} onChange={(v) => setC({ courtier_mots: v })} />
        </Bloc>

        <Bloc title="Par mois, tout compris" hint={`Total par mois : ${k.mois != null ? eur(k.mois) : 'il manque la mensualité'}. Une mensualité publiée doit être accompagnée de la durée, du taux et des mentions légales fournies par le courtier.`}>
          <div className="grid gap-3 md:grid-cols-4">
            <Field title="Mensualité" type="number" value={c.mensualite} onChange={(v) => setC({ mensualite: nombre(v) })} />
            <Field title="Charges" type="number" value={c.charges} onChange={(v) => setC({ charges: nombre(v) })} />
            <Field title="Énergie" type="number" value={c.energie} onChange={(v) => setC({ energie: nombre(v) })} />
            <Field title="Taxe foncière" type="number" value={c.taxe} onChange={(v) => setC({ taxe: nombre(v) })} />
          </div>
          <Field title="Durée, taux et mentions légales du crédit" area value={c.credit_mentions} onChange={(v) => setC({ credit_mentions: v })} />
        </Bloc>

        <Bloc title="2. Avant la promesse" hint="Le point à vérifier pour ce bien, écrit par Loftissime, et l’article du site qui le développe.">
          <Field title="La question" value={c.vigilance_question} onChange={(v) => setC({ vigilance_question: v })} />
          <Field title="En deux phrases" area value={c.vigilance_texte} onChange={(v) => setC({ vigilance_texte: v })} />
          <label className="block">
            <span className={lab}>L’article du site</span>
            <select className={input} value={c.vigilance_slug || ''} onChange={(e) => setC({ vigilance_slug: e.target.value || undefined })}>
              <option value="">Aucun</option>
              {articles.map((g) => (
                <option key={g.slug} value={g.slug}>{g.title}</option>
              ))}
            </select>
          </label>
        </Bloc>

        <Bloc title="3. Trois autres biens">
          {[0, 1, 2].map((i) => (
            <label key={i} className="block">
              <span className={lab}>Bien {i + 1}</span>
              <select className={input} value={autres[i]} onChange={(e) => setAutre(i, e.target.value)}>
                <option value="">Aucun</option>
                {choix.filter((x) => x.id !== c.une_id).map((x) => (
                  <option key={x.id} value={x.id}>{nomBien(x)}</option>
                ))}
              </select>
            </label>
          ))}
        </Bloc>

        <Bloc title="4. La question, et la fin">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4 accent-stone-900" checked={c.question_on !== false} onChange={(e) => setC({ question_on: e.target.checked })} />
            Afficher « Et vous, vous rêvez de quoi ? »
          </label>
          <Field title="Ont collaboré à ce numéro" value={c.collaborateurs} onChange={(v) => setC({ collaborateurs: v })} ph="Prénom Nom, architecte ; Prénom Nom, entrepreneur…" />
        </Bloc>

        <section className="mt-6 border border-stone-900 bg-white p-4">
          <h2 className="font-serif text-lg">L’envoi</h2>
          {m.length > 0 && <p className="mt-2 text-sm text-stone-700">Il manque encore : {m.join(', ')}. Ce qui manque n’apparaît pas dans le mail.</p>}
          {stats && (
            <p className="mt-2 text-sm text-stone-700">
              {stats.actifs} abonné{stats.actifs > 1 ? 's' : ''} actif{stats.actifs > 1 ? 's' : ''}.{' '}
              {stats.retenue ? `Le blocage des mails est actif : tout envoi arrive sur ${stats.admin || 'votre adresse'}, rien ne part vers les abonnés.` : 'Le blocage des mails est levé : un envoi part vraiment vers les abonnés.'}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button onClick={() => envoyer(true)} disabled={sending} className="h-10 px-4 border border-stone-900 text-xs font-semibold uppercase tracking-wider disabled:opacity-40">M’envoyer un essai</button>
            <button onClick={() => envoyer(false)} disabled={sending || dejaEnvoye} className="h-10 px-4 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40">
              {dejaEnvoye ? 'Déjà envoyé' : 'Envoyer aux abonnés'}
            </button>
            {sending && <span className="text-sm text-stone-500">Envoi…</span>}
          </div>
          {sendMsg && <p role="status" className="mt-3 text-sm text-stone-900">{sendMsg}</p>}
        </section>
      </div>

      <div className="lg:sticky lg:top-4 lg:self-start">
        <p className={lab}>Aperçu</p>
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border border-stone-200 bg-[#EFE7D6] p-3">
          <NumeroView numero={issue.numero} c={c} items={biens} brouillon />
        </div>
      </div>
    </div>
  );
}

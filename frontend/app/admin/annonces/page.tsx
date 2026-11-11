'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSupabase } from '../../../lib/supabase';
import { CATEGORY_LIST } from '../../../lib/catalog';

// Même clé que la page d'administration : on se connecte d'abord sur /admin
const KEY = 'singulier:admin-token';

interface Listing {
  id: string;
  source_agency: string;
  source_url: string;
  title: string;
  short_description: string | null;
  price: number;
  surface_sqm: number | null;
  rooms: number | null;
  bedrooms: number | null;
  city: string;
  postal_code: string | null;
  district: string | null;
  atypic_category: string;
  atypic_tags: string[] | null;
  curation_score: number | null;
  cover_image_url: string | null;
  images: string[] | null;
  is_active: boolean;
  floor: number | null;
  dpe_class: string | null;
  ges_class: string | null;
  charges_yearly: number | null;
  contact_name: string | null;
  contact_phone: string | null;
}

// Tous les champs du formulaire sont des textes ; la conversion se fait à l'enregistrement
interface Form {
  id: string | null;
  title: string;
  source_agency: string;
  source_url: string;
  short_description: string;
  price: string;
  surface_sqm: string;
  rooms: string;
  bedrooms: string;
  city: string;
  postal_code: string;
  district: string;
  atypic_category: string;
  atypic_tags: string;
  curation_score: string;
  images: string;
  floor: string;
  dpe_class: string;
  ges_class: string;
  charges_yearly: string;
  contact_name: string;
  contact_phone: string;
  is_active: boolean;
}

const EMPTY: Form = {
  id: null, title: '', source_agency: '', source_url: '', short_description: '', price: '', surface_sqm: '',
  rooms: '', bedrooms: '', city: '', postal_code: '', district: '', atypic_category: CATEGORY_LIST[0],
  atypic_tags: '', curation_score: '0', images: '', floor: '', dpe_class: '', ges_class: '', charges_yearly: '',
  contact_name: '', contact_phone: '', is_active: true,
};

const CLASSES = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

function str(v: number | string | null | undefined): string {
  return v === null || v === undefined ? '' : String(v);
}

function toForm(l: Listing): Form {
  return {
    id: l.id,
    title: l.title,
    source_agency: l.source_agency,
    source_url: l.source_url,
    short_description: l.short_description || '',
    price: str(l.price),
    surface_sqm: str(l.surface_sqm),
    rooms: str(l.rooms),
    bedrooms: str(l.bedrooms),
    city: l.city,
    postal_code: l.postal_code || '',
    district: l.district || '',
    atypic_category: l.atypic_category,
    atypic_tags: (l.atypic_tags || []).join(', '),
    curation_score: str(l.curation_score ?? 0),
    images: (l.images || []).join('\n'),
    floor: str(l.floor),
    dpe_class: l.dpe_class || '',
    ges_class: l.ges_class || '',
    charges_yearly: str(l.charges_yearly),
    contact_name: l.contact_name || '',
    contact_phone: l.contact_phone || '',
    is_active: l.is_active,
  };
}

function euro(n: number) {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €';
}

// Accepte « 1 250 000 », « 1250000 € », « 88,5 »
function num(s: string): string {
  return s.replace(/[^\d,.-]/g, '').replace(',', '.');
}

export default function AdminAnnonces() {
  const [token, setToken] = useState<string | null>(null);
  const [rows, setRows] = useState<Listing[] | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState<Form | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState<'all' | 'active' | 'hidden'>('all');

  useEffect(() => {
    try {
      setToken(sessionStorage.getItem(KEY) || '');
    } catch {
      setToken('');
    }
  }, []);

  const load = useCallback(async (t: string) => {
    setError('');
    const { data, error: e } = await getSupabase().rpc('admin_listings', { p_token: t });
    if (e) {
      setError('Accès refusé ou erreur. Reconnectez-vous sur le tableau de bord.');
      setRows(null);
      return;
    }
    setRows((data as Listing[]) || []);
  }, []);

  useEffect(() => {
    if (token) load(token);
  }, [token, load]);

  const agencies = useMemo(() => {
    const set = new Set<string>();
    (rows || []).forEach((r) => set.add(r.source_agency));
    return Array.from(set).sort();
  }, [rows]);

  const categories = useMemo(() => {
    const set = new Set<string>(CATEGORY_LIST);
    (rows || []).forEach((r) => set.add(r.atypic_category));
    return Array.from(set);
  }, [rows]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (rows || []).filter((r) => {
      if (show === 'active' && !r.is_active) return false;
      if (show === 'hidden' && r.is_active) return false;
      if (!q) return true;
      return [r.title, r.source_agency, r.city, r.district || '', r.contact_name || ''].join(' ').toLowerCase().includes(q);
    });
  }, [rows, search, show]);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function openForm(f: Form) {
    setError('');
    setNotice('');
    setForm(f);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function save() {
    if (!token || !form) return;
    setError('');
    setNotice('');
    setSaving(true);
    const payload = {
      title: form.title,
      source_agency: form.source_agency,
      source_url: form.source_url,
      short_description: form.short_description,
      price: num(form.price),
      surface_sqm: num(form.surface_sqm),
      rooms: num(form.rooms),
      bedrooms: num(form.bedrooms),
      city: form.city,
      postal_code: form.postal_code,
      district: form.district,
      atypic_category: form.atypic_category,
      atypic_tags: form.atypic_tags.split(',').map((t) => t.trim()).filter(Boolean),
      curation_score: num(form.curation_score),
      images: form.images.split(/\s+/).map((t) => t.trim()).filter(Boolean),
      floor: num(form.floor),
      dpe_class: form.dpe_class,
      ges_class: form.ges_class,
      charges_yearly: num(form.charges_yearly),
      contact_name: form.contact_name,
      contact_phone: form.contact_phone,
      is_active: form.is_active,
    };
    const { error: e } = await getSupabase().rpc('admin_save_listing', { p_token: token, p_id: form.id, p_data: payload });
    setSaving(false);
    if (e) {
      setError('Enregistrement impossible : ' + e.message);
      return;
    }
    setNotice(form.id ? 'Annonce mise à jour.' : 'Annonce ajoutée.');
    setForm(null);
    load(token);
  }

  async function toggle(l: Listing) {
    if (!token) return;
    setNotice('');
    const { error: e } = await getSupabase().rpc('admin_set_listing_active', { p_token: token, p_id: l.id, p_active: !l.is_active });
    if (e) {
      setError('Modification impossible : ' + e.message);
      return;
    }
    load(token);
  }

  const input = 'h-11 w-full border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:border-stone-900';
  const label = 'block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1';

  if (token === null) return null;

  const activeCount = (rows || []).filter((r) => r.is_active).length;
  const previews = form ? form.images.split(/\s+/).map((t) => t.trim()).filter(Boolean).slice(0, 8) : [];

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <h1 className="font-serif text-xl">Annonces</h1>
          {rows && !form && (
            <button onClick={() => openForm({ ...EMPTY })} className="h-10 px-5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider">
              Ajouter une annonce
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!token && (
          <p className="text-sm text-stone-600">
            Connectez-vous d&apos;abord sur le <a href="/admin" className="underline">tableau de bord</a>, puis revenez ici.
          </p>
        )}
        {error && <p className="mb-4 text-sm text-red-700">{error}</p>}
        {notice && <p className="mb-4 text-sm text-green-700">{notice}</p>}

        {form && (
          <section className="mb-10 border border-stone-300 bg-white p-6">
            <h2 className="font-serif text-lg">{form.id ? 'Modifier l’annonce' : 'Nouvelle annonce'}</h2>
            <p className="mt-1 text-xs text-stone-500">Les champs marqués d&apos;une étoile sont obligatoires.</p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={label}>Titre *</label>
                <input className={input} value={form.title} onChange={(e) => set('title', e.target.value)} />
              </div>
              <div>
                <label className={label}>Agence *</label>
                <input className={input} list="agences-connues" value={form.source_agency} onChange={(e) => set('source_agency', e.target.value)} />
                <datalist id="agences-connues">
                  {agencies.map((a) => (
                    <option key={a} value={a} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className={label}>Lien de l&apos;annonce d&apos;origine *</label>
                <input className={input} placeholder="https://…" value={form.source_url} onChange={(e) => set('source_url', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className={label}>Descriptif court</label>
                <textarea
                  className="w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900"
                  rows={3}
                  value={form.short_description}
                  onChange={(e) => set('short_description', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 grid-cols-2 md:grid-cols-4">
              <div>
                <label className={label}>Prix (€) *</label>
                <input className={input} inputMode="numeric" value={form.price} onChange={(e) => set('price', e.target.value)} />
              </div>
              <div>
                <label className={label}>Surface (m²)</label>
                <input className={input} inputMode="decimal" value={form.surface_sqm} onChange={(e) => set('surface_sqm', e.target.value)} />
              </div>
              <div>
                <label className={label}>Pièces</label>
                <input className={input} inputMode="numeric" value={form.rooms} onChange={(e) => set('rooms', e.target.value)} />
              </div>
              <div>
                <label className={label}>Chambres</label>
                <input className={input} inputMode="numeric" value={form.bedrooms} onChange={(e) => set('bedrooms', e.target.value)} />
              </div>
              <div>
                <label className={label}>Ville *</label>
                <input className={input} placeholder="Paris 16e" value={form.city} onChange={(e) => set('city', e.target.value)} />
              </div>
              <div>
                <label className={label}>Code postal</label>
                <input className={input} value={form.postal_code} onChange={(e) => set('postal_code', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className={label}>Quartier</label>
                <input className={input} placeholder="Village d'Auteuil" value={form.district} onChange={(e) => set('district', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className={label}>Catégorie *</label>
                <select className={input} value={form.atypic_category} onChange={(e) => set('atypic_category', e.target.value)}>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className={label}>Atouts (séparés par des virgules)</label>
                <input className={input} placeholder="Dernier étage, Terrasse, Vue Tour Eiffel" value={form.atypic_tags} onChange={(e) => set('atypic_tags', e.target.value)} />
              </div>
              <div>
                <label className={label}>Étage</label>
                <input className={input} inputMode="numeric" value={form.floor} onChange={(e) => set('floor', e.target.value)} />
              </div>
              <div>
                <label className={label}>Charges par an (€)</label>
                <input className={input} inputMode="numeric" value={form.charges_yearly} onChange={(e) => set('charges_yearly', e.target.value)} />
              </div>
              <div>
                <label className={label}>DPE</label>
                <select className={input} value={form.dpe_class} onChange={(e) => set('dpe_class', e.target.value)}>
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>{c || 'Non renseigné'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>GES</label>
                <select className={input} value={form.ges_class} onChange={(e) => set('ges_class', e.target.value)}>
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>{c || 'Non renseigné'}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className={label}>Nom du contact</label>
                <input className={input} value={form.contact_name} onChange={(e) => set('contact_name', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className={label}>Téléphone du contact</label>
                <input className={input} value={form.contact_phone} onChange={(e) => set('contact_phone', e.target.value)} />
              </div>
            </div>

            <div className="mt-4">
              <label className={label}>Photos (une adresse par ligne, la première sert de couverture)</label>
              <textarea
                className="w-full border border-stone-300 bg-white px-3 py-2 text-xs font-mono focus:outline-none focus:border-stone-900"
                rows={5}
                value={form.images}
                onChange={(e) => set('images', e.target.value)}
              />
              {previews.length > 0 && (
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {previews.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={src} src={src} alt="" className="h-20 w-28 object-cover bg-stone-200 flex-none" />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className={label}>Note de sélection (0 à 100, jamais affichée)</label>
                <input className={input} inputMode="numeric" value={form.curation_score} onChange={(e) => set('curation_score', e.target.value)} />
                <p className="mt-1 text-xs text-stone-500">Plus la note est haute, plus le bien remonte dans l&apos;ordre « Sélection ».</p>
              </div>
              <label className="flex items-center gap-3 text-sm md:mt-6">
                <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} className="h-4 w-4" />
                Annonce visible sur le site
              </label>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <button onClick={save} disabled={saving} className="h-11 px-6 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-40">
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button onClick={() => setForm(null)} className="text-sm text-stone-500 underline underline-offset-4">
                Annuler
              </button>
            </div>
          </section>
        )}

        {rows && (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <input
                className="h-10 w-full sm:w-72 border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:border-stone-900"
                placeholder="Rechercher un titre, une agence, une ville…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="h-10 border border-stone-300 bg-white px-3 text-sm"
                value={show}
                onChange={(e) => setShow(e.target.value as 'all' | 'active' | 'hidden')}
              >
                <option value="all">Toutes ({rows.length})</option>
                <option value="active">Visibles ({activeCount})</option>
                <option value="hidden">Masquées ({rows.length - activeCount})</option>
              </select>
            </div>

            <div className="mt-4 overflow-x-auto border border-stone-200 bg-white">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="bg-stone-100 text-left text-[11px] font-semibold uppercase tracking-wider text-stone-600">
                    <th className="px-4 py-3">Annonce</th>
                    <th className="px-3 py-3">Agence</th>
                    <th className="px-3 py-3 text-right">Prix</th>
                    <th className="px-3 py-3 text-right">Surface</th>
                    <th className="px-3 py-3 text-right">Note</th>
                    <th className="px-3 py-3">État</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className={`border-t border-stone-200 align-middle ${l.is_active ? '' : 'bg-stone-50 text-stone-400'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 flex-none bg-stone-200 overflow-hidden">
                            {l.cover_image_url && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={l.cover_image_url} alt="" loading="lazy" className="h-full w-full object-cover" />
                            )}
                          </div>
                          <div>
                            <span className="block">{l.title}</span>
                            <span className="block text-xs text-stone-500">
                              {[l.city, l.district, l.atypic_category].filter(Boolean).join(' · ')}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">{l.source_agency}</td>
                      <td className="px-3 py-3 text-right tabular-nums whitespace-nowrap">{euro(Number(l.price))}</td>
                      <td className="px-3 py-3 text-right tabular-nums whitespace-nowrap">{l.surface_sqm ? `${Math.round(Number(l.surface_sqm))} m²` : '–'}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{l.curation_score ?? 0}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{l.is_active ? 'Visible' : 'Masquée'}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openForm(toForm(l))} className="h-9 px-3 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider">
                          Modifier
                        </button>
                        <button onClick={() => toggle(l)} className="ml-3 text-xs underline underline-offset-4 text-stone-600">
                          {l.is_active ? 'Masquer' : 'Afficher'}
                        </button>
                        <a href={`/biens/${l.id}`} target="_blank" rel="noreferrer" className="ml-3 text-xs underline underline-offset-4 text-stone-600">
                          Voir
                        </a>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-stone-500">Aucune annonce ne correspond.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Sparkles, Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import AlertBox from './AlertBox';
import FooterLinks from './FooterLinks';
import Tracker from './Tracker';
import { trackEvent } from '../lib/track';

// Passer à false quand la base contiendra de vraies annonces d'agences
const DEMO_MODE = true;
const FAVORITES_KEY = 'singulier:favorites';
const NEW_DAYS = 14;

export interface Listing {
  id: string;
  title: string;
  short_description: string;
  price: number;
  surface_sqm: number | null;
  rooms: number | null;
  city: string;
  district: string | null;
  postal_code: string | null;
  source_agency: string;
  source_url: string;
  atypic_category: string;
  atypic_tags: string[] | null;
  curation_score: number | null;
  first_seen_at: string | null;
  cover_image_url: string;
}

const CATEGORIES = [
  "Tous les biens",
  "Loft & Atelier",
  "Atelier d'artiste",
  "Péniche",
  "Rooftop & Vue",
  "Biens de caractère"
];

const SORTS = [
  { value: 'selection', label: 'Sélection' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'recent', label: 'Date de publication' },
  { value: 'surface_desc', label: 'Surface décroissante' },
  { value: 'surface_asc', label: 'Surface croissante' },
];

function normalize(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function isNew(date: string | null) {
  if (!date) return false;
  return Date.now() - new Date(date).getTime() < NEW_DAYS * 86400000;
}

export default function HomeClient({ initialListings }: { initialListings: Listing[] }) {
  const listings = initialListings;
  const loading = false;
  const errorMessage = null as string | null;

  const [selectedCategory, setSelectedCategory] = useState("Tous les biens");
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('selection');
  const [showFilters, setShowFilters] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [surfaceMin, setSurfaceMin] = useState('');
  const [roomsMin, setRoomsMin] = useState('');

  const [favorites, setFavorites] = useState<string[]>([]);
  const [onlyFavs, setOnlyFavs] = useState(false);

  // Favoris mémorisés dans le navigateur
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavorites(parsed.filter((x) => typeof x === 'string'));
      }
    } catch {
      /* stockage indisponible : les favoris fonctionnent le temps de la visite */
    }
  }, []);

  // Panneau de filtres : on bloque le défilement de la page derrière, Échap le ferme
  useEffect(() => {
    if (!showFilters) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowFilters(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [showFilters]);

  function toggleFavorite(id: string) {
    const adding = !favorites.includes(id);
    const next = adding ? [...favorites, id] : favorites.filter((x) => x !== id);
    setFavorites(next);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    } catch {
      /* ignoré */
    }
    if (adding) trackEvent('favorite', id);
  }

  function resetAll() {
    setSelectedCategory("Tous les biens");
    setQuery('');
    setSort('selection');
    setPriceMin('');
    setPriceMax('');
    setSurfaceMin('');
    setRoomsMin('');
    setOnlyFavs(false);
  }

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    const pMin = priceMin ? Number(priceMin) : null;
    const pMax = priceMax ? Number(priceMax) : null;
    const sMin = surfaceMin ? Number(surfaceMin) : null;
    const rMin = roomsMin ? Number(roomsMin) : null;

    const filtered = listings.filter((item) => {
      if (selectedCategory !== "Tous les biens" && item.atypic_category !== selectedCategory) return false;
      if (onlyFavs && !favorites.includes(item.id)) return false;
      if (q) {
        const haystack = normalize(
          [item.city, item.district, item.postal_code, item.title, item.atypic_category, ...(item.atypic_tags || [])]
            .filter(Boolean)
            .join(' ')
        );
        if (!haystack.includes(q)) return false;
      }
      const price = Number(item.price);
      if (pMin !== null && price < pMin) return false;
      if (pMax !== null && price > pMax) return false;
      if (sMin !== null && (item.surface_sqm === null || Number(item.surface_sqm) < sMin)) return false;
      if (rMin !== null && (item.rooms === null || Number(item.rooms) < rMin)) return false;
      return true;
    });

    const time = (d: string | null) => (d ? new Date(d).getTime() : 0);
    const num = (v: number | null) => (v === null || v === undefined ? 0 : Number(v));

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price_desc': return Number(b.price) - Number(a.price);
        case 'price_asc': return Number(a.price) - Number(b.price);
        case 'recent': return time(b.first_seen_at) - time(a.first_seen_at);
        case 'surface_desc': return num(b.surface_sqm) - num(a.surface_sqm);
        case 'surface_asc': return num(a.surface_sqm) - num(b.surface_sqm);
        default: {
          // Sélection : note interne (jamais affichée), puis les plus récents
          const diff = num(b.curation_score) - num(a.curation_score);
          return diff !== 0 ? diff : time(b.first_seen_at) - time(a.first_seen_at);
        }
      }
    });
  }, [listings, selectedCategory, onlyFavs, favorites, query, priceMin, priceMax, surfaceMin, roomsMin, sort]);

  const activeFilters = [priceMin, priceMax, surfaceMin, roomsMin].filter(Boolean).length;
  const anythingActive =
    activeFilters > 0 || query.trim() !== '' || selectedCategory !== 'Tous les biens' || onlyFavs || sort !== 'selection';

  function resetFilters() {
    setPriceMin('');
    setPriceMax('');
    setSurfaceMin('');
    setRoomsMin('');
  }

  const input = 'border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <Tracker />
      {DEMO_MODE && (
        <div className="bg-stone-900 text-stone-100 text-center text-xs tracking-wide py-2 px-4">
          <span className="sm:hidden">Version de démonstration · annonces à titre d'exemple</span>
          <span className="hidden sm:inline">Version de démonstration : annonces et photos issues de sites d'agences, présentées à titre d'exemple. Chaque fiche renvoie vers l'annonce d'origine.</span>        </div>
      )}

      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-2xl font-bold tracking-widest uppercase">
              SINGULIER
            </span>
            <span className="hidden sm:inline text-[10px] tracking-widest text-stone-400 uppercase font-mono">
              Curateur Atypique · France
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
                        <a href="/" className="hidden md:inline text-stone-900 border-b border-black pb-1">Collection</a>
            <a href="/classement" className="hidden md:inline text-stone-500 hover:text-stone-900 transition">Nos règles</a>
            <button
              onClick={() => setOnlyFavs((v) => !v)}
              className={`inline-flex items-center gap-1.5 transition ${onlyFavs ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
              aria-pressed={onlyFavs}
            >
              <Heart className={`w-4 h-4 ${onlyFavs ? 'fill-current' : ''}`} />
              Mes favoris{favorites.length > 0 ? ` (${favorites.length})` : ''}
            </button>
          </div>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-6 pt-10 md:pt-16 pb-8 md:pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 text-stone-600 text-xs tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Sélection éditoriale · Lieux singuliers.
        </div>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.15]">
          L'anthologie des lieux d'exception.
        </h1>
        <p className="mt-5 text-stone-500 max-w-2xl mx-auto font-light text-base md:text-lg">
          Ateliers d'artistes sous verrière, lofts industriels, péniches et rooftops curatés parmi les plus beaux mandats du marché.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="max-w-3xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ville, arrondissement, mot-clé…"
              className="w-full h-14 pl-12 pr-4 bg-white border border-stone-300 text-base focus:outline-none focus:border-stone-900"
              aria-label="Rechercher un lieu"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="h-14 px-4 sm:px-5 border border-stone-300 bg-white text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:border-stone-900 transition"
            aria-haspopup="dialog"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtres{activeFilters > 0 ? ` (${activeFilters})` : ''}</span>
          </button>
        </div>

        <div className="mt-5 -mx-6 px-6 flex gap-2 overflow-x-auto md:flex-wrap md:justify-center md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`shrink-0 whitespace-nowrap text-xs uppercase tracking-wider px-4 py-2.5 border transition ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 text-xs uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setShowAlert((v) => !v)}
            className="text-stone-500 hover:text-stone-900 transition"
            aria-expanded={showAlert}
          >
            Créer une alerte
          </button>
          {anythingActive && (
            <button type="button" onClick={resetAll} className="text-stone-500 hover:text-stone-900 transition">
              Tout réinitialiser
            </button>
          )}
        </div>

        {showAlert && (
          <div className="max-w-3xl mx-auto mt-4 border border-stone-200 bg-white p-4">
            <p className="text-xs text-stone-600 mb-3">
              Recevez par email les nouveaux biens correspondant à votre recherche actuelle (lieu, catégorie, filtres).
            </p>
            <AlertBox
              kind="alert"
              criteria={{ query, category: selectedCategory, priceMin, priceMax, surfaceMin, roomsMin }}
            />
          </div>
        )}
      </section>

      {showFilters && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Filtres">
          <div className="absolute inset-0 bg-stone-900/40" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-full md:max-w-md bg-white flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200 shrink-0">
              <h2 className="font-serif text-xl text-stone-900">Filtres</h2>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                aria-label="Fermer les filtres"
                className="h-11 w-11 -mr-3 flex items-center justify-center text-stone-600 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Budget (€)</p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="50000"
                    placeholder="Minimum"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="h-12 border border-stone-300 bg-white px-3 text-base focus:outline-none focus:border-stone-900"
                    aria-label="Prix minimum"
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="50000"
                    placeholder="Maximum"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="h-12 border border-stone-300 bg-white px-3 text-base focus:outline-none focus:border-stone-900"
                    aria-label="Prix maximum"
                  />
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Surface minimum (m²)</p>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="10"
                  placeholder="Indifférent"
                  value={surfaceMin}
                  onChange={(e) => setSurfaceMin(e.target.value)}
                  className="mt-2 w-full h-12 border border-stone-300 bg-white px-3 text-base focus:outline-none focus:border-stone-900"
                  aria-label="Surface minimum"
                />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Pièces</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    ['', 'Indifférent'],
                    ['1', '1+'],
                    ['2', '2+'],
                    ['3', '3+'],
                    ['4', '4+'],
                    ['5', '5+'],
                  ].map(([value, label]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setRoomsMin(value)}
                      aria-pressed={roomsMin === value}
                      className={`h-11 px-4 text-xs uppercase tracking-wider border transition ${
                        roomsMin === value
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-900'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-stone-500" htmlFor="f-sort">Trier par</label>
                <select
                  id="f-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="mt-2 w-full h-12 border border-stone-300 bg-white px-3 text-base focus:outline-none focus:border-stone-900"
                >
                  {SORTS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-stone-200 p-4 flex gap-3 shrink-0">
              <button
                type="button"
                onClick={resetFilters}
                className="h-12 px-4 text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900"
              >
                Effacer
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex-1 h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
              >
                Voir {visible.length} {visible.length > 1 ? 'lieux' : 'lieu'}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {!loading && !errorMessage && (
          <div className="flex items-center justify-between mb-6">
            <p className="font-serif text-lg text-stone-700">
              {visible.length} {visible.length > 1 ? 'lieux singuliers' : 'lieu singulier'}
            </p>
            <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500">
              Trier par
              <select value={sort} onChange={(e) => setSort(e.target.value)} className={input}>
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-stone-400 font-serif">Chargement des lieux remarquables...</div>
        ) : errorMessage ? (
          <div className="text-center py-20 max-w-xl mx-auto">
            <p className="font-serif text-stone-700">Impossible de charger les biens pour le moment.</p>
            <p className="mt-3 text-xs text-stone-400 font-mono break-words">{errorMessage}</p>
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20 text-stone-400 font-serif">
            {onlyFavs && favorites.length === 0
              ? "Vous n'avez pas encore de favori. Touchez le cœur d'une annonce pour l'ajouter."
              : 'Aucun lieu ne correspond à ces critères.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {visible.map((item) => {
              const fav = favorites.includes(item.id);
              const price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(item.price);
              return (
                <article key={item.id} className="group relative">
                  <a href={`/biens/${item.id}`} className="block" aria-label={item.title}>
                    <div className="relative aspect-[5/4] w-full bg-stone-100 overflow-hidden">
                      <img
                        src={item.cover_image_url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 text-stone-900 text-[10px] uppercase tracking-widest px-2.5 py-1">
                        {item.atypic_category}
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="text-[11px] uppercase tracking-widest text-stone-500">
                        {item.city}
                        {item.surface_sqm ? ` · ${item.surface_sqm} m²` : ''}
                        {isNew(item.first_seen_at) ? ' · Nouveauté' : ''}
                      </p>
                      <h2 className="mt-1.5 font-serif text-xl leading-snug text-stone-900 line-clamp-2 group-hover:underline underline-offset-4 decoration-stone-300">
                        {item.title}
                      </h2>
                      <p className="mt-2 font-serif text-lg text-stone-900">{price}</p>
                      <p className="mt-1 text-[11px] text-stone-400">Annonce {item.source_agency}</p>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(item.id)}
                    aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    aria-pressed={fav}
                    className="absolute top-3 right-3 z-10 h-11 w-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition"
                  >
                    <Heart className={`w-5 h-5 ${fav ? 'fill-red-600 text-red-600' : 'text-stone-700'}`} />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <FooterLinks cities={listings.map((l) => l.city).filter(Boolean)} />
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h2 className="font-serif text-2xl text-stone-900">La lettre SINGULIER</h2>
          <p className="mt-2 text-sm text-stone-500">Une sélection de lieux singuliers, de temps en temps.</p>
          <div className="mt-6 text-left max-w-xl mx-auto">
            <AlertBox kind="newsletter" />
          </div>
        </div>
      </footer>
    </div>
  );
}

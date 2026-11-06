'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight, Sparkles, Heart, Search } from 'lucide-react';
import AlertBox from './AlertBox';
import FooterLinks from './FooterLinks';

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

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {
        /* ignoré */
      }
      return next;
    });
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

  const input = 'border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      {DEMO_MODE && (
        <div className="bg-stone-900 text-stone-100 text-center text-xs tracking-wide py-2 px-4">
          Version de démonstration : annonces et photos issues de sites d'agences, présentées à titre d'exemple. Chaque fiche renvoie vers l'annonce d'origine.
        </div>
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
            <span className="hidden md:inline text-stone-900 border-b border-black pb-1 cursor-pointer">Collection</span>
            <span className="hidden md:inline text-stone-400 hover:text-stone-900 transition cursor-pointer">Manifeste</span>
            <span className="hidden md:inline text-stone-400 hover:text-stone-900 transition cursor-pointer">Pour les Agences</span>
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

      <header className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 text-stone-600 text-xs tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Sélection Rigoureuse · Mandats Authentifiés
        </div>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.15]">
          L'anthologie des lieux d'exception.
        </h1>
        <p className="mt-5 text-stone-500 max-w-2xl mx-auto font-light text-base md:text-lg">
          Ateliers d'artistes sous verrière, lofts industriels, péniches et rooftops curatés parmi les plus beaux mandats du marché.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="bg-white p-4 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ville, arrondissement, code postal, mot-clé…"
                className={`${input} w-full pl-9`}
                aria-label="Rechercher un lieu"
              />
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="text-xs uppercase tracking-wider px-4 py-2 border border-stone-300 text-stone-700 hover:border-stone-900 transition"
              aria-expanded={showFilters}
            >
              Préciser ma recherche
            </button>
            <button
              onClick={() => setShowAlert((v) => !v)}
              className="text-xs uppercase tracking-wider px-4 py-2 border border-stone-300 text-stone-700 hover:border-stone-900 transition"
              aria-expanded={showAlert}
            >
              Créer une alerte
            </button>
            <button
              onClick={resetAll}
              className="text-xs uppercase tracking-wider px-4 py-2 text-stone-500 hover:text-stone-900 transition"
            >
              Réinitialiser
            </button>
          </div>

          {showAlert && (
            <div className="border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs text-stone-600 mb-3">
                Recevez par email les nouveaux biens correspondant à votre recherche actuelle (lieu, catégorie, filtres).
              </p>
              <AlertBox
                kind="alert"
                criteria={{ query, category: selectedCategory, priceMin, priceMax, surfaceMin, roomsMin }}
              />
            </div>
          )}

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="text-[10px] uppercase tracking-widest text-stone-500">
                Prix min (€)
                <input type="number" min="0" step="50000" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className={`${input} w-full mt-1`} />
              </label>
              <label className="text-[10px] uppercase tracking-widest text-stone-500">
                Prix max (€)
                <input type="number" min="0" step="50000" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className={`${input} w-full mt-1`} />
              </label>
              <label className="text-[10px] uppercase tracking-widest text-stone-500">
                Surface min (m²)
                <input type="number" min="0" step="10" value={surfaceMin} onChange={(e) => setSurfaceMin(e.target.value)} className={`${input} w-full mt-1`} />
              </label>
              <label className="text-[10px] uppercase tracking-widest text-stone-500">
                Pièces min
                <input type="number" min="0" step="1" value={roomsMin} onChange={(e) => setRoomsMin(e.target.value)} className={`${input} w-full mt-1`} />
              </label>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 transition ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((item) => {
              const fav = favorites.includes(item.id);
              return (
                <article
                  key={item.id}
                  className="group flex flex-col bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                    <a href={`/biens/${item.id}`} aria-label={item.title}>
                      <img
                        src={item.cover_image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </a>
                    <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1 backdrop-blur-sm">
                      {item.atypic_category}
                    </div>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      aria-pressed={fav}
                      className="absolute top-3 right-3 bg-white/95 p-2 shadow-sm hover:bg-white transition"
                    >
                      <Heart className={`w-4 h-4 ${fav ? 'fill-red-600 text-red-600' : 'text-stone-700'}`} />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white/95 text-stone-900 text-[10px] uppercase tracking-widest px-2 py-0.5 font-mono shadow-sm">
                      Annonce {item.source_agency}
                    </div>
                    {isNew(item.first_seen_at) && (
                      <div className="absolute bottom-3 right-3 bg-stone-900 text-white text-[10px] uppercase tracking-widest px-2 py-0.5">
                        Nouveauté
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-between items-center text-xs text-stone-400 uppercase tracking-wider mb-2">
                        <span>{item.city}</span>
                        {item.surface_sqm && <span>{item.surface_sqm} m²</span>}
                      </div>

                      <h2 className="font-serif text-lg leading-snug text-stone-900 group-hover:text-stone-700 transition">
                        {item.title}
                      </h2>

                      <p className="mt-3 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {item.short_description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {item.atypic_tags?.map((tag, idx) => (
                          <span key={idx} className="bg-stone-50 border border-stone-200 text-stone-600 text-[10px] px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-xl font-medium tracking-tight font-serif">
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(item.price)}
                        </span>
                      </div>

                      <a
                        href={`/biens/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white px-4 py-2.5 hover:bg-stone-800 transition"
                      >
                        Voir le bien
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
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

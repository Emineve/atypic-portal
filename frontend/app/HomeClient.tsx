'use client';

import Logo from './Logo';
import { useState, useEffect, useMemo, Fragment } from 'react';
import { Sparkles, Heart, Search, SlidersHorizontal, X, Bell, MapPin, Send, ArrowLeft } from 'lucide-react';
import FavoritesContact from './FavoritesContact';
import AlertBox from './AlertBox';
import AlertDialog from './AlertDialog';
import FooterLinks from './FooterLinks';
import Tracker from './Tracker';
import HeroTitle from './HeroTitle';
import { DpeChip } from './DpeBadge';
import FilterPanel from './FilterPanel';
import { Filters, EMPTY_FILTERS, passesFilters, countActive } from './filters';
import { trackEvent } from '../lib/track';

// Passer à false quand la base contiendra de vraies annonces d'agences
const DEMO_MODE = true;
const FAVORITES_KEY = 'singulier:favorites';
// « Nouveauté » : uniquement les biens mis en ligne depuis moins de 24 heures
const NEW_DAYS = 1;

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
  source_id?: string | null;
  source_url: string;
  atypic_category: string;
  atypic_tags: string[] | null;
  curation_score: number | null;
  first_seen_at: string | null;
  dpe_class: string | null;
  features: string[] | null;
  bedrooms: number | null;
  ges_class: string | null;
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
    { value: 'selection', label: 'Par défaut' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'recent', label: 'Date de publication' },
  { value: 'surface_desc', label: 'Surface décroissante' },
  { value: 'surface_asc', label: 'Surface croissante' },
];

function normalize(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Un lieu choisi dans les suggestions de la barre de recherche
interface Place {
  kind: 'city' | 'district';
  value: string; // « Paris 16e », « Paris », « Auteuil Sud »
  city: string; // ville de rattachement (pour un quartier)
  sub: string; // précision affichée : codes postaux ou ville
  count: number;
  search: string; // texte dans lequel on cherche ce que tape le visiteur
}

function isParis(city: string) {
  return /^paris(\s|$)/i.test(city.trim());
}

function matchesPlace(item: { city: string; district: string | null }, p: Place) {
  if (p.kind === 'district') return item.district === p.value && item.city === p.city;
  if (p.value === 'Paris') return isParis(item.city || '');
  return item.city === p.value;
}

function isNew(date: string | null) {
  if (!date) return false;
  return Date.now() - new Date(date).getTime() < NEW_DAYS * 86400000;
}

export default function HomeClient({ initialListings }: { initialListings: Listing[] }) {
  const listings = initialListings;
  const loading = false;
  const errorMessage = null as string | null;

  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [sort, setSort] = useState('selection');
  const [showFilters, setShowFilters] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSource, setAlertSource] = useState('banner');

  const [favorites, setFavorites] = useState<string[]>([]);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [favContactOpen, setFavContactOpen] = useState(false);

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
    setFilters(EMPTY_FILTERS);
    setQuery('');
    setPlaces([]);
    setSort('selection');
    setOnlyFavs(false);
  }

  // Bouton flottant d'alerte : n'apparaît qu'après un peu de défilement
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openAlert(source: string) {
    setAlertSource(source);
    setAlertOpen(true);
  }

  const citySuggestions = useMemo(() => {
    const set = new Set<string>();
    listings.forEach((l) => {
      if (!l.city) return;
      set.add(l.city);
      if (/^paris(\s|$)/i.test(l.city.trim())) set.add('Paris');
    });
    return Array.from(set).sort();
  }, [listings]);

  // Tous les lieux proposables : Paris, chaque ville ou arrondissement, chaque quartier
  const allPlaces = useMemo(() => {
    const cities = new Map<string, { count: number; cps: Set<string> }>();
    const districts = new Map<string, Place>();
    let paris = 0;
    listings.forEach((l) => {
      if (!l.city) return;
      if (isParis(l.city)) paris += 1;
      const c = cities.get(l.city) || { count: 0, cps: new Set<string>() };
      c.count += 1;
      if (l.postal_code) c.cps.add(l.postal_code);
      cities.set(l.city, c);
      if (l.district) {
        const key = l.city + '|' + l.district;
        const d = districts.get(key) || {
          kind: 'district' as const,
          value: l.district,
          city: l.city,
          sub: l.city,
          count: 0,
          search: normalize(l.district),
        };
        d.count += 1;
        districts.set(key, d);
      }
    });
    const list: Place[] = [];
    if (paris > 0 && cities.size > 1) {
      list.push({ kind: 'city', value: 'Paris', city: 'Paris', sub: 'Tous les arrondissements', count: paris, search: 'paris 75' });
    }
    Array.from(cities.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .forEach(([city, c]) => {
        const cps = Array.from(c.cps).sort();
        list.push({ kind: 'city', value: city, city, sub: cps.join(' · '), count: c.count, search: normalize(city + ' ' + cps.join(' ')) });
      });
    Array.from(districts.values())
      .sort((a, b) => b.count - a.count)
      .forEach((d) => list.push(d));
    return list;
  }, [listings]);

  const typed = normalize(query.trim());
  const placeMatches = useMemo(() => {
    if (!typed) return [];
    return allPlaces
      .filter((p) => p.search.includes(typed) && !places.some((x) => x.kind === p.kind && x.value === p.value && x.city === p.city))
      .slice(0, 6);
  }, [allPlaces, typed, places]);
  const showSuggestions = searchFocused && typed !== '';

  function addPlace(p: Place) {
    setPlaces((prev) => [...prev, p]);
    setQuery('');
    setSearchFocused(false);
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }

  function removePlace(p: Place) {
    setPlaces((prev) => prev.filter((x) => x !== p));
  }

  const visible = useMemo(() => {
    const q = normalize(query.trim());

    const filtered = listings.filter((item) => {
      // Page favoris : tous les favoris, quelle que soit la recherche en cours
      if (onlyFavs) return favorites.includes(item.id);
      if (!passesFilters(item, filters)) return false;
      if (places.length > 0 && !places.some((p) => matchesPlace(item, p))) return false;
      if (q) {
        const haystack = normalize(
          [item.city, item.district, item.postal_code, item.title, item.atypic_category, ...(item.atypic_tags || [])]
            .filter(Boolean)
            .join(' ')
        );
        if (!haystack.includes(q)) return false;
      }
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
  }, [listings, filters, onlyFavs, favorites, query, places, sort]);

  // Après la création d'une alerte : biens déjà en ligne qui y répondent (mêmes règles que la recherche)
  function alertPlaces(locations: string[]): Place[] {
    return locations
      .map((loc) => allPlaces.find((p) => p.kind === 'city' && normalize(p.value) === normalize(loc)))
      .filter((p): p is Place => Boolean(p));
  }

  function countAlertMatches(f: Filters, locations: string[]): number {
    const wanted = alertPlaces(locations);
    if (locations.length > 0 && wanted.length === 0) return 0;
    return listings.filter(
      (item) => passesFilters(item, f) && (wanted.length === 0 || wanted.some((p) => matchesPlace(item, p)))
    ).length;
  }

  // Affiche ces biens : la recherche de l'accueil reprend les critères de l'alerte
  function showAlertMatches(f: Filters, locations: string[]) {
    setFilters({ ...f, nice: [] });
    setPlaces(alertPlaces(locations));
    setQuery('');
    setOnlyFavs(false);
    setShowFilters(false);
    setTimeout(() => document.getElementById('resultats')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  const activeFilters = countActive(filters);
  // Une vraie recherche est en cours (filtres ou lieu saisi) : on propose de l'enregistrer en alerte
  const searchActive = activeFilters > 0 || query.trim() !== '' || places.length > 0;
  const anythingActive = activeFilters > 0 || query.trim() !== '' || places.length > 0 || onlyFavs || sort !== 'selection';

  function resetFilters() {
    setFilters(EMPTY_FILTERS);
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
            <Logo />
          </div>

                    <div className="flex items-center gap-5 md:gap-8 text-xs uppercase tracking-widest font-medium">
            <a
              href="/inspiration"
              aria-label="Inspiration"
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition"
            >
              <Sparkles className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Inspiration</span>
            </a>
            <button
              type="button"
              onClick={() => openAlert('header')}
              aria-label="Créer une alerte"
              className="inline-flex items-center gap-1.5 text-stone-900 hover:text-stone-600 transition"
            >
              <Bell className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Créer une alerte</span>
            </button>
            <button
              onClick={() => setOnlyFavs((v) => !v)}
              aria-label="Mes favoris"
              className={`inline-flex items-center gap-1.5 transition ${onlyFavs ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
              aria-pressed={onlyFavs}
            >
              <Heart className={`w-5 h-5 sm:w-4 sm:h-4 ${onlyFavs ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Mes favoris</span>
              {favorites.length > 0 ? ` (${favorites.length})` : ''}
            </button>
          </div>

        </div>
      </nav>

      {onlyFavs ? (
        <header className="max-w-7xl mx-auto px-6 pt-8 md:pt-12 pb-6">
          <button
            type="button"
            onClick={() => setOnlyFavs(false)}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Tous les biens
          </button>
          <h1 className="mt-4 font-serif text-3xl md:text-4xl text-stone-900">Mes favoris</h1>
        </header>
      ) : (
      <>
      <header className="max-w-7xl mx-auto px-6 pt-10 md:pt-16 pb-8 md:pb-12 text-center">
                <HeroTitle />
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="max-w-3xl mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (placeMatches.length > 0) addPlace(placeMatches[0]);
                  else (e.target as HTMLInputElement).blur();
                }
                if (e.key === 'Escape') setSearchFocused(false);
              }}
              placeholder="Ville, code postal, quartier…"
              className="w-full h-14 pl-12 pr-12 bg-white border border-stone-300 text-base focus:outline-none focus:border-stone-900"
              aria-label="Rechercher un lieu"
              role="combobox"
              aria-expanded={showSuggestions}
              aria-controls="suggestions-lieux"
              aria-autocomplete="list"
            />
            {query !== '' && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setQuery('')}
                aria-label="Effacer la saisie"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center text-stone-400 hover:text-stone-900"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {showSuggestions && (
              <ul
                id="suggestions-lieux"
                role="listbox"
                className="absolute left-0 right-0 top-full z-40 mt-1 border border-stone-300 bg-white shadow-lg text-left"
              >
                {placeMatches.map((p, i) => (
                  <li key={p.kind + p.city + p.value} role="option" aria-selected={i === 0}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => addPlace(p)}
                      className={`w-full min-h-[52px] px-4 py-2 flex items-center gap-3 text-left hover:bg-stone-100 ${i === 0 ? 'bg-stone-50' : ''}`}
                    >
                      <MapPin className="w-4 h-4 flex-none text-stone-400" />
                      <span className="flex-1 min-w-0">
                        <span className="block text-base text-stone-900 truncate">{p.value}</span>
                        {p.sub && <span className="block text-xs text-stone-500 truncate">{p.sub}</span>}
                      </span>
                      <span className="flex-none text-xs text-stone-500">
                        {p.count} {p.count > 1 ? 'biens' : 'bien'}
                      </span>
                    </button>
                  </li>
                ))}
                {placeMatches.length === 0 && (
                  <li className="px-4 py-3 text-sm text-stone-500">
                    Aucun lieu ne correspond. Les annonces contenant « {query.trim()} » sont affichées ci-dessous.
                  </li>
                )}
              </ul>
            )}
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

        {places.length > 0 && (
          <div className="max-w-3xl mx-auto mt-3 flex flex-wrap items-center gap-2" aria-live="polite">
            {places.map((p) => (
              <span
                key={p.kind + p.city + p.value}
                className="inline-flex items-center h-10 pl-3 bg-stone-900 text-white text-sm"
              >
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                {p.value}
                <button
                  type="button"
                  onClick={() => removePlace(p)}
                  aria-label={`Retirer ${p.value}`}
                  className="h-10 w-10 flex items-center justify-center text-stone-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
            <span className="text-sm text-stone-600">
              {visible.length} {visible.length > 1 ? 'biens' : 'bien'}
            </span>
          </div>
        )}

        {anythingActive && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={resetAll}
              className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 transition"
            >
              Tout réinitialiser
            </button>
          </div>
        )}

      </section>
      </>
      )}

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

            <div className="flex-1 overflow-y-auto">
              <FilterPanel value={filters} onChange={setFilters} mode="search" padX="px-6" />
              <div className="px-6 py-6">
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
                className="h-12 px-3 text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900"
              >
                Effacer
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowFilters(false);
                  openAlert('filters');
                }}
                className="h-12 px-4 border border-stone-900 text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-900 hover:text-white transition inline-flex items-center gap-2"
              >
                <Bell className="w-4 h-4" /> Enregistrer
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

      <main id="resultats" className="max-w-7xl mx-auto px-6 pb-24 scroll-mt-28">
        {!loading && !errorMessage && (
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-6">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <p className="font-serif text-lg text-stone-700">
                {visible.length} {visible.length > 1 ? 'biens' : 'bien'}<span className="hidden sm:inline"> à découvrir</span>
              </p>
              {searchActive && !onlyFavs && visible.length > 0 && (
                <button
                  type="button"
                  onClick={() => openAlert('recherche')}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4"
                >
                  <Bell className="w-3.5 h-3.5 flex-none" />
                  Enregistrer cette recherche
                </button>
              )}
            </div>
            {!onlyFavs && (
            <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500">
              <span className="hidden sm:inline">Trier par</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Trier par" className={input}>
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
            )}
          </div>
        )}

        {onlyFavs && visible.length > 0 && (
          <div className="mb-8 border border-stone-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-serif text-lg text-stone-900 leading-snug">
                Contactez les agences de vos favoris en une seule fois.
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Vos coordonnées une fois, et le contact de chaque bien vous rappelle.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFavContactOpen(true)}
              className="shrink-0 h-12 px-6 inline-flex items-center justify-center gap-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              <Send className="w-4 h-4" />
              Contacter pour {visible.length} {visible.length > 1 ? 'biens' : 'bien'}
            </button>
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
          onlyFavs && favorites.length === 0 ? (
            <div className="text-center py-20 text-stone-400 font-serif">
              Vous n'avez pas encore de favori. Touchez le cœur d'une annonce pour l'ajouter.
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-16">
              <p className="text-stone-400 font-serif">Rien ne correspond encore à cette recherche.</p>
              <span className="mt-8 mx-auto h-11 w-11 rounded-full bg-stone-900 text-white flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </span>
              <p className="mt-4 font-serif text-xl text-stone-900 leading-snug">
                Ne passez pas à côté de votre prochain coup de cœur !
              </p>
              <p className="mt-2 text-sm text-stone-500">
                Dès qu'un nouveau bien répond à vos attentes, vous êtes parmi les premiers prévenus.
              </p>
              <button
                type="button"
                onClick={() => openAlert('empty')}
                className="mt-6 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 hover:bg-stone-800 transition"
              >
                Créer mon alerte
              </button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {visible.map((item, index) => {
              const fav = favorites.includes(item.id);
              const price = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(item.price);
              return (
                <Fragment key={item.id}>
                <article className="group relative">
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
                                          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-widest text-stone-500">
                        <span>
                          {item.city}
                          {item.surface_sqm ? ` · ${item.surface_sqm} m²` : ''}
                        </span>
                                               {isNew(item.first_seen_at) && <span>· Nouveauté</span>}
                      </p>
                      <h2 className="mt-1.5 font-serif text-xl leading-snug text-stone-900 line-clamp-2 group-hover:underline underline-offset-4 decoration-stone-300">
                        {item.title}
                      </h2>
                      {item.atypic_tags && item.atypic_tags.length > 0 && (
                        <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Atouts du bien">
                          {item.atypic_tags.slice(0, 3).map((tag) => (
                            <li key={tag} className="rounded-full bg-[#F4E7B5] px-2.5 py-0.5 text-[11px] text-stone-800">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-2.5 font-serif text-lg text-stone-900">{price}</p>
                      <p className="mt-1 text-[11px] text-stone-400">Annonce {item.source_agency}</p>
                      {item.source_id && (
                        <p className="mt-0.5 text-[11px] text-stone-400">Réf. {item.source_id}</p>
                      )}
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
                {index === 5 && visible.length > 6 && !onlyFavs && (
                  <button
                    type="button"
                    onClick={() => openAlert('liste')}
                    className="col-span-full flex items-center gap-3 border-y border-stone-200 py-4 text-left group/alert"
                  >
                    <Bell className="w-4 h-4 flex-none text-stone-900" />
                    <span className="flex-1 font-serif text-base leading-snug text-stone-900">
                      Ne passez pas à côté de votre prochain coup de cœur !
                    </span>
                    <span className="flex-none text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4 group-hover/alert:text-stone-600">
                      Créer mon alerte →
                    </span>
                  </button>
                )}
                </Fragment>
              );
            })}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <FooterLinks cities={listings.map((l) => l.city).filter(Boolean)} />
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <h2 className="font-serif text-2xl text-stone-900">Soyez le premier informé</h2>
          <p className="mt-2 text-sm text-stone-500">Recevez en avant-première les nouveaux biens atypiques mis en vente par les agences les plus prestigieuses.</p>
          <div className="mt-6 text-left max-w-xl mx-auto">
            <AlertBox kind="newsletter" />
          </div>
        </div>
      </footer>

      {scrolled && !onlyFavs && !showFilters && !alertOpen && !favContactOpen && !loading && !errorMessage && (
        <div
          className="fixed inset-x-0 z-40 flex justify-center px-6 pointer-events-none"
          style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={() => openAlert('flottant')}
            className="pointer-events-auto inline-flex items-center gap-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-5 h-12 shadow-lg hover:bg-stone-800 transition"
          >
            <Bell className="w-4 h-4" />
            <span>Créer mon alerte</span>
          </button>
        </div>
      )}

      <FavoritesContact open={favContactOpen} onClose={() => setFavContactOpen(false)} items={visible} />

      <AlertDialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        source={alertSource}
        suggestions={citySuggestions}
        initial={{ filters, location: (places.find((p) => p.kind === 'city') || places[0])?.city || query.trim() }}
        countMatches={countAlertMatches}
        onShowMatches={showAlertMatches}
      />
    </div>
  );
}

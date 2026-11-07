'use client';

import { useState, useEffect, useMemo } from 'react';
import { Sparkles, Heart, Search, SlidersHorizontal, X, Bell } from 'lucide-react';
import AlertBox from './AlertBox';
import AlertDialog from './AlertDialog';
import FooterLinks from './FooterLinks';
import Tracker from './Tracker';
import HeroTitle from './HeroTitle';
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
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSource, setAlertSource] = useState('banner');
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
            Archi Singulier
            </span>
            <span className="hidden sm:inline text-[10px] tracking-widest text-stone-400 uppercase font-mono">
              Curateur Atypique · France
            </span>
          </div>

          <div className="flex items-center gap-5 md:gap-8 text-xs uppercase tracking-widest font-medium">
            <button
              type="button"
              onClick={() => openAlert('header')}
              className="inline-flex items-center gap-1.5 text-stone-900 hover:text-stone-600 transition"
            >
              <Bell className="w-4 h-4" />

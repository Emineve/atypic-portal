'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight, Sparkles, Heart, Search } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

// Passer à false quand la base contiendra de vraies annonces d'agences
const DEMO_MODE = true;
const FAVORITES_KEY = 'singulier:favorites';
const NEW_DAYS = 14;

interface Listing {
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

export default function ShowcaseApp() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("Tous les biens");
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('selection');
  const [showFilters, setShowFilters] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [surfaceMin, setSurfaceMin] = useState('');
  const [roomsMin, setRoomsMin] = useState('');

  const [favorites, setFavorites] = useState<string[]>([]);
  const [onlyFavs, setOnlyFavs] = useState(false);

  // Chargement unique des annonces (le client Supabase n'existe que dans le navigateur)
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErrorMessage(null);
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('is_active', true);
        if (error) {
          setErrorMessage(error.message);
        } else if (data) {
          setListings(data as Listing[]);
        }
      } catch (err) {
        console.error("Erreur de chargement des biens :", err);
        setErrorMessage(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

    const time = (d: string | null) => (d ? new Date(d).getTime() :

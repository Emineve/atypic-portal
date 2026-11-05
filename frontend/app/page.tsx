'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

// Passer à false quand la base contiendra de vraies annonces d'agences
const DEMO_MODE = true;

interface Listing {
  id: string;
  title: string;
  short_description: string;
  price: number;
  surface_sqm: number;
  city: string;
  source_agency: string;
  source_url: string;
  atypic_category: string;
  atypic_tags: string[];
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

export default function ShowcaseApp() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous les biens");
  const [maxPrice, setMaxPrice] = useState<number>(3000000);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErrorMessage(null);
      try {
        // Le client est créé ici, dans le navigateur, jamais pendant le build
        const supabase = getSupabase();
        let query = supabase.from('listings').select('*').eq('is_active', true);

        if (selectedCategory !== "Tous les biens") {
          query = query.eq('atypic_category', selectedCategory);
        }
        query = query.lte('price', maxPrice).order('price', { ascending: false });

        const { data, error } = await query;
        if (error) {
          setErrorMessage(error.message);
        } else if (data) {
          setListings(data);
        }
      } catch (err) {
        console.error("Erreur de chargement des biens :", err);
        setErrorMessage(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedCategory, maxPrice]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      {DEMO_MODE && (
        <div className="bg-stone-900 text-stone-100 text-center text-xs tracking-wide py-2 px-4">
          Version de démonstration : annonces et photos issues d'Espaces Atypiques, présentées

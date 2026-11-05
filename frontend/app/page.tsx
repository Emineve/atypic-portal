'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

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
          Version de démonstration : annonces et photos issues d'Espaces Atypiques, présentées à titre d'exemple. Chaque fiche renvoie vers l'annonce d'origine.
        </div>
      )}

      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-2xl font-bold tracking-widest uppercase">
              SINGULIER
            </span>
            <span className="text-[10px] tracking-widest text-stone-400 uppercase font-mono">
              Curateur Atypique · Paris & IDF
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium">
            <span className="text-stone-900 border-b border-black pb-1 cursor-pointer">Collection</span>
            <span className="text-stone-400 hover:text-stone-900 transition cursor-pointer">Manifeste</span>
            <span className="text-stone-400 hover:text-stone-900 transition cursor-pointer">Pour les Agences</span>
          </div>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 text-stone-600 text-xs tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Sélection Rigoureuse · Mandats Authentifiés
        </div>
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.15]">
          L'anthologie des lieux d'exception en Île-de-France.
        </h1>
        <p className="mt-5 text-stone-500 max-w-2xl mx-auto font-light text-base md:text-lg">
          Ateliers d'artistes sous verrière, lofts industriels, péniches et rooftops curatés parmi les plus beaux mandats du marché.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-4 border border-stone-200 shadow-sm">
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

          <div className="flex items-center gap-4 w-full md:w-auto text-xs font-mono">
            <span className="text-stone-400 uppercase">Budget Max :</span>
            <input
              type="range"
              min="800000"
              max="3500000"
              step="100000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-stone-900 cursor-pointer"
            />
            <span className="font-semibold text-stone-900">
              {(maxPrice / 1000000).toFixed(1)} M€
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="text-center py-20 text-stone-400 font-serif">Chargement des lieux remarquables...</div>
        ) : errorMessage ? (
          <div className="text-center py-20 max-w-xl mx-auto">
            <p className="font-serif text-stone-700">Impossible de charger les biens pour le moment.</p>
            <p className="mt-3 text-xs text-stone-400 font-mono break-words">{errorMessage}</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20 text-stone-400 font-serif">Aucun lieu ne correspond à ces critères.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.cover_image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1 backdrop-blur-sm">
                    {item.atypic_category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 text-stone-900 text-[10px] uppercase tracking-widest px-2 py-0.5 font-mono shadow-sm">
                    Annonce {item.source_agency}
                  </div>
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
                      href={`/go/${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-stone-900 text-white px-4 py-2.5 hover:bg-stone-800 transition"
                    >
                      Consulter le bien
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { trackEvent } from '../../../lib/track';

const FAVORITE_ADDED_EVENT = 'loftissime:favori-ajoute'; // écouté par AlertInvite

// Même clé que sur l'accueil : un favori ajouté ici se retrouve dans « Mes favoris »
const FAVORITES_KEY = 'singulier:favorites';

function readFavorites(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export default function FavoriteButton({ listingId }: { listingId: string }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(readFavorites().includes(listingId));
  }, [listingId]);

  function toggle() {
    const adding = !fav;
    setFav(adding);
    try {
      const current = readFavorites().filter((x) => x !== listingId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(adding ? [...current, listingId] : current));
    } catch {
      /* stockage indisponible : le favori fonctionne le temps de la visite */
    }
    if (adding) {
      trackEvent('favorite', listingId);
      // La fiche propose alors, en une ligne discrète, de recevoir les biens similaires
      window.dispatchEvent(new Event(FAVORITE_ADDED_EVENT));
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-pressed={fav}
      className="absolute top-3 right-3 z-10 h-11 w-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition"
    >
      <Heart className={`w-5 h-5 ${fav ? 'fill-red-600 text-red-600' : 'text-stone-700'}`} />
    </button>
  );
}

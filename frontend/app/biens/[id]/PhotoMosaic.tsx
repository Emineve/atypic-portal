'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, X } from 'lucide-react';
import Gallery from './Gallery';
import FavoriteButton from './FavoriteButton';

// Haut de la fiche : mosaïque de photos pleine largeur sur grand écran (une grande photo et
// des vignettes), carrousel sur mobile. Un clic ouvre la visionneuse plein écran.
export default function PhotoMosaic({
  images,
  title,
  category,
  favoriteId,
}: {
  images: string[];
  title: string;
  category?: string;
  favoriteId?: string;
}) {
  const [viewer, setViewer] = useState<number | null>(null);
  const total = images.length;

  useEffect(() => {
    if (viewer === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewer(null);
      if (e.key === 'ArrowRight') setViewer((v) => (v === null ? v : Math.min(total - 1, v + 1)));
      if (e.key === 'ArrowLeft') setViewer((v) => (v === null ? v : Math.max(0, v - 1)));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [viewer, total]);

  // Trop peu de photos pour une mosaïque : carrousel classique
  if (total < 5) {
    return (
      <div className="max-w-6xl mx-auto md:px-6">
        <Gallery images={images} title={title} category={category} favoriteId={favoriteId} />
      </div>
    );
  }

  const small = total >= 7 ? images.slice(1, 7) : images.slice(1, 5);
  const cols = small.length === 6 ? 'grid-cols-3' : 'grid-cols-2';
  const arrow = 'absolute top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition disabled:opacity-0';

  return (
    <>
      <div className="md:hidden">
        <Gallery images={images} title={title} category={category} favoriteId={favoriteId} thumbs={false} />
      </div>

      <div className="hidden md:grid grid-cols-2 gap-1.5 h-[min(62vh,640px)] bg-white">
        <div className="relative min-h-0">
          <button type="button" onClick={() => setViewer(0)} aria-label="Voir la photo 1 en grand" className="block w-full h-full overflow-hidden bg-stone-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[0]} alt={`${title} - photo 1`} className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" />
          </button>
          {category && (
            <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1 pointer-events-none">
              {category}
            </div>
          )}
          {favoriteId && <FavoriteButton listingId={favoriteId} />}
        </div>
        <div className={`grid ${cols} grid-rows-2 gap-1.5 min-h-0`}>
          {small.map((src, i) => (
            <div key={src} className="relative min-h-0">
              <button type="button" onClick={() => setViewer(i + 1)} aria-label={`Voir la photo ${i + 2} en grand`} className="block w-full h-full overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${title} - photo ${i + 2}`} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </button>
              {i === small.length - 1 && (
                <button
                  type="button"
                  onClick={() => setViewer(0)}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-2 bg-white text-stone-900 text-[11px] font-semibold uppercase tracking-wider px-3 h-9 shadow hover:bg-stone-100 transition"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Voir les {total} photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {viewer !== null && (
        <div className="fixed inset-0 z-[80] bg-stone-950 flex flex-col" role="dialog" aria-modal="true" aria-label={`Photos : ${title}`}>
          <div className="flex items-center justify-between px-5 h-14 text-white shrink-0">
            <span className="text-sm tabular-nums">{viewer + 1} / {total}</span>
            <button type="button" onClick={() => setViewer(null)} aria-label="Fermer" className="h-11 w-11 flex items-center justify-center hover:bg-white/10 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="relative flex-1 min-h-0 px-16 pb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[viewer]} alt={`${title} - photo ${viewer + 1}`} className="w-full h-full object-contain" />
            <button type="button" aria-label="Photo précédente" disabled={viewer === 0} onClick={() => setViewer(viewer - 1)} className={`${arrow} left-3`}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button type="button" aria-label="Photo suivante" disabled={viewer === total - 1} onClick={() => setViewer(viewer + 1)} className={`${arrow} right-3`}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ images, title, category }: { images: string[]; title: string; category?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = images.length;

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el || total === 0) return;
    const next = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el || !el.clientWidth) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  if (total === 0) return <div className="aspect-[4/3] w-full bg-stone-100" />;

  const arrow =
    'hidden md:flex absolute top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow hover:bg-white transition';

  return (
    <div>
      <div className="relative">
        <div
          ref={ref}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-stone-100"
          aria-roledescription="carrousel"
          aria-label={`Photos : ${title}`}
        >
          {images.map((src, i) => (
            <div key={i} className="relative shrink-0 w-full snap-center aspect-[4/3] md:aspect-[3/2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} - photo ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {category && (
          <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
            {category}
          </div>
        )}

        {total > 1 && (
          <>
            <button type="button" aria-label="Photo précédente" onClick={() => goTo(index - 1)} disabled={index === 0} className={`${arrow} left-3 disabled:opacity-0`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" aria-label="Photo suivante" onClick={() => goTo(index + 1)} disabled={index === total - 1} className={`${arrow} right-3 disabled:opacity-0`}>
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 right-3 bg-stone-900/80 text-white text-xs px-2.5 py-1 tabular-nums">
              {index + 1} / {total}
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="hidden md:flex gap-2 mt-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Voir la photo ${i + 1}`}
              className={`shrink-0 w-24 aspect-[4/3] overflow-hidden border-2 transition ${i === index ? 'border-stone-900' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

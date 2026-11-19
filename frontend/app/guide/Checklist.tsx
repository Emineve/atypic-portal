'use client';

import { useEffect, useState } from 'react';
import { typo } from '../../lib/typo';

// Le mémo de l'article, cochable d'un toucher. Les coches restent sur l'appareil du visiteur
// (comme ses favoris) : il retrouve sa liste en revenant sur la page. Rien n'est envoyé à Loftissime.
export default function Checklist({ slug, items }: { slug: string; items: string[] }) {
  const key = `loftissime:memo:${slug}`;
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      if (Array.isArray(saved)) setDone(saved.filter((x) => typeof x === 'string' && items.includes(x)));
    } catch {
      /* stockage indisponible : la liste reste cochable le temps de la visite */
    }
  }, [key, items]);

  function toggle(it: string) {
    setDone((prev) => {
      const next = prev.includes(it) ? prev.filter((x) => x !== it) : [...prev, it];
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* ignoré */
      }
      return next;
    });
  }

  return (
    <>
      <ul className="mt-4 space-y-1">
        {items.map((it) => {
          const on = done.includes(it);
          return (
            <li key={it}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(it)}
                className="group flex w-full items-start gap-3 py-1.5 text-left leading-relaxed"
              >
                <span className={`mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-[5px] border transition ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-900 bg-white group-hover:bg-stone-100'}`} aria-hidden="true">
                  {on && (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </span>
                <span className={on ? 'text-stone-400 line-through decoration-stone-300' : 'text-stone-700'}>{typo(it)}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-stone-500" aria-live="polite">
        {done.length === 0
          ? 'Touchez un point pour le cocher. Votre liste reste enregistrée sur cet appareil.'
          : done.length === items.length
            ? 'Tout est vérifié.'
            : `${done.length} sur ${items.length} vérifié${done.length > 1 ? 's' : ''}.`}
      </p>
    </>
  );
}

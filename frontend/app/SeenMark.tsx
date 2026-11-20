'use client';

import { useEffect, useState } from 'react';
import { markSeen, readSeen } from '../lib/seen';

export const SEEN_BADGE =
  'absolute left-3 bottom-3 rounded-full bg-stone-900/70 px-2.5 py-1 text-[11px] font-medium leading-none text-white backdrop-blur-sm';

// Sur la fiche : mémorise que ce bien a été consulté
export function MarkSeen({ id }: { id: string }) {
  useEffect(() => {
    markSeen(id);
  }, [id]);
  return null;
}

// Sur une vignette : mention « Déjà vu » si le bien a été consulté depuis ce navigateur
export default function SeenMark({ id }: { id: string }) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const check = () => setSeen(readSeen().some((x) => x.id === id));
    check();
    window.addEventListener('pageshow', check);
    return () => window.removeEventListener('pageshow', check);
  }, [id]);
  return seen ? <span className={SEEN_BADGE}>Déjà vu</span> : null;
}

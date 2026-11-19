'use client';

import { useEffect, useState } from 'react';

// Les phrases de Loftissime, reprises sur les invitations à créer une alerte : une différente à chaque visite.
// La première est celle affichée avant le tirage (et par les moteurs).
const PHRASES: { main: string; accent?: string }[] = [
  { main: 'Un bien qui a du caractère en donne à ceux qui l’habitent.', accent: 'Trouvons le vôtre.' },
  { main: 'Les biens rares partent vite.', accent: 'Soyez le premier informé.' },
  { main: 'Le bien que vous cherchez existe.', accent: 'Il n’est pas visible.' },
  { main: 'Dites-nous ce que vous cherchez.', accent: 'Le jour où il arrive, vous le savez.' },
  { main: 'Dans les grandes villes, un bien au juste prix part en moins de 15 jours.', accent: 'Soyez prévenu avant les autres.' },
  { main: 'Ne passez pas à côté de votre prochain coup de cœur !' },
];

export default function AlertPhrase({ offset = 0 }: { offset?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    // Un tirage par visite, gardé le temps de l'onglet : la phrase ne change pas d'une page à l'autre
    let base = 0;
    try {
      const saved = sessionStorage.getItem('loftissime:phrase');
      base = saved !== null ? Number(saved) || 0 : Math.floor(Math.random() * PHRASES.length);
      if (saved === null) sessionStorage.setItem('loftissime:phrase', String(base));
    } catch {
      base = Math.floor(Math.random() * PHRASES.length);
    }
    setI((base + offset) % PHRASES.length);
  }, [offset]);

  const { main, accent } = PHRASES[i];
  return (
    <>
      {main}
      {accent && (
        <>
          {' '}
          <span className="italic text-stone-500">{accent}</span>
        </>
      )}
    </>
  );
}

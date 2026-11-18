'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Texte de l'annonce : au-delà de 700 caractères, on n'en montre que le début,
// avec un fondu et un lien « Lire la suite ». Le texte complet reste dans la page
// (replié à l'écran seulement), pour les moteurs de recherche.
const LIMIT = 700;

export default function Description({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = (text || '').length > LIMIT;

  if (!long) return <p className="mt-6 text-stone-700 leading-relaxed whitespace-pre-line">{text}</p>;

  return (
    <div className="mt-6">
      <div className={`relative ${open ? '' : 'max-h-64 overflow-hidden'}`}>
        <p id="texte-annonce" className="text-stone-700 leading-relaxed whitespace-pre-line">{text}</p>
        {!open && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8FAFC] to-transparent" />}
      </div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="texte-annonce"
        className="mt-3 inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900"
      >
        {open ? 'Réduire' : 'Lire la suite'}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
}

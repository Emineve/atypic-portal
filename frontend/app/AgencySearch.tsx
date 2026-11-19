'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import AlertDialog from './AlertDialog';
import { readVisitor } from '../lib/visitor';

// Page agence : l'acheteur partage sa recherche avec cette agence, et elle seule.
// Les critères sont ceux d'une alerte (lieux, budget, surface, chambres, type de bien…),
// et l'alerte Loftissime est créée du même geste : c'est dit clairement dans la fenêtre.
export default function AgencySearch({ agency }: { agency: string }) {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState<{ location?: string; priceMax?: string }>({});

  // À l'ouverture : on reprend ce que le visiteur a déjà saisi ailleurs sur le site
  function openDialog() {
    const v = readVisitor();
    setInitial({ location: v.locations && v.locations[0] ? v.locations[0] : undefined, priceMax: v.budget || undefined });
    setOpen(true);
  }

  const label = `Partager ma recherche avec ${agency}`;

  return (
    <>
      <div className="mt-7 flex flex-col items-center">
        <button
          type="button"
          onClick={openDialog}
          className="group inline-flex max-w-full items-start gap-2.5 text-left font-serif text-xl md:text-2xl leading-snug text-stone-900"
        >
          <Send className="mt-1.5 w-4 h-4 flex-none text-stone-500 group-hover:text-stone-900 transition-colors" strokeWidth={1.5} />
          <span className="underline underline-offset-[6px] decoration-1 decoration-stone-400 group-hover:decoration-stone-900 transition-colors">
            {label}
          </span>
        </button>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-500">
          Décrivez ce que vous cherchez : l&apos;agence vous recontacte dès qu&apos;un bien correspond, y compris avant sa mise en ligne.
        </p>
      </div>

      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        source="agence"
        suggestions={initial.location ? [initial.location] : []}
        initial={initial}
        shareWith={agency}
      />
    </>
  );
}

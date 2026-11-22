'use client';

import { useState } from 'react';
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
      {/* Un lien sous la phrase d'introduction, comme sur les autres pages : pas de gros bouton */}
      <p className="mt-3">
        <button
          type="button"
          onClick={openDialog}
          aria-label={label}
          className="text-base font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 transition"
        >
          Confier ma recherche à cette agence →
        </button>
      </p>

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

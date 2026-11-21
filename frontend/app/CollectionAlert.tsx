'use client';

import SmartAlert from './SmartAlert';
import { useState } from 'react';
import AlertDialog from './AlertDialog';

// Encart « Créer mon alerte » des pages par ville et par catégorie.
// L'alerte s'ouvre déjà réglée sur la ville ou le type de la page.
export default function CollectionAlert({
  empty,
  category,
  location,
}: {
  empty: boolean;
  category?: string;
  location?: string;
}) {
  const [open, setOpen] = useState(false);
  const dialog = (
    <AlertDialog
      open={open}
      onClose={() => setOpen(false)}
      source={empty ? 'page-vide' : 'page'}
      suggestions={location ? [location] : []}
      initial={{ category, location }}
    />
  );
  // Page sans bien : une simple phrase dont le début est le lien.
  if (empty) {
    return (
      <>
        <div className="max-w-3xl mx-auto mt-4 text-left">
          <p className="font-serif text-2xl text-stone-900 leading-snug">Aucun bien ne correspond pour l&apos;instant.</p>
          <p className="mt-6 pt-6 border-t border-stone-200 text-base md:text-lg text-stone-600 leading-relaxed">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="font-semibold text-stone-900 underline underline-offset-4 decoration-1 hover:text-stone-600 transition"
            >
              Créez votre alerte
            </button>{' '}
            : vous serez prévenu(e) dès qu’un nouveau bien correspondant arrive sur le marché.
          </p>
        </div>
        {dialog}
      </>
    );
  }
  return (
    <>
      <SmartAlert signal tick={open} onOpen={() => setOpen(true)} className="mt-14" />
      {dialog}
    </>
  );
}

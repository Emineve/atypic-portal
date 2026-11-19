'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
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
          <p className="mt-6 pt-6 border-t border-stone-200 font-serif text-lg md:text-xl text-stone-600 leading-relaxed">
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
      <div
        className="border border-stone-200 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-left mt-14"
      >
        <div className="flex items-start gap-4">
          <span className="shrink-0 h-11 w-11 rounded-full bg-stone-900 text-white flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </span>
          <div>
            <p className="font-serif text-lg text-stone-900 leading-snug">
              Ne passez pas à côté de votre prochain coup de cœur !
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Dès qu’un nouveau bien répond à vos attentes, vous êtes parmi les premiers prévenus.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 h-12 px-7 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition rounded-[10px]"
        >
          Créer mon alerte
        </button>
      </div>
      {dialog}
    </>
  );
}

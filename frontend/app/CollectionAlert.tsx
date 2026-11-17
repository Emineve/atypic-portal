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
  return (
    <>
      <div
        className={`border border-stone-200 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-left ${
          empty ? 'max-w-3xl mx-auto mt-4' : 'mt-14'
        }`}
      >
        <div className="flex items-start gap-4">
          <span className="shrink-0 h-11 w-11 rounded-full bg-stone-900 text-white flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </span>
          <div>
            <p className="font-serif text-lg text-stone-900 leading-snug">
              {empty ? 'Aucun bien ici pour le moment.' : 'Ne passez pas à côté de votre prochain coup de cœur !'}
            </p>
            <p className="mt-1 text-sm text-stone-500">
              {empty
                ? 'Créez votre alerte : dès qu’un nouveau bien répond à vos attentes, vous êtes parmi les premiers prévenus.'
                : 'Dès qu’un nouveau bien répond à vos attentes, vous êtes parmi les premiers prévenus.'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 h-12 px-7 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
        >
          Créer mon alerte
        </button>
      </div>
      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        source={empty ? 'page-vide' : 'page'}
        suggestions={location ? [location] : []}
        initial={{ category, location }}
      />
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

// Barre de fiche : une fois le haut de la fiche dépassé, elle prend la place de l'en-tête et rappelle
// l'essentiel (prix, surface, lieu) avec les deux façons de joindre l'agence. Elle remplace l'ancien
// bouton flottant « Être recontacté(e) ». Sur grand écran elle n'apparaît pas : la colonne de droite,
// avec le prix et le contact, reste déjà visible pendant le défilement.
export default function FicheBar({ price, summary, phone }: { price: string; summary: string; phone?: string | null }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Cachée tant que le formulaire de contact est à l'écran : son propre bouton suffit
    const update = () => {
      const form = document.getElementById('contact');
      const r = form && form.offsetParent !== null ? form.getBoundingClientRect() : null;
      const formOnScreen = Boolean(r && r.top < window.innerHeight - 80 && r.bottom > 80);
      setShown(window.scrollY > 560 && !formOnScreen);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Le formulaire affiché dépend de l'écran : sous la présentation sur téléphone, dans la colonne de droite sinon
  function goToContact() {
    const el = ['contact', 'contact-desktop']
      .map((id) => document.getElementById(id))
      .find((n) => n && n.offsetParent !== null);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const input = el.querySelector<HTMLInputElement>('input[name="name"]');
    if (input) window.setTimeout(() => input.focus({ preventScroll: true }), 450);
  }

  const tel = phone ? phone.replace(/[^+\d]/g, '') : '';

  return (
    <div
      data-fab
      aria-hidden={!shown}
      className={`lg:hidden fixed inset-x-0 top-0 z-[55] border-b border-stone-200 bg-white transition-transform duration-300 ${shown ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
        <div className="min-w-0">
          <p className="font-serif text-xl leading-tight lining-nums text-stone-900 whitespace-nowrap md:text-2xl">{price}</p>
          <p className="truncate text-[13px] leading-tight text-stone-500">{summary}</p>
        </div>
        <div className="flex flex-none items-center gap-2">
          {tel && (
            <a
              href={`tel:${tel}`}
              tabIndex={shown ? 0 : -1}
              aria-label="Appeler l’agence"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-900 transition hover:border-stone-900 sm:w-auto sm:gap-2 sm:px-4 sm:text-sm sm:font-medium"
            >
              <Phone className="h-4 w-4 flex-none" strokeWidth={1.75} />
              <span className="hidden sm:inline">Appeler</span>
            </a>
          )}
          <button
            type="button"
            onClick={goToContact}
            tabIndex={shown ? 0 : -1}
            className="inline-flex h-10 items-center rounded-full bg-stone-900 px-4 text-sm font-medium text-[#FCFBF8] transition hover:bg-stone-800 sm:px-5"
          >
            Être recontacté(e)
          </button>
        </div>
      </div>
    </div>
  );
}

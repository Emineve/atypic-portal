'use client';

import { FileText } from 'lucide-react';

// Demande de plan : préremplit le formulaire de contact de la fiche et y conduit le visiteur
export default function PlanButton() {
  function ask() {
    window.dispatchEvent(new CustomEvent('loftissime:demande-plan'));
    const target = document.getElementById('contact');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <button
      type="button"
      onClick={ask}
      className="inline-flex items-center gap-2 h-11 px-5 border border-stone-900 bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-900 hover:text-white transition-colors"
    >
      <FileText className="w-4 h-4" />
      Demander le plan
    </button>
  );
}

'use client';

import { useState } from 'react';
import { Check, Share } from 'lucide-react';

// Envoie la liste des documents vers l'application Notes (ou toute autre appli) du visiteur.
// Sur téléphone, le bouton ouvre le menu de partage du système, où figure Notes.
// Sur un ordinateur qui n'a pas ce menu, la liste est copiée : il reste à la coller.
export default function ChecklistShare({ title, items, url }: { title: string; items: string[]; url: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');
  // La première ligne devient le titre de la note. Une ligne par point, sans symbole devant :
  // dans Notes, il suffit de sélectionner les lignes et de toucher l'icône de liste pour obtenir de vraies cases à cocher.
  const text = `${title}\n${items.join('\n')}\n\nSource : Loftissime, ${url}`;

  async function send() {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch (e) {
      // Partage annulé par le visiteur : rien à signaler
      if (e instanceof Error && e.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(text);
        setState('copied');
      } catch {
        setState('error');
      }
    }
    setTimeout(() => setState('idle'), 6000);
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
      <button
        type="button"
        onClick={send}
        className="inline-flex items-center gap-1.5 text-sm text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition"
      >
        {state === 'copied' ? <Check className="w-4 h-4" /> : <Share className="w-4 h-4" />}
        Envoyer vers mes notes
      </button>
      <span className="text-sm text-stone-500" aria-live="polite">
        {state === 'copied' && 'Liste copiée : il ne reste qu’à la coller.'}
        {state === 'error' && 'Impossible de copier la liste depuis ce navigateur.'}
      </span>
    </div>
  );
}

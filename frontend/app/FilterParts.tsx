'use client';

import { ChevronDown } from 'lucide-react';

// Éléments d'interface du panneau de filtres : pastille et section repliable.

export function Chip({
  state,
  onClick,
  children,
}: {
  state: 'off' | 'must' | 'nice';
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={state !== 'off'}
      onClick={onClick}
      className={`h-10 px-4 text-sm border transition ${
        state === 'must'
          ? 'bg-stone-900 border-stone-900 text-white'
          : state === 'nice'
          ? 'bg-stone-100 border-stone-900 text-stone-900'
          : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900'
      }`}
    >
      {state === 'nice' ? '+ ' : ''}
      {children}
    </button>
  );
}

export function Section({
  id,
  title,
  open,
  onToggle,
  active,
  onClear,
  padX,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  active: boolean;
  onClear: () => void;
  padX: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className={`flex items-center justify-between bg-stone-100 ${padX}`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`fp-${id}`}
          className="flex-1 flex items-center gap-2 h-12 text-left text-[13px] font-semibold uppercase tracking-wider text-stone-800"
        >
          <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${open ? '' : '-rotate-90'}`} />
          {title}
          {active && <span className="h-1.5 w-1.5 rounded-full bg-stone-900" aria-label="actif" />}
        </button>
        {active && (
          <button
            type="button"
            onClick={onClear}
            className="h-12 pl-4 text-xs text-stone-500 underline underline-offset-4 decoration-stone-300 hover:text-stone-900"
          >
            Effacer
          </button>
        )}
      </div>
      {open && (
        <div id={`fp-${id}`} className={`py-5 ${padX}`}>
          {children}
        </div>
      )}
    </section>
  );
}

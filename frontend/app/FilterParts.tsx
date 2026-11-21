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
      className={`h-10 px-4 rounded-full text-sm border transition ${
        state === 'must'
          ? 'bg-[#F6CF4E] border-[#F6CF4E] font-medium text-stone-900'
          : state === 'nice'
          ? 'bg-white border-stone-900 text-stone-900'
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
    <section className={`border-t border-stone-200 ${padX}`}>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`fp-${id}`}
          className="flex h-14 flex-1 items-center gap-2 text-left text-[17px] font-semibold text-stone-900"
        >
          {title}
          {active && <span className="h-2 w-2 rounded-full bg-[#E0B21F]" aria-label="actif" />}
        </button>
        {active && (
          <button
            type="button"
            onClick={onClear}
            className="h-14 text-xs text-stone-500 underline underline-offset-4 decoration-stone-300 hover:text-stone-900"
          >
            Effacer
          </button>
        )}
        <button type="button" onClick={onToggle} tabIndex={-1} aria-hidden="true" className="flex h-14 w-6 flex-none items-center justify-end">
          <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <div id={`fp-${id}`} className="pb-6">
          {children}
        </div>
      )}
    </section>
  );
}

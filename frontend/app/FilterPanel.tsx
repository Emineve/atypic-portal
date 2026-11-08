'use client';

import { useState } from 'react';
import { Filters, TYPES, BEDROOM_OPTIONS, FEATURE_GROUPS } from './filters';
import { Chip, Section } from './FilterParts';

// Panneau de filtres commun : recherche du site (mode « search ») et création d'alerte (mode « alert »).
// Sections repliables : certaines ouvertes par défaut, d'autres fermées.

export default function FilterPanel({
  value,
  onChange,
  padX = 'px-6',
}: {
  value: Filters;
  onChange: (f: Filters) => void;
  mode?: 'search' | 'alert'; // conservé pour compatibilité : le panneau est identique dans les deux cas
  padX?: string;
}) {
  // Ouvertes par défaut : type, surface, chambres, budget. À partir d'« Extérieur », tout est fermé.
  const [openIds, setOpenIds] = useState<string[]>(() => ['types', 'surface', 'chambres', 'budget']);

  const set = (patch: Partial<Filters>) => onChange({ ...value, ...patch });
  const isOpen = (id: string) => openIds.includes(id);
  const toggleOpen = (id: string) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  function featureState(key: string): 'off' | 'must' | 'nice' {
    if (value.must.includes(key)) return 'must';
    if (value.nice.includes(key)) return 'nice';
    return 'off';
  }

  // Touche une pastille : le critère est retenu (ou retiré s'il l'était déjà)
  function toggleFeature(key: string) {
    const was = featureState(key) !== 'off';
    const must = value.must.filter((k) => k !== key);
    const nice = value.nice.filter((k) => k !== key);
    if (!was) must.push(key);
    onChange({ ...value, must, nice });
  }

  const input =
    'w-full h-12 border border-stone-300 bg-white px-3 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900';

  return (
    <div>
      <Section
        id="types"
        title="Type de bien"
        open={isOpen('types')}
        onToggle={() => toggleOpen('types')}
        active={value.types.length > 0}
        onClear={() => set({ types: [] })}
        padX={padX}
      >
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Chip
              key={t}
              state={value.types.includes(t) ? 'must' : 'off'}
              onClick={() =>
                set({ types: value.types.includes(t) ? value.types.filter((x) => x !== t) : [...value.types, t] })
              }
            >
              {t}
            </Chip>
          ))}
        </div>
      </Section>

      <Section
        id="surface"
        title="Surface"
        open={isOpen('surface')}
        onToggle={() => toggleOpen('surface')}
        active={value.surfaceMin !== '' || value.surfaceMax !== ''}
        onClear={() => set({ surfaceMin: '', surfaceMax: '' })}
        padX={padX}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="Minimum"
              aria-label="Surface minimum en mètres carrés"
              value={value.surfaceMin}
              onChange={(e) => set({ surfaceMin: e.target.value })}
              className={`${input} pr-12`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">m²</span>
          </div>
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="Maximum"
              aria-label="Surface maximum en mètres carrés"
              value={value.surfaceMax}
              onChange={(e) => set({ surfaceMax: e.target.value })}
              className={`${input} pr-12`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">m²</span>
          </div>
        </div>
      </Section>

      <Section
        id="chambres"
        title="Chambres min."
        open={isOpen('chambres')}
        onToggle={() => toggleOpen('chambres')}
        active={value.bedrooms !== null}
        onClear={() => set({ bedrooms: null })}
        padX={padX}
      >
        <div className="flex flex-wrap gap-2" role="group" aria-label="Nombre de chambres minimum">
          {BEDROOM_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={value.bedrooms === n}
              onClick={() => set({ bedrooms: value.bedrooms === n ? null : n })}
              className={`h-12 w-12 text-base border transition ${
                value.bedrooms === n
                  ? 'bg-stone-900 border-stone-900 text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900'
              }`}
            >
              {n === 5 ? '5+' : n}
            </button>
          ))}
        </div>
      </Section>

      <Section
        id="budget"
        title="Budget"
        open={isOpen('budget')}
        onToggle={() => toggleOpen('budget')}
        active={value.priceMin !== '' || value.priceMax !== ''}
        onClear={() => set({ priceMin: '', priceMax: '' })}
        padX={padX}
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min="0"
              step="50000"
              placeholder="Minimum"
              aria-label="Budget minimum en euros"
              value={value.priceMin}
              onChange={(e) => set({ priceMin: e.target.value })}
              className={`${input} pr-10`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">€</span>
          </div>
          <div className="relative">
            <input
              id="alert-budget"
              type="number"
              inputMode="numeric"
              min="0"
              step="50000"
              placeholder="Maximum"
              aria-label="Budget maximum en euros"
              value={value.priceMax}
              onChange={(e) => set({ priceMax: e.target.value })}
              className={`${input} pr-10`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">€</span>
          </div>
        </div>
      </Section>

      {FEATURE_GROUPS.map((g) => (
        <Section
          key={g.id}
          id={g.id}
          title={g.title}
          open={isOpen(g.id)}
          onToggle={() => toggleOpen(g.id)}
          active={g.items.some(([k]) => featureState(k) !== 'off')}
          onClear={() =>
            set({
              must: value.must.filter((k) => !g.items.some(([ik]) => ik === k)),
              nice: value.nice.filter((k) => !g.items.some(([ik]) => ik === k)),
            })
          }
          padX={padX}
        >
          <div className="flex flex-wrap gap-2">
            {g.items.map(([k, label]) => (
              <Chip key={k} state={featureState(k)} onClick={() => toggleFeature(k)}>
                {label}
              </Chip>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

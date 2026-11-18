'use client';

import { useEffect, useState } from 'react';
import { MapPin, X } from 'lucide-react';

interface Place {
  label: string; // ce qu'on affiche : « 92200 Neuilly-sur-Seine »
  value: string; // ce qu'on retient : « Neuilly-sur-Seine »
}

function arrondissement(n: number): string {
  return n === 1 ? 'Paris 1er' : `Paris ${n}e`;
}

function normalizeLocation(raw: string): string {
  const s = raw.trim().replace(/\s+/g, ' ');
  if (!s) return '';
  const paris = s.match(/^paris\s*0?(\d{1,2})\s*(?:e|er|ème|eme|è)?(?:\s+arrondissement)?$/i);
  const bare = s.match(/^0?(\d{1,2})\s*(?:e|er|ème|eme)$/i);
  const m = paris || bare;
  if (m) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 20) return arrondissement(n);
  }
  if (/^paris$/i.test(s)) return 'Paris';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function plain(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Champ « Localisation » à choix multiple : suggestions à la frappe (arrondissements de Paris
// et communes via l'API adresse de l'État), lieux choisis affichés en étiquettes supprimables.
export default function LocationPicker({
  value,
  onChange,
  placeholder = 'Localisation',
  max = 10,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  max?: number;
}) {
  const [input, setInput] = useState('');
  const [remote, setRemote] = useState<Place[]>([]);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const q = input.trim();
    if (q.length < 2) {
      setRemote([]);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&type=municipality&autocomplete=1&limit=6`
        );
        const json = await res.json();
        const found: Place[] = ((json && json.features) || [])
          .map((f: { properties?: { city?: string; name?: string; postcode?: string } }) => {
            const p = f.properties || {};
            const v = normalizeLocation(String(p.city || p.name || ''));
            const pc = String(p.postcode || '');
            return v ? { label: `${pc ? pc + ' ' : ''}${v}`, value: v } : null;
          })
          .filter(Boolean) as Place[];
        if (!cancelled) setRemote(found);
      } catch {
        if (!cancelled) setRemote([]);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [input]);

  function add(raw: string) {
    const loc = normalizeLocation(raw);
    if (!loc || value.length >= max || value.some((l) => plain(l) === plain(loc))) {
      setInput('');
      return;
    }
    onChange([...value, loc]);
    setInput('');
    setRemote([]);
  }

  const typed = plain(input.trim());
  const proposals: Place[] = [];
  if (typed !== '') {
    const pcode = typed.match(/^75(\d{3})$/);
    for (let n = 1; n <= 20; n++) {
      const name = arrondissement(n);
      const code = `750${String(n).padStart(2, '0')}`;
      const hit =
        (pcode && (`75${pcode[1]}` === code || (n === 16 && pcode[1] === '116'))) ||
        (/^(paris|\d{1,2})/.test(typed) && (plain(name).includes(typed) || plain(name).replace(/\D/g, '') === typed.replace(/\D/g, '')));
      if (hit) proposals.push({ label: `${code} ${name}`, value: name });
    }
    if ('paris'.startsWith(typed)) proposals.unshift({ label: 'Paris, tous les arrondissements', value: 'Paris' });
    remote.forEach((p) => proposals.push(p));
  }
  const seen = new Set<string>();
  const dropdown = proposals
    .filter((p) => !value.some((l) => plain(l) === plain(p.value)))
    .filter((p) => {
      const k = plain(p.value);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 6);
  const open = focused && typed !== '' && dropdown.length > 0;

  return (
    <div>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        <input
          type="text"
          inputMode="search"
          enterKeyHint="done"
          autoComplete="off"
          autoCorrect="off"
          aria-label={placeholder}
          role="combobox"
          aria-expanded={open}
          aria-controls="lieux-proposes"
          aria-autocomplete="list"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (input.trim()) add(dropdown[0] ? dropdown[0].value : input);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (dropdown[0]) add(dropdown[0].value);
              else if (input.trim()) add(input);
            }
            if (e.key === 'Backspace' && input === '' && value.length > 0) onChange(value.slice(0, -1));
          }}
          placeholder={value.length > 0 ? 'Ajouter une localisation' : placeholder}
          className="w-full h-12 border border-stone-300 bg-white pl-9 pr-3 text-base placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
        />
        {open && (
          <ul id="lieux-proposes" role="listbox" className="absolute left-0 right-0 top-full z-20 mt-1 border border-stone-300 bg-white shadow-lg">
            {dropdown.map((p, i) => (
              <li key={p.value} role="option" aria-selected={i === 0}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => add(p.value)}
                  className={`w-full min-h-[44px] px-3 py-2 flex items-center gap-2 text-left text-sm text-stone-900 hover:bg-stone-100 ${i === 0 ? 'bg-stone-50' : ''}`}
                >
                  <MapPin className="w-4 h-4 flex-none text-stone-400" />
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((l) => (
            <span key={l} className="inline-flex items-center h-9 pl-3 bg-stone-900 text-white text-sm">
              {l}
              <button
                type="button"
                onClick={() => onChange(value.filter((x) => x !== l))}
                aria-label={`Retirer ${l}`}
                className="h-9 w-9 flex items-center justify-center text-stone-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

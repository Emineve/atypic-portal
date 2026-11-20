export const metadata = { title: 'Étiquettes · essais', robots: { index: false, follow: false } };

// Page d'essai, hors menu et hors moteurs : cinq façons d'afficher les atouts d'un bien sur une carte.
const TAGS = ['Atelier d’artiste', 'Triplex', 'Dernier étage'];

function Tags({ k }: { k: string }) {
  if (k === 'A')
    return (
      <ul className="mt-4 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <li key={t} className="rounded-full bg-[#F4E7B5] px-3 py-1 text-[13px] leading-tight text-stone-800">{t}</li>
        ))}
      </ul>
    );
  if (k === 'B')
    return (
      <ul className="mt-4 flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <li key={t} className="rounded-full border border-stone-300 px-3 py-1 text-[13px] leading-tight text-stone-700">{t}</li>
        ))}
      </ul>
    );
  if (k === 'C')
    return (
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {TAGS.map((t) => (
          <li key={t} className="flex items-center gap-1.5 text-sm text-stone-700">
            <span className="h-2 w-2 rounded-full bg-[#E9D48A]" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    );
  if (k === 'D') return <p className="mt-3 text-sm text-stone-600">{TAGS.join(' · ')}</p>;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {TAGS.map((t) => (
        <li key={t} className="rounded-[6px] bg-stone-100 px-2.5 py-1 text-[13px] leading-tight text-stone-700">{t}</li>
      ))}
    </ul>
  );
}

const OPTIONS = [
  { k: 'A', name: 'Actuelles', note: 'Pastilles jaunes pleines.' },
  { k: 'B', name: 'Contour fin', note: 'Même forme, sans fond : plus discret.' },
  { k: 'C', name: 'Point jaune', note: 'Un point de couleur, le texte nu : le jaune reste, le poids disparaît.' },
  { k: 'D', name: 'Une ligne', note: 'Les atouts à la suite, comme la ligne de ville.' },
  { k: 'E', name: 'Gris neutre', note: 'Petits cartouches gris, angles peu arrondis.' },
];

export default function TagTrials() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] px-6 py-12 font-sans text-[#191919]">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-4xl tracking-tight text-stone-900">Étiquettes : cinq essais</h1>
        <p className="mt-3 text-stone-600">La même carte, cinq façons d’afficher les atouts du bien.</p>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((o) => (
            <li key={o.k}>
              <p className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-sm font-medium text-white">{o.k}</span>
                <span>
                  <span className="block font-medium text-stone-900">{o.name}</span>
                  <span className="block text-sm text-stone-500">{o.note}</span>
                </span>
              </p>
              <article className="overflow-hidden rounded-[14px] border border-stone-200 bg-white">
                <div className="relative aspect-[4/3] bg-stone-300">
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-stone-900 shadow-sm">Loft &amp; Atelier</span>
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs uppercase tracking-wider text-stone-400">Paris 16e · 110 m²</p>
                  <h2 className="font-serif text-2xl leading-tight text-stone-900">Atelier d’artiste en triplex, Trocadéro</h2>
                  <Tags k={o.k} />
                  <div className="mt-6 flex items-end justify-between gap-3">
                    <span>
                      <span className="block whitespace-nowrap text-xl tabular-nums tracking-tight">1&nbsp;250&nbsp;000&nbsp;€</span>
                      <span className="mt-1 block text-xs text-stone-500">Agences de France</span>
                    </span>
                    <span className="text-[15px] font-medium text-stone-900 underline decoration-stone-300 underline-offset-4">Voir le bien ↗</span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

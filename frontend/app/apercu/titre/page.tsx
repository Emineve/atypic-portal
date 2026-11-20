export const metadata = { title: 'Titre de l’accueil · essais', robots: { index: false, follow: false } };

// Page d'essai, hors menu et hors moteurs : quatre façons de mettre du jaune dans le titre de l'accueil.
const H1 = 'text-[2rem] md:text-[3.4rem] font-serif tracking-tight text-stone-900 max-w-5xl mx-auto leading-[1.1] [text-wrap:balance]';

const OPTIONS: { k: string; name: string; note: string; end: React.ReactNode }[] = [
  { k: 'A', name: 'Sans jaune', note: 'Le titre actuel, grossi.', end: <span className="italic text-stone-600">réunis sur un seul site</span> },
  {
    k: 'B',
    name: 'Surligné',
    note: 'Un trait de surligneur jaune derrière les mots.',
    end: <span className="italic text-stone-900 [background:linear-gradient(transparent_62%,#F4E7B5_62%)]">réunis sur un seul site</span>,
  },
  {
    k: 'C',
    name: 'Souligné',
    note: 'Un filet jaune épais sous les mots.',
    end: <span className="italic text-stone-700 underline decoration-[#E9D48A] decoration-4 underline-offset-8">réunis sur un seul site</span>,
  },
  { k: 'D', name: 'Texte jaune', note: 'Les mots en jaune : peu lisible sur fond clair, montré pour comparaison.', end: <span className="italic text-[#D9BF5C]">réunis sur un seul site</span> },
];

export default function TitleTrials() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] px-6 py-12 font-sans text-[#191919]">
      <div className="mx-auto max-w-7xl space-y-16">
        {OPTIONS.map((o) => (
          <section key={o.k} className="text-center">
            <p className="mb-8 inline-flex items-center gap-3 text-left">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-sm font-medium text-white">{o.k}</span>
              <span>
                <span className="block font-medium text-stone-900">{o.name}</span>
                <span className="block text-sm text-stone-500">{o.note}</span>
              </span>
            </p>
            <p className="mb-4 text-xs uppercase tracking-widest text-stone-500">Curateur de biens atypiques</p>
            <h2 className={H1}>
              Tous les biens atypiques des meilleures agences, {o.end}.
            </h2>
          </section>
        ))}
      </div>
    </div>
  );
}

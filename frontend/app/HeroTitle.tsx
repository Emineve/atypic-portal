// Phrase d'accueil : la promesse du site, pour les acheteurs comme pour les agences.
export default function HeroTitle() {
  return (
    <>
      <p className="mb-4 text-[10px] uppercase tracking-widest text-stone-400">Curateur de biens atypiques</p>
      <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.15]">
        Tous les biens atypiques des meilleures agences,{' '}
        <span className="italic text-stone-600">réunis sur un seul site</span>.
      </h1>
    </>
  );
}

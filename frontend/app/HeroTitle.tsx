// Phrase d'accueil : la promesse du site, pour les acheteurs comme pour les agences.
export default function HeroTitle() {
  return (
    <h1 className="text-2xl md:text-4xl font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.25]">
      Lofts, ateliers d&apos;artistes, rooftops : tous les biens atypiques des meilleures agences,{' '}
      <span className="italic text-stone-600">réunis sur un seul site</span>.
    </h1>
  );
}

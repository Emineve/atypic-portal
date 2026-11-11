// Phrase d'accueil : la promesse du site, pour les acheteurs comme pour les agences.
export default function HeroTitle() {
  return (
    <>
      <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.15]">
        Tous les biens atypiques des meilleures agences,{' '}
        <span className="italic text-stone-600">réunis sur un seul site</span>.
      </h1>
      <p className="mt-5 text-stone-500 max-w-2xl mx-auto font-light text-base md:text-lg">
                Lofts, ateliers d&apos;artistes, rooftops, et bien d&apos;autres lieux singuliers.
      </p>
    </>
  );
}

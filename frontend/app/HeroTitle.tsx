// Phrase d'accueil : la promesse du site, pour les acheteurs comme pour les agences.
// Même dessin que les titres d'État des lieux : romain, puis italique gris.
export default function HeroTitle() {
  return (
    <h1 className="text-[2.4rem] md:text-[3.25rem] xl:whitespace-nowrap font-serif tracking-tight text-stone-900 leading-[1.1] [text-wrap:balance]">
      Tous les biens atypiques, <span className="italic text-stone-500">réunis sur un seul site.</span>
    </h1>
  );
}

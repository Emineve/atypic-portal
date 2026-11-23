// Phrase d'accueil : la promesse du site, pour les acheteurs comme pour les agences.
// Même dessin que les titres d'État des lieux : romain, puis italique gris.
export default function HeroTitle() {
  return (
    <>
      <h1 className="text-[2.2rem] md:text-[3.25rem] font-serif tracking-tight text-stone-900 leading-[1.1] [text-wrap:balance]">
        Tous les biens de caractère à vendre, <span className="italic text-stone-500 md:block">réunis sur un seul site.</span>
      </h1>
      <p className="mt-4 text-base md:text-lg font-light leading-relaxed text-stone-600 [text-wrap:balance]">
        L’atypique et rien d’autre.
      </p>
    </>
  );
}

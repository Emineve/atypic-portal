// Phrase d'accueil : la promesse du site, pour les acheteurs comme pour les agences.
export default function HeroTitle() {
  return (
    <>
      <h1 className="text-[2rem] md:text-[3.4rem] font-serif tracking-tight text-stone-900 max-w-5xl mx-auto leading-[1.1] [text-wrap:balance]">
        Tous les biens atypiques à vendre,{' '}
        <span className="italic text-stone-900 [background:linear-gradient(transparent_62%,#F6CF4E_62%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">réunis sur un seul site</span>.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg font-light text-stone-600">
        Ici, le banal n’a pas sa place.
      </p>
    </>
  );
}

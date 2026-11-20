// Phrase d'accueil : la promesse du site, pour les acheteurs comme pour les agences.
export default function HeroTitle() {
  return (
    <>
      <p className="mb-4 text-xs uppercase tracking-widest text-stone-500">Curateur de biens atypiques</p>
      <h1 className="text-[2rem] md:text-[3.4rem] font-serif tracking-tight text-stone-900 max-w-5xl mx-auto leading-[1.1] [text-wrap:balance]">
        Tous les biens atypiques des meilleures agences,{' '}
        <span className="italic text-stone-900 [background:linear-gradient(transparent_62%,#F4E7B5_62%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">réunis sur un seul site</span>.
      </h1>
    </>
  );
}

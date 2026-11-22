// Phrase d'accueil : la promesse du site, pour les acheteurs comme pour les agences.
// Un seul mot sort du rang, celui qui le dit.
export default function HeroTitle() {
  return (
    <h1 className="text-[2.4rem] md:text-[3.25rem] xl:whitespace-nowrap font-serif tracking-tight text-stone-900 leading-[1.1] [text-wrap:balance]">
      Tous les biens{' '}
      <span className="whitespace-nowrap">
        <span className="inline-block italic -rotate-6 translate-y-[0.06em] px-[0.08em] [background:linear-gradient(transparent_62%,#F6CF4E_62%)]">atypiques</span>,
      </span>{' '}
      réunis sur un seul site.
    </h1>
  );
}

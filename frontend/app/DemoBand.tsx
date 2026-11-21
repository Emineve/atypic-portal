// Bandeau affiché en haut de toutes les pages tant que le site est en démonstration.
// À retirer le jour de l'ouverture : passer DEMO_MODE à false.
export const DEMO_MODE = true;

export default function DemoBand() {
  if (!DEMO_MODE) return null;
  return (
    <div className="overflow-hidden whitespace-nowrap bg-stone-900 px-4 py-2.5 text-center text-[11px] leading-none tracking-[0.1em] text-stone-100 md:text-[13px] md:tracking-[0.14em] print:hidden">
      {/* Sur téléphone, une seule ligne courte ; la version complète à partir de la tablette */}
      <span className="sm:hidden">Site en démonstration · annonces d’exemple</span>
      <span className="hidden sm:inline">
        Site en démonstration <span aria-hidden="true">|</span> Annonces présentées à titre d’exemple <span aria-hidden="true">|</span> Ouverture prochaine
      </span>
    </div>
  );
}

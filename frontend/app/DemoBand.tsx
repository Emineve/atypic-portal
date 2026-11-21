// Bandeau affiché en haut de toutes les pages tant que le site est en démonstration.
// À retirer le jour de l'ouverture : passer DEMO_MODE à false.
export const DEMO_MODE = true;

export default function DemoBand() {
  if (!DEMO_MODE) return null;
  return (
    <div className="bg-stone-900 px-5 py-2.5 text-center text-[12px] leading-relaxed tracking-[0.14em] text-stone-100 md:text-[13px] print:hidden">
      Site en démonstration <span aria-hidden="true">|</span> Annonces présentées à titre d’exemple
      <span className="hidden sm:inline"> <span aria-hidden="true">|</span> Ouverture prochaine</span>
    </div>
  );
}

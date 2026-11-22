// La surface d'un bien, écrite comme une cote sur un plan : un petit trait de chaque côté du chiffre.
// Seule la surface est cotée ; partout où elle s'affiche à côté de la ville, elle prend cette forme.
export default function Surface({ sqm }: { sqm: number | null | undefined }) {
  if (!sqm) return null;
  const n = Math.round(Number(sqm));
  return (
    <span className="ml-2.5 inline-flex items-center gap-1 align-middle text-stone-900 normal-case tracking-normal" aria-label={`${n} mètres carrés`}>
      <span className="h-2.5 w-px bg-stone-900" />
      <span className="h-px w-3 bg-stone-900" />
      <span className="font-sans tabular-nums">{n} m²</span>
      <span className="h-px w-3 bg-stone-900" />
      <span className="h-2.5 w-px bg-stone-900" />
    </span>
  );
}

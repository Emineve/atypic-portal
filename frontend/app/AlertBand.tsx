// Invitation à créer une alerte, la même partout (et la même que dans le menu) : une carte jaune,
// « Créer une alerte » en titre, une phrase propre à la page dessous, et une flèche dans un rond noir.
// Le bouton garde son intitulé pour les lecteurs d'écran ; à l'œil, seule la flèche apparaît.
export const ALERT_BUTTON = 'alert-arrow inline-flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full transition hover:opacity-85';

export default function AlertBand({ title, children, extra, className = '' }: { title: React.ReactNode; children: React.ReactNode; extra?: React.ReactNode; className?: string }) {
  return (
    <section data-alert-cta className={`flex items-center justify-between gap-5 rounded-[14px] bg-[#F4E7B5] px-6 py-5 text-left md:px-9 md:py-7 ${className}`}>
      <div className="min-w-0">
        <h2 className="font-serif text-2xl leading-tight text-stone-900 md:text-3xl">Créer une alerte</h2>
        <p className="mt-1 text-sm leading-snug text-stone-700 md:text-base">{title}</p>
        {extra && <p className="mt-2">{extra}</p>}
      </div>
      <div className="flex flex-none items-center">{children}</div>
    </section>
  );
}

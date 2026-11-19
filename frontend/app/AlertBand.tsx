// Invitation à créer une alerte, la même partout : un titre à gauche, le bouton à droite, entre deux filets.
export const ALERT_BUTTON =
  'inline-flex h-12 flex-none items-center px-8 rounded-[10px] bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition';

export default function AlertBand({ title, children, extra, className = '' }: { title: React.ReactNode; children: React.ReactNode; extra?: React.ReactNode; className?: string }) {
  return (
    <section data-alert-cta className={`border-y border-stone-200 py-10 grid md:grid-cols-[1fr_auto] gap-x-12 gap-y-5 md:items-center text-left ${className}`}>
      <div>
        <h2 className="font-serif text-2xl leading-snug text-stone-900">{title}</h2>
        {extra && <p className="mt-2">{extra}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">{children}</div>
    </section>
  );
}

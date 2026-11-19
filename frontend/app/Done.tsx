// Confirmation d'envoi, la même partout : pastille noire, coche, une phrase de titre, une phrase de suite.
export default function Done({ title, children, className = '' }: { title: string; children?: React.ReactNode; className?: string }) {
  return (
    <div role="status" className={`flex items-start gap-4 ${className}`}>
      <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-stone-900 text-white">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <div>
        <p className="font-serif text-2xl leading-snug text-stone-900">{title}</p>
        {children && <p className="mt-1.5 text-stone-600 leading-relaxed">{children}</p>}
      </div>
    </div>
  );
}

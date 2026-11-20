// Petite animation pour l'écran « aucun favori » : un pointeur va jusqu'au cœur d'une carte, le cœur se remplit.
// Purement décorative ; elle s'arrête si le visiteur a demandé moins d'animations.
export default function FavHint() {
  return (
    <div className="fav-hint relative mx-auto mb-8 w-44" aria-hidden="true">
      <div className="overflow-hidden rounded-[14px] border border-stone-200 bg-white text-left shadow-sm">
        <div className="relative aspect-[4/3] bg-stone-200">
          <span className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path
                className="fav-hint-heart"
                d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z"
                stroke="#1c1917"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="space-y-1.5 p-3">
          <span className="block h-1.5 w-12 rounded-full bg-stone-200" />
          <span className="block h-2.5 w-28 rounded-full bg-stone-300" />
          <span className="block h-2.5 w-20 rounded-full bg-stone-300" />
        </div>
      </div>
      <svg viewBox="0 0 24 24" className="fav-hint-cursor absolute h-7 w-7 drop-shadow">
        <path d="M5 3l14 7.5-6.2 1.6L10 19 5 3Z" fill="#1c1917" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

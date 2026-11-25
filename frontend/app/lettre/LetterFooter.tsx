// Pied de page du mode lettre : la marque, deux liens, l'invitation à choisir ses newsletters, les mentions. Rien qui renvoie aux rubriques cachées.
export default function LetterFooter() {
  const link = 'text-stone-300 hover:text-[#FBF5E9] underline-offset-4 hover:underline decoration-[#FBF5E9]';
  return (
    <footer data-dark-footer className="bg-stone-900 text-[#FBF5E9]">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10 md:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-x-16 gap-y-10">
          <div>
            <a href="/" aria-label="Loftissime, retour à l'accueil" className="block font-logo text-4xl md:text-5xl font-semibold tracking-tight leading-none text-[#FBF5E9]">
              loftissime.
            </a>
            <p className="mt-5 font-serif text-xl md:text-2xl leading-none">
              Curateur de biens <span className="italic text-stone-400">atypiques</span>
            </p>
          </div>
          {/* toutes les newsletters, pas seulement la première : le choix se fait sur l'accueil */}
          <div className="w-full max-w-md border border-stone-700 p-5">
            <p className="font-serif text-2xl leading-tight text-[#FBF5E9]">Les newsletters de Loftissime</p>
            <p className="mt-2 text-sm leading-relaxed text-stone-400">Douze newsletters sur l’immobilier atypique, gratuites. <em>Béton ciré</em> ouvre la série.</p>
            <a href="/#recevoir" className="mt-4 inline-flex h-11 items-center rounded-full bg-[#FBF5E9] px-5 text-sm font-medium text-stone-900 transition-colors hover:bg-white">
              Choisir les miennes
            </a>
          </div>
        </div>
        <nav aria-label="Loftissime" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <a href="/lettre" className={link}>Béton ciré, tous les numéros</a>
          <a href="/guide" className={link}>Avant la promesse</a>
          <a href="/qui-sommes-nous" className={link}>Pourquoi Loftissime</a>
        </nav>
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-700 pt-6 text-xs text-stone-500" aria-label="Informations légales">
          <span>© Loftissime</span>
          <a href="/mentions-legales" className="hover:text-[#FBF5E9]">Mentions légales</a>
          <a href="/confidentialite" className="hover:text-[#FBF5E9]">Confidentialité</a>
          <a href="/cgu" className="hover:text-[#FBF5E9]">Conditions d&apos;utilisation</a>
        </nav>
      </div>
    </footer>
  );
}

import LetterSignup from './LetterSignup';

// Pied de page du mode lettre : la marque, deux liens, la boîte d'abonnement à la newsletter, les mentions. Rien qui renvoie aux rubriques cachées.
export default function LetterFooter() {
  const link = 'text-stone-300 hover:text-[#FBF5E9] underline-offset-4 hover:underline decoration-[#F6CF4E]';
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
          <LetterSignup variant="footer" source="pied" className="w-full max-w-md" />
        </div>
        <nav aria-label="Loftissime" className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <a href="/lettre" className={link}>Béton ciré, tous les numéros</a>
          <a href="/guide" className={link}>Avant la promesse</a>
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

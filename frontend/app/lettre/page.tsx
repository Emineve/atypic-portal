import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import LetterSignup from './LetterSignup';
import { dateLettre } from './LetterView';
import { BETON_BG, Poutre, Verriere } from './Beton';
import { getIssues } from '../../lib/lettre';

export const revalidate = 60;

export const metadata = {
  title: 'Béton ciré, la newsletter de Loftissime',
  description: 'Béton ciré, la newsletter de Loftissime : un jeudi sur deux, un bien atypique à Paris, ce qu’on peut en faire et ce qu’il coûte vraiment.',
};

// La page de « Béton ciré » : la newsletter se présente dans ses propres matières (béton, acier, verrière),
// puis tous les numéros, du plus récent au plus ancien, et l'abonnement.
export default async function LettreIndex() {
  const lettres = await getIssues();
  const parus = lettres.filter((l) => l.paru);
  return (
    <div className="min-h-screen font-sans text-[#211C15]" style={BETON_BG}>
      <SiteHeader />

      <header className="bg-[#211C15] text-[#FBF5E9]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <h1 className="font-serif text-6xl italic leading-none md:text-8xl">Béton ciré</h1>
          <p className="mt-5 max-w-2xl text-lg text-[#cfc5b4]">
            La newsletter de <span className="font-logo font-semibold tracking-[-0.4px] text-[#FBF5E9]">loftissime.</span> Un jeudi sur deux, un bien atypique à Paris : la visite, le projet, et ce qu’il coûte vraiment.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20 pt-10 md:pt-14">
        <Poutre />
        <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">Tous les numéros</h2>

        {parus.length > 0 ? (
          <ul className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {parus.map((l) => (
              <li key={l.numero}>
                <Link href={`/lettre/numero-${l.numero}`} className="group block">
                  <Verriere label={`La visite du numéro ${l.numero}`} />
                  <span className="mt-4 block text-sm text-[#74695A]">N° {l.numero}, {dateLettre(l.date_parution, false)}</span>
                  <span className="mt-1 block font-serif text-2xl leading-tight group-hover:underline underline-offset-4 decoration-[#F6CF4E] decoration-2">{l.titre}</span>
                  {l.resume && <span className="mt-2 block text-[15px] leading-relaxed text-[#4a4238]">{l.resume}</span>}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 max-w-2xl font-serif text-2xl leading-snug md:text-3xl">
            {/* pas de date tant que le numéro n'est pas paru : une date prévue dans le back-office n'est pas une promesse */}
            Le premier numéro arrive bientôt.
          </p>
        )}

        <div className="mt-16 md:mt-20">
          <Poutre />
          <LetterSignup variant="band" source="numeros" className="mt-6" />
        </div>
      </main>
    </div>
  );
}

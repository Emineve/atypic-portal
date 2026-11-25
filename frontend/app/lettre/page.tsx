import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import LetterSignup from './LetterSignup';
import { dateLettre } from './LetterView';
import { BETON_BG, Poutre, Verriere } from './Beton';
import { getIssues } from '../../lib/lettre';
import { EXEMPLES_ACTIFS, NUMEROS_EXEMPLE, PROCHAIN_NUMERO } from '../../lib/lettreExemples';

export const revalidate = 60;

export const metadata = {
  title: 'Béton ciré, la newsletter de Loftissime',
  description: 'Béton ciré, la newsletter de Loftissime : dans chaque numéro, un bien atypique à rénover, ce qu’on peut en faire et ce qu’il coûte vraiment.',
};

// La page de « Béton ciré » : la newsletter se présente dans ses propres matières (béton, acier, verrière),
// puis tous les numéros, du plus récent au plus ancien, et l'abonnement.
export default async function LettreIndex() {
  const lettres = await getIssues();
  const parus = lettres.filter((l) => l.paru);
  const exemples = parus.length === 0 && EXEMPLES_ACTIFS;
  const prochain = exemples ? PROCHAIN_NUMERO : (parus[0]?.numero || 0) + 1;
  return (
    <div className="min-h-screen font-sans text-[#211C15]" style={BETON_BG}>
      <SiteHeader />

      <header className="bg-[#211C15] text-[#FBF5E9]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <h1 className="font-serif text-6xl italic leading-none md:text-8xl">Béton ciré</h1>
          <p className="mt-5 text-lg text-[#cfc5b4]">
            La newsletter de <span className="font-logo font-semibold tracking-[-0.4px] text-[#FBF5E9]">loftissime.</span>
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20 pt-10 md:pt-14">
        {/* l'abonnement à gauche, la une du prochain numéro à droite */}
        <section className="grid items-center gap-x-12 gap-y-8 pb-14 md:pb-20 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">
              Abonnez-vous à Béton ciré, <span className="italic text-[#74695A]">la newsletter de Loftissime.</span>
            </h2>
            <p className="mt-3 max-w-xl text-lg text-[#4a4238]">
              Dans chaque numéro, un bien atypique passé au crible : ce qu’on peut en faire, ce qu’il coûte vraiment et les points de vigilance, avec les conseils de nos experts.
            </p>
            <LetterSignup source="numeros" className="mt-6 max-w-md" />
          </div>
          <div className="border border-[#211C15] bg-[#FBF5E9]">
            <Poutre />
            <div className="p-6 md:p-7">
              <p className="flex items-baseline justify-between gap-4">
                <span className="font-serif text-4xl italic leading-none">Béton ciré</span>
                <span className="text-sm text-[#74695A]">n° {prochain}, à paraître</span>
              </p>
              <Verriere label="La visite filmée du prochain numéro" className="mt-6" />
              <p className="mt-5 font-serif text-xl leading-snug">La visite, le projet, l’addition, <span className="italic text-[#74695A]">et ce qu’il faut vérifier avant de signer.</span></p>
            </div>
          </div>
        </section>

        <Poutre />
        <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">Tous les numéros</h2>

        <ul className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <div className="flex aspect-[640/400] items-center justify-center border border-dashed border-[#211C15] px-6 text-center">
              <span className="font-serif text-2xl italic leading-tight text-[#74695A]">Le n° {prochain} arrive bientôt</span>
            </div>
            <p className="mt-4 text-sm text-[#74695A]">N° {prochain}, à paraître</p>
          </li>
          {exemples
            ? NUMEROS_EXEMPLE.map((n) => (
                <li key={n.numero}>
                  <Verriere label={`La visite du numéro ${n.numero}`} />
                  <p className="mt-4 text-sm text-[#74695A]">N° {n.numero}</p>
                  <p className="mt-1 font-serif text-2xl leading-tight">{n.titre}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#4a4238]">{n.resume}</p>
                </li>
              ))
            : parus.map((l) => (
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

        <section className="mt-16 md:mt-24">
          <Poutre />
          <div className="mt-5 grid gap-x-12 gap-y-5 md:grid-cols-[1fr_1.4fr]">
            <h2 className="font-serif text-3xl leading-[1.1] md:text-4xl">
              Pourquoi <span className="italic text-[#74695A]">Béton ciré ?</span>
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-[#4a4238]">
              <p>
                Un atelier fatigué, une ancienne boutique, un plateau resté brut : ce sont souvent les plus beaux lieux, et ceux qui font le plus hésiter. On ne sait pas ce qu’ils peuvent devenir, ni ce qu’ils coûteront une fois les travaux finis.
              </p>
              <p>
                <em>Béton ciré</em> est fait pour ça. Dans chaque numéro, nous visitons un bien atypique à rénover avec ceux dont c’est le métier. Un architecte dessine ce qu’il en ferait. Un entrepreneur chiffre les travaux. Un courtier calcule la mensualité. Vous voyez le projet, puis l’addition complète.
              </p>
              <p>
                Et le nom ? Le béton ciré, c’est le sol que l’on coule quand tout est à refaire : brut au départ, superbe à l’arrivée. C’est exactement l’histoire des biens que nous allons voir.
              </p>
              <p>
                Notre conviction : vivre autrement, ça se calcule. Il faut oser, faire ses comptes et être bien accompagné. Alors on y arrive.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

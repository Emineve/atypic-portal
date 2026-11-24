import SiteHeader from '../SiteHeader';
import LetterSignup from './LetterSignup';
import Mesure from './Mesure';
import { BETON_BG, Poutre } from './Beton';
import { BIENS_EXEMPLE, EXEMPLES_ACTIFS } from '../../lib/lettreExemples';
import type { LetterItem } from './LetterView';
import { getIssue, getIssues } from '../../lib/lettre';

// L'accueil du mode lettre, de haut en bas : le titre de Loftissime et l'abonnement à sa newsletter « Béton ciré »,
// puis les biens parus dans la newsletter. Rien d'autre pour le moment.
// Tant qu'aucun numéro n'est paru, les numéros et les biens affichés sont ceux de lib/lettreExemples.ts.

const euros = (n: number | null) => (n == null ? '' : n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €');

// La vignette d'un bien paru dans la lettre : même gabarit que les vignettes d'annonces du site, avec le dessin à la
// place de la photo. On n'entre pas dans une fiche : le seul lien mène à l'annonce de l'agence ou du propriétaire.
function BienCard({ b, numero, une = false }: { b: LetterItem; numero: number; une?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[14px] border border-stone-200 bg-white">
      <div className="flex aspect-[3/2] items-center justify-center border-b border-stone-900 bg-white sm:aspect-[4/3]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 23px, rgba(33,28,21,.06) 23px 24px), repeating-linear-gradient(90deg, transparent 0 23px, rgba(33,28,21,.06) 23px 24px)' }}>
        {b.kind !== 'aucun' ? (
          // le trait tremble un peu et le jaune devient gris : un croquis fait à la main, sur papier quadrillé
          <span className="block h-[82%]" style={{ filter: 'url(#main-levee) grayscale(1) contrast(1.2)' }}>
            <Mesure kind={b.kind} valeur={b.valeur} className="block h-full w-auto" />
          </span>
        ) : (
          <span className="px-6 text-center font-serif text-2xl italic leading-tight text-stone-900">{b.mesure}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-serif text-2xl leading-tight text-stone-900">{b.mesure}</p>
        {b.mesure_detail && <p className="font-serif text-lg italic leading-tight text-stone-500">{b.mesure_detail}</p>}
        <p className="mt-3 text-sm text-stone-600">
          {b.lieu}
          {b.surface && <span className="text-stone-500">, {b.surface}</span>}
        </p>
        <p className="mt-auto pt-4 font-serif text-xl lining-nums text-stone-900">{euros(b.prix)}</p>
        <p className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-stone-500">
          <span>{une ? 'À la une de' : 'Paru dans'} Béton ciré n° {numero}</span>
          {b.agency_url ? (
            <a href={b.agency_url} target="_blank" rel="noreferrer" className="font-medium text-stone-900 underline underline-offset-4 decoration-[#F6CF4E] decoration-2">
              {b.seller === 'particulier' ? 'Voir l’annonce du propriétaire' : `Voir l’annonce chez ${b.agency_name}`}
            </a>
          ) : (
            <span>{b.seller === 'particulier' ? 'Vendu par un particulier' : b.agency_name}</span>
          )}
        </p>
      </div>
    </article>
  );
}

export default async function LetterHome() {
  const parus = (await getIssues()).filter((i) => i.paru);
  // Tant qu'aucun numéro n'est paru, l'accueil montre des numéros d'exemple, sans lien
  const exemples = parus.length === 0 && EXEMPLES_ACTIFS;
  const full = exemples ? [] : await Promise.all(parus.slice(0, 2).map((i) => getIssue(i.numero)));
  const biens: { b: LetterItem; numero: number; une: boolean }[] = exemples
    ? BIENS_EXEMPLE
    : full.flatMap((d) => (d ? d.items.filter((i) => i.rubrique !== 'avant_premiere').map((b, k) => ({ b, numero: d.issue.numero, une: k === 0 })) : []));

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />
      {/* le filtre qui donne aux croquis des vignettes leur trait à main levée */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="main-levee" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="bruit" />
          <feDisplacementMap in="SourceGraphic" in2="bruit" scale="3.4" />
        </filter>
      </svg>

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-14 pb-10 md:pb-14">
        {/* Le titre de Loftissime, le même qu'en mode portail : le site ne se réduit pas à sa newsletter */}
        <h1 className="max-w-4xl text-[2.5rem] md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.04]">
          Tout l’immobilier atypique, <span className="italic text-stone-500">réuni sur un seul site.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-stone-600">Lofts, ateliers d’artistes, toits-terrasses, biens de caractère.</p>

        {/* la boîte d'abonnement, dans les matières de la newsletter : béton et poutre d'acier */}
        <div className="mt-10 md:mt-12" style={BETON_BG}>
          <Poutre />
          <div className="grid items-center gap-x-12 gap-y-6 p-6 md:p-9 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="font-serif text-5xl italic leading-none text-[#211C15] md:text-6xl">Béton ciré</h2>
              <p className="mt-3 font-serif text-xl leading-snug text-[#211C15]">La newsletter de Loftissime.</p>
              <p className="mt-3 max-w-lg text-[#4a4238]">
                Dans chaque numéro, un bien atypique passé au crible : ce qu’on peut en faire, ce qu’il coûte vraiment et les points de vigilance, avec les conseils de nos experts.
              </p>
            </div>
            <LetterSignup source="accueil" className="w-full max-w-md lg:justify-self-end" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {biens.length > 0 && (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
              <h2 className="text-xs uppercase tracking-widest text-stone-500">Les biens parus dans Béton ciré</h2>
              <p className="text-sm text-stone-500">{biens.length} biens dans les deux derniers numéros</p>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {biens.map(({ b, numero, une }) => (
                <li key={b.id}>
                  <BienCard b={b} numero={numero} une={une} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

import SiteHeader from '../SiteHeader';
import LetterSignup from './LetterSignup';
import Mesure from './Mesure';
import { BIENS_EXEMPLE, EXEMPLES_ACTIFS } from '../../lib/lettreExemples';
import type { LetterItem } from './LetterView';
import { getIssue, getIssues } from '../../lib/lettre';

// L'accueil du mode lettre, de haut en bas : le titre de Loftissime et l'abonnement à sa newsletter « Béton ciré »,
// puis les biens parus dans la newsletter. Rien d'autre pour le moment.
// Tant qu'aucun numéro n'est paru, les numéros et les biens affichés sont ceux de lib/lettreExemples.ts.

// Les questions de l'accueil : ce qu'est le site, ce qu'est sa newsletter, ce qu'on fait de l'adresse e-mail
const QUESTIONS: [string, string][] = [
  ['Loftissime, c’est quoi ?', 'Un site consacré à l’immobilier atypique : lofts, ateliers d’artistes, toits-terrasses, biens de caractère. Il commence par sa newsletter, Béton ciré. Le reste arrive ensuite.'],
  ['Et Béton ciré ?', 'C’est la newsletter de Loftissime. Dans chaque numéro, nous poussons la porte d’un bien atypique à Paris : la visite en vidéo, ce qu’on peut en faire, ce qu’il coûte vraiment, travaux et mensualité compris, et le point à vérifier avant de signer. En prime, trois autres biens atypiques que nous avons repérés.'],
  ['Qui sont vos experts ?', 'Un architecte, un entrepreneur du bâtiment et un courtier en crédit. Chacun parle de son métier, et les chiffres qu’il donne sont signés de son nom.'],
  ['Est-ce que Loftissime vend les biens ?', 'Non. Chaque bien est vendu en direct par son propriétaire ou par l’intermédiaire d’une agence. C’est vers eux que mène le lien de l’annonce.'],
  ['L’abonnement est-il payant ?', 'Non, Béton ciré est gratuite.'],
  ['Que faites-vous de mon adresse e-mail ?', 'Elle sert à vous envoyer Béton ciré, rien d’autre. Elle n’est ni vendue ni transmise, et chaque numéro contient un lien pour se désinscrire en un clic.'],
];

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

        <LetterSignup variant="band" source="accueil" className="mt-10 md:mt-12" />
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {biens.length > 0 && (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
              <h2 className="text-xs uppercase tracking-widest text-stone-500">Les biens parus dans Béton ciré</h2>
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

        <section className="mt-16 md:mt-24 border-t border-stone-900 pt-4">
          <h2 className="text-xs uppercase tracking-widest text-stone-500">Béton ciré, le principe</h2>
          <div className="mt-5 grid gap-x-12 gap-y-5 md:grid-cols-[1fr_1.4fr]">
            <p className="font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">
              Vivre autrement, <span className="italic text-stone-500">ça se calcule.</span>
            </p>
            <div className="space-y-4 text-lg leading-relaxed text-stone-700">
              <p>
                Un loft, un atelier, une ancienne boutique : beaucoup en rêvent, peu osent. Parce qu’on ne sait pas ce que le lieu peut devenir, ni ce qu’il coûtera au bout du compte.
              </p>
              <p>
                Béton ciré est fait pour ça. Dans chaque numéro, nous visitons un bien atypique à Paris avec ceux dont c’est le métier. Un architecte dit ce qu’il en ferait. Un entrepreneur chiffre les travaux. Un courtier calcule la mensualité. Vous voyez le projet, puis l’addition complète.
              </p>
              <p>
                Notre conviction : habiter un lieu qui ne ressemble à aucun autre n’est pas réservé à quelques-uns. Il faut oser, faire ses comptes et être bien accompagné. Alors on y arrive.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-24 border-t border-stone-900 pt-4">
          <h2 className="text-xs uppercase tracking-widest text-stone-500">Vos questions</h2>
          <div className="mt-2 max-w-3xl">
            {QUESTIONS.map(([q, r]) => (
              <details key={q} className="group border-b border-stone-200">
                <summary className="flex cursor-pointer outline-none focus-visible:underline decoration-stone-900 underline-offset-4 list-none items-baseline justify-between gap-6 py-5 font-serif text-xl md:text-2xl leading-snug text-stone-900 [&::-webkit-details-marker]:hidden">
                  {q}
                  <span aria-hidden className="font-sans text-xl text-stone-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 text-lg leading-relaxed text-stone-700">{r}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

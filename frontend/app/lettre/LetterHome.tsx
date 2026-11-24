import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import GuideArt from '../guide/GuideArt';
import LetterSignup from './LetterSignup';
import Mesure from './Mesure';
import { Verriere } from './Beton';
import { dateLettre, type LetterItem } from './LetterView';
import { getIssue, getIssues } from '../../lib/lettre';

// L'accueil du mode lettre, de haut en bas : le titre de Loftissime et l'abonnement à sa newsletter « Béton ciré »,
// les biens déjà parus, qui nous sommes, puis État des lieux.
// `drafts` : l'aperçu montre aussi le numéro en préparation ; le site public ne montre que les numéros parus.

const euros = (n: number | null) => (n == null ? '' : n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €');

// La vignette d'un bien paru dans la lettre : même gabarit que les vignettes d'annonces du site, avec le dessin à la
// place de la photo. On n'entre pas dans une fiche : le seul lien mène à l'annonce de l'agence ou du propriétaire.
function BienCard({ b, numero }: { b: LetterItem; numero: number }) {
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
          <span>Paru dans Béton ciré n° {numero}</span>
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

export default async function LetterHome({ drafts = false }: { drafts?: boolean }) {
  const all = await getIssues();
  const shown = drafts ? all : all.filter((i) => i.paru);
  const next = all.find((i) => !i.paru); // le prochain numéro, pour annoncer sa date
  // Les biens parus : ceux des derniers numéros montrés, du plus récent au plus ancien
  const full = await Promise.all(shown.slice(0, 4).map((i) => getIssue(i.numero)));
  const biens = full.flatMap((d) => (d ? d.items.filter((i) => i.rubrique !== 'avant_premiere').map((b) => ({ b, numero: d.issue.numero })) : []));

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

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-10 md:pb-14">
        <div className="grid items-center gap-x-12 gap-y-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            {/* Le titre de Loftissime, le même qu'en mode portail : le site ne se réduit pas à sa newsletter */}
            <h1 className="text-[2.5rem] md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.04]">
              Tout l’immobilier atypique, <span className="italic text-stone-500">réuni sur un seul site.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-stone-600">Lofts, ateliers d’artistes, toits-terrasses, biens de caractère.</p>

            <div className="mt-9 border-t border-stone-900 pt-5">
              <h2 className="font-serif text-2xl md:text-3xl leading-tight text-stone-900">
                Abonnez-vous à Béton ciré, <span className="italic text-stone-500">la newsletter de Loftissime.</span>
              </h2>
              <p className="mt-2 max-w-xl text-stone-600">
                Parce qu’habiter un lieu atypique peut passer du rêve à la réalité. Un jeudi sur deux : une visite, un projet, son coût complet.
              </p>
              <LetterSignup source="accueil" className="mt-5 max-w-md" />
            </div>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-stone-900 bg-[#F6CF4E]">
            <GuideArt art="loft" className="block aspect-[4/3] w-full" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {biens.length > 0 && (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
              <h2 className="text-xs uppercase tracking-widest text-stone-500">Les biens parus dans Béton ciré, la newsletter de Loftissime</h2>
              <p className="text-sm text-stone-500">{biens.length} bien{biens.length > 1 ? 's' : ''}</p>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {biens.map(({ b, numero }) => (
                <li key={b.id}>
                  <BienCard b={b} numero={numero} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={biens.length > 0 ? 'mt-16 md:mt-20' : ''}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
            <h2 className="text-xs uppercase tracking-widest text-stone-500">Les numéros de Béton ciré</h2>
            {shown.length > 3 && <Link href="/lettre" className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-[#F6CF4E] decoration-2">Tous les numéros</Link>}
          </div>
          {shown.length > 0 ? (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.slice(0, 3).map((l) => (
                <li key={l.numero}>
                  <Link href={`/lettre/numero-${l.numero}`} className="group block">
                    {/* la vidéo de la visite sert de vignette ; tant qu'elle n'est pas tournée, son cadre l'annonce */}
                    <Verriere label={`La visite du numéro ${l.numero}`} />
                    <span className="mt-4 block text-sm text-stone-500">N° {l.numero}, {dateLettre(l.date_parution, false)}{!l.paru && ', en préparation'}</span>
                    <span className="mt-1 block font-serif text-2xl leading-tight text-stone-900 group-hover:underline underline-offset-4 decoration-[#F6CF4E] decoration-2">{l.titre}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 max-w-2xl font-serif text-3xl leading-tight text-stone-900">
              {next?.date_parution ? <>La première visite paraît le {dateLettre(next.date_parution)}.</> : <>La première visite arrive bientôt.</>}
            </p>
          )}
        </section>

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
                Béton ciré est fait pour ça. Un jeudi sur deux, nous visitons un bien atypique à Paris avec ceux dont c’est le métier. Un architecte dit ce qu’il en ferait. Un entrepreneur chiffre les travaux. Un courtier calcule la mensualité. Vous voyez le projet, puis l’addition complète.
              </p>
              <p>
                Notre conviction : habiter un lieu qui ne ressemble à aucun autre n’est pas réservé à quelques-uns. Il faut oser, faire ses comptes et être bien accompagné. Alors on y arrive.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

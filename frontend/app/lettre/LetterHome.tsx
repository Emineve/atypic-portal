import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import GuideArt from '../guide/GuideArt';
import LetterSignup from './LetterSignup';
import Mesure from './Mesure';
import { dateLettre, type LetterItem } from './LetterView';
import { getIssue, getIssues } from '../../lib/lettre';
import { publishedArticles } from '../../lib/guide';

// L'accueil du mode lettre, de haut en bas : la promesse et l'inscription, la lettre de la quinzaine,
// les biens déjà parus, qui nous sommes, puis État des lieux.
// `drafts` : l'aperçu montre aussi le numéro en préparation ; le site public ne montre que les numéros parus.

const euros = (n: number | null) => (n == null ? '' : n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €');

// La vignette d'un bien paru dans la lettre : même gabarit que les vignettes d'annonces du site, avec le dessin à la
// place de la photo. On n'entre pas dans une fiche : le seul lien mène à l'annonce de l'agence ou du propriétaire.
function BienCard({ b, numero }: { b: LetterItem; numero: number }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[14px] border border-stone-200 bg-white">
      <div className="flex aspect-[3/2] items-center justify-center border-b border-stone-900 bg-[#F6CF4E] sm:aspect-[4/3]">
        {b.kind !== 'aucun' ? (
          <span className="block h-[78%] rounded-md bg-[#FBF5E9] p-2">
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
          <span>Lettre n° {numero}</span>
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
  const last = shown[0];
  // Les biens parus : ceux des derniers numéros montrés, du plus récent au plus ancien
  const full = await Promise.all(shown.slice(0, 4).map((i) => getIssue(i.numero)));
  const biens = full.flatMap((d) => (d ? d.items.filter((i) => i.rubrique !== 'avant_premiere').map((b) => ({ b, numero: d.issue.numero })) : []));
  const articles = publishedArticles().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-10 md:pt-16 pb-10 md:pb-14">
        <h1 className="max-w-4xl text-[2.6rem] md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Un bien à potentiel, <span className="italic text-stone-500">et ce qu’il coûte vraiment.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-stone-600">
          Un jeudi sur deux, la lettre pousse la porte d’un bien atypique à Paris : ce qu’on peut en faire, les travaux, la mensualité.
        </p>
        <LetterSignup source="accueil" className="mt-8 max-w-xl" />
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {last ? (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
              <h2 className="text-xs uppercase tracking-widest text-stone-500">{last.paru ? 'La lettre de la quinzaine' : 'La lettre en préparation'}</h2>
              <p className="text-sm text-stone-500">N° {last.numero}, {dateLettre(last.date_parution)}</p>
            </div>
            <Link href={`/lettre/numero-${last.numero}`} className="group mt-6 block">
              <span className="font-serif text-3xl md:text-5xl leading-[1.08] text-stone-900 bg-[linear-gradient(#F6CF4E,#F6CF4E)] bg-no-repeat bg-[position:0_100%] pb-[3px] bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-[background-size] duration-300">
                {last.titre}
              </span>
              {last.resume && <span className="mt-4 block max-w-2xl text-lg text-stone-600">{last.resume}</span>}
            </Link>
            <p className="mt-6">
              <Link href={`/lettre/numero-${last.numero}`} className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-[#F6CF4E] decoration-2">Lire la lettre</Link>
              {shown.length > 1 && (
                <Link href="/lettre" className="ml-6 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-[#F6CF4E] decoration-2">Tous les numéros</Link>
              )}
            </p>
          </section>
        ) : (
          <section className="border-t border-stone-900 pt-4">
            <h2 className="text-xs uppercase tracking-widest text-stone-500">Le premier numéro</h2>
            <p className="mt-5 max-w-2xl font-serif text-3xl leading-tight text-stone-900">
              {next?.date_parution ? <>Il paraît le {dateLettre(next.date_parution)}.</> : <>Il arrive bientôt.</>}
            </p>
          </section>
        )}

        {biens.length > 0 && (
          <section className="mt-16 md:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
              <h2 className="text-xs uppercase tracking-widest text-stone-500">Les biens de la lettre</h2>
              <p className="text-sm text-stone-500">{biens.length} bien{biens.length > 1 ? 's' : ''}, chacun résumé par ce qu’il a de plus singulier</p>
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

        <section className="mt-16 md:mt-24 border-t border-stone-900 pt-4">
          <h2 className="text-xs uppercase tracking-widest text-stone-500">Qui écrit cette lettre</h2>
          <div className="mt-5 grid gap-x-12 gap-y-5 md:grid-cols-[1fr_1.4fr]">
            <p className="font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">
              Des rêveurs, <span className="italic text-stone-500">avec un mètre ruban.</span>
            </p>
            <div className="space-y-4 text-lg leading-relaxed text-stone-700">
              <p>
                On aime les lieux qui ont eu une autre vie : un atelier, une imprimerie, une boutique. Et on pense qu’on vous vend le mauvais rêve. Pas besoin d’un appartement parfait, refait et hors de prix pour vivre dans un endroit qui vous ressemble.
              </p>
              <p>
                Il faut un lieu qui a du potentiel, et quelqu’un pour vous dire ce qu’il coûte une fois habitable. C’est ce qu’on fait ici : on pousse la porte, on regarde ce que le lieu peut devenir, on fait l’addition et on vous la montre. Le prix, les travaux, la mensualité.
              </p>
              <p>Si vous lisez encore, vous êtes sans doute des nôtres. Bienvenue.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
            <h2 className="text-xs uppercase tracking-widest text-stone-500">État des lieux</h2>
            <Link href="/guide" className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-[#F6CF4E] decoration-2">Tous les articles</Link>
          </div>
          <p className="mt-5 max-w-2xl font-serif text-3xl leading-tight text-stone-900">
            Ce qu’il faut savoir <span className="italic text-stone-500">avant d’acheter un bien qui ne ressemble pas aux autres.</span>
          </p>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/guide/${a.slug}`} className="group block h-full overflow-hidden rounded-[14px] border border-stone-200 bg-white transition-colors hover:border-stone-900">
                  <span className="block overflow-hidden border-b border-stone-900 bg-[#F6CF4E]">
                    <GuideArt art={a.art} className="block aspect-[12/5] w-full" />
                  </span>
                  <span className="block p-6">
                    <span className="text-xs uppercase tracking-widest text-stone-500">{a.category}</span>
                    <span className="mt-2 block font-serif text-xl leading-snug text-stone-900">{a.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

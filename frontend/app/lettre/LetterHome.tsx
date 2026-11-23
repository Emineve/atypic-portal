import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import GuideArt from '../guide/GuideArt';
import LetterSignup from './LetterSignup';
import Mesure from './Mesure';
import { dateLettre } from './LetterView';
import { getIssue, getIssues } from '../../lib/lettre';
import { publishedArticles } from '../../lib/guide';

// L'accueil du mode lettre, de haut en bas : l'accroche et l'inscription, le dernier numéro, les précédents, puis État des lieux.
// `drafts` : l'aperçu montre aussi le numéro en préparation ; le site public ne montre que les numéros parus.

const euros = (n: number | null) => (n == null ? '' : n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €');

export default async function LetterHome({ drafts = false }: { drafts?: boolean }) {
  const all = await getIssues();
  const shown = drafts ? all : all.filter((i) => i.paru);
  const next = all.find((i) => !i.paru); // le prochain numéro, pour annoncer sa date
  const last = shown[0];
  const lastFull = last ? await getIssue(last.numero) : null;
  const biens = (lastFull?.items || []).filter((i) => i.rubrique !== 'avant_premiere').slice(0, 4);
  const articles = publishedArticles().slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-10 md:pt-16 pb-10 md:pb-14">
        <h1 className="max-w-4xl text-[2.6rem] md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          L’immobilier atypique parisien, <span className="italic text-stone-500">une lettre chaque jeudi.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-stone-600">
          Lofts, ateliers d’artistes, derniers étages : quelques biens par semaine, chacun résumé par ce qu’il a de plus singulier.
        </p>
        <LetterSignup source="accueil" className="mt-8 max-w-xl" />
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {last ? (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
              <h2 className="text-xs uppercase tracking-widest text-stone-500">{last.paru ? 'Le dernier numéro' : 'Le numéro en préparation'}</h2>
              <p className="text-sm text-stone-500">N° {last.numero}, {dateLettre(last.date_parution)}</p>
            </div>
            <Link href={`/lettre/numero-${last.numero}`} className="group mt-6 block">
              <span className="font-serif text-3xl md:text-5xl leading-[1.08] text-stone-900 bg-[linear-gradient(#F6CF4E,#F6CF4E)] bg-no-repeat bg-[position:0_100%] pb-[3px] bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-[background-size] duration-300">
                {last.titre}
              </span>
              {last.resume && <span className="mt-4 block max-w-2xl text-lg text-stone-600">{last.resume}</span>}
            </Link>
            {biens.length > 0 && (
              <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {biens.map((b) => (
                  <li key={b.id} className="border-t border-stone-200 pt-5">
                    {b.kind !== 'aucun' && <Mesure kind={b.kind} valeur={b.valeur} className="h-28 w-auto" />}
                    <p className="mt-4 font-serif text-2xl leading-tight text-stone-900">{b.mesure}</p>
                    {b.mesure_detail && <p className="font-serif text-lg italic leading-tight text-stone-500">{b.mesure_detail}</p>}
                    <p className="mt-2 text-sm text-stone-600">{b.lieu}</p>
                    <p className="mt-1 font-serif text-lg lining-nums text-stone-900">{euros(b.prix)}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-8">
              <Link href={`/lettre/numero-${last.numero}`} className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-[#F6CF4E] decoration-2">Lire le numéro</Link>
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

        {shown.length > 1 && (
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-stone-500">Les numéros précédents</h2>
            <ul className="mt-3 border-t border-stone-900">
              {shown.slice(1, 5).map((l) => (
                <li key={l.numero} className="border-b border-stone-200">
                  <Link href={`/lettre/numero-${l.numero}`} className="group grid gap-x-8 gap-y-1 py-5 md:grid-cols-[9rem_1fr]">
                    <span className="text-sm text-stone-500">N° {l.numero}, {dateLettre(l.date_parution, false)}</span>
                    <span className="font-serif text-xl text-stone-900 group-hover:underline underline-offset-4 decoration-[#F6CF4E] decoration-2">{l.titre}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

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

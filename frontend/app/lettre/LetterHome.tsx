import SiteHeader from '../SiteHeader';
import GuideArt from '../guide/GuideArt';
import { publishedArticles } from '../../lib/guide';
import { typo } from '../../lib/typo';
import Famille from './Famille';
import Mesure from './Mesure';
import { BIENS_EXEMPLE, EXEMPLES_ACTIFS } from '../../lib/lettreExemples';
import { Verriere } from './Beton';
import type { LetterItem } from './LetterView';
import { getIssue, getIssues } from '../../lib/lettre';

// L'accueil du mode lettre, de haut en bas : la promesse et l'abonnement à la newsletter, le premier numéro, le calendrier des douze thèmes,
// puis les biens parus dans la newsletter. Rien d'autre pour le moment.
// Tant qu'aucun numéro n'est paru, les numéros et les biens affichés sont ceux de lib/lettreExemples.ts.

// Les questions de l'accueil : ce qu'est le site, ce qu'est sa newsletter, ce qu'on fait de l'adresse e-mail
const QUESTIONS: [string, string][] = [
  ['Qu’est-ce que Loftissime ?', 'Loftissime est un média consacré à l’immobilier atypique. Il édite une fois par mois une newsletter, sur un thème différent à chaque numéro : les biens à rénover, les lofts, les ateliers d’artistes, les péniches…'],
  ['Que trouve-t-on dans un numéro ?', 'Chaque numéro a son thème : Béton ciré, le premier, est consacré aux biens atypiques à rénover. À chaque fois, nous poussons la porte d’un bien : la visite en vidéo, ce qu’on peut en faire, ce qu’il coûte vraiment, travaux et mensualité compris, et le point à vérifier avant de signer.'],
  ['Qui sont nos experts ?', 'Un architecte, un entrepreneur du bâtiment, un courtier en crédit, un notaire et un négociateur immobilier, différent à chaque numéro. Chacun intervient dans son domaine et s’engage sur ce qu’il avance.'],
  ['Quand paraît la newsletter ?', 'Une fois par mois, douze fois par an. Chaque mois a son thème : les biens à rénover, les lofts, les ateliers d’artistes, les derniers étages, les péniches… Le calendrier complet est sur cette page.'],
  ['Est-ce que Loftissime vend les biens ?', 'Non. Loftissime est un média. Chaque bien présenté est vendu en direct par son propriétaire ou par l’intermédiaire d’une agence.'],
  ['L’abonnement est-il payant ?', 'Non, la newsletter de Loftissime est gratuite.'],
  ['Que faites-vous de mon adresse e-mail ?', 'Elle sert à vous envoyer la newsletter, rien d’autre. Elle n’est ni vendue ni transmise, et chaque numéro contient un lien pour se désinscrire en un clic.'],
];

// Le titre de la newsletter s'écrit en italique dans le texte courant, comme tout titre de publication
const titreEnItalique = (t: string) => t.split('Béton ciré').flatMap((part, i) => (i === 0 ? [part] : [<em key={i}>Béton ciré</em>, part]));

const euros = (n: number | null) => (n == null ? '' : n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €');

// La vignette d'un bien paru dans la lettre : même gabarit que les vignettes d'annonces du site, avec le dessin à la
// place de la photo. On n'entre pas dans une fiche : le seul lien mène à l'annonce de l'agence ou du propriétaire.
function BienCard({ b }: { b: LetterItem }) {
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
        {b.agency_url && (
          <p className="mt-2 text-sm">
            <a href={b.agency_url} target="_blank" rel="noreferrer" className="text-stone-900 underline underline-offset-4 decoration-stone-400 hover:decoration-stone-900">
              Voir l’annonce
            </a>
          </p>
        )}
      </div>
    </article>
  );
}

// Quatre articles à la une sur l'accueil : ceux du guide « Dix questions » qui touchent à la rénovation
const UNE = ['loft-ancien-local-commercial', 'travaux-non-declares', 'verriere-ce-qu-il-faut-verifier', 'dpe-loft-atelier-dernier-etage'];

function ArticlesUne() {
  const tous = publishedArticles();
  const liste = UNE.map((s) => tous.find((a) => a.slug === s)).filter((a): a is NonNullable<typeof a> => !!a);
  if (liste.length === 0) return null;
  return (
    <section className="mt-16 md:mt-24" aria-labelledby="articles-une">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
        <h2 id="articles-une" className="font-serif text-3xl leading-[1.1] text-stone-900 md:text-4xl">
          Nos articles à la une
        </h2>
        <a href="/guide" className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Découvrir tous les articles</a>
      </div>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {liste.map((a) => (
          <li key={a.slug}>
            <a href={`/guide/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[14px] border-2 border-stone-900 bg-white shadow-[5px_5px_0_#211C15]">
              <span className="block overflow-hidden border-b-2 border-stone-900">
                <GuideArt art={a.art} className="block aspect-[12/7] w-full" />
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="font-serif text-xl leading-snug text-stone-900 underline-offset-4 group-hover:underline">{typo(a.title)}</span>
                <span className="mt-2 text-[15px] leading-relaxed text-stone-700">{typo(a.description)}</span>
                <span className="mt-auto flex items-baseline justify-between pt-4 text-sm">
                  <span className="text-stone-500">{a.readMinutes} min de lecture</span>
                  <span className="font-medium text-stone-900">Lire</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function LetterHome() {
  const parus = (await getIssues()).filter((i) => i.paru);
  // Tant qu'aucun numéro n'est paru, l'accueil montre des numéros d'exemple, sans lien
  const exemples = parus.length === 0 && EXEMPLES_ACTIFS;
  const full = exemples ? [] : await Promise.all(parus.slice(0, 2).map((i) => getIssue(i.numero)));
  const biens: { b: LetterItem; numero: number; une: boolean }[] = exemples
    ? BIENS_EXEMPLE
    : full.flatMap((d) => (d ? [...d.items].sort((x, y) => Number(y.id === (d.issue.content as { une_id?: string }).une_id) - Number(x.id === (d.issue.content as { une_id?: string }).une_id)).map((b, k) => ({ b, numero: d.issue.numero, une: k === 0 })) : []));

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />
      {/* le filtre qui donne aux croquis des vignettes leur trait à main levée */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="main-levee" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="bruit" />
          <feDisplacementMap in="SourceGraphic" in2="bruit" scale="3.4" />
        </filter>
      </svg>

      <main className="max-w-6xl mx-auto px-6 pt-10 md:pt-20 pb-24">
        <section className="mb-16 md:mb-24">
          <Famille
            articles={<ArticlesUne />}
            intro={
              <>
                <h1 className="font-serif text-[2.5rem] md:text-6xl lg:text-[3.9rem] tracking-tight leading-[1.03] text-stone-900">
                  Acheter sereinement <span className="italic text-stone-500">un bien qui ne ressemble à aucun autre.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-700 md:mt-8 md:text-xl md:leading-relaxed">
                  Chaque mois, un thème et un bien atypique pour l’illustrer : la visite en vidéo, le projet, le prix tout compris. Nos experts vous accompagnent pour passer du rêve au projet, quel que soit votre budget.
                </p>
              </>
            }
              extrait={
                <span className="block">
                  <span className="block overflow-hidden rounded-[10px]">
                    <Verriere label="La visite filmée du premier numéro" />
                  </span>
                  <span className="mt-2 block text-sm text-stone-500">Dans chaque numéro, la visite en vidéo</span>
                </span>
              }
          />
        </section>

        {biens.length > 0 && (
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-stone-900 pt-4">
              <h2 className="font-serif text-3xl leading-tight text-stone-900 md:text-4xl">Nos biens à la une</h2>
              <p className="text-sm text-stone-500">Parus dans la newsletter</p>
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {biens.map(({ b }) => (
                <li key={b.id}>
                  <BienCard b={b} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-16 md:mt-24 border-t border-stone-900 pt-4">
          <h2 className="text-xs uppercase tracking-widest text-stone-500">Vos questions</h2>
          <div className="mt-2 max-w-3xl">
            {QUESTIONS.map(([q, r]) => (
              <details key={q} className="group border-b border-stone-200">
                <summary className="flex cursor-pointer outline-none focus-visible:underline decoration-stone-900 underline-offset-4 list-none items-baseline justify-between gap-6 py-5 font-serif text-xl md:text-2xl leading-snug text-stone-900 [&::-webkit-details-marker]:hidden">
                  <span>{titreEnItalique(q)}</span>
                  <span aria-hidden className="font-sans text-xl text-stone-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 text-lg leading-relaxed text-stone-700">{titreEnItalique(r)}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

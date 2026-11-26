import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import Recevoir from './Recevoir';
import { Verriere } from './Beton';
import { dateLettre } from './LetterView';
import type { IssueRow } from '../../lib/lettre';
import { MOIS, NEWSLETTERS, themeDe, type Newsletter } from '../../lib/newsletters';



// La page du prochain numéro : son thème, à qui il s'adresse, ce qu'on y trouve, et l'inscription.
// En dessous, les numéros déjà parus, quand il y en a. Même fond et même air que l'accueil.

const TEMPS: [string, string][] = [
  ['Le bien à la une', 'Un bien atypique visité pour vous, en vidéo.'],
  ['Aujourd’hui, demain', 'Le lieu tel qu’il est, et le projet dessiné par un architecte.'],
  ['L’addition', 'Le prix, les frais, les travaux, puis ce que cela coûte chaque mois.'],
  ['Avant la promesse', 'Le point à vérifier pour ce bien-là, avant de s’engager.'],
];

// Ce qui est propre à chaque thème : à qui il parle, et pourquoi il porte ce nom. Complété thème après thème.
const PROPOS: Record<string, { pour: string; pourquoi: string[] }> = {
  'beton-cire': {
    pour: 'Pour ceux qui voient un loft là où d’autres voient un chantier, et qui veulent savoir ce que cela coûtera avant de se lancer.',
    pourquoi: [
      'Un atelier fatigué, une ancienne boutique, un plateau resté brut : ce sont souvent les plus beaux lieux, et ceux qui font le plus hésiter. On ne sait pas ce qu’ils peuvent devenir, ni ce qu’ils coûteront une fois les travaux finis.',
      'Ce numéro est fait pour ça. Nous y visitons un bien à rénover avec ceux dont c’est le métier : un architecte dessine ce qu’il en ferait, un entrepreneur chiffre les travaux, un courtier calcule la mensualité.',
      'Et le nom ? Le béton ciré, c’est le sol que l’on coule quand tout est à refaire : brut au départ, superbe à l’arrivée.',
    ],
  },
};

// La page d'un thème : habillée de sa matière, elle dit à qui il s'adresse, ce qu'on y trouve, et propose l'inscription.
export default function ThemeVue({ theme, parus = [], source }: { theme: Newsletter; parus?: IssueRow[]; source: string }) {
  const mois = MOIS[theme.mois - 1];
  const propos = PROPOS[theme.slug];

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FDFBF7] font-sans text-stone-900">
      <SiteHeader />
      {/* le haut de page est posé sur la matière du thème : une seule grande carte, le titre à gauche, l'inscription à droite */}
      <div style={theme.matiere}>
        <section className="mx-auto max-w-6xl px-6 py-10 md:py-16">
          <div className="grid overflow-hidden rounded-[18px] border-2 border-stone-900 bg-[#FDFBF7] shadow-[6px_6px_0_#211C15] lg:grid-cols-[1.15fr_1fr]">
          <div className="p-7 md:p-12">
            <p className="text-sm text-stone-500">Le numéro de {mois}</p>
            <h1 className="mt-3 font-serif text-6xl italic leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">{theme.nom}</h1>
            <p className="mt-6 font-serif text-3xl leading-tight md:text-4xl">{theme.sujet}</p>
            {propos && <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">{propos.pour}</p>}
          </div>
          <div className="flex flex-col justify-center border-t-2 border-stone-900 bg-white p-7 md:p-12 lg:border-l-2 lg:border-t-0">
            <Recevoir cadre={false} source={source} titre={<>Recevez <em>{theme.nom}</em> en {mois}, gratuitement.</>} texte="En cadeau de bienvenue, notre guide : dix questions à poser avant d’acheter un bien atypique." />
          </div>
          </div>
        </section>
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="mt-16 md:mt-24" aria-labelledby="dans-ce-numero">
          <div className="grid gap-x-12 gap-y-3 border-t border-stone-900 pt-4 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 id="dans-ce-numero" className="font-serif text-3xl leading-[1.1] md:text-4xl">
                Dans ce numéro, <span className="italic text-stone-500">quatre temps.</span>
              </h2>
              <figure className="mt-6 max-w-sm md:mt-8">
                <div className="overflow-hidden rounded-[14px]">
                  <Verriere label={`La visite filmée du numéro ${theme.nom}`} />
                </div>
                <figcaption className="mt-3 text-sm text-stone-500">Dans chaque numéro, la visite en vidéo.</figcaption>
              </figure>
            </div>
            <ol>
              {TEMPS.map(([titre, texte], i) => (
                <li key={titre} className="flex gap-5 border-b border-stone-200 py-5 first:pt-1">
                  <span className="w-7 shrink-0 font-serif text-2xl italic text-stone-500">{i + 1}.</span>
                  <span>
                    <span className="block font-serif text-2xl leading-tight">{titre}</span>
                    <span className="mt-1 block text-lg leading-relaxed text-stone-700">{texte}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {propos && (
          <section className="mt-20 md:mt-28" aria-labelledby="pourquoi">
            <div className="grid gap-x-12 gap-y-5 border-t border-stone-900 pt-4 md:grid-cols-[1fr_1.4fr]">
              <h2 id="pourquoi" className="font-serif text-3xl leading-[1.1] md:text-4xl">
                Pourquoi <span className="italic text-stone-500">{theme.nom} ?</span>
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">
                {propos.pourquoi.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {parus.length > 0 && (
          <section className="mt-20 md:mt-28" aria-labelledby="parus">
            <h2 id="parus" className="border-t border-stone-900 pt-4 font-serif text-3xl leading-[1.1] md:text-4xl">
              Les numéros parus
            </h2>
            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {parus.map((l) => (
                <li key={l.numero}>
                  <Link href={`/lettre/numero-${l.numero}`} className="group block">
                    <span className="block overflow-hidden rounded-[14px]">
                      <Verriere label={`La visite du numéro ${l.numero}`} />
                    </span>
                    <span className="mt-4 block text-sm text-stone-500">
                      {themeDe(NEWSLETTERS[(l.numero - 1) % NEWSLETTERS.length].slug).nom}, n° {l.numero}, {dateLettre(l.date_parution, false)}
                    </span>
                    <span className="mt-1 block font-serif text-2xl leading-tight underline-offset-4 group-hover:underline">{l.titre}</span>
                    {l.resume && <span className="mt-2 block text-[15px] leading-relaxed text-stone-700">{l.resume}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-16 md:mt-20">
          <a href="/#nl-annee" className="text-lg font-medium underline underline-offset-4 decoration-stone-400">Voir les douze thèmes de l’année</a>
        </p>
      </main>
    </div>
  );
}

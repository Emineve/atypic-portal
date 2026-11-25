import SiteHeader from '../SiteHeader';
import Fusain, { type FusainKind } from './Fusain';

// L'équipe : ceux qui font chaque numéro, chacun dans son métier. Les présentations viendront une à une ;
// en attendant, la page dit qui fait quoi. Personne n'y est nommé sans son accord.

export const metadata = {
  title: 'L’équipe · Loftissime',
  description: 'Ceux qui font chaque numéro de la newsletter de Loftissime : la visite, le projet, les travaux, le financement, le point de vigilance et la négociation.',
  alternates: { canonical: '/equipe' },
};

const EQUIPE: [string, string, string, FusainKind][] = [
  ['Kate', 'La visite', 'C’est elle qui pousse la porte et filme le bien, pièce après pièce.', 'visite'],
  ['L’architecte', 'Le projet', 'Il dessine ce que le lieu peut devenir.', 'architecte'],
  ['L’entrepreneur du bâtiment', 'Les travaux', 'Il chiffre le chantier, poste par poste.', 'entrepreneur'],
  ['Damien', 'Le financement', 'Courtier en crédit, il calcule la mensualité et dit ce qu’une banque peut suivre.', 'courtier'],
  ['Le notaire', 'Avant la promesse', 'Il signale le point à vérifier avant de s’engager.', 'notaire'],
  ['Christophe', 'La négociation', 'Négociateur immobilier, il présente le bien à la une du numéro de janvier. Chaque mois, un négociateur différent prend la suite : douze numéros, douze agences.', 'negociateur'],
];

export default function Equipe() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-900">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-20">
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-[1fr_1.4fr]">
          <h1 className="font-serif text-[2.5rem] leading-[1.03] tracking-tight md:text-6xl">
            L’équipe, <span className="italic text-stone-500">ceux qui font chaque numéro.</span>
          </h1>
          <p className="self-end text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">
            Autour de chaque bien, Loftissime réunit ceux dont c’est le métier. Nous vous les présenterons ici un par un, avant le premier numéro.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-10 border-t border-stone-900 pt-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {EQUIPE.map(([qui, role, texte, kind]) => (
            <li key={qui}>
              <div className="overflow-hidden rounded-[14px] border-2 border-stone-900 shadow-[5px_5px_0_#211C15]">
                <Fusain kind={kind} className="block w-full" />
              </div>
              <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight">{qui}</h2>
              <p className="mt-1 font-serif text-xl italic text-stone-500">{role}</p>
              <p className="mt-2 text-lg leading-relaxed text-stone-700">{texte}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-stone-500">Portraits provisoires, dessinés en attendant les vrais.</p>

        <p className="mt-10">
          <a href="/#recevoir" className="text-lg font-medium underline underline-offset-4 decoration-stone-400">Recevoir la newsletter</a>
        </p>
      </main>
    </div>
  );
}

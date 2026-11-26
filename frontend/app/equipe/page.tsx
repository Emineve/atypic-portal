import SiteHeader from '../SiteHeader';
import Fusain, { type FusainKind } from './Fusain';

// L'équipe : ceux qui font chaque numéro, chacun dans son métier. Les présentations viendront une à une ;
// en attendant, la page dit qui fait quoi. Personne n'y est nommé sans son accord.

export const metadata = {
  title: 'L’équipe · Loftissime',
  description: 'Ceux qui font chaque numéro de la newsletter de Loftissime : la visite, le projet, les travaux, le financement, le point de vigilance et la négociation.',
  alternates: { canonical: '/equipe' },
};

type Membre = [string, string, string, FusainKind];

// Trois cercles : ceux qui y travaillent au quotidien, les experts de chaque numéro, les contributeurs invités
const GROUPES: { titre: string; italique: string; membres: Membre[] }[] = [
  {
    titre: 'Au quotidien,',
    italique: 'ceux qui font tourner Loftissime.',
    membres: [
      ['Prosper', 'La coordination', 'Il coordonne tout le monde et déborde d’idées.', 'chef'],
      ['Kate', 'La visite', 'C’est elle qui pousse la porte et filme le bien, pièce après pièce.', 'visite'],
      ['Julien', 'Le montage', 'Vous vous demandez comment une vidéo d’immobilier peut être aussi chouette ? C’est lui.', 'monteur'],
      ['Nico', 'La technique', 'Le geek de la bande. Si la newsletter arrive bien dans votre boîte mail, c’est grâce à lui.', 'geek'],
      ['Cédric', 'Les réseaux', 'Il parle à tous ceux qui ne vont plus que sur Instagram ou sur X. Heureusement qu’il est là !', 'reseaux'],
    ],
  },
  {
    titre: 'Les experts,',
    italique: 'un métier par question.',
    membres: [
      ['L’architecte', 'Le projet', 'Il dessine ce que le lieu peut devenir.', 'architecte'],
      ['L’entrepreneur du bâtiment', 'Les travaux', 'Il chiffre le chantier, poste par poste.', 'entrepreneur'],
      ['Damien', 'Le financement', 'Courtier en crédit, il calcule la mensualité et dit ce qu’une banque peut suivre.', 'courtier'],
      ['Kim', 'Avant la promesse', 'Notaire, elle signale le point à vérifier avant de s’engager.', 'notaire'],
    ],
  },
  {
    titre: 'Les contributeurs,',
    italique: 'un invité par numéro.',
    membres: [['Christophe', 'La négociation', 'Négociateur immobilier, il présente le bien à la une du numéro de janvier. Chaque mois, un négociateur différent prend la suite : douze numéros, douze agences.', 'negociateur']],
  },
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

        {GROUPES.map((g) => (
          <section key={g.titre} className="mt-12 border-t border-stone-900 pt-4 md:mt-16">
            <h2 className="font-serif text-3xl leading-[1.1] md:text-4xl">
              {g.titre} <span className="italic text-stone-500">{g.italique}</span>
            </h2>
            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {g.membres.map(([qui, role, texte, kind]) => (
                <li key={qui}>
                  <div className="overflow-hidden rounded-[14px] border-2 border-stone-900 shadow-[5px_5px_0_#211C15]">
                    <Fusain kind={kind} className="block w-full" />
                  </div>
                  <h3 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight">{qui}</h3>
                  <p className="mt-1 font-serif text-xl italic text-stone-500">{role}</p>
                  <p className="mt-2 text-lg leading-relaxed text-stone-700">{texte}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="mt-8 text-sm text-stone-500">Portraits provisoires, dessinés en attendant les vrais.</p>

      </main>
    </div>
  );
}

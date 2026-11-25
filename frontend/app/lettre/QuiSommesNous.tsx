import SiteHeader from '../SiteHeader';
import { NEWSLETTERS } from '../../lib/newsletters';

// « Qui sommes-nous », version du site tant qu'il vit par ses newsletters : ce qu'est Loftissime, comment il travaille,
// ce qu'il ne fait pas. Aucun nom propre : l'équipe se présentera quand elle l'aura décidé.

const LIGNES: [string, string][] = [
  [
    'Nous aimons les lieux qui ne ressemblent à aucun autre.',
    'Un atelier sous verrière, une ancienne imprimerie, une péniche, un dernier étage ouvert sur les toits : ce sont eux que nous cherchons. Le reste, vous le trouverez partout.',
  ],
  [
    'Nous sommes des gens de métier.',
    'Loftissime est né à Paris, à la rencontre de l’immobilier, de l’architecture, du bâtiment, du financement et de l’image. Dans chaque numéro, un architecte, un entrepreneur et un courtier interviennent dans leur domaine et s’engagent sur les chiffres qu’ils avancent.',
  ],
  [
    'Nous disons ce que les choses coûtent.',
    'Le prix affiché n’est qu’un début. Nous y ajoutons les frais, les travaux, et ce que le bien coûte chaque mois. Vivre autrement, ça se calcule.',
  ],
  [
    'Nous ne vendons rien.',
    'Loftissime n’est pas une agence. Chaque bien est vendu en direct par son propriétaire ou par l’intermédiaire d’une agence, et c’est vers eux que mène l’annonce.',
  ],
  [
    'Votre adresse reste chez nous.',
    'Elle sert à vous envoyer les newsletters que vous avez choisies, rien d’autre. Elle n’est ni vendue ni transmise, et vous vous désinscrivez en un clic.',
  ],
  [
    'Nous commençons par le commencement.',
    'Une première newsletter, Béton ciré, consacrée aux biens atypiques à rénover. Les suivantes s’ouvriront une par une, dans l’ordre de vos choix.',
  ],
];

const italique = (t: string) => t.split('Béton ciré').flatMap((part, i) => (i === 0 ? [part] : [<em key={i}>Béton ciré</em>, part]));

export default function QuiSommesNous() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#191919]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-8 md:pt-14">
        <div className="grid items-end gap-x-12 gap-y-4 md:grid-cols-[1.1fr_1fr]">
          <h1 className="font-serif text-[2.5rem] leading-[1.04] tracking-tight text-stone-900 md:text-5xl lg:text-[3.2rem]">
            Qui sommes-nous, <span className="italic text-stone-500">et ce que nous faisons.</span>
          </h1>
          <p className="text-lg leading-relaxed text-stone-700">
            Loftissime est un curateur de biens atypiques. Nous cherchons, nous visitons, nous faisons les comptes, et nous vous racontons ce que nous avons trouvé dans nos newsletters.
          </p>
        </div>

        {/* les matières des newsletters, en frise : c'est le nuancier de la maison */}
        <div aria-hidden className="mt-8 flex h-16 overflow-hidden rounded-[14px] md:h-20">
          {NEWSLETTERS.map((n) => (
            <span key={n.slug} className="block flex-1" style={n.matiere} />
          ))}
        </div>

        <ul className="mt-10 border-t border-stone-900 md:mt-14">
          {LIGNES.map(([titre, texte]) => (
            <li key={titre} className="grid gap-x-12 gap-y-3 border-b border-stone-200 py-7 md:grid-cols-[1fr_1.1fr] md:py-9">
              <h2 className="font-serif text-2xl leading-[1.15] tracking-tight text-stone-900 [text-wrap:balance] md:text-3xl">{titre}</h2>
              <p className="text-lg leading-relaxed text-stone-700">{italique(texte)}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10">
          <a href="/#recevoir" className="inline-flex h-12 items-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white">
            Choisir mes newsletters
          </a>
        </p>
      </main>
    </div>
  );
}

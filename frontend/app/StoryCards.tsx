import Link from 'next/link';
import GuideArt, { GuideArtKey } from './guide/GuideArt';

// Carte qui se glisse dans la liste des annonces sans en être : une histoire de la rubrique Insolite.
// Elle ne met aucune annonce en avant. Même gabarit que les cartes d'État des lieux.
export function StoryCard({ slug, title, art }: { slug: string; title: string; art: GuideArtKey }) {
  return (
    <article className="group flex flex-col rounded-[14px] overflow-hidden bg-white border border-stone-200 hover:border-stone-900 transition-colors">
      <Link href={`/guide/${slug}`} className="flex flex-1 flex-col" aria-label={`Insolite : ${title}`}>
        <div className="overflow-hidden border-b border-stone-900">
          <GuideArt art={art} className="block w-full aspect-[3/2] sm:aspect-[4/3] group-hover:scale-[1.03] transition-transform duration-700" />
        </div>
        <div className="p-6 flex flex-1 flex-col">
          <p className="text-xs uppercase tracking-widest text-stone-500">État des lieux · Insolite</p>
          <h2 className="mt-2 font-serif text-2xl leading-snug text-stone-900">{title}</h2>
          <p className="mt-auto pt-6">
            <span className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 group-hover:decoration-stone-900 transition">Lire l’histoire →</span>
          </p>
        </div>
      </Link>
    </article>
  );
}

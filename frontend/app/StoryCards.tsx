import Link from 'next/link';
import GuideArt, { GuideArtKey } from './guide/GuideArt';
import EyeO from './EyeO';

// Cartes qui se glissent dans la liste des annonces sans en être : une histoire de la rubrique Insolite,
// et la phrase du site. Elles ne mettent aucune annonce en avant.
export function StoryCard({ slug, title, art }: { slug: string; title: string; art: GuideArtKey }) {
  return (
    <article className="group flex flex-col rounded-[14px] bg-[#F6CF4E] overflow-hidden">
      <Link href={`/guide/${slug}`} className="flex flex-1 flex-col" aria-label={`Insolite : ${title}`}>
        <GuideArt art={art} className="w-full aspect-[3/2] sm:aspect-[4/3]" />
        <div className="p-6 flex flex-1 flex-col">
          <p className="text-xs uppercase tracking-widest text-stone-900">Insolite</p>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-stone-900">{title}</h2>
          <p className="mt-auto pt-6">
            <span className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-900/40 group-hover:decoration-stone-900 transition">Lire l’histoire →</span>
          </p>
        </div>
      </Link>
    </article>
  );
}

export function EyeCard() {
  return (
    <article className="flex min-h-[280px] flex-col justify-between rounded-[14px] bg-[#211C15] p-8 text-white">
      <EyeO size={64} ink="#F6CF4E" iris="#211C15" />
      <p className="font-serif text-2xl md:text-3xl leading-tight">Pour ceux qui ne veulent pas habiter comme tout le monde.</p>
    </article>
  );
}

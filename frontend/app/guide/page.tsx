import SiteHeader from '../SiteHeader';
import Articles from './Articles';
import SpecialistVideoCard from './SpecialistVideoCard';
import { publishedVideos } from '../../lib/specialists';
import { publishedArticles, formatGuideDate, GUIDE_RUBRICS } from '../../lib/guide';

// La liste se recalcule toutes les heures : un article daté du jour apparaît sans nouvelle mise en ligne
export const revalidate = 3600;

export const metadata = {
  title: 'Articles : tout savoir avant d’acheter un bien atypique · Loftissime',
  description:
    'Souplex, loft, péniche, atelier d’artiste : les vérifications à faire avant d’acheter un bien atypique, et les conseils pour bien y vivre.',
  alternates: { canonical: '/guide' },
};

// Tous les articles sur une page : les rubriques en pastilles, une recherche, puis la liste, du plus récent au plus ancien.
export default function GuideIndex() {
  const articles = publishedArticles();
  const videos = publishedVideos();
  const rubriques = GUIDE_RUBRICS.filter((r) => articles.some((a) => a.category === r.name)).map((r) => ({ name: r.name as string, anchor: r.anchor as string }));
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-900">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-10 md:pt-16">
        <h1 className="font-serif text-6xl leading-none tracking-tight md:text-7xl">Articles</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">
          Tout ce qu’il faut savoir avant d’acheter un bien atypique, expliqué simplement.
        </p>

        <div className="mt-10">
          <Articles
            rubriques={rubriques}
            articles={articles.map((a) => ({ slug: a.slug, art: a.art, title: a.title, description: a.description, category: a.category, date: formatGuideDate(a.published), minutes: a.readMinutes }))}
          />
        </div>

        {videos.length > 0 && (
          <section id="specialistes" className="mt-16 scroll-mt-24 md:mt-24">
            <h2 className="border-t border-stone-900 pt-4 font-serif text-3xl md:text-4xl">Contre-visite</h2>
            <p className="mt-3 max-w-2xl text-lg text-stone-700">Une question, un spécialiste, une minute.</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {videos.map((v) => (
                <SpecialistVideoCard key={v.id} v={v} />
              ))}
            </div>
          </section>
        )}

        <p className="mt-14 max-w-3xl text-sm leading-relaxed text-stone-500">
          Ces articles donnent une information générale. Ils ne remplacent ni le conseil d&apos;un notaire, ni l&apos;avis d&apos;un professionnel du bâtiment sur un bien donné.
        </p>
      </main>
    </div>
  );
}

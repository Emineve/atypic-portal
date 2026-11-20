import AlertBand, { ALERT_BUTTON } from '../AlertBand';
import Crumbs from '../Crumbs';
import GuideSearch from './GuideSearch';
import { typo } from '../../lib/typo';
import SiteHeader from '../SiteHeader';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import GuideArt from './GuideArt';
import { getSupabase } from '../../lib/supabase';
import SpecialistVideoCard from './SpecialistVideoCard';
import { publishedVideos } from '../../lib/specialists';
import { publishedArticles, formatGuideDate, GUIDE_RUBRICS } from '../../lib/guide';

// La liste se recalcule toutes les heures : un article daté du jour apparaît sans nouvelle mise en ligne
export const revalidate = 3600;

export const metadata = {
  title: 'État des lieux : tout savoir avant d’acheter un bien atypique · Loftissime',
  description:
    'Souplex, loft, péniche, atelier d’artiste : les vérifications à faire avant d’acheter un bien atypique, et les conseils pour bien y vivre. Un nouvel article chaque semaine.',
  alternates: { canonical: '/guide' },
};

// L'article mis en avant est le plus lu du jour, à défaut de la semaine ; sans assez de lectures, le plus récent.
async function topArticle(): Promise<{ slug: string; period: 'today' | 'week' } | null> {
  try {
    const { data } = await getSupabase().rpc('top_guide_article');
    const t = data as { slug?: string; period?: string } | null;
    return t && t.slug && (t.period === 'today' || t.period === 'week') ? { slug: t.slug, period: t.period } : null;
  } catch {
    return null;
  }
}

export default async function GuideIndex() {
  const articles = publishedArticles();
  const top = await topArticle();
  const topped = top ? articles.find((a) => a.slug === top.slug) : undefined;
  const first = topped || articles[0];
  const rest = articles.filter((a) => a !== first);
  const firstLabel = topped ? (top!.period === 'today' ? 'Le plus lu aujourd’hui' : 'Le plus lu cette semaine') : 'À la une';
  const videos = publishedVideos();
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <Crumbs items={[{ label: 'État des lieux' }]} />
        <h1 className="max-w-4xl mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Acheter un bien atypique, <span className="italic text-stone-500">en connaissance de cause</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-stone-600 text-lg font-light leading-relaxed">
          Un souplex, un loft, une péniche ne s&apos;achètent pas comme un appartement classique. Posez-nous votre question : la réponse est dans nos articles, avec les vérifications à faire avant de signer. Et si elle n&apos;y est pas encore, nous vous répondons.
        </p>
        <GuideSearch />
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {rest.length > 0 && (
          <nav className="mb-10 md:mb-14" aria-label="Rubriques">
            <p className="text-xs uppercase tracking-widest text-stone-500">Les rubriques</p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
              {GUIDE_RUBRICS.filter((r) => articles.some((a) => a.category === r.name)).map((r) => (
                <li key={r.anchor}>
                  <a href={rest.some((a) => a.category === r.name) ? `#${r.anchor}` : '#a-la-une'} className="group inline-flex items-baseline gap-2 text-base font-medium md:text-xl text-stone-900">
                    <span className="underline underline-offset-[6px] decoration-stone-300 group-hover:decoration-stone-900 transition">{r.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {first && (
          <Link id="a-la-une" href={`/guide/${first.slug}`} className="scroll-mt-24 group grid md:grid-cols-2 rounded-[14px] overflow-hidden bg-white border border-stone-900 shadow-[6px_6px_0_0_#1c1917] hover:shadow-[10px_10px_0_0_#1c1917] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <div className="overflow-hidden border-b md:border-b-0 md:border-r border-stone-900 bg-[#F4E7B5] flex items-center">
              <GuideArt art={first.art} fit="meet" className="block w-full aspect-[12/5] group-hover:scale-[1.03] transition-transform duration-700" />
            </div>
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest text-stone-500">
                {firstLabel} · {first.category} · {first.readMinutes} min de lecture
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">{typo(first.title)}</h2>
              <p className="mt-4 text-stone-600 leading-relaxed">{typo(first.description)}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900">
                Lire l&apos;article
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        )}

        {videos.length > 0 && (
          <section id="specialistes" className="mt-14 md:mt-20 scroll-mt-24">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">Contre-visite</h2>
            <p className="mt-3 max-w-2xl text-stone-600 font-light leading-relaxed">Une question, un spécialiste, une minute.</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {videos.map((v) => (
                <SpecialistVideoCard key={v.id} v={v} />
              ))}
            </div>
          </section>
        )}

        {GUIDE_RUBRICS.map((r) => {
          const items = rest.filter((a) => a.category === r.name);
          if (items.length === 0) return null;
          return (
            <section key={r.anchor} id={r.anchor} className="mt-12 md:mt-16 scroll-mt-24">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-stone-900">{r.name}</h2>
                <p className="mt-2 text-stone-600">{r.intro}</p>
              </div>
              {/* Sur téléphone : une liste serrée (vignette, titre, durée) pour parcourir une rubrique d'un coup d'œil.
                  À partir de la tablette : les cartes illustrées. */}
              {/* Sur téléphone : une liste serrée (vignette, titre, durée) pour parcourir une rubrique d'un coup d'œil */}
              <ul className="mt-6 divide-y divide-stone-200 border-y border-stone-200 sm:hidden">
                {items.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/guide/${a.slug}`} className="flex items-center gap-4 py-4">
                      <div className="w-24 flex-none overflow-hidden rounded-[8px] border border-stone-900">
                        <GuideArt art={a.art} className="block w-full aspect-[12/7]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg leading-snug text-stone-900">{typo(a.title)}</h3>
                        <p className="mt-1 text-xs uppercase tracking-widest text-stone-500">{a.readMinutes} min de lecture</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* À partir de la tablette : les cartes illustrées */}
              <ul className="mt-8 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {items.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/guide/${a.slug}`} className="group flex h-full flex-col rounded-[14px] overflow-hidden bg-white border border-stone-900 hover:shadow-[6px_6px_0_0_#1c1917] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                      <div className="overflow-hidden border-b border-stone-900">
                        <GuideArt art={a.art} className="block w-full aspect-[12/5] group-hover:scale-[1.04] transition-transform duration-700" />
                      </div>
                      <div className="p-6 md:p-7">
                        <p className="text-xs uppercase tracking-widest text-stone-500">{a.readMinutes} min de lecture</p>
                        <h3 className="mt-2 font-serif text-2xl leading-snug text-stone-900 group-hover:underline underline-offset-4 decoration-stone-300">
                          {typo(a.title)}
                        </h3>
                        <p className="mt-2 text-stone-600 leading-relaxed">{typo(a.description)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {articles.length === 0 && <p className="py-10 text-stone-500">Les premiers articles arrivent très bientôt.</p>}

        {/* La mention sur les articles vient juste après eux, avant l'invitation à l'alerte : l'une ne doit pas se lire comme la suite de l'autre */}
        <p className="mt-10 text-sm text-stone-500 leading-relaxed max-w-3xl">
          Ces articles donnent une information générale. Ils ne remplacent ni le conseil d&apos;un notaire, ni l&apos;avis d&apos;un professionnel du bâtiment sur un bien donné.
        </p>

        <AlertBand title="Les biens rares partent vite. Soyez le premier informé." className="mt-14 md:mt-20">
          <Link href="/?alerte=1" className={ALERT_BUTTON}>
            Créer mon alerte
          </Link>
        </AlertBand>
      </main>
    </div>
  );
}

import SmartAlert from '../../SmartAlert';
import { STAY_PAID, stayUrl } from '../../../lib/stay';
import SiteHeader from '../../SiteHeader';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Search } from 'lucide-react';
import GuideArt from '../GuideArt';
import ChecklistShare from '../ChecklistShare';
import Checklist from '../Checklist';
import ArticleShare from '../ArticleShare';
import { SITE_URL } from '../../../lib/site';
import { publishedArticles, formatGuideDate } from '../../../lib/guide';
import { passageAnchor } from '../../../lib/guide-search';
import OpenHash from '../OpenHash';
import Tracker from '../../Tracker';
import SpecialistVideoCard from '../SpecialistVideoCard';
import { videosForArticle } from '../../../lib/specialists';
import { typo } from '../../../lib/typo';

export const revalidate = 3600;

function find(slug: string) {
  return publishedArticles().find((a) => a.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = find(params.slug);
  if (!a) return {};
  return {
    title: `${a.title} · Loftissime`,
    description: a.description,
    alternates: { canonical: `/guide/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      type: 'article',
      url: `/guide/${a.slug}`,
      publishedTime: a.published,
      modifiedTime: a.updated,
      images: [{ url: `/guide/${a.slug}.png`, width: 1200, height: 630, alt: a.title }],
    },
    twitter: { card: 'summary_large_image', title: a.title, description: a.description, images: [`/guide/${a.slug}.png`] },
  };
}

function safeJson(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function GuideArticlePage({ params }: { params: { slug: string } }) {
  const a = find(params.slug);
  if (!a) notFound();
  const others = publishedArticles().filter((x) => x.slug !== a.slug).slice(0, 3);
  const url = `${SITE_URL}/guide/${a.slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.updated,
    inLanguage: 'fr-FR',
    mainEntityOfPage: url,
    image: `${SITE_URL}/guide/${a.slug}.png`,
    author: { '@type': 'Organization', name: 'Loftissime', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Loftissime', url: SITE_URL },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const crumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'État des lieux', item: `${SITE_URL}/guide` },
      { '@type': 'ListItem', position: 3, name: a.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(crumbLd) }} />
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12">
        <nav aria-label="Fil d'Ariane" className="text-xs text-stone-500">
          <Link href="/" className="hover:text-stone-900">Accueil</Link>
          {' › '}
          <Link href="/guide" className="hover:text-stone-900">État des lieux</Link>
        </nav>
        <p className="mt-8 text-xs uppercase tracking-widest text-stone-500">{a.category}</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-stone-900">{typo(a.title)}</h1>
        <p className="mt-5 text-sm text-stone-500">
          Mis à jour le <time dateTime={a.updated}>{formatGuideDate(a.updated)}</time> · {a.readMinutes} min de lecture
        </p>
        <div className="mt-5">
          <ArticleShare url={url} title={a.title} label={false} />
        </div>
        <div className="mt-8 md:mt-10 md:max-w-3xl overflow-hidden rounded-[14px] border border-stone-200">
          <GuideArt art={a.art} className="block w-full aspect-[16/9] md:aspect-[12/5]" />
        </div>
      </header>

      <article className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-20 [&>*]:max-w-3xl">
        <p className="font-serif text-xl md:text-2xl text-stone-800 leading-relaxed">{typo(a.intro)}</p>

        <section className="mt-8 rounded-[14px] bg-[#F6CF4E] p-6" aria-label="À retenir">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-900">À retenir</h2>
          <ul className="mt-4 space-y-3">
            {a.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-3 text-stone-900 leading-relaxed">
                <Check className="mt-1 w-4 h-4 flex-none" />
                {typo(t)}
              </li>
            ))}
          </ul>
        </section>

        {a.sections.map((s) => (
          <section key={s.title} id={passageAnchor(s.title)} className="mt-10 scroll-mt-24">
            <h2 className="font-serif text-2xl leading-snug text-stone-900">{typo(s.title)}</h2>
            {(s.paragraphs || []).map((p) => (
              <p key={p} className="mt-4 text-stone-700 leading-relaxed">{typo(p)}</p>
            ))}
            {s.list && (
              <ul className="mt-4 space-y-2.5 list-disc pl-5 text-stone-700 leading-relaxed marker:text-stone-500">
                {s.list.map((li) => (
                  <li key={li}>{typo(li)}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {videosForArticle(a.slug).length > 0 && (
          <section className="mt-10">
            <h2 className="font-serif text-2xl leading-snug text-stone-900">Contre-visite</h2>
            <div className="mt-4 space-y-4">
              {videosForArticle(a.slug).map((v) => (
                <SpecialistVideoCard key={v.id} v={v} />
              ))}
            </div>
          </section>
        )}

        {a.checklist && (
          <section className="mt-10 rounded-[14px] border border-stone-900 bg-white p-6">
            <h2 className="font-serif text-2xl leading-snug text-stone-900">{typo(a.checklist.title)}</h2>
            <Checklist slug={a.slug} items={a.checklist.items} />
            <ChecklistShare title={a.checklist.title} items={a.checklist.items} url={url} />
          </section>
        )}

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-stone-900">Questions fréquentes</h2>
          <div className="mt-4 border-y border-stone-200 divide-y divide-stone-200">
            {a.faq.map((f) => (
              <details key={f.q} id={passageAnchor(f.q)} className="group py-5 scroll-mt-24">
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 text-lg font-medium text-stone-900">
                  {typo(f.q)}
                  <span className="text-stone-500 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-stone-700 leading-relaxed">{typo(f.a)}</p>
              </details>
            ))}
          </div>
        </section>

        <OpenHash />
      <Tracker />

        <form action="/guide" method="get" className="mt-12" role="search">
          <label className="block font-serif text-2xl text-stone-900" htmlFor="autre-question">Une autre question ?</label>
          <div className="mt-4 flex h-14 items-center gap-3 rounded-full border border-stone-200 bg-white pl-6 pr-2 shadow-[0_1px_2px_rgba(28,25,23,0.05)] transition focus-within:border-stone-900">
            <Search className="h-5 w-5 flex-none text-stone-500" strokeWidth={1.75} />
            <input
              id="autre-question"
              name="q"
              type="text"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              maxLength={300}
              required
              minLength={3}
              placeholder="Posez votre question"
              className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-0"
            />
            <button type="submit" aria-label="Chercher" className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-700">
              <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </form>

        {others.length > 0 && (
          <section className="mt-12 border-t border-stone-200 pt-8">
            <h2 className="font-serif text-2xl text-stone-900">À lire aussi</h2>
            {/* Sur téléphone : une vignette et le titre sur une ligne, pour ne pas dérouler trois grands dessins */}
            <ul className="mt-6 grid gap-5 sm:grid-cols-3 sm:gap-6">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/guide/${o.slug}`} className="group flex items-center gap-4 sm:block">
                    <div className="w-28 flex-none overflow-hidden rounded-[8px] border border-stone-900 sm:w-auto">
                      <GuideArt art={o.art} className="block w-full aspect-[12/7] group-hover:scale-[1.05] transition-transform duration-700" />
                    </div>
                    <p className="font-serif text-lg leading-snug text-stone-900 group-hover:underline underline-offset-4 decoration-stone-300 sm:mt-3">{typo(o.title)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {a.listingsLink && !a.listingsLink.href.includes('alerte') && (
          <p className="mt-12">
            <Link href={a.listingsLink.href} className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition">
              {a.listingsLink.label}
            </Link>
          </p>
        )}
        {a.stayLink && (
          <p className="mt-4 text-sm text-stone-600">
            Pour essayer une nuit :{' '}
            <a href={a.stayLink.affiliate ? stayUrl(a.stayLink.href) : a.stayLink.href} target="_blank" rel={a.stayLink.affiliate ? 'sponsored nofollow noopener' : 'noopener'} className="font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition">
              {a.stayLink.label} ↗
            </a>
            {STAY_PAID && a.stayLink.affiliate && <span className="text-stone-500"> (lien rémunéré)</span>}
          </p>
        )}
        <SmartAlert className="mt-8" />

        <section className="mt-10 border-b border-stone-200 pb-6">
          <p className="font-serif text-xl text-stone-900">Cet article peut servir à quelqu&apos;un ?</p>
          <div className="mt-4">
            <ArticleShare url={url} title={a.title} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xs uppercase tracking-widest text-stone-500">Sources</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {a.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-stone-700 underline underline-offset-4 decoration-stone-300 hover:text-stone-900">
                  {typo(s.label)}
                  <ArrowRight className="ml-1 inline-block w-3.5 h-3.5 align-[-2px]" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-stone-500 leading-relaxed">
            Cet article donne une information générale, à jour à la date indiquée. Il ne constitue pas un conseil juridique et ne remplace ni l&apos;avis d&apos;un notaire, ni celui d&apos;un professionnel du bâtiment sur un bien donné.
          </p>
        </section>
      </article>
    </div>
  );
}

import SiteHeader from '../../SiteHeader';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, Search } from 'lucide-react';
import GuideArt from '../GuideArt';
import ChecklistShare from '../ChecklistShare';
import ArticleShare from '../ArticleShare';
import { SITE_URL } from '../../../lib/site';
import { publishedArticles, formatGuideDate } from '../../../lib/guide';
import { passageAnchor } from '../../../lib/guide-search';
import OpenHash from '../OpenHash';

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
      <SiteHeader backHref="/guide" backLabel="État des lieux" />

      <header className="max-w-5xl mx-auto px-6 pt-8 md:pt-12">
        <nav aria-label="Fil d'Ariane" className="text-xs text-stone-500">
          <Link href="/" className="hover:text-stone-900">Accueil</Link>
          {' › '}
          <Link href="/guide" className="hover:text-stone-900">État des lieux</Link>
        </nav>
        <p className="mt-8 text-xs uppercase tracking-widest text-stone-500">{a.category}</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-stone-900">{a.title}</h1>
        <p className="mt-5 text-sm text-stone-500">
          Mis à jour le <time dateTime={a.updated}>{formatGuideDate(a.updated)}</time> · {a.readMinutes} min de lecture
        </p>
        <div className="mt-5">
          <ArticleShare url={url} title={a.title} label={false} />
        </div>
        <div className="mt-8 md:mt-10 md:max-w-3xl overflow-hidden border border-stone-900 shadow-[6px_6px_0_0_#1c1917]">
          <GuideArt art={a.art} className="block w-full aspect-[16/9] md:aspect-[12/5]" />
        </div>
      </header>

      <article className="max-w-5xl mx-auto px-6 pt-10 md:pt-14 pb-20 [&>*]:max-w-3xl">
        <p className="font-serif text-xl md:text-2xl text-stone-800 leading-relaxed">{a.intro}</p>

        <section className="mt-8 bg-[#F4E7B5] p-6" aria-label="À retenir">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-900">À retenir</h2>
          <ul className="mt-4 space-y-3">
            {a.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-3 text-stone-900 leading-relaxed">
                <Check className="mt-1 w-4 h-4 flex-none" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {a.sections.map((s) => (
          <section key={s.title} id={passageAnchor(s.title)} className="mt-10 scroll-mt-24">
            <h2 className="font-serif text-2xl leading-snug text-stone-900">{s.title}</h2>
            {(s.paragraphs || []).map((p) => (
              <p key={p} className="mt-4 text-stone-700 leading-relaxed">{p}</p>
            ))}
            {s.list && (
              <ul className="mt-4 space-y-2.5 list-disc pl-5 text-stone-700 leading-relaxed marker:text-stone-400">
                {s.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {a.checklist && (
          <section className="mt-10 border border-stone-900 bg-white p-6">
            <h2 className="font-serif text-2xl leading-snug text-stone-900">{a.checklist.title}</h2>
            <ul className="mt-4 space-y-3">
              {a.checklist.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-stone-700 leading-relaxed">
                  <span className="mt-1.5 h-3.5 w-3.5 flex-none border border-stone-900" aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
            <ChecklistShare title={`${a.checklist.title} (${a.title})`} items={a.checklist.items} url={url} />
          </section>
        )}

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-stone-900">Questions fréquentes</h2>
          <div className="mt-4 border-y border-stone-200 divide-y divide-stone-200">
            {a.faq.map((f) => (
              <details key={f.q} id={passageAnchor(f.q)} className="group py-5 scroll-mt-24">
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 font-serif text-lg text-stone-900">
                  {f.q}
                  <span className="text-stone-400 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-stone-700 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <OpenHash />

        <form action="/guide" method="get" className="mt-12" role="search">
          <label className="block text-xs uppercase tracking-widest text-stone-500" htmlFor="autre-question">Une autre question ?</label>
          <div className="mt-2 flex h-14 items-center gap-3 border border-stone-900 bg-white pl-4 pr-2">
            <Search className="h-5 w-5 flex-none text-stone-400" strokeWidth={1.5} />
            <input
              id="autre-question"
              name="q"
              type="search"
              enterKeyHint="search"
              maxLength={300}
              required
              minLength={3}
              placeholder="Posez-la ici"
              className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-0"
            />
            <button type="submit" className="inline-flex h-10 flex-none items-center rounded-[10px] bg-stone-900 px-5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-stone-800">
              Chercher
            </button>
          </div>
        </form>

        <section className="mt-12 bg-white border border-stone-900 text-stone-900 p-6 md:p-8">
          <h2 className="font-serif text-2xl leading-snug">Ne passez pas à côté de votre prochain coup de cœur.</h2>
          <p className="mt-2 text-stone-600 leading-relaxed">
            Loftissime réunit les biens atypiques des agences sur un seul site. Créez une alerte, et vous êtes parmi les premiers prévenus.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/?alerte=1" className="inline-flex h-12 items-center px-6 text-xs font-semibold uppercase tracking-wider transition bg-stone-900 text-white hover:bg-stone-800 rounded-[10px]">
              Créer mon alerte
            </Link>
            {a.listingsLink && (
              <Link href={a.listingsLink.href} className="inline-flex h-12 items-center px-6 border border-stone-900 text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-900 hover:text-white transition rounded-[10px]">
                {a.listingsLink.label}
              </Link>
            )}
          </div>
        </section>

        <section className="mt-12 border-t border-b border-stone-200 py-6">
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
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-stone-700 underline underline-offset-4 decoration-stone-300 hover:text-stone-900">
                  {s.label}
                  <ArrowUpRight className="mt-0.5 w-3.5 h-3.5 flex-none" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-stone-400 leading-relaxed">
            Cet article donne une information générale, à jour à la date indiquée. Il ne constitue pas un conseil juridique et ne remplace ni l&apos;avis d&apos;un notaire, ni celui d&apos;un professionnel du bâtiment sur un bien donné.
          </p>
        </section>

        {others.length > 0 && (
          <section className="mt-12 border-t border-stone-200 pt-8">
            <h2 className="font-serif text-2xl text-stone-900">À lire aussi</h2>
            <ul className="mt-6 grid sm:grid-cols-3 gap-6">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/guide/${o.slug}`} className="group block">
                    <div className="overflow-hidden border border-stone-900">
                      <GuideArt art={o.art} className="block w-full aspect-[12/7] group-hover:scale-[1.05] transition-transform duration-700" />
                    </div>
                    <p className="mt-3 font-serif text-lg leading-snug text-stone-900 group-hover:underline underline-offset-4 decoration-stone-300">{o.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}

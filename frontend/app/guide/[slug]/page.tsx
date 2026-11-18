import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import Logo from '../../Logo';
import { SITE_URL } from '../../../lib/site';
import { publishedArticles, formatGuideDate } from '../../../lib/guide';

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
    openGraph: { title: a.title, description: a.description, type: 'article', publishedTime: a.published, modifiedTime: a.updated },
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
      { '@type': 'ListItem', position: 2, name: 'L’état des lieux', item: `${SITE_URL}/guide` },
      { '@type': 'ListItem', position: 3, name: a.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(crumbLd) }} />
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/guide" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            L&apos;état des lieux
          </Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 pt-10 md:pt-14 pb-20">
        <nav aria-label="Fil d'Ariane" className="text-xs text-stone-400">
          <Link href="/" className="hover:text-stone-900">Accueil</Link>
          {' › '}
          <Link href="/guide" className="hover:text-stone-900">L&apos;état des lieux</Link>
        </nav>
        <p className="mt-6 text-[10px] uppercase tracking-widest text-stone-400">{a.category}</p>
        <h1 className="mt-3 font-serif text-3xl md:text-5xl leading-[1.1] text-stone-900">{a.title}</h1>
        <p className="mt-4 text-sm text-stone-500">
          Mis à jour le <time dateTime={a.updated}>{formatGuideDate(a.updated)}</time> · {a.readMinutes} min de lecture
        </p>

        <p className="mt-8 text-lg text-stone-700 leading-relaxed">{a.intro}</p>

        <section className="mt-8 bg-[#F4E7B5] p-6" aria-label="À retenir">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-stone-900">À retenir</h2>
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
          <section key={s.title} className="mt-10">
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
          </section>
        )}

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-stone-900">Questions fréquentes</h2>
          <dl className="mt-4 border-t border-stone-200 divide-y divide-stone-200">
            {a.faq.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-serif text-lg text-stone-900">{f.q}</dt>
                <dd className="mt-2 text-stone-700 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 bg-stone-900 text-white p-6 md:p-8">
          <h2 className="font-serif text-2xl leading-snug">Ne passez pas à côté de votre prochain coup de cœur.</h2>
          <p className="mt-2 text-stone-300 leading-relaxed">
            Loftissime réunit les biens atypiques des agences sur un seul site. Créez une alerte, et vous êtes parmi les premiers prévenus.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/?alerte=1" className="inline-flex h-12 items-center px-6 bg-[#F4E7B5] text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-white transition">
              Créer mon alerte
            </Link>
            {a.listingsLink && (
              <Link href={a.listingsLink.href} className="inline-flex h-12 items-center px-6 border border-stone-500 text-white text-xs font-semibold uppercase tracking-wider hover:border-white transition">
                {a.listingsLink.label}
              </Link>
            )}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-[10px] uppercase tracking-widest text-stone-400">Sources</h2>
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
            <ul className="mt-4 space-y-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/guide/${o.slug}`} className="text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
                    {o.title}
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

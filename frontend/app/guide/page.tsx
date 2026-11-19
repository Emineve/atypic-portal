import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Logo from '../Logo';
import GuideArt from './GuideArt';
import { publishedArticles, formatGuideDate, GUIDE_RUBRICS } from '../../lib/guide';

// La liste se recalcule toutes les heures : un article daté du jour apparaît sans nouvelle mise en ligne
export const revalidate = 3600;

export const metadata = {
  title: 'L’état des lieux : tout savoir avant d’acheter un bien atypique · Loftissime',
  description:
    'Souplex, loft, péniche, atelier d’artiste : les vérifications à faire avant d’acheter un bien atypique, et les conseils pour bien y vivre. Un nouvel article chaque semaine.',
  alternates: { canonical: '/guide' },
};

export default function GuideIndex() {
  const articles = publishedArticles();
  const [first, ...rest] = articles;
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les biens
          </Link>
        </div>
      </nav>

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">État des lieux</p>
        <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Acheter un bien atypique, <span className="italic text-stone-500">en connaissance de cause</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-stone-600 text-lg font-light leading-relaxed">
          Un souplex, un loft, une péniche ne s&apos;achètent pas comme un appartement classique. Chaque semaine, une question précise et les vérifications à faire avant de signer.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {rest.length > 0 && (
          <nav className="mb-10 md:mb-14 border-y border-stone-900 py-4 md:py-5" aria-label="Rubriques">
            <p className="text-xs uppercase tracking-widest text-stone-500">Les rubriques</p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
              {GUIDE_RUBRICS.filter((r) => articles.some((a) => a.category === r.name)).map((r) => (
                <li key={r.anchor}>
                  <a href={`#${r.anchor}`} className="group inline-flex items-baseline gap-2 font-serif text-lg md:text-xl text-stone-900">
                    <span className="underline underline-offset-[6px] decoration-stone-300 group-hover:decoration-stone-900 transition">{r.name}</span>
                    <span className="font-sans text-sm text-stone-500">{articles.filter((a) => a.category === r.name).length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {first && (
          <Link href={`/guide/${first.slug}`} className="group grid md:grid-cols-2 bg-white border border-stone-900 shadow-[6px_6px_0_0_#1c1917] hover:shadow-[10px_10px_0_0_#1c1917] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
            <div className="overflow-hidden border-b md:border-b-0 md:border-r border-stone-900 bg-[#F4E7B5] flex items-center">
              <GuideArt art={first.art} fit="meet" className="block w-full aspect-[12/5] group-hover:scale-[1.03] transition-transform duration-700" />
            </div>
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-widest text-stone-400">
                À la une · {first.category} · {first.readMinutes} min de lecture
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">{first.title}</h2>
              <p className="mt-4 text-stone-600 leading-relaxed">{first.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900">
                Lire l&apos;article
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        )}

        {GUIDE_RUBRICS.map((r) => {
          const items = articles.filter((a) => a.category === r.name);
          if (items.length === 0) return null;
          return (
            <section key={r.anchor} id={r.anchor} className="mt-12 md:mt-16 scroll-mt-24">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-stone-900">{r.name}</h2>
                <p className="mt-2 text-stone-600">{r.intro}</p>
              </div>
              <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {items.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/guide/${a.slug}`} className="group flex h-full flex-col bg-white border border-stone-900 hover:shadow-[6px_6px_0_0_#1c1917] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                      <div className="overflow-hidden border-b border-stone-900">
                        <GuideArt art={a.art} className="block w-full aspect-[12/5] group-hover:scale-[1.04] transition-transform duration-700" />
                      </div>
                      <div className="p-6 md:p-7">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400">{a.readMinutes} min de lecture</p>
                        <h3 className="mt-2 font-serif text-2xl leading-snug text-stone-900 group-hover:underline underline-offset-4 decoration-stone-300">
                          {a.title}
                        </h3>
                        <p className="mt-2 text-stone-600 leading-relaxed">{a.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {articles.length === 0 && <p className="py-10 text-stone-500">Les premiers articles arrivent très bientôt.</p>}

        <section className="mt-16 md:mt-20 text-stone-900 md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl leading-snug">Le bon bien n&apos;attend pas.</h2>
            <p className="mt-2 text-stone-600 leading-relaxed">Créez une alerte : vous êtes prévenu dès qu&apos;un bien atypique correspond à votre recherche.</p>
          </div>
          <Link href="/?alerte=1" className="mt-6 md:mt-0 inline-flex h-12 flex-none items-center px-6 text-xs font-semibold uppercase tracking-wider transition bg-stone-900 text-white hover:bg-stone-800 rounded-[10px]">
            Créer mon alerte
          </Link>
        </section>

        <p className="mt-10 text-sm text-stone-500 leading-relaxed max-w-3xl">
          Ces articles donnent une information générale. Ils ne remplacent ni le conseil d&apos;un notaire, ni l&apos;avis d&apos;un professionnel du bâtiment sur un bien donné.
        </p>
      </main>
    </div>
  );
}

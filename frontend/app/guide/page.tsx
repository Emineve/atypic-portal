import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Logo from '../Logo';
import { publishedArticles, formatGuideDate } from '../../lib/guide';

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

      <header className="max-w-3xl mx-auto px-6 pt-14 md:pt-20 pb-10 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">L&apos;état des lieux</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">
          Acheter un bien atypique, <span className="italic text-stone-600">en connaissance de cause</span>.
        </h1>
        <p className="mt-5 text-stone-600 text-lg font-light leading-relaxed">
          Un souplex, un loft, une péniche ne s&apos;achètent pas comme un appartement classique. Chaque semaine, une question précise et les vérifications à faire avant de signer.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20">
        <ul className="border-t border-stone-200 divide-y divide-stone-200">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/guide/${a.slug}`} className="group block py-7">
                <p className="text-[10px] uppercase tracking-widest text-stone-400">
                  {a.category} · {formatGuideDate(a.published)} · {a.readMinutes} min de lecture
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-snug text-stone-900 group-hover:underline underline-offset-4 decoration-stone-300">
                  {a.title}
                </h2>
                <p className="mt-2 text-stone-600 leading-relaxed">{a.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-stone-900">
                  Lire l&apos;article
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {articles.length === 0 && <p className="py-10 text-stone-500">Les premiers articles arrivent très bientôt.</p>}
        <p className="mt-10 text-sm text-stone-500 leading-relaxed">
          Ces articles donnent une information générale. Ils ne remplacent ni le conseil d&apos;un notaire, ni l&apos;avis d&apos;un professionnel du bâtiment sur un bien donné.
        </p>
      </main>
    </div>
  );
}

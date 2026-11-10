import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { slugify } from '../../lib/catalog';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Inspiration · Demeures Singulières',
  description: 'Des intérieurs qui ne sont pas à vendre, signés par des architectes à la vision singulière.',
  alternates: { canonical: '/inspiration' },
};

type Project = {
  title: string;
  kind?: string;
  sale?: string;
  place?: string;
  image?: string | null;
  images?: string[];
};
type Architect = {
  slug: string;
  name: string;
  city: string | null;
  tagline: string | null;
  projects: Project[] | null;
};
type Tile = { src: string; title: string; place: string; kind: string; sale: string; slug: string; architect: string };

// Une tuile par photo : la photo principale du projet, puis ses photos complémentaires
function tilesOf(a: Architect): Tile[] {
  const out: Tile[] = [];
  for (const p of Array.isArray(a.projects) ? a.projects : []) {
    const photos = [p.image, ...(Array.isArray(p.images) ? p.images : [])].filter(Boolean) as string[];
    for (const src of photos) {
      out.push({ src, title: p.title, place: p.place || '', kind: p.kind || '', sale: p.sale || '', slug: a.slug, architect: a.name });
    }
  }
  return out;
}

// Mélange régulier : une photo de chaque architecte à tour de rôle
function interleave(groups: Tile[][]): Tile[] {
  const out: Tile[] = [];
  const max = Math.max(0, ...groups.map((g) => g.length));
  for (let i = 0; i < max; i++) for (const g of groups) if (g[i]) out.push(g[i]);
  return out;
}

export default async function InspirationPage({ searchParams }: { searchParams: { type?: string } }) {
  const { data } = await getSupabase().rpc('get_inspiration');
  const architects: Architect[] = (data as Architect[]) || [];

  const all = architects.map(tilesOf);
  const kinds = Array.from(new Set(all.flat().map((t) => t.kind).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'fr'));

  const type = kinds.includes(searchParams.type || '') ? (searchParams.type as string) : '';

  const tiles = interleave(all).filter((t) => !type || t.kind === type);
  const sale = type ? tiles.find((t) => t.sale)?.sale || '' : '';

  const href = (k: string) => (k ? `/inspiration?type=${encodeURIComponent(k)}` : '/inspiration');
  const chip = (active: boolean) =>
    `h-9 px-4 inline-flex items-center text-xs border transition whitespace-nowrap ${
      active ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900'
    }`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-widest uppercase">Demeures Singulières</Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Les biens à vendre
          </Link>
        </div>
      </nav>

      <header className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Inspiration</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">
          Ces intérieurs ne sont pas à vendre.
        </h1>
        <p className="mt-4 text-stone-500 font-light text-lg">
          Ils montrent ce qu&apos;un lieu peut devenir entre les mains d&apos;architectes qui ont une vision bien à eux.
        </p>
      </header>

      <section className="max-w-7xl mx-auto px-6 pb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:justify-center">
          <Link href={href('')} scroll={false} className={chip(!type)}>Tous</Link>
          {kinds.map((k) => (
            <Link key={k} href={href(k)} scroll={false} className={chip(type === k)}>
              {k}
            </Link>
          ))}
        </div>
      </section>

      {sale && (
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <Link
            href={`/categorie/${slugify(sale)}`}
            className="flex items-center justify-between gap-4 border border-stone-900 bg-white px-5 py-4 hover:bg-stone-900 hover:text-white transition"
          >
            <span className="font-serif text-lg">Envie d&apos;un lieu comme ceux-ci ? Voir les biens « {sale} » à vendre</span>
            <ArrowUpRight className="w-5 h-5 shrink-0" />
          </Link>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {tiles.length === 0 ? (
          <p className="text-center py-16 text-stone-400 font-serif">Aucune image pour ce type.</p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {tiles.map((t, i) => (
              <Link key={t.src} href={`/inspiration/${t.slug}/${slugify(t.title)}`} className="group mb-4 block break-inside-avoid">
                <div className="bg-stone-200 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.src}
                    alt={`${t.title}, ${t.architect}`}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <p className="mt-2 text-sm text-stone-900 group-hover:underline underline-offset-4">
                                    {[t.title, t.place].filter(Boolean).join(' · ')}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-stone-400">{t.architect}</p>
              </Link>
            ))}
          </div>
        )}
      </main>

      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="font-serif text-2xl text-stone-900">Les architectes</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {architects.map((a) => (
              <Link key={a.slug} href={`/architectes/${a.slug}`} className="group block">
                <p className="text-[10px] uppercase tracking-widest text-stone-400">{a.city || 'Architecte'}</p>
                <h3 className="mt-1 font-serif text-xl text-stone-900 group-hover:underline underline-offset-4">{a.name}</h3>
                {a.tagline && <p className="mt-2 text-sm text-stone-500">{a.tagline}</p>}
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-900">
                  Son portrait
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="font-serif text-xl text-stone-900">Ces intérieurs ne sont pas à vendre.</p>
        <p className="mt-2 text-stone-500">Les lieux de la collection, eux, le sont.</p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center px-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
        >
          Voir les biens à vendre
        </Link>
        <p className="mt-10 text-xs text-stone-400">
          Sélection éditoriale, non sponsorisée. Photographies : © les architectes cités et leurs photographes.
        </p>
      </section>
    </div>
  );
}

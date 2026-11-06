import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

type Project = { title: string; category?: string; place?: string; year?: string; image?: string | null };
type Architect = {
  slug: string;
  name: string;
  city: string | null;
  tagline: string | null;
  bio: string | null;
  website: string | null;
  portrait_url: string | null;
  projects: Project[] | null;
  is_demo: boolean;
};

async function getArchitect(slug: string): Promise<Architect | null> {
  const { data } = await getSupabase().rpc('get_architect', { p_slug: slug });
  const rows = (data as Architect[]) || [];
  return rows[0] || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const a = await getArchitect(params.slug);
  if (!a) return { title: 'Architecte introuvable · SINGULIER', robots: { index: false } };
  const title = `${a.name} · Architecte`;
  return {
    title: `${title} · SINGULIER`,
    description: a.tagline || `Portrait de ${a.name}`,
    alternates: { canonical: `/architectes/${a.slug}` },
    robots: a.is_demo ? { index: false } : undefined,
  };
}

export default async function ArchitectPage({ params }: { params: { slug: string } }) {
  const a = await getArchitect(params.slug);
  if (!a) notFound();
  const projects = Array.isArray(a.projects) ? a.projects : [];
  const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) as string[];
  const paragraphs = (a.bio || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-widest uppercase">SINGULIER</Link>
          <Link href="/architectes" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les architectes
          </Link>
        </div>
      </nav>

      {a.is_demo && (
        <div className="bg-stone-900 text-stone-100 text-center text-xs tracking-wide py-2 px-4">
          Page modèle : contenu entièrement fictif, à titre d&apos;exemple.
        </div>
      )}

      <header className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Architecte{a.city ? ` · ${a.city}` : ''}</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">{a.name}</h1>
        {a.tagline && <p className="mt-4 text-stone-500 font-light text-lg">{a.tagline}</p>}
        {a.website && (
          <a
            href={a.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4"
          >
            Son site
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </header>

      {paragraphs.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 pb-14 space-y-5 text-stone-700 leading-relaxed">
          <h2 className="text-[10px] uppercase tracking-widest text-stone-400">Sa démarche</h2>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="font-serif text-2xl text-stone-900">Réalisations</h2>
          {categories.length > 0 && <p className="mt-1 text-xs text-stone-400">{categories.join(' · ')}</p>}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {projects.map((p, i) => (
              <figure key={i}>
                <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  )}
                </div>
                <figcaption className="mt-3">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400">
                    {[p.category, p.place, p.year].filter(Boolean).join(' · ')}
                  </p>
                  <p className="mt-1 font-serif text-lg text-stone-900">{p.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <p className="max-w-2xl mx-auto px-6 pb-16 text-center text-xs text-stone-400">
        Portrait éditorial, non sponsorisé. Textes et photographies : © {a.name}.
      </p>
    </div>
  );
}

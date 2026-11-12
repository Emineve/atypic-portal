import Logo from '../../Logo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { slugify } from '../../../lib/catalog';
import ArchitectContact from '../../inspiration/ArchitectContact';
import Gallery from '../../biens/[id]/Gallery';

export const dynamic = 'force-dynamic';

type Project = {
  title: string;
  category?: string;
  kind?: string;
  sale?: string;
  images?: string[];
  place?: string;
  year?: string;
  surface?: string;
  note?: string;
  url?: string;
  image?: string | null;
};
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
  if (!a) return { title: 'Architecte introuvable · Loftissime', robots: { index: false } };
  return {
    title: `${a.name} · Inspiration · Loftissime`,
    description: a.tagline || `Portrait de ${a.name}`,
    alternates: { canonical: `/architectes/${a.slug}` },
    robots: a.is_demo ? { index: false } : undefined,
  };
}

export default async function ArchitectPage({ params }: { params: { slug: string } }) {
  const a = await getArchitect(params.slug);
  if (!a) notFound();
  const projects = Array.isArray(a.projects) ? a.projects : [];
  const paragraphs = (a.bio || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/inspiration" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Inspiration
          </Link>
        </div>
      </nav>

      {a.is_demo && (
        <div className="bg-stone-900 text-stone-100 text-center text-xs tracking-wide py-2 px-4">
          Page modèle : contenu entièrement fictif, à titre d&apos;exemple.
        </div>
      )}

      <header className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">
          Inspiration · Architecte{a.city ? ` · ${a.city}` : ''}
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">{a.name}</h1>
        {a.tagline && <p className="mt-4 text-stone-500 font-light text-lg">{a.tagline}</p>}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {a.website && (
            <a
              href={a.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4"
            >
              Son site
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          <ArchitectContact slug={a.slug} name={a.name} />
        </div>
      </header>

      {paragraphs.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 pb-14 space-y-5 text-stone-700 leading-relaxed">
          <h2 className="text-[10px] uppercase tracking-widest text-stone-400">Son travail</h2>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <h2 className="font-serif text-2xl text-stone-900">Ce qu&apos;un volume peut devenir</h2>
          <div className="mt-10 space-y-16">
            {projects.map((p, i) => (
              <figure key={i}>
                <Gallery
                  images={[p.image, ...(Array.isArray(p.images) ? p.images : [])].filter(Boolean) as string[]}
                  title={p.title}
                  thumbs={false}
                />
                <figcaption className="mt-4">
                  <p className="text-[10px] uppercase tracking-widest text-stone-400">
                    {[
                      // le type n'est pas répété s'il figure déjà dans le titre
                      (p.kind || p.category) && !p.title.toLowerCase().includes(String(p.kind || p.category).toLowerCase())
                        ? p.kind || p.category
                        : null,
                      p.place,
                      p.surface,
                      p.year,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <p className="mt-1 font-serif text-2xl text-stone-900">{p.title}</p>
                  {(p.url || a.website) && (
                    <a
                      href={p.url || a.website || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4"
                    >
                      Voir le projet
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </figcaption>
                {p.sale && (
                  <Link
                    href={`/categorie/${slugify(p.sale)}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 transition"
                  >
                    Voir les biens « {p.sale} » à vendre
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-2xl mx-auto px-6 pb-16 text-center">
        <p className="font-serif text-xl text-stone-900">Envie d&apos;un lieu à vous ?</p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center px-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
        >
          Découvrez les biens à vendre
        </Link>
      </section>

      <p className="max-w-2xl mx-auto px-6 pb-16 text-center text-xs text-stone-400">
        Portrait éditorial, non sponsorisé. Photographies : © {a.name} et ses photographes.
      </p>
    </div>
  );
}

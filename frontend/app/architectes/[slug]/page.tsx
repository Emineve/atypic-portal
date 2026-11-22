import Crumbs from '../../Crumbs';
import SiteHeader from '../../SiteHeader';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import ArchitectContact from '../../inspiration/ArchitectContact';
import PhotoMosaic from '../../biens/[id]/PhotoMosaic';

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
  // Toutes les photos des projets, présentées comme celles d'une annonce
  const photos = Array.from(
    new Set(projects.flatMap((p) => [p.image, ...(Array.isArray(p.images) ? p.images : [])]).filter(Boolean) as string[]),
  );
  const paragraphs = (a.bio || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      {a.is_demo && (
        <div className="bg-stone-900 text-stone-100 text-center text-xs tracking-wide py-2 px-4">
          Page modèle : contenu entièrement fictif, à titre d&apos;exemple.
        </div>
      )}

      {photos.length > 0 && (
        <div className="md:pt-6">
          <PhotoMosaic images={photos} title={a.name} />
        </div>
      )}

      <header className="max-w-6xl mx-auto px-6 pt-10 md:pt-12 pb-14 [&>*]:max-w-3xl">
        <Crumbs items={[{ label: 'Inspiration', href: '/inspiration' }, { label: 'Architectes', href: '/architectes' }, { label: a.city ? `${a.name} · ${a.city}` : a.name }]} />
        <h1 className="mt-6 text-4xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.1]">{a.name}</h1>
        {a.tagline && <p className="mt-3 text-stone-500 font-light text-lg">{a.tagline}</p>}
        {paragraphs.length > 0 && (
          <div className="mt-8 space-y-5 text-stone-700 leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          {a.website && (
            <a
              href={a.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-stone-900 underline underline-offset-4"
            >
              Son site
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          <ArchitectContact slug={a.slug} name={a.name} />
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 pb-16 text-center">
        <Link
          href="/"
          className="inline-flex h-12 items-center px-8 bg-stone-900 text-[#FBF5E9] text-[15px] font-medium hover:bg-stone-800 transition rounded-full"
        >
          Découvrez les biens à visiter
        </Link>
      </section>

      <p className="max-w-2xl mx-auto px-6 pb-16 text-center text-xs text-stone-500">
        Portrait éditorial, non sponsorisé. Photographies : © {a.name} et ses photographes.
      </p>
    </div>
  );
}

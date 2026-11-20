import Crumbs from '../../../Crumbs';
import SiteHeader from '../../../SiteHeader';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../../../lib/supabase';
import { slugify } from '../../../../lib/catalog';

export const dynamic = 'force-dynamic';

type Project = {
  title: string;
  kind?: string;
  sale?: string;
  place?: string;
  year?: string;
  surface?: string;
  note?: string;
  url?: string;
  image?: string | null;
  images?: string[];
};
type Architect = {
  slug: string;
  name: string;
  tagline: string | null;
  projects: Project[] | null;
  is_demo: boolean;
};

async function getProject(slug: string, projet: string): Promise<{ a: Architect; p: Project } | null> {
  const { data } = await getSupabase().rpc('get_architect', { p_slug: slug });
  const a = ((data as Architect[]) || [])[0];
  if (!a || a.is_demo) return null;
  const p = (Array.isArray(a.projects) ? a.projects : []).find((x) => slugify(x.title) === projet);
  return p ? { a, p } : null;
}

export async function generateMetadata({ params }: { params: { slug: string; projet: string } }) {
  const found = await getProject(params.slug, params.projet);
  if (!found) return { title: 'Projet introuvable · Loftissime', robots: { index: false } };
  const { a, p } = found;
  return {
    title: `${p.title} · ${a.name} · Inspiration`,
    description: p.note || `${p.title}, un projet de ${a.name}.`,
    alternates: { canonical: `/inspiration/${a.slug}/${params.projet}` },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string; projet: string } }) {
  const found = await getProject(params.slug, params.projet);
  if (!found) notFound();
  const { a, p } = found;
  const photos = [p.image, ...(Array.isArray(p.images) ? p.images : [])].filter(Boolean) as string[];
  const facts = [p.place, p.surface, p.year].filter(Boolean).join(' · ');

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14 [&>*]:max-w-3xl">
        <Crumbs items={[{ label: 'Inspiration', href: '/inspiration' }, { label: a.name, href: `/architectes/${a.slug}` }, { label: p.kind || 'Projet' }]} />
        <h1 className="mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">{p.title}</h1>
        {facts && <p className="mt-4 text-stone-500 font-light text-lg">{facts}</p>}
        <p className="mt-3 text-sm text-stone-600">
          Un projet de{' '}
          <Link href={`/architectes/${a.slug}`} className="text-stone-900 underline underline-offset-4">
            {a.name}
          </Link>
        </p>
        {p.note && <p className="mt-6 text-stone-700 leading-relaxed">{p.note}</p>}
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-12">
        <div className="columns-1 sm:columns-2 gap-4">
          {photos.map((src, i) => (
            <div key={src} className="mb-4 break-inside-avoid bg-stone-200 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${p.title}, ${a.name}`} loading={i < 2 ? 'eager' : 'lazy'} className="w-full h-auto block" />
            </div>
          ))}
        </div>
      </main>

      <section className="max-w-3xl mx-auto px-6 pb-14 flex flex-col sm:flex-row sm:justify-center gap-3 text-center">
        {p.url && (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-1.5 px-6 border border-stone-900 text-[15px] font-medium text-stone-900 hover:bg-stone-900 hover:text-white transition rounded-full"
          >
            Le projet chez l&apos;architecte
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        <Link
          href={`/architectes/${a.slug}`}
          className="inline-flex h-12 items-center justify-center px-6 rounded-full border border-stone-300 text-[15px] font-medium text-stone-700 hover:border-stone-900 transition"
        >
          Le portrait de {a.name}
        </Link>
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-2xl mx-auto px-6 py-14 text-center">
          <Link
            href={p.sale ? `/categorie/${slugify(p.sale)}` : '/'}
            className="inline-flex h-12 items-center px-8 bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition rounded-full"
          >
            {p.sale ? `Découvrez les biens « ${p.sale} » à visiter` : 'Découvrez les biens à visiter'}
          </Link>
          <p className="mt-10 text-xs text-stone-400">
            Sélection éditoriale, non sponsorisée. Photographies : © {a.name} et ses photographes.
          </p>
        </div>
      </section>
    </div>
  );
}

import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import ArchitectContact from './ArchitectContact';
import PhotoMosaic from '../biens/[id]/PhotoMosaic';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Inspiration · Loftissime',
  description: 'Un architecte à la une, et tous ceux déjà présentés : des intérieurs à la vision singulière, pour nourrir votre imagination.',
  alternates: { canonical: '/inspiration' },
  // Rubrique masquée en attendant l'architecte partenaire : hors menu, hors moteurs
  robots: { index: false, follow: false },
};

type Project = {
  title: string;
  url?: string;
  kind?: string;
  sale?: string;
  place?: string;
  year?: string;
  surface?: string;
  note?: string;
  image?: string | null;
  images?: string[];
};
type Architect = {
  slug: string;
  name: string;
  city: string | null;
  tagline: string | null;
  bio: string | null;
  website: string | null;
  projects: Project[] | null;
};

export default async function InspirationPage() {
  // Le premier architecte renvoyé est celui « à la une » ; les suivants sont ceux déjà présentés
  const { data } = await getSupabase().rpc('get_inspiration');
  const architects: Architect[] = (data as Architect[]) || [];
  const featured = architects[0] || null;
  const others = architects.slice(1);
  const projects = featured && Array.isArray(featured.projects) ? featured.projects : [];
  // Toutes les photos des projets, présentées comme celles d'une annonce
  const photos = Array.from(
    new Set(projects.flatMap((p) => [p.image, ...(Array.isArray(p.images) ? p.images : [])]).filter(Boolean) as string[]),
  );
  const paragraphs = ((featured && featured.bio) || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      {!featured ? (
        <p className="text-center py-24 text-stone-400">Bientôt le premier architecte à la une.</p>
      ) : (
        <>
          <div className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-8 md:pb-6">
            <Crumbs items={[{ label: 'Inspiration' }]} />
            <p className="max-w-4xl mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
              Des idées pour <span className="italic text-stone-500">habiter autrement.</span>
            </p>
            <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-600">
              Un architecte à la une, et ses réalisations pour nourrir votre projet.
            </p>
          </div>
          {photos.length > 0 && (
            <div className="md:pt-6">
              <PhotoMosaic images={photos} title={featured.name} />
            </div>
          )}

          <header className="max-w-6xl mx-auto px-6 pt-10 md:pt-12 pb-14 [&>*]:max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-stone-500">
              L&apos;architecte à la une{featured.city ? ` · ${featured.city}` : ''}
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.1]">{featured.name}</h1>
            {featured.tagline && <p className="mt-3 text-stone-500 font-light text-lg">{featured.tagline}</p>}
            {paragraphs.length > 0 && (
              <div className="mt-8 space-y-5 text-stone-700 leading-relaxed">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              {featured.website && (
                <a
                  href={featured.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[15px] font-medium text-stone-900 underline underline-offset-4"
                >
                  Son site
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
              <ArchitectContact slug={featured.slug} name={featured.name} />
            </div>
            {photos.length > 0 && (
              <p className="mt-10 text-xs text-stone-400">
                Portrait éditorial, non sponsorisé. Photographies : © {featured.name} et ses photographes.
              </p>
            )}
          </header>
        </>
      )}

      {others.length > 0 && (
        <section className="border-t border-stone-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="font-serif text-2xl text-stone-900">Les architectes déjà présentés</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {others.map((a) => {
                const cover = (Array.isArray(a.projects) ? a.projects : []).find((p) => p.image)?.image || null;
                return (
                  <Link key={a.slug} href={`/architectes/${a.slug}`} className="group block">
                    <div className="aspect-[4/3] bg-stone-200 overflow-hidden">
                      {cover && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover}
                          alt={a.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        />
                      )}
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-widest text-stone-500">{a.city || 'Architecte'}</p>
                    <h3 className="mt-1 font-serif text-xl text-stone-900 group-hover:underline underline-offset-4">{a.name}</h3>
                    {a.tagline && <p className="mt-2 text-sm text-stone-500">{a.tagline}</p>}
                    <span className="mt-3 inline-flex items-center gap-1 text-[15px] font-medium text-stone-900">
                      Son portrait
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <Link
          href="/"
          className="inline-flex h-12 items-center px-8 bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition rounded-full"
        >
          Découvrez les biens à visiter
        </Link>
      </section>
    </div>
  );
}

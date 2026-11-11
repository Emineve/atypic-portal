import Logo from '../Logo';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { slugify } from '../../lib/catalog';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Inspiration · Loftissime',
  description: 'Un architecte à la une, et tous ceux déjà présentés : des intérieurs à la vision singulière, pour nourrir votre imagination.',
  alternates: { canonical: '/inspiration' },
};

type Project = {
  title: string;
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
  const paragraphs = ((featured && featured.bio) || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les biens
          </Link>
        </div>
      </nav>

      {!featured ? (
        <p className="text-center py-24 text-stone-400 font-serif">Bientôt le premier architecte à la une.</p>
      ) : (
        <>
          <header className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
            <p className="text-[10px] uppercase tracking-widest text-stone-400">
              Inspiration · L&apos;architecte à la une{featured.city ? ` · ${featured.city}` : ''}
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">{featured.name}</h1>
            {featured.tagline && <p className="mt-4 text-stone-500 font-light text-lg">{featured.tagline}</p>}
            {featured.website && (
              <a
                href={featured.website}
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
                  <figure key={p.title}>
                    <Link href={`/inspiration/${featured.slug}/${slugify(p.title)}`} className="group block">
                      <div className="aspect-[16/10] bg-stone-200 overflow-hidden">
                        {p.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                            loading={i === 0 ? 'eager' : 'lazy'}
                          />
                        )}
                      </div>
                    </Link>
                    <figcaption className="mt-4 md:flex md:items-start md:justify-between md:gap-10">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400">
                          {[p.kind, p.place, p.surface, p.year].filter(Boolean).join(' · ')}
                        </p>
                        <p className="mt-1 font-serif text-2xl text-stone-900">{p.title}</p>
                      </div>
                      <div className="mt-2 md:mt-0 md:max-w-sm md:text-right">
                        {p.note && <p className="text-sm text-stone-600">{p.note}</p>}
                        <Link
                          href={`/inspiration/${featured.slug}/${slugify(p.title)}`}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-900 underline underline-offset-4"
                        >
                          Voir le projet
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </figcaption>
                    {Array.isArray(p.images) && p.images.length > 0 && (
                      <div className="mt-5 grid grid-cols-3 gap-3">
                        {p.images.slice(0, 3).map((src) => (
                          <div key={src} className="aspect-[4/5] bg-stone-200 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        ))}
                      </div>
                    )}
                  </figure>
                ))}
              </div>
              <p className="mt-10 text-xs text-stone-400">
                Portrait éditorial, non sponsorisé. Photographies : © {featured.name} et ses photographes.
              </p>
            </section>
          )}
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
                    <p className="mt-4 text-[10px] uppercase tracking-widest text-stone-400">{a.city || 'Architecte'}</p>
                    <h3 className="mt-1 font-serif text-xl text-stone-900 group-hover:underline underline-offset-4">{a.name}</h3>
                    {a.tagline && <p className="mt-2 text-sm text-stone-500">{a.tagline}</p>}
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-900">
                      Son portrait
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="font-serif text-xl text-stone-900">Envie d&apos;un lieu à vous ?</p>
        <Link
          href="/"
          className="mt-6 inline-flex h-12 items-center px-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
        >
          Découvrez les biens à vendre
        </Link>
      </section>
    </div>
  );
}

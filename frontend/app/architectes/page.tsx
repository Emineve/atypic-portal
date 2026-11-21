import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import Link from 'next/link';
import { getSupabase } from '../../lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Architectes · Loftissime',
  description: 'Portraits d\'architectes à la démarche singulière.',
  alternates: { canonical: '/architectes' },
  robots: { index: false },
};

type Row = { slug: string; name: string; city: string | null; tagline: string | null; portrait_url: string | null; is_demo: boolean };

export default async function ArchitectsPage() {
  const { data } = await getSupabase().rpc('get_architects');
  const rows: Row[] = (data as Row[]) || [];
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <Crumbs items={[{ label: 'Inspiration', href: '/inspiration' }, { label: 'Architectes' }]} />
        <h1 className="mt-6 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Des architectes <span className="italic text-stone-500">qui sortent de l&apos;ordinaire.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-600">Des portraits éditoriaux, non sponsorisés.</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {rows.length === 0 ? (
          <p className="text-center py-16 text-stone-400">Bientôt les premiers portraits.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {rows.map((a) => (
              <Link key={a.slug} href={`/architectes/${a.slug}`} className="group block">
                <div className="aspect-[4/5] bg-stone-200 overflow-hidden">
                  {a.portrait_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.portrait_url} alt={a.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  )}
                </div>
                <p className="mt-4 text-xs uppercase tracking-widest text-stone-500">{a.city}{a.is_demo ? ' · Exemple fictif' : ''}</p>
                <h2 className="mt-1 font-serif text-xl text-stone-900">{a.name}</h2>
                {a.tagline && <p className="mt-1 text-sm text-stone-500 line-clamp-2">{a.tagline}</p>}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

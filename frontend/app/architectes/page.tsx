import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-widest uppercase">Loftissime</Link>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Toute la collection
          </Link>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">Architectes</h1>
        <p className="mt-4 text-stone-500 font-light">Des portraits d&apos;architectes dont la démarche sort de l&apos;ordinaire.</p>
        <p className="mt-2 text-xs text-stone-400">Portraits éditoriaux, non sponsorisés.</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {rows.length === 0 ? (
          <p className="text-center py-16 text-stone-400 font-serif">Bientôt les premiers portraits.</p>
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
                <p className="mt-4 text-[10px] uppercase tracking-widest text-stone-400">{a.city}{a.is_demo ? ' · Exemple fictif' : ''}</p>
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

import SiteHeader from '../SiteHeader';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { slugify } from '../../lib/catalog';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Les agences · Loftissime',
  description: 'Les agences qui proposent des biens atypiques sur Loftissime. Choisissez celles à qui confier votre recherche.',
  alternates: { canonical: '/agence' },
};

// Toutes les agences qui ont au moins un bien en ligne, par ordre alphabétique. Le nombre de biens n'est pas affiché :
// une agence qui n'a qu'un bien atypique ne doit pas paraître moins sérieuse qu'une autre.
async function getAgencies() {
  const { data } = await getSupabase().from('listings').select('source_agency').eq('is_active', true);
  const counts = new Map<string, number>();
  for (const r of data || []) {
    const name = (r.source_agency as string | null)?.trim();
    if (name) counts.set(name, (counts.get(name) || 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0], 'fr'));
}

export default async function AgenciesPage() {
  const agencies = await getAgencies();
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-3xl mx-auto px-6 pt-14 md:pt-24 pb-10 md:pb-14">
        <p className="text-xs uppercase tracking-widest text-stone-500">Les agences</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Confiez votre recherche <span className="italic text-stone-500">à qui vous voulez.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          Ouvrez la page d&apos;une agence, puis partagez vos critères avec elle. Recommencez avec autant d&apos;agences que vous le souhaitez : rien ne part sans vous.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-24">
        <ul className="divide-y divide-stone-200 border-y border-stone-200">
          {agencies.map(([name]) => (
            <li key={name}>
              <Link href={`/agence/${slugify(name)}`} className="group flex items-center justify-between gap-4 py-4">
                <span className="font-serif text-2xl text-stone-900">{name}</span>
                <ArrowRight className="w-4 h-4 flex-none text-stone-400 group-hover:text-stone-900 transition" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

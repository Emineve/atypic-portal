import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getSupabase } from '../../lib/supabase';
import { slugify, cityHub } from '../../lib/catalog';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Les agences · Loftissime',
  description: 'Les agences qui proposent des biens atypiques sur Loftissime. Choisissez celles à qui confier votre recherche.',
  alternates: { canonical: '/agence' },
};

// Les agences qui ont au moins un bien en ligne, rangées par ville où elles sont présentes (une agence peut figurer
// dans plusieurs villes). Le nombre de biens n'est pas affiché : une agence qui n'a qu'un bien atypique ne doit pas
// paraître moins sérieuse qu'une autre.
async function getAgenciesByCity() {
  const { data } = await getSupabase().from('listings').select('source_agency, city').eq('is_active', true);
  const cities = new Map<string, Set<string>>();
  for (const r of data || []) {
    const name = (r.source_agency as string | null)?.trim();
    const city = cityHub(((r.city as string | null) || '').trim());
    if (!name || !city) continue;
    if (!cities.has(city)) cities.set(city, new Set());
    cities.get(city)!.add(name);
  }
  return Array.from(cities.entries())
    .map(([city, names]) => [city, Array.from(names).sort((a, b) => a.localeCompare(b, 'fr'))] as const)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], 'fr'));
}

export default async function AgenciesPage() {
  const cities = await getAgenciesByCity();
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-3xl">
        <Crumbs items={[{ label: 'Agences' }]} />
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Confiez votre recherche <span className="italic text-stone-500">à qui vous voulez.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          Ouvrez la page d&apos;une agence, puis partagez vos critères avec elle. Recommencez avec autant d&apos;agences que vous le souhaitez : rien ne part sans vous.
        </p>
      </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl pb-24">
        {cities.length > 1 && (
          <nav aria-label="Villes" className="mb-12 flex flex-wrap gap-x-6 gap-y-2">
            {cities.map(([city]) => (
              <a key={city} href={`#${slugify(city)}`} className="text-base font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">{city}</a>
            ))}
          </nav>
        )}
        <div className="space-y-14">
          {cities.map(([city, names]) => (
            <section key={city} id={slugify(city)} className="scroll-mt-20">
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-stone-900">{city}</h2>
              <ul className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
                {names.map((name) => (
                  <li key={name}>
                    <Link href={`/agence/${slugify(name)}`} className="group flex items-center justify-between gap-4 py-4">
                      <span className="text-lg font-medium text-stone-900">{name}</span>
                      <ArrowRight className="w-4 h-4 flex-none text-stone-400 group-hover:text-stone-900 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      </main>
    </div>
  );
}

import { CATEGORY_LIST, slugify, cityHub } from '../lib/catalog';

export default function FooterLinks({ cities }: { cities: string[] }) {
  const hubs = Array.from(new Set(cities.filter(Boolean).map((c) => cityHub(c)))).sort();
  const link = 'text-stone-700 hover:text-stone-900 underline-offset-4 hover:underline';
  return (
    <>
    <nav className="max-w-5xl mx-auto px-6 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm" aria-label="Parcourir">
      <div>
        <h2 className="text-[10px] uppercase tracking-widest text-stone-400">Par catégorie</h2>
        <ul className="mt-3 space-y-1.5">
          {CATEGORY_LIST.map((c) => (
            <li key={c}><a href={`/categorie/${slugify(c)}`} className={link}>{c}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-[10px] uppercase tracking-widest text-stone-400">Par ville</h2>
        <ul className="mt-3 space-y-1.5">
          {hubs.map((city) => (
            <li key={city}><a href={`/ville/${slugify(city)}`} className={link}>{city}</a></li>
          ))}
        </ul>
      </div>
    </nav>
    <nav className="max-w-5xl mx-auto px-6 pt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500" aria-label="Informations légales">
      <a href="/" className={link}>Tous les biens</a>
          <a href="/qui-sommes-nous" className={link}>Qui sommes-nous</a>
      <a href="/pro" className={link}>Agences</a>
      <a href="/classement" className={link}>Référencement et classement</a>
      <a href="/mentions-legales" className={link}>Mentions légales</a>
      <a href="/confidentialite" className={link}>Confidentialité</a>
      <a href="/cgu" className={link}>Conditions d'utilisation</a>
    </nav>
    </>
  );
}

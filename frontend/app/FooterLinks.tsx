import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { CATEGORY_LIST, slugify, cityHub } from '../lib/catalog';

// Réseaux sociaux : affichés sans lien pour l'instant (comptes à créer)
const SOCIALS = [
  { name: 'Facebook', icon: Facebook },
  { name: 'Instagram', icon: Instagram },
  { name: 'X', icon: Twitter },
  { name: 'LinkedIn', icon: Linkedin },
];

export default function FooterLinks({ cities }: { cities: string[] }) {
  const hubs = Array.from(new Set(cities.filter(Boolean).map((c) => cityHub(c)))).sort();
  const link = 'text-stone-700 hover:text-stone-900 underline-offset-4 hover:underline';
  const title = 'text-[10px] uppercase tracking-widest text-stone-400';
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 text-sm">
      <div className="col-span-2 md:col-span-1">
        <p className="font-logo text-2xl font-semibold tracking-tight text-stone-900">loftissime.</p>
        <p className="mt-2 text-stone-500">Curateur de lieux atypiques</p>
        <div className="mt-5 flex gap-2" aria-hidden="true">
          {SOCIALS.map((s) => (
            <span
              key={s.name}
              title={`${s.name} (bientôt)`}
              className="h-9 w-9 rounded-full border border-stone-300 text-stone-500 flex items-center justify-center"
            >
              <s.icon className="w-4 h-4" />
            </span>
          ))}
        </div>
      </div>
      <nav aria-label="Par catégorie">
        <h2 className={title}>Par catégorie</h2>
        <ul className="mt-3 space-y-2">
          {CATEGORY_LIST.map((c) => (
            <li key={c}><a href={`/categorie/${slugify(c)}`} className={link}>{c}</a></li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Par ville">
        <h2 className={title}>Par ville</h2>
        <ul className="mt-3 space-y-2">
          {hubs.map((city) => (
            <li key={city}><a href={`/ville/${slugify(city)}`} className={link}>{city}</a></li>
          ))}
        </ul>
      </nav>
      <nav aria-label="Loftissime">
        <h2 className={title}>Loftissime</h2>
        <ul className="mt-3 space-y-2">
          <li><a href="/qui-sommes-nous" className={link}>Qui sommes-nous</a></li>
          <li><a href="/inspiration" className={link}>Inspiration</a></li>
          <li><a href="/guide" className={link}>L&apos;état des lieux</a></li>
          <li><a href="/financement" className={link}>Financement</a></li>
          <li><a href="/charte" className={link}>Questions fréquentes</a></li>
          <li><a href="/pro" className={link}>Espace agences</a></li>
        </ul>
      </nav>
      <nav className="col-span-2 md:col-span-4 border-t border-stone-200 pt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500" aria-label="Informations légales">
        <span>© Loftissime</span>
        <a href="/mentions-legales" className={link}>Mentions légales</a>
        <a href="/confidentialite" className={link}>Confidentialité</a>
        <a href="/cgu" className={link}>Conditions d&apos;utilisation</a>
      </nav>
    </div>
  );
}

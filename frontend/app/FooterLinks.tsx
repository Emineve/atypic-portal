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
  const title = 'text-xs uppercase tracking-widest text-stone-500';
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 text-sm">
      <div className="col-span-2 md:col-span-1">
        <a href="/" aria-label="Loftissime, retour à l'accueil" className="block font-logo text-2xl font-semibold tracking-tight leading-none text-stone-900">loftissime.</a>
        <p className="mt-1 text-xs leading-none text-stone-500">Curateur de biens atypiques</p>
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
          <li><a href="/qui-sommes-nous" className={link}>Pourquoi Loftissime</a></li>
          <li><a href="/mode-d-emploi" className={link}>Mode d&apos;emploi</a></li>
          <li><a href="/inspiration" className={link}>Inspiration</a></li>
          <li><a href="/guide" className={link}>État des lieux</a></li>
          <li><a href="/financement" className={link}>Financement</a></li>
          <li><a href="/charte" className={link}>Questions fréquentes</a></li>
          <li><a href="/dressing" className={link}>Le dressing</a></li>
        </ul>
        <h2 className={`mt-8 ${title}`}>Professionnels</h2>
        <ul className="mt-3 space-y-2">
          <li><a href="/pro" className={link}>Espace pro</a></li>
        </ul>
      </nav>
      <nav className="col-span-2 md:col-span-4 border-t border-stone-200 pt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500" aria-label="Informations légales">
        <span>© Loftissime</span>
        <a href="/mentions-legales" className={link}>Mentions légales</a>
        <a href="/confidentialite" className={link}>Confidentialité</a>
        <a href="/cgu" className={link}>Conditions d&apos;utilisation</a>
        <a href="/cgv" className={link}>Conditions de diffusion</a>
      </nav>
    </div>
  );
}

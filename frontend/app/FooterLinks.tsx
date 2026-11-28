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
  const link = 'text-stone-300 hover:text-[#FCFBF8] underline-offset-4 hover:underline decoration-[#F6CF4E]';
  const title = 'text-xs uppercase tracking-widest text-stone-500';
  return (
    <div data-dark-footer className="bg-stone-900 text-[#FCFBF8]">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-20 md:pt-20 md:pb-8">
        <div className="grid gap-y-12 md:grid-cols-[1.3fr_2fr] md:gap-x-16">
          <div>
            <a href="/" aria-label="Loftissime, retour à l'accueil" className="block font-logo text-4xl md:text-5xl font-semibold tracking-tight leading-none text-[#FCFBF8] whitespace-nowrap">
              loftissime.
            </a>
            <p className="mt-5 font-serif text-xl md:text-2xl leading-none text-[#FCFBF8]">
              Curateur de biens{' '}
              <span className="italic text-stone-400">atypiques</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-500">
              Lofts, ateliers d&apos;artistes, toits-terrasses, maisons d&apos;architecte à vendre : un seul site pour les trouver.
            </p>
            <div className="mt-7 flex gap-2" aria-hidden="true">
              {SOCIALS.map((s) => (
                <span key={s.name} title={`${s.name} (bientôt)`} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-stone-500">
                  <s.icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-sm sm:grid-cols-3">
            <nav aria-label="Par catégorie">
              <h2 className={title}>Par catégorie</h2>
              <ul className="mt-4 space-y-2.5">
                {CATEGORY_LIST.map((c) => (
                  <li key={c}><a href={`/categorie/${slugify(c)}`} className={link}>{c}</a></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Par ville">
              <h2 className={title}>Par ville</h2>
              <ul className="mt-4 space-y-2.5">
                {hubs.map((city) => (
                  <li key={city}><a href={`/ville/${slugify(city)}`} className={link}>{city}</a></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Loftissime" className="col-span-2 sm:col-span-1">
              <h2 className={title}>Loftissime</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-1">
                <li><a href="/qui-sommes-nous" className={link}>Pourquoi Loftissime</a></li>
                <li><a href="/mode-d-emploi" className={link}>Mode d&apos;emploi</a></li>
                <li><a href="/alerte" className={link}>Mes alertes</a></li>
                <li><a href="/guide" className={link}>État des lieux</a></li>
                <li><a href="/financement" className={link}>Financement</a></li>
                <li><a href="/charte" className={link}>Questions fréquentes</a></li>
                <li><a href="/dressing" className={link}>Le dressing</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[14px] border border-stone-700 px-6 py-5">
          <p className="text-sm text-stone-300">
            <span className="font-medium text-[#FCFBF8]">Vous êtes une agence ?</span> Diffusez vos biens atypiques, gratuitement pendant le lancement.
          </p>
          <a href="/pro" className="text-sm font-medium text-[#F6CF4E] underline underline-offset-4 decoration-[#F6CF4E]/40 hover:decoration-[#F6CF4E]">
            Espace pro →
          </a>
        </div>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500" aria-label="Informations légales">
          <span>© Loftissime</span>
          <a href="/mentions-legales" className="hover:text-[#FCFBF8]">Mentions légales</a>
          <a href="/confidentialite" className="hover:text-[#FCFBF8]">Confidentialité</a>
          <a href="/cgu" className="hover:text-[#FCFBF8]">Conditions d&apos;utilisation</a>
        </nav>
      </div>
    </div>
  );
}

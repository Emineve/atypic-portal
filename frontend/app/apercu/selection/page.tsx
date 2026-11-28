import SiteHeader from '../../SiteHeader';
import Surface from '../../Surface';
import { getSupabase } from '../../../lib/supabase';
import { agencyLine } from '../../../lib/agencyLine';
import { FIELD } from '../../../lib/form';
import { typo } from '../../../lib/typo';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Aperçu : la sélection de la semaine · Loftissime',
  robots: { index: false, follow: false },
};

// Page de travail, cachée : Loftissime sur le modèle d'une sélection d'annonces envoyée par lettre.
// Le site ne détient pas les annonces : il les repère, les présente en une ligne et renvoie vers l'agence.
// Les biens montrés sont les annonces d'exemple du site ; les liens sortants ne sont pas branchés.

interface L {
  id: string;
  title: string;
  city: string | null;
  price: number;
  surface_sqm: number | null;
  cover_image_url: string | null;
  atypic_category: string | null;
  source_agency: string | null;
}

// Biens de secours, quand la base ne répond pas (aperçu hors ligne)
const SAMPLE: L[] = [
  { id: 's1', title: 'Atelier d’artiste sous verrière, Montparnasse', city: 'Paris 14e', price: 1250000, surface_sqm: 96, cover_image_url: null, atypic_category: 'Atelier d’artiste', source_agency: 'Agence d’exemple' },
  { id: 's2', title: 'Loft dans une ancienne imprimerie', city: 'Paris 11e', price: 980000, surface_sqm: 110, cover_image_url: null, atypic_category: 'Loft & Atelier', source_agency: 'Agence d’exemple' },
  { id: 's3', title: 'Dernier étage avec terrasse plein ciel', city: 'Paris 16e', price: 1890000, surface_sqm: 124, cover_image_url: null, atypic_category: 'Rooftop & Vue', source_agency: 'Agence d’exemple' },
  { id: 's4', title: 'Péniche amarrée face au bois', city: 'Paris 16e', price: 640000, surface_sqm: 85, cover_image_url: null, atypic_category: 'Péniche', source_agency: 'Agence d’exemple' },
  { id: 's5', title: 'Duplex style atelier, Village de Passy', city: 'Paris 16e', price: 1450000, surface_sqm: 101, cover_image_url: null, atypic_category: 'Loft & Atelier', source_agency: 'Agence d’exemple' },
  { id: 's6', title: 'Maison d’architecte sur cour', city: 'Paris 20e', price: 1320000, surface_sqm: 138, cover_image_url: null, atypic_category: 'Biens de caractère', source_agency: 'Agence d’exemple' },
  { id: 's7', title: 'Ancienne loge réunie à un rez-de-jardin', city: 'Paris 9e', price: 520000, surface_sqm: 47, cover_image_url: null, atypic_category: 'Biens de caractère', source_agency: 'Agence d’exemple' },
  { id: 's8', title: 'Souplex sous verrière zénithale', city: 'Paris 10e', price: 730000, surface_sqm: 92, cover_image_url: null, atypic_category: 'Loft & Atelier', source_agency: 'Agence d’exemple' },
];

async function getListings(): Promise<L[]> {
  try {
    const { data } = await getSupabase()
      .from('listings')
      .select('id,title,city,price,surface_sqm,cover_image_url,atypic_category,source_agency')
      .eq('is_active', true)
      .not('cover_image_url', 'is', null)
      .order('first_seen_at', { ascending: false })
      .limit(8);
    return data && data.length ? (data as L[]) : SAMPLE;
  } catch {
    return SAMPLE;
  }
}

const eur = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n).replace(/[  ]/g, ' ');

const THEMES: { name: string; text: string }[] = [
  { name: 'Lofts et ateliers', text: 'Grands volumes, verrières, anciens lieux de travail.' },
  { name: 'Derniers étages', text: 'Terrasses, vues dégagées, toits.' },
  { name: 'Hors du commun', text: 'Péniches, chapelles, loges, ce qui ne rentre dans aucune case.' },
  { name: 'Moins de 500 000 €', text: 'L’atypique à petit budget, souvent à rénover.' },
];

export default async function SelectionPreview() {
  const items = await getListings();
  const link = 'text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300';
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#3A2E2A] font-sans">
      <SiteHeader />

      <p className="bg-stone-900 px-6 py-2 text-center text-xs tracking-wide text-[#FCFBF8]">
        Maquette de travail : biens d’exemple, liens sortants non branchés, rien de ceci n’est en ligne.
      </p>

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-8 md:pb-10">
        <p className="text-xs uppercase tracking-widest text-stone-500">La sélection · semaine du 23 novembre</p>
        <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Les biens atypiques de la semaine, <span className="italic text-stone-500">repérés pour vous.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-stone-600 text-base md:text-lg font-light leading-relaxed">
          Nous lisons les annonces des agences et ne gardons que celles qui sortent du lot. Un clic, et vous êtes sur l’annonce de l’agence.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* La vidéo de la semaine : un bien en avant-première, au format du site */}
        <article className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] rounded-[14px] overflow-hidden bg-white border border-stone-200">
          <div className="relative flex aspect-[4/5] md:aspect-auto md:min-h-[420px] items-center justify-center bg-[#3A2E2A] border-b md:border-b-0 md:border-r border-stone-900">
            <span className="absolute left-5 top-5 font-logo font-semibold lowercase tracking-tight text-lg leading-none text-[#FCFBF8]">loftissime.</span>
            <span className="absolute right-5 top-5 text-xs uppercase tracking-widest text-stone-400">Avant-première</span>
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FCFBF8]" aria-hidden="true">
              <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-[#FCFBF8]" />
            </span>
            <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#FCFBF8]">
              <span className="font-serif text-xl leading-tight">Atelier sous verrière<span className="block italic text-stone-400">Paris 14e</span></span>
              <span className="text-xs tabular-nums text-stone-400">1:00</span>
            </span>
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-stone-500">La vidéo de la semaine · Exemple</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">
              En ligne jeudi, <span className="italic text-stone-500">vu ici aujourd’hui.</span>
            </h2>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Chaque semaine, un bien en avant-première : une minute de visite, avant sa mise en ligne. Réservé aux abonnés de la lettre.
            </p>
            <span className={`mt-6 self-start ${link}`}>Regarder la visite →</span>
          </div>
        </article>

        <h2 className="mt-12 md:mt-16 mb-6 font-serif text-3xl md:text-4xl text-stone-900">La sélection de la semaine</h2>

        {/* La sélection : une photo, une ligne, un prix, et le lien vers l'agence */}
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.id} className="flex flex-col">
              <div className="aspect-[4/3] overflow-hidden rounded-[14px] bg-stone-200">
                {it.cover_image_url ? (
                  <img src={it.cover_image_url} alt="" loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-stone-500">Photo de l’agence</div>
                )}
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-stone-500">
                {it.city}
                <Surface sqm={it.surface_sqm} />
              </p>
              <h3 className="mt-1.5 font-serif text-xl leading-snug text-stone-900">{typo(it.title)}</h3>
              <p className="mt-1.5 font-serif text-xl lining-nums text-stone-900">{eur(Number(it.price))}</p>
              <p className="mt-auto pt-4">
                <span className={link}>Voir l’annonce ↗</span>
                {it.source_agency && <span className="mt-1 block text-xs leading-snug text-stone-500">{agencyLine(it.source_agency)}</span>}
              </p>
            </li>
          ))}
        </ul>

        {/* La lettre gratuite */}
        <section className="mt-14 md:mt-20 rounded-[14px] border border-stone-200 bg-white p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">La lettre</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">
                La sélection, <span className="italic text-stone-500">chaque jeudi.</span>
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">Les biens repérés dans la semaine, et la vidéo d’un bien en avant-première.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input type="email" disabled placeholder="Votre e-mail" aria-label="Votre e-mail" className={FIELD} />
              <span className="inline-flex h-12 flex-none items-center justify-center rounded-full bg-stone-900 px-7 text-[15px] font-medium text-[#FCFBF8]">Recevoir la sélection</span>
            </div>
          </div>
        </section>

        {/* Les sélections par thème, pour les abonnés */}
        <section className="mt-12 md:mt-16" aria-label="Les sélections par thème">
          <p className="text-xs uppercase tracking-widest text-stone-500">Pour aller plus loin · sélections par thème, réservées aux abonnés</p>
          <ul className="mt-4 border-t border-stone-900">
            {THEMES.map((t) => (
              <li key={t.name} className="grid gap-x-10 gap-y-1 border-b border-stone-200 py-4 md:grid-cols-[16rem_1fr_auto] md:items-baseline">
                <span className="font-serif text-xl text-stone-900">{t.name}</span>
                <span className="text-[15px] leading-relaxed text-stone-600">{typo(t.text)}</span>
                <span className="text-xs uppercase tracking-widest text-stone-500">Abonnés</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] text-stone-600">
            Une lettre par thème, avec davantage de biens. <span className={link}>S’abonner →</span>
          </p>
        </section>

        {/* Signaler un bien */}
        <section className="mt-12 md:mt-16 grid gap-x-10 gap-y-4 border-t border-stone-900 pt-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900">Vous vendez un bien qui sort du lot ?</h2>
            <p className="mt-2 max-w-2xl text-stone-600 leading-relaxed">Agence ou particulier, envoyez-nous le lien de votre annonce. Si le bien entre dans la sélection, il part dans la lettre.</p>
          </div>
          <span className={link}>Signaler un bien →</span>
        </section>
      </main>
    </div>
  );
}

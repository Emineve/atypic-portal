import { getSupabase } from '../../../lib/supabase';
import { agencyLine } from '../../../lib/agencyLine';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Aperçu : plus de peps · Loftissime',
  robots: { index: false, follow: false },
};

// Page de travail, cachée : le haut de l'accueil rejoué dans trois ambiances, à côté de l'actuelle.
type Theme = {
  key: string;
  name: string;
  pitch: string;
  page: string; // fond de page
  ink: string; // texte principal
  soft: string; // texte secondaire
  line: string; // filets et contours
  card: string; // fond des cartes
  mark: string; // surlignage du titre
  accent: string; // liens, détails
  band: string; // fond de la carte alerte
  bandInk: string;
  button: string; // fond du bouton
  buttonInk: string;
  hero?: string; // aplat derrière le titre
  heroInk?: string;
  badge: string; // pastille de catégorie
  badgeInk: string;
};

const THEMES: Theme[] = [
  {
    key: 'actuel', name: 'Aujourd’hui', pitch: 'Blanc froid, gris, noir, un jaune pâle.',
    page: '#F8FAFC', ink: '#18181B', soft: '#71717A', line: '#E4E4E7', card: '#FFFFFF', mark: '#F4E7B5', accent: '#18181B',
    band: '#F4E7B5', bandInk: '#18181B', button: '#18181B', buttonInk: '#FFFFFF', badge: '#FFFFFF', badgeInk: '#18181B',
  },
  {
    key: 'a', name: 'A · Réchauffé', pitch: 'Le même site, en plus chaud : fond crème, jaune franc, textes bruns.',
    page: '#FBF5E9', ink: '#211C15', soft: '#74695A', line: '#E9DFCB', card: '#FFFFFF', mark: '#F6CF4E', accent: '#211C15',
    band: '#F6CF4E', bandInk: '#211C15', button: '#211C15', buttonInk: '#FFFFFF', badge: '#FFFFFF', badgeInk: '#211C15',
  },
  {
    key: 'b', name: 'B · Une couleur d’accent', pitch: 'Fond crème et une touche terracotta sur les liens, les pastilles et le bouton.',
    page: '#FBF7F0', ink: '#1F1B18', soft: '#756B62', line: '#EADFD2', card: '#FFFFFF', mark: '#F6D56A', accent: '#C4512F',
    band: '#F6D56A', bandInk: '#1F1B18', button: '#C4512F', buttonInk: '#FFFFFF', badge: '#C4512F', badgeInk: '#FFFFFF',
  },
  {
    key: 'c', name: 'C · Des aplats', pitch: 'Des blocs de couleur entiers : titre sur vert sapin, alerte en terracotta.',
    page: '#F7F1E3', ink: '#17251F', soft: '#5F6B62', line: '#E3DAC4', card: '#FFFFFF', mark: '#F6CF4E', accent: '#1F4A3C',
    band: '#D9623B', bandInk: '#FFFFFF', button: '#F6CF4E', buttonInk: '#17251F', hero: '#1F4A3C', heroInk: '#FBF5E9', badge: '#F6CF4E', badgeInk: '#17251F',
  },
];

interface L {
  id: string;
  title: string;
  city: string | null;
  price: number;
  surface_sqm: number | null;
  cover_image_url: string | null;
  atypic_category: string | null;
  atypic_tags: string[] | null;
  source_agency: string;
}

async function getListing(): Promise<L | null> {
  try {
    const { data } = await getSupabase()
      .from('listings')
      .select('id,title,city,price,surface_sqm,cover_image_url,atypic_category,atypic_tags,source_agency')
      .eq('is_active', true)
      .not('cover_image_url', 'is', null)
      .limit(1);
    return ((data as L[]) || [])[0] || null;
  } catch {
    return null;
  }
}

const eur = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n).replace(/[  ]/g, ' ');

function Mock({ t, l }: { t: Theme; l: L | null }) {
  const heroInk = t.heroInk || t.ink;
  return (
    <div className="overflow-hidden rounded-[20px] border" style={{ background: t.page, color: t.ink, borderColor: t.line }}>
      {/* En-tête */}
      <div className="flex h-14 items-center justify-between border-b px-5" style={{ background: t.card, borderColor: t.line }}>
        <span className="font-logo text-xl font-semibold lowercase leading-none tracking-tight">loftissime.</span>
        <span className="flex flex-col gap-[5px]" aria-hidden="true">
          <span className="block h-[2px] w-5" style={{ background: t.ink }} />
          <span className="block h-[2px] w-5" style={{ background: t.ink }} />
          <span className="block h-[2px] w-5" style={{ background: t.ink }} />
        </span>
      </div>

      {/* Titre */}
      <div className="px-5 pb-7 pt-8 text-center" style={{ background: t.hero, color: heroInk }}>
        <p className="font-serif text-[1.7rem] leading-[1.12] tracking-tight [text-wrap:balance]">
          Tous les biens atypiques des meilleures agences,{' '}
          <span
            className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
            style={t.hero ? { color: t.mark } : { background: `linear-gradient(transparent 62%, ${t.mark} 62%)` }}
          >
            réunis sur un seul site
          </span>
          .
        </p>
        <div className="mt-6 flex h-12 items-center rounded-full border px-5 text-left text-[15px]" style={{ background: t.card, borderColor: t.line, color: t.soft }}>
          Ville, code postal, arrondissement
        </div>
        <p className="mt-3 text-right text-sm font-medium underline underline-offset-4" style={{ color: t.hero ? heroInk : t.accent }}>
          Créer mon alerte
        </p>
      </div>

      {/* Une annonce */}
      <div className="px-5 pb-5 pt-5">
        <div className="overflow-hidden rounded-[14px] border" style={{ background: t.card, borderColor: t.line }}>
          <div className="relative aspect-[4/3] w-full" style={{ background: t.line }}>
            {l?.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={l.cover_image_url} alt="" className="h-full w-full object-cover" />
            )}
            <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium shadow-sm" style={{ background: t.badge, color: t.badgeInk }}>
              {l?.atypic_category || 'Loft & Atelier'}
            </span>
          </div>
          <div className="p-5">
            <p className="flex items-baseline justify-between gap-3">
              <span className="text-xs uppercase tracking-wider" style={{ color: t.soft }}>
                {l?.city || 'Paris 16e'}
                {l?.surface_sqm ? ` · ${Math.round(Number(l.surface_sqm))} m²` : ''}
              </span>
              <span className="whitespace-nowrap font-sans text-lg font-medium tabular-nums">{eur(Number(l?.price || 1250000))}</span>
            </p>
            <p className="mt-2 font-serif text-xl leading-tight line-clamp-2">{l?.title || 'Atelier d’artiste en triplex'}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {(l?.atypic_tags || ['Atelier d’artiste', 'Triplex']).slice(0, 2).map((tag) => (
                <li key={tag} className="rounded-full border px-3 py-1 text-[13px] leading-tight" style={{ borderColor: t.key === 'b' ? t.accent : t.line, color: t.key === 'b' ? t.accent : t.ink }}>
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-end justify-between gap-3">
              <span className="text-[11px] leading-snug" style={{ color: t.soft }}>{agencyLine(l?.source_agency || 'Exemple')}</span>
              <span className="flex-none text-[15px] font-medium underline underline-offset-4" style={{ color: t.accent }}>Voir le bien ↗</span>
            </p>
          </div>
        </div>

        {/* Carte alerte */}
        <div className="mt-5 flex items-center justify-between gap-4 rounded-[14px] px-5 py-4" style={{ background: t.band, color: t.bandInk }}>
          <div>
            <p className="font-serif text-xl leading-tight">Créer une alerte</p>
            <p className="mt-0.5 text-sm leading-snug opacity-90">Soyez prévenu dès qu’un bien paraît.</p>
          </div>
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full text-lg" style={{ background: t.key === 'c' ? '#FFFFFF' : t.ink, color: t.key === 'c' ? t.ink : '#FFFFFF' }} aria-hidden="true">
            →
          </span>
        </div>

        {/* Bouton */}
        <div className="mt-5 flex h-12 items-center justify-center rounded-full text-[15px] font-medium" style={{ background: t.button, color: t.buttonInk }}>
          Être recontacté(e)
        </div>
      </div>
    </div>
  );
}

export default async function PepsPreview() {
  const l = await getListing();
  return (
    <main className="min-h-screen bg-white px-5 py-10 font-sans text-stone-900">
      <div className="mx-auto max-w-[100rem]">
        <h1 className="font-serif text-3xl tracking-tight md:text-4xl">Plus de peps : trois pistes</h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Le haut de l’accueil, rejoué dans trois ambiances à côté de l’actuelle. Les textes, les formes et la mise en page ne changent pas : seules les couleurs bougent.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {THEMES.map((t) => (
            <section key={t.key}>
              <h2 className="text-lg font-medium">{t.name}</h2>
              <p className="mb-4 mt-1 min-h-[2.5rem] text-sm leading-snug text-stone-600">{t.pitch}</p>
              <Mock t={t} l={l} />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

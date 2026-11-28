import Link from 'next/link';
import { getSupabase } from '../../../lib/supabase';
import GuideArt from '../../guide/GuideArt';
import EyeDemo, { EyeO } from './Eye';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Aperçu : un site plus décalé · Loftissime',
  robots: { index: false, follow: false },
};

// Page de travail, cachée : six pistes pour donner au site un caractère plus atypique, à juger sur pièces.
// Rien de ce qui est montré ici n'est en place sur le site.

interface L {
  id: string;
  title: string;
  city: string | null;
  price: number;
  surface_sqm: number | null;
  cover_image_url: string | null;
  atypic_category: string | null;
}

async function getListings(): Promise<L[]> {
  try {
    const { data } = await getSupabase()
      .from('listings')
      .select('id,title,city,price,surface_sqm,cover_image_url,atypic_category')
      .eq('is_active', true)
      .not('cover_image_url', 'is', null)
      .order('first_seen_at', { ascending: false })
      .limit(5);
    return (data as L[]) || [];
  } catch {
    return [];
  }
}

const eur = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n).replace(/[  ]/g, ' ');

function Card({ l, wide = false }: { l?: L; wide?: boolean }) {
  return (
    <article className={`rounded-[14px] border border-stone-200 bg-white overflow-hidden ${wide ? 'md:col-span-2' : ''}`}>
      <div className={`${wide ? 'aspect-[3/2] md:aspect-[21/9]' : 'aspect-[4/3]'} bg-stone-200`}>
        {l?.cover_image_url && <img src={l.cover_image_url} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-xs uppercase tracking-wider text-stone-500">
            {l?.city || 'Paris 16e'}{l?.surface_sqm ? ` · ${Math.round(Number(l.surface_sqm))} m²` : ''}
          </span>
          <span className="whitespace-nowrap font-sans text-lg font-medium tabular-nums">{eur(Number(l?.price || 1250000))}</span>
        </div>
        <p className={`mt-2 font-serif leading-tight line-clamp-2 ${wide ? 'text-2xl' : 'text-xl'}`}>{l?.title || 'Atelier d’artiste en triplex'}</p>
      </div>
    </article>
  );
}

// Piste 4 : la photo prend la forme d'une ouverture (arche de verrière, hublot, pente de toit)
function Shaped({ l, shape, label }: { l?: L; shape: 'arche' | 'hublot' | 'pente'; label: string }) {
  const frame =
    shape === 'arche' ? 'aspect-[4/5] rounded-t-[999px] rounded-b-[14px]' :
    shape === 'hublot' ? 'aspect-square rounded-full' :
    'aspect-[4/5] rounded-[14px] [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)]';
  return (
    <article>
      <div className={`${frame} overflow-hidden bg-stone-200`}>
        {l?.cover_image_url && <img src={l.cover_image_url} alt="" className="h-full w-full object-cover" />}
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-stone-500">{label}</p>
      <p className="mt-1 font-serif text-xl leading-tight line-clamp-2">{l?.title || 'Atelier d’artiste en triplex'}</p>
      <p className="mt-1 font-sans text-base font-medium tabular-nums">{eur(Number(l?.price || 1250000))}</p>
    </article>
  );
}

// Piste 5 : une cote, comme sur un plan d'architecte
function Cote({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-stone-900">
        <span className="h-4 w-px bg-stone-900" />
        <span className="h-px flex-1 bg-stone-900" />
        <span className="font-sans text-2xl font-medium tabular-nums whitespace-nowrap">{value}</span>
        <span className="h-px flex-1 bg-stone-900" />
        <span className="h-4 w-px bg-stone-900" />
      </div>
      <p className="mt-2 text-center text-xs uppercase tracking-wider text-stone-500">{label}</p>
    </div>
  );
}

// Un mur et une porte, en guise de filet entre deux parties de page
function Mur() {
  return (
    <svg viewBox="0 0 1200 70" className="w-full h-10 md:h-14" aria-hidden="true">
      <path d="M0 60 H420 M520 60 H1200" fill="none" stroke="#3A2E2A" strokeWidth="5" />
      <path d="M420 60 V10" fill="none" stroke="#3A2E2A" strokeWidth="2" />
      <path d="M420 10 Q520 10 520 60" fill="none" stroke="#3A2E2A" strokeWidth="2" strokeDasharray="6 6" />
      <path d="M760 60 V44 M900 60 V44 M760 52 H900" fill="none" stroke="#3A2E2A" strokeWidth="2" />
    </svg>
  );
}

function Piste({ n, title, children, what }: { n: string; title: string; what: string; children: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 border-t border-stone-200">
      <p className="text-xs uppercase tracking-wider text-stone-500">Piste {n}</p>
      <h2 className="mt-2 font-serif text-3xl md:text-4xl tracking-tight text-stone-900">{title}</h2>
      <p className="mt-3 max-w-2xl text-base text-stone-600">{what}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function DecalePage() {
  const ls = await getListings();
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#3A2E2A] font-sans">
      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-10">
        <p className="text-xs uppercase tracking-wider text-stone-500">Page de travail · non visible du public</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl tracking-tight leading-[1.05] text-stone-900">
          Un site plus décalé, <span className="italic text-stone-500">sans perdre en tenue.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-stone-600">
          Six pistes à juger sur pièces. Elles se cumulent ou se prennent séparément. Le site actuel n’a pas changé.
        </p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2"><Link href="/apercu/decale/pages" className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-[#F6CF4E]">Voir les pistes posées sur de vraies pages →</Link><Link href="/" className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-[#F6CF4E]">Revenir au site →</Link></p>
      </header>

      <Piste n="1" title="L’œil comme personnage" what="Le « o » du logo regarde. Il suit le curseur, cligne quand on ajoute un favori, se ferme sur la page d’erreur. C’est déjà notre icône et notre tee-shirt.">
        <EyeDemo />
        <div className="mt-6 rounded-[14px] border border-stone-200 bg-white px-6 h-16 flex items-center justify-between">
          <span className="font-logo font-semibold lowercase tracking-tight leading-none text-stone-900 text-2xl whitespace-nowrap">
            l<EyeO letter />ftissime.
          </span>
          <span className="hidden sm:flex items-center gap-7 text-sm text-stone-700"><span>Acheter</span><span>État des lieux</span><span>Financement</span></span>
          <span className="text-xs uppercase tracking-wider text-stone-700">Mes favoris</span>
        </div>
        <p className="mt-3 text-sm text-stone-600">L’en-tête du site, avec l’œil à la taille réelle.</p>
      </Piste>

      <Piste n="2" title="Le trait du guide, partout" what="Les dessins jaunes d’État des lieux sont ce que nous avons de plus singulier. Les voici sortis des articles : en haut de l’accueil, dans un écran vide, dans un e-mail.">
        <div className="rounded-[14px] border border-stone-200 bg-white overflow-hidden grid md:grid-cols-[1.1fr_1fr] items-stretch">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="font-serif text-[2rem] md:text-[3.2rem] tracking-tight leading-[1.08] text-stone-900 [text-wrap:balance]">
              Tous les biens atypiques des meilleures agences,{' '}
              <span className="italic [background:linear-gradient(transparent_62%,#F6CF4E_62%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">réunis sur un seul site</span>.
            </p>
            <div className="mt-8 h-14 rounded-full border border-stone-200 bg-[#FCFBF8] px-6 flex items-center text-stone-500">Ville, code postal, quartier…</div>
          </div>
          <div className="bg-[#F6CF4E] flex items-center"><GuideArt art="atelier" fit="meet" className="w-full h-auto" /></div>
        </div>
        <p className="mt-3 text-sm text-stone-600">Le haut de l’accueil : le titre à gauche, un dessin à droite, qui changerait à chaque visite.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[14px] border border-stone-200 bg-white overflow-hidden">
            <GuideArt art="ile" className="w-full h-44" />
            <div className="p-6">
              <p className="font-serif text-2xl text-stone-900">Aucun bien ne correspond, pour l’instant.</p>
              <p className="mt-2 text-sm text-stone-600">Élargissez la recherche, ou soyez prévenu dès qu’un bien paraît.</p>
              <p className="mt-4 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300">Créer mon alerte →</p>
            </div>
          </div>
          <div className="rounded-[14px] border border-stone-200 bg-white overflow-hidden">
            <GuideArt art="phare" className="w-full h-44" />
            <div className="p-6">
              <p className="text-xs uppercase tracking-wider text-stone-500">E-mail d’alerte</p>
              <p className="mt-2 font-serif text-2xl text-stone-900">Deux biens viennent de paraître.</p>
              <p className="mt-2 text-sm text-stone-600">Ils correspondent à votre recherche : atelier d’artiste, Paris 16e.</p>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-stone-600">Un écran vide et un e-mail, avec le même trait.</p>
      </Piste>

      <Piste n="3" title="Une grille qui sort du rang" what="Dans la liste, une carte de temps en temps casse le rythme : une annonce en grand format, ou une histoire de la rubrique Insolite sur fond jaune. Aucune annonce n’est mise en avant contre paiement : c’est la place dans la liste qui décide, pas l’agence.">
        <div className="grid gap-6 md:grid-cols-3">
          <Card l={ls[0]} />
          <Card l={ls[1]} />
          <article className="rounded-[14px] bg-[#F6CF4E] overflow-hidden flex flex-col">
            <GuideArt art="avion" className="w-full aspect-[4/3]" />
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs uppercase tracking-wider text-stone-900">Insolite</span>
              <p className="mt-2 font-serif text-xl leading-tight text-stone-900">Il a posé un avion de ligne dans les bois, et il y vit</p>
              <p className="mt-auto pt-4 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-900/40">Lire l’histoire →</p>
            </div>
          </article>
          <Card l={ls[2]} wide />
          <Card l={ls[3]} />
          <article className="rounded-[14px] border border-stone-900 bg-[#3A2E2A] text-white p-7 flex flex-col justify-between min-h-[240px]">
            <EyeO size={56} ink="#F6CF4E" iris="#3A2E2A" />
            <p className="font-serif text-2xl leading-tight">Pour ceux qui ne veulent pas habiter comme tout le monde.</p>
          </article>
          <Card l={ls[4]} />
          <Card l={ls[0]} />
        </div>
        <p className="mt-3 text-sm text-stone-600">Les photos sont celles d’annonces du site, reprises ici pour l’exemple.</p>
      </Piste>

      <Piste n="4" title="Des fenêtres à la place des cadres" what="La photo prend la forme d’une ouverture : l’arche d’une verrière pour un atelier, un hublot pour une péniche, la pente d’un toit pour un dernier étage. Chaque famille de biens a la sienne.">
        <div className="grid gap-8 sm:grid-cols-3 items-end">
          <Shaped l={ls[0]} shape="arche" label="Loft & Atelier" />
          <Shaped l={ls[1]} shape="hublot" label="Péniche" />
          <Shaped l={ls[2]} shape="pente" label="Rooftop & Vue" />
        </div>
        <p className="mt-6 text-sm text-stone-600">À réserver à quelques endroits : les pages de catégorie, le haut d’une fiche. Sur toute la liste, ce serait trop, et la photo de l’agence serait rognée.</p>
      </Piste>

      <Piste n="5" title="Les cotes d’un plan" what="Les chiffres d’un bien s’affichent comme sur un plan d’architecte, entre deux traits. Et les parties de page se séparent par un mur et une porte, plutôt que par un filet gris.">
        <div className="rounded-[14px] border border-stone-200 bg-white p-8 md:p-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <Cote value="110 m²" label="Surface" />
            <Cote value="4,20 m" label="Hauteur sous plafond" />
            <Cote value="3 niveaux" label="Triplex" />
          </div>
        </div>
        <p className="mt-3 text-sm text-stone-600">Le bloc de caractéristiques d’une fiche.</p>
        <div className="mt-10"><Mur /></div>
        <p className="mt-3 text-sm text-stone-600">Un séparateur de page : un mur, une porte, une fenêtre.</p>
      </Piste>

      <Piste n="6" title="Des mots qui jouent" what="La typographie fait un pas de côté, une seule fois par page : un mot qui penche, des « o » qui regardent dans les noms de catégories.">
        <div className="rounded-[14px] border border-stone-200 bg-white p-8 md:p-12">
          <p className="font-serif text-[2rem] md:text-[3.4rem] tracking-tight leading-[1.1] text-stone-900 text-center [text-wrap:balance]">
            Tous les biens{' '}
            <span className="inline-block italic -rotate-6 translate-y-[0.06em] [background:linear-gradient(transparent_62%,#F6CF4E_62%)] px-[0.08em]">atypiques</span>{' '}
            des meilleures agences, réunis sur un seul site.
          </p>
        </div>
        <p className="mt-3 text-sm text-stone-600">Le titre de l’accueil : un seul mot sort du rang, celui qui le dit.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ['L', 1, 'ft & Atelier'],
            ['R', 2, 'ftop & Vue'],
            ['Bateau & Pénich', 0, 'e'],
          ].map(([before, eyes, after]) => (
            <div key={String(before)} className="rounded-[14px] border border-stone-200 bg-white p-8 min-h-[150px] flex items-center justify-center">
              <span className="font-logo font-semibold tracking-tight text-3xl md:text-4xl text-stone-900 whitespace-nowrap">
                {before}
                {Array.from({ length: Number(eyes) }, (_, i) => <EyeO key={i} letter />)}
                {after}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-stone-600">Les noms de catégories : chaque « o » devient un œil. « Rooftop » en a deux, et vous regarde. Là où il n’y a pas de « o », rien ne change.</p>
      </Piste>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-stone-200">
        <p className="text-sm text-stone-600">Dites lesquelles vous retenez : elles seront alors mises en place sur le site, une par une.</p>
      </footer>
    </div>
  );
}

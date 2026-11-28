import Link from 'next/link';
import { getSupabase } from '../../../../lib/supabase';
import GuideArt from '../../../guide/GuideArt';
import { EyeO } from '../Eye';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Aperçu : les pistes appliquées aux pages · Loftissime',
  robots: { index: false, follow: false },
};

// Page de travail, cachée : les pistes de /apercu/decale appliquées à de vraies pages (accueil en deux dosages, fiche).
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
      .limit(6);
    return (data as L[]) || [];
  } catch {
    return [];
  }
}

const eur = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n).replace(/[  ]/g, ' ');
const HL = '[background:linear-gradient(transparent_62%,#F6CF4E_62%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]';

function Logo() {
  return (
    <span className="font-logo font-semibold lowercase tracking-tight leading-none text-stone-900 text-2xl whitespace-nowrap">
      l<EyeO letter />ftissime.
    </span>
  );
}

function Header() {
  return (
    <div className="h-16 px-6 flex items-center justify-between border-b border-stone-200 bg-white">
      <div className="flex items-center gap-10">
        <Logo />
        <span className="hidden md:flex items-center gap-7 text-sm text-stone-700"><span>Acheter</span><span>État des lieux</span><span>Financement</span></span>
      </div>
      <span className="text-xs uppercase tracking-wider text-stone-700">Mes favoris</span>
    </div>
  );
}

function SearchBar({ center = true }: { center?: boolean }) {
  return (
    <div className={`flex gap-2 max-w-2xl ${center ? 'mx-auto' : ''}`}>
      <div className="flex-1 h-14 rounded-full border border-stone-200 bg-white px-6 flex items-center text-stone-500">Ville, code postal, quartier…</div>
      <div className="h-14 w-14 rounded-full border border-stone-200 bg-white" />
    </div>
  );
}

// Trait de cote, comme sur un plan
function Cote({ value, small = false }: { value: string; small?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-stone-900">
      <span className="h-3 w-px bg-stone-900" />
      <span className="h-px flex-1 bg-stone-900" />
      <span className={`font-sans font-medium tabular-nums whitespace-nowrap ${small ? 'text-sm' : 'text-lg md:text-xl'}`}>{value}</span>
      <span className="h-px flex-1 bg-stone-900" />
      <span className="h-3 w-px bg-stone-900" />
    </span>
  );
}

function Mur() {
  return (
    <svg viewBox="0 0 1200 70" className="w-full h-10 md:h-12" aria-hidden="true">
      <path d="M0 60 H420 M520 60 H1200" fill="none" stroke="#3A2E2A" strokeWidth="5" />
      <path d="M420 60 V10" fill="none" stroke="#3A2E2A" strokeWidth="2" />
      <path d="M420 10 Q520 10 520 60" fill="none" stroke="#3A2E2A" strokeWidth="2" strokeDasharray="6 6" />
      <path d="M760 60 V44 M900 60 V44 M760 52 H900" fill="none" stroke="#3A2E2A" strokeWidth="2" />
    </svg>
  );
}

function Card({ l, wide = false, cote = false }: { l?: L; wide?: boolean; cote?: boolean }) {
  const surface = l?.surface_sqm ? `${Math.round(Number(l.surface_sqm))} m²` : '110 m²';
  return (
    <article className={`rounded-[14px] border border-stone-200 bg-white overflow-hidden ${wide ? 'md:col-span-2' : ''}`}>
      <div className={`${wide ? 'aspect-[3/2] md:aspect-[21/9]' : 'aspect-[4/3]'} bg-stone-200`}>
        {l?.cover_image_url && <img src={l.cover_image_url} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-xs uppercase tracking-wider text-stone-500">{l?.city || 'Paris 16e'}{cote ? '' : ` · ${surface}`}</span>
          <span className="whitespace-nowrap font-sans text-lg font-medium tabular-nums">{eur(Number(l?.price || 1250000))}</span>
        </div>
        <p className={`mt-2 font-serif leading-tight line-clamp-2 ${wide ? 'text-2xl' : 'text-xl'}`}>{l?.title || 'Atelier d’artiste en triplex'}</p>
        {cote && <div className="mt-4"><Cote value={surface} small /></div>}
      </div>
    </article>
  );
}

function Categories() {
  const cats: [string, number, string][] = [['L', 1, 'ft & Atelier'], ['R', 2, 'ftop & Vue'], ['Bateau & Péniche', 0, ''], ['Biens de caractère', 0, '']];
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {cats.map(([a, n, b]) => (
        <span key={a} className="h-12 px-5 inline-flex items-center rounded-full border border-stone-300 bg-white font-logo font-semibold tracking-tight text-lg text-stone-900 whitespace-nowrap">
          {a}{Array.from({ length: n }, (_, i) => <EyeO key={i} letter />)}{b}
        </span>
      ))}
    </div>
  );
}

function Frame({ label, title, what, children }: { label: string; title: string; what: string; children: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 border-t border-stone-200">
      <p className="text-xs uppercase tracking-wider text-stone-500">{label}</p>
      <h2 className="mt-2 font-serif text-3xl md:text-4xl tracking-tight text-stone-900">{title}</h2>
      <p className="mt-3 max-w-2xl text-base text-stone-600">{what}</p>
      <div className="mt-8 rounded-[14px] border border-stone-300 overflow-hidden bg-[#FCFBF8] shadow-[0_2px_12px_rgba(28,25,23,0.08)]">{children}</div>
    </section>
  );
}

export default async function DecalePagesPage() {
  const ls = await getListings();
  return (
    <div className="min-h-screen bg-[#F3ECDD] text-[#3A2E2A] font-sans">
      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-10">
        <p className="text-xs uppercase tracking-wider text-stone-500">Page de travail · non visible du public</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl tracking-tight leading-[1.05] text-stone-900">
          Les pistes, <span className="italic text-stone-500">posées sur de vraies pages.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-stone-600">
          L’accueil en deux dosages, puis une fiche. Chaque cadre montre une page entière, telle qu’elle pourrait être.
        </p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/apercu/decale" className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-[#F6CF4E]">Revoir les six pistes une à une →</Link>
          <Link href="/" className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-[#F6CF4E]">Revenir au site →</Link>
        </p>
      </header>

      <Frame label="Aperçu A" title="Accueil, dosage doux" what="Le site d’aujourd’hui, avec trois touches : l’œil dans le logo et dans les catégories, la surface en trait de cote sur les cartes, un mur en guise de séparateur.">
        <Header />
        <div className="px-6 pt-12 pb-8 text-center">
          <p className="font-serif text-[2rem] md:text-[3.6rem] tracking-tight leading-[1.1] text-stone-900 max-w-4xl mx-auto [text-wrap:balance]">
            Tous les biens atypiques des meilleures agences, <span className={`italic ${HL}`}>réunis sur un seul site</span>.
          </p>
          <div className="mt-8"><SearchBar /></div>
          <div className="mt-6"><Categories /></div>
        </div>
        <div className="px-6 pb-10 grid gap-6 md:grid-cols-3">
          <Card l={ls[0]} cote /><Card l={ls[1]} cote /><Card l={ls[2]} cote />
        </div>
        <div className="px-6"><Mur /></div>
        <div className="px-6 py-10">
          <p className="font-serif text-2xl md:text-3xl text-stone-900">État des lieux</p>
          <p className="mt-2 text-sm text-stone-600">Acheter un bien atypique, en connaissance de cause.</p>
        </div>
      </Frame>

      <Frame label="Aperçu B" title="Accueil, dosage franc" what="Tout ce qui précède, plus : un dessin en haut de page, le mot « atypiques » qui penche, et une liste où une histoire Insolite et une carte en grand format cassent le rythme.">
        <Header />
        <div className="grid md:grid-cols-[1.15fr_1fr] items-stretch bg-white border-b border-stone-200">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="font-serif text-[2rem] md:text-[3.3rem] tracking-tight leading-[1.1] text-stone-900 [text-wrap:balance]">
              Tous les biens{' '}
              <span className="inline-block italic -rotate-6 translate-y-[0.06em] px-[0.08em] [background:linear-gradient(transparent_62%,#F6CF4E_62%)]">atypiques</span>{' '}
              des meilleures agences, réunis sur un seul site.
            </p>
            <div className="mt-8"><SearchBar center={false} /></div>
          </div>
          <div className="bg-[#F6CF4E] flex items-center"><GuideArt art="loft" fit="meet" className="w-full h-auto" /></div>
        </div>
        <div className="px-6 pt-8"><Categories /></div>
        <div className="px-6 py-10 grid gap-6 md:grid-cols-3">
          <Card l={ls[0]} cote />
          <Card l={ls[1]} cote />
          <article className="rounded-[14px] bg-[#F6CF4E] overflow-hidden flex flex-col">
            <GuideArt art="phare" className="w-full aspect-[4/3]" />
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs uppercase tracking-wider text-stone-900">Insolite</span>
              <p className="mt-2 font-serif text-xl leading-tight text-stone-900">Cordouan, le dernier phare habité de France</p>
              <p className="mt-auto pt-4 text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-900/40">Lire l’histoire →</p>
            </div>
          </article>
          <Card l={ls[2]} wide cote />
          <article className="rounded-[14px] bg-[#3A2E2A] text-white p-7 flex flex-col justify-between min-h-[240px]">
            <EyeO size={56} ink="#F6CF4E" iris="#3A2E2A" />
            <p className="font-serif text-2xl leading-tight">Pour ceux qui ne veulent pas habiter comme tout le monde.</p>
          </article>
          <Card l={ls[3]} cote /><Card l={ls[4]} cote /><Card l={ls[5]} cote />
        </div>
      </Frame>

      <Frame label="Aperçu C" title="Une fiche de bien" what="La photo principale prend la forme d’une verrière, les chiffres s’affichent en cotes, un mur sépare la description du reste. Le bloc de contact ne change pas.">
        <Header />
        <div className="px-6 py-8 md:py-10 grid gap-8 md:grid-cols-[1.4fr_1fr] items-start">
          <div>
            <p className="text-sm text-stone-600">← Retour à la liste</p>
            <div className="mt-5 aspect-[4/3] rounded-t-[999px] rounded-b-[14px] overflow-hidden bg-stone-200">
              {ls[0]?.cover_image_url && <img src={ls[0].cover_image_url} alt="" className="h-full w-full object-cover" />}
            </div>
            <p className="mt-6 text-xs uppercase tracking-wider text-stone-500">{ls[0]?.city || 'Paris 16e'} · L<EyeO letter />ft &amp; Atelier</p>
            <p className="mt-2 font-serif text-3xl md:text-4xl tracking-tight leading-tight text-stone-900">{ls[0]?.title || 'Atelier d’artiste en triplex, Trocadéro'}</p>
            <div className="mt-8 rounded-[14px] border border-stone-200 bg-white p-6 grid gap-6 lg:grid-cols-3">
              <div><Cote value={ls[0]?.surface_sqm ? `${Math.round(Number(ls[0].surface_sqm))} m²` : '110 m²'} /><p className="mt-2 text-center text-xs uppercase tracking-wider text-stone-500">Surface</p></div>
              <div><Cote value="4,20 m" /><p className="mt-2 text-center text-xs uppercase tracking-wider text-stone-500">Sous plafond</p></div>
              <div><Cote value="3 niveaux" /><p className="mt-2 text-center text-xs uppercase tracking-wider text-stone-500">Triplex</p></div>
            </div>
            <div className="mt-8"><Mur /></div>
            <p className="mt-6 text-base leading-relaxed text-stone-700 max-w-xl">Ici, la description rédigée par l’agence, inchangée. Les valeurs « 4,20 m » et « 3 niveaux » sont des exemples, pour montrer le dessin des cotes.</p>
          </div>
          <div className="rounded-[14px] border border-stone-200 bg-white p-6 shadow-[0_2px_12px_rgba(28,25,23,0.08)]">
            <p className="font-sans text-3xl font-medium tabular-nums">{eur(Number(ls[0]?.price || 1250000))}</p>
            <p className="mt-6 text-sm font-medium text-stone-900">Nom *</p>
            <div className="mt-1.5 h-12 rounded-[10px] border border-stone-300" />
            <p className="mt-4 text-sm font-medium text-stone-900">E-mail *</p>
            <div className="mt-1.5 h-12 rounded-[10px] border border-stone-300" />
            <div className="mt-6 h-12 rounded-full bg-stone-900 text-white text-[15px] font-medium flex items-center justify-center">Être recontacté(e)</div>
          </div>
        </div>
      </Frame>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-stone-200">
        <p className="text-sm text-stone-600">Les photos sont celles d’annonces du site, reprises ici pour l’exemple. Rien n’est en place tant que vous ne l’avez pas décidé.</p>
      </footer>
    </div>
  );
}

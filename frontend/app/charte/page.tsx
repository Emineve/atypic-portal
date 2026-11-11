import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '../Logo';

export const metadata = {
  title: 'La charte Loftissime',
  description:
    'La charte Loftissime : les biens atypiques que nous diffusons, ceux que nous ne diffusons pas, et notre fonctionnement avec les agences.',
  alternates: { canonical: '/charte' },
};

const weDo = [
  'Nous référençons vos biens atypiques, sélectionnés selon la charte Loftissime.',
  'Chaque annonce affiche le nom de votre agence, celui du négociateur en charge du bien et son numéro de téléphone.',
  'Les acheteurs contactent directement le négociateur ou lui demandent d’être rappelés.',
  'Chaque annonce renvoie vers celle de votre site, qui reste la référence.',
  'Nous retirons un bien dès qu’il est vendu, ou sur simple demande de votre part.',
];

const weDont = [
  'Nous ne sommes pas une agence : nous ne prenons aucun mandat et n’intervenons dans aucune transaction.',
  'Nous ne contactons jamais les vendeurs ni les acheteurs.',
  'Nous ne communiquons jamais l’adresse d’un bien (que nous ne connaissons d’ailleurs pas).',
];

const doors = [
  {
    n: '1',
    title: 'Une origine singulière',
    text: 'Le lieu a eu une autre vie avant d’être habité : loft, atelier d’artiste, ancienne usine, entrepôt, imprimerie, chapelle, presbytère, moulin, grange, chai, écurie, bergerie, péniche, maison troglodyte.',
  },
  {
    n: '2',
    title: 'Une signature',
    text: 'Le lieu a été conçu ou transformé avec un parti pris fort : maison ou villa d’architecte, appartement repensé par un architecte, construction marquante de son époque. La signature peut aussi être celle d’un propriétaire qui a aménagé son lieu avec une vraie personnalité.',
  },
  {
    n: '3',
    title: 'Un caractère rare',
    text: 'Le lieu se distingue par son volume (grande hauteur sous plafond, verrière, duplex, triplex, souplex), par sa situation (dernier étage, toit-terrasse, terrasse, vue dégagée, jardin en ville, bord de l’eau) ou par son histoire (hôtel particulier, château, manoir, maison de maître, bastide, mas, longère, chaumière, et tout bien ancien qui a su garder son caractère).',
  },
];

export default function ChartePage() {
  const h3 = 'font-serif text-xl text-stone-900';
  const p = 'mt-2 text-sm text-stone-600 leading-relaxed';
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les biens
          </Link>
        </div>
      </nav>

      <header className="max-w-3xl mx-auto px-6 pt-16 md:pt-20 pb-12 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">On diffuse, ou on ne diffuse pas</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">La charte Loftissime</h1>
      </header>

      <section className="bg-white border-y border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl text-stone-900 text-center">Les biens que nous diffusons</h2>
          <div className="mt-10 space-y-8">
            {doors.map((d) => (
              <div key={d.n} className="flex gap-5">
                <div className="shrink-0 h-10 w-10 rounded-full border border-stone-900 flex items-center justify-center font-serif text-lg">{d.n}</div>
                <div>
                  <h3 className={h3}>{d.title}</h3>
                  <p className={p}>{d.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 space-y-8 border-t border-stone-200 pt-10">
            <div>
              <h3 className={h3}>Le prix n&apos;est pas un critère</h3>
              <p className={p}>
                Le prix d&apos;un bien n&apos;entre pas en compte dans la sélection. Seul son caractère atypique compte.
              </p>
            </div>
            <div>
              <h3 className={h3}>Ce que nous ne diffusons pas</h3>
              <p className={p}>Tous les logements qui n&apos;entrent pas dans la charte des biens atypiques.</p>
            </div>
            <div>
              <h3 className={h3}>Des biens réellement à vendre</h3>
              <p className={p}>Tous les biens proposés sont en cours de commercialisation.</p>
            </div>
            <div>
              <h3 className={h3}>Notre engagement</h3>
              <p className={p}>
                La charte s&apos;applique de la même façon à toutes les agences. Un bien qui n&apos;y répond pas n&apos;est pas diffusé.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl text-stone-900 text-center">Notre fonctionnement</h2>
        <p className="mt-3 text-center text-stone-500 max-w-2xl mx-auto">
          Une position neutre, et un seul objectif : faciliter la mise en relation entre les acheteurs et les négociateurs.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-stone-200 bg-white p-8">
            <h3 className={h3}>Ce que nous faisons</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 leading-relaxed">
              {weDo.map((it) => (
                <li key={it} className="flex gap-2"><span aria-hidden="true">·</span><span>{it}</span></li>
              ))}
            </ul>
          </div>
          <div className="border border-stone-200 bg-white p-8">
            <h3 className={h3}>Ce que nous ne faisons pas</h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 leading-relaxed">
              {weDont.map((it) => (
                <li key={it} className="flex gap-2"><span aria-hidden="true">·</span><span>{it}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/pro"
            className="inline-flex h-12 items-center px-8 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
          >
            Vous êtes une agence ? Diffuser mes annonces
          </Link>
        </div>
      </section>
    </div>
  );
}

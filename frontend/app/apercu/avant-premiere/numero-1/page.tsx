import Link from 'next/link';
import SiteHeader from '../../../SiteHeader';
import GuideArt from '../../../guide/GuideArt';
import { GUIDE_ARTICLES } from '../../../../lib/guide';

export const metadata = {
  title: 'Brouillon : Avant-première n° 1 · Loftissime',
  robots: { index: false, follow: false },
};

// Brouillon du premier numéro de la lettre « Avant-première ». Page cachée, rien n'a été envoyé.
// Les quatre biens sont réels, relevés le 23 novembre 2026 sur le site de chaque agence :
// la phrase est la nôtre, le lien mène à l'annonce de l'agence, aucune photo n'est reprise.
// L'ouverture attend la vidéo et le bien en avant-première.

const BIENS: { mesure: string; quoi: string; ville: string; surface: string; phrase: string; prix: string; agence: string; href: string }[] = [
  {
    mesure: '4,47 m',
    quoi: 'sous plafond',
    ville: 'Paris 4e · Saint-Merri',
    surface: '98 m² et un souplex de 55 m²',
    phrase: 'Le rez-de-chaussée d’un hôtel particulier du XVIIIe siècle, sur cour pavée, prolongé par un souplex voûté.',
    prix: '1 200 000 €',
    agence: 'Les Enfants Rouges',
    href: 'https://www.agencedesenfantsrouges.com/paris-iv-st-merri-appartement-en-rdc-sur-cour-charmante-et-souplex-aux-volumes-exceptionnels/',
  },
  {
    mesure: '166 m²',
    quoi: 'sous verrière',
    ville: 'Le Bourget',
    surface: '500 m²',
    phrase: 'Un ancien garage automobile devenu loft : une nef centrale sous verrière zénithale, 226 m² de terrasses, six chambres.',
    prix: '1 980 000 €',
    agence: 'Architectures Immobilier',
    href: 'https://www.architectures-immobilier.com/fiches/46_59707271/architecture-transformee-1968-2000-15-min-du-centre-de-paris.html',
  },
  {
    mesure: '4 m',
    quoi: 'sous plafond, au dernier étage',
    ville: 'Paris 18e · Abbesses',
    surface: '50 m²',
    phrase: 'Un atelier d’artiste à rénover, avec sa grande verrière sur rue et une mezzanine.',
    prix: '640 000 €',
    agence: 'Immopolis',
    href: 'https://www.immopolis.fr/annonce/87165028-fr/',
  },
  {
    mesure: '18,5 m²',
    quoi: 'de terrasse sur cour',
    ville: 'Paris 11e · canal Saint-Martin',
    surface: '92 m²',
    phrase: 'Un duplex dans une ancienne fabrique de cravates réhabilitée, deux chambres.',
    prix: '1 295 000 €',
    agence: 'Les Enfants Rouges',
    href: 'https://www.agencedesenfantsrouges.com/paris-11eme-duplex-dexception-ancienne-fabrique-rehabilitee-commercialite/',
  },
];

const CAPS = 'text-[11px] uppercase tracking-widest text-stone-500';
const SERIF = 'font-serif text-stone-900';

export default function Numero1() {
  const guide = GUIDE_ARTICLES.find((a) => /souplex/.test(a.slug)) || GUIDE_ARTICLES.find((a) => a.category === 'Types de biens');
  const insolite = GUIDE_ARTICLES.find((a) => a.category === 'Insolite');
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />
      <p className="bg-stone-900 px-6 py-2 text-center text-xs tracking-wide text-[#FBF5E9]">
        Brouillon à valider : rien n’a été envoyé. Les quatre biens sont réels, l’ouverture attend la vidéo.
      </p>

      <main className="max-w-2xl mx-auto px-6 py-10 md:py-14">
        <div className="overflow-hidden rounded-[14px] border border-stone-300 bg-white">
          <div className="border-b border-stone-200 bg-stone-50 px-6 py-3">
            <p className="text-[13px] font-semibold text-stone-900">Avant-première, par Loftissime</p>
            <p className="text-[13px] text-stone-900">4,47 m sous plafond, et un bien que personne n’a vu</p>
            <p className="truncate text-[13px] text-stone-500">La visite de la semaine, puis quatre biens repérés en Île-de-France.</p>
          </div>

          {/* L'ouverture : la vidéo, à venir */}
          <div className="bg-[#211C15] px-6 py-8 text-[#FBF5E9] md:px-10">
            <div className="flex items-baseline justify-between">
              <span className="font-logo font-semibold lowercase tracking-tight text-lg leading-none">loftissime.</span>
              <span className="text-[11px] uppercase tracking-widest text-stone-400">N° 1 · jeudi 26 novembre</span>
            </div>
            <p className="mt-8 font-serif text-5xl md:text-6xl italic leading-none">Avant-première</p>
            <div className="mt-3 flex items-center gap-1"><span className="h-3 w-px bg-stone-400" /><span className="h-px flex-1 bg-stone-400" /><span className="h-3 w-px bg-stone-400" /></div>
            <p className="mt-3 text-[11px] uppercase tracking-widest text-stone-400">Un bien que vous ne trouverez pas encore en ligne</p>
            <p className="mt-1 text-[11px] uppercase tracking-widest text-stone-400">Cette semaine avec <span className="text-[#FBF5E9]">l’agence invitée</span> · une seule par numéro</p>
            <div className="mt-6 flex aspect-video flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed border-stone-500">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FBF5E9]"><span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-[#FBF5E9]" /></span>
              <span className="text-[11px] uppercase tracking-widest text-stone-400">La vidéo vient ici</span>
            </div>
            <p className="mt-6 font-serif text-3xl leading-[1.1] text-stone-400">La mesure du bien, <span className="italic">sa ville, son prix.</span></p>
            <p className="mt-2 text-[13px] leading-relaxed text-stone-400">À compléter avec le bien filmé : une mesure en titre, deux lignes, la date de mise en ligne, le nom de l’agence invitée, le bouton « Regarder la visite ».</p>
          </div>

          <div className="bg-[#FBF5E9] px-6 pb-8 md:px-10">
            {/* Repérés cette semaine */}
            <p className={`pt-7 ${CAPS}`}>Déjà en ligne · repérés cette semaine en Île-de-France</p>
            <ol className="mt-3 border-t border-stone-900">
              {BIENS.map((b, i) => (
                <li key={b.href} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-stone-300 py-6">
                  <span className="pt-2 text-[12px] tabular-nums text-stone-500">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={`text-4xl leading-none lining-nums ${SERIF}`}>
                      {b.mesure} <span className="text-2xl italic text-stone-500">{b.quoi}</span>
                    </p>
                    <p className={`mt-3 ${CAPS}`}>{b.ville} · <span className="normal-case tracking-normal text-stone-900">{b.surface}</span></p>
                    <p className="mt-2 text-[15px] leading-relaxed text-stone-700">{b.phrase}</p>
                    <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className={`text-xl lining-nums ${SERIF}`}>{b.prix}</span>
                      <a href={b.href} target="_blank" rel="noopener nofollow" className="text-[14px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">
                        Voir l’annonce chez {b.agence} ↗
                      </a>
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {guide && (
              <div className="grid grid-cols-[88px_1fr] gap-4 border-b border-stone-300 py-6">
                <div className="overflow-hidden rounded-[8px] border border-stone-900"><GuideArt art={guide.art} className="block aspect-square w-full" /></div>
                <div>
                  <p className={CAPS}>État des lieux · à lire avant de visiter</p>
                  <Link href={`/guide/${guide.slug}`} className={`mt-1 block text-[19px] leading-snug ${SERIF}`}>{guide.title} →</Link>
                </div>
              </div>
            )}
            {insolite && (
              <div className="grid grid-cols-[88px_1fr] gap-4 border-b border-stone-300 py-6">
                <div className="overflow-hidden rounded-[8px] border border-stone-900"><GuideArt art={insolite.art} className="block aspect-square w-full" /></div>
                <div>
                  <p className={CAPS}>Insolite · l’histoire de la semaine</p>
                  <Link href={`/guide/${insolite.slug}`} className={`mt-1 block text-[19px] leading-snug ${SERIF}`}>{insolite.title} →</Link>
                </div>
              </div>
            )}

            <div className="py-6">
              <p className={CAPS}>La question</p>
              <p className={`mt-1 text-[19px] leading-snug ${SERIF}`}>La semaine prochaine, <span className="italic text-stone-500">vous aimeriez voir quoi ?</span></p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Un loft', 'Un atelier', 'Une terrasse', 'Une péniche', 'Surprenez-moi'].map((t) => (
                  <span key={t} className="inline-flex h-9 items-center rounded-full border border-stone-900 px-4 text-[13px] font-medium text-stone-900">{t}</span>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-300 pt-5 text-center text-[11px] leading-relaxed text-stone-500">
              Avant-première, la lettre de Loftissime · Curateur de biens atypiques · loftissime.fr
              <br />
              Les biens « déjà en ligne » sont présentés par leur agence, vers laquelle chaque lien renvoie.
              <br />
              Vous recevez cette lettre parce que vous vous y êtes inscrit. Se désinscrire
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

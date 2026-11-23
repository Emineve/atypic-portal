import SiteHeader from '../../SiteHeader';
import GuideArt from '../../guide/GuideArt';
import { GUIDE_ARTICLES } from '../../../lib/guide';

export const metadata = {
  title: 'Aperçu : Off Market, la lettre · Loftissime',
  robots: { index: false, follow: false },
};

// Page de travail, cachée : « Off Market », la lettre de Loftissime.
// La vidéo d'un bien pas encore en ligne est au centre ; les autres rubriques sont celles du site.
// Biens, prix et objet de mail sont inventés pour la maquette ; les photos sont des emplacements.

const CAPS = 'text-[11px] uppercase tracking-widest text-stone-500';
const SERIF = 'font-serif text-stone-900';
const LINK = 'text-[14px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300';

const REPERES = [
  { ville: 'Paris 11e', m2: 110, titre: 'Loft dans une ancienne imprimerie', prix: '980 000 €' },
  { ville: 'Paris 16e', m2: 124, titre: 'Dernier étage, terrasse plein ciel', prix: '1 890 000 €' },
  { ville: 'Paris 16e', m2: 85, titre: 'Péniche amarrée face au bois', prix: '640 000 €' },
];

function Cote({ m2 }: { m2: number }) {
  return (
    <span className="ml-2 inline-flex items-center gap-1 align-middle text-stone-900 normal-case tracking-normal">
      <span className="h-2 w-px bg-stone-900" /><span className="h-px w-2.5 bg-stone-900" />
      <span className="text-[11px] tabular-nums">{m2} m²</span>
      <span className="h-px w-2.5 bg-stone-900" /><span className="h-2 w-px bg-stone-900" />
    </span>
  );
}

// Une rubrique de la lettre, avec en marge ce qu'elle devient sur le site
function Bloc({ rubrique, site, children }: { rubrique: string; site: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-2 border-t border-stone-300 py-6 md:grid-cols-[1fr_11rem]">
      <div>
        <p className={CAPS}>{rubrique}</p>
        <div className="mt-2">{children}</div>
      </div>
      <p className="text-[12px] leading-snug text-stone-500 md:border-l md:border-stone-300 md:pl-4">
        <span className="block text-[10px] uppercase tracking-widest">Sur le site</span>
        {site}
      </p>
    </div>
  );
}

export default function OffMarketPreview() {
  const insolite = GUIDE_ARTICLES.find((a) => a.category === 'Insolite');
  const guide = GUIDE_ARTICLES.find((a) => a.category === 'Visite et négociation');
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />
      <p className="bg-stone-900 px-6 py-2 text-center text-xs tracking-wide text-[#FBF5E9]">
        Maquette de travail : biens, prix et objet de mail inventés, photos remplacées par des emplacements.
      </p>

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-8 md:pb-10">
        <p className="text-xs uppercase tracking-widest text-stone-500">La lettre de Loftissime</p>
        <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Off Market, <span className="italic text-stone-500">un bien avant tout le monde.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-stone-600 text-base md:text-lg font-light leading-relaxed">
          Au centre, la vidéo d’un bien qui n’est pas encore en ligne. Autour, les rubriques du site. La colonne de droite dit ce que chaque partie devient sur Loftissime.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-24">
        <div className="overflow-hidden rounded-[14px] border border-stone-300 bg-white">
          {/* La ligne de boîte de réception */}
          <div className="border-b border-stone-200 bg-stone-50 px-6 py-3">
            <p className="text-[13px] font-semibold text-stone-900">Off Market, par Loftissime</p>
            <p className="text-[13px] text-stone-900">6 m de hauteur sous plafond, pas encore en ligne</p>
            <p className="truncate text-[13px] text-stone-500">La visite de la semaine, en une minute, avant sa mise en ligne.</p>
          </div>

          {/* L'ouverture : le nom de la lettre et la vidéo, sur fond sombre */}
          <div className="bg-[#211C15] px-6 py-8 text-[#FBF5E9] md:px-10">
            <div className="flex items-baseline justify-between">
              <span className="font-logo font-semibold lowercase tracking-tight text-lg leading-none">loftissime.</span>
              <span className="text-[11px] uppercase tracking-widest text-stone-400">N° 1 · jeudi 26 novembre</span>
            </div>
            <p className="mt-8 font-serif text-5xl md:text-6xl italic leading-none">Off Market</p>
            <div className="mt-3 flex items-center gap-1"><span className="h-3 w-px bg-stone-400" /><span className="h-px flex-1 bg-stone-400" /><span className="h-3 w-px bg-stone-400" /></div>
            <p className="mt-3 text-[11px] uppercase tracking-widest text-stone-400">Un bien que vous ne trouverez pas encore en ligne</p>

            <div className="relative mt-6 flex aspect-video items-center justify-center rounded-[10px] bg-stone-700">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#FBF5E9]"><span className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-[#FBF5E9]" /></span>
              <span className="absolute left-4 top-4 text-[10px] uppercase tracking-widest text-stone-300">La visite</span>
              <span className="absolute bottom-4 right-4 text-[11px] tabular-nums text-stone-300">1:00</span>
            </div>
            <p className="mt-6 font-serif text-4xl leading-[1.05] lining-nums">6 m <span className="italic text-stone-400">de hauteur sous plafond.</span></p>
            <p className="mt-3 text-[11px] uppercase tracking-widest text-stone-400">Paris 14e · 96 m² · atelier d’artiste</p>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-stone-300">Au fond d’une cour pavée, une verrière plein nord et l’établi d’origine. Mise en ligne prévue jeudi prochain.</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="inline-flex h-11 items-center rounded-full bg-[#FBF5E9] px-6 text-[14px] font-medium text-stone-900">Regarder la visite</span>
              <span className="font-serif text-2xl lining-nums">1 250 000 €</span>
            </div>
            <p className="mt-6 border-t border-stone-700 pt-3 text-[12px] leading-snug text-stone-400">
              <span className="uppercase tracking-widest text-[10px]">Sur le site · </span>
              la fiche du bien, avec la vidéo en tête et la mesure en accroche, visible des seuls abonnés jusqu’à sa mise en ligne.
            </p>
          </div>

          {/* Les rubriques, celles du site */}
          <div className="bg-[#FBF5E9] px-6 pb-8 md:px-10">
            <Bloc rubrique="Déjà en ligne · repérés cette semaine" site="Les annonces de la liste, avec la même ligne et le lien vers l’agence.">
              <ul className="divide-y divide-stone-300">
                {REPERES.map((b) => (
                  <li key={b.titre} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span>
                      <span className={`block text-[17px] leading-snug ${SERIF}`}>{b.titre} ↗</span>
                      <span className={CAPS}>{b.ville}<Cote m2={b.m2} /></span>
                    </span>
                    <span className={`flex-none text-[16px] lining-nums ${SERIF}`}>{b.prix}</span>
                  </li>
                ))}
              </ul>
            </Bloc>

            <Bloc rubrique="Carte blanche · un architecte" site="La page Inspiration et la fiche de l’architecte.">
              <div className="grid grid-cols-[96px_1fr] gap-4">
                <div className={`flex aspect-square items-center justify-center rounded-[8px] bg-stone-200 ${CAPS}`}>Photo</div>
                <div>
                  <p className={`text-[19px] leading-snug ${SERIF}`}>Un duplex sous les toits, <span className="italic text-stone-500">sans une seule cloison.</span></p>
                  <p className="mt-1 text-[14px] leading-relaxed text-stone-600">Pourquoi il a supprimé le couloir, et ce que cela change au quotidien.</p>
                </div>
              </div>
            </Bloc>

            {guide && (
              <Bloc rubrique="État des lieux" site="L’article, déjà publié dans la rubrique.">
                <div className="grid grid-cols-[96px_1fr] gap-4">
                  <div className="overflow-hidden rounded-[8px] border border-stone-900"><GuideArt art={guide.art} className="block aspect-square w-full" /></div>
                  <p className={`text-[19px] leading-snug ${SERIF}`}>{guide.title} →</p>
                </div>
              </Bloc>
            )}

            {insolite && (
              <Bloc rubrique="Insolite" site="L’histoire, déjà publiée dans la rubrique.">
                <div className="grid grid-cols-[96px_1fr] gap-4">
                  <div className="overflow-hidden rounded-[8px] border border-stone-900"><GuideArt art={insolite.art} className="block aspect-square w-full" /></div>
                  <p className={`text-[19px] leading-snug ${SERIF}`}>{insolite.title} →</p>
                </div>
              </Bloc>
            )}

            <Bloc rubrique="La question" site="Les critères de l’alerte de l’abonné : la demande à présenter aux agences.">
              <p className={`text-[19px] leading-snug ${SERIF}`}>La semaine prochaine, <span className="italic text-stone-500">vous aimeriez voir quoi ?</span></p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Un loft', 'Un atelier', 'Une terrasse', 'Une péniche', 'Surprenez-moi'].map((t) => (
                  <span key={t} className="inline-flex h-9 items-center rounded-full border border-stone-900 px-4 text-[13px] font-medium text-stone-900">{t}</span>
                ))}
              </div>
            </Bloc>

            <div className="border-t border-stone-300 pt-5 text-center text-[11px] leading-relaxed text-stone-500">
              Off Market, la lettre de Loftissime · Curateur de biens atypiques · loftissime.fr
              <br />
              Vous recevez cette lettre parce que vous vous y êtes inscrit. Se désinscrire
            </div>
          </div>
        </div>
        <p className="mt-6 text-center"><span className={LINK}>Les numéros précédents →</span></p>
      </main>
    </div>
  );
}

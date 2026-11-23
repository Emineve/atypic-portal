import Link from 'next/link';
import SiteHeader from '../../SiteHeader';
import GuideArt, { GuideArtKey } from '../../guide/GuideArt';
import { GUIDE_ARTICLES } from '../../../lib/guide';
import { FIELD } from '../../../lib/form';
import { typo } from '../../../lib/typo';

export const metadata = {
  title: 'Aperçu : le journal · Loftissime',
  robots: { index: false, follow: false },
};

// Page de travail, cachée : à quoi ressemblerait Loftissime présenté comme un média.
// Les sujets marqués « exemple » sont inventés pour la maquette ; seuls les articles Insolite existent.

const RUBRICS: { name: string; text: string }[] = [
  { name: 'Visites privées', text: 'On pousse la porte d’un lieu singulier, chez un particulier.' },
  { name: 'Carte blanche', text: 'Un architecte, un chantier, ce qu’il a voulu faire.' },
  { name: 'Insolite', text: 'Avion, phare, château d’eau : ils ont choisi d’habiter ailleurs.' },
  { name: 'Avant-premières', text: 'Des biens à vendre, montrés aux abonnés 48 heures avant tout le monde.' },
  { name: 'État des lieux', text: 'Ce qu’il faut savoir avant d’acheter un bien atypique.' },
];

// Emplacement d'une photo : la maquette n'en emprunte aucune
function Photo({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-stone-200 text-xs uppercase tracking-widest text-stone-500 ${className}`}>{label}</div>
  );
}

function Card({ kicker, title, text, link, art, photo, locked = false, href }: { kicker: string; title: string; text: string; link: string; art?: GuideArtKey; photo?: string; locked?: boolean; href?: string }) {
  const inner = (
    <>
      <div className="overflow-hidden border-b border-stone-900">
        {art ? <GuideArt art={art} className="block w-full aspect-[4/3]" /> : <Photo label={photo || 'Photo'} className="aspect-[4/3]" />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs uppercase tracking-widest text-stone-500">{kicker}</p>
        <h3 className="mt-2 font-serif text-2xl leading-snug text-stone-900">{typo(title)}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-stone-600">{typo(text)}</p>
        <p className="mt-auto pt-6 text-[15px] font-medium text-stone-900">
          <span className="underline underline-offset-4 decoration-stone-300">{link} →</span>
          {locked && <span className="ml-3 text-xs font-normal uppercase tracking-widest text-stone-500">Abonnés</span>}
        </p>
      </div>
    </>
  );
  const cls = 'flex flex-col overflow-hidden rounded-[14px] border border-stone-200 bg-white';
  return href ? <Link href={href} className={`${cls} hover:border-stone-900 transition-colors`}>{inner}</Link> : <article className={cls}>{inner}</article>;
}

export default function MediaPreview() {
  const insolite = GUIDE_ARTICLES.filter((a) => a.category === 'Insolite').slice(0, 1)[0];
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <p className="bg-stone-900 px-6 py-2 text-center text-xs tracking-wide text-[#FBF5E9]">
        Maquette de travail : les sujets marqués « exemple » sont inventés, rien de ceci n’est en ligne.
      </p>

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-8 md:pb-10">
        <p className="text-xs uppercase tracking-widest text-stone-500">Le journal de Loftissime</p>
        <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Des lieux singuliers, <span className="italic text-stone-500">et ceux qui les habitent.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-stone-600 text-base md:text-lg font-light leading-relaxed">
          Chaque semaine : une visite privée, un architecte, une histoire, et les biens à vendre avant tout le monde.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* À la une : la visite privée de la semaine */}
        <article className="grid md:grid-cols-2 rounded-[14px] overflow-hidden bg-white border border-stone-200">
          <Photo label="Photo du lieu" className="min-h-[260px] border-b md:border-b-0 md:border-r border-stone-900" />
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-stone-500">À la une · Visite privée · Exemple</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">{typo('Un atelier de lutherie devenu maison, au fond d’une cour du 11e')}</h2>
            <p className="mt-4 text-stone-600 leading-relaxed">
              {typo('Six mètres sous verrière, un établi resté en place, une chambre dans l’ancienne réserve. Les propriétaires racontent ce qu’ils ont gardé, et ce qu’ils referaient autrement.')}
            </p>
            <span className="mt-6 text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 self-start">Visiter →</span>
          </div>
        </article>

        {/* Les rubriques : le sommaire d'État des lieux */}
        <section className="mt-12 md:mt-16" aria-label="Les rubriques">
          <p className="text-xs uppercase tracking-widest text-stone-500">Les rubriques</p>
          <ul className="mt-4 border-t border-stone-900">
            {RUBRICS.map((r) => (
              <li key={r.name} className="grid gap-x-10 gap-y-1 border-b border-stone-200 py-4 md:grid-cols-[16rem_1fr]">
                <span className="font-serif text-xl text-stone-900">{r.name}</span>
                <span className="text-[15px] leading-relaxed text-stone-600">{typo(r.text)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Cette semaine */}
        <section className="mt-12 md:mt-16">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900">Cette semaine</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card
              kicker="Carte blanche · Exemple"
              title="Un duplex sous les toits, sans une seule cloison"
              text="L’architecte explique pourquoi il a supprimé le couloir, et ce que cela change au quotidien."
              link="Lire"
              photo="Photo fournie par l’architecte"
            />
            {insolite && (
              <Card
                kicker="Insolite"
                title={insolite.title}
                text={insolite.description}
                link="Lire l’histoire"
                art={insolite.art as GuideArtKey}
                href={`/guide/${insolite.slug}`}
              />
            )}
            <Card
              kicker="Avant-première · Exemple"
              title="Ancien atelier d’imprimeur, 140 m², Paris 20e"
              text="En ligne partout jeudi. Les abonnés le voient dès aujourd’hui."
              link="Voir le bien"
              art="atelier"
              locked
            />
          </div>
        </section>

        {/* La lettre */}
        <section className="mt-12 md:mt-16 rounded-[14px] border border-stone-200 bg-white p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">La lettre</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-[1.1] text-stone-900">
                Un lieu par semaine, <span className="italic text-stone-500">dans votre boîte.</span>
              </h2>
              <p className="mt-4 text-stone-600 leading-relaxed">Le jeudi. Et les biens à vendre 48 heures avant leur mise en ligne.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input type="email" disabled placeholder="Votre e-mail" aria-label="Votre e-mail" className={FIELD} />
              <span className="inline-flex h-12 flex-none items-center justify-center rounded-full bg-stone-900 px-7 text-[15px] font-medium text-[#FBF5E9]">Recevoir la lettre</span>
            </div>
          </div>
        </section>

        {/* La recherche : la demande plutôt que l'offre */}
        <section className="mt-12 md:mt-16 grid gap-x-10 gap-y-4 border-t border-stone-900 pt-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900">Vous cherchez un lieu comme ceux-là ?</h2>
            <p className="mt-2 max-w-2xl text-stone-600 leading-relaxed">
              Décrivez-le en quelques mots. Nous vous prévenons quand il apparaît, et rien n’est transmis à une agence sans votre accord.
            </p>
          </div>
          <span className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300">Décrire ma recherche →</span>
        </section>
      </main>
    </div>
  );
}

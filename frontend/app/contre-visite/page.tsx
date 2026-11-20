import Link from 'next/link';
import { Play } from 'lucide-react';
import SiteHeader from '../SiteHeader';
import Crumbs from '../Crumbs';
import AlertBand, { ALERT_BUTTON } from '../AlertBand';
import { Bust } from '../partenaires/contre-visite/Mockups';

export const metadata = {
  title: 'Contre-visite · Loftissime',
  description: 'Une question d’acheteur, un spécialiste, une minute : courtier, notaire, architecte, entreprise de travaux, diagnostiqueur.',
  robots: { index: false, follow: false },
};

// La page « Contre-visite » telle qu'elle existera sur le site, montrée aux futurs partenaires.
// Hors menu, hors moteurs de recherche tant que les vidéos ne sont pas tournées : les questions sont
// des exemples, et aucun nom ni aucun propos n'est prêté à qui que ce soit.

const SERIES: { anchor: string; name: string; who: string; intro: string; videos: string[] }[] = [
  {
    anchor: 'financement',
    name: 'Financement',
    who: 'Courtier',
    intro: 'Apport, prêt, travaux : ce qu’une banque regarde quand le bien sort de l’ordinaire.',
    videos: ['Quel apport pour un bien atypique ?', 'Un loft se finance-t-il comme un appartement ?', 'Peut-on inclure les travaux dans le prêt ?', 'Prêt relais : dans quel cas ?'],
  },
  {
    anchor: 'notaire',
    name: 'Chez le notaire',
    who: 'Notaire',
    intro: 'Offre, compromis, règlement de copropriété : ce qui vous engage, et à quel moment.',
    videos: ['À quoi m’engage une offre d’achat ?', 'Ancien local devenu logement : que vérifier ?', 'Que change une voie privée ?', 'Compromis ou promesse : quelle différence ?'],
  },
  {
    anchor: 'architecte',
    name: 'L’œil de l’architecte',
    who: 'Architecte',
    intro: 'Volumes, lumière, structure : ce qui se transforme, et ce qui ne bouge pas.',
    videos: ['Peut-on créer une mezzanine partout ?', 'Ouvrir une verrière en toiture, est-ce possible ?', 'Que regarder lors d’une visite avec un architecte ?', 'Faut-il un permis pour changer une façade ?'],
  },
  {
    anchor: 'travaux',
    name: 'Travaux',
    who: 'Entreprise de travaux',
    intro: 'Budget, délais, ordre des opérations : le chantier avant le chantier.',
    videos: ['Combien coûte un plateau brut à aménager ?', 'Par où commencer une rénovation ?', 'Chauffer un grand volume : quelles solutions ?', 'Isoler une verrière sans la dénaturer ?'],
  },
  {
    anchor: 'diagnostics',
    name: 'Diagnostics',
    who: 'Diagnostiqueur',
    intro: 'Surface, énergie, matériaux : lire le dossier sans se tromper.',
    videos: ['Le souplex compte-t-il en loi Carrez ?', 'Que vaut le DPE d’un loft sous verrière ?', 'Amiante, plomb : que dit le dossier ?', 'Une mezzanine compte-t-elle dans la surface ?'],
  },
];

function Thumb({ who, big = false }: { who: string; big?: boolean }) {
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[14px] bg-stone-800">
      <Bust className="absolute bottom-0 left-1/2 h-[62%] -translate-x-1/2" />
      <span className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-stone-900 ${big ? 'h-14 w-14' : 'h-11 w-11'}`}>
        <Play className={`ml-0.5 ${big ? 'h-6 w-6' : 'h-4 w-4'}`} fill="currentColor" strokeWidth={0} />
      </span>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-10">
        <p className="text-[12px] font-semibold text-white">Votre nom</p>
        <p className="text-[11px] text-white/80">{who} · Votre société</p>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[11px] text-white">1 min</span>
    </div>
  );
}

const link = 'underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';

export default function ContreVisitePage() {
  const first = SERIES[0];
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-4xl">
          <Crumbs items={[{ label: 'État des lieux', href: '/guide' }, { label: 'Contre-visite' }]} />
          <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
            Contre-visite. <span className="italic text-stone-500">Une question, un spécialiste, une minute.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
            Les questions que l’on se pose avant de signer, posées à ceux dont c’est le métier.
          </p>
          <p className="mt-3 max-w-2xl font-light leading-relaxed text-stone-600">
            Dans chaque domaine, un seul partenaire de Loftissime prend la parole, sous son nom et celui de sa société : vous savez qui vous répond, et comment le joindre.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-900">
            {SERIES.map((s) => (
              <a key={s.anchor} href={`#${s.anchor}`} className={link}>
                {s.name}
              </a>
            ))}
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <section className="rounded-[20px] border border-stone-200 bg-white p-5 md:p-8 sm:grid sm:grid-cols-[15rem_1fr] sm:items-center sm:gap-10">
          <div className="mx-auto w-full max-w-[15rem]">
            <Thumb who={first.who} big />
          </div>
          <div className="mt-6 sm:mt-0">
            <p className="text-xs uppercase tracking-widest text-stone-500">La dernière vidéo · {first.name}</p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-tight tracking-tight text-stone-900">{first.videos[0]}</h2>
            <p className="mt-4 text-stone-600">Votre nom · {first.who} · Votre société</p>
            <p className="mt-5 max-w-xl font-light leading-relaxed text-stone-600">
              La réponse se regarde en une minute, ou se lit : chaque vidéo est accompagnée de son texte, mot pour mot.
            </p>
            <p className="mt-5">
              <span className={`text-sm font-medium text-stone-900 ${link}`}>Lire la réponse</span>
            </p>
          </div>
        </section>

        {SERIES.map((s) => (
          <section key={s.anchor} id={s.anchor} className="mt-14 md:mt-20 scroll-mt-24">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-stone-900">{s.name}</h2>
            <p className="mt-2 text-stone-600">{s.intro}</p>
            <p className="mt-3 text-sm text-stone-500">
              Avec <span className="font-medium text-stone-900">Votre nom</span>, {s.who.toLowerCase()} · Votre société
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
              {s.videos.map((q) => (
                <li key={q}>
                  <Thumb who={s.who} />
                  <p className="mt-3 font-serif text-lg leading-snug text-stone-900">{q}</p>
                  <p className="mt-1 text-sm text-stone-500">Votre nom · {s.who}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <AlertBand title="Les biens rares partent vite. Soyez le premier informé." className="mt-14 md:mt-20">
          <Link href="/?alerte=1" className={ALERT_BUTTON}>
            Créer mon alerte
          </Link>
        </AlertBand>

        <p className="mt-8 text-sm text-stone-500">
          Aperçu de la page avant tournage : les questions sont données en exemple, les vidéos seront tournées avec nos partenaires.
        </p>
      </main>
    </div>
  );
}

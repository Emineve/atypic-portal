import Link from 'next/link';
import SiteHeader from '../../SiteHeader';
import Crumbs from '../../Crumbs';

export const metadata = {
  title: 'Inspiration · maquette',
  robots: { index: false, follow: false },
};

// Maquette de la future page Inspiration, pour la présenter à l'architecte partenaire.
// Hors menu, hors moteurs. Tout y est un exemple : les projets sont fictifs, les images sont des
// aplats de couleur, et aucun propos n'est prêté à qui que ce soit.

const link = 'underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
const h2 = 'font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900';
const lead = 'mt-4 max-w-2xl text-lg font-light leading-relaxed text-stone-600';
const tag = 'rounded-full border border-stone-300 px-3 py-1 text-[13px] leading-tight text-stone-700';

function Shot({ tone, label, className = '' }: { tone: string; label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[14px] ${className}`} style={{ background: tone }}>
      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-stone-900 shadow-sm">{label}</span>
    </div>
  );
}

const PROJECTS = [
  {
    title: 'Un atelier d’artiste devenu appartement familial',
    facts: ['Atelier d’artiste', '110 m²', 'Paris 14e'],
    before: '#b9b3a8',
    after: '#d9c9a8',
    place: 'Un volume de cinq mètres sous verrière, une seule pièce, aucune chambre.',
    idea: 'Glisser deux chambres sous une mezzanine, sans toucher à la verrière ni couper la lumière.',
    result: 'Trois chambres, une pièce de vie qui garde toute sa hauteur, et la lumière du nord partout.',
  },
  {
    title: 'Un plateau brut au dernier étage',
    facts: ['Ancien bureau', '140 m²', 'Lyon 1er'],
    before: '#a9b0b4',
    after: '#c8d3cf',
    place: 'Cent quarante mètres carrés de béton, des réseaux apparents, une terrasse inutilisée.',
    idea: 'Tout organiser autour de la terrasse : la cuisine s’y ouvre, les chambres passent côté cour.',
    result: 'Un appartement traversant, où l’on vit dehors six mois par an.',
  },
  {
    title: 'Un souplex qui retrouve la lumière',
    facts: ['Souplex', '78 m²', 'Paris 11e'],
    before: '#9c9488',
    after: '#d6cdbf',
    place: 'Un rez-de-chaussée étroit et un niveau bas sombre, relié par un escalier fermé.',
    idea: 'Ouvrir une trémie, poser un escalier ajouré, faire descendre le jour par un sol vitré.',
    result: 'Un niveau bas habitable, clair, où l’on a installé la chambre et le bureau.',
  },
];

const IDEAS = [
  ['Mezzanines', '#d9c9a8'],
  ['Verrières', '#c8d3cf'],
  ['Escaliers', '#d6cdbf'],
  ['Cuisines ouvertes', '#cfc4b6'],
  ['Rangements', '#bfc6c2'],
  ['Lumière', '#e3d8bd'],
  ['Matières', '#c9bfb0'],
  ['Dehors', '#bccabc'],
];

const LOOKS = ['La structure', 'La lumière', 'La hauteur', 'Les autorisations'];

const STEPS = [
  ['Avant l’offre', 'Visiter avec un architecte : une heure sur place évite les mauvaises surprises et donne un premier ordre de grandeur.'],
  ['L’esquisse', 'Un plan, des volumes, un budget : de quoi décider en connaissance de cause, et négocier.'],
  ['Les autorisations', 'Copropriété, urbanisme, changement de destination : ce qu’il faut obtenir, et dans quel délai.'],
  ['Le chantier', 'Le choix des entreprises, le suivi, la réception. Et un calendrier tenu.'],
];

export default function InspirationMockup() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-4xl">
          <Crumbs items={[{ label: 'Inspiration' }]} />
          <h1 className="mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
            Imaginer avant d’acheter. <span className="italic text-stone-500">Le regard d’un architecte.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
            Un bien atypique se choisit autant pour ce qu’il est que pour ce qu’il peut devenir. Des projets racontés, des idées à prendre, et la marche à suivre pour passer du coup de cœur au chantier.
          </p>
          <p className="mt-4 text-sm text-stone-500">
            Avec <span className="font-medium text-stone-900">Votre nom</span>, architecte · Votre agence
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-900">
            <a href="#projets" className={link}>Les projets</a>
            <a href="#idees" className={link}>Des idées à prendre</a>
            <a href="#regard" className={link}>Avant d’acheter</a>
            <a href="#etapes" className={link}>Par où commencer</a>
            <a href="#biens" className={link}>Des biens à transformer</a>
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <section id="projets" className="scroll-mt-24">
          <h2 className={h2}>Trois lieux, trois transformations.</h2>
          <p className={lead}>Chaque projet se lit en trois temps : le lieu tel qu’il était, l’idée, le résultat.</p>
          <div className="mt-10 space-y-8">
            {PROJECTS.map((p, i) => (
              <article key={p.title} className="rounded-[20px] border border-stone-200 bg-white p-5 md:p-8 lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-10">
                <div className="grid grid-cols-2 gap-3">
                  <Shot tone={p.before} label="Avant" className="aspect-[3/4]" />
                  <Shot tone={p.after} label="Après" className="aspect-[3/4]" />
                </div>
                <div className="mt-6 lg:mt-0">
                  <p className="text-xs uppercase tracking-widest text-stone-500">Projet {i + 1}</p>
                  <h3 className="mt-2 font-serif text-3xl leading-tight text-stone-900">{p.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.facts.map((f) => (
                      <li key={f} className={tag}>{f}</li>
                    ))}
                  </ul>
                  <dl className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
                    {[['Le lieu', p.place], ['L’idée', p.idea], ['Le résultat', p.result]].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                        <dt className="font-medium text-stone-900">{k}</dt>
                        <dd className="font-light leading-relaxed text-stone-600">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5">
                    <span className={`text-sm font-medium text-stone-900 ${link}`}>Voir toutes les photos et le plan →</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="idees" className="mt-16 md:mt-24 scroll-mt-24">
          <h2 className={h2}>Des idées à prendre.</h2>
          <p className={lead}>Pour ceux qui cherchent d’abord à rêver : les mêmes projets, rangés par idée. On entre par ce qui plaît, on ressort avec une envie précise.</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {IDEAS.map(([name, tone]) => (
              <li key={name}>
                <div className="aspect-square rounded-[14px]" style={{ background: tone }} />
                <p className="mt-2 font-serif text-lg text-stone-900">{name}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="regard" className="mt-16 md:mt-24 scroll-mt-24">
          <h2 className={h2}>Avant d’acheter : ce que je regarde en premier.</h2>
          <p className={lead}>Quatre points que l’architecte vérifie dès la première visite, expliqués avec ses mots.</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {LOOKS.map((t, i) => (
              <li key={t} className="flex gap-5 rounded-[14px] border border-stone-200 bg-white p-6">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#F6CF4E] text-sm font-medium text-stone-900">{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl text-stone-900">{t}</h3>
                  <p className="mt-2 font-light leading-relaxed text-stone-600">Votre conseil, en deux ou trois lignes : ce que vous regardez, et ce que cela change pour l’acheteur.</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="etapes" className="mt-16 md:mt-24 scroll-mt-24">
          <h2 className={h2}>Par où commencer.</h2>
          <p className={lead}>Du coup de cœur au chantier, les quatre moments où un architecte fait gagner du temps et de l’argent.</p>
          <ol className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="grid gap-x-8 gap-y-1 py-5 md:grid-cols-[3rem_14rem_1fr] md:items-baseline">
                <span className="text-sm text-stone-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif text-2xl text-stone-900">{t}</h3>
                <p className="font-light leading-relaxed text-stone-600">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-stone-600">
            Pour aller plus loin : <Link href="/guide" className={link}>les articles d’État des lieux sur les travaux</Link> et{' '}
            <Link href="/contre-visite" className={link}>les réponses en vidéo de Contre-visite</Link>.
          </p>
        </section>

        <section id="biens" className="mt-16 md:mt-24 scroll-mt-24">
          <h2 className={h2}>Des biens à transformer.</h2>
          <p className={lead}>Parmi les annonces du site, ceux qui ont le plus de potentiel : un plateau brut, un atelier à repenser, un volume à diviser.</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {[['Plateau brut à aménager', 'Paris 10e · 120 m²', '#b9b3a8'], ['Atelier sous verrière', 'Montreuil · 95 m²', '#c8d3cf'], ['Ancien commerce sur cour', 'Paris 18e · 70 m²', '#d6cdbf']].map(([t, c, tone]) => (
              <li key={t} className="overflow-hidden rounded-[14px] border border-stone-200 bg-white">
                <div className="aspect-[4/3]" style={{ background: tone }} />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-stone-400">{c}</p>
                  <p className="mt-1 font-serif text-xl leading-tight text-stone-900">{t}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 md:mt-24 grid gap-x-12 gap-y-5 border-y border-stone-200 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-2xl leading-snug text-stone-900">Un bien en vue, un projet en tête ? Parlez-en à Votre nom.</h2>
            <p className="mt-2 text-sm text-stone-600">Votre message lui est transmis directement. C’est l’architecte qui vous répond, pas Loftissime.</p>
          </div>
          <span className="inline-flex h-12 flex-none items-center rounded-full bg-stone-900 px-8 text-[15px] font-medium text-white">Lui écrire</span>
        </section>

        <p className="mt-8 text-sm text-stone-500">
          Maquette de la page : les projets et les textes sont des exemples, les images seront les photos de l’architecte.
        </p>
      </main>
    </div>
  );
}

import SiteHeader from '../SiteHeader';
import { MOIS, NEWSLETTERS, themeDe } from '../../lib/newsletters';

// La présentation de Loftissime à un futur partenaire, écrite pour son métier : notaire, courtier, entrepreneur.
// Elle prend la forme du numéro lui-même : la carte, le ticket, la frise des matières. Hors menu, hors moteurs de recherche.
// Rien n'y est promis qui ne soit décidé : pas de chiffre d'audience, pas de tarif. Les blocs montrés sont des maquettes.

export type Role = 'notaire' | 'courtier' | 'entrepreneur';

type Fiche = {
  metier: string; // « notaire »
  matiere: string; // le thème dont la page prend la matière
  titre: string;
  titreItalique: string;
  accroche: string;
  rubrique: string; // la rubrique du numéro où il intervient
  rubriqueTexte: string;
  demandes: [string, string][]; // ce qu'on lui demande : quoi, comment
  gains: [string, string][];
  etape: string; // sa part dans le mois
  regle: [string, string]; // la règle propre à son métier
};

export const FICHES: Record<Role, Fiche> = {
  notaire: {
    metier: 'notaire',
    matiere: 'laiton',
    titre: 'Avant la signature du compromis,',
    titreItalique: 'il y a vous.',
    accroche: 'Dans chaque numéro de notre newsletter, une rubrique dit à l’acheteur ce qu’il doit vérifier avant de s’engager. Nous aimerions qu’elle porte votre regard.',
    rubrique: 'Avant la promesse',
    rubriqueTexte: 'Un seul point par numéro, celui qui compte pour ce bien-là : une question, deux phrases, et le lien vers l’article qui le développe.',
    demandes: [
      ['Le point à vérifier pour le bien du mois', 'choisi avec vous'],
      ['Une relecture de la rubrique', 'par e-mail, avant l’envoi'],
      ['Un œil sur nos articles juridiques', 'quand vous le pouvez'],
    ],
    gains: [
      ['Votre regard, là où l’acheteur en a besoin', 'avant la promesse'],
      ['Votre nom parmi ceux qui ont fait le numéro', 'si vous le souhaitez'],
      ['Votre place sur la page L’équipe', 'si vous le souhaitez'],
    ],
    etape: 'Vous nous dites le point à vérifier pour ce bien. Nous rédigeons, vous relisez.',
    regle: ['Une information générale, jamais une consultation.', 'La rubrique invite toujours le lecteur à voir son propre notaire. Et votre profession a ses règles de communication : dites-nous ce qu’elles permettent, nous nous y tenons.'],
  },
  courtier: {
    metier: 'courtier',
    matiere: 'zinc',
    titre: 'Par mois, tout compris :',
    titreItalique: 'c’est vous qui comptez.',
    accroche: 'Dans chaque numéro de notre newsletter, nous disons ce qu’un bien atypique coûte vraiment, chaque mois. Ce calcul, nous aimerions qu’il soit le vôtre.',
    rubrique: 'Qui pourrait l’acheter ?',
    rubriqueTexte: 'Nous imaginons un acheteur pour le bien du mois. Vous dites ce que vous négocieriez pour lui, et ce qu’il paierait chaque mois, travaux compris.',
    demandes: [
      ['Une mensualité pour l’acheteur imaginé', 'une fois par mois'],
      ['Trois lignes sur ce que vous négocieriez', 'avec vos mots'],
      ['La durée, le taux et vos mentions légales', 'tels que vous les écrivez'],
    ],
    gains: [
      ['Vos mots et votre calcul, signés', 'dans chaque numéro'],
      ['Votre nom parmi ceux qui ont fait le numéro', 'et sur la page L’équipe'],
      ['Les demandes de rappel de notre page Financement', 'à cadrer ensemble'],
    ],
    etape: 'Vous recevez le prix, les travaux et le profil de l’acheteur. Vous calculez la mensualité et vous écrivez vos trois lignes.',
    regle: ['Une simulation, jamais une offre de prêt.', 'Chaque mensualité publiée porte la durée, le taux et les mentions légales que vous nous fournissez. Sans elles, elle ne paraît pas.'],
  },
  entrepreneur: {
    metier: 'entrepreneur du bâtiment',
    matiere: 'parpaing',
    titre: 'Le chiffre des travaux,',
    titreItalique: 'c’est le vôtre.',
    accroche: 'Dans chaque numéro de notre newsletter, nous disons ce qu’un bien atypique coûte une fois habitable. Entre le prix et le vrai prix, il y a les travaux : il nous faut quelqu’un dont c’est le métier.',
    rubrique: 'L’addition',
    rubriqueTexte: 'Le prix affiché, les frais de notaire, puis les travaux. Votre chiffre est la ligne que tout le monde attend, et il est donné à votre nom.',
    demandes: [
      ['Un ordre de grandeur pour le bien du mois', 'une fois par mois'],
      ['D’après la visite filmée et le projet de l’architecte', 'sans vous déplacer'],
      ['Deux lignes sur ce qui pèse dans le chiffre', 'avec vos mots'],
    ],
    gains: [
      ['Votre chiffre, signé de votre nom', 'dans chaque numéro'],
      ['Votre nom parmi ceux qui ont fait le numéro', 'et sur la page L’équipe'],
      ['Des lecteurs qui ont un chantier en tête', 'c’est le thème de janvier'],
    ],
    etape: 'Vous recevez la visite filmée et le projet de l’architecte. Vous donnez votre ordre de grandeur, et ce qui le fait monter ou descendre.',
    regle: ['Un ordre de grandeur, jamais un devis.', 'Le numéro le dit en toutes lettres. Votre chiffre n’engage ni vous ni nous sur un chantier précis.'],
  },
};

const INK = '#3A2E2A';

// Le bord dentelé d'un ticket
function Dents({ bas = false }: { bas?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 600 10" preserveAspectRatio="none" className={`block h-[10px] w-full ${bas ? 'rotate-180' : ''}`}>
      <path d={`M0 10${Array.from({ length: 40 }, (_, i) => `L${i * 15 + 7.5} 0L${(i + 1) * 15} 10`).join('')}Z`} fill="#fff" />
    </svg>
  );
}

function Ticket({ titre, sous, lignes, total }: { titre: string; sous: string; lignes: [string, string][]; total: [string, string] }) {
  return (
    <div>
      <Dents />
      <div className="bg-white px-6 pb-6 pt-4 sm:px-7">
        <h3 className="font-serif text-2xl leading-tight">{titre}</h3>
        <p className="mt-0.5 text-sm text-stone-500">{sous}</p>
        <ul className="mt-3">
          {lignes.map(([quoi, comment]) => (
            <li key={quoi} className="flex items-baseline gap-2 border-b border-dotted border-stone-400 py-3">
              <span className="text-[17px] leading-snug">{quoi}</span>
              <span aria-hidden className="flex-1" />
              <span className="shrink-0 text-right font-serif text-[17px] italic text-stone-500">{comment}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between gap-4 rounded-md bg-[#F6CF4E] px-4 py-3.5">
          <span className="font-serif text-xl">{total[0]}</span>
          <span className="text-right font-serif text-2xl leading-none">{total[1]}</span>
        </div>
      </div>
      <Dents bas />
    </div>
  );
}

const Trait = () => <div aria-hidden className="mb-3.5 h-1.5 w-11 bg-[#F6CF4E]" />;
const h2 = 'font-serif text-3xl leading-[1.1] md:text-4xl';

// La rubrique du numéro où le partenaire intervient, en maquette
function Maquette({ role }: { role: Role }) {
  if (role === 'notaire')
    return (
      <div className="rounded-[14px] border-2 border-stone-900 bg-[#FCF1C9] p-6 shadow-[5px_5px_0_#3A2E2A]">
        <p className="font-serif text-2xl leading-snug">Cet ancien atelier en rez-de-chaussée est-il un logement, ou encore un local ?</p>
        <p className="mt-3 text-[17px] leading-relaxed">C’est la première chose à vérifier pour ce bien, avant toute offre : elle se lit dans le règlement de copropriété et se confirme auprès de la mairie.</p>
        <p className="mt-4 text-sm text-stone-600">Relu par <span className="rounded bg-white px-1.5 py-0.5 font-medium text-stone-900">votre nom, notaire</span></p>
      </div>
    );
  const lignes: [string, string, boolean][] =
    role === 'courtier'
      ? [['Mensualité du crédit', 'votre calcul', true], ['Charges de copropriété', 'données par l’annonce', false], ['Énergie', 'd’après le diagnostic', false], ['Taxe foncière', 'ramenée au mois', false]]
      : [['Prix de vente affiché', '440 000 €', false], ['Frais de notaire', '35 000 €', false], ['Travaux', 'votre chiffre', true]];
  return (
    <div>
      <Dents />
      <div className="bg-white px-6 pb-6 pt-4 sm:px-7">
        <h3 className="font-serif text-2xl leading-tight">{role === 'courtier' ? 'Par mois, tout compris' : 'L’atelier du Panthéon'}</h3>
        <p className="mt-0.5 text-sm text-stone-500">{role === 'courtier' ? 'Ce que cet acheteur paierait chaque mois pour y vivre.' : 'Ce que coûte ce bien une fois habitable.'}</p>
        {role === 'entrepreneur' && (
          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-sm border" style={{ borderColor: INK }} aria-hidden>
            <span className="w-[68%] bg-[#3A2E2A]" />
            <span className="w-[6%] bg-[#F6CF4E]" />
            <span className="flex-1" style={{ background: 'repeating-linear-gradient(135deg,#fff 0 4px,#3A2E2A 4px 5px)' }} />
          </div>
        )}
        <ul className="mt-3">
          {lignes.map(([label, valeur, vous]) => (
            <li key={label} className="flex items-baseline gap-2 border-b border-dotted border-stone-400 py-3">
              <span className="text-[17px]">
                {label}
                {vous && <span className="block text-sm text-stone-500">{role === 'courtier' ? 'Travaux compris, calculée par vous' : 'Ordre de grandeur donné par vous'}</span>}
              </span>
              <span aria-hidden className="flex-1" />
              {vous ? (
                <span className="shrink-0 rounded-md bg-[#F6CF4E] px-2.5 py-1 font-serif text-xl">{valeur}</span>
              ) : (
                <span className={`shrink-0 font-serif ${role === 'courtier' ? 'text-[17px] italic text-stone-500' : 'text-xl lining-nums'}`}>{valeur}</span>
              )}
            </li>
          ))}
        </ul>
        {role === 'courtier' && <p className="mt-3 text-sm leading-relaxed text-stone-500">Durée, taux et mentions légales : tels que vous nous les fournissez.</p>}
      </div>
      <Dents bas />
    </div>
  );
}

export default function Presentation({ role }: { role: Role }) {
  const f = FICHES[role];
  const matiere = themeDe(f.matiere).matiere;
  const premier = NEWSLETTERS[0];
  const mois: [string, string][] = [
    ['Nous choisissons le bien du mois', 'Un bien atypique à vendre, dans le thème du numéro.'],
    ['Nous le visitons, caméra à la main', 'La visite filmée ouvre le numéro.'],
    ['Votre part', f.etape],
    ['Vous relisez', 'Rien ne paraît sans votre accord.'],
    ['Le numéro part', 'Par e-mail, aux abonnés, et sur le site.'],
  ];
  return (
    <div className="min-h-screen overflow-x-clip bg-[#FCFBF8] font-sans text-stone-900">
      <SiteHeader />
      {/* le haut de page est posé sur une matière : chaque métier a la sienne */}
      <div style={matiere}>
        <section className="mx-auto max-w-6xl px-6 py-10 md:py-16">
          <div className="max-w-3xl rounded-[18px] border-2 border-stone-900 bg-[#FCFBF8] p-7 shadow-[6px_6px_0_#3A2E2A] md:p-12">
            <p className="text-sm text-stone-500">
              <a href="/partenaires" className="underline underline-offset-4 decoration-stone-400">Partenaires</a>, pour vous qui êtes {f.metier}
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
              {f.titre} <span className="italic text-stone-500">{f.titreItalique}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">{f.accroche}</p>
          </div>
        </section>
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        <section className="mt-16 grid gap-x-12 gap-y-5 border-t border-stone-900 pt-4 md:mt-24 md:grid-cols-[1fr_1.4fr]">
          <h2 className={h2}>Loftissime, <span className="italic text-stone-500">en trois lignes.</span></h2>
          <div className="space-y-4 text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">
            <p>Loftissime est le média de l’immobilier atypique : lofts, ateliers d’artistes, derniers étages, péniches, biens à rénover.</p>
            <p>Une newsletter, un thème par mois, douze numéros par an. Dans chacun, des professionnels ouvrent les portes d’un bien atypique : la visite, le projet, le prix tout compris.</p>
            <p>Le premier numéro, <em>{premier.nom}</em>, paraît en {MOIS[premier.mois - 1]}. Il est consacré aux biens à rénover. Le site est en préparation.</p>
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <div className="grid gap-x-12 gap-y-8 border-t border-stone-900 pt-4 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className={h2}>Votre place dans le numéro, <span className="italic text-stone-500">« {f.rubrique.replace(/ \?$/, ' ?')} ».</span></h2>
              <p className="mt-5 text-lg leading-relaxed text-stone-700">{f.rubriqueTexte}</p>
              <p className="mt-4 text-sm text-stone-500">À droite, la rubrique telle qu’elle apparaît dans le numéro. C’est une maquette, sur le bien du premier numéro.</p>
            </div>
            <div className="bg-[#E6DFD0] p-6 md:p-9">
              <Trait />
              <p className="mb-5 font-serif text-[27px] leading-tight">
                {role === 'notaire' ? <>Avant la promesse, <span className="italic text-stone-500">un point de vigilance.</span></> : role === 'courtier' ? <>Qui pourrait l’acheter ? <span className="italic text-stone-500">On a imaginé quelqu’un.</span></> : <>L’addition, <span className="italic text-stone-500">sans rien oublier.</span></>}
              </p>
              <Maquette role={role} />
            </div>
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <h2 className={`${h2} border-t border-stone-900 pt-4`}>L’addition, <span className="italic text-stone-500">pour vous cette fois.</span></h2>
          <div className="mt-8 grid gap-8 bg-[#E6DFD0] p-6 md:grid-cols-2 md:p-9">
            <Ticket titre="Ce que nous vous demandons" sous="Peu de choses, mais à chaque numéro." lignes={f.demandes} total={['Rien ne paraît', 'sans votre accord']} />
            <Ticket titre="Ce que vous y gagnez" sous="Votre métier, montré en situation." lignes={f.gains} total={['Vos mots', 'restent les vôtres']} />
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <div className="grid gap-x-12 gap-y-5 border-t border-stone-900 pt-4 md:grid-cols-[1fr_1.4fr]">
            <h2 className={h2}>Un numéro, <span className="italic text-stone-500">en cinq étapes.</span></h2>
            <ol>
              {mois.map(([t, x], i) => (
                <li key={t} className={`flex gap-5 border-b border-stone-200 py-5 first:pt-1 ${i === 2 ? '-mx-4 rounded-[12px] border-b-0 bg-[#FCF1C9] px-4 first:pt-5' : ''}`}>
                  <span className="w-7 shrink-0 font-serif text-2xl italic text-stone-500">{i + 1}.</span>
                  <span>
                    <span className="block font-serif text-2xl leading-tight">{t}</span>
                    <span className="mt-1 block text-lg leading-relaxed text-stone-700">{x}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <div className="grid gap-x-12 gap-y-5 border-t border-stone-900 pt-4 md:grid-cols-[1fr_1.4fr]">
            <h2 className={h2}>Nos règles, <span className="italic text-stone-500">les mêmes pour tous.</span></h2>
            <dl className="space-y-6 text-lg leading-relaxed text-stone-700">
              {(
                [
                  f.regle,
                  ['Vos mots et vos chiffres sont les vôtres.', 'Ils paraissent à votre nom, tels que vous les avez écrits. Nous ne les réécrivons pas sans vous.'],
                  ['Nous ne notons jamais un bien.', 'Nous le montrons, nous faisons les comptes, et le lecteur décide.'],
                  ['Loftissime n’est pas une agence.', 'Chaque bien est vendu par son propriétaire ou par une agence. Nous n’intervenons pas dans la vente.'],
                ] as [string, string][]
              ).map(([t, x]) => (
                <div key={t}>
                  <dt className="font-serif text-2xl leading-tight text-stone-900">{t}</dt>
                  <dd className="mt-1">{x}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <h2 className={`${h2} border-t border-stone-900 pt-4`}>L’année, <span className="italic text-stone-500">douze thèmes, un par mois.</span></h2>
          {/* le calendrier en petit : la matière, le mois, le nom du thème et son sujet */}
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {NEWSLETTERS.map((n) => (
              <li key={n.slug}>
                <a href={`/theme/${n.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_0_0_1px_#e7e0d3]">
                  <span aria-hidden className="block h-10" style={n.matiere} />
                  <span className="flex flex-1 flex-col px-4 pb-4 pt-3">
                    <span className="text-sm font-semibold capitalize">{MOIS[n.mois - 1]}</span>
                    <span className="mt-0.5 font-serif text-2xl italic leading-tight underline-offset-4 [@media(hover:hover)]:group-hover:underline">{n.nom}</span>
                    <span className="mt-1.5 text-sm leading-snug text-stone-600">{n.sujet}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 md:mt-24">
          <div className="grid gap-x-12 gap-y-4 border-t border-stone-900 pt-4 md:grid-cols-[1fr_1.4fr]">
            <h2 className={h2}>Partant ?</h2>
            <div>
              <p className="text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">Répondez simplement au message qui vous a mené ici.</p>
              <p className="mt-4 text-sm leading-relaxed text-stone-500">
                Cette page est une présentation. Le site est en préparation et n’est pas encore ouvert au public ; les rubriques montrées sont des maquettes.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

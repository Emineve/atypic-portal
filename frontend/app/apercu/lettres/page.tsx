import SiteHeader from '../../SiteHeader';
import GuideArt from '../../guide/GuideArt';

export const metadata = {
  title: 'Aperçu : douze mises en page pour la lettre · Loftissime',
  robots: { index: false, follow: false },
};

// Page de travail, cachée : douze façons de mettre en page la lettre Loftissime.
// Tout est inventé pour la maquette (biens, prix, objets de mail) ; les photos sont des emplacements.

const BIENS = [
  { ville: 'Paris 14e', m2: 96, titre: 'Atelier d’artiste sous verrière', prix: '1 250 000 €', mot: 'Six mètres sous verrière, plein nord, au fond d’une cour pavée.' },
  { ville: 'Paris 11e', m2: 110, titre: 'Loft dans une ancienne imprimerie', prix: '980 000 €', mot: 'Poteaux en fonte, sol en béton ciré, trois fenêtres d’atelier.' },
  { ville: 'Paris 16e', m2: 124, titre: 'Dernier étage, terrasse plein ciel', prix: '1 890 000 €', mot: 'Une terrasse de 40 m² au-dessus des toits, sans vis-à-vis.' },
  { ville: 'Paris 16e', m2: 85, titre: 'Péniche amarrée face au bois', prix: '640 000 €', mot: 'Vingt-quatre mètres de long, un pont en teck, une place à l’année.' },
  { ville: 'Paris 20e', m2: 138, titre: 'Maison d’architecte sur cour', prix: '1 320 000 €', mot: 'Trois niveaux autour d’un patio, signée dans les années 1990.' },
];

const SERIF = 'font-serif text-stone-900';
const CAPS = 'text-[10px] uppercase tracking-widest text-stone-500';
const LINK = 'text-[13px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-300';

function Photo({ label = 'Photo', className = '' }: { label?: string; className?: string }) {
  return <div className={`flex items-center justify-center bg-stone-200 ${CAPS} ${className}`}>{label}</div>;
}
function Cote({ m2 }: { m2: number }) {
  return (
    <span className="ml-2 inline-flex items-center gap-1 align-middle text-stone-900 normal-case tracking-normal">
      <span className="h-2 w-px bg-stone-900" /><span className="h-px w-2.5 bg-stone-900" />
      <span className="text-[10px] tabular-nums">{m2} m²</span>
      <span className="h-px w-2.5 bg-stone-900" /><span className="h-2 w-px bg-stone-900" />
    </span>
  );
}
const Wordmark = ({ className = '' }: { className?: string }) => (
  <span className={`font-logo font-semibold lowercase tracking-tight leading-none ${className}`}>loftissime.</span>
);
const Foot = () => (
  <div className="mt-6 border-t border-stone-200 pt-4 text-center text-[10px] leading-relaxed text-stone-500">
    Curateur de biens atypiques · loftissime.fr
    <br />
    Vous recevez cette lettre parce que vous vous y êtes inscrit. Se désinscrire
  </div>
);

// Le cadre d'un mail : la ligne de boîte de réception, puis le corps
function Mail({ letter, name, idea, objet, apercu, children, dark = false }: { letter: string; name: string; idea: string; objet: string; apercu: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section>
      <p className="font-sans text-sm tabular-nums text-stone-500">{letter}</p>
      <h2 className="mt-1 font-serif text-2xl text-stone-900">{name}</h2>
      <p className="mt-1 min-h-[3.5rem] text-[15px] leading-snug text-stone-600">{idea}</p>
      <div className="mt-4 overflow-hidden rounded-[14px] border border-stone-300 bg-white">
        <div className="border-b border-stone-200 bg-stone-50 px-4 py-3">
          <p className="text-[12px] font-semibold text-stone-900">Loftissime</p>
          <p className="text-[12px] text-stone-900">{objet}</p>
          <p className="truncate text-[12px] text-stone-500">{apercu}</p>
        </div>
        <div className={`px-5 py-6 ${dark ? 'bg-[#3A2E2A] text-[#FCFBF8]' : 'bg-[#FCFBF8]'}`}>{children}</div>
      </div>
    </section>
  );
}

export default function LettersPreview() {
  const [b1, b2, b3, b4, b5] = BIENS;
  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#3A2E2A] font-sans">
      <SiteHeader />
      <p className="bg-stone-900 px-6 py-2 text-center text-xs tracking-wide text-[#FCFBF8]">
        Maquette de travail : biens, prix et objets de mail inventés, photos remplacées par des emplacements.
      </p>

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-8 md:pb-10">
        <p className="text-xs uppercase tracking-widest text-stone-500">La lettre · douze mises en page</p>
        <h1 className="mt-4 max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Une lettre, <span className="italic text-stone-500">douze façons de l’écrire.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-stone-600 text-base md:text-lg font-light leading-relaxed">
          Chaque cadre montre le mail tel qu’il arrive : l’expéditeur, l’objet, la première ligne, puis le corps.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {/* A — un seul bien */}
        <Mail letter="A" name="L’unique" idea="Un seul bien par lettre. On l’ouvre comme une carte postale : rare, lent, très haut de gamme." objet="Six mètres sous verrière, Paris 14e" apercu="Le bien de la semaine, et rien d’autre.">
          <p className="text-center"><Wordmark className="text-xl text-stone-900" /></p>
          <Photo label="Grande photo" className="mt-5 aspect-[4/5]" />
          <p className={`mt-5 ${CAPS}`}>{b1.ville}<Cote m2={b1.m2} /></p>
          <p className={`mt-1 text-2xl leading-tight ${SERIF}`}>{b1.titre}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-stone-600">{b1.mot}</p>
          <p className={`mt-3 text-xl lining-nums ${SERIF}`}>{b1.prix}</p>
          <p className="mt-4"><span className="inline-flex h-10 items-center rounded-full bg-stone-900 px-5 text-[13px] font-medium text-[#FCFBF8]">Voir l’annonce</span></p>
          <Foot />
        </Mail>

        {/* B — la sélection */}
        <Mail letter="B" name="La sélection" idea="Cinq biens, du plus singulier au plus accessible. Le format le plus simple à tenir chaque semaine." objet="Cinq biens atypiques cette semaine" apercu="Un atelier, un loft, une péniche…">
          <div className="flex items-baseline justify-between"><Wordmark className="text-lg text-stone-900" /><span className={CAPS}>N° 1 · jeudi 26 novembre</span></div>
          <div className="mt-5 space-y-5">
            {[b1, b2, b3].map((b) => (
              <div key={b.titre} className="grid grid-cols-[96px_1fr] gap-4 border-t border-stone-300 pt-4">
                <Photo className="aspect-square rounded-[8px]" />
                <div>
                  <p className={CAPS}>{b.ville}<Cote m2={b.m2} /></p>
                  <p className={`mt-0.5 text-[17px] leading-snug ${SERIF}`}>{b.titre}</p>
                  <p className={`mt-0.5 text-[15px] lining-nums ${SERIF}`}>{b.prix}</p>
                  <p className="mt-1"><span className={LINK}>Voir l’annonce ↗</span></p>
                </div>
              </div>
            ))}
            <p className="border-t border-stone-300 pt-4 text-[12px] text-stone-500">+ 2 autres biens dans la lettre</p>
          </div>
          <Foot />
        </Mail>

        {/* C — le journal */}
        <Mail letter="C" name="Le journal" idea="Un mot d’ouverture, la vidéo en avant-première, trois biens, une histoire. La plus riche, la plus longue à faire." objet="En ligne jeudi, vu ici aujourd’hui" apercu="La visite de la semaine, et trois biens repérés.">
          <p className="text-center"><Wordmark className="text-xl text-stone-900" /></p>
          <p className={`mt-1 text-center ${CAPS}`}>Le journal · n° 1</p>
          <p className="mt-5 text-[13px] leading-relaxed text-stone-700">Cette semaine, un atelier que personne n’a encore vu, et une péniche qui ne restera pas longtemps.</p>
          <div className="relative mt-5 flex aspect-video items-center justify-center rounded-[8px] bg-[#3A2E2A]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FCFBF8]"><span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-[#FCFBF8]" /></span>
            <span className="absolute left-3 top-3 text-[9px] uppercase tracking-widest text-stone-400">Avant-première</span>
          </div>
          <p className={`mt-3 text-lg leading-snug ${SERIF}`}>{b1.titre}, <span className="italic text-stone-500">en une minute.</span></p>
          <p className={`mt-5 border-t border-stone-300 pt-4 ${CAPS}`}>Repérés cette semaine</p>
          <ul className="mt-2 space-y-2 text-[13px] leading-snug text-stone-800">
            {[b2, b3, b4].map((b) => (<li key={b.titre}>{b.titre}, {b.ville} · <span className="font-serif lining-nums">{b.prix}</span> ↗</li>))}
          </ul>
          <p className={`mt-5 border-t border-stone-300 pt-4 ${CAPS}`}>L’histoire</p>
          <p className={`mt-1 text-[15px] leading-snug ${SERIF}`}>Il a posé un avion de ligne dans les bois, et il y vit →</p>
          <Foot />
        </Mail>

        {/* D — le courrier */}
        <Mail letter="D" name="Le courrier" idea="Du texte, sans image. Écrite comme une lettre à un ami : rien à charger, rien à demander aux agences." objet="Ce que nous avons repéré cette semaine" apercu="Bonjour, cinq adresses à regarder de près.">
          <p className={`text-[15px] leading-relaxed ${SERIF}`}>Bonjour,</p>
          <p className={`mt-3 text-[15px] leading-relaxed ${SERIF}`}>Cinq biens ont retenu notre attention cette semaine. Les voici, dans l’ordre où nous les visiterions.</p>
          <ol className="mt-4 space-y-3">
            {BIENS.map((b, i) => (
              <li key={b.titre} className="grid grid-cols-[1.5rem_1fr] text-[14px] leading-snug">
                <span className="text-stone-500 tabular-nums">{i + 1}.</span>
                <span className={SERIF}>
                  <span className="underline underline-offset-4 decoration-stone-300">{b.titre}</span>, {b.ville}. <span className="text-stone-600">{b.m2} m², {b.prix}.</span>
                </span>
              </li>
            ))}
          </ol>
          <p className={`mt-4 text-[15px] leading-relaxed ${SERIF}`}>À jeudi prochain.</p>
          <p className="mt-3"><Wordmark className="text-base text-stone-900" /></p>
          <Foot />
        </Mail>

        {/* E — le plan */}
        <Mail letter="E" name="Le plan" idea="Le trait d’architecte du site : un dessin en tête, les biens numérotés comme la légende d’un plan." objet="Planche n° 1 : cinq biens atypiques" apercu="Atelier, loft, terrasse, péniche, maison.">
          <div className="flex items-baseline justify-between border-b border-stone-900 pb-2"><Wordmark className="text-lg text-stone-900" /><span className={CAPS}>Planche n° 1</span></div>
          <div className="mt-4 overflow-hidden rounded-[8px] border border-stone-900 bg-[#F6CF4E]"><GuideArt art="atelier" className="block w-full aspect-[2/1]" /></div>
          <ol className="mt-4 border-t border-stone-900">
            {[b1, b2, b3, b4].map((b, i) => (
              <li key={b.titre} className="grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-x-2 border-b border-stone-300 py-2.5">
                <span className="text-[11px] tabular-nums text-stone-500">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className={`block text-[15px] leading-snug ${SERIF}`}>{b.titre}</span>
                  <span className={CAPS}>{b.ville}<Cote m2={b.m2} /></span>
                </span>
                <span className={`text-[14px] lining-nums ${SERIF}`}>{b.prix}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4"><span className={LINK}>Voir les cinq biens →</span></p>
          <Foot />
        </Mail>

        {/* F — la une */}
        <Mail letter="F" name="La une" idea="Une couverture de magazine : une image plein cadre, le titre dessus, le sommaire dessous. La plus spectaculaire." objet="À la une : l’atelier que personne n’a vu" apercu="Et quatre autres biens à l’intérieur." dark>
          <div className="relative -mx-5 -mt-6 flex aspect-[4/5] flex-col justify-between bg-stone-700 p-5">
            <div className="flex items-baseline justify-between"><Wordmark className="text-xl text-[#FCFBF8]" /><span className="text-[10px] uppercase tracking-widest text-stone-300">N° 1</span></div>
            <span className="self-center text-[10px] uppercase tracking-widest text-stone-400">Photo plein cadre</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-300">{b1.ville} · {b1.m2} m²</p>
              <p className="mt-1 font-serif text-3xl leading-[1.05] text-[#FCFBF8]">Six mètres <span className="italic text-stone-300">sous verrière.</span></p>
            </div>
          </div>
          <p className="mt-5 text-[10px] uppercase tracking-widest text-stone-400">Dans ce numéro</p>
          <ul className="mt-2 divide-y divide-stone-700 border-y border-stone-700 text-[13px]">
            {[b2, b3, b4].map((b) => (
              <li key={b.titre} className="flex items-baseline justify-between gap-3 py-2">
                <span className="font-serif text-[15px] leading-snug">{b.titre}</span>
                <span className="flex-none font-serif lining-nums text-stone-300">{b.prix}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-[10px] leading-relaxed text-stone-400">Curateur de biens atypiques · loftissime.fr · Se désinscrire</p>
        </Mail>
        {/* G — la mesure */}
        <Mail letter="G" name="La mesure" idea="Pas de photo : un chiffre en très grand. Ce qui rend le bien singulier tient en une mesure." objet="6 m de hauteur sous plafond" apercu="Un atelier d’artiste au fond d’une cour du 14e.">
          <div className="flex items-baseline justify-between"><Wordmark className="text-lg text-stone-900" /><span className={CAPS}>N° 1</span></div>
          <p className="mt-8 font-serif text-[5.5rem] leading-none tracking-tight text-stone-900 lining-nums">6 m</p>
          <div className="mt-3 flex items-center gap-1"><span className="h-3 w-px bg-stone-900" /><span className="h-px flex-1 bg-stone-900" /><span className="h-3 w-px bg-stone-900" /></div>
          <p className={`mt-3 text-xl leading-snug ${SERIF}`}>de hauteur sous plafond, <span className="italic text-stone-500">dans un atelier du 14e.</span></p>
          <p className="mt-4 text-[13px] leading-relaxed text-stone-600">{b1.titre}, {b1.m2} m². <span className="font-serif lining-nums text-stone-900">{b1.prix}</span></p>
          <p className="mt-4"><span className={LINK}>Voir l’annonce ↗</span></p>
          <p className={`mt-6 border-t border-stone-300 pt-4 ${CAPS}`}>Les autres mesures de la semaine</p>
          <ul className="mt-2 space-y-1.5 text-[13px] text-stone-800">
            <li><span className="font-serif text-[15px] lining-nums">40 m²</span> de terrasse, Paris 16e ↗</li>
            <li><span className="font-serif text-[15px] lining-nums">24 m</span> de long, une péniche face au bois ↗</li>
          </ul>
          <Foot />
        </Mail>

        {/* H — le duel */}
        <Mail letter="H" name="Le duel" idea="Deux biens au même budget, et une question. Chaque clic nous apprend ce que l’abonné cherche." objet="Pour un million : le loft ou la péniche ?" apercu="Deux biens, un budget, à vous de choisir.">
          <p className="text-center"><Wordmark className="text-xl text-stone-900" /></p>
          <p className={`mt-5 text-center text-2xl leading-tight ${SERIF}`}>Autour d’un million, <span className="italic text-stone-500">vous prenez lequel ?</span></p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[b2, b4].map((b) => (
              <div key={b.titre}>
                <Photo className="aspect-[4/5] rounded-[8px]" />
                <p className={`mt-2 ${CAPS}`}>{b.ville}</p>
                <p className={`mt-0.5 text-[15px] leading-snug ${SERIF}`}>{b.titre}</p>
                <p className={`text-[14px] lining-nums ${SERIF}`}>{b.prix}</p>
                <p className="mt-2 flex h-9 items-center justify-center rounded-full border border-stone-900 text-[12px] font-medium text-stone-900">Celui-ci</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[12px] text-stone-500">Votre choix nous aide à vous envoyer les bons biens.</p>
          <Foot />
        </Mail>

        {/* I — le carnet de visite */}
        <Mail letter="I" name="Le carnet de visite" idea="Un seul bien, raconté en quatre temps, comme on le visiterait. Pour les lieux qui méritent qu’on s’y attarde." objet="On pousse la porte : un atelier, Paris 14e" apercu="L’entrée, le volume, la lumière, le détail.">
          <div className="flex items-baseline justify-between border-b border-stone-900 pb-2"><Wordmark className="text-lg text-stone-900" /><span className={CAPS}>Carnet de visite</span></div>
          <p className={`mt-4 text-2xl leading-tight ${SERIF}`}>{b1.titre}</p>
          <div className="mt-4 space-y-4">
            {[['01', 'L’entrée', 'Une porte cochère, une cour pavée, un figuier.'], ['02', 'Le volume', 'Six mètres sous verrière, une mezzanine en retrait.'], ['03', 'La lumière', 'Plein nord : égale toute la journée, sans soleil direct.'], ['04', 'Le détail', 'L’établi d’origine, resté en place.']].map(([n, t, d]) => (
              <div key={n} className="grid grid-cols-[72px_1fr] gap-3">
                <Photo label="" className="aspect-square rounded-[8px]" />
                <div>
                  <p className={CAPS}>{n} · {t}</p>
                  <p className="mt-1 text-[13px] leading-snug text-stone-700">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-baseline justify-between border-t border-stone-300 pt-3"><span className={`text-lg lining-nums ${SERIF}`}>{b1.prix}</span><span className={LINK}>Voir l’annonce ↗</span></p>
          <Foot />
        </Mail>

        {/* J — l'avant-première */}
        <Mail letter="J" name="L’avant-première" idea="Sombre, rare, daté : un bien que personne n’a encore vu, avec l’heure de sa mise en ligne. Le ressort de l’exclusivité." objet="Avant-première : en ligne jeudi à 9 h" apercu="Vous le voyez 48 heures avant tout le monde." dark>
          <div className="flex items-baseline justify-between"><Wordmark className="text-lg text-[#FCFBF8]" /><span className="text-[10px] uppercase tracking-widest text-stone-400">Réservé aux abonnés</span></div>
          <p className="mt-6 text-[10px] uppercase tracking-widest text-stone-400">Avant-première</p>
          <p className="mt-1 font-serif text-3xl leading-[1.05]">En ligne jeudi, <span className="italic text-stone-400">vu ici aujourd’hui.</span></p>
          <div className="relative mt-5 flex aspect-[4/5] items-center justify-center rounded-[8px] bg-stone-700">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FCFBF8]"><span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[#FCFBF8]" /></span>
            <span className="absolute bottom-3 right-3 text-[10px] tabular-nums text-stone-300">1:00</span>
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-stone-400">{b1.ville} · {b1.m2} m²</p>
          <p className="mt-1 font-serif text-xl leading-snug">{b1.titre}</p>
          <p className="mt-1 font-serif text-lg lining-nums text-stone-300">{b1.prix}</p>
          <p className="mt-4"><span className="inline-flex h-10 items-center rounded-full bg-[#FCFBF8] px-5 text-[13px] font-medium text-stone-900">Regarder la visite</span></p>
          <p className="mt-6 text-center text-[10px] leading-relaxed text-stone-400">Curateur de biens atypiques · loftissime.fr · Se désinscrire</p>
        </Mail>

        {/* K — la question */}
        <Mail letter="K" name="La question" idea="La lettre commence par demander ce qu’on cherche. La réponse construit, semaine après semaine, la demande à montrer aux agences." objet="Que cherchez-vous, au juste ?" apercu="Une question, puis les biens de la semaine.">
          <p className="text-center"><Wordmark className="text-xl text-stone-900" /></p>
          <p className={`mt-5 text-2xl leading-tight ${SERIF}`}>Cette semaine, <span className="italic text-stone-500">vous avez envie de quoi ?</span></p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Un loft', 'Un atelier', 'Une terrasse', 'Une péniche', 'Je me laisse surprendre'].map((t) => (
              <span key={t} className="inline-flex h-9 items-center rounded-full border border-stone-900 px-4 text-[12px] font-medium text-stone-900">{t}</span>
            ))}
          </div>
          <p className={`mt-6 border-t border-stone-300 pt-4 ${CAPS}`}>En attendant, trois biens repérés</p>
          <ul className="mt-2 divide-y divide-stone-300">
            {[b1, b3, b5].map((b) => (
              <li key={b.titre} className="flex items-baseline justify-between gap-3 py-2.5">
                <span><span className={`block text-[15px] leading-snug ${SERIF}`}>{b.titre}</span><span className={CAPS}>{b.ville}<Cote m2={b.m2} /></span></span>
                <span className={`flex-none text-[14px] lining-nums ${SERIF}`}>{b.prix}</span>
              </li>
            ))}
          </ul>
          <Foot />
        </Mail>

        {/* L — par budget */}
        <Mail letter="L" name="Par budget" idea="Les biens rangés par prix. La plus pratique : chacun va droit à ce qu’il peut acheter." objet="Trois budgets, cinq biens atypiques" apercu="Moins de 700 000 €, autour d’un million, au-delà.">
          <div className="flex items-baseline justify-between"><Wordmark className="text-lg text-stone-900" /><span className={CAPS}>N° 1 · jeudi 26 novembre</span></div>
          {[['Moins de 700 000 €', [b4]], ['Autour d’un million', [b2, b1, b5]], ['Au-delà', [b3]]].map(([label, list]) => (
            <div key={label as string} className="mt-5">
              <p className={`border-b border-stone-900 pb-1.5 text-lg ${SERIF}`}>{label as string}</p>
              <ul className="divide-y divide-stone-300">
                {(list as typeof BIENS).map((b) => (
                  <li key={b.titre} className="flex items-baseline justify-between gap-3 py-2.5">
                    <span><span className="block text-[14px] leading-snug text-stone-900">{b.titre} ↗</span><span className={CAPS}>{b.ville}<Cote m2={b.m2} /></span></span>
                    <span className={`flex-none text-[14px] lining-nums ${SERIF}`}>{b.prix}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Foot />
        </Mail>
      </main>
    </div>
  );
}

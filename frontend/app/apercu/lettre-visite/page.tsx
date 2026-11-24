import Mesure from '../../lettre/Mesure';

export const metadata = {
  title: 'Maquette : la lettre « un bien, son vrai coût » · loftissime.',
  robots: { index: false, follow: false },
};

// Maquette de travail, non publiée : la lettre recentrée sur un seul bien à potentiel, sans limite de prix, visité à plusieurs.
// Le bien est réel (repéré le 24 novembre 2026) ; tout ce qui est entre crochets attend les mots et les chiffres
// de l'architecte, de l'entrepreneur et du courtier. Aucun chiffre de travaux ni de mensualité n'est inventé ici.

const INK = '#211C15';
const PRIX = 440000;
const NOTAIRE = Math.round((PRIX * 0.08) / 1000) * 1000; // même estimation que sur les fiches du site : environ 8 %, arrondie au millier
const eur = (n: number) => n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €';

function Blank({ children }: { children: React.ReactNode }) {
  return <span className="text-[#8a7f70]">[{children}]</span>;
}

// Une ligne de l'addition : le libellé, des points de conduite, le montant
function Ligne({ label, note, montant, fort = false }: { label: string; note?: string; montant: React.ReactNode; fort?: boolean }) {
  return (
    <div className={`flex items-baseline gap-2 ${fort ? 'pt-3' : 'py-2'}`}>
      <span className={fort ? 'font-serif text-xl' : 'text-[15px]'}>
        {label}
        {note && <span className="block text-xs text-[#74695A]">{note}</span>}
      </span>
      <span aria-hidden className="mb-1 flex-1 self-end border-b border-dotted border-[#211C15]/50" />
      <span className={`font-serif lining-nums whitespace-nowrap ${fort ? 'text-2xl' : 'text-lg'}`}>{montant}</span>
    </div>
  );
}

// Une poutre d'acier en tête de section : un trait épais, deux rivets
function Poutre() {
  return (
    <div aria-hidden className="mb-4 flex h-[9px] items-center justify-between bg-[#211C15] px-1.5">
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3DFD8]" />
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3DFD8]" />
    </div>
  );
}

const AUTRES = [
  { kind: 'hauteur', valeur: 5.1, mesure: '5,10 m', detail: 'sous un volume cathédrale', lieu: 'Vincennes', surface: '32 m² (47 au sol)', prix: 349000 },
  { kind: 'surface', valeur: 16, mesure: '16 m²', detail: 'de terrasse', lieu: 'Pantin', surface: '51 m²', prix: 435000 },
  { kind: 'fabrique', valeur: null, mesure: 'Une copropriété de lofts', detail: '', lieu: 'Romainville', surface: '59 m² (79 au sol)', prix: 379000 },
];

export default function LettreVisite() {
  return (
    <div className="min-h-screen bg-[#EFE7D6] py-8 font-sans text-[#211C15]">
      <p className="mx-auto mb-4 max-w-[600px] px-6 text-xs text-[#74695A] sm:px-0">Maquette de travail, non publiée. Entre crochets : ce qui attend les mots et les chiffres des cinq intervenants.</p>
      <article className="mx-auto w-full max-w-[600px] bg-[#E3DFD8]" style={{ backgroundImage: 'radial-gradient(rgba(33,28,21,.07) 1px, transparent 1.2px), radial-gradient(rgba(255,255,255,.5) 1px, transparent 1.2px)', backgroundSize: '7px 7px, 11px 11px', backgroundPosition: '0 0, 3px 5px' }}>
        {/* Ouverture : un seul bien, son surnom, sa promesse */}
        <header className="bg-[#211C15] px-6 pb-8 pt-8 text-[#FBF5E9] sm:px-10">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-logo text-[19px] font-semibold tracking-[-0.6px]">loftissime.</span>
            <span className="text-xs text-[#a59a88]">Béton ciré, n° 1</span>
          </div>
          <p className="mt-9 text-[13px] text-[#a59a88]">Un bien à potentiel, et ce qu’il coûte vraiment.</p>
          <h1 className="mt-2 font-serif text-[44px] leading-[1.02] sm:text-[56px]">
            L’atelier <span className="italic text-[#a59a88]">du Panthéon</span>
          </h1>
          <div className="mt-4 flex items-center" aria-hidden>
            <span className="h-3.5 w-px bg-[#8c8273]" />
            <span className="h-px flex-1 bg-[#8c8273]" />
            <span className="h-3.5 w-px bg-[#8c8273]" />
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-[#cfc5b4]">
            Paris 5e. Un ancien atelier de 55 m² au sol, au pied d’un immeuble de 1880. Affiché <span className="font-serif text-lg lining-nums text-[#FBF5E9]">{eur(PRIX)}</span>.
          </p>
          <div className="mt-6 overflow-hidden">
            <svg viewBox="0 0 1104 560" className="block w-full" role="img" aria-label="La visite en vidéo">
              <rect width={1104} height={560} fill="#4a4238" />
              <g stroke="#211C15" strokeWidth={10}>
                <path d="M5 5H1099V555H5ZM279 5V555M552 5V555M825 5V555M5 190H1099M5 372H1099" fill="none" />
              </g>
              <circle cx={552} cy={280} r={62} fill="#211C15" />
              <circle cx={552} cy={280} r={58} fill="none" stroke="#FBF5E9" strokeWidth={3} />
              <path d="M535 252L583 280L535 308Z" fill="#FBF5E9" />
            </svg>
          </div>
          <p className="mt-3 text-[13px] text-[#a59a88]">
            Deux minutes de visite avec <Blank>le prénom de l’artiste</Blank> et <Blank>le nom de l’architecte</Blank>.
          </p>
        </header>

        {/* Aujourd'hui, demain : le même lieu, à la même échelle */}
        <section className="px-6 pt-9 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">Aujourd’hui, <span className="italic text-[#74695A]">demain.</span></h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <figure>
              <div className="rounded-lg border border-[#211C15] bg-white p-3">
                <Mesure kind="surface" valeur={55} className="block w-full" />
              </div>
              <figcaption className="mt-2 text-[13px] leading-snug">Une seule pièce de plain-pied. <span className="text-[#74695A]">La silhouette fait 1,75 m.</span></figcaption>
            </figure>
            <figure>
              <div className="flex aspect-[200/190] items-center justify-center rounded-lg border border-dashed border-[#211C15] p-3 text-center text-[13px] leading-snug text-[#8a7f70]">
                [Le croquis de l’architecte, redessiné à la même échelle]
              </div>
              <figcaption className="mt-2 text-[13px] leading-snug"><Blank>Ce que devient la pièce, en une ligne</Blank></figcaption>
            </figure>
          </div>
        </section>

        {/* Ce qu'il en ferait : trois gestes, trois verbes */}
        <section className="px-6 pt-9 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">Ce qu’il en ferait, <span className="italic text-[#74695A]"><Blank>le nom de l’architecte</Blank>.</span></h2>
          <dl className="mt-4 border-t border-[#211C15]">
            {[
              ['J’ouvre', 'ce qu’il supprime pour faire entrer la lumière'],
              ['J’ajoute', 'ce qu’il construit : une mezzanine, une verrière, un rangement'],
              ['Je garde', 'le détail qui fait le caractère du lieu'],
            ].map(([verbe, quoi]) => (
              <div key={verbe} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-[#211C15]/25 py-4">
                <dt className="font-serif text-2xl italic leading-none">{verbe}</dt>
                <dd className="text-[15px] leading-relaxed"><Blank>{quoi}</Blank></dd>
              </div>
            ))}
          </dl>
        </section>

        {/* L'addition : la pièce maîtresse de la lettre */}
        <section className="px-6 pt-10 sm:px-10">
          <div className="relative bg-white px-5 pb-6 pt-7 shadow-[0_1px_0_#D9CFBC] sm:px-7">
            {/* le bord dentelé d'un ticket */}
            <svg aria-hidden viewBox="0 0 600 10" preserveAspectRatio="none" className="absolute inset-x-0 -top-[9px] block h-[10px] w-full">
              <path d={`M0 10${Array.from({ length: 40 }, (_, i) => `L${i * 15 + 7.5} 0L${(i + 1) * 15} 10`).join('')}Z`} fill="#fff" />
            </svg>
            <h2 className="font-serif text-[27px] leading-tight">L’addition</h2>
            <p className="mt-1 text-[13px] text-[#74695A]">Ce que coûte ce bien une fois habitable, pas seulement son prix affiché.</p>

            <div className="mt-5 flex h-3 w-full overflow-hidden rounded-sm border" style={{ borderColor: INK }} aria-hidden>
              <span className="bg-[#211C15]" style={{ width: '68%' }} />
              <span className="bg-[#F6CF4E]" style={{ width: '6%' }} />
              <span className="flex-1" style={{ background: 'repeating-linear-gradient(135deg,#fff 0 4px,#211C15 4px 5px)' }} />
            </div>

            <div className="mt-4">
              <Ligne label="Prix affiché" montant={eur(PRIX)} />
              <Ligne label="Frais de notaire" note="Estimés, environ 8 % dans l’ancien" montant={eur(NOTAIRE)} />
              <Ligne label="Travaux" note="L’ordre de grandeur de l’entrepreneur, signé de son nom" montant={<Blank>à chiffrer</Blank>} />
              <p className="pb-1 text-xs leading-snug text-[#74695A]">Le poste le plus lourd dans ce bien : <Blank>ce que dit l’entrepreneur, en une ligne</Blank></p>
              <div className="mt-2 border-t" style={{ borderColor: INK }}>
                <Ligne fort label="Le vrai prix" montant={<Blank>total</Blank>} />
              </div>
            </div>

          </div>
        </section>

        {/* L'acheteur qu'on imagine, puis ce que le courtier négocierait pour lui */}
        <section className="px-6 pt-9 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">Qui peut l’acheter ? <span className="italic text-[#74695A]">On a imaginé quelqu’un.</span></h2>
          <p className="mt-1 text-[13px] text-[#74695A]">Un acheteur inventé pour l’exemple, à qui ce bien irait bien.</p>
          <div className="mt-4 grid grid-cols-2 border-l border-t border-[#211C15]">
            {[
              ['Qui', 'un prénom, un âge, seul ou à deux'],
              ['Métier', 'la profession, le type de contrat'],
              ['Revenus', 'par mois, nets'],
              ['Apport', 'ce qu’il a de côté'],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-r border-[#211C15] px-3 py-2.5">
                <div className="text-[10px] leading-tight text-[#74695A]">{k}</div>
                <div className="font-serif text-[15px] leading-snug"><Blank>{v}</Blank></div>
              </div>
            ))}
          </div>
          <h3 className="mt-6 font-serif text-xl leading-tight">Ce que <Blank>le nom du courtier</Blank> <span className="italic text-[#74695A]">négocierait pour lui.</span></h3>
          <p className="mt-2 text-[15px] leading-relaxed"><Blank>Ses mots, en trois lignes : la durée qu’il viserait, ce qu’il irait chercher auprès des banques, ce qui ferait passer ou bloquer ce dossier</Blank></p>
          <div className="mt-4 rounded-md bg-[#F6CF4E] px-4 py-3.5">
            <p className="text-[13px]">Soit, pour ce dossier, par mois</p>
            <p className="font-serif text-[30px] leading-none lining-nums"><Blank>la mensualité</Blank></p>
            <p className="mt-1.5 text-xs leading-snug">Travaux compris, sur <Blank>durée</Blank>, au taux de <Blank>taux</Blank>.</p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-[#74695A]"><Blank>Les mentions légales du crédit, telles que le courtier les fournit</Blank></p>
        </section>

        {/* Y vivre : un encart discret, par mois */}
        <section className="px-6 pt-7 sm:px-10">
          <div className="rounded-lg border border-[#211C15]/40 bg-[#EFEBE5] px-4 py-3.5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-lg leading-tight">Y vivre, <span className="italic text-[#74695A]">par mois</span></h2>
              <p className="font-serif text-lg lining-nums"><Blank>total</Blank></p>
            </div>
            <dl className="mt-2 grid grid-cols-3 gap-3 text-[13px]">
              {['Charges de copropriété', 'Énergie', 'Taxe foncière'].map((k) => (
                <div key={k}>
                  <dt className="text-[11px] leading-tight text-[#74695A]">{k}</dt>
                  <dd className="mt-0.5 font-serif text-[15px] lining-nums"><Blank>par mois</Blank></dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-[11px] leading-snug text-[#74695A]">D’après l’annonce et le diagnostic énergétique. À ajouter à la mensualité du crédit.</p>
          </div>
        </section>

        {/* Le point de vigilance : un seul, propre à ce bien, avec l'article du site qui l'explique */}
        <section className="px-6 pt-9 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">Avant de signer, <span className="italic text-[#74695A]">un point de vigilance.</span></h2>
          <p className="mt-4 border-l-2 border-[#211C15] pl-4 font-serif text-xl leading-snug">
            Cet ancien atelier en rez-de-chaussée est-il un logement, ou encore un local ?
          </p>
          <p className="mt-3 text-[15px] leading-relaxed">
            C’est la première chose à vérifier pour ce bien, avant toute offre : elle se lit dans le règlement de copropriété et se confirme auprès de la mairie.
          </p>
          <p className="mt-2 text-sm">
            <a href="/guide" className="font-medium underline underline-offset-4"><Blank>Lire l’article d’État des lieux sur ce point</Blank></a>
          </p>
        </section>

        {/* Trois autres adresses */}
        <section className="px-6 pt-9 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">Trois autres adresses, <span className="italic text-[#74695A]">repérées pour vous.</span></h2>
          <ul className="mt-4 border-t border-[#211C15]">
            {AUTRES.map((a) => (
              <li key={a.lieu} className="flex items-center gap-4 border-b border-[#211C15]/25 py-4">
                <Mesure kind={a.kind} valeur={a.valeur} className="w-[72px] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[22px] leading-tight">
                    {a.mesure} {a.detail && <span className="italic text-[#74695A]">{a.detail}</span>}
                  </p>
                  <p className="mt-1 text-[13px]">{a.lieu}<span className="text-[#74695A]">, {a.surface}</span></p>
                </div>
                <p className="font-serif text-lg lining-nums whitespace-nowrap">{eur(a.prix)}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* La question : on n'y juge pas le bien, on s'y projette */}
        <section className="px-6 pt-8 sm:px-10">
          <h2 className="font-serif text-[22px] leading-tight">Et vous, dans cet atelier, <span className="italic text-[#74695A]">vous feriez quoi ?</span></h2>
          <div className="mt-4 grid grid-cols-3 border-l border-t border-[#211C15]">
            {['Y vivre', 'Y travailler', 'Les deux'].map((t) => (
              <span key={t} className="border-b border-r border-[#211C15] px-3 py-4 text-center font-serif text-lg italic leading-tight">{t}</span>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#74695A]">Un clic suffit. La réponse des lecteurs ouvre le numéro suivant.</p>
        </section>

        {/* Le cartouche */}
        <footer className="px-6 pb-8 pt-8 sm:px-10">
          <div className="grid grid-cols-2 border-l border-t border-[#211C15] sm:grid-cols-4">
            {[
              ['Lettre', 'Béton ciré'],
              ['Numéro', '1'],
              ['Rythme', 'Un jeudi sur deux'],
              ['Périmètre', 'Paris et autour'],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-r border-[#211C15] px-2.5 py-2">
                <div className="text-[10px] leading-tight text-[#74695A]">{k}</div>
                <div className="font-serif text-[15px] leading-tight">{v}</div>
              </div>
            ))}
            <div className="col-span-2 border-b border-r border-[#211C15] p-2.5 sm:col-span-4">
              <span className="text-[10px] leading-tight text-[#74695A]">Ont regardé ce bien</span>
              <div className="font-serif text-[15px] leading-tight">
                <Blank>l’architecte</Blank>, <Blank>l’entrepreneur</Blank>, <Blank>le courtier</Blank>, <Blank>l’artiste</Blank>
              </div>
            </div>
          </div>
          <p className="mt-3.5 text-[11px] leading-relaxed text-[#74695A]">
            Chaque bien est présenté par son agence ou par son propriétaire. Les chiffres de travaux et de financement sont des ordres de grandeur donnés par ceux qui les signent. Loftissime n’est pas une agence et n’intervient pas dans la vente.
          </p>
        </footer>
      </article>
    </div>
  );
}

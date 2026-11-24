import Mesure from '../../lettre/Mesure';

export const metadata = {
  title: 'Maquette : Béton ciré, la newsletter · loftissime.',
  robots: { index: false, follow: false },
};

// Maquette de travail, non publiée : « Béton ciré », la newsletter de loftissime.
// Quatre rubriques : le bien à la une (la visite, puis les comptes), avant de signer, trois autres adresses, la question.
// Le bien est réel (repéré le 24 novembre 2026) ; tout ce qui est entre crochets attend les mots et les chiffres
// de l'architecte, de l'entrepreneur et du courtier. Aucun chiffre de travaux ni de mensualité n'est inventé ici.

const INK = '#211C15';
const BETON = '#E3DFD8';
const PRIX = 440000;
const NOTAIRE = Math.round((PRIX * 0.08) / 1000) * 1000; // même estimation que sur les fiches du site : environ 8 %, arrondie au millier
const eur = (n: number) => n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €';

function Blank({ children }: { children: React.ReactNode }) {
  return <span className="text-[#8a7f70]">[{children}]</span>;
}

// Une ligne de compte : le libellé, des points de conduite, le montant
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

// Une poutre d'acier en tête de rubrique : un trait épais, deux rivets
function Poutre() {
  return (
    <div aria-hidden className="mb-4 flex h-[9px] items-center justify-between bg-[#211C15] px-1.5">
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3DFD8]" />
      <span className="h-[3px] w-[3px] rounded-full bg-[#E3DFD8]" />
    </div>
  );
}

// Le bord dentelé d'un ticket, posé au-dessus d'un bloc blanc
function Dents() {
  return (
    <svg aria-hidden viewBox="0 0 600 10" preserveAspectRatio="none" className="absolute inset-x-0 -top-[9px] block h-[10px] w-full">
      <path d={`M0 10${Array.from({ length: 40 }, (_, i) => `L${i * 15 + 7.5} 0L${(i + 1) * 15} 10`).join('')}Z`} fill="#fff" />
    </svg>
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
      <p className="mx-auto mb-4 max-w-[600px] px-6 text-xs text-[#74695A] sm:px-0">Maquette de travail, non publiée. Entre crochets : ce qui attend les mots et les chiffres des intervenants.</p>
      <article
        className="mx-auto w-full max-w-[600px]"
        style={{
          backgroundColor: BETON,
          backgroundImage: 'radial-gradient(rgba(33,28,21,.07) 1px, transparent 1.2px), radial-gradient(rgba(255,255,255,.5) 1px, transparent 1.2px)',
          backgroundSize: '7px 7px, 11px 11px',
          backgroundPosition: '0 0, 3px 5px',
        }}
      >
        {/* 1. Le bien à la une : la visite */}
        <header className="bg-[#211C15] px-6 pb-8 pt-7 text-[#FBF5E9] sm:px-10">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-serif text-[26px] italic leading-none">Béton ciré</span>
            <span className="text-xs text-[#a59a88]">n° 1, par <span className="font-logo font-semibold tracking-[-0.3px] text-[#FBF5E9]">loftissime.</span></span>
          </div>
          <p className="mt-9 text-[13px] text-[#a59a88]">Le bien à la une, et ce qu’il coûte vraiment.</p>
          <h1 className="mt-2 font-serif text-[44px] leading-[1.02] sm:text-[56px]">
            L’atelier <span className="italic text-[#a59a88]">du Panthéon</span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#cfc5b4]">
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
            Deux minutes de visite avec <Blank>le prénom de l’artiste</Blank> et <Blank>le nom de l’architecte</Blank>, qui dit ce qu’il en ferait.
          </p>
        </header>

        <section className="px-6 pt-9 sm:px-10">
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
                [Le croquis de l’architecte, à la même échelle]
              </div>
              <figcaption className="mt-2 text-[13px] leading-snug"><Blank>Ce que devient la pièce, en une ligne</Blank></figcaption>
            </figure>
          </div>
        </section>

        {/* 1 bis. Les comptes : acheter, puis payer chaque mois */}
        <section className="px-6 pt-10 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">L’addition, <span className="italic text-[#74695A]">sans rien oublier.</span></h2>

          <div className="relative mt-7 bg-white px-5 pb-5 pt-6 sm:px-7">
            <Dents />
            <h3 className="font-serif text-[22px] leading-tight">L’atelier du Panthéon</h3>
            <p className="mt-0.5 text-[13px] text-[#74695A]">Ce que coûte ce bien une fois habitable.</p>
            <div className="mt-4 flex h-3 w-full overflow-hidden rounded-sm border" style={{ borderColor: INK }} aria-hidden>
              <span className="bg-[#211C15]" style={{ width: '68%' }} />
              <span className="bg-[#F6CF4E]" style={{ width: '6%' }} />
              <span className="flex-1" style={{ background: 'repeating-linear-gradient(135deg,#fff 0 4px,#211C15 4px 5px)' }} />
            </div>
            <div className="mt-3">
              <Ligne label="Prix de vente affiché" note="Honoraires d’agence inclus, si le bien est vendu par une agence" montant={eur(PRIX)} />
              <Ligne label="Frais de notaire" note="Estimés, environ 8 % dans l’ancien" montant={eur(NOTAIRE)} />
              <Ligne label="Travaux" note="L’ordre de grandeur de l’entrepreneur, signé de son nom" montant={<Blank>à chiffrer</Blank>} />
              <div className="mt-2 border-t" style={{ borderColor: INK }}>
                <Ligne fort label="Le vrai prix" montant={<Blank>total</Blank>} />
              </div>
            </div>
          </div>

          <h3 className="mt-8 font-serif text-[22px] leading-tight">Qui pourrait l’acheter ? <span className="italic text-[#74695A]">On a imaginé quelqu’un.</span></h3>
          <div className="mt-3 grid grid-cols-2 border-l border-t border-[#211C15]">
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
          <p className="mt-3 text-[15px] leading-relaxed">
            <span className="font-serif italic">Ce que <Blank>le nom du courtier</Blank> négocierait pour lui :</span> <Blank>ses mots, en trois lignes : la durée qu’il viserait, ce qu’il irait chercher auprès des banques, ce qui ferait passer ce dossier</Blank>
          </p>

          <div className="relative mt-8 bg-white px-5 pb-5 pt-6 sm:px-7">
            <Dents />
            <h3 className="font-serif text-[22px] leading-tight">Par mois, tout compris</h3>
            <p className="mt-0.5 text-[13px] text-[#74695A]">Ce que cet acheteur paierait chaque mois pour y vivre.</p>
            <div className="mt-3">
              <Ligne label="Mensualité du crédit" note="Travaux compris, calculée par le courtier" montant={<Blank>par mois</Blank>} />
              <Ligne label="Charges de copropriété" note="Données par l’annonce" montant={<Blank>par mois</Blank>} />
              <Ligne label="Énergie" note="D’après le diagnostic énergétique" montant={<Blank>par mois</Blank>} />
              <Ligne label="Taxe foncière" note="Ramenée au mois" montant={<Blank>par mois</Blank>} />
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4 rounded-md bg-[#F6CF4E] px-4 py-3.5">
              <span className="font-serif text-xl">Total par mois</span>
              <span className="font-serif text-[30px] leading-none lining-nums"><Blank>total par mois</Blank></span>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#74695A]">
              Crédit sur <Blank>durée</Blank>, au taux de <Blank>taux</Blank>. <Blank>Les mentions légales du crédit, telles que le courtier les fournit</Blank>
            </p>
          </div>
        </section>

        {/* 2. Avant de signer */}
        <section className="px-6 pt-10 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">Avant de signer, <span className="italic text-[#74695A]">un point de vigilance.</span></h2>
          <p className="mt-4 border-l-2 border-[#211C15] pl-4 font-serif text-xl leading-snug">
            Cet ancien atelier en rez-de-chaussée est-il un logement, ou encore un local ?
          </p>
          <p className="mt-3 text-[15px] leading-relaxed">
            C’est la première chose à vérifier pour ce bien, avant toute offre : elle se lit dans le règlement de copropriété et se confirme auprès de la mairie.
          </p>
          <p className="mt-2 text-sm">
            <a href="/guide" className="font-medium underline underline-offset-4"><Blank>Lire l’article du site sur ce point</Blank></a>
          </p>
        </section>

        {/* 3. Trois autres adresses */}
        <section className="px-6 pt-10 sm:px-10">
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

        {/* 4. La question : elle porte sur le lecteur, pas sur le bien à la une */}
        <section className="px-6 pt-10 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">La question, <span className="italic text-[#74695A]">et vous, vous rêvez de quoi ?</span></h2>
          <div className="mt-4 grid grid-cols-2 border-l border-t border-[#211C15] sm:grid-cols-3">
            {['Un loft', 'Un atelier d’artiste', 'Un dernier étage', 'Une maison en ville', 'Une péniche', 'Surprenez-moi'].map((t) => (
              <span key={t} className="border-b border-r border-[#211C15] bg-white/60 px-3 py-4 text-center font-serif text-[17px] italic leading-tight">{t}</span>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#74695A]">Un clic suffit. Vos réponses décident des prochaines visites.</p>
        </section>

        {/* Le bloc final */}
        <footer className="mt-10 bg-[#211C15] px-6 pb-8 pt-8 text-[#FBF5E9] sm:px-10">
          <p className="font-serif text-[40px] italic leading-none">Béton ciré</p>
          <p className="mt-2 text-sm text-[#cfc5b4]">La newsletter de ceux qui aiment les lieux atypiques, par <span className="font-logo font-semibold tracking-[-0.3px] text-[#FBF5E9]">loftissime.</span></p>
          <p className="mt-6 text-[13px] leading-relaxed text-[#a59a88]">
            Ont collaboré à ce numéro : <Blank>l’architecte</Blank>, <Blank>l’entrepreneur</Blank>, <Blank>le courtier</Blank>, <Blank>l’artiste</Blank>.
          </p>
          <p className="mt-4 text-sm">
            <span className="underline underline-offset-4">Faire suivre à quelqu’un qui cherche</span>
          </p>
          <p className="mt-6 border-t border-[#4a4238] pt-4 text-[11px] leading-relaxed text-[#8c8273]">
            Chaque bien est présenté par son agence ou par son propriétaire. Les chiffres de travaux et de financement sont des ordres de grandeur donnés par ceux qui les signent. Loftissime n’est pas une agence et n’intervient pas dans la vente. <span className="underline">Se désinscrire</span>
          </p>
        </footer>
      </article>
    </div>
  );
}

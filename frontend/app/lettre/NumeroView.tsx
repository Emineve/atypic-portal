import Mesure from './Mesure';
import type { LetterItem } from './LetterView';
import { CHOIX, comptes, eur, lecteurVideo, liensDuNumero, type NumeroContent } from '../../lib/numero';
import { MOIS, NEWSLETTERS, themeDe } from '../../lib/newsletters';

// Un numéro de la newsletter de Loftissime tel qu'il se lit : la même vue sert à l'aperçu du back-office et à la page du numéro sur le site.
// `brouillon` : les champs vides s'affichent entre crochets, pour voir ce qui manque. Sans lui, une ligne vide n'apparaît pas.

const INK = '#3A2E2A';

function Ligne({ label, note, montant, fort = false }: { label: string; note?: string; montant: React.ReactNode; fort?: boolean }) {
  return (
    <div className={`flex items-baseline gap-2 ${fort ? 'pt-3' : 'py-2'}`}>
      <span className={fort ? 'font-serif text-xl' : 'text-[15px]'}>
        {label}
        {note && <span className="block text-xs text-[#74695A]">{note}</span>}
      </span>
      <span aria-hidden className="mb-1 flex-1 self-end border-b border-dotted border-[#3A2E2A]/50" />
      <span className={`font-serif lining-nums whitespace-nowrap ${fort ? 'text-2xl' : 'text-lg'}`}>{montant}</span>
    </div>
  );
}

function Poutre() {
  return <div aria-hidden className="mb-3.5 h-1.5 w-11 bg-[#F6CF4E]" />;
}

// Le bord dentelé d'un ticket
function Dents({ bas = false }: { bas?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 600 10" preserveAspectRatio="none" className={`block h-[10px] w-full ${bas ? 'rotate-180' : ''}`}>
      <path d={`M0 10${Array.from({ length: 40 }, (_, i) => `L${i * 15 + 7.5} 0L${(i + 1) * 15} 10`).join('')}Z`} fill="#fff" />
    </svg>
  );
}

// Un ticket de caisse : papier blanc à bords dentelés, posé sur une bande plus sombre, comme dans le mail
function Ticket({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-6 mt-6 bg-[#E6DFD0] px-6 py-7 sm:-mx-10 sm:px-10">
      <Dents />
      <div className="bg-white px-5 pb-6 pt-4 sm:px-7">{children}</div>
      <Dents bas />
    </div>
  );
}

const Marque = () => <span className="font-logo font-semibold tracking-[-0.3px] text-[#3A2E2A]">loftissime.</span>;

export default function NumeroView({ numero, c, items, brouillon = false }: { numero: number; c: NumeroContent; items: { une: LetterItem | null; autres: LetterItem[] }; brouillon?: boolean }) {
  const { une, autres } = items;
  const k = comptes(c, une);
  const liens = liensDuNumero(c, une, autres);
  const a = (s?: string | null) => !!s && !!s.trim();
  // Un champ vide : entre crochets en brouillon, rien sinon
  const T = ({ v, ph }: { v?: string | null; ph: string }) => (a(v) ? <>{v}</> : brouillon ? <span className="text-[#8a7f70]">[{ph}]</span> : null);
  const M = ({ v, ph }: { v: number | null; ph: string }) => (v != null ? <>{eur(v)}</> : brouillon ? <span className="text-[#8a7f70]">[{ph}]</span> : null);
  const nomComplet = [c.surnom, c.surnom_italique].filter(a).join(' ');
  const part = (n: number | null) => (k.total && n ? `${Math.max(2, Math.round((n / k.total) * 100))}%` : undefined);
  const profil: [string, string | undefined, string][] = [
    ['Qui', c.profil_qui, 'un prénom, un âge, seul ou à deux'],
    ['Métier', c.profil_metier, 'la profession, le type de contrat'],
    ['Revenus', c.profil_revenus, 'par mois, nets'],
    ['Apport', c.profil_apport, 'ce qu’il a de côté'],
  ];
  const aProfil = profil.some(([, v]) => a(v));
  const aMois = k.mois != null;
  const aVigilance = a(c.vigilance_question);
  const video = (
    <svg viewBox="0 0 1104 560" className="block w-full" role="img" aria-label="La visite en vidéo">
      <rect width={1104} height={560} fill="#4a4238" />
      <g stroke={INK} strokeWidth={10}>
        <path d="M5 5H1099V555H5ZM279 5V555M552 5V555M825 5V555M5 190H1099M5 372H1099" fill="none" />
      </g>
      <circle cx={552} cy={280} r={62} fill={INK} />
      <circle cx={552} cy={280} r={58} fill="none" stroke="#FCFBF8" strokeWidth={3} />
      <path d="M535 252L583 280L535 308Z" fill="#FCFBF8" />
    </svg>
  );

  return (
    <article className="mx-auto w-full max-w-[600px] bg-[#FCFBF8] font-sans text-[#3A2E2A]">
      {/* 1. Le bien à la une : la visite */}
      {/* la matière du thème, en bandeau de tête */}
      <div aria-hidden className="h-12" style={themeDe(c.theme).matiere} />
      <header className="px-6 pt-8 sm:px-10">
        <p className="font-serif text-[52px] italic leading-none sm:text-[64px]">{themeDe(c.theme).nom}</p>
        <p className="mt-3 text-sm leading-relaxed text-[#74695A]">
          <span className="mr-2 font-serif text-[17px] italic text-[#3A2E2A]">n° {numero}</span>
          La newsletter de ceux qui aiment les biens atypiques, by <Marque />
        </p>
        <div className="mt-6 rounded-[14px] border-2 border-[#3A2E2A] bg-white p-5 shadow-[5px_5px_0_#3A2E2A] sm:p-6">
        <p className="text-sm text-[#74695A]">Le bien à la une, et ce qu’il coûte vraiment.</p>
        <h1 className="mt-2 font-serif text-[40px] leading-[1.04] sm:text-[48px]">
          <T v={c.surnom} ph="le surnom du bien" /> {a(c.surnom_italique) && <span className="italic text-[#74695A]">{c.surnom_italique}</span>}
        </h1>
        <p className="mt-4 text-base leading-relaxed">
          <T v={c.chapo} ph="où il est, ce que c’est, en deux phrases" />
        </p>
        {k.prix != null && (
          <p className="mt-4 text-sm text-[#74695A]">
            Affiché <span className="whitespace-nowrap rounded-md bg-[#F6CF4E] px-2.5 py-1 font-serif text-2xl lining-nums text-[#3A2E2A]">{eur(k.prix)}</span>
          </p>
        )}
        <div id="video" className="mt-6 scroll-mt-24 overflow-hidden">
          {(() => {
            const lecteur = lecteurVideo(c.video_url);
            if (lecteur?.type === 'cadre') return <iframe src={lecteur.src} title="La visite en vidéo" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen className="block aspect-video w-full rounded-[10px] border-0" />;
            if (lecteur?.type === 'fichier') return <video src={lecteur.src} controls playsInline preload="metadata" className="block aspect-video w-full rounded-[10px] bg-black" />;
            return liens.video ? <a href={liens.video} target="_blank" rel="noreferrer" aria-label="Voir la visite en vidéo">{video}</a> : video;
          })()}
        </div>
        {(a(c.video_legende) || brouillon) && (
          <p className="mt-3 text-sm text-[#74695A]"><T v={c.video_legende} ph="qui fait la visite, en une phrase" /></p>
        )}
        {liens.une && (
          <p className="mt-4 text-sm">
            <a href={liens.une} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              {une?.seller === 'particulier' ? 'Voir l’annonce du propriétaire' : `Voir l’annonce${une?.agency_name ? ` chez ${une.agency_name}` : ''}`}
            </a>
          </p>
        )}
        </div>
      </header>

      {(une || brouillon) && (
        <section className="px-6 pt-9 sm:px-10">
          <h2 className="font-serif text-[27px] leading-tight">Aujourd’hui, <span className="italic text-[#74695A]">demain.</span></h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <figure>
              <div className="rounded-[10px] border-2 border-[#3A2E2A] bg-white p-3">
                <Mesure kind={c.dessin_kind || une?.kind || 'surface'} valeur={c.dessin_kind ? c.dessin_valeur : une?.valeur} className="block w-full" />
              </div>
              <figcaption className="mt-2 text-[13px] leading-snug"><T v={c.aujourdhui} ph="le lieu aujourd’hui, en une ligne" /> <span className="text-[#74695A]">La silhouette fait 1,75 m.</span></figcaption>
            </figure>
            <figure>
              {a(c.croquis_url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.croquis_url} alt="Le croquis de l’architecte" className="block w-full rounded-lg border border-[#3A2E2A] bg-white" />
              ) : (
                <div className="flex aspect-[200/190] items-center justify-center rounded-lg border border-dashed border-[#3A2E2A] p-3 text-center text-[13px] leading-snug text-[#8a7f70]">
                  {brouillon ? '[Le croquis de l’architecte, à la même échelle]' : 'Le projet de l’architecte'}
                </div>
              )}
              <figcaption className="mt-2 text-[13px] leading-snug"><T v={c.demain} ph="ce que devient le lieu, en une ligne" /></figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* L'addition : acheter, puis payer chaque mois */}
      <section className="px-6 pt-10 sm:px-10">
        <Poutre />
        <h2 className="font-serif text-[27px] leading-tight">L’addition, <span className="italic text-[#74695A]">sans rien oublier.</span></h2>

        <Ticket>
          <h3 className="font-serif text-[22px] leading-tight">{nomComplet || (brouillon ? '[le surnom du bien]' : 'Le bien à la une')}</h3>
          <p className="mt-0.5 text-[13px] text-[#74695A]">Ce que coûte ce bien une fois habitable.</p>
          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-sm border" style={{ borderColor: INK }} aria-hidden>
            <span className="bg-[#3A2E2A]" style={{ width: part(k.prix) || '68%' }} />
            <span className="bg-[#F6CF4E]" style={{ width: part(k.notaire) || '6%' }} />
            <span className="flex-1" style={{ background: 'repeating-linear-gradient(135deg,#fff 0 4px,#3A2E2A 4px 5px)' }} />
          </div>
          <div className="mt-3">
            <Ligne label="Prix de vente affiché" note={une?.seller === 'particulier' ? 'Vendu en direct par son propriétaire' : 'Honoraires d’agence inclus'} montant={<M v={k.prix} ph="prix" />} />
            <Ligne label="Frais de notaire" note={`Estimés, environ ${String(k.pct).replace('.', ',')} % dans l’ancien`} montant={<M v={k.notaire} ph="frais" />} />
            {(k.travaux != null || brouillon) && (
              <Ligne label="Travaux" note={a(c.travaux_par) ? `Ordre de grandeur donné par ${c.travaux_par}` : brouillon ? '[qui signe ce chiffre]' : 'Ordre de grandeur'} montant={<M v={k.travaux} ph="à chiffrer" />} />
            )}
          </div>
          {(k.total != null || brouillon) && (
            <div className="mt-3 flex items-baseline justify-between gap-4 rounded-md bg-[#F6CF4E] px-4 py-3.5">
              <span className="font-serif text-xl">Le vrai prix</span>
              <span className="font-serif text-[30px] leading-none lining-nums"><M v={k.total} ph="total" /></span>
            </div>
          )}
        </Ticket>

        {(aProfil || brouillon) && (
          <>
            <h3 className="mt-8 font-serif text-[22px] leading-tight">Qui pourrait l’acheter ? <span className="italic text-[#74695A]">On a imaginé quelqu’un.</span></h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {profil.map(([label, v, ph]) => (
                <div key={label} className="rounded-[10px] border border-[#E3D9C6] bg-white px-3.5 py-3">
                  <div className="text-xs leading-tight text-[#74695A]">{label}</div>
                  <div className="mt-0.5 font-serif text-[17px] leading-snug"><T v={v} ph={ph} /></div>
                </div>
              ))}
            </div>
          </>
        )}
        {(a(c.courtier_mots) || brouillon) && (
          <p className="mt-3 text-[15px] leading-relaxed">
            <span className="font-serif italic text-[#74695A]">Ce que <T v={c.courtier_nom} ph="le nom du courtier" /> négocierait pour lui :</span> <T v={c.courtier_mots} ph="ses mots, en trois lignes" />
          </p>
        )}

        {(aMois || brouillon) && (
          <Ticket>
            <h3 className="font-serif text-[22px] leading-tight">Par mois, tout compris</h3>
            <p className="mt-0.5 text-[13px] text-[#74695A]">Ce que cet acheteur paierait chaque mois pour y vivre.</p>
            <div className="mt-3">
              <Ligne label="Mensualité du crédit" note="Travaux compris, calculée par le courtier" montant={<M v={c.mensualite ?? null} ph="par mois" />} />
              {(c.charges != null || brouillon) && <Ligne label="Charges de copropriété" note="Données par l’annonce" montant={<M v={c.charges ?? null} ph="par mois" />} />}
              {(c.energie != null || brouillon) && <Ligne label="Énergie" note="D’après le diagnostic énergétique" montant={<M v={c.energie ?? null} ph="par mois" />} />}
              {(c.taxe != null || brouillon) && <Ligne label="Taxe foncière" note="Ramenée au mois" montant={<M v={c.taxe ?? null} ph="par mois" />} />}
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4 rounded-md bg-[#F6CF4E] px-4 py-3.5">
              <span className="font-serif text-xl">Total par mois</span>
              <span className="font-serif text-[30px] leading-none lining-nums"><M v={k.mois} ph="total par mois" /></span>
            </div>
            {(a(c.credit_mentions) || brouillon) && (
              <p className="mt-2 text-xs leading-relaxed text-[#74695A]"><T v={c.credit_mentions} ph="durée, taux et mentions légales du crédit, telles que le courtier les fournit" /></p>
            )}
          </Ticket>
        )}
      </section>

      {/* 2. Avant la promesse */}
      {(aVigilance || brouillon) && (
        <section className="px-6 pt-10 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">Avant la promesse, <span className="italic text-[#74695A]">un point de vigilance.</span></h2>
          <div className="mt-4 rounded-[14px] border-2 border-[#3A2E2A] bg-[#FCF1C9] p-5 shadow-[5px_5px_0_#3A2E2A]">
          <p className="font-serif text-[23px] leading-snug"><T v={c.vigilance_question} ph="la question à se poser pour ce bien" /></p>
          {(a(c.vigilance_texte) || brouillon) && <p className="mt-3 text-[15px] leading-relaxed"><T v={c.vigilance_texte} ph="pourquoi, et où cela se vérifie" /></p>}
          {liens.vigilance ? (
            <p className="mt-2 text-sm"><a href={liens.vigilance} className="font-medium underline underline-offset-4">Lire l’article sur ce point</a></p>
          ) : (
            brouillon && <p className="mt-2 text-sm text-[#8a7f70]">[l’article du site sur ce point]</p>
          )}
          </div>
        </section>
      )}

      {/* 3. Trois autres biens */}
      {autres.length > 0 && (
        <section className="px-6 pt-10 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">{autres.length === 3 || autres.length === 0 ? 'Trois autres biens,' : autres.length === 1 ? 'Un autre bien,' : 'Deux autres biens,'} <span className="italic text-[#74695A]">{autres.length === 1 ? 'sélectionné pour vous.' : 'sélectionnés pour vous.'}</span></h2>
          <ul className="mt-4 rounded-[14px] border-2 border-[#3A2E2A] bg-white px-5 shadow-[5px_5px_0_#3A2E2A]">
            {autres.map((b, i) => (
              <li key={b.id || i} className="flex items-center gap-4 border-b border-[#E3D9C6] py-4 last:border-b-0">
                {b.kind !== 'aucun' && <Mesure kind={b.kind} valeur={b.valeur} className="w-[72px] shrink-0" />}
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[22px] leading-tight">
                    {b.mesure} {b.mesure_detail && <span className="italic text-[#74695A]">{b.mesure_detail}</span>}
                  </p>
                  <p className="mt-1 text-[13px]">{b.lieu}{b.surface && <span className="text-[#74695A]">, {b.surface}</span>}</p>
                  {liens[`autre${i + 1}`] && (
                    <p className="mt-1 text-[13px]"><a href={liens[`autre${i + 1}`]} target="_blank" rel="noreferrer" className="underline underline-offset-4">Voir l’annonce</a></p>
                  )}
                </div>
                <p className="font-serif text-lg lining-nums whitespace-nowrap">{eur(b.prix)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4. La question : elle porte sur le lecteur, pas sur le bien à la une */}
      {c.question_on !== false && (
        <section className="px-6 pt-10 sm:px-10">
          <Poutre />
          <h2 className="font-serif text-[27px] leading-tight">La question, <span className="italic text-[#74695A]">et vous, vous rêvez de quoi ?</span></h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CHOIX.map(([code, t]) => (
              <span key={code} className="flex min-h-[52px] items-center justify-center rounded-full border-2 border-[#3A2E2A] bg-white px-3 py-2 text-center font-serif text-[16px] italic leading-tight">{t}</span>
            ))}
          </div>
          <p className="mt-3 text-sm text-[#74695A]">On répond d’un clic depuis le mail. Vos réponses décident des prochaines visites.</p>
        </section>
      )}

      {/* Le mois prochain : la barre des douze matières, celle du prochain thème mise en avant */}
      {(() => {
        const rang = NEWSLETTERS.findIndex((n) => n.slug === themeDe(c.theme).slug);
        const suivant = NEWSLETTERS[(rang + 1) % NEWSLETTERS.length];
        return (
          <section className="px-6 pt-10 sm:px-10">
            <Poutre />
            <h2 className="font-serif text-[27px] leading-tight">Et le mois prochain, <span className="italic text-[#74695A]">en {MOIS[suivant.mois - 1]}.</span></h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/lettre/barre-${suivant.slug}.png?v=3`} alt="" className="mt-4 block w-full mix-blend-multiply" />
            <p className="mt-4 font-serif text-[40px] italic leading-none">{suivant.nom}</p>
            <p className="mt-2.5 text-[15px] leading-relaxed">{suivant.sujet}</p>
          </section>
        );
      })()}

      {/* Le bloc final */}
      <footer className="mt-12 bg-[#3A2E2A] px-6 pb-8 pt-8 text-[#FCFBF8] sm:px-10">
        <p className="font-logo text-[34px] font-semibold leading-none tracking-[-1px]">loftissime<span className="text-[#F6CF4E]">.</span></p>
        <p className="mt-3 text-sm text-[#cfc5b4]">La newsletter de ceux qui aiment les biens atypiques. Douze numéros par an, un thème par mois.</p>
        {(a(c.collaborateurs) || brouillon) && (
          <p className="mt-6 text-[13px] leading-relaxed text-[#a59a88]">Ont collaboré à ce numéro : <T v={c.collaborateurs} ph="l’architecte, l’entrepreneur, le courtier, le notaire, le négociateur" /></p>
        )}
        <p className="mt-6 border-t border-[#4a4238] pt-4 text-[11px] leading-relaxed text-[#8c8273]">
          Chaque bien est vendu en direct par son propriétaire ou par l’intermédiaire d’une agence. Les chiffres de travaux et de financement sont des ordres de grandeur donnés par ceux qui les signent. Loftissime n’est pas une agence et n’intervient pas dans la vente.
        </p>
      </footer>
    </article>
  );
}

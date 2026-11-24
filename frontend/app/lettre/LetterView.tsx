import GuideArt from '../guide/GuideArt';
import Mesure from './Mesure';

// La lettre « loftissime. », telle qu'elle se lit : la même vue sert à l'aperçu du back-office et à la page d'archive.

export type LetterItem = {
  id?: string;
  rubrique: string;
  mesure: string | null;
  mesure_detail: string | null;
  phrase: string | null;
  lieu: string | null;
  surface: string | null;
  prix: number | null;
  usage_note: string | null;
  agency_name: string | null;
  agency_url: string | null;
  kind: string;
  valeur: number | null;
  ordre?: number | null;
  seller?: string | null;
};

export type LetterContent = {
  ouverture?: { on?: boolean; agence?: string; mesure?: string; detail?: string; texte?: string; prix?: string; lien?: string; video_url?: string };
  sous_titre?: string;
  articles?: { slug: string; rubrique: string }[];
  carte?: { on?: boolean; nom?: string; texte?: string; signature?: string; lien?: string };
  question?: { on?: boolean; titre?: string; titre_italique?: string; choix?: string[] };
};

export type LetterIssue = {
  numero: number;
  date_parution: string | null;
  titre: string | null;
  resume: string | null;
  paru: boolean;
  content: LetterContent;
};

export type LetterArticle = { slug: string; title: string; art: string; rubrique: string };

export function dateLettre(d: string | null, long = true): string {
  if (!d) return '';
  return new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', long ? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long', year: 'numeric' });
}

const euros = (n: number | null) => (n == null ? '' : n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' €');

// Un champ vide s'affiche entre crochets tant que le numéro n'est pas paru, pour voir ce qui manque
function Blank({ v, ph, draft }: { v?: string | null; ph: string; draft: boolean }) {
  if (v && v.trim()) return <>{v}</>;
  return draft ? <span className="opacity-60">[{ph}]</span> : null;
}

export default function LetterView({ issue, items, articles }: { issue: LetterIssue; items: LetterItem[]; articles: LetterArticle[] }) {
  const c = issue.content || {};
  const o = c.ouverture || {};
  const draft = !issue.paru;
  const biens = items.filter((i) => i.rubrique !== 'avant_premiere');
  // Deux sélections : les biens de la semaine, puis ceux sous 500 000 €, ouverts à la petite couronne
  const grands = biens.filter((i) => i.rubrique !== 'petit_prix');
  const petits = biens.filter((i) => i.rubrique === 'petit_prix');
  const horsParis = biens.some((i) => i.lieu && !/^paris\b/i.test(i.lieu.trim()));
  // Ce que l'architecte ferait du bien : ses mots, sa signature
  const architecte = c.carte?.on ? (
            <div className="border-b border-[#D9CFBC] py-5">
              <h2 className="font-serif text-[22px] leading-tight">L’œil de l’architecte, <span className="italic text-[#74695A]"><Blank v={c.carte!.nom} ph="le nom de l’architecte" draft={draft} />.</span></h2>
              <p className="mt-2.5 whitespace-pre-line text-[15px] leading-relaxed"><Blank v={c.carte!.texte} ph="Ce qu’il ou elle ferait de ce bien, en cinq lignes écrites de sa main." draft={draft} /></p>
              <p className="mt-2 text-[13px] text-[#74695A]">
                {c.carte!.lien && c.carte!.signature ? <a href={c.carte!.lien} target="_blank" rel="noreferrer" className="underline underline-offset-4">{c.carte!.signature}</a> : <Blank v={c.carte!.signature} ph="Son agence, avec un lien vers son site" draft={draft} />}
              </p>
            </div>
  ) : null;
  const bien = (x: LetterItem, i: number) => (
              <li key={x.id || i} className="flex gap-4 border-b border-[#D9CFBC] py-7 sm:gap-5">
                {x.kind !== 'aucun' && <Mesure kind={x.kind} valeur={x.valeur} className="w-[104px] shrink-0 self-start sm:w-[150px]" />}
                <div className="min-w-0">
                  <p className="font-serif text-[34px] leading-none sm:text-[40px]">{x.mesure}</p>
                  {x.mesure_detail && <p className="mt-1 font-serif text-[22px] italic leading-tight text-[#74695A]">{x.mesure_detail}</p>}
                  <p className="mt-3 text-[13px] leading-normal">
                    {x.lieu}
                    {x.surface && <span className="text-[#74695A]">, {x.surface}</span>}
                  </p>
                  {x.phrase && <p className="mt-1.5 text-[15px] leading-relaxed text-[#4a4238]">{x.phrase}</p>}
                  {x.usage_note && <p className="mt-1.5 text-[13px] leading-normal text-[#74695A]">{x.usage_note}.</p>}
                  <p className="mt-3 font-serif text-[21px] leading-tight lining-nums">{euros(x.prix)}</p>
                  <p className="mt-1.5 text-sm font-medium">
                    {x.agency_url ? (
                      <a href={x.agency_url} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                        {x.seller === 'particulier' ? 'Voir l’annonce, vendu par un particulier' : `Voir l’annonce chez ${x.agency_name}`}
                      </a>
                    ) : (
                      <span>
                        {x.seller === 'particulier' ? 'Vendu par un particulier' : x.agency_name}
                        {draft && <span className="ml-2 bg-[#F6CF4E] px-1.5 py-0.5 text-xs font-normal">lien à trouver</span>}
                      </span>
                    )}
                  </p>
                </div>
              </li>
  );
  return (
    <article className="mx-auto w-full max-w-[600px] bg-[#FBF5E9] text-[#211C15]">
      {/* Ouverture : le bien en avant-première */}
      <section className="bg-[#211C15] px-6 pb-9 pt-8 sm:px-10">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-[Poppins,Helvetica,Arial,sans-serif] text-[19px] font-semibold tracking-[-0.6px] text-[#FBF5E9]">loftissime.</span>
          <span className="text-xs text-[#a59a88]">n° {issue.numero}{issue.date_parution ? `, ${dateLettre(issue.date_parution)}` : ''}</span>
        </div>
        <h1 className="mt-9 font-serif text-[44px] italic leading-none text-[#FBF5E9] sm:text-[58px]">Avant-première</h1>
        <div className="mt-4 flex items-center" aria-hidden>
          <span className="h-3.5 w-px bg-[#8c8273]" />
          <span className="h-px flex-1 bg-[#8c8273]" />
          <span className="h-3.5 w-px bg-[#8c8273]" />
        </div>
        {o.on !== false && (
          <>
            <p className="mt-3 text-[13px] leading-normal text-[#a59a88]">
              Un bien que vous ne trouverez pas encore en ligne. Cette semaine, avec{' '}
              <span className="text-[#FBF5E9]"><Blank v={o.agence} ph="l’agence invitée" draft={draft} /></span>.
            </p>
            <a href={o.video_url || o.lien || undefined} className="mt-6 block overflow-hidden rounded-[10px] bg-[#3a332a]">
              <svg viewBox="0 0 1104 621" className="block w-full" role="img" aria-label="La visite du bien en vidéo">
                <g stroke="#6b6154" strokeWidth={2} fill="none">
                  <path d="M90 520H1014M210 520V150H894V520M210 150L552 70L894 150M552 70V520" />
                </g>
                <circle cx={552} cy={310} r={62} fill="none" stroke="#FBF5E9" strokeWidth={3} />
                <path d="M534 280L584 310L534 340Z" fill="#FBF5E9" />
                {draft && !o.video_url && (
                  <text x={552} y={590} textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize={20} letterSpacing={4} fill="#a59a88">LA VIDÉO VIENT ICI</text>
                )}
              </svg>
            </a>
            <p className="mt-6 font-serif text-[38px] leading-[1.05] text-[#FBF5E9]"><Blank v={o.mesure} ph="La caractéristique" draft={draft} /></p>
            <p className="mt-1 font-serif text-[22px] italic leading-tight text-[#a59a88]"><Blank v={o.detail} ph="ce qu’elle dit du bien" draft={draft} /></p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#cfc5b4]"><Blank v={o.texte} ph="Ville, surface. Deux lignes sur le bien, et la date de sa mise en ligne." draft={draft} /></p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <a href={o.video_url || o.lien || undefined} className="inline-block rounded-full bg-[#FBF5E9] px-6 py-3 text-sm font-medium text-[#211C15] no-underline">Regarder la visite</a>
              <span className="font-serif text-2xl text-[#FBF5E9] lining-nums"><Blank v={o.prix} ph="Prix" draft={draft} /></span>
            </div>
          </>
        )}
      </section>

      {/* Déjà en ligne */}
      {(grands.length > 0 || articles.length > 0) && (
        <section className="px-6 pt-9 sm:px-10">
          <h2 className="font-serif text-[27px] leading-tight">Déjà en ligne, <span className="italic text-[#74695A]">repérés cette semaine à Paris.</span></h2>
          {c.sous_titre && <p className="mt-2 text-[13px] leading-normal text-[#74695A]">{c.sous_titre}</p>}
          <ul className="mt-4 border-t border-[#211C15]">
            {grands.map(bien)}
            {articles.map((a) => (
              <li key={a.slug} className="border-b border-[#D9CFBC] py-6">
                <a href={`/guide/${a.slug}`} className="flex items-center gap-5 no-underline">
                  <span className="block h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg border border-[#211C15] bg-[#F6CF4E]">
                    <GuideArt art={a.art as never} fit="slice" className="block h-full w-full" />
                  </span>
                  <span>
                    <span className="block text-[13px] text-[#74695A]">{a.rubrique}</span>
                    <span className="mt-1 block font-serif text-xl leading-tight text-[#211C15]">{a.title}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sous 500 000 € */}
      {petits.length > 0 && (
        <section className="px-6 pt-9 sm:px-10">
          <h2 className="font-serif text-[27px] leading-tight">Sous 500 000 €, <span className="italic text-[#74695A]">à Paris et autour.</span></h2>
          <ul className="mt-4 border-t border-[#211C15]">{petits.map(bien)}</ul>
          {architecte}
        </section>
      )}

      {/* L'œil de l'architecte, seul, quand le numéro n'a pas de bien sous 500 000 € */}
      {c.carte?.on && petits.length === 0 && <section className="px-6 pt-2 sm:px-10">{architecte}</section>}

      {/* La question */}
      {c.question?.on !== false && (c.question?.choix?.length || 0) > 0 && (
        <section className="px-6 pt-7 sm:px-10">
          <h2 className="font-serif text-[22px] leading-tight">{c.question?.titre} <span className="italic text-[#74695A]">{c.question?.titre_italique}</span></h2>
          <div className="mt-4 flex flex-wrap gap-x-1.5 gap-y-2">
            {(c.question?.choix || []).map((t) => (
              <a key={t} href="/?alerte=1" className="rounded-full border border-[#211C15] px-4 py-2 text-[13px] font-medium text-[#211C15] no-underline">{t}</a>
            ))}
          </div>
        </section>
      )}

      {/* Le cartouche, comme au bas d'un plan */}
      <footer className="px-6 pb-8 pt-7 sm:px-10">
        <div className="grid grid-cols-2 border-l border-t border-[#211C15] sm:grid-cols-[34%_14%_26%_26%]">
          {[
            ['Lettre', 'loftissime.'],
            ['Numéro', String(issue.numero)],
            ['Date', dateLettre(issue.date_parution, false)],
            ['Périmètre', horsParis ? 'Paris et petite couronne' : 'Paris'],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-r border-[#211C15] px-2.5 py-2">
              <div className="text-[10px] leading-tight text-[#74695A]">{k}</div>
              <div className="font-serif text-[15px] leading-tight lining-nums">{v}</div>
            </div>
          ))}
          <div className="col-span-2 border-b border-r border-[#211C15] p-2.5 sm:col-span-4">
            <span className="font-[Poppins,Helvetica,Arial,sans-serif] text-[15px] font-semibold tracking-[-0.4px]">loftissime.</span>{' '}
            <span className="font-serif text-[15px] italic text-[#74695A]">Curateur de biens atypiques</span>
          </div>
        </div>
        <p className="mt-3.5 text-[11px] leading-relaxed text-[#74695A]">
          Chaque bien est présenté par son agence ou par son propriétaire, vers l’annonce duquel le lien renvoie. Loftissime n’est pas une agence et n’intervient pas dans la vente.
        </p>
      </footer>
    </article>
  );
}

import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import Link from 'next/link';
import BuyerFigure, { type BuyerKind } from './BuyerFigure';
import ProForm from './ProForm';
import { typo } from '../../lib/typo';
import logiciels from './logiciels.png';
export const metadata = {
  title: 'Agences : présentez vos biens atypiques · Loftissime',
  description:
    'Plus de contacts sur vos biens atypiques, auprès d’acheteurs qui ne cherchent que ça. Contacts directs, mise à jour automatique, gratuit pendant le lancement.',
  alternates: { canonical: '/pro' },
};

// L'offre, en trois piliers
const PILLARS: { title: string; points: string[] }[] = [
  {
    title: 'Des contacts qualifiés',
    points: ['Mise en relation directe, sans intermédiaire', 'Votre nom et votre téléphone sur chaque annonce', 'Un bilan de diffusion par bien, pour votre vendeur'],
  },
  {
    title: 'Plus de visibilité',
    points: ['Un site où l’on ne trouve que de l’atypique', 'Envoi en alerte dès la mise en ligne', 'Une page dédiée à votre agence, avec tous vos biens atypiques à la vente'],
  },
  {
    title: 'Zéro saisie',
    points: ['Passerelle avec votre logiciel de diffusion', 'Mise à jour automatique', 'Rien à ressaisir'],
  },
];

// Les questions des agences
const QUESTIONS: { q: string; a: string; steps?: [string, string][]; kinds?: [string, string][]; software?: boolean }[] = [
  {
    q: 'Combien ça coûte ?',
    a: 'Rien pendant toute la phase de lancement : aucun frais, aucun engagement. Toute évolution des conditions vous sera annoncée à l’avance, et vous restez libre d’arrêter.',
  },
  {
    q: 'Quels biens sont publiés ?',
    a: 'Seulement les biens atypiques. Un appartement classique, même très beau ou très cher, n’est pas publié : le prix et l’adresse ne comptent pas.',
    kinds: [
      ['Une autre vie avant', 'loft, atelier d’artiste, ancienne usine, péniche'],
      ['Un volume', 'grande hauteur, mezzanine, verrière, duplex'],
      ['Un dehors en ville', 'terrasse, toit-terrasse, jardin, patio'],
      ['Une situation rare', 'dernier étage, vue, bord de l’eau, voie privée'],
      ['Une signature', 'maison d’architecte, immeuble remarquable'],
      ['Une histoire', 'hôtel particulier, bien ancien resté dans son jus'],
    ],
  },
  {
    q: 'Avec quels logiciels ?',
    a: 'Des passerelles sont prévues avec les principaux logiciels de diffusion. Dites-nous le vôtre : nous vous confirmons la mise en place.',
    software: true,
  },
  {
    q: 'Comment les contacts me parviennent-ils ?',
    a: 'L’acheteur vous appelle au numéro affiché sur l’annonce, ou demande à être recontacté : sa demande vous est transmise directement. Loftissime ne s’intercale pas dans la relation.',
  },
];

// Qui sont les acheteurs du site : trois portraits, sans chiffres.
const VISITORS: { title: string; text: string; kind: BuyerKind }[] = [
  {
    kind: 'decide',
    title: 'L’acheteur décidé',
    text: 'Projet, budget, calendrier : il est prêt à visiter.',
  },
  {
    kind: 'reveur',
    title: 'Le rêveur',
    text: 'Il regarde, met en favori, revient : votre acquéreur de demain.',
  },
  {
    kind: 'architecture',
    title: 'L’amoureux d’architecture',
    text: 'Il sait ce qu’il vient voir, et ne visite pas par hasard.',
  },
];

export default function ProPage() {
  const link = 'text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
  const h2 = 'font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900';
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader alert={false}>
        <a href="#rejoindre" className={`hidden sm:inline ${link}`}>Diffuser mes annonces</a>
      </SiteHeader>

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-10 md:pb-12">
        <div className="max-w-4xl">
          <Crumbs items={[{ label: 'Espace pro' }]} />
          <h1 className="mt-5 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
            Plus de contacts sur vos biens atypiques, <span className="text-stone-500">auprès d&apos;acheteurs qui ne cherchent que ça.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-600">
            Nous vous mettons en relation directe avec des acheteurs qualifiés.
          </p>
          <p className="mt-3">
            <a href="#rejoindre" className="text-base font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition">
              Diffuser mes annonces →
            </a>
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="pb-24">
        <section className="border-t border-stone-200 py-12 md:py-16">
          <h2 className={h2}>Ce que vous y gagnez</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-[14px] border border-stone-200 bg-white p-6 md:p-7">
                <h3 className="font-serif text-2xl text-stone-900">{p.title}</h3>
                <ul className="mt-5 space-y-3">
                  {p.points.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] leading-snug text-stone-900">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#F6CF4E]">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      {typo(t)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 py-12 md:py-16">
          <h2 className={h2}>
            Vos futurs acquéreurs <span className="italic text-stone-500">sont ici.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
            Trois profils d&apos;acheteurs, tous à la recherche d&apos;atypique.
          </p>
          <div className="mt-8 grid md:grid-cols-3 gap-x-10">
            {VISITORS.map((v) => (
              <div key={v.title} className="flex items-center gap-4 border-t border-stone-200 py-4">
                <BuyerFigure kind={v.kind} className="h-16 w-16 flex-none -ml-2" />
                <div>
                  <h3 className="font-serif text-xl text-stone-900">{v.title}</h3>
                  <p className="mt-1 text-[15px] leading-snug text-stone-600">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 py-12 md:py-16">
          <h2 className={h2}>Vos questions</h2>
          <div className="mt-8 max-w-3xl space-y-2.5">
            {QUESTIONS.map((it) => (
              <details key={it.q} name="pro-faq" className="group rounded-[14px] border border-stone-200 bg-white px-5 transition open:shadow-[0_14px_36px_-16px_rgba(28,25,23,0.28)] hover:border-stone-300 md:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-900 md:text-[17px] [&::-webkit-details-marker]:hidden">
                  {typo(it.q)}
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-stone-100 text-xl leading-none text-stone-600 transition-transform group-open:rotate-45 group-open:bg-[#F6CF4E] group-open:text-stone-900" aria-hidden="true">+</span>
                </summary>
                <div className="pb-5">
                  <p className="max-w-2xl text-base leading-relaxed text-stone-600">{typo(it.a)}</p>
                  {it.steps && (
                    <ol className="mt-4 max-w-2xl space-y-3">
                      {it.steps.map(([t, d], i) => (
                        <li key={t} className="flex items-start gap-3">
                          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#F6CF4E] text-sm font-medium text-stone-900">{i + 1}</span>
                          <span>
                            <span className="block text-[15px] font-medium text-stone-900">{typo(t)}</span>
                            <span className="block text-sm leading-snug text-stone-600">{typo(d)}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {it.kinds && (
                    <ul className="mt-4 grid max-w-2xl gap-x-10 gap-y-3 sm:grid-cols-2">
                      {it.kinds.map(([t, d]) => (
                        <li key={t} className="border-t border-stone-200 pt-3">
                          <p className="text-[15px] font-medium text-stone-900">{typo(t)}</p>
                          <p className="mt-0.5 text-sm leading-snug text-stone-500">{typo(d)}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {it.software && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logiciels.src} alt="Hektor, AC3, Ubiflow, Netty, Apimo" className="mt-4 w-full max-w-md" />
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="rejoindre" className="border-t border-stone-200 pt-12 md:pt-16 scroll-mt-20">
          <ProForm />
          <p className="mt-8">
            <Link href="/charte" className={link}>Toutes les questions fréquentes</Link>
          </p>
        </section>
      </div>
      </main>
    </div>
  );
}

import SiteHeader from '../../SiteHeader';
import SpecialistVideoCard from '../../guide/SpecialistVideoCard';
import type { SpecialistVideo } from '../../../lib/specialists';
import { Phone, FeedPost, Channel, POINTS, TERMS } from './Mockups';

export const metadata = {
  title: 'Contre-visite · Présentation aux partenaires',
  description: 'Une question d’acheteur, un spécialiste, une minute : la série vidéo de Loftissime et la place qu’y tiennent ses partenaires.',
  robots: { index: false, follow: false },
};

// Page de présentation destinée aux futurs partenaires. Hors menu, hors moteurs de recherche.
// Tout y est un exemple : noms à remplacer, vidéos figurées. Les cadres des réseaux sociaux sont
// volontairement neutres : ils montrent le format, pas l'interface de chaque application.

const DEMO: SpecialistVideo[] = [
  { id: 'financement', question: 'Quel apport faut-il prévoir pour un bien atypique ?', name: 'Votre nom', role: 'Courtier', company: 'Votre société', youtubeId: '', transcript: ['Votre réponse, mot pour mot, pour ceux qui préfèrent lire. C’est aussi ce texte qui permet au moteur de recherche d’État des lieux de proposer votre vidéo.'], published: '2026-11-20', articles: [], disclosure: 'Votre société est le courtier partenaire de Loftissime.' },
  { id: 'notaire', question: 'À quoi m’engage une offre d’achat une fois signée ?', name: 'Votre nom', role: 'Notaire', company: 'Votre étude', youtubeId: '', transcript: ['Votre réponse, mot pour mot, pour ceux qui préfèrent lire.'], published: '2026-11-20', articles: [] },
];

const h2 = 'font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900';
const lead = 'mt-4 max-w-2xl text-lg font-light leading-relaxed text-stone-600';

export default function ContreVisitePartners() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader alert={false} />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <p className="inline-block rounded-full bg-[#F6CF4E] px-3 py-1 text-xs text-stone-800">Présentation aux partenaires · exemples</p>
        <p className="mt-8 text-xs uppercase tracking-widest text-stone-500">Contre-visite</p>
        <h1 className="mt-4 max-w-4xl text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Une question, un spécialiste, <span className="italic text-stone-500">une minute.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          Contre-visite est la série vidéo de Loftissime, le site qui réunit les biens atypiques de toutes les agences. Des professionnels y répondent aux questions que se posent les acheteurs avant de signer. Voici où votre réponse apparaît.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <ol className="grid gap-4 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <li key={p.title} className="rounded-[20px] border border-stone-200 bg-white p-6 md:p-8">
              <span className="block text-xs font-semibold tracking-widest text-stone-400" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="mt-3 font-serif text-2xl leading-snug text-stone-900">{p.title}</h2>
              <p className="mt-3 font-light leading-relaxed text-stone-600">{p.text}</p>
            </li>
          ))}
        </ol>

        <section className="mt-20 md:mt-28">
          <p className="text-xs uppercase tracking-widest text-stone-500">Sur Loftissime</p>
          <h2 className={`mt-3 ${h2}`}>Dans État des lieux, la rubrique de conseils.</h2>
          <p className={lead}>
            Votre vidéo a sa place dans la rubrique Contre-visite et dans les articles qui traitent du même sujet. Sous la vidéo, votre réponse écrite : c’est elle que le moteur de recherche du site propose à l’acheteur qui pose la question.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {DEMO.map((v) => (
              <SpecialistVideoCard key={v.id} v={v} />
            ))}
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <p className="text-xs uppercase tracking-widest text-stone-500">En format vertical</p>
          <h2 className={`mt-3 ${h2}`}>Instagram, TikTok, YouTube.</h2>
          <p className={lead}>
            La même vidéo, tournée à la verticale, sort sur les trois plateformes. La question s’affiche en titre, votre réponse est sous-titrée, votre nom reste à l’écran.
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            <Phone label="Instagram" note="En Reel, sur le compte Loftissime" handle="loftissime" />
            <Phone label="TikTok" note="Même vidéo, même légende" handle="loftissime" />
            <Phone label="YouTube" note="En Short, et dans la série Contre-visite" handle="Loftissime" />
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <p className="text-xs uppercase tracking-widest text-stone-500">Sur la chaîne YouTube</p>
          <h2 className={`mt-3 ${h2}`}>Une série qui se retrouve.</h2>
          <p className={lead}>Toutes les vidéos sont rangées dans une série, par métier. Un acheteur qui en regarde une trouve les suivantes.</p>
          <Channel />
        </section>

        <section className="mt-20 md:mt-28">
          <p className="text-xs uppercase tracking-widest text-stone-500">Dans le fil d’actualité</p>
          <h2 className={`mt-3 ${h2}`}>LinkedIn et X.</h2>
          <p className={lead}>Là où vos confrères et vos clients vous lisent. La publication vous cite, et vous pouvez la reprendre sur votre propre compte.</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:max-w-4xl">
            <FeedPost
              label="LinkedIn"
              note="Publication de la page Loftissime, qui vous mentionne"
              text="Quel apport faut-il prévoir pour un bien atypique ? Dans Contre-visite, un courtier répond en une minute. Merci à Votre nom, de Votre société."
            />
            <FeedPost label="X" note="La vidéo et sa question, en un message" text="Quel apport pour un bien atypique ? La réponse d’un courtier, en une minute. #ContreVisite" />
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <p className="text-xs uppercase tracking-widest text-stone-500">Le partenariat</p>
          <h2 className={`mt-3 ${h2}`}>Simple, et à votre nom.</h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {TERMS.map((t) => (
              <div key={t.title} className="rounded-[14px] border border-stone-200 bg-white p-6">
                <dt className="font-serif text-2xl text-stone-900">{t.title}</dt>
                <dd className="mt-2 font-light leading-relaxed text-stone-600">{t.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-2xl font-serif text-2xl md:text-3xl leading-snug text-stone-900">
            Envie d’en parler ? <span className="italic text-stone-500">Répondez simplement au message qui vous a mené ici.</span>
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-stone-500">
            Cette page est une présentation : les noms, les vidéos et les publications qu’elle montre sont des exemples. Loftissime est en phase de test et n’est pas encore ouvert au public.
          </p>
        </section>
      </main>
    </div>
  );
}

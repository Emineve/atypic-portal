import { Heart, MessageSquare, Send, Share2, Play } from 'lucide-react';
import SiteHeader from '../../SiteHeader';
import SpecialistVideoCard from '../../guide/SpecialistVideoCard';
import type { SpecialistVideo } from '../../../lib/specialists';

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

const QUESTION = 'Quel apport pour un bien atypique ?';

function Bust({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
      <circle cx="100" cy="92" r="42" fill="#57534e" />
      <path d="M22 260 C22 190 60 158 100 158 C140 158 178 190 178 260 Z" fill="#57534e" />
    </svg>
  );
}

// Le plan vidéo lui-même : la question en titre, le spécialiste à l'image, son nom, un sous-titre.
function Shot({ children, ratio = 'aspect-[9/16]', question = QUESTION, role = 'Courtier · Votre société', quote = '« Comptez 10 à 20 % du prix… »' }: { children?: React.ReactNode; ratio?: string; question?: string; role?: string; quote?: string }) {
  return (
    <div className={`relative ${ratio} w-full overflow-hidden bg-stone-800`}>
      <Bust className="absolute bottom-0 left-1/2 h-[62%] -translate-x-1/2" />
      <p className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-4 pb-8 pt-4 font-serif text-[15px] leading-snug text-white">{question}</p>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-10">
        <p className="inline-block rounded bg-[#F4E7B5] px-1.5 py-0.5 text-[11px] font-semibold text-stone-900">{quote}</p>
        <p className="mt-2 text-[12px] font-semibold text-white">Votre nom</p>
        <p className="text-[11px] text-white/80">{role}</p>
      </div>
      {children}
    </div>
  );
}

function Phone({ label, note, handle }: { label: string; note: string; handle: string }) {
  return (
    <figure>
      <div className="mx-auto w-full max-w-[15rem] rounded-[28px] border border-stone-900 bg-stone-900 p-1.5">
        <div className="overflow-hidden rounded-[22px]">
          <Shot>
            <div className="absolute bottom-24 right-2 flex flex-col items-center gap-3 text-white">
              <Heart className="h-5 w-5" strokeWidth={1.75} />
              <MessageSquare className="h-5 w-5" strokeWidth={1.75} />
              <Send className="h-5 w-5" strokeWidth={1.75} />
            </div>
          </Shot>
          <div className="bg-stone-900 px-3 py-2.5 text-[11px] leading-snug text-white/90">
            <span className="font-semibold">{handle}</span> Contre-visite : une question, un spécialiste, une minute.
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center">
        <span className="block font-serif text-xl text-stone-900">{label}</span>
        <span className="mt-1 block text-sm text-stone-500">{note}</span>
      </figcaption>
    </figure>
  );
}

function FeedPost({ label, note, text }: { label: string; note: string; text: string }) {
  return (
    <figure>
      <figcaption className="mb-4">
        <span className="block font-serif text-xl text-stone-900">{label}</span>
        <span className="mt-1 block text-sm text-stone-500">{note}</span>
      </figcaption>
      <div className="rounded-[14px] border border-stone-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-white">l.</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-stone-900">Loftissime</p>
            <p className="text-xs text-stone-500">Tous les biens atypiques, réunis sur un seul site</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">{text}</p>
        <div className="mt-3 overflow-hidden rounded-[10px]">
          <Shot ratio="aspect-square">
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-stone-900">
              <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
            </span>
          </Shot>
        </div>
        <div className="mt-3 flex items-center gap-6 text-stone-500">
          <Heart className="h-4 w-4" strokeWidth={1.75} />
          <MessageSquare className="h-4 w-4" strokeWidth={1.75} />
          <Share2 className="h-4 w-4" strokeWidth={1.75} />
        </div>
      </div>
    </figure>
  );
}

const POINTS = [
  { title: 'Une question d’acheteur.', text: 'Une vraie question, posée avant de signer : l’apport, l’offre d’achat, la mezzanine, le DPE. Une seule par vidéo.' },
  { title: 'Votre réponse, en une minute.', text: 'Face caméra, sans jargon, dans un bien atypique. Vous allez droit au but, comme vous le feriez avec un client.' },
  { title: 'Votre nom partout où elle passe.', text: 'Sur Loftissime et sur chaque réseau, la vidéo porte votre nom, votre métier et votre société.' },
];

const TERMS = [
  { title: 'Exclusif', text: 'Un seul partenaire par métier : un courtier, un notaire, un architecte, un diagnostiqueur.' },
  { title: 'Gratuit la première année', text: 'Vous ne payez rien à Loftissime, Loftissime ne vous paie rien. Nous faisons le point ensemble au bout d’un an.' },
  { title: 'Validé par vous', text: 'Aucune vidéo, aucun texte n’est publié sans votre accord.' },
  { title: 'Une demi-heure', text: 'Quatre questions, quatre vidéos, tournées au téléphone en une seule fois.' },
];

const SERIES = [
  { role: 'Courtier', question: 'Quel apport pour un bien atypique ?', quote: '« Comptez 10 à 20 % du prix… »' },
  { role: 'Notaire', question: 'À quoi m’engage une offre d’achat ?', quote: '« Une fois acceptée, elle vous lie… »' },
  { role: 'Architecte', question: 'Une mezzanine, partout ?', quote: '« Il faut d’abord de la hauteur… »' },
  { role: 'Diagnostiqueur', question: 'Le souplex compte-t-il en Carrez ?', quote: '« Tout dépend de la hauteur… »' },
];

const h2 = 'font-serif text-3xl md:text-5xl tracking-tight leading-[1.1] text-stone-900';
const lead = 'mt-4 max-w-2xl text-lg font-light leading-relaxed text-stone-600';

export default function ContreVisitePartners() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader alert={false} />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <p className="inline-block rounded-full bg-[#F4E7B5] px-3 py-1 text-xs text-stone-800">Présentation aux partenaires · exemples</p>
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
          <div className="mt-8 overflow-hidden rounded-[14px] border border-stone-200 bg-white">
            <div className="h-20 bg-[#F4E7B5] md:h-28" />
            <div className="flex items-center gap-4 px-5 py-5 md:px-8">
              <span className="-mt-12 flex h-16 w-16 flex-none items-center justify-center rounded-full border-4 border-white bg-stone-900 text-xl font-semibold text-white md:h-20 md:w-20">l.</span>
              <div>
                <p className="font-serif text-2xl text-stone-900">Loftissime</p>
                <p className="text-sm text-stone-500">Tous les biens atypiques, réunis sur un seul site</p>
              </div>
            </div>
            <div className="border-t border-stone-200 px-5 py-6 md:px-8">
              <p className="font-serif text-xl text-stone-900">Contre-visite</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SERIES.map((m) => (
                  <div key={m.role}>
                    <div className="overflow-hidden rounded-[10px]">
                      <Shot question={m.question} role={m.role} quote={m.quote} />
                    </div>
                    <p className="mt-2 text-sm font-medium leading-snug text-stone-900">{m.question}</p>
                    <p className="mt-0.5 text-xs text-stone-500">{m.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

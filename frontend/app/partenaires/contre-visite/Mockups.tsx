import { Heart, MessageSquare, Send, Share2, Play } from 'lucide-react';

// Les maquettes de Contre-visite : le plan vidéo et ses cadres de diffusion. Tout y est un exemple.
// Les cadres des réseaux sociaux sont volontairement neutres : ils montrent le format, pas l'interface de chaque application.

const QUESTION = 'Quel apport pour un bien atypique ?';

export function Bust({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
      <circle cx="100" cy="92" r="42" fill="#57534e" />
      <path d="M22 260 C22 190 60 158 100 158 C140 158 178 190 178 260 Z" fill="#57534e" />
    </svg>
  );
}

// Le plan vidéo lui-même : la question en titre, le spécialiste à l'image, son nom, un sous-titre.
export function Shot({ children, ratio = 'aspect-[9/16]', question = QUESTION, role = 'Courtier · Votre société', quote = '« Comptez 10 à 20 % du prix… »' }: { children?: React.ReactNode; ratio?: string; question?: string; role?: string; quote?: string }) {
  return (
    <div className={`relative ${ratio} w-full overflow-hidden bg-stone-800`}>
      <Bust className="absolute bottom-0 left-1/2 h-[62%] -translate-x-1/2" />
      <p className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-4 pb-8 pt-4 font-serif text-[15px] leading-snug text-white">{question}</p>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-10">
        <p className="inline-block rounded bg-[#F6CF4E] px-1.5 py-0.5 text-xs font-semibold text-stone-900">{quote}</p>
        <p className="mt-2 text-[12px] font-semibold text-white">Votre nom</p>
        <p className="text-xs text-white/80">{role}</p>
      </div>
      {children}
    </div>
  );
}

export function Phone({ label, note, handle }: { label: string; note: string; handle: string }) {
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
          <div className="bg-stone-900 px-3 py-2.5 text-xs leading-snug text-white/90">
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

export function FeedPost({ label, note, text }: { label: string; note: string; text: string }) {
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

export const POINTS = [
  { title: 'Une question d’acheteur.', text: 'Une vraie question, posée avant de signer : l’apport, l’offre d’achat, la mezzanine, le coût des travaux, le DPE. Une seule par vidéo.' },
  { title: 'Votre réponse, en une minute.', text: 'Face caméra, sans jargon, dans un bien atypique. Vous allez droit au but, comme vous le feriez avec un client.' },
  { title: 'Votre nom partout où elle passe.', text: 'Sur Loftissime et sur chaque réseau, la vidéo porte votre nom, votre métier et votre société.' },
];

export const TERMS = [
  { title: 'Exclusif', text: 'Un seul partenaire par métier : un courtier, un notaire, un architecte, une entreprise de travaux, un diagnostiqueur.' },
  { title: 'Gratuit la première année', text: 'Vous ne payez rien à Loftissime, Loftissime ne vous paie rien. Nous faisons le point ensemble au bout d’un an.' },
  { title: 'Validé par vous', text: 'Aucune vidéo, aucun texte n’est publié sans votre accord.' },
  { title: 'Une demi-heure', text: 'Quatre questions, quatre vidéos, tournées au téléphone en une seule fois.' },
];

export const SERIES = [
  { role: 'Courtier', question: 'Quel apport pour un bien atypique ?', quote: '« Comptez 10 à 20 % du prix… »' },
  { role: 'Notaire', question: 'À quoi m’engage une offre d’achat ?', quote: '« Une fois acceptée, elle vous lie… »' },
  { role: 'Architecte', question: 'Une mezzanine, partout ?', quote: '« Il faut d’abord de la hauteur… »' },
  { role: 'Entreprise de travaux', question: 'Combien coûte un plateau brut ?', quote: '« Tout part de l’état des réseaux… »' },
  { role: 'Diagnostiqueur', question: 'Le souplex compte-t-il en Carrez ?', quote: '« Tout dépend de la hauteur… »' },
];


export function Channel({ className = 'mt-8', grid = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' }: { className?: string; grid?: string }) {
  return (
    <div className={`${className} overflow-hidden rounded-[14px] border border-stone-200 bg-white`}>
            <div className="h-20 bg-[#F6CF4E] md:h-28" />
            <div className="flex items-center gap-4 px-5 py-5 md:px-8">
              <span className="-mt-12 flex h-16 w-16 flex-none items-center justify-center rounded-full border-4 border-white bg-stone-900 text-xl font-semibold text-white md:h-20 md:w-20">l.</span>
              <div>
                <p className="font-serif text-2xl text-stone-900">Loftissime</p>
                <p className="text-sm text-stone-500">Tous les biens atypiques, réunis sur un seul site</p>
              </div>
            </div>
            <div className="border-t border-stone-200 px-5 py-6 md:px-8">
              <p className="font-serif text-xl text-stone-900">Contre-visite</p>
              <div className={`mt-4 grid gap-3 ${grid}`}>
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
  );
}

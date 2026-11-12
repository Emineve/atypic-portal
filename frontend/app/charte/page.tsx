import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '../Logo';

export const metadata = {
  title: 'Questions fréquentes · Loftissime',
  description:
    'Questions fréquentes sur Loftissime : les biens diffusés, le fonctionnement du site et le classement des annonces.',
  alternates: { canonical: '/charte' },
};

type Item = { q: string; a: string; points?: string[] };
type Group = { id: string; title: string; items: Item[] };

const groups: Group[] = [
  {
    id: 'selection',
    title: 'La sélection des biens',
    items: [
      {
        q: 'Quels biens sont diffusés sur Loftissime ?',
        a: 'Uniquement des biens atypiques à vendre. Un bien entre dans la sélection s’il répond à au moins l’un de ces trois critères :',
        points: [
          'Une origine singulière. Le lieu a eu une autre vie avant d’être habité : loft, atelier d’artiste, ancienne usine, entrepôt, imprimerie, chapelle, presbytère, moulin, grange, chai, écurie, bergerie, péniche, maison troglodyte.',
          'Une signature. Le lieu a été conçu ou transformé avec un parti pris fort : maison ou villa d’architecte, appartement repensé par un architecte, construction marquante de son époque, ou lieu aménagé par un propriétaire à la personnalité affirmée.',
          'Un caractère rare. Le lieu se distingue par son volume (grande hauteur sous plafond, verrière, duplex, triplex, souplex), par sa situation (dernier étage, toit-terrasse, terrasse, vue dégagée, jardin en ville, bord de l’eau) ou par son histoire (hôtel particulier, château, manoir, maison de maître, bastide, mas, longère, chaumière, et tout bien ancien qui a su garder son caractère).',
        ],
      },
      {
        q: 'Le prix est-il un critère ?',
        a: 'Non. Le prix n’est pas pris en compte dans la sélection. Seul le caractère atypique du bien compte.',
      },
      {
        q: 'Quels biens ne sont pas diffusés ?',
        a: 'Tous les logements qui ne répondent à aucun de ces trois critères.',
      },
      {
        q: 'Les biens présentés sont-ils réellement à vendre ?',
        a: 'Oui. Tous les biens présentés sont en cours de commercialisation. Une annonce est retirée dès que nous sommes informés que le bien n’est plus à vendre.',
      },
      {
        q: 'Les critères sont-ils les mêmes pour toutes les agences ?',
        a: 'Oui. Ils s’appliquent de la même façon à toutes les agences. Un bien qui n’y répond pas n’est pas diffusé.',
      },
    ],
  },
  {
    id: 'fonctionnement',
    title: 'Le fonctionnement du site',
    items: [
      {
        q: 'Loftissime est-il une agence immobilière ?',
        a: 'Non. Loftissime ne prend aucun mandat et n’intervient dans aucune transaction. Sa position est neutre : son seul rôle est de mettre en relation les acheteurs et les professionnels en charge des biens.',
      },
      {
        q: 'Le site est-il gratuit ?',
        a: 'Oui. La consultation des annonces est gratuite et sans inscription.',
      },
      {
        q: 'Comment contacter la personne en charge d’un bien ?',
        a: 'Chaque annonce affiche l’agence, le nom de votre contact et son téléphone. Vous pouvez l’appeler directement ou demander à être rappelé au moment qui vous convient.',
      },
      {
        q: 'Loftissime contacte-t-il les vendeurs ou les acheteurs ?',
        a: 'Non. Loftissime ne démarche ni les vendeurs ni les acheteurs. Vos demandes sont transmises au contact chargé de la commercialisation du bien, et vous ne recevez de notre part que les alertes que vous avez créées.',
      },
      {
        q: 'Puis-je connaître l’adresse d’un bien ?',
        a: 'Loftissime ne communique jamais l’adresse d’un bien, et ne la connaît d’ailleurs pas. Seul le secteur indiqué par l’agence apparaît sur le site. Pour en savoir plus, adressez-vous au contact chargé de la commercialisation du bien.',
      },
      {
        q: 'D’où viennent les annonces ?',
        a: 'Toutes les annonces proviennent d’agences immobilières. Chacune indique l’agence d’origine et renvoie vers l’annonce publiée sur son site, seule à faire foi pour le prix et la disponibilité.',
      },
            {
        q: 'Un particulier peut-il diffuser une annonce ?',
        a: 'Non. La diffusion d’annonces est exclusivement réservée aux agences immobilières.',
      },
    ],
  },
  {
    id: 'classement',
    title: 'Le classement des annonces',
    items: [
      {
        q: 'Comment les biens sont-ils classés ?',
              a: 'Par défaut, quelques biens choisis par Loftissime apparaissent en tête de liste, suivis des annonces les plus récentes. Vous pouvez à tout moment trier par prix, surface ou date de publication.', 
      },
      {
        q: 'Une agence peut-elle payer pour être mieux classée ?',
        a: 'Non. À ce jour, aucune agence ne paie pour apparaître sur le site ni pour y être mieux classée.',
      },
      {
        q: 'Que faire si une annonce comporte une erreur ou si le bien est vendu ?',
        a: 'Chaque annonce comporte un lien « Signaler cette annonce ». Nous traitons chaque signalement pour corriger ou retirer l’annonce.',
      },
    ],
  },
];

export default function ChartePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <nav className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition">
            <ArrowLeft className="w-3.5 h-3.5" />
            Tous les biens
          </Link>
        </div>
      </nav>

      <header className="max-w-3xl mx-auto px-6 pt-16 md:pt-20 pb-6 text-center">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">Loftissime</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-serif tracking-tight text-stone-900 leading-[1.15]">Questions fréquentes</h1>
        <p className="mt-5 text-stone-500 font-light">
          Tout ce qu&apos;il faut savoir sur les biens que nous diffusons et sur le fonctionnement du site.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-8">
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="pt-12 scroll-mt-20">
            <h2 className="font-serif text-2xl text-stone-900">{g.title}</h2>
            <div className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
              {g.items.map((it) => (
                <details key={it.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-lg text-stone-900">
                    {it.q}
                    <span className="text-stone-400 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">{it.a}</p>
                  {it.points && (
                    <ul className="mt-3 space-y-2 text-sm text-stone-600 leading-relaxed">
                      {it.points.map((pt) => (
                        <li key={pt} className="flex gap-2"><span aria-hidden="true">·</span><span>{pt}</span></li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}
            </div>
          </section>
        ))}
      </main>

                <div className="h-16" />
    </div>
  );
}

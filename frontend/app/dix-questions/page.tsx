import SiteHeader from '../SiteHeader';

// Le guide offert à l'inscription : dix questions à poser avant d'acheter un bien atypique.
// Chaque question renvoie à l'article du guide qui la développe ; rien ici ne remplace l'avis d'un notaire.

export const metadata = {
  title: 'Dix questions à poser avant d’acheter un bien atypique',
  description: 'Logement ou local, surface réelle, travaux déclarés, terrasse, charges, financement : les dix vérifications à faire avant d’acheter un loft, un atelier ou un dernier étage.',
  alternates: { canonical: '/dix-questions' },
};

const QUESTIONS: [string, string, string][] = [
  ['Est-ce bien un logement ?', 'Un ancien atelier ou une ancienne boutique peut être resté un local aux yeux de la mairie et de la copropriété, même si l’on y vit depuis des années. Demandez ce que disent le règlement de copropriété et le service d’urbanisme.', 'loft-ancien-local-commercial'],
  ['Quelle surface achetez-vous vraiment ?', 'Mezzanines, sous-pentes et combles ne comptent pas toujours dans la surface vendue. Comparez la surface de l’annonce, celle du mesurage et celle que vous voyez.', 'mezzanine-combles-surface-carrez'],
  ['La hauteur sous plafond passe-t-elle les seuils ?', 'Sous 1,80 m, une surface n’entre pas dans le mesurage Carrez. Quelques centimètres peuvent changer le prix au mètre carré, et l’usage que vous ferez de la pièce.', 'hauteur-sous-plafond-les-seuils-a-connaitre'],
  ['Les travaux ont-ils été déclarés et autorisés ?', 'Une mezzanine, une verrière ou une ouverture dans un mur porteur demandent souvent une autorisation de la mairie, de la copropriété, ou des deux. Demandez les pièces.', 'travaux-non-declares'],
  ['La terrasse ou le jardin vous appartient-il ?', 'On achète parfois un droit d’usage sur une partie commune, et non la terrasse elle-même. Cela change ce que vous pouvez y faire, et qui paie son entretien.', 'terrasse-jardin-jouissance-privative'],
  ['Que dit vraiment le diagnostic énergétique ?', 'Un grand volume, une verrière ou un dernier étage se chauffent et se rafraîchissent autrement qu’un appartement classique. L’étiquette se lit avec ses hypothèses.', 'dpe-loft-atelier-dernier-etage'],
  ['Dans quel état sont la verrière et le toit, et qui les entretient ?', 'C’est souvent le premier poste de dépense d’un bien atypique. Demandez l’âge des ouvrages, les travaux faits, et ce qui relève de vous ou de la copropriété.', 'verriere-ce-qu-il-faut-verifier'],
  ['Que paierez-vous chaque année ?', 'Charges courantes, travaux votés, taxe foncière : lisez les trois derniers procès-verbaux d’assemblée générale avant de faire une offre.', 'charges-de-copropriete-avant-d-acheter'],
  ['La banque suivra-t-elle ?', 'Un bien à l’usage incertain ou difficile à estimer peut compliquer un prêt. Mieux vaut le savoir avant l’offre qu’après.', 'financer-un-bien-atypique'],
  ['Quelles conditions faire inscrire dans l’avant-contrat ?', 'L’obtention du prêt, bien sûr, mais aussi, selon le bien, une autorisation ou une vérification précise. C’est le moment d’en parler à votre notaire.', 'conditions-suspensives-bien-atypique'],
];

export default function DixQuestions() {
  return (
    <div className="min-h-screen bg-[#FCFBF8] font-sans text-[#3A2E2A]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-20">
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-[1fr_1.4fr]">
          <h1 className="font-serif text-[2.5rem] leading-[1.03] tracking-tight text-stone-900 md:text-6xl">
            Dix questions à poser <span className="italic text-stone-500">avant d’acheter un bien atypique.</span>
          </h1>
          <p className="self-end text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">
            Un bien atypique ne s’achète pas comme un autre : son histoire laisse des traces dans les papiers. Voici ce que nous vérifions à chaque visite, dans l’ordre. Ce guide ne remplace pas l’avis de votre notaire.
          </p>
        </div>

        <ol className="mt-12 border-t border-stone-900 md:mt-16">
          {QUESTIONS.map(([q, r, slug], i) => (
            <li key={slug} className="grid gap-x-12 gap-y-3 border-b border-stone-200 py-7 md:grid-cols-[1fr_1.4fr] md:py-9">
              <h2 className="flex gap-4 font-serif text-2xl leading-[1.15] tracking-tight text-stone-900 md:text-3xl">
                <span className="w-9 shrink-0 italic text-stone-400">{i + 1}.</span>
                <span className="[text-wrap:balance]">{q}</span>
              </h2>
              <div>
                <p className="text-lg leading-relaxed text-stone-700">{r}</p>
                <p className="mt-2">
                  <a href={`/guide/${slug}`} className="text-[15px] font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">Lire l’article</a>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-stone-700">
          Et pour voir ce qu’un lieu peut devenir, rien ne vaut une visite avec un homme de l’art :{' '}
          <a href="/guide/visiter-avec-un-architecte" className="font-medium text-stone-900 underline underline-offset-4 decoration-stone-400">visiter avec un architecte</a>.
        </p>
      </main>
    </div>
  );
}

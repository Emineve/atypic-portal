import SiteHeader from '../SiteHeader';

// « Pourquoi Loftissime ? », version du site tant qu'il vit par sa newsletter. Même voix que « Pourquoi Béton ciré ? » :
// le constat, ce que nous faisons, le nom, ce que nous ne faisons pas. Aucun nom propre : l'équipe se présentera quand elle l'aura décidé.

// Quatre temps, chacun avec son intitulé à gauche, puis la conviction en grand
const TEMPS: [string, string][] = [
  ['Le constat', 'Un atelier sous verrière, une ancienne imprimerie, une péniche, un dernier étage ouvert sur les toits : ces lieux existent, mais ils sont éparpillés, et l’on passe à côté. Quand on en trouve un, on hésite. On ne sait pas ce qu’il vaut vraiment, ni ce qu’il coûtera d’y vivre.'],
  ['Ce que nous faisons', 'Nous cherchons ces biens, nous les visitons avec ceux dont c’est le métier, un architecte, un entrepreneur, un courtier, un notaire, un négociateur, et nous faisons les comptes jusqu’au bout. Puis nous vous le racontons dans notre newsletter : douze numéros par an, un thème par mois.'],
  ['Le nom', 'Loftissime, comme un superlatif : le loft, et tout ce qui lui ressemble, en plus haut, en plus lumineux, en plus rare.'],
  ['Ce que nous ne faisons pas', 'Nous ne vendons rien. Loftissime n’est pas une agence : chaque bien est vendu en direct par son propriétaire ou par l’intermédiaire d’une agence. Et votre adresse ne sert qu’à vous écrire.'],
];

export default function QuiSommesNous() {
  return (
    <div className="min-h-screen bg-[#FCFBF8] font-sans text-[#3A2E2A]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-20">
        <h1 className="font-serif text-[2.6rem] leading-[1.02] tracking-tight text-stone-900 md:text-7xl">
          Pourquoi <span className="italic text-stone-500">Loftissime ?</span>
        </h1>

        <div className="mt-12 md:mt-20">
          {TEMPS.map(([titre, texte]) => (
            <section key={titre} className="grid gap-x-12 gap-y-3 border-t border-stone-900 py-8 md:grid-cols-[1fr_1.6fr] md:py-12">
              <h2 className="font-serif text-2xl italic leading-tight text-stone-500 md:text-3xl">{titre}</h2>
              <p className="text-lg leading-relaxed text-stone-800 md:text-xl md:leading-relaxed">{texte}</p>
            </section>
          ))}
        </div>

        {/* la conviction, seule et en grand : c'est la phrase qu'on retient */}
        <section className="rounded-[14px] border-2 border-stone-900 bg-white px-7 py-10 shadow-[6px_6px_0_#3A2E2A] md:px-14 md:py-16">
          <p className="text-[15px] font-medium text-stone-600">Notre conviction</p>
          <p className="mt-4 max-w-4xl font-serif text-3xl leading-[1.15] tracking-tight text-stone-900 md:text-5xl md:leading-[1.1]">
            Habiter un lieu qui ne ressemble à aucun autre n’est pas réservé à quelques-uns. <span className="italic text-stone-500">Il faut oser, faire ses comptes et être bien accompagné. Alors on y arrive.</span>
          </p>
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-medium text-stone-900">
            <a href="/#recevoir" className="underline underline-offset-4 decoration-stone-400">Recevoir la newsletter</a>
            <a href="/equipe" className="underline underline-offset-4 decoration-stone-400">Découvrir l’équipe</a>
          </p>
        </section>
      </main>
    </div>
  );
}

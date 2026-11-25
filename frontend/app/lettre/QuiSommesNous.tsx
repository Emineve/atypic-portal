import SiteHeader from '../SiteHeader';
import { NEWSLETTERS } from '../../lib/newsletters';

// « Pourquoi Loftissime ? », version du site tant qu'il vit par sa newsletter. Même voix que « Pourquoi Béton ciré ? » :
// le constat, ce que nous faisons, le nom, ce que nous ne faisons pas. Aucun nom propre : l'équipe se présentera quand elle l'aura décidé.

export default function QuiSommesNous() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#191919]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-20">
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-[1fr_1.4fr]">
          <h1 className="font-serif text-[2.6rem] leading-[1.02] tracking-tight text-stone-900 md:text-6xl">
            Pourquoi <span className="italic text-stone-500">Loftissime ?</span>
          </h1>
          <div className="space-y-5 text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">
            <p>
              Un atelier sous verrière, une ancienne imprimerie, une péniche, un dernier étage ouvert sur les toits : ces lieux existent, mais ils sont éparpillés, et l’on passe à côté. Quand on en trouve un, on hésite. On ne sait pas ce qu’il vaut vraiment, ni ce qu’il coûtera d’y vivre.
            </p>
            <p>
              Loftissime est fait pour ça. Nous cherchons ces biens, nous les visitons avec ceux dont c’est le métier, un architecte, un entrepreneur, un courtier, un notaire, un négociateur, et nous faisons les comptes jusqu’au bout. Puis nous vous le racontons dans notre newsletter : douze numéros par an, un thème par mois.
            </p>
            <p>
              Et le nom ? Loftissime, comme un superlatif : le loft, et tout ce qui lui ressemble, en plus haut, en plus lumineux, en plus rare.
            </p>
            <p>
              Nous ne vendons rien. Loftissime n’est pas une agence : chaque bien est vendu en direct par son propriétaire ou par l’intermédiaire d’une agence. Et votre adresse ne sert qu’à vous écrire.
            </p>
            <p>
              Notre conviction : habiter un lieu qui ne ressemble à aucun autre n’est pas réservé à quelques-uns. Il faut oser, faire ses comptes et être bien accompagné. Alors on y arrive.
            </p>
            <p className="pt-3">
              <a href="/#recevoir" className="inline-flex h-12 items-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white">
                Recevoir la newsletter
              </a>
            </p>
          </div>
        </div>

        {/* les matières des newsletters, en frise : c'est le nuancier de la maison */}
        <div aria-hidden className="mt-14 flex h-16 overflow-hidden rounded-[14px] md:mt-20 md:h-24">
          {NEWSLETTERS.map((n) => (
            <span key={n.slug} className="block flex-1" style={n.matiere} />
          ))}
        </div>
      </main>
    </div>
  );
}

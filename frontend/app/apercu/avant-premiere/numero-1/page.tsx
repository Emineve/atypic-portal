import Link from 'next/link';
import SiteHeader from '../../../SiteHeader';
import LetterFrame from '../LetterFrame';
import { LETTRES, dateLettre } from '../../../../lib/lettres';

const lettre = LETTRES.find((l) => l.numero === 1)!;

export const metadata = {
  title: `Avant-première n° ${lettre.numero} : ${lettre.titre} · Loftissime`,
  robots: { index: false, follow: false },
};

// Le numéro tel qu'il part par mail (fichier produit avec la lettre : public/lettre/n1/lettre.html).
// Page d'aperçu : rien n'a été envoyé, l'ouverture attend la vidéo et le bien en avant-première.

export default function Numero1() {
  return (
    <div className="min-h-screen bg-[#EFE7D6] text-[#191919] font-sans">
      <SiteHeader />
      <div className="max-w-[600px] mx-auto px-0 pt-8 pb-16">
        <p className="px-6 md:px-0 text-sm text-stone-600">
          <Link href="/apercu/avant-premiere" className="underline underline-offset-4">Tous les numéros</Link>
          <span className="mx-2">/</span>
          N° {lettre.numero}, {dateLettre(lettre.date)}
          {!lettre.paru && <span className="block mt-1 text-stone-500">Maquette, pas encore envoyée.</span>}
        </p>
        <div className="mt-6">
          <LetterFrame src="/lettre/n1/lettre.html" title={`Avant-première n° ${lettre.numero}`} height={lettre.hauteur} />
        </div>
      </div>
    </div>
  );
}

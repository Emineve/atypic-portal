import Link from 'next/link';
import SiteHeader from '../../SiteHeader';
import { LETTRES, dateLettre } from '../../../lib/lettres';

export const metadata = {
  title: 'Avant-première, la lettre de Loftissime',
  robots: { index: false, follow: false },
};

// Rubrique de la lettre « Avant-première » : ce qu'elle est, puis tous les numéros, du plus récent au plus ancien.
// Page d'aperçu, non indexée et absente du menu tant que le premier numéro n'est pas parti.

const CONTENU: [string, string][] = [
  ['L’avant-première', 'Un bien que vous ne trouverez pas encore en ligne, visité en vidéo, présenté par une seule agence.'],
  ['Déjà en ligne', 'Quelques biens atypiques repérés dans la semaine à Paris, chacun résumé par une mesure dessinée à l’échelle.'],
  ['À lire', 'Un article pour acheter en connaissance de cause, et une histoire de lieu insolite.'],
];

export default function LettreIndex() {
  const lettres = [...LETTRES].sort((a, b) => b.numero - a.numero);
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-8 md:pb-10">
        <p className="text-xs uppercase tracking-widest text-stone-500">Aperçu, page non publiée</p>
        <h1 className="max-w-4xl mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Avant-première, <span className="italic text-stone-500">la lettre de Loftissime</span>.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-stone-600">Chaque jeudi, l’immobilier atypique parisien en quelques mesures.</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <section>
          <h2 className="text-xs uppercase tracking-widest text-stone-500">Les numéros</h2>
          <ul className="mt-3 border-t border-stone-900">
            {lettres.map((l) => (
              <li key={l.numero} className="border-b border-stone-200">
                <Link href={`/apercu/avant-premiere/${l.slug}`} className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-[9rem_1fr_auto] md:items-baseline">
                  <span className="text-sm text-stone-500">
                    N° {l.numero}
                    <span className="block">{dateLettre(l.date)}</span>
                  </span>
                  <span>
                    <span className="font-serif text-2xl md:text-3xl text-stone-900 bg-[linear-gradient(#F6CF4E,#F6CF4E)] bg-no-repeat bg-[position:0_100%] pb-[3px] bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-[background-size]">
                      {l.titre}
                    </span>
                    <span className="mt-2 block max-w-2xl text-stone-600">{l.resume}</span>
                  </span>
                  <span className="text-sm text-stone-500">{l.paru ? 'Lire' : 'Maquette, pas encore envoyée'}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-widest text-stone-500">Dans chaque numéro</h2>
          <ul className="mt-3 border-t border-stone-900">
            {CONTENU.map(([t, d]) => (
              <li key={t} className="grid gap-x-8 gap-y-1 border-b border-stone-200 py-5 md:grid-cols-[14rem_1fr]">
                <span className="font-serif text-xl text-stone-900">{t}</span>
                <span className="text-stone-600">{d}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

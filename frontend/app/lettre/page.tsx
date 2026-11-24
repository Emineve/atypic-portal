import Link from 'next/link';
import SiteHeader from '../SiteHeader';
import LetterSignup from './LetterSignup';
import { dateLettre } from './LetterView';
import { getIssues } from '../../lib/lettre';

export const revalidate = 60;

export const metadata = {
  title: 'La lettre · loftissime.',
  description: 'Tous les numéros de la lettre de Loftissime : un jeudi sur deux, un bien atypique à Paris et ce qu’il coûte vraiment.',
};

// La rubrique de la lettre : tous les numéros, du plus récent au plus ancien, puis l'inscription.
export default async function LettreIndex() {
  const lettres = await getIssues();
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader />

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-8 md:pb-10">
        <h1 className="max-w-4xl text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          La lettre, <span className="italic text-stone-500">tous les numéros.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-stone-600">Un jeudi sur deux, un bien atypique à Paris et ce qu’il coûte vraiment.</p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <ul className="border-t border-stone-900">
          {lettres.map((l) => {
            const row = (
              <>
                <span className="text-sm text-stone-500">
                  N° {l.numero}
                  <span className="block">{dateLettre(l.date_parution)}</span>
                </span>
                <span>
                  <span className={`font-serif text-2xl md:text-3xl text-stone-900 ${l.paru ? 'bg-[linear-gradient(#F6CF4E,#F6CF4E)] bg-no-repeat bg-[position:0_100%] pb-[3px] bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-[background-size]' : ''}`}>
                    {l.titre}
                  </span>
                  <span className="mt-2 block max-w-2xl text-stone-600">{l.resume}</span>
                </span>
                <span className="text-sm text-stone-500">{l.paru ? 'Lire' : 'À paraître'}</span>
              </>
            );
            const cls = 'group grid gap-x-8 gap-y-2 py-6 md:grid-cols-[9rem_1fr_auto] md:items-baseline';
            return (
              <li key={l.numero} className="border-b border-stone-200">
                {l.paru ? <Link href={`/lettre/numero-${l.numero}`} className={cls}>{row}</Link> : <div className={cls}>{row}</div>}
              </li>
            );
          })}
          {lettres.length === 0 && <li className="border-b border-stone-200 py-8 text-stone-600">Le premier numéro arrive bientôt.</li>}
        </ul>

        <LetterSignup variant="band" source="numeros" className="mt-14 md:mt-20" />
      </main>
    </div>
  );
}

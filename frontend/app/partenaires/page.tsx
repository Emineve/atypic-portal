import SiteHeader from '../SiteHeader';
import { FICHES, type Role } from './Presentation';
import { themeDe } from '../../lib/newsletters';

// L'entrée des présentations aux partenaires : une carte par métier, chacune sur sa matière.
export const metadata = {
  title: 'Partenaires · Loftissime',
  description: 'Notaire, courtier, entrepreneur du bâtiment : votre place dans la newsletter de Loftissime, le média de l’immobilier atypique.',
  alternates: { canonical: '/partenaires' },
};

const ORDRE: Role[] = ['notaire', 'courtier', 'entrepreneur'];
const Maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Partenaires() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#FCFBF8] font-sans text-stone-900">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-20">
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-[1fr_1.4fr]">
          <h1 className="font-serif text-[2.5rem] leading-[1.03] tracking-tight md:text-6xl">
            Partenaires, <span className="italic text-stone-500">chaque numéro se fait à plusieurs.</span>
          </h1>
          <p className="self-end text-lg leading-relaxed text-stone-700 md:text-xl md:leading-relaxed">
            Chaque mois, nous ouvrons les portes d’un bien atypique avec ceux dont c’est le métier. Voici la place que chacun tient dans le numéro, ce que nous lui demandons et ce qu’il y gagne.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 border-t border-stone-900 pt-8 md:mt-16 md:grid-cols-3">
          {ORDRE.map((role) => {
            const f = FICHES[role];
            return (
              <li key={role}>
                <a href={`/partenaires/${role}`} className="group flex h-full flex-col overflow-hidden rounded-[18px] border-2 border-stone-900 bg-white shadow-[6px_6px_0_#3A2E2A]">
                  <span aria-hidden className="block h-28 border-b-2 border-stone-900 md:h-36" style={themeDe(f.matiere).matiere} />
                  <span className="flex flex-1 flex-col p-6 md:p-7">
                    <span className="text-sm text-stone-500">{Maj(f.metier)}</span>
                    <span className="mt-2 font-serif text-3xl leading-[1.1]">
                      {f.titre} <span className="italic text-stone-500">{f.titreItalique}</span>
                    </span>
                    <span className="mt-4 text-[17px] leading-relaxed text-stone-700">Votre rubrique : « {f.rubrique.replace(/ \?$/, ' ?')} ».</span>
                    <span className="mt-auto pt-6 text-[15px] font-medium underline underline-offset-4 decoration-stone-400 [@media(hover:hover)]:group-hover:decoration-stone-900">Voir la présentation</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-12 max-w-2xl text-lg leading-relaxed text-stone-700">
          Architecte, négociateur immobilier : vos présentations arrivent. Le site est en préparation, le premier numéro paraît en janvier.
        </p>
      </main>
    </div>
  );
}

import SiteHeader from '../SiteHeader';
import { TrendingUp } from 'lucide-react';
import BackLink from './BackLink';
import Simulator from './Simulator';
import { RATES } from '../../lib/rates';

export const metadata = {
  title: 'Financement : simulateur de mensualité et taux du moment · Loftissime',
  description:
    'Estimez la mensualité de votre projet immobilier et consultez les taux de crédit moyens du moment sur 15, 20 et 25 ans.',
  alternates: { canonical: '/financement' },
};

function pct(n: number) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function FinancementPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader back={<BackLink />} />

      <header className="max-w-4xl mx-auto px-6 pt-14 md:pt-24 pb-10 md:pb-14">
        <p className="text-xs uppercase tracking-widest text-stone-500">Financement</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Votre projet, <span className="italic text-stone-500">en mensualités.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          Un coup de cœur se décide aussi avec des chiffres. Estimez votre mensualité en quelques secondes, avec les taux du moment.
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20 space-y-14">
        <Simulator />

        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="font-serif text-2xl text-stone-900">Les taux du moment</h2>
            <p className="inline-flex items-center gap-1.5 text-sm text-stone-600">
              <TrendingUp className="w-4 h-4" />
              Tendance : {RATES.trend}
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {RATES.byYears.map((r) => (
              <div key={r.years} className="border border-stone-200 bg-white p-4 md:p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-stone-500">{r.years} ans</p>
                <p className="mt-2 font-serif text-3xl md:text-4xl text-stone-900">{pct(r.rate)} %</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            Taux moyens du marché relevés en {RATES.asOf}, hors assurance, d&apos;après les baromètres publiés le {RATES.updated}. Le taux
            d&apos;usure, plafond légal assurance et frais compris, est de {pct(RATES.usury.rate)} % pour les {RATES.usury.label}.
          </p>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Votre taux réel dépend de votre apport, de vos revenus et de la banque : un bon dossier obtient souvent mieux que la moyenne.
          </p>
        </section>

        <section className="border-t border-stone-200 pt-10">
          <h2 className="font-serif text-2xl text-stone-900">À garder en tête</h2>
          <ul className="mt-4 space-y-3 text-stone-600 leading-relaxed">
            <li>La mensualité affichée comprend une estimation de l&apos;assurance emprunteur, que vous pouvez ajuster. Elle ne comprend ni les frais de notaire, ni les frais de dossier.</li>
            <li>Les banques limitent en général l&apos;endettement à 35 % des revenus, assurance comprise, sur 25 ans au plus.</li>
            <li>Un apport d&apos;au moins 10 % du prix, pour couvrir les frais d&apos;acquisition, est le plus souvent attendu.</li>
          </ul>
          <p className="mt-6 text-xs text-stone-400 leading-relaxed">
            Simulation indicative, sans valeur contractuelle : elle ne constitue ni une offre de prêt ni un conseil en financement. Un crédit vous
            engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
          </p>
        </section>
      </main>
    </div>
  );
}

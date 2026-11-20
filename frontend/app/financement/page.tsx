import Crumbs from '../Crumbs';
import SiteHeader from '../SiteHeader';
import BackLink from './BackLink';
import Simulator from './Simulator';
import { RATES } from '../../lib/rates';

export const metadata = {
  title: 'Financement : simulateur de mensualité et taux du moment · Loftissime',
  description:
    'Estimez la mensualité de votre projet immobilier et consultez les taux de crédit du moment sur 15, 20 et 25 ans.',
  alternates: { canonical: '/financement' },
};

function pct(n: number) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function FinancementPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      {/* Sur téléphone, le retour à l'annonce passe sous l'en-tête, qui n'a pas la place de l'accueillir */}
      <SiteHeader back={<BackLink className="hidden sm:inline-flex" />} />

      <header className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-4xl">
        <BackLink className="mb-8 flex sm:hidden" />
        <Crumbs items={[{ label: 'Financement' }]} />
        <h1 className="mt-6 text-5xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.02]">
          Votre projet, <span className="italic text-stone-500">en mensualités.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-stone-600">
          Un coup de cœur se décide aussi avec des chiffres. Estimez votre mensualité en quelques secondes, avec les taux du moment.
        </p>
      </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl pb-20 space-y-14">
        <Simulator />

        <section>
          <h2 className="font-serif text-2xl text-stone-900">Les taux du moment</h2>
          <div className="mt-5 overflow-hidden rounded-[14px] border border-stone-200 bg-white shadow-[0_10px_28px_-16px_rgba(28,25,23,0.25)]">
            <table className="w-full text-center">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-stone-500">
                  <th className="px-4 py-3 text-left font-normal md:px-6">Dossier</th>
                  {RATES.byYears.map((r) => (
                    <th key={r.years} className="px-2 py-3 font-normal">{r.years} ans</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RATES.tiers.map((t, i) => (
                  <tr key={t.label} className={`border-t border-stone-200 ${i === RATES.tiers.length - 1 ? 'bg-[#F4E7B5]/50' : ''}`}>
                    <th scope="row" className="px-4 py-4 text-left text-sm font-medium leading-snug text-stone-900 md:px-6 md:text-base">{t.label}</th>
                    {t.rates.map((r, j) => (
                      <td key={j} className="px-2 py-4 font-sans text-lg font-light tabular-nums text-stone-900 whitespace-nowrap md:text-2xl">{pct(r)}&nbsp;%</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-stone-600 leading-relaxed">
            Taux relevés en {RATES.asOf} par notre courtier partenaire, hors assurance, selon la qualité du dossier. Mise à jour le {RATES.updated}. Le taux
            d&apos;usure, plafond légal assurance et frais compris, est de {pct(RATES.usury.rate)} % pour les {RATES.usury.label}.
          </p>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            Votre taux réel dépend de votre apport, de vos revenus et de la banque. Le simulateur reprend par défaut le taux d&apos;un bon dossier.
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
      </div>
      </main>
    </div>
  );
}

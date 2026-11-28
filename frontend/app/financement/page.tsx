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
    <div className="min-h-screen bg-[#FCFBF8] text-[#3A2E2A] font-sans">
      {/* Sur téléphone, le retour à l'annonce passe sous l'en-tête, qui n'a pas la place de l'accueillir */}
      <SiteHeader back={<BackLink className="hidden sm:inline-flex" />} />

      <header className="max-w-6xl mx-auto px-6 pt-8 md:pt-12 pb-7 md:pb-9">
        <div className="max-w-3xl">
          <BackLink className="mb-8 flex sm:hidden" />
          <Crumbs items={[{ label: 'Financement' }]} />
          <h1 className="mt-5 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
            Financer un bien atypique, <span className="italic text-stone-500">les bons repères.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-600">
            Estimez votre mensualité, puis faites étudier votre projet par un courtier.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* Grand écran : le simulateur à gauche, les taux et les repères à droite */}
        <div className="pb-20 grid gap-12 lg:grid-cols-2 lg:gap-14 lg:items-start">
        <div id="simulateur" className="scroll-mt-24">
          <Simulator />
        </div>
        <div className="space-y-10">

        {RATES.publies && (
        <section>
          <h2 className="font-serif text-2xl text-stone-900">Les taux du mois</h2>
          <div className="mt-5 overflow-hidden rounded-[14px] border border-stone-200 bg-white">
            <table className="w-full table-fixed text-center">
              <thead>
                <tr className="text-sm text-stone-500">
                  <th className="px-4 py-3 text-left font-normal md:px-6">Dossier</th>
                  {RATES.byYears.map((r) => (
                    <th key={r.years} className="px-1 py-3 font-normal">{r.years} ans</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RATES.tiers.map((t, i) => (
                  <tr key={t.label} className={`border-t border-stone-200 ${i === RATES.tiers.length - 1 ? 'bg-[#F6CF4E]' : ''}`}>
                    <th scope="row" className="px-4 py-4 text-left text-sm font-medium leading-snug text-stone-900 md:px-6 md:text-base">{t.label}</th>
                    {t.rates.map((r, j) => (
                      <td key={j} className="px-1 py-4 font-serif text-base lining-nums tabular-nums [word-spacing:0] text-stone-900 whitespace-nowrap md:text-2xl">{pct(r)}&nbsp;%</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-stone-500 leading-relaxed">
            Taux relevés en {RATES.asOf} par notre courtier partenaire, hors assurance. Votre taux réel dépend de votre apport, de vos revenus et de la banque.
          </p>
        </section>
        )}

        <section className={RATES.publies ? 'border-t border-stone-200 pt-6' : ''}>
          <details>
            <summary className="cursor-pointer list-none text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 [&::-webkit-details-marker]:hidden">
              À garder en tête
            </summary>
            <ul className="mt-4 space-y-2 text-sm text-stone-600 leading-relaxed">
              <li>La mensualité comprend une estimation de l&apos;assurance emprunteur. Elle ne comprend ni les frais de notaire, ni les frais de dossier.</li>
              <li>Les banques limitent en général l&apos;endettement à 35 % des revenus, assurance comprise, sur 25 ans au plus.</li>
              <li>Un apport d&apos;au moins 10 % du prix est le plus souvent attendu.</li>
              {RATES.publies && <li>Le taux d&apos;usure, plafond légal assurance et frais compris, est de {pct(RATES.usury.rate)} % pour les {RATES.usury.label}.</li>}
            </ul>
          </details>
          <p className="mt-5 text-sm text-stone-600 leading-relaxed">
            Simulation indicative, sans valeur contractuelle : elle ne constitue ni une offre de prêt ni un conseil en financement. Un crédit vous
            engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
          </p>
        </section>
        </div>
      </div>
      </main>
    </div>
  );
}

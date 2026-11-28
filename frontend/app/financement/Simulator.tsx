'use client';

import { useEffect, useState } from 'react';
import { RATES } from '../../lib/rates';
import BrokerRequest from './BrokerRequest';

function eur(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n).replace(/[\u202f\u00a0]/g, '\u00a0');
}

function num(v: string) {
  const n = Number(v.replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

// Montant saisi : chiffres seulement (9 au plus), regroupés par milliers pour rester lisibles (1 200 000)
function group(v: string) {
  const digits = v.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 9);
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function pct(n: number) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Simulator() {
  const [price, setPrice] = useState('');
  const [down, setDown] = useState('');
  const [years, setYears] = useState(20);
  // Assurance emprunteur : 0,25 % du capital par an, ordre de grandeur pour un emprunteur d'une quarantaine d'années
  const [insurance, setInsurance] = useState('0,25');
  const [rate, setRate] = useState(String(RATES.byYears[1].rate).replace('.', ','));

  // Arrivée depuis la fiche d'un bien : le prix est repris, avec 20 % d'apport
  useEffect(() => {
    const p = Number(new URLSearchParams(window.location.search).get('prix'));
    if (Number.isFinite(p) && p > 0) {
      setPrice(group(String(Math.round(p))));
      setDown(group(String(Math.round(p * 0.2))));
    }
  }, []);

  function pickYears(y: number) {
    setYears(y);
    const ref = RATES.byYears.find((r) => r.years === y);
    if (ref) setRate(String(ref.rate).replace('.', ','));
  }

  const principal = Math.max(0, num(price) - num(down));
  const n = years * 12;
  const r = num(rate) / 100 / 12;
  const monthly = principal <= 0 ? 0 : r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  const interest = Math.max(0, monthly * n - principal);
  const insMonthly = (principal * (num(insurance) / 100)) / 12;
  const insTotal = insMonthly * n;
  const monthlyAll = monthly + insMonthly;
  const income = monthlyAll / 0.35;

  const total = principal + interest + insTotal || 1;

  const box = 'no-autofill-tint h-14 w-full rounded-[10px] border border-stone-300 bg-white pl-4 pr-10 font-sans text-xl tabular-nums [word-spacing:0] text-stone-900 placeholder:text-stone-300 focus:border-stone-900 focus:outline-none';
  const label = 'block text-sm font-medium text-stone-900';
  const more = 'cursor-pointer list-none text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 [&::-webkit-details-marker]:hidden';

  return (
    <div>
    <div className="rounded-[18px] border-2 border-stone-900 bg-white p-5 shadow-[6px_6px_0_#3A2E2A] md:p-8">
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        <label className={label}>
          Prix du bien
          <span className="relative mt-2 block">
            <input inputMode="numeric" value={price} onChange={(e) => setPrice(group(e.target.value))} className={box} placeholder="800 000" />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500">€</span>
          </span>
        </label>
        <label className={label}>
          Apport
          <span className="relative mt-2 block">
            <input inputMode="numeric" value={down} onChange={(e) => setDown(group(e.target.value))} className={box} placeholder="160 000" />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500">€</span>
          </span>
        </label>
      </div>

      <div className="mt-5">
        <span className={label}>Durée</span>
        <div className="mt-2 grid grid-cols-3 gap-2 md:gap-3" role="group" aria-label="Durée du prêt">
          {RATES.byYears.map((o) => (
            <button
              key={o.years}
              type="button"
              onClick={() => pickYears(o.years)}
              aria-pressed={years === o.years}
              className={`h-12 rounded-full border-2 border-stone-900 text-base transition ${
                years === o.years ? 'bg-[#F6CF4E] font-semibold text-stone-900' : 'bg-white text-stone-900 [@media(hover:hover)]:hover:bg-stone-100'
              }`}
            >
              {o.years} ans
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[14px] bg-[#FCF1C9] px-5 py-5 md:px-7 md:py-6" aria-live="polite">
        {principal <= 0 ? (
          <p className="text-stone-600">Indiquez le prix du bien et votre apport : votre mensualité s&apos;affiche ici.</p>
        ) : (
          <>
            <p className="text-sm text-stone-600">Votre mensualité</p>
            <p className="mt-1 font-serif text-5xl lining-nums tabular-nums leading-none tracking-tight text-stone-900 md:text-6xl">{eur(monthlyAll)}</p>
            <p className="mt-2 text-sm text-stone-600">
              par mois sur {years} ans, à {pct(num(rate))}&nbsp;%, assurance comprise
            </p>
          </>
        )}
      </div>

      {principal > 0 && (
        <details className="group mt-5">
          <summary className={more}>Voir le détail</summary>
          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full" aria-hidden="true">
            <span className="bg-stone-900" style={{ width: `${(principal / total) * 100}%` }} />
            <span className="bg-stone-400" style={{ width: `${(interest / total) * 100}%` }} />
            <span className="bg-[#F6CF4E]" style={{ width: `${(insTotal / total) * 100}%` }} />
          </div>
          <dl className="mt-2 divide-y divide-stone-200 text-stone-700">
            {[
              ['bg-stone-900', 'Montant emprunté', eur(principal)],
              ['bg-stone-400', `Intérêts sur ${years} ans`, eur(interest)],
              ['bg-[#F6CF4E] border border-stone-400', `Assurance sur ${years} ans`, eur(insTotal)],
            ].map(([dot, t, v]) => (
              <div key={t} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="flex items-baseline gap-2.5">
                  <span className={`h-2.5 w-2.5 flex-none rounded-full ${dot}`} aria-hidden="true" />
                  {t}
                </dt>
                <dd className="font-serif lining-nums tabular-nums text-stone-900 whitespace-nowrap">{v}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="pl-5 font-medium text-stone-900">Total à rembourser</dt>
              <dd className="font-serif lining-nums tabular-nums text-stone-900 whitespace-nowrap">{eur(principal + interest + insTotal)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-3">
              <dt className="pl-5">Revenus mensuels conseillés</dt>
              <dd className="font-serif lining-nums tabular-nums text-stone-900 whitespace-nowrap">{eur(income)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-stone-500 leading-relaxed">
            Revenus calculés pour un endettement de 35 %, assurance comprise. Ce n&apos;est qu&apos;une projection : le taux, l&apos;assurance et la durée dépendent du profil de chaque acquéreur.
          </p>
        </details>
      )}

      <details className="group mt-4">
        <summary className={more}>Ajuster le taux et l&apos;assurance</summary>
        <div className="mt-4 grid grid-cols-2 gap-3 md:gap-5">
          <label className={label}>
            Taux, hors assurance
            <span className="relative mt-2 block">
              <input inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className={box} />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500">%</span>
            </span>
          </label>
          <label className={label}>
            Assurance, par an
            <span className="relative mt-2 block">
              <input inputMode="decimal" value={insurance} onChange={(e) => setInsurance(e.target.value)} className={box} />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500">%</span>
            </span>
          </label>
        </div>
        <p className="mt-3 text-xs text-stone-500 leading-relaxed">
          L&apos;assurance s&apos;exprime en pourcentage du capital emprunté : elle va d&apos;environ 0,10 % à 25 ans à 0,47 % à 55 ans pour un non-fumeur (moyennes indicatives Meilleurtaux, 2026).
        </p>
      </details>
    </div>
    <BrokerRequest price={num(price)} down={num(down)} years={years} monthly={monthlyAll} />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { RATES } from '../../lib/rates';

function eur(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
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

  const field = 'placeholder:text-stone-300 mt-1 w-full border-0 border-b border-stone-300 bg-transparent px-0 pb-2 pt-1 font-serif text-2xl text-stone-900 focus:outline-none focus:border-stone-900 focus:ring-0';
  const label = 'block text-xs uppercase tracking-widest text-stone-500';

  return (
    <div className="border border-stone-300 bg-white p-6 md:p-8">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
        <label className={label}>
          Prix du bien (€)
          <input inputMode="numeric" value={price} onChange={(e) => setPrice(group(e.target.value))} className={field} placeholder="800 000" />
        </label>
        <label className={label}>
          Apport (€)
          <input inputMode="numeric" value={down} onChange={(e) => setDown(group(e.target.value))} className={field} placeholder="160 000" />
        </label>
        <div>
          <span className={label}>Durée</span>
          <div className="mt-2 flex gap-6 pb-2">
            {RATES.byYears.map((o) => (
              <button
                key={o.years}
                type="button"
                onClick={() => pickYears(o.years)}
                aria-pressed={years === o.years}
                className={`font-serif text-2xl underline-offset-8 transition ${years === o.years ? 'text-stone-900 underline decoration-stone-900 decoration-2' : 'text-stone-400 hover:text-stone-900'}`}
              >
                {o.years} ans
              </button>
            ))}
          </div>
        </div>
        <label className={label}>
          Taux, hors assurance (%)
          <input inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} className={field} />
        </label>
        <label className={label}>
          Assurance (% du capital par an)
          <input inputMode="decimal" value={insurance} onChange={(e) => setInsurance(e.target.value)} className={field} />
        </label>
      </div>

      <div className="mt-10 border-t border-stone-200 pt-8" aria-live="polite">
        <h2 className="font-serif text-2xl text-stone-900">Votre mensualité</h2>
        {principal <= 0 ? (
          <p className="mt-3 text-stone-600">Indiquez le prix du bien et votre apport : votre mensualité s&apos;affiche ici.</p>
        ) : (
        <>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-5xl md:text-6xl leading-none tracking-tight text-stone-900">{eur(monthlyAll)}</span>
          <span className="text-stone-500">par mois, assurance comprise</span>
        </p>

        <div className="mt-6 flex h-3 w-full overflow-hidden" aria-hidden="true">
          <span className="bg-stone-900" style={{ width: `${(principal / total) * 100}%` }} />
          <span className="bg-stone-400" style={{ width: `${(interest / total) * 100}%` }} />
          <span className="bg-[#F4E7B5] border border-stone-900" style={{ width: `${(insTotal / total) * 100}%` }} />
        </div>

        <dl className="mt-2 divide-y divide-stone-200 border-b border-stone-200 text-stone-700">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3.5">
            <dt className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 flex-none bg-stone-900" aria-hidden="true" />
              Montant emprunté
            </dt>
            <dd className="font-serif text-lg text-stone-900 whitespace-nowrap">{eur(principal)}</dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3.5">
            <dt className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 flex-none bg-stone-400" aria-hidden="true" />
              Intérêts sur {years} ans
            </dt>
            <dd className="font-serif text-lg text-stone-900 whitespace-nowrap">{eur(interest)}</dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3.5">
            <dt className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 flex-none bg-[#F4E7B5] border border-stone-900" aria-hidden="true" />
              Assurance sur {years} ans
            </dt>
            <dd className="font-serif text-lg text-stone-900 whitespace-nowrap">
              {eur(insTotal)} <span className="font-sans text-sm text-stone-500">soit {eur(insMonthly)} par mois</span>
            </dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4">
            <dt className="pl-5 font-medium text-stone-900">Montant total à rembourser</dt>
            <dd className="font-serif text-2xl text-stone-900 whitespace-nowrap">{eur(principal + interest + insTotal)}</dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3.5">
            <dt className="pl-5">Revenus mensuels conseillés</dt>
            <dd className="font-serif text-lg text-stone-900 whitespace-nowrap">
              <span className="font-sans text-sm text-stone-500">environ</span> {eur(income)}
            </dd>
          </div>
        </dl>
        <p className="mt-5 text-sm text-stone-700 leading-relaxed">
          Ce n&apos;est qu&apos;une projection, à ajuster : le taux, l&apos;assurance et la durée dépendent du profil de chaque acquéreur (âge, revenus, apport, situation). Modifiez les chiffres ci-dessus pour vous en approcher.
        </p>
        <p className="mt-3 text-xs text-stone-500 leading-relaxed">
          Taux de {pct(num(rate))} % sur {years} ans. Assurance estimée à {pct(num(insurance))} % du capital emprunté par an : elle va d&apos;environ 0,10 % à 25 ans à 0,47 % à 55 ans pour un non-fumeur (moyennes indicatives Meilleurtaux, 2026). Revenus calculés pour un endettement de 35 %, assurance comprise.
        </p>
        </>
        )}
      </div>
    </div>
  );
}

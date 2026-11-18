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

function pct(n: number) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Simulator() {
  const [price, setPrice] = useState('800000');
  const [down, setDown] = useState('160000');
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(String(RATES.byYears[1].rate).replace('.', ','));

  // Arrivée depuis la fiche d'un bien : le prix est repris, avec 20 % d'apport
  useEffect(() => {
    const p = Number(new URLSearchParams(window.location.search).get('prix'));
    if (Number.isFinite(p) && p > 0) {
      setPrice(String(Math.round(p)));
      setDown(String(Math.round(p * 0.2)));
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
  const income = monthly / 0.35;

  const field = 'mt-1.5 w-full h-12 border border-stone-300 bg-white px-3 text-base text-stone-900 focus:outline-none focus:border-stone-900';
  const label = 'block text-[11px] uppercase tracking-widest text-stone-500';

  return (
    <div className="grid md:grid-cols-2 border border-stone-200 bg-white">
      <div className="p-6 md:p-8 space-y-5">
        <label className={label}>
          Prix du bien (€)
          <input inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} className={field} />
        </label>
        <label className={label}>
          Apport (€)
          <input inputMode="numeric" value={down} onChange={(e) => setDown(e.target.value)} className={field} />
        </label>
        <div>
          <span className={label}>Durée</span>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {RATES.byYears.map((o) => (
              <button
                key={o.years}
                type="button"
                onClick={() => pickYears(o.years)}
                aria-pressed={years === o.years}
                className={`h-12 border text-sm transition ${years === o.years ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-300 bg-white text-stone-800 hover:border-stone-900'}`}
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
      </div>

      <div className="p-6 md:p-8 bg-stone-900 text-white flex flex-col justify-center" aria-live="polite">
        <p className="text-[11px] uppercase tracking-widest text-stone-400">Votre mensualité estimée</p>
        <p className="mt-2 font-serif text-5xl leading-none">
          {eur(monthly)} <span className="text-base text-stone-400">/ mois</span>
        </p>
        <dl className="mt-8 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-t border-stone-700 pt-3">
            <dt className="text-stone-400">Montant emprunté</dt>
            <dd>{eur(principal)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-stone-700 pt-3">
            <dt className="text-stone-400">Coût total des intérêts</dt>
            <dd>{eur(interest)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-stone-700 pt-3">
            <dt className="text-stone-400">Revenus mensuels conseillés</dt>
            <dd>environ {eur(income)}</dd>
          </div>
        </dl>
        <p className="mt-6 text-[11px] text-stone-400 leading-relaxed">
          Taux de {pct(num(rate))} % sur {years} ans. Revenus calculés pour un endettement de 35 %.
        </p>
      </div>
    </div>
  );
}

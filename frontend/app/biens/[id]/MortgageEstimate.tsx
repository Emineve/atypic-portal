'use client';

import { useState } from 'react';

function eur(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export default function MortgageEstimate({ price }: { price: number }) {
  const [down, setDown] = useState(String(Math.round(price * 0.2)));
  const [years, setYears] = useState('20');
  const [rate, setRate] = useState('3.5');

  const principal = Math.max(0, price - (Number(down) || 0));
  const n = Math.max(1, Math.round((Number(years) || 0) * 12));
  const r = (Number(rate) || 0) / 100 / 12;
  const monthly = principal <= 0 ? 0 : r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));

  const field = 'w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900';

  return (
    <div className="border border-stone-200 bg-white p-6 space-y-4">
      <h2 className="font-serif text-xl text-stone-900">Estimer ma mensualité</h2>
      <div className="grid grid-cols-3 gap-3">
        <label className="text-[10px] uppercase tracking-widest text-stone-500">
          Apport (€)
          <input type="number" min="0" step="10000" value={down} onChange={(e) => setDown(e.target.value)} className={`${field} mt-1`} />
        </label>
        <label className="text-[10px] uppercase tracking-widest text-stone-500">
          Durée (ans)
          <input type="number" min="1" max="30" step="1" value={years} onChange={(e) => setYears(e.target.value)} className={`${field} mt-1`} />
        </label>
        <label className="text-[10px] uppercase tracking-widest text-stone-500">
          Taux (%)
          <input type="number" min="0" max="15" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className={`${field} mt-1`} />
        </label>
      </div>
      <div>
        <p className="font-serif text-3xl text-stone-900">{eur(monthly)} <span className="text-sm text-stone-500">/ mois</span></p>
        <p className="mt-1 text-xs text-stone-500">Montant emprunté : {eur(principal)}</p>
      </div>
      <p className="text-[11px] text-stone-400 leading-relaxed">
        Estimation indicative, hors assurance, frais de notaire et frais de dossier. Le taux est un exemple à modifier : elle ne constitue pas une offre de prêt.
      </p>
    </div>
  );
}

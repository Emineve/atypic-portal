import { Manrope, Instrument_Serif } from 'next/font/google';

export const metadata = { title: 'Police des prix · essais', robots: { index: false, follow: false } };

// Page d'essai, hors menu et hors moteurs : six façons d'écrire un prix, avec les vraies polices.
const manrope = Manrope({ subsets: ['latin'], weight: ['500', '600'], display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: ['400'], display: 'swap' });

const OPTIONS: { key: string; name: string; note: string; cls: string }[] = [
  { key: 'A', name: 'Actuelle', note: 'La police des textes du site, en demi-gras.', cls: 'font-sans font-medium' },
  { key: 'B', name: 'La même, en fin', note: 'La police des textes, en trait fin : plus léger, plus luxe.', cls: 'font-sans font-light' },
  { key: 'C', name: 'Celle des titres, en fin', note: 'La police des titres du site, allégée, chiffres alignés.', cls: 'font-serif font-light lining-nums' },
  { key: 'D', name: 'Géométrique', note: 'Une police de chiffres nette et contemporaine (Manrope).', cls: `${manrope.className} font-semibold` },
  { key: 'E', name: 'Élégante', note: 'Une police à empattements fine, très éditoriale (Instrument Serif).', cls: `${instrument.className}` },
  { key: 'F', name: 'Celle du logo', note: 'La police du mot « loftissime. », pour rappeler la marque.', cls: 'font-logo font-semibold' },
];

const PRICE = '1 250 000 €';

export default function PriceFonts() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] px-6 py-12 font-sans text-[#191919]">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-serif text-4xl tracking-tight text-stone-900">Police des prix : six essais</h1>
        <p className="mt-3 text-stone-600">À gauche le prix sur la fiche d’un bien, à droite le prix sur une carte.</p>
        <ul className="mt-10 space-y-5">
          {OPTIONS.map((o) => (
            <li key={o.key} className="grid items-center gap-6 rounded-[14px] border border-stone-200 bg-white p-6 md:grid-cols-[13rem_1fr_auto]">
              <div>
                <p className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4E7B5] text-sm font-medium">{o.key}</span>
                  <span className="font-medium text-stone-900">{o.name}</span>
                </p>
                <p className="mt-2 text-sm text-stone-500">{o.note}</p>
              </div>
              <p className={`${o.cls} whitespace-nowrap text-[2.5rem] leading-none tracking-tight tabular-nums text-stone-900 [word-spacing:0.14em]`}>{PRICE}</p>
              <p className={`${o.cls} whitespace-nowrap text-xl tracking-tight tabular-nums text-stone-900`}>{PRICE}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

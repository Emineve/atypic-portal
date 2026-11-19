'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { typo } from '../../lib/typo';

export type Promise5 = { title: string; text: string; href?: string; link?: string; software?: boolean };

const action =
  'inline-flex items-center gap-1.5 text-base font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
const btn = 'inline-flex h-12 items-center rounded-[10px] bg-stone-900 px-8 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-stone-800';

// Les promesses faites aux agences, présentées comme le mode d'emploi des acheteurs : une à la fois, ou toutes d'un coup.
export default function ProSteps({ promises, softwareSrc }: { promises: Promise5[]; softwareSrc: string }) {
  const [step, setStep] = useState(0);
  const [all, setAll] = useState(false);
  const current = promises[step];
  const last = step === promises.length - 1;

  const Extra = ({ p }: { p: Promise5 }) => (
    <>
      {p.href && p.link && (
        <p className="mt-5">
          <Link href={p.href} className={action}>
            {p.link}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </p>
      )}
      {p.software && (
        <>
          <p className="mt-6 text-xs uppercase tracking-widest text-stone-500">Passerelles prévues avec les principaux logiciels</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={softwareSrc} alt="Hektor, AC3, Ubiflow, Netty, Apimo" className="mt-4 w-full max-w-md" />
        </>
      )}
    </>
  );

  return (
    <div className="rounded-[14px] border border-stone-200 bg-white p-6 md:p-10">
      {all ? (
        <ol className="divide-y divide-stone-200">
          {promises.map((p, i) => (
            <li key={p.title} className="flex gap-4 py-6 first:pt-0 last:pb-0">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#F4E7B5] text-sm font-medium text-stone-900">{i + 1}</span>
              <div>
                <h2 className="font-serif text-2xl leading-snug text-stone-900">{p.title}</h2>
                <p className="mt-2 max-w-2xl text-base font-light leading-relaxed text-stone-600">{typo(p.text)}</p>
                <Extra p={p} />
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="min-h-[19rem] md:min-h-[15rem]" aria-live="polite">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight text-stone-900">{current.title}</h2>
          <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-stone-600">{typo(current.text)}</p>
          <Extra p={current} />
        </div>
      )}

      {!all && (
        <div className="mt-8 flex flex-wrap gap-2.5" role="tablist" aria-label="Nos engagements">
          {promises.map((p, i) => (
            <button
              key={p.title}
              type="button"
              role="tab"
              aria-selected={i === step}
              aria-label={`${i + 1} : ${p.title}`}
              onClick={() => setStep(i)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition ${
                i === step ? 'bg-[#F4E7B5] text-stone-900' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition"
        >
          {all ? 'Revenir point par point' : 'Tout voir d’un coup'}
        </button>
        {all || last ? (
          <a href="#rejoindre" className={btn}>Diffuser mes annonces</a>
        ) : (
          <button type="button" onClick={() => setStep(step + 1)} className={btn}>Suivant</button>
        )}
      </div>
    </div>
  );
}

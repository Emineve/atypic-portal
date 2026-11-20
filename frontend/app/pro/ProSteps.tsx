'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { typo } from '../../lib/typo';
import StepDeck from '../StepDeck';

export type Promise5 = { title: string; text: string; href?: string; link?: string; software?: boolean; points?: [string, string][]; note?: string };

const action =
  'inline-flex items-center gap-1.5 text-base font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';

// Les promesses faites aux agences, présentées comme le mode d'emploi des acheteurs : une à la fois, ou toutes d'un coup.
export default function ProSteps({ promises, softwareSrc }: { promises: Promise5[]; softwareSrc: string }) {
  const [step, setStep] = useState(0);

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
      {p.points && (
        <ul className="mt-6 grid max-w-2xl gap-x-10 gap-y-3 sm:grid-cols-2">
          {p.points.map(([t, d]) => (
            <li key={t} className="border-t border-stone-200 pt-3">
              <p className="text-[15px] font-medium text-stone-900">{t}</p>
              <p className="mt-0.5 text-sm leading-snug text-stone-500">{d}</p>
            </li>
          ))}
        </ul>
      )}
      {p.note && <p className="mt-6 max-w-2xl text-sm leading-relaxed text-stone-600">{p.note}</p>}
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
    <StepDeck
      items={promises.map((p) => ({ title: p.title, text: p.text, extra: <Extra p={p} /> }))}
      step={step}
      onStep={setStep}
      word="Engagement"
      listLabel="Nos engagements"
      final={<a href="#rejoindre" className={action}>Contacter Loftissime<ArrowRight className="w-4 h-4" /></a>}
      format={typo}
    />
  );
}

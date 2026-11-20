'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { typo } from '../../lib/typo';
import StepDeck from '../StepDeck';

export type Promise5 = { title: string; text: string; href?: string; link?: string; software?: boolean };

const action =
  'inline-flex items-center gap-1.5 text-base font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
const btn = 'inline-flex h-12 items-center rounded-full bg-stone-900 px-8 text-[15px] font-medium text-white transition hover:bg-stone-800';

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
      final={<a href="#rejoindre" className={btn}>Diffuser mes annonces</a>}
      format={typo}
    />
  );
}

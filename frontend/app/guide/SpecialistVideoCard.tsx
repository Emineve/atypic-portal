'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import type { SpecialistVideo } from '../../lib/specialists';
import { typo } from '../../lib/typo';

// Une vidéo verticale et sa transcription. Le lecteur YouTube ne se charge qu'au clic :
// tant que le visiteur n'a pas lancé la vidéo, rien n'est envoyé à YouTube.
export default function SpecialistVideoCard({ v }: { v: SpecialistVideo }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article id={`video-${v.id}`} className="scroll-mt-24 rounded-[20px] border border-stone-200 bg-white p-5 md:p-7 sm:grid sm:grid-cols-[13rem_1fr] sm:gap-7">
      <div className="relative mx-auto aspect-[9/16] w-full max-w-[16rem] overflow-hidden rounded-[14px] bg-stone-900 sm:mx-0">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0&playsinline=1`}
            title={v.question}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Lire la vidéo : ${v.question}`} className="group absolute inset-0 h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-stone-900 transition group-hover:scale-105">
              <Play className="ml-0.5 h-6 w-6" fill="currentColor" strokeWidth={0} />
            </span>
          </button>
        )}
      </div>
      <div className="mt-5 sm:mt-0">
        <p className="text-xs uppercase tracking-widest text-stone-500">
          {v.name} · {v.role}
          {v.company ? ` · ${v.company}` : ''}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-snug text-stone-900">{typo(v.question)}</h3>
        <details className="mt-4 group">
          <summary className="cursor-pointer text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900">Lire la réponse</summary>
          <div className="mt-3 space-y-3 text-stone-600 font-light leading-relaxed">
            {v.transcript.map((p, i) => (
              <p key={i}>{typo(p)}</p>
            ))}
          </div>
        </details>
        {v.disclosure && <p className="mt-4 text-sm text-stone-500">{typo(v.disclosure)}</p>}
      </div>
    </article>
  );
}

'use client';

import { useState, useEffect } from 'react';

const PLACES = [
  'un loft',
  'une péniche',
  'un atelier d\u2019artiste',
  'un phare',
  'un château',
  'une chapelle',
  'un moulin',
  'une villa d\u2019architecte',
];

export default function HeroTitle() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((n) => (n + 1) % PLACES.length);
        setVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.15]">
      Et si on vivait dans{' '}
      <span
        className={`italic text-stone-600 inline-block transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {PLACES[i]}
      </span>{' '}
      ?
    </h1>
  );
}

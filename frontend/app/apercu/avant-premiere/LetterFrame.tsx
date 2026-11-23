'use client';

import { useRef, useState } from 'react';

// La lettre telle qu'elle part par mail, affichée dans la page. La hauteur s'ajuste à son contenu.
export default function LetterFrame({ src, title, height }: { src: string; title: string; height: number }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [h, setH] = useState(height);
  function fit() {
    try {
      const doc = ref.current?.contentDocument;
      if (doc) setH(doc.documentElement.scrollHeight);
    } catch {
      /* la hauteur réservée suffit */
    }
  }
  return <iframe ref={ref} src={src} title={title} onLoad={fit} style={{ height: h }} className="block w-full max-w-[600px] mx-auto border-0 bg-[#FBF5E9]" />;
}

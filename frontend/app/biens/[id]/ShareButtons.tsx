'use client';

import { useState, useEffect } from 'react';
import { Share2, Link2, Check } from 'lucide-react';

export default function ShareButtons({ url, title, detail }: { url: string; title: string; detail?: string }) {
  const [copied, setCopied] = useState(false);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  useEffect(() => {
    setHasNativeShare(typeof navigator.share === 'function');
  }, []);

    const message = `Regarde ce que je viens de trouver :\n${title}${detail ? `\n${detail}` : ''}\n${url}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copiez ce lien :', url);
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, text: detail ? `${title} · ${detail}` : title, url });
    } catch {
      /* partage annulé */
    }
  };

  const btn =
    'inline-flex items-center gap-2 px-4 py-2 border border-stone-300 bg-white text-sm text-stone-700 hover:border-stone-900 hover:text-stone-900 transition-colors';

  return (
    <div className="mt-5 flex flex-wrap gap-2" aria-label="Partager ce bien">
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={btn}>
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5.05-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .95.98-2.9-.2-.3a8.2 8.2 0 1 1 6.72 3.58Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.66.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
        </svg>
        WhatsApp
      </a>
      <button type="button" onClick={copy} className={btn}>
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        {copied ? 'Lien copié' : 'Copier le lien'}
      </button>
      {hasNativeShare && (
        <button type="button" onClick={nativeShare} className={btn}>
          <Share2 className="w-4 h-4" />
          Partager
        </button>
      )}
    </div>
  );
}

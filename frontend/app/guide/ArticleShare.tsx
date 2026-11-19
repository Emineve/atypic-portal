'use client';

import { useEffect, useState } from 'react';
import { Check, Link2, Mail, MessageSquare, Share2 } from 'lucide-react';

// Partage d'un article : WhatsApp, SMS, e-mail, Facebook, LinkedIn, X, copie du lien,
// et le menu de partage du téléphone quand il existe.
export default function ArticleShare({ url, title, label = true }: { url: string; title: string; label?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [native, setNative] = useState(false);
  const [smsSep, setSmsSep] = useState('?');

  useEffect(() => {
    setNative(typeof navigator.share === 'function');
    // L'iPhone attend « sms:&body= », Android « sms:?body= »
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) setSmsSep('&');
  }, []);

  // Message court : l'aperçu du lien affiche déjà l'illustration et le titre de l'article
  const text = `À lire avant d’acheter :\n${url}`;
  const u = encodeURIComponent(url);
  const links = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
    // Lien seul : Messages affiche alors la vignette de l'article dès la rédaction
    sms: `sms:${smsSep}body=${u}`,
    mail: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`À lire sur Loftissime :\n${url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${u}`,
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* copie impossible depuis ce navigateur */
    }
  };
  const share = async () => {
    try {
      await navigator.share({ title, text: 'À lire avant d’acheter', url });
    } catch {
      /* partage annulé */
    }
  };

  const btn =
    'h-10 w-10 inline-flex items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-900 transition-colors';
  const ext = { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Partager cet article">
      {label && <span className="mr-1 text-[10px] uppercase tracking-widest text-stone-400">Partager</span>}
      <a href={links.whatsapp} {...ext} className={btn} title="Partager sur WhatsApp" aria-label="Partager sur WhatsApp">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5.05-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .95.98-2.9-.2-.3a8.2 8.2 0 1 1 6.72 3.58Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.66.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
        </svg>
      </a>
      <a href={links.sms} className={btn} title="Envoyer par SMS" aria-label="Envoyer par SMS">
        <MessageSquare className="w-4 h-4" />
      </a>
      <a href={links.mail} className={btn} title="Envoyer par e-mail" aria-label="Envoyer par e-mail">
        <Mail className="w-4 h-4" />
      </a>
      <a href={links.facebook} {...ext} className={btn} title="Partager sur Facebook" aria-label="Partager sur Facebook">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7.5h2.5l.4-3h-2.900V8.600c0-.870.240-1.460 1.490-1.460H16.500V4.460A20 20 0 0 0 14.330 4.350c-2.150 0-3.630 1.310-3.630 3.730V10.500H8.200v3h2.500V21h2.800Z" />
        </svg>
      </a>
      <a href={links.linkedin} {...ext} className={btn} title="Partager sur LinkedIn" aria-label="Partager sur LinkedIn">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M6.940 8.500H4.060V19h2.880V8.500ZM5.500 4.250a1.670 1.670 0 1 0 0 3.340 1.670 1.670 0 0 0 0-3.340ZM19.940 12.980c0-3.160-1.690-4.630-3.940-4.630-1.820 0-2.630 1-3.080 1.700V8.500H10.040c.04.820 0 10.500 0 10.500h2.880v-5.860c0-.310.020-.630.120-.850.250-.630.820-1.280 1.790-1.280 1.260 0 1.770.960 1.770 2.370V19h2.880l.46-6.020Z" />
        </svg>
      </a>
      <a href={links.x} {...ext} className={btn} title="Partager sur X" aria-label="Partager sur X">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
          <path d="M17.750 3h3.070l-6.700 7.660L22 21h-6.170l-4.830-6.320L5.470 21H2.400l7.170-8.190L2 3h6.330l4.370 5.780L17.750 3Zm-1.080 16.170h1.700L7.400 4.740H5.580l11.090 14.430Z" />
        </svg>
      </a>
      <button type="button" onClick={copy} className={btn} title={copied ? 'Lien copié' : 'Copier le lien'} aria-label={copied ? 'Lien copié' : 'Copier le lien'}>
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
      {native && (
        <button type="button" onClick={share} className={btn} title="Autres applications" aria-label="Partager avec une autre application">
          <Share2 className="w-4 h-4" />
        </button>
      )}
      {copied && <span className="text-xs text-stone-500" role="status">Lien copié</span>}
    </div>
  );
}

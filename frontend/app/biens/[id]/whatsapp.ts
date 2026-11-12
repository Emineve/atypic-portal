import { SITE_URL } from '../../../lib/site';

// Couleur de WhatsApp, avec un texte foncé pour rester lisible
export const WHATSAPP_BUTTON = 'bg-[#25D366] text-[#0D0F11] hover:bg-[#1FBE5B] active:bg-[#1FBE5B]';

// Numéro au format attendu par WhatsApp (international, sans « + ») ; null si ce n'est pas un portable
export function whatsappNumber(phone: string): string | null {
  const raw = phone.replace(/[^+\d]/g, '');
  let n = raw;
  if (n.startsWith('+')) n = n.slice(1);
  else if (n.startsWith('00')) n = n.slice(2);
  else if (n.startsWith('0')) n = '33' + n.slice(1);
  if (/^33[67]\d{8}$/.test(n)) return n;
  return raw.startsWith('+') && n.length >= 10 && !n.startsWith('33') ? n : null;
}

// Lien WhatsApp vers le portable de l'agent, avec un message déjà rédigé ; null si le numéro ne convient pas
export function whatsappLink(o: {
  phone?: string | null;
  contactName?: string | null;
  title?: string | null;
  reference?: string | null;
  listingId: string;
}): string | null {
  const n = o.phone ? whatsappNumber(o.phone) : null;
  if (!n) return null;
  const text = [
    `Bonjour${o.contactName ? ' ' + o.contactName.trim().split(/\s+/)[0] : ''}, je vous contacte au sujet de ce bien vu sur Loftissime :`,
    `${o.title || ''}${o.reference ? ` (réf. ${o.reference})` : ''}`.trim(),
    `${SITE_URL}/biens/${o.listingId}`,
  ]
    .filter(Boolean)
    .join('\n');
  return `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_ICON_PATH =
  'M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5.05-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .95.98-2.9-.2-.3a8.2 8.2 0 1 1 6.72 3.58Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.66.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z';

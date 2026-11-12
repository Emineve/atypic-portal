'use client';

import { useState } from 'react';
import { Phone, Check } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { SITE_URL } from '../../../lib/site';

// Moments proposés pour le rappel
const SLOTS = ['Dès que possible', 'Tôt le matin', 'En matinée', "À l'heure du déjeuner", "Dans l'après-midi", 'En début de soirée'];

// Numéro au format attendu par WhatsApp (international, sans « + ») ; null si ce n'est pas un portable
function whatsappNumber(phone: string): string | null {
  const raw = phone.replace(/[^+\d]/g, '');
  let n = raw;
  if (n.startsWith('+')) n = n.slice(1);
  else if (n.startsWith('00')) n = n.slice(2);
  else if (n.startsWith('0')) n = '33' + n.slice(1);
  if (/^33[67]\d{8}$/.test(n)) return n;
  return raw.startsWith('+') && n.length >= 10 && !n.startsWith('33') ? n : null;
}

function sessionId() {
  try {
    return sessionStorage.getItem('singulier:sid');
  } catch {
    return null;
  }
}

export default function ContactForm({
  listingId,
  agency,
  phone,
  contactName,
  title,
  reference,
}: {
  listingId: string;
  agency: string;
  phone?: string | null;
  contactName?: string | null;
  title?: string | null;
  reference?: string | null;
}) {
  const [shown, setShown] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [slot, setSlot] = useState(SLOTS[0]);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [confirmOpen, setConfirmOpen] = useState(true); // fenêtre de confirmation après l'envoi

  // Lien WhatsApp vers le portable de l'agent, avec un message déjà rédigé
  const wa = phone ? whatsappNumber(phone) : null;
  const waText = [
    `Bonjour${contactName ? ' ' + contactName.trim().split(/\s+/)[0] : ''}, je vous contacte au sujet de ce bien vu sur Loftissime :`,
    `${title || ''}${reference ? ` (réf. ${reference})` : ''}`.trim(),
    `${SITE_URL}/biens/${listingId}`,
  ]
    .filter(Boolean)
    .join('\n');

  // Afficher le numéro ou ouvrir WhatsApp compte comme une prise de contact dans les statistiques de l'agence
  function trackContact() {
    getSupabase()
      .rpc('track_event', {
        p_type: 'phone',
        p_listing: listingId,
        p_path: window.location.pathname,
        p_referrer: document.referrer || null,
        p_session: sessionId(),
      })
      .then(() => undefined, () => undefined);
  }

  function reveal() {
    setShown(true);
    trackContact();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (website) { setStatus('done'); return; } // un robot a rempli le champ piège
    setStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_lead', {
        p_listing: listingId,
        p_name: name,
        p_email: email,
        p_phone: tel || null,
        p_message: `Rappel souhaité : ${slot}.${message.trim() ? ` Commentaire : ${message.trim()}` : ''}`,
        p_consent: consent,
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-stone-900';
  const label = 'block text-xs uppercase tracking-wider text-stone-500 mb-1';

  return (
    <div className="space-y-4">
      {phone && (
        <div className="border border-stone-200 bg-white p-6">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400">Votre contact pour ce bien</p>
          <p className="mt-1 font-serif text-xl text-stone-900">{contactName || agency}</p>
          {contactName && <p className="text-xs text-stone-500">{agency}</p>}
          {shown ? (
            <a
              href={`tel:${phone.replace(/[^+\d]/g, '')}`}
              className="mt-4 flex h-12 items-center justify-center gap-2 border border-stone-900 text-stone-900 text-base font-semibold tracking-wide hover:bg-stone-900 hover:text-white transition"
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>
          ) : (
            <button
              type="button"
              onClick={reveal}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              <Phone className="w-4 h-4" />
              Afficher le numéro
            </button>
          )}
          {wa && (
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackContact}
              className="mt-3 flex h-12 items-center justify-center gap-2 border border-stone-900 text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-900 hover:text-white transition"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5.05-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .95.98-2.9-.2-.3a8.2 8.2 0 1 1 6.72 3.58Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.66.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
              </svg>
              Écrire sur WhatsApp
            </a>
          )}
        </div>
      )}

      {status === 'done' ? (
        <>
          <div className="border border-stone-900 bg-white p-6 flex items-start gap-3">
            <span className="mt-0.5 h-7 w-7 flex-none rounded-full bg-stone-900 text-white flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            <div>
              <p className="font-serif text-lg text-stone-900">Votre demande de rappel est bien envoyée.</p>
              <p className="mt-1 text-sm text-stone-600">On vous rappelle au sujet de ce bien.</p>
            </div>
          </div>
          {confirmOpen && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-label="Demande envoyée">
              <div className="absolute inset-0 bg-stone-900/60" onClick={() => setConfirmOpen(false)} />
              <div className="relative w-full max-w-md bg-[#FDFBF7] shadow-2xl px-8 py-12 text-center">
                <span className="mx-auto h-16 w-16 rounded-full bg-stone-900 text-white flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </span>
                <h2 className="mt-7 font-serif text-3xl text-stone-900 leading-tight">C&apos;est envoyé.</h2>
                <p className="mt-4 text-stone-600 leading-relaxed">
                  Votre demande de rappel est bien enregistrée. On vous rappelle au sujet de ce bien, au moment que vous avez choisi.
                </p>
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="mt-9 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-9 py-4 hover:bg-stone-800 transition"
                >
                  Poursuivre ma visite
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <form onSubmit={onSubmit} className="border border-stone-200 bg-white p-6 space-y-4">
          <div>
            <h2 className="font-serif text-xl text-stone-900">Demander un rappel</h2>
            <p className="mt-1 text-sm text-stone-600">
              Laissez vos coordonnées : l&apos;agent en charge de la vente de ce bien vous recontacte.
            </p>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed bg-stone-50 border border-stone-200 p-3">
            Version de démonstration : votre demande est enregistrée mais n&apos;est pas transmise à {agency}.
          </p>

          <div>
            <label className={label} htmlFor="c-name">Nom</label>
            <input id="c-name" className={field} required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="c-phone">Téléphone</label>
            <input id="c-phone" type="tel" className={field} required minLength={6} maxLength={40} value={tel} onChange={(e) => setTel(e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="c-email">Email</label>
            <input id="c-email" type="email" className={field} required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <p className={label} id="c-slot">Quand vous rappeler ?</p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="c-slot">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={slot === s}
                  onClick={() => setSlot(s)}
                  className={`h-10 px-3 text-xs border transition ${
                    slot === s
                      ? 'bg-stone-900 border-stone-900 text-white'
                      : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={label} htmlFor="c-msg">Commentaire (facultatif)</label>
            <textarea id="c-msg" rows={3} className={field} maxLength={1800} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          {/* Champ piège : invisible pour les humains */}
          <div className="hidden" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <label className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
            <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
            J&apos;accepte que mes coordonnées soient enregistrées pour traiter ma demande.
          </label>

          {status === 'error' && (
            <p className="text-xs text-red-700">L&apos;envoi a échoué. Vérifiez les champs et réessayez.</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-4 py-3 hover:bg-stone-800 transition disabled:opacity-50"
          >
            {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
          </button>
        </form>
      )}
    </div>
  );
}

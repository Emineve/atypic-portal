'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';

// Moments proposés pour le rappel
const SLOTS = ['Dès que possible', 'Tôt le matin', 'En matinée', "À l'heure du déjeuner", "Dans l'après-midi", 'En début de soirée'];

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
}: {
  listingId: string;
  agency: string;
  phone?: string | null;
  contactName?: string | null;
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

  // Afficher le numéro compte comme une prise de contact dans les statistiques de l'agence
  function reveal() {
    setShown(true);
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
        </div>
      )}

      {status === 'done' ? (
        <div className="border border-stone-200 bg-white p-6">
          <p className="font-serif text-lg text-stone-900">Merci, votre demande de rappel est enregistrée.</p>
          <p className="mt-2 text-xs text-stone-500 leading-relaxed">
            Version de démonstration : votre demande n&apos;est pas transmise à {agency} pour le moment.
          </p>
        </div>
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

'use client';

import { useState } from 'react';
import { Phone, Check } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { whatsappLink, WHATSAPP_BUTTON, WHATSAPP_ICON_PATH } from './whatsapp';

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
  city,
  price,
}: {
  listingId: string;
  agency: string;
  phone?: string | null;
  contactName?: string | null;
  title?: string | null;
  reference?: string | null;
  city?: string | null;
  price?: number | null;
}) {
  const [shown, setShown] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [wantCall, setWantCall] = useState(true); // être rappelé : coché par défaut
  const [wantPlan, setWantPlan] = useState(false); // recevoir le plan du bien
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [confirmOpen, setConfirmOpen] = useState(true); // fenêtre de confirmation après l'envoi
  const [alertStatus, setAlertStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  // Alerte proposée juste après la demande : même ville, budget jusqu'à 20 % au-dessus du bien consulté
  const alertBudget = price && price > 0 ? Math.ceil((price * 1.2) / 50000) * 50000 : null;
  const alertLabel = [
    city || null,
    alertBudget ? `jusqu'à ${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(alertBudget)} €` : null,
  ]
    .filter(Boolean)
    .join(', ');

  async function createAlert() {
    setAlertStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_alert', {
        p_kind: 'alert',
        p_email: email,
        p_price_max: alertBudget,
        p_consent: true, // le bouton « Créer mon alerte » vaut accord, le texte le précise
        p_locations: city ? [city] : null,
        p_source: 'apres-demande',
      });
      setAlertStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setAlertStatus('error');
    }
  }

  // Lien WhatsApp vers le portable de l'agent, avec un message déjà rédigé
  const wa = whatsappLink({ phone, contactName, title, reference, listingId });

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
        p_message: [
          wantCall ? 'Souhaite être rappelé.' : null,
          wantPlan ? 'Souhaite recevoir le plan du bien.' : null,
          !wantCall && !wantPlan ? 'Demande d’information.' : null,
          message.trim() ? `Message : ${message.trim()}` : null,
        ]
          .filter(Boolean)
          .join(' '),
        p_consent: true, // l'envoi de la demande vaut accord, la phrase sous le bouton le précise
      });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full h-11 border border-stone-300 bg-white px-3 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-900';

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
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 border border-stone-900 bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-100 transition"
            >
              <Phone className="w-4 h-4" />
              Afficher le numéro
            </button>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackContact}
              className={`mt-3 flex h-12 items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition ${WHATSAPP_BUTTON}`}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                <path d={WHATSAPP_ICON_PATH} />
              </svg>
              WhatsApp
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
              <p className="font-serif text-lg text-stone-900">Votre demande est bien envoyée.</p>
              <p className="mt-1 text-sm text-stone-600">L&apos;agence en charge de ce bien vous recontacte.</p>
            </div>
          </div>
          {confirmOpen && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-label="Demande envoyée">
              <div className="absolute inset-0 bg-stone-900/60" onClick={() => setConfirmOpen(false)} />
              <div className="relative w-full max-w-md max-h-full overflow-y-auto bg-[#FDFBF7] shadow-2xl px-8 py-10 text-center">
                <span className="mx-auto h-16 w-16 rounded-full bg-stone-900 text-white flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </span>
                <h2 className="mt-7 font-serif text-3xl text-stone-900 leading-tight">C&apos;est envoyé.</h2>
                <p className="mt-4 text-stone-600 leading-relaxed">
                  Votre demande est bien enregistrée. L&apos;agence en charge de ce bien vous recontacte rapidement.
                </p>
                {alertLabel && alertStatus !== 'done' && (
                  <div className="mt-8 border border-stone-200 bg-white p-5 text-left">
                    <p className="font-serif text-lg text-stone-900 leading-snug">Et les prochains biens comme celui-ci ?</p>
                    <p className="mt-1 text-sm text-stone-600 leading-relaxed">
                      Recevez par e-mail les nouveaux biens : {alertLabel}.
                    </p>
                    <button
                      type="button"
                      onClick={createAlert}
                      disabled={alertStatus === 'sending'}
                      className="mt-4 w-full h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50"
                    >
                      {alertStatus === 'sending' ? 'Un instant…' : <>Recevoir en <em className="italic">avant-première</em></>}
                    </button>
                    {alertStatus === 'error' && <p className="mt-2 text-xs text-red-700">L&apos;alerte n&apos;a pas pu être créée. Réessayez.</p>}
                    <p className="mt-3 text-[11px] text-stone-500 leading-relaxed">
                      En créant l&apos;alerte, vous acceptez de recevoir ces e-mails à l&apos;adresse {email}. Arrêt possible à tout moment.
                    </p>
                  </div>
                )}
                {alertStatus === 'done' && (
                  <p className="mt-8 border border-stone-900 bg-white p-4 text-sm text-stone-900">
                    Alerte créée. Vous serez prévenu(e) par e-mail dès qu&apos;un nouveau bien répond à vos attentes.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className={
                    alertLabel && alertStatus !== 'done'
                      ? 'mt-5 text-xs font-semibold uppercase tracking-wider text-stone-600 underline underline-offset-4 hover:text-stone-900'
                      : 'mt-9 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-9 py-4 hover:bg-stone-800 transition'
                  }
                >
                  Poursuivre ma visite
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <form onSubmit={onSubmit} className="border border-stone-200 bg-white p-6 space-y-3">
          <h2 className="font-serif text-xl text-stone-900">Demande d&apos;information</h2>

          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Votre demande">
            {(
              [
                ['Être rappelé', wantCall, setWantCall],
                ['Recevoir le plan', wantPlan, setWantPlan],
              ] as [string, boolean, (v: boolean) => void][]
            ).map(([text, on, setOn]) => (
              <button
                key={text}
                type="button"
                aria-pressed={on}
                onClick={() => setOn(!on)}
                className={`h-11 inline-flex items-center justify-center gap-2 border bg-white text-sm transition hover:border-stone-900 ${
                  on ? 'border-stone-900 text-stone-900' : 'border-stone-300 text-stone-700'
                }`}
              >
                <span className={`h-4 w-4 flex-none border flex items-center justify-center ${on ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-400'}`}>
                  {on && <Check className="w-3 h-3" />}
                </span>
                {text}
              </button>
            ))}
          </div>

          <div>
            <label className="sr-only" htmlFor="c-name">Nom</label>
            <input id="c-name" name="name" autoComplete="name" placeholder="Nom" className={field} required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="sr-only" htmlFor="c-phone">Téléphone</label>
            <input id="c-phone" name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder={wantCall ? 'Téléphone' : 'Téléphone (facultatif)'} className={field} required={wantCall} minLength={6} maxLength={40} value={tel} onChange={(e) => setTel(e.target.value)} />
          </div>
          <div>
            <label className="sr-only" htmlFor="c-email">E-mail</label>
            <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="E-mail" className={field} required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {showMessage ? (
            <div>
              <label className="sr-only" htmlFor="c-msg">Message</label>
              <textarea id="c-msg" rows={3} placeholder="Votre message" className="w-full border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-900" maxLength={1800} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          ) : (
            <button type="button" onClick={() => setShowMessage(true)} className="text-xs text-stone-600 underline underline-offset-4 hover:text-stone-900">
              Ajouter un message
            </button>
          )}

          {/* Champ piège : invisible pour les humains */}
          <div className="hidden" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-700">L&apos;envoi a échoué. Vérifiez les champs et réessayez.</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50"
          >
            {status === 'sending' ? 'Envoi…' : wantCall ? 'Être rappelé' : wantPlan ? 'Recevoir le plan' : 'Envoyer ma demande'}
          </button>
          <p className="text-[11px] text-stone-500 leading-relaxed text-center">
            Vos coordonnées sont transmises uniquement à l&apos;agence en charge du bien.
          </p>
        </form>
      )}
    </div>
  );
}

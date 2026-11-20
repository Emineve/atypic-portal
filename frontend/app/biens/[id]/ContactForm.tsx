'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { readVisitor, saveVisitor } from '../../../lib/visitor';
import { Phone, Check, X, Bell, Send } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { whatsappLink, WHATSAPP_ICON_PATH } from './whatsapp';
import { formatPhone } from '../../../lib/phone';

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
  hasPlan = false,
}: {
  hasPlan?: boolean; // le plan est téléchargeable à part : la case « Recevoir le plan » n'a plus lieu d'être
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
  const [tab, setTab] = useState<'tel' | 'msg'>('tel'); // onglets « Téléphone » et « Contacter »
  const [message, setMessage] = useState(
    'Bonjour,\n\nJ’aimerais avoir plus de renseignements sur ce bien. Merci de me recontacter à cet effet.\n\nCordialement'
  );
  const [website, setWebsite] = useState(''); // champ piège anti-spam, invisible
  // Coordonnées déjà saisies ailleurs sur le site : reprises d'office
  useEffect(() => {
    const v = readVisitor();
    if (v.name) setName((cur) => cur || v.name || '');
    if (v.email) setEmail((cur) => cur || v.email || '');
    if (v.phone) setTel((cur) => cur || v.phone || '');
  }, []);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [confirmOpen, setConfirmOpen] = useState(true); // fenêtre de confirmation après l'envoi
  const [alertStatus, setAlertStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [alertLimit, setAlertLimit] = useState(false); // dix alertes actives déjà enregistrées pour cet e-mail

  // Alerte proposée juste après la demande : même ville, budget jusqu'à 20 % au-dessus du bien consulté
  const alertBudget = price && price > 0 ? Math.ceil((price * 1.2) / 50000) * 50000 : null;
  const alertLabel = [
    city || null,
    alertBudget ? `jusqu'à ${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(alertBudget)} €` : null,
  ]
    .filter(Boolean)
    .join(', ');

  // Après la demande : partager sa recherche avec l'agence que l'on vient de contacter, et elle seule
  const [shareStatus, setShareStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  async function shareCriteria() {
    setShareStatus('sending');
    try {
      const { data, error } = await getSupabase().rpc('submit_agency_search', {
        p_agency: agency,
        p_name: name,
        p_email: email,
        p_phone: tel || null,
        p_location: city || null,
        p_budget_max: alertBudget,
        p_surface_min: null,
        p_message: `Recherche partagée après une demande sur le bien « ${title || ''} »${reference ? ` (réf. ${reference})` : ''}.`,
      });
      setShareStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setShareStatus('error');
    }
  }

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
      setAlertLimit(Boolean(error && error.message.includes('alert_limit')));
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
        p_message:
          tab === 'tel'
            ? 'Souhaite être rappelé.'
            : ['Demande d’information.', message.trim() ? `Message : ${message.trim()}` : null].filter(Boolean).join(' '),
        p_consent: true, // l'envoi de la demande vaut accord, la phrase sous le bouton le précise
      });
      if (!error && data === true) saveVisitor({ name, email, phone: tel });
      setStatus(!error && data === true ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full h-10 border-0 border-b border-stone-300 bg-transparent px-0 text-base text-stone-900 placeholder:text-stone-300 rounded-none focus:outline-none focus:ring-0 focus:border-stone-900 transition-colors';
  const fieldLabel = 'block text-xs uppercase tracking-widest text-stone-500';
  // Une agence sans interlocuteur nommé : son nom n'est affiché qu'une fois
  const person = contactName && contactName.trim().toLowerCase() !== agency.trim().toLowerCase() ? contactName.trim() : '';

  return (
    <div className="space-y-4">
      <div className="rounded-[14px] border border-stone-300 bg-white shadow-[0_14px_36px_-16px_rgba(28,25,23,0.28)]">
        <div className="p-6">
          {/* Le contact, puis les deux moyens de le joindre tout de suite */}
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-stone-500">{person ? agency : 'Votre contact pour ce bien'}</p>
            <p className="mt-1.5 font-sans text-xl font-medium leading-tight text-stone-900 truncate">{person || agency}</p>
          </div>
          {phone && (
            <div className="mt-2 flex flex-wrap gap-x-7 gap-y-1">
              {shown ? (
                <a
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                  className="inline-flex items-center gap-2 min-h-[2.75rem] text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition whitespace-nowrap"
                >
                  {phone}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={reveal}
                  className="inline-flex items-center gap-2 min-h-[2.75rem] text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition"
                >
                  <Phone className="w-4 h-4" />
                  Appeler
                </button>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackContact}
                  className="inline-flex items-center gap-2 min-h-[2.75rem] text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#25D366]" fill="currentColor" aria-hidden="true">
                    <path d={WHATSAPP_ICON_PATH} />
                  </svg>
                  WhatsApp
                </a>
              )}
            </div>
          )}

          {/* Deux onglets discrets pour le formulaire : être rappelé, ou écrire */}
          {status === 'done' ? (
            <div className="mt-3 border-t border-stone-200" />
          ) : (
          <div className="mt-3 pt-5 border-t border-stone-200 flex gap-6 border-b" role="tablist" aria-label="Votre demande">
            {([
              ['tel', 'Être rappelé(e)'],
              ['msg', 'Écrire un message'],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`-mb-px pb-3 text-[15px] border-b-2 transition ${
                  tab === key ? 'border-stone-900 text-stone-900 font-medium' : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          )}

      {status === 'done' ? (
        <>
          <div className="mt-5 flex items-start gap-3">
            <span className="mt-0.5 h-7 w-7 flex-none rounded-full bg-stone-900 text-white flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            <div>
              <p className="font-serif text-lg text-stone-900">Votre demande est bien envoyée.</p>
              <p className="mt-1 text-sm text-stone-600">L&apos;agence en charge de ce bien vous recontacte dans les meilleurs délais.</p>
            </div>
          </div>
          {confirmOpen && createPortal(
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-label="Demande envoyée">
              <div className="absolute inset-0 bg-stone-900/60" onClick={() => setConfirmOpen(false)} />
              <div className="relative w-full max-w-sm max-h-full overflow-y-auto rounded-[20px] bg-white shadow-2xl px-7 pt-12 pb-7 text-center">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  aria-label="Fermer"
                  className="absolute top-2 right-2 h-11 w-11 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="mx-auto h-12 w-12 rounded-full bg-stone-900 text-white flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </span>
                <h2 className="mt-5 font-serif text-3xl text-stone-900 leading-tight">Demande envoyée.</h2>
                <p className="mt-2 text-stone-600">{agency} vous recontacte dans les meilleurs délais.</p>

                {alertLabel && (
                  <div className="mt-8 text-left">
                    <p className="text-xs uppercase tracking-widest text-stone-500">Et les prochains ?</p>
                    <p className="mt-1.5 font-medium leading-snug text-stone-900">Recevez les biens qui ressemblent à celui-ci, dès leur mise en ligne.</p>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Critères de l’alerte">
                      {city && <li className="rounded-full bg-[#F6CF4E] px-3 py-1 text-[13px] text-stone-900">{city}</li>}
                      {alertBudget ? (
                        <li className="rounded-full bg-[#F6CF4E] px-3 py-1 text-[13px] text-stone-900 whitespace-nowrap">
                          Jusqu&apos;à {new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(alertBudget).replace(/[\u202f\u00a0]/g, '\u00a0')}&nbsp;€
                        </li>
                      ) : null}
                    </ul>
                    <div className="mt-4 border-y border-stone-200 divide-y divide-stone-200">
                      {alertStatus === 'done' ? (
                        <p className="flex items-center gap-3 py-4 text-stone-600">
                          <Check className="w-4 h-4 flex-none" />
                          Alerte créée
                        </p>
                      ) : (
                        <button type="button" onClick={createAlert} disabled={alertStatus === 'sending'} className="w-full flex items-center gap-3 py-4 text-left text-stone-900 disabled:opacity-60">
                          <Bell className="w-4 h-4 flex-none text-stone-500" strokeWidth={1.5} />
                          <span className="flex-1 underline underline-offset-4 decoration-stone-300">
                            {alertStatus === 'sending' ? 'Un instant…' : 'Me prévenir par e-mail'}
                          </span>
                        </button>
                      )}
                      {shareStatus === 'done' ? (
                        <p className="flex items-center gap-3 py-4 text-stone-600">
                          <Check className="w-4 h-4 flex-none" />
                          Recherche confiée à {agency}
                        </p>
                      ) : (
                        <button type="button" onClick={shareCriteria} disabled={shareStatus === 'sending'} className="w-full flex items-center gap-3 py-4 text-left text-stone-900 disabled:opacity-60">
                          <Send className="w-4 h-4 flex-none text-stone-500" strokeWidth={1.5} />
                          <span className="flex-1 underline underline-offset-4 decoration-stone-300">
                            {shareStatus === 'sending' ? 'Un instant…' : `Confier aussi ma recherche à ${agency}`}
                          </span>
                        </button>
                      )}
                    </div>
                    {(alertStatus === 'error' || shareStatus === 'error') && (
                      <p className="mt-2 text-xs text-red-700">
                        {alertStatus === 'error' && alertLimit ? (
                          <>Vous avez déjà dix alertes actives avec cet e-mail. Arrêtez-en une depuis <a href="/alerte" className="underline underline-offset-2">Mes alertes</a> pour en créer une nouvelle.</>
                        ) : (
                          <>Cela n&apos;a pas abouti. Réessayez.</>
                        )}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-stone-500 leading-relaxed">
                      Si vous lui confiez votre recherche, {agency} reçoit vos critères et vos coordonnées. Personne d&apos;autre.
                    </p>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
        </>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          {tab === 'msg' && (
            <div>
              <label className={fieldLabel} htmlFor="c-msg">Votre message</label>
              <textarea id="c-msg" rows={5} className="mt-2 w-full border border-stone-300 bg-white px-3 py-2.5 text-base leading-relaxed rounded-none placeholder:text-stone-300 focus:outline-none focus:border-stone-900" maxLength={1800} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          )}

          <div>
            <label className={fieldLabel} htmlFor="c-name">Nom</label>
            <input id="c-name" name="name" autoComplete="name" placeholder="Prénom et nom" className={field} required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {tab === 'tel' && (
            <div>
              <label className={fieldLabel} htmlFor="c-phone">Téléphone</label>
              <input id="c-phone" name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" className={field} required minLength={6} maxLength={40} value={formatPhone(tel)} onChange={(e) => setTel(formatPhone(e.target.value))} />
            </div>
          )}
          <div>
            <label className={fieldLabel} htmlFor="c-email">E-mail</label>
            <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="vous@exemple.fr" className={field} required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

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
            className="!mt-7 w-full h-12 items-center justify-center gap-2.5 bg-stone-900 text-white text-[15px] font-medium hover:bg-stone-800 transition disabled:opacity-50 flex sm:w-auto sm:min-w-[16rem] sm:px-10 sm:mx-auto rounded-full"
          >
            {status !== 'sending' && tab === 'tel' && <Phone className="w-4 h-4" />}
            {status === 'sending' ? 'Envoi…' : tab === 'tel' ? 'Être rappelé(e)' : 'Envoyer mon message'}
          </button>
          <p className="text-xs text-stone-500 leading-relaxed text-center">
            Vos coordonnées sont transmises uniquement à l&apos;agence en charge du bien.
            {' '}
            <a href="/confidentialite" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-stone-900">
              Vos données et vos droits
            </a>
            .
          </p>
        </form>
      )}
        </div>
      </div>
    </div>
  );
}

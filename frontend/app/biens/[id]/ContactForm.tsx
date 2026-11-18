'use client';

import { useEffect, useState } from 'react';
import { readVisitor, saveVisitor } from '../../../lib/visitor';
import { Phone, Check } from 'lucide-react';
import { getSupabase } from '../../../lib/supabase';
import { whatsappLink, WHATSAPP_ICON_PATH } from './whatsapp';

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

  const field = 'w-full h-11 border border-stone-300 bg-white px-3 text-sm placeholder:text-stone-400 focus:outline-none focus:border-stone-900';

  return (
    <div className="space-y-4">
      <div className="border border-stone-900 bg-white shadow-[0_10px_30px_rgba(13,15,17,0.10)]">
        <p className="bg-[#F4E7B5] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-stone-900">Ce bien vous intéresse ?</p>
        <div className="p-6">
          {/* Le contact, puis les deux moyens de le joindre tout de suite */}
          <div className="min-w-0">
            <p className="font-serif text-xl leading-tight text-stone-900 truncate">{contactName || agency}</p>
            <p className="mt-0.5 text-xs text-stone-500 truncate">{contactName ? agency : 'Votre contact pour ce bien'}</p>
          </div>
          {phone && (
            <div className={`mt-4 grid gap-2 ${wa ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {shown ? (
                <a
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                  className="h-11 inline-flex items-center justify-center gap-2 border border-stone-900 text-stone-900 text-sm font-semibold whitespace-nowrap hover:bg-stone-900 hover:text-white transition"
                >
                  {phone}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={reveal}
                  className="h-11 inline-flex items-center justify-center gap-2 border border-stone-300 bg-white text-stone-900 text-sm hover:border-stone-900 transition"
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
                  className="h-11 inline-flex items-center justify-center gap-2 border border-stone-300 bg-white text-stone-900 text-sm hover:border-stone-900 transition"
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
          <div className="mt-6 flex gap-6 border-b border-stone-200" role="tablist" aria-label="Votre demande">
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
                className={`-mb-px pb-2.5 text-sm border-b-2 transition ${
                  tab === key ? 'border-stone-900 text-stone-900 font-medium' : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

      {status === 'done' ? (
        <>
          <div className="mt-5 flex items-start gap-3">
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
                      {alertStatus === 'sending' ? 'Un instant…' : 'Créer mon alerte'}
                    </button>
                    {alertStatus === 'error' && <p className="mt-2 text-xs text-red-700">L&apos;alerte n&apos;a pas pu être créée. Réessayez.</p>}
                    <p className="mt-3 text-[11px] text-stone-500 leading-relaxed">
                      En créant l&apos;alerte, vous acceptez de recevoir ces e-mails à l&apos;adresse {email}. Arrêt possible à tout moment.
                    </p>
                  </div>
                )}
                {alertLabel && shareStatus !== 'done' && (
                  <div className="mt-4 border border-stone-200 bg-white p-5 text-left">
                    <p className="font-serif text-lg text-stone-900 leading-snug">Partager ma recherche avec {agency} ?</p>
                    <p className="mt-1 text-sm text-stone-600 leading-relaxed">
                      L&apos;agence pourra vous proposer d&apos;autres biens, y compris avant leur mise en ligne : {alertLabel}.
                    </p>
                    <button
                      type="button"
                      onClick={shareCriteria}
                      disabled={shareStatus === 'sending'}
                      className="mt-4 w-full h-12 border border-stone-900 bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider hover:bg-stone-100 transition disabled:opacity-50"
                    >
                      {shareStatus === 'sending' ? 'Un instant…' : 'Partager mes critères'}
                    </button>
                    {shareStatus === 'error' && <p className="mt-2 text-xs text-red-700">Le partage n&apos;a pas abouti. Réessayez.</p>}
                    <p className="mt-3 text-[11px] text-stone-500 leading-relaxed">
                      Vos critères et vos coordonnées sont transmis uniquement à {agency}.
                    </p>
                  </div>
                )}
                {shareStatus === 'done' && (
                  <p className="mt-4 border border-stone-900 bg-white p-4 text-sm text-stone-900">
                    Recherche partagée avec {agency}.
                  </p>
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
        <form onSubmit={onSubmit} className="mt-4 space-y-2.5">
          {tab === 'msg' && (
            <div>
              <label className="sr-only" htmlFor="c-msg">Message</label>
              <textarea id="c-msg" rows={5} className="w-full border border-stone-300 bg-white px-3 py-2 text-sm leading-relaxed placeholder:text-stone-400 focus:outline-none focus:border-stone-900" maxLength={1800} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          )}

          <div>
            <label className="sr-only" htmlFor="c-name">Nom</label>
            <input id="c-name" name="name" autoComplete="name" placeholder="Nom" className={field} required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {tab === 'tel' && (
            <div>
              <label className="sr-only" htmlFor="c-phone">Téléphone</label>
              <input id="c-phone" name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="Téléphone" className={field} required minLength={6} maxLength={40} value={tel} onChange={(e) => setTel(e.target.value)} />
            </div>
          )}
          <div>
            <label className="sr-only" htmlFor="c-email">E-mail</label>
            <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="E-mail" className={field} required maxLength={200} value={email} onChange={(e) => setEmail(e.target.value)} />
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
            className="w-full h-12 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50"
          >
            {status === 'sending' ? 'Envoi…' : tab === 'tel' ? 'Être rappelé(e)' : 'Envoyer mon message'}
          </button>
          <p className="text-[11px] text-stone-500 leading-relaxed text-center">
            Vos coordonnées sont transmises uniquement à l&apos;agence en charge du bien.
          </p>
        </form>
      )}
        </div>
      </div>
    </div>
  );
}

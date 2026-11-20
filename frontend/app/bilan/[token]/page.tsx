import Logo from '../../Logo';
import { notFound } from 'next/navigation';
import { getSupabase } from '../../../lib/supabase';
import { agencyLine } from '../../../lib/agencyLine';
import PrintButton from './PrintButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Bilan de diffusion · Loftissime',
  robots: { index: false, follow: false },
  referrer: 'no-referrer' as const,
};

// Tant que le site est en phase de test, le bilan le dit : les chiffres comprennent des visites de test.
const TEST_PHASE = true;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface Report {
  generated_at: string;
  listing: {
    id: string;
    title: string;
    city: string | null;
    price: number;
    surface_sqm: number | null;
    rooms: number | null;
    bedrooms: number | null;
    cover_image_url: string | null;
    category: string | null;
    agency: string;
    reference: string | null;
    online_since: string;
    is_active: boolean;
  };
  views: number;
  views_7d: number;
  visitors: number;
  favorites: number;
  phone: number;
  clicks: number;
  leads: number;
  alerts_sent: number;
  matching_alerts: number;
  daily_views: { day: string; views: number }[];
}

async function getReport(token: string): Promise<Report | null> {
  if (!UUID.test(token)) return null;
  const { data, error } = await getSupabase().rpc('listing_report', { p_token: token });
  if (error || !data) return null;
  return data as Report;
}

const nb = (s: string) => s.replace(/[  ]/g, ' ');
const eur = (n: number) => nb(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n));
const num = (n: number) => nb(new Intl.NumberFormat('fr-FR').format(n));
const plural = (n: number, one: string, many: string) => `${num(n)} ${n > 1 ? many : one}`;
const dayLong = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' });
const dayShort = (iso: string) => new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

function Tile({ value, label, hint }: { value: number; label: string; hint?: string }) {
  return (
    <div className="rounded-[14px] border border-stone-200 bg-white p-5 print:break-inside-avoid">
      <p className="font-sans text-4xl font-light tabular-nums leading-none text-stone-900 md:text-5xl">{num(value)}</p>
      <p className="mt-3 text-[15px] font-medium leading-snug text-stone-900">{label}</p>
      {hint && <p className="mt-1 text-sm leading-snug text-stone-500">{hint}</p>}
    </div>
  );
}

export default async function BilanPage({ params }: { params: { token: string } }) {
  const r = await getReport(params.token);
  if (!r) notFound();
  const l = r.listing;

  const daysOnline = Math.max(1, Math.round((new Date(r.generated_at).getTime() - new Date(l.online_since).getTime()) / 86400000));
  const contacts = r.leads + r.phone;
  const maxDay = Math.max(1, ...r.daily_views.map((d) => d.views));
  const first = r.daily_views[0]?.day;
  const last = r.daily_views[r.daily_views.length - 1]?.day;
  const facts = [l.city, l.surface_sqm ? `${Math.round(Number(l.surface_sqm))} m²` : null, l.rooms ? `${l.rooms} pièces` : null, l.bedrooms ? `${l.bedrooms} chambres` : null].filter(Boolean);

  const rows: [string, number, string][] = [
    ['Vues de la fiche', r.views, 'Nombre de fois où la fiche du bien a été ouverte.'],
    ['Visiteurs', r.visitors, 'Personnes différentes ayant ouvert la fiche.'],
    ['Mises en favori', r.favorites, 'Acheteurs qui ont gardé le bien de côté.'],
    ['Clics vers l’annonce de l’agence', r.clicks, 'Visiteurs partis lire l’annonce sur le site de l’agence.'],
    ['Clics sur le téléphone', r.phone, 'Visiteurs qui ont touché le numéro de l’agence pour l’appeler.'],
    ['Demandes de rappel', r.leads, 'Formulaires de contact envoyés à l’agence.'],
    ['Alertes envoyées', r.alerts_sent, 'E-mails partis vers des acheteurs dont l’alerte correspond.'],
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] font-sans text-stone-900 print:bg-white">
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Logo />
          <span className="text-sm text-stone-500">Bilan de diffusion</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl tracking-tight md:text-5xl">Bilan de diffusion</h1>
            <p className="mt-2 text-stone-600">Au {dayLong(r.generated_at)}, chiffres en temps réel.</p>
          </div>
          <PrintButton />
        </div>

        {/* Le bien */}
        <section className="mt-8 flex flex-col gap-5 rounded-[14px] border border-stone-200 bg-white p-5 sm:flex-row sm:items-center print:break-inside-avoid">
          {l.cover_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={l.cover_image_url} alt="" className="h-40 w-full flex-none rounded-[10px] bg-stone-100 object-cover sm:h-28 sm:w-40" />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-wider text-stone-500">{facts.join(' · ')}</p>
            <h2 className="mt-1 font-serif text-2xl leading-tight">{l.title}</h2>
            <p className="mt-2 font-sans text-lg font-medium tabular-nums">{eur(Number(l.price))}</p>
            <p className="mt-2 text-sm text-stone-500">
              {agencyLine(l.agency)}
              {l.reference ? ` · Réf. ${l.reference}` : ''}
            </p>
          </div>
          <div className="flex-none rounded-[10px] bg-stone-100 px-5 py-4 text-center">
            <p className="font-sans text-3xl font-light tabular-nums leading-none">{num(daysOnline)}</p>
            <p className="mt-1 text-sm text-stone-600">{daysOnline > 1 ? 'jours en ligne' : 'jour en ligne'}</p>
            <p className="mt-1 text-xs text-stone-500">depuis le {dayLong(l.online_since)}</p>
            {!l.is_active && <p className="mt-1 text-xs font-medium text-stone-900">Annonce retirée</p>}
          </div>
        </section>

        {/* L'essentiel en quatre chiffres */}
        <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="L’essentiel">
          <Tile value={r.alerts_sent} label="Acheteurs prévenus" hint="par e-mail, dès la mise en ligne" />
          <Tile value={r.views} label="Vues de la fiche" hint={`${plural(r.visitors, 'visiteur', 'visiteurs')} · ${num(r.views_7d)} sur 7 jours`} />
          <Tile value={r.favorites} label="Mises en favori" hint="bien gardé de côté" />
          <Tile value={contacts} label="Contacts" hint={`${plural(r.leads, 'demande de rappel', 'demandes de rappel')} · ${plural(r.phone, 'clic téléphone', 'clics téléphone')}`} />
        </section>

        {/* Ce que les autres portails ne montrent pas : les acheteurs qui attendent ce type de bien */}
        {r.matching_alerts > 0 && (
          <section className="mt-4 flex items-center gap-5 rounded-[14px] bg-[#F6CF4E] px-6 py-5 print:break-inside-avoid">
            <p className="flex-none font-sans text-5xl font-light tabular-nums leading-none">{num(r.matching_alerts)}</p>
            <p className="text-[15px] leading-snug text-stone-800 md:text-base">
              <span className="font-medium text-stone-900">
                {r.matching_alerts > 1 ? 'acheteurs ont une alerte active qui correspond à ce bien.' : 'acheteur a une alerte active qui correspond à ce bien.'}
              </span>{' '}
              Lieu, budget, surface et critères indispensables : ils cherchent exactement cela.
            </p>
          </section>
        )}

        {/* La courbe */}
        <section className="mt-4 rounded-[14px] border border-stone-200 bg-white p-5 md:p-7 print:break-inside-avoid">
          <h2 className="font-serif text-xl">Vues par jour</h2>
          <div className="mt-5 flex h-40 items-end gap-[3px]" role="img" aria-label={`Vues par jour, du ${first ? dayShort(first) : ''} au ${last ? dayShort(last) : ''}`}>
            {r.daily_views.map((d) => (
              <div key={d.day} className="flex h-full flex-1 flex-col justify-end" title={`${dayShort(d.day)} : ${d.views} vue${d.views > 1 ? 's' : ''}`}>
                <div
                  className={`w-full rounded-t-[3px] ${d.views ? 'bg-stone-900' : 'bg-stone-200'}`}
                  style={{ height: `${Math.max(2, (d.views / maxDay) * 100)}%`, printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-stone-500">
            <span>{first ? dayShort(first) : ''}</span>
            <span>Jour le plus fort : {plural(maxDay, 'vue', 'vues')}</span>
            <span>{last ? dayShort(last) : ''}</span>
          </div>
        </section>

        {/* Le détail */}
        <section className="mt-4 rounded-[14px] border border-stone-200 bg-white p-5 md:p-7 print:break-inside-avoid">
          <h2 className="font-serif text-xl">Le détail</h2>
          <dl className="mt-3 divide-y divide-stone-200">
            {rows.map(([t, v, d]) => (
              <div key={t} className="flex items-baseline justify-between gap-6 py-3">
                <dt>
                  <span className="text-[15px] text-stone-900">{t}</span>
                  <span className="block text-sm text-stone-500">{d}</span>
                </dt>
                <dd className="font-sans text-lg tabular-nums text-stone-900">{num(v)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-6 max-w-3xl text-xs leading-relaxed text-stone-500">
          <p>
            Chiffres mesurés par Loftissime depuis la mise en ligne du bien, sans identifier les personnes : des nombres, jamais des identités.
            Loftissime ne diffuse que des biens atypiques : ceux qui consultent cette fiche cherchent ce type de bien.
          </p>
          {TEST_PHASE && (
            <p className="mt-2">Le site est en phase de test : ces chiffres comprennent des visites et des demandes de test.</p>
          )}
        </section>
      </div>
    </main>
  );
}

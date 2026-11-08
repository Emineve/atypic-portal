import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabase } from '../../../lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Espace agence · SINGULIER',
  robots: { index: false, follow: false },
  referrer: 'no-referrer' as const,
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PERIODS = [7, 30, 90];

interface ListingRow {
  id: string;
  title: string;
  city: string | null;
  price: number;
  cover_image_url: string | null;
  is_active: boolean;
  views: number;
  visitors: number;
  favorites: number;
  clicks: number;
  leads: number;
  matching_alerts: number;
}

interface Report {
  agency: { name: string };
  days: number;
  active_alerts: number;
  listings: ListingRow[];
  daily_views: { day: string; views: number }[];
}

async function getReport(token: string, days: number): Promise<Report | null> {
  if (!UUID.test(token)) return null;
  const { data, error } = await getSupabase().rpc('agency_report', { p_token: token, p_days: days });
  if (error || !data) return null;
  return data as Report;
}

const eur = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const num = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

function Tile({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="border border-stone-200 bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">{label}</p>
      <p className="mt-2 font-serif text-4xl text-stone-900">{num(value)}</p>
      <p className="mt-1 text-xs text-stone-500">{hint}</p>
    </div>
  );
}

export default async function EspaceAgence({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams: { jours?: string };
}) {
  const asked = Number(searchParams.jours);
  const days = PERIODS.includes(asked) ? asked : 30;
  const report = await getReport(params.token, days);
  if (!report) notFound();

  const listings = report.listings;
  const sum = (k: keyof ListingRow) => listings.reduce((t, l) => t + Number(l[k] || 0), 0);
  const maxDay = Math.max(1, ...report.daily_views.map((d) => d.views));
  const firstDay = report.daily_views[0]?.day?.slice(0, 10);
  const lastDay = report.daily_views[report.daily_views.length - 1]?.day?.slice(0, 10);
  const fmtDay = (iso?: string) =>
    iso ? new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) : '';

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl font-bold tracking-widest uppercase">SINGULIER</Link>
          <span className="text-xs uppercase tracking-wider text-stone-500">Espace agence</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Rapport de visibilité</p>
        <h1 className="mt-2 font-serif text-3xl md:text-5xl tracking-tight">{report.agency.name}</h1>

        <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Période">
          {PERIODS.map((p) => (
            <Link
              key={p}
              href={`?jours=${p}`}
              scroll={false}
              aria-current={p === days ? 'true' : undefined}
              className={`h-10 px-4 inline-flex items-center text-sm border transition ${
                p === days
                  ? 'bg-stone-900 border-stone-900 text-white'
                  : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900'
              }`}
            >
              {p} jours
            </Link>
          ))}
          <span className="ml-1 text-xs text-stone-500">
            du {fmtDay(firstDay)} au {fmtDay(lastDay)}
          </span>
        </div>

        <section className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-3">
          <Tile label="Vues de fiches" value={sum('views')} hint="Pages de vos biens ouvertes" />
          <Tile label="Visiteurs" value={sum('visitors')} hint="Somme par bien, un visiteur par bien" />
          <Tile label="Favoris" value={sum('favorites')} hint="Biens mis de côté" />
          <Tile label="Clics vers votre annonce" value={sum('clicks')} hint="Sortie vers votre site" />
          <Tile label="Demandes de contact" value={sum('leads')} hint="Formulaires envoyés" />
        </section>

        <section className="mt-10 border border-stone-200 bg-white p-5 md:p-6">
          <h2 className="font-serif text-xl">Vues par jour</h2>
          <div className="mt-5 flex items-end gap-[2px] h-32" role="img" aria-label="Nombre de vues par jour sur la période">
            {report.daily_views.map((d) => (
              <div
                key={d.day}
                title={`${fmtDay(d.day.slice(0, 10))} : ${d.views} vue${d.views > 1 ? 's' : ''}`}
                className="flex-1 bg-stone-900/80 min-h-[2px]"
                style={{ height: `${Math.max(2, (d.views / maxDay) * 100)}%`, opacity: d.views ? 1 : 0.15 }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-stone-400">
            <span>{fmtDay(firstDay)}</span>
            <span>pic : {maxDay} / jour</span>
            <span>{fmtDay(lastDay)}</span>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-xl">Vos biens ({listings.length})</h2>
            <p className="text-xs text-stone-500">
              Alertes acheteurs actives sur le site : {num(report.active_alerts)}
            </p>
          </div>

          <div className="mt-4 overflow-x-auto border border-stone-200 bg-white">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="bg-stone-100 text-left text-[11px] font-semibold uppercase tracking-wider text-stone-600">
                  <th className="px-4 py-3">Bien</th>
                  <th className="px-3 py-3 text-right">Vues</th>
                  <th className="px-3 py-3 text-right">Visiteurs</th>
                  <th className="px-3 py-3 text-right">Favoris</th>
                  <th className="px-3 py-3 text-right">Clics</th>
                  <th className="px-3 py-3 text-right">Contacts</th>
                  <th className="px-4 py-3 text-right">Acheteurs en alerte</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id} className="border-t border-stone-200 align-middle">
                    <td className="px-4 py-3">
                      <Link href={`/biens/${l.id}`} className="flex items-center gap-3 group">
                        {l.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={l.cover_image_url} alt="" className="h-12 w-16 object-cover bg-stone-200 shrink-0" />
                        ) : (
                          <span className="h-12 w-16 bg-stone-200 shrink-0" />
                        )}
                        <span>
                          <span className="block text-stone-900 group-hover:underline underline-offset-4 line-clamp-1">{l.title}</span>
                          <span className="block text-xs text-stone-500">
                            {l.city || ''} · {eur(Number(l.price))}
                            {!l.is_active && ' · retiré'}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">{num(l.views)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{num(l.visitors)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{num(l.favorites)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{num(l.clicks)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{num(l.leads)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{num(l.matching_alerts)}</td>
                  </tr>
                ))}
                {listings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-stone-500">
                      Aucun bien publié pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 text-xs text-stone-500 leading-relaxed max-w-3xl">
          <p>
            <strong className="text-stone-700">Comment lire ce rapport.</strong> « Acheteurs en alerte » compte les alertes actives dont les critères
            (lieu, type, budget, surface, critères indispensables) correspondent à ce bien aujourd&apos;hui : un nombre, jamais une identité.
            Les visites sont comptées sans identifier les personnes. Les chiffres débutent à l&apos;ouverture du site : tant que l&apos;audience est
            faible, ils restent modestes.
          </p>
          <p className="mt-3">
            Ce lien est personnel : ne le partagez qu&apos;avec votre équipe. Une question ou un bien à ajouter ?{' '}
            <Link href="/pro" className="underline underline-offset-4">Contactez-nous</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}

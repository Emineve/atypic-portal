import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../SiteHeader';
import LetterView, { dateLettre } from '../LetterView';
import NumeroView from '../NumeroView';
import { themeDe } from '../../../lib/newsletters';
import { partage } from '../../../lib/partage';
import { getIssue, lettreArticles } from '../../../lib/lettre';
import { biensDuNumero, estV2, type NumeroContent } from '../../../lib/numero';

// Un numéro de la lettre, lu depuis le back-office : une modification y apparaît ici en une minute au plus.
export const revalidate = 60;

const numero = (slug: string) => Number((slug.match(/^numero-(\d+)$/) || [])[1]) || 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const d = await getIssue(numero(params.slug));
  const theme = d ? themeDe((d.issue.content as { theme?: string }).theme) : null;
  return {
    // L'aperçu de partage reprend la matière du thème du numéro
    ...(d && theme ? partage(`${theme.nom}, le n° ${d.issue.numero} de Loftissime`, d.issue.resume || theme.sujet, `/og/theme-${theme.slug}.png`) : {}),
    title: d ? `${themeDe((d.issue.content as { theme?: string }).theme).nom} n° ${d.issue.numero}${d.issue.titre ? ` : ${d.issue.titre}` : ''} · loftissime.` : 'La newsletter · loftissime.',
    description: d?.issue.resume || undefined,
    // Un numéro pas encore paru n'est qu'une maquette : il ne doit pas être repris ailleurs
    robots: d && !d.issue.paru ? { index: false, follow: false } : undefined,
  };
}

export default async function Numero({ params }: { params: { slug: string } }) {
  const d = await getIssue(numero(params.slug));
  if (!d) notFound();
  const { issue, items } = d;
  return (
    <div className="min-h-screen bg-[#F1E9D8] text-[#3A2E2A] font-sans">
      <SiteHeader />
      <div className="mx-auto max-w-[600px] pb-16 pt-8">
        <p className="px-6 text-sm text-stone-600 sm:px-0">
          <Link href="/lettre" className="underline underline-offset-4">Tous les numéros</Link>
          <span className="mx-2">/</span>
          N° {issue.numero}{issue.date_parution ? `, ${dateLettre(issue.date_parution)}` : ''}
          {!issue.paru && <span className="mt-1 block text-stone-500">Maquette, pas encore envoyée.</span>}
        </p>
        <div className="mt-6">
          {estV2(issue.content) ? (
            <NumeroView numero={issue.numero} c={issue.content as unknown as NumeroContent} items={biensDuNumero(issue.content as unknown as NumeroContent, items)} brouillon={!issue.paru} />
          ) : (
            <LetterView issue={issue} items={items} articles={lettreArticles(issue.content)} />
          )}
        </div>
      </div>
    </div>
  );
}

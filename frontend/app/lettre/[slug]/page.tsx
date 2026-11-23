import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../SiteHeader';
import LetterView, { dateLettre } from '../LetterView';
import LetterSignup from '../LetterSignup';
import { getIssue, lettreArticles } from '../../../lib/lettre';

// Un numéro de la lettre, lu depuis le back-office : une modification y apparaît ici en une minute au plus.
export const revalidate = 60;

const numero = (slug: string) => Number((slug.match(/^numero-(\d+)$/) || [])[1]) || 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const d = await getIssue(numero(params.slug));
  return {
    title: d ? `La lettre n° ${d.issue.numero}${d.issue.titre ? ` : ${d.issue.titre}` : ''} · loftissime.` : 'La lettre · loftissime.',
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
    <div className="min-h-screen bg-[#EFE7D6] text-[#191919] font-sans">
      <SiteHeader />
      <div className="mx-auto max-w-[600px] pb-16 pt-8">
        <p className="px-6 text-sm text-stone-600 sm:px-0">
          <Link href="/lettre" className="underline underline-offset-4">Tous les numéros</Link>
          <span className="mx-2">/</span>
          N° {issue.numero}{issue.date_parution ? `, ${dateLettre(issue.date_parution)}` : ''}
          {!issue.paru && <span className="mt-1 block text-stone-500">Maquette, pas encore envoyée.</span>}
        </p>
        <div className="mt-6">
          <LetterView issue={issue} items={items} articles={lettreArticles(issue.content)} />
        </div>
        <div className="mt-10 px-6 sm:px-0">
          <LetterSignup variant="band" source="numero" />
        </div>
      </div>
    </div>
  );
}

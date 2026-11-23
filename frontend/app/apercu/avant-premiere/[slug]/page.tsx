import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../../SiteHeader';
import LetterView, { dateLettre, type LetterIssue, type LetterItem } from '../../../lettre/LetterView';
import { lettreArticles } from '../../../../lib/lettre';
import { getSupabase } from '../../../../lib/supabase';

// Un numéro de la lettre, lu depuis le back-office : une modification y apparaît ici en une minute au plus.
export const revalidate = 60;

async function load(slug: string): Promise<{ issue: LetterIssue; items: LetterItem[] } | null> {
  const n = Number((slug.match(/^numero-(\d+)$/) || [])[1]);
  if (!n) return null;
  try {
    const { data } = await getSupabase().rpc('letter_public', { p_numero: n });
    const d = data as { issue: LetterIssue | null; items: LetterItem[] } | null;
    return d && d.issue ? { issue: d.issue, items: d.items || [] } : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const d = await load(params.slug);
  return {
    title: d ? `Avant-première n° ${d.issue.numero}${d.issue.titre ? ` : ${d.issue.titre}` : ''} · Loftissime` : 'Avant-première · Loftissime',
    robots: { index: false, follow: false },
  };
}

export default async function Numero({ params }: { params: { slug: string } }) {
  const d = await load(params.slug);
  if (!d) notFound();
  const { issue, items } = d;
  return (
    <div className="min-h-screen bg-[#EFE7D6] text-[#191919] font-sans">
      <SiteHeader />
      <div className="mx-auto max-w-[600px] pb-16 pt-8">
        <p className="px-6 text-sm text-stone-600 sm:px-0">
          <Link href="/apercu/avant-premiere" className="underline underline-offset-4">Tous les numéros</Link>
          <span className="mx-2">/</span>
          N° {issue.numero}{issue.date_parution ? `, ${dateLettre(issue.date_parution)}` : ''}
          {!issue.paru && <span className="mt-1 block text-stone-500">Maquette, pas encore envoyée.</span>}
        </p>
        <div className="mt-6">
          <LetterView issue={issue} items={items} articles={lettreArticles(issue.content)} />
        </div>
      </div>
    </div>
  );
}

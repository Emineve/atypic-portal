import Link from 'next/link';
import SiteHeader from './SiteHeader';
import PortailSeulement from './PortailSeulement';

export const metadata = { title: 'Page introuvable · Loftissime', robots: { index: false } };

// Page affichée quand une adresse n'existe pas ou qu'un bien a été retiré.
export default function NotFound() {
  const link = 'text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition';
  return (
    <div className="min-h-[70vh] bg-[#FCFBF8] text-[#3A2E2A] font-sans">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl pt-8 md:pt-12 pb-24">
        <PortailSeulement
          sinon={
          <>
            <p className="text-sm text-stone-500">Page introuvable</p>
            <h1 className="mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
              Cette page n&apos;existe pas, <span className="italic text-stone-500">ou n&apos;existe plus.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">Le plus simple est de repartir de l&apos;accueil.</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/" className="inline-flex h-12 items-center px-8 rounded-full bg-stone-900 text-[#FCFBF8] text-[15px] font-medium hover:bg-stone-800 transition">Revenir à l&apos;accueil</Link>
              <Link href="/guide" className={link}>Lire nos articles</Link>
            </div>
          </>
          }
        >
        <p className="text-xs uppercase tracking-widest text-stone-500">Page introuvable</p>
        <h1 className="mt-6 text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.05]">
          Ce bien n&apos;est plus en ligne, <span className="italic text-stone-500">ou cette page n&apos;existe pas.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg font-light leading-relaxed text-stone-600">
          Un bien vendu est retiré du site. Les autres vous attendent, et une alerte vous préviendra du prochain.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center px-8 rounded-full bg-stone-900 text-[#FCFBF8] text-[15px] font-medium hover:bg-stone-800 transition"
          >
            Voir tous les biens
          </Link>
          <Link href="/?alerte=1" className={link}>
            Créer mon alerte
          </Link>
        </div>
        </PortailSeulement>
      </div>
      </main>
    </div>
  );
}

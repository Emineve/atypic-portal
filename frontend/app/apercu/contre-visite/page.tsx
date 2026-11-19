import SiteHeader from '../../SiteHeader';
import Crumbs from '../../Crumbs';
import SpecialistVideoCard from '../../guide/SpecialistVideoCard';
import type { SpecialistVideo } from '../../../lib/specialists';

export const metadata = {
  title: 'Aperçu de Contre-visite',
  robots: { index: false, follow: false },
};

// Page d'aperçu, hors menu et hors moteurs de recherche : la rubrique « Contre-visite » telle qu'elle
// s'affichera dans État des lieux, avec des noms et des vidéos fictifs.
const DEMO: SpecialistVideo[] = [
  { id: 'financement', question: 'Quel apport faut-il prévoir pour un bien atypique ?', name: 'Prénom Nom', role: 'Courtier', company: 'Société', youtubeId: '', transcript: ['Ici, la réponse du spécialiste, mot pour mot, pour ceux qui préfèrent lire.'], published: '2026-11-19', articles: [], disclosure: 'Société est le courtier partenaire de Loftissime.' },
  { id: 'notaire', question: 'À quoi m’engage une offre d’achat une fois signée ?', name: 'Prénom Nom', role: 'Notaire', youtubeId: '', transcript: ['Ici, la réponse du spécialiste, mot pour mot, pour ceux qui préfèrent lire.'], published: '2026-11-19', articles: [] },
  { id: 'architecte', question: 'Peut-on créer une mezzanine dans n’importe quel volume ?', name: 'Prénom Nom', role: 'Architecte', company: 'Agence', youtubeId: '', transcript: ['Ici, la réponse du spécialiste, mot pour mot, pour ceux qui préfèrent lire.'], published: '2026-11-19', articles: [] },
  { id: 'diagnostics', question: 'Une mezzanine ou un souplex comptent-ils dans la surface Carrez ?', name: 'Prénom Nom', role: 'Diagnostiqueur', company: 'Société', youtubeId: '', transcript: ['Ici, la réponse du spécialiste, mot pour mot, pour ceux qui préfèrent lire.'], published: '2026-11-19', articles: [] },
];

export default function ContreVisitePreview() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#191919] font-sans">
      <SiteHeader alert={false} />
      <main className="max-w-6xl mx-auto px-6 pt-12 md:pt-20 pb-24">
        <Crumbs items={[{ label: 'État des lieux', href: '/guide' }, { label: 'Aperçu' }]} />
        <p className="mt-6 inline-block bg-[#F4E7B5] px-2 py-1 text-xs font-semibold uppercase tracking-wider text-stone-900">Aperçu · noms et vidéos fictifs</p>
        <section className="mt-8">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900">Contre-visite</h2>
          <p className="mt-3 max-w-2xl text-stone-600 font-light leading-relaxed">Une question, un spécialiste, une minute.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {DEMO.map((v) => (
              <SpecialistVideoCard key={v.id} v={v} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

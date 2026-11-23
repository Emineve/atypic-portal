import type { Metadata } from 'next';
import { Poppins, DM_Sans, Newsreader } from 'next/font/google';
import SiteFooter from './SiteFooter';
import BackToTop from './BackToTop';
import './globals.css';
import { SITE_URL, SITE_NAME } from '../lib/site';

// Police du logo, chargée une fois pour tout le site
const logoFont = Poppins({ subsets: ['latin'], weight: ['600'], variable: '--font-logo', display: 'swap' });
// Police des textes et des libellés
const sansFont = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
// Police des titres
const serifFont = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

// Texte repris par Google, par les assistants IA et par les aperçus de partage
const TITLE = 'Loftissime · Lofts, ateliers et biens atypiques à vendre';
const DESCRIPTION =
  'Loftissime, curateur de biens atypiques, vous accompagne dans la recherche du bien de vos rêves : lofts, ateliers d’artistes, rooftops et maisons d’architecte à vendre, réunis sur un seul site.';

// Présentation plus complète, pour la carte d'identité lue par les moteurs et les assistants IA
const ORG_DESCRIPTION =
  'Loftissime, curateur de biens atypiques, est le premier hub d’annonces immobilières atypiques en France : lofts, ateliers d’artistes, rooftops, maisons d’architecte et biens de caractère à vendre, proposés par les agences immobilières et réunis sur un seul site. Loftissime accompagne l’acheteur dans la recherche du bien de ses rêves, de la première idée à la visite : recherche, alertes, guide de l’acheteur, simulation de financement et mise en relation avec l’agent chargé de la vente.';

// Aperçu de partage (WhatsApp, SMS, réseaux) : la signature et la promesse du site
const SHARE_TITLE = 'Loftissime · Curateur de biens atypiques';
const SHARE_DESCRIPTION =
  'Lofts, ateliers d’artistes, toits-terrasses, biens de caractère à vendre : un seul site pour les trouver.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  // Nom proposé par l'iPhone quand on ajoute le site à l'écran d'accueil (ouverture dans Safari, comme avant)
  appleWebApp: { title: SITE_NAME, capable: false },
  // Site en phase de test : à retirer le jour de l'ouverture publique pour être référencé
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
  },
};

// Carte d'identité du site, lisible par les moteurs de recherche et les assistants IA
const siteLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organisation`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description: ORG_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'fr-FR',
      description: ORG_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organisation` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${logoFont.variable} ${sansFont.variable} ${serifFont.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd).replace(/</g, '\\u003c') }} />
        {children}
        <BackToTop />
        <SiteFooter />
      </body>
    </html>
  );
}

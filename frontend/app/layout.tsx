import type { Metadata } from 'next';
import { Poppins, DM_Sans, Newsreader } from 'next/font/google';
import SiteFooter from './SiteFooter';
import BackToTop from './BackToTop';
import './globals.css';
import { SITE_URL, SITE_NAME } from '../lib/site';
import { getSiteMode } from '../lib/siteMode';
import { SiteModeProvider } from './SiteMode';

// Police du logo, chargée une fois pour tout le site
const logoFont = Poppins({ subsets: ['latin'], weight: ['600'], variable: '--font-logo', display: 'swap' });
// Police des textes et des libellés
const sansFont = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
// Police des titres
const serifFont = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

// Texte repris par Google, par les assistants IA et par les aperçus de partage
const TITLE = 'Loftissime · Le média de l’immobilier atypique';
const DESCRIPTION =
  'Loftissime est le média de l’immobilier atypique : chaque mois, dans sa newsletter, des experts vous ouvrent les portes d’un bien atypique : la visite, le projet, le prix tout compris. Douze numéros par an, un thème par mois.';

// Présentation plus complète, pour la carte d'identité lue par les moteurs et les assistants IA
const ORG_DESCRIPTION =
  'Loftissime est un média consacré à l’immobilier atypique : lofts, ateliers d’artistes, derniers étages, péniches, biens à rénover. Il édite une newsletter mensuelle, douze numéros par an et un thème par mois, où un bien atypique est visité avec des professionnels (architecte, entrepreneur, courtier, notaire, négociateur), et des articles pour acheter en connaissance de cause. Loftissime n’est pas une agence et ne vend pas les biens.';

// Aperçu de partage (WhatsApp, SMS, réseaux) : la signature et la promesse du site
const SHARE_TITLE = 'Loftissime · Le média de l’immobilier atypique';
const SHARE_DESCRIPTION =
  'Chaque mois dans votre boîte mail, nos experts vous ouvrent les portes d’un bien atypique.';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const mode = await getSiteMode();
  return (
    <html lang="fr" className={`${logoFont.variable} ${sansFont.variable} ${serifFont.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd).replace(/</g, '\\u003c') }} />
        <SiteModeProvider mode={mode}>
          {children}
          <BackToTop />
          <SiteFooter />
        </SiteModeProvider>
      </body>
    </html>
  );
}

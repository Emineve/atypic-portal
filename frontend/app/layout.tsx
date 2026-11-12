import type { Metadata } from 'next';
import { Poppins, Inter, Newsreader } from 'next/font/google';
import './globals.css';
import { SITE_URL, SITE_NAME } from '../lib/site';

// Police du logo, chargée une fois pour tout le site
const logoFont = Poppins({ subsets: ['latin'], weight: ['600'], variable: '--font-logo', display: 'swap' });
// Police des textes et des libellés
const sansFont = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
// Police des titres
const serifFont = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });

// Texte repris par Google, par les assistants IA et par les aperçus de partage
const TITLE = 'Loftissime · Lofts, ateliers et biens atypiques à vendre';
const DESCRIPTION =
  'Loftissime, le premier hub d’annonces immobilières atypiques : lofts, ateliers d’artistes, rooftops et maisons d’architecte à vendre, réunis sur un seul site.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  // Site en phase de test : à retirer le jour de l'ouverture publique pour être référencé
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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
      description: DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#site`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'fr-FR',
      description: DESCRIPTION,
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
      </body>
    </html>
  );
}

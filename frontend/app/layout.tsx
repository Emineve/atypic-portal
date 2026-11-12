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

const TITLE = 'Loftissime · Biens atypiques et singuliers à vendre en France';
const DESCRIPTION =
  "Lofts, ateliers d'artistes, péniches, rooftops et biens de caractère : une sélection de biens atypiques à vendre, issus d'annonces d'agences partout en France.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,  robots: { index: false, follow: false },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${logoFont.variable} ${sansFont.variable} ${serifFont.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

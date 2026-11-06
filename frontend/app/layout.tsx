import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL, SITE_NAME } from '../lib/site';

const TITLE = 'SINGULIER · Biens atypiques et singuliers à vendre en France';
const DESCRIPTION =
  "Lofts, ateliers d'artistes, péniches, rooftops et biens de caractère : une sélection de biens atypiques à vendre, issus d'annonces d'agences partout en France.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
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
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}

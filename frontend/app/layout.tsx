import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SINGULIER | Lieux Singuliers & Architectures Remarquables',
  description: 'Curateur de biens atypiques, lofts, ateliers et péniches en Île-de-France.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}

import AdminNav from './AdminNav';

export const metadata = {
  title: 'Administration · Loftissime',
  // Raccourci du back-office sur l'écran d'accueil : nom et icône jaune (iPhone et Android)
  appleWebApp: { title: 'Loftissime BO', capable: false },
  manifest: '/admin/manifest.webmanifest',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}

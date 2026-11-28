'use client';

import { useEffect, useState } from 'react';
import Contacts from '../Contacts';

// Même clé que la page d'administration : on se connecte d'abord sur /admin
const KEY = 'singulier:admin-token';

export default function AdminContacts() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    try {
      setToken(sessionStorage.getItem(KEY) || '');
    } catch {
      setToken('');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFBF8] text-[#3A2E2A] font-sans">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {token === null ? null : token ? (
          <Contacts token={token} />
        ) : (
          <p className="text-sm text-stone-600">
            Connectez-vous d’abord sur le <a href="/admin" className="underline underline-offset-4">tableau de bord</a>.
          </p>
        )}
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Arrivée depuis la fiche d'un bien : le lien de retour ramène à cette annonce, pas à la liste.
export default function BackLink() {
  const [listing, setListing] = useState('');
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('bien') || '';
    if (/^[0-9a-f-]{36}$/i.test(id)) setListing(id);
  }, []);
  if (!listing) return null;
  return (
    <Link
      href={`/biens/${listing}`}
      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      Retourner à l’annonce
    </Link>
  );
}

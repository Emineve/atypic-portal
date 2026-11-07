'use client';

import { useEffect, useState } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

// Passer à true quand l'envoi d'emails sera en place (domaine + service d'envoi)
const ALERT_EMAILS_LIVE = false;

export interface AlertInitial {
  category?: string;
  priceMax?: string;
  surfaceMin?: string;
}

const BUDGETS: [number, string][] = [
  [500000, '500 k€'],
  [750000, '750 k€'],
  [1000000, '1 M€'],
  [1500000, '1,5 M€'],
  [2000000, '2 M€'],
  [3000000, '3 M€'],
];

const BEDROOMS: [number | null, string][] = [
  [null, 'Peu importe'],
  [1, '1+'],
  [2, '2+'],
  [3, '3+'],
  [4, '4+'],
];

function normalizeLocation(raw: string): string {
  const s = raw.trim().replace(/\s+/g, ' ');
  if (!s) return '';
  const paris = s.match(/^paris\s*0?(\d{1,2})\s*(?:e|er|ème|eme|è)?$/i);
  const bare = s.match(/^0?(\d{1,2})\s*(?:e|er|ème|eme)$/i);
  const m = paris || bare;
  if (m) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 20) return n === 1 ? 'Paris 1er' : `Paris ${n}e`;
  }
  if (/^paris$/i.test(s)) return 'Paris';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function plain(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function toNum(v: string): number | null {
  const n = Number(v.replace(/\s/g, ''));
  return v.trim() !== '' && Number.isFinite(n) && n >= 0 ? n : null;
}

function formatEuro(n: number) {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €';
}

export default function AlertDialog({
  open,
  onClose,
  source,
  suggestions,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  source: string;
  suggestions: string[];
  initial?: AlertInitial;
}) {
  const [locations, setLocations] = useState<string[]>([]);
  const [locInput, setLocInput] = useState('');
  const [surfaceMin, setSurfaceMin] = useState('');
  const [surfaceMax, setSurfaceMax] = useState('');
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [budgetMax, setBudgetMax] = useState('');
  const [topFloor, setTopFloor] = useState(false);
  const [view, setView] = useState(false);
  const [outdoor, setOutdoor] = useState(false);
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // champ piège anti-spam
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  // À chaque ouverture : on repart des critères de la recherche en cours
  useEffect(() => {
    if (!open) return;
    setLocations([]);
    setLocInput('');
    setSurfaceMin(initial?.surfaceMin || '');
    setSurfaceMax('');
    setBedrooms(null);
    setBudgetMax(initial?.priceMax || '');
    setTopFloor(false);
    setView(false);
    setOutdoor(false);
    setCategory(initial?.category || '');
    setStatus('idle');
    //

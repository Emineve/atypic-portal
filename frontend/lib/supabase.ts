import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

function cleanUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  // Retire espaces, retours à la ligne et guillemets collés par erreur
  const value = raw.trim().replace(/^["']+|["']+$/g, '');
  try {
    const parsed = new URL(value);
    const validProtocol = parsed.protocol === 'https:' || parsed.protocol === 'http:';
    const validHost = parsed.hostname.includes('.') || parsed.hostname === 'localhost';
    return validProtocol && validHost ? value : null;
  } catch {
    return null;
  }
}

/**
 * Le client n'est créé qu'au premier appel, jamais à l'import du module.
 * Le build Next.js (pré-rendu) ne déclenche donc plus aucune initialisation Supabase.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().replace(/^["']+|["']+$/g, '');

  if (!url || !key) {
    throw new Error(
      'Configuration Supabase invalide : vérifiez NEXT_PUBLIC_SUPABASE_URL (https://xxxx.supabase.co) et NEXT_PUBLIC_SUPABASE_ANON_KEY dans Vercel.'
    );
  }

  client = createClient(url, key);
  return client;
}

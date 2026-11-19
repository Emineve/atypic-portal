import { getSupabase } from '../lib/supabase';
import FooterLinks from './FooterLinks';
import FooterGate from './FooterGate';

// Pied de page commun à toutes les pages publiques (l'accueil garde le sien, plus complet).
export default async function SiteFooter() {
  let cities: string[] = [];
  try {
    const { data } = await getSupabase().from('listings').select('city').eq('is_active', true);
    cities = (data || []).map((r) => r.city as string).filter(Boolean);
  } catch {
    cities = [];
  }
  return (
    <FooterGate>
      <footer className="border-t border-stone-200 bg-white">
        <FooterLinks cities={cities} />
      </footer>
    </FooterGate>
  );
}

import ThemeVue from './ThemeVue';
import { getIssues } from '../../lib/lettre';
import { NEWSLETTERS } from '../../lib/newsletters';

export const revalidate = 60;

export const metadata = {
  title: 'La newsletter de Loftissime',
  description: 'La newsletter de Loftissime : douze numéros par an, un thème par mois. À chaque fois un bien atypique visité, ce qu’on peut en faire et ce qu’il coûte vraiment.',
};

// La page du prochain numéro : le thème du mois à venir, puis les numéros déjà parus.
export default async function LettreIndex() {
  const parus = (await getIssues()).filter((l) => l.paru);
  const prochain = (parus[0]?.numero || 0) + 1;
  // le numéro 1 est celui de janvier, le 2 celui de février, et ainsi de suite
  const theme = NEWSLETTERS[(prochain - 1) % NEWSLETTERS.length];
  return <ThemeVue theme={theme} parus={parus} source="numeros" />;
}

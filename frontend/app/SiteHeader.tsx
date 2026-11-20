import type { ComponentProps } from 'react';
import SiteHeaderClient from './SiteHeaderClient';
import { articlesCount } from '../lib/guide';

// En-tête commun aux pages intérieures. Le nombre d'articles récents est calculé ici, côté serveur,
// pour ne pas charger tous les articles dans le navigateur.
export default function SiteHeader(props: Omit<ComponentProps<typeof SiteHeaderClient>, 'newArticles'>) {
  return <SiteHeaderClient {...props} newArticles={articlesCount()} />;
}

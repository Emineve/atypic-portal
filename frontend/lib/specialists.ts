// « Contre-visite » : de courtes vidéos, une question par vidéo, par des professionnels nommés.
// Rien ne s'affiche tant que cette liste est vide. On n'y ajoute une vidéo qu'avec l'accord écrit
// du spécialiste, et la transcription reprend ses propres mots : on ne lui prête aucun propos.
export interface SpecialistVideo {
  id: string; // identifiant court, sert d'ancre
  question: string; // la question posée, affichée en titre
  name: string; // prénom et nom
  role: string; // métier
  company?: string; // société ou étude
  youtubeId: string; // identifiant de la vidéo YouTube (format vertical)
  transcript: string[]; // la réponse, mot pour mot, en paragraphes
  published: string; // AAAA-MM-JJ
  articles: string[]; // adresses des articles où la vidéo apparaît en encadré
  disclosure?: string; // lien éventuel entre le spécialiste et Loftissime, dit clairement
}

export const SPECIALIST_VIDEOS: SpecialistVideo[] = [];

export function publishedVideos(now: Date = new Date()): SpecialistVideo[] {
  const today = now.toISOString().slice(0, 10);
  return SPECIALIST_VIDEOS.filter((v) => v.published <= today).sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function videosForArticle(slug: string): SpecialistVideo[] {
  return publishedVideos().filter((v) => v.articles.includes(slug));
}

// Typographie française : une espace insécable avant ? ! : ; » et après «, pour qu'un signe
// ne se retrouve jamais seul en début de ligne sur un petit écran.
export function typo(text: string): string {
  return text.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');
}

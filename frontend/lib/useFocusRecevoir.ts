import { useEffect, type RefObject } from 'react';

// Quand on arrive sur la carte d'inscription par un lien « Recevoir la newsletter » (…#recevoir),
// le curseur se place dans le champ e-mail : il n'y a plus qu'à écrire.
export function useFocusRecevoir(ref: RefObject<HTMLInputElement>) {
  useEffect(() => {
    const viser = () => {
      if (window.location.hash !== '#recevoir') return;
      // on laisse la page finir de défiler jusqu'à la carte
      window.setTimeout(() => ref.current?.focus({ preventScroll: true }), 350);
    };
    const clic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href$="#recevoir"]');
      if (a) window.setTimeout(viser, 50);
    };
    viser();
    window.addEventListener('hashchange', viser);
    document.addEventListener('click', clic);
    return () => {
      window.removeEventListener('hashchange', viser);
      document.removeEventListener('click', clic);
    };
  }, [ref]);
}

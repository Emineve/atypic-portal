'use client';

// « Retour à la liste » : on revient là où l'on s'était arrêté. Si la page précédente est la liste,
// le navigateur revient en arrière ; sinon l'accueil s'ouvre, et se replace sur ce bien.
export const RETURN_KEY = 'loftissime:retour';

export default function BackLink({ id }: { id: string }) {
  return (
    <a
      href="/"
      onClick={(e) => {
        try {
          // Retour arrière seulement si la page précédente est bien la liste ; sinon on ouvre l'accueil,
          // qui se replace sur ce bien (la fiche a pu être ouverte depuis le financement, un article…)
          let fromList = false;
          try {
            const ref = new URL(document.referrer);
            fromList = ref.origin === window.location.origin && ref.pathname === '/';
          } catch {
            fromList = false;
          }
          sessionStorage.setItem(RETURN_KEY, id);
          if (fromList && window.history.length > 1) {
            e.preventDefault();
            window.history.back();
          }
        } catch {
          /* stockage indisponible : le lien ouvre simplement l'accueil */
        }
      }}
      className="text-sm font-medium text-stone-900 underline underline-offset-4 decoration-stone-300"
    >
      ← Retour à la liste
    </a>
  );
}

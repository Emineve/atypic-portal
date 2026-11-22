'use client';

// « Retour à la liste » : on revient là où l'on s'était arrêté. Si l'on vient de la liste (même onglet),
// le navigateur revient en arrière ; sinon l'accueil s'ouvre, et se replace sur ce bien.
export const RETURN_KEY = 'loftissime:retour';

export default function BackLink({ id }: { id: string }) {
  return (
    <a
      href="/"
      onClick={(e) => {
        try {
          const fromList = sessionStorage.getItem(RETURN_KEY) === id;
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

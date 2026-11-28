'use client';

// Le bilan s'imprime ou s'enregistre en PDF depuis la fenêtre d'impression du navigateur
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center rounded-full bg-stone-900 px-6 text-[15px] font-medium text-[#FCFBF8] transition hover:bg-stone-800 print:hidden"
    >
      Imprimer ou enregistrer en PDF
    </button>
  );
}

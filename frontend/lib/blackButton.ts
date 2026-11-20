// Règle du site : jamais deux boutons noirs à l'écran en même temps.
// Les boutons flottants s'effacent dès qu'un bouton noir de la page est visible.
export function blackButtonOnScreen(): boolean {
  if (typeof document === 'undefined') return false;
  const els = document.querySelectorAll<HTMLElement>('[data-alert-cta], a.bg-stone-900, button.bg-stone-900');
  for (const el of Array.from(els)) {
    if (el.closest('[data-fab], header, [role="dialog"]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 60 || r.height < 24) continue; // pastilles et petits repères
    if (r.top < window.innerHeight && r.bottom > 0) return true;
  }
  return false;
}

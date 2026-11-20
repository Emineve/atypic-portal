// « Proposé par l'agence Barnes Paris Trocadéro » ; si le nom commence déjà par « Agence », on ne le répète pas.
export function agencyLine(name?: string | null): string {
  const n = (name || '').trim();
  if (!n) return '';
  return /^agences?\b/i.test(n) ? `Proposé par ${n}` : `Proposé par l’agence ${n}`;
}

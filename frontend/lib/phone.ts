// Numéro de téléphone espacé à la saisie, pour rester lisible : « 06 12 34 56 78 », « +33 6 12 34 56 78 ».
export function formatPhone(value: string): string {
  const plus = value.trim().startsWith('+');
  const digits = value.replace(/\D/g, '').slice(0, 15);
  const pairs = (s: string) => s.replace(/(\d{2})(?=\d)/g, '$1 ');
  if (!plus) return pairs(digits);
  // International : indicatif à deux chiffres, puis le premier chiffre seul, puis par deux (+33 6 12 34 56 78)
  if (digits.length <= 2) return `+${digits}`;
  const rest = digits.slice(2);
  return `+${digits.slice(0, 2)} ${rest[0]}${rest.length > 1 ? ' ' + pairs(rest.slice(1)) : ''}`;
}

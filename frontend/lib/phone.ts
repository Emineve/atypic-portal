// Numéro de téléphone espacé à la saisie, pour rester lisible : « 06 12 34 56 78 », « +33 6 12 34 56 78 ».
export function formatPhone(value: string): string {
  let raw = value.trim();
  // Numéro français saisi ou prérempli avec l'indicatif (+33 6…, 0033 6…) ou sans le 0 du début : ramené à « 06 … »
  const all = raw.replace(/\D/g, '');
  if (raw.startsWith('+33')) raw = '0' + all.slice(2);
  else if (all.startsWith('0033')) raw = '0' + all.slice(4);
  else if (!raw.startsWith('+') && /^[1-9]/.test(all)) raw = '0' + all;
  raw = raw.replace(/^00+(?=\d)/, '0');
  const plus = raw.startsWith('+');
  const digits = raw.replace(/\D/g, '').slice(0, plus ? 15 : 10); // dix chiffres pour un numéro français, quinze avec un indicatif
  const pairs = (s: string) => s.replace(/(\d{2})(?=\d)/g, '$1 ');
  if (!plus) return pairs(digits);
  // International : indicatif à deux chiffres, puis le premier chiffre seul, puis par deux (+33 6 12 34 56 78)
  if (digits.length <= 2) return `+${digits}`;
  const rest = digits.slice(2);
  return `+${digits.slice(0, 2)} ${rest[0]}${rest.length > 1 ? ' ' + pairs(rest.slice(1)) : ''}`;
}

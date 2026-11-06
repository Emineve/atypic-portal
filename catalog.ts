export const CATEGORY_LIST = [
  "Loft & Atelier",
  "Atelier d'artiste",
  "Péniche",
  "Rooftop & Vue",
  "Biens de caractère",
];

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

import { ImageResponse } from 'next/og';

// Vignette de partage (WhatsApp, SMS, réseaux) : une seule règle pour tout le site.
// Le logo, la signature, puis le titre de la page. Rien d'autre.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = 'image/png';
export const OG_SIGNATURE = 'Curateur de biens atypiques';

// Polices chargées chez Google : une seule fois par police, avec plusieurs essais en cas de coupure réseau
const fontCache = new Map<string, Promise<ArrayBuffer>>();

async function fetchRetry(url: string, tries = 4): Promise<Response> {
  let last: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) return res;
      last = new Error(`Réponse ${res.status}`);
    } catch (e) {
      last = e;
    }
    await new Promise((r) => setTimeout(r, 400 * (i + 1)));
  }
  throw last;
}

function loadFont(family: string, axes: string): Promise<ArrayBuffer> {
  const key = `${family}:${axes}`;
  let font = fontCache.get(key);
  if (!font) {
    font = (async () => {
      const css = await (await fetchRetry(`https://fonts.googleapis.com/css2?family=${key}`)).text();
      const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
      if (!match) throw new Error(`Police introuvable : ${family}`);
      return (await fetchRetry(match[1])).arrayBuffer();
    })();
    font.catch(() => fontCache.delete(key));
    fontCache.set(key, font);
  }
  return font;
}

function Words({ text, italic }: { text: string; italic?: boolean }) {
  return (
    <>
      {text.split(/\s+/).filter(Boolean).map((word, i) => (
        <span
          key={`${italic ? 'i' : 'r'}${i}`}
          style={{
            marginRight: 17,
            fontStyle: italic ? 'italic' : 'normal',
            color: italic ? '#78716c' : '#1c1917',
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

// title : début du titre (noir) ; accent : fin du titre, en italique gris, comme sur les pages du site
export async function shareImage(title: string, accent = '') {
  const full = `${title} ${accent}`;
  const [logo, sans, serif, serifItalic] = await Promise.all([
    loadFont('Poppins', 'wght@600'),
    loadFont('DM+Sans', 'wght@400'),
    loadFont('Newsreader', 'opsz,wght@72,400'),
    loadFont('Newsreader', 'ital,opsz,wght@1,72,400'),
  ]);
  // Un titre long passe dans une taille en dessous pour tenir sur trois lignes au plus
  const long = full.length > 62;
  const size = long ? 58 : 70;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#FDFBF7',
          paddingLeft: 92,
          paddingRight: 92,
        }}
      >
        <div style={{ display: 'flex', fontFamily: 'Poppins', fontWeight: 600, fontSize: 62, lineHeight: 1, letterSpacing: '-0.025em', color: '#1c1917' }}>
          loftissime.
        </div>
        <div style={{ display: 'flex', marginTop: 18, fontFamily: 'DM Sans', fontSize: 24, lineHeight: 1, color: '#78716c' }}>
          {OG_SIGNATURE}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: 1016,
            marginTop: 62,
            fontFamily: 'Newsreader',
            fontSize: size,
            lineHeight: long ? '68px' : '80px',
            letterSpacing: '-0.01em',
          }}
        >
          <Words text={title} />
          {accent ? <Words text={accent} italic /> : null}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Poppins', data: logo, weight: 600, style: 'normal' },
        { name: 'DM Sans', data: sans, weight: 400, style: 'normal' },
        { name: 'Newsreader', data: serif, weight: 400, style: 'normal' },
        { name: 'Newsreader', data: serifItalic, weight: 400, style: 'italic' },
      ],
    },
  );
}

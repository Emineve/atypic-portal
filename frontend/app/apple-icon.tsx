import { ImageResponse } from 'next/og';

// Icône affichée par l'iPhone quand le site est ajouté à l'écran d'accueil.
// Même dessin que le favicon (« l. » blanc sur fond noir), en plein carré :
// c'est iOS qui arrondit les angles.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#18181b' }}>
        <div style={{ position: 'absolute', left: 56, top: 37, width: 27, height: 107, background: '#ffffff' }} />
        <div style={{ position: 'absolute', left: 96, top: 111, width: 33, height: 33, borderRadius: 33, background: '#ffffff' }} />
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from 'next/og';

export const alt = 'Loftissime · Biens atypiques et singuliers à vendre en France';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FDFBF7',
          color: '#191919',
        }}
      >
        <div style={{ fontSize: 96, letterSpacing: 18, fontWeight: 700 }}>LOFTISSIME</div>
        <div style={{ marginTop: 28, fontSize: 34, color: '#57534e' }}>
          Biens atypiques et singuliers à vendre en France
        </div>
        <div style={{ marginTop: 18, fontSize: 24, letterSpacing: 6, color: '#a8a29e' }}>
          LOFTS · ATELIERS · PÉNICHES · ROOFTOPS
        </div>
      </div>
    ),
    { ...size }
  );
}

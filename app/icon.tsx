import { ImageResponse } from 'next/og'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Stars */}
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '6px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '1px',
            height: '1px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '6px',
            left: '10px',
            width: '1px',
            height: '1px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        
        {/* Main icon - stylized "N" */}
        <div
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            letterSpacing: '-1px',
          }}
        >
          N
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 
import { ImageResponse } from 'next/og'

export const alt = 'Nate Atkins - Artist Portfolio'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
          position: 'relative',
        }}
      >
        {/* Stars background */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '100px',
            width: '4px',
            height: '4px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '150px',
            right: '150px',
            width: '3px',
            height: '3px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '200px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '200px',
            left: '300px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '200px',
            right: '250px',
            width: '3px',
            height: '3px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              letterSpacing: '-2px',
              margin: '0',
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
            }}
          >
            NATE ATKINS
          </h1>
          <p
            style={{
              fontSize: '32px',
              margin: '20px 0',
              color: '#94a3b8',
              fontWeight: '300',
            }}
          >
            Artist Portfolio
          </p>
          <p
            style={{
              fontSize: '24px',
              margin: '10px 0',
              color: '#64748b',
              fontWeight: '300',
            }}
          >
            Currently on Earth • Excited to explore the stars
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 
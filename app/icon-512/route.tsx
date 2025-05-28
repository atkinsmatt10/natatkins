import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
          borderRadius: '50px',
        }}
      >
        {/* More stars for the larger icon */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '90px',
            width: '8px',
            height: '8px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '120px',
            right: '80px',
            width: '6px',
            height: '6px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '90px',
            left: '110px',
            width: '6px',
            height: '6px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '180px',
            left: '160px',
            width: '4px',
            height: '4px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '150px',
            right: '120px',
            width: '6px',
            height: '6px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '320px',
            left: '200px',
            width: '5px',
            height: '5px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        
        {/* Main icon - stylized "N" */}
        <div
          style={{
            fontSize: '220px',
            fontWeight: 'bold',
            letterSpacing: '-10px',
            textShadow: '0 0 30px rgba(255,255,255,0.3)',
          }}
        >
          N
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  )
} 
import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
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
          borderRadius: '20px',
        }}
      >
        {/* Stars scattered across the icon */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '30px',
            width: '3px',
            height: '3px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '25px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '40px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '50px',
            width: '1px',
            height: '1px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            right: '40px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        
        {/* Main icon - stylized "N" */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            letterSpacing: '-4px',
            textShadow: '0 0 10px rgba(255,255,255,0.3)',
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
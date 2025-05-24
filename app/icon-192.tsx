import { ImageResponse } from 'next/og'

export const size = {
  width: 192,
  height: 192,
}

export const contentType = 'image/png'

export default function Icon192() {
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
            top: '25px',
            left: '35px',
            width: '4px',
            height: '4px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '45px',
            right: '30px',
            width: '3px',
            height: '3px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '35px',
            left: '45px',
            width: '3px',
            height: '3px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '60px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '50px',
            width: '3px',
            height: '3px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        
        {/* Main icon - stylized "N" */}
        <div
          style={{
            fontSize: '85px',
            fontWeight: 'bold',
            letterSpacing: '-4px',
            textShadow: '0 0 15px rgba(255,255,255,0.3)',
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
import { ImageResponse } from 'next/og'

export const alt = "Nate Atkins's corner of the internet"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

export default async function Image() {
  const text = 'NATE ATKINS'
  
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
        {/* Stars background - More stars scattered */}
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
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '400px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '120px',
            left: '500px',
            width: '1px',
            height: '1px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '150px',
            left: '80px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '250px',
            right: '100px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '250px',
            left: '400px',
            width: '1px',
            height: '1px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '320px',
            left: '150px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '400px',
            right: '350px',
            width: '1px',
            height: '1px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '180px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '180px',
            right: '50px',
            width: '1px',
            height: '1px',
            background: 'white',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '350px',
            right: '80px',
            width: '2px',
            height: '2px',
            background: 'white',
            borderRadius: '50%',
          }}
        />

        {/* Shooting star trails */}
        <div
          style={{
            position: 'absolute',
            top: '120px',
            left: '200px',
            width: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.2) 100%)',
            transform: 'rotate(-25deg)',
            borderRadius: '1px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '118px',
            left: '202px',
            width: '4px',
            height: '4px',
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
            borderRadius: '50%',
            transform: 'rotate(-25deg)',
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '180px',
            right: '150px',
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 100%)',
            transform: 'rotate(35deg)',
            borderRadius: '1px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '179px',
            right: '152px',
            width: '3px',
            height: '3px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
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
              fontFamily: 'Orbitron, system-ui, -apple-system, sans-serif',
            }}
          >
            {text}
          </h1>
          <p
            style={{
              fontSize: '28px',
              margin: '20px 0',
              color: '#94a3b8',
              fontWeight: '300',
            }}
          >
            corner of the internet
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
      fonts: [
        {
          name: 'Orbitron',
          data: await loadGoogleFont('Orbitron', text),
          style: 'normal',
        },
      ],
    }
  )
} 
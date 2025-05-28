import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nate Atkins's corner of the internet",
    short_name: 'Nate Atkins',
    description: "Nate Atkins's corner of the internet - Currently on Earth, excited to explore the stars.",
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#1a1a2e',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    categories: ['art', 'design', 'portfolio'],
    lang: 'en',
    dir: 'ltr',
    screenshots: [
      {
        src: '/opengraph-image',
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide'
      }
    ]
  }
} 
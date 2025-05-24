import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nate Atkins's corner of the internet",
    short_name: 'Nate Atkins',
    description: "Nate Atkins's corner of the internet - Currently on Earth, excited to explore the stars. Digital art, space-themed creations, and futuristic designs.",
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#1a1a2e',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/apple-icon-180.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    categories: ['art', 'design', 'portfolio'],
    lang: 'en',
    dir: 'ltr',
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '414x736',
        type: 'image/png',
        form_factor: 'narrow'
      }
    ]
  }
} 
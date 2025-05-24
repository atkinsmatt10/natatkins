import "@/styles/globals.css"
import { Inter, Orbitron } from "next/font/google"
import { Analytics } from '@vercel/analytics/next'
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
  title: {
    default: 'Nate Atkins - Artist Portfolio',
    template: '%s | Nate Atkins'
  },
  description: 'Artist portfolio of Nate Atkins - Currently on Earth, excited to explore the stars. Digital art, space-themed creations, and futuristic designs.',
  keywords: ['artist', 'portfolio', 'digital art', 'space art', 'futuristic design', 'Nate Atkins'],
  authors: [{ name: 'Nate Atkins' }],
  creator: 'Nate Atkins',
  publisher: 'Nate Atkins',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nateatkins.com',
    title: 'Nate Atkins - Artist Portfolio',
    description: 'Artist portfolio of Nate Atkins - Currently on Earth, excited to explore the stars. Digital art, space-themed creations, and futuristic designs.',
    siteName: 'Nate Atkins Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nate Atkins - Artist Portfolio',
    description: 'Artist portfolio of Nate Atkins - Currently on Earth, excited to explore the stars.',
    creator: '@nateatkins',
  },
  verification: {
    google: 'verification_token',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

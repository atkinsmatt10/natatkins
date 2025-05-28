import "@/styles/globals.css"
import { Inter, Orbitron } from "next/font/google"
import { Analytics } from '@vercel/analytics/next'
import { ServiceWorkerRegistration, PWAInstaller } from './components/pwa-components'
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
        <ServiceWorkerRegistration />
        {children}
        <PWAInstaller />
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
  title: {
    default: "Nate Atkins's corner of the internet",
    template: '%s | Nate Atkins'
  },
  description: "Nate Atkins's corner of the internet - Currently on Earth, excited to explore the stars. Digital art, space-themed creations, and futuristic designs.",
  keywords: ['nate atkins', 'digital art', 'space art', 'futuristic design', 'creative corner', 'internet corner'],
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
    title: "Nate Atkins's corner of the internet",
    description: "Nate Atkins's corner of the internet - Currently on Earth, excited to explore the stars.",
    siteName: "Nate Atkins's corner of the internet",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nate Atkins's corner of the internet",
    description: "Nate Atkins's corner of the internet - Currently on Earth, excited to explore the stars.",
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

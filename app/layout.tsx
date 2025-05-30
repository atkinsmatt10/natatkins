import "@/styles/globals.css"
import { Inter, Orbitron } from "next/font/google"
import { Analytics } from '@vercel/analytics/next'
import { ServiceWorkerRegistration } from './components/pwa-components'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({ subsets: ["latin"] })

// Custom space-themed text for Clerk components
const spaceClerkLocalization = {
  signUp: {
    start: {
      title: "Join the Nate Atkins Fan Club",
      subtitle: "Ready to travel with me to space? 🚀",
      actionText: "Already a fan?",
      actionLink: "Sign in",
    },
  },
  signIn: {
    start: {
      title: "Welcome Back, Space Traveler",
      subtitle: "Continue your cosmic journey with Nate Atkins",
      actionText: "Not a fan yet?",
      actionLink: "Join the fan club",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={spaceClerkLocalization}>
      <html lang="en">
        <body className={inter.className}>
          <ServiceWorkerRegistration />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
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

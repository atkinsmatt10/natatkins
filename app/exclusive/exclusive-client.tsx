"use client"

import { motion } from 'framer-motion'

interface ExclusiveClientProps {
  userId: string | null
  hasPremiumAccess: boolean
  hasBasicAccess: boolean
  hasAnyPlan: boolean
}

export default function ExclusiveClient({ 
  userId, 
  hasPremiumAccess, 
  hasBasicAccess, 
  hasAnyPlan 
}: ExclusiveClientProps) {
  // If user is not signed in
  if (!userId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <div className="text-3xl font-bold text-black">N</div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Mission Access Required</h1>
          <p className="text-gray-400 mb-6">
            This exclusive content is only available to Fan Club members.
          </p>
          <div className="space-y-3">
            <a 
              href="/pricing" 
              className="block w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Join the Fan Club
            </a>
            <a 
              href="/" 
              className="block w-full text-gray-400 hover:text-white transition-colors"
            >
              Back to Mission Control
            </a>
          </div>
        </div>
      </div>
    )
  }

  // If user is signed in but has no subscription
  if (!hasAnyPlan) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-900 to-red-950 flex items-center justify-center">
            <div className="text-3xl">🚫</div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Upgrade Your Mission</h1>
          <p className="text-gray-400 mb-6">
            This exclusive content requires a Fan Club subscription to access.
          </p>
          <div className="space-y-3">
            <a 
              href="/pricing" 
              className="block w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Upgrade to Access
            </a>
            <a 
              href="/" 
              className="block w-full text-gray-400 hover:text-white transition-colors"
            >
              Back to Mission Control
            </a>
          </div>
        </div>
      </div>
    )
  }

  // User has access - show exclusive content
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
          >
            <span>←</span>
            <span>Back to Mission Control</span>
          </a>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
              <div className="text-2xl">🚀</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              EXCLUSIVE MISSION
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-4">
            Welcome to the inner circle, space traveler!
          </p>
          
          <div className="inline-block bg-gradient-to-r from-green-500/20 to-blue-500/20 px-4 py-2 rounded-full border border-green-500/30">
            <span className="text-green-400 text-sm font-semibold">
              {hasPremiumAccess ? '✦ PREMIUM MEMBER' : '⭐ BASIC MEMBER'}
            </span>
          </div>
        </motion.div>

        {/* Exclusive Content */}
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Basic Content */}
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-white">🌟 Behind the Scenes</h2>
            <p className="text-gray-300 mb-4">
              As a Fan Club member, you get exclusive access to behind-the-scenes content, 
              early previews of upcoming projects, and insights into my creative process.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li>• Weekly development updates</li>
              <li>• Process videos and tutorials</li>
              <li>• Community discussions</li>
              <li>• Early access to new features</li>
            </ul>
          </div>

          {/* Premium-only Content */}
          {hasPremiumAccess && (
            <motion.div
              className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-300">✦ Premium Mission Briefing</h2>
              <p className="text-gray-300 mb-4">
                As a Premium member, you have access to the most exclusive content and 
                direct communication channels with mission control.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• Direct messaging access</li>
                <li>• Premium-only live streams</li>
                <li>• Custom project requests</li>
                <li>• First access to limited releases</li>
                <li>• Quarterly one-on-one sessions</li>
              </ul>
            </motion.div>
          )}

          {/* Upgrade CTA for Basic users */}
          {hasBasicAccess && !hasPremiumAccess && (
            <motion.div
              className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4 text-blue-300">Ready for the Next Level?</h3>
              <p className="text-gray-400 mb-6">
                Upgrade to Premium for even more exclusive access and direct mission communication.
              </p>
              <a 
                href="/pricing" 
                className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Upgrade to Premium
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 
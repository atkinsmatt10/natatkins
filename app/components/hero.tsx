"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useUser, useAuth, SignUpButton, UserButton } from "@clerk/nextjs"

// Custom Clerk appearance for space-themed sign-in/up
const spaceClerkAppearance = {
  layout: {
    logoPlacement: 'inside' as const,
    showOptionalFields: true,
  },
  variables: {
    colorPrimary: '#4f46e5',
    colorBackground: '#000000',
    colorInputBackground: 'rgba(30, 30, 50, 0.8)',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#a1a1aa',
    colorNeutral: '#27272a',
    colorDanger: '#ef4444',
    colorSuccess: '#22c55e',
    borderRadius: '12px',
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
  },
  elements: {
    // Main container styling
    card: {
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      border: '1px solid rgba(75, 85, 99, 0.3)',
      borderRadius: '16px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(79, 70, 229, 0.2)',
    },
    
    // Header with custom branding
    headerTitle: {
      color: '#ffffff',
      fontSize: '24px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '8px',
    },
    
    headerSubtitle: {
      color: '#a1a1aa',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '24px',
    },
    
    // Form elements
    formButtonPrimary: {
      backgroundColor: '#4f46e5',
      borderRadius: '8px',
      border: 'none',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#4338ca',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
      },
    },
    
    // Input fields
    formFieldInput: {
      backgroundColor: 'rgba(30, 30, 50, 0.8)',
      border: '1px solid rgba(75, 85, 99, 0.3)',
      borderRadius: '8px',
      color: '#ffffff',
      padding: '12px 16px',
      fontSize: '14px',
      '&:focus': {
        borderColor: '#4f46e5',
        boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
      },
      '&::placeholder': {
        color: '#6b7280',
      },
    },
    
    // Labels
    formFieldLabel: {
      color: '#d1d5db',
      fontSize: '13px',
      fontWeight: '500',
      marginBottom: '6px',
    },
    
    // Social buttons
    socialButtonsBlockButton: {
      backgroundColor: 'rgba(30, 30, 50, 0.6)',
      border: '1px solid rgba(75, 85, 99, 0.3)',
      borderRadius: '8px',
      color: '#ffffff',
      padding: '12px 16px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(30, 30, 50, 0.8)',
        borderColor: '#4f46e5',
      },
    },
    
    // Footer links
    footerActionLink: {
      color: '#4f46e5',
      fontSize: '14px',
      fontWeight: '500',
      '&:hover': {
        color: '#6366f1',
      },
    },
    
    // Logo container
    logoBox: {
      height: '60px',
      width: '60px',
      margin: '0 auto 16px auto',
    },
    
    // Loading spinner
    spinner: {
      color: '#4f46e5',
      width: '20px',
      height: '20px',
    },
  },
  
  // Custom logo component
  logoImageUrl: '/icon-192',
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [timeElapsed, setTimeElapsed] = useState("00:00:00:00")
  const [isMounted, setIsMounted] = useState(false)
  const { isSignedIn, isLoaded, user } = useUser()
  const { userId } = useAuth()

  useEffect(() => {
    const startDate = new Date("May 2, 2025 14:30:00").getTime()

    const updateCounter = () => {
      const now = new Date().getTime()
      const elapsed = Math.max(0, now - startDate) // Ensure we don't get negative values

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(elapsed / (1000 * 60 * 60 * 24))
      const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((elapsed % (1000 * 60)) / 1000)

      // Format with leading zeros
      const formattedDays = String(days).padStart(2, "0")
      const formattedHours = String(hours).padStart(2, "0")
      const formattedMinutes = String(minutes).padStart(2, "0")
      const formattedSeconds = String(seconds).padStart(2, "0")

      setTimeElapsed(`${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`)
    }

    // Update immediately and then every second
    updateCounter()
    const interval = setInterval(updateCounter, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      trail: { x: number; y: number }[]
      hasTrail: boolean
      maxTrailLength: number
      trailActive: boolean
      trailTimer: number
      trailDuration: number
      trailCooldown: number
      trailFading: boolean
      fadeOutDuration: number
      fadeOutTimer: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.trail = []
        // Only about 20% of particles will have trails (shooting stars)
        this.hasTrail = Math.random() < 0.2
        this.maxTrailLength = this.hasTrail ? Math.floor(Math.random() * 15) + 10 : 0
        
        // Trail timing properties
        this.trailActive = false
        this.trailTimer = 0
        this.trailDuration = Math.random() * 120 + 60 // Trail active for 1-3 seconds
        this.trailCooldown = Math.random() * 300 + 180 // Wait 3-8 seconds before next trail
        this.trailFading = false
        this.fadeOutDuration = 60 // 1 second fade out
        this.fadeOutTimer = 0
        
        // Make shooting stars faster and larger when active
        if (this.hasTrail) {
          this.size = Math.random() * 1.5 + 1
        }
      }

      update() {
        // Handle trail timing for particles that can have trails
        if (this.hasTrail) {
          if (!this.trailActive && !this.trailFading && this.trailTimer >= this.trailCooldown) {
            // Start trail
            this.trailActive = true
            this.trailTimer = 0
            this.trail = []
            // Speed up when trail becomes active
            this.speedX *= 2.5
            this.speedY *= 2.5
          } else if (this.trailActive && this.trailTimer >= this.trailDuration) {
            // Start fade out
            this.trailActive = false
            this.trailFading = true
            this.fadeOutTimer = 0
            // Slow down when trail starts fading
            this.speedX /= 2.5
            this.speedY /= 2.5
          } else if (this.trailFading && this.fadeOutTimer >= this.fadeOutDuration) {
            // Complete fade out
            this.trailFading = false
            this.trailTimer = 0
            this.trail = []
            // Set new random cooldown
            this.trailCooldown = Math.random() * 300 + 180
          }
          
          // Increment appropriate timer
          if (this.trailActive) {
            this.trailTimer++
          } else if (this.trailFading) {
            this.fadeOutTimer++
          } else {
            this.trailTimer++
          }
        }

        // Add current position to trail if this particle has an active trail
        if (this.hasTrail && this.trailActive) {
          this.trail.push({ x: this.x, y: this.y })
          if (this.trail.length > this.maxTrailLength) {
            this.trail.shift()
          }
        } else if (this.hasTrail && this.trailFading) {
          // During fade out, gradually shorten trail
          const fadeProgress = this.fadeOutTimer / this.fadeOutDuration
          const targetLength = Math.floor(this.trail.length * (1 - fadeProgress))
          while (this.trail.length > targetLength && this.trail.length > 0) {
            this.trail.shift()
          }
        }

        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) {
          this.x = 0
          this.trail = [] // Reset trail when wrapping
        }
        if (this.x < 0) {
          this.x = canvas.width
          this.trail = []
        }
        if (this.y > canvas.height) {
          this.y = 0
          this.trail = []
        }
        if (this.y < 0) {
          this.y = canvas.height
          this.trail = []
        }
      }

      draw() {
        if (!ctx) return
        
        // Draw trail if this particle has an active or fading trail
        if (this.hasTrail && (this.trailActive || this.trailFading) && this.trail.length > 1) {
          // Calculate fade multiplier for fading trails
          let fadeMultiplier = 1
          if (this.trailFading) {
            fadeMultiplier = 1 - (this.fadeOutTimer / this.fadeOutDuration)
          }
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * fadeMultiplier})`
          ctx.lineWidth = this.size * 0.5
          ctx.lineCap = "round"
          
          for (let i = 1; i < this.trail.length; i++) {
            const alpha = (i / this.trail.length * 0.6) * fadeMultiplier // Fade trail with overall fade
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = (this.size * 0.5) * (i / this.trail.length)
            
            ctx.beginPath()
            ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y)
            ctx.lineTo(this.trail[i].x, this.trail[i].y)
            ctx.stroke()
          }
        }
        
        // Draw the particle itself
        let particleAlpha = 0.5 // Default dim
        if (this.hasTrail && this.trailActive) {
          particleAlpha = 1 // Bright when active
        } else if (this.hasTrail && this.trailFading) {
          // Fade from bright to dim during fade out
          const fadeProgress = this.fadeOutTimer / this.fadeOutDuration
          particleAlpha = 1 - (fadeProgress * 0.5) // Fade from 1 to 0.5
        }
        
        ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add a slight glow for active and fading shooting stars
        if (this.hasTrail && (this.trailActive || this.trailFading)) {
          let glowAlpha = 0.8
          if (this.trailFading) {
            glowAlpha *= (1 - (this.fadeOutTimer / this.fadeOutDuration))
          }
          
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(255, 255, 255, ${glowAlpha})`
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * (glowAlpha / 0.8)})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Safe check for any sign of authentication
  const hasAnyUserSession = isSignedIn || userId || user

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
      
      {/* Realistic Moon-styled Fan Club Button - Top Right */}
      {isMounted && isLoaded && (
        <>
          {!hasAnyUserSession && (
            <motion.div
              className="absolute top-6 right-6 z-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            >
              <SignUpButton 
                mode="modal"
                appearance={spaceClerkAppearance}
              >
                <button 
                  className="group relative w-16 h-16 rounded-full transition-all duration-700 transform hover:scale-105"
                  title="Join my fan club"
                >
                  {/* Main Moon Surface - Realistic lunar colors */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 via-gray-350 to-gray-400 shadow-lg">
                    {/* Realistic shadows and highlights */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-gray-400/20 to-gray-500/40"></div>
                    
                    {/* Mare (dark patches) - like real lunar seas */}
                    <div className="absolute top-2 right-1 w-6 h-8 bg-gray-500/30 rounded-full transform rotate-12"></div>
                    <div className="absolute bottom-1 left-2 w-4 h-5 bg-gray-500/25 rounded-full transform -rotate-6"></div>
                    
                    {/* Realistic crater patterns */}
                    {/* Large prominent crater (like Tycho) */}
                    <div className="absolute top-3 left-3 w-3 h-3 bg-gray-500/20 rounded-full shadow-inner border border-gray-400/10"></div>
                    
                    {/* Medium craters */}
                    <div className="absolute top-8 right-2 w-2 h-2 bg-gray-500/15 rounded-full shadow-inner"></div>
                    <div className="absolute bottom-4 left-4 w-2.5 h-2.5 bg-gray-500/18 rounded-full shadow-inner"></div>
                    
                    {/* Small crater cluster */}
                    <div className="absolute top-6 left-8 w-1 h-1 bg-gray-500/12 rounded-full"></div>
                    <div className="absolute top-7 left-9 w-0.5 h-0.5 bg-gray-500/10 rounded-full"></div>
                    <div className="absolute top-10 left-7 w-1 h-1 bg-gray-500/12 rounded-full"></div>
                    
                    {/* Tiny surface details */}
                    <div className="absolute top-5 right-4 w-0.5 h-0.5 bg-gray-500/8 rounded-full"></div>
                    <div className="absolute bottom-3 right-3 w-0.5 h-0.5 bg-gray-500/8 rounded-full"></div>
                  </div>
                  
                  {/* Subtle terminator line (day/night boundary) */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-transparent to-gray-600/20"></div>
                  
                  {/* Very subtle glow - like moonlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100/5 via-transparent to-transparent group-hover:from-blue-100/10 transition-all duration-700"></div>
                  
                  {/* Very subtle outer atmosphere glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-50/10 to-purple-50/10 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
                </button>
              </SignUpButton>
              
              {/* Minimal tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-black/60 text-gray-300 text-xs px-2 py-1 rounded backdrop-blur-sm">
                  Fan club
                </div>
              </div>
            </motion.div>
          )}
          
          {hasAnyUserSession && (
            <motion.div
              className="absolute top-6 right-6 z-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <div className="relative">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-16 h-16 rounded-full opacity-0",
                      userButtonTrigger: "w-16 h-16 rounded-full focus:shadow-none",
                    }
                  }}
                />
                
                {/* Custom Blood Moon Overlay */}
                <div className="absolute inset-0 w-16 h-16 rounded-full cursor-pointer pointer-events-none">
                  {/* Blood Moon - Lunar Eclipse Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-900 via-red-800 to-red-950 shadow-lg shadow-red-900/50 transition-all duration-300 hover:shadow-red-800/60 hover:scale-105">
                    {/* Blood moon atmospheric glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-700/30 via-red-800/20 to-red-950/40"></div>
                    
                    {/* Mare (dark patches) - now darker red */}
                    <div className="absolute top-2 right-1 w-6 h-8 bg-red-950/60 rounded-full transform rotate-12"></div>
                    <div className="absolute bottom-1 left-2 w-4 h-5 bg-red-950/50 rounded-full transform -rotate-6"></div>
                    
                    {/* Blood moon crater patterns - darker */}
                    <div className="absolute top-3 left-3 w-3 h-3 bg-red-950/40 rounded-full shadow-inner border border-red-800/20"></div>
                    <div className="absolute top-8 right-2 w-2 h-2 bg-red-950/35 rounded-full shadow-inner"></div>
                    <div className="absolute bottom-4 left-4 w-2.5 h-2.5 bg-red-950/38 rounded-full shadow-inner"></div>
                    
                    {/* Small crater cluster - blood moon style */}
                    <div className="absolute top-6 left-8 w-1 h-1 bg-red-950/25 rounded-full"></div>
                    <div className="absolute top-7 left-9 w-0.5 h-0.5 bg-red-950/20 rounded-full"></div>
                    <div className="absolute top-10 left-7 w-1 h-1 bg-red-950/25 rounded-full"></div>
                    
                    {/* Earth's shadow gradient (eclipse effect) */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-red-950/30 to-red-950/60"></div>
                    
                    {/* Atmospheric refraction glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-600/15 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Blood moon outer atmosphere */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-orange-600/15 rounded-full blur-sm"></div>
                  
                  {/* Subtle pulsing effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-full blur-md animate-pulse"></div>
                </div>
              </div>
              
              {/* Blood moon tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-black/60 text-red-300 text-xs px-2 py-1 rounded backdrop-blur-sm">
                  #1 Fan
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="mb-6 text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl font-nasalization"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          NATE ATKINS
        </motion.h1>
        <motion.p
          className="mb-4 text-lg text-gray-400 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Currently on Earth
        </motion.p>
        <motion.div
          className="font-mono bg-gray-800/50 px-4 py-3 rounded-lg text-white flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl">{timeElapsed.split(":")[0]}</span>
            <span className="text-xs text-gray-400">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">{timeElapsed.split(":")[1]}</span>
            <span className="text-xs text-gray-400">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">{timeElapsed.split(":")[2]}</span>
            <span className="text-xs text-gray-400">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">{timeElapsed.split(":")[3]}</span>
            <span className="text-xs text-gray-400">Seconds</span>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-24 sm:bottom-16 md:bottom-10 left-0 right-0 flex flex-col items-center gap-2">
        <motion.p
          className="text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Excited to explore the stars
        </motion.p>
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a href="mailto:natatkins10@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors">
            natatkins10@gmail.com
          </a>
          <p className="mt-1 text-xs text-gray-600">I might not respond for a few years.</p>
        </motion.div>
      </div>
    </div>
  )
}

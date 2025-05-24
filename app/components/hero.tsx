"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [timeElapsed, setTimeElapsed] = useState("00:00:00:00")

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

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
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

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
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

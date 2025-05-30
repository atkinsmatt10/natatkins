"use client"

import { PricingTable } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
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

        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 via-gray-350 to-gray-400 flex items-center justify-center shadow-lg">
              <div className="text-2xl font-bold text-black">N</div>
              {/* Small stars around logo */}
              <div className="absolute w-1 h-1 bg-white rounded-full -top-1 -left-1"></div>
              <div className="absolute w-0.5 h-0.5 bg-white rounded-full -bottom-1 -right-1"></div>
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent font-nasalization">
                FAN CLUB
              </h1>
            </div>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join me on an extraordinary journey to the stars
          </motion.p>
          
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Choose your mission level and get exclusive access to space-themed content, 
            behind-the-scenes updates, and early access to cosmic adventures.
          </motion.p>
        </motion.div>

        {/* Pricing Table Section */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Custom wrapper for the Clerk PricingTable */}
          <div className="pricing-table-wrapper">
            <PricingTable />
          </div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="inline-block p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-white">Ready for Launch? 🚀</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Join thousands of space enthusiasts already on this incredible journey.
              Cancel anytime, but why would you want to miss the adventure?
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Secure payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>24/7 mission support</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href="/exclusive" 
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm underline"
              >
                Preview exclusive content →
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for Clerk PricingTable styling */}
      <style jsx global>{`
        .pricing-table-wrapper .cl-pricingTable {
          background: transparent;
        }
        
        .pricing-table-wrapper .cl-pricingTableCard {
          background: rgba(0, 0, 0, 0.7) !important;
          border: 1px solid rgba(75, 85, 99, 0.3) !important;
          border-radius: 16px !important;
          backdrop-filter: blur(20px) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(79, 70, 229, 0.1) !important;
        }
        
        .pricing-table-wrapper .cl-pricingTableCard:hover {
          border-color: rgba(79, 70, 229, 0.5) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(79, 70, 229, 0.2) !important;
          transform: translateY(-4px) !important;
          transition: all 0.3s ease !important;
        }
        
        .pricing-table-wrapper .cl-pricingTableTitle {
          color: #ffffff !important;
          font-weight: 700 !important;
        }
        
        .pricing-table-wrapper .cl-pricingTablePrice {
          color: #4f46e5 !important;
          font-weight: 800 !important;
        }
        
        .pricing-table-wrapper .cl-pricingTableDescription {
          color: #a1a1aa !important;
        }
        
        .pricing-table-wrapper .cl-pricingTableFeature {
          color: #d1d5db !important;
        }
        
        .pricing-table-wrapper .cl-pricingTableButton {
          background: #4f46e5 !important;
          border: none !important;
          border-radius: 8px !important;
          color: white !important;
          font-weight: 600 !important;
          padding: 12px 24px !important;
          transition: all 0.2s ease !important;
        }
        
        .pricing-table-wrapper .cl-pricingTableButton:hover {
          background: #4338ca !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4) !important;
        }
        
        .pricing-table-wrapper .cl-pricingTableFeatured {
          border-color: rgba(79, 70, 229, 0.6) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px rgba(79, 70, 229, 0.3) !important;
        }
      `}</style>
    </div>
  )
} 
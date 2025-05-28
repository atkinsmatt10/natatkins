'use client'

import { useEffect, useState } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '../actions'

export function PWAInstaller() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null // Don't show install prompt if already installed
  }

  return (
    <>
      {isIOS && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-4 text-center z-50">
          <p className="text-sm">
            Install this app on your device: tap{' '}
            <span className="inline-block w-4 h-4 bg-white rounded-sm mx-1"></span>{' '}
            and then Add to Home Screen.
          </p>
        </div>
      )}
    </>
  )
}

export function ServiceWorkerRegistration() {
  useEffect(() => {
    console.log('🔧 ServiceWorkerRegistration: Starting registration check')
    
    if ('serviceWorker' in navigator) {
      console.log('✅ ServiceWorkerRegistration: Service Worker API is supported')
      
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ ServiceWorkerRegistration: Service Worker registered successfully:', registration)
          console.log('📍 ServiceWorkerRegistration: Scope:', registration.scope)
          console.log('📍 ServiceWorkerRegistration: State:', registration.active?.state)
        })
        .catch((error) => {
          console.error('❌ ServiceWorkerRegistration: Service Worker registration failed:', error)
        })
    } else {
      console.error('❌ ServiceWorkerRegistration: Service Worker API not supported')
    }
  }, [])

  return null
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebugInfo = (info: string) => {
    console.log(`🐛 PushNotificationManager: ${info}`)
    setDebugInfo(prev => [...prev.slice(-4), info]) // Keep last 5 messages
  }

  useEffect(() => {
    addDebugInfo('Component mounted, checking support...')
    
    const swSupported = 'serviceWorker' in navigator
    const pushSupported = 'PushManager' in window
    const notificationSupported = 'Notification' in window
    
    addDebugInfo(`Service Worker supported: ${swSupported}`)
    addDebugInfo(`Push Manager supported: ${pushSupported}`)
    addDebugInfo(`Notifications supported: ${notificationSupported}`)
    addDebugInfo(`VAPID key present: ${!!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY}`)
    
    const supported = swSupported && pushSupported && notificationSupported
    setIsSupported(supported)
    addDebugInfo(`Overall support: ${supported}`)
  }, [])

  async function subscribeToPush() {
    addDebugInfo('🚀 Subscribe button clicked!')
    
    if (!isSupported) {
      addDebugInfo('❌ Not supported, aborting')
      return
    }

    setLoading(true)
    addDebugInfo('⏳ Setting loading state...')
    
    try {
      addDebugInfo('📋 Checking notification permission...')
      let permission = Notification.permission
      addDebugInfo(`Current permission: ${permission}`)
      
      if (permission === 'default') {
        addDebugInfo('🔔 Requesting notification permission...')
        permission = await Notification.requestPermission()
        addDebugInfo(`Permission after request: ${permission}`)
      }
      
      if (permission !== 'granted') {
        addDebugInfo('❌ Permission denied')
        throw new Error('Notification permission denied')
      }
      
      addDebugInfo('✅ Permission granted, getting service worker...')
      const registration = await navigator.serviceWorker.ready
      addDebugInfo(`Service worker ready: ${!!registration}`)
      
      addDebugInfo('🔑 Creating push subscription...')
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      addDebugInfo(`VAPID key length: ${vapidKey?.length || 0}`)
      
      if (!vapidKey) {
        addDebugInfo('❌ VAPID key not configured')
        throw new Error('Push notifications not configured on this server')
      }
      
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey,
      })
      
      addDebugInfo('✅ Subscription created!')
      addDebugInfo(`Endpoint: ${sub.endpoint.substring(0, 50)}...`)
      setSubscription(sub)
      
      addDebugInfo('📤 Sending subscription to server...')
      const result = await subscribeUser(sub)
      addDebugInfo(`Server response: ${JSON.stringify(result)}`)
      
      if (result.success) {
        addDebugInfo('✅ Successfully subscribed!')
      } else {
        addDebugInfo(`❌ Server error: ${result.error}`)
      }
    } catch (error) {
      addDebugInfo(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
      console.error('Full error object:', error)
    } finally {
      setLoading(false)
      addDebugInfo('⏳ Loading state cleared')
    }
  }

  async function unsubscribe() {
    if (!subscription) return

    setLoading(true)
    try {
      await subscription.unsubscribe()
      await unsubscribeUser(subscription.endpoint)
      setSubscription(null)
      addDebugInfo('✅ Unsubscribed successfully')
    } catch (error) {
      addDebugInfo(`❌ Unsubscribe error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  async function sendTestNotification() {
    if (!message.trim()) return

    setLoading(true)
    addDebugInfo(`📨 Sending notification: "${message}"`)
    
    try {
      const result = await sendNotification(message)
      addDebugInfo(`Server response: ${JSON.stringify(result)}`)
      
      if (result.success) {
        addDebugInfo('✅ Notification sent!')
        setMessage('')
      } else {
        addDebugInfo(`❌ Send error: ${result.error}`)
      }
    } catch (error) {
      addDebugInfo(`❌ Send error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-100 rounded-lg">
        <p>Push notifications are not supported in this browser.</p>
        <div className="mt-2 text-xs">
          {debugInfo.map((info, i) => (
            <div key={i}>{info}</div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Push Notifications</h3>
      
      {/* Debug Info */}
      <div className="text-xs bg-gray-100 p-2 rounded max-h-20 overflow-y-auto">
        <strong>Debug Log:</strong>
        {debugInfo.map((info, i) => (
          <div key={i}>{info}</div>
        ))}
      </div>
      
      {!subscription ? (
        <div className="space-y-2">
          <button
            onClick={() => alert('Simple test button works!')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mb-2"
          >
            Test Button (Simple)
          </button>
          <button
            onClick={subscribeToPush}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Enabling...' : 'Enable Notifications'}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-green-600">✓ Notifications enabled</p>
          <button
            onClick={unsubscribe}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? 'Disabling...' : 'Disable Notifications'}
          </button>
        </div>
      )}

      {subscription && (
        <div className="space-y-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Test notification message"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={sendTestNotification}
            disabled={loading || !message.trim()}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Test Notification'}
          </button>
        </div>
      )}
    </div>
  )
} 
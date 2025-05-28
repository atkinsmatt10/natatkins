'use server'

import webpush from 'web-push'

// Set VAPID details (you'll need to generate these keys)
if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    'mailto:nateatkins10@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  )
}

// In-memory storage for demo purposes
// In production, you'd want to use a database
let subscriptions: PushSubscription[] = []

export async function subscribeUser(sub: PushSubscription) {
  try {
    // Check if subscription already exists
    const exists = subscriptions.find(s => s.endpoint === sub.endpoint)
    if (!exists) {
      subscriptions.push(sub)
    }
    
    // In production, save to database:
    // await db.subscriptions.create({ data: sub })
    
    return { success: true }
  } catch (error) {
    console.error('Error subscribing user:', error)
    return { success: false, error: 'Failed to subscribe' }
  }
}

export async function unsubscribeUser(endpoint: string) {
  try {
    subscriptions = subscriptions.filter(s => s.endpoint !== endpoint)
    
    // In production, remove from database:
    // await db.subscriptions.delete({ where: { endpoint } })
    
    return { success: true }
  } catch (error) {
    console.error('Error unsubscribing user:', error)
    return { success: false, error: 'Failed to unsubscribe' }
  }
}

export async function sendNotification(message: string) {
  if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    return { success: false, error: 'VAPID keys not configured' }
  }

  if (subscriptions.length === 0) {
    return { success: false, error: 'No subscriptions available' }
  }

  const payload = JSON.stringify({
    title: 'Nate Atkins - Portfolio Update',
    body: message,
    icon: '/icon-192',
    badge: '/icon-192',
    data: {
      url: '/',
      timestamp: Date.now()
    }
  })

  try {
    const promises = subscriptions.map(subscription =>
      webpush.sendNotification(subscription as any, payload).catch((error: any) => {
        console.error('Failed to send notification to subscription:', error)
        // Remove invalid subscriptions
        if (error.statusCode === 410) {
          subscriptions = subscriptions.filter(s => s.endpoint !== subscription.endpoint)
        }
        return null
      })
    )

    await Promise.all(promises)
    return { success: true, sent: subscriptions.length }
  } catch (error) {
    console.error('Error sending push notifications:', error)
    return { success: false, error: 'Failed to send notifications' }
  }
} 
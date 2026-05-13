'use server'

import { Buffer } from 'node:buffer'
import {
  buildPushHTTPRequest,
  type PushSubscription as PushForgeSubscription,
} from '@pushforge/builder'

type SerializablePushSubscription = PushForgeSubscription & {
  expirationTime?: number | null
}

type VapidConfig = {
  privateJWK: JsonWebKey
  subject: string
}

function base64UrlToBuffer(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    '='
  )

  return Buffer.from(padded, 'base64')
}

function bufferToBase64Url(value: Buffer) {
  return value
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function getVapidConfig(): VapidConfig | null {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
  const privateKey = process.env.VAPID_PRIVATE_KEY
  const subject = process.env.VAPID_SUBJECT || 'mailto:nateatkins10@gmail.com'

  if (!publicKey || !privateKey) {
    console.warn('VAPID keys not configured. Push notifications will not work.')
    return null
  }

  try {
    if (privateKey.trim().startsWith('{')) {
      return {
        privateJWK: JSON.parse(privateKey) as JsonWebKey,
        subject,
      }
    }

    const publicKeyBytes = base64UrlToBuffer(publicKey)
    const privateKeyBytes = base64UrlToBuffer(privateKey)

    if (publicKeyBytes.length !== 65 || publicKeyBytes[0] !== 4) {
      throw new Error('VAPID public key must be an uncompressed P-256 key')
    }

    return {
      privateJWK: {
        kty: 'EC',
        crv: 'P-256',
        x: bufferToBase64Url(publicKeyBytes.subarray(1, 33)),
        y: bufferToBase64Url(publicKeyBytes.subarray(33, 65)),
        d: bufferToBase64Url(privateKeyBytes),
      },
      subject,
    }
  } catch (error) {
    console.error('Failed to prepare VAPID details:', error)
    return null
  }
}

function normalizeSubscription(sub: SerializablePushSubscription): PushForgeSubscription {
  if (!sub.endpoint || !sub.keys?.p256dh || !sub.keys.auth) {
    throw new Error('Invalid push subscription')
  }

  return {
    endpoint: sub.endpoint,
    keys: {
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
    },
  }
}

// In-memory storage for demo purposes
// In production, you'd want to use a database
let subscriptions: PushForgeSubscription[] = []

export async function subscribeUser(sub: SerializablePushSubscription) {
  try {
    const subscription = normalizeSubscription(sub)

    // Check if subscription already exists
    const exists = subscriptions.find((s) => s.endpoint === subscription.endpoint)
    if (!exists) {
      subscriptions.push(subscription)
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
    subscriptions = subscriptions.filter((s) => s.endpoint !== endpoint)
    
    // In production, remove from database:
    // await db.subscriptions.delete({ where: { endpoint } })
    
    return { success: true }
  } catch (error) {
    console.error('Error unsubscribing user:', error)
    return { success: false, error: 'Failed to unsubscribe' }
  }
}

export async function sendNotification(message: string) {
  const vapid = getVapidConfig()

  if (!vapid) {
    console.warn('VAPID not configured, cannot send notifications')
    return { success: false, error: 'Push notifications not configured' }
  }

  if (subscriptions.length === 0) {
    return { success: false, error: 'No subscriptions available' }
  }

  const payload = {
    title: 'Nate Atkins - Portfolio Update',
    body: message,
    icon: '/icon-192',
    badge: '/icon-192',
    data: {
      url: '/',
      timestamp: Date.now(),
    },
  }

  try {
    const results = await Promise.all(
      subscriptions.map(async (subscription) => {
        try {
          const request = await buildPushHTTPRequest({
            privateJWK: vapid.privateJWK,
            subscription,
            message: {
              payload,
              adminContact: vapid.subject,
              options: {
                ttl: 3600,
                urgency: 'normal',
                topic: 'portfolio-update',
              },
            },
          })

          const response = await fetch(request.endpoint, {
            method: 'POST',
            headers: request.headers,
            body: request.body,
          })

          if (response.status === 404 || response.status === 410) {
            subscriptions = subscriptions.filter(
              (s) => s.endpoint !== subscription.endpoint
            )
          }

          if (!response.ok) {
            throw new Error(`Push service returned ${response.status}`)
          }

          return true
        } catch (error) {
          console.error('Failed to send notification to subscription:', error)
          return false
        }
      })
    )

    const sent = results.filter(Boolean).length

    if (sent === 0) {
      return { success: false, error: 'Failed to send notifications' }
    }

    return { success: true, sent }
  } catch (error) {
    console.error('Error sending push notifications:', error)
    return { success: false, error: 'Failed to send notifications' }
  }
}

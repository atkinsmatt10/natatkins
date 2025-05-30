import { auth } from '@clerk/nextjs/server'
import ExclusiveClient from './exclusive-client'

export default async function ExclusivePage() {
  // Use Clerk's auth() helper to check user's subscription status
  const { has, userId } = await auth()

  // Check if user has premium access (replace 'premium' with your actual plan name)
  const hasPremiumAccess = has({ plan: 'premium' })
  const hasBasicAccess = has({ plan: 'basic' })
  const hasAnyPlan = hasPremiumAccess || hasBasicAccess

  return (
    <ExclusiveClient 
      userId={userId}
      hasPremiumAccess={hasPremiumAccess}
      hasBasicAccess={hasBasicAccess}
      hasAnyPlan={hasAnyPlan}
    />
  )
} 
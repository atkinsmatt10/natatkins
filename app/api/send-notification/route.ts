import { NextRequest, NextResponse } from 'next/server'
import { sendNotification } from '@/app/actions'

export async function POST(request: NextRequest) {
  try {
    const { message, title } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' }, 
        { status: 400 }
      )
    }

    // You might want to add authentication here
    // const authHeader = request.headers.get('Authorization')
    // if (authHeader !== 'Bearer your-secret-key') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const result = await sendNotification(message)
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        sent: result.sent,
        message: 'Notification sent successfully' 
      })
    } else {
      return NextResponse.json(
        { error: result.error }, 
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

// Add GET method to prevent build-time errors
export async function GET() {
  return NextResponse.json({ 
    message: 'Push notification API endpoint',
    methods: ['POST'],
    usage: 'POST with { "message": "your message" }'
  })
} 
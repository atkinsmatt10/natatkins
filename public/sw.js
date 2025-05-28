self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/icon-192',
      badge: '/icon-192',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()
  event.waitUntil(clients.openWindow('/'))
})

// Basic caching strategy
self.addEventListener('install', function(event) {
  console.log('Service Worker installing.')
  self.skipWaiting()
})

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', function(event) {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return
  }
  
  // Skip non-http requests and extension requests
  if (!event.request.url.startsWith('http') || 
      event.request.url.includes('extension') ||
      event.request.url.includes('debug')) {
    return
  }

  // Only handle requests from our domain
  const url = new URL(event.request.url)
  if (url.origin !== location.origin) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response since it can only be used once
        const responseClone = response.clone()
        
        // If we got a valid response, return it
        if (response && response.status === 200) {
          return response
        }
        
        return response
      })
      .catch(() => {
        // If fetch fails, try to get from cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse
            }
            
            // For navigation requests, return a simple offline page
            if (event.request.mode === 'navigate') {
              return new Response(`
                <!DOCTYPE html>
                <html>
                <head><title>Offline</title></head>
                <body>
                  <h1>You're offline</h1>
                  <p>Please check your internet connection.</p>
                </body>
                </html>
              `, {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'text/html' }
              })
            }
            
            // For other requests, return empty response
            return new Response('', { status: 404 })
          })
      })
  )
}) 
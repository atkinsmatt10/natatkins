# Nate Atkins - Artist Portfolio PWA

A modern Progressive Web App (PWA) showcasing Nate Atkins' digital art and space-themed creations.

## 🚀 Features

- **Progressive Web App** - Install on any device like a native app
- **Push Notifications** - Real-time updates and portfolio notifications
- **Responsive Design** - Beautiful on desktop, tablet, and mobile
- **Space Theme** - Cosmic design with animated stars and gradients
- **Service Worker** - Offline functionality and fast loading
- **Custom Icons** - Dynamic space-themed app icons

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Web Push API** - Native push notifications
- **Service Workers** - Offline support and caching

## 📱 PWA Capabilities

- **Installable** - Users can install from any modern browser
- **Offline Ready** - Basic functionality works without internet
- **Push Notifications** - Engage users with updates
- **App-like Experience** - Runs in standalone window
- **Cross-Platform** - Works on iOS, Android, Windows, macOS

## 🔧 Setup

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd artist-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Generate VAPID keys for push notifications**
   ```bash
   npx web-push generate-vapid-keys
   ```

4. **Create environment variables**
   Create `.env.local` with your VAPID keys:
   ```env
   NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
   VAPID_PRIVATE_KEY=your_private_key_here
   ```

5. **Run development server**
   ```bash
   npm run dev
   # or for PWA testing with HTTPS:
   npm run dev -- --experimental-https
   ```

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add PWA functionality"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Configure Environment Variables**
   In Vercel dashboard, add:
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY`
   - `VAPID_PRIVATE_KEY`

### Other Platforms

The app works on any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 PWA Installation

### For Users

**Desktop (Chrome/Edge):**
- Visit the site
- Click the install icon in the address bar
- Or: Menu → "Install [App Name]"

**Mobile (Android):**
- Visit the site in Chrome
- Tap "Add to Home Screen" banner

**Mobile (iOS Safari):**
- Visit the site
- Tap the share button
- Select "Add to Home Screen"

## 🔔 Push Notifications

### Sending Notifications

**From Code:**
```typescript
import { sendNotification } from '@/app/actions'

await sendNotification("New artwork uploaded!")
```

**Via API:**
```bash
curl -X POST https://your-domain.com/api/send-notification \
  -H "Content-Type: application/json" \
  -d '{"message": "Portfolio updated!"}'
```

### Use Cases

- New portfolio uploads
- Contact form submissions
- Milestone celebrations
- Blog post notifications

## 🎨 Customization

### Icons
Icons are dynamically generated using Next.js. Customize in:
- `app/icon.tsx` - Favicon (32x32)
- `app/icon-192/route.tsx` - PWA icon (192x192)
- `app/icon-512/route.tsx` - PWA icon (512x512)
- `app/apple-icon.tsx` - iOS icon

### Manifest
PWA settings in `app/manifest.ts`:
- App name and description
- Theme colors
- Display mode
- Orientation

### Service Worker
Caching and offline behavior in `public/sw.js`

## 🔒 Security

- HTTPS required for PWA features
- VAPID keys for authenticated push notifications
- Content Security Policy headers
- Service worker security headers

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   └── pwa-components.tsx    # PWA functionality
│   ├── api/
│   │   └── send-notification/    # API endpoint
│   ├── actions.ts                # Server actions
│   ├── manifest.ts              # PWA manifest
│   ├── icon*.tsx                # Dynamic icons
│   └── layout.tsx               # Root layout
├── public/
│   └── sw.js                    # Service worker
└── PWA_SETUP.md                 # Detailed setup guide
```

## 🐛 Troubleshooting

### Common Issues

**Notifications not working:**
- Ensure HTTPS is enabled
- Check VAPID keys are correct
- Verify browser permissions

**PWA not installable:**
- Manifest must be accessible
- Icons must load correctly
- Service worker must be registered

**Service worker errors:**
- Check browser console
- Verify `/sw.js` is accessible
- Ensure proper Content-Type headers

### Development

For local PWA testing:
```bash
npm run dev -- --experimental-https
```

## 📄 License

MIT License - feel free to use for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ by Nate Atkins**  
*Currently on Earth, excited to explore the stars* 🌟 
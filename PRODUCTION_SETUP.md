# 🚀 Production Deployment Guide

This guide will help you move your Clerk authentication from development to production.

## Current Status
✅ Development setup complete with test keys  
⏳ Ready to move to production

## Step 1: Create Production Instance in Clerk Dashboard

1. **In the Clerk Dashboard** (where you currently are):
   - Click the **"Development"** dropdown button at the top
   - Select **"Create production instance"**
   - Choose **"Clone development settings"** (recommended to keep your current setup)

2. **Note your production instance URL** - it will be something like:
   `https://clerk.natatkins.com` or similar

## Step 2: Configure DNS Records

Based on your screenshots, you'll need to set up DNS records for `natatkins.com`:

1. **In your Clerk Dashboard** → **Domains** section
2. **Add your domain**: `natatkins.com`
3. **Set up required DNS records**:
   - `clerk.natatkins.com` → CNAME pointing to `frontend-api.clerk.services`
   - `accounts.natatkins.com` → CNAME pointing to `accounts.clerk.services`
   - `clkmail.natatkins.com` → CNAME pointing to `mail.smtp.clerk.services`

## Step 3: Update Environment Variables

**Manually update your `.env.local` file** with these changes:

```bash
# Comment out development keys:
# CLERK_SECRET_KEY="sk_test_CK51UMNu9tKcHl0Zx8bqndG3o0j2uNZhLZ9WrLew7c"
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_cmljaC1tdXNrb3gtNzUuY2xlcmsuYWNjb3VudHMuZGV2JA"

# Add production keys (get these from your new production instance):
CLERK_SECRET_KEY="sk_live_YOUR_ACTUAL_PRODUCTION_SECRET_KEY"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_YOUR_ACTUAL_PRODUCTION_PUBLISHABLE_KEY"

# Keep your existing VAPID keys and other settings unchanged
```

**To get your production keys:**
1. Switch to your production instance in Clerk Dashboard
2. Go to **API Keys**
3. Copy the **Publishable Key** (starts with `pk_live_`)
4. Copy the **Secret Key** (starts with `sk_live_`)

## Step 4: Set Up OAuth Providers for Production

If you're using social sign-in (Google, GitHub, etc.):

1. **In your production Clerk instance**:
   - Go to **Configure** → **SSO connections**
   - For each provider, you'll need to create production OAuth credentials
   - The shared development credentials won't work in production

2. **For Google OAuth** (if you're using it):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new OAuth credentials for production
   - Add your production domains to authorized origins

## Step 5: Update Vercel Environment Variables

Since you're using Vercel, you'll need to update the environment variables there too:

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to **Environment Variables**
   - Update the production environment variables:
     - `CLERK_SECRET_KEY` → your production secret key
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → your production publishable key

2. **Redeploy your application** after updating the environment variables

## Step 6: Configure authorizedParties (Security)

For enhanced security, update your middleware to include authorized parties:

```typescript
// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  authorizedParties: ['https://natatkins.com'],
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

## Step 7: Deploy Certificates

1. **Complete all DNS setup** (wait up to 24 hours for propagation)
2. **In Clerk Dashboard**: A **"Deploy certificates"** button will appear
3. **Click the button** to deploy your production instance

## Step 8: Test Your Production Setup

1. **Visit your live site**: `https://natatkins.com`
2. **Test sign-up flow**: Create a new account
3. **Test sign-in flow**: Sign in with the new account
4. **Verify protected routes**: Check that `/protected` works
5. **Test billing** (if using): Ensure subscription flows work

## Troubleshooting

### Common Issues:

**DNS not propagating:**
- Wait up to 24 hours for DNS changes
- Use `dig` to check DNS records
- If using Cloudflare, set DNS to "DNS only" mode

**Authentication not working:**
- Double-check environment variables are correct
- Ensure you're using `pk_live_` and `sk_live_` keys
- Verify domain is correctly set in Clerk Dashboard

**Build/deployment errors:**
- Restart your development server: `pnpm dev`
- Clear Next.js cache: `rm -rf .next`
- Redeploy on Vercel after env var changes

## Quick Checklist

- [ ] Created production instance in Clerk Dashboard
- [ ] Added domain (natatkins.com) to production instance
- [ ] Set up DNS records (CNAME records)
- [ ] Updated `.env.local` with production keys
- [ ] Updated Vercel environment variables
- [ ] Configured OAuth providers for production (if using)
- [ ] Added `authorizedParties` to middleware
- [ ] Waited for DNS propagation (up to 24 hours)
- [ ] Clicked "Deploy certificates" in Clerk Dashboard
- [ ] Tested production authentication flow

## Next Steps After Production

1. **Monitor your application** for any authentication issues
2. **Set up proper error monitoring** (Sentry, LogRocket, etc.)
3. **Configure webhooks** for user events if needed
4. **Update billing plans** to production pricing (if using Clerk billing)

🎉 **Your space-themed portfolio will be ready for production!** 
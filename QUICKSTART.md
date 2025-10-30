# Quick Start Guide

Get your application running in 5 minutes! ⚡

## Step 1: Configure AWS (2 minutes)

```bash
aws configure
```

Enter:
- **AWS Access Key ID**: Get from [AWS IAM Console](https://console.aws.amazon.com/iam/)
- **AWS Secret Access Key**: Get from AWS IAM Console
- **Default region**: `us-east-1` (or your preferred region)
- **Output format**: `json`

> 💡 **Tip**: If you don't have AWS credentials yet:
> 1. Go to [AWS Console](https://console.aws.amazon.com)
> 2. Navigate to IAM → Users → Your User → Security Credentials
> 3. Create Access Key

## Step 2: Deploy Backend (1 minute)

```bash
# This creates your Cognito User Pool and generates amplify_outputs.json
npx ampx sandbox
```

Wait for the deployment to complete. You'll see:
```
✅ Deployed: [Auth] AuthStack
✅ Backend is ready!
```

## Step 3: Start Development Server (1 minute)

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Step 4: Test Authentication (1 minute)

1. Click **"Get Started"**
2. Create an account with your email
3. Check your email for verification code
4. Enter the code to verify
5. Sign in with your credentials
6. You're in the dashboard! 🎉

## Step 5: Deploy to Production

### Push to GitHub

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Connect to Amplify Hosting

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select **GitHub** and authorize
4. Choose your repository
5. Amplify will auto-detect `amplify.yml`
6. Click **"Save and deploy"**

Your app will be live in ~5 minutes at a URL like:
`https://main.xxxxx.amplifyapp.com`

## Verify Security Features

### Check HttpOnly Cookies

1. Open DevTools (F12)
2. Go to **Application** tab → **Cookies**
3. You should see authentication cookies with:
   - ✅ HttpOnly flag
   - ✅ Secure flag (on HTTPS)
   - ✅ SameSite attribute

### Test Route Protection

1. Sign out
2. Try accessing `/dashboard` directly
3. You'll be redirected to `/login` ✅

## Troubleshooting

### "Unable to locate credentials"
**Fix**: Run `aws configure` to set up credentials

### "amplify_outputs.json not found"
**Fix**: Run `npx ampx sandbox` to generate it

### Build fails on Amplify
**Fix**: 
1. Check build logs in Amplify Console
2. Ensure `amplify.yml` is present
3. Verify all dependencies in `package.json`

### Can't receive verification email
**Fix**: 
1. Check spam folder
2. Verify email in Cognito console
3. For testing, Cognito has a "Confirm User" option in console

## What's Next?

✅ **Add Custom Domain**
- In Amplify Console → Domain Management

✅ **Add API**
- Create `amplify/data/resource.ts` for GraphQL API

✅ **Add Storage**
- Create `amplify/storage/resource.ts` for S3 storage

✅ **Add Functions**
- Create Lambda functions in `amplify/functions/`

✅ **Customize UI**
- Edit pages in `app/` directory
- Modify styles with Tailwind classes

## Architecture at a Glance

```
User Browser
    ↓ (HttpOnly Cookies)
Next.js App (Amplify Hosting)
    ↓ (Server Actions)
AWS Cognito (User Pool)
```

## Key Files

- `app/login/page.tsx` - Login page
- `app/signup/page.tsx` - Signup page  
- `app/dashboard/page.tsx` - Protected dashboard
- `actions/auth-actions.ts` - Auth Server Actions
- `middleware.ts` - Route protection
- `amplify/auth/resource.ts` - Cognito configuration

## Support

- 📖 [Full Documentation](./README.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 💬 [Amplify Discord](https://discord.gg/amplify)
- 🐛 [Report Issues](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)

---

**Time to Production**: ~15 minutes ⚡  
**Cost**: Free tier covers most small apps 💰


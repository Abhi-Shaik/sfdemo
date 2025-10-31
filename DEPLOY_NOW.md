# 🚀 Deploy to AWS Amplify - Ready to Go!

Your code is now on GitHub: **https://github.com/Abhi-Shaik/SF**

## Step 1: Open AWS Amplify Console

Click this link to open AWS Amplify Console:
👉 **https://console.aws.amazon.com/amplify/home**

## Step 2: Create New Amplify App

1. Click **"Create new app"** button (orange button at top)
2. Select **"Host web app"**

## Step 3: Connect GitHub Repository

1. **Select source**: Choose **GitHub**
2. **Authorize GitHub** (if prompted):
   - Click "Authorize AWS Amplify"
   - Sign in to GitHub if needed
   - Grant permissions to AWS Amplify
3. **Select repository**:
   - Repository: **`Abhi-Shaik/SF`**
   - Branch: **`main`**
4. Click **"Next"**

## Step 4: Configure Build Settings

The build settings will auto-detect from your `amplify.yml` file:

```yaml
App name: sf-fullstack (or your preferred name)
Environment: main
Build image: Amazon Linux 2023 (default)
```

✅ The `amplify.yml` file is already configured and will:
- Deploy your Amplify backend (authentication)
- Build your Next.js application
- Set up HttpOnly cookies automatically

Click **"Next"**

## Step 5: Review and Deploy

1. Review all the settings
2. Click **"Save and deploy"**
3. Wait for deployment (approximately 5-10 minutes)

### Deployment Progress:
- ⏳ **Provision** (1-2 min): Setting up the environment
- ⏳ **Build** (3-5 min): Running `npm install` and `npm run build`
- ⏳ **Deploy** (1-2 min): Deploying to Amplify CDN
- ✅ **Verify** (< 1 min): Health checks

## Step 6: Get Your Live URL

Once deployment completes, you'll see:

```
✅ Deployment successful!
Your app URL: https://main.dxxxxxx.amplifyapp.com
```

## Step 7: Link Backend Environment (CRITICAL!)

After the first deployment:

1. In Amplify Console, click on **"Backend environments"** tab (left sidebar)
2. You should see your existing sandbox backend
3. Click **"Link backend"** 
4. Select the backend environment you've been using locally
5. This ensures your Cognito User Pool is connected to the production app

**Alternative**: If you want a separate production backend:
1. Click "Create backend environment"
2. Name it "production"
3. This will create a separate Cognito User Pool for production

## Step 8: Test Your Live Application

Visit your live URL and test:

- [ ] **Homepage** loads correctly
- [ ] **Sign Up** page works
  - [ ] Enter email and password
  - [ ] Receive verification code email
  - [ ] Confirm account with code
- [ ] **Login** page works
  - [ ] Sign in with credentials
  - [ ] Redirects to dashboard
- [ ] **Dashboard** shows user information
- [ ] **Sign Out** works
- [ ] **HttpOnly Cookies** are set:
  - [ ] Open DevTools → Application → Cookies
  - [ ] Verify `HttpOnly` ✓ and `Secure` ✓ flags

## 🎉 You're Live!

Your full-stack Next.js application with:
- ✅ AWS Amplify Authentication (Cognito)
- ✅ HttpOnly cookies for security
- ✅ HTTPS (automatic with Amplify)
- ✅ CI/CD pipeline (automatic deployments on git push)

## CI/CD Pipeline is Active

Every time you push to the `main` branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

AWS Amplify will automatically:
1. Pull the latest code
2. Deploy backend changes
3. Build the Next.js app
4. Deploy to production
5. Update your live URL

Monitor builds in: **Amplify Console → Your App → Build history**

## Environment Variables (If Needed)

If you need to add environment variables:

1. Amplify Console → **App settings** → **Environment variables**
2. Click **"Manage variables"**
3. Add any required variables (e.g., API keys)
4. Save and redeploy

## Custom Domain (Optional)

To add your own domain:

1. Amplify Console → **Domain management**
2. Click **"Add domain"**
3. Enter your domain name
4. Follow DNS configuration steps
5. Wait for SSL certificate provisioning (automatic)

## Monitoring and Logs

### View Build Logs:
- Amplify Console → Your App → Click on any build → View logs

### View Application Logs:
- Amplify Console → Monitoring → View in CloudWatch

### Set Up Alerts:
- CloudWatch → Alarms → Create alarm for errors

## Troubleshooting

### Build fails: "Unable to locate credentials"
**Solution**: The Amplify service role needs permissions.
- Ensure the role has `AdministratorAccess-Amplify` policy

### Authentication doesn't work
**Solution**: Backend environment not linked.
- Go to "Backend environments" tab
- Link your existing backend or create a new one

### Cookies not being set
**Solution**: This is actually correct! HttpOnly cookies work differently.
- They are set by the server
- JavaScript cannot access them (by design for security)
- Check DevTools → Application → Cookies to verify they exist

## Need Help?

- **Full Guide**: See `DEPLOYMENT_GUIDE.md`
- **HttpOnly Cookies**: See `HTTPONLY_COOKIES_EXPLAINED.md`
- **AWS Amplify Docs**: https://docs.amplify.aws/nextjs/
- **AWS Support**: https://console.aws.amazon.com/support/

## What's Next?

1. ✅ Test your production app thoroughly
2. ✅ Set up monitoring and alerts
3. ✅ Configure a custom domain (optional)
4. ✅ Add additional features
5. ✅ Set up staging environment (optional)

---

**GitHub Repository**: https://github.com/Abhi-Shaik/SF
**AWS Amplify Console**: https://console.aws.amazon.com/amplify/home

🎊 Congratulations on deploying your full-stack application!


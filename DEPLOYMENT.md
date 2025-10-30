# Deployment Guide

This guide will help you deploy the Salesforce FullStack application to AWS Amplify.

## Prerequisites

Before deploying, ensure you have:

1. ✅ Node.js (v20+) installed
2. ✅ AWS CLI installed and configured
3. ✅ Git installed
4. ✅ An AWS account
5. ✅ A GitHub account

## Step 1: Configure AWS Credentials

If you haven't configured AWS credentials yet, run:

```bash
aws configure
```

You'll need to provide:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)
- Default output format (e.g., `json`)

## Step 2: Deploy the Amplify Backend

Deploy your authentication backend to AWS:

```bash
npx ampx sandbox
```

This will:
- Create an AWS Cognito User Pool
- Set up authentication resources
- Generate the `amplify_outputs.json` file

For production deployment, use:

```bash
npx ampx pipeline-deploy --branch main --app-id <your-app-id>
```

## Step 3: Verify AWS Resources

1. Go to the [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **AWS Cognito**
3. Verify that your User Pool has been created
4. Check the App client settings

## Step 4: Push to GitHub

Create a new repository on GitHub and push your code:

```bash
# Initialize git (already done)
git add .
git commit -m "Complete authentication setup"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## Step 5: Set Up Amplify Hosting

### Option A: Using AWS Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select **GitHub** as your repository provider
4. Authorize AWS Amplify to access your GitHub account
5. Select your repository and branch (main)
6. Amplify will detect your `amplify.yml` configuration
7. Review the settings and click **"Save and deploy"**

### Option B: Using Amplify CLI

```bash
# Install Amplify CLI if not already installed
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify hosting
amplify add hosting

# Select "Hosting with Amplify Console"
# Select "Continuous deployment"

# Deploy
amplify publish
```

## Step 6: Configure Environment Variables (if needed)

In the Amplify Console:
1. Go to your app
2. Click on **"Environment variables"** in the left sidebar
3. Add any necessary environment variables

## Step 7: Test Your Deployment

1. Once deployed, Amplify will provide you with a URL (e.g., `https://main.xxxxx.amplifyapp.com`)
2. Visit the URL
3. Test the sign-up flow:
   - Click "Get Started"
   - Enter email and password
   - Verify email with the code sent to your inbox
   - Sign in
4. Verify HttpOnly cookies in browser DevTools:
   - Open DevTools → Application → Cookies
   - You should see authentication cookies with `HttpOnly` flag

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                  (HttpOnly Cookies Stored)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS Amplify Hosting                       │
│                     (Next.js App)                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • Server-Side Rendering                             │  │
│  │  • Middleware Auth Check                             │  │
│  │  • Server Actions (Sign In/Up/Out)                   │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     AWS Cognito                              │
│                   (User Pool)                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • User Authentication                               │  │
│  │  • Token Management                                  │  │
│  │  • Email Verification                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Security Features

✅ **HttpOnly Cookies**: Authentication tokens stored in HttpOnly cookies (inaccessible to JavaScript)  
✅ **Secure Flag**: Cookies only transmitted over HTTPS  
✅ **Server-Side Authentication**: Auth checks performed on the server  
✅ **Protected Routes**: Middleware redirects unauthenticated users  
✅ **CSRF Protection**: Built-in Next.js CSRF protection with Server Actions  

## Troubleshooting

### Issue: "Unable to locate credentials"
**Solution**: Run `aws configure` to set up your AWS credentials.

### Issue: amplify_outputs.json not found
**Solution**: Run `npx ampx sandbox` to generate the configuration file.

### Issue: Build fails on Amplify
**Solution**: 
1. Check the build logs in Amplify Console
2. Ensure all dependencies are listed in `package.json`
3. Verify `amplify.yml` configuration

### Issue: Authentication not working after deployment
**Solution**:
1. Verify that `amplify_outputs.json` is generated during build
2. Check that cookies are being set (DevTools → Application → Cookies)
3. Ensure your domain is configured correctly in Cognito App Client settings

## Next Steps

After deployment, you can:

1. **Add Custom Domain**: Configure a custom domain in Amplify Hosting
2. **Set Up Monitoring**: Enable CloudWatch logs and metrics
3. **Add API**: Create GraphQL or REST APIs using Amplify
4. **Add Storage**: Integrate S3 for file storage
5. **Add Database**: Set up DynamoDB for data persistence

## Resources

- [AWS Amplify Gen2 Documentation](https://docs.amplify.aws/react/)
- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [Amplify Hosting Documentation](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)

## Support

For issues or questions:
- Check the [Amplify Discord](https://discord.gg/amplify)
- Visit [AWS Support](https://aws.amazon.com/support/)


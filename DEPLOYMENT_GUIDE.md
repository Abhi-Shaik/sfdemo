# AWS Amplify Deployment Guide

## Prerequisites
- ✅ AWS Account configured (already done)
- ✅ Amplify backend deployed locally (`npx ampx sandbox` working)
- ✅ Code committed to Git
- 🔲 GitHub repository
- 🔲 Amplify Hosting setup

## Step-by-Step Deployment

### Step 1: Create GitHub Repository

If you don't have a GitHub repository yet:

1. Go to https://github.com/new
2. Create a new repository (e.g., `salesforce-fullstack`)
3. Make it **Private** (recommended for production apps)
4. Do NOT initialize with README (we already have code)

### Step 2: Push Code to GitHub

```bash
# Add GitHub as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Set Up Amplify Hosting

#### Option A: Using AWS Console (Recommended for first-time setup)

1. **Navigate to AWS Amplify Console**
   - Go to: https://console.aws.amazon.com/amplify/
   - Or search for "Amplify" in AWS Console

2. **Create New App**
   - Click **"Create new app"**
   - Select **"Host web app"**

3. **Connect Repository**
   - Choose **GitHub** as the repository service
   - Click **"Authorize AWS Amplify"** (if prompted)
   - Select your repository: `salesforce-fullstack`
   - Select branch: `main`
   - Click **Next**

4. **Configure Build Settings**
   - App name: `salesforce-fullstack`
   - Environment name: `main`
   - The build settings should auto-detect from `amplify.yml`
   - Click **Next**

5. **Review and Deploy**
   - Review all settings
   - Click **"Save and deploy"**

#### Option B: Using Amplify CLI

```bash
# Generate pipeline deployment config
npx ampx generate config --branch main --app-id YOUR_APP_ID

# This creates amplify_outputs.json for the branch
```

### Step 4: Connect Backend to Hosting

After the first deployment completes:

1. In Amplify Console, go to your app
2. Click on the **Backend environments** tab
3. Click **"Create backend environment"**
4. Choose **"Existing backend"**
5. Select the backend you deployed with `npx ampx sandbox`
6. Link it to the `main` branch

### Step 5: Set Environment Variables (if needed)

In Amplify Console:
1. Go to **App settings** → **Environment variables**
2. Add any required environment variables:
   - `NEXT_PUBLIC_APP_NAME=Salesforce FullStack`
   - (Add others as needed)

### Step 6: Configure Build Settings

The `amplify.yml` file in the root handles this automatically. It will:
- Install dependencies
- Deploy backend resources
- Build the Next.js application
- Deploy to Amplify Hosting

### Step 7: Verify Deployment

Once deployment completes:

1. **Get your app URL** (e.g., `https://main.xxxxx.amplifyapp.com`)
2. **Test the application**:
   - [ ] Visit the homepage
   - [ ] Sign up for a new account
   - [ ] Check email for verification code
   - [ ] Confirm account
   - [ ] Sign in
   - [ ] Verify HttpOnly cookies are set (DevTools → Application → Cookies)
   - [ ] Access dashboard
   - [ ] Sign out

### Step 8: Set Up Custom Domain (Optional)

1. In Amplify Console, go to **Domain management**
2. Click **"Add domain"**
3. Follow the wizard to:
   - Enter your domain name
   - Configure DNS settings
   - Wait for SSL certificate provisioning

## CI/CD Pipeline Workflow

Once set up, every git push to `main` will:

1. **Trigger Amplify build**
2. **Install dependencies** (`npm ci`)
3. **Deploy backend** (`npx ampx pipeline-deploy`)
4. **Build Next.js** (`npm run build`)
5. **Deploy frontend** (automatic)
6. **Update live URL** (automatic)

## Troubleshooting

### Build Fails: "Unable to locate credentials"

**Solution**: Ensure the Amplify service role has proper permissions.

1. Go to IAM Console
2. Find the role: `amplifyconsole-backend-role`
3. Ensure it has `AdministratorAccess-Amplify` policy

### Build Fails: "ENOENT: no such file or directory, open 'amplify_outputs.json'"

**Solution**: The backend needs to be deployed before the frontend.

1. Ensure `amplify.yml` has the backend build phase
2. Check that `npx ampx pipeline-deploy` runs successfully

### Cookies Not Working in Production

**Solution**: Ensure secure cookie settings.

1. Check that `Secure` flag is set to `true` in production
2. Verify the app is served over HTTPS (Amplify does this automatically)
3. Check `SameSite` attribute is set correctly

### Environment Mismatch

**Solution**: Each branch should have its own backend environment.

- `main` branch → `main` backend
- `dev` branch → `dev` backend
- Feature branches → `sandbox` backend

## Monitoring and Logs

### View Build Logs
1. Go to Amplify Console
2. Select your app
3. Click on a build
4. View **Provision**, **Build**, **Deploy**, **Verify** logs

### View Application Logs
1. In Amplify Console
2. Go to **Monitoring**
3. Click **"View in CloudWatch"**

### View Backend Logs
1. Go to CloudWatch Console
2. Find log groups: `/aws/lambda/amplify-*`

## Rollback

If a deployment fails or has issues:

1. In Amplify Console, go to **App settings** → **Build history**
2. Find a successful previous build
3. Click **"Redeploy this version"**

## Security Checklist for Production

- [ ] Enable HTTPS (automatic with Amplify)
- [ ] Set HttpOnly cookies (✅ already implemented)
- [ ] Configure CORS properly
- [ ] Enable AWS WAF for Amplify app
- [ ] Set up CloudWatch alarms
- [ ] Enable AWS CloudTrail for audit logs
- [ ] Review IAM permissions
- [ ] Enable MFA for AWS account
- [ ] Set up budget alerts

## Cost Optimization

### Amplify Hosting Costs:
- Build minutes: First 1,000 minutes/month free
- Hosting: First 15 GB served/month free
- Data transfer: First 15 GB/month free

### Cognito Costs:
- MAU (Monthly Active Users): First 50,000 free

### Tips:
- Use branch previews only when needed
- Delete old branches
- Optimize build time
- Enable caching

## Useful Commands

```bash
# View backend status
npx ampx sandbox

# Deploy backend manually
npx ampx pipeline-deploy --branch main --app-id YOUR_APP_ID

# Generate outputs for a branch
npx ampx generate outputs --branch main --app-id YOUR_APP_ID

# View Amplify app info
aws amplify get-app --app-id YOUR_APP_ID

# List Amplify apps
aws amplify list-apps
```

## Next Steps After Deployment

1. **Set up monitoring**
   - CloudWatch alarms for errors
   - Budget alerts

2. **Configure custom domain**
   - Add your domain
   - Set up DNS

3. **Enable branch previews** (optional)
   - Automatic deployments for PRs
   - Preview URLs for testing

4. **Set up staging environment**
   - Create `dev` branch
   - Connect to separate backend

## Support Resources

- [Amplify Gen2 Documentation](https://docs.amplify.aws/nextjs/)
- [Amplify Hosting Guide](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [AWS Amplify Discord](https://discord.gg/amplify)
- [GitHub Issues](https://github.com/aws-amplify/amplify-js/issues)


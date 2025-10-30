# Setup Checklist ✅

Use this checklist to ensure everything is properly configured.

## Prerequisites ✅

- [x] Node.js v20+ installed (`node --version`)
- [x] npm installed (`npm --version`)
- [x] AWS CLI installed (`aws --version`)
- [x] Git installed (`git --version`)
- [x] Next.js application created
- [x] Git repository initialized

## Amplify Backend Configuration ✅

- [x] Amplify packages installed
- [x] `amplify/backend.ts` created
- [x] `amplify/auth/resource.ts` configured
- [x] `.gitignore` updated for Amplify
- [ ] **AWS credentials configured** (`aws configure`)
- [ ] **Backend deployed** (`npx ampx sandbox`)
- [ ] **amplify_outputs.json generated**

## Application Code ✅

- [x] Server-side utilities (`lib/amplify-server-utils.ts`)
- [x] Client-side configuration (`lib/amplify-utils.ts`)
- [x] Middleware for route protection (`middleware.ts`)
- [x] Authentication Server Actions (`actions/auth-actions.ts`)
- [x] Login page (`app/login/page.tsx`)
- [x] Signup page with verification (`app/signup/page.tsx`)
- [x] Protected dashboard (`app/dashboard/page.tsx`)
- [x] Landing page (`app/page.tsx`)
- [x] Root layout with Amplify config (`app/layout.tsx`)

## Deployment Configuration ✅

- [x] `amplify.yml` for CI/CD pipeline
- [x] `README.md` with documentation
- [x] `DEPLOYMENT.md` with deployment guide
- [x] `QUICKSTART.md` for quick setup
- [x] Setup script (`scripts/setup.sh`)

## Next Steps (Requires Your Action) 📋

### 1. Configure AWS Credentials

```bash
aws configure
```

You'll need:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)

**Get credentials**: [AWS IAM Console](https://console.aws.amazon.com/iam/) → Users → Security Credentials

### 2. Deploy Amplify Backend

```bash
npx ampx sandbox
```

This will:
- ✅ Create AWS Cognito User Pool
- ✅ Generate `amplify_outputs.json`
- ✅ Set up authentication resources

**Expected output**:
```
✅ Deployed: [Auth] AuthStack
✅ Backend is ready!
```

### 3. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and:
- ✅ Sign up with your email
- ✅ Verify email with code
- ✅ Sign in
- ✅ Access dashboard
- ✅ Verify HttpOnly cookies in DevTools

### 4. Push to GitHub

```bash
# Create a repository on GitHub first
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 5. Deploy to AWS Amplify Hosting

**Option A: AWS Console**
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Select GitHub and authorize
4. Choose your repository and branch
5. Review settings (amplify.yml auto-detected)
6. Click "Save and deploy"

**Option B: Amplify CLI**
```bash
npm install -g @aws-amplify/cli
amplify configure
amplify add hosting
amplify publish
```

## Verification Checklist 🔍

After deployment, verify:

### Security
- [ ] Cookies have `HttpOnly` flag (DevTools → Application → Cookies)
- [ ] Cookies have `Secure` flag (on HTTPS)
- [ ] Authentication tokens not visible in localStorage/sessionStorage
- [ ] Unauthenticated users redirected from `/dashboard`

### Functionality
- [ ] Sign up flow works
- [ ] Email verification works
- [ ] Sign in works
- [ ] Sign out works
- [ ] Protected routes redirect properly
- [ ] User information displays on dashboard

### AWS Resources
- [ ] Cognito User Pool created (AWS Console → Cognito)
- [ ] App Client configured
- [ ] Email verification enabled
- [ ] Password policy enforced

### Deployment
- [ ] GitHub repository connected
- [ ] Amplify app created
- [ ] Build succeeds
- [ ] App accessible via Amplify URL
- [ ] Environment variables set (if any)

## Troubleshooting Common Issues 🔧

### Backend Deployment Issues

**Issue**: "Unable to locate credentials"
```bash
# Fix: Configure AWS credentials
aws configure
```

**Issue**: "Access Denied"
```bash
# Fix: Ensure your AWS user has required permissions
# Required: Cognito, CloudFormation, IAM, S3
```

### Build Issues

**Issue**: "amplify_outputs.json not found"
```bash
# Fix: Deploy backend first
npx ampx sandbox
```

**Issue**: "Module not found: @aws-amplify/adapter-nextjs"
```bash
# Fix: Install dependencies
npm install
```

### Authentication Issues

**Issue**: "Verification email not received"
- Check spam folder
- Verify email configuration in Cognito Console
- For testing: Manually confirm user in Cognito Console

**Issue**: "Invalid session"
- Clear cookies
- Sign out and sign in again
- Verify backend is deployed

## Environment Variables 📝

This application doesn't require manual environment variables. Configuration is handled through `amplify_outputs.json` which is automatically generated.

If you need custom environment variables:
1. Add them to `.env.local` (for local development)
2. Add them in Amplify Console → Environment Variables (for production)

## Monitoring & Logs 📊

### Local Development
```bash
# View Next.js logs
npm run dev

# View Amplify sandbox logs
npx ampx sandbox --watch
```

### Production
- **Application Logs**: Amplify Console → Hosting → Logs
- **Backend Logs**: CloudWatch → Log Groups
- **Cognito Logs**: Cognito Console → User Pool → Monitoring

## Cost Estimation 💰

### AWS Free Tier (First 12 months)
- **Cognito**: 50,000 MAUs free
- **Amplify Hosting**: 1,000 build minutes/month, 15 GB served/month
- **CloudFormation**: No charge
- **Lambda**: 1M requests/month (if using functions)

### Beyond Free Tier
- **Cognito**: $0.00550 per MAU after 50,000
- **Amplify Hosting**: $0.01 per build minute, $0.15 per GB served
- **Estimate**: ~$5-10/month for small apps with < 1000 users

## Support Resources 📚

- **Documentation**: See README.md, DEPLOYMENT.md, QUICKSTART.md
- **AWS Amplify Docs**: https://docs.amplify.aws/
- **Next.js Docs**: https://nextjs.org/docs
- **Cognito Docs**: https://docs.aws.amazon.com/cognito/
- **Discord**: https://discord.gg/amplify
- **GitHub Issues**: Create issue in your repository

## Success Criteria 🎯

Your setup is complete when:

✅ Backend deployed to AWS  
✅ Local development server runs without errors  
✅ Can sign up new users  
✅ Email verification works  
✅ Can sign in and access dashboard  
✅ HttpOnly cookies are set  
✅ Protected routes redirect properly  
✅ Code pushed to GitHub  
✅ Amplify Hosting deployed  
✅ Production URL is accessible  

## Next Development Steps 🚀

Once setup is complete, consider:

1. **Add API**: Create GraphQL or REST endpoints
2. **Add Database**: Integrate DynamoDB for data persistence
3. **Add Storage**: Set up S3 for file uploads
4. **Add Functions**: Create serverless Lambda functions
5. **Customize UI**: Enhance design and user experience
6. **Add Analytics**: Track user behavior
7. **Add Testing**: Write unit and integration tests
8. **Add Monitoring**: Set up error tracking (Sentry, etc.)
9. **Add CI/CD**: Enhance deployment pipeline
10. **Add Custom Domain**: Use your own domain name

---

**Estimated Setup Time**: 15-20 minutes  
**Difficulty Level**: Intermediate  
**Prerequisites Knowledge**: Basic React, Git, AWS familiarity helpful


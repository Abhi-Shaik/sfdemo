# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2024-10-31

### Added
- ✅ Server-side authentication with HttpOnly cookies via API Route Handlers
- ✅ Safari/WebKit HTTPS development support (`npm run dev:https`)
- ✅ Comprehensive documentation for HttpOnly cookies implementation
- ✅ Amplify SSR best practices documentation
- ✅ Safari/WebKit secure cookie limitation guide

### Changed
- 🔄 Migrated from Server Actions to API Route Handlers for authentication
- 🔄 Simplified Amplify configuration to use only `{ ssr: true }` flag
- 🔄 Removed manual CookieStorage overrides (Amplify handles it)
- 🔄 Fixed middleware to use proper import path

### Fixed
- ✅ HttpOnly cookie persistence after sign-in
- ✅ Proper server-side cookie handling with `runWithAmplifyServerContext`
- ✅ Safari/WebKit secure cookie issues on HTTP localhost

### Documentation
- 📝 `HTTPONLY_COOKIES_EXPLAINED.md` - Deep dive into HttpOnly cookie implementation
- 📝 `SAFARI_WEBKIT_LIMITATION.md` - Safari/WebKit secure cookie limitation and solutions
- 📝 `AMPLIFY_SSR_BEST_PRACTICES.md` - Comprehensive Amplify SSR patterns
- 📝 Updated `README.md` with Safari HTTPS development instructions

### Security
- 🔒 HttpOnly cookies prevent XSS attacks on authentication tokens
- 🔒 Secure flag enabled in production (HTTPS)
- 🔒 SameSite: Lax for CSRF protection
- 🔒 Server-side only token handling

## [0.1.0] - 2024-10-31

### Initial Release
- ✨ Next.js 15 with App Router
- ✨ AWS Amplify Gen2 authentication
- ✨ Email-based sign up with verification
- ✨ Protected dashboard page
- ✨ Middleware-based route protection
- ✨ Beautiful Tailwind CSS UI
- ✨ TypeScript support
- ✨ CI/CD ready with Amplify Hosting

### Architecture
- 🏗️ Server Components for protected pages
- 🏗️ Client Components for interactive forms
- 🏗️ API Route Handlers for authentication
- 🏗️ Middleware for route protection
- 🏗️ Centralized auth utilities

### AWS Integration
- ☁️ AWS Cognito User Pool
- ☁️ AWS Amplify Gen2 backend
- ☁️ Amplify Hosting CI/CD pipeline
- ☁️ CDK for infrastructure as code

---

## Version History Summary

- **v0.1.0**: Initial full-stack authentication app with Next.js + Amplify
- **Current**: Enhanced with HttpOnly cookies, Safari support, comprehensive docs

## Upcoming Features

### Planned
- [ ] Password reset functionality
- [ ] Social sign-in (Google, GitHub)
- [ ] Multi-factor authentication (MFA)
- [ ] User profile management
- [ ] Session management dashboard
- [ ] API route protection examples
- [ ] Database integration (DynamoDB)
- [ ] File upload with S3

### Under Consideration
- [ ] Role-based access control (RBAC)
- [ ] Email templates customization
- [ ] Audit logging
- [ ] Analytics integration
- [ ] Testing suite (Jest, Playwright)

---

## Migration Guides

### From Server Actions to API Routes (2024-10-31)

**Why**: HttpOnly cookies require server-side Response object manipulation, which API Route Handlers provide better support for than Server Actions.

**Changes**:
1. Authentication now uses `/api/auth/signin` route
2. Login form submits via `fetch()` instead of Server Actions
3. HttpOnly cookies are properly set by the server

**Before**:
```typescript
// Server Action approach (limited HttpOnly support)
'use server';
export async function handleSignIn(prevState: any, formData: FormData) {
  const result = await signIn({ ... });
  redirect('/dashboard');
}
```

**After**:
```typescript
// API Route Handler approach (full HttpOnly support)
export async function POST(request: NextRequest) {
  const result = await serverSignIn(email, password);
  return NextResponse.json({ success: true });
}
```

---

## Breaking Changes

None yet. This is the initial release.

---

## Contributors

- Initial development: Abhishek Bansal
- Architecture design: AI-assisted with Claude Sonnet 4.5

---

## License

This project is private and proprietary.


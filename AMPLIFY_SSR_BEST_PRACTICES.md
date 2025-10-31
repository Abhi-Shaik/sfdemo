# Amplify SSR Best Practices ✅

## What We're Doing RIGHT

This project follows AWS Amplify's recommended patterns for Server-Side Rendering (SSR) with Next.js.

## ✅ Correct Configuration Pattern

### 1. Simple SSR Flag (Recommended)

```typescript
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// ✅ This is all you need!
Amplify.configure(outputs, { ssr: true });
```

**Why this is correct:**
- Amplify automatically handles cookie storage
- Amplify sets `HttpOnly: true` on the server
- Amplify sets `Secure: true` in production
- Amplify sets `SameSite: Lax` for CSRF protection
- No manual cookie management needed

### 2. Server-Side Context Runner

```typescript
import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import outputs from '@/amplify_outputs.json';

// ✅ Create the server runner once
export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});
```

**Why this is correct:**
- Single source of truth for server operations
- Properly integrates with Next.js cookies
- Handles request/response context automatically

### 3. Server-Side Operations

```typescript
export async function serverSignIn(username: string, password: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies }, // ✅ Pass the cookies function (not awaited)
    operation: async (contextSpec) => {
      const { Amplify } = await import('aws-amplify');
      Amplify.configure(outputs, { ssr: true }); // ✅ Configure inside operation
      
      const result = await amplifySignIn({ username, password });
      
      // ✅ Force session to write cookies
      if (result.isSignedIn) {
        const { fetchAuthSession } = await import('aws-amplify/auth/server');
        await fetchAuthSession(contextSpec, { forceRefresh: true });
      }
      
      return result;
    },
  });
}
```

**Why this is correct:**
- Configures Amplify inside the operation
- Uses the `contextSpec` for auth server operations
- Forces session refresh to persist tokens in cookies

## ❌ Common Mistakes to AVOID

### 1. ❌ Manually Overriding Cookie Storage

```typescript
// ❌ DON'T DO THIS!
import { CookieStorage } from 'aws-amplify/utils';

Amplify.configure(outputs, {
  ssr: true,
  storage: new CookieStorage(), // ❌ NOT NEEDED! Amplify handles this
});
```

**Why this is wrong:**
- Amplify already manages cookies when `ssr: true` is set
- Manual override can cause conflicts
- Adds unnecessary complexity

### 2. ❌ Awaiting cookies() Before Passing to Context

```typescript
// ❌ DON'T DO THIS!
const cookieStore = await cookies();

await runWithAmplifyServerContext({
  nextServerContext: { cookies: cookieStore }, // ❌ Wrong!
  operation: async (contextSpec) => { ... },
});
```

**Why this is wrong:**
- `runWithAmplifyServerContext` expects the **function**, not the result
- Amplify needs the function to call at the right time
- This will cause errors like "unsupported Next.js server context"

**Correct way:**
```typescript
// ✅ DO THIS!
import { cookies } from 'next/headers';

await runWithAmplifyServerContext({
  nextServerContext: { cookies }, // ✅ Pass the function directly
  operation: async (contextSpec) => { ... },
});
```

### 3. ❌ Client-Side Auth with HttpOnly Cookie Expectations

```typescript
// ❌ DON'T DO THIS for HttpOnly cookies!
'use client';

import { signIn } from 'aws-amplify/auth';

const result = await signIn({ username, password });
// This will NOT set HttpOnly cookies!
```

**Why this is wrong:**
- Client-side JavaScript CANNOT set HttpOnly cookies
- Only the server can set HttpOnly flags
- This defeats the security purpose

**Correct way:**
```typescript
// ✅ DO THIS for HttpOnly cookies!
// Use API Route Handler (server-side)
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const result = await serverSignIn(email, password);
  // HttpOnly cookies are set by the server
  return NextResponse.json({ success: true });
}
```

### 4. ❌ Not Using `fetchAuthSession` After Sign In

```typescript
// ❌ Incomplete - May not persist cookies
await runWithAmplifyServerContext({
  nextServerContext: { cookies },
  operation: async (contextSpec) => {
    const result = await signIn({ username, password });
    return result; // ❌ Cookies might not be written yet!
  },
});
```

**Correct way:**
```typescript
// ✅ Force session to write cookies
await runWithAmplifyServerContext({
  nextServerContext: { cookies },
  operation: async (contextSpec) => {
    const result = await signIn({ username, password });
    
    if (result.isSignedIn) {
      // ✅ This ensures tokens are written to cookies
      await fetchAuthSession(contextSpec, { forceRefresh: true });
    }
    
    return result;
  },
});
```

## Our Project Structure

### ✅ Client-Side Configuration
**File**: `components/amplify-provider.tsx`
```typescript
Amplify.configure(outputs, { ssr: true });
```
- Runs once on client mount
- Enables SSR mode for client operations

### ✅ Server-Side Utilities
**File**: `lib/amplify-server-client.ts`
- Exports `runWithAmplifyServerContext`
- Wraps all auth operations
- Handles cookie management automatically

### ✅ API Route Handlers
**File**: `app/api/auth/signin/route.ts`
- Performs server-side authentication
- Sets HttpOnly cookies
- Returns JSON response to client

### ✅ Middleware
**File**: `middleware.ts`
- Uses `runWithAmplifyServerContext` with `{ request, response }`
- Checks authentication status from cookies
- Protects routes server-side

## Testing Your Configuration

### ✅ Verify HttpOnly Cookies

1. Sign in to your application
2. Open DevTools → Application/Storage → Cookies
3. Check for cookies like `CognitoIdentityServiceProvider.*`
4. Verify:
   - ✅ `HttpOnly` column shows a checkmark
   - ✅ `Secure` shows checkmark (if using HTTPS)
   - ✅ `SameSite` is `Lax` or `Strict`

### ✅ Verify JavaScript Cannot Access Tokens

1. Open browser console
2. Type: `document.cookie`
3. Verify: Auth tokens are NOT visible (only non-HttpOnly cookies show)

### ✅ Verify Middleware Protection

1. Visit `/dashboard` without being logged in
2. Should redirect to `/login`
3. After login, `/dashboard` should be accessible

## Official Amplify References

1. **[Amplify Gen2 SSR Documentation](https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/)**
   - Official SSR setup guide
   - Recommended patterns

2. **[Amplify Next.js Adapter](https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/#server-side-amplify-utilities)**
   - `createServerRunner` API
   - `runWithAmplifyServerContext` usage

3. **[GitHub Discussion on SSR Configuration](https://github.com/aws-amplify/amplify-js/discussions/12856)**
   - Community best practices
   - Common pitfalls

## Summary Checklist

- ✅ Use `{ ssr: true }` flag (no manual cookie storage)
- ✅ Pass `cookies` function (not awaited result)
- ✅ Configure Amplify inside `runWithAmplifyServerContext` operations
- ✅ Use `fetchAuthSession(contextSpec, { forceRefresh: true })` after sign in
- ✅ Use API Route Handlers for authentication (not client-side auth)
- ✅ Use `npm run dev:https` for Safari/WebKit development
- ✅ Verify HttpOnly flags in browser DevTools

## Our Configuration Status

| Component | Status | Notes |
|-----------|--------|-------|
| SSR Flag | ✅ | Using `{ ssr: true }` everywhere |
| Cookie Storage | ✅ | NOT manually overriding |
| Server Runner | ✅ | Single `createServerRunner` instance |
| Auth Operations | ✅ | All wrapped in `runWithAmplifyServerContext` |
| HttpOnly Cookies | ✅ | Set via API Route Handlers |
| Middleware | ✅ | Proper context with `{ request, response }` |
| Safari Support | ✅ | `npm run dev:https` available |

**Conclusion**: Our implementation follows all Amplify SSR best practices! 🎉


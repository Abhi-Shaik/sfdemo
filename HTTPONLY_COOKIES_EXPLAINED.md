# HttpOnly Cookies Implementation

## Why HttpOnly Cookies Matter

**HttpOnly cookies** are cookies that:
- ✅ Can ONLY be set and read by the server
- ✅ Are NOT accessible to JavaScript (`document.cookie`)
- ✅ Prevent XSS (Cross-Site Scripting) attacks
- ✅ Are automatically sent with every HTTP request to the domain

## Why Client-Side Authentication Cannot Use HttpOnly Cookies

When you authenticate using **client-side JavaScript** (e.g., calling Amplify directly from a React component):

```typescript
// ❌ This CANNOT set HttpOnly cookies
import { signIn } from 'aws-amplify/auth';

const result = await signIn({ username, password });
// Tokens are stored in localStorage or regular cookies (accessible to JavaScript)
```

**Problem**: JavaScript running in the browser CANNOT set the `HttpOnly` flag on cookies. Only the server can do this.

## Our Solution: API Route Handler

We use **Next.js API Route Handlers** to authenticate on the server-side:

### Architecture Flow:

```
Client (Browser)
    ↓
    | POST /api/auth/signin
    | { email, password }
    ↓
API Route Handler (Server)
    ↓
    | Uses runWithAmplifyServerContext
    | with Next.js cookies() function
    ↓
AWS Cognito (via Amplify)
    ↓
    | Returns tokens
    ↓
API Route Handler (Server)
    ↓
    | Sets cookies with HttpOnly=true
    | Sets cookies with Secure=true
    | Sets cookies with SameSite=Lax
    ↓
Response to Client
    ↓
Browser stores HttpOnly cookies
(JavaScript CANNOT access them)
```

## Implementation Details

### 1. API Route Handler (`app/api/auth/signin/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { serverSignIn } from '@/lib/amplify-server-client';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  // This runs on the server
  const result = await serverSignIn(email, password);
  
  // Amplify automatically sets HttpOnly cookies via the cookies() function
  return NextResponse.json({ success: true });
}
```

### 2. Server-Side Auth Function (`lib/amplify-server-client.ts`)

```typescript
export async function serverSignIn(username: string, password: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies }, // ← This is the Next.js cookies() function
    operation: async (contextSpec) => {
      Amplify.configure(outputs, { ssr: true });
      
      const signInResult = await amplifySignIn({ username, password });
      
      if (signInResult.isSignedIn) {
        // Force session to write cookies
        await fetchAuthSession(contextSpec, { forceRefresh: true });
      }
      
      return signInResult;
    },
  });
}
```

**Key**: When `runWithAmplifyServerContext` receives the `cookies` function from `next/headers`, it can:
- Set `HttpOnly: true`
- Set `Secure: true` (in production)
- Set `SameSite: Lax`
- Store access token, ID token, refresh token

### 3. Client-Side Login Form (`app/login/page.tsx`)

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  // Call our API route (which handles auth on the server)
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // ← Important: Include cookies in request/response
  });
  
  const data = await response.json();
  
  if (data.success) {
    router.push('/dashboard'); // Cookies are now set!
  }
};
```

## Verifying HttpOnly Cookies

To verify that HttpOnly cookies are being set correctly:

1. Open your browser DevTools
2. Go to **Application** (Chrome) or **Storage** (Firefox) tab
3. Navigate to **Cookies** → `http://localhost:3000`
4. Look for Amplify cookies (e.g., `CognitoIdentityServiceProvider.*`)
5. Check that the **HttpOnly** column shows a ✓ checkmark

### Example Cookie Attributes:

```
Name: CognitoIdentityServiceProvider.xxx.accessToken
Value: eyJraWQiOiJ... (JWT token)
Domain: localhost
Path: /
Expires: (session or timestamp)
HttpOnly: ✓  ← This is the critical flag
Secure: ✓ (only in production/HTTPS)
SameSite: Lax
```

## Why This Is Secure

1. **XSS Protection**: Even if an attacker injects malicious JavaScript into your site, they CANNOT read the authentication tokens because `document.cookie` won't show HttpOnly cookies.

2. **CSRF Protection**: The `SameSite: Lax` attribute prevents cookies from being sent with cross-site requests (in most cases).

3. **Secure Transport**: In production, `Secure: true` ensures cookies are only sent over HTTPS.

## Key Differences: Server Actions vs. API Routes

| Feature | Server Actions | API Routes |
|---------|---------------|------------|
| HttpOnly Cookies | Limited support | ✅ Full support |
| Cookie Control | Via `cookies()` | Via `NextResponse.cookies` |
| Best For | Form submissions | Authentication APIs |
| Our Choice | ❌ Not used for auth | ✅ Used for auth |

## Testing Checklist

- [ ] Sign up a new user
- [ ] Confirm the user with the code
- [ ] Sign in with correct credentials
- [ ] Open DevTools → Application → Cookies
- [ ] Verify `HttpOnly` flag is checked for Amplify cookies
- [ ] Try accessing cookies via JavaScript console: `document.cookie` (should NOT show auth tokens)
- [ ] Navigate to `/dashboard` (should show user info)
- [ ] Refresh the page (should remain logged in)
- [ ] Sign out (cookies should be cleared)

## Common Issues & Solutions

### Issue: "Cannot read cookies on client-side"
**Expected**: HttpOnly cookies are NOT readable by client-side JavaScript. This is by design for security.

### Issue: "Cookies not persisting"
**Solution**: Ensure `credentials: 'include'` is set in the fetch request.

### Issue: "Middleware not detecting authentication"
**Solution**: Ensure middleware uses `runWithAmplifyServerContext` with `{ request, response }` context.

## References

- [Next.js Cookies Documentation](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [AWS Amplify Gen2 Authentication](https://docs.amplify.aws/nextjs/build-a-backend/auth/)
- [Amplify Next.js Adapter](https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/)
- [OWASP HttpOnly Cookie Guide](https://owasp.org/www-community/HttpOnly)


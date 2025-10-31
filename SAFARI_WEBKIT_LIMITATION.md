# Safari/WebKit Secure Cookie Limitation

## The Problem

**WebKit-based browsers (Safari, iOS Safari, etc.) have a limitation**: They cannot operate cookies with the `Secure` flag when using a local development server running on the **HTTP protocol** (e.g., `http://localhost:3000`).

### What This Means:
- ✅ Chrome/Firefox: Work fine with secure cookies on `http://localhost`
- ❌ Safari/WebKit: **Cannot** use secure cookies on `http://localhost`
- ✅ All browsers: Work fine with secure cookies on `https://` (production or local HTTPS)

### Why It Matters for Amplify Auth:
AWS Amplify sets cookies with the `Secure` flag when `process.env.NODE_ENV === 'production'` or when using HTTPS. On Safari with HTTP localhost, these cookies will be **blocked/ignored**.

## The Solution: Local HTTPS Development

Next.js 15+ provides built-in support for running a local HTTPS development server.

### Option 1: Run with HTTPS (Recommended for Safari users)

```bash
npm run dev:https
```

This will:
- Start Next.js with `--experimental-https` flag
- Auto-generate self-signed certificates
- Run on `https://localhost:3000` instead of `http://localhost:3000`

**Note**: Your browser will show a security warning about the self-signed certificate. This is expected and safe for local development.

#### Accept the Self-Signed Certificate:

**Safari:**
1. Open `https://localhost:3000`
2. Click "Show Details" or "Advanced"
3. Click "Visit this website"
4. Confirm you want to proceed

**Chrome:**
1. Open `https://localhost:3000`
2. Click "Advanced"
3. Click "Proceed to localhost (unsafe)"

### Option 2: Regular HTTP (Works for Chrome/Firefox)

```bash
npm run dev
```

This works fine for most browsers except Safari/WebKit.

## Our Current Configuration

### ✅ We're Following Best Practices:

1. **Using `{ ssr: true }` flag** (as recommended by Amplify)
   ```typescript
   Amplify.configure(outputs, { ssr: true });
   ```

2. **Using `createServerRunner`** for server-side operations
   ```typescript
   export const { runWithAmplifyServerContext } = createServerRunner({
     config: outputs,
   });
   ```

3. **NOT manually overriding CookieStorage** (Amplify handles it)

4. **Server-side auth via API Routes** (sets HttpOnly cookies properly)

### Why `{ ssr: true }` Is Sufficient:

When you configure Amplify with `{ ssr: true }`:
- ✅ Amplify automatically uses the appropriate cookie storage adapter
- ✅ Cookies are configured with `HttpOnly: true` on the server
- ✅ Cookies are configured with `Secure: true` in production
- ✅ Cookies are configured with `SameSite: Lax` for CSRF protection
- ✅ No need to manually override `CookieStorage`

## Code Verification

### Client-Side Configuration (components/amplify-provider.tsx)
```typescript
Amplify.configure(outputs, {
  ssr: true,  // ✅ This is all you need!
});
```

### Server-Side Configuration (lib/amplify-server-client.ts)
```typescript
// Inside runWithAmplifyServerContext operations
Amplify.configure(outputs, { ssr: true });  // ✅ Correct!
```

### Cookie Storage Adapter
```typescript
// ❌ DON'T DO THIS (Amplify handles it automatically with ssr: true)
import { CookieStorage } from 'aws-amplify/utils';
Amplify.configure(outputs, {
  ssr: true,
  storage: new CookieStorage(), // ❌ Not needed!
});

// ✅ DO THIS (Simple and correct)
Amplify.configure(outputs, { ssr: true });
```

## Testing on Different Browsers

### Chrome/Firefox (HTTP localhost - works fine):
```bash
npm run dev
# Open http://localhost:3000
```

1. Sign up and sign in
2. Open DevTools → Application → Cookies
3. Verify cookies are set with `HttpOnly: ✓`
4. Verify authentication works

### Safari (Requires HTTPS localhost):
```bash
npm run dev:https
# Open https://localhost:3000
```

1. Accept the self-signed certificate warning
2. Sign up and sign in
3. Open DevTools → Storage → Cookies
4. Verify cookies are set with `HttpOnly: ✓` and `Secure: ✓`
5. Verify authentication works

## Production Deployment

In production (on Amplify Hosting or Vercel with HTTPS):
- ✅ All browsers work perfectly
- ✅ Cookies have `Secure: true` automatically
- ✅ Cookies have `HttpOnly: true` automatically
- ✅ No WebKit limitations

## Environment-Specific Cookie Behavior

| Environment | Protocol | Secure Flag | Works on Safari? |
|-------------|----------|-------------|------------------|
| Local Dev (HTTP) | `http://` | `false` or not set | ⚠️ May have issues |
| Local Dev (HTTPS) | `https://` | `true` | ✅ Yes |
| Production | `https://` | `true` | ✅ Yes |

## Troubleshooting

### Problem: "Authentication works on Chrome but not Safari"
**Solution**: Use `npm run dev:https` when developing with Safari

### Problem: "Certificate warning on https://localhost"
**Solution**: This is expected for self-signed certificates. Click "Advanced" → "Proceed to localhost"

### Problem: "Cookies not being set in Safari"
**Solution**: 
1. Check if you're using HTTPS (`https://localhost:3000`)
2. Verify cookies in DevTools → Storage → Cookies
3. Check browser console for cookie-related errors

### Problem: "Still having issues with Safari"
**Workaround**: 
1. Disable "Prevent cross-site tracking" in Safari Preferences → Privacy
2. Clear all cookies and website data
3. Restart Safari and try again

## Recommended Development Workflow

### For Team with Mixed Browsers:

```bash
# Chrome/Firefox users:
npm run dev

# Safari users:
npm run dev:https
```

### For CI/CD and Production:
Always uses HTTPS automatically, so no special configuration needed.

## References

- [Next.js HTTPS in Local Development](https://nextjs.org/docs/app/api-reference/next-cli#--experimental-https)
- [WebKit Secure Cookie Limitation](https://github.com/aws-amplify/amplify-js/issues/11844)
- [Amplify SSR Configuration](https://docs.amplify.aws/nextjs/build-a-backend/server-side-rendering/)
- [OWASP Secure Cookie Guidelines](https://owasp.org/www-community/controls/SecureCookieAttribute)

## Summary

✅ **We're following Amplify's recommended SSR pattern**
✅ **Using `{ ssr: true }` is sufficient** (no manual CookieStorage override needed)
✅ **Added `npm run dev:https`** for Safari/WebKit development
✅ **HttpOnly cookies are properly configured**
⚠️ **Safari users**: Use HTTPS in local development


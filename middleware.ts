import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from '@/lib/amplify-server-utils';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens !== undefined;
      } catch (error) {
        // Log error details for debugging
        console.error('Auth session error:', error);
        return false;
      }
    },
  });

  if (authenticated) {
    // User is authenticated, allow access to protected routes
    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
      // Redirect authenticated users away from login/signup pages
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return response;
  }

  // User is not authenticated
  if (
    request.nextUrl.pathname !== '/login' &&
    request.nextUrl.pathname !== '/signup' &&
    request.nextUrl.pathname !== '/'
  ) {
    // Redirect to login for protected routes
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)',
  ],
};


import { NextRequest, NextResponse } from 'next/server';
import { serverSignIn } from '@/lib/amplify-server-client';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Perform sign in using our server-side auth function
    const result = await serverSignIn(email, password);

    if (result && result.isSignedIn) {
      return NextResponse.json({ 
        success: true, 
        message: 'Sign in successful' 
      });
    }

    return NextResponse.json(
      { success: false, message: 'Sign in failed' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}


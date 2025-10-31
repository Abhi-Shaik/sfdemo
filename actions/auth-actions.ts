'use server';

import { serverSignUp, serverConfirmSignUp, serverSignIn, serverSignOut, serverResendSignUpCode } from '@/lib/amplify-server-client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function handleSignUp(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { isSignUpComplete, userId, nextStep } = await serverSignUp(email, password, email);

    return {
      success: true,
      message: 'Sign up successful! Please check your email for verification code.',
      userId,
      nextStep: nextStep.signUpStep,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to sign up',
    };
  }
}

export async function handleConfirmSignUp(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const code = formData.get('code') as string;

    await serverConfirmSignUp(email, code);

    return {
      success: true,
      message: 'Email verified successfully! You can now sign in.',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to confirm sign up',
    };
  }
}

export async function handleSignIn(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await serverSignIn(email, password);

    if (result?.isSignedIn) {
      // Revalidate paths to clear any cached auth state
      revalidatePath('/', 'layout');
      revalidatePath('/dashboard');
      
      // Redirect to dashboard
      redirect('/dashboard');
    }

    return {
      success: false,
      message: 'Sign in failed - authentication incomplete',
    };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return {
      success: false,
      message: error.message || 'Failed to sign in. Please check your credentials.',
    };
  }
}

export async function handleSignOut() {
  try {
    await serverSignOut();
    
    // Revalidate to clear cached auth state
    revalidatePath('/', 'layout');
    
    redirect('/login');
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to sign out',
    };
  }
}

export async function handleResendCode(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;

    await serverResendSignUpCode(email);

    return {
      success: true,
      message: 'Verification code resent successfully!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to resend code',
    };
  }
}


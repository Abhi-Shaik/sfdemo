'use server';

import { signUp, confirmSignUp, resendSignUpCode, signIn, signOut } from 'aws-amplify/auth';
import { runWithAmplifyServerContext } from '@/lib/amplify-server-utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleSignUp(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
        autoSignIn: true,
      },
    });

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

    await confirmSignUp({
      username: email,
      confirmationCode: code,
    });

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

    const { isSignedIn } = await signIn({
      username: email,
      password,
    });

    if (isSignedIn) {
      redirect('/dashboard');
    }

    return {
      success: false,
      message: 'Sign in failed',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to sign in',
    };
  }
}

export async function handleSignOut() {
  try {
    await signOut();
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

    await resendSignUpCode({
      username: email,
    });

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


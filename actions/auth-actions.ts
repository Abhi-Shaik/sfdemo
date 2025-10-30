'use server';

import { signIn, signUp, signOut, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/lib/amplify-server-utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleSignUp(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { isSignUpComplete, userId, nextStep } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) =>
        signUp(contextSpec, {
          username: email,
          password,
          options: {
            userAttributes: {
              email,
            },
            autoSignIn: true,
          },
        }),
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

    await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) =>
        confirmSignUp(contextSpec, {
          username: email,
          confirmationCode: code,
        }),
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

    const { isSignedIn } = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) =>
        signIn(contextSpec, {
          username: email,
          password,
        }),
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
    await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => signOut(contextSpec),
    });

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

    await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) =>
        resendSignUpCode(contextSpec, {
          username: email,
        }),
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


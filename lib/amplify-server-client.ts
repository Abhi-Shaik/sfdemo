import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { signUp, confirmSignUp, signIn, signOut, resendSignUpCode } from 'aws-amplify/auth';
import { cookies } from 'next/headers';
import outputs from '@/amplify_outputs.json';

// Create server runner with Amplify configuration
// This handles all the configuration automatically
export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

// Server-side auth wrapper functions
// runWithAmplifyServerContext provides the context automatically
// Auth functions work within the operation without needing contextSpec parameter
export async function serverSignUp(username: string, password: string, email: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      return await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });
    },
  });
}

export async function serverConfirmSignUp(username: string, confirmationCode: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      return await confirmSignUp({
        username,
        confirmationCode,
      });
    },
  });
}

export async function serverSignIn(username: string, password: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const result = await signIn({
        username,
        password,
      });
      
      return result;
    },
  });
}

export async function serverSignOut() {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      return await signOut();
    },
  });
}

export async function serverResendSignUpCode(username: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      return await resendSignUpCode({
        username,
      });
    },
  });
}


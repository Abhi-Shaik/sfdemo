import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { signUp, confirmSignUp, signIn, signOut, resendSignUpCode } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import outputs from '@/amplify_outputs.json';

// Create server runner with Amplify configuration
// This handles all the configuration automatically
export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

// Server-side auth wrapper functions
// IMPORTANT: Pass contextSpec to all auth functions for server-side operations
export async function serverSignUp(username: string, password: string, email: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      // Pass contextSpec as first parameter for server-side auth
      return await signUp(contextSpec, {
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
      return await confirmSignUp(contextSpec, {
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
      const result = await signIn(contextSpec, {
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
      return await signOut(contextSpec);
    },
  });
}

export async function serverResendSignUpCode(username: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      return await resendSignUpCode(contextSpec, {
        username,
      });
    },
  });
}


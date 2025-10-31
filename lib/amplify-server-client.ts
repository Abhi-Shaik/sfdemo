import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { cookies } from 'next/headers';
import outputs from '@/amplify_outputs.json';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

// Server-side auth wrapper functions
export async function serverSignUp(username: string, password: string, email: string) {
  const { signUp } = await import('aws-amplify/auth');
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const result = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
        },
      });
      return result;
    },
  });
}

export async function serverConfirmSignUp(username: string, confirmationCode: string) {
  const { confirmSignUp } = await import('aws-amplify/auth');
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const result = await confirmSignUp({
        username,
        confirmationCode,
      });
      return result;
    },
  });
}

export async function serverSignIn(username: string, password: string) {
  const { signIn } = await import('aws-amplify/auth');
  
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
  const { signOut } = await import('aws-amplify/auth');
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      await signOut();
    },
  });
}

export async function serverResendSignUpCode(username: string) {
  const { resendSignUpCode } = await import('aws-amplify/auth');
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const result = await resendSignUpCode({
        username,
      });
      return result;
    },
  });
}


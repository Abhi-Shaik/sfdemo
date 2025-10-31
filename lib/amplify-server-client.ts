import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { signUp as amplifySignUp, confirmSignUp as amplifyConfirmSignUp, signIn as amplifySignIn, signOut as amplifySignOut, resendSignUpCode as amplifyResendSignUpCode } from 'aws-amplify/auth';
import { cookies } from 'next/headers';
import outputs from '@/amplify_outputs.json';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

// Server-side auth wrapper functions
export async function serverSignUp(username: string, password: string, email: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      // On server, we configure Amplify with the context
      const { Amplify } = await import('aws-amplify');
      Amplify.configure(outputs, { ssr: true });
      
      return await amplifySignUp({
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
      const { Amplify } = await import('aws-amplify');
      Amplify.configure(outputs, { ssr: true });
      
      return await amplifyConfirmSignUp({
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
      const { Amplify } = await import('aws-amplify');
      Amplify.configure(outputs, { ssr: true });
      
      // Sign in and return the result
      const signInResult = await amplifySignIn({
        username,
        password,
      });
      
      // Ensure we return the full result
      return signInResult;
    },
  });
}

export async function serverSignOut() {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const { Amplify } = await import('aws-amplify');
      Amplify.configure(outputs, { ssr: true });
      
      return await amplifySignOut();
    },
  });
}

export async function serverResendSignUpCode(username: string) {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const { Amplify } = await import('aws-amplify');
      Amplify.configure(outputs, { ssr: true });
      
      return await amplifyResendSignUpCode({
        username,
      });
    },
  });
}


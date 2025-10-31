import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { signUp as amplifySignUp, confirmSignUp as amplifyConfirmSignUp, signIn as amplifySignIn, signOut as amplifySignOut, resendSignUpCode as amplifyResendSignUpCode } from 'aws-amplify/auth';
import { cookies } from 'next/headers';
import outputs from '@/amplify_outputs.json';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

// Server-side auth wrapper functions
export async function serverSignUp(username: string, password: string, email: string) {
  const cookieStore = await cookies();
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies: cookieStore },
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
  const cookieStore = await cookies();
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies: cookieStore },
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
  const cookieStore = await cookies();
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies: cookieStore },
    operation: async (contextSpec) => {
      const { Amplify } = await import('aws-amplify');
      const { fetchAuthSession } = await import('aws-amplify/auth');
      
      Amplify.configure(outputs, { ssr: true });
      
      // Perform sign in
      const signInResult = await amplifySignIn({
        username,
        password,
      });
      
      // Fetch and establish the session to ensure cookies are set
      try {
        const session = await fetchAuthSession();
        console.log('Session established:', session.tokens !== undefined);
      } catch (error) {
        console.error('Session fetch error:', error);
      }
      
      return signInResult;
    },
  });
}

export async function serverSignOut() {
  const cookieStore = await cookies();
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies: cookieStore },
    operation: async (contextSpec) => {
      const { Amplify } = await import('aws-amplify');
      Amplify.configure(outputs, { ssr: true });
      
      return await amplifySignOut();
    },
  });
}

export async function serverResendSignUpCode(username: string) {
  const cookieStore = await cookies();
  
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies: cookieStore },
    operation: async (contextSpec) => {
      const { Amplify } = await import('aws-amplify');
      Amplify.configure(outputs, { ssr: true });
      
      return await amplifyResendSignUpCode({
        username,
      });
    },
  });
}


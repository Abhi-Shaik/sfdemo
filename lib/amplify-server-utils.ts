import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { cookies } from 'next/headers';
import { amplifyConfig } from '@/lib/amplify-config';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig,
});

export async function getAuthCookies() {
  const cookieStore = await cookies();
  return cookieStore;
}


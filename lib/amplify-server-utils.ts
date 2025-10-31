import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { cookies } from 'next/headers';
import outputs from '@/amplify_outputs.json';

// Server runner uses the original Gen2 format from amplify_outputs.json
export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs,
});

export async function getAuthCookies() {
  const cookieStore = await cookies();
  return cookieStore;
}


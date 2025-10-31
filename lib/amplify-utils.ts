import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// Configure Amplify for client-side (call once)
Amplify.configure(outputs, {
  ssr: true, // Enable SSR mode
});

export function configureAmplify() {
  // Already configured above, but export function for compatibility
  return Amplify;
}


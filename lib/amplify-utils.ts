import { Amplify, ResourcesConfig } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// Configure Amplify for client-side
export function configureAmplify() {
  Amplify.configure(outputs as ResourcesConfig, {
    ssr: true, // Enable SSR mode
  });
}


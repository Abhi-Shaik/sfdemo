import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// Configure Amplify immediately when this module is imported
// This ensures configuration happens before any component tries to use it
Amplify.configure(outputs, {
  ssr: true,
});

export function configureAmplify() {
  return Amplify;
}


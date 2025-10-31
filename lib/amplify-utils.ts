import { Amplify } from 'aws-amplify';
import { amplifyConfig } from '@/lib/amplify-config';

// Configure Amplify immediately when this module is imported
// This ensures configuration happens before any component tries to use it
Amplify.configure(amplifyConfig, {
  ssr: true,
});

export function configureAmplify() {
  return Amplify;
}


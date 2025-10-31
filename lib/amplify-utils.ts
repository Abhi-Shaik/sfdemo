import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// This file is kept for backwards compatibility
// Actual configuration happens in AmplifyProvider
export function configureAmplify() {
  // Configuration is handled by AmplifyProvider
  return Amplify;
}


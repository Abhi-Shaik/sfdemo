'use client';

import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import { useEffect } from 'react';

// Configure Amplify immediately (synchronously) when this module loads
Amplify.configure(outputs, {
  ssr: true,
});

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Amplify is already configured above
    // This useEffect is just to ensure we're on client-side
    console.log('Amplify configured for client-side');
  }, []);

  return <>{children}</>;
}


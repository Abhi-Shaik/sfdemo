'use client';

import { Amplify } from 'aws-amplify';
import { amplifyConfig } from '@/lib/amplify-config';
import { useEffect, useState } from 'react';

// Configure Amplify at module load (runs once when module is first imported)
if (typeof window !== 'undefined') {
  Amplify.configure(amplifyConfig, { ssr: true });
  console.log('✅ Amplify configured on client-side with proper format');
}

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Double-check configuration on mount
    Amplify.configure(amplifyConfig, { ssr: true });
    setIsConfigured(true);
    console.log('✅ Amplify re-configured in useEffect with proper format');
  }, []);

  // Don't render children until Amplify is configured
  if (!isConfigured) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}


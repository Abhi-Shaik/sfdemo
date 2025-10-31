'use client';

import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    try {
      Amplify.configure(outputs, {
        ssr: true,
      });
      setIsConfigured(true);
    } catch (error) {
      console.error('Failed to configure Amplify:', error);
      setIsConfigured(true); // Still render children even if config fails
    }
  }, []);

  // Show loading or return children
  if (!isConfigured) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}


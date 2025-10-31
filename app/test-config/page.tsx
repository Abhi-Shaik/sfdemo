'use client';

import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

export default function TestConfigPage() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logMessages: string[] = [];
    
    try {
      logMessages.push('🔍 Testing Amplify Configuration...');
      logMessages.push('');
      
      // Check if Amplify is imported
      logMessages.push(`✓ Amplify imported: ${typeof Amplify !== 'undefined'}`);
      
      // Check outputs
      logMessages.push(`✓ Outputs loaded: ${typeof outputs !== 'undefined'}`);
      logMessages.push(`✓ Auth config exists: ${typeof outputs.auth !== 'undefined'}`);
      
      if (outputs.auth) {
        logMessages.push('');
        logMessages.push('📋 Auth Configuration:');
        logMessages.push(`  - User Pool ID: ${outputs.auth.user_pool_id}`);
        logMessages.push(`  - Region: ${outputs.auth.aws_region}`);
        logMessages.push(`  - Client ID: ${outputs.auth.user_pool_client_id}`);
      }
      
      // Try to configure
      logMessages.push('');
      logMessages.push('🔧 Configuring Amplify...');
      Amplify.configure(outputs, { ssr: true });
      logMessages.push('✅ Configuration successful!');
      
      // Check Amplify internal state
      const config = Amplify.getConfig();
      logMessages.push('');
      logMessages.push('🔍 Amplify Internal Config:');
      logMessages.push(JSON.stringify(config, null, 2));
      
    } catch (error: any) {
      logMessages.push('');
      logMessages.push(`❌ ERROR: ${error.message}`);
      logMessages.push(`Stack: ${error.stack}`);
    }
    
    setLogs(logMessages);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-8 font-mono">
      <h1 className="text-2xl mb-4">🧪 Amplify Configuration Test</h1>
      <div className="bg-black p-6 rounded-lg border border-green-400">
        {logs.map((log, i) => (
          <div key={i} className="mb-1">{log || '\u00A0'}</div>
        ))}
      </div>
    </div>
  );
}


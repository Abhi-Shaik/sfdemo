'use client';

import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import { amplifyConfig } from '@/lib/amplify-config';

export default function TestAuthPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [testing, setTesting] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const testConfiguration = () => {
    try {
      addLog('🔍 Checking Amplify configuration...');
      const config = Amplify.getConfig();
      addLog('✅ Config retrieved');
      addLog(JSON.stringify(config, null, 2));
    } catch (error: any) {
      addLog(`❌ Config error: ${error.message}`);
    }
  };

  const testSignOut = async () => {
    setTesting(true);
    try {
      addLog('');
      addLog('🔓 Signing out...');
      await signOut();
      addLog('✅ Signed out successfully!');
      addLog('You can now test sign in again.');
    } catch (error: any) {
      addLog(`❌ Sign out error: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  const checkCurrentUser = async () => {
    try {
      addLog('');
      addLog('👤 Checking current user...');
      const user = await getCurrentUser();
      addLog(`✅ User is signed in: ${user.username}`);
      addLog(`User ID: ${user.userId}`);
    } catch (error: any) {
      addLog('❌ No user signed in');
    }
  };

  const testLogin = async () => {
    setTesting(true);
    try {
      addLog('');
      addLog('🔐 Testing login with abhishekbansal9719@gmail.com...');
      
      const result = await signIn({
        username: 'abhishekbansal9719@gmail.com',
        password: 'Test@123',
      });
      
      addLog(`✅ Sign in result: ${JSON.stringify(result, null, 2)}`);
      addLog(`Is signed in: ${result.isSignedIn}`);
      addLog('');
      addLog('🎉 SUCCESS! Authentication is working!');
      
    } catch (error: any) {
      if (error.name === 'UserAlreadyAuthenticatedException') {
        addLog('');
        addLog('✅ GOOD NEWS! You are already signed in!');
        addLog('🎉 This means authentication is WORKING PERFECTLY!');
        addLog('');
        addLog('To test login again, click "Sign Out" first.');
      } else {
        addLog(`❌ Login error: ${error.message}`);
        addLog(`Error name: ${error.name}`);
        addLog(`Full error: ${JSON.stringify(error, null, 2)}`);
      }
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    addLog('✅ Component mounted');
    addLog(`✅ Window defined: ${typeof window !== 'undefined'}`);
    testConfiguration();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-8 font-mono">
      <h1 className="text-2xl mb-4">🧪 Amplify Auth Test</h1>
      
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={testConfiguration}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Test Configuration
        </button>
        <button
          onClick={checkCurrentUser}
          disabled={testing}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Check User
        </button>
        <button
          onClick={testLogin}
          disabled={testing}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Test Login'}
        </button>
        <button
          onClick={testSignOut}
          disabled={testing}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {testing ? 'Signing out...' : 'Sign Out'}
        </button>
        <button
          onClick={() => setLogs([])}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Clear Logs
        </button>
      </div>
      
      <div className="bg-black p-6 rounded-lg border border-green-400 max-h-[600px] overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-gray-500">No logs yet...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="mb-1 whitespace-pre-wrap break-words">
              {log || '\u00A0'}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


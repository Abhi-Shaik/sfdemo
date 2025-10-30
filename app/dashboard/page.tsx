import { fetchAuthSession, fetchUserAttributes } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/lib/amplify-server-utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { handleSignOut } from '@/actions/auth-actions';

export default async function DashboardPage() {
  const session = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });

  if (!session || !session.tokens) {
    redirect('/login');
  }

  const userAttributes = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => fetchUserAttributes(contextSpec),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Salesforce FullStack</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{userAttributes.email}</span>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome to your Dashboard! 🎉
              </h2>
              <p className="text-gray-600 mb-6">
                You are successfully authenticated with AWS Amplify.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-500 rounded-lg p-2">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">User Profile</h3>
                  <p className="text-sm text-gray-600">Manage your account settings</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-500 rounded-lg p-2">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Security</h3>
                  <p className="text-sm text-gray-600">Protected with HttpOnly cookies</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-500 rounded-lg p-2">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">API Access</h3>
                  <p className="text-sm text-gray-600">Connect to backend services</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Session Information</h3>
                <dl className="space-y-1">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Email:</dt>
                    <dd className="text-sm font-medium text-gray-900">{userAttributes.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">Email Verified:</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {userAttributes.email_verified ? 'Yes' : 'No'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-600">User ID:</dt>
                    <dd className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {userAttributes.sub}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


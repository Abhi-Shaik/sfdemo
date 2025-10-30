'use client';

import { useFormState } from 'react-dom';
import { handleSignIn } from '@/actions/auth-actions';
import Link from 'next/link';
import { useEffect } from 'react';

const initialState = {
  success: false,
  message: '',
};

export default function LoginPage() {
  const [state, formAction] = useFormState(handleSignIn, initialState);

  useEffect(() => {
    if (state?.message) {
      // You could use a toast library here
      console.log(state.message);
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" action={formAction}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {state?.message && (
            <div
              className={`rounded-lg p-4 ${
                state.success
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <p className="text-sm font-medium">{state.message}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02]"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}


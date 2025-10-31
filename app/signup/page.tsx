'use client';

import { useActionState } from 'react';
import { handleSignUp, handleConfirmSignUp, handleResendCode } from '@/actions/auth-actions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const initialState = {
  success: false,
  message: '',
};

export default function SignUpPage() {
  const [signUpState, signUpAction] = useActionState(handleSignUp, initialState);
  const [confirmState, confirmAction] = useActionState(handleConfirmSignUp, initialState);
  const [resendState, resendAction] = useActionState(handleResendCode, initialState);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (signUpState?.success && signUpState?.nextStep === 'CONFIRM_SIGN_UP') {
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => setNeedsConfirmation(true), 0);
    }
  }, [signUpState]);

  useEffect(() => {
    if (confirmState?.success) {
      // Redirect to login after successful confirmation
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  }, [confirmState]);

  if (needsConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify your email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We&apos;ve sent a verification code to your email
            </p>
          </div>

          <form className="mt-8 space-y-6" action={confirmAction}>
            <input type="hidden" name="email" value={email} />
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter 6-digit code"
                />
              </div>
            </div>

            {confirmState?.message && (
              <div
                className={`rounded-lg p-4 ${
                  confirmState.success
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                <p className="text-sm font-medium">{confirmState.message}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02]"
              >
                Verify Email
              </button>
            </div>
          </form>

          <form action={resendAction}>
            <input type="hidden" name="email" value={email} />
            <button
              type="submit"
              className="w-full text-sm text-purple-600 hover:text-purple-500 transition-colors"
            >
              Resend verification code
            </button>
          </form>

          {resendState?.message && (
            <div
              className={`rounded-lg p-4 ${
                resendState.success
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <p className="text-sm font-medium">{resendState.message}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" action={signUpAction}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Create a strong password"
              />
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>
          </div>

          {signUpState?.message && !needsConfirmation && (
            <div
              className={`rounded-lg p-4 ${
                signUpState.success
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              <p className="text-sm font-medium">{signUpState.message}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


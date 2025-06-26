import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOption } from '../../../lib/auth';
import { SignIn } from '@components/Auth/SignInButton';

export default async function SignInPage() {
  const session = await getServerSession(authOption);

  if (session) {
    redirect('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
        <div className="flex justify-center mb-8">
          <span className="text-3xl font-semibold text-purple-600 tracking-tight">
            Prob<span className="text-blue-600">o</span>
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Sign in to continue to your account
        </p>

        <SignIn/>

        <p className="mt-8 text-xs text-center text-gray-400">
          By continuing you agree to our{' '}
          <a href="/terms" className="underline hover:text-gray-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-gray-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

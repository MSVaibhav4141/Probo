'use client';

import { signIn } from 'next-auth/react';
import { BadgeCheck } from 'lucide-react'; // Google alternative icon

export const SignIn = () => (
  <button
    onClick={() => signIn('google')}
    className="w-full flex items-center justify-center gap-3 rounded-md border border-gray-300 py-2 px-4
               bg-white hover:bg-gray-50 transition shadow-sm focus-visible:outline-none
               focus-visible:ring-2 focus-visible:ring-purple-500"
  >
    <BadgeCheck className="w-5 h-5 text-blue-600" />
    <span className="font-medium text-gray-700">Sign in with Google</span>
  </button>
);

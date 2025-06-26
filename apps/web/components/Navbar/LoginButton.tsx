'use client';

import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-900 text-white
                 text-sm font-semibold hover:bg-gray-800 transition"
    >
      <LogIn className="w-4 h-4" />
      Login&nbsp;/&nbsp;Signup
    </button>
  );
}

'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { User } from 'next-auth'

export default function AvatarDropdown({ user }: { user: User | undefined }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-semibold">{user?.name?.[0] ?? 'U'}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md text-sm z-50">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

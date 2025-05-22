// components/Navbar/Navbar.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOption } from '../../lib/auth' 
import AvatarDropdown from './AvatarDropdown'

export default async function Navbar() {
  const session = await getServerSession(authOption)

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Probo Logo"
            width={100}
            height={40}
          />
        </Link>
        <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
        <Link href="/portfolio" className="text-sm font-medium hover:underline">Portfolio</Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-600">For 18 years and above only</span>
        <button className="px-3 py-1 rounded border text-sm font-semibold">Download App</button>
        <div className="px-3 py-1 rounded border text-sm font-semibold">₹33.51</div>

        <AvatarDropdown user={session?.user} />
      </div>
    </nav>
  )
}

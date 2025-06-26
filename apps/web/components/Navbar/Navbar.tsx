import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import AvatarDropdown from './AvatarDropdown';
import UserBalance    from './UserBalance';
import LoginButton    from './LoginButton';   // ⬅️ new
import { authOption } from '../../lib/auth';

export default async function Navbar() {
  const session = await getServerSession(authOption);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow">
      {/* ––––––– left side ––––––– */}
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image src="/logo.png" alt="Probo Logo" width={92} height={32} />
        </Link>

        {/* main nav links */}
        <Link href="/"           className="text-sm font-medium hover:underline">Home</Link>
        <Link href="/portfolio"  className="text-sm font-medium hover:underline">Portfolio</Link>
      </div>

      {/* ––––––– right side ––––––– */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-600 whitespace-nowrap">
          For 18 years and above only
        </span>

        {/* Download App */}
        <button className="px-4 py-1 rounded border border-gray-300 bg-white text-sm font-semibold 
                           hover:bg-gray-50 transition">
          Download App
        </button>

        {session ? (
          /* Logged-in: show balance + avatar */
          <>
            <UserBalance id={session.user.id} />
            <AvatarDropdown user={session.user} />
          </>
        ) : (
          /* Logged-out: show dark “Login / Signup” button */
          <LoginButton />
        )}
      </div>
    </nav>
  );
}

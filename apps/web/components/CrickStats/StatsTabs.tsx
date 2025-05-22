'use client'

import { useState } from 'react'

export default function StatsTabs({ tabs }: { tabs: Record<string, React.ReactNode> }) {
  const tabNames = Object.keys(tabs)
  const [active, setActive] = useState(tabNames[0])

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabNames.map(name => (
          <button
            key={name}
            className={`px-4 py-1 rounded-full ${name === active ? 'bg-black text-white' : 'bg-gray-100'}`}
            onClick={() => setActive(name)}
          >
            {name}
          </button>
        ))}
      </div>
      {tabs[active!]}
    </div>
  )
}

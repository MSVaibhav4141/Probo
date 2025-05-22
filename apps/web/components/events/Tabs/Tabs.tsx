'use client'
import Link from 'next/link'
import { useState } from 'react'

interface ITab {
  tabsName: string[],
  eventId: string
}

const Tabs = ({ tabsName, eventId }: ITab) => {
  const [activeTab, setActiveTab] = useState('Orderbook')

  const tabIdMap: Record<string, string> = {
    'Orderbook': 'orderbook',
    'Timeline': 'timeline',
    'Overview': 'overview'
  }

  return (
    <div className="mt-3 mb-4 top-0 z-20 ">
      <div className="flex gap-4 px-4 py-2 text-sm font-medium">
        {tabsName.map((tab) => (
          <a
            key={tab}
            href={`#${tabIdMap[tab]}`}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 border-b-2 ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
          >
            {tab}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Tabs

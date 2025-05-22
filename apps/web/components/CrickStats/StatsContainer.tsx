'use client'
import TeamStats from './TeamStats'
import SeriesStats from './SeriesStats'
import PlayerStats from './PlayerStats'
import VenueStats from './VenueStats'
import dynamic from 'next/dynamic'

const StatsTabs = dynamic(() => import('./StatsTabs'), { ssr: false })

export default function StatsContainer({ team1, team2 }: { team1: string; team2: string }) {
  return (
    <div className="mt-10 p-4 bg-white rounded-md shadow">
      <h2 className="text-lg font-semibold mb-4">Match Stats</h2>
      <StatsTabs
        tabs={{
          Team: <TeamStats team1={team1} team2={team2} />,
          Series: <SeriesStats />,
          Player: <PlayerStats />,
          Venue: <VenueStats />,
        }}
      />
    </div>
  )
}

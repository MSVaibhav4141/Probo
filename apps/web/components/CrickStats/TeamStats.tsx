import { fetchTeamStats } from '../../lib/fetchCricketData';
import dynamic from 'next/dynamic'

const PieChart = dynamic(() => import('./charts/PieChart'), { ssr: false })

export default async function TeamStats({ team1, team2 }: { team1: string; team2: string }) {
  const data = await fetchTeamStats(team1, team2)

  const chartData = [
    { name: team1, value: data[team1] },
    { name: team2, value: data[team2] },
  ]

  return (
    <div>
      <h3 className="font-semibold mb-2">Head-to-Head Record</h3>
      <PieChart data={chartData} />
    </div>
  )
}

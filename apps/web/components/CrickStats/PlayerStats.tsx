import ChartWrapper from './ChartWrapper'

export default async function PlayerStats() {
  // Mock Data: Replace with API call
  const data = [
    { name: 'Player A', runs: 450 },
    { name: 'Player B', runs: 390 },
    { name: 'Player C', runs: 300 },
  ]

  return (
    <div>
      <h3 className="font-semibold mb-2">Top Performers</h3>
      <ChartWrapper type="bar" data={data} xKey="name" yKey="runs" />
    </div>
  )
}

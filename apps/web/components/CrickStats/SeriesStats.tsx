import ChartWrapper from './ChartWrapper'

export default async function SeriesStats() {
  // Mock Data: Replace with API call
  const data = [
    { name: 'IPL 2023', wins: 8 },
    { name: 'IPL 2022', wins: 6 },
    { name: 'IPL 2021', wins: 5 },
  ]

  return (
    <div>
      <h3 className="font-semibold mb-2">Past Series Wins</h3>
      <ChartWrapper type="bar" data={data} xKey="name" yKey="wins" />
    </div>
  )
}

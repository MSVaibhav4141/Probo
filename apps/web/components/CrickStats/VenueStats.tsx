import ChartWrapper from './ChartWrapper'

export default async function VenueStats() {
  // Mock Data: Replace with API call
  const data = [
    { name: 'Wankhede', matches: 15 },
    { name: 'Eden Gardens', matches: 12 },
    { name: 'Chepauk', matches: 10 },
  ]

  return (
    <div>
      <h3 className="font-semibold mb-2">Matches at Venues</h3>
      <ChartWrapper type="bar" data={data} xKey="name" yKey="matches" />
    </div>
  )
}

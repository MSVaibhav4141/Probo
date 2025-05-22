export async function fetchTeamStats(team1: string, team2: string) {
  const res = await fetch(`https://cricbuzz-cricket.p.rapidapi.com/stats/v1/head-to-head?team1=${team1}&team2=${team2}`, {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  })
  return res.json()
}

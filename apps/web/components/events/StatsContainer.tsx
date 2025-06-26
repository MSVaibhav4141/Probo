export const Stats = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Stats</h2>

      <div className="bg-gray-50 rounded-lg p-5 text-sm text-gray-700 space-y-4">
        <div>
          <h3 className="font-semibold text-base">Current and Recent Performance</h3>
          <p>
            Bengaluru has been one of the most consistent teams this season, winning 4 of their last 5 matches. They have
            shown strong batting performance in both powerplays and death overs.
          </p>
          <p>
            In their last head-to-head matchup with Kolkata, Bengaluru secured a 6-wicket victory with excellent all-round contributions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-base">Strengths</h4>
          <ul className="list-disc list-inside">
            <li>Strong opening pair delivering 50+ starts consistently</li>
            <li>Effective bowling attack with powerplay breakthroughs</li>
            <li>High-scoring finishers providing strong death over performance</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-base">Kolkata's Weaknesses</h4>
          <ul className="list-disc list-inside">
            <li>Top-order collapse seen in last 3 matches</li>
            <li>Inconsistent spin bowling on flat pitches</li>
            <li>Lack of finishers in close chases</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-base">Considerations</h4>
          <ul className="list-disc list-inside">
            <li>Weather conditions may affect swing bowlers early on</li>
            <li>Toss winner has had a 65% win rate at this venue</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stats;

import { useScores } from "../../hooks/useScores";

import { formatTime } from "../../helpers/formatTime";

const Scores = () => {
  const { scores, sortedScores, getSortIcon, onSort } = useScores();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Leaderboard
        </h2>

        {scores.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No scores yet. Be the first to play!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => onSort("player_name")}
                  >
                    <div className="flex items-center gap-2">
                      Player Name
                      <span className="text-sm">
                        {getSortIcon("player_name")}
                      </span>
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => onSort("time_taken")}
                  >
                    <div className="flex items-center gap-2">
                      Time Taken
                      <span className="text-sm">
                        {getSortIcon("time_taken")}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedScores.map((score, index) => (
                  <tr
                    key={score.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {score.player_name}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">
                        {formatTime(score.time_taken)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Showing {scores.length} score{scores.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scores;

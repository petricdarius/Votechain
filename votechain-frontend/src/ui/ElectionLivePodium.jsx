import { useQuery } from "@tanstack/react-query";
import { getElectionResults } from "../services/apiElections";
import { Trophy, Medal } from "lucide-react";

export default function ElectionLivePodium({ electionId, isFinished }) {
  const { data: results, isLoading } = useQuery({
    queryKey: ["election-results-podium", electionId],
    queryFn: () => getElectionResults(electionId),
    staleTime: 1000 * 60,
  });

  if (isLoading)
    return (
      <span className="text-[11px] text-gray-500 font-mono animate-pulse block mt-2">
        Computing live standings...
      </span>
    );
  if (!results || results.length === 0) return null;

  const sorted = [...results].sort((a, b) => b.votes - a.votes);

  const topThree = sorted.slice(0, 3);

  const formatPct = (pctStr) => {
    const num = parseFloat(pctStr);
    return isNaN(num) ? pctStr : `${num.toFixed(2)}%`;
  };

  return (
    <div className="mt-4 pt-3 border-t border-gray-700/50 space-y-2">
      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
        🏆 Final Standings
      </p>

      <div className="flex flex-col gap-1.5">
        {topThree.map((item, index) => {
          const isWinner = index === 0;
          return (
            <div
              key={item.candidate.id || item.candidate._id}
              className={`flex items-center justify-between text-xs p-2 rounded-md ${
                isWinner
                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-300"
                  : "bg-gray-900/40 text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 capitalize font-medium">
                {index === 0 && (
                  <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                {index === 1 && (
                  <Medal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                )}
                {index === 2 && (
                  <Medal className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                )}

                <span>
                  <span className="font-mono text-gray-500 mr-1">
                    #{index + 1}
                  </span>
                  {item.candidate.firstName} {item.candidate.lastName}
                  <span className="text-[10px] uppercase text-gray-500 font-normal ml-1.5">
                    ({item.candidate.party})
                  </span>
                </span>
              </div>

              <div className="text-right font-mono font-bold text-[11px]">
                {formatPct(item.percentage)}
                <span className="text-[9px] font-normal text-gray-500 ml-1">
                  ({item.votes})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

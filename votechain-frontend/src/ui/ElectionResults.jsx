import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Trophy, Users, BarChart3, ArrowLeft, Crown } from "lucide-react";
import { getElectionResults } from "../services/apiElections";

export default function ElectionResults() {
  const { id: electionId } = useParams();

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["election-results", electionId],
    queryFn: () => getElectionResults(electionId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-white/5 animate-spin" />
          <p className="text-xs font-mono text-gray-400">
            The votes are being counted...
          </p>
        </div>
      </div>
    );
  }

  if (error || !results || results.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-white p-8 flex flex-col items-center justify-center gap-4">
        <p className="text-sm font-mono text-gray-500">
          The votes are not available for these elections.
        </p>
        <Link
          to="/admin/elections"
          className="text-xs uppercase font-bold text-blue-400 hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const sortedResults = [...results].sort((a, b) => b.votes - a.votes);

  const winner = sortedResults[0];

  const runnersUp = sortedResults.slice(1);

  const totalVotes = sortedResults.reduce((sum, item) => sum + item.votes, 0);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 sm:p-8 font-sans">
      <Link
        to="/admin/elections"
        className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-blue-400 transition-colors mb-6 uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Titlu Secțiune */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">
              Results <span className="text-blue-500">Election</span>
            </h1>
            <p className="text-xs font-mono text-gray-400 mt-0.5">
              Validated through cryptographic consensus.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#121620] border border-white/5 px-4 py-2 rounded-xl text-xs font-mono text-gray-400">
            <Users className="w-4 h-4 text-blue-500" />
            Total Votes:{" "}
            <span className="text-white font-bold">{totalVotes}</span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-amber-500/5">
          <Crown className="absolute -right-6 -bottom-6 w-40 h-40 text-amber-500/5 rotate-12 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              {/* Badge Trofeu */}
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10 shrink-0">
                <Trophy
                  className="w-7 h-7 animate-bounce"
                  style={{ animationDuration: "3s" }}
                />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Official Winner
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white capitalize mt-1.5">
                  {winner.candidate.firstName} {winner.candidate.lastName}
                </h2>
                <p className="text-sm text-gray-400 font-medium font-mono">
                  Party:{" "}
                  <span className="text-amber-400 uppercase font-bold">
                    {winner.candidate.party}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-baseline sm:flex-col sm:items-end gap-2 sm:gap-0 bg-[#161B26]/60 border border-white/5 sm:border-none p-4 sm:p-0 rounded-xl">
              <span className="text-4xl font-black text-amber-400 tracking-tighter">
                {(() => {
                  const numericPercentage = parseFloat(winner.percentage);

                  return !isNaN(numericPercentage)
                    ? `${numericPercentage.toFixed(2)}%`
                    : winner.percentage;
                })()}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                ({winner.votes} {winner.votes === 1 ? "vote" : "votes"})
              </span>
            </div>
          </div>

          {/* Bară de progres animată pentru câștigător */}
          <div className="w-full h-2 bg-white/5 rounded-full mt-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000"
              style={{ width: winner.percentage.replace("%", "").trim() + "%" }}
            />
          </div>
        </div>

        {runnersUp.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 font-mono flex items-center gap-2 pl-1">
              <BarChart3 className="w-4 h-4" /> Rest of the Candidates
            </h3>

            <div className="space-y-2">
              {runnersUp.map((item, index) => (
                <div
                  key={item.candidate.id}
                  className="flex items-center justify-between bg-[#121620]/60 border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center text-xs font-mono font-bold">
                      {index + 2}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold capitalize text-gray-200">
                        {item.candidate.firstName} {item.candidate.lastName}
                      </h4>
                      <p className="text-xs text-gray-400 font-mono uppercase">
                        {item.candidate.party}
                      </p>
                    </div>
                  </div>

                  {/* Voturi și bare procentuale discrete */}
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-sm font-bold text-gray-300">
                        {(() => {
                          const numericPercentage = parseFloat(item.percentage);

                          return !isNaN(numericPercentage)
                            ? `${numericPercentage.toFixed(2)}%`
                            : item.percentage;
                        })()}
                      </p>
                      <p className="text-[10px] text-gray-500 font-mono">
                        {item.votes} {item.votes === 1 ? "vote" : "votes"}
                      </p>
                    </div>
                    {/* Mini-indicator vizual */}
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: item.percentage.replace("%", "").trim() + "%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

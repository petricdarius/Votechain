import { useVotes } from "../hooks/useVotes";
import { motion } from "framer-motion";
import formatDateRange from "../helpers/formatDate";
import ElectionLivePodium from "../ui/ElectionLivePodium";

function MyVotes() {
  const { votes, isLoading } = useVotes();
  const now = new Date();

  console.log("Votes data:", votes);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">My Votes</h1>
      <p className="text-gray-400">
        Here you can see all the votes you have participated in.
      </p>

      <div className="mt-6">
        {votes.data.length === 0 ? (
          <p className="text-gray-400">You haven't voted in any polls yet.</p>
        ) : (
          <ul className="space-y-4">
            {votes.data.map((vote) => {
              const startDate = new Date(vote.electionId?.startDate);
              const endDate = new Date(vote.electionId?.endDate);
              const isActive = now >= startDate && now <= endDate;
              const isFinished = now > endDate;

              return (
                <li
                  key={vote._id}
                  className="bg-gray-800 p-5 rounded-xl border border-gray-700/40 flex flex-col justify-between transition-all hover:border-gray-700"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold text-white">
                        {vote.electionId?.title || "Election Title"}
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        Your choice:{" "}
                        <span className="text-blue-400 font-medium capitalize">
                          {vote.chosenCandidate?.firstName}{" "}
                          {vote.chosenCandidate?.lastName}
                        </span>{" "}
                        ({vote.chosenCandidate?.party})
                      </p>
                      <p className="text-gray-500 text-xs mt-1 font-mono">
                        {vote.electionId?.startDate &&
                          formatDateRange(
                            vote.electionId?.startDate,
                            vote.electionId?.endDate,
                          )}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 bg-gray-900/60 px-2.5 py-1 rounded-md border border-gray-700/30">
                      {isActive ? (
                        <>
                          <motion.span
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1.5 h-1.5 bg-green-400 rounded-full"
                          />
                          <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">
                            Active
                          </span>
                        </>
                      ) : isFinished ? (
                        <>
                          <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            Finished
                          </span>
                        </>
                      ) : (
                        <>
                          <motion.span
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                          />
                          <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                            Upcoming
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {!vote.electionId?.startDate ||
                  now < startDate ||
                  isActive ? (
                    <p className="text-[11px] text-gray-500 font-mono mt-4 pt-3 border-t border-gray-700/50">
                      🔒 Standings will be visible once voting ends.
                    </p>
                  ) : (
                    <ElectionLivePodium
                      electionId={vote.electionId._id}
                      isFinished={isFinished}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyVotes;

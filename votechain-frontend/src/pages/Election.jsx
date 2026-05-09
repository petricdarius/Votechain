import { useNavigate, useParams } from "react-router-dom";
import { useElectionCandidates, useVoteCandidate } from "../hooks/useElections";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../helpers/cn";

function Election() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { electionCandidates: election, isLoading } = useElectionCandidates(id);
  const { voteCandidateMutation, isLoading: isVoting } = useVoteCandidate();
  if (!id) return <div>Invalid Election ID</div>;
  console.log(isLoading, id, election);
  if (isLoading) return <div>Loading...</div>;
  if (!election) return <div>Election not found</div>;

  function handleVote() {
    if (!selectedCandidate)
      return alert("Please select a candidate before voting.");
    voteCandidateMutation({ id, selectedCandidate });
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#151A22] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl"
        >
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <header className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {election.data.doc.title}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {election.data.doc.description}
            </p>
          </header>

          {/* Lista de Candidați / Opțiuni */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest">
              Selectează Opțiunea
            </h4>

            {election.data.doc.candidates.map((candidate) => (
              <motion.div
                key={candidate._id}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                className="flex items-center justify-between p-4 border border-white/5 rounded-2xl bg-white/2 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold"></div>
                  <div>
                    <h5 className="font-bold text-white group-hover:text-blue-400">
                      {candidate.firstName} {candidate.lastName}
                    </h5>
                    <p className="text-xs text-gray-500 font-mono">
                      {candidate.description}
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                      {candidate.party}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCandidate(candidate._id);
                  }}
                  className={cn(
                    "px-4 py-2 border border-blue-500/30 rounded-lg text-xs font-bold text-blue-400 hover:bg-blue-500 hover:text-white transition-all",
                    selectedCandidate === candidate._id &&
                      "bg-blue-500 text-white",
                  )}
                >
                  SELECTEAZĂ
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <button
              onClick={handleVote}
              disabled={isVoting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 transition-all uppercase tracking-widest"
            >
              {isVoting ? "Se procesează..." : "Confirmă Votul pe Blockchain"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default Election;

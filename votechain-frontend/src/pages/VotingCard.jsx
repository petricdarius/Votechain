import { motion } from "framer-motion";
import formatDateRange from "../helpers/formatDate";
import { Link } from "react-router-dom";

function VotingCard({ election, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex flex-col bg-[#151A22]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-white h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-blue-400 rounded-full"
            />
            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
              In Progress
            </span>
          </div>
          <span className="text-gray-500 text-xs font-mono">
            ID: {election._id || "#001"}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 leading-tight">
          {election.title || "Election"}
        </h3>

        {/* Bara de Progres Animată */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-xs font-mono text-gray-400">
            <span>Progress</span>
            <span>1.2M / 2M Tokens</span>
          </div>

          <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }} // Aici pui procentajul real
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
              Time Left
            </p>
            <p className="text-sm font-mono text-cyan-400">
              {formatDateRange(election.startDate, election.endDate)}
            </p>
          </div>

          <Link
            className="px-4 py-2 text-center bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20"
            to={`/elections/${election._id}`}
          >
            VOTE NOW
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default VotingCard;

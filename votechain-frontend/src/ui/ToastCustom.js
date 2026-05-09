import toast from "react-hot-toast";
import { motion } from "framer-motion";

export const notifyCustom = (message, type = "success") => {
  toast.custom(
    (t) => (
      <motion.div
        // Animație de intrare/ieșire
        initial={{ opacity: 0, y: -20, scale: 0.9, rotateX: 90 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        // Designul Toast-ului
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-[#151A22]/90 border ${
          type === "success"
            ? "border-blue-500/50 shadow-blue-500/20"
            : "border-red-500/50 shadow-red-500/20"
        } backdrop-blur-xl pointer-events-auto flex rounded-2xl shadow-2xl overflow-hidden`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {/* Iconița animată */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold ${
                  type === "success"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {type === "success" ? "⚡" : "⚠️"}
              </motion.div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-white uppercase tracking-wider">
                {type === "success" ? "Sistem Actualizat" : "Acces Refuzat"}
              </p>
              <p className="mt-1 text-xs text-gray-400 font-mono">{message}</p>
            </div>
          </div>
        </div>

        <div className="flex border-l border-white/5">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-colors"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    ),
    { duration: 4000 },
  );
};

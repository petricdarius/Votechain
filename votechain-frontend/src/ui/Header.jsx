import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useLogout } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { use } from "react";

function Header() {
  const { logoutMutate, isLoading } = useLogout();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(["user"]);

  return (
    <header className="h-20 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
      {/* Wallet & Profile */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex flex-col items-end mr-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            Welcome back, {userData?.firstName}!
          </span>
          <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span>
            Online
          </span>
        </div>
      </div>
      <motion.button
        className="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-lg text-sm font-bold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => logoutMutate()}
        disabled={isLoading}
      >
        Logout
      </motion.button>
    </header>
  );
}

export default Header;

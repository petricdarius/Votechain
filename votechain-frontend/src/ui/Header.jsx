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
      {/* Search Bar - Stil Tech */}
      <div className="relative hidden md:block">
        <span className="absolute inset-y-0 left-3 flex items-center">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all w-64"
        />
      </div>

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

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to} className="relative group">
      {({ isActive }) => (
        <div
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
            ${
              isActive
                ? "text-blue-400"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }
          `}
        >
          {/* Background animat pentru starea activă */}
          {isActive && (
            <motion.div
              layoutId="activeNav"
              className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl"
              initial={false}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}

          {/* Indicator lateral vertical */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
            />
          )}

          {/* Iconița */}
          <Icon
            className={`w-5 h-5 z-10 ${
              isActive
                ? "text-blue-400"
                : "group-hover:scale-110 transition-transform"
            }`}
          />

          {/* Label-ul */}
          <span className="font-medium text-sm z-10 tracking-wide uppercase">
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
}

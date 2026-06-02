import { useQuery } from "@tanstack/react-query";
import NavItem from "./NavItem";
import { LayoutDashboard, Archive, User, Settings, LogOut } from "lucide-react";

function Sidebar() {
  const { data: user } = useQuery({ queryKey: ["user"] });

  const voterLinks = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/MyVotes", icon: Archive, label: "My Votes" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Admin Dashboard" },
    { to: "/admin/elections", icon: Archive, label: "Manage Elections" },
    { to: "/admin/users", icon: User, label: "Manage Users" },
  ];

  const navLinks = user?.role === "admin" ? adminLinks : voterLinks;

  return (
    <aside className="w-72 h-screen border-r border-white/5 bg-[#0B0E14] flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 px-2 mb-12">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="text-xl font-black tracking-tighter text-white">
          VOTE<span className="text-blue-500">CHAIN</span>
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <NavItem
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
          />
        ))}
      </nav>

      {/* <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">
          Voting Power
        </p>
        <p className="text-xl font-mono font-bold text-white">
          2,500 <span className="text-xs text-blue-500">VOTE</span>
        </p>
        <div className="mt-3 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
          <div className="bg-blue-500 h-full w-3/4"></div>
        </div>
      </div> */}
    </aside>
  );
}

export default Sidebar;

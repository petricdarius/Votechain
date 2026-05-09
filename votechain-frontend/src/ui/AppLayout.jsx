import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#0B0E14]">
      {/* Sidebar fix în stânga */}
      <Sidebar />

      {/* Zona de conținut din dreapta */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-500">
                Bun venit în sistemul de guvernanță descentralizată.
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 text-white bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-all">
                Filter
              </button>
              <button className="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-lg text-sm font-bold hover:bg-blue-500 transition-all">
                New Proposal
              </button>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}

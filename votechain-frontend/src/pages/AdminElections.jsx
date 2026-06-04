import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteElection } from "../services/apiAdminElections";
import { Calendar, FileText, Trash2, Eye } from "lucide-react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AdminElections() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: electionsData, isLoading } = useQuery({
    queryKey: ["elections"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:5000/api/v1/elections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch elections");
      }

      const result = await res.json();

      return result.data.docs;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteElection,
    onSuccess: () => {
      queryClient.invalidateQueries(["elections"]);
      toast.success("The election has been deleted.");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "The election could not be deleted.",
      );
    },
  });
  return (
    <div>
      <div className="lg:col-span-2 bg-[#121620]/60 border border-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-bold uppercase tracking-wider text-gray-200 mb-6 flex items-center gap-2">
          <FileText className="text-blue-400 w-5 h-5" /> Active Events
        </h2>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-20 bg-white/5 rounded-xl" />
            ))}
          </div>
        ) : electionsData?.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-mono text-sm border border-dashed border-white/10 rounded-xl">
            There are no active elections in the database.
          </div>
        ) : (
          <div className="space-y-4">
            {electionsData?.map((el) => {
              const now = new Date();
              const startDate = new Date(el.startDate);
              const endDate = new Date(el.endDate);
              const isActive = now >= startDate && now <= endDate;
              const isFinished = now > endDate;

              return (
                <div
                  key={el._id}
                  className="group relative bg-[#161B26]/80 border border-white/5 hover:border-blue-500/30 p-5 rounded-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                        {el.title}
                      </h3>
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : isFinished
                            ? "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        }`}
                      >
                        {isActive
                          ? "Active"
                          : isFinished
                          ? "Finished"
                          : "Inactive"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-md line-clamp-2">
                      {el.description}
                    </p>

                    <div className="flex items-center gap-4 text-[12px] text-gray-500 font-mono pt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-500/70" />
                        Start: {new Date(el.startDate).toLocaleString("ro-RO")}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-red-500/70" />
                        End: {new Date(el.endDate).toLocaleString("ro-RO")}
                      </span>

                      <span>
                        Candidates registered: {el.candidates?.length || 0}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => navigate(`/elections/${el._id}/results`)}
                      className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all cursor-pointer shadow-lg shadow-blue-500/5"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to permanently delete "${el.title}"?`,
                          )
                        ) {
                          deleteMutation.mutate(el._id);
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-lg shadow-red-500/5"
                      title="Delete Elections"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminElections;

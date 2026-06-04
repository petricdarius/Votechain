import { Shield, User, Mail, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useUsers, useDeleteUser } from "../hooks/useUsers";

export default function AdminUsers() {
  const { users, isLoading } = useUsers();
  const { deleteUser, isLoading: isDeleting } = useDeleteUser();

  function handleDeleteUser(userId) {
    deleteUser(userId);
  }

  if (isLoading) {
    return <p>Loading the guest list...</p>;
  }

  return (
    <div className="w-full bg-[#121620] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black uppercase tracking-tight text-white">
            Administrate<span className="text-blue-500">Users</span>
          </h2>
          <p className="text-xs font-mono text-gray-400 mt-0.5">
            Total accounts: {users.data.docs.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#161B26] border-b border-white/5 text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400">
              <th className="py-4 px-6">User</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Account Status</th>
              <th className="py-4 px-6">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 text-sm">
            {users.data.docs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-8 text-center font-mono text-xs text-gray-500"
                >
                  No users found in the database.
                </td>
              </tr>
            ) : (
              users.data.docs.map((user) => {
                const isAdmin = user.role === "admin";
                const isActive = user.isActive !== false;

                return (
                  <tr
                    key={user._id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-white">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                            isAdmin
                              ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          }`}
                        >
                          {isAdmin ? (
                            <Shield className="w-4 h-4" />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                        </div>
                        <span className="capitalize">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-gray-400 font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-600" />
                        {user.email}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-mono uppercase font-bold tracking-wider border ${
                          isAdmin
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-gray-700/30 text-gray-400 border-white/5"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        {isActive ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-green-400">Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-red-400">Suspended</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={isDeleting}
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${user.firstName}'s account?`,
                              )
                            ) {
                              handleDeleteUser(user._id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-white/5 transition-all cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi, getUsers } from "../services/apiUsers";
import toast from "react-hot-toast";

export function useUsers() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users,
    isLoading,
  };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("User account has been deleted.");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to delete user.");
    },
  });

  return { deleteUser, isLoading };
}

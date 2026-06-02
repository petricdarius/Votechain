import { useQuery } from "@tanstack/react-query";
import { getMeUser } from "../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMeUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user,
    isLoading,
  };
}

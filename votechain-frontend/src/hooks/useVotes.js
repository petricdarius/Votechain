import { useQuery } from "@tanstack/react-query";
import { getMyVotes } from "../services/apiVote";

export function useVotes() {
  const { isLoading, data: votes } = useQuery({
    queryKey: ["myVotes"],
    queryFn: getMyVotes,
  });
  console.log(votes);
  return { isLoading, votes };
}

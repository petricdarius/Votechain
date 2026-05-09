import { useMutation, useQuery } from "@tanstack/react-query";
import getElections, {
  getCandidates,
  getElectionCandidates,
  voteCandidate,
} from "../services/apiElections";

import toast from "react-hot-toast";

export default function useElections() {
  const { data: elections, isLoading } = useQuery({
    queryKey: ["elections"],
    queryFn: getElections,
  });
  return { elections, isLoading };
}

export function useCandidates() {
  const { data: candidates, isLoading } = useQuery({
    queryKey: ["candidates"],
    queryFn: getCandidates,
  });
  return { candidates, isLoading };
}

export function useElectionCandidates(electionId) {
  const { data: electionCandidates, isLoading } = useQuery({
    queryKey: ["electionCandidates", electionId],
    queryFn: () => getElectionCandidates(electionId),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return { electionCandidates, isLoading };
}

export function useVoteCandidate() {
  const {
    mutate: voteCandidateMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ id: electionId, selectedCandidate }) =>
      voteCandidate(electionId, selectedCandidate),
    onSuccess: () => {
      toast.success("Votul a fost înregistrat cu succes!");
    },
  });
  return { voteCandidateMutation, isLoading, error };
}

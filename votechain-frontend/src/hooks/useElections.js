import { useQuery } from "@tanstack/react-query";
import getElections, {
  getCandidates,
  getElectionCandidates,
} from "../services/apiElections";

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

import { useQuery } from "@tanstack/react-query";
import getElections from "../services/apiElections";

export default function useElections() {
  const { data: elections, isLoading } = useQuery({
    queryKey: ["elections"],
    queryFn: getElections,
  });
  return { elections, isLoading };
}

import useElections, {
  useCandidates,
  useElectionCandidates,
} from "../hooks/useElections";
import VotingCard from "./VotingCard";

function Dashboard() {
  const { elections, isLoading } = useElections();
  const { candidates, isLoading: isCandidatesLoading } = useCandidates();
  console.log(elections);

  if (isLoading || isCandidatesLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {elections.data.docs.map((election, index) => (
          <VotingCard key={election._id} election={election} index={index} />
        ))}
      </div>
    </>
  );
}
export default Dashboard;

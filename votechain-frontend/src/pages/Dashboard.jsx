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
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-500">
            Voting sistem built on blockchain technology for secure and
            transparent elections.
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {elections.data.docs.map((election, index) => (
          <VotingCard key={election._id} election={election} index={index} />
        ))}
      </div>
    </>
  );
}
export default Dashboard;

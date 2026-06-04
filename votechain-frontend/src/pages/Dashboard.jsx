import useElections from "../hooks/useElections";
import VotingCard from "./VotingCard";

function Dashboard() {
  const { elections, isLoading } = useElections();

  const sortedElections = elections?.data?.docs
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .filter((election) => new Date(election.endDate) > new Date());

  console.log(elections);

  if (isLoading) return <div>Loading...</div>;

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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedElections?.map((election, index) => (
          <VotingCard key={election._id} election={election} index={index} />
        ))}
      </div>
    </>
  );
}
export default Dashboard;

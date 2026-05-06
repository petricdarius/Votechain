import useElections from "../hooks/useElections";

function Dashboard() {
  const { elections, isLoading } = useElections();
  console.log(elections);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {elections.data.docs.map((election) => (
        <ElectionCard key={election.id} election={election} />
      ))}
    </div>
  );
}

function ElectionCard({ election }) {
  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-md">
      <h3>{election.name}</h3>
      <p>{election.description}</p>
    </div>
  );
}

export default Dashboard;

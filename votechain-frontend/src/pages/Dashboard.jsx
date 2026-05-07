import useElections, {
  useCandidates,
  useElectionCandidates,
} from "../hooks/useElections";

function Dashboard() {
  const { elections, isLoading } = useElections();
  const { candidates, isLoading: isCandidatesLoading } = useCandidates();
  console.log(elections);

  if (isLoading || isCandidatesLoading) return <div>Loading...</div>;

  return (
    <>
      <div>
        {elections.data.docs.map((election) => (
          <ElectionCard key={election._id} election={election} />
        ))}
      </div>
      <div>
        <h2>Candidates</h2>
        {candidates.data.docs.map((candidate) => (
          <div key={candidate.id}>
            <h3>{candidate.name}</h3>
            <p>{candidate.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function ElectionCard({ election }) {
  const { electionCandidates, isLoading } = useElectionCandidates(election._id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-md">
      <h3>{election.name}</h3>
      <p>{election.description}</p>
      <h4>Candidates:</h4>
      <ul>
        {electionCandidates.data.doc.candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.firstName} {candidate.lastName}, {candidate.party}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

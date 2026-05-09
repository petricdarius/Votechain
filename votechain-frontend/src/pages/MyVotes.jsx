import { useVotes } from "../hooks/useVotes";

function MyVotes() {
  const { votes, isLoading } = useVotes();
  console.log("Votes data:", votes);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">My Votes</h1>
      <p className="text-gray-400">
        Here you can see all the votes you have participated in.
      </p>
      <div className="mt-6">
        {votes.data.length === 0 ? (
          <p className="text-gray-400">You haven't voted in any polls yet.</p>
        ) : (
          <ul className="space-y-4">
            {votes.data.map((vote) => (
              <li key={vote._id} className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-white">
                  {vote.date}
                </h2>
                <p className="text-gray-400">
                  Your choice: {vote.chosenCandidate}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyVotes;

export default async function getElections() {
  const response = await fetch("http://127.0.0.1:5000/api/v1/elections", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const result = await response.json();
  console.log(result);
  return result;
}

export async function getCandidates() {
  const response = await fetch("http://127.0.0.1:5000/api/v1/candidates", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const result = await response.json();
  console.log(result);
  return result;
}

export async function getElectionCandidates(electionId) {
  const response = await fetch(
    `http://127.0.0.1:5000/api/v1/elections/${electionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch election candidates");
  }
  return result;
}

export async function voteCandidate(electionId, candidateId) {
  const response = await fetch(
    `http://127.0.0.1:5000/api/v1/votes/election/${electionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ candidateId }),
    },
  );

  const result = await response.json();
  console.log(result);
  if (!response.ok) {
    throw new Error(result.message || "Failed to cast vote");
  }
  return result;
}

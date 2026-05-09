export async function getElection() {
  const response = await fetch("http://localhost:5000/api/v1/elections");
  if (!response.ok) {
    throw new Error("Failed to fetch election data");
  }
  const data = await response.json();
  return data;
}

export async function getMyVotes() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/v1/votes/myVotes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch votes data");
  }
  const data = await response.json();
  return data;
}

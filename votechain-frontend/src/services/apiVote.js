export async function getElection() {
  const response = await fetch("http://localhost:3000/api/v1/elections");
  if (!response.ok) {
    throw new Error("Failed to fetch election data");
  }
  const data = await response.json();
  return data;
}

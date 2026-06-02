const BASE_URL = "http://127.0.0.1:5000/api/v1/elections";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const createElection = async (electionData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(electionData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Eroare la crearea alegerii.");
  }

  return result;
};

export const deleteElection = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (response.status === 204) return { status: "success" };

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Nu s-a putut șterge alegerea.");
  }

  return result;
};

export const createCandidate = async (electionId, candidateData) => {
  const response = await fetch(
    `http://127.0.0.1:5000/api/v1/candidates/election/${electionId}`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(candidateData),
    },
  );

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.message || "Eroare la adăugarea candidatului.");
  return result;
};

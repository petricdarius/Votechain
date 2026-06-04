export async function getUsers() {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/v1/users", {
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

export async function deleteUser(userId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete user.");
  }

  if (response.status === 204) return null;

  return await response.json();
}

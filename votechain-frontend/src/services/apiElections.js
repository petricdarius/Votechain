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

export async function loginApi(data) {
  console.log(data);
  let response = await fetch("http://127.0.0.1:5000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let result = await response.json();
  console.log(result);

  return result;
}

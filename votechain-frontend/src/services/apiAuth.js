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

export async function signUpApi(data) {
  console.log(data);
  let response = await fetch("http://127.0.0.1:5000/api/v1/users/signup", {
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

export async function logout() {
  let response = await fetch("http://127.0.0.1:5000/api/v1/users/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let result = await response.json();
  console.log(result);

  return result;
}

export async function getCurrentUser() {
  let response = await fetch("http://127.0.0.1:5000/api/v1/users/checkLogin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    return false;
  }
  let result = await response.json();
  console.log(
    result.status === "success"
      ? "User is authenticated"
      : "User is not authenticated",
  );

  return result.status === "success" ? true : false;
}

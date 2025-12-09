const API_URL = "http://127.0.0.1:5000";

export async function registerUser(name, age) {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age }),
  });
  return response.json();
}

export async function getUser(userId) {
  const response = await fetch(`${API_URL}/user/${userId}`);
  return response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_URL}/user/${userId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function listUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function addRun(userId, runData) {
  const response = await fetch(`${API_URL}/runs/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(runData),
  });
  return response.json();
}

export async function listRuns(userId) {
  const response = await fetch(`${API_URL}/runs/${userId}`);
  return response.json();
}

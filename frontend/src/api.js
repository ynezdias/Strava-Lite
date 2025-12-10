const API_BASE = "http://127.0.0.1:5000"; // Flask backend URL

export async function createUser(data) {
  const res = await fetch(`${API_BASE}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res;
}

export async function getUser(id) {
  const res = await fetch(`${API_BASE}/user/${id}`);
  return res;
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/user/${id}`, { method: 'DELETE' });
  return res;
}

export async function listUsers() {
  const res = await fetch(`${API_BASE}/users`);
  return res;
}

export async function listRuns(userId) {
  const res = await fetch(`${API_BASE}/runs/${userId}`);
  return res;
}

export async function addRun(userId, runData) {
  const res = await fetch(`${API_BASE}/runs/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(runData),
  });
  return res;
}

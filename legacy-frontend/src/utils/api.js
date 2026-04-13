const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type") || "";
  const body = contentType.includes("application/json") ? await res.json() : null;
  return { ok: res.ok, status: res.status, body };
};

export async function listUsers() {
  const res = await fetch("/users");
  return handleResponse(res);
}

export async function createUser(payload) {
  const res = await fetch("/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteUser(userId) {
  const res = await fetch(`/user/${userId}`, { method: "DELETE" });
  return handleResponse(res);
}

export async function addRun(userId, payload) {
  const res = await fetch(`/runs/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function listRuns(userId) {
  const res = await fetch(`/runs/${userId}`);
  return handleResponse(res);
}

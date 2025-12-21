// src/api.js

const API_BASE = ""; // same host

// USERS
export async function createUser({ name, age }) {
  return fetch(API_BASE + "/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age })
  });
}

export async function getUser(id) {
  return fetch(API_BASE + "/user/" + encodeURIComponent(id));
}

export async function deleteUser(id) {
  return fetch(API_BASE + "/user/" + encodeURIComponent(id), { method: "DELETE" });
}

export async function listUsers() {
  return fetch(API_BASE + "/users");
}

// RUNS
export async function addRun(userId, runData) {
  return fetch(API_BASE + "/runs/" + encodeURIComponent(userId), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(runData)
  });
}

export async function listRuns(userId) {
  return fetch(API_BASE + "/runs/" + encodeURIComponent(userId));
}

// Optional: login/signup/profile
export async function login(credentials) {
  return fetch(API_BASE + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
}

export async function signup(data) {
  return fetch(API_BASE + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

export async function getProfile() {
  return fetch(API_BASE + "/profile");
}

const API = import.meta.env.VITE_API_URL || "/api";

async function request(path = "", options = {}) {
  const res = await fetch(`${API}/tasks${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const getTasks = () => request();
export const createTask = (task) =>
  request("", { method: "POST", body: JSON.stringify(task) });
export const updateTask = (id, updates) =>
  request(`/${id}`, { method: "PUT", body: JSON.stringify(updates) });
export const deleteTask = (id) => request(`/${id}`, { method: "DELETE" });

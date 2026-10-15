import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setError("");
    try {
      setTasks(await getTasks());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setError("");
    try {
      const task = await createTask({ title, description });
      setTasks((prev) => [task, ...prev]);
      setTitle("");
      setDescription("");
    } catch (e) {
      setError(e.message);
    }
  };

  const toggle = async (task) => {
    setError("");
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (id) => {
    setError("");
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const visible = tasks.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.completed : !t.completed
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <form className="form" onSubmit={handleAdd}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="filters">
        {["all", "pending", "done"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : visible.length === 0 ? (
        <p className="empty">No tasks here.</p>
      ) : (
        <ul className="list">
          {visible.map((t) => (
            <li key={t._id} className={t.completed ? "done" : ""}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggle(t)}
              />
              <div className="text">
                <strong>{t.title}</strong>
                {t.description && <span>{t.description}</span>}
              </div>
              <button className="del" onClick={() => remove(t._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
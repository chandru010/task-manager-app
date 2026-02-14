import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔐 Protect Route
  useEffect(() => {
    document.title = "Task Manager App";

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  // 🔹 Fetch Tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data.data);
    } catch (err) {
      alert("Unauthorized. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  // 🔹 Load Tasks On Mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Create Task
  const createTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      alert("Error creating task");
    }
  };

  // 🔹 Delete Task
  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "linear-gradient(to bottom, #1f2937, #111827)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2>Dashboard</h2>
          <button
            onClick={logout}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />
          <button
            onClick={createTask}
            style={{
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#111827",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
              }}
            >
              <div>
                <strong>{task.title}</strong>
                <p style={{ margin: 0, fontSize: "14px" }}>
                  {task.description}
                </p>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

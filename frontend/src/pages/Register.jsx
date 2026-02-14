import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div
        style={{
          width: "280px",
          padding: "25px",
          backgroundColor: "#1f2937",
          borderRadius: "8px",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #374151",
              backgroundColor: "#111827",
              color: "white"
            }}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #374151",
              backgroundColor: "#111827",
              color: "white"
            }}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #374151",
              backgroundColor: "#111827",
              color: "white"
            }}
          />

          <button
            type="submit"
            style={{
              padding: "8px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Register
          </button>
        </form>

        <p
          onClick={() => navigate("/")}
          style={{
            marginTop: "15px",
            textAlign: "center",
            cursor: "pointer",
            fontSize: "14px",
            color: "#9ca3af"
          }}
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;

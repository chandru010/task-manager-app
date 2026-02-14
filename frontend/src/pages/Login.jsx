import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      console.log("FULL LOGIN RESPONSE:", res.data);

      // ✅ Handle different backend response structures safely
      const token =
        res.data.token ||
        res.data.data?.token ||
        res.data.accessToken ||
        null;

      if (!token) {
        alert("Token not received from server");
        return;
      }

      localStorage.setItem("token", token);

      console.log("Saved Token:", localStorage.getItem("token"));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>User Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "220px",
          gap: "10px"
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{ padding: "8px" }}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          style={{ padding: "8px" }}
          required
        />

        <button
          type="submit"
          style={{
            padding: "8px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <p
          onClick={() => navigate("/register")}
          style={{ cursor: "pointer", textAlign: "center" }}
        >
          Create account
        </p>
      </form>
    </div>
  );
}

export default Login;

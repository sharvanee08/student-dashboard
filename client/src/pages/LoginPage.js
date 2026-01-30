import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      if (res.data.success) {
        localStorage.setItem("username", res.data.username);
        navigate("/welcome", { state: { username: res.data.username } });
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/*Home Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "#1e40af",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Home
      </button>

      <h1 className="login-title">Student Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-msg">{error}</p>}

      <p className="signup-link">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign up here</span>
      </p>
    </div>
  );
}

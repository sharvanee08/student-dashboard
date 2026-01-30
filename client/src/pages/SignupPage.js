import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      setMessage(res.data.message);
      if (res.data.success) {
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9fafb",
        position: "relative",
      }}
    >
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

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#1e40af", marginBottom: "20px" }}>
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p style={{ textAlign: "center", marginTop: "15px", color: "#374151" }}>
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "15px", color: "#6b7280" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#2563eb", cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

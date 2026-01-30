// src/pages/InstructionsPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const InstructionsPage = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/subjects");
  };

  const handleBack = () => {
    navigate("/welcome");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px 40px",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <h1 style={{ color: "#1e40af", marginBottom: 20 }}>Quiz Instructions</h1>

        <ul style={{ lineHeight: 1.8, color: "#374151" }}>
          <li>This quiz has 5 questions.</li>
          <li>Questions can be Multiple Choice or True/False.</li>
          <li>Difficulty levels: Easy, Medium, Hard.</li>
          <li>Scoring: Hard = 3 pts, Medium = 2 pts, Easy = 1 pt.</li>
          <li>
            No strict time limit — but for every 10 seconds beyond 40 seconds, 1 point will be deducted.
          </li>
        </ul>

        <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 15 }}>
          <button
            onClick={handleBack}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#6b7280",
              color: "white",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#4b5563")}
            onMouseLeave={(e) => (e.target.style.background = "#6b7280")}
          >
            Back
          </button>

          <button
            onClick={handleProceed}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("Student");

  useEffect(() => {
    //Use username from state if available, otherwise from localStorage
    if (state?.username) {
      setUsername(state.username);
      localStorage.setItem("username", state.username);
    } else {
      const savedUser = localStorage.getItem("username");
      if (savedUser) setUsername(savedUser);
    }
  }, [state]);

  const goFeature = (path) => {
    navigate(path);
  };

  //Logout function
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div style={{ padding: 28, minHeight: "100vh", background: "#f3f6fb" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h1 style={{ color: "#1e40af" }}>Welcome, {username} 👋</h1>
          {/*Logout button */}
          <button
            onClick={handleLogout}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>

        <p style={{ color: "#4b5563" }}>Choose a feature to get started.</p>

        <div
          style={{
            marginTop: 24,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 18,
          }}
        >
          <div style={cardStyle} onClick={() => goFeature("/planner")}>
            <h3>📅 Planner</h3>
            <p>Organize your day and tasks with an easy planner.</p>
          </div>

          <div style={cardStyle} onClick={() => goFeature("/pomodoro")}>
            <h3>⏱ Pomodoro Timer</h3>
            <p>Stay focused with timed work sessions.</p>
          </div>

          <div style={cardStyle} onClick={() => goFeature("/instructions")}>
            <h3>📖 Quiz</h3>
            <p>Practice with topic-wise quizzes (your current module).</p>
          </div>

          <div style={cardStyle} onClick={() => goFeature("/countdown")}>
            <h3>⏰ Exam Countdown</h3>
            <p>Keep track of upcoming exams and important dates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: 18,
  borderRadius: 12,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  cursor: "pointer",
};


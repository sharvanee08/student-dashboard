// client/src/pages/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // we’ll add this file next

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Focus Hub</h1>
      <p className="home-subtitle">Your all-in-one productivity companion</p>

      <button className="home-btn" onClick={() => navigate("/login")}>
        Get Started
      </button>

      <div className="features-grid">
        <div className="feature-card">
          <h3>📅 Planner</h3>
          <p>Organize your schedule and stay ahead every day.</p>
        </div>
        <div className="feature-card">
          <h3>⏰ Pomodoro Timer</h3>
          <p>Boost your focus using proven time intervals.</p>
        </div>
        <div className="feature-card">
          <h3>📖 Quiz</h3>
          <p>Challenge yourself with interactive quizzes.</p>
        </div>
        <div className="feature-card">
          <h3>🧮 Exam Countdown</h3>
          <p>Track important dates and never miss an exam.</p>
        </div>
      </div>
    </div>
  );
}

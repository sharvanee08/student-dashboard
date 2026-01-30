// client/src/pages/PlannerPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import TimetablePlanner from "../components/TimetablePlanner";
import AttendanceCalculator from "../components/AttendanceCalculator";

export default function PlannerPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/welcome"); 
  };

  return (
    <div>
      <style>{`
        :root {
          --bg-gradient: linear-gradient(180deg, #ede7f6 0%, #f5f3ff 100%);
          --primary: #6a1b9a;
          --accent: #8e24aa;
          --accent-light: #ba68c8;
          --success: #4caf50;
          --danger: #e53935;
          --muted: #6c6f7d;
          --radius: 12px;
          --shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
        }

        body {
          margin: 0;
          font-family: "Inter", "Segoe UI", sans-serif;
          background: var(--bg-gradient);
          color: #262626;
        }

        .planner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 30px;
          background: var(--bg-gradient);
          min-height: 100vh;
          gap: 40px;
          position: relative;
        }

        .planner-box {
          width: 100%;
          max-width: 600px;
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 20px;
        }

        h1 {
          text-align: center;
          color: #1e3a8a;
        }

        .back-btn {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 12px 25px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 1000;
          box-shadow: var(--shadow);
        }

        .back-btn:hover {
          background: var(--primary);
          transform: scale(1.05);
        }
      `}</style>

      <div className="planner-container">
        <h1>📅 Study Planner</h1>

        <div className="planner-box">
          <TimetablePlanner />
        </div>

        <div className="planner-box">
          <AttendanceCalculator />
        </div>

        {/*Floating Back Button */}
        <button className="back-btn" onClick={goBack}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

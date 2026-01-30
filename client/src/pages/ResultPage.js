// client/src/pages/ResultsPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 60,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2 style={{ color: "#ef4444" }}>No result data found.</h2>
        <button
          onClick={() => navigate("/subjects")}
          style={{
            marginTop: 25,
            padding: "12px 22px",
            borderRadius: 10,
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.3s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#1d4ed8";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#2563eb";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Go to Subjects
        </button>
      </div>
    );
  }

  const {
    score,
    correctCount,
    totalQuestions,
    totalTimeLimit,
    totalSecs,
    extra,
    penalty,
    totalPossible,
    subject,
    unit,
    quizQuestions, 
  } = state;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleRetry = () => {
    if (subject && unit) {
      navigate(`/quiz/${subject}/${unit}`, { replace: true });
    } else {
      navigate("/subjects");
    }
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "50px auto",
        textAlign: "center",
        padding: 25,
        background: "#f9fafb",
        borderRadius: 15,
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ color: "#1e40af", marginBottom: 30 }}>🎯 Quiz Results</h2>

      <div style={{ marginTop: 18, fontSize: 18, lineHeight: 1.8, color: "#374151" }}>
        <p>
          <strong>Total score:</strong> {score} / {totalPossible}
        </p>
        <p>
          <strong>Correct answers:</strong> {correctCount} / {totalQuestions}
        </p>
        <p>
          <strong>Time taken:</strong> {formatTime(totalSecs)} (Limit:{" "}
          {formatTime(totalTimeLimit)})
        </p>
        <p>
          <strong>Extra time used:</strong> {extra}s
        </p>
        <p>
          <strong>Penalty deducted:</strong> {penalty} point(s)
        </p>
      </div>

      <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: "15px" }}>
        <button
          onClick={handleRetry}
          style={{
            padding: "12px 22px",
            borderRadius: 10,
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.3s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#1d4ed8";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#2563eb";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Retry Quiz
        </button>

        <button
          onClick={() => navigate("/subjects")}
          style={{
            padding: "12px 22px",
            borderRadius: 10,
            border: "none",
            background: "#6b7280",
            color: "white",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background 0.3s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#4b5563";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#6b7280";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Back
        </button>
      </div>

      {/* === Correct Answers Section === */}
      {quizQuestions && quizQuestions.length > 0 && (
        <div style={{ marginTop: 40, textAlign: "left" }}>
          <h3 style={{ color: "#1e40af", marginBottom: 15 }}>Correct Answers:</h3>
          {quizQuestions.map((q, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 15,
                padding: 15,
                background: "#ffffff",
                borderRadius: 10,
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ marginBottom: 8 }}>
                <strong>Q{idx + 1}:</strong> {q.question}
              </p>
              <p>
                <strong>Answer:</strong> {q.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



//C:\Users\shara\student-dashboard\client\src\components\QuizPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { subject, unit } = useParams();

  const totalTimeLimit = 40;
  const penaltyInterval = 10;

  useEffect(() => {
    if (!subject || !unit) return;
    setLoading(true);

    const formattedSubject = decodeURIComponent(subject).trim();
    const formattedUnit = decodeURIComponent(unit).trim();

    console.log("👉 Fetching quizzes for:", formattedSubject, formattedUnit);

    axios
      .get("http://localhost:5000/api/quizzes", {
        params: {
          subject: formattedSubject,
          unit: formattedUnit,
        },
      })
      .then((res) => {
        console.log("✅ Server response:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setQuizzes(res.data);
        } else {
          console.warn("⚠️ No quizzes returned for this subject/unit.");
          setQuizzes([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching quizzes:", err);
        setLoading(false);
      });
  }, [subject, unit]);

  useEffect(() => {
    if (quizzes.length > 0) {
      setCurrentIndex(0);
      setAnswers({});
      setProgress(0);
      setStartTime(Date.now());
      setElapsedSeconds(0);
    }
  }, [quizzes]);

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handleOptionSelect = (option) =>
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setProgress(((nextIndex + 1) / quizzes.length) * 100);
    } else finishQuiz();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setProgress(((prevIndex + 1) / quizzes.length) * 100);
    }
  };

  const finishQuiz = () => {
    let totalScore = 0;
    let correctCount = 0;

    quizzes.forEach((q, idx) => {
      const selected = answers[idx];
      if (selected === q.correctAnswer) {
        totalScore += q.points || 1;
        correctCount++;
      }
    });

    const finishTime = Date.now();
    const totalSecs = Math.ceil((finishTime - startTime) / 1000);
    const extra = totalSecs > totalTimeLimit ? totalSecs - totalTimeLimit : 0;
    const penalty = Math.floor(extra / penaltyInterval);
    const finalScore = Math.max(totalScore - penalty, 0);

    navigate("/results", {
      state: {
        score: finalScore,
        correctCount,
        totalQuestions: quizzes.length,
        totalTimeLimit,
        totalSecs,
        extra,
        penalty,
        totalPossible: quizzes.reduce(
          (a, q) => a + (q.points || 1),
          0
        ),
        subject,
        unit,
        quizQuestions: quizzes,//EDIT
      },
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <div
          style={{
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #3b82f6",
            borderRadius: "50%",
            width: 50,
            height: 50,
            margin: "0 auto",
            animation: "spin 1s linear infinite",
          }}
        />
        <p style={{ marginTop: 20 }}>Loading quizzes...</p>
        <style>
          {`@keyframes spin { 
              0% { transform: rotate(0deg); } 
              100% { transform: rotate(360deg); } 
            }`}
        </style>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>No quizzes available</h2>
        <p style={{ color: "#6b7280" }}>
          Check your console — the backend might not have matching entries for:
          <br />
          <b>
            subject:</b> {subject.replace(/-/g, " ")} <br />
          <b>unit:</b> {unit.replace(/-/g, " ")}
        </p>
      </div>
    );
  }

  const current = quizzes[currentIndex];
  const selectedOption = answers[currentIndex] || null;

  return (
    <div style={{ maxWidth: 720, margin: "30px auto", padding: 12 }}>
      <h2 style={{ textAlign: "center" }}>
        {subject.replace(/-/g, " ")} - Quiz ({unit.replace(/-/g, " ")})
      </h2>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ height: 10, background: "#eee", borderRadius: 6 }}>
              <div
                style={{
                  width: `${Math.round(progress)}%`,
                  height: "100%",
                  background: "#34d399",
                  borderRadius: 6,
                }}
              />
            </div>
          </div>
          <div style={{ minWidth: 90, textAlign: "right", fontSize: 14 }}>
            {Math.round(progress)}% completed
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          border: "1px solid #e5e7eb",
          padding: 18,
          borderRadius: 8,
          background: "#fafafa",
        }}
      >
        <div style={{ marginBottom: 8, color: "#374151", fontSize: 14 }}>
          Question {currentIndex + 1} of {quizzes.length} • Points:{" "}
          {current.points || 1}
        </div>

        <h3 style={{ marginTop: 8 }}>{current.question}</h3>

        <div style={{ marginTop: 12 }}>
          {current.options.map((opt, idx) => {
            const checked = selectedOption === opt;
            return (
              <label
                key={idx}
                style={{
                  display: "block",
                  padding: "10px 12px",
                  marginBottom: 8,
                  borderRadius: 6,
                  border: `1px solid ${checked ? "#60a5fa" : "#e5e7eb"}`,
                  background: checked ? "#eff6ff" : "#fff",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name={`option-${currentIndex}`}
                  value={opt}
                  checked={checked}
                  onChange={() => handleOptionSelect(opt)}
                  style={{ marginRight: 10 }}
                />
                {opt}
              </label>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#6b7280" }}>
            Time elapsed: {formatTime(elapsedSeconds)} (Limit:{" "}
            {formatTime(totalTimeLimit)})
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {currentIndex === 0 ? (
              <button
                onClick={handleNext}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "#10b981",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Next
              </button>
            ) : (
              <>
                <button
                  onClick={handlePrevious}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "none",
                    background: "#9ca3af",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={
                    currentIndex === quizzes.length - 1
                      ? finishQuiz
                      : handleNext
                  }
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "none",
                    background:
                      currentIndex === quizzes.length - 1
                        ? "#2563eb"
                        : "#10b981",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {currentIndex === quizzes.length - 1 ? "Finish" : "Next"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



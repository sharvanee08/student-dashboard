// C:\Users\shara\student-dashboard\client\src\components\ExamCountdown.js
import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExamCountdown = () => {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const navigate = useNavigate();

  const fetchExams = async () => {
  try {
    const username = localStorage.getItem("username"); // ✅ get logged-in user's name
    const res = await axios.get("http://localhost:5000/api/exams", {
      params: { user: username }, // ✅ send username as query param
    });
    setExams(res.data);
  } catch (err) {
    console.error("Error fetching exams:", err);
  }
};

  const addExam = async () => {
  if (!examName || !examDate) return;
  try {
    const username = localStorage.getItem("username"); // ✅ get logged-in user's name
    await axios.post("http://localhost:5000/api/exams", {
      examName,
      date: examDate,
      user: username, // ✅ include user when saving
    });
    setExamName("");
    setExamDate("");
    setShowForm(false);
    fetchExams();
  } catch (err) {
    console.error("Error adding exam:", err);
  }
};


  // ⛔ keep this for automatic deletion only
  const deleteExam = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/exams/${id}`);
      fetchExams();
    } catch (err) {
      console.error("Error deleting exam:", err);
    }
  };


  useEffect(() => {
    fetchExams();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interval = setInterval(() => {
      setExams((prev) => {
        const updated = [];
        prev.forEach((exam) => {
          const now = new Date();
          const target = new Date(exam.date);
          const diff = target - now;

          if (diff <= 0) {
            deleteExam(exam._id); // ✅ still auto-deletes when time runs out
            return;
          }

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          updated.push({
            ...exam,
            timeLeft: `${days}d ${hours}h ${minutes}m ${seconds}s`,
          });
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const gradients = [
    "linear-gradient(135deg, #FFD1DC, #FF9AA2)",
    "linear-gradient(135deg, #C1E1C1, #70C1B3)",
    "linear-gradient(135deg, #AEDFF7, #0096C7)",
    "linear-gradient(135deg, #F9F1A5, #F6D186)",
    "linear-gradient(135deg, #E6C3F7, #C490E4)",
    "linear-gradient(135deg, #FEC89A, #FF7E5F)",
  ];

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "2.2em",
        }}
      >
        🎓 Exam Countdown
      </h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/welcome")}
          style={{
            padding: "10px 25px",
            borderRadius: "12px",
            border: "none",
            background: "#ff6666",
            color: "#fff",
            fontSize: "1em",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            marginRight: "15px",
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 25px",
            borderRadius: "12px",
            border: "none",
            background: "#0096C7",
            color: "#fff",
            fontSize: "1em",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          {showForm ? "Cancel" : "Add Event"}
        </button>
      </div>

      {showForm && (
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="Exam Name"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              marginRight: "10px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
          <input
            type="datetime-local"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              marginRight: "10px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={addExam}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#70C1B3",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "40px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {exams.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No exams yet. Add one above!
          </p>
        ) : (
          exams.map((exam, i) => (
            <div
              key={exam._id || i}
              style={{
                background: gradients[i % gradients.length],
                color: "#fff",
                padding: "12px",
                borderRadius: "10px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                textAlign: "center",
                height: "100px",
                width: "170px",
                transition: "transform 0.2s",
                margin: "auto",
              }}
            >
              {/* ❌ Removed the delete (cross) button */}
              <h2 style={{ marginBottom: "8px", fontSize: "1em" }}>
                {exam.examName}
              </h2>
              <p style={{ fontSize: "0.9em", fontWeight: "bold" }}>
                <FaClock style={{ marginRight: "6px" }} />
                {exam.timeLeft || "Loading..."}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExamCountdown;


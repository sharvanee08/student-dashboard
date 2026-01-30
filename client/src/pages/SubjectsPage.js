// client/src/pages/SubjectsPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjects = [
  "Web Technologies",
  "Data Structures and Algorithms",
  "Digital Design and Computer Organization",
  "Automata Formal Languages and Logic",
];

const SubjectsPage = () => {
  const [openSubject, setOpenSubject] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/instructions");
  };

  const toggleDropdown = (subject) => {
    setOpenSubject(openSubject === subject ? null : subject);
  };

  const handleUnitClick = (subject, unit) => {
    navigate(`/quiz/${encodeURIComponent(subject)}/${unit}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#f0f4f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ color: "#1e40af", marginBottom: 40 }}>Select a Subject</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "600px",
          alignItems: "center",
        }}
      >
        {subjects.map((subject) => (
          <div key={subject} style={{ width: "100%" }}>
            <button
              onClick={() => toggleDropdown(subject)}
              style={{
                width: "100%",
                padding: "15px 20px",
                borderRadius: "10px",
                border: "none",
                background: "#2563eb",
                color: "white",
                fontSize: "16px",
                fontWeight: 500,
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, background 0.3s",
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
              {subject}
            </button>

            {openSubject === subject && (
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <button
                  onClick={() => handleUnitClick(subject, "Unit 1 and 2")}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "8px",
                    border: "1px solid #2563eb",
                    background: "white",
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#e0e7ff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "white";
                  }}
                >
                  Unit 1 & 2
                </button>

                <button
                  onClick={() => handleUnitClick(subject, "Unit 3 and 4")}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "8px",
                    border: "1px solid #2563eb",
                    background: "white",
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#e0e7ff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "white";
                  }}
                >
                  Unit 3 & 4
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <button
          onClick={handleBack}
          style={{
            padding: "12px 25px",
            borderRadius: "10px",
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
    </div>
  );
};

export default SubjectsPage;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ add this line
import MiniGame from "./MiniGame";
import FocusChart from "./FocusChart";
import musicFile from "../assets/sample-music.mp3";
import "./Pomodoro.css";

export default function PomodoroPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [dark, setDark] = useState(false);
  const [showMini, setShowMini] = useState(false);
  const [quote, setQuote] = useState("");
  const [showChart, setShowChart] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    fetchQuote();
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(intervalRef.current);
              setRunning(false);
              alert("Focus session complete!");
              // Inside the part where session is saved (line ~45)
              axios
                .post("http://localhost:5000/api/pomodoro/sessions", {
                  user: localStorage.getItem("username"), // ✅ added line
                  durationSec: 25 * 60,
                })
                .catch(() => {});
              return 0;
            } else {
              setMinutes((m) => m - 1);
              return 59;
            }
          } else return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, minutes]);

  function startTimer() {
    setRunning(true);
  }

  function resetTimer() {
    setRunning(false);
    setMinutes(25);
    setSeconds(0);
  }

  async function fetchQuote() {
    try {
      const res = await axios.get("http://localhost:5000/api/pomodoro/quote");
      setQuote(res.data.quote);
    } catch (e) {
      setQuote("Stay focused and take a deep breath.");
    }
  }

  function toggleMusic() {
    if (!audioRef.current) return;
    if (audioRef.current.paused) audioRef.current.play();
    else audioRef.current.pause();
  }

  return (
    <div className={dark ? "app dark" : "app"}>
      <video className="bgvideo" autoPlay muted loop>
        <source src="/vid2.mp4" type="video/mp4" />
      </video>

      <div className="content">
        <h1>Pomodoro Focus Timer</h1>

        <div className="timer">
          <span className="big">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </div>

        <div className="progress">
          <div
            style={{
              width: `${
                ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100 || 0
              }%`,
            }}
            className="bar"
          ></div>
        </div>

        <div className="controls">
          <button onClick={startTimer}>Start</button>
          <button
          onClick={() => setRunning((prev) => !prev)}
          style={{ background: running ? "#e53935" : "#43a047" }}
  >
          {running ? "Pause" : "Resume"}
          </button>
          <button onClick={resetTimer}>Reset</button>
          <button onClick={() => setShowMini(true)}>Take a Break</button>
          <button onClick={() => setShowChart((s) => !s)}>
          {showChart ? "Hide Chart" : "Show Daily Chart"}
          </button>
          <button onClick={toggleMusic}>Play Music</button>
          <button onClick={() => setDark((d) => !d)}>
          {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="quote">
          <em>{quote}</em>
          <button className="small" onClick={fetchQuote}>
            New Quote
          </button>
        </div>

        {showMini && <MiniGame onClose={() => setShowMini(false)} />}
        {showChart && <FocusChart />}

        <audio ref={audioRef} src={musicFile} loop />

        {/* ✅ Back button (bottom-right corner) */}
        <button
          onClick={() => navigate("/welcome")}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "#6a1b9a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            fontWeight: "500",
          }}
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

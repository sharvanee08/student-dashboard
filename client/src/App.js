// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InstructionsPage from "./pages/InstructionsPage";
import SubjectsPage from "./pages/SubjectsPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./pages/ResultPage";
import HomePage from "./pages/HomePage"; // ✅ Added this
import LoginPage from "./pages/LoginPage";//NEW
import SignupPage from "./pages/SignupPage"; // NEW
import WelcomePage from "./pages/WelcomePage"; // NEW
import ExamCountdown from "./components/ExamCountdown";
import PlannerPage from "./pages/PlannerPage"; // ✅ new
import PomodoroPage from "./components/Pomodoropage";



function App() {
  return (
    <Router basename="/">
      <Routes>
        {/* ✅ Root now shows the Home Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Main pages */}
        <Route path="/instructions" element={<InstructionsPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />

        {/* Quiz and Results */}
        <Route path="/quiz/:subject/:unit" element={<QuizPage />} />
        <Route path="/results" element={<ResultPage />} />

        {/*Countdown Page*/}
        <Route path="/Countdown" element={<ExamCountdown />} />

        {/*Planner Page*/}
        <Route path="/planner" element={<PlannerPage />} />  {/* ✅ new route */}

        {/*Pomodoro Page*/}
        <Route path="/pomodoro" element={<PomodoroPage />} />

        {/* Catch-all redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;



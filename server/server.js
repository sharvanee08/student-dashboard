//server\server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
console.log("studentRoutes file loaded successfully");
const authRoutes = require("./routes/auth");
const Quizroutes = require("./routes/Quizroutes");
const examRoutes = require("./routes/examRoutes"); 
const timetableRoutes = require("./routes/timetableRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const pomodoroRoutes = require("./routes/Pomodororoutes"); 


// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", Quizroutes);
app.use("/api/exams", examRoutes); 
app.use("/api/timetable", timetableRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/pomodoro", pomodoroRoutes);


// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentdashboard";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


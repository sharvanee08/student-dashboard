// server/models/PomodoroSession.js
const mongoose = require("mongoose");

const PomodoroSessionSchema = new mongoose.Schema({
  user: { type: String, default: "default" },
  durationSec: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PomodoroSession", PomodoroSessionSchema);

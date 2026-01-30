const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  user: String, // ✅ added
  subject: { type: String, required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Timetable", timetableSchema);

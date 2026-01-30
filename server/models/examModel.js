//C:\Users\shara\student-dashboard\server\models\examModel.js

const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  user: String, // ✅ NEW – which student this exam belongs to
  examName: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Exam", examSchema);

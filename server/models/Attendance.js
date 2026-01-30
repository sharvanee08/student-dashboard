//C:\Users\shara\student-dashboard\server\models\Attendance.js
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    subject: { type: String, required: true },
    totalClasses: { type: Number, default: 0 },
    attendedClasses: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ✅ make (user, subject) pair unique, not subject alone
attendanceSchema.index({ user: 1, subject: 1 }, { unique: true });

attendanceSchema.virtual("percentage").get(function () {
  if (!this.totalClasses) return 0;
  return ((this.attendedClasses / this.totalClasses) * 100).toFixed(2);
});

attendanceSchema.set("toJSON", { virtuals: true });
attendanceSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Attendance", attendanceSchema);



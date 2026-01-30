//C:\Users\shara\student-dashboard\server\routes\attendanceRoutes.js
const express = require("express");
const Attendance = require("../models/Attendance");

const router = express.Router();

// ✅ GET all attendance records for the logged-in user
router.get("/", async (req, res) => {
  try {
    const { user } = req.query; // ✅ added
    const records = await Attendance.find({ user }).sort({ subject: 1 }); // ✅ filter by user
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST add or upsert by subject for that user
router.post("/", async (req, res) => {
  try {
    const { user, subject, totalClasses = 0, attendedClasses = 0 } = req.body; // ✅ include user
    let record = await Attendance.findOne({ user, subject }); // ✅ match per user

    if (record) {
      record.totalClasses = Number(totalClasses);
      record.attendedClasses = Number(attendedClasses);
      await record.save();
      return res.json(record);
    }

    record = new Attendance({ user, subject, totalClasses, attendedClasses }); // ✅ save with user
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT update by id (no changes needed)
router.put("/:id", async (req, res) => {
  try {
    const { subject, totalClasses, attendedClasses } = req.body;
    const updated = await Attendance.findByIdAndUpdate(
      req.params.id,
      { subject, totalClasses, attendedClasses },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE by id (no changes needed)
router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST atomic mark (add user filter)
router.post("/:id/mark", async (req, res) => {
  try {
    const { attended } = req.body;
    const id = req.params.id;
    const update = attended
      ? { $inc: { totalClasses: 1, attendedClasses: 1 } }
      : { $inc: { totalClasses: 1 } };

    const updated = await Attendance.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Record not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require("express");
const Timetable = require("../models/Timetable");

const router = express.Router();

// ✅ GET all (for a specific user)
router.get("/", async (req, res) => {
  try {
    const { user } = req.query; // ✅ get user from query string
    const entries = await Timetable.find({ user }).sort({ createdAt: 1 }); // ✅ filter by user
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST new (attach user to new entry)
router.post("/", async (req, res) => {
  try {
    const { user, subject, day, startTime, endTime } = req.body; // ✅ include user
    const entry = new Timetable({ user, subject, day, startTime, endTime }); // ✅ save user
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update (no change needed)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE (no change needed)
router.delete("/:id", async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


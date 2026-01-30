//C:\Users\shara\student-dashboard\server\routes\examRoutes.js

const express = require("express");
const router = express.Router();
const Exam = require("../models/examModel");

// GET all exams
router.get("/", async (req, res) => {
  try {
    const { user } = req.query; // read ?user=username
    const exams = await Exam.find({ user }); // ✅ filter by user
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new exam
router.post("/", async (req, res) => {
  try {
    const { examName, date, user } = req.body; // ✅ include user from frontend
    const newExam = new Exam({ examName, date, user }); // ✅ save user field
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE exam
router.delete("/:id", async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: "Exam deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

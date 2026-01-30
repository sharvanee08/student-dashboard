// routes/Quizroutes.js
const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

// ✅ GET quizzes with exact subject/unit match
router.get("/", async (req, res) => {
  try {
    const { subject, unit } = req.query;

    if (!subject && !unit) {
      const all = await Quiz.find({});
      console.log(`📚 Returning all ${all.length} quizzes`);
      return res.json(all);
    }

    const query = {};
    if (subject) query.subject = subject;
    if (unit) query.unit = unit;

    const quizzes = await Quiz.find(query);
    console.log(`🎯 Query: subject="${subject}" unit="${unit}" → Found ${quizzes.length} quizzes`);
    res.json(quizzes);
  } catch (err) {
    console.error("❌ Error fetching quizzes:", err);
    res.status(500).json({ error: "Server error while fetching quizzes" });
  }
});

// ✅ POST – Add multiple quizzes at once
router.post("/add", async (req, res) => {
  try {
    const quizArray = Array.isArray(req.body) ? req.body : [req.body];
    const saved = await Quiz.insertMany(quizArray);
    console.log(`✅ Inserted ${saved.length} quizzes`);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error adding quizzes:", err);
    res.status(500).json({ error: "Server error while adding quizzes" });
  }
});

// ✅ DELETE – Remove all quizzes (use for resetting)
router.delete("/", async (req, res) => {
  try {
    const result = await Quiz.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} quizzes`);
    res.json({ message: "All quizzes deleted", deleted: result.deletedCount });
  } catch (err) {
    console.error("❌ Error deleting quizzes:", err);
    res.status(500).json({ error: "Server error while deleting quizzes" });
  }
});

module.exports = router;






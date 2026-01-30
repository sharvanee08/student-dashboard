// server/routes/pomodoroRoutes.js
const express = require("express");
const router = express.Router();
const PomodoroSession = require("../models/PomodoroSession");

// Static quotes array (unchanged)
const quotes = [
  "Focus on being productive instead of busy. — Tim Ferriss",
  "The secret of getting ahead is getting started. — Mark Twain",
  "It always seems impossible until it’s done. — Nelson Mandela",
  "Small steps every day. — Unknown",
  "Your future is created by what you do today, not tomorrow. — Robert Kiyosaki"
];

// ✅ GET random motivational quote
router.get("/quote", (req, res) => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: q });
});

// ✅ POST new Pomodoro session
router.post("/sessions", async (req, res) => {
  try {
    const { durationSec, user } = req.body;
    const session = new PomodoroSession({ durationSec, user });
    await session.save();
    res.json({ ok: true, session });
  } catch (err) {
    console.error("Error saving Pomodoro session:", err);
    res.status(500).json({ error: "db error" });
  }
});

// ✅ GET today's sessions grouped by hour
router.get("/sessions/daily", async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const pipeline = [
      { $match: { user: req.query.user, createdAt: { $gte: start } } }, // ✅ added user filter
      {
        $project: {
          hour: { $hour: { date: "$createdAt", timezone: "Asia/Kolkata" } },
          durationSec: 1,
        },
      },
      {
        $group: { _id: "$hour", totalSec: { $sum: "$durationSec" } },
      },
      { $project: { hour: "$_id", totalSec: 1, _id: 0 } },
      { $sort: { hour: 1 } },
    ];

    const rows = await PomodoroSession.aggregate(pipeline);
    res.json(rows);
  } catch (err) {
    console.error("Error aggregating Pomodoro sessions:", err);
    res.status(500).json({ error: "db error" });
  }
});

module.exports = router;

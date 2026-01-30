// server/models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // list of possible answers
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["MCQ", "True/False"],
    default: "MCQ",
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  points: {
  type: Number,
  default: function () {
    // Automatically assign points based on difficulty
    switch (this.difficulty) {
      case "Hard":
        return 3;
      case "Easy":
        return 1;
      default:
        return 2; // Medium
    }
  },
},

});

module.exports = mongoose.model('Quiz', quizSchema);

